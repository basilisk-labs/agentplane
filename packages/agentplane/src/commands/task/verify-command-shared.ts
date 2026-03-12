import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec, OptionSpec, ParsedRaw } from "../../cli/spec/spec.js";

export type VerifyCommonParsed = {
  by: string;
  note: string;
  details?: string;
  file?: string;
  quiet: boolean;
};

export const verifyCommonOptions: readonly OptionSpec[] = [
  { kind: "string", name: "by", valueHint: "<id>", required: true, description: "Verifier id." },
  {
    kind: "string",
    name: "note",
    valueHint: "<text>",
    required: true,
    description: "Short verification note.",
  },
  {
    kind: "string",
    name: "details",
    valueHint: "<text>",
    description: "Optional details text (mutually exclusive with --file).",
  },
  {
    kind: "string",
    name: "file",
    valueHint: "<path>",
    description: "Optional details file path (mutually exclusive with --details).",
  },
  {
    kind: "boolean",
    name: "quiet",
    default: false,
    description: "Suppress normal output (still prints errors).",
  },
] as const;

export function validateVerifyDetailsFileExclusive<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  opts?: { command?: string; message?: string },
): void {
  if (typeof raw.opts.details === "string" && typeof raw.opts.file === "string") {
    throw usageError({
      spec,
      command: opts?.command,
      message: opts?.message ?? "Options --details and --file are mutually exclusive.",
    });
  }
}

export function validateVerifyNonEmptyInput<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  name: "by" | "note",
): void {
  const value = raw.opts[name];
  if (typeof value === "string" && value.trim().length === 0) {
    throw usageError({ spec, message: `Invalid value for --${name}: empty.` });
  }
}

export function parseVerifyCommonOptions(raw: ParsedRaw): VerifyCommonParsed {
  return {
    by: typeof raw.opts.by === "string" ? raw.opts.by : "",
    note: typeof raw.opts.note === "string" ? raw.opts.note : "",
    details: typeof raw.opts.details === "string" ? raw.opts.details : undefined,
    file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
    quiet: raw.opts.quiet === true,
  };
}
