import { validateCommitSubject, extractTaskSuffix } from "@agentplaneorg/core/commit";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { gitRevParse } from "../../../shared/git-ops.js";
import type { PrMeta } from "../../../shared/pr-meta.js";
import { requireCleanTaskWorktree } from "../../../shared/task-worktree-cleanliness.js";
import { computeVerifyState, runVerifyCommands } from "../verify.js";
import { moveCollidingTaskArtifacts } from "./merge-artifacts.js";
import { runWithIntegrationMutation } from "./merge-mutation.js";

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

async function assertBaseHeadStillExpected(opts: {
  gitRoot: string;
  base: string;
  expectedBaseSha: string;
  operation: string;
}): Promise<void> {
  const currentBaseHead = await gitRevParse(opts.gitRoot, [opts.base]);
  if (currentBaseHead === opts.expectedBaseSha) return;
  throw new CliError({
    code: "E_GIT_RACE",
    message:
      `Base branch moved before ${opts.operation}: expected=${opts.expectedBaseSha} ` +
      `current=${currentBaseHead}`,
    context: {
      reason_code: "integration_queue_base_changed",
      base: opts.base,
      expected_base_sha: opts.expectedBaseSha,
      current_base_sha: currentBaseHead,
    },
  });
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

export async function runSquashMerge(opts: {
  gitRoot: string;
  base: string;
  branch: string;
  sourceSha: string;
  expectedBaseSha: string;
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
    await runWithIntegrationMutation({
      repoRoot: opts.gitRoot,
      command: "git merge --squash",
      workflowMode: "branch_pr",
      taskId: opts.taskId,
      changedPaths: opts.changedPaths,
      run: async () => {
        await assertBaseHeadStillExpected({
          gitRoot: opts.gitRoot,
          base: opts.base,
          expectedBaseSha: opts.expectedBaseSha,
          operation: "squash integration",
        });
        const currentBranchHead = await gitRevParse(opts.gitRoot, [opts.branch]);
        if (currentBranchHead !== opts.sourceSha) {
          throw new CliError({
            code: "E_GIT_RACE",
            message:
              `Task branch moved before squash integration: expected=${opts.sourceSha} ` +
              `current=${currentBranchHead}`,
          });
        }
        await execFileAsync("git", ["merge", "--squash", opts.sourceSha], {
          cwd: opts.gitRoot,
          env: gitEnv(),
        });
      },
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    await movedArtifacts.restore();
    throw err;
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
    ["log", "-1", "--pretty=format:%s", opts.sourceSha],
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
      revision: opts.sourceSha,
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
    await runWithIntegrationMutation({
      repoRoot: opts.gitRoot,
      command: "git commit",
      workflowMode: "branch_pr",
      taskId: opts.taskId,
      changedPaths: opts.changedPaths,
      run: async () => {
        await execFileAsync("git", ["commit", "-m", subject], {
          cwd: opts.gitRoot,
          env,
        });
      },
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    await movedArtifacts.restore();
    throw err;
  }

  await movedArtifacts.cleanup();
  return await gitRevParse(opts.gitRoot, ["HEAD"]);
}

export async function runMergeCommit(opts: {
  gitRoot: string;
  base: string;
  branch: string;
  sourceSha: string;
  expectedBaseSha: string;
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
    await runWithIntegrationMutation({
      repoRoot: opts.gitRoot,
      command: "git merge --no-ff",
      workflowMode: "branch_pr",
      taskId: opts.taskId,
      changedPaths: opts.changedPaths,
      run: async () => {
        await assertBaseHeadStillExpected({
          gitRoot: opts.gitRoot,
          base: opts.base,
          expectedBaseSha: opts.expectedBaseSha,
          operation: "merge integration",
        });
        const currentBranchHead = await gitRevParse(opts.gitRoot, [opts.branch]);
        if (currentBranchHead !== opts.sourceSha) {
          throw new CliError({
            code: "E_GIT_RACE",
            message:
              `Task branch moved before merge integration: expected=${opts.sourceSha} ` +
              `current=${currentBranchHead}`,
          });
        }
        await execFileAsync(
          "git",
          [
            "merge",
            "--no-ff",
            "--signoff",
            opts.sourceSha,
            "-m",
            `🔀 ${suffix} integrate: ${fallbackIntegrateSummary(opts)}`,
          ],
          { cwd: opts.gitRoot, env },
        );
      },
    });
  } catch (err) {
    await execFileAsync("git", ["merge", "--abort"], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    }).catch(() => null);
    await movedArtifacts.restore();
    throw err;
  }
  await movedArtifacts.cleanup();
  return await gitRevParse(opts.gitRoot, ["HEAD"]);
}

export async function runRebaseFastForward(opts: {
  gitRoot: string;
  worktreePath: string;
  base: string;
  branch: string;
  expectedBranchHeadSha: string;
  expectedBaseSha: string;
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
    await runWithIntegrationMutation({
      repoRoot: opts.worktreePath,
      command: "git rebase",
      workflowMode: "branch_pr",
      taskId: opts.taskId,
      changedPaths: opts.changedPaths,
      run: async () => {
        await assertBaseHeadStillExpected({
          gitRoot: opts.gitRoot,
          base: opts.base,
          expectedBaseSha: opts.expectedBaseSha,
          operation: "rebase integration",
        });
        const currentBranchHead = await gitRevParse(opts.gitRoot, [opts.branch]);
        if (currentBranchHead !== opts.expectedBranchHeadSha) {
          throw new CliError({
            code: "E_GIT_RACE",
            message:
              `Task branch moved before rebase integration: expected=${opts.expectedBranchHeadSha} ` +
              `current=${currentBranchHead}`,
          });
        }
        await execFileAsync("git", ["rebase", opts.base], {
          cwd: opts.worktreePath,
          env: gitEnv(),
        });
      },
    });
  } catch (err) {
    await execFileAsync("git", ["rebase", "--abort"], { cwd: opts.worktreePath, env: gitEnv() });
    throw err;
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

  await requireCleanTaskWorktree({
    gitRoot: opts.gitRoot,
    branch: opts.branch,
    taskId: opts.taskId,
  });

  const movedArtifacts = await moveCollidingTaskArtifacts({
    gitRoot: opts.gitRoot,
    workflowDir: opts.workflowDir,
    taskId: opts.taskId,
    changedPaths: opts.changedPaths,
  });
  try {
    await runWithIntegrationMutation({
      repoRoot: opts.gitRoot,
      command: "git merge --ff-only",
      workflowMode: "branch_pr",
      taskId: opts.taskId,
      changedPaths: opts.changedPaths,
      run: async () => {
        await assertBaseHeadStillExpected({
          gitRoot: opts.gitRoot,
          base: opts.base,
          expectedBaseSha: opts.expectedBaseSha,
          operation: "fast-forward integration",
        });
        await execFileAsync("git", ["merge", "--ff-only", branchHeadSha], {
          cwd: opts.gitRoot,
          env: gitEnv(),
        });
      },
    });
  } catch (err) {
    await execFileAsync("git", ["reset", "--hard", opts.headBeforeMerge], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    }).catch(() => null);
    await movedArtifacts.restore();
    throw err;
  }

  const mergeHash = await gitRevParse(opts.gitRoot, ["HEAD"]);
  branchHeadSha = await gitRevParse(opts.gitRoot, [opts.branch]);
  await movedArtifacts.cleanup();

  return { mergeHash, branchHeadSha, verifyEntries, alreadyVerifiedSha, shouldRunVerify };
}
