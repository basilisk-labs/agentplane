import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { findGitRoot, resolveProject } from "@agentplaneorg/core/project";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

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
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
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
  isWithinRoot,
  readWorkOrder,
  reportPaths,
  validateStrictEvaluatorResult,
  type PreparedEvaluatorReview,
} from "./evaluator-review-usecase.js";
import { applyEvaluatorSgrReview, applyHumanEvaluatorReview } from "./evaluator-review-apply.js";
import {
  evaluatorProviderFailureRecord,
  executePreparedEvaluatorEpisode,
  type EvaluatorEpisodeReceipt,
} from "./evaluator-episode.js";

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

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function isNonNegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function assertPersistedEvaluatorReceipt(opts: {
  value: unknown;
  work_order_id: string;
  canonical_result: string;
}): asserts opts is {
  value: EvaluatorEpisodeReceipt;
  work_order_id: string;
  canonical_result: string;
} {
  const receipt = opts.value;
  if (!receipt || typeof receipt !== "object" || Array.isArray(receipt)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted evaluator receipt is invalid.",
    });
  }
  const value = receipt as Partial<EvaluatorEpisodeReceipt>;
  const usage = value.provider_usage;
  const usageIsValid =
    usage === null ||
    (typeof usage === "object" &&
      usage !== null &&
      isNonNegativeInteger(usage.input_tokens) &&
      isNonNegativeInteger(usage.output_tokens) &&
      isNonNegativeInteger(usage.total_tokens));
  if (
    value.schema_version !== 1 ||
    value.kind !== "evaluator_episode_receipt" ||
    value.work_order_id !== opts.work_order_id ||
    value.provider !== "codex" ||
    value.authority?.sandbox !== "read-only" ||
    value.authority?.writable_roots?.length !== 0 ||
    !usageIsValid ||
    value.result_sha256 !== sha256(opts.canonical_result)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted evaluator receipt does not attest the saved evaluator result.",
    });
  }
  opts.value = value as EvaluatorEpisodeReceipt;
}

async function readCompletedEvaluatorOutcome(opts: {
  git_root: string;
  journal: SupervisorExecutionEpisodeJournal;
}): Promise<{
  result: ReturnType<typeof validateStrictEvaluatorResult>;
  receipt: EvaluatorEpisodeReceipt;
  work_order_path: string;
  result_path: string;
  report_path: string;
}> {
  const operation = opts.journal.operations.at(-1);
  if (
    (operation?.status !== "completed" && operation?.status !== "intent") ||
    operation.role !== "EVALUATOR" ||
    operation.kind !== "evaluator_episode" ||
    !operation.work_order_ref
  ) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Supervisor journal completion is not an evaluator episode that can be resumed.",
    });
  }
  const workOrderPath = path.resolve(opts.git_root, operation.work_order_ref);
  if (!isWithinRoot(opts.git_root, workOrderPath)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Supervisor journal evaluator work order is outside the project root.",
    });
  }
  const workOrder = readWorkOrder(JSON.parse(await readFile(workOrderPath, "utf8")) as unknown);
  const paths = reportPaths(path.dirname(workOrderPath));
  const result = validateStrictEvaluatorResult(
    JSON.parse(await readFile(paths.result_path, "utf8")) as unknown,
  );
  const canonicalResult = `${JSON.stringify(result, null, 2)}\n`;
  const receiptInput = JSON.parse(
    await readFile(path.join(path.dirname(workOrderPath), "evaluator-episode.json"), "utf8"),
  ) as unknown;
  const receiptHolder = {
    value: receiptInput,
    work_order_id: workOrder.work_order_id,
    canonical_result: canonicalResult,
  };
  assertPersistedEvaluatorReceipt(receiptHolder);
  if (result.evaluator_id !== workOrder.evaluator.id) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Persisted evaluator result does not match its work order.",
    });
  }
  return {
    result,
    receipt: receiptHolder.value,
    work_order_path: workOrderPath,
    result_path: paths.result_path,
    report_path: paths.report_path,
  };
}

