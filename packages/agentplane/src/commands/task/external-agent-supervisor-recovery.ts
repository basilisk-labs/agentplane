import { isExternalPlanRefinementApplied } from "./external-agent-plan-refinement.js";
import { access } from "node:fs/promises";
import path from "node:path";

import {
  completeSupervisorExecutionEpisode,
  prepareReplacementSupervisorExecutionEpisodeAfterFailure,
  retireSupervisorExecutionEpisodeIntentAfterStateDrift,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import { CliError } from "../../shared/errors.js";
import { retireStaleEvaluatorExchange } from "./external-agent-evaluator-recovery.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

import {
  externalAgentIssueDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  writeExternalAgentExchange,
  writeExternalAgentResult,
  type ExternalAgentExchange,
  type ExternalAgentExchangePaths,
} from "./external-agent-exchange.js";

export type RecoverableExternalAgentExchange = {
  exchange: ExternalAgentExchange;
  paths: ExternalAgentExchangePaths;
  work_order: AgentWorkOrderV2;
};

export function requiresPlanningRecoveryReplacement(opts: {
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
}): boolean {
  const step = opts.decision.workflowStep;
  return (
    step.kind === "agent_episode" &&
    step.episode.purpose === "planning" &&
    opts.exchange.purpose !== "planning" &&
    step.preconditionFingerprint.digest !== opts.exchange.state_fingerprint
  );
}

export function requiresImplementationRecoveryReplacement(opts: {
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
}): boolean {
  if (
    opts.exchange.purpose !== "implementation" &&
    opts.exchange.purpose !== "implementation_rework" &&
    opts.exchange.purpose !== "task_worktree_resolution"
  ) {
    return false;
  }
  const expected = opts.work_order.state_fingerprint;
  const current = opts.decision.workflowStep.preconditionFingerprint;
  return (
    current.task_id !== expected.task_id ||
    current.task_revision !== expected.task_revision ||
    current.worktree !== expected.worktree ||
    current.components.task.digest !== expected.components.task.digest ||
    current.components.backend_projection.digest !== expected.components.backend_projection.digest
  );
}

function exchangePathsFromWorkOrderRef(workOrderRef: string): ExternalAgentExchangePaths {
  const directory = path.dirname(workOrderRef);
  return {
    directory,
    exchange: path.join(directory, "exchange.json"),
    work_order: workOrderRef,
    result_schema: path.join(directory, "result-schema.json"),
    semantic_result_schema: path.join(directory, "semantic-result.schema.json"),
    result: path.join(directory, "result.json"),
  };
}

async function unresolvedExternalAgentExchange(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  purpose: ExternalAgentExchange["purpose"];
  common_git_dir: string;
}): Promise<RecoverableExternalAgentExchange | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: opts.common_git_dir,
    task_id: opts.decision.task.id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  const operation = journal.operations.at(-1);
  const unresolved =
    operation?.status === "intent" &&
    ((journal.cursor.phase === "intent_recorded" &&
      journal.cursor.operation_key === operation.operation_key) ||
      (journal.status === "stopped" &&
        journal.stop?.reason === "effect_in_doubt" &&
        journal.stop.operation_key === operation.operation_key));
  if (!unresolved || !operation.work_order_ref) return null;

  const paths = exchangePathsFromWorkOrderRef(operation.work_order_ref);
  const exchange = await readExternalAgentExchange(paths.exchange);
  if (!exchange) {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "The unresolved external-agent supervisor intent has no exchange artifacts; recover the recorded intent before requesting a new packet.",
      context: { task_id: opts.decision.task.id, work_order_ref: operation.work_order_ref },
    });
  }
  const workOrder = await readExternalAgentWorkOrder(paths.work_order);
  const checkout =
    opts.decision.executionPacket.mustRunFrom ?? opts.command.resolvedProject.gitRoot;
  const matchesCurrentBoundary =
    exchange.task_id === opts.decision.task.id &&
    exchange.state_fingerprint === opts.decision.workflowStep.preconditionFingerprint.digest &&
    exchange.work_order_id === opts.work_order.work_order_id &&
    exchange.role === opts.work_order.role &&
    exchange.purpose === opts.purpose &&
    path.resolve(exchange.checkout) === path.resolve(checkout) &&
    operation.effect_ref ===
      `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: workOrder })}`;
  if (!matchesCurrentBoundary) {
    const noResultReturned = await access(paths.result).then(
      () => false,
      (error) => {
        if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return true;
        throw error;
      },
    );
    if (noResultReturned && (exchange.status === "prepared" || exchange.status === "issued")) {
      const retired = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
        journal,
        state_fingerprint_digest: opts.decision.workflowStep.preconditionFingerprint.digest,
        result: {
          classification: "state_fingerprint_drift",
          transition_id: exchange.transition_id,
          previous_state_fingerprint: exchange.state_fingerprint,
          current_state_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
        },
      });
      const store = createSupervisorEpisodeStore(journalPath);
      if (!(await store.compareAndSwap(journal.digest, retired))) {
        throw new CliError({
          code: "E_RUNTIME",
          message: "External-agent supervisor changed while retiring the stale episode.",
        });
      }
      await writeExternalAgentExchange(paths.exchange, {
        ...exchange,
        status: "retired",
        postcondition_fingerprint: opts.decision.workflowStep.preconditionFingerprint.digest,
        updated_at: new Date().toISOString(),
      });
      throw new CliError({
        code: "E_RUNTIME",
        message:
          "The issued external-agent episode became stale before any result was returned. " +
          `AgentPlane retired it; run: agentplane task advance ${opts.decision.task.id} ` +
          "--replacement --agent-json",
        context: {
          task_id: opts.decision.task.id,
          exact_argv: [
            "agentplane",
            "task",
            "advance",
            opts.decision.task.id,
            "--replacement",
            "--agent-json",
          ],
        },
      });
    }
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "A previous external-agent episode still owns this task; AgentPlane kept its original result path and did not create a fresh packet.",
      context: {
        task_id: opts.decision.task.id,
        state_fingerprint: exchange.state_fingerprint,
        result_path: exchange.result_ref,
        resume_argv: [
          "agentplane",
          "task",
          "advance",
          opts.decision.task.id,
          "--result",
          exchange.result_ref,
          "--agent-json",
        ],
      },
    });
  }
  if (exchange.status === "consumed") {
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "A consumed external-agent exchange is still bound to an unresolved supervisor intent.",
    });
  }
  const issuedExchange =
    exchange.status === "prepared"
      ? { ...exchange, status: "issued" as const, updated_at: new Date().toISOString() }
      : exchange;
  if (issuedExchange !== exchange) {
    await writeExternalAgentExchange(paths.exchange, issuedExchange);
  }
  return { exchange: issuedExchange, paths, work_order: workOrder };
}

