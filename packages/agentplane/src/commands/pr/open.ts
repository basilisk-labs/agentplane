import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { pushTaskBranchUpstreamIfConfigured } from "./branch-publication.js";
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
        relatedTaskIds: opts.includeTaskIds,
        branch: initialSync.meta.branch,
        baseBranch: initialSync.meta.base ?? null,
        strategy: "auto",
      });
    }

    if (!opts.syncOnly && initialSync.meta.branch) {
      try {
        await pushTaskBranchUpstreamIfConfigured({
          gitRoot: commandCtx.resolvedProject.gitRoot,
          branch: initialSync.meta.branch,
          baseBranch: initialSync.meta.base ?? null,
          prNumber: initialSync.meta.pr_number ?? null,
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
