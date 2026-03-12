import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveCommitEmojiForAgent, resolveCommitEmojiForTask } from "./agent-emoji.js";

describe("resolveCommitEmojiForAgent", () => {
  it("uses commit_emoji override from agent json when present", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-agent-emoji-"));
    await writeFile(
      path.join(dir, "CODER.json"),
      JSON.stringify({ commit_emoji: "🛠️" }) + "\n",
      "utf8",
    );
    expect(await resolveCommitEmojiForAgent({ agentsDirAbs: dir, agentId: "CODER" })).toBe("🛠️");
  });

  it("falls back to a stable mapping for well-known ids and unknown ids", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-agent-emoji-"));
    expect(await resolveCommitEmojiForAgent({ agentsDirAbs: dir, agentId: "ORCHESTRATOR" })).toBe(
      "🧭",
    );
    const a = await resolveCommitEmojiForAgent({ agentsDirAbs: dir, agentId: "SOME_NEW_AGENT" });
    const b = await resolveCommitEmojiForAgent({ agentsDirAbs: dir, agentId: "SOME_NEW_AGENT" });
    expect(a).toBe(b);
    expect(a.trim().length).toBeGreaterThan(0);
  });
});

describe("resolveCommitEmojiForTask", () => {
  it("picks a semantic emoji from task title, description, and tags", () => {
    expect(
      resolveCommitEmojiForTask({
        taskId: "202603121545-ABC123",
        title: "Update docs and README examples",
        description: "Refresh help text and user guide wording.",
        tags: ["docs", "cli"],
      }),
    ).toBe("📝");

    expect(
      resolveCommitEmojiForTask({
        taskId: "202603121545-DEF456",
        title: "Add hook regressions",
        description: "Test commit-msg behavior for task-scoped commits.",
        tags: ["test", "hooks"],
      }),
    ).toBe("🧪");
  });

  it("falls back deterministically when no strong semantic rule matches", () => {
    const input = {
      taskId: "202603121545-GHI789",
      title: "Polish edge handling",
      description: "Small consistency cleanup around odd cases.",
      tags: ["misc"],
    };
    const a = resolveCommitEmojiForTask(input);
    const b = resolveCommitEmojiForTask(input);
    expect(a).toBe(b);
    expect(a.trim().length).toBeGreaterThan(0);
  });
});
