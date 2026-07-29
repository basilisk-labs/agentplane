import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import { finishDirectTask, resolveDirectImplementationCommit } from "./direct-task-finalization.js";
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

export type DirectTaskCloseoutOutcome =
  | (JournalRef & {
      status: "finalized";
      decision: TaskRouteDecision;
      declared_checks: number;
    })
  | (JournalRef & {
      status: "stopped";
      decision: TaskRouteDecision;
      declared_checks: number;
      stop: DirectTaskCloseoutStop;
    });

function verificationEligibleRoute(decision: TaskRouteDecision): boolean {
  const step = decision.workflowStep;
  return (
    step.kind === "cli_operation" &&
    step.operation.id === "runner.follow" &&
    (step.operation.params.mode === "run" || step.operation.params.mode === "verify")
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

/**
 * Performs the non-semantic direct closeout. It accepts only a fresh route,
 * executes the declared check grammar, records verification evidence, then
 * delegates final status transition to the normal task finish command.
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
  journal: JournalRef;
}): Promise<DirectTaskCloseoutOutcome> {
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
          note: "Verified: independent EVALUATOR pass is recorded in the task quality artifacts.",
          details: [
            "EvaluatorEvidence:",
            `- evaluator: ${opts.evaluator.evaluator_id}`,
            `- result: ${opts.evaluator.result_path}`,
            `- report: ${opts.evaluator.report_path}`,
            `- receipt: ${opts.evaluator.receipt_path}`,
            "DeclaredCheckEvidence:",
            `- artifact: ${checks.artifact_path}`,
            `- status: ${checks.status}`,
            `- executed: ${checks.checks.length}`,
          ].join("\n"),
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
          evaluator_result: opts.evaluator.result_path,
          declared_checks: checks.artifact_path,
        };
      },
    });
  } catch {
    return {
      ...opts.journal,
      status: "stopped",
      decision: current,
      declared_checks: declaredChecks,
      stop: {
        code: "verification_check_failed",
        reason: "The formal verification operation did not complete successfully.",
        route_step_id: current.workflowStep.id,
        operation_id: null,
      },
    };
  }
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

  let implementation: Awaited<ReturnType<typeof resolveDirectImplementationCommit>>;
  try {
    implementation = await resolveDirectImplementationCommit({
      command: opts.command,
      cwd: opts.ctx.cwd,
      task_id: opts.task_id,
      execution_base_commit: opts.execution_base_commit,
      allowed_paths: opts.allowed_paths,
    });
  } catch {
    return {
      journal: verified.journal,
      journal_path: verified.journal_path,
      status: "stopped",
      decision: verified.decision,
      declared_checks: declaredChecks,
      stop: {
        code: "implementation_commit_missing",
        reason: "The CLI could not determine the committed implementation for direct finalization.",
        route_step_id: verified.decision.workflowStep.id,
        operation_id: null,
      },
    };
  }
  if (implementation.status !== "ready") {
    return {
      journal: verified.journal,
      journal_path: verified.journal_path,
      status: "stopped",
      decision: verified.decision,
      declared_checks: declaredChecks,
      stop: {
        code:
          implementation.status === "scope_violation"
            ? "implementation_scope_violation"
            : "implementation_commit_missing",
        reason: implementation.reason,
        route_step_id: verified.decision.workflowStep.id,
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
      journal: verified.journal,
      journal_path: verified.journal_path,
      status: "stopped",
      decision: verified.decision,
      declared_checks: declaredChecks,
      stop: {
        code: "finish_failed",
        reason: "The formal task finish operation did not complete successfully.",
        route_step_id: verified.decision.workflowStep.id,
        operation_id: null,
      },
    };
  }
  if (String(finalized.decision.task.status).toUpperCase() !== "DONE") {
    return {
      journal: finalized.journal,
      journal_path: finalized.journal_path,
      status: "stopped",
      decision: finalized.decision,
      declared_checks: declaredChecks,
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
    declared_checks: declaredChecks,
  };
}
