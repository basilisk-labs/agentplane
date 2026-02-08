import { extractTaskSuffix, validateCommitSubject } from "@agentplaneorg/core";

import { CliError } from "../../../../shared/errors.js";
import { execFileAsync, gitEnv } from "../../../shared/git.js";
import { gitRevParse } from "../../../shared/git-ops.js";
import type { PrMeta } from "../../../shared/pr-meta.js";

import { computeVerifyState, runVerifyCommands } from "../verify.js";

export async function runSquashMerge(opts: {
  gitRoot: string;
  base: string;
  branch: string;
  headBeforeMerge: string;
  taskId: string;
  genericTokens: string[];
}): Promise<string> {
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
    const message = err instanceof Error ? err.message : "git merge --squash failed";
    throw new CliError({ exitCode: 2, code: "E_GIT", message });
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
    throw new CliError({
      exitCode: 2,
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
  if (!subjectPolicy.ok) {
    const suffix = extractTaskSuffix(opts.taskId);
    subject = `🧩 ${suffix} integrate: squash ${opts.branch}`;
  }

  const env = {
    ...process.env,
    AGENTPLANE_TASK_ID: opts.taskId,
    AGENTPLANE_ALLOW_BASE: "1",
    AGENTPLANE_ALLOW_TASKS: "0",
  };
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
    const message = err instanceof Error ? err.message : "git commit failed";
    throw new CliError({ exitCode: 2, code: "E_GIT", message });
  }

  return await gitRevParse(opts.gitRoot, ["HEAD"]);
}

export async function runMergeCommit(opts: {
  gitRoot: string;
  branch: string;
  taskId: string;
}): Promise<string> {
  const suffix = extractTaskSuffix(opts.taskId);
  const env = {
    ...process.env,
    AGENTPLANE_TASK_ID: opts.taskId,
    AGENTPLANE_ALLOW_BASE: "1",
    AGENTPLANE_ALLOW_TASKS: "0",
  };
  try {
    await execFileAsync(
      "git",
      ["merge", "--no-ff", opts.branch, "-m", `🔀 ${suffix} integrate: merge ${opts.branch}`],
      { cwd: opts.gitRoot, env },
    );
  } catch (err) {
    await execFileAsync("git", ["merge", "--abort"], { cwd: opts.gitRoot, env: gitEnv() });
    const message = err instanceof Error ? err.message : "git merge failed";
    throw new CliError({ exitCode: 2, code: "E_GIT", message });
  }
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
    throw new CliError({ exitCode: 2, code: "E_GIT", message });
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
    const message = err instanceof Error ? err.message : "git merge --ff-only failed";
    throw new CliError({ exitCode: 2, code: "E_GIT", message });
  }

  const mergeHash = await gitRevParse(opts.gitRoot, ["HEAD"]);
  branchHeadSha = await gitRevParse(opts.gitRoot, [opts.branch]);

  return { mergeHash, branchHeadSha, verifyEntries, alreadyVerifiedSha, shouldRunVerify };
}
