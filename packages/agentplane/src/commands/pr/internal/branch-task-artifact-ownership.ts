import { execFileAsync } from "@agentplaneorg/core/process";
import { gitDiffNameStatus, gitMergeBase, gitProofEnv } from "@agentplaneorg/core/git";

import { inheritedProviderUpdatePaths } from "../provider-update-verification-proof.js";
import type { CommandContext } from "../../shared/task-backend.js";

import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { gitBranchExists, gitBranchUpstream, gitRevParse } from "../../shared/git-ops.js";

function normalizedRoot(value: string | undefined): string {
  if (!value) return "";
  return value.replaceAll("\\", "/").replace(/^\.\//u, "").replace(/\/+$/u, "");
}

function taskIdFromArtifactPath(pathname: string, roots: readonly string[]): string | null {
  const normalized = pathname.replaceAll("\\", "/").replace(/^\.\//u, "");
  for (const root of roots) {
    const prefix = `${root}/`;
    if (!normalized.startsWith(prefix)) continue;
    const taskId = normalized.slice(prefix.length).split("/", 1)[0]?.trim() ?? "";
    return taskId || null;
  }
  return null;
}

function isVolatileTaskArtifactDeletion(
  entry: { statusCode: string; path: string },
  roots: readonly string[],
  authorizedCleanupRoots: readonly string[],
): boolean {
  if (entry.statusCode !== "D") return false;
  const normalized = entry.path.replaceAll("\\", "/").replace(/^\.\//u, "");
  const relative = roots.map((root) => `${root}/`).find((prefix) => normalized.startsWith(prefix));
  if (!relative) return false;
  const taskId = normalized.slice(relative.length).split("/", 1)[0]?.trim() ?? "";
  if (!taskId) return false;
  const taskRoot = `${relative}${taskId}`;
  const authorized = authorizedCleanupRoots.some(
    (root) =>
      root.startsWith(`${taskRoot}/`) && (normalized === root || normalized.startsWith(`${root}/`)),
  );
  if (!authorized) return false;
  const taskRelative = normalized.slice(relative.length).split("/").slice(1).join("/");
  if (/^pr\/(?:verify\.log|notes\.jsonl)$/u.test(taskRelative)) return false;
  return /\.(?:log|jsonl)$/u.test(taskRelative) || /^(?:runs|repro)(?:\/|$)/u.test(taskRelative);
}

export async function assertBranchTaskArtifactOwnership(opts: {
  gitRoot: string;
  baseBranch: string;
  branch: string;
  workflowDir: string;
  tasksPath: string;
  primaryTaskId: string;
  includedTaskIds?: readonly string[];
  providerUpdate?: { command: CommandContext; frozenBase: string };
  authorizedForeignArtifactCleanupRoots?: readonly string[];
}): Promise<void> {
  const roots = [...new Set([normalizedRoot(opts.workflowDir), normalizedRoot(opts.tasksPath)])]
    .filter(Boolean)
    .toSorted((left, right) => right.length - left.length);
  const upstream = await gitBranchUpstream(opts.gitRoot, opts.baseBranch);
  const comparisonBase = upstream ?? opts.baseBranch;
  // Synthetic and pre-initialized repositories may name a future base before
  // the ref exists. There is no committed base history to contaminate yet.
  const [baseExists, branchExists] = await Promise.all([
    gitRevParse(opts.gitRoot, ["--verify", `${comparisonBase}^{commit}`])
      .then(() => true)
      .catch(() => false),
    gitBranchExists(opts.gitRoot, opts.branch),
  ]);
  if (!baseExists || !branchExists) return;
  // Compare only changes introduced by the candidate branch. A two-dot diff
  // also reports paths added on an advanced base as deletions from an older
  // task branch, which can falsely attribute unrelated base task artifacts to
  // the candidate. The merge-base anchored diff is the branch-side delta.
  const evaluatedSha = opts.providerUpdate
    ? await gitRevParse(opts.gitRoot, ["--verify", `${opts.branch}^{commit}`])
    : opts.branch;
  const mergeBase = await gitMergeBase(opts.gitRoot, comparisonBase, evaluatedSha);
  const changedEntries = await gitDiffNameStatus(opts.gitRoot, mergeBase, evaluatedSha);
  const allowed = new Set([opts.primaryTaskId, ...(opts.includedTaskIds ?? [])]);
  const authorizedCleanupRoots = [
    ...new Set(
      (opts.authorizedForeignArtifactCleanupRoots ?? [])
        .map((root) => normalizedRoot(root))
        .filter(Boolean),
    ),
  ];
  const inherited = new Set<string>();
  if (opts.providerUpdate) {
    if (opts.providerUpdate.command.resolvedProject.gitRoot !== opts.gitRoot)
      throw new Error("Provider update ownership checkout changed");
    // Net B..H misses a canonical artifact added after B and subsequently deleted
    // or moved into an owned root. Keep every historical path until proof classifies it.
    const observedHistory = await execFileAsync(
      "git",
      [
        "log",
        "--format=",
        "--name-only",
        "-z",
        "--full-history",
        "--no-renames",
        `${mergeBase}..${evaluatedSha}`,
      ],
      {
        cwd: opts.gitRoot,
        env: gitProofEnv(),
        maxBuffer: 16 * 1024 * 1024,
      },
    );
    const history = observedHistory.stdout.split("\0").filter(Boolean);
    const known = new Set(changedEntries.map((entry) => entry.path));
    for (const file of history)
      if (!known.has(file)) {
        changedEntries.push({ statusCode: "M", path: file });
        known.add(file);
      }
    // Native import authority is relevant only to foreign Task artifacts. Keep
    // the history scan above: a deleted or renamed import can be absent from the net diff.
    if (
      !changedEntries.some((entry) => {
        const taskId = taskIdFromArtifactPath(entry.path, roots);
        return taskId !== null && !allowed.has(taskId);
      })
    )
      return;
    for (const file of await inheritedProviderUpdatePaths({
      command: opts.providerUpdate.command,
      task_id: opts.primaryTaskId,
      frozen_base: opts.providerUpdate.frozenBase,
      evaluated_sha: evaluatedSha,
      changed_paths: changedEntries.map((entry) => entry.path),
      workflow_dir: opts.workflowDir,
      tasks_path: opts.tasksPath,
    }))
      inherited.add(file);
  }
  const foreignTaskIds = [
    ...new Set(
      changedEntries
        .filter(
          (entry) =>
            !inherited.has(entry.path) &&
            !isVolatileTaskArtifactDeletion(entry, roots, authorizedCleanupRoots),
        )
        .map((entry) => taskIdFromArtifactPath(entry.path, roots))
        .filter((taskId): taskId is string => Boolean(taskId && !allowed.has(taskId))),
    ),
  ].toSorted();
  if (foreignTaskIds.length === 0) return;

  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message:
      `Task branch ${opts.branch} contains committed artifacts owned by other tasks: ` +
      `${foreignTaskIds.join(", ")}. Rebuild the branch from ${comparisonBase} or explicitly ` +
      "include those tasks in the branch_pr batch before publishing.",
    context: {
      reason_code: "foreign_committed_task_artifacts",
      task_id: opts.primaryTaskId,
      branch: opts.branch,
      comparison_base: comparisonBase,
      comparison_merge_base: mergeBase,
      foreign_task_ids: foreignTaskIds,
    },
  });
}
