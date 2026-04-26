import { redactTraceText } from "../trace-artifacts.js";
import { createRunnerTraceEvent, serializeRunnerTraceEvent } from "../trace.js";
import { appendTail, splitCompletedLines } from "./streams.js";
import { BufferedFileWriter } from "./buffered-file-writer.js";

export type TraceSession = ReturnType<typeof createTraceSession>;

export function createTraceSession(opts: {
  adapter_id: string;
  trace_path: string;
  stderr_path: string;
  trace_mode: "off" | "none" | "raw";
  capture_stderr: boolean;
  max_tail_bytes: number;
  redact_patterns: string[];
  on_error: (err: unknown) => void;
  on_activity: () => void;
}) {
  let stdout_tail = "";
  let stderr_tail = "";
  let stdout_bytes = 0;
  let stderr_bytes = 0;
  let stdout_buffer = "";
  let stderr_buffer = "";
  let trace_seq = 0;

  const traceWriter = new BufferedFileWriter({
    file_path: opts.trace_path,
    on_error: opts.on_error,
  });
  const stderrWriter = new BufferedFileWriter({
    file_path: opts.stderr_path,
    on_error: opts.on_error,
  });

  const queueAppend = (kind: "trace" | "stderr", text: string) => {
    if (kind === "trace" && opts.trace_mode !== "raw") return;
    if (kind === "stderr" && !opts.capture_stderr) return;
    const writer = kind === "trace" ? traceWriter : stderrWriter;
    writer.append(text);
  };

  const writeTraceLine = (stream: "stdout" | "stderr", raw: string) => {
    trace_seq += 1;
    queueAppend(
      "trace",
      serializeRunnerTraceEvent(
        createRunnerTraceEvent({
          ts: new Date().toISOString(),
          seq: trace_seq,
          stream,
          adapter_id: opts.adapter_id,
          raw,
        }),
      ),
    );
  };

  const flushTraceBuffer = (buffer: string, stream: "stdout" | "stderr"): string => {
    const { lines, remainder } = splitCompletedLines(buffer);
    for (const line of lines) {
      writeTraceLine(stream, line);
    }
    return remainder;
  };

  return {
    onStdoutData(chunk: Buffer | string) {
      const text = chunk.toString();
      const persistedText = redactTraceText(text, opts.redact_patterns);
      opts.on_activity();
      stdout_bytes += Buffer.byteLength(text, "utf8");
      stdout_tail = appendTail(stdout_tail, persistedText, opts.max_tail_bytes);
      stdout_buffer = flushTraceBuffer(`${stdout_buffer}${persistedText}`, "stdout");
    },

    onStderrData(chunk: Buffer | string) {
      const text = chunk.toString();
      const persistedText = redactTraceText(text, opts.redact_patterns);
      opts.on_activity();
      stderr_bytes += Buffer.byteLength(text, "utf8");
      stderr_tail = appendTail(stderr_tail, persistedText, opts.max_tail_bytes);
      stderr_buffer = flushTraceBuffer(`${stderr_buffer}${persistedText}`, "stderr");
      queueAppend("stderr", persistedText);
    },

    flushPendingLines() {
      if (stdout_buffer) {
        writeTraceLine("stdout", stdout_buffer);
        stdout_buffer = "";
      }
      if (stderr_buffer) {
        writeTraceLine("stderr", stderr_buffer);
        stderr_buffer = "";
      }
    },

    async flushWriters() {
      await Promise.all([traceWriter.flush(), stderrWriter.flush()]);
    },

    async flushWritersSettled() {
      await Promise.allSettled([traceWriter.flush(), stderrWriter.flush()]);
    },

    getResult() {
      return {
        stdout_tail,
        stderr_tail,
        stdout_bytes,
        stderr_bytes,
      };
    },
  };
}
