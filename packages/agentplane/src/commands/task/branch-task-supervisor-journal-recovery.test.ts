import { describe, expect, it, vi } from "vitest";

import {
  createSupervisorExecutionEpisodeJournal,
  markSupervisorExecutionEpisodeIntentDispatched,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import { recoverBranchImplementationJournal } from "./branch-task-supervisor-journal-recovery.js";

const FINGERPRINT = `sha256:${"a".repeat(64)}`;

describe("branch implementation journal recovery", () => {
  it("does not replace an executor intent after dispatch may have started", async () => {
    const initial = createSupervisorExecutionEpisodeJournal({
      task_id: "T-dispatch",
      task_revision: 1,
      state_fingerprint_digest: FINGERPRINT,
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
      journal: initial,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { purpose: "implementation_rework" },
      precondition_fingerprint_digest: FINGERPRINT,
      authority_ref: "branch-pr:T-dispatch",
      authority_digest: FINGERPRINT,
    });
    if (started.status !== "started") throw new Error("expected started episode");
    const dispatched = markSupervisorExecutionEpisodeIntentDispatched({
      journal: started.journal,
      operation_key: started.operation_key,
      dispatch_ref: "run-1:work-order-1",
    });
    const interrupted = recoverSupervisorExecutionEpisodeJournal({
      journal: dispatched,
      state_fingerprint_digest: FINGERPRINT,
    });
    const compareAndSwap = vi.fn();

    await expect(
      recoverBranchImplementationJournal({
        opened: { store: { compareAndSwap } } as never,
        journal: interrupted,
        decision: {
          workflowStep: { preconditionFingerprint: { digest: FINGERPRINT } },
        } as never,
        task: { status: "DONE", extensions: { task_kernel: {} } } as never,
        replace_failed_operation: true,
      }),
    ).rejects.toThrow(/stopped operation_failed journal/u);
    expect(compareAndSwap).not.toHaveBeenCalled();
  });
});
