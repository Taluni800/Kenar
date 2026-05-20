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
