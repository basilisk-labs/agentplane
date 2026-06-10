import { findWorktreeForBranch } from "@agentplaneorg/core/git";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { resolvePrFlowStatus, type PrFlowStatusReport } from "../pr/flow-status.js";
import { resolveCleanupCandidates } from "../branch/cleanup-merged.js";
import { buildTaskResumeContext, type TaskResumeContext } from "../task/handoff.shared.js";
import { resolveBatchOwnership } from "./route-batch-ownership.js";
import { deriveBlockers } from "./route-decision-blockers.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import {
  taskSummary,
  type RouteAmbiguity,
  type RouteRepairStep,
  type TaskRouteDecision,
} from "./route-decision-types.js";
import { deriveRouteExecutionPacket, deriveRouteOracle } from "./route-oracle.js";
import { workStartCommand } from "./work-start-command.js";

import { loadBackendTask, loadCommandContext, type CommandContext } from "./task-backend.js";
import { buildRouteSourceConfidenceBase } from "./source-confidence.js";
import { hasClosedPreMergeClosureMarker, parsePrMeta } from "./pr-meta.js";
import { taskCloseAlreadyRecordedOnBase } from "../task/close-tail-state.js";
import { humanInputAnswerCommand } from "../task/human-input.js";

function isCliUsageOrIo(err: unknown): boolean {
  return err instanceof CliError && (err.code === "E_USAGE" || err.code === "E_IO");
}

function deriveCheckoutRole(
  resume: TaskResumeContext,
): TaskRouteDecision["workspace"]["checkoutRole"] {
  if (!resume.branch || !resume.base_branch) return "unknown";
  return resume.branch === resume.base_branch ? "base" : "task_worktree";
}

async function findWorktreePath(cwd: string, branch: string | null): Promise<string | null> {
  if (!branch) return null;
  return findWorktreeForBranch(cwd, branch).catch(() => null);
}

function inferredTaskBranch(
  resume: TaskResumeContext,
  prFlow: PrFlowStatusReport | null,
): string | null {
  if (prFlow?.branch.name) return prFlow.branch.name;
  if (resume.pr_branch) return resume.pr_branch;
  if (resume.branch && resume.base_branch && resume.branch !== resume.base_branch) {
    return resume.branch;
  }
  return null;
}

function deriveApprovalContract(
  ctx: CommandContext,
  nextAction: TaskRouteDecision["nextAction"],
): TaskRouteDecision["approval"] {
  const approvals = ctx.config.agents?.approvals;
  const routeRequiresApproval = nextAction.requiresApproval === true;
  return {
    runtime: {
      requirePlan: approvals?.require_plan === true,
      requireNetwork: approvals?.require_network === true,
      requireVerify: approvals?.require_verify === true,
    },
    gatewayMutationApprovalRequired: true,
    effectiveMutationApprovalRequired: routeRequiresApproval,
    routeRequiresApproval,
  };
}

function deriveAmbiguities(opts: {
  decision: Omit<TaskRouteDecision, "ambiguities" | "repairPlan" | "sourceConfidence">;
}): RouteAmbiguity[] {
  const ambiguities: RouteAmbiguity[] = [];
  const blockerCodes = new Set(opts.decision.blockers.map((blocker) => blocker.code));
  if (
    opts.decision.workflowMode === "branch_pr" &&
    blockerCodes.has("on_base_checkout") &&
    opts.decision.nextAction.code !== "start_or_recover_worktree" &&
    opts.decision.nextAction.code !== "merge_close_tail" &&
    opts.decision.nextAction.code !== "sync_hosted_close" &&
    opts.decision.nextAction.code !== "repair_included_batch_metadata"
  ) {
    ambiguities.push({
      code: "base_checkout_owner_scope",
      summary:
        "current checkout is the base branch while branch_pr owner-scoped work normally belongs in the task worktree",
      resolution:
        "use the selected next action only if it is a base-lane action; otherwise run agentplane work resume <task-id>",
    });
  }
  if (opts.decision.nextAction.requiresApproval && !opts.decision.nextAction.command) {
    ambiguities.push({
      code: "approval_without_local_command",
      summary: "the selected next action requires approval but has no safe local command",
      resolution:
        "treat this as a human/provider action and re-run task status --route after the external action completes",
    });
  }
  if (blockerCodes.has("close_tail_open") && opts.decision.nextAction.code === "merge_close_tail") {
    ambiguities.push({
      code: "close_tail_provider_lane",
      summary: "hosted close-tail is open, so local task mutation is not the next source of truth",
      resolution:
        "wait for stable hosted checks and merge the close-tail PR through the provider, then pull/reconcile base state",
    });
  }
  return ambiguities;
}

