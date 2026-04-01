export type CliOutputWriter = {
  write: (chunk: string) => unknown;
};

export type CliEmitterStream = "stdout" | "stderr";

export type CliReportEntry =
  | string
  | {
      label: string;
      value?: string | number | boolean | null;
    };

export type CliReportOptions = {
  header?: string;
  stream?: CliEmitterStream;
};

export type CliEmitter = {
  line: (text: string, stream?: CliEmitterStream) => void;
  lines: (lines: Iterable<string>, stream?: CliEmitterStream) => void;
  json: (value: unknown, stream?: CliEmitterStream) => void;
  jsonSection: (
    label: string,
    value: unknown,
    options?: {
      indent?: string;
      stream?: CliEmitterStream;
    },
  ) => void;
  report: (entries: Iterable<CliReportEntry>, options?: CliReportOptions) => void;
  info: (message: string, stream?: CliEmitterStream) => void;
  warn: (message: string, stream?: CliEmitterStream) => void;
  success: (action: string, target?: string, details?: string, stream?: CliEmitterStream) => void;
};

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function renderReportLine(entry: CliReportEntry): string {
  if (typeof entry === "string") return entry;
  if (entry.value === undefined || entry.value === null) return `${entry.label}:`;
  return `${entry.label}: ${String(entry.value)}`;
}

function resolveWriter(
  stdout: CliOutputWriter,
  stderr: CliOutputWriter,
  stream: CliEmitterStream,
): CliOutputWriter {
  return stream === "stderr" ? stderr : stdout;
}

function writeChunk(writer: CliOutputWriter, text: string): void {
  writer.write(text);
}

export function successMessage(action: string, target?: string, details?: string): string {
  const base = target ? `${action} ${target}` : action;
  const suffix = details ? ` (${details})` : "";
  return `✅ ${base}${suffix}`;
}

export function infoMessage(message: string): string {
  return `ℹ️ ${message}`;
}

export function warnMessage(message: string): string {
  return `⚠️ ${message}`;
}

export function usageMessage(usage: string, example?: string): string {
  return example ? `${usage}\nExample: ${example}` : usage;
}

export function backendNotSupportedMessage(feature: string): string {
  return `Backend does not support ${feature}`;
}

export function missingValueMessage(flag: string): string {
  return `Missing value for ${flag} (expected value after flag)`;
}

export function invalidValueMessage(label: string, value: string, expected: string): string {
  return `Invalid ${label}: ${value} (expected ${expected})`;
}

export function invalidValueForFlag(flag: string, value: string, expected: string): string {
  return invalidValueMessage(`value for ${flag}`, value, expected);
}

export function unknownEntityMessage(entity: string, value: string): string {
  return `Unknown ${entity}: ${value}`;
}

export function emptyStateMessage(resource: string, hint?: string): string {
  return `No ${resource} found.${hint ? ` ${hint}` : ""}`;
}

export function requiredFieldMessage(field: string, source?: string): string {
  return `Missing required field: ${field}${source ? ` (${source})` : ""}`;
}

export function invalidFieldMessage(field: string, expected: string, source?: string): string {
  return `Invalid field ${field}: expected ${expected}${source ? ` (${source})` : ""}`;
}

export function invalidPathMessage(field: string, reason: string, source?: string): string {
  return `Invalid ${field}: ${reason}${source ? ` (${source})` : ""}`;
}

export function missingFileMessage(filename: string, rootHint?: string): string {
  return `Missing ${filename}${rootHint ? ` at ${rootHint}` : ""}`;
}

export function workflowModeMessage(actual: string | undefined, expected: string): string {
  return `Invalid workflow_mode: ${actual ?? "unknown"} (expected ${expected})`;
}

function renderPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function renderTextLine(text: string): string {
  return ensureTrailingNewline(text);
}

function renderTextLines(lines: Iterable<string>): string {
  return Array.from(lines, renderTextLine).join("");
}

function renderReportBlock(entries: Iterable<CliReportEntry>, options?: CliReportOptions): string {
  const lines = options?.header ? [options.header] : [];
  for (const entry of entries) {
    lines.push(renderReportLine(entry));
  }
  return renderTextLines(lines);
}

function renderJsonSectionBlock(label: string, value: unknown, indent: string): string | null {
  const payload = renderPrettyJson(value);
  if (!payload) return null;
  return renderTextLines([`${label}:`, ...payload.split("\n").map((line) => `${indent}${line}`)]);
}

export function createCliEmitter(streams?: {
  stdout?: CliOutputWriter;
  stderr?: CliOutputWriter;
}): CliEmitter {
  const stdout = streams?.stdout ?? process.stdout;
  const stderr = streams?.stderr ?? process.stderr;

  const line = (text: string, stream: CliEmitterStream = "stdout"): void => {
    writeChunk(resolveWriter(stdout, stderr, stream), renderTextLine(text));
  };

  const lines = (values: Iterable<string>, stream: CliEmitterStream = "stdout"): void => {
    writeChunk(resolveWriter(stdout, stderr, stream), renderTextLines(values));
  };

  const json = (value: unknown, stream: CliEmitterStream = "stdout"): void => {
    line(renderPrettyJson(value), stream);
  };

  const jsonSection = (
    label: string,
    value: unknown,
    options?: {
      indent?: string;
      stream?: CliEmitterStream;
    },
  ): void => {
    const block = renderJsonSectionBlock(label, value, options?.indent ?? "  ");
    if (!block) return;
    writeChunk(resolveWriter(stdout, stderr, options?.stream ?? "stdout"), block);
  };

  const report = (entries: Iterable<CliReportEntry>, options?: CliReportOptions): void => {
    writeChunk(
      resolveWriter(stdout, stderr, options?.stream ?? "stdout"),
      renderReportBlock(entries, options),
    );
  };

  return {
    line,
    lines,
    json,
    jsonSection,
    report,
    info: (message: string, stream: CliEmitterStream = "stdout") => {
      line(infoMessage(message), stream);
    },
    warn: (message: string, stream: CliEmitterStream = "stderr") => {
      line(warnMessage(message), stream);
    },
    success: (
      action: string,
      target?: string,
      details?: string,
      stream: CliEmitterStream = "stdout",
    ) => {
      line(successMessage(action, target, details), stream);
    },
  };
}
