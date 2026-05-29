import path from "node:path";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { withDiagnosticContext } from "../../../shared/diagnostics.js";
import { CliError } from "../../../../shared/errors.js";
import type { CommandContext } from "../../../shared/task-backend.js";
import {
  buildTaskHandoffArtifact,
  resolveTaskHandoffPaths,
  writeTaskHandoff,
} from "../../../shared/task-handoff.js";
import { tryLookupExistingGithubPrByBranch } from "../../internal/sync-github.js";
import { runProtectedBaseGithubMerge } from "./github-pr-merge.js";

type IntegratePrMetaSource = {
  pr_number?: unknown;
  pr_url?: unknown;
};

async function recordProtectedBaseIntegrateHandoff(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  base: string;
  branchHeadSha: string | null;
  prNumber: number | null;
  prUrl: string | null;
}): Promise<void> {
  const paths = resolveTaskHandoffPaths({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.taskId,
  });
  const handoffShowCommand = `agentplane task handoff show ${opts.taskId}`;
  const prLabel =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `GitHub PR #${opts.prNumber}`
      : `the GitHub PR for branch ${opts.branch}`;
  const prUrl = opts.prUrl?.trim() ?? "";
  const prMetaPath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "pr", "meta.json");
  const taskReadmePath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "README.md");
  await writeTaskHandoff({
    paths,
    handoff: buildTaskHandoffArtifact({
      task_id: opts.taskId,
      created_at: new Date().toISOString(),
      from_role: "INTEGRATOR",
      reason: `branch_pr integration is waiting for the GitHub PR merge into ${opts.base}.`,
      note:
        prUrl.length > 0
          ? `Continue the primary branch_pr merge route for ${prLabel}: ${prUrl}. After GitHub merges it, wait for Task Hosted Close, then pull ${opts.base}.`
          : `Continue the primary branch_pr merge route for ${prLabel}. After GitHub merges it, wait for Task Hosted Close, then pull ${opts.base}.`,
      branch: opts.branch,
      base_branch: opts.base,
      head_sha: opts.branchHeadSha,
      workspace_root: opts.ctx.resolvedProject.gitRoot,
      pr_branch: opts.branch,
      route: {
        kind: "protected_base_integrate",
        status: "awaiting_github_merge",
        local_mutation: "not_performed",
        finalize_via: "github_task_pr_merge_then_hosted_close",
        pr_number: opts.prNumber,
        pr_url: prUrl.length > 0 ? prUrl : null,
        handoff_show_command: handoffShowCommand,
        base_pull_command: "git pull --ff-only",
      },
      next_actions: [
        handoffShowCommand,
        prUrl.length > 0
          ? `Continue GitHub PR merge for ${prLabel}: ${prUrl}`
          : `Continue GitHub PR merge for ${prLabel}`,
        `Wait for Task Hosted Close to finish`,
        `git pull --ff-only`,
      ],
      evidence_paths: [taskReadmePath, prMetaPath],
    }),
  });
}

