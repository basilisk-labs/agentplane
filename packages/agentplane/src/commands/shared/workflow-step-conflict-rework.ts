import type { WorkflowRouteState, WorkflowStep } from "./workflow-step.js";
import {
  agentEpisodeStep,
  cliOperationStep,
  routeBlockerFor,
  terminalStep,
} from "./workflow-step-factory.js";

function providerConflictReworkStep(state: WorkflowRouteState): WorkflowStep {
  const preparation = state.conflictRework;
  if (preparation?.state !== "ready") {
    throw new Error("providerConflictReworkStep requires a ready conflict-rework packet");
  }
  const packet = preparation.packet;
  return agentEpisodeStep({
    state,
    id: "agent.provider_conflict_rework",
    code: "semantic_conflict_rework_required",
    phase: "provider_merge_conflict",
    checkout: "task_worktree",
    role: "CODER",
    purpose: "implementation_rework",
    summary:
      "provider reports a current PR merge conflict; validate the bounded context packet, then let CODER make the semantic resolution in the dedicated task worktree",
    objective:
      "Revalidate the provider conflict packet, make the semantic resolution without CLI-selected hunks, commit it, then refresh provider truth and repeat normal verification before publication.",
    semanticMutationAllowed: true,
    compatibilityCommand: packet.resolution_contract.revalidate_command,
    mustNot: [
      "do not treat candidate conflict paths as selected hunks or a semantic resolution",
      "do not auto-rebase, auto-merge, force-push, or rewrite the task branch through AgentPlane",
      "do not publish, queue, clean up, or integrate before a new resolution commit has fresh provider truth and verification",
    ],
    returnControlWhen:
      "after CODER records a semantic resolution commit, refreshes provider truth, and records fresh verification; recompute task next-action with remote truth before PR publication or queue handoff",
    evidenceMissing: [
      "fresh_conflict_rework_packet",
      "semantic_conflict_resolution_commit",
      "post_resolution_provider_truth",
      "post_resolution_verification",
    ],
    selectedBlocker: routeBlockerFor(state, "provider_merge_conflict"),
  });
}

function legacyProtectedConflictAdoptionStep(state: WorkflowRouteState): WorkflowStep {
  const preparation = state.conflictRework;
  if (preparation?.state !== "adoption_required") {
    throw new Error(
      "legacyProtectedConflictAdoptionStep requires an adoption-required conflict-rework preparation",
    );
  }
  return cliOperationStep({
    state,
    operationId: "integration.adopt_legacy_protected_conflict",
    params: {
      taskId: state.task.id,
      expectedAdoptionToken: preparation.adoption.token,
    },
    code: "adopt_legacy_protected_conflict",
    summary:
      "record the formal INTEGRATOR receipt for the verified legacy protected PR conflict, then recompute live route truth before semantic resolution",
    selectedBlocker: routeBlockerFor(state, "legacy_protected_conflict_adoption_required"),
  });
}

function conflictReworkContextInvalidStep(state: WorkflowRouteState): WorkflowStep {
  const preparation = state.conflictRework;
  const detail =
    preparation?.state === "invalid" ? preparation.reason : "conflict context is absent";
  return terminalStep({
    state,
    id: "terminal.provider_conflict_context_invalid",
    code: "refresh_conflict_rework_context",
    phase: "provider_merge_conflict_context_invalid",
    checkout: "base_checkout",
    role: "CODER",
    outcome: "repair_required",
    command: `agentplane pr conflict-rework ${state.task.id}`,
    summary:
      `provider conflict or mergeability context is stale or incomplete: ${detail}. ` +
      "Refresh the read-only packet and repair the exact missing identity before semantic resolution.",
    mustNot: [
      "do not infer conflict hunks, rebase, merge, force-push, publish, enqueue, or clean up from incomplete provider context",
    ],
    evidenceMissing: ["fresh_conflict_rework_packet"],
    selectedBlocker: routeBlockerFor(state, "provider_conflict_context_invalid"),
  });
}

export function conflictReworkRouteStep(state: WorkflowRouteState): WorkflowStep | null {
  if (
    state.blockers.some((blocker) => blocker.code === "legacy_protected_conflict_adoption_required")
  ) {
    return legacyProtectedConflictAdoptionStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "provider_conflict_context_invalid")) {
    return conflictReworkContextInvalidStep(state);
  }
  if (state.blockers.some((blocker) => blocker.code === "provider_merge_conflict")) {
    return providerConflictReworkStep(state);
  }
  return null;
}
