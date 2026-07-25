import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "@agentplaneorg/core/config";

import { fileExists } from "../../../cli/fs-utils.js";
import { findWorktreeForBranch, gitShowFile, toGitPath } from "@agentplaneorg/core/git";
import { resolveTaskBranchFromContext, type CommandContext } from "../../shared/task-backend.js";

export type ResolvedPrPaths = {
  resolved: { gitRoot: string; agentplaneDir: string };
  config: AgentplaneConfig;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  notesPath: string;
  verifyLogPath: string;
  reviewPath: string;
  githubTitlePath: string;
  githubBodyPath: string;
};

export async function resolvePrPaths(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<ResolvedPrPaths> {
  const resolved =
    opts.ctx?.resolvedProject ??
    (await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  let config = opts.ctx?.config;
  if (!config) {
    const loaded = await loadConfig(resolved.agentplaneDir);
    config = loaded.config;
  }
  const taskDir = path.join(resolved.gitRoot, config.paths.workflow_dir, opts.taskId);
  const prDir = path.join(taskDir, "pr");
  return {
    resolved,
    config,
    prDir,
    metaPath: path.join(prDir, "meta.json"),
    diffstatPath: path.join(prDir, "diffstat.txt"),
    notesPath: path.join(prDir, "notes.jsonl"),
    verifyLogPath: path.join(prDir, "verify.log"),
    reviewPath: path.join(prDir, "review.md"),
    githubTitlePath: path.join(prDir, "github-title.txt"),
    githubBodyPath: path.join(prDir, "github-body.md"),
  };
}

export async function readPrArtifact(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
  worktreePath?: string | null;
}): Promise<string | null> {
  const filePath = path.join(opts.prDir, opts.fileName);
  if (await fileExists(filePath)) {
    return await readFile(filePath, "utf8");
  }
  return await readPrArtifactFromBranch(opts);
}

export async function readTaskPrArtifact(opts: {
  ctx: CommandContext;
  taskId: string;
  prDir: string;
  fileName: string;
  preferBranchSnapshot?: boolean;
}): Promise<{ content: string | null; branch: string | null }> {
  const branch = opts.preferBranchSnapshot
    ? await resolveTaskBranchFromContext({
        ctx: opts.ctx,
        taskId: opts.taskId,
      })
    : null;
  if (branch) {
    const worktreePath = await findWorktreeForBranch(
      opts.ctx.resolvedProject.gitRoot,
      branch,
    ).catch(() => null);
    const content = await readPrArtifactFromBranch({
      resolved: opts.ctx.resolvedProject,
      prDir: opts.prDir,
      fileName: opts.fileName,
      branch,
      worktreePath,
    });
    return { content, branch };
  }

  const filePath = path.join(opts.prDir, opts.fileName);
  try {
    return { content: await readFile(filePath, "utf8"), branch };
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return { content: null, branch };
    }
    throw err;
  }
}

export async function readPrArtifactFromBranch(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
  worktreePath?: string | null;
}): Promise<string | null> {
  const filePath = path.join(opts.prDir, opts.fileName);
  if (opts.worktreePath) {
    const worktreeFilePath = path.join(
      opts.worktreePath,
      path.relative(opts.resolved.gitRoot, filePath),
    );
    if (await fileExists(worktreeFilePath)) {
      return await readFile(worktreeFilePath, "utf8");
    }
  }
  const rel = toGitPath(path.relative(opts.resolved.gitRoot, filePath));
  const refsToTry = candidateBranchRefs(opts.branch);
  for (const ref of refsToTry) {
    try {
      const content = await gitShowFile(opts.resolved.gitRoot, ref, rel);
      if (typeof content === "string") return content;
    } catch {
      // Try origin/<branch> before giving up; base checkouts often keep only the remote task ref.
    }
  }
  return null;
}

function candidateBranchRefs(branch: string): string[] {
  const trimmed = branch.trim();
  if (!trimmed || trimmed.startsWith("origin/")) return trimmed ? [trimmed] : [];
  return [trimmed, `origin/${trimmed}`];
}
