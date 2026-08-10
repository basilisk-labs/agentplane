#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const valueFor = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : null;
};
const root = path.resolve(valueFor("--root") ?? process.cwd());
const output = valueFor("--output");
if (!output) throw new Error("--output is required");

const git = (gitArgs, cwd = root, allowFailure = false) => {
  try {
    return execFileSync("git", gitArgs, {
      cwd,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (error) {
    if (allowFailure) return null;
    throw error;
  }
};
const digest = (value) => createHash("sha256").update(value).digest("hex");
const taskIdFromBranch = (branch) => branch?.match(/^task\/(\d{12}-[A-Z0-9]{6})\//u)?.[1] ?? null;
const statusFromTask = (worktree, taskId) => {
  if (!taskId) return null;
  try {
    const text = readFileSync(path.join(worktree, ".agentplane", "tasks", taskId, "README.md"), "utf8");
    return text.match(/^status:\s*"?([A-Z_]+)"?\s*$/mu)?.[1] ?? null;
  } catch {
    return null;
  }
};
const statusFromBranch = (branch, taskId) => {
  if (!branch || !taskId) return null;
  const taskArtifact = `.agentplane/tasks/${taskId}/README.md`;
  const text = git(["show", `${branch}:${taskArtifact}`], root, true);
  return text?.match(/^status:\s*"?([A-Z_]+)"?\s*$/mu)?.[1] ?? null;
};

const parseWorktrees = (raw) => raw.trim().split(/\n\n+/u).filter(Boolean).map((block) => {
  const item = { path: null, head: null, branch: null, detached: false, locked: null, prunable: null };
  for (const line of block.split("\n")) {
    const [key, ...rest] = line.split(" ");
    const value = rest.join(" ");
    if (key === "worktree") item.path = value;
    if (key === "HEAD") item.head = value;
    if (key === "branch") item.branch = value.replace(/^refs\/heads\//u, "");
    if (key === "detached") item.detached = true;
    if (key === "locked") item.locked = value || "locked";
    if (key === "prunable") item.prunable = value || "prunable";
  }
  return item;
});

const branchRows = git([
  "for-each-ref",
  "--format=%(refname:short)%00%(objectname)%00%(upstream:short)%00%(worktreepath)",
  "refs/heads",
]).trim().split("\n").filter(Boolean).map((line) => {
  const [branch, head, upstream, worktree] = line.split("\0");
  return { branch, head, upstream: upstream || null, worktree: worktree || null };
});

let pullRequests = [];
try {
  pullRequests = JSON.parse(execFileSync("gh", [
    "pr", "list", "--repo", "basilisk-labs/agentplane", "--state", "all", "--limit", "1000",
    "--json", "number,state,isDraft,mergedAt,url,headRefName,headRefOid",
  ], { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }));
} catch {
  pullRequests = [];
}
const prByBranch = new Map(pullRequests.map((pr) => [pr.headRefName, pr]));
const protectedRoots = [
  path.join(root, ".agentplane", "tmp", "rf05b-integration-base"),
  path.join(root, ".agentplane", "worktrees", "base-main-for-XS41ZV"),
];
const isProtected = (worktree, branch) =>
  branch?.startsWith("codex/recovery-mt4fk2-") ||
  protectedRoots.some((protectedRoot) => worktree === protectedRoot || worktree.startsWith(`${protectedRoot}${path.sep}`));
const activeStatuses = new Set(["TODO", "DOING", "BLOCKED"]);
const isMerged = (head) => Boolean(head && git(["merge-base", "--is-ancestor", head, "origin/main"], root, true) !== null);

const worktrees = parseWorktrees(git(["worktree", "list", "--porcelain"])).map((item) => {
  const status = item.path && !item.prunable ? git(["status", "--porcelain=v1", "--untracked-files=all"], item.path, true) : null;
  const diff = item.path && !item.prunable ? git(["diff", "--binary"], item.path, true) : null;
  const staged = item.path && !item.prunable ? git(["diff", "--cached", "--binary"], item.path, true) : null;
  const statusLines = status === null ? null : status.split("\n").filter(Boolean);
  const taskId = taskIdFromBranch(item.branch);
  const taskStatus = item.path ? statusFromTask(item.path, taskId) : null;
  const pr = item.branch ? prByBranch.get(item.branch) ?? null : null;
  const mergedIntoMain = isMerged(item.head);
  const providerMergedIdentity = Boolean(
    pr?.state === "MERGED" && pr.headRefOid === item.head,
  );
  const mergedProof = mergedIntoMain || providerMergedIdentity;
  const protectedRecovery = Boolean(item.path && isProtected(item.path, item.branch));
  const active = Boolean(taskStatus && activeStatuses.has(taskStatus));
  const dirty = statusLines === null ? null : statusLines.length > 0;
  const reasons = [];
  if (item.path === root) reasons.push("primary_checkout");
  if (item.prunable) reasons.push("stale_registration");
  if (protectedRecovery) reasons.push("protected_recovery");
  if (active) reasons.push("active_task");
  if (dirty) reasons.push("dirty");
  if (!mergedProof) reasons.push("unmerged");
  if (providerMergedIdentity) reasons.push("provider_merged_identity");
  if (pr?.state === "MERGED" && pr.headRefOid !== item.head) reasons.push("post_merge_head_drift");
  if (pr?.state === "OPEN") reasons.push("open_pr");
  if (!taskStatus && taskId) reasons.push("task_truth_missing");
  const safeCleanupCandidate = Boolean(
    item.path !== root && !item.prunable && !protectedRecovery && !active && dirty === false &&
    mergedProof && taskId && pr?.state !== "OPEN" && taskStatus,
  );
  if (safeCleanupCandidate) reasons.push("safe_cleanup_candidate");
  if (reasons.length === 0) reasons.push("ambiguous");
  return {
    ...item,
    task_id: taskId,
    task_status: taskStatus,
    pr: pr ? { number: pr.number, state: pr.state, merged_at: pr.mergedAt, url: pr.url, head: pr.headRefOid } : null,
    merged_into_origin_main: mergedIntoMain,
    provider_merged_identity: providerMergedIdentity,
    merged_proof: mergedProof,
    protected_recovery: protectedRecovery,
    dirty,
    status_count: statusLines?.length ?? null,
    status_digest: status === null ? null : digest(status),
    diff_sha256: diff === null ? null : digest(diff),
    staged_sha256: staged === null ? null : digest(staged),
    reasons,
    safe_cleanup_candidate: safeCleanupCandidate,
  };
});

const worktreeByBranch = new Map(worktrees.filter((item) => item.branch).map((item) => [item.branch, item]));
const branches = branchRows.map((item) => {
  const pr = prByBranch.get(item.branch) ?? null;
  const taskId = taskIdFromBranch(item.branch);
  const mergedIntoMain = isMerged(item.head);
  const providerMergedIdentity = Boolean(
    pr?.state === "MERGED" && pr.headRefOid === item.head,
  );
  const mergedProof = mergedIntoMain || providerMergedIdentity;
  const worktree = worktreeByBranch.get(item.branch) ?? null;
  const taskStatus = worktree?.task_status ?? statusFromBranch(item.branch, taskId);
  const active = Boolean(taskStatus && activeStatuses.has(taskStatus));
  const protectedRecovery = item.branch.startsWith("codex/recovery-mt4fk2-") || Boolean(worktree?.protected_recovery);
  const safeDeleteCandidate = Boolean(
    item.branch !== "main" &&
    !item.worktree &&
    !protectedRecovery &&
    mergedProof &&
    taskId &&
    pr?.state === "MERGED" &&
    taskStatus === "DONE",
  );
  const reasons = [];
  if (item.branch === "main") reasons.push("primary_branch");
  if (item.worktree) reasons.push("registered_worktree");
  if (protectedRecovery) reasons.push("protected_recovery");
  if (active) reasons.push("active_task");
  if (!taskStatus && taskId) reasons.push("task_truth_missing");
  if (!mergedProof) reasons.push("unmerged");
  if (providerMergedIdentity) reasons.push("provider_merged_identity");
  if (pr?.state === "MERGED" && pr.headRefOid !== item.head) reasons.push("post_merge_head_drift");
  if (pr?.state === "OPEN") reasons.push("open_pr");
  if (!pr && taskId) reasons.push("pr_truth_missing");
  if (safeDeleteCandidate) reasons.push("safe_delete_candidate");
  if (reasons.length === 0) reasons.push("ambiguous");
  return {
    ...item,
    task_id: taskId,
    task_status: taskStatus,
    pr: pr ? { number: pr.number, state: pr.state, merged_at: pr.mergedAt, url: pr.url, head: pr.headRefOid } : null,
    merged_into_origin_main: mergedIntoMain,
    provider_merged_identity: providerMergedIdentity,
    merged_proof: mergedProof,
    protected_recovery: protectedRecovery,
    reasons,
    safe_delete_candidate: safeDeleteCandidate,
  };
});

const worktreesPerTask = worktrees.filter((item) => item.task_id).reduce((groups, item) => {
  const entries = groups[item.task_id] ?? [];
  entries.push(item);
  groups[item.task_id] = entries;
  return groups;
}, {});
const duplicateActiveTasks = Object.entries(worktreesPerTask)
  .filter(([, entries]) => entries.filter((entry) => activeStatuses.has(entry.task_status)).length > 1)
  .map(([taskId, entries]) => ({ task_id: taskId, paths: entries.map((entry) => entry.path) }));
const counts = {
  worktrees: worktrees.length,
  local_branches: branches.length,
  dirty_worktrees: worktrees.filter((item) => item.dirty).length,
  clean_worktrees: worktrees.filter((item) => item.dirty === false).length,
  stale_registrations: worktrees.filter((item) => item.prunable).length,
  protected_recovery_worktrees: worktrees.filter((item) => item.protected_recovery).length,
  active_task_worktrees: worktrees.filter((item) => activeStatuses.has(item.task_status)).length,
  safe_worktree_cleanup_candidates: worktrees.filter((item) => item.safe_cleanup_candidate).length,
  safe_local_branch_delete_candidates: branches.filter((item) => item.safe_delete_candidate).length,
  duplicate_active_tasks: duplicateActiveTasks.length,
};
const report = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  repository: root,
  base_ref: "origin/main",
  base_head: git(["rev-parse", "origin/main"]).trim(),
  counts,
  cleanup_cli_observation: {
    command: "agentplane cleanup merged --task-id <id> --root <base-checkout>",
    result: "no remaining proven candidates after four targeted provider_merge cleanups",
    execution:
      "repo-local CLI from the task worktree targeted the primary main checkout explicitly",
  },
  protected_roots: protectedRoots,
  duplicate_active_tasks: duplicateActiveTasks,
  worktrees,
  local_branches: branches,
};
writeFileSync(path.resolve(process.cwd(), output), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(counts));
