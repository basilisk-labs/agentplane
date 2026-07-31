import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import {
  cliOperationStep,
  commonExecution,
  implementationReworkStep,
  routeBlockerSnapshot,
  terminalStep,
} from "./workflow-step-factory.js";

function integrationQueueWaitStep(
  state: WorkflowRouteState,
  queueStatus: "queued" | "claimed" | "handoff" | "done",
): WorkflowStep {
  const summary =
    queueStatus === "done"
      ? "wait for merged provider truth after the integration queue completed"
      : `wait for the integration queue entry to leave ${queueStatus}`;
  return {
    schemaVersion: 1,
    id: "wait.integration_queue",
    kind: "wait",
    phase: "integration_queue_wait",
    authoritativeCheckout: "base_checkout",
    summary,
    blockers: routeBlockerSnapshot(state),
    selectedBlocker: null,
    compatibility: {
      code: "wait_integration_queue",
      command: null,
      summary,
      requiresApproval: false,
    },
    preconditionFingerprint: state.preconditionFingerprint,
    condition: {
      type: "integration_queue_terminal",
      taskId: state.task.id,
      queueStatus,
    },
    execution: commonExecution({
      actionKind: "wait",
      role: "INTEGRATOR",
      mustNot: [
        "do not enqueue the same task again while its integration queue entry is active or completed",
      ],
    }),
  };
}

function queueMatchesCurrentRoute(state: WorkflowRouteState): boolean {
  const flow = state.prFlow;
  const queue = flow?.queue;
  if (!flow || !queue?.present || flow.pr.state === "not_found") return false;
  return (
    queue.branch === flow.branch.name &&
    queue.headSha === flow.branch.headSha &&
    queue.base === flow.pr.base &&
    queue.prNumber === flow.pr.prNumber
  );
}

export function integrationQueueStep(
  state: WorkflowRouteState,
  enqueueSummary: string,
): WorkflowStep {
  const queue = state.prFlow?.queue;
  if (queue?.present) {
    if (queue.status === "superseded") {
      return terminalStep({
        state,
        id: "terminal.integration_superseded",
        code: "integration_superseded",
        phase: "integration_superseded",
        checkout: "base_checkout",
        role: "INTEGRATOR",
        outcome: "superseded",
        summary: queue.reason ?? "integration queue entry was superseded",
        evidenceMissing: [],
      });
    }
    const identityMatches = queueMatchesCurrentRoute(state);
    if (queue.status === "claimed" || queue.status === "handoff") {
      return integrationQueueWaitStep(state, queue.status);
    }
    if (identityMatches) {
      if (queue.status === "rework") return implementationReworkStep(state);
      return integrationQueueWaitStep(state, queue.status);
    }
  }

  const branch = state.prFlow?.branch.name;
  if (!branch) {
    return terminalStep({
      state,
      id: "terminal.pr_branch_metadata_repair",
      code: "repair_pr_branch_metadata",
      phase: "pr_branch_metadata_missing",
      checkout: "base_checkout",
      role: "INTEGRATOR",
      outcome: "repair_required",
      summary:
        "the hosted PR is open but structured task branch metadata is absent; refresh route metadata before integration",
      evidenceMissing: ["task_branch"],
    });
  }

  return cliOperationStep({
    state,
    operationId: "integration.enqueue",
    params: { taskId: state.task.id, branch },
    code: "wait_hosted_checks",
    summary: enqueueSummary,
    selectedBlocker: null,
  });
}
