import { readFile } from "node:fs/promises";
import path from "node:path";
import { findGitRoot, resolveProject } from "@agentplaneorg/core/project";
import { advanceSupervisorExecutionEpisodeState } from "@agentplaneorg/core/schemas";

import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import type { CommandCtx, CommandHandler } from "../../cli/spec/spec.js";
import { CliError, GitError } from "../../shared/errors.js";
import { loadEvaluatorCatalog, type EvaluatorModule } from "../../evaluators/catalog.js";
import { loadCommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import {
  evaluatorSpec,
  type EvaluatorApplyParsed,
  type EvaluatorExecuteParsed,
  type EvaluatorListParsed,
  type EvaluatorPrepareParsed,
  type EvaluatorRunParsed,
  type EvaluatorShowParsed,
} from "./evaluator.spec.js";
import {
  prepareEvaluatorReview,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";
import { applyEvaluatorSgrReview, applyHumanEvaluatorReview } from "./evaluator-review-apply.js";
import { executeEvaluatorSupervisorEpisode } from "./evaluator-execute-supervisor.js";

export {
  evaluatorApplySpec,
  evaluatorListSpec,
  evaluatorPrepareSpec,
  evaluatorRunSpec,
  evaluatorShowSpec,
  evaluatorSpec,
} from "./evaluator.spec.js";
export { evaluatorExecuteSpec } from "./evaluator.spec.js";

export async function runEvaluatorGroup(_ctx: CommandCtx, p: GroupCommandParsed): Promise<number> {
  return throwGroupCommandUsage({
    spec: evaluatorSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["evaluator"]),
    command: "evaluator",
    contextCommand: "evaluator",
  });
}

function evaluatorMetadata(row: EvaluatorModule) {
  return {
    id: row.id,
    title: row.title,
    version: row.version,
    status: row.status,
    profile: row.profile,
    tags: row.tags,
    source: row.source,
    path: row.path,
    result_contract: row.result_contract,
  };
}

function formatEvaluatorList(rows: EvaluatorModule[]): string {
  const widthId = Math.max(...rows.map((row) => row.id.length), "ID".length);
  const widthStatus = Math.max(...rows.map((row) => row.status.length), "STATUS".length);
  const widthSource = Math.max(...rows.map((row) => row.source.length), "SOURCE".length);
  return [
    `${"ID".padEnd(widthId)}  ${"STATUS".padEnd(widthStatus)}  ${"SOURCE".padEnd(widthSource)}  PROFILE    TITLE`,
    `${"-".repeat(widthId)}  ${"-".repeat(widthStatus)}  ${"-".repeat(widthSource)}  -------    -----`,
    ...rows.map(
      (row) =>
        `${row.id.padEnd(widthId)}  ${row.status.padEnd(widthStatus)}  ${row.source.padEnd(widthSource)}  ${row.profile.padEnd(7)}    ${row.title}`,
    ),
  ].join("\n");
}

async function loadCatalogForCommand(ctx: CommandCtx, includeBuiltin: boolean) {
  let projectRoot: string | null = null;
  try {
    const resolved = await resolveProject({ cwd: ctx.cwd, rootOverride: ctx.rootOverride ?? null });
    projectRoot = resolved.gitRoot;
  } catch (err) {
    if (ctx.rootOverride) {
      const message = err instanceof Error ? err.message : String(err);
      throw new GitError({
        message,
        context: { command: "evaluator", root: ctx.rootOverride },
      });
    }
    projectRoot = await findGitRoot(ctx.cwd);
  }
  if (!projectRoot && !includeBuiltin) {
    throw new GitError({
      message:
        "No AgentPlane project root found for project-local evaluator catalog lookup. Run from a repository checkout or pass --root <path>.",
      context: { command: "evaluator", root: ctx.rootOverride ?? null },
    });
  }
  return await loadEvaluatorCatalog({ projectRoot, includeBuiltin });
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

export const runEvaluatorList: CommandHandler<EvaluatorListParsed> = async (ctx, p) => {
  const rows = await loadCatalogForCommand(ctx, p.builtin);
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ evaluators: rows.map((row) => evaluatorMetadata(row)) }, null, 2)}\n`,
    );
    return 0;
  }
  if (rows.length === 0) {
    process.stdout.write("No evaluator prompt modules found.\n");
    return 0;
  }
  process.stdout.write(`${formatEvaluatorList(rows)}\n`);
  return 0;
};

export const runEvaluatorShow: CommandHandler<EvaluatorShowParsed> = async (ctx, p) => {
  const rows = await loadCatalogForCommand(ctx, p.builtin);
  const found = rows.find((row) => row.id === p.id);
  if (!found) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${p.id}`,
    });
  }
  if (p.json) {
    process.stdout.write(
      `${JSON.stringify({ evaluator: { ...evaluatorMetadata(found), content: found.content } }, null, 2)}\n`,
    );
    return 0;
  }
  process.stdout.write(found.content.endsWith("\n") ? found.content : `${found.content}\n`);
  return 0;
};

