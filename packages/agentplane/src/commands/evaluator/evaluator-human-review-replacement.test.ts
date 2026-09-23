import { describe, expect, it, vi } from "vitest";
import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import type { EvaluatorArtifactPreparationPort } from "./evaluator-artifact-port.js";
import { prepareHumanReviewEvaluatorReplacement } from "./evaluator-human-review-replacement.js";

describe("evaluator human-review replacement", () => {
  it("prepares a distinct work order and persists the reopened journal with CAS", async () => {
    const fingerprint = `sha256:${"a".repeat(64)}` as const;
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: "T-review",
      task_revision: 1,
      state_fingerprint_digest: fingerprint,
      budget: {
        max_episodes: 3,
        max_agent_runs: 2,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: 10_000,
        max_changed_files: 4,
        max_diff_lines: 40,
        max_no_progress_episodes: 2,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { work_order_id: "old" },
      precondition_fingerprint_digest: fingerprint,
      authority_ref: "evaluator:fixture",
      authority_digest: fingerprint,
    });
    if (started.status !== "started") throw new Error("expected started episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { verdict: "human_review" },
    });
    const journal = stopSupervisorExecutionEpisode({
      journal: completed,
      reason: "human_review",
    });
    const prepared = { work_order: { work_order_id: "new" } };
    const artifacts = {
      prepare: vi.fn().mockResolvedValue({ prepared }),
    } as unknown as EvaluatorArtifactPreparationPort;
    const compareAndSwap = vi.fn().mockResolvedValue(true);

    const replacement = await prepareHumanReviewEvaluatorReplacement({
      journal,
      store: { read: vi.fn(), write: vi.fn(), compareAndSwap, path: "/journal" },
      artifacts,
      ctx: {} as never,
      taskId: "T-review",
      evaluatorId: "recovery-context",
      stateFingerprintDigest: fingerprint,
    });

    expect(replacement.journal).toMatchObject({ status: "running", stop: null });
    expect(replacement.prepared).toBe(prepared);
    expect(compareAndSwap).toHaveBeenCalledWith(journal.digest, replacement.journal);
  });
});
