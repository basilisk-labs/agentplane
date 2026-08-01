import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import type { RouteBlocker } from "./route-oracle.js";
import { cliOperationStep } from "./workflow-step-authority.js";
import {
  authorityRef,
  commonExecution,
  routeBlockerFor,
  routeBlockerSnapshot,
  selectedRouteBlocker,
} from "./workflow-step-common.js";
import {
  type WorkflowCheckout,
  type WorkflowOperationParams,
  type WorkflowRole,
  type WorkflowRouteState,
  type WorkflowStep,
} from "./workflow-step.js";
export { cliOperationStep } from "./workflow-step-authority.js";
export {
  commonExecution,
  routeBlockerFor,
  routeBlockerSnapshot,
  workSlug,
} from "./workflow-step-common.js";

export function agentEpisodeStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  role: WorkflowRole;
  purpose: Extract<WorkflowStep, { kind: "agent_episode" }>["episode"]["purpose"];
  summary: string;
  objective: string;
  semanticMutationAllowed?: boolean;
  mustNot?: readonly string[];
  returnControlWhen?: string;
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  compatibilityCommand?: string | null;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "agent_episode",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.compatibilityCommand ?? null,
      summary: opts.summary,
      requiresApproval: false,
    },
    preconditionFingerprint: fingerprint,
    episode: {
      purpose: opts.purpose,
      role: opts.role,
      taskId: opts.state.task.id,
      objective: opts.objective,
    },
    execution: commonExecution({
      actionKind: "stop",
      role: opts.role,
      semanticMutationAllowed: opts.semanticMutationAllowed,
      mustNot: opts.mustNot,
      returnControlWhen: opts.returnControlWhen,
      verificationCandidate: opts.verificationCandidate,
      evidenceMissing: opts.evidenceMissing,
      needsVerificationRecord: opts.purpose === "verification",
    }),
  };
}

export function terminalStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  role: WorkflowRole;
  outcome: Extract<WorkflowStep, { kind: "terminal" }>["outcome"]["type"];
  summary: string;
  command?: string | null;
  requiresApproval?: boolean;
  mustNot?: readonly string[];
  verificationCandidate?: string | null;
  evidenceMissing?: readonly string[];
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "terminal",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.command ?? null,
      summary: opts.summary,
      requiresApproval: opts.requiresApproval === true,
    },
    preconditionFingerprint: fingerprint,
    outcome: { type: opts.outcome, taskId: opts.state.task.id },
    execution: commonExecution({
      actionKind: "stop",
      role: opts.role,
      mustNot: opts.mustNot,
      verificationCandidate: opts.verificationCandidate,
      evidenceMissing: opts.evidenceMissing,
    }),
  };
}

export function approvalStep(opts: {
  state: WorkflowRouteState;
  id: string;
  code: string;
  phase: string;
  checkout: WorkflowCheckout;
  type: "plan_approval" | "provider_merge";
  summary: string;
  command: string | null;
  selectedBlocker?: RouteBlocker | null;
}): WorkflowStep {
  const fingerprint = opts.state.preconditionFingerprint;
  return {
    schemaVersion: 1,
    id: opts.id,
    kind: "approval",
    phase: opts.phase,
    authoritativeCheckout: opts.checkout,
    summary: opts.summary,
    blockers: routeBlockerSnapshot(opts.state),
    selectedBlocker: selectedRouteBlocker(opts.state, opts.selectedBlocker),
    compatibility: {
      code: opts.code,
      command: opts.command,
      summary: opts.summary,
      requiresApproval: true,
    },
    preconditionFingerprint: fingerprint,
    request: {
      type: opts.type,
      taskId: opts.state.task.id,
      authorityRef: authorityRef(fingerprint),
    },
    execution: commonExecution({ actionKind: "provider_action", role: "USER" }),
  };
}

