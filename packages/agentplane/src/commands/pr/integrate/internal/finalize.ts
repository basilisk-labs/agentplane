import path from "node:path";
import { readFile } from "node:fs/promises";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../../../backends/task-backend.js";
import { fileExists } from "../../../../cli/fs-utils.js";
import { createCliEmitter } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";
import {
  writeJsonStableIfChanged,
  writeTextIfChanged,
} from "../../../../shared/write-if-changed.js";
import { gitDiffStat } from "@agentplaneorg/core/git";
import {
  appendVerifyLog,
  buildIntegratedPrMeta,
  parsePrMeta,
  type PrMeta,
} from "../../../shared/pr-meta.js";
import { readCommitInfo } from "../../../task/shared.js";
import {
  createTaskCloseCommit,
  refreshAcrArtifactsForFinishedTasks,
  writeFinishedTasks,
} from "../../../task/finish-shared.js";
import type { CommandContext } from "../../../shared/task-backend.js";
import {
  collectTaskIncidents,
  renderIncidentCollectionPlanOutcome,
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
  const taskAlreadyDone = normalizeTaskStatus(opts.task.status) === "DONE";
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
  if (!taskAlreadyDone) {
    const taskCommitInfo = await readCommitInfo(opts.gitRoot, opts.mergeHash);
    const loadedTasks = [{ taskId: opts.taskId, task: opts.task }];
    await writeFinishedTasks({
      ctx: opts.ctx,
      loadedTasks,
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
    await refreshAcrArtifactsForFinishedTasks({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      loadedTasks,
      taskCommitInfo,
      author: "INTEGRATOR",
    });
  }
  const collectedIncidents = await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: opts.taskId,
    task: opts.task,
    write: true,
  });
  if (!opts.quiet) {
    output.info(
      renderIncidentCollectionPlanOutcome(collectedIncidents.plan, {
        wrote: collectedIncidents.wrote,
        context: "finish",
        promotedIds: collectedIncidents.plan.promotable.map((item) => item.entry.id),
        registryPaths: collectedIncidents.registryPaths,
      }),
    );
    if (taskAlreadyDone) {
      output.info("task already DONE; integrating only missing PR metadata and close artifacts");
    }
  }
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    baseBranchOverride: opts.base,
    quiet: opts.quiet,
    allowPolicy: collectedIncidents.wrote,
    // finalizeIntegrate already wrote the canonical MERGED task packet on the base checkout.
    // Re-running branch-side PR artifact refresh here can regress pr/meta.json back to OPEN.
    closeRefreshTaskArtifacts: false,
  });

  if (!opts.quiet) {
    output.success("integrate", opts.taskId, `merge=${opts.mergeHash.slice(0, 12)}`);
  }
}
