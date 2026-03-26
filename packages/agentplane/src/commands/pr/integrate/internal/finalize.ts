import path from "node:path";
import { readFile } from "node:fs/promises";

import type { TaskData } from "../../../../backends/task-backend.js";
import { fileExists } from "../../../../cli/fs-utils.js";
import { successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";
import {
  writeJsonStableIfChanged,
  writeTextIfChanged,
} from "../../../../shared/write-if-changed.js";
import { gitDiffStat } from "../../../shared/git-diff.js";
import {
  appendVerifyLog,
  buildIntegratedPrMeta,
  parsePrMeta,
  type PrMeta,
} from "../../../shared/pr-meta.js";
import { readCommitInfo } from "../../../task/shared.js";
import { createTaskCloseCommit, writeFinishedTasks } from "../../../task/finish-shared.js";
import type { CommandContext } from "../../../shared/task-backend.js";

function nowIso(): string {
  return new Date().toISOString();
}

export async function finalizeIntegrate(opts: {
  ctx: CommandContext;
  task: TaskData;
  cwd: string;
  rootOverride?: string;
  gitRoot: string;
  prDir: string;
  metaPath: string;
  diffstatPath: string;
  verifyLogPath: string;
  taskId: string;

  branch: string;
  base: string;
  mergeStrategy: "squash" | "merge" | "rebase";
  mergeHash: string;
  branchHeadSha: string;
  baseShaBeforeMerge: string;

  verifyEntries: { header: string; content: string }[];
  verifyCommands: string[];
  alreadyVerifiedSha: string | null;
  shouldRunVerify: boolean;

  quiet: boolean;
}): Promise<void> {
  if (!(await fileExists(opts.prDir))) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Missing PR artifact dir after merge: ${path.relative(opts.gitRoot, opts.prDir)}`,
    });
  }

  if (opts.verifyEntries.length > 0) {
    for (const entry of opts.verifyEntries) {
      await appendVerifyLog(opts.verifyLogPath, entry.header, entry.content);
    }
  }

  const rawMeta = await readFile(opts.metaPath, "utf8");
  const mergedMeta = parsePrMeta(rawMeta, opts.taskId);
  const now = nowIso();
  const nextMeta: PrMeta = buildIntegratedPrMeta({
    meta: mergedMeta,
    branch: opts.branch,
    base: opts.base,
    mergeStrategy: opts.mergeStrategy,
    mergeHash: opts.mergeHash,
    branchHeadSha: opts.branchHeadSha,
    at: now,
    verifyCommands: opts.verifyCommands,
    shouldRunVerify: opts.shouldRunVerify,
    alreadyVerifiedSha: opts.alreadyVerifiedSha,
  });
  await writeJsonStableIfChanged(opts.metaPath, nextMeta);

  const diffstat = await gitDiffStat(opts.gitRoot, opts.baseShaBeforeMerge, opts.branch);
  await writeTextIfChanged(opts.diffstatPath, diffstat ? `${diffstat}\n` : "");

  const verifyDesc =
    opts.verifyCommands.length === 0
      ? "skipped(no commands)"
      : opts.shouldRunVerify
        ? "ran"
        : opts.alreadyVerifiedSha
          ? `skipped(already verified_sha=${opts.alreadyVerifiedSha})`
          : "skipped";
  const finishBody = `Verified: Integrated via ${opts.mergeStrategy}; verify=${verifyDesc}; pr=${path.relative(
    opts.gitRoot,
    opts.prDir,
  )}.`;
  const resultSummary = `integrate: ${opts.mergeStrategy} ${opts.branch}`;
  const taskCommitInfo = await readCommitInfo(opts.gitRoot, opts.mergeHash);
  await writeFinishedTasks({
    ctx: opts.ctx,
    loadedTasks: [{ taskId: opts.taskId, task: opts.task }],
    metaTaskId: opts.taskId,
    author: "INTEGRATOR",
    body: finishBody,
    force: false,
    resultProvided: true,
    resultSummary,
    riskLevel: undefined,
    breaking: false,
    taskCommitInfo,
  });
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    baseBranchOverride: opts.base,
    quiet: opts.quiet,
  });

  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage("integrate", opts.taskId, `merge=${opts.mergeHash.slice(0, 12)}`)}\n`,
    );
  }
}
