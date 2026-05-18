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
import { taskCloseAlreadyRecordedOnBase } from "../task/close-tail-state.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import { tryLookupExistingGithubPrByBranch } from "./internal/sync-github.js";

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
  nextAction: string;
};

function shortSha(value: string | null | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed ? trimmed.slice(0, 12) : null;
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

function remoteStatusFromMeta(meta: PrMeta | null): RemotePrStatus {
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
  return { provider: "github", state: "not_found", source: "metadata" };
}

function remoteStatusFromObserved(
  observed: Awaited<ReturnType<typeof tryLookupExistingGithubPrByBranch>>,
  meta: PrMeta | null,
): RemotePrStatus {
  if (!observed) return remoteStatusFromMeta(meta);
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
}): Promise<CloseTailStatus> {
  const base = opts.baseBranch?.trim() ?? "";
  if (base) {
    const recorded = await taskCloseAlreadyRecordedOnBase({
      gitRoot: opts.gitRoot,
      workflowDir: opts.workflowDir,
      taskId: opts.taskId,
      baseBranch: base,
    }).catch(() => false);
    if (recorded) return { state: "recorded_on_base", base };
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
  const rawBranch = meta?.branch?.trim() ?? "";
  const branch = rawBranch.length > 0 ? rawBranch : null;
  const branchHeadSha = await resolveBranchHeadSha(resolved.gitRoot, branch);
  const observed = branch
    ? await tryLookupExistingGithubPrByBranch({
        gitRoot: resolved.gitRoot,
        branch,
        baseBranch: normalizeBaseBranch(meta?.base),
      })
    : null;
  const pr = remoteStatusFromObserved(observed, meta);
  const baseBranch =
    pr.state === "not_found"
      ? (normalizeBaseBranch(meta?.base) ?? "main")
      : (normalizeBaseBranch(pr.base) ?? normalizeBaseBranch(meta?.base) ?? "main");
  const closeTail = await resolveCloseTailStatus({
    gitRoot: resolved.gitRoot,
    workflowDir: config.paths.workflow_dir,
    taskId: task.id,
    taskClosePrefix: config.branch.task_close_prefix,
    baseBranch,
    remotePr: pr,
  });
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
    nextAction: "",
  };
  report.nextAction = deriveNextAction(report);
  return report;
}

function renderPrLine(pr: RemotePrStatus): string {
  if (pr.state === "not_found") return `github: not_found (source=${pr.source})`;
  const number = pr.prNumber ? `#${pr.prNumber}` : "no-number";
  const url = pr.prUrl ? ` ${pr.prUrl}` : "";
  return `github: ${pr.state} ${number}${url} (source=${pr.source})`;
}

function renderCloseTailLine(closeTail: CloseTailStatus): string {
  if (closeTail.state === "not_applicable") return `not_applicable: ${closeTail.reason}`;
  if (closeTail.state === "recorded_on_base") return `recorded_on_base: ${closeTail.base}`;
  const number = closeTail.prNumber ? ` #${closeTail.prNumber}` : "";
  const url = closeTail.prUrl ? ` ${closeTail.prUrl}` : "";
  return `${closeTail.state}: ${closeTail.branch}${number}${url}`;
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
    output.report(
      [
        { label: "task", value: `${report.task.id} ${report.task.status}` },
        { label: "verification", value: report.task.verification ?? "pending" },
        { label: "branch", value: report.branch.name ?? "missing" },
        { label: "branch_head", value: shortSha(report.branch.headSha) ?? "unknown" },
        { label: "meta_head", value: shortSha(report.branch.metaHeadSha) ?? "unknown" },
        { label: "remote_pr", value: renderPrLine(report.pr) },
        { label: "close_tail", value: renderCloseTailLine(report.closeTail) },
        { label: "next", value: report.nextAction },
      ],
      { header: "PR flow status" },
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr flow status", root: opts.rootOverride ?? null });
  }
}
