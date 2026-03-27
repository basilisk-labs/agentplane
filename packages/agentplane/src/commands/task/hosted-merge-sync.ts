import { readFile } from "node:fs/promises";
import path from "node:path";

import { normalizeTaskDocVersion, type TaskPrMeta } from "@agentplaneorg/core";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { execFileAsync } from "../shared/git.js";
import { parseTaskIdFromBranch } from "../shared/git-worktree.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import type { CommandContext } from "../shared/task-backend.js";
import { appendTaskEvent } from "./shared.js";

export type HostedMergedPr = {
  number: number;
  title?: string | null;
  url?: string | null;
  mergedAt?: string | null;
  baseRefName?: string | null;
  headRefName?: string | null;
  headRefOid?: string | null;
  mergeCommit?: { oid?: string | null } | null;
};

export type HostedMergeTarget = {
  taskId: string;
  branch: string;
  mergedPr: HostedMergedPr;
};

type HostedMergeSyncResult = {
  tasks: TaskData[];
  synced: number;
};

function normalizeMergedPr(value: unknown): HostedMergedPr | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const number = typeof record.number === "number" ? record.number : null;
  if (!number || number <= 0) return null;
  const mergeCommit =
    record.mergeCommit &&
    typeof record.mergeCommit === "object" &&
    !Array.isArray(record.mergeCommit)
      ? {
          oid:
            typeof (record.mergeCommit as { oid?: unknown }).oid === "string"
              ? String((record.mergeCommit as { oid?: unknown }).oid)
              : null,
        }
      : null;
  return {
    number,
    title: typeof record.title === "string" ? record.title : null,
    url: typeof record.url === "string" ? record.url : null,
    mergedAt: typeof record.mergedAt === "string" ? record.mergedAt : null,
    baseRefName: typeof record.baseRefName === "string" ? record.baseRefName : null,
    headRefName: typeof record.headRefName === "string" ? record.headRefName : null,
    headRefOid: typeof record.headRefOid === "string" ? record.headRefOid : null,
    mergeCommit,
  };
}

function normalizePullRequestLike(value: unknown): HostedMergedPr | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  if (record.merged !== true) return null;
  const number = typeof record.number === "number" ? record.number : null;
  const mergeCommitSha =
    typeof record.merge_commit_sha === "string" && record.merge_commit_sha.trim().length > 0
      ? record.merge_commit_sha.trim()
      : null;
  const head =
    record.head && typeof record.head === "object" && !Array.isArray(record.head)
      ? (record.head as Record<string, unknown>)
      : null;
  const base =
    record.base && typeof record.base === "object" && !Array.isArray(record.base)
      ? (record.base as Record<string, unknown>)
      : null;
  const headRefName = typeof head?.ref === "string" ? head.ref : null;
  const headRefOid = typeof head?.sha === "string" ? head.sha : null;
  const baseRefName = typeof base?.ref === "string" ? base.ref : null;
  if (!number || number <= 0 || !mergeCommitSha || !headRefName) return null;
  return {
    number,
    title: typeof record.title === "string" ? record.title : null,
    url: typeof record.html_url === "string" ? record.html_url : null,
    mergedAt: typeof record.merged_at === "string" ? record.merged_at : null,
    baseRefName,
    headRefName,
    headRefOid,
    mergeCommit: { oid: mergeCommitSha },
  };
}

function pickHostedMergedPr(records: unknown[]): HostedMergedPr | null {
  const merged = records
    .map((record) => normalizeMergedPr(record))
    .filter((record): record is HostedMergedPr => !!record && !!record.mergeCommit?.oid);
  if (merged.length === 0) return null;
  return (
    merged.toSorted((a, b) => {
      const left = a.mergedAt ?? "";
      const right = b.mergedAt ?? "";
      return right.localeCompare(left);
    })[0] ?? null
  );
}

