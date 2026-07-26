import type { StateFingerprint } from "@agentplaneorg/core/schemas";

import type { WorkflowStep } from "./workflow-step.js";
import type { WorkflowRouteStateInput } from "./workflow-step-fingerprint.js";
import { reduceRouteState } from "./workflow-step-reducer.js";

function hasSameWorkflowStepClassification(left: WorkflowStep, right: WorkflowStep): boolean {
  return (
    left.kind === right.kind &&
    left.id === right.id &&
    left.authoritativeCheckout === right.authoritativeCheckout
  );
}

function isResolvedSideEffectAuthority(draft: WorkflowStep, resolved: WorkflowStep): boolean {
  return (
    draft.kind === "approval" &&
    draft.request.type === "side_effect" &&
    resolved.kind === "cli_operation" &&
    draft.request.operationId === resolved.operation.id
  );
}

/**
 * A durable authority is scoped to the fully observed fingerprint, while the
 * first route reduction uses a cheap bootstrap fingerprint. A matching grant
 * may therefore turn the provisional approval into its protected CLI step
 * once the full fingerprint is attached. Re-capture exactly once so the final
 * step carries a fingerprint for its own classification, not the approval.
 */
export async function stabilizeWorkflowStepAfterFingerprint(opts: {
  state: WorkflowRouteStateInput;
  draft: WorkflowStep;
  capture: (step: WorkflowStep) => Promise<StateFingerprint>;
}): Promise<WorkflowStep> {
  const firstFingerprint = await opts.capture(opts.draft);
  const resolved = reduceRouteState({ ...opts.state, preconditionFingerprint: firstFingerprint });
  if (hasSameWorkflowStepClassification(resolved, opts.draft)) return resolved;
  if (!isResolvedSideEffectAuthority(opts.draft, resolved)) {
    throw new Error("WorkflowStep classification changed while attaching StateFingerprint.");
  }
  const stabilizedFingerprint = await opts.capture(resolved);
  const stabilized = reduceRouteState({
    ...opts.state,
    preconditionFingerprint: stabilizedFingerprint,
  });
  if (!hasSameWorkflowStepClassification(stabilized, resolved)) {
    throw new Error("WorkflowStep classification changed while stabilizing side-effect authority.");
  }
  return stabilized;
}
