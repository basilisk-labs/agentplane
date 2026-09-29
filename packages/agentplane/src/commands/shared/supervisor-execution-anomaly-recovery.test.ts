import { expect, it } from "vitest";

import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";

import {
  createSupervisorEpisodeStore,
  preparePersistedSupervisorReplacementAfterFailure,
  resolveSupervisorExecutionEpisodePath,
} from "./supervisor-execution-episode.js";

it("resumes a diagnosed internal anomaly only through explicit replacement recovery", async () => {
  const root = await mkGitRepoRoot();
  const taskId = "202607280001-ANOMALY";
  const fingerprint = `sha256:${"a".repeat(64)}`;
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprint,
    budget: {
      max_episodes: 50,
      max_agent_runs: 50,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: 14_400_000,
      max_changed_files: 2000,
      max_diff_lines: null,
      max_no_progress_episodes: 3,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: { id: "repeating-route" },
    precondition_fingerprint_digest: fingerprint,
  });
  if (started.status !== "started") throw new Error("expected started fixture episode");
  const completed = completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "success" },
  });
  const ready = advanceSupervisorExecutionEpisodeState({
    journal: completed,
    state_fingerprint_digest: fingerprint,
  });
  const stopped = stopSupervisorExecutionEpisode({
    journal: ready,
    reason: "internal_anomaly",
    diagnostic: {
      code: "orchestrator_tight_loop",
      summary: "The semantic state repeated after recovery.",
      semantic_state_digest: fingerprint,
      repetition_count: 1000,
      exhausted_recovery_strategies: ["route_refresh"],
      resume_hint: "Inspect and explicitly resume.",
    },
  });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  await createSupervisorEpisodeStore(journalPath).write(stopped);

  await expect(
    preparePersistedSupervisorReplacementAfterFailure({
      git_root: root,
      task_id: taskId,
      state_fingerprint_digest: fingerprint,
    }),
  ).resolves.toBe("anomaly_resumed");
  expect(await createSupervisorEpisodeStore(journalPath).read()).toMatchObject({
    status: "running",
    stop: null,
    operations: stopped.operations,
    previous_digest: stopped.digest,
    cursor: { phase: "ready", operation_key: null },
  });
});
