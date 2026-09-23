import { describe, expect, it, vi } from "vitest";

import {
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import { recoverNotAppliedWorktreePreparation } from "./supervisor-execution-worktree-recovery.js";

const FINGERPRINT = `sha256:${"1".repeat(64)}`;
const IDEMPOTENCY_KEY = "worktree.prepare:T-1:fixture";

describe("supervisor worktree recovery", () => {
  it("replaces the exact proven not-applied intent before a retry", async () => {
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: "T-1",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { id: "worktree.prepare", task_id: "T-1" },
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: "workflow-operation:worktree.prepare",
      authority_digest: FINGERPRINT,
      effect_ref: IDEMPOTENCY_KEY,
    });
    if (started.status !== "started") throw new Error("expected started operation");
    const interrupted = recoverSupervisorExecutionEpisodeJournal({
      journal: started.journal,
      state_fingerprint_digest: FINGERPRINT,
    });
    const compareAndSwap = vi.fn(() => Promise.resolve(true));

    const replacement = await recoverNotAppliedWorktreePreparation({
      journal: interrupted,
      operation: { id: "worktree.prepare", idempotencyKey: IDEMPOTENCY_KEY },
      state_fingerprint_digest: FINGERPRINT,
      compare_and_swap: compareAndSwap,
    });

    expect(compareAndSwap).toHaveBeenCalledOnce();
    expect(replacement.operations).toMatchObject([{ status: "failed" }]);
    expect(replacement).toMatchObject({
      status: "running",
      cursor: {
        phase: "ready",
        replacement_of_operation_key: started.operation_key,
      },
    });
  });
});
