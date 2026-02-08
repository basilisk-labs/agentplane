import { mapBackendError } from "../../../cli/error-map.js";
import { successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";

import { execFileAsync, gitEnv } from "../../shared/git.js";
import { gitRevParse } from "../../shared/git-ops.js";
import type { CommandContext } from "../../shared/task-backend.js";

import { finalizeIntegrate } from "./internal/finalize.js";
import { runMergeCommit, runRebaseFastForward, runSquashMerge } from "./internal/merge.js";
import { prepareIntegrate } from "./internal/prepare.js";
import { resolveWorktreeForIntegrate } from "./internal/worktree.js";
import { runVerifyCommands } from "./verify.js";

export async function cmdIntegrate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string;
  base?: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  runVerify: boolean;
  dryRun: boolean;
  quiet: boolean;
}): Promise<number> {
  let tempWorktreePath: string | null = null;
  let createdTempWorktree = false;

  try {
    const prepared = await prepareIntegrate({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      branch: opts.branch,
      base: opts.base,
      runVerify: opts.runVerify,
    });

    const {
      resolved,
      loadedConfig,
      task,
      prDir,
      metaPath,
      diffstatPath,
      verifyLogPath,
      metaSource,
      branch,
      base,
      verifyLogText,
    } = prepared;

    const verifyCommands = prepared.verifyCommands;
    let alreadyVerifiedSha = prepared.alreadyVerifiedSha;
    let shouldRunVerify = prepared.shouldRunVerify;
    let branchHeadSha = prepared.branchHeadSha;

    if (opts.dryRun) {
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage(
            "integrate dry-run",
            task.id,
            `base=${base} branch=${branch} verify=${shouldRunVerify ? "yes" : "no"}`,
          )}\n`,
        );
      }
      return 0;
    }

    const wt = await resolveWorktreeForIntegrate({
      gitRoot: resolved.gitRoot,
      worktreesDirRel: loadedConfig.paths.worktrees_dir,
      branch,
      taskId: task.id,
      mergeStrategy: opts.mergeStrategy,
      shouldRunVerify,
    });
    let worktreePath = wt.worktreePath;
    tempWorktreePath = wt.tempWorktreePath;
    createdTempWorktree = wt.createdTempWorktree;

    const verifyEntries: { header: string; content: string }[] = [];
    if (opts.mergeStrategy !== "rebase" && shouldRunVerify && verifyCommands.length > 0) {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "Unable to locate or create a worktree for verify execution",
        });
      }
      verifyEntries.push(
        ...(await runVerifyCommands({
          commands: verifyCommands,
          worktreePath,
          branchHeadSha,
          quiet: opts.quiet,
          taskId: task.id,
        })),
      );
    }

    const baseShaBeforeMerge = await gitRevParse(resolved.gitRoot, [base]);
    const headBeforeMerge = await gitRevParse(resolved.gitRoot, ["HEAD"]);
    let mergeHash = "";

    if (opts.mergeStrategy === "squash") {
      mergeHash = await runSquashMerge({
        gitRoot: resolved.gitRoot,
        base,
        branch,
        headBeforeMerge,
        taskId: task.id,
        genericTokens: loadedConfig.commit.generic_tokens,
      });
    } else if (opts.mergeStrategy === "merge") {
      mergeHash = await runMergeCommit({ gitRoot: resolved.gitRoot, branch, taskId: task.id });
    } else {
      if (!worktreePath) {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: "rebase strategy requires an existing worktree for the task branch",
        });
      }

      const rebaseRes = await runRebaseFastForward({
        gitRoot: resolved.gitRoot,
        worktreePath,
        base,
        branch,
        headBeforeMerge,
        rawVerify: task.verify,
        metaSource: metaSource ?? null,
        verifyLogText,
        runVerify: opts.runVerify,
        verifyCommands,
        alreadyVerifiedSha,
        shouldRunVerify,
        quiet: opts.quiet,
        taskId: task.id,
      });

      mergeHash = rebaseRes.mergeHash;
      branchHeadSha = rebaseRes.branchHeadSha;
      alreadyVerifiedSha = rebaseRes.alreadyVerifiedSha;
      shouldRunVerify = rebaseRes.shouldRunVerify;
      verifyEntries.push(...rebaseRes.verifyEntries);
    }

    await finalizeIntegrate({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      gitRoot: resolved.gitRoot,
      prDir,
      metaPath,
      diffstatPath,
      verifyLogPath,
      taskId: task.id,
      branch,
      base,
      mergeStrategy: opts.mergeStrategy,
      mergeHash,
      branchHeadSha,
      baseShaBeforeMerge,
      verifyEntries,
      verifyCommands,
      alreadyVerifiedSha,
      shouldRunVerify,
      quiet: opts.quiet,
    });

    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "integrate", root: opts.rootOverride ?? null });
  } finally {
    if (createdTempWorktree && tempWorktreePath) {
      try {
        await execFileAsync("git", ["worktree", "remove", "--force", tempWorktreePath], {
          cwd: opts.cwd,
          env: gitEnv(),
        });
      } catch {
        // ignore cleanup errors
      }
    }
  }
}
