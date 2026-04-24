import { readFile } from "node:fs/promises";
import { resolveBaseBranch, gitEnv, parseTaskIdFromCloseBranch } from "@agentplaneorg/core/git";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import {
  ensureBranchPrCloseWorkflowMode,
  resolveCloseGithubOwner,
  resolveCloseGithubRepo,
} from "../shared/close-precheck.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { parsePrMeta } from "../shared/pr-meta.js";
import {
  loadTaskFromContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../shared/task-backend.js";

import type {
  GithubPullRequestRecord,
  HostedClosePrPrecheckOptions,
  HostedClosePrPrecheckResult,
} from "./hosted-close-pr.types.js";

type HostedCloseState = {
  meta: ReturnType<typeof parsePrMeta> | null;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  taskBranch: string | null;
};

function selectMergedPullRecord(opts: {
  pulls: GithubPullRequestRecord[];
  sourceBranch: string | null;
  baseBranch: string | null;
  prNumber: number | null;
}): GithubPullRequestRecord | null {
  const merged = opts.pulls.filter((record) => {
    if (typeof record.merged_at !== "string" || record.merged_at.trim().length === 0) return false;
    const headRef = record.head?.ref?.trim() ?? "";
    if (opts.sourceBranch && headRef && headRef !== opts.sourceBranch) return false;
    const baseRef = record.base?.ref?.trim() ?? "";
    if (opts.baseBranch && baseRef && baseRef !== opts.baseBranch) return false;
    return true;
  });
  if (merged.length === 0) return null;
  if (typeof opts.prNumber === "number" && opts.prNumber > 0) {
    const exact = merged.find((record) => Number(record.number ?? 0) === opts.prNumber);
    if (exact) return exact;
  }
  return (
    [...merged].toSorted((left, right) => {
      const leftAt = Date.parse(left.merged_at ?? "");
      const rightAt = Date.parse(right.merged_at ?? "");
      return Number.isNaN(rightAt) || Number.isNaN(leftAt) ? 0 : rightAt - leftAt;
    })[0] ?? null
  );
}

async function resolveHostedCloseMergeRecord(opts: {
  gitRoot: string;
  repo: string;
  sourceBranch: string;
  baseBranch: string | null;
  prNumber: number | null;
}): Promise<GithubPullRequestRecord | null> {
  const owner = resolveCloseGithubOwner(opts.repo);
  const query = new URLSearchParams({
    state: "closed",
    head: `${owner}:${opts.sourceBranch}`,
  });
  if (opts.baseBranch) query.set("base", opts.baseBranch);
  const records = await runGhApiJson<GithubPullRequestRecord[]>(opts.gitRoot, [
    `repos/${opts.repo}/pulls?${query.toString()}`,
  ]);
  return selectMergedPullRecord({
    pulls: Array.isArray(records) ? records : [],
    sourceBranch: opts.sourceBranch,
    baseBranch: opts.baseBranch,
    prNumber: opts.prNumber,
  });
}

async function resolveHostedCloseMergeRecordByCommit(opts: {
  gitRoot: string;
  repo: string;
  mergeCommit: string;
  sourceBranch: string | null;
  baseBranch: string | null;
  prNumber: number | null;
}): Promise<GithubPullRequestRecord | null> {
  const records = await runGhApiJson<GithubPullRequestRecord[]>(opts.gitRoot, [
    `repos/${opts.repo}/commits/${opts.mergeCommit}/pulls`,
  ]);
  return selectMergedPullRecord({
    pulls: Array.isArray(records) ? records : [],
    sourceBranch: opts.sourceBranch,
    baseBranch: opts.baseBranch,
    prNumber: opts.prNumber,
  });
}

async function readHostedCloseState(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<HostedCloseState> {
  const task =
    (await opts.ctx.taskBackend.getTask(opts.taskId)) ??
    (await loadTaskFromContext({
      ctx: opts.ctx,
      taskId: opts.taskId,
      preferBranchSnapshot: false,
    }));
  const taskBranch = await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const { metaPath, config } = await resolvePrPaths({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });
  ensureBranchPrCloseWorkflowMode(config.workflow_mode);
  if (!(await fileExists(metaPath))) {
    return { meta: null, task, taskBranch };
  }
  const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.taskId);
  return { meta, task, taskBranch };
}

async function listRemoteTaskCloseBranches(opts: {
  gitRoot: string;
  taskId: string;
}): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["ls-remote", "--heads", "origin", `task-close/${opts.taskId}/*`],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  return stdout
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.split(/\s+/, 2)[1] ?? "")
    .map((ref) => ref.replace(/^refs\/heads\//, ""))
    .filter((ref) => ref.length > 0);
}

export function shortHostedCloseSha(value: string): string {
  return value.trim().slice(0, 12);
}

function stripBranchRef(branch: string): string {
  return branch.startsWith("refs/heads/") ? branch.slice("refs/heads/".length) : branch;
}

async function resolveHostedCloseBranch(opts: {
  gitRoot: string;
  taskId: string;
  explicitBranch: string | null;
  mergeCommit: string | null;
}): Promise<string> {
  const remoteBranches = await listRemoteTaskCloseBranches({
    gitRoot: opts.gitRoot,
    taskId: opts.taskId,
  });
  const explicitBranch = stripBranchRef(opts.explicitBranch?.trim() ?? "");
  if (explicitBranch) {
    const parsedTaskId = parseTaskIdFromCloseBranch(explicitBranch);
    if (parsedTaskId && parsedTaskId !== opts.taskId) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Branch ${explicitBranch} does not belong to task ${opts.taskId}.`,
      });
    }
    if (!remoteBranches.includes(explicitBranch)) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Remote hosted closure branch not found: ${explicitBranch}.`,
      });
    }
    return explicitBranch;
  }

  if (opts.mergeCommit) {
    const expected = `task-close/${opts.taskId}/${shortHostedCloseSha(opts.mergeCommit)}`;
    if (remoteBranches.includes(expected)) return expected;
    if (remoteBranches.length === 1) return remoteBranches[0] ?? expected;
    if (remoteBranches.length > 1) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Multiple remote hosted closure branches match ${opts.taskId}: ${remoteBranches.join(", ")} (use --branch).`,
      });
    }
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Remote hosted closure branch not found for ${opts.taskId}: ${expected}.`,
    });
  }

  if (remoteBranches.length === 1) return remoteBranches[0] ?? "";
  if (remoteBranches.length > 1) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Multiple remote hosted closure branches match ${opts.taskId}: ${remoteBranches.join(", ")} (use --branch).`,
    });
  }
  throw new CliError({
    exitCode: exitCodeForError("E_VALIDATION"),
    code: "E_VALIDATION",
    message: `Could not resolve remote hosted closure branch for ${opts.taskId}.`,
  });
}

export async function precheckHostedClosePr(
  opts: HostedClosePrPrecheckOptions,
): Promise<HostedClosePrPrecheckResult> {
  const { meta, task, taskBranch } = await readHostedCloseState({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const repo = await resolveCloseGithubRepo({ gitRoot, repoOverride: opts.repo ?? null });
  const defaultBaseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  });
  let sourceBranch = meta?.branch?.trim() ?? taskBranch?.trim() ?? "";
  let baseBranch = meta?.base?.trim() ?? defaultBaseBranch?.trim() ?? "";
  const localMergeCommit = meta?.merge_commit?.trim() ?? task.commit?.hash?.trim() ?? "";
  const canonicalCloseAlreadyPresent =
    meta?.status === "MERGED" &&
    sourceBranch.length > 0 &&
    localMergeCommit.length > 0 &&
    normalizeTaskStatus(task.status) === "DONE" &&
    (task.commit?.hash?.trim() ?? "") === localMergeCommit;
  if (canonicalCloseAlreadyPresent) {
    return {
      kind: "skip",
      outcome: {
        kind: "canonical-already-present",
        taskId: opts.taskId,
        baseBranch,
        mergeCommit: localMergeCommit,
      },
    };
  }

  const prNumber = typeof meta?.pr_number === "number" ? meta.pr_number : null;
  let mergedRecord =
    sourceBranch.length > 0 && (meta?.status !== "MERGED" || !localMergeCommit)
      ? await resolveHostedCloseMergeRecord({
          gitRoot,
          repo,
          sourceBranch,
          baseBranch: baseBranch || null,
          prNumber,
        })
      : null;
  if (!mergedRecord && localMergeCommit) {
    mergedRecord = await resolveHostedCloseMergeRecordByCommit({
      gitRoot,
      repo,
      mergeCommit: localMergeCommit,
      sourceBranch: sourceBranch || null,
      baseBranch: baseBranch || null,
      prNumber,
    });
  }
  if (!sourceBranch) {
    sourceBranch = mergedRecord?.head?.ref?.trim() ?? "";
  }
  if (!baseBranch) {
    baseBranch = mergedRecord?.base?.ref?.trim() ?? defaultBaseBranch?.trim() ?? "";
  }
  const mergeCommit =
    meta?.merge_commit?.trim() ??
    task.commit?.hash?.trim() ??
    mergedRecord?.merge_commit_sha?.trim() ??
    "";
  if (!sourceBranch) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Missing hosted close source branch for ${opts.taskId}.`,
    });
  }
  if (!mergeCommit) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Missing hosted close merge commit for ${opts.taskId}.`,
    });
  }
  if (meta?.status !== "MERGED" && !mergedRecord?.merged_at) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Task ${opts.taskId} is not in MERGED hosted-close state.`,
    });
  }
  const closeBranch = await resolveHostedCloseBranch({
    gitRoot,
    taskId: opts.taskId,
    explicitBranch: opts.branch ?? null,
    mergeCommit,
  });

  return {
    kind: "ready",
    plan: {
      taskId: opts.taskId,
      gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      repo,
      sourceBranch,
      baseBranch,
      mergeCommit,
      closeBranch,
      sourcePrNumber:
        typeof meta?.pr_number === "number"
          ? meta.pr_number
          : typeof mergedRecord?.number === "number"
            ? mergedRecord.number
            : null,
    },
  };
}