async function externalAgentReplacementIdentity(opts: {
  command: CommandContext;
  task_id: string;
  common_git_dir: string;
}): Promise<string | null> {
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: opts.common_git_dir,
    task_id: opts.task_id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  return journal.status === "running" && journal.cursor.phase === "ready"
    ? (journal.cursor.replacement_of_operation_key ?? null)
    : null;
}

export async function superviseExternalAgentIssuance(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  work_order: AgentWorkOrderV2;
  purpose: ExternalAgentExchange["purpose"];
  issue: (transitionIdentity: string | null) => Promise<RecoverableExternalAgentExchange | null>;
}): Promise<RecoverableExternalAgentExchange | null> {
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: opts.decision.task.id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) {
    throw new CliError({
      code: "E_RUNTIME",
      message: "Another supervisor is issuing or applying an external-agent exchange.",
    });
  }
  try {
    const unresolved = await unresolvedExternalAgentExchange({
      command: opts.command,
      decision: opts.decision,
      work_order: opts.work_order,
      purpose: opts.purpose,
      common_git_dir: commonGitDir,
    });
    const transitionIdentity = await externalAgentReplacementIdentity({
      command: opts.command,
      task_id: opts.decision.task.id,
      common_git_dir: commonGitDir,
    });
    return unresolved ?? (await opts.issue(transitionIdentity));
  } finally {
    await lease.release();
  }
}

