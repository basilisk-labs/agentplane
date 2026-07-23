import { findWorktreeForBranch, gitRevParse } from "@agentplaneorg/core/git";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { resolvePrFlowStatus, type PrFlowStatusReport } from "../pr/flow-status.js";
import { resolvePrHeadPublicationStatus } from "../pr/head-publication.js";
import { resolveCleanupPlan } from "../branch/cleanup-merged-proof.js";
import { buildTaskResumeContext, type TaskResumeContext } from "../task/handoff.shared.js";
import { resolveBatchOwnership } from "./route-batch-ownership.js";
import {
  addTaskWorktreeCleanlinessBlocker,
  addVerificationRequiredBlocker,
  deriveBlockers,
} from "./route-decision-blockers.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import {
  taskSummary,
  type RouteCleanupProbe,
  type TaskRouteDecision,
} from "./route-decision-types.js";
import { deriveRouteExecutionPacket, deriveRouteOracle } from "./route-oracle.js";
import { deriveRouteAmbiguities, deriveRouteRepairPlan } from "./route-decision-repair.js";

import {
  loadBackendTask,
  loadCommandContext,
  resolveTaskBranchFromContext,
  type CommandContext,
} from "./task-backend.js";
import { buildRouteSourceConfidenceBase } from "./source-confidence.js";
import { hasClosedPreMergeClosureMarker, parsePrMeta } from "./pr-meta.js";
import { taskCloseAlreadyRecordedOnBase } from "../task/close-tail-state.js";
import {
  inspectTaskWorktreeCleanliness,
  type TaskWorktreeCleanliness,
} from "./task-worktree-cleanliness.js";

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

function routeGatePriority(code: string): number {
  if (
    code === "plan_not_approved" ||
    code === "human_input_required" ||
    code === "missing_pr_branch" ||
    code === "runner_alive" ||
    code === "implementation_rework_required"
  ) {
    return 0;
  }
  if (code === "task_worktree_dirty" || code === "task_worktree_state_unavailable") return 1;
  if (code === "verification_required") return 2;
  return 3;
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
}) {
  return deriveRouteAmbiguities(opts);
}

function deriveRepairPlan(decision: Omit<TaskRouteDecision, "repairPlan" | "sourceConfidence">) {
  return deriveRouteRepairPlan(decision);
}

function hasRemoteProviderEvidence(prFlow: PrFlowStatusReport | null): boolean {
  if (!prFlow) return false;
  const implementationPrObserved =
    prFlow.providerObservation?.state === "found" ||
    prFlow.providerObservation?.state === "not_found";
  const closeTailObserved =
    prFlow.closeTail.state === "open" ||
    prFlow.closeTail.state === "merged" ||
    prFlow.closeTail.state === "not_found";
  return (
    implementationPrObserved ||
    closeTailObserved ||
    prFlow.hostedChecks.checked ||
    prFlow.reviewThreads.checked
  );
}