export async function handleProtectedBaseIntegrate(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  base: string;
  branchHeadSha: string | null;
  metaSource: IntegratePrMetaSource;
}): Promise<never> {
  const recordedPrNumber =
    typeof opts.metaSource.pr_number === "number" && opts.metaSource.pr_number > 0
      ? opts.metaSource.pr_number
      : null;
  const observedPr =
    recordedPrNumber === null
      ? await tryLookupExistingGithubPrByBranch({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          branch: opts.branch,
          baseBranch: opts.base,
        })
      : null;
  const prNumber = recordedPrNumber ?? observedPr?.prNumber ?? null;
  const prUrl =
    typeof opts.metaSource.pr_url === "string"
      ? opts.metaSource.pr_url
      : (observedPr?.prUrl ?? null);
  const prUrlTarget = prUrl?.trim() ?? "";
  const prTarget = prUrlTarget.length > 0 ? prUrlTarget : prNumber === null ? "" : String(prNumber);
  const prHint =
    prNumber === null ? `the GitHub PR for branch ${opts.branch}` : `GitHub PR #${prNumber}`;
  let protectedBaseMergeFailure: string | null = null;

  if (prTarget) {
    try {
      const githubMerge = await runProtectedBaseGithubMerge({
        gitRoot: opts.ctx.resolvedProject.gitRoot,
        prTarget,
      });
      await recordProtectedBaseIntegrateHandoff({ ...opts, prNumber, prUrl });
      if (githubMerge.status === "merged") {
        throw new CliError({
          exitCode: exitCodeForError("E_HANDOFF"),
          code: "E_HANDOFF",
          message: `${githubMerge.detail}. Wait for Task Hosted Close to finish the closure tail, then pull ${opts.base}.`,
          context: withDiagnosticContext(
            {
              task_id: opts.taskId,
              branch: opts.branch,
              base_branch: opts.base,
              reason_code: "protected_base_github_merge_completed",
            },
            {
              state: `branch_pr GitHub PR merged for ${opts.taskId}`,
              likelyCause: `branch_pr keeps the integration lane occupied until Task Hosted Close lands the close tail on ${opts.base}`,
              hint: "Wait for Task Hosted Close to finish, then pull the base branch before releasing the queue lane.",
              nextAction: {
                command: `git pull --ff-only`,
                reason: "refresh the base checkout after Task Hosted Close finishes",
                reasonCode: "protected_base_github_merge_completed",
              },
            },
          ),
        });
      }
      throw new CliError({
        exitCode: exitCodeForError("E_HANDOFF"),
        code: "E_HANDOFF",
        message: `${githubMerge.detail}. Wait for GitHub to merge the PR, let Task Hosted Close finish the closure tail, then pull ${opts.base}.`,
        context: withDiagnosticContext(
          {
            task_id: opts.taskId,
            branch: opts.branch,
            base_branch: opts.base,
            reason_code: "protected_base_auto_merge_enabled",
          },
          {
            state: `branch_pr GitHub PR merge queued for ${opts.taskId}`,
            likelyCause: `branch_pr uses the GitHub task PR merge as the primary finalization route for protected base ${opts.base}`,
            hint: "Wait for GitHub to merge the task PR and Task Hosted Close to finish, then pull the base branch.",
            nextAction: {
              command: `git pull --ff-only`,
              reason: "refresh the base checkout after GitHub completes the task PR merge",
              reasonCode: "protected_base_auto_merge_wait",
            },
          },
        ),
      });
    } catch (err) {
      if (!(err instanceof CliError) || err.code !== "E_HANDOFF") throw err;
      if (
        err.context?.reason_code === "protected_base_auto_merge_enabled" ||
        err.context?.reason_code === "protected_base_github_merge_completed"
      ) {
        throw err;
      }
      protectedBaseMergeFailure = err.message;
    }
  }

  await recordProtectedBaseIntegrateHandoff({ ...opts, prNumber, prUrl });
  throw new CliError({
    exitCode: exitCodeForError("E_HANDOFF"),
    code: "E_HANDOFF",
    message:
      `branch_pr integrates into ${opts.base} through the task GitHub PR, not by mutating ${opts.base} directly. ` +
      (protectedBaseMergeFailure ? `${protectedBaseMergeFailure}. ` : "") +
      `Continue the GitHub PR merge route for ${prHint}, let Task Hosted Close finish the closure tail, then pull ${opts.base}.`,
    context: withDiagnosticContext(
      {
        task_id: opts.taskId,
        branch: opts.branch,
        base_branch: opts.base,
        reason_code: "protected_base_integrate_handoff",
      },
      {
        state: `branch_pr integrate is waiting on the GitHub task PR merge for ${opts.taskId}`,
        likelyCause: `the configured branch_pr route finalizes protected base ${opts.base} through the GitHub task PR`,
        hint: "Inspect the persisted lane artifact, continue the GitHub PR merge route, and let Task Hosted Close finish the close tail.",
        nextAction: {
          command: `agentplane task handoff show ${opts.taskId}`,
          reason: "inspect the persisted GitHub PR merge route before continuing",
          reasonCode: "protected_base_integrate_handoff",
        },
      },
    ),
  });
}
