export type LoggerStream = "stdout" | "stderr";
export type LoggerMode = "text" | "json";

export type LoggerWriter = {
  write: (chunk: string) => unknown;
};

export type LoggerEntry =
  | {
      kind: "line";
      text: string;
      stream?: LoggerStream;
    }
  | {
      kind: "event";
      level: "info" | "warn" | "success";
      message: string;
      stream?: LoggerStream;
      action?: string;
      target?: string;
      details?: string;
    }
  | {
      kind: "json";
      value: unknown;
      stream?: LoggerStream;
    };

export type Logger = {
  write: (entry: LoggerEntry) => void;
};

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function resolveWriter(
  stdout: LoggerWriter,
  stderr: LoggerWriter,
  stream: LoggerStream,
): LoggerWriter {
  return stream === "stderr" ? stderr : stdout;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function resolveLoggerMode(env: NodeJS.ProcessEnv = process.env): LoggerMode {
  return env.AGENTPLANE_LOG === "json" ? "json" : "text";
}

export function createLogger(streams?: {
  mode?: LoggerMode;
  stdout?: LoggerWriter;
  stderr?: LoggerWriter;
}): Logger {
  const mode = streams?.mode ?? resolveLoggerMode();
  const stdout = streams?.stdout ?? process.stdout;
  const stderr = streams?.stderr ?? process.stderr;

  return {
    write(entry: LoggerEntry): void {
      const stream = entry.stream ?? "stdout";
      const writer = resolveWriter(stdout, stderr, stream);
      if (mode === "text") {
        if (entry.kind === "json") {
          writer.write(ensureTrailingNewline(JSON.stringify(entry.value, null, 2)));
          return;
        }
        writer.write(ensureTrailingNewline(entry.kind === "line" ? entry.text : entry.message));
        return;
      }

      const payload =
        entry.kind === "json"
          ? { ts: nowIso(), kind: entry.kind, stream, value: entry.value }
          : entry.kind === "line"
            ? { ts: nowIso(), kind: entry.kind, stream, text: entry.text }
            : {
                ts: nowIso(),
                kind: entry.kind,
                stream,
                level: entry.level,
                message: entry.message,
                action: entry.action,
                target: entry.target,
                details: entry.details,
              };
      writer.write(ensureTrailingNewline(JSON.stringify(payload)));
    },
  };
}
