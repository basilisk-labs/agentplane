/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { ContextInitParsed } from "./context.spec.js";
import { cmdContextIngest, type ContextIngestParsed } from "./ingest.js";
import { cmdContextInit } from "./init.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextShow } from "./show.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import { cmdContextHarvestTasks, type ContextHarvestTasksParsed } from "./harvest-tasks.js";
import {
  cmdContextGraphSummary,
  cmdContextGraphShow,
  cmdContextGraphNeighbors,
  cmdContextGraphValidate,
  cmdContextGraphExport,
} from "./graph.js";
import {
  cmdContextCapabilityValidate,
  cmdContextCapabilitySearch,
  cmdContextCapabilityDiscover,
} from "./capability.js";
import {
  contextCapabilitySpec,
  contextCapabilityDiscoverSpec,
  contextCapabilitySearchSpec,
  contextCapabilityValidateSpec,
  contextDoctorSpec,
  contextGraphExportSpec,
  contextGraphNeighborsSpec,
  contextGraphShowSpec,
  contextGraphSummarySpec,
  contextGraphValidateSpec,
  contextHarvestSpec,
  contextHarvestTasksSpec,
  contextReindexSpec,
  contextSearchSpec,
  contextShowSpec,
  contextSpec,
  contextGraphSpec,
} from "./context.spec.js";

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

export async function runContextIngest(_ctx: CommandCtx, p: ContextIngestParsed): Promise<number> {
  return await cmdContextIngest({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextInit(_ctx: CommandCtx, p: ContextInitParsed): Promise<number> {
  return await cmdContextInit({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextReindex(
  _ctx: CommandCtx,
  p: { includeTasks: boolean; includeRaw: boolean; reset: boolean },
): Promise<number> {
  return await cmdContextReindex({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextSearch(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextSearch>[0]["parsed"],
): Promise<number> {
  return await cmdContextSearch({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextShow(_ctx: CommandCtx, p: { ref: string }): Promise<number> {
  return await cmdContextShow({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextDoctor(_ctx: CommandCtx, p: { fix: boolean }): Promise<number> {
  return await cmdContextDoctor({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextVerifyTask(
  _ctx: CommandCtx,
  p: { taskId: string },
): Promise<number> {
  return await cmdContextVerifyTask({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextHarvestTasks(
  _ctx: CommandCtx,
  p: ContextHarvestTasksParsed,
): Promise<number> {
  return await cmdContextHarvestTasks({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextGraphSummary(
  _ctx: CommandCtx,
  p: Record<string, never>,
): Promise<number> {
  return await cmdContextGraphSummary({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextGraphShow(_ctx: CommandCtx, p: { id: string }): Promise<number> {
  return await cmdContextGraphShow({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export async function runContextGraphNeighbors(
  _ctx: CommandCtx,
  p: { id: string },
): Promise<number> {
  return await cmdContextGraphNeighbors({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextGraphValidate(
  _ctx: CommandCtx,
  p: Record<string, never>,
): Promise<number> {
  return await cmdContextGraphValidate({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextGraphExport(
  _ctx: CommandCtx,
  p: { format: "json" | "jsonl" | "csv" },
): Promise<number> {
  return await cmdContextGraphExport({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export async function runContextCapabilityValidate(
  _ctx: CommandCtx,
  p: { path: string },
): Promise<number> {
  return await cmdContextCapabilityValidate({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextCapabilitySearch(
  _ctx: CommandCtx,
  p: { query: string },
): Promise<number> {
  return await cmdContextCapabilitySearch({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextCapabilityDiscover(
  _ctx: CommandCtx,
  p: { from: string; minSupport: string; writeProposals: boolean },
): Promise<number> {
  return await cmdContextCapabilityDiscover({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export {
  contextCapabilityDiscoverSpec,
  contextCapabilitySearchSpec,
  contextCapabilityValidateSpec,
  contextDoctorSpec,
  contextGraphExportSpec,
  contextGraphNeighborsSpec,
  contextGraphShowSpec,
  contextGraphSummarySpec,
  contextGraphValidateSpec,
  contextHarvestSpec,
  contextHarvestTasksSpec,
  contextReindexSpec,
  contextSearchSpec,
  contextShowSpec,
} from "./context.spec.js";
export { contextIngestSpec } from "./ingest.spec.js";
