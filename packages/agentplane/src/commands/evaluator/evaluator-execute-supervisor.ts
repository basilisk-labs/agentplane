import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  type SupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type { EvaluatorModule } from "../../evaluators/catalog.js";
import { CliError } from "../../shared/errors.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { openSupervisorExecutionEpisode } from "../shared/supervisor-execution-episode.js";
import type { CommandContext } from "../shared/task-backend.js";

import {
  evaluatorProviderFailureRecord,
  executePreparedEvaluatorEpisode,
  type EvaluatorEpisodeReceipt,
} from "./evaluator-episode.js";
import {
  isWithinRoot,
  prepareEvaluatorReview,
  readWorkOrder,
  reportPaths,
  validateStrictEvaluatorResult,
} from "./evaluator-review-usecase.js";

type CompletedEvaluatorOutcome = {
  result: ReturnType<typeof validateStrictEvaluatorResult>;
  receipt: EvaluatorEpisodeReceipt;
  work_order_path: string;
  result_path: string;
  report_path: string;
};

export type EvaluatorSupervisorExecution = CompletedEvaluatorOutcome & {
  journal: SupervisorExecutionEpisodeJournal;
  store: Awaited<ReturnType<typeof openSupervisorExecutionEpisode>>["store"];
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
}): Promise<CompletedEvaluatorOutcome> {
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

export async function executeEvaluatorSupervisorEpisode(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task: TaskData;
  evaluator: EvaluatorModule;
  task_id: string;
}): Promise<EvaluatorSupervisorExecution> {
  const decision = await buildTaskRouteDecision({
    ctx: opts.command,
    cwd: opts.ctx.cwd,
    rootOverride: opts.ctx.rootOverride ?? null,
    taskId: opts.task_id,
    includeRemote: false,
  });
  const opened = await openSupervisorExecutionEpisode({
    git_root: opts.command.resolvedProject.gitRoot,
    task_id: opts.task_id,
    task_revision: opts.task.revision ?? null,
    state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
    recover_intent: false,
  });
  let journal = opened.journal;
  let outcome: CompletedEvaluatorOutcome;

  if (journal.status === "running" && journal.cursor.phase === "intent_recorded") {
    try {
      outcome = await readCompletedEvaluatorOutcome({
        git_root: opts.command.resolvedProject.gitRoot,
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
      result: outcome.result,
      receipt: outcome.receipt,
    });
    await opened.store.write(journal);
  } else if (journal.status === "running" && journal.cursor.phase === "completed") {
    outcome = await readCompletedEvaluatorOutcome({
      git_root: opts.command.resolvedProject.gitRoot,
      journal,
    });
  } else {
    if (journal.status !== "running" || journal.cursor.phase !== "ready") {
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "Evaluator supervisor journal is not ready; resolve its typed stop before another provider invocation.",
      });
    }
    const prepared = await prepareEvaluatorReview({
      ctx: opts.command,
      task: opts.task,
      evaluator: opts.evaluator,
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
      work_order_ref: relativeToProject(
        opts.command.resolvedProject.gitRoot,
        prepared.work_order_path,
      ),
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
      episode = await executePreparedEvaluatorEpisode({ ctx: opts.command, prepared });
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
    outcome = {
      result: episode.result,
      receipt: episode.receipt,
      work_order_path: prepared.work_order_path,
      result_path: prepared.result_path,
      report_path: prepared.report_path,
    };
    journal = completePersistedEvaluatorEpisode({
      journal,
      operation_key: started.operation_key,
      result: outcome.result,
      receipt: outcome.receipt,
    });
    await opened.store.write(journal);
  }

  if (journal.status !== "running" || journal.cursor.phase !== "completed") {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "Evaluator outcome was persisted, but the supervisor budget stopped before its task-state application.",
    });
  }
  return { ...outcome, journal, store: opened.store };
}

function relativeToProject(gitRoot: string, absolutePath: string): string {
  return path.relative(gitRoot, absolutePath).replaceAll("\\\\", "/");
}
