import { mkdir, readFile, realpath } from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { renderIncidentAdvice } from "../../runtime/incidents/index.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { adviseTaskIncidents } from "../incidents/shared.js";
import {
  findWorktreeForBranch,
  listWorktrees,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
} from "../shared/git-worktree.js";

import { cmdStart } from "./start.js";

async function syncTaskReadmeAcrossRelevantWorktrees(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<void> {
  const canonicalizeWorktreePath = async (value: string): Promise<string> => {
    try {
      return await realpath(value);
    } catch {
      return path.resolve(value);
    }
  };

  const currentRoot = path.resolve(opts.rootOverride ?? opts.ctx.resolvedProject.gitRoot);
  const currentCanonicalRoot = await canonicalizeWorktreePath(currentRoot);
  const workflowDir = opts.ctx.config.paths.workflow_dir;
  const sourceReadmePath = path.join(currentRoot, workflowDir, opts.taskId, "README.md");
  let sourceText = "";
  try {
    sourceText = await readFile(sourceReadmePath, "utf8");
  } catch {
    return;
  }

  const worktrees = await listWorktrees(currentRoot).catch(() => []);
  const normalizedWorktrees = await Promise.all(
    worktrees.map(async (entry) => ({
      ...entry,
      canonicalPath: await canonicalizeWorktreePath(entry.path),
    })),
  );
  const targetRoots = new Set<string>();

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  });
  if (baseBranch) {
    const baseWorktree = await findWorktreeForBranch(currentRoot, baseBranch);
    if (baseWorktree) {
      const canonicalBaseWorktree = await canonicalizeWorktreePath(baseWorktree);
      if (canonicalBaseWorktree !== currentCanonicalRoot) {
        targetRoots.add(canonicalBaseWorktree);
      }
    }
  }
  if (targetRoots.size === 0) {
    const mainWorktree = normalizedWorktrees.find(
      (entry) => entry.branch === "main" || entry.branch === "refs/heads/main",
    );
    if (mainWorktree && mainWorktree.canonicalPath !== currentCanonicalRoot) {
      targetRoots.add(mainWorktree.canonicalPath);
    }
  }
  if (targetRoots.size === 0) {
    const nonTaskWorktrees = normalizedWorktrees.filter((entry) => {
      if (!entry.branch) return false;
      if (entry.canonicalPath === currentCanonicalRoot) return false;
      if (parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch)) return false;
      if (parseTaskIdFromCloseBranch(entry.branch)) return false;
      return true;
    });
    if (nonTaskWorktrees.length === 1) {
      targetRoots.add(nonTaskWorktrees[0].canonicalPath);
    }
  }

  const matchingTaskWorktrees = normalizedWorktrees.filter(
    (entry) =>
      typeof entry.branch === "string" &&
      parseTaskIdFromBranch(opts.ctx.config.branch.task_prefix, entry.branch) === opts.taskId &&
      entry.canonicalPath !== currentCanonicalRoot,
  );
  if (matchingTaskWorktrees.length === 1) {
    targetRoots.add(matchingTaskWorktrees[0].canonicalPath);
  }

  for (const targetRoot of targetRoots) {
    const targetReadmePath = path.join(targetRoot, workflowDir, opts.taskId, "README.md");
    await mkdir(path.dirname(targetReadmePath), { recursive: true });
    await writeTextIfChanged(targetReadmePath, sourceText);
  }
}

export async function cmdTaskStartReady(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  body: string;
  force: boolean;
  yes: boolean;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const result = await cmdStart({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      author: opts.author,
      body: opts.body,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: opts.force,
      yes: opts.yes,
      quiet: true,
    });
    await syncTaskReadmeAcrossRelevantWorktrees({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("ready", opts.taskId)}\n`);
      const advice = await adviseTaskIncidents({
        ctx,
        taskId: opts.taskId,
        limit: 3,
      });
      if (advice.matches.length > 0) {
        process.stdout.write(`${infoMessage("incident advice for analogous tasks")}\n`);
        process.stdout.write(`${renderIncidentAdvice(advice.matches)}\n`);
      }
    }
    return result;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "task start-ready", root: opts.rootOverride ?? null });
  }
}
