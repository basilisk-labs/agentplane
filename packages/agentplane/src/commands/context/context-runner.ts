import type { CommandCtx } from "../../cli/spec/spec.js";
import { createCliEmitter } from "../../cli/output.js";
import { generateAcr, validateAcrTarget, writeAcrFile } from "../acr/acr.command.js";
import { executeEvaluatorCommand } from "../evaluator/evaluator.command.js";
import { createEvaluatorArtifactPreparationPort } from "../evaluator/evaluator-artifact-port.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { runContextAssimilationSupervisor } from "./assimilation-supervisor.js";
import { cmdContextIngest, type ContextIngestParsed } from "./ingest.js";
import { cmdContextMigrate } from "./migrate.js";
import { cmdContextReindex } from "./reindex.js";
import { cmdContextDashboard } from "./dashboard.js";
import { cmdContextSearch } from "./search.js";
import { cmdContextShow } from "./show.js";
import { cmdContextDoctor } from "./doctor.js";
import { cmdContextVerifyTask } from "./verify-task.js";
import { cmdContextFinalizeTask } from "./finalize.js";
import {
  cmdContextWikiExplain,
  cmdContextWikiIndex,
  cmdContextWikiLink,
  cmdContextWikiLint,
  cmdContextWikiNew,
} from "./wiki.js";
import { cmdContextWikiReport } from "./wiki-reports.js";
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

const output = createCliEmitter();

export type ContextTaskCommandDeps = {
  getCommandContext: (ctx: CommandCtx, command: string) => Promise<CommandContext>;
};

const DEFAULT_CONTEXT_TASK_COMMAND_DEPS: ContextTaskCommandDeps = {
  getCommandContext: async (ctx) =>
    await loadCommandContext({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null }),
};

export async function runContextIngest(_ctx: CommandCtx, p: ContextIngestParsed): Promise<number> {
  return await cmdContextIngest({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export async function runContextMigrate(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextMigrate>[0]["parsed"],
): Promise<number> {
  return await cmdContextMigrate({
    cwd: _ctx.cwd,
    rootOverride: _ctx.rootOverride,
    parsed: p,
  });
}

export function makeRunContextLearnFilesHandler(
  deps: ContextTaskCommandDeps,
): (ctx: CommandCtx, parsed: { sources: string[]; dryRun: boolean }) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context learn files");
    return await cmdContextIngest({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed: {
        sources: parsed.sources,
        mode: "sources",
        dryRun: parsed.dryRun,
        indexOnly: false,
      },
    });
  };
}

export const runContextLearnFiles = makeRunContextLearnFilesHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

export function makeRunContextLearnChangesHandler(
  deps: ContextTaskCommandDeps,
): (ctx: CommandCtx, parsed: { dryRun: boolean }) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context learn changes");
    return await cmdContextIngest({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed: {
        sources: [],
        mode: "changed",
        dryRun: parsed.dryRun,
        indexOnly: false,
      },
    });
  };
}

export const runContextLearnChanges = makeRunContextLearnChangesHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

type ContextLearnTasksParsed = {
  status: string[];
  tag: string[];
  task: string[];
  since: string;
  until: string;
  afterTask: string;
  limit: string;
  batchSize: string;
  batchBytes: string;
  dryRun: boolean;
  format: "text" | "json";
};

export function makeRunContextLearnTasksHandler(
  deps: ContextTaskCommandDeps,
): (ctx: CommandCtx, parsed: ContextLearnTasksParsed) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context learn tasks");
    return await cmdContextHarvestTasks({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed: {
        status: parsed.status,
        tag: parsed.tag,
        task: parsed.task,
        since: parsed.since,
        until: parsed.until,
        afterTask: parsed.afterTask,
        limit: parsed.limit,
        writeProposals: !parsed.dryRun,
        createExtractionTasks: parsed.task.length === 1,
        batchSize: parsed.batchSize,
        batchBytes: parsed.batchBytes,
        promote: false,
        dryRun: parsed.dryRun,
        format: parsed.format,
      },
    });
  };
}

export const runContextLearnTasks = makeRunContextLearnTasksHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

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

export async function runContextDashboard(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextDashboard>[0]["parsed"],
): Promise<number> {
  return await cmdContextDashboard({
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

export function makeRunContextVerifyTaskHandler(
  deps: ContextTaskCommandDeps,
  verifyTask: typeof cmdContextVerifyTask = cmdContextVerifyTask,
): (ctx: CommandCtx, parsed: { taskId: string }) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context verify-task");
    return await verifyTask({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed,
    });
  };
}

export const runContextVerifyTask = makeRunContextVerifyTaskHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

export function makeRunContextFinalizeTaskHandler(
  deps: ContextTaskCommandDeps,
  finalizeTask: typeof cmdContextFinalizeTask = cmdContextFinalizeTask,
): (ctx: CommandCtx, parsed: { taskId: string }) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context finalize-task");
    return await finalizeTask({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed,
    });
  };
}

