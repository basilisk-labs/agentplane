import { getHumanInputState, humanInputAnswerCommand } from "../task/human-input.js";
import { isPlannerSemanticPlanRequired } from "../task/doc-template.js";
import { extractDocSection } from "../task/shared.js";
import { branchStep, doneBranchStep } from "./workflow-step-branch.js";
import {
  approvalStep,
  agentEpisodeStep,
  cliOperationStep,
  commonExecution,
  directStep,
  includedBatchStep,
  routeBlockerFor,
  routeBlockerSnapshot,
  terminalStep,
} from "./workflow-step-factory.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

export function planningCheckout(state: WorkflowRouteState): "base_checkout" | "task_worktree" {
  return state.workflowMode === "branch_pr" && state.taskWorktree?.worktreePath
    ? "task_worktree"
    : "base_checkout";
}

export function reduceRouteState(state: WorkflowRouteState): WorkflowStep {
  const id = state.task.id;
  if (state.task.status === "DONE" && state.workflowMode !== "branch_pr") {
    if (state.blockers.some((blocker) => blocker.code === "dirty_task_artifacts")) {
      return cliOperationStep({
        state,
        operationId: "task.artifacts.commit",
        params: { taskId: id },
        code: "commit_direct_task_artifacts",
        summary:
          "task is marked done but tracked task artifacts still need the deterministic cleanup commit",
        selectedBlocker: routeBlockerFor(state, "dirty_task_artifacts"),
      });
    }
    return terminalStep({
      state,
      id: "terminal.done",
      code: "done",
      phase: "done",
      checkout: "current_checkout",
      role: "CODER",
      outcome: "done",
      summary: "task is already done; no branch cleanup is required in direct workflow",
      selectedBlocker: null,
    });
  }
  if (
    state.task.status === "DONE" &&
    state.workflowMode === "branch_pr" &&
    state.batchOwnership.role !== "included"
  ) {
    return doneBranchStep(state);
  }
  const humanInput = getHumanInputState(state.task);
  if (humanInput.openQuestion) {
    const fingerprint = state.preconditionFingerprint;
    const summary = `answer the open user question before continuing: ${humanInput.openQuestion.question}`;
    return {
      schemaVersion: 1,
      id: "human_input.open_question",
      kind: "human_input",
      phase: "human_input_required",
      authoritativeCheckout: "current_checkout",
      summary,
      blockers: routeBlockerSnapshot(state),
      selectedBlocker: routeBlockerFor(state, "human_input_required"),
      compatibility: {
        code: "answer_user_question",
        command: humanInputAnswerCommand(id),
        summary,
        requiresApproval: true,
      },
      preconditionFingerprint: fingerprint,
      request: {
        type: "open_question",
        taskId: id,
        questionId: humanInput.openQuestion.id,
        question: humanInput.openQuestion.question,
      },
      execution: commonExecution({ actionKind: "provider_action", role: "USER" }),
    };
  }
  if (isPlannerSemanticPlanRequired(extractDocSection(String(state.task.doc ?? ""), "Plan"))) {
    return agentEpisodeStep({
      state,
      id: "agent.planning",
      code: "semantic_planning_required",
      phase: "semantic_planning_required",
      checkout: planningCheckout(state),
      role: "PLANNER",
      purpose: "planning",
      summary:
        "prepare a task-specific semantic plan before requesting plan approval or owner-scoped execution",
      objective:
        "Turn the task intent, scope, relevant context, and verification needs into a concrete implementation plan without approving or starting the task.",
      mustNot: [
        "do not approve the plan or start implementation",
        "do not mutate implementation, Git history, provider state, or task lifecycle status",
        "do not keep a generated planning placeholder or legacy synthetic plan as the proposed plan",
      ],
      returnControlWhen:
        "after PLANNER records a task-specific Plan with task plan set; request a fresh action packet for approval",
      verificationCandidate: `agentplane task plan set ${id} --text "<task-specific-plan>" --updated-by PLANNER`,
      evidenceMissing: ["semantic_plan"],
      compatibilityCommand: `agentplane task plan set ${id} --text "<task-specific-plan>" --updated-by PLANNER`,
      selectedBlocker: routeBlockerFor(state, "plan_not_approved"),
    });
  }
  if (state.task.plan_approval?.state !== "approved") {
    return approvalStep({
      state,
      id: "approval.plan",
      code: "approve_plan",
      phase: "needs_plan_approval",
      checkout: planningCheckout(state),
      type: "plan_approval",
      summary: "approve the task plan before owner-scoped execution",
      command: `agentplane task plan approve ${id} --by USER`,
      selectedBlocker: routeBlockerFor(state, "plan_not_approved"),
    });
  }
  if (state.blockers.some((blocker) => blocker.code === "dependency_not_ready")) {
    const summary =
      routeBlockerFor(state, "dependency_not_ready")?.summary ??
      "wait until every task dependency is complete";
    return {
      schemaVersion: 1,
      id: "wait.dependencies",
      kind: "wait",
      phase: "dependency_wait",
      authoritativeCheckout: "base_checkout",
      summary,
      blockers: routeBlockerSnapshot(state),
      selectedBlocker: routeBlockerFor(state, "dependency_not_ready"),
      compatibility: {
        code: "wait_dependencies",
        command: null,
        summary,
        requiresApproval: false,
      },
      preconditionFingerprint: state.preconditionFingerprint,
      condition: { type: "dependencies_ready", taskId: id },
      execution: commonExecution({
        actionKind: "wait",
        role: "USER",
        mustNot: ["do not start or force the task while declared dependencies are incomplete"],
      }),
    };
  }
  if (state.workflowMode === "branch_pr" && state.batchOwnership.role === "included") {
    return includedBatchStep(state);
  }
  if (state.workflowMode !== "branch_pr") return directStep(state);
  return branchStep(state);
}