export async function recoverPendingExternalAgentResult(opts: {
  command: CommandContext;
  task_id: string;
  current_decision: TaskRouteDecision;
  accept_result: (input: { cwd: string; result_path: string }) => Promise<TaskRouteDecision>;
}): Promise<TaskRouteDecision | null> {
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: opts.task_id,
  });
  const rawJournal = await createSupervisorEpisodeStore(journalPath).read();
  if (!rawJournal) return null;
  const journal = validateSupervisorExecutionEpisodeJournal(rawJournal);
  const operation = journal.operations.at(-1);
  if (
    operation?.status === "intent" &&
    operation.work_order_ref === null &&
    operation.effect_ref === "task_verify" &&
    journal.cursor.phase === "intent_recorded" &&
    journal.cursor.operation_key === operation.operation_key
  ) {
    const currentFingerprint = opts.current_decision.workflowStep.preconditionFingerprint.digest;
    const failed = completeSupervisorExecutionEpisode({
      journal,
      operation_key: operation.operation_key,
      result: {
        direct_task_operation: "task_verify",
        error: "interrupted_verification_owner",
        recovery: "task_advance",
      },
      failed: true,
    });
    const replacement = prepareReplacementSupervisorExecutionEpisodeAfterFailure({
      journal: failed,
      state_fingerprint_digest: currentFingerprint,
    });
    const store = createSupervisorEpisodeStore(journalPath);
    if (!(await store.compareAndSwap(journal.digest, replacement))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while recovering interrupted verification.",
      });
    }
    return null;
  }
  if (
    !operation?.work_order_ref ||
    (operation.status !== "intent" && operation.status !== "completed")
  ) {
    return null;
  }
  const paths = exchangePathsFromWorkOrderRef(operation.work_order_ref);
  const exchange = await readExternalAgentExchange(paths.exchange);
  if (exchange?.task_id !== opts.task_id || exchange.status === "consumed") return null;
  if (exchange.status === "retired") {
    if (operation.status !== "intent") return null;
    const currentFingerprint = opts.current_decision.workflowStep.preconditionFingerprint.digest;
    if (operation.precondition_fingerprint_digest === currentFingerprint) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "A retired external-agent exchange still owns the current task state.",
        context: { task_id: opts.task_id, transition_id: exchange.transition_id },
      });
    }
    const retiredJournal = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
      journal,
      state_fingerprint_digest: currentFingerprint,
      result: {
        classification: "retired_exchange_state_fingerprint_drift",
        transition_id: exchange.transition_id,
        previous_state_fingerprint: operation.precondition_fingerprint_digest,
        current_state_fingerprint: currentFingerprint,
      },
    });
    const store = createSupervisorEpisodeStore(journalPath);
    if (!(await store.compareAndSwap(journal.digest, retiredJournal))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while reconciling a retired exchange.",
      });
    }
    throw new CliError({
      code: "E_RUNTIME",
      message:
        "AgentPlane reconciled a retired external-agent exchange with its unresolved journal " +
        `intent; run: agentplane task advance ${opts.task_id} --replacement --agent-json`,
      context: {
        task_id: opts.task_id,
        exact_argv: [
          "agentplane",
          "task",
          "advance",
          opts.task_id,
          "--replacement",
          "--agent-json",
        ],
      },
    });
  }

  const workOrder = await readExternalAgentWorkOrder(paths.work_order);
  const refinementApplied =
    exchange.result !== null &&
    (await isExternalPlanRefinementApplied({
      command: opts.command,
      exchange,
      envelope: exchange.result,
    }));
  const planningRecoveryRequired =
    !refinementApplied &&
    requiresPlanningRecoveryReplacement({
      decision: opts.current_decision,
      exchange,
    });
  await retireStaleEvaluatorExchange({
    command: opts.command,
    decision: opts.current_decision,
    exchange,
    paths,
    journal_path: journalPath,
  });
  const implementationRecoveryRequired =
    !refinementApplied &&
    requiresImplementationRecoveryReplacement({
      decision: opts.current_decision,
      exchange,
      work_order: workOrder,
    });

  if (
    operation.status === "intent" &&
    (planningRecoveryRequired || implementationRecoveryRequired)
  ) {
    const retired = retireSupervisorExecutionEpisodeIntentAfterStateDrift({
      journal,
      state_fingerprint_digest: opts.current_decision.workflowStep.preconditionFingerprint.digest,
      result: {
        classification: planningRecoveryRequired
          ? "planning_recovery_state_fingerprint_drift"
          : "implementation_authority_state_fingerprint_drift",
        transition_id: exchange.transition_id,
        previous_state_fingerprint: exchange.state_fingerprint,
        current_state_fingerprint:
          opts.current_decision.workflowStep.preconditionFingerprint.digest,
      },
    });
    const store = createSupervisorEpisodeStore(journalPath);
    if (!(await store.compareAndSwap(journal.digest, retired))) {
      throw new CliError({
        code: "E_RUNTIME",
        message: "External-agent supervisor changed while retiring the stale result.",
      });
    }
    await writeExternalAgentExchange(paths.exchange, {
      ...exchange,
      status: "retired",
      postcondition_fingerprint: opts.current_decision.workflowStep.preconditionFingerprint.digest,
      updated_at: new Date().toISOString(),
    });
    throw new CliError({
      code: "E_RUNTIME",
      message:
        (planningRecoveryRequired
          ? "The task returned to PLANNER after the pending external-agent result was issued. "
          : "The task authority changed after the pending external-agent result was issued. ") +
        `AgentPlane retired the stale result; run: agentplane task advance ${opts.task_id} ` +
        "--replacement --agent-json",
      context: {
        task_id: opts.task_id,
        exact_argv: [
          "agentplane",
          "task",
          "advance",
          opts.task_id,
          "--replacement",
          "--agent-json",
        ],
      },
    });
  }

  if (exchange.status === "result_received" || exchange.status === "accepted") {
    if (!exchange.result || !exchange.result_digest) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "The received external-agent result is missing its durable recovery payload.",
      });
    }
    try {
      await access(exchange.result_ref);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      await writeExternalAgentResult(exchange.result_ref, exchange.result);
    }
  } else if (exchange.status === "issued") {
    try {
      await access(exchange.result_ref);
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
      throw error;
    }
  } else {
    return null;
  }

  return await opts.accept_result({ cwd: exchange.checkout, result_path: exchange.result_ref });
}
