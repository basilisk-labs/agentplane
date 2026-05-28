import { findWorktreeForBranch } from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";
import { resolvePrFlowStatus, type PrFlowStatusReport } from "../pr/flow-status.js";
import { buildTaskResumeContext, type TaskResumeContext } from "../task/handoff.shared.js";
import { resolveBatchOwnership, type RouteBatchOwnership } from "./route-batch-ownership.js";
import { deriveBlockers } from "./route-decision-blockers.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import {
  taskSummary,
  type RouteAmbiguity,
  type RouteRepairStep,
  type TaskRouteDecision,
} from "./route-decision-types.js";
import {
  deriveRouteExecutionPacket,
  deriveRouteOracle,
  type RouteBlocker,
} from "./route-oracle.js";
import { workStartCommand } from "./work-start-command.js";

import { loadBackendTask, loadCommandContext, type CommandContext } from "./task-backend.js";
import {
  buildRouteSourceConfidenceBase,
  type SourceConfidence as RouteSourceConfidence,
} from "./source-confidence.js";

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

function deriveApprovalContract(ctx: CommandContext): TaskRouteDecision["approval"] {
  const approvals = ctx.config.agents?.approvals;
  return {
    runtime: {
      requirePlan: approvals?.require_plan === true,
      requireNetwork: approvals?.require_network === true,
      requireVerify: approvals?.require_verify === true,
    },
    gatewayMutationApprovalRequired: true,
    effectiveMutationApprovalRequired: true,
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
    opts.decision.nextAction.code !== "merge_close_tail"
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

function buildRouteSourceConfidence(opts: {
  remoteEnabled: boolean;
  remoteResolved: boolean;
}): TaskRouteDecision["sourceConfidence"] {
  return buildRouteSourceConfidenceBase({
    ...opts,
    batchOwnershipSource: "pr_artifact",
  });
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
  }
  const batchOwnership =
    ctx.config.workflow_mode === "branch_pr"
      ? await resolveBatchOwnership({ ctx, task })
      : { role: "none" as const };
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
    approval: deriveApprovalContract(ctx),
    batchOwnership,
    prFlow,
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
