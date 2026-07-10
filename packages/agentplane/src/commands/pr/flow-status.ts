import { readFile } from "node:fs/promises";

import { gitRevParse, taskCloseBranchName } from "@agentplaneorg/core/git";

import { createCliEmitter } from "../../cli/output.js";
import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { CliError } from "../../shared/errors.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  taskCloseAlreadyRecordedOnBase,
  taskPreMergeClosureRecordedOnBase,
} from "../task/close-tail-state.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import {
  preMergeClosureAllowsMissingBasisCommit,
  preMergeClosureBasisIsAncestor,
  taskIsClosedByPreMergeClosure,
} from "../task/hosted-close.command.js";
import { readTaskHandoffLatest, resolveTaskHandoffPaths } from "../shared/task-handoff.js";
import { readIntegrationQueue, type IntegrationQueueEntry } from "../pr/integrate/queue-state.js";
import { checkGithubUnresolvedReviewThreads } from "./internal/github-review-threads.js";
import { resolveHostedChecksStatus, type HostedChecksSummary } from "./hosted-checks.js";
import { renderPrFlowStatusRows } from "./flow-status.render.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import {
  tryLookupExistingGithubPrByBranch,
  tryLookupExistingGithubPrByNumber,
} from "./internal/sync-github.js";

type ProviderName = "github";

export type RemotePrStatus =
  | { provider: ProviderName; state: "not_found"; source: "lookup" | "metadata" }
  | {
      provider: ProviderName;
      state: "OPEN" | "CLOSED" | "MERGED";
      source: "lookup" | "metadata";
      prNumber: number | null;
      prUrl: string | null;
      base: string | null;
      headSha: string | null;
      mergeCommit: string | null;
    };

export type CloseTailStatus =
  | { state: "not_applicable"; reason: string }
  | { state: "recorded_on_base"; base: string }
  | {
      state: "open" | "merged" | "not_found";
      provider: ProviderName;
      branch: string;
      prNumber: number | null;
      prUrl: string | null;
    };

export type PrFlowStatusReport = {
  task: {
    id: string;
    status: string;
    verification: string | null;
  };
  branch: {
    name: string | null;
    headSha: string | null;
    metaHeadSha: string | null;
  };
  pr: RemotePrStatus;
  closeTail: CloseTailStatus;
  hostedChecks: HostedChecksSummary;
  reviewThreads: ReviewThreadsStatus;
  queue: QueueStatus;
  handoff: HandoffStatus;
  nextAction: string;
};

type ReviewThreadsStatus =
  | { checked: true; unresolved: number }
  | { checked: false; reason: string };

type QueueStatus =
  | { present: false }
  | {
      present: true;
      status: IntegrationQueueEntry["status"];
      reason: string | null;
      updatedAt: string | null;
    };

type HandoffStatus =
  | { present: false }
  | {
      present: true;
      reason: string;
      routeStatus: string | null;
      nextActions: string[];
    };

export async function matchesMergedPreMergeClosure(opts: {
  gitRoot: string;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
  meta: PrMeta | null;
  pr: {
    state: "not_found" | "OPEN" | "CLOSED" | "MERGED";
    prNumber?: number | null;
    headSha?: string | null;
  };
  branch: string | null;
}): Promise<boolean> {
  const prNumber = opts.pr.prNumber ?? null;
  if (opts.pr.state !== "MERGED" || !opts.meta || !opts.branch || prNumber === null) return false;
  if (
    !taskIsClosedByPreMergeClosure({
      task: opts.task,
      meta: opts.meta,
      branch: opts.branch,
      prNumber,
    })
  ) {
    return false;
  }
  return preMergeClosureBasisIsAncestor({
    gitRoot: opts.gitRoot,
    meta: opts.meta,
    mergedHeadSha: opts.pr.headSha,
    allowMissingBasisCommit: preMergeClosureAllowsMissingBasisCommit({
      task: opts.task,
      meta: opts.meta,
      prNumber,
    }),
  });
}

async function readPrMetaIfPresent(metaPath: string, taskId: string): Promise<PrMeta | null> {
  try {
    return parsePrMeta(await readFile(metaPath, "utf8"), taskId);
  } catch {
    return null;
  }
}

async function resolveBranchHeadSha(
  gitRoot: string,
  branch: string | null,
): Promise<string | null> {
  if (!branch) return null;
  try {
    return await gitRevParse(gitRoot, [branch]);
  } catch {
    return null;
  }
}

