import { readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../cli/fs-utils.js";

const FALLBACK_EMOJIS = ["🧭", "🧠", "🏗️", "🧪", "🛠️", "🔧", "🧩", "🔍", "📦"];

const WELL_KNOWN_AGENT_EMOJI: Record<string, string> = {
  ORCHESTRATOR: "🧭",
  PLANNER: "🧠",
  CREATOR: "🏗️",
  INTEGRATOR: "🧩",
  TESTER: "🧪",
  CODER: "🛠️",
};

function stableHash32(input: string): number {
  // Simple, stable FNV-1a 32-bit hash (good enough for deterministic emoji selection).
  // FNV-1a offset basis / prime in decimal to avoid numeric-separator style lint quirks.
  let h = 2_166_136_261;
  for (const ch of input) {
    const cp = ch.codePointAt(0) ?? 0;
    h ^= cp;
    h = Math.imul(h, 16_777_619);
  }
  return h >>> 0;
}

function fallbackEmojiForAgentId(agentId: string): string {
  const wellKnown = WELL_KNOWN_AGENT_EMOJI[agentId];
  if (wellKnown) return wellKnown;
  const idx = stableHash32(agentId) % FALLBACK_EMOJIS.length;
  return FALLBACK_EMOJIS[idx] ?? "🧩";
}

/**
 * Resolve commit emoji for an agent.
 * Priority: explicit `commit_emoji` in agent JSON -> well-known map/hash fallback.
 */
export async function resolveCommitEmojiForAgent(opts: {
  agentsDirAbs: string;
  agentId: string;
}): Promise<string> {
  const agentId = opts.agentId.trim();
  if (!agentId) return "🧩";

  // Allow users to override the emoji per agent by adding `commit_emoji` to the agent json file.
  const agentPath = path.join(opts.agentsDirAbs, `${agentId}.json`);
  if (await fileExists(agentPath)) {
    try {
      const text = await readFile(agentPath, "utf8");
      const parsed = JSON.parse(text) as { commit_emoji?: unknown } | null;
      const emoji =
        parsed && typeof parsed.commit_emoji === "string" ? parsed.commit_emoji.trim() : "";
      if (emoji) return emoji;
    } catch {
      // ignore; fallback below
    }
  }

  return fallbackEmojiForAgentId(agentId);
}