export const runContextFinalizeTask = makeRunContextFinalizeTaskHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

export type ContextSuperviseTaskParsed = {
  taskId: string;
  extractionFile: string;
  smokeQuery: string;
  evaluator: string;
  json: boolean;
};

export async function superviseContextTask(
  ctx: CommandCtx,
  parsed: ContextSuperviseTaskParsed,
  deps: ContextTaskCommandDeps,
) {
  const command = await deps.getCommandContext(ctx, "context supervise-task");
  const result = await runContextAssimilationSupervisor(
    {
      command,
      ctx,
      extractionFile: parsed.extractionFile,
      smokeQuery: parsed.smokeQuery,
      taskId: parsed.taskId,
    },
    {
      runEvaluator: async () => {
        await executeEvaluatorCommand(
          ctx,
          {
            taskId: parsed.taskId,
            evaluator: parsed.evaluator,
            replacement: false,
            json: true,
          },
          {
            getCommandContext: () => Promise.resolve(command),
            getEvaluatorArtifactPort: () =>
              Promise.resolve(createEvaluatorArtifactPreparationPort(command)),
          },
        );
      },
      createAcr: async () => {
        const generated = await generateAcr({
          ctx: command,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride,
          taskId: parsed.taskId,
          workCommit: "HEAD",
          write: true,
          refresh: true,
        });
        if (!generated.acrPath) throw new Error("ACR generation did not resolve an output path.");
        await writeAcrFile({
          acrPath: generated.acrPath,
          record: generated.record,
          refresh: true,
        });
        return { path: generated.acrPath, warnings: generated.warnings };
      },
      checkAcr: async () =>
        await validateAcrTarget({
          ctx: command,
          target: parsed.taskId,
          mode: "local",
          strict: true,
          allowManualOverride: false,
          allowWaivedVerification: false,
          requirePlanApproved: false,
          requirePolicyPass: false,
          requireVerification: false,
        }),
    },
  );
  return result;
}

export function makeRunContextSuperviseTaskHandler(
  deps: ContextTaskCommandDeps,
): (ctx: CommandCtx, parsed: ContextSuperviseTaskParsed) => Promise<number> {
  return async (ctx, parsed) => {
    const result = await superviseContextTask(ctx, parsed, deps);
    if (parsed.json) output.json(result);
    else {
      output.line(
        `context supervise-task ${parsed.taskId}: ${result.status} phase=${result.phase} ` +
          `episode=${result.episode_path}` +
          (result.rework_work_order ? ` rework=${result.rework_work_order}` : ""),
      );
    }
    return 0;
  };
}

export const runContextSuperviseTask = makeRunContextSuperviseTaskHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

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

export async function runContextWikiReport(
  _ctx: CommandCtx,
  p: Parameters<typeof cmdContextWikiReport>[0]["parsed"],
): Promise<number> {
  return await cmdContextWikiReport({ cwd: _ctx.cwd, rootOverride: _ctx.rootOverride, parsed: p });
}

export function makeRunContextHarvestTasksHandler(
  deps: ContextTaskCommandDeps,
): (ctx: CommandCtx, parsed: ContextHarvestTasksParsed) => Promise<number> {
  return async (ctx, parsed) => {
    const command = await deps.getCommandContext(ctx, "context harvest tasks");
    return await cmdContextHarvestTasks({
      ctx: command,
      cwd: ctx.cwd,
      rootOverride: command.resolvedProject.gitRoot,
      parsed,
    });
  };
}

export const runContextHarvestTasks = makeRunContextHarvestTasksHandler(
  DEFAULT_CONTEXT_TASK_COMMAND_DEPS,
);

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
  p: { file: string; taskId: string; dryRun: boolean; synthesizeWiki?: boolean },
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
  contextDashboardSpec,
  contextDoctorSpec,
  contextExtractionApplySpec,
  contextSuperviseTaskSpec,
  contextGraphExportSpec,
  contextGraphNeighborsSpec,
  contextGraphShowSpec,
  contextGraphSummarySpec,
  contextGraphValidateSpec,
  contextHarvestSpec,
  contextHarvestTasksSpec,
  contextMigrateSpec,
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
