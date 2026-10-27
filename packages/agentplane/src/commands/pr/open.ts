import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

import { pushTaskBranchUpstreamIfConfigured } from "./branch-publication.js";
import { resolvePrFlowStatus } from "./flow-status.js";
import { maybeAutoCommitTaskPrArtifacts } from "./internal/auto-commit.js";
import { resolveChangeRequestIdentity } from "./internal/change-request-provider.js";
import { resolveProviderBaseBranch } from "./internal/provider-base.js";
import { resolveReviewedPublicationBase } from "./internal/reviewed-publication-base.js";
import { type PrOpenOutcome, syncPrArtifacts } from "./internal/sync.js";

function prOpenOutcomeDetails(
  meta: { pr_number?: number; pr_url?: string; provider?: { kind?: string } },
  openOutcome: PrOpenOutcome | null,
): string {
  if (openOutcome) return openOutcome.message;
  if (typeof meta.pr_number === "number" && meta.pr_number > 0) {
    const label = meta.provider?.kind === "gitlab" ? "GitLab MR" : "GitHub PR";
    return meta.pr_url?.trim()
      ? `linked to ${label} #${meta.pr_number}: ${meta.pr_url.trim()}`
      : `linked to ${label} #${meta.pr_number}`;
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
  quiet?: boolean;
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

    const initialCtx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const taskCommand = await loadTaskCommandContext({
      ctx: initialCtx,
      taskIds: [opts.taskId, ...(opts.includeTaskIds ?? [])],
      primaryTaskId: opts.taskId,
    });
    const commandCtx = taskCommand.command;
    const workflowMode = taskCommand.execution.selected_mode;
    if (workflowMode !== "branch_pr") {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "PR open requires a branch_pr TaskExecutionContext.",
      });
    }

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
      workflowMode,
      base: taskCommand.execution.base_ref,
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
      if (/^(?:[0-9a-f]{40}|[0-9a-f]{64})$/iu.test(taskCommand.execution.base_ref.trim())) {
        const reviewedPublicationBase = await resolveReviewedPublicationBase({
          command: commandCtx,
          task: taskCommand.primary_task,
          branch: initialSync.meta.branch,
          fallback: taskCommand.execution.base_ref,
        });
        if (!reviewedPublicationBase) {
          const identity = await resolveChangeRequestIdentity({
            gitRoot: commandCtx.resolvedProject.gitRoot,
            branch: initialSync.meta.branch,
            recorded: initialSync.meta.provider ?? null,
          });
          await resolveProviderBaseBranch({
            gitRoot: commandCtx.resolvedProject.gitRoot,
            baseRef: taskCommand.execution.base_ref,
            baseSha: taskCommand.execution.base_sha,
            identity,
          });
        }
      }
      try {
        await pushTaskBranchUpstreamIfConfigured({
          gitRoot: commandCtx.resolvedProject.gitRoot,
          branch: initialSync.meta.branch,
          baseBranch: initialSync.meta.base ?? null,
          prNumber: initialSync.meta.pr_number ?? null,
          taskId: opts.taskId,
          workflowDir: commandCtx.config.paths.workflow_dir,
          tasksPath: commandCtx.config.paths.tasks_path,
        });
      } catch (err) {
        const reason = `task branch push failed: ${summarizePrOpenFailure(err)}`;
        throw new CliError({
          exitCode: exitCodeForError("E_GIT"),
          code: "E_GIT",
          message: `Unable to publish task branch for hosted change-request creation. PR artifacts were left unchanged after publish failure (${reason}).`,
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
          workflowMode,
          base: taskCommand.execution.base_ref,
        });

    if (!opts.syncOnly && meta.branch) {
      const committed = await maybeAutoCommitTaskPrArtifacts({
        ctx: commandCtx,
        taskId: opts.taskId,
        relatedTaskIds: opts.includeTaskIds,
        branch: meta.branch,
        baseBranch: meta.base ?? null,
        strategy: "auto",
      });
      const prArtifactPrefix = `${commandCtx.config.paths.workflow_dir}/${opts.taskId}/pr/`
        .replaceAll("\\", "/")
        .replace(/^\.\//u, "");
      const remainingPrArtifacts = (await commandCtx.git.statusChangedPaths()).filter((changed) =>
        changed.replaceAll("\\", "/").startsWith(prArtifactPrefix),
      );
      if (remainingPrArtifacts.length > 0) {
        throw new CliError({
          exitCode: exitCodeForError("E_GIT"),
          code: "E_GIT",
          message: `PR publication left uncommitted task artifacts: ${remainingPrArtifacts.join(", ")}`,
        });
      }
      if (committed) {
        let published: boolean;
        try {
          published = await pushTaskBranchUpstreamIfConfigured({
            gitRoot: commandCtx.resolvedProject.gitRoot,
            branch: meta.branch,
            baseBranch: meta.base ?? null,
            prNumber: meta.pr_number ?? null,
            taskId: opts.taskId,
            workflowDir: commandCtx.config.paths.workflow_dir,
            tasksPath: commandCtx.config.paths.tasks_path,
          });
        } catch (err) {
          throw new CliError({
            exitCode: exitCodeForError("E_GIT"),
            code: "E_GIT",
            message: `Unable to publish the final PR artifact commit (${summarizePrOpenFailure(err)}).`,
          });
        }
        if (!published && meta.pr_number) {
          throw new CliError({
            exitCode: exitCodeForError("E_GIT"),
            code: "E_GIT",
            message: "The final PR artifact commit has no published task branch.",
          });
        }
      }
      if (meta.pr_number) {
        const report = await resolvePrFlowStatus({
          ctx: commandCtx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          taskId: opts.taskId,
        });
        if (
          report.pr.state !== "OPEN" ||
          report.pr.prNumber !== meta.pr_number ||
          report.publication?.state !== "aligned"
        ) {
          throw new CliError({
            exitCode: exitCodeForError("E_GIT"),
            code: "E_GIT",
            message: `Hosted PR #${meta.pr_number} does not confirm the final local and upstream head.`,
          });
        }
      }
    }

    if (!opts.quiet) {
      output.success(
        "pr open",
        path.relative(resolved.gitRoot, prDir),
        prOpenOutcomeDetails(meta, openOutcome ?? null),
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}
