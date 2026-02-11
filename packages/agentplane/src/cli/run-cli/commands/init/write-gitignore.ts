import path from "node:path";
import { readFile } from "node:fs/promises";

import { writeTextIfChanged } from "../../../../shared/write-if-changed.js";

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

const RUNTIME_IGNORE_LINES = [
  "# agentplane: ignore runtime/transient workspace artifacts",
  ".env",
  ".agentplane/worktrees",
  ".agentplane/cache",
  ".agentplane/recipes-cache",
  ".agentplane/.upgrade",
  ".agentplane/.release",
  ".agentplane/upgrade",
  ".agentplane/tasks.json",
];

const AGENT_PROMPT_IGNORE_LINES = [
  "# agentplane: ignore local agent prompts/templates",
  "AGENTS.md",
  ".agentplane/agents/",
];

export async function ensureInitGitignore(opts: {
  gitRoot: string;
  includeAgentPromptFiles: boolean;
}): Promise<void> {
  const gitignorePath = path.join(opts.gitRoot, ".gitignore");
  const existing = (await readTextIfExists(gitignorePath)) ?? "";
  const ensuredLines = opts.includeAgentPromptFiles
    ? [...RUNTIME_IGNORE_LINES, ...AGENT_PROMPT_IGNORE_LINES]
    : [...RUNTIME_IGNORE_LINES];

  const existingLines = existing.split(/\r?\n/);
  const existingSet = new Set(existingLines.map((line) => line.trimEnd()));

  const missing = ensuredLines.filter((line) => !existingSet.has(line));
  if (missing.length === 0) return;

  const nextLines = [...existingLines];
  // Keep content stable and append a trailing newline.
  if (nextLines.length > 0 && nextLines.at(-1) !== "") nextLines.push("");
  nextLines.push(...missing, "");

  const nextText = `${nextLines.join("\n")}`.replaceAll(/\n{2,}$/g, "\n");
  await writeTextIfChanged(gitignorePath, nextText);
}
