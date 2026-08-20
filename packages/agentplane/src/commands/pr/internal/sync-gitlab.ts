import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import type {
  ChangeRequestLookupResult,
  ChangeRequestMergeability,
  ChangeRequestMutationResult,
  ObservedChangeRequest,
} from "./change-request-model.js";
import type { GitHostIdentity } from "./git-host-identity.js";
import { normalizeGlabTransportError, runGlabApiJson } from "./glab-api.js";

type GitLabProjectRecord = { id?: number | null; path_with_namespace?: string | null };

type GitLabMergeRequestRecord = {
  iid?: number | null;
  web_url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  squash_commit_sha?: string | null;
  source_branch?: string | null;
  target_branch?: string | null;
  source_project_id?: number | null;
  target_project_id?: number | null;
  sha?: string | null;
  has_conflicts?: boolean | null;
  detailed_merge_status?: string | null;
  diff_refs?: {
    base_sha?: string | null;
    head_sha?: string | null;
  } | null;
};

const GITLAB_PENDING_MERGE_STATES = new Set([
  "approvals_syncing",
  "checking",
  "preparing",
  "unchecked",
]);

const GITLAB_NON_CONFLICT_STATES = new Set([
  "blocked_status",
  "ci_must_pass",
  "ci_still_running",
  "discussions_not_resolved",
  "draft_status",
  "mergeable",
  "need_rebase",
  "not_approved",
  "requested_changes",
  "security_policy_violations",
]);

function projectEndpoint(project: string): string {
  return `projects/${encodeURIComponent(project)}`;
}

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

function normalizeGitLabMergeability(record: GitLabMergeRequestRecord): ChangeRequestMergeability {
  const providerState = trimmed(record.detailed_merge_status)?.toLowerCase() ?? null;
  if (record.has_conflicts === true || providerState === "conflict") {
    return { state: "conflicting", mergeable: false, providerState };
  }
  if (providerState && GITLAB_PENDING_MERGE_STATES.has(providerState)) {
    return { state: "pending", mergeable: null, providerState };
  }
  if (
    record.has_conflicts === false &&
    providerState &&
    GITLAB_NON_CONFLICT_STATES.has(providerState)
  ) {
    return { state: "not_conflicting", mergeable: true, providerState };
  }
  return {
    state: "unknown",
    mergeable: record.has_conflicts === false ? true : null,
    providerState,
  };
}

function normalizeObservedGitLabMergeRequest(
  identity: GitHostIdentity,
  record: GitLabMergeRequestRecord,
): ObservedChangeRequest | null {
  const number = Number(record.iid);
  if (!Number.isInteger(number) || number <= 0) return null;
  const state = record.state?.trim().toLowerCase() ?? "";
  const status =
    state === "opened"
      ? "OPEN"
      : state === "merged"
        ? "MERGED"
        : state === "closed"
          ? "CLOSED"
          : null;
  if (!status) return null;
  return {
    provider: "gitlab",
    identity,
    prNumber: number,
    prUrl: trimmed(record.web_url),
    status,
    mergedAt: trimmed(record.merged_at),
    mergeCommit: firstTrimmed(record.merge_commit_sha, record.squash_commit_sha),
    base: trimmed(record.target_branch),
    headSha: firstTrimmed(record.diff_refs?.head_sha, record.sha),
    baseSha: trimmed(record.diff_refs?.base_sha),
    headRef: trimmed(record.source_branch),
    mergeability: normalizeGitLabMergeability(record),
  };
}

function unavailable(error: unknown): ChangeRequestLookupResult {
  if ((error as { code?: string } | null)?.code === "ENOENT") {
    return { state: "unavailable", reason: "glab CLI is unavailable" };
  }
  const reason = normalizeGlabTransportError(error);
  return {
    state: "unavailable",
    reason: reason || "GitLab lookup failed without diagnostic output",
  };
}