async function resolveLocalRecordedCloseFlow(opts: {
  ctx: CommandContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
  onDiagnostic?: (message: string) => void;
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
    const branchHeadSha = meta.branch
      ? await gitRevParse(opts.ctx.resolvedProject.gitRoot, [meta.branch]).catch(() => null)
      : null;
    const publication = await resolvePrHeadPublicationStatus({
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      branch: meta.branch ?? null,
      localHeadSha: branchHeadSha ?? meta.head_sha ?? null,
      providerObservation: null,
    });
    if (meta.status === "OPEN" || meta.status === "CLOSED") {
      const preMergeClosed = hasClosedPreMergeClosureMarker(meta);
      return {
        task: {
          id: opts.task.id,
          status: opts.task.status,
          verification: opts.task.verification?.state ?? null,
        },
        branch: {
          name: meta.branch ?? null,
          headSha: branchHeadSha ?? meta.head_sha ?? null,
          metaHeadSha: meta.head_sha ?? null,
        },
        pr: {
          provider: "github",
          state: meta.status,
          source: "metadata",
          prNumber: typeof meta.pr_number === "number" ? meta.pr_number : null,
          prUrl: meta.pr_url ?? null,
          base,
          headSha: meta.head_sha ?? null,
          mergeCommit: null,
        },
        publication,
        closeTail: {
          state: "not_applicable",
          reason: preMergeClosed
            ? "pre-merge closure records finalization before implementation PR merge"
            : `implementation PR is ${meta.status.toLowerCase()}; pre-merge closure is still recorded on the task branch`,
        },
        hostedChecks: { checked: false, reason: "remote lookup skipped" },
        reviewThreads: { checked: false, reason: "remote lookup skipped" },
        queue: { present: false },
        handoff: { present: false },
        nextAction:
          meta.status === "OPEN"
            ? `wait hosted checks, then merge remote PR ${meta.pr_number ?? meta.branch ?? opts.task.id} through the configured provider API`
            : "inspect or reopen the remote PR before integrating",
      };
    }
    if (meta.status !== "MERGED" || !meta.merge_commit) {
      if (!meta.branch) return null;
      return {
        task: {
          id: opts.task.id,
          status: opts.task.status,
          verification: opts.task.verification?.state ?? null,
        },
        branch: {
          name: meta.branch,
          headSha: branchHeadSha ?? meta.head_sha ?? null,
          metaHeadSha: meta.head_sha ?? null,
        },
        pr: { provider: "github", state: "not_found", source: "metadata" },
        publication,
        closeTail: {
          state: "not_applicable",
          reason: "implementation PR identity is not recorded",
        },
        hostedChecks: { checked: false, reason: "remote lookup skipped" },
        reviewThreads: { checked: false, reason: "remote lookup skipped" },
        queue: { present: false },
        handoff: { present: false },
        nextAction: `agentplane pr open ${opts.task.id} --author <ROLE>`,
      };
    }
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
      publication,
      closeTail: { state: "recorded_on_base", base },
      hostedChecks: { checked: false, reason: "remote lookup skipped" },
      reviewThreads: { checked: false, reason: "remote lookup skipped" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "pull main; task close evidence is already recorded upstream",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    opts.onDiagnostic?.(`local PR metadata fallback failed: ${message}`);
    return null;
  }
}

async function resolveLocalTaskBranchFlow(opts: {
  ctx: CommandContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
}): Promise<PrFlowStatusReport | null> {
  const branch = await resolveTaskBranchFromContext({
    ctx: opts.ctx,
    taskId: opts.task.id,
  });
  if (!branch) return null;
  const headSha = await gitRevParse(opts.ctx.resolvedProject.gitRoot, [branch]).catch(() => null);
  const publication = await resolvePrHeadPublicationStatus({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    branch,
    localHeadSha: headSha,
    providerObservation: null,
  });
  return {
    task: {
      id: opts.task.id,
      status: opts.task.status,
      verification: opts.task.verification?.state ?? null,
    },
    branch: { name: branch, headSha, metaHeadSha: null },
    pr: { provider: "github", state: "not_found", source: "metadata" },
    publication,
    closeTail: { state: "not_applicable", reason: "implementation PR is not linked yet" },
    hostedChecks: { checked: false, reason: "remote lookup skipped" },
    reviewThreads: { checked: false, reason: "remote lookup skipped" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: `agentplane pr open ${opts.task.id} --author <ROLE>`,
  };
}

export function buildRouteSourceConfidence(opts: {
  remoteEnabled: boolean;
  remoteResolved: boolean;
  localDiagnostics: string[];
}): TaskRouteDecision["sourceConfidence"] {
  const probeDiagnostics = [...opts.localDiagnostics];
  if (opts.remoteEnabled && !opts.remoteResolved) {
    probeDiagnostics.push("remote route probe produced no provider state; local fallback used");
  }
  return {
    ...buildRouteSourceConfidenceBase({
      remoteEnabled: opts.remoteEnabled,
      remoteResolved: opts.remoteResolved,
      batchOwnershipSource: "pr_artifact",
    }),
    route_probes: {
      source: "local_git",
      freshness: "computed_local",
      confidence: probeDiagnostics.length > 0 ? "low" : "high",
      note:
        probeDiagnostics.length > 0
          ? probeDiagnostics.join("; ")
          : "route probes completed without suppressed diagnostics",
    },
  };
}

async function resolveDoneCleanupProbe(opts: {
  ctx: CommandContext;
  resume: TaskResumeContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
  remoteEnabled: boolean;
  onDiagnostic?: (message: string) => void;
}): Promise<RouteCleanupProbe> {
  if (
    opts.ctx.config.workflow_mode !== "branch_pr" ||
    String(opts.task.status).toUpperCase() !== "DONE"
  ) {
    return { state: "not_requested" };
  }
  if (!opts.remoteEnabled) {
    return { state: "unavailable", reason: "remote cleanup proof was not requested" };
  }
  const baseBranch = opts.resume.base_branch?.trim() ?? "";
  if (!baseBranch) return { state: "unavailable", reason: "base branch is unavailable" };
  try {
    const resolution = await resolveCleanupPlan({
      ctx: opts.ctx,
      gitRoot: opts.ctx.resolvedProject.gitRoot,
      workflowDir: opts.ctx.config.paths.workflow_dir,
      baseBranch,
      taskIds: [opts.task.id],
    });
    if (resolution.blocked.length > 0) {
      return {
        state: "blocked",
        reasons: resolution.blocked.map((item) => `branch=${item.branch}: ${item.reason}`),
      };
    }
    if (resolution.candidates.length > 0) {
      return { state: "candidate", count: resolution.candidates.length };
    }
    if (!resolution.matchedTaskIds.has(opts.task.id)) return { state: "already_clean" };
    return {
      state: "unavailable",
      reason: "cleanup proof returned a matched task without a candidate or blocker",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    opts.onDiagnostic?.(`cleanup candidate probe failed: ${message}`);
    return { state: "unavailable", reason: message };
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
  const localDiagnostics: string[] = [];
  const recordLocalDiagnostic = (message: string): void => {
    localDiagnostics.push(message);
  };
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
      if (!isCliUsageOrIo(err) && !(err instanceof SyntaxError)) throw err;
      const message = err instanceof Error ? err.message : String(err);
      recordLocalDiagnostic(`PR flow probe failed: ${message}`);
      prFlow = await resolveLocalRecordedCloseFlow({
        ctx,
        task,
        onDiagnostic: recordLocalDiagnostic,
      });
      prFlow ??= await resolveLocalTaskBranchFlow({ ctx, task });
    }
  } else if (ctx.config.workflow_mode === "branch_pr") {
    prFlow = await resolveLocalRecordedCloseFlow({
      ctx,
      task,
      onDiagnostic: recordLocalDiagnostic,
    });
    prFlow ??= await resolveLocalTaskBranchFlow({ ctx, task });
  }
  const batchOwnership =
    ctx.config.workflow_mode === "branch_pr"
      ? await resolveBatchOwnership({ ctx, task })
      : { role: "none" as const };
  const inferredBranch = inferredTaskBranch(resume, prFlow);
  const taskWorktreeBranch =
    batchOwnership.role === "included" ? batchOwnership.branch : inferredBranch;
  const taskWorktreeCleanliness: TaskWorktreeCleanliness = taskWorktreeBranch
    ? await inspectTaskWorktreeCleanliness({
        gitRoot: ctx.resolvedProject.gitRoot,
        branch: taskWorktreeBranch,
      })
    : {
        state: "not_present",
        branch: "",
        worktreePath: null,
        changedPaths: [],
      };
  const cleanupProbe = await resolveDoneCleanupProbe({
    ctx,
    resume,
    task,
    remoteEnabled,
    onDiagnostic: recordLocalDiagnostic,
  });
  const blockers = await deriveBlockers({
    ctx,
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
    batchOwnership,
    cleanupProbe,
    taskWorktreeCleanliness,
  });
  const provisionalNextAction = deriveNextAction({
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
    cleanupProbe,
    blockers,
    batchOwnership,
  });
  const blockerCountBeforeFinalGates = blockers.length;
  if (
    ctx.config.workflow_mode === "branch_pr" &&
    provisionalNextAction.code === "wait_hosted_checks"
  ) {
    addTaskWorktreeCleanlinessBlocker({
      blockers,
      cleanliness: taskWorktreeCleanliness,
      workflowDir: ctx.config.paths.workflow_dir,
      tasksPath: ctx.config.paths.tasks_path,
      requireAllChanges: true,
    });
  }
  if (
    ctx.config.workflow_mode === "branch_pr" &&
    ["record_pre_merge_closure", "wait_hosted_checks"].includes(provisionalNextAction.code)
  ) {
    addVerificationRequiredBlocker({ blockers, task });
  }
  blockers.sort((left, right) => routeGatePriority(left.code) - routeGatePriority(right.code));
  const nextAction =
    blockers.length === blockerCountBeforeFinalGates
      ? provisionalNextAction
      : deriveNextAction({
          task,
          resume,
          workflowMode: ctx.config.workflow_mode,
          prFlow,
          cleanupProbe,
          blockers,
          batchOwnership,
        });
  const baseCheckoutPath = await findWorktreePath(ctx.resolvedProject.gitRoot, resume.base_branch);
  const taskWorktreePath =
    ctx.config.workflow_mode === "branch_pr" ? taskWorktreeCleanliness.worktreePath : null;
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
          ? taskWorktreeCleanliness.worktreePath
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
    cleanupProbe,
    cleanupCandidateCount:
      cleanupProbe.state === "candidate"
        ? cleanupProbe.count
        : cleanupProbe.state === "already_clean"
          ? 0
          : null,
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
      localDiagnostics,
    }),
  };
}
