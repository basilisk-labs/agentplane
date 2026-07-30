import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import { terminalStep } from "./workflow-step-factory.js";

export function supersededProviderConflictStep(state: WorkflowRouteState): WorkflowStep | null {
  if (!state.prFlow?.queue.present || state.prFlow.queue.status !== "superseded") return null;
  const successor = state.prFlow.queue.supersededByTaskId ?? "a recorded successor";
  return terminalStep({
    state,
    id: "terminal.provider_conflict_superseded",
    code: "provider_conflict_superseded",
    phase: "provider_conflict_superseded",
    checkout: "base_checkout",
    role: "INTEGRATOR",
    outcome: "superseded",
    summary:
      `semantic provider-conflict outcome is superseded by ${successor}; ` +
      "the closed PR must not be reopened, queued, or integrated",
    mustNot: [
      "do not reopen, merge, queue, or clean up the closed superseded PR as though it integrated",
    ],
  });
}
