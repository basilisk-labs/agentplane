import fs from "node:fs/promises";
import path from "node:path";

import { RUNTIME_GITIGNORE_LINES } from "../../runtime/shared/runtime-artifacts.js";
import { cmdHooksInstall, collectHooksInstallConflicts } from "../hooks/install.js";
import {
  fileIsManaged,
  HOOK_MARKER,
  HOOK_NAMES,
  resolveGitHooksDir,
  SHIM_MARKER,
} from "../hooks/shared.js";
import { loadCommandContext } from "../shared/task-backend.js";

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

async function pathExists(absPath: string): Promise<boolean> {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function hasManagedHookSurface(repoRoot: string): Promise<boolean> {
  const shimPath = path.join(repoRoot, ".agentplane", "bin", "agentplane");
  if ((await pathExists(shimPath)) && (await fileIsManaged(shimPath, SHIM_MARKER))) return true;

  let hooksDir: string;
  try {
    hooksDir = await resolveGitHooksDir(repoRoot);
  } catch {
    return false;
  }

  for (const hook of HOOK_NAMES) {
    const hookPath = path.join(hooksDir, hook);
    if ((await pathExists(hookPath)) && (await fileIsManaged(hookPath, HOOK_MARKER))) return true;
  }
  return false;
}

export async function safeFixManagedHooks(
  repoRoot: string,
): Promise<{ changed: boolean; note: string }> {
  if (!(await hasManagedHookSurface(repoRoot))) {
    return { changed: false, note: "Skip: no AgentPlane-managed hook surface found." };
  }

  const conflicts = await collectHooksInstallConflicts({
    gitRoot: repoRoot,
    agentplaneDir: path.join(repoRoot, ".agentplane"),
  });
  if (conflicts.length > 0) {
    return {
      changed: false,
      note: `Skip: custom hook files require manual reconciliation (${conflicts
        .map((conflict) => path.relative(repoRoot, conflict))
        .join(", ")}).`,
    };
  }

  await cmdHooksInstall({ cwd: repoRoot, rootOverride: repoRoot, quiet: true });
  return { changed: true, note: "Fixed: refreshed AgentPlane-managed hook files and shim." };
}
