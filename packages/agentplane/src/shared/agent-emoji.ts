import { readFile } from "node:fs/promises";
import path from "node:path";

import { fileExists } from "../cli/fs-utils.js";

const FALLBACK_EMOJIS = ["🧭", "🧠", "🏗️", "🧪", "🛠️", "🔧", "🧩", "🔍", "📦"];
const TASK_FALLBACK_EMOJIS = [
  "🧩",
  "🛠️",
  "📝",
  "🧪",
  "🔧",
  "📦",
  "🔒",
  "⚙️",
  "🎨",
  "🚀",
  "🧭",
  "🔍",
  "♻️",
  "🗂️",
  "💡",
  "🌐",
];

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

type SemanticTaskEmojiRule = {
  emoji: string;
  keywords: string[];
};

const TASK_EMOJI_RULES: SemanticTaskEmojiRule[] = [
  {
    emoji: "📝",
    keywords: ["doc", "docs", "documentation", "readme", "mdx", "guide", "manual", "help", "copy"],
  },
  {
    emoji: "🧪",
    keywords: [
      "test",
      "tests",
      "testing",
      "spec",
      "verify",
      "verification",
      "qa",
      "regression",
      "regressions",
    ],
  },
  {
    emoji: "🚀",
    keywords: ["release", "deploy", "shipping", "ship", "publish", "launch", "rollout"],
  },
  { emoji: "📦", keywords: ["package", "packages", "bundle", "artifact", "artifacts", "dist"] },
  {
    emoji: "🔒",
    keywords: ["security", "secure", "auth", "oauth", "permission", "permissions", "secret"],
  },
  { emoji: "⚡", keywords: ["perf", "performance", "optimize", "latency", "fast", "speed"] },
  {
    emoji: "🎨",
    keywords: ["ui", "ux", "design", "layout", "theme", "color", "colors", "visual", "style"],
  },
  {
    emoji: "🌐",
    keywords: ["api", "http", "network", "backend", "server", "sync", "remote", "webhook"],
  },
  {
    emoji: "🩺",
    keywords: ["doctor", "diagnostic", "diagnostics", "runtime", "health", "repair", "triage"],
  },
  {
    emoji: "♻️",
    keywords: ["refactor", "cleanup", "clean", "simplify", "dedupe", "rewrite", "legacy"],
  },
  { emoji: "🔍", keywords: ["search", "find", "index", "inspect", "analyze", "analysis", "audit"] },
  { emoji: "⚙️", keywords: ["config", "configuration", "setting", "settings", "setup", "cli"] },
  { emoji: "🔧", keywords: ["fix", "bug", "issue", "error", "broken", "repair", "hotfix"] },
  { emoji: "🗂️", keywords: ["task", "tasks", "workflow", "process", "plan", "planning"] },
  {
    emoji: "🧭",
    keywords: ["navigation", "quickstart", "onboarding", "init", "bootstrap", "start"],
  },
  {
    emoji: "🧠",
    keywords: ["agent", "agents", "role", "planner", "orchestrator", "reasoning", "prompt"],
  },
  { emoji: "💡", keywords: ["idea", "ideas", "spec", "concept", "proposal", "strategy"] },
];

function normalizedWords(text: string): string[] {
  return text
    .toLowerCase()
    .replaceAll(/[^a-z0-9\u0400-\u04FF]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function countKeywordHits(words: string[], keyword: string): number {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) return 0;
  let hits = 0;
  for (const word of words) {
    if (word === normalizedKeyword) hits += 1;
  }
  return hits;
}

export function resolveCommitEmojiForTask(input: {
  taskId?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: readonly string[] | null;
}): string {
  const titleWords = normalizedWords(input.title ?? "");
  const descriptionWords = normalizedWords(input.description ?? "");
  const tagWords = normalizedWords((input.tags ?? []).join(" "));
  const weightedText = [
    input.taskId ?? "",
    input.title ?? "",
    input.description ?? "",
    ...(input.tags ?? []),
  ]
    .join("\n")
    .trim();

  const scored = TASK_EMOJI_RULES.map((rule) => {
    let score = 0;
    for (const keyword of rule.keywords) {
      score += countKeywordHits(titleWords, keyword) * 4;
      score += countKeywordHits(tagWords, keyword) * 3;
      score += countKeywordHits(descriptionWords, keyword) * 2;
    }
    return { emoji: rule.emoji, score };
  }).filter((entry) => entry.score > 0);

  if (scored.length > 0) {
    const bestScore = Math.max(...scored.map((entry) => entry.score));
    const top = scored.filter((entry) => entry.score === bestScore);
    if (top.length === 1) return top[0]?.emoji ?? "🧩";
    const idx = stableHash32(weightedText || "task") % top.length;
    return top[idx]?.emoji ?? "🧩";
  }

  const fallbackInput = weightedText || "task";
  const idx = stableHash32(fallbackInput) % TASK_FALLBACK_EMOJIS.length;
  return TASK_FALLBACK_EMOJIS[idx] ?? "🧩";
}

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
