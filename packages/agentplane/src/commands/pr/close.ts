import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { normalizeGhTransportError, withGhTransportRetry } from "../shared/gh-transport.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

const execFileAsyncRaw = promisify(execFile);

type GithubPullResponse = {
  number: number;
  state?: string;
  html_url?: string;
  head?: {
    ref?: string;
    repo?: {
      full_name?: string;
    } | null;
  } | null;
};

type PrCloseResult = {
  repo: string;
  prNumber: number;
  url: string | null;
  state: string;
  comment: "added" | "skipped";
  remoteBranch: string | null;
  remoteBranchAction:
    | "deleted"
    | "skipped"
    | "skipped-fork"
    | "skipped-missing-head"
    | "already-absent";
};

function ensureNonEmptyFlag(name: string, value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Invalid value for --${name}.`,
    });
  }
  return trimmed;
}

function normalizeGhError(err: unknown): string {
  return normalizeGhTransportError(err);
}

function isGhNotFound(err: unknown): boolean {
  return /\b404\b/.test(normalizeGhError(err));
}

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

async function runGhApiNoOutput(cwd: string, args: string[]): Promise<void> {
  await withGhTransportRetry(
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
}

export async function cmdPrClose(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  prNumber: number;
  repo?: string;
  comment?: string;
  deleteRemoteBranch: boolean;
}): Promise<number> {
  try {
    if (!Number.isInteger(opts.prNumber) || opts.prNumber <= 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid PR number.",
      });
    }

    const output = createCliEmitter();
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const commandCwd = ctx.resolvedProject.gitRoot;
    const repo = opts.repo
      ? ensureNonEmptyFlag("repo", opts.repo)
      : await resolveDefaultRepo(commandCwd);
    const comment = opts.comment?.trim() ? ensureNonEmptyFlag("comment", opts.comment) : null;
    const pr = await runGhApiJson<GithubPullResponse>(commandCwd, [
      `repos/${repo}/pulls/${opts.prNumber}`,
    ]);

    if (!pr.number) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `GitHub pull request #${opts.prNumber} was not found in ${repo}.`,
      });
    }

    if (comment) {
      await runGhApiNoOutput(commandCwd, [
        `repos/${repo}/issues/${opts.prNumber}/comments`,
        "-X",
        "POST",
        "-f",
        `body=${comment}`,
      ]);
    }

    const closed = await runGhApiJson<GithubPullResponse>(commandCwd, [
      `repos/${repo}/pulls/${opts.prNumber}`,
      "-X",
      "PATCH",
      "-f",
      "state=closed",
    ]);

    const headRepo =
      closed.head?.repo?.full_name?.trim() ?? pr.head?.repo?.full_name?.trim() ?? null;
    const headRef = closed.head?.ref?.trim() ?? pr.head?.ref?.trim() ?? null;
    let remoteBranchAction: PrCloseResult["remoteBranchAction"] = "skipped";
    if (opts.deleteRemoteBranch) {
      if (!headRef) {
        remoteBranchAction = "skipped-missing-head";
      } else if (headRepo && headRepo !== repo) {
        remoteBranchAction = "skipped-fork";
      } else {
        try {
          await runGhApiNoOutput(commandCwd, [
            `repos/${repo}/git/refs/heads/${encodeURIComponent(headRef)}`,
            "-X",
            "DELETE",
          ]);
          remoteBranchAction = "deleted";
        } catch (err) {
          if (isGhNotFound(err)) {
            remoteBranchAction = "already-absent";
          } else {
            throw err;
          }
        }
      }
    }

    const result: PrCloseResult = {
      repo,
      prNumber: opts.prNumber,
      url: closed.html_url?.trim() ?? pr.html_url?.trim() ?? null,
      state: closed.state?.trim() ?? pr.state?.trim() ?? "closed",
      comment: comment ? "added" : "skipped",
      remoteBranch: headRef,
      remoteBranchAction,
    };
    output.report(
      [
        { label: "repo", value: result.repo },
        { label: "state", value: result.state },
        { label: "url", value: result.url ?? "unknown" },
        { label: "comment", value: result.comment },
        { label: "remote_branch", value: result.remoteBranch ?? "unknown" },
        { label: "remote_branch_action", value: result.remoteBranchAction },
      ],
      {
        header: successMessage("pr close", `#${result.prNumber}`),
      },
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr close", root: opts.rootOverride ?? null });
  }
}
