import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
import { execFileAsync } from "@agentplaneorg/core/process";

import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { readPreMergeClosureMarker, type PrMeta } from "../shared/pr-meta.js";

export function taskIsClosedForMerge(task: TaskData, mergeCommit: string): boolean {
  return normalizeTaskStatus(task.status) === "DONE" && task.commit?.hash === mergeCommit;
}

export function taskIsClosedByPreMergeClosure(opts: {
  task: TaskData;
  meta: PrMeta;
  branch: string;
  prNumber: number;
}): boolean {
  if (normalizeTaskStatus(opts.task.status) !== "DONE") return false;
  const taskCommitHash = opts.task.commit?.hash?.trim() ?? "";
  if (taskCommitHash.length === 0) return false;
  const marker = readPreMergeClosureMarker(opts.meta);
  if (!marker) return false;
  if (marker.branch !== opts.branch) return false;
  if ((opts.meta.branch?.trim() ?? "") !== opts.branch) return false;
  if (marker.prNumber != null && marker.prNumber !== opts.prNumber) return false;
  return opts.meta.pr_number == null || opts.meta.pr_number === opts.prNumber;
}

export function preMergeClosureAllowsMissingBasisCommit(opts: {
  task: TaskData;
  meta: PrMeta;
  prNumber: number;
}): boolean {
  if (opts.meta.pr_number === opts.prNumber) return true;
  if (opts.meta.pr_number != null) return false;
  const marker = readPreMergeClosureMarker(opts.meta);
  if (!marker) return false;
  if (marker.prNumber === opts.prNumber) return true;
  if (marker.prNumber != null) return false;
  return (
    normalizeTaskStatus(opts.task.status) === "DONE" &&
    (opts.task.commit?.hash?.trim() ?? "") !== "" &&
    legacyPreMergeClosureWasRecordedAfterVerification(opts.meta)
  );
}

export function legacyPreMergeClosureWasRecordedAfterVerification(meta: PrMeta): boolean {
  const marker = readPreMergeClosureMarker(meta);
  const markerTime = Date.parse(marker?.recordedAt ?? "");
  const verifiedTime = Date.parse(meta.last_verified_at ?? "");
  return Number.isFinite(markerTime) && Number.isFinite(verifiedTime) && markerTime >= verifiedTime;
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

function isMissingGitCommitNameError(err: unknown): boolean {
  const maybeError = err as { stderr?: unknown; message?: unknown } | null;
  const text =
    typeof maybeError?.stderr === "string"
      ? maybeError.stderr
      : typeof maybeError?.message === "string"
        ? maybeError.message
        : "";
  return (
    text.includes("Not a valid commit name") ||
    text.includes("unknown revision or path not in the working tree")
  );
}

export async function preMergeClosureBasisIsAncestor(opts: {
  gitRoot: string;
  meta: PrMeta;
  mergedHeadSha: string | null | undefined;
  allowMissingBasisCommit?: boolean;
}): Promise<boolean> {
  const marker = readPreMergeClosureMarker(opts.meta);
  const head = opts.mergedHeadSha?.trim() ?? "";
  if (!marker || head.length === 0) return false;
  if (marker.basisCommit === head) return true;
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", marker.basisCommit, head], {
      cwd: opts.gitRoot,
      env: process.env,
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1) return false;
    if (isMissingGitCommitNameError(err)) return opts.allowMissingBasisCommit === true;
    throw err;
  }
}

export async function taskIsAlreadyClosedBeforeMerge(opts: {
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

export function assertNoConflictingDoneTask(opts: { task: TaskData; mergeCommit: string }): void {
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