async function loadEvaluatorReviewContext(opts: {
  ctx: CommandCtx;
  taskId: string;
  evaluatorId: string;
}): Promise<{
  command: Awaited<ReturnType<typeof loadCommandContext>>;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  evaluator: EvaluatorModule;
}> {
  const rows = await loadCatalogForCommand(opts.ctx, true);
  const evaluator = rows.find((row) => row.id === opts.evaluatorId);
  if (!evaluator) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Unknown evaluator id: ${opts.evaluatorId}`,
    });
  }
  const command = await loadCommandContext({
    cwd: opts.ctx.cwd,
    rootOverride: opts.ctx.rootOverride ?? null,
  });
  const task = await loadTaskFromContext({ ctx: command, taskId: opts.taskId });
  return { command, task, evaluator };
}

function printEvaluatorPayload(opts: {
  json: boolean;
  title: string;
  payload: Record<string, unknown>;
}): void {
  if (opts.json) {
    process.stdout.write(`${JSON.stringify(opts.payload, null, 2)}\n`);
    return;
  }
  process.stdout.write(
    [
      opts.title,
      ...Object.entries(opts.payload)
        .filter(([, value]) => value !== null && value !== undefined)
        .map(([key, value]) => `${key.replaceAll("_", " ")}: ${String(value)}`),
    ].join("\n") + "\n",
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

export const runEvaluatorPrepare: CommandHandler<EvaluatorPrepareParsed> = async (ctx, p) => {
  const { command, task, evaluator } = await loadEvaluatorReviewContext({
    ctx,
    taskId: p.taskId,
    evaluatorId: p.evaluator,
  });
  const prepared = await prepareEvaluatorReview({
    ctx: command,
    task,
    evaluator,
    provenance: "evaluator_supplied",
  });
  printEvaluatorPayload({
    json: p.json,
    title: `evaluator prepare ${p.taskId}`,
    payload: {
      work_order_id: prepared.work_order.work_order_id,
      work_order: relativeToProject(command.resolvedProject.gitRoot, prepared.work_order_path),
      prompt: relativeToProject(command.resolvedProject.gitRoot, prepared.prompt_path),
      evaluated_sha: prepared.work_order.evaluated_sha,
      sandbox: prepared.work_order.authority.sandbox,
    },
  });
  return 0;
};

export const runEvaluatorApply: CommandHandler<EvaluatorApplyParsed> = async (ctx, p) => {
  const command = await loadCommandContext({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
  });
  const task = await loadTaskFromContext({ ctx: command, taskId: p.taskId });
  const resultPath = projectPath(command.resolvedProject.gitRoot, p.resultPath, "Evaluator result");
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
    workOrderPath: p.workOrderPath,
    result: rawResult,
  });
  printEvaluatorPayload({
    json: p.json,
    title: `evaluator apply ${p.taskId}`,
    payload: {
      work_order_id: applied.work_order.work_order_id,
      evaluator: applied.work_order.evaluator.id,
      verdict:
        rawResult && typeof rawResult === "object"
          ? (rawResult as { verdict?: unknown }).verdict
          : null,
      report: applied.report_path,
      result: applied.result_path,
      recorded: true,
    },
  });
  return 0;
};

export const runEvaluatorExecute: CommandHandler<EvaluatorExecuteParsed> = async (ctx, p) => {
  const { command, task, evaluator } = await loadEvaluatorReviewContext({
    ctx,
    taskId: p.taskId,
    evaluatorId: p.evaluator,
  });
  const execution = await executeEvaluatorSupervisorEpisode({
    ctx,
    command,
    task,
    evaluator,
    task_id: p.taskId,
    replacement: p.replacement,
  });

  const currentTask = await loadTaskFromContext({ ctx: command, taskId: p.taskId });
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
    taskId: p.taskId,
    includeRemote: false,
  });
  const journal = advanceSupervisorExecutionEpisodeState({
    journal: execution.journal,
    state_fingerprint_digest: postDecision.workflowStep.preconditionFingerprint.digest,
    route_observation: { step_id: postDecision.workflowStep.id },
  });
  await execution.store.write(journal);
  printEvaluatorPayload({
    json: p.json,
    title: `evaluator execute ${p.taskId}`,
    payload: {
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
    },
  });
  return 0;
};

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

export const runEvaluatorRun: CommandHandler<EvaluatorRunParsed> = async (ctx, p) => {
  assertRunnableReviewInput(p);
  const { command, task, evaluator } = await loadEvaluatorReviewContext({
    ctx,
    taskId: p.taskId,
    evaluatorId: p.evaluator,
  });
  const prepared = await prepareEvaluatorReview({
    ctx: command,
    task,
    evaluator,
    provenance: p.provenance,
  });
  if (!p.record) {
    printEvaluatorPayload({
      json: p.json,
      title: `evaluator run ${p.taskId}`,
      payload: {
        provenance: p.provenance,
        verdict: p.verdict,
        recorded: false,
        work_order: relativeToProject(command.resolvedProject.gitRoot, prepared.work_order_path),
        prompt: relativeToProject(command.resolvedProject.gitRoot, prepared.prompt_path),
      },
    });
    return 0;
  }
  const applied =
    p.provenance === "human_supplied"
      ? await applyHumanEvaluatorReview({
          ctx: command,
          task,
          workOrderPath: prepared.work_order_path,
          input: {
            verdict: p.verdict,
            summary: p.summary,
            findings: p.findings,
            evidence_refs: p.evidenceRefs,
            missing_tests: p.missingTests,
            hidden_assumptions: p.hiddenAssumptions,
            residual_risks: p.residualRisks,
          },
        })
      : await applyEvaluatorSgrReview({
          ctx: command,
          task,
          workOrderPath: prepared.work_order_path,
          result: compatibilityResult({ parsed: p, prepared }),
        });
  printEvaluatorPayload({
    json: p.json,
    title: `evaluator run ${p.taskId}`,
    payload: {
      provenance: p.provenance,
      verdict: p.verdict,
      recorded: true,
      work_order_id: applied.work_order.work_order_id,
      report: applied.report_path,
      prompt: relativeToProject(command.resolvedProject.gitRoot, prepared.prompt_path),
      opinion: relativeToProject(command.resolvedProject.gitRoot, prepared.opinion_path),
    },
  });
  return 0;
};
