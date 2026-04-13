import { readFile } from "node:fs/promises";
import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { createCliEmitter } from "../../cli/output.js";
import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { cleanupMergedLocalBranch } from "../shared/merged-branch-cleanup.js";
import {
  loadTaskFromContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { parseTaskIdFromCloseBranch } from "../shared/git-worktree.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import { resolveDefaultGithubRepo, runGhApiJson } from "../pr/internal/gh-api.js";
import { resolvePrPaths } from "../pr/internal/pr-paths.js";

import { resolveBaseBranch } from "@agentplaneorg/core";

type TaskHostedClosePrParsed = {
  taskIds: string[];
  branch: string | null;
  repo: string | null;
};

type GithubPullRequestRecord = {
  number?: number;
  html_url?: string | null;
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  head?: {
    ref?: string | null;
  } | null;
  base?: {
    ref?: string | null;
  } | null;
};

export const taskHostedClosePrSpec: CommandSpec<TaskHostedClosePrParsed> = {
  id: ["task", "hosted-close-pr"],
  group: "Task",
  summary: "Open one or more follow-up hosted closure PRs from remote task-close branches.",
  args: [{ name: "task-id", required: true, variadic: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "branch",
      valueHint: "<name>",
      description:
        "Optional explicit task-close branch name (default: derive from task PR metadata or remote refs).",
    },
    {
      kind: "string",
      name: "repo",
      valueHint: "<owner/name>",
      description: "Optional GitHub owner/repo override (defaults to origin remote).",
    },
  ],
  examples: [
    {
      cmd: "agentplane task hosted-close-pr 202604091218-JREJ4K",
      why: "Open the hosted closure PR after the workflow left a manual handoff comment.",
    },
    {
      cmd: "agentplane task hosted-close-pr 202604091725-CB0Y6S 202604091725-H21SCP",
      why: "Open multiple pending hosted closure PRs in one batch after a closure-wave merge.",
    },
  ],
  validateRaw: (raw) => {
    const taskIds = Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"]
      : typeof raw.args["task-id"] === "string"
        ? [raw.args["task-id"]]
        : [];
    const normalizedTaskIds = taskIds.map((taskId) => String(taskId).trim()).filter(Boolean);
    if (normalizedTaskIds.length === 0) {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for task-id: empty.",
      });
    }
    if (typeof raw.opts.branch === "string" && raw.opts.branch.trim() === "") {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for --branch: empty.",
      });
    }
    if (typeof raw.opts.repo === "string" && raw.opts.repo.trim() === "") {
      throw usageError({
        spec: taskHostedClosePrSpec,
        message: "Invalid value for --repo: empty.",
      });
    }
  },
  parse: (raw) => ({
    taskIds: (Array.isArray(raw.args["task-id"])
      ? raw.args["task-id"]
      : typeof raw.args["task-id"] === "string"
        ? [raw.args["task-id"]]
        : []
    )
      .map((taskId) => String(taskId).trim())
      .filter(Boolean),
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    repo: typeof raw.opts.repo === "string" ? raw.opts.repo : null,
  }),
};

async function resolveGithubRepo(opts: {
  gitRoot: string;
  repoOverride: string | null;
}): Promise<string> {
  const repo = opts.repoOverride?.trim() ?? "";
  if (repo) return repo;
  return await resolveDefaultGithubRepo(opts.gitRoot);
}

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
  const owner = opts.repo.split("/")[0]?.trim() ?? "";
  if (!owner) return null;
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
}): Promise<{
  meta: ReturnType<typeof parsePrMeta> | null;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  taskBranch: string | null;
}> {
  const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const taskBranch = await resolveTaskBranchFromContext({ ctx: opts.ctx, taskId: opts.taskId });
  const { metaPath, config } = await resolvePrPaths({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });
  if (config.workflow_mode !== "branch_pr") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Invalid workflow_mode: ${config.workflow_mode} (expected branch_pr)`,
    });
  }
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

function shortSha(value: string): string {
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
    const expected = `task-close/${opts.taskId}/${shortSha(opts.mergeCommit)}`;
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

function buildHostedClosePrTitle(taskId: string): string {
  return `📝 ${taskId} task: close after hosted merge`;
}

function buildHostedClosePrBody(opts: {
  taskId: string;
  prNumber: number | null;
  sourceBranch: string;
  mergeSha: string;
}): string {
  const prLine =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `Automated closure for merged task PR #${opts.prNumber}.`
      : "Automated closure for merged task PR.";
  return [
    prLine,
    "",
    `- task_id: \`${opts.taskId}\``,
    `- source_branch: \`${opts.sourceBranch}\``,
    `- merge_sha: \`${opts.mergeSha}\``,
    "",
    "This PR contains only tracked task artifacts produced by the hosted branch_pr closure flow.",
  ].join("\n");
}

function normalizeGithubPrLink(
  prNumber: number,
  prUrl: string | null,
  verb: "linked to" | "created",
): string {
  return prUrl?.trim()
    ? `${verb} GitHub PR #${prNumber}: ${prUrl.trim()}`
    : `${verb} GitHub PR #${prNumber}`;
}

