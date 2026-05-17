import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { gitBranchUpstream, gitCurrentBranch } from "../shared/git-ops.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { maybeAutoCommitTaskPrArtifacts } from "./internal/auto-commit.js";
import { type PrOpenOutcome, syncPrArtifacts } from "./internal/sync.js";

function prOpenOutcomeDetails(
  meta: { pr_number?: number; pr_url?: string },
  openOutcome: PrOpenOutcome | null,
): string {
  if (openOutcome) return openOutcome.message;
  if (typeof meta.pr_number === "number" && meta.pr_number > 0) {
    return meta.pr_url?.trim()
      ? `linked to GitHub PR #${meta.pr_number}: ${meta.pr_url.trim()}`
      : `linked to GitHub PR #${meta.pr_number}`;
  }
  return "local PR artifacts synced; remote PR creation staged";
}

function summarizePrOpenFailure(err: unknown): string {
  const stderr =
    typeof (err as { stderr?: unknown } | null)?.stderr === "string"
      ? String((err as { stderr?: unknown }).stderr).trim()
      : "";
  const stdout =
    typeof (err as { stdout?: unknown } | null)?.stdout === "string"
      ? String((err as { stdout?: unknown }).stdout).trim()
      : "";
  const message = err instanceof Error ? err.message.trim() : String(err).trim();
  return stderr || stdout || message || "unknown failure";
}

async function gitResolveBranchHead(gitRoot: string, branch: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", `refs/heads/${branch}`], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : null;
  } catch {
    return null;
  }
}

async function gitResolveRemoteBranchHead(
  gitRoot: string,
  remoteTarget: string,
  branch: string,
): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["ls-remote", "--heads", remoteTarget, `refs/heads/${branch}`],
      {
        cwd: gitRoot,
        env: gitEnv(),
      },
    );
    const trimmed = stdout.trim();
    if (!trimmed) return null;
    const [head] = trimmed.split(/\s+/, 1);
    return head?.trim() || null;
  } catch {
    return null;
  }
}

async function gitResolveRemotePushTarget(gitRoot: string, remote: string): Promise<string> {
  try {
    const { stdout } = await execFileAsync("git", ["remote", "get-url", "--push", remote], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    const trimmed = stdout.trim();
    return trimmed.length > 0 ? trimmed : remote;
  } catch {
    return remote;
  }
}

async function gitSetBranchUpstream(opts: {
  gitRoot: string;
  branch: string;
  remote: string;
  remoteBranch: string;
}): Promise<void> {
  await execFileAsync("git", ["config", `branch.${opts.branch}.remote`, opts.remote], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  await execFileAsync(
    "git",
    ["config", `branch.${opts.branch}.merge`, `refs/heads/${opts.remoteBranch}`],
    {
      cwd: opts.gitRoot,
      env: gitEnv(),
    },
  );
}

async function canReuseMatchingRemoteHead(opts: {
  gitRoot: string;
  branch: string;
  remote: string;
  remoteBranch: string;
}): Promise<boolean> {
  const remoteTarget = await gitResolveRemotePushTarget(opts.gitRoot, opts.remote);
  const [localHead, remoteHead] = await Promise.all([
    gitResolveBranchHead(opts.gitRoot, opts.branch),
    gitResolveRemoteBranchHead(opts.gitRoot, remoteTarget, opts.remoteBranch),
  ]);
  return Boolean(localHead && remoteHead && localHead === remoteHead);
}

async function pushTaskBranchUpstreamIfConfigured(opts: {
  gitRoot: string;
  branch: string;
}): Promise<boolean> {
  const currentBranch = await gitCurrentBranch(opts.gitRoot).catch(() => "");
  if (currentBranch.trim() !== opts.branch.trim()) return false;
  const upstream = await gitBranchUpstream(opts.gitRoot, opts.branch);
  const trimmed = upstream?.trim() ?? "";
  let remote = "origin";
  if (trimmed) {
    const slashIndex = trimmed.indexOf("/");
    if (slashIndex > 0 && slashIndex < trimmed.length - 1) {
      const upstreamRemote = trimmed.slice(0, slashIndex);
      const upstreamBranch = trimmed.slice(slashIndex + 1);
      if (upstreamBranch === opts.branch) remote = upstreamRemote;
    }
  }

  try {
    try {
      await execFileAsync("git", ["remote", "get-url", remote], {
        cwd: opts.gitRoot,
        env: gitEnv(),
      });
    } catch {
      return false;
    }
    await execFileAsync("git", ["push", "--no-verify", "-u", remote, `HEAD:${opts.branch}`], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
  } catch (err) {
    const canReuseRemote = await canReuseMatchingRemoteHead({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      remote,
      remoteBranch: opts.branch,
    });
    if (!canReuseRemote) throw err;
    await gitSetBranchUpstream({
      gitRoot: opts.gitRoot,
      branch: opts.branch,
      remote,
      remoteBranch: opts.branch,
    });
  }
  return true;
}

export async function cmdPrOpen(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
  includeTaskIds?: string[];
  syncOnly?: boolean;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const author = opts.author.trim();
    if (!author) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid value for --author.",
      });
    }

    const commandCtx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

    const initialSync = await syncPrArtifacts({
      ctx: commandCtx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      mode: "open",
      author,
      branch: opts.branch,
      includeTaskIds: opts.includeTaskIds,
      remoteMode: "sync-only",
    });
    if (initialSync.meta.branch) {
      await maybeAutoCommitTaskPrArtifacts({
        ctx: commandCtx,
        taskId: opts.taskId,
        branch: initialSync.meta.branch,
      });
    }

    if (!opts.syncOnly && initialSync.meta.branch) {
      try {
        await pushTaskBranchUpstreamIfConfigured({
          gitRoot: commandCtx.resolvedProject.gitRoot,
          branch: initialSync.meta.branch,
        });
      } catch (err) {
        const reason = `task branch push failed: ${summarizePrOpenFailure(err)}`;
        throw new CliError({
          exitCode: exitCodeForError("E_GIT"),
          code: "E_GIT",
          message: `Unable to publish task branch for GitHub PR creation. PR artifacts were left unchanged after publish failure (${reason}).`,
        });
      }
    }

    const { meta, prDir, resolved, openOutcome } = opts.syncOnly
      ? initialSync
      : await syncPrArtifacts({
          ctx: commandCtx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          taskId: opts.taskId,
          mode: "open",
          author,
          branch: opts.branch,
          includeTaskIds: opts.includeTaskIds,
          remoteMode: "auto",
        });

    output.success(
      "pr open",
      path.relative(resolved.gitRoot, prDir),
      prOpenOutcomeDetails(meta, openOutcome ?? null),
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}