function deriveRepairPlan(
  decision: Omit<TaskRouteDecision, "repairPlan" | "sourceConfidence">,
): RouteRepairStep[] {
  const steps: RouteRepairStep[] = [];
  const id = decision.task.id;
  if (decision.nextAction.code === "reconcile_included_task_closure") {
    return [
      {
        code: "reconcile_included_task_closure",
        command: decision.nextAction.command,
        summary: "reconcile landed included-task closure metadata before opening new work",
        mutates: true,
      },
    ];
  }
  for (const blocker of decision.blockers) {
    if (blocker.code === "missing_pr_branch") {
      steps.push({
        code: "create_worktree",
        command: workStartCommand(decision.task),
        summary: "create the missing branch_pr worktree",
        mutates: true,
      });
    }
    if (blocker.code === "remote_pr_missing") {
      steps.push({
        code: "open_pr",
        command: `agentplane pr open ${id} --author ${decision.task.owner}`,
        summary: "create or relink remote PR artifacts",
        mutates: true,
      });
    }
    if (blocker.code === "pr_meta_stale") {
      steps.push({
        code: "update_pr_artifacts",
        command: `agentplane pr update ${id}`,
        summary: "refresh stale local PR metadata",
        mutates: true,
      });
    }
    if (blocker.code === "close_tail_missing") {
      steps.push({
        code: "open_close_tail",
        command: `agentplane task hosted-close-pr ${id}`,
        summary: "open the hosted close-tail PR",
        mutates: true,
      });
    }
    if (blocker.code === "runner_alive") {
      steps.push({
        code: "inspect_runner",
        command: `agentplane task resume-context ${id}`,
        summary: "inspect active runner state before reclaiming",
        mutates: false,
      });
    }
    if (blocker.code === "plan_not_approved") {
      steps.push({
        code: "approve_plan",
        command: `agentplane task plan approve ${id} --by ORCHESTRATOR`,
        summary: "approve the task plan before owner-scoped execution",
        mutates: true,
      });
    }
    if (blocker.code === "human_input_required") {
      steps.push({
        code: "answer_user_question",
        command: humanInputAnswerCommand(id),
        summary: "answer the open user question before continuing task execution",
        mutates: true,
      });
    }
    if (blocker.code === "dirty_task_artifacts") {
      steps.push({
        code: "commit_direct_task_artifacts",
        command: `agentplane commit ${id} --close --unstage-others`,
        summary: "commit the tracked direct-workflow task artifacts left by manual close handling",
        mutates: true,
      });
    }
    if (blocker.code === "on_base_checkout") {
      steps.push({
        code: "resume_worktree",
        command: `agentplane work resume ${id}`,
        summary: "switch to or inspect the dedicated task worktree before continuing",
        mutates: false,
      });
    }
    if (blocker.code === "branch_head_missing") {
      steps.push({
        code: "fetch_branch",
        command: decision.workspace.prBranch
          ? `git fetch origin ${decision.workspace.prBranch}`
          : null,
        summary: "fetch or recover the recorded task branch before continuing",
        mutates: true,
      });
    }
    if (blocker.code === "close_tail_open") {
      steps.push({
        code: "wait_close_tail",
        command: null,
        summary: "wait for hosted checks and merge the open close-tail PR through the provider",
        mutates: false,
      });
    }
    if (blocker.code === "missing_included_batch_metadata") {
      steps.push({
        code: "repair_included_batch_metadata",
        command: null,
        summary:
          "restore structured extensions.branch_pr_batch or primary PR batch metadata before reconciling the included task",
        mutates: false,
      });
    }
  }
  if (steps.length === 0) {
    steps.push({
      code: decision.blockers.length === 0 ? "no_repair_needed" : "unmapped_blocker",
      command: decision.nextAction.command,
      summary:
        decision.blockers.length === 0
          ? decision.nextAction.summary
          : "inspect blockers before continuing; no automatic repair is available",
      mutates: false,
    });
  }
  return steps;
}