function runnerParams(state: WorkflowRouteState): WorkflowOperationParams["runner.follow"] {
  const id = state.task.id;
  const action = state.resume.runner.next_action;
  if (action === "cancel_then_resume") {
    return {
      mode: "reclaim",
      taskId: id,
      author: state.task.owner,
      reason: "stale runner pid is no longer alive",
    };
  }
  if (action === "wait") {
    return { mode: "status", taskId: id, runId: state.resume.runner.run_id ?? null };
  }
  return { mode: "run", taskId: id };
}

export function directStep(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  if (
    state.task.verification?.state === "ok" &&
    String(state.task.status).toUpperCase() === "DOING"
  ) {
    return terminalStep({
      state,
      id: "task.complete.input",
      code: "complete_direct",
      phase: "direct_verified_pending_closeout",
      checkout: "current_checkout",
      role: "CODER",
      outcome: "input_required",
      command: `agentplane task complete ${id} --result "<result>" --commit <hash>`,
      summary:
        "task is already verified in direct workflow; close it with task complete instead of rerunning execution",
    });
  }
  if (state.resume.runner.run_id || state.resume.runner.status) {
    if (state.resume.runner.next_action === "none") {
      return agentEpisodeStep({
        state,
        id: "agent.direct_verification",
        code: "review_direct_verification",
        phase: "direct_verification_required",
        checkout: "current_checkout",
        role: "TESTER",
        purpose: "verification",
        summary:
          `runner work is complete; execute the declared Verify Steps, then record ` +
          `agentplane verify ${id} --ok|--rework with evidence`,
        objective:
          "Verify the completed direct-runner work against the declared contract and record an evidence-based verdict.",
        mustNot: [
          "do not rerun the completed runner episode unless verification identifies implementation rework",
          "do not replace the verification verdict with task verify-show or another read-only diagnostic",
          "do not close the task before TESTER records verification evidence",
        ],
        returnControlWhen:
          "after TESTER records the evidence-based verification outcome; recompute task next-action before direct closeout",
        verificationCandidate: `agentplane verify ${id} --ok|--rework --by TESTER --note "..."`,
        evidenceMissing: ["verification_record"],
        selectedBlocker: null,
      });
    }
    const code = state.resume.runner.next_action ?? "continue_direct";
    return cliOperationStep({
      state,
      operationId: "runner.follow",
      params: runnerParams(state),
      code,
      summary: "continue the direct-mode task from the current checkout",
      selectedBlocker: routeBlockerFor(state, "runner_alive"),
    });
  }
  if (String(state.task.status).toUpperCase() !== "DOING") {
    const body = "Start: continue direct-mode task in current checkout.";
    return cliOperationStep({
      state,
      operationId: "task.start",
      params: { taskId: id, author: state.task.owner, body },
      code: "start_direct",
      summary: "continue the direct-mode task from the current checkout",
      selectedBlocker: null,
    });
  }
  return cliOperationStep({
    state,
    operationId: "runner.follow",
    params: { mode: "run", taskId: id },
    code: "continue_direct",
    summary:
      "launch the prepared direct-mode EXECUTOR episode through the configured runner adapter",
    selectedBlocker: null,
  });
}

export function verifiedIncludedClosureCandidate(task: TaskData): boolean {
  if (task.verification?.state !== "ok") return false;
  if (String(task.status).toUpperCase() !== "DOING") return false;
  if (task.commit?.hash) return false;
  const batch = isRecord(task.extensions?.branch_pr_batch) ? task.extensions.branch_pr_batch : null;
  if (batch?.role !== "included") return false;
  const primaryTaskId =
    typeof batch.primary_task_id === "string" ? batch.primary_task_id.trim() : "";
  const branch = typeof batch.branch === "string" ? batch.branch.trim() : "";
  const base = typeof batch.base === "string" ? batch.base.trim() : "";
  return Boolean(primaryTaskId && branch && base);
}