export function resolveHostedMergeTargetFromEvent(opts: {
  event: unknown;
  branchPrefix: string;
}): HostedMergeTarget | null {
  if (!opts.event || typeof opts.event !== "object" || Array.isArray(opts.event)) return null;
  const pullRequest = (opts.event as { pull_request?: unknown }).pull_request;
  const mergedPr = normalizePullRequestLike(pullRequest);
  if (!mergedPr?.headRefName || !mergedPr.mergeCommit?.oid) return null;
  const taskId = parseTaskIdFromBranch(opts.branchPrefix, mergedPr.headRefName);
  if (!taskId) return null;
  return {
    taskId,
    branch: mergedPr.headRefName,
    mergedPr,
  };
}

async function resolveHostedMergedPr(opts: {
  cwd: string;
  branch: string;
}): Promise<HostedMergedPr | null> {
  const { stdout } = await execFileAsync(
    "gh",
    [
      "pr",
      "list",
      "--state",
      "merged",
      "--head",
      opts.branch,
      "--json",
      "number,title,url,mergedAt,baseRefName,headRefName,headRefOid,mergeCommit",
    ],
    {
      cwd: opts.cwd,
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  const parsed = JSON.parse(stdout) as unknown;
  return Array.isArray(parsed) ? pickHostedMergedPr(parsed) : null;
}

function buildSyncedPrMeta(opts: {
  meta: TaskPrMeta;
  mergedPr: HostedMergedPr;
  branch: string;
}): TaskPrMeta {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  return {
    ...opts.meta,
    branch: opts.branch,
    status: "MERGED",
    base: opts.mergedPr.baseRefName ?? opts.meta.base,
    merge_strategy: opts.meta.merge_strategy,
    merged_at: opts.meta.merged_at ?? at,
    merge_commit: opts.mergedPr.mergeCommit?.oid ?? opts.meta.merge_commit,
    head_sha: opts.mergedPr.headRefOid ?? opts.meta.head_sha,
    updated_at: at,
  };
}

function buildSyncedTask(opts: { task: TaskData; mergedPr: HostedMergedPr }): TaskData {
  const at = opts.mergedPr.mergedAt ?? new Date().toISOString();
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const note =
    `Hosted PR #${opts.mergedPr.number} merged on GitHub main; ` +
    "task projection reconciled from hosted PR artifacts.";
  const statusEvent = {
    type: "status" as const,
    at,
    author: "INTEGRATOR",
    from: currentStatus,
    to: "DONE",
    note,
  };
  const mergeHash = opts.mergedPr.mergeCommit?.oid ?? "";
  const mergeMessage = opts.mergedPr.title?.trim();
  return {
    ...opts.task,
    status: "DONE",
    result_summary: opts.task.result_summary ?? `Merged via PR #${opts.mergedPr.number}.`,
    commit: opts.task.commit?.hash?.trim()
      ? opts.task.commit
      : mergeHash
        ? {
            hash: mergeHash,
            message:
              (mergeMessage && mergeMessage.length > 0 ? mergeMessage : null) ??
              `Hosted PR #${opts.mergedPr.number} merged on GitHub main`,
          }
        : null,
    events: appendTaskEvent(opts.task, statusEvent),
    doc_version: normalizeTaskDocVersion(opts.task.doc_version),
    doc_updated_at: at,
    doc_updated_by: "INTEGRATOR",
  };
}

async function readPrMetaIfPresent(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<{ meta: TaskPrMeta; metaPath: string } | null> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  try {
    const raw = await readFile(metaPath, "utf8");
    return { meta: parsePrMeta(raw, opts.taskId), metaPath };
  } catch {
    return null;
  }
}

function needsHostedMergeSync(opts: {
  task: TaskData;
  meta: TaskPrMeta;
  mergedPr: HostedMergedPr;
  branch: string;
}): boolean {
  const currentStatus = String(opts.task.status || "TODO").toUpperCase();
  const expectedCommit = opts.mergedPr.mergeCommit?.oid ?? "";
  const expectedBase = opts.mergedPr.baseRefName ?? opts.meta.base ?? "";
  const expectedHeadSha = opts.mergedPr.headRefOid ?? opts.meta.head_sha ?? "";
  if (currentStatus !== "DONE") return true;
  if ((opts.task.commit?.hash ?? "") !== expectedCommit) return true;
  if (opts.meta.status !== "MERGED") return true;
  if ((opts.meta.merge_commit ?? "") !== expectedCommit) return true;
  if ((opts.meta.branch ?? "") !== opts.branch) return true;
  if ((opts.meta.base ?? "") !== expectedBase) return true;
  if (opts.meta.head_sha?.trim() !== expectedHeadSha) return true;
  return false;
}

export async function syncHostedMergedTask(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
  target: HostedMergeTarget;
  missingTask?: "noop" | "error";
  missingPrMeta?: "noop" | "error";
}): Promise<HostedMergeSyncResult> {
  if (opts.ctx.backendId !== "local" || opts.ctx.config.workflow_mode !== "branch_pr") {
    return { tasks: opts.tasks, synced: 0 };
  }

  const task = opts.tasks.find((entry) => entry.id === opts.target.taskId);
  if (!task) {
    if (opts.missingTask === "error") {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Hosted task closure could not find task artifact: ${opts.target.taskId}`,
      });
    }
    return { tasks: opts.tasks, synced: 0 };
  }

  const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: opts.target.taskId });
  if (!prMetaRecord) {
    if (opts.missingPrMeta === "error") {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `Hosted task closure could not find pr/meta.json for ${opts.target.taskId}`,
      });
    }
    return { tasks: opts.tasks, synced: 0 };
  }

  if (
    !needsHostedMergeSync({
      task,
      meta: prMetaRecord.meta,
      mergedPr: opts.target.mergedPr,
      branch: opts.target.branch,
    })
  ) {
    return { tasks: opts.tasks, synced: 0 };
  }

  const nextMeta = buildSyncedPrMeta({
    meta: prMetaRecord.meta,
    mergedPr: opts.target.mergedPr,
    branch: opts.target.branch,
  });
  await writeJsonStableIfChanged(prMetaRecord.metaPath, nextMeta);

  return {
    tasks: opts.tasks.map((entry) =>
      entry.id === opts.target.taskId
        ? buildSyncedTask({ task: entry, mergedPr: opts.target.mergedPr })
        : entry,
    ),
    synced: 1,
  };
}

export async function syncHostedMergedTasks(opts: {
  ctx: CommandContext;
  tasks: TaskData[];
}): Promise<HostedMergeSyncResult> {
  if (opts.ctx.backendId !== "local" || opts.ctx.config.workflow_mode !== "branch_pr") {
    return { tasks: opts.tasks, synced: 0 };
  }

  const nextTasks: TaskData[] = [];
  let synced = 0;

  for (const task of opts.tasks) {
    const prMetaRecord = await readPrMetaIfPresent({ ctx: opts.ctx, taskId: task.id });
    if (!prMetaRecord) {
      nextTasks.push(task);
      continue;
    }

    const branch = prMetaRecord.meta.branch?.trim() ?? "";
    if (!branch) {
      nextTasks.push(task);
      continue;
    }

    const mergedPr = await resolveHostedMergedPr({
      cwd: opts.ctx.resolvedProject.gitRoot,
      branch,
    });
    if (!mergedPr?.mergeCommit?.oid) {
      nextTasks.push(task);
      continue;
    }

    const syncedTask = await syncHostedMergedTask({
      ctx: opts.ctx,
      tasks: [task],
      target: { taskId: task.id, branch, mergedPr },
      missingTask: "noop",
      missingPrMeta: "noop",
    });
    nextTasks.push(syncedTask.tasks[0] ?? task);
    synced += syncedTask.synced;
  }

  return { tasks: nextTasks, synced };
}
