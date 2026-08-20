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
import { requireOpenGithubPrAtHead } from "../../provider-head.js";
import { runProtectedBaseGithubMerge } from "./github-pr-merge.js";
import { runProtectedBaseGitLabMerge } from "./gitlab-mr-merge.js";
import { resolveChangeRequestIdentity } from "../../internal/change-request-provider.js";
import type { RecordedGitHostIdentity } from "../../internal/git-host-identity.js";

type IntegratePrMetaSource = {
  pr_number?: unknown;
  pr_url?: unknown;
  provider?: RecordedGitHostIdentity | null;
};

async function recordProtectedBaseIntegrateHandoff(opts: {
  ctx: CommandContext;
  taskId: string;
  branch: string;
  base: string;
  branchHeadSha: string | null;
  prNumber: number | null;
  prUrl: string | null;
  providerBaseSha: string;
  provider: "github" | "gitlab";
}): Promise<void> {
  const paths = resolveTaskHandoffPaths({
    git_root: opts.ctx.resolvedProject.gitRoot,
    workflow_dir: opts.ctx.config.paths.workflow_dir,
    task_id: opts.taskId,
  });
  const handoffShowCommand = `agentplane task handoff show ${opts.taskId}`;
  const providerLabel = opts.provider === "gitlab" ? "GitLab MR" : "GitHub PR";
  const prLabel =
    typeof opts.prNumber === "number" && opts.prNumber > 0
      ? `${providerLabel} #${opts.prNumber}`
      : `the ${providerLabel} for branch ${opts.branch}`;
  const prUrl = opts.prUrl?.trim() ?? "";
  const prMetaPath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "pr", "meta.json");
  const taskReadmePath = path.join(opts.ctx.config.paths.workflow_dir, opts.taskId, "README.md");
  await writeTaskHandoff({
    paths,
    handoff: buildTaskHandoffArtifact({
      task_id: opts.taskId,
      created_at: new Date().toISOString(),
      from_role: "INTEGRATOR",
      reason: `branch_pr integration is waiting for the ${providerLabel} merge into ${opts.base}.`,
      note:
        prUrl.length > 0
          ? `Continue the primary branch_pr merge route for ${prLabel}: ${prUrl}. After the provider merges it, wait for Task Hosted Close, then pull ${opts.base}.`
          : `Continue the primary branch_pr merge route for ${prLabel}. After the provider merges it, wait for Task Hosted Close, then pull ${opts.base}.`,
      branch: opts.branch,
      base_branch: opts.base,
      head_sha: opts.branchHeadSha,
      workspace_root: opts.ctx.resolvedProject.gitRoot,
      pr_branch: opts.branch,
      route: {
        kind: "protected_base_integrate",
        status: opts.provider === "github" ? "awaiting_github_merge" : "awaiting_provider_merge",
        local_mutation: "not_performed",
        finalize_via:
          opts.provider === "github"
            ? "github_task_pr_merge_then_hosted_close"
            : "provider_change_request_merge_then_hosted_close",
        provider: opts.provider,
        pr_number: opts.prNumber,
        pr_url: prUrl.length > 0 ? prUrl : null,
        provider_base_sha: opts.providerBaseSha,
        handoff_show_command: handoffShowCommand,
        base_pull_command: "git pull --ff-only",
      },
      next_actions: [
        handoffShowCommand,
        prUrl.length > 0
          ? `Continue ${providerLabel} merge for ${prLabel}: ${prUrl}`
          : `Continue ${providerLabel} merge for ${prLabel}`,
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
  preMutationGuard: () => Promise<void>;
}): Promise<never> {
  const recordedPrNumber =
    typeof opts.metaSource.pr_number === "number" && opts.metaSource.pr_number > 0
      ? opts.metaSource.pr_number
      : null;
  const expectedHeadSha = opts.branchHeadSha?.trim() ?? "";
  if (!expectedHeadSha) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message: `Cannot merge protected-base PR for ${opts.taskId}: local branch head is unavailable`,
    });
  }
  const observedPr = await requireOpenGithubPrAtHead({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    branch: opts.branch,
    base: opts.base,
    expectedHeadSha,
    prNumber: recordedPrNumber,
    ...(opts.metaSource.provider ? { recorded: opts.metaSource.provider } : {}),
  });
  const prNumber = observedPr.prNumber;
  const prUrl = observedPr.prUrl;
  const provider = observedPr.provider === "gitlab" ? "gitlab" : "github";
  const providerBaseSha = observedPr.baseSha?.trim() ?? "";
  if (!providerBaseSha) {
    throw new CliError({
      exitCode: exitCodeForError("E_VALIDATION"),
      code: "E_VALIDATION",
      message:
        `Cannot record protected-base handoff for ${opts.taskId}: ` +
        `${provider === "gitlab" ? "GitLab MR" : "GitHub PR"} base SHA is unavailable`,
    });
  }
  const providerLabel = provider === "gitlab" ? "GitLab MR" : "GitHub PR";
  const prUrlTarget = prUrl?.trim() ?? "";
  const prTarget =
    provider === "github" && prUrlTarget.length > 0
      ? prUrlTarget
      : prNumber === null
        ? ""
        : String(prNumber);
  const prHint =
    prNumber === null
      ? `the ${providerLabel} for branch ${opts.branch}`
      : `${providerLabel} #${prNumber}`;
  let protectedBaseMergeFailure: string | null = null;

  if (prTarget) {
    try {
      const providerMerge =
        provider === "gitlab"
          ? {
              ...(await runProtectedBaseGitLabMerge({
                gitRoot: opts.ctx.resolvedProject.gitRoot,
                identity: await resolveChangeRequestIdentity({
                  gitRoot: opts.ctx.resolvedProject.gitRoot,
                  branch: opts.branch,
                  recorded: opts.metaSource.provider ?? null,
                }),
                prNumber,
                expectedHeadSha,
                preMutationGuard: opts.preMutationGuard,
              })),
              provider: "gitlab" as const,
            }
          : {
              ...(await runProtectedBaseGithubMerge({
                gitRoot: opts.ctx.resolvedProject.gitRoot,
                prTarget,
                expectedHeadSha,
                preMutationGuard: opts.preMutationGuard,
              })),
              provider: "github" as const,
            };
      await recordProtectedBaseIntegrateHandoff({
        ...opts,
        prNumber,
        prUrl,
        providerBaseSha,
        provider,
      });
      if (providerMerge.status === "merged") {
        const reasonCode =
          providerMerge.provider === "github"
            ? "protected_base_github_merge_completed"
            : "protected_base_gitlab_merge_completed";
        throw new CliError({
          exitCode: exitCodeForError("E_HANDOFF"),
          code: "E_HANDOFF",
          message: `${providerMerge.detail}. Wait for Task Hosted Close to finish the closure tail, then pull ${opts.base}.`,
          context: withDiagnosticContext(
            {
              task_id: opts.taskId,
              branch: opts.branch,
              base_branch: opts.base,
              reason_code: reasonCode,
            },
            {
              state: `branch_pr ${providerLabel} merged for ${opts.taskId}`,
              likelyCause: `branch_pr keeps the integration lane occupied until Task Hosted Close lands the close tail on ${opts.base}`,
              hint: "Wait for Task Hosted Close to finish, then pull the base branch before releasing the queue lane.",
              nextAction: {
                command: `git pull --ff-only`,
                reason: "refresh the base checkout after Task Hosted Close finishes",
                reasonCode,
              },
            },
          ),
        });
      }
      throw new CliError({
        exitCode: exitCodeForError("E_HANDOFF"),
        code: "E_HANDOFF",
        message: `${providerMerge.detail}. Wait for the provider to merge the change request, let Task Hosted Close finish the closure tail, then pull ${opts.base}.`,
        context: withDiagnosticContext(
          {
            task_id: opts.taskId,
            branch: opts.branch,
            base_branch: opts.base,
            reason_code: "protected_base_auto_merge_enabled",
          },
          {
            state: `branch_pr ${providerLabel} merge queued for ${opts.taskId}`,
            likelyCause: `branch_pr uses the hosted change-request merge as the primary finalization route for protected base ${opts.base}`,
            hint: "Wait for the provider to merge the change request and Task Hosted Close to finish, then pull the base branch.",
            nextAction: {
              command: `git pull --ff-only`,
              reason:
                "refresh the base checkout after the provider completes the change-request merge",
              reasonCode: "protected_base_auto_merge_wait",
            },
          },
        ),
      });
    } catch (err) {
      if (!(err instanceof CliError) || err.code !== "E_HANDOFF") throw err;
      if (
        err.context?.reason_code === "protected_base_auto_merge_enabled" ||
        err.context?.reason_code === "protected_base_github_merge_completed" ||
        err.context?.reason_code === "protected_base_gitlab_merge_completed"
      ) {
        throw err;
      }
      protectedBaseMergeFailure = err.message;
    }
  }

  await recordProtectedBaseIntegrateHandoff({
    ...opts,
    prNumber,
    prUrl,
    providerBaseSha,
    provider,
  });
  throw new CliError({
    exitCode: exitCodeForError("E_HANDOFF"),
    code: "E_HANDOFF",
    message:
      `branch_pr integrates into ${opts.base} through the hosted change request, not by mutating ${opts.base} directly. ` +
      (protectedBaseMergeFailure ? `${protectedBaseMergeFailure}. ` : "") +
      `Continue the ${providerLabel} merge route for ${prHint}, let Task Hosted Close finish the closure tail, then pull ${opts.base}.`,
    context: withDiagnosticContext(
      {
        task_id: opts.taskId,
        branch: opts.branch,
        base_branch: opts.base,
        reason_code: "protected_base_integrate_handoff",
      },
      {
        state: `branch_pr integrate is waiting on the ${providerLabel} merge for ${opts.taskId}`,
        likelyCause: `the configured branch_pr route finalizes protected base ${opts.base} through the hosted change request`,
        hint: `Inspect the persisted lane artifact, continue the ${providerLabel} merge route, and let Task Hosted Close finish the close tail.`,
        nextAction: {
          command: `agentplane task handoff show ${opts.taskId}`,
          reason: `inspect the persisted ${providerLabel} merge route before continuing`,
          reasonCode: "protected_base_integrate_handoff",
        },
      },
    ),
  });
}
