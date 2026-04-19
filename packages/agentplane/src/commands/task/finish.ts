import { mapBackendError } from "../../cli/error-map.js";
import { infoMessage, invalidValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

import { ensureActionApproved } from "../shared/approval-requirements.js";
import { ensureReconciledBeforeMutation } from "../shared/reconcile-check.js";
import {
  backendUsesLocalTaskStore,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { getTaskStore } from "../shared/task-store.js";
import { collectTaskIncidents, renderIncidentCollectionPlanOutcome } from "../incidents/shared.js";
import {
  createTaskCloseCommit,
  existingCommitInfo,
  loadTaskForFinish,
  type LoadedFinishTask,
  type ResolvedCommitInfo,
  writeFinishedTasks,
} from "./finish-shared.js";

import { clearDirectWorkLockIfMatches, ensureFinishRunsOnBaseBranch, materializeBranchPrCloseTail } from "./finish-close.js";
import { appendFinishStructuredFinding, type FinishStructuredFindingInput } from "./finish-findings.js";
import {
  defaultCommitEmojiForStatus,
  enforceStatusCommitPolicy,
  prepareTaskTransitionComment,
  readCommitInfo,
  requireStructuredComment,
  runTaskTransitionCommentCommit,
} from "./shared.js";

export async function cmdFinish(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskIds: string[];
  author: string;
  body: string;
  result?: string;
  risk?: "low" | "med" | "high";
  breaking: boolean;
  commit?: string;
  force: boolean;
  yes?: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji?: string;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  closeCommit?: boolean;
  noCloseCommit?: boolean;
  closeUnstageOthers?: boolean;
  baseBranchOverride?: string;
  observation?: string;
  impact?: string;
  resolution?: string;
  localOnly?: boolean;
  repoFixable?: boolean;
  incidentScope?: string;
  incidentTags?: string[];
  incidentMatch?: string[];
  incidentAdvice?: string;
  incidentRule?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await ensureReconciledBeforeMutation({ ctx, command: "finish" });
    await ensureFinishRunsOnBaseBranch({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      baseBranchOverride: opts.baseBranchOverride,
    });
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "finish --force",
      });
    }
    const { prefix, min_chars: minChars } = ctx.config.tasks.comments.verified;
    requireStructuredComment(opts.body, prefix, minChars);
    const statusCommitRequested = opts.statusCommit;
    if ((opts.commitFromComment || statusCommitRequested) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    if (opts.commitFromComment && statusCommitRequested) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--commit-from-comment cannot be combined with --status-commit in finish; use one deterministic commit path.",
      });
    }
    if ((opts.closeCommit || opts.noCloseCommit) && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit/--no-close-commit requires exactly one task id",
      });
    }
    if (opts.closeCommit && opts.noCloseCommit) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--close-commit and --no-close-commit are mutually exclusive",
      });
    }
    if ((opts.closeCommit || opts.noCloseCommit) && (opts.commitFromComment || opts.statusCommit)) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--close-commit/--no-close-commit cannot be combined with --commit-from-comment/--status-commit",
      });
    }
    const primaryTaskId = opts.taskIds[0] ?? "";
    if ((opts.commitFromComment || statusCommitRequested) && !primaryTaskId) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment/--status-commit requires exactly one task id",
      });
    }
    if (opts.commitAutoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-auto-allow is disabled; pass explicit --commit-allow <path-prefix>.",
      });
    }
    if (opts.statusCommitAutoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--status-commit-auto-allow is disabled; pass explicit --status-commit-allow <path-prefix>.",
      });
    }
    if (opts.commitFromComment && opts.commitAllow.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--commit-from-comment requires --commit-allow <path-prefix>",
      });
    }
    if (statusCommitRequested && opts.statusCommitAllow.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--status-commit requires --status-commit-allow <path-prefix>",
      });
    }

    const useStore = backendUsesLocalTaskStore(ctx);
    const store = useStore ? getTaskStore(ctx) : null;
    const backendWritesTaskReadmes = ctx.taskBackend.capabilities.writes_task_readmes === true;
    const defaultDirectCloseCommit =
      ctx.config.workflow_mode === "direct" &&
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      !opts.commitFromComment &&
      !statusCommitRequested;
    const defaultBranchPrCloseCommit =
      ctx.config.workflow_mode === "branch_pr" &&
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      !opts.commitFromComment &&
      !statusCommitRequested;
    const statusPathRequiresTrackedTaskCommit =
      backendWritesTaskReadmes &&
      opts.taskIds.length === 1 &&
      (opts.commitFromComment || statusCommitRequested);
    const shouldCloseCommit =
      opts.closeCommit === true ||
      statusPathRequiresTrackedTaskCommit ||
      (defaultDirectCloseCommit && opts.noCloseCommit !== true) ||
      (defaultBranchPrCloseCommit && opts.noCloseCommit !== true);

    const metaTaskId = opts.taskIds.length === 1 ? (opts.taskIds[0] ?? "") : "";
    const wantMeta =
      typeof opts.result === "string" || typeof opts.risk === "string" || opts.breaking === true;
    const resultProvided = typeof opts.result === "string";
    if (wantMeta && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--result/--risk/--breaking requires exactly one task id",
      });
    }
    const resultSummary = typeof opts.result === "string" ? opts.result.trim() : "";
    const riskLevel = opts.risk;
    const breaking = opts.breaking === true;
    const finishFinding =
      typeof opts.observation === "string" &&
      typeof opts.impact === "string" &&
      typeof opts.resolution === "string"
        ? {
            observation: opts.observation,
            impact: opts.impact,
            resolution: opts.resolution,
            localOnly: opts.localOnly === true,
            repoFixable: opts.repoFixable === true,
            incidentScope: opts.incidentScope,
            incidentTags: opts.incidentTags ?? [],
            incidentMatch: opts.incidentMatch ?? [],
            incidentAdvice: opts.incidentAdvice,
            incidentRule: opts.incidentRule,
          }
        : null;
    if (finishFinding && opts.taskIds.length !== 1) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "--observation/--impact/--resolution and incident finding options require exactly one task id",
      });
    }
    if (finishFinding && primaryTaskId) {
      await loadTaskForFinish({
        ctx,
        store,
        useStore,
        taskId: primaryTaskId,
        taskCount: opts.taskIds.length,
        metaTaskId,
        resultProvided,
        resultSummary,
        force: opts.force,
        capturePrimaryLifecycleMeta: false,
      });
      await appendFinishStructuredFinding({
        ctx,
        taskId: primaryTaskId,
        author: opts.author,
        finding: finishFinding,
      });
    }

    let primaryStatusFrom: string | null = null;
    let primaryTag: string | null = null;
    const loadedTasks: LoadedFinishTask[] = [];
    for (const taskId of opts.taskIds) {
      const loaded = await loadTaskForFinish({
        ctx,
        store,
        useStore,
        taskId,
        taskCount: opts.taskIds.length,
        metaTaskId,
        resultProvided,
        resultSummary,
        force: opts.force,
        capturePrimaryLifecycleMeta: taskId === primaryTaskId,
      });
      loadedTasks.push(loaded.loaded);
      if (taskId === primaryTaskId) {
        primaryStatusFrom = loaded.primaryStatusFrom;
        primaryTag = loaded.primaryTag;
      }
    }

    for (const taskId of opts.taskIds) {
      const loadedTask = loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
      await collectTaskIncidents({
        ctx,
        taskId,
        task: loadedTask?.task ?? null,
        write: false,
      });
    }

    const tasksMissingCommit = loadedTasks
      .filter(({ task }) => !existingCommitInfo(task))
      .map(({ taskId }) => taskId);
    if (!opts.commitFromComment && !opts.commit && tasksMissingCommit.length > 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message:
          "finish requires --commit <hash> or existing task commit metadata on every task; implicit HEAD fallback was removed.",
      });
    }

    if (opts.commitFromComment || statusCommitRequested) {
      enforceStatusCommitPolicy({
        policy: ctx.config.status_commit_policy,
        action: "finish",
        confirmed: opts.confirmStatusCommit,
        quiet: opts.quiet,
        statusFrom: primaryStatusFrom ?? "UNKNOWN",
        statusTo: "DONE",
      });
    }

    const gitRoot = ctx.resolvedProject.gitRoot;
    let taskCommitInfo: ResolvedCommitInfo | null = opts.commit
      ? await readCommitInfo(gitRoot, opts.commit)
      : null;
    const preparedComment =
      opts.commitFromComment || statusCommitRequested
        ? prepareTaskTransitionComment({
            body: opts.body,
            enabled: true,
            config: ctx.config,
          })
        : null;

    if (opts.commitFromComment) {
      if (typeof opts.commitEmoji === "string" && opts.commitEmoji.trim() !== "✅") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage(
            "--commit-emoji",
            opts.commitEmoji,
            "✅ (finish commits must use a checkmark)",
          ),
        });
      }
      taskCommitInfo = await runTaskTransitionCommentCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        primaryTag: primaryTag ?? "meta",
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: preparedComment?.formattedComment ?? null,
        emoji: opts.commitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.commitAllow,
        autoAllow: false,
        allowTasks: opts.commitAllowTasks,
        requireClean: opts.commitRequireClean,
        quiet: opts.quiet,
        progressMessage: "creating commit from verification comment",
        resolveExecutorAgent: true,
      });
    }

    if (statusCommitRequested) {
      if (typeof opts.statusCommitEmoji === "string" && opts.statusCommitEmoji.trim() !== "✅") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: invalidValueMessage(
            "--status-commit-emoji",
            opts.statusCommitEmoji,
            "✅ (finish commits must use a checkmark)",
          ),
        });
      }
      await runTaskTransitionCommentCommit({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: primaryTaskId,
        primaryTag: primaryTag ?? "meta",
        author: opts.author,
        statusFrom: primaryStatusFrom ?? undefined,
        statusTo: "DONE",
        commentBody: opts.body,
        formattedComment: preparedComment?.formattedComment ?? null,
        emoji: opts.statusCommitEmoji ?? defaultCommitEmojiForStatus("DONE"),
        allow: opts.statusCommitAllow,
        autoAllow: false,
        allowTasks: true,
        requireClean: opts.statusCommitRequireClean,
        quiet: opts.quiet,
        progressMessage: "creating status commit",
        resolveExecutorAgent: true,
      });
    }

    await writeFinishedTasks({
      ctx,
      loadedTasks,
      metaTaskId,
      author: opts.author,
      body: opts.body,
      force: opts.force,
      resultProvided,
      resultSummary,
      riskLevel,
      breaking,
      taskCommitInfo,
    });

    const incidentPlans = [];
    const incidentRegistryPaths: string[][] = [];
    for (const taskId of opts.taskIds) {
      const loadedTask = loadedTasks.find((candidate) => candidate.taskId === taskId) ?? null;
      const collected = await collectTaskIncidents({
        ctx,
        taskId,
        task: loadedTask?.task ?? null,
        write: true,
      });
      incidentPlans.push(collected.plan);
      incidentRegistryPaths.push(collected.registryPaths);
    }
    const promotedIncidents = incidentPlans.reduce((sum, plan) => sum + plan.promotable.length, 0);

    // tasks.json is export-only; generated via `agentplane task export`.

    if (shouldCloseCommit && primaryTaskId) {
      if (!opts.quiet) {
        process.stdout.write(
          `${infoMessage("task marked DONE; creating deterministic close commit")}\n`,
        );
      }
      const closeUnstageOthers = opts.closeCommit === true && opts.closeUnstageOthers === true;
      if (ctx.config.workflow_mode === "branch_pr") {
        const closeBranch = await materializeBranchPrCloseTail({
          ctx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          taskId: primaryTaskId,
          baseBranchOverride: opts.baseBranchOverride,
          quiet: opts.quiet,
          closeUnstageOthers,
          allowPolicy: promotedIncidents > 0,
        });
        if (!opts.quiet) {
          if (closeBranch) {
            process.stdout.write(
              `${infoMessage(
                `branch_pr close tail ready on ${closeBranch}; push that branch and open it with task hosted-close-pr if hosted automation does not create the closure PR for you.`,
              )}\n`,
            );
          } else {
            process.stdout.write(
              `${infoMessage(
                "branch_pr close tail already exists on base; skipping local task-close branch materialization.",
              )}\n`,
            );
          }
        }
      } else {
        await createTaskCloseCommit({
          ctx,
          cwd: opts.cwd,
          rootOverride: opts.rootOverride,
          taskId: primaryTaskId,
          baseBranchOverride: opts.baseBranchOverride,
          quiet: opts.quiet,
          closeUnstageOthers,
          allowPolicy: promotedIncidents > 0,
        });
      }
    }

    if (ctx.config.workflow_mode === "direct") {
      await clearDirectWorkLockIfMatches({
        agentplaneDir: ctx.resolvedProject.agentplaneDir,
        taskIds: opts.taskIds,
      });
    }

    if (!opts.quiet) {
      const incidentPlan = incidentPlans[0] ?? {
        candidates: [],
        skipped: [],
        promotable: [],
        duplicates: [],
      };
      process.stdout.write(
        `${infoMessage(
          renderIncidentCollectionPlanOutcome(incidentPlan, {
            wrote: promotedIncidents > 0,
            context: "finish",
            promotedIds: incidentPlan.promotable.map((item) => item.entry.id),
            registryPaths: incidentRegistryPaths[0] ?? [],
            taskId: opts.taskIds[0] ?? null,
          }),
        )}\n`,
      );
      process.stdout.write(`${successMessage("finished")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "finish", root: opts.rootOverride ?? null });
  }
}
