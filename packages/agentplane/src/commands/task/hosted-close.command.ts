import { readFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import type { CommandCtx } from "../../cli/spec/spec.js";
import { infoMessage, successMessage } from "../../cli/output.js";
import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
import { cmdEvidenceBundle, defaultEvidenceManifestPath } from "../evidence/evidence.command.js";
import {
  buildIntegratedPrMeta,
  parsePrMeta,
  resolvePrBatchIncludedTaskIds,
  type PrMeta,
} from "../shared/pr-meta.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  createTaskCloseCommit,
  refreshAcrArtifactsForFinishedTasks,
  writeFinishedTasks,
} from "./finish-shared.js";
import { resolveHostedMergeTargetFromEvent } from "./hosted-merge-sync.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { TaskHostedCloseParsed } from "./hosted-close.spec.js";
import {
  buildHostedTaskFromTrackedPrArtifacts,
  hasTaskArtifactChanges,
  isMissingTaskReadmeError,
  readHostedPrMetaOrFallback,
  resolveHostedTaskCommitInfo,
} from "./hosted-close-recovery.js";

export { taskHostedCloseSpec } from "./hosted-close.spec.js";

type HostedCloseOutcome =
  | { outcome: "noop"; detail: string }
  | { outcome: "closed"; taskId: string; mergeHash: string }
  | { outcome: "meta-only"; taskId: string; mergeHash: string };

async function loadHostedBatchTasks(opts: {
  ctx: CommandContext;
  primaryTaskId: string;
  primaryTask: TaskData;
  includedTaskIds: string[];
}): Promise<{ taskId: string; task: TaskData }[]> {
  const loaded = [{ taskId: opts.primaryTaskId, task: opts.primaryTask }];
  for (const taskId of opts.includedTaskIds) {
    const task = await loadTaskFromContext({ ctx: opts.ctx, taskId, preferBranchSnapshot: false });
    loaded.push({ taskId, task });
  }
  return loaded;
}

async function refreshExistingEvidenceBundles(opts: {
  ctx: CommandContext;
  cwd: string;
  loadedTasks: { taskId: string }[];
}): Promise<void> {
  for (const loaded of opts.loadedTasks) {
    const manifestPath = defaultEvidenceManifestPath(opts.ctx, loaded.taskId);
    if (!(await fileExists(manifestPath))) continue;
    await cmdEvidenceBundle({
      commandCtx: opts.ctx,
      cwd: opts.cwd,
      parsed: { taskId: loaded.taskId, json: false },
    });
  }
}

function taskIsClosedForMerge(task: TaskData, mergeCommit: string): boolean {
  return normalizeTaskStatus(task.status) === "DONE" && task.commit?.hash === mergeCommit;
}

async function taskIsAlreadyClosedBeforeMerge(opts: {
  gitRoot: string;
  task: TaskData;
  meta: PrMeta;
  branch: string;
  taskBranchPrefix: string;
  mergeCommit: string;
}): Promise<boolean> {
  if (normalizeTaskStatus(opts.task.status) !== "DONE") return false;
  const taskCommitHash = opts.task.commit?.hash ?? "";
  if (taskCommitHash === "" || taskCommitHash === opts.mergeCommit) return false;
  const recordedMergeCommit = opts.meta.merge_commit?.trim() ?? "";
  if (opts.meta.status !== "MERGED" || recordedMergeCommit !== taskCommitHash) return false;
  if (!isExplicitHostedCloseFollowupBranch(opts)) return false;
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", taskCommitHash, opts.mergeCommit], {
      cwd: opts.gitRoot,
      env: process.env,
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    throw err;
  }
}

export function isExplicitHostedCloseFollowupBranch(opts: {
  branch: string;
  taskBranchPrefix: string;
  task: TaskData;
}): boolean {
  const expectedPrefix = `${opts.taskBranchPrefix}/${opts.task.id}/`;
  if (!opts.branch.startsWith(expectedPrefix)) return false;
  const slug = opts.branch.slice(expectedPrefix.length).trim().toLowerCase();
  return slug.startsWith("post-merge-") || /(?:^|-)followup(?:-|$)/u.test(slug);
}

function assertNoConflictingDoneTask(opts: { task: TaskData; mergeCommit: string }): void {
  const taskStatus = normalizeTaskStatus(opts.task.status);
  const taskCommitHash = opts.task.commit?.hash ?? "";
  if (taskStatus !== "DONE" || taskCommitHash === "" || taskCommitHash === opts.mergeCommit) {
    return;
  }
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message:
      `Hosted task closure found a conflicting DONE commit for ${opts.task.id}: ` +
      `${opts.task.commit?.hash} != ${opts.mergeCommit}`,
  });
}

