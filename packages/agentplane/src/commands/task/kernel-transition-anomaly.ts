import { taskKernel as k } from "@agentplaneorg/core/tasks";

export const INTERNAL_ORCHESTRATOR_TRANSITION_FUSE = 1000;

const RECOVERY_STRATEGIES = ["route_refresh", "repository_checkpoint"] as const;

function anomalyAction(input: {
  summary: string;
  semantic_state_digest: string;
  repetition_count: number;
  exhausted_recovery_strategies: readonly string[];
}) {
  return {
    kind: "human_required" as const,
    reason: "internal_anomaly",
    diagnostic: {
      code: "orchestrator_tight_loop" as const,
      ...input,
      resume_hint: "Inspect the route and repository checkpoint, then rerun task advance.",
    },
  };
}

export function createKernelTransitionAnomalyTracker(taskId: string) {
  const visits = new Map<string, number>();
  let lastDigest = k.kernelDigest({ task_id: taskId, state: "initial" });
  return {
    reset() {
      visits.clear();
    },
    observe(input: {
      reason_code: string;
      work_item_id: string | null;
      record_digest: string;
      repository_fingerprint: string;
    }) {
      const digest = k.kernelDigest(input);
      lastDigest = digest;
      const repetitionCount = (visits.get(digest) ?? 0) + 1;
      visits.set(digest, repetitionCount);
      if (repetitionCount === 2) return { kind: "refresh" as const };
      if (repetitionCount === 3) return { kind: "checkpoint" as const };
      if (repetitionCount > RECOVERY_STRATEGIES.length + 1) {
        return {
          kind: "stop" as const,
          action: anomalyAction({
            summary: "The canonical semantic state repeated after every applicable recovery.",
            semantic_state_digest: digest,
            repetition_count: repetitionCount,
            exhausted_recovery_strategies: RECOVERY_STRATEGIES,
          }),
        };
      }
      return { kind: "proceed" as const };
    },
    fuseAction() {
      return anomalyAction({
        summary: `The orchestrator crossed ${INTERNAL_ORCHESTRATOR_TRANSITION_FUSE} internal transitions without reaching a semantic boundary.`,
        semantic_state_digest: lastDigest,
        repetition_count: INTERNAL_ORCHESTRATOR_TRANSITION_FUSE,
        exhausted_recovery_strategies: ["route_refresh"],
      });
    },
  };
}
