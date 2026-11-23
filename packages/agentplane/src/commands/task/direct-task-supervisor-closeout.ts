import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import { type DirectImplementationEvidence } from "./direct-task-finalization.js";
import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";
import {
  renderDirectTaskVerificationDetails,
  runDirectTaskVerification,
} from "./direct-task-verification.js";
import { cmdVerifyParsed } from "./verify-record.js";

type DirectTaskCloseoutStopCode =
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

function directEvaluationEligibleRoute(decision: TaskRouteDecision): boolean {
  return (
    directCompletionEligibleRoute(decision) ||
    (decision.workflowStep.kind === "agent_episode" &&
      decision.workflowStep.id === "agent.direct_quality_review" &&
      decision.workflowStep.episode.purpose === "quality_review")
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
  task: Pick<TaskData, "verify" | "execution_contract">;
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
            renderDirectTaskVerificationDetails({
              task: opts.task,
              taskId: opts.task_id,
              workflow: "direct",
              result: checks,
            }),
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
  if (!directEvaluationEligibleRoute(verified.decision)) {
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