async function maybeCleanupMergedTaskBranch(opts: {
  output: ReturnType<typeof createCliEmitter>;
  gitRoot: string;
  branch: string;
}): Promise<void> {
  try {
    const cleanup = await cleanupMergedLocalBranch({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
    });
    if (!cleanup.removedBranch && !cleanup.removedWorktree) {
      if (cleanup.skippedReason === "current_worktree") {
        opts.output.info(
          `local merged branch cleanup skipped: ${opts.branch} is the current checkout`,
        );
      } else if (cleanup.skippedReason === "outside_repo") {
        opts.output.info(
          `local merged branch cleanup skipped: ${opts.branch} is attached to a worktree outside the current checkout root`,
        );
      }
      return;
    }
    const details: string[] = [];
    if (cleanup.removedWorktree && cleanup.worktreePath) {
      details.push(`removed worktree ${cleanup.worktreePath}`);
    }
    if (cleanup.removedBranch) {
      details.push(`deleted branch ${opts.branch}`);
    }
    opts.output.info(`local merged branch cleanup: ${details.join("; ")}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    opts.output.warn(`local merged branch cleanup failed for ${opts.branch}: ${message}`);
  }
}

async function openHostedClosePr(opts: {
  ctx: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  branch?: string | null;
  repo?: string | null;
}): Promise<number> {
  const output = createCliEmitter();
  const { meta, task, taskBranch } = await readHostedCloseState({
    ctx: opts.ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
  });

  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const repo = await resolveGithubRepo({ gitRoot, repoOverride: opts.repo ?? null });
  const defaultBaseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  });
  let sourceBranch = meta?.branch?.trim() ?? taskBranch?.trim() ?? "";
  let baseBranch = meta?.base?.trim() ?? defaultBaseBranch?.trim() ?? "";
  let mergedRecord =
    sourceBranch.length > 0 &&
    (meta?.status !== "MERGED" || !(meta?.merge_commit?.trim() ?? task.commit?.hash?.trim() ?? ""))
      ? await resolveHostedCloseMergeRecord({
          gitRoot,
          repo,
          sourceBranch,
          baseBranch: baseBranch || null,
          prNumber: typeof meta?.pr_number === "number" ? meta.pr_number : null,
        })
      : null;
  const localMergeCommit = meta?.merge_commit?.trim() ?? task.commit?.hash?.trim() ?? "";
  if (!mergedRecord && localMergeCommit) {
    mergedRecord = await resolveHostedCloseMergeRecordByCommit({
      gitRoot,
      repo,
      mergeCommit: localMergeCommit,
      sourceBranch: sourceBranch || null,
      baseBranch: baseBranch || null,
      prNumber: typeof meta?.pr_number === "number" ? meta.pr_number : null,
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
  const branch = await resolveHostedCloseBranch({
    gitRoot,
    taskId: opts.taskId,
    explicitBranch: opts.branch ?? null,
    mergeCommit,
  });
  await maybeCleanupMergedTaskBranch({
    output,
    gitRoot,
    branch: sourceBranch,
  });
  const owner = repo.split("/")[0]?.trim() ?? "";
  const existingQuery = new URLSearchParams({
    state: "open",
    head: `${owner}:${branch}`,
  });
  const existing = await runGhApiJson<GithubPullRequestRecord[]>(gitRoot, [
    `repos/${repo}/pulls?${existingQuery.toString()}`,
  ]);
  const existingPr = Array.isArray(existing) ? (existing[0] ?? null) : null;
  const existingNumber = Number(existingPr?.number ?? 0);
  if (Number.isInteger(existingNumber) && existingNumber > 0) {
    output.success(
      "task hosted-close-pr",
      opts.taskId,
      normalizeGithubPrLink(existingNumber, existingPr?.html_url ?? null, "linked to"),
    );
    return 0;
  }

  const created = await runGhApiJson<GithubPullRequestRecord>(gitRoot, [
    `repos/${repo}/pulls`,
    "-X",
    "POST",
    "-f",
    `title=${buildHostedClosePrTitle(opts.taskId)}`,
    "-f",
    `body=${buildHostedClosePrBody({
      taskId: opts.taskId,
      prNumber:
        typeof meta?.pr_number === "number"
          ? meta.pr_number
          : typeof mergedRecord?.number === "number"
            ? mergedRecord.number
            : null,
      sourceBranch,
      mergeSha: mergeCommit,
    })}`,
    "-f",
    `head=${branch}`,
    "-f",
    `base=${baseBranch}`,
  ]);
  const createdNumber = Number(created.number ?? 0);
  if (!Number.isInteger(createdNumber) || createdNumber <= 0) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `GitHub did not return a valid PR number for hosted closure branch ${branch}.`,
    });
  }
  output.success(
    "task hosted-close-pr",
    opts.taskId,
    normalizeGithubPrLink(createdNumber, created.html_url ?? null, "created"),
  );
  return 0;
}

export function makeRunTaskHostedClosePrHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskHostedClosePrParsed): Promise<number> => {
    try {
      const commandCtx = await getCtx("task hosted-close-pr");
      for (const taskId of p.taskIds) {
        await openHostedClosePr({
          ctx: commandCtx,
          cwd: ctx.cwd,
          rootOverride: ctx.rootOverride,
          taskId,
          branch: p.branch,
          repo: p.repo,
        });
      }
      return 0;
    } catch (err) {
      if (err instanceof CliError) throw err;
      throw mapBackendError(err, {
        command: "task hosted-close-pr",
        root: ctx.rootOverride ?? null,
      });
    }
  };
}
