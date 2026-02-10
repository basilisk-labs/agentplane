import { usageError } from "./errors.js";
import type { CommandSpec } from "./spec.js";

export function asTrimmedString(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value).trim();
  }
  // Treat all other values as invalid for "string list" purposes.
  return "";
}

export function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((x) => asTrimmedString(x)).filter(Boolean);
}

export function assertNonEmptyStrings(opts: {
  list: readonly string[];
  flagName: string;
  spec: CommandSpec<unknown>;
  command: string;
  message?: string;
}): void {
  if (
    opts.list.length > 0 &&
    opts.list.every((s) => typeof s === "string" && s.trim().length > 0)
  ) {
    return;
  }
  throw usageError({
    spec: opts.spec,
    command: opts.command,
    message: opts.message ?? `Invalid value for ${opts.flagName}: expected one or more strings.`,
  });
}
