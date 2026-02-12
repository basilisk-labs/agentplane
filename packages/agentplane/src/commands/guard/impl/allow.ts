import { resolveProject } from "@agentplaneorg/core";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "../../../shared/git-path.js";
import { CliError } from "../../../shared/errors.js";
import { GitContext } from "../../shared/git-context.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

function normalizeAllowPrefixes(prefixes: string[]): string[] {
  const unique = [
    ...new Set(prefixes.map((prefix) => normalizeGitPathPrefix(prefix)).filter(Boolean)),
  ].toSorted((a, b) => (a.length === b.length ? a.localeCompare(b) : a.length - b.length));

  // "." is repo-wide and makes all other prefixes redundant.
  if (unique.includes(".")) return ["."];

  const compact: string[] = [];
  for (const prefix of unique) {
    if (compact.some((existing) => gitPathIsUnderPrefix(prefix, existing))) continue;
    compact.push(prefix);
  }
  return compact;
}

export function suggestAllowPrefixes(paths: string[]): string[] {
  const out = new Set<string>();
  for (const filePath of paths) {
    if (!filePath) continue;
    const idx = filePath.lastIndexOf("/");
    if (idx <= 0) out.add(normalizeGitPathPrefix(filePath));
    else out.add(normalizeGitPathPrefix(filePath.slice(0, idx)));
  }
  return [...out].filter(Boolean).toSorted((a, b) => a.localeCompare(b));
}

export async function gitStatusChangedPaths(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const git = new GitContext({ gitRoot: resolved.gitRoot });
  return await git.statusChangedPaths();
}

export async function ensureGitClean(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
}): Promise<void> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const staged = await ctx.git.statusStagedPaths();
  if (staged.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: "Working tree has staged changes",
    });
  }
  // Policy-defined "clean" ignores untracked files.
  const unstaged = await ctx.git.statusUnstagedTrackedPaths();
  if (unstaged.length > 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_GIT"),
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  }
}

export async function stageAllowlist(opts: {
  ctx: CommandContext;
  allow: string[];
  allowTasks: boolean;
  tasksPath: string;
}): Promise<string[]> {
  const changed = await opts.ctx.git.statusChangedPaths();
  if (changed.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "No changes to stage (working tree clean)",
    });
  }

  const allow = normalizeAllowPrefixes(opts.allow);
  if (allow.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide at least one allowed prefix",
    });
  }
  const denied = new Set<string>();
  if (!opts.allowTasks) denied.add(opts.tasksPath);

  const staged: string[] = [];
  for (const filePath of changed) {
    if (denied.has(filePath)) continue;
    if (allow.some((prefix) => gitPathIsUnderPrefix(filePath, prefix))) {
      staged.push(filePath);
    }
  }

  const unique = [...new Set(staged)].toSorted((a, b) => a.localeCompare(b));
  if (unique.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "No changes matched allowed prefixes (use --commit-auto-allow or update --commit-allow)",
    });
  }

  // `git add <pathspec>` is not reliable for staging deletes/renames across versions/configs.
  // `-A -- <pathspec...>` makes the allowlist staging semantics deterministic.
  await opts.ctx.git.stage(unique);
  return unique;
}
