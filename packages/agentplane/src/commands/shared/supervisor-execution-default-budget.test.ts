import { describe, expect, it } from "vitest";

import { mkGitRepoRoot } from "@agentplane/testkit";

import { openSupervisorExecutionEpisode } from "./supervisor-execution-episode.js";

describe("default supervisor execution budget", () => {
  it("leaves token caps disabled when provider telemetry is not guaranteed", async () => {
    const root = await mkGitRepoRoot();
    const opened = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: "202607280001-EPISODE",
      task_revision: 1,
      state_fingerprint_digest: `sha256:${"1".repeat(64)}`,
    });

    expect(opened.journal.budget).toMatchObject({
      max_episodes: 50,
      max_agent_runs: 50,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: 4 * 60 * 60 * 1000,
      max_changed_files: 2000,
      max_no_progress_episodes: 3,
    });
  });
});
