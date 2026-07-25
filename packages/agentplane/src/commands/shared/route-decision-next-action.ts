import type { RouteNextAction } from "./route-decision-types.js";
import type { WorkflowRouteState } from "./workflow-step.js";
import { projectWorkflowStepNextAction } from "./workflow-step-projections.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import {
  withBootstrapWorkflowFingerprint,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";

/**
 * Compatibility projection for callers that still consume next_action.
 *
 * Route orchestration must call reduceRouteState directly and keep WorkflowStep
 * as the internal protocol. The rendered command is an external CLI surface.
 */
export function deriveNextAction(
  state: WorkflowRouteState | WorkflowRouteStateInput,
): RouteNextAction {
  const routedState =
    "preconditionFingerprint" in state ? state : withBootstrapWorkflowFingerprint(state);
  return projectWorkflowStepNextAction(reduceRouteState(routedState));
}
