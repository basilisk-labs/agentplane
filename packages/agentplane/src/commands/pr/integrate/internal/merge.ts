import { validateCommitSubject, extractTaskSuffix } from "@agentplaneorg/core/commit";
import { mkdir, rename, rm } from "node:fs/promises";
import path from "node:path";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { gitRevParse } from "../../../shared/git-ops.js";
import type { PrMeta } from "../../../shared/pr-meta.js";
import { computeVerifyState, runVerifyCommands } from "../verify.js";

type MovedTaskArtifact = {
  relativePath: string;
  backupPath: string;
};

const noopPromise = (): Promise<void> => Promise.resolve();

function integrateCommitEnv(taskId: string): NodeJS.ProcessEnv {
  return {
    ...gitEnv(),
    AGENTPLANE_TASK_ID: taskId,
    AGENTPLANE_ALLOW_BASE: "1",
    AGENTPLANE_ALLOW_TASKS: "1",
    AGENTPLANE_ALLOW_CONFIG: "1",
    AGENTPLANE_DEV_ALLOW_STALE_DIST: "1",
  };
}

function isTaskArtifactPath(filePath: string): boolean {
  const normalized = filePath.replaceAll("\\", "/");
  return normalized.startsWith(".agentplane/tasks/") || normalized.startsWith("tasks/");
}

function fallbackIntegrateSummary(opts: { taskTitle: string }): string {
  const summary = normalizeOneLine(opts.taskTitle, 96) || "Task integration update";
  return `${summary}`;
}

function normalizeOneLine(value: string, maxChars: number): string {
  const trimmed = value.trim().replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed.length > maxChars ? `${trimmed.slice(0, Math.max(1, maxChars - 3))}...` : trimmed;
}

async function listUntrackedTaskArtifacts(opts: {
  gitRoot: string;
  taskPrefix: string;
}): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--short", "--untracked-files=all", "--", opts.taskPrefix],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("?? "))
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

async function listCommitChangedPaths(opts: {
  gitRoot: string;
  revision: string;
}): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["show", "--name-only", "--format=", opts.revision],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function moveCollidingTaskArtifacts(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  changedPaths: string[];
}): Promise<{
  moved: MovedTaskArtifact[];
  restore: () => Promise<void>;
  cleanup: () => Promise<void>;
}> {
  const taskPrefix = `${opts.workflowDir.replaceAll("\\", "/")}/${opts.taskId}`;
  const candidatePaths = opts.changedPaths.filter(
    (changedPath) => changedPath === taskPrefix || changedPath.startsWith(`${taskPrefix}/`),
  );
  if (candidatePaths.length === 0) {
    return {
      moved: [],
      restore: noopPromise,
      cleanup: noopPromise,
    };
  }

  const untrackedPaths = await listUntrackedTaskArtifacts({
    gitRoot: opts.gitRoot,
    taskPrefix,
  });
  const collidingPaths = untrackedPaths.filter((untrackedPath) =>
    candidatePaths.includes(untrackedPath),
  );
  if (collidingPaths.length === 0) {
    return {
      moved: [],
      restore: noopPromise,
      cleanup: noopPromise,
    };
  }

  const backupRoot = path.join(
    opts.gitRoot,
    ".agentplane",
    "tmp",
    "integrate-backups",
    `${opts.taskId}-${Date.now()}`,
  );
  const backupParent = path.dirname(backupRoot);
  const backupGrandparent = path.dirname(backupParent);
  const moved: MovedTaskArtifact[] = [];
  for (const relativePath of collidingPaths) {
    const sourcePath = path.join(opts.gitRoot, relativePath);
    const backupPath = path.join(backupRoot, relativePath);
    await mkdir(path.dirname(backupPath), { recursive: true });
    await rename(sourcePath, backupPath);
    moved.push({ relativePath, backupPath });
  }

  return {
    moved,
    restore: async () => {
      for (const entry of moved.toReversed()) {
        await mkdir(path.dirname(path.join(opts.gitRoot, entry.relativePath)), { recursive: true });
        await rename(entry.backupPath, path.join(opts.gitRoot, entry.relativePath));
      }
      await rm(backupRoot, { recursive: true, force: true }).catch(() => null);
      await rm(backupParent).catch(() => null);
      await rm(backupGrandparent).catch(() => null);
    },
    cleanup: async () => {
      await rm(backupRoot, { recursive: true, force: true }).catch(() => null);
      await rm(backupParent).catch(() => null);
      await rm(backupGrandparent).catch(() => null);
    },
  };
}