export function taskWorktreeBlocker(state: WorkflowRouteState): RouteBlocker | null {
  if (state.workflowMode !== "branch_pr") return null;
  return (
    state.blockers.find(
      (blocker) =>
        blocker.code === "task_worktree_dirty" ||
        blocker.code === "task_worktree_state_unavailable",
    ) ?? null
  );
}

export function implementationReworkStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.implementation_rework",
    code: "implementation_rework_required",
    phase: "implementation_rework_required",
    checkout: "task_worktree",
    role: "CODER",
    purpose: "implementation_rework",
    summary:
      "return control to the CODER for implementation rework in the task worktree, then verify again",
    objective: "Complete semantic implementation rework while preserving evaluator evidence.",
    semanticMutationAllowed: true,
    mustNot: [
      "do not update, open, publish, queue, or integrate the PR until implementation rework is complete and verified again",
      "do not overwrite or synthesize the persisted EVALUATOR verdict, summary, or findings",
      "do not mutate task lifecycle or PR state while control belongs to implementation rework",
    ],
    returnControlWhen:
      "after the CODER completes implementation rework and records verification; recompute task next-action before PR handling",
    selectedBlocker: routeBlockerFor(state, "implementation_rework_required"),
  });
}

export function branchImplementationStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.branch_implementation",
    code: "continue_branch_implementation",
    phase: "branch_implementation",
    checkout: "task_worktree",
    role: "CODER",
    purpose: "implementation",
    summary:
      "hand the branch_pr task to CODER for semantic implementation in the dedicated task worktree",
    objective:
      "Complete the task's semantic implementation, create an intended branch commit, and record that implementation commit before verification is handed to TESTER.",
    semanticMutationAllowed: true,
    mustNot: [
      "do not publish, queue, integrate, or close the PR while semantic implementation belongs to CODER",
      "do not record verification as CODER; after the implementation commit is recorded, recompute task next-action for the TESTER handoff",
      "do not replace the implementation episode with a generic runner or retry operation",
    ],
    returnControlWhen:
      "after CODER records the committed implementation with task set-status while preserving DOING, then recompute task next-action for TESTER verification",
    selectedBlocker: null,
  });
}

export function worktreeResolutionStep(
  state: WorkflowRouteState,
  blocker: RouteBlocker,
): WorkflowStep {
  const checkout =
    state.batchOwnership.role === "included" ? "primary_task_worktree" : "task_worktree";
  const summary =
    `${blocker.summary}; inspect the task worktree, commit intended changes or ` +
    "restore unintended changes, then repeat verification and recompute the route";
  return agentEpisodeStep({
    state,
    id: "agent.task_worktree_resolution",
    code: "resolve_task_worktree_state",
    phase: "task_worktree_blocked",
    checkout,
    role: "CODER",
    purpose: "task_worktree_resolution",
    summary,
    objective: "Classify and resolve the task worktree changes without guessing intent.",
    semanticMutationAllowed:
      blocker.code === "task_worktree_dirty" && String(state.task.status).toUpperCase() === "DOING",
    mustNot: [
      "do not publish, enqueue, claim, reserve, verify, or integrate while the actual task worktree has uncommitted changes or cannot be inspected",
      "do not infer whether uncommitted changes are intended; return that semantic decision to the CODER",
    ],
    returnControlWhen:
      "after the CODER makes the task worktree clean and records fresh verification; recompute task next-action before PR handling",
    selectedBlocker: blocker,
  });
}

export function verificationStep(state: WorkflowRouteState): WorkflowStep {
  const checkout =
    state.batchOwnership.role === "included" ? "primary_task_worktree" : "task_worktree";
  return agentEpisodeStep({
    state,
    id: "agent.verification",
    code: "verification_required",
    phase: "verification_required",
    checkout,
    role: "TESTER",
    purpose: "verification",
    summary:
      "hand the committed task implementation to TESTER for evidence-based verification; record the verification outcome before closure, hosted checks, or integration",
    objective: "Execute the declared verification contract and record an evidence-based verdict.",
    mustNot: [
      "do not close, enqueue, claim, reserve, or integrate before TESTER records an evidence-based verification outcome",
      "do not synthesize a verification outcome or executable verification command from route state",
    ],
    returnControlWhen:
      "after TESTER records the evidence-based verification outcome; recompute task next-action before PR handling",
    verificationCandidate: "agentplane task verify-show <task-id>",
    evidenceMissing: ["verification_record"],
    selectedBlocker: routeBlockerFor(state, "verification_required"),
  });
}

export function qualityEvidenceRefreshStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.quality_evidence_refresh",
    code: "quality_evidence_refresh_required",
    phase: "quality_evidence_refresh_needed",
    checkout: "task_worktree",
    role: "TESTER",
    purpose: "verification",
    summary:
      "a fresh EVALUATOR block is bound to the current work unit; refresh only the declared deterministic verification evidence before another semantic review",
    objective:
      "Execute the declared verification contract against the reviewed work unit and record its evidence without changing implementation or assigning a semantic quality verdict.",
    mustNot: [
      "do not change implementation, task scope, or the EVALUATOR verdict while refreshing deterministic evidence",
      "do not publish, queue, close, or integrate the PR before a fresh EVALUATOR review follows the verification record",
      "do not synthesize a semantic verdict from the refreshed mechanical checks",
    ],
    returnControlWhen:
      "after TESTER records fresh verification evidence; recompute the route and return semantic review to EVALUATOR",
    verificationCandidate: "agentplane task verify-show <task-id>",
    evidenceMissing: ["fresh_verification_record", "fresh_evaluator_quality_review"],
    selectedBlocker: routeBlockerFor(state, "quality_review_stale"),
  });
}

export function qualityReviewStep(state: WorkflowRouteState): WorkflowStep {
  return agentEpisodeStep({
    state,
    id: "agent.quality_review",
    code: "quality_review_required",
    phase: "quality_review_needed",
    checkout: "task_worktree",
    role: "EVALUATOR",
    purpose: "quality_review",
    summary:
      "semantic quality review is required; run an EVALUATOR episode or explicitly record a human-supplied review",
    objective:
      "Evaluate implementation quality from task intent, diff, and evidence without synthesizing mechanical checks.",
    mustNot: [
      "do not publish or queue the PR before quality_review is recorded for the current implementation head",
      "do not synthesize verdict, summary, or findings from lint, tests, route state, or other mechanical checks",
    ],
    evidenceMissing: ["evaluator_quality_review"],
    selectedBlocker: routeBlockerFor(state, "quality_review_missing", "quality_review_stale"),
  });
}

export function includedBatchStep(state: WorkflowRouteState): WorkflowStep {
  if (state.batchOwnership.role !== "included") {
    throw new Error("includedBatchStep requires included batch ownership");
  }
  const current = state.batchOwnership.taskStates.find((task) => task.id === state.task.id);
  if (current?.verification !== "ok") {
    const command =
      `agentplane verify ${state.task.id} --ok|--rework --by ${state.task.owner} ` + '--note "..."';
    return agentEpisodeStep({
      state,
      id: "agent.included_task_verification",
      code: "verify_included_task",
      phase: "batch_delegate",
      checkout: "primary_task_worktree",
      role: "EVALUATOR",
      purpose: "verification",
      summary:
        "this task is included in a primary batch PR; verify this task instead of opening a separate PR",
      objective: "Verify the included task against its own declared contract.",
      compatibilityCommand: command,
      verificationCandidate: command,
      evidenceMissing: ["verification_record"],
      selectedBlocker: routeBlockerFor(state, "verification_required"),
    });
  }
  const primaryId = state.batchOwnership.primaryTaskId;
  return cliOperationStep({
    state,
    operationId: "batch.follow_primary",
    params: { taskId: primaryId },
    code: "follow_primary_batch",
    summary:
      "this included task is verified; continue through the primary batch task and shared PR branch",
    selectedBlocker: null,
  });
}
