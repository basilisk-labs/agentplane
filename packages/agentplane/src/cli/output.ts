import { createLogger, type Logger, type LoggerMode } from "@agentplaneorg/core";

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

export type CommandResult =
  | {
      kind: "line";
      text: string;
      stream?: CliEmitterStream;
    }
  | {
      kind: "info";
      message: string;
      stream?: CliEmitterStream;
    }
  | {
      kind: "warn";
      message: string;
      stream?: CliEmitterStream;
    }
  | {
      kind: "success";
      action: string;
      target?: string;
      details?: string;
      stream?: CliEmitterStream;
    }
  | {
      kind: "json";
      value: unknown;
      stream?: CliEmitterStream;
    }
  | {
      kind: "report";
      entries: Iterable<CliReportEntry>;
      options?: CliReportOptions;
    };

function ensureTrailingNewline(text: string): string {
  return text.endsWith("\n") ? text : `${text}\n`;
}

function renderReportLine(entry: CliReportEntry): string {
  if (typeof entry === "string") return entry;
  if (entry.value === undefined || entry.value === null) return `${entry.label}:`;
  return `${entry.label}: ${String(entry.value)}`;
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
  loggerMode?: LoggerMode;
  logger?: Logger;
}): CliEmitter {
  const stdout = streams?.stdout ?? process.stdout;
  const stderr = streams?.stderr ?? process.stderr;
  const logger = streams?.logger ?? createLogger({ mode: streams?.loggerMode, stdout, stderr });

  const line = (text: string, stream: CliEmitterStream = "stdout"): void => {
    logger.write({ kind: "line", text, stream });
  };

  const lines = (values: Iterable<string>, stream: CliEmitterStream = "stdout"): void => {
    for (const value of values) {
      logger.write({ kind: "line", text: value, stream });
    }
  };

  const json = (value: unknown, stream: CliEmitterStream = "stdout"): void => {
    logger.write({ kind: "json", value, stream });
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
    for (const valueLine of block.trimEnd().split("\n")) {
      logger.write({ kind: "line", text: valueLine, stream: options?.stream ?? "stdout" });
    }
  };

  const report = (entries: Iterable<CliReportEntry>, options?: CliReportOptions): void => {
    const block = renderReportBlock(entries, options);
    for (const valueLine of block.trimEnd().split("\n")) {
      logger.write({ kind: "line", text: valueLine, stream: options?.stream ?? "stdout" });
    }
  };

  return {
    line,
    lines,
    json,
    jsonSection,
    report,
    info: (message: string, stream: CliEmitterStream = "stdout") => {
      logger.write({ kind: "event", level: "info", message: infoMessage(message), stream });
    },
    warn: (message: string, stream: CliEmitterStream = "stderr") => {
      logger.write({ kind: "event", level: "warn", message: warnMessage(message), stream });
    },
    success: (
      action: string,
      target?: string,
      details?: string,
      stream: CliEmitterStream = "stdout",
    ) => {
      logger.write({
        kind: "event",
        level: "success",
        message: successMessage(action, target, details),
        stream,
        action,
        target,
        details,
      });
    },
  };
}

export function emitCommandResult(emitter: CliEmitter, result: CommandResult): void {
  switch (result.kind) {
    case "line": {
      emitter.line(result.text, result.stream);
      return;
    }
    case "info": {
      emitter.info(result.message, result.stream);
      return;
    }
    case "warn": {
      emitter.warn(result.message, result.stream);
      return;
    }
    case "success": {
      emitter.success(result.action, result.target, result.details, result.stream);
      return;
    }
    case "json": {
      emitter.json(result.value, result.stream);
      return;
    }
    case "report": {
      emitter.report(result.entries, result.options);
      return;
    }
  }
}

export function emitCommandResults(emitter: CliEmitter, results: Iterable<CommandResult>): void {
  for (const result of results) {
    emitCommandResult(emitter, result);
  }
}
