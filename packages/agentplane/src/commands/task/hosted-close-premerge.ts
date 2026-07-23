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

export type PreMergeClosureFreshness =
  | { fresh: true; basisCommit: string }
  | { fresh: false; reason: string };

async function gitCommitIsAncestor(opts: {
  gitRoot: string;
  ancestor: string;
  descendant: string;
}): Promise<boolean> {
  if (opts.ancestor === opts.descendant) return true;
  try {
    await execFileAsync("git", ["merge-base", "--is-ancestor", opts.ancestor, opts.descendant], {
      cwd: opts.gitRoot,
      env: process.env,
    });
    return true;
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 1 || isMissingGitCommitNameError(err)) return false;
    throw err;
  }
}

function markerPredates(value: string | null | undefined, markerTime: number): boolean {
  const comparedTime = Date.parse(value ?? "");
  return Number.isFinite(comparedTime) && Number.isFinite(markerTime) && markerTime < comparedTime;
}

export async function assessPreMergeClosureFreshness(opts: {
  gitRoot: string;
  task: TaskData;
  meta: PrMeta;
  branch: string;
  prNumber: number;
  branchHeadSha: string;
}): Promise<PreMergeClosureFreshness> {
  const marker = readPreMergeClosureMarker(opts.meta);
  if (!marker) return { fresh: false, reason: "pre-merge closure marker is missing" };
  if (
    !taskIsClosedByPreMergeClosure({
      task: opts.task,
      meta: opts.meta,
      branch: opts.branch,
      prNumber: opts.prNumber,
    })
  ) {
    return { fresh: false, reason: "pre-merge closure identity or DONE task state is invalid" };
  }
  if (opts.task.verification?.state !== "ok") {
    return { fresh: false, reason: "task verification is not ok" };
  }
  const review = opts.task.quality_review;
  const reviewedSha = review?.evaluated_sha?.trim() ?? "";
  if (review?.state !== "pass" || !reviewedSha) {
    return { fresh: false, reason: "passing head-scoped quality review is unavailable" };
  }

  const markerTime = Date.parse(marker.recordedAt ?? "");
  if (markerPredates(opts.task.verification.updated_at, markerTime)) {
    return { fresh: false, reason: "pre-merge closure predates the latest verification" };
  }
  if (markerPredates(review.updated_at, markerTime)) {
    return { fresh: false, reason: "pre-merge closure predates the latest quality review" };
  }

  const taskCommit = opts.task.commit?.hash?.trim() ?? "";
  if (
    !taskCommit ||
    !(await gitCommitIsAncestor({
      gitRoot: opts.gitRoot,
      ancestor: taskCommit,
      descendant: marker.basisCommit,
    }))
  ) {
    return { fresh: false, reason: "task commit is not covered by the closure basis commit" };
  }
  if (
    !(await gitCommitIsAncestor({
      gitRoot: opts.gitRoot,
      ancestor: reviewedSha,
      descendant: marker.basisCommit,
    }))
  ) {
    return { fresh: false, reason: "quality-reviewed commit is not covered by the closure basis" };
  }
  if (
    !(await gitCommitIsAncestor({
      gitRoot: opts.gitRoot,
      ancestor: marker.basisCommit,
      descendant: opts.branchHeadSha,
    }))
  ) {
    return { fresh: false, reason: "closure basis is not an ancestor of the current branch head" };
  }
  return { fresh: true, basisCommit: marker.basisCommit };
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