function remoteStatusFromLocalEvidence(
  meta: PrMeta | null,
  queueEntry: IntegrationQueueEntry | null,
): RemotePrStatus {
  const prNumber = Number(meta?.pr_number ?? 0);
  const status = meta?.status;
  if (status === "OPEN" || status === "CLOSED" || status === "MERGED") {
    return {
      provider: "github",
      state: status,
      source: "metadata",
      prNumber: Number.isInteger(prNumber) && prNumber > 0 ? prNumber : null,
      prUrl: meta?.pr_url ?? null,
      base: meta?.base ?? null,
      headSha: meta?.head_sha ?? null,
      mergeCommit: meta?.merge_commit ?? null,
    };
  }
  if (queueEntry?.status === "queued" && queueEntry.pr_number) {
    return {
      provider: "github",
      state: "OPEN",
      source: "metadata",
      prNumber: queueEntry.pr_number,
      prUrl: queueEntry.pr_url,
      base: queueEntry.base,
      headSha: queueEntry.head_sha,
      mergeCommit: null,
    };
  }
  return { provider: "github", state: "not_found", source: "metadata" };
}

async function resolveReviewThreadsStatus(opts: {
  gitRoot: string;
  prNumber: number | null;
}): Promise<ReviewThreadsStatus> {
  const result = await checkGithubUnresolvedReviewThreads(opts);
  if (!result.checked) return { checked: false, reason: result.reason };
  return { checked: true, unresolved: result.unresolved.length };
}

async function resolveHandoffStatus(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<HandoffStatus> {
  const handoff = await readTaskHandoffLatest(
    resolveTaskHandoffPaths({
      git_root: opts.gitRoot,
      workflow_dir: opts.workflowDir,
      task_id: opts.taskId,
    }),
  );
  if (!handoff) return { present: false };
  return {
    present: true,
    reason: handoff.reason,
    routeStatus: handoff.route?.status ?? null,
    nextActions: handoff.next_actions ?? [],
  };
}

function remoteStatusFromObserved(
  observed: Awaited<ReturnType<typeof tryLookupExistingGithubPrByBranch>>,
  meta: PrMeta | null,
  queueEntry: IntegrationQueueEntry | null,
): RemotePrStatus {
  if (!observed) return remoteStatusFromLocalEvidence(meta, queueEntry);
  return {
    provider: "github",
    state: observed.status,
    source: "lookup",
    prNumber: observed.prNumber,
    prUrl: observed.prUrl,
    base: observed.base,
    headSha: observed.headSha,
    mergeCommit: observed.mergeCommit,
  };
}

function normalizeBaseBranch(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) return null;
  const branch = trimmed.startsWith("refs/heads/") ? trimmed.slice("refs/heads/".length) : trimmed;
  return branch.startsWith("origin/") ? branch.slice("origin/".length) : branch;
}

async function resolveCloseTailStatus(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  taskClosePrefix: string;
  baseBranch: string | null;
  remotePr: RemotePrStatus;
  preMergeClosureRecorded: boolean;
  preMergeClosureRecordedOnBase: boolean;
}): Promise<CloseTailStatus> {
  const base = opts.baseBranch?.trim() ?? "";
  if (base) {
    const recorded = await taskCloseAlreadyRecordedOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      baseBranch: base,
    }).catch(() => false);
    if (recorded || opts.preMergeClosureRecordedOnBase) {
      return { state: "recorded_on_base", base };
    }
    if (opts.remotePr.state === "MERGED" && opts.preMergeClosureRecorded) {
      return { state: "recorded_on_base", base };
    }
  }

  const mergeCommit = opts.remotePr.state === "MERGED" ? opts.remotePr.mergeCommit : null;
  if (!mergeCommit) {
    return {
      state: "not_applicable",
      reason: "implementation PR is not merged or merge commit is unavailable",
    };
  }

  const branch = taskCloseBranchName({
    taskClosePrefix: opts.taskClosePrefix,
    taskId: opts.taskId,
    commit: mergeCommit,
  });
  const observed = await tryLookupExistingGithubPrByBranch({
    gitRoot: opts.gitRoot,
    branch,
    baseBranch: base || null,
  });
  if (observed?.status === "OPEN" || observed?.status === "MERGED") {
    return {
      state: observed.status === "MERGED" ? "merged" : "open",
      provider: "github",
      branch,
      prNumber: observed.prNumber,
      prUrl: observed.prUrl,
    };
  }
  return { state: "not_found", provider: "github", branch, prNumber: null, prUrl: null };
}

function deriveNextAction(report: PrFlowStatusReport): string {
  if (!report.branch.name) return `agentplane pr open ${report.task.id} --author <ROLE>`;
  if (report.pr.state === "not_found")
    return `agentplane pr open ${report.task.id} --author <ROLE>`;
  if (report.pr.state === "OPEN") {
    const target = report.pr.prNumber ? String(report.pr.prNumber) : report.branch.name;
    return `wait hosted checks, then merge remote PR ${target} through the configured provider API`;
  }
  if (report.pr.state === "CLOSED") return "inspect or reopen the remote PR before integrating";
  if (report.task.status === "DONE") return "pull main and run merged branch/worktree cleanup";
  if (report.closeTail.state === "recorded_on_base" || report.closeTail.state === "merged") {
    return "pull main; task close evidence is already recorded upstream";
  }
  if (report.closeTail.state === "open") {
    return `wait hosted checks and merge close-tail PR #${report.closeTail.prNumber ?? "unknown"}`;
  }
  return `wait hosted close, or run agentplane task hosted-close-pr ${report.task.id}`;
}

