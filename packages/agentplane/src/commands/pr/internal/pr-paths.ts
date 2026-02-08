import { readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig, resolveProject, type AgentplaneConfig } from "@agentplaneorg/core";

import { fileExists } from "../../../cli/fs-utils.js";
import { gitShowFile, toGitPath } from "../../shared/git-diff.js";
import type { CommandContext } from "../../shared/task-backend.js";

export type ResolvedPrPaths = {
  resolved: { gitRoot: string; agentplaneDir: string };
  config: AgentplaneConfig;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;
  reviewPath: string;
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
    verifyLogPath: path.join(prDir, "verify.log"),
    reviewPath: path.join(prDir, "review.md"),
  };
}

export async function readPrArtifact(opts: {
  resolved: { gitRoot: string };
  prDir: string;
  fileName: string;
  branch: string;
}): Promise<string | null> {
  const filePath = path.join(opts.prDir, opts.fileName);
  if (await fileExists(filePath)) {
    return await readFile(filePath, "utf8");
  }
  const rel = toGitPath(path.relative(opts.resolved.gitRoot, filePath));
  try {
    return await gitShowFile(opts.resolved.gitRoot, opts.branch, rel);
  } catch {
    return null;
  }
}
