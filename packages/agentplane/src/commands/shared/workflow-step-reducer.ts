import { getHumanInputState, humanInputAnswerCommand } from "../task/human-input.js";
import { branchStep, doneBranchStep } from "./workflow-step-branch.js";
import {
  approvalStep,
  cliOperationStep,
  commonExecution,
  directStep,
  includedBatchStep,
  routeBlockerFor,
  routeBlockerSnapshot,
  terminalStep,
} from "./workflow-step-factory.js";
import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";

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
  if (state.task.plan_approval?.state !== "approved") {
    return approvalStep({
      state,
      id: "approval.plan",
      code: "approve_plan",
      phase: "needs_plan_approval",
      checkout: "base_checkout",
      type: "plan_approval",
      summary: "approve the task plan before owner-scoped execution",
      command: `agentplane task plan approve ${id} --by ORCHESTRATOR`,
      selectedBlocker: routeBlockerFor(state, "plan_not_approved"),
    });
  }
  if (state.workflowMode === "branch_pr" && state.batchOwnership.role === "included") {
    return includedBatchStep(state);
  }
  if (state.workflowMode !== "branch_pr") return directStep(state);
  return branchStep(state);
}
