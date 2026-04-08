import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, infoMessage, workflowModeMessage } from "../../cli/output.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { normalizeGhTransportError, withGhTransportRetry } from "../shared/gh-transport.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { parsePrMetaForwardCompatible } from "../shared/pr-meta.js";

import { cmdPrClose } from "./close.js";
import { resolvePrPaths } from "./internal/pr-paths.js";

const execFileAsyncRaw = promisify(execFile);

type GithubPullRecord = {
  number?: number;
  state?: string;
  html_url?: string;
};

function parseGithubRepoFromRemoteUrl(remoteUrl: string): string | null {
  const trimmed = remoteUrl.trim();
  if (!trimmed) return null;
  const httpsMatch = /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/.exec(trimmed);
  if (httpsMatch) return `${httpsMatch[1]}/${httpsMatch[2]}`;
  const sshMatch = /^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/.exec(trimmed);
  if (sshMatch) return `${sshMatch[1]}/${sshMatch[2]}`;
  return null;
}

async function resolveDefaultRepo(cwd: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["remote", "get-url", "origin"], {
    cwd,
    env: gitEnv(),
  });
  const repo = parseGithubRepoFromRemoteUrl(stdout);
  if (!repo) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: "Could not derive GitHub owner/repo from git remote origin.",
    });
  }
  return repo;
}

async function runGhApiJson<T>(cwd: string, args: string[]): Promise<T> {
  const { stdout } = await withGhTransportRetry(
    () =>
      execFileAsyncRaw("gh", ["api", ...args], {
        cwd,
        env: gitEnv(),
        maxBuffer: 10 * 1024 * 1024,
      }),
    {
      label: `running gh api ${args[0] ?? ""}`,
    },
  );
  return JSON.parse(stdout) as T;
}

async function runGhApiNoOutput(cwd: string, endpoint: string): Promise<void> {
  await withGhTransportRetry(
    () =>
      execFileAsyncRaw("gh", ["api", endpoint, "-X", "DELETE"], {
        cwd,
        env: gitEnv(),
        maxBuffer: 10 * 1024 * 1024,
      }),
    {
      label: `running gh api ${endpoint}`,
    },
  );
}

function isGhNotFound(err: unknown): boolean {
  return /\b404\b/.test(normalizeGhTransportError(err));
}

async function deleteRemoteBranch(opts: {
  cwd: string;
  repo: string;
  branch: string;
}): Promise<"deleted" | "already-absent"> {
  const endpoint = `repos/${opts.repo}/git/refs/heads/${encodeURIComponent(opts.branch)}`;
  try {
    await runGhApiNoOutput(opts.cwd, endpoint);
    return "deleted";
  } catch (err) {
    if (isGhNotFound(err)) return "already-absent";
    throw err;
  }
}

export async function cmdPrCloseSuperseded(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  deleteRemoteBranch: boolean;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    if (
      String(task.status ?? "")
        .trim()
        .toUpperCase() !== "DONE"
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Task ${opts.taskId} must be DONE before closing superseded PRs.`,
      });
    }

    const { config, metaPath, resolved } = await resolvePrPaths({ ...opts, ctx });
    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }
    if (!(await fileExists(metaPath))) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Missing PR metadata: ${metaPath}`,
      });
    }

    const meta = parsePrMetaForwardCompatible(await readFile(metaPath, "utf8"), opts.taskId);
    const branch = meta.branch?.trim() ?? "";
    if (!branch) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Missing PR branch for ${opts.taskId}`,
      });
    }

    const repo = await resolveDefaultRepo(resolved.gitRoot);
    const owner = repo.split("/", 1)[0]?.trim() ?? "";
    if (!owner) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: "Could not derive GitHub owner from remote origin.",
      });
    }

    const openPrs = await runGhApiJson<GithubPullRecord[]>(resolved.gitRoot, [
      `repos/${repo}/pulls?head=${encodeURIComponent(`${owner}:${branch}`)}&state=open&per_page=100`,
    ]);
    if (openPrs.length === 0) {
      const remoteBranchAction = opts.deleteRemoteBranch
        ? await deleteRemoteBranch({ cwd: resolved.gitRoot, repo, branch })
        : "skipped";
      output.report(
        [
          { label: "task", value: opts.taskId },
          { label: "branch", value: branch },
          { label: "state", value: "skipped" },
          { label: "reason", value: "no open task PR found" },
          { label: "remote_branch_action", value: remoteBranchAction },
        ],
        { header: infoMessage(`pr close-superseded ${opts.taskId}`) },
      );
      return 0;
    }
    if (openPrs.length > 1) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Multiple open PRs match task ${opts.taskId} branch ${branch}: ${openPrs
          .map((pr) => pr.number)
          .filter(
            (value): value is number =>
              typeof value === "number" && Number.isInteger(value) && value > 0,
          )
          .map((value) => `#${value}`)
          .join(", ")}`,
      });
    }

    const prNumber = Number(openPrs[0]?.number ?? 0);
    if (!Number.isInteger(prNumber) || prNumber <= 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Could not determine open PR number for task ${opts.taskId}.`,
      });
    }

    return await cmdPrClose({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      prNumber,
      comment: `Superseded by protected-main closure of task ${opts.taskId}.`,
      deleteRemoteBranch: opts.deleteRemoteBranch,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, {
      command: "pr close-superseded",
      root: opts.rootOverride ?? null,
    });
  }
}