async function refreshByNumber(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  prNumber: number;
  branch?: string | null;
  baseBranch?: string | null;
  sourceProjectId?: number | null;
}): Promise<ChangeRequestLookupResult> {
  try {
    const record = await runGlabApiJson<GitLabMergeRequestRecord>({
      cwd: opts.gitRoot,
      hostname: opts.identity.hostname,
      endpoint: `${projectEndpoint(opts.identity.targetProject)}/merge_requests/${opts.prNumber}`,
    });
    const observed = normalizeObservedGitLabMergeRequest(opts.identity, record);
    if (!observed) {
      return { state: "unavailable", reason: "GitLab MR lookup returned an invalid record" };
    }
    const branch = opts.branch?.trim() ?? "";
    const baseBranch = opts.baseBranch?.trim() ?? "";
    if (branch && !observed.headRef) {
      return { state: "unavailable", reason: "GitLab MR lookup omitted source_branch" };
    }
    if (baseBranch && !observed.base) {
      return { state: "unavailable", reason: "GitLab MR lookup omitted target_branch" };
    }
    if (branch && observed.headRef !== branch) return { state: "not_found" };
    if (baseBranch && observed.base !== baseBranch) return { state: "not_found" };
    if (opts.sourceProjectId) {
      if (!Number.isInteger(record.source_project_id)) {
        return { state: "unavailable", reason: "GitLab MR lookup omitted source_project_id" };
      }
      if (record.source_project_id !== opts.sourceProjectId) return { state: "not_found" };
    }
    return { state: "found", pr: observed };
  } catch (error) {
    return unavailable(error);
  }
}

async function resolveProjectId(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  project: string;
}): Promise<number> {
  const record = await runGlabApiJson<GitLabProjectRecord>({
    cwd: opts.gitRoot,
    hostname: opts.identity.hostname,
    endpoint: projectEndpoint(opts.project),
  });
  const id = Number(record.id);
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`GitLab project lookup returned no numeric id for ${opts.project}`);
  }
  return id;
}

export async function observeExistingGitLabMrByNumber(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  prNumber: number;
  branch?: string | null;
  baseBranch?: string | null;
}): Promise<ChangeRequestLookupResult> {
  if (!Number.isInteger(opts.prNumber) || opts.prNumber <= 0) {
    return { state: "unavailable", reason: "GitLab MR IID is invalid" };
  }
  try {
    const sourceProjectId = await resolveProjectId({
      gitRoot: opts.gitRoot,
      identity: opts.identity,
      project: opts.identity.sourceProject,
    });
    return refreshByNumber({ ...opts, sourceProjectId });
  } catch (error) {
    return unavailable(error);
  }
}

export async function observeExistingGitLabMrByBranch(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  branch: string;
  baseBranch?: string | null;
  requireUnique?: boolean;
}): Promise<ChangeRequestLookupResult> {
  try {
    const sourceProjectId = await resolveProjectId({
      gitRoot: opts.gitRoot,
      identity: opts.identity,
      project: opts.identity.sourceProject,
    });
    const query = new URLSearchParams({
      scope: "all",
      state: "all",
      source_branch: opts.branch,
      per_page: "100",
    });
    const baseBranch = opts.baseBranch?.trim() ?? "";
    if (baseBranch) query.set("target_branch", baseBranch);
    const records = await runGlabApiJson<GitLabMergeRequestRecord[]>({
      cwd: opts.gitRoot,
      hostname: opts.identity.hostname,
      endpoint: `${projectEndpoint(opts.identity.targetProject)}/merge_requests?${query.toString()}`,
    });
    if (!Array.isArray(records)) {
      return { state: "unavailable", reason: "GitLab branch lookup returned a non-array payload" };
    }
    const matches = records.filter(
      (record) =>
        record.source_branch?.trim() === opts.branch &&
        (!baseBranch || record.target_branch?.trim() === baseBranch) &&
        record.source_project_id === sourceProjectId,
    );
    if (matches.length === 0) return { state: "not_found" };
    if (opts.requireUnique !== false && matches.length > 1) {
      return {
        state: "unavailable",
        reason: `GitLab branch lookup returned multiple MRs for the exact source project, branch, and target: ${matches.length}`,
      };
    }
    const iid = Number(matches[0]?.iid);
    if (!Number.isInteger(iid) || iid <= 0) {
      return { state: "unavailable", reason: "GitLab branch lookup returned an invalid MR record" };
    }
    return refreshByNumber({ ...opts, prNumber: iid, sourceProjectId });
  } catch (error) {
    return unavailable(error);
  }
}

function classifyMutationFailure(
  error: unknown,
): Pick<ChangeRequestMutationResult, "stagedReason" | "artifactState"> {
  const message = normalizeGlabTransportError(error);
  if ((error as { code?: string } | null)?.code === "ENOENT") {
    return { stagedReason: "glab CLI is unavailable", artifactState: "remote_failed" };
  }
  if (/\b401\b|\b403\b|authentication|not logged|permission denied/i.test(message)) {
    return {
      stagedReason: "GitLab auth or permissions unavailable",
      artifactState: "remote_failed",
    };
  }
  if (/\b400\b|source branch|no commits|not found/i.test(message)) {
    return {
      stagedReason: "GitLab source branch is not published or cannot target the selected project",
      artifactState: "remote_staged",
    };
  }
  return {
    stagedReason: message ? `GitLab MR mutation failed: ${message}` : "GitLab MR mutation failed",
    artifactState: "remote_failed",
  };
}

