import path from "node:path";
import { readFile } from "node:fs/promises";

import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  AGENT_PROMPT_GITIGNORE_LINES,
  RUNTIME_GITIGNORE_LINES,
} from "./runtime-artifacts.js";

async function readTextIfExists(filePath: string): Promise<string | null> {
  try {
    return await readFile(filePath, "utf8");
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return null;
    throw err;
  }
}

export async function ensureRuntimeGitignore(opts: {
  gitRoot: string;
  includeAgentPromptFiles?: boolean;
}): Promise<void> {
  await ensureGitignoreLines({
    gitRoot: opts.gitRoot,
    lines:
      opts.includeAgentPromptFiles === true
        ? [...RUNTIME_GITIGNORE_LINES, ...AGENT_PROMPT_GITIGNORE_LINES]
        : [...RUNTIME_GITIGNORE_LINES],
  });
}

export async function ensureRuntimeSqliteGitignore(opts: { gitRoot: string }): Promise<void> {
  await ensureGitignoreLines({
    gitRoot: opts.gitRoot,
    lines: [
      ".agentplane/cache.sqlite",
      ".agentplane/cache.sqlite-wal",
      ".agentplane/cache.sqlite-shm",
    ],
  });
}

async function ensureGitignoreLines(opts: { gitRoot: string; lines: string[] }): Promise<void> {
  const gitignorePath = path.join(opts.gitRoot, ".gitignore");
  const existing = (await readTextIfExists(gitignorePath)) ?? "";

  const existingLines = existing.split(/\r?\n/);
  const existingSet = new Set(existingLines.map((line) => line.trimEnd()));

  const missing = opts.lines.filter((line) => !existingSet.has(line));
  if (missing.length === 0) return;

  const nextLines = [...existingLines];
  // Keep content stable and append a trailing newline.
  if (nextLines.length > 0 && nextLines.at(-1) !== "") nextLines.push("");
  nextLines.push(...missing, "");

  const nextText = `${nextLines.join("\n")}`.replaceAll(/\n{2,}$/g, "\n");
  await writeTextIfChanged(gitignorePath, nextText);
}
