import { readFile } from "node:fs/promises";
import path from "node:path";
import { advanceSupervisorExecutionEpisodeState } from "@agentplaneorg/core/schemas";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { createCliEmitter } from "../../cli/output.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { EvaluatorModule } from "../../evaluators/catalog.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  evaluatorSpec,
  type EvaluatorApplyParsed,
  type EvaluatorExecuteParsed,
  type EvaluatorPrepareParsed,
  type EvaluatorRunParsed,
} from "./evaluator.spec.js";
import { loadEvaluatorCatalogForCommand } from "./evaluator-catalog.command.js";
import type { PreparedEvaluatorReview } from "./evaluator-review-usecase.js";
import { applyEvaluatorSgrReview, applyHumanEvaluatorReview } from "./evaluator-review-apply.js";
import { executeEvaluatorSupervisorEpisode } from "./evaluator-execute-supervisor.js";
import {
  createEvaluatorArtifactPreparationPort,
  type EvaluatorArtifactPreparationPort,
} from "./evaluator-artifact-port.js";

const output = createCliEmitter();

export type EvaluatorCommandDeps = {
  getCommandContext: (
    ctx: CommandCtx,
    command: string,
  ) => Promise<Awaited<ReturnType<typeof loadCommandContext>>>;
};

export type EvaluatorArtifactCommandDeps = {
  getEvaluatorArtifactPort: (
    ctx: CommandCtx,
    command: string,
  ) => Promise<EvaluatorArtifactPreparationPort>;
};

export type EvaluatorReviewCommandDeps = EvaluatorCommandDeps & EvaluatorArtifactCommandDeps;

const DEFAULT_EVALUATOR_COMMAND_DEPS: EvaluatorCommandDeps = {
  getCommandContext: async (ctx) =>
    await loadCommandContext({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null }),
};

const DEFAULT_EVALUATOR_ARTIFACT_DEPS: EvaluatorArtifactCommandDeps = {
  getEvaluatorArtifactPort: async (ctx) =>
    createEvaluatorArtifactPreparationPort(
      await DEFAULT_EVALUATOR_COMMAND_DEPS.getCommandContext(ctx, "evaluator artifacts"),
    ),
};

const DEFAULT_EVALUATOR_REVIEW_DEPS: EvaluatorReviewCommandDeps = {
  ...DEFAULT_EVALUATOR_COMMAND_DEPS,
  ...DEFAULT_EVALUATOR_ARTIFACT_DEPS,
};

export {
  evaluatorApplySpec,
  evaluatorListSpec,
  evaluatorPrepareSpec,
  evaluatorRunSpec,
  evaluatorShowSpec,
  evaluatorSpec,
} from "./evaluator.spec.js";
export { evaluatorExecuteSpec } from "./evaluator.spec.js";
export {
  listEvaluators,
  runEvaluatorList,
  runEvaluatorShow,
  showEvaluator,
  type EvaluatorListResult,
  type EvaluatorShowResult,
} from "./evaluator-catalog.command.js";

export async function runEvaluatorGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return throwGroupCommandUsage({
    spec: evaluatorSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["evaluator"]),
    command: "evaluator",
    contextCommand: "evaluator",
  });
}

function assertRunnableReviewInput(parsed: EvaluatorRunParsed): void {
  if (parsed.provenance !== "human_supplied" && parsed.provenance !== "evaluator_supplied") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide --provenance for evaluator run.",
    });
  }
  if (!parsed.summary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide --summary for evaluator run.",
    });
  }
  if ((parsed.verdict === "pass" || parsed.verdict === "rework") && parsed.findings.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `EVALUATOR ${parsed.verdict} requires at least one --finding.`,
    });
  }
  if (parsed.record && parsed.evidenceRefs.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Recording quality_review requires at least one --evidence reference.",
    });
  }
}

async function loadEvaluatorReviewContext(opts: {
  ctx: CommandCtx;
  taskId: string;
  evaluatorId: string;
  deps: EvaluatorCommandDeps;
}): Promise<{
  command: Awaited<ReturnType<typeof loadCommandContext>>;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  evaluator: EvaluatorModule;
}> {
  const rows = await loadEvaluatorCatalogForCommand(opts.ctx, true);
  const evaluator = rows.find((row) => row.id === opts.evaluatorId);
  if (!evaluator) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${opts.evaluatorId}`,
    });
  }
  const command = await opts.deps.getCommandContext(opts.ctx, "evaluator review");
  const task = await loadTaskFromContext({ ctx: command, taskId: opts.taskId });
  return { command, task, evaluator };
}

function renderEvaluatorPayload(opts: {
  json: boolean;
  title: string;
  payload: Record<string, unknown>;
}): void {
  if (opts.json) {
    output.json(opts.payload);
    return;
  }
  output.line(
    [
      opts.title,
      ...Object.entries(opts.payload)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key.replaceAll("_", " ")}: ${String(value)}`),
    ].join("\n"),
  );
}

