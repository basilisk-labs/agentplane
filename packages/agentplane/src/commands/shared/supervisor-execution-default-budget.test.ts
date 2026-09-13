import { describe, expect, it } from "vitest";

import { mkGitRepoRoot } from "@agentplane/testkit";

import { openSupervisorExecutionEpisode } from "./supervisor-execution-episode.js";

describe("legacy supervisor journal budget field", () => {
  it("writes a fully disabled compatibility placeholder", async () => {
    const root = await mkGitRepoRoot();
    const opened = await openSupervisorExecutionEpisode({
      git_root: root,
      task_id: "202607280001-EPISODE",
      task_revision: 1,
      state_fingerprint_digest: `sha256:${"1".repeat(64)}`,
    });

    expect(opened.journal.budget).toMatchObject({
      max_episodes: Number.MAX_SAFE_INTEGER,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    });
  });
});
