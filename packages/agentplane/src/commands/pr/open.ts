import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitBranchUpstream } from "../shared/git-ops.js";
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

async function pushTaskBranchUpstreamIfConfigured(opts: {
  gitRoot: string;
  branch: string;
}): Promise<boolean> {
  const upstream = await gitBranchUpstream(opts.gitRoot, opts.branch);
  const trimmed = upstream?.trim() ?? "";
  if (!trimmed) return false;

  const slashIndex = trimmed.indexOf("/");
  if (slashIndex <= 0 || slashIndex === trimmed.length - 1) return false;
  const remote = trimmed.slice(0, slashIndex);
  const upstreamBranch = trimmed.slice(slashIndex + 1);
  if (!remote || !upstreamBranch) return false;

  await execFileAsync("git", ["push", remote, `HEAD:${upstreamBranch}`], {
    cwd: opts.gitRoot,
    env: gitEnv(),
  });
  return true;
}

export async function cmdPrOpen(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
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
      remoteMode: "sync-only",
    });
    const didAutoCommit = initialSync.meta.branch
      ? await maybeAutoCommitTaskPrArtifacts({
          ctx: commandCtx,
          taskId: opts.taskId,
          branch: initialSync.meta.branch,
        })
      : false;

    if (didAutoCommit && !opts.syncOnly && initialSync.meta.branch) {
      await pushTaskBranchUpstreamIfConfigured({
        gitRoot: commandCtx.resolvedProject.gitRoot,
        branch: initialSync.meta.branch,
      });
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
