import fs from "node:fs/promises";
import path from "node:path";

import { parseTaskReadme } from "@agentplaneorg/core";

import { RUNTIME_GITIGNORE_LINES } from "../../shared/runtime-artifacts.js";
import { GitContext } from "../shared/git-context.js";
import { loadCommandContext } from "../shared/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";

export async function safeFixGitignore(
  repoRoot: string,
): Promise<{ changed: boolean; note: string }> {
  const gitignorePath = path.join(repoRoot, ".gitignore");
  let existing = "";
  try {
    existing = await fs.readFile(gitignorePath, "utf8");
  } catch {
    return { changed: false, note: "Skip: .gitignore not found." };
  }

  const lines = existing.split(/\r?\n/);
  const existingSet = new Set(lines.map((line) => line.trimEnd()));
  const missing = RUNTIME_GITIGNORE_LINES.filter((line) => !existingSet.has(line));
  if (missing.length === 0) {
    return { changed: false, note: "OK: .gitignore already contains agentplane runtime ignores." };
  }

  const nextLines = [...lines];
  if (nextLines.length > 0 && nextLines.at(-1) !== "") nextLines.push("");
  nextLines.push(...missing, "");
  const next = `${nextLines.join("\n")}`.replaceAll(/\n{2,}$/g, "\n");
  await fs.writeFile(gitignorePath, next, "utf8");
  return {
    changed: true,
    note: `Fixed: added agentplane runtime ignores to .gitignore (${missing.length} lines).`,
  };
}

export async function safeFixTaskIndex(
  repoRoot: string,
): Promise<{ changed: boolean; note: string }> {
  try {
    const ctx = await loadCommandContext({ cwd: repoRoot, rootOverride: null });
    await ctx.taskBackend.listTasks();
    return { changed: true, note: "OK: rebuilt tasks index cache (best-effort)." };
  } catch {
    return { changed: false, note: "Skip: could not rebuild tasks index cache." };
  }
}

export async function safeFixLegacyUntrackedTaskReadmes(
  repoRoot: string,
  ctx?: CommandContext,
): Promise<{ changed: boolean; note: string }> {
  const commandCtx =
    ctx ??
    (await loadCommandContext({
      cwd: repoRoot,
      rootOverride: null,
    }));
  const workflowDir = (commandCtx.config.paths.workflow_dir ?? ".agentplane/tasks").replaceAll(
    "\\",
    "/",
  );
  const git = commandCtx.git ?? new GitContext({ gitRoot: repoRoot });

  let untracked: string[] = [];
  try {
    untracked = await git.statusUntrackedPaths();
  } catch {
    return { changed: false, note: "Skip: could not inspect untracked task README collisions." };
  }

  const candidates = untracked.filter(
    (relPath) => relPath.startsWith(`${workflowDir}/`) && relPath.endsWith("/README.md"),
  );
  if (candidates.length === 0) {
    return { changed: false, note: "OK: no legacy untracked task README collisions." };
  }

  const removed: string[] = [];
  for (const relPath of candidates) {
    const absPath = path.join(repoRoot, relPath);
    let text = "";
    try {
      text = await fs.readFile(absPath, "utf8");
    } catch {
      continue;
    }

    let parsed;
    try {
      parsed = parseTaskReadme(text);
    } catch {
      continue;
    }

    const taskId = path.basename(path.dirname(absPath));
    const parsedId =
      typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
        ? parsed.frontmatter.id.trim()
        : taskId;
    const status =
      typeof parsed.frontmatter.status === "string" ? parsed.frontmatter.status.trim().toUpperCase() : "";
    if (parsedId !== taskId || status !== "DONE") continue;

    await fs.rm(absPath, { force: true });
    try {
      const remaining = await fs.readdir(path.dirname(absPath));
      if (remaining.length === 0) {
        await fs.rmdir(path.dirname(absPath));
      }
    } catch {
      // Ignore cleanup failures for parent directories; the file removal is the actual fix.
    }
    removed.push(taskId);
  }

  if (removed.length === 0) {
    return {
      changed: false,
      note: "OK: no safe-to-remove legacy untracked DONE task README collisions.",
    };
  }

  return {
    changed: true,
    note: `Fixed: removed legacy untracked DONE task README collisions (${removed.join(", ")}).`,
  };
}
