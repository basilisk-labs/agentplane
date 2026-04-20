import { execFileAsync } from "../../shared/git.js";
import { withGhTransportRetry } from "../../shared/gh-transport.js";
import { parseTaskIdFromBranch } from "../../shared/git-worktree.js";
import { ghEnv } from "../../pr/internal/gh-api.js";
import type { HostedMergedPr, HostedMergeTarget } from "./model.js";

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

export async function resolveHostedMergedPr(opts: {
  cwd: string;
  branch: string;
}): Promise<HostedMergedPr | null> {
  return await withGhTransportRetry(
    async () => {
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
          env: ghEnv(),
          maxBuffer: 10 * 1024 * 1024,
        },
      );
      const parsed = JSON.parse(stdout) as unknown;
      return Array.isArray(parsed) ? pickHostedMergedPr(parsed) : null;
    },
    {
      label: `looking up merged PR metadata for ${opts.branch}`,
    },
  );
}
