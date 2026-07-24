import { StringDecoder } from "node:string_decoder";

import { redactTraceText } from "../trace-artifacts.js";
import { createRunnerTraceEvent, serializeRunnerTraceEvent } from "../trace.js";
import { appendTail, splitCompletedLines } from "./streams.js";
import { BufferedFileWriter } from "./buffered-file-writer.js";

export type TraceSession = ReturnType<typeof createTraceSession>;
const MAX_PENDING_STREAM_LINE_CHARACTERS = 32 * 1024 * 1024;
const DEFAULT_MAX_SUPERVISED_OUTPUT_BYTES = 64 * 1024 * 1024;

function assertPendingStreamLineLimit(text: string, stream: string): void {
  if (text.length > MAX_PENDING_STREAM_LINE_CHARACTERS) {
    throw new Error(
      `Runner ${stream} line exceeds the ${MAX_PENDING_STREAM_LINE_CHARACTERS}-character supervision limit.`,
    );
  }
}

function streamChunkBytes(chunk: Buffer | string): number {
  return Buffer.isBuffer(chunk) ? chunk.byteLength : Buffer.byteLength(chunk, "utf8");
}

function decodeStreamChunk(decoder: StringDecoder, chunk: Buffer | string): string {
  return decoder.write(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, "utf8"));
}

export function createTraceSession(opts: {
  adapter_id: string;
  trace_path: string;
  stderr_path: string;
  trace_mode: "off" | "none" | "raw";
  capture_stderr: boolean;
  max_tail_bytes: number;
  max_output_bytes?: number;
  redact_patterns: string[];
  on_error: (err: unknown) => void;
  on_activity: () => void;
  on_stdout_line?: (rawLine: string) => void;
  assert_artifact_boundary?: () => Promise<void>;
}) {
  let stdout_tail = "";
  let stderr_tail = "";
  let stdout_bytes = 0;
  let stderr_bytes = 0;
  let stdout_buffer = "";
  let stderr_buffer = "";
  let trace_seq = 0;
  let streamsFlushed = false;
  const maxOutputBytes = opts.max_output_bytes ?? DEFAULT_MAX_SUPERVISED_OUTPUT_BYTES;
  if (!Number.isSafeInteger(maxOutputBytes) || maxOutputBytes < 1) {
    throw new Error("Runner max_output_bytes must be a positive integer.");
  }
  const stdoutDecoder = new StringDecoder("utf8");
  const stderrDecoder = new StringDecoder("utf8");

  const traceWriter = new BufferedFileWriter({
    file_path: opts.trace_path,
    on_error: opts.on_error,
    before_write: opts.assert_artifact_boundary,
  });
  const stderrWriter = new BufferedFileWriter({
    file_path: opts.stderr_path,
    on_error: opts.on_error,
    before_write: opts.assert_artifact_boundary,
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

  const processStdoutLine = (rawLine: string, completed: boolean) => {
    try {
      opts.on_stdout_line?.(rawLine);
      const persistedLine = redactTraceText(rawLine, opts.redact_patterns);
      stdout_tail = appendTail(
        stdout_tail,
        completed ? `${persistedLine}\n` : persistedLine,
        opts.max_tail_bytes,
      );
      writeTraceLine("stdout", persistedLine);
    } catch (error) {
      opts.on_error(error);
    }
  };

  const processStderrLine = (rawLine: string, completed: boolean) => {
    try {
      const persistedLine = redactTraceText(rawLine, opts.redact_patterns);
      stderr_tail = appendTail(
        stderr_tail,
        completed ? `${persistedLine}\n` : persistedLine,
        opts.max_tail_bytes,
      );
      writeTraceLine("stderr", persistedLine);
      queueAppend("stderr", completed ? `${persistedLine}\n` : persistedLine);
    } catch (error) {
      opts.on_error(error);
    }
  };

  const processDecodedText = (
    currentBuffer: string,
    decodedText: string,
    stream: "stdout" | "stderr",
  ): string => {
    const { lines, remainder } = splitCompletedLines(`${currentBuffer}${decodedText}`);
    for (const line of lines) {
      assertPendingStreamLineLimit(line, stream);
      if (stream === "stdout") {
        processStdoutLine(line, true);
      } else {
        processStderrLine(line, true);
      }
    }
    assertPendingStreamLineLimit(remainder, stream);
    return remainder;
  };

  const flushDecoder = (
    decoder: StringDecoder,
    currentBuffer: string,
    stream: "stdout" | "stderr",
  ): string => {
    const finalText = `${currentBuffer}${decoder.end()}`;
    if (finalText) {
      assertPendingStreamLineLimit(finalText, stream);
      if (stream === "stdout") {
        processStdoutLine(finalText, false);
      } else {
        processStderrLine(finalText, false);
      }
    }
    return "";
  };

  const assertOutputBudget = () => {
    if (stdout_bytes + stderr_bytes > maxOutputBytes) {
      throw new Error(`Runner output exceeded max_output_bytes=${maxOutputBytes}.`);
    }
  };

  return {
    onStdoutData(chunk: Buffer | string) {
      if (streamsFlushed) return;
      opts.on_activity();
      stdout_bytes += streamChunkBytes(chunk);
      try {
        assertOutputBudget();
        stdout_buffer = processDecodedText(
          stdout_buffer,
          decodeStreamChunk(stdoutDecoder, chunk),
          "stdout",
        );
      } catch (error) {
        opts.on_error(error);
      }
    },

    onStderrData(chunk: Buffer | string) {
      if (streamsFlushed) return;
      opts.on_activity();
      stderr_bytes += streamChunkBytes(chunk);
      try {
        assertOutputBudget();
        stderr_buffer = processDecodedText(
          stderr_buffer,
          decodeStreamChunk(stderrDecoder, chunk),
          "stderr",
        );
      } catch (error) {
        opts.on_error(error);
      }
    },

    flushPendingLines() {
      if (streamsFlushed) return;
      streamsFlushed = true;
      stdout_buffer = flushDecoder(stdoutDecoder, stdout_buffer, "stdout");
      stderr_buffer = flushDecoder(stderrDecoder, stderr_buffer, "stderr");
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
