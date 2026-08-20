import { parseTaskIdFromBranch } from "@agentplaneorg/core/git";

import { runGlabApiJson } from "../../pr/internal/glab-api.js";
import type { GitHostIdentity } from "../../pr/internal/git-host-identity.js";
import type { HostedMergedPr, HostedMergeTarget } from "./model.js";

type GitLabMergedMr = {
  iid?: number | null;
  title?: string | null;
  web_url?: string | null;
  url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  target_branch?: string | null;
  source_branch?: string | null;
  source_project_id?: number | null;
  sha?: string | null;
  merge_commit_sha?: string | null;
  squash_commit_sha?: string | null;
};

function trimmed(value: string | null | undefined): string | null {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

function firstTrimmed(...values: (string | null | undefined)[]): string | null {
  for (const value of values) {
    const normalized = trimmed(value);
    if (normalized) return normalized;
  }
  return null;
}

function normalizeGitLabMergedMr(value: unknown): HostedMergedPr | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as GitLabMergedMr;
  const number = Number(record.iid);
  const mergeCommit = firstTrimmed(record.merge_commit_sha, record.squash_commit_sha);
  const headRefName = trimmed(record.source_branch);
  if (
    !Number.isInteger(number) ||
    number <= 0 ||
    record.state?.trim().toLowerCase() !== "merged" ||
    !mergeCommit ||
    !headRefName
  ) {
    return null;
  }
  return {
    provider: "gitlab",
    number,
    title: trimmed(record.title),
    url: firstTrimmed(record.web_url, record.url),
    mergedAt: trimmed(record.merged_at),
    baseRefName: trimmed(record.target_branch),
    headRefName,
    headRefOid: trimmed(record.sha),
    mergeCommit: { oid: mergeCommit },
  };
}

export function resolveGitLabMergeTargetFromEvent(opts: {
  event: unknown;
  branchPrefix: string;
}): HostedMergeTarget | null {
  if (!opts.event || typeof opts.event !== "object" || Array.isArray(opts.event)) return null;
  const event = opts.event as Record<string, unknown>;
  if (event.object_kind !== "merge_request") return null;
  const attributes = event.object_attributes;
  const mergedMr = normalizeGitLabMergedMr(attributes);
  if (!mergedMr?.headRefName || !mergedMr.mergeCommit?.oid) return null;
  const taskId = parseTaskIdFromBranch(opts.branchPrefix, mergedMr.headRefName);
  return taskId ? { taskId, branch: mergedMr.headRefName, mergedPr: mergedMr } : null;
}

export async function resolveGitLabMergedMr(opts: {
  cwd: string;
  branch: string;
  identity: GitHostIdentity;
}): Promise<HostedMergedPr | null> {
  const sourceProject = await runGlabApiJson<{ id?: number | null }>({
    cwd: opts.cwd,
    hostname: opts.identity.hostname,
    endpoint: `projects/${encodeURIComponent(opts.identity.sourceProject)}`,
  });
  const sourceProjectId = Number(sourceProject.id);
  if (!Number.isInteger(sourceProjectId) || sourceProjectId <= 0) {
    throw new Error(
      `GitLab project lookup returned no numeric id for ${opts.identity.sourceProject}`,
    );
  }
  const query = new URLSearchParams({
    scope: "all",
    state: "merged",
    source_branch: opts.branch,
    per_page: "100",
  });
  const records = await runGlabApiJson<GitLabMergedMr[]>({
    cwd: opts.cwd,
    hostname: opts.identity.hostname,
    endpoint: `projects/${encodeURIComponent(opts.identity.targetProject)}/merge_requests?${query.toString()}`,
  });
  if (!Array.isArray(records)) return null;
  return (
    records
      .filter((record) => record.source_project_id === sourceProjectId)
      .map((record) => normalizeGitLabMergedMr(record))
      .filter((record): record is HostedMergedPr => record !== null)
      .toSorted((left, right) => (right.mergedAt ?? "").localeCompare(left.mergedAt ?? ""))[0] ??
    null
  );
}
