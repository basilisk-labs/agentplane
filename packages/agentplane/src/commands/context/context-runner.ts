import type { CommandCtx } from "../../cli/spec/spec.js";
import { cmdContextIngest, type ContextIngestParsed } from "./ingest.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextShow } from "./show.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import {
  cmdContextWikiExplain,
  cmdContextWikiIndex,
  cmdContextWikiLink,
  cmdContextWikiLint,
  cmdContextWikiNew,
} from "./wiki.js";
import { cmdContextHarvestTasks, type ContextHarvestTasksParsed } from "./harvest-tasks.js";
import {
  cmdContextGraphSummary,
  cmdContextGraphShow,
  cmdContextGraphNeighbors,
  cmdContextGraphValidate,
  cmdContextGraphExport,
} from "./graph.js";
import { cmdContextExtractionApply } from "./extraction.js";
import {
  cmdContextCapabilityValidate,
  cmdContextCapabilitySearch,
  cmdContextCapabilityDiscover,
} from "./capability.js";
export {
  runContextCapabilityGroup,
  runContextGraphGroup,
  runContextGroup,
  runContextHarvestGroup,
  runContextLearnGroup,
  runContextWikiGroup,
} from "./context-groups.js";
export { runContextInit } from "./context-init-runner.js";

export async function runContextIngest(_ctx: CommandCtx, p: ContextIngestParsed): Promise<number> {
  return await cmdContextIngest({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextLearnFiles(
  _ctx: CommandCtx,
  p: { sources: string[]; dryRun: boolean },
): Promise<number> {
  return await cmdContextIngest({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: {
      sources: p.sources,
      mode: "sources",
      dryRun: p.dryRun,
      indexOnly: false,
    },
  });
}

export async function runContextLearnChanges(
  _ctx: CommandCtx,
  p: { dryRun: boolean },
): Promise<number> {
  return await cmdContextIngest({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: {
      sources: [],
      mode: "changed",
      dryRun: p.dryRun,
      indexOnly: false,
    },
  });
}

export async function runContextLearnTasks(
  _ctx: CommandCtx,
  p: {
    status: string[];
    tag: string[];
    task: string[];
    since: string;
    until: string;
    afterTask: string;
    limit: string;
    batchSize: string;
    dryRun: boolean;
    format: "text" | "json";
  },
): Promise<number> {
  return await cmdContextHarvestTasks({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: {
      status: p.status,
      tag: p.tag,
      task: p.task,
      since: p.since,
      until: p.until,
      afterTask: p.afterTask,
      limit: p.limit,
      writeProposals: false,
      createExtractionTasks: true,
      batchSize: p.batchSize,
      promote: false,
      dryRun: p.dryRun,
      format: p.format,
    },
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

export async function runContextCheck(_ctx: CommandCtx, p: { fix: boolean }): Promise<number> {
  return await cmdContextDoctor({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: { ...p, label: "check" },
  });
}

export async function runContextDoctor(_ctx: CommandCtx, p: { fix: boolean }): Promise<number> {
  return await cmdContextDoctor({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: { ...p, label: "doctor" },
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

export async function runContextWikiNew(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiNew>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiNew({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export async function runContextWikiLint(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiLint>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiLint({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export async function runContextWikiExplain(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiExplain>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiExplain({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextWikiLink(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiLink>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiLink({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export async function runContextWikiIndex(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiIndex>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiIndex({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
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

export async function runContextExtractionApply(
  _ctx: CommandCtx,
  p: { file: string; taskId: string; dryRun: boolean },
): Promise<number> {
  return await cmdContextExtractionApply({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
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
  contextExtractionApplySpec,
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
  contextWikiExplainSpec,
  contextWikiIndexSpec,
  contextWikiLinkSpec,
  contextWikiLintSpec,
  contextWikiNewSpec,
  contextWikiSpec,
} from "./context.spec.js";
export {
  contextCheckSpec,
  contextLearnChangesSpec,
  contextLearnFilesSpec,
  contextLearnSpec,
  contextLearnTasksSpec,
} from "./context.learn.spec.js";
export { contextIngestSpec } from "./ingest.spec.js";