function projectPath(gitRoot: string, value: string, label: string): string {
  const absolute = path.resolve(gitRoot, value);
  const relative = path.relative(gitRoot, absolute);
  if (
    !relative ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new CliError({ code: "E_USAGE", message: `${label} must be inside the project root.` });
  }
  return absolute;
}

export type EvaluatorPrepareResult = {
  work_order_id: string;
  work_order: string;
  prompt: string;
  evaluated_sha: string | null;
  sandbox: string;
};

export async function prepareEvaluatorCommand(
  ctx: CommandCtx,
  parsed: EvaluatorPrepareParsed,
  deps: EvaluatorArtifactCommandDeps,
): Promise<EvaluatorPrepareResult> {
  const artifacts = await deps.getEvaluatorArtifactPort(ctx, "evaluator prepare");
  const packet = await artifacts.prepare({
    ctx,
    taskId: parsed.taskId,
    evaluatorId: parsed.evaluator,
    provenance: "evaluator_supplied",
  });
  const { prepared } = packet;
  return {
    work_order_id: prepared.work_order.work_order_id,
    work_order: relativeToProject(packet.git_root, prepared.work_order_path),
    prompt: relativeToProject(packet.git_root, prepared.prompt_path),
    evaluated_sha: prepared.work_order.evaluated_sha,
    sandbox: prepared.work_order.authority.sandbox,
  };
}

export function makeRunEvaluatorPrepareHandler(
  deps: EvaluatorArtifactCommandDeps,
): CommandHandler<EvaluatorPrepareParsed> {
  return async (ctx, parsed) => {
    const result = await prepareEvaluatorCommand(ctx, parsed, deps);
    renderEvaluatorPayload({
      json: parsed.json,
      title: `evaluator prepare ${parsed.taskId}`,
      payload: result,
    });
    return 0;
  };
}

export const runEvaluatorPrepare = makeRunEvaluatorPrepareHandler(DEFAULT_EVALUATOR_ARTIFACT_DEPS);

export type EvaluatorApplyResult = {
  work_order_id: string;
  evaluator: string;
  verdict: unknown;
  report: string;
  result: string;
  recorded: true;
};

