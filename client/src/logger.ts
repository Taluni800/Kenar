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