export async function resolvePrFlowStatus(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<PrFlowStatusReport> {
  const { task } = await loadBackendTask({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });
  const { resolved, config, metaPath } = await resolvePrPaths({ ...opts, ctx: opts.ctx });
  if (config.workflow_mode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Invalid workflow_mode: ${config.workflow_mode} (expected branch_pr)`,
    });
  }

  const meta = await readPrMetaIfPresent(metaPath, task.id);
  const queue = await readIntegrationQueue(resolved.gitRoot);
  const queueEntry = queue.entries.find((candidate) => candidate.task_id === task.id) ?? null;
  const metaBranch = meta?.branch?.trim() ?? "";
  const rawBranch = metaBranch.length > 0 ? metaBranch : (queueEntry?.branch.trim() ?? "");
  const branch = rawBranch.length > 0 ? rawBranch : null;
  const branchHeadSha = await resolveBranchHeadSha(resolved.gitRoot, branch);
  const baseHint = normalizeBaseBranch(meta?.base) ?? normalizeBaseBranch(queueEntry?.base);
  const storedPrNumber = Number(meta?.pr_number ?? queueEntry?.pr_number ?? 0);
  const observedByNumber =
    Number.isInteger(storedPrNumber) && storedPrNumber > 0
      ? await tryLookupExistingGithubPrByNumber({
          gitRoot: resolved.gitRoot,
          prNumber: storedPrNumber,
          branch,
          baseBranch: baseHint,
        })
      : null;
  const observed =
    observedByNumber ??
    (branch
      ? await tryLookupExistingGithubPrByBranch({
          gitRoot: resolved.gitRoot,
          branch,
          baseBranch: baseHint,
        })
      : null);
  const pr = remoteStatusFromObserved(observed, meta, queueEntry);
  const baseBranch =
    pr.state === "not_found"
      ? (normalizeBaseBranch(meta?.base) ?? "main")
      : (normalizeBaseBranch(pr.base) ?? normalizeBaseBranch(meta?.base) ?? "main");
  const preMergeClosureRecorded = await matchesMergedPreMergeClosure({
    gitRoot: resolved.gitRoot,
    task,
    meta,
    pr,
    branch,
  });
  const preMergeClosureRecordedOnBase =
    pr.state === "MERGED" && branch && pr.prNumber !== null
      ? await taskPreMergeClosureRecordedOnBase({
          gitRoot: resolved.gitRoot,
          workflowDir: config.paths.workflow_dir,
          taskId: task.id,
          baseBranch,
          branch,
          prNumber: pr.prNumber,
        })
      : false;
  const closeTail = await resolveCloseTailStatus({
    gitRoot: resolved.gitRoot,
    workflowDir: config.paths.workflow_dir,
    taskId: task.id,
    taskClosePrefix: config.branch.task_close_prefix,
    baseBranch,
    remotePr: pr,
    preMergeClosureRecorded,
    preMergeClosureRecordedOnBase,
  });
  const prNumber = pr.state === "not_found" ? null : pr.prNumber;
  const [hostedChecks, reviewThreads, handoff] = await Promise.all([
    resolveHostedChecksStatus({ gitRoot: resolved.gitRoot, prNumber }),
    resolveReviewThreadsStatus({ gitRoot: resolved.gitRoot, prNumber }),
    resolveHandoffStatus({
      gitRoot: resolved.gitRoot,
      workflowDir: config.paths.workflow_dir,
      taskId: task.id,
    }),
  ]);
  const report: PrFlowStatusReport = {
    task: {
      id: task.id,
      status: task.status,
      verification: task.verification?.state ?? null,
    },
    branch: {
      name: branch,
      headSha: branchHeadSha,
      metaHeadSha: meta?.head_sha ?? null,
    },
    pr,
    closeTail,
    hostedChecks,
    reviewThreads,
    queue: queueEntry
      ? {
          present: true,
          status: queueEntry.status,
          reason: queueEntry.reason ?? null,
          updatedAt: queueEntry.updated_at ?? null,
        }
      : { present: false },
    handoff,
    nextAction: "",
  };
  report.nextAction = deriveNextAction(report);
  return report;
}

export async function cmdPrFlowStatus(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  json: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const report = await resolvePrFlowStatus({ ...opts, ctx });
    const output = createCliEmitter();
    if (opts.json) {
      output.json(report);
      return 0;
    }
    output.report(renderPrFlowStatusRows(report), { header: "PR flow status" });
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr flow status", root: opts.rootOverride ?? null });
  }
}