async function withPayload<T>(
  label: string,
  payload: Record<string, unknown>,
  run: (payloadPath: string) => Promise<T>,
): Promise<T> {
  const directory = await mkdtemp(path.join(os.tmpdir(), `agentplane-${label}-`));
  const payloadPath = path.join(directory, "payload.json");
  try {
    await writeFile(payloadPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    return await run(payloadPath);
  } finally {
    await rm(directory, { recursive: true, force: true }).catch(() => null);
  }
}

export async function tryCreateGitLabMr(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  branch: string;
  baseBranch: string | null;
  title: string;
  body: string;
}): Promise<ChangeRequestMutationResult> {
  const existing = await observeExistingGitLabMrByBranch({
    gitRoot: opts.gitRoot,
    identity: opts.identity,
    branch: opts.branch,
    baseBranch: opts.baseBranch,
  });
  if (existing.state === "found") {
    return { observed: existing.pr, stagedReason: null, artifactState: null };
  }
  if (existing.state === "unavailable") {
    return { observed: null, stagedReason: existing.reason, artifactState: "remote_failed" };
  }
  const baseBranch = opts.baseBranch?.trim() ?? "";
  if (!baseBranch) {
    return {
      observed: null,
      stagedReason: "base branch unresolved",
      artifactState: "remote_staged",
    };
  }
  try {
    const targetProjectId = await resolveProjectId({
      gitRoot: opts.gitRoot,
      identity: opts.identity,
      project: opts.identity.targetProject,
    });
    const record = await withPayload(
      "gitlab-mr",
      {
        source_branch: opts.branch,
        target_branch: baseBranch,
        title: opts.title,
        description: opts.body,
        ...(opts.identity.sourceProject === opts.identity.targetProject
          ? {}
          : { target_project_id: targetProjectId }),
      },
      (payloadPath) =>
        runGlabApiJson<GitLabMergeRequestRecord>({
          cwd: opts.gitRoot,
          hostname: opts.identity.hostname,
          endpoint: `${projectEndpoint(opts.identity.sourceProject)}/merge_requests`,
          method: "POST",
          inputPath: payloadPath,
        }),
    );
    const observed = normalizeObservedGitLabMergeRequest(opts.identity, record);
    if (observed) return { observed, stagedReason: null, artifactState: null };
    return {
      observed: null,
      stagedReason: "GitLab MR creation returned an invalid record",
      artifactState: "remote_failed",
    };
  } catch (error) {
    const recovered = await observeExistingGitLabMrByBranch({
      gitRoot: opts.gitRoot,
      identity: opts.identity,
      branch: opts.branch,
      baseBranch,
    });
    if (recovered.state === "found") {
      return { observed: recovered.pr, stagedReason: null, artifactState: null };
    }
    return { observed: null, ...classifyMutationFailure(error) };
  }
}

export async function tryUpdateGitLabMr(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  observed: ObservedChangeRequest;
  title: string;
  body: string;
}): Promise<ChangeRequestMutationResult> {
  if (opts.observed.status !== "OPEN") {
    return { observed: opts.observed, stagedReason: null, artifactState: null };
  }
  try {
    const record = await withPayload(
      "gitlab-mr-update",
      { title: opts.title, description: opts.body },
      (payloadPath) =>
        runGlabApiJson<GitLabMergeRequestRecord>({
          cwd: opts.gitRoot,
          hostname: opts.identity.hostname,
          endpoint: `${projectEndpoint(opts.identity.targetProject)}/merge_requests/${opts.observed.prNumber}`,
          method: "PUT",
          inputPath: payloadPath,
        }),
    );
    const observed = normalizeObservedGitLabMergeRequest(opts.identity, record);
    return observed
      ? { observed, stagedReason: null, artifactState: null }
      : {
          observed: null,
          stagedReason: "GitLab MR update returned an invalid record",
          artifactState: "remote_failed",
        };
  } catch (error) {
    const recovered = await observeExistingGitLabMrByNumber({
      gitRoot: opts.gitRoot,
      identity: opts.identity,
      prNumber: opts.observed.prNumber,
      branch: opts.observed.headRef,
      baseBranch: opts.observed.base,
    });
    if (recovered.state === "found") {
      return { observed: recovered.pr, ...classifyMutationFailure(error) };
    }
    return { observed: null, ...classifyMutationFailure(error) };
  }
}