async function hasHostedBatchArtifactChanges(opts: {
  gitRoot: string;
  workflowDir: string;
  taskIds: string[];
}): Promise<boolean> {
  for (const taskId of opts.taskIds) {
    const taskDirRelative = path.join(opts.workflowDir, taskId);
    if (await hasTaskArtifactChanges({ gitRoot: opts.gitRoot, taskDirRelative })) return true;
  }
  return false;
}

async function closeHostedTask(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  eventJson: string;
  quiet: boolean;
}): Promise<HostedCloseOutcome> {
  const rawEvent = await readFile(opts.eventJson, "utf8");
  const parsedEvent = JSON.parse(rawEvent) as unknown;
  const target = resolveHostedMergeTargetFromEvent({
    event: parsedEvent,
    branchPrefix: opts.ctx.config.branch.task_prefix,
  });
  if (!target?.mergedPr.mergeCommit?.oid) {
    return { outcome: "noop", detail: "event is not a merged task PR" };
  }
  const mergeCommitOid = target.mergedPr.mergeCommit.oid;

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const taskDirRelative = path.join(opts.ctx.config.paths.workflow_dir, target.taskId);
  const taskReadmePath = path.join(gitRoot, taskDirRelative, "README.md");
  const existingMetaPath = path.join(gitRoot, taskDirRelative, "pr", "meta.json");
  let existingMeta: PrMeta | null = null;
  if (await fileExists(existingMetaPath)) {
    existingMeta = parsePrMeta(await readFile(existingMetaPath, "utf8"), target.taskId);
  }
  const existingMergeCommit = existingMeta?.merge_commit?.trim() ?? "";
  const existingMetaAlreadyMerged =
    existingMeta?.status === "MERGED" &&
    existingMergeCommit.length > 0 &&
    existingMergeCommit === mergeCommitOid;
  let task: TaskData;
  try {
    task = await loadTaskFromContext({
      ctx: opts.ctx,
      taskId: target.taskId,
      preferBranchSnapshot: !existingMetaAlreadyMerged,
      branchSnapshotBranch: existingMetaAlreadyMerged ? null : target.branch,
    });
  } catch (err) {
    if (!isMissingTaskReadmeError(err, taskReadmePath)) throw err;
    if (existingMetaAlreadyMerged) {
      return {
        outcome: "noop",
        detail: `${target.taskId} is already closed for merge ${mergeCommitOid.slice(0, 12)}`,
      };
    }
    const recovered = await buildHostedTaskFromTrackedPrArtifacts({
      gitRoot,
      taskDirRelative,
      taskId: target.taskId,
      mergedPr: target.mergedPr,
    });
    if (!recovered) throw err;
    task = recovered;
  }
  if (!(await fileExists(taskReadmePath))) {
    await opts.ctx.taskBackend.writeTask(task);
  }
  const { metaPath, meta } = await readHostedPrMetaOrFallback({
    gitRoot,
    taskDirRelative,
    target,
  });
  if (
    await taskIsAlreadyClosedBeforeMerge({
      gitRoot,
      task,
      meta,
      branch: target.branch,
      taskBranchPrefix: opts.ctx.config.branch.task_prefix,
      mergeCommit: mergeCommitOid,
    })
  ) {
    return {
      outcome: "noop",
      detail: `${target.taskId} is already closed before follow-up merge ${mergeCommitOid.slice(
        0,
        12,
      )}`,
    };
  }
  assertNoConflictingDoneTask({ task, mergeCommit: mergeCommitOid });

  const nextMeta = buildIntegratedPrMeta({
    meta,
    branch: target.branch,
    base: target.mergedPr.baseRefName ?? meta.base ?? "main",
    mergeStrategy: meta.merge_strategy ?? "merge",
    mergeHash: mergeCommitOid,
    branchHeadSha: target.mergedPr.headRefOid ?? meta.head_sha ?? mergeCommitOid,
    at: target.mergedPr.mergedAt ?? new Date().toISOString(),
    verifyCommands: [],
    shouldRunVerify: false,
    alreadyVerifiedSha: null,
  });
  await writeJsonStableIfChanged(metaPath, nextMeta);
  const includedTaskIds = resolvePrBatchIncludedTaskIds(nextMeta);
  const loadedTasks = await loadHostedBatchTasks({
    ctx: opts.ctx,
    primaryTaskId: target.taskId,
    primaryTask: task,
    includedTaskIds,
  });
  for (const loaded of loadedTasks) {
    assertNoConflictingDoneTask({
      task: loaded.task,
      mergeCommit: mergeCommitOid,
    });
  }
  const tasksNeedingClose = loadedTasks.filter(
    (loaded) => !taskIsClosedForMerge(loaded.task, mergeCommitOid),
  );
  const closeCommitTaskIds = [
    ...new Set([
      ...includedTaskIds,
      ...tasksNeedingClose
        .map((loaded) => loaded.taskId)
        .filter((taskId) => taskId !== target.taskId),
    ]),
  ];

  if (tasksNeedingClose.length === 0) {
    if (
      !(await hasHostedBatchArtifactChanges({
        gitRoot,
        workflowDir: opts.ctx.config.paths.workflow_dir,
        taskIds: [target.taskId, ...includedTaskIds],
      }))
    ) {
      return {
        outcome: "noop",
        detail: `${target.taskId} is already closed for merge ${mergeCommitOid.slice(0, 12)}`,
      };
    }
    await createTaskCloseCommit({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: target.taskId,
      baseBranchOverride: nextMeta.base ?? "main",
      quiet: opts.quiet,
      additionalTaskIds: closeCommitTaskIds,
      closeRefreshTaskArtifacts: false,
    });
    return {
      outcome: "meta-only",
      taskId: target.taskId,
      mergeHash: mergeCommitOid,
    };
  }

  const taskCommitInfo = await resolveHostedTaskCommitInfo({
    gitRoot,
    mergedPr: target.mergedPr,
  });
  const prLabel = `PR #${target.mergedPr.number}`;
  const finishBody =
    `Verified: ${prLabel} merged on GitHub ${target.mergedPr.baseRefName ?? "main"}; ` +
    "hosted closure automation recorded canonical task artifacts.";
  await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: target.taskId,
    task,
    write: false,
  });
  await writeFinishedTasks({
    ctx: opts.ctx,
    loadedTasks: tasksNeedingClose,
    metaTaskId: target.taskId,
    author: "INTEGRATOR",
    body: finishBody,
    force: false,
    resultProvided: true,
    resultSummary: `Merged via ${prLabel}.`,
    riskLevel: undefined,
    breaking: false,
    taskCommitInfo,
  });
  await refreshAcrArtifactsForFinishedTasks({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    loadedTasks: tasksNeedingClose,
    taskCommitInfo,
    author: "INTEGRATOR",
  });
  const collectedIncidents = await collectTaskIncidents({
    ctx: opts.ctx,
    taskId: target.taskId,
    write: true,
  });
  await refreshExistingEvidenceBundles({
    ctx: opts.ctx,
    cwd: opts.cwd,
    loadedTasks: tasksNeedingClose,
  });
  if (!opts.quiet) {
    process.stdout.write(
      `${infoMessage(
        renderIncidentCollectionPlanOutcome(collectedIncidents.plan, {
          wrote: collectedIncidents.wrote,
          context: "finish",
          promotedIds: collectedIncidents.plan.promotable.map((item) => item.entry.id),
          registryPaths: collectedIncidents.registryPaths,
        }),
      )}\n`,
    );
  }
  await createTaskCloseCommit({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: target.taskId,
    baseBranchOverride: nextMeta.base ?? "main",
    quiet: opts.quiet,
    allowPolicy: collectedIncidents.wrote,
    additionalTaskIds: closeCommitTaskIds,
    closeRefreshTaskArtifacts: false,
  });
  return {
    outcome: "closed",
    taskId: target.taskId,
    mergeHash: mergeCommitOid,
  };
}

export function makeRunTaskHostedCloseHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: TaskHostedCloseParsed): Promise<number> => {
    try {
      const commandCtx = await getCtx("task hosted-close");
      const outcome = await closeHostedTask({
        ctx: commandCtx,
        cwd: ctx.cwd,
        rootOverride: ctx.rootOverride ?? undefined,
        eventJson: parsed.eventJson,
        quiet: parsed.quiet,
      });
      if (parsed.quiet) return 0;
      if (outcome.outcome === "noop") {
        process.stdout.write(`${infoMessage(`hosted close skipped: ${outcome.detail}`)}\n`);
        return 0;
      }
      const detail = `merge=${outcome.mergeHash.slice(0, 12)}`;
      process.stdout.write(`${successMessage("task hosted close", outcome.taskId, detail)}\n`);
      if (outcome.outcome === "meta-only") {
        process.stdout.write(
          `${infoMessage("task was already DONE; committed only the missing hosted PR metadata")}\n`,
        );
      }
      return 0;
    } catch (err) {
      throw mapBackendError(err, { command: "task hosted-close", root: ctx.rootOverride ?? null });
    }
  };
}