function hasRemoteProviderEvidence(prFlow: PrFlowStatusReport | null): boolean {
  if (!prFlow) return false;
  return (
    prFlow.pr.source === "lookup" ||
    "provider" in prFlow.closeTail ||
    prFlow.hostedChecks.checked ||
    prFlow.reviewThreads.checked
  );
}

async function resolveLocalRecordedCloseFlow(opts: {
  ctx: CommandContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
}): Promise<PrFlowStatusReport | null> {
  const metaPath = path.join(
    opts.ctx.resolvedProject.gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.task.id,
    "pr",
    "meta.json",
  );
  try {
    const meta = parsePrMeta(await readFile(metaPath, "utf8"), opts.task.id);
    const trimmedBase = meta.base?.trim();
    const base = trimmedBase && trimmedBase.length > 0 ? trimmedBase : "main";
    if (meta.status === "OPEN" && hasClosedPreMergeClosureMarker(meta)) {
      return {
        task: {
          id: opts.task.id,
          status: opts.task.status,
          verification: opts.task.verification?.state ?? null,
        },
        branch: {
          name: meta.branch ?? null,
          headSha: null,
          metaHeadSha: meta.head_sha ?? null,
        },
        pr: {
          provider: "github",
          state: "OPEN",
          source: "metadata",
          prNumber: typeof meta.pr_number === "number" ? meta.pr_number : null,
          prUrl: meta.pr_url ?? null,
          base,
          headSha: meta.head_sha ?? null,
          mergeCommit: null,
        },
        closeTail: {
          state: "not_applicable",
          reason: "pre-merge closure records finalization before implementation PR merge",
        },
        hostedChecks: { checked: false, reason: "remote lookup skipped" },
        reviewThreads: { checked: false, reason: "remote lookup skipped" },
        queue: { present: false },
        handoff: { present: false },
        nextAction: `wait hosted checks, then merge remote PR ${meta.pr_number ?? meta.branch ?? opts.task.id} through the configured provider API`,
      };
    }
    if (meta.status !== "MERGED" || !meta.merge_commit) return null;
    const remoteRecorded = await taskCloseAlreadyRecordedOnBase({
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      taskId: opts.task.id,
      baseBranch: `origin/${base}`,
    }).catch(() => false);
    const recorded = remoteRecorded
      ? true
      : await taskCloseAlreadyRecordedOnBase({
          gitRoot: opts.ctx.resolvedProject.gitRoot,
          workflowDir: opts.ctx.config.paths.workflow_dir,
          taskId: opts.task.id,
          baseBranch: base,
        }).catch(() => false);
    if (!recorded) return null;
    return {
      task: {
        id: opts.task.id,
        status: opts.task.status,
        verification: opts.task.verification?.state ?? null,
      },
      branch: {
        name: meta.branch ?? null,
        headSha: null,
        metaHeadSha: meta.head_sha ?? null,
      },
      pr: {
        provider: "github",
        state: "MERGED",
        source: "metadata",
        prNumber: typeof meta.pr_number === "number" ? meta.pr_number : null,
        prUrl: meta.pr_url ?? null,
        base,
        headSha: meta.head_sha ?? null,
        mergeCommit: meta.merge_commit,
      },
      closeTail: { state: "recorded_on_base", base },
      hostedChecks: { checked: false, reason: "remote lookup skipped" },
      reviewThreads: { checked: false, reason: "remote lookup skipped" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "pull main; task close evidence is already recorded upstream",
    };
  } catch {
    return null;
  }
}

function buildRouteSourceConfidence(opts: {
  remoteEnabled: boolean;
  remoteResolved: boolean;
}): TaskRouteDecision["sourceConfidence"] {
  return buildRouteSourceConfidenceBase({
    ...opts,
    batchOwnershipSource: "pr_artifact",
  });
}

async function resolveDoneCleanupCandidateCount(opts: {
  ctx: CommandContext;
  resume: TaskResumeContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
}): Promise<number | null> {
  if (opts.ctx.config.workflow_mode !== "branch_pr") return null;
  if (String(opts.task.status).toUpperCase() !== "DONE") return null;
  const baseBranch = opts.resume.base_branch?.trim() ?? "";
  if (!baseBranch) return null;
  try {
    const candidates = await resolveCleanupCandidates({
      ctx: opts.ctx,
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      baseBranch,
    });
    return candidates.length;
  } catch {
    return null;
  }
}

export async function buildTaskRouteDecision(opts: {
  ctx?: CommandContext;
  cwd: string;
  includeRemote?: boolean;
  rootOverride?: string | null;
  taskId: string;
}): Promise<TaskRouteDecision> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const { task } = await loadBackendTask({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    taskId: opts.taskId,
  });
  const resume = await buildTaskResumeContext({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    task_id: opts.taskId,
  });
  let prFlow: PrFlowStatusReport | null = null;
  const remoteEnabled = ctx.config.workflow_mode === "branch_pr" && opts.includeRemote !== false;
  if (remoteEnabled) {
    try {
      prFlow = await resolvePrFlowStatus({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? undefined,
        taskId: opts.taskId,
      });
    } catch (err) {
      if (!isCliUsageOrIo(err)) throw err;
    }
  } else if (ctx.config.workflow_mode === "branch_pr") {
    prFlow = await resolveLocalRecordedCloseFlow({ ctx, task });
  }
  const batchOwnership =
    ctx.config.workflow_mode === "branch_pr"
      ? await resolveBatchOwnership({ ctx, task })
      : { role: "none" as const };
  const cleanupCandidateCount = await resolveDoneCleanupCandidateCount({ ctx, resume, task });
  const blockers = await deriveBlockers({
    ctx,
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
    batchOwnership,
  });
  const nextAction = deriveNextAction({
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
    cleanupCandidateCount,
    blockers,
    batchOwnership,
  });
  const baseCheckoutPath = await findWorktreePath(ctx.resolvedProject.gitRoot, resume.base_branch);
  const taskWorktreePath =
    ctx.config.workflow_mode === "branch_pr"
      ? await findWorktreePath(ctx.resolvedProject.gitRoot, inferredTaskBranch(resume, prFlow))
      : null;
  const oracle = deriveRouteOracle({
    task,
    workflowMode: ctx.config.workflow_mode,
    nextAction,
    blockers,
    batchOwnership,
    paths: {
      baseCheckoutPath,
      taskWorktreePath,
      primaryTaskWorktreePath:
        batchOwnership.role === "included"
          ? await findWorktreePath(ctx.resolvedProject.gitRoot, batchOwnership.branch)
          : taskWorktreePath,
      currentCheckoutPath: resume.workspace_root,
    },
  });
  const executionPacket = deriveRouteExecutionPacket({
    task,
    nextAction,
    blockers,
    oracle,
  });
  const partial = {
    task: taskSummary(task),
    workflowMode: ctx.config.workflow_mode,
    workspace: {
      root: resume.workspace_root,
      branch: resume.branch,
      baseBranch: resume.base_branch,
      headSha: resume.head_sha,
      prBranch: resume.pr_branch,
      checkoutRole: deriveCheckoutRole(resume),
      baseCheckoutPath,
      taskWorktreePath,
    },
    approval: deriveApprovalContract(ctx, nextAction),
    batchOwnership,
    prFlow,
    cleanupCandidateCount,
    blockers,
    nextAction,
    oracle,
    executionPacket,
  };
  const withAmbiguities = { ...partial, ambiguities: deriveAmbiguities({ decision: partial }) };
  return {
    ...withAmbiguities,
    repairPlan: deriveRepairPlan(withAmbiguities),
    sourceConfidence: buildRouteSourceConfidence({
      remoteEnabled,
      remoteResolved: hasRemoteProviderEvidence(prFlow),
    }),
  };
}