function evaluatorUsage(receipt: EvaluatorEpisodeReceipt): {
  input_tokens?: number;
  output_tokens?: number;
  total_tokens?: number;
  wall_time_ms: number;
  changed_files: number;
} {
  const elapsed = Date.parse(receipt.ended_at) - Date.parse(receipt.started_at);
  return {
    ...(receipt.provider_usage ?? {}),
    wall_time_ms: Number.isFinite(elapsed) ? Math.max(0, elapsed) : 0,
    changed_files: 0,
  };
}

function completePersistedEvaluatorEpisode(opts: {
  journal: SupervisorExecutionEpisodeJournal;
  operation_key: string;
  result: ReturnType<typeof validateStrictEvaluatorResult>;
  receipt: EvaluatorEpisodeReceipt;
}): SupervisorExecutionEpisodeJournal {
  let journal = completeSupervisorExecutionEpisode({
    journal: opts.journal,
    operation_key: opts.operation_key,
    result: opts.result,
    usage: evaluatorUsage(opts.receipt),
    progress: {
      evaluator_id: opts.result.evaluator_id,
      verdict: opts.result.verdict,
      result_sha256: opts.receipt.result_sha256,
    },
    ...(opts.result.recovery_context
      ? {
          bounded_feedback: {
            verdict: opts.result.verdict,
            recovery_context: opts.result.recovery_context,
          },
        }
      : {}),
  });
  if (opts.receipt.provider_usage === null) {
    journal = stopSupervisorExecutionEpisode({
      journal,
      reason: "human_review",
      exhausted_dimensions: [
        "input_tokens_telemetry",
        "output_tokens_telemetry",
        "total_tokens_telemetry",
      ],
    });
  }
  return journal;
}

