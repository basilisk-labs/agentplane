import { readFile } from "node:fs/promises";
import path from "node:path";

import { normalizeTaskDocVersion, type TaskPrMeta } from "@agentplaneorg/core";

import type { TaskData } from "../../backends/task-backend.js";
import { writeJsonStableIfChanged } from "../../shared/write-if-changed.js";
import { execFileAsync } from "../shared/git.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import type { CommandContext } from "../shared/task-backend.js";
import { appendTaskEvent } from "./shared.js";

type HostedMergedPr = {
  number: number;
  title?: string | null;
  url?: string | null;
  mergedAt?: string | null;
  baseRefName?: string | null;
  headRefName?: string | null;
  headRefOid?: string | null;
  mergeCommit?: { oid?: string | null } | null;
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
    "local task projection reconciled from PR artifacts.";
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
    commit:
      opts.task.commit ??
      (mergeHash
        ? {
            hash: mergeHash,
            message:
              (mergeMessage && mergeMessage.length > 0 ? mergeMessage : null) ??
              `Hosted PR #${opts.mergedPr.number} merged on GitHub main`,
          }
        : null),
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
    const currentStatus = String(task.status || "TODO").toUpperCase();
    const needsSync = currentStatus !== "DONE" || !task.commit?.hash;
    if (!needsSync) {
      nextTasks.push(task);
      continue;
    }

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

    const nextMeta = buildSyncedPrMeta({
      meta: prMetaRecord.meta,
      mergedPr,
      branch,
    });
    await writeJsonStableIfChanged(prMetaRecord.metaPath, nextMeta);
    nextTasks.push(buildSyncedTask({ task, mergedPr }));
    synced += 1;
  }

  return { tasks: nextTasks, synced };
}
