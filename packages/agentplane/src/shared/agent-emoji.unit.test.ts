import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { resolveCommitEmojiForAgent } from "./agent-emoji.js";

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
