import { usageError } from "./spec/errors.js";
import { suggestOne } from "./spec/suggest.js";
import type { CommandId, CommandSpec, ParsedRaw } from "./spec/spec.js";

export type GroupCommandParsed = {
  cmd: string[];
};

export function parseGroupCommand(raw: ParsedRaw, argName = "cmd"): GroupCommandParsed {
  const value = raw.args[argName];
  if (Array.isArray(value)) return { cmd: value.map(String) };
  if (typeof value === "string" && value.length > 0) return { cmd: [value] };
  return { cmd: [] };
}

export function directSubcommandNames(
  prefix: CommandId,
  specs: readonly CommandSpec<unknown>[],
): string[] {
  return directSubcommandNamesFromIds(
    prefix,
    specs.map((spec) => spec.id),
  );
}

export function directSubcommandNamesFromIds(
  prefix: CommandId,
  ids: readonly CommandId[],
): string[] {
  const names = new Set<string>();
  for (const id of ids) {
    if (id.length <= prefix.length) continue;
    if (!prefix.every((segment, index) => id[index] === segment)) continue;
    const next = id[prefix.length];
    if (typeof next === "string" && next.length > 0) names.add(next);
  }
  return [...names].toSorted((left, right) => left.localeCompare(right));
}

export async function loadDirectSubcommandNames(prefix: CommandId): Promise<readonly string[]> {
  // Lazy-load the catalog to avoid a static cycle between group roots and catalog bootstrap.
  const { getDirectChildCommandNames } = await import("./run-cli/command-catalog.js");
  return getDirectChildCommandNames(prefix);
}

export function throwGroupCommandUsage(opts: {
  spec: CommandSpec<unknown>;
  cmd: readonly string[];
  subcommands: readonly string[];
  command?: string;
  contextCommand?: string;
  missingMessage?: string;
  unknownMessage?: (subcommand: string) => string;
}): never {
  const input = opts.cmd.join(" ");
  const suggestion = suggestOne(input, [...opts.subcommands]);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const message =
    opts.cmd.length === 0
      ? (opts.missingMessage ?? "Missing subcommand.")
      : `${opts.unknownMessage?.(opts.cmd[0] ?? "") ?? `Unknown subcommand: ${opts.cmd[0]}.`}${suffix}`;
  throw usageError({
    spec: opts.spec,
    command: opts.command,
    message,
    context: opts.contextCommand ? { command: opts.contextCommand } : undefined,
  });
}
