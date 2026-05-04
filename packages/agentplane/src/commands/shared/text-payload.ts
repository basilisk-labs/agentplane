import { readFile } from "node:fs/promises";
import path from "node:path";

import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec, ParsedRaw } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";

type TextPayloadSource = {
  inline: string;
  file: string;
  label: string;
};

const SHELL_RISK_PATTERNS: readonly { pattern: RegExp; label: string }[] = [
  { pattern: /`/, label: "backticks" },
  { pattern: /\$\(/, label: "command substitution" },
  { pattern: /\r|\n/, label: "literal newlines" },
  { pattern: /\$\{[^}]+}/, label: "shell variable expansion" },
];

export function riskyInlineTextReason(value: string): string | null {
  for (const risk of SHELL_RISK_PATTERNS) {
    if (risk.pattern.test(value)) return risk.label;
  }
  return null;
}

export function validateTextPayloadSource<TParsed>(
  raw: ParsedRaw,
  spec: CommandSpec<TParsed>,
  source: TextPayloadSource,
  opts?: { required?: boolean; command?: string },
): void {
  const inline = raw.opts[source.inline];
  const file = raw.opts[source.file];
  const hasInline = typeof inline === "string";
  const hasFile = typeof file === "string";

  if (opts?.required === true && !hasInline && !hasFile) {
    throw usageError({
      spec,
      command: opts.command,
      message: `Missing required option: --${source.inline} (or pass --${source.file}).`,
    });
  }
  if (opts?.required === true && hasInline && hasFile) {
    throw usageError({
      spec,
      command: opts.command,
      message: `Provide exactly one of --${source.inline} or --${source.file}.`,
    });
  }
  if (hasInline && hasFile) {
    throw usageError({
      spec,
      command: opts?.command,
      message: `Options --${source.inline} and --${source.file} are mutually exclusive.`,
    });
  }
  if (hasInline && inline.trim().length === 0) {
    throw usageError({
      spec,
      command: opts?.command,
      message: `Invalid value for --${source.inline}: empty.`,
    });
  }
  if (hasInline) {
    const risk = riskyInlineTextReason(inline);
    if (risk) {
      throw usageError({
        spec,
        command: opts?.command,
        message: `Inline --${source.inline} contains ${risk}; use --${source.file} for ${source.label}.`,
      });
    }
  }
  if (hasFile && file.trim().length === 0) {
    throw usageError({
      spec,
      command: opts?.command,
      message: `Invalid value for --${source.file}: empty.`,
    });
  }
}

export async function resolveTextPayload(opts: {
  cwd: string;
  inline?: string;
  file?: string;
  label: string;
}): Promise<string> {
  if (typeof opts.inline === "string") return opts.inline;
  if (typeof opts.file !== "string") return "";
  try {
    return await readFile(path.resolve(opts.cwd, opts.file), "utf8");
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new CliError({
      code: "E_IO",
      message: `Unable to read ${opts.label} file: ${opts.file} (${message})`,
    });
  }
}