export async function runSquashMerge(opts: {
  gitRoot: string;
  base: string;
  branch: string;
  headBeforeMerge: string;
  taskId: string;
  taskTitle: string;
  taskTags: string[];
  workflowDir: string;
  changedPaths: string[];
  genericTokens: string[];
}): Promise<string> {
  const movedArtifacts = await moveCollidingTaskArtifacts({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    changedPaths: opts.changedPaths,
  });
  try {
    await execFileAsync("git", ["merge", "--squash", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    await movedArtifacts.restore();
    const message = err instanceof Error ? err.message : "git merge --squash failed";
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }

  const { stdout: staged } = await execFileAsync("git", ["diff", "--cached", "--name-only"], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  if (!staged.trim()) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    await movedArtifacts.restore();
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Nothing to integrate: ${opts.branch} is already merged into ${opts.base}`,
    });
  }

  const { stdout: subjectOut } = await execFileAsync(
    "git",
    ["log", "-1", "--pretty=format:%s", opts.branch],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
  let subject = subjectOut.trim();
  const subjectPolicy = validateCommitSubject({
    subject,
    taskId: opts.taskId,
    genericTokens: opts.genericTokens,
  });
  let shouldFallback = !subjectPolicy.ok;
  if (!shouldFallback) {
    const headPaths = await listCommitChangedPaths({
      gitRoot: opts.gitRoot,
      revision: opts.branch,
    });
    shouldFallback =
      headPaths.length > 0 && headPaths.every((filePath) => isTaskArtifactPath(filePath));
  }
  if (shouldFallback) {
    const suffix = extractTaskSuffix(opts.taskId);
    subject = `🧩 ${suffix} integrate: ${fallbackIntegrateSummary(opts)}`;
  }

  const env = integrateCommitEnv(opts.taskId);
  try {
    await execFileAsync("git", ["commit", "-m", subject], {
      cwd: opts.gitRoot,
      env,
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    await movedArtifacts.restore();
    const message = err instanceof Error ? err.message : "git commit failed";
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }

  await movedArtifacts.cleanup();
  return await gitRevParse(opts.gitRoot, ["HEAD"]);
}

export async function runMergeCommit(opts: {
  gitRoot: string;
  branch: string;
  taskId: string;
  taskTitle: string;
  taskTags: string[];
  workflowDir: string;
  changedPaths: string[];
}): Promise<string> {
  const suffix = extractTaskSuffix(opts.taskId);
  const movedArtifacts = await moveCollidingTaskArtifacts({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    changedPaths: opts.changedPaths,
  });
  const env = integrateCommitEnv(opts.taskId);
  try {
    await execFileAsync(
      "git",
      [
        "merge",
        "--no-ff",
        "--signoff",
        opts.branch,
        "-m",
        `🔀 ${suffix} integrate: ${fallbackIntegrateSummary(opts)}`,
      ],
      { cwd: opts.gitRoot, env },
    );
  } catch (err) {
    await execFileAsync("git", ["merge", "--abort"], { cwd: opts.gitRoot, env: gitEnv() });
    await movedArtifacts.restore();
    const message = err instanceof Error ? err.message : "git merge failed";
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }
  await movedArtifacts.cleanup();
  return await gitRevParse(opts.gitRoot, ["HEAD"]);
}

export async function runRebaseFastForward(opts: {
  gitRoot: string;
  worktreePath: string;
  base: string;
  branch: string;
  headBeforeMerge: string;
  rawVerify: string[];
  metaSource: PrMeta | null;
  verifyLogText: string;
  runVerify: boolean;
  verifyCommands: string[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;
  quiet: boolean;
  taskId: string;
  workflowDir: string;
  changedPaths: string[];
}): Promise<{
  mergeHash: string;
  branchHeadSha: string;
  verifyEntries: { header: string; content: string }[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;
}> {
  try {
    await execFileAsync("git", ["rebase", opts.base], { cwd: opts.worktreePath, env: gitEnv() });
  } catch (err) {
    await execFileAsync("git", ["rebase", "--abort"], { cwd: opts.worktreePath, env: gitEnv() });
    const message = err instanceof Error ? err.message : "git rebase failed";
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }

  let branchHeadSha = await gitRevParse(opts.gitRoot, [opts.branch]);
  let alreadyVerifiedSha = opts.alreadyVerifiedSha;
  let shouldRunVerify = opts.shouldRunVerify;

  if (!opts.runVerify && opts.verifyCommands.length > 0) {
    ({ alreadyVerifiedSha, shouldRunVerify } = computeVerifyState({
      rawVerify: opts.rawVerify,
      metaLastVerifiedSha: opts.metaSource?.last_verified_sha ?? null,
      verifyLogText: opts.verifyLogText,
      branchHeadSha,
      runVerify: false,
    }));
  }

  const verifyEntries: { header: string; content: string }[] = [];
  if (shouldRunVerify && opts.verifyCommands.length > 0) {
    verifyEntries.push(
      ...(await runVerifyCommands({
        commands: opts.verifyCommands,
        worktreePath: opts.worktreePath,
        branchHeadSha,
        quiet: opts.quiet,
        taskId: opts.taskId,
      })),
    );
  }

  const movedArtifacts = await moveCollidingTaskArtifacts({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    changedPaths: opts.changedPaths,
  });
  try {
    await execFileAsync("git", ["merge", "--ff-only", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    }).catch(() => null);
    await movedArtifacts.restore();
    const message = err instanceof Error ? err.message : "git merge --ff-only failed";
    throw new CliError({ exitCode: exitCodeForError("E_GIT"), code: "E_GIT", message });
  }

  const mergeHash = await gitRevParse(opts.gitRoot, ["HEAD"]);
  branchHeadSha = await gitRevParse(opts.gitRoot, [opts.branch]);
  await movedArtifacts.cleanup();

  return { mergeHash, branchHeadSha, verifyEntries, alreadyVerifiedSha, shouldRunVerify };
}
