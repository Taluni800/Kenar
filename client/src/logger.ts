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
