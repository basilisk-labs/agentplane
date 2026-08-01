import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import {
  finishDirectTask,
  resolveDirectImplementationCommit,
  type DirectImplementationEvidence,
} from "./direct-task-finalization.js";
import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";
import { cmdVerifyParsed } from "./verify-record.js";

export type DirectTaskCloseoutStopCode =
  | "verification_check_unsupported"
  | "verification_check_failed"
  | "stale_route"
  | "implementation_scope_violation"
  | "implementation_commit_missing"
  | "finish_failed";

type DirectTaskCloseoutStop = {
  code: DirectTaskCloseoutStopCode;
  reason: string;
  route_step_id: string;
  operation_id: string | null;
};

export type DirectTaskCloseoutEvaluatorEvidence = {
  evaluator_id: string;
  result_path: string;
  report_path: string;
  receipt_path: string;
};

type JournalRef = {
  journal: SupervisorExecutionEpisodeJournal;
  journal_path: string;
};

type DirectTaskCloseoutStopped = JournalRef & {
  status: "stopped";
  decision: TaskRouteDecision;
  declared_checks: number;
  stop: DirectTaskCloseoutStop;
};

export type DirectTaskVerificationOutcome =
  | (JournalRef & {
      status: "verified";
      decision: TaskRouteDecision;
      declared_checks: number;
    })
  | DirectTaskCloseoutStopped;

export type DirectTaskCloseoutOutcome =
  | (JournalRef & {
      status: "finalized";
      decision: TaskRouteDecision;
      declared_checks: number;
    })
  | DirectTaskCloseoutStopped;

function verificationEligibleRoute(decision: TaskRouteDecision): boolean {
  const step = decision.workflowStep;
  if (
    step.kind === "agent_episode" &&
    step.id === "agent.direct_verification" &&
    step.episode.purpose === "verification"
  ) {
    return true;
  }
  return (
    step.kind === "cli_operation" &&
    step.operation.id === "runner.follow" &&
    step.operation.params.mode === "run"
  );
}

function directCompletionEligibleRoute(decision: TaskRouteDecision): boolean {
  return (
    decision.workflowStep.kind === "terminal" &&
    decision.workflowStep.id === "task.complete.input" &&
    decision.task.verification === "ok"
  );
}

function staleRouteStop(opts: {
  decision: TaskRouteDecision;
  reason: string;
}): DirectTaskCloseoutStop {
  return {
    code: "stale_route",
    reason: opts.reason,
    route_step_id: opts.decision.workflowStep.id,
    operation_id:
      opts.decision.workflowStep.kind === "cli_operation"
        ? opts.decision.workflowStep.operation.id
        : null,
  };
}

function formalOperationFailureClass(error: unknown): string {
  if (error instanceof CliError) return error.code;
  if (error instanceof Error && error.name.trim()) return error.name;
  return "unknown_error";
}

