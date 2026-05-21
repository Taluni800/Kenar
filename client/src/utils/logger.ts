type LogLevel = "INFO" | "DEBUG" | "ERROR";

interface LogEntry {
  level: LogLevel;
  fnName: string;
  args: unknown[];
  result?: unknown;
  error?: unknown;
  duration: number;
  timestamp: string;
}

interface LogOptions {
  level: LogLevel;
  format?: "text" | "json";
  formatter?: (entry: LogEntry) => string;
}

function safeSerialize(value: unknown): unknown {
  const seen = new WeakSet();

  const serialize = (val: unknown): unknown => {
    if (val === null || typeof val !== "object") return val;

    if ((val as Record<string, unknown>).$$typeof) return "[ReactElement]";

    if (seen.has(val as object)) return "[Circular]";
    seen.add(val as object);

    if (Array.isArray(val)) return val.map(serialize);

    const plain: Record<string, unknown> = {};
    for (const key in val as object) {
      try {
        plain[key] = serialize((val as Record<string, unknown>)[key]);
      } catch {
        plain[key] = "[Unserializable]";
      }
    }
    return plain;
  };

  return serialize(value);
}

function formatEntry(entry: LogEntry, format: "text" | "json"): string {
  if (format === "json") {
    return JSON.stringify(entry, null, 2);
  }

  const base = `[${entry.timestamp}] [${entry.level}] ${entry.fnName}`;

  if (entry.error) {
    return `${base} threw: ${entry.error} (${entry.duration}ms)`;
  }

  return `${base} args: ${JSON.stringify(entry.args)} → returned: ${JSON.stringify(entry.result)} (${entry.duration}ms)`;
}

function printLog(entry: LogEntry, options: LogOptions): void {
  const message = options.formatter
    ? options.formatter(entry)
    : formatEntry(entry, options.format ?? "text");

  if (entry.error) {
    console.error(message);
  } else if (entry.level === "DEBUG") {
    console.debug(message);
  } else {
    console.log(message);
  }
}

function log(options: LogOptions) {
  return function (fn: Function) {
    const fnName = fn.name || "anonymous";

    return function (...args: unknown[]) {
      const start = Date.now();
      const timestamp = new Date().toISOString();

      function buildEntry(result?: unknown, error?: unknown): LogEntry {
        return {
          level: error ? "ERROR" : options.level,
          fnName,
          args: args.map(safeSerialize),
          result: result !== undefined ? safeSerialize(result) : undefined,
          error: error ? String(error) : undefined,
          duration: Date.now() - start,
          timestamp,
        };
      }

      let result: unknown;
      try {
        result = fn(...args);
      } catch (error) {
        printLog(buildEntry(undefined, error), options);
        throw error;
      }

      if (result instanceof Promise) {
        return result
          .then((resolved) => {
            if (options.level !== "ERROR") {
              printLog(buildEntry(resolved), options);
            }
            return resolved;
          })
          .catch((error) => {
            printLog(buildEntry(undefined, error), options);
            throw error;
          });
      }

      if (options.level !== "ERROR") {
        printLog(buildEntry(result), options);
      }

      return result;
    };
  };
}

export default log;