export const runEvaluatorExecute: CommandHandler<EvaluatorExecuteParsed> = async (ctx, p) => {
  const { command, task, evaluator } = await loadEvaluatorReviewContext({
    ctx,
    taskId: p.taskId,
    evaluatorId: p.evaluator,
  });
  const decision = await buildTaskRouteDecision({
    ctx: command,
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    taskId: p.taskId,
    includeRemote: false,
  });
  const opened = await openSupervisorExecutionEpisode({
    git_root: command.resolvedProject.gitRoot,
    task_id: p.taskId,
    task_revision: task.revision ?? null,
    state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
    recover_intent: false,
  });
  let journal = opened.journal;
  let result: ReturnType<typeof validateStrictEvaluatorResult>;
  let receipt: EvaluatorEpisodeReceipt;
  let workOrderPath: string;
  let resultPath: string;
  let reportPath: string;

  if (journal.status === "running" && journal.cursor.phase === "intent_recorded") {
    let recovered: Awaited<ReturnType<typeof readCompletedEvaluatorOutcome>>;
    try {
      recovered = await readCompletedEvaluatorOutcome({
        git_root: command.resolvedProject.gitRoot,
        journal,
      });
    } catch {
      journal = stopSupervisorExecutionEpisode({ journal, reason: "effect_in_doubt" });
      await opened.store.write(journal);
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "Evaluator supervisor intent has no complete validated outcome; resolve the effect before retrying.",
      });
    }
    const operationKey = journal.cursor.operation_key;
    if (!operationKey) throw new Error("Evaluator supervisor intent is missing its operation key.");
    journal = completePersistedEvaluatorEpisode({
      journal,
      operation_key: operationKey,
      result: recovered.result,
      receipt: recovered.receipt,
    });
    await opened.store.write(journal);
    result = recovered.result;
    receipt = recovered.receipt;
    workOrderPath = recovered.work_order_path;
    resultPath = recovered.result_path;
    reportPath = recovered.report_path;
  } else if (journal.status === "running" && journal.cursor.phase === "completed") {
    const resumed = await readCompletedEvaluatorOutcome({
      git_root: command.resolvedProject.gitRoot,
      journal,
    });
    result = resumed.result;
    receipt = resumed.receipt;
    workOrderPath = resumed.work_order_path;
    resultPath = resumed.result_path;
    reportPath = resumed.report_path;
  } else {
    if (journal.status !== "running" || journal.cursor.phase !== "ready") {
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "Evaluator supervisor journal is not ready; resolve its typed stop before another provider invocation.",
      });
    }
    const prepared = await prepareEvaluatorReview({
      ctx: command,
      task,
      evaluator,
      provenance: "evaluator_supplied",
    });
    const started = startSupervisorExecutionEpisode({
      journal,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: {
        evaluator_id: prepared.work_order.evaluator.id,
        work_order_id: prepared.work_order.work_order_id,
      },
      precondition_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
      authority_ref: `evaluator:${prepared.work_order.evaluator.id}:read-only`,
      authority_digest: decision.workflowStep.preconditionFingerprint.digest,
      work_order_ref: relativeToProject(command.resolvedProject.gitRoot, prepared.work_order_path),
      effect_ref: prepared.work_order.work_order_id,
    });
    if (started.status !== "started") {
      await opened.store.write(started.journal);
      throw new CliError({
        code: "E_RUNTIME",
        message:
          started.status === "effect_in_doubt"
            ? "Evaluator supervisor journal has an effect in doubt; resolve it before retrying."
            : `Evaluator supervisor journal stopped: ${started.stop.reason}.`,
      });
    }
    journal = started.journal;
    await opened.store.write(journal);
    let episode: Awaited<ReturnType<typeof executePreparedEvaluatorEpisode>>;
    try {
      episode = await executePreparedEvaluatorEpisode({ ctx: command, prepared });
    } catch (error) {
      journal = completeSupervisorExecutionEpisode({
        journal,
        operation_key: started.operation_key,
        // Persist only a small classification. Provider stderr and model
        // output can contain sensitive data and belong neither in the task
        // record nor in the durable supervisor journal.
        result: evaluatorProviderFailureRecord(error),
        failed: true,
      });
      await opened.store.write(journal);
      throw error;
    }
    result = episode.result;
    receipt = episode.receipt;
    workOrderPath = prepared.work_order_path;
    resultPath = prepared.result_path;
    reportPath = prepared.report_path;
    journal = completePersistedEvaluatorEpisode({
      journal,
      operation_key: started.operation_key,
      result,
      receipt,
    });
    await opened.store.write(journal);
    if (journal.status !== "running" || journal.cursor.phase !== "completed") {
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "Evaluator outcome was persisted, but the supervisor budget stopped before its task-state application.",
      });
    }
  }

  if (journal.status !== "running" || journal.cursor.phase !== "completed") {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "Evaluator outcome was persisted, but the supervisor budget stopped before its task-state application.",
    });
  }

  const currentTask = await loadTaskFromContext({ ctx: command, taskId: p.taskId });
  const resultRef = relativeToProject(command.resolvedProject.gitRoot, resultPath);
  const alreadyApplied = currentTask.quality_review?.evidence_refs?.includes(resultRef) ?? false;
  const applied = alreadyApplied
    ? {
        report_path: relativeToProject(command.resolvedProject.gitRoot, reportPath),
        result_path: resultRef,
      }
    : await applyEvaluatorSgrReview({
        ctx: command,
        task: currentTask,
        workOrderPath,
        result,
      });
  const postDecision = await buildTaskRouteDecision({
    ctx: command,
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride ?? null,
    taskId: p.taskId,
    includeRemote: false,
  });
  journal = advanceSupervisorExecutionEpisodeState({
    journal,
    state_fingerprint_digest: postDecision.workflowStep.preconditionFingerprint.digest,
    route_observation: { step_id: postDecision.workflowStep.id },
  });
  await opened.store.write(journal);
  printEvaluatorPayload({
    json: p.json,
    title: `evaluator execute ${p.taskId}`,
    payload: {
      work_order_id: receipt.work_order_id,
      evaluator: result.evaluator_id,
      provider: receipt.provider,
      sandbox: receipt.authority.sandbox,
      verdict: result.verdict,
      report: applied.report_path,
      result: applied.result_path,
      receipt: relativeToProject(
        command.resolvedProject.gitRoot,
        path.join(path.dirname(workOrderPath), "evaluator-episode.json"),
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