/** Records CLI-owned checks and verification before the read-only evaluator freezes evidence. */
export async function verifyDirectTask(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  task: Pick<TaskData, "verify">;
  implementation_evidence?: DirectImplementationEvidence;
  evaluator?: DirectTaskCloseoutEvaluatorEvidence;
  decision: () => Promise<TaskRouteDecision>;
  on_lifecycle_operation?: () => void;
  journal: JournalRef;
}): Promise<DirectTaskVerificationOutcome> {
  const current = await opts.decision();
  if (!verificationEligibleRoute(current)) {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: 0,
      stop: staleRouteStop({
        decision: current,
        reason:
          "The route changed after the EVALUATOR result; the supervisor will not verify from a stale post-operation state.",
      }),
    };
  }

  let checks: Awaited<ReturnType<typeof runDirectTaskVerification>>;
  try {
    checks = await runDirectTaskVerification({
      command: opts.command,
      task: opts.task,
      task_id: opts.task_id,
      cwd: opts.ctx.cwd,
    });
  } catch {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: 0,
      stop: {
        code: "verification_check_failed",
        reason: "The CLI could not record the declared verification checks.",
        route_step_id: current.workflowStep.id,
        operation_id: "runner.follow",
      },
    };
  }
  const declaredChecks = checks.checks.length;
  if (checks.status !== "passed") {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: declaredChecks,
      stop: {
        code:
          checks.status === "unsupported"
            ? "verification_check_unsupported"
            : "verification_check_failed",
        reason: checks.reason ?? "A declared verification check did not pass.",
        route_step_id: current.workflowStep.id,
        operation_id: "runner.follow",
      },
    };
  }

  let verified: Awaited<ReturnType<typeof recordDirectTaskFormalOperation>>;
  try {
    verified = await recordDirectTaskFormalOperation({
      git_root: opts.command.resolvedProject.gitRoot,
      task_id: opts.task_id,
      id: "task_verify",
      decision: opts.decision,
      run: async () => {
        const exitCode = await cmdVerifyParsed({
          ctx: opts.command,
          cwd: opts.ctx.cwd,
          rootOverride: opts.ctx.rootOverride,
          taskId: opts.task_id,
          state: "ok",
          by: "SUPERVISOR",
          note: opts.evaluator
            ? "Verified: independent EVALUATOR pass is recorded in the task quality artifacts."
            : "Verified: CLI declared checks passed; independent EVALUATOR review is pending.",
          details: [
            ...checks.checks.map((check, index) =>
              [
                `Command: ${check.command}`,
                "Result: pass",
                `Evidence: ${checks.artifact_path}#check-${String(index + 1)}`,
                `Scope: direct task ${opts.task_id} declared verification`,
              ].join("\n"),
            ),
            ...(opts.implementation_evidence
              ? [
                  [
                    "Command: git diff --check <execution-base>..<implementation-commit>",
                    "Result: pass",
                    `Evidence: ${opts.implementation_evidence.artifact_path}#committed-diff-check`,
                    "Scope: direct CLI commit integrity verification",
                  ].join("\n"),
                  [
                    "Command: git diff --cached --check",
                    "Result: pass",
                    `Evidence: ${opts.implementation_evidence.artifact_path}#staged-diff-check`,
                    "Scope: direct CLI staged-index verification",
                  ].join("\n"),
                  [
                    "Command: git diff --name-status --diff-filter=ACDMRTUXB <execution-base>..<implementation-commit>",
                    "Result: pass",
                    `Evidence: ${opts.implementation_evidence.artifact_path}#commit-paths`,
                    "Scope: direct CLI implementation commit scope verification",
                  ].join("\n"),
                  [
                    "Command: git status --short --untracked-files=all",
                    "Result: pass",
                    `Evidence: ${opts.implementation_evidence.artifact_path}#final-repository-status`,
                    "Scope: direct CLI final repository audit and concurrent-artifact classification",
                  ].join("\n"),
                ]
              : []),
          ].join("\n\n"),
          localOnly: false,
          repoFixable: false,
          incidentTags: [],
          incidentMatch: [],
          quiet: true,
        });
        if (exitCode !== 0) {
          throw new CliError({
            code: "E_RUNTIME",
            message: `Direct task verification exited with ${exitCode}.`,
          });
        }
        return {
          verification: "ok",
          evaluator_result: opts.evaluator?.result_path ?? null,
          declared_checks: checks.artifact_path,
        };
      },
    });
  } catch (error) {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: declaredChecks,
      stop: {
        code: "verification_check_failed",
        reason:
          "The formal verification operation did not complete successfully " +
          `(${formalOperationFailureClass(error)}).`,
        route_step_id: current.workflowStep.id,
        operation_id: null,
      },
    };
  }
  opts.on_lifecycle_operation?.();
  if (!directCompletionEligibleRoute(verified.decision)) {
    return {
      journal: verified.journal,
      journal_path: verified.journal_path,
      status: "stopped",
      decision: verified.decision,
      declared_checks: declaredChecks,
      stop: staleRouteStop({
        decision: verified.decision,
        reason:
          "The route changed after verification; the supervisor will not finish from a stale completion state.",
      }),
    };
  }

  return {
    journal: verified.journal,
    journal_path: verified.journal_path,
    status: "verified",
    decision: verified.decision,
    declared_checks: declaredChecks,
  };
}

