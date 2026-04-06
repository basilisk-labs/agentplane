import path from "node:path";
import { readFile } from "node:fs/promises";

import type { TaskData } from "../../../../backends/task-backend.js";
import { fileExists } from "../../../../cli/fs-utils.js";
import { createCliEmitter } from "../../../../cli/output.js";
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
import {
  collectTaskIncidents,
  renderIncidentCollectionOutcome,
} from "../../../incidents/shared.js";

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
  const output = createCliEmitter();
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
  await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: opts.taskId,
    task: opts.task,
    write: false,
  });
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
  const collectedIncidents = await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: opts.taskId,
    write: true,
  });
  if (!opts.quiet) {
    output.info(renderIncidentCollectionOutcome(collectedIncidents.plan.promotable.length));
  }
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    baseBranchOverride: opts.base,
    quiet: opts.quiet,
    allowPolicy: collectedIncidents.wrote,
  });

  if (!opts.quiet) {
    output.success("integrate", opts.taskId, `merge=${opts.mergeHash.slice(0, 12)}`);
  }
}
