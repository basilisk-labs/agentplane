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

export async function ensureGitignoreAgents(opts: { gitRoot: string }): Promise<void> {
  const gitignorePath = path.join(opts.gitRoot, ".gitignore");
  const existing = (await readTextIfExists(gitignorePath)) ?? "";
  const ensuredLines = [
    "# agentplane: ignore local agent prompts/templates",
    "AGENTS.md",
    ".agentplane/agents/",
  ];

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
