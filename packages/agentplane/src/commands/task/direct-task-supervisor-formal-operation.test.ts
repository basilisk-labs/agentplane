import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ open: vi.fn() }));

vi.mock("../shared/supervisor-execution-episode.js", () => ({
  openSupervisorExecutionEpisode: mocks.open,
}));

import { recordDirectTaskFormalOperation } from "./direct-task-supervisor-formal-operation.js";

const TASK_ID = "202607290000-RF10A1";
const FIRST_FINGERPRINT = `sha256:${"a".repeat(64)}`;
const NEXT_FINGERPRINT = `sha256:${"b".repeat(64)}`;

function decision(fingerprint: string) {
  return {
    workflowStep: {
      preconditionFingerprint: { digest: fingerprint },
    },
  } as never;
}

function completedRunnerJournal() {
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: TASK_ID,
    task_revision: null,
    state_fingerprint_digest: FIRST_FINGERPRINT,
    budget: {
      max_episodes: 50,
      max_agent_runs: 50,
      max_input_tokens: 3_000_000,
      max_output_tokens: 1_000_000,
      max_total_tokens: 4_000_000,
      max_wall_time_ms: 14_400_000,
      max_changed_files: 2000,
      max_diff_lines: null,
      max_no_progress_episodes: 3,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: initial,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { id: "runner.follow" },
    precondition_fingerprint_digest: FIRST_FINGERPRINT,
  });
  if (started.status !== "started") throw new Error("expected completed runner fixture");
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "succeeded" },
  });
  return advanceSupervisorExecutionEpisodeState({
    journal: completed,
    state_fingerprint_digest: FIRST_FINGERPRINT,
    route_observation: { step_id: "runner.follow" },
  });
}

describe("direct task supervisor formal operation", () => {
  beforeEach(() => vi.resetAllMocks());

  it("retries a stale formal operation only after a completed runner outcome", async () => {
    const write = vi.fn().mockResolvedValue(undefined);
    mocks.open.mockResolvedValue({
      journal: completedRunnerJournal(),
      journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
      store: { write },
    });
    const run = vi.fn().mockResolvedValue({ verification: "ok" });

    const result = await recordDirectTaskFormalOperation({
      git_root: "/repo",
      task_id: TASK_ID,
      id: "task_verify",
      decision: vi.fn().mockResolvedValue(decision(NEXT_FINGERPRINT)),
      run,
    });

    expect(run).toHaveBeenCalledOnce();
    expect(result.journal).toMatchObject({
      status: "running",
      state_fingerprint_digest: NEXT_FINGERPRINT,
      cursor: { phase: "ready", operation_key: null },
    });
    expect(result.journal.operations).toHaveLength(2);
    expect(result.journal.operations.at(-1)).toMatchObject({
      kind: "cli_operation",
      status: "completed",
    });
  });

  it("refuses a retry when the prior formal effect is unknown", async () => {
    const initial = createSupervisorExecutionEpisodeJournal({
      task_id: TASK_ID,
      task_revision: null,
      state_fingerprint_digest: FIRST_FINGERPRINT,
      budget: {
        max_episodes: 50,
        max_agent_runs: 50,
        max_input_tokens: 3_000_000,
        max_output_tokens: 1_000_000,
        max_total_tokens: 4_000_000,
        max_wall_time_ms: 14_400_000,
        max_changed_files: 2000,
        max_diff_lines: null,
        max_no_progress_episodes: 3,
      },
    });
    const started = startSupervisorExecutionEpisode({
      journal: initial,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { direct_task_operation: "task_verify" },
      precondition_fingerprint_digest: FIRST_FINGERPRINT,
    });
    if (started.status !== "started") throw new Error("expected formal operation fixture");
    const effectInDoubt = recoverSupervisorExecutionEpisodeJournal({
      journal: started.journal,
      state_fingerprint_digest: FIRST_FINGERPRINT,
    });
    const run = vi.fn();
    mocks.open.mockResolvedValue({
      journal: effectInDoubt,
      journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
      store: { write: vi.fn() },
    });

    await expect(
      recordDirectTaskFormalOperation({
        git_root: "/repo",
        task_id: TASK_ID,
        id: "task_verify",
        decision: vi.fn().mockResolvedValue(decision(NEXT_FINGERPRINT)),
        run,
      }),
    ).rejects.toThrow("journal is stopped (effect_in_doubt)");
    expect(run).not.toHaveBeenCalled();
  });
});
