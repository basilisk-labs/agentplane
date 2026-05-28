import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import {
  contextCapabilitySpec,
  contextGraphSpec,
  contextHarvestSpec,
  contextSpec,
  contextWikiSpec,
} from "./context.spec.js";
import { contextLearnSpec } from "./context.learn.spec.js";

export function runContextGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return loadDirectSubcommandNames(["context"]).then((subcommands) =>
    throwGroupCommandUsage({
      spec: contextSpec,
      cmd: p.cmd,
      subcommands,
      command: "context",
      contextCommand: "context",
    }),
  );
}

export async function runContextGraphGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  return throwGroupCommandUsage({
    spec: contextGraphSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["context", "graph"]),
    command: "context graph",
    contextCommand: "context graph",
  });
}

export async function runContextWikiGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  return throwGroupCommandUsage({
    spec: contextWikiSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["context", "wiki"]),
    command: "context wiki",
    contextCommand: "context wiki",
  });
}

export async function runContextCapabilityGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  return throwGroupCommandUsage({
    spec: contextCapabilitySpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["context", "capability"]),
    command: "context capability",
    contextCommand: "context capability",
  });
}

export async function runContextHarvestGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  return throwGroupCommandUsage({
    spec: contextHarvestSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["context", "harvest"]),
    command: "context harvest",
    contextCommand: "context harvest",
  });
}

export async function runContextLearnGroup(
  _ctx: CommandCtx,
  p: GroupCommandParsed,
): Promise<number> {
  return throwGroupCommandUsage({
    spec: contextLearnSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["context", "learn"]),
    command: "context learn",
    contextCommand: "context learn",
  });
}