export async function applyEvaluatorCommand(
  ctx: CommandCtx,
  parsed: EvaluatorApplyParsed,
  deps: EvaluatorCommandDeps,
): Promise<EvaluatorApplyResult> {
  const command = await deps.getCommandContext(ctx, "evaluator apply");
  const task = await loadTaskFromContext({ ctx: command, taskId: parsed.taskId });
  const resultPath = projectPath(
    command.resolvedProject.gitRoot,
    parsed.resultPath,
    "Evaluator result",
  );
  let rawResult: unknown;
  try {
    rawResult = JSON.parse(await readFile(resultPath, "utf8"));
  } catch (error) {
    throw new CliError({
      code: "E_USAGE",
      message: `Unable to read EvaluatorSgrResult JSON: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
  const applied = await applyEvaluatorSgrReview({
    ctx: command,
    task,
    workOrderPath: parsed.workOrderPath,
    result: rawResult,
  });
  return {
    work_order_id: applied.work_order.work_order_id,
    evaluator: applied.work_order.evaluator.id,
    verdict:
      rawResult && typeof rawResult === "object"
        ? (rawResult as { verdict?: unknown }).verdict
        : null,
    report: applied.report_path,
    result: applied.result_path,
    recorded: true,
  };
}

export function makeRunEvaluatorApplyHandler(
  deps: EvaluatorCommandDeps,
): CommandHandler<EvaluatorApplyParsed> {
  return async (ctx, parsed) => {
    const result = await applyEvaluatorCommand(ctx, parsed, deps);
    renderEvaluatorPayload({
      json: parsed.json,
      title: `evaluator apply ${parsed.taskId}`,
      payload: result,
    });
    return 0;
  };
}

export const runEvaluatorApply = makeRunEvaluatorApplyHandler(DEFAULT_EVALUATOR_COMMAND_DEPS);

export type EvaluatorExecuteResult = {
  work_order_id: string;
  evaluator: string;
  provider: string;
  sandbox: string;
  verdict: string;
  report: string;
  result: string;
  receipt: string;
  supervisor_episode: {
    status: string;
    cursor: unknown;
    usage: unknown;
    stop: unknown;
    digest: string;
  };
  recorded: true;
};

export async function executeEvaluatorCommand(
  ctx: CommandCtx,
  parsed: EvaluatorExecuteParsed,
  deps: EvaluatorReviewCommandDeps,
): Promise<EvaluatorExecuteResult> {
  const { command, task, evaluator } = await loadEvaluatorReviewContext({
    ctx,
    taskId: parsed.taskId,
    evaluatorId: parsed.evaluator,
    deps,
  });
  const execution = await executeEvaluatorSupervisorEpisode({
    ctx,
    command,
    task,
    evaluator,
    task_id: parsed.taskId,
    replacement: parsed.replacement,
    artifacts: await deps.getEvaluatorArtifactPort(ctx, "evaluator execute"),
  });

  const currentTask = await loadTaskFromContext({ ctx: command, taskId: parsed.taskId });
  const resultRef = relativeToProject(command.resolvedProject.gitRoot, execution.result_path);
  const alreadyApplied = currentTask.quality_review?.evidence_refs?.includes(resultRef) ?? false;
  const applied = alreadyApplied
    ? {
        report_path: relativeToProject(command.resolvedProject.gitRoot, execution.report_path),
        result_path: resultRef,
      }
    : await applyEvaluatorSgrReview({
        ctx: command,
        task: currentTask,
        workOrderPath: execution.work_order_path,
        result: execution.result,
      });
  const postDecision = await buildTaskRouteDecision({
    ctx: command,
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    taskId: parsed.taskId,
    includeRemote: false,
  });
  const journal = advanceSupervisorExecutionEpisodeState({
    journal: execution.journal,
    state_fingerprint_digest: postDecision.workflowStep.preconditionFingerprint.digest,
    route_observation: { step_id: postDecision.workflowStep.id },
  });
  await execution.store.write(journal);
  return {
    work_order_id: execution.receipt.work_order_id,
    evaluator: execution.result.evaluator_id,
    provider: execution.receipt.provider,
    sandbox: execution.receipt.authority.sandbox,
    verdict: execution.result.verdict,
    report: applied.report_path,
    result: applied.result_path,
    receipt: relativeToProject(
      command.resolvedProject.gitRoot,
      path.join(path.dirname(execution.work_order_path), "evaluator-episode.json"),
    ),
    supervisor_episode: {
      status: journal.status,
      cursor: journal.cursor,
      usage: journal.usage,
      stop: journal.stop,
      digest: journal.digest,
    },
    recorded: true,
  };
}

export function makeRunEvaluatorExecuteHandler(
  deps: EvaluatorReviewCommandDeps,
): CommandHandler<EvaluatorExecuteParsed> {
  return async (ctx, parsed) => {
    const result = await executeEvaluatorCommand(ctx, parsed, deps);
    renderEvaluatorPayload({
      json: parsed.json,
      title: `evaluator execute ${parsed.taskId}`,
      payload: result,
    });
    return 0;
  };
}

export const runEvaluatorExecute = makeRunEvaluatorExecuteHandler(DEFAULT_EVALUATOR_REVIEW_DEPS);

function relativeToProject(gitRoot: string, absolutePath: string): string {
  return path.relative(gitRoot, absolutePath).replaceAll("\\", "/");
}

function compatibilityResult(opts: {
  parsed: EvaluatorRunParsed;
  prepared: PreparedEvaluatorReview;
}) {
  if (opts.parsed.verdict === "human_review") {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "evaluator_supplied cannot record human_review; use --provenance human_supplied.",
    });
  }
  const frozenEvidence = opts.prepared.work_order.evidence.find(
    (entry) => entry.kind === "actual_diff",
  );
  if (!frozenEvidence)
    throw new Error("Prepared evaluator work order is missing actual diff evidence.");
  const reworkContext = opts.parsed.reworkContext ?? [];
  return {
    schema_version: 1,
    kind: "evaluator_result",
    evaluator_id: opts.prepared.work_order.evaluator.id,
    verdict: opts.parsed.verdict,
    findings: opts.parsed.findings.map((summary, index) => ({
      id: `compatibility-finding-${index + 1}`,
      severity: "medium",
      summary,
      broken_invariant: "Compatibility evaluator facade requires independent review evidence.",
      evidence_refs: [{ path: frozenEvidence.path }],
    })),
    missing_tests: opts.parsed.missingTests,
    hidden_assumptions: opts.parsed.hiddenAssumptions,
    ...(reworkContext.length > 0 ? { recovery_context: reworkContext.join("\n") } : {}),
  };
}

export type EvaluatorRunResult = {
  provenance: EvaluatorRunParsed["provenance"];
  verdict: EvaluatorRunParsed["verdict"];
  recorded: boolean;
  work_order?: string;
  work_order_id?: string;
  report?: string;
  prompt: string;
  opinion?: string;
};

async function prepareEvaluatorRunArtifacts(
  ctx: CommandCtx,
  parsed: EvaluatorRunParsed,
  deps: EvaluatorArtifactCommandDeps,
) {
  const artifacts = await deps.getEvaluatorArtifactPort(ctx, "evaluator run");
  return await artifacts.prepare({
    ctx,
    taskId: parsed.taskId,
    evaluatorId: parsed.evaluator,
    provenance: parsed.provenance,
  });
}

export async function runEvaluatorPrepareOnlyCommand(
  ctx: CommandCtx,
  parsed: EvaluatorRunParsed,
  deps: EvaluatorArtifactCommandDeps,
): Promise<EvaluatorRunResult> {
  assertRunnableReviewInput(parsed);
  if (parsed.record) {
    throw new CliError({
      code: "E_INTERNAL",
      message: "Internal error: preparation-only evaluator handler received a recording request.",
    });
  }
  const packet = await prepareEvaluatorRunArtifacts(ctx, parsed, deps);
  return {
    provenance: parsed.provenance,
    verdict: parsed.verdict,
    recorded: false,
    work_order: relativeToProject(packet.git_root, packet.prepared.work_order_path),
    prompt: relativeToProject(packet.git_root, packet.prepared.prompt_path),
  };
}

export async function runEvaluatorCommand(
  ctx: CommandCtx,
  parsed: EvaluatorRunParsed,
  deps: EvaluatorReviewCommandDeps,
): Promise<EvaluatorRunResult> {
  assertRunnableReviewInput(parsed);
  const packet = await prepareEvaluatorRunArtifacts(ctx, parsed, deps);
  const { prepared } = packet;
  if (!parsed.record) {
    return {
      provenance: parsed.provenance,
      verdict: parsed.verdict,
      recorded: false,
      work_order: relativeToProject(packet.git_root, prepared.work_order_path),
      prompt: relativeToProject(packet.git_root, prepared.prompt_path),
    };
  }
  const command = await deps.getCommandContext(ctx, "evaluator run record");
  const task = await loadTaskFromContext({ ctx: command, taskId: parsed.taskId });
  const applied =
    parsed.provenance === "human_supplied"
      ? await applyHumanEvaluatorReview({
          ctx: command,
          task,
          workOrderPath: prepared.work_order_path,
          input: {
            verdict: parsed.verdict,
            summary: parsed.summary,
            findings: parsed.findings,
            evidence_refs: parsed.evidenceRefs,
            missing_tests: parsed.missingTests,
            hidden_assumptions: parsed.hiddenAssumptions,
            residual_risks: parsed.residualRisks,
          },
        })
      : await applyEvaluatorSgrReview({
          ctx: command,
          task,
          workOrderPath: prepared.work_order_path,
          result: compatibilityResult({ parsed, prepared }),
        });
  return {
    provenance: parsed.provenance,
    verdict: parsed.verdict,
    recorded: true,
    work_order_id: applied.work_order.work_order_id,
    report: applied.report_path,
    prompt: relativeToProject(command.resolvedProject.gitRoot, prepared.prompt_path),
    opinion: relativeToProject(command.resolvedProject.gitRoot, prepared.opinion_path),
  };
}

export function makeRunEvaluatorRunHandler(
  deps: EvaluatorReviewCommandDeps,
): CommandHandler<EvaluatorRunParsed> {
  return async (ctx, parsed) => {
    const result = await runEvaluatorCommand(ctx, parsed, deps);
    renderEvaluatorPayload({
      json: parsed.json,
      title: `evaluator run ${parsed.taskId}`,
      payload: result,
    });
    return 0;
  };
}

export function makeRunEvaluatorRunPrepareHandler(
  deps: EvaluatorArtifactCommandDeps,
): CommandHandler<EvaluatorRunParsed> {
  return async (ctx, parsed) => {
    const result = await runEvaluatorPrepareOnlyCommand(ctx, parsed, deps);
    renderEvaluatorPayload({
      json: parsed.json,
      title: `evaluator run ${parsed.taskId}`,
      payload: result,
    });
    return 0;
  };
}

export const runEvaluatorRun = makeRunEvaluatorRunHandler(DEFAULT_EVALUATOR_REVIEW_DEPS);