/** Finishes a direct task only after its verified evidence has passed EVALUATOR review. */
export async function finalizeDirectTask(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  decision: () => Promise<TaskRouteDecision>;
  execution_base_commit: string | null;
  allowed_paths: readonly string[];
  observed_changed_paths: readonly string[] | null;
  on_lifecycle_operation?: () => void;
  journal: JournalRef;
  declared_checks: number;
}): Promise<DirectTaskCloseoutOutcome> {
  const current = await opts.decision();
  if (!directCompletionEligibleRoute(current)) {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: opts.declared_checks,
      stop: staleRouteStop({
        decision: current,
        reason:
          "The route changed after the EVALUATOR result; the supervisor will not finish from a stale completion state.",
      }),
    };
  }
  let implementation: Awaited<ReturnType<typeof resolveDirectImplementationCommit>>;
  try {
    implementation = await resolveDirectImplementationCommit({
      command: opts.command,
      cwd: opts.ctx.cwd,
      task_id: opts.task_id,
      execution_base_commit: opts.execution_base_commit,
      allowed_paths: opts.allowed_paths,
      observed_changed_paths: opts.observed_changed_paths,
    });
  } catch {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: opts.declared_checks,
      stop: {
        code: "implementation_commit_missing",
        reason: "The CLI could not determine the committed implementation for direct finalization.",
        route_step_id: current.workflowStep.id,
        operation_id: null,
      },
    };
  }
  if (implementation.status !== "ready") {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: opts.declared_checks,
      stop: {
        code:
          implementation.status === "scope_violation"
            ? "implementation_scope_violation"
            : "implementation_commit_missing",
        reason: implementation.reason,
        route_step_id: current.workflowStep.id,
        operation_id: null,
      },
    };
  }

  let finalized: Awaited<ReturnType<typeof recordDirectTaskFormalOperation>>;
  try {
    finalized = await recordDirectTaskFormalOperation({
      git_root: opts.command.resolvedProject.gitRoot,
      task_id: opts.task_id,
      id: "task_finish",
      decision: opts.decision,
      run: async () => {
        const exitCode = await finishDirectTask({
          ctx: opts.ctx,
          command: opts.command,
          task_id: opts.task_id,
          implementation_commit: implementation.commit,
        });
        if (exitCode !== 0) {
          throw new CliError({
            code: "E_RUNTIME",
            message: `Direct task finalization exited with ${exitCode}.`,
          });
        }
        return { finalized: true, implementation_commit: implementation.commit };
      },
    });
  } catch {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: opts.declared_checks,
      stop: {
        code: "finish_failed",
        reason: "The formal task finish operation did not complete successfully.",
        route_step_id: current.workflowStep.id,
        operation_id: null,
      },
    };
  }
  opts.on_lifecycle_operation?.();
  if (String(finalized.decision.task.status).toUpperCase() !== "DONE") {
    return {
      journal: finalized.journal,
      journal_path: finalized.journal_path,
      status: "stopped",
      decision: finalized.decision,
      declared_checks: opts.declared_checks,
      stop: {
        code: "finish_failed",
        reason: "The finish operation returned without a DONE task route.",
        route_step_id: finalized.decision.workflowStep.id,
        operation_id: null,
      },
    };
  }
  return {
    journal: finalized.journal,
    journal_path: finalized.journal_path,
    status: "finalized",
    decision: finalized.decision,
    declared_checks: opts.declared_checks,
  };
}

/**
 * Compatibility composition for callers that already hold an EVALUATOR pass.
 * Direct supervision uses the two phases separately so the evaluator can see
 * CLI-owned verification evidence instead of requiring the executor to create it.
 */
export async function closeDirectTask(opts: {
  ctx: CommandCtx;
  command: CommandContext;
  task_id: string;
  task: Pick<TaskData, "verify">;
  evaluator: DirectTaskCloseoutEvaluatorEvidence;
  decision: () => Promise<TaskRouteDecision>;
  execution_base_commit: string | null;
  allowed_paths: readonly string[];
  observed_changed_paths: readonly string[] | null;
  on_lifecycle_operation?: () => void;
  journal: JournalRef;
}): Promise<DirectTaskCloseoutOutcome> {
  const verified = await verifyDirectTask(opts);
  if (verified.status === "stopped") return verified;
  return await finalizeDirectTask({
    ctx: opts.ctx,
    command: opts.command,
    task_id: opts.task_id,
    decision: opts.decision,
    execution_base_commit: opts.execution_base_commit,
    allowed_paths: opts.allowed_paths,
    observed_changed_paths: opts.observed_changed_paths,
    on_lifecycle_operation: opts.on_lifecycle_operation,
    journal: { journal: verified.journal, journal_path: verified.journal_path },
    declared_checks: verified.declared_checks,
  });
}
