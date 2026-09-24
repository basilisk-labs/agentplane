import { lstat } from "node:fs/promises";
import path from "node:path";

import { execFileAsync, runProcess } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

import { LocalBackend } from "../../backends/task-backend.js";
import { validateTaskId } from "../../backends/task-backend/shared.js";
import type { CommandContext } from "../shared/task-backend.js";

export async function canCompactTaskHistory(opts: {
  backend: CommandContext["taskBackend"];
  repoRoot: string;
  workflowDir: string;
}): Promise<boolean> {
  if (!(opts.backend instanceof LocalBackend)) return false;
  const canonicalRoot = path.resolve(opts.repoRoot, ".agentplane", "tasks");
  if (path.resolve(opts.backend.root) !== canonicalRoot) return false;
  if (path.resolve(opts.repoRoot, opts.workflowDir) !== canonicalRoot) return false;
  const canonical = await lstat(canonicalRoot);
  if (!canonical.isDirectory() || canonical.isSymbolicLink()) {
    throw new Error(`Canonical task store is not a directory: ${canonicalRoot}`);
  }
  const sparse = await runProcess({
    command: "git",
    args: ["config", "--bool", "--get", "core.sparseCheckout"],
    cwd: opts.repoRoot,
    env: gitEnv(),
    reject: false,
  });
  if (sparse.exitCode !== 0 && sparse.exitCode !== 1) {
    throw new Error("Could not inspect primary sparse checkout state.");
  }
  if (sparse.stdout.trim() === "true") {
    throw new Error("Cannot use a sparse primary checkout as the canonical task store.");
  }
  return true;
}

export async function checkoutCompactTaskHistory(opts: {
  worktreePath: string;
  taskId: string;
}): Promise<void> {
  validateTaskId(opts.taskId);
  const patterns = ["/*", "!/.agentplane/tasks/*", `/.agentplane/tasks/${opts.taskId}/`];
  await execFileAsync("git", ["sparse-checkout", "set", "--no-cone", ...patterns], {
    cwd: opts.worktreePath,
    env: gitEnv(),
  });
  await execFileAsync("git", ["config", "--worktree", "agentplane.compactTaskHistory", "true"], {
    cwd: opts.worktreePath,
    env: gitEnv(),
  });
  await execFileAsync("git", ["read-tree", "-mu", "HEAD"], {
    cwd: opts.worktreePath,
    env: gitEnv(),
  });
}
