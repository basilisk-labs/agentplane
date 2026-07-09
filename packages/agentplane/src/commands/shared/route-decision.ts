import { findWorktreeForBranch, gitRevParse } from "@agentplaneorg/core/git";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { CliError } from "../../shared/errors.js";
import { resolvePrFlowStatus, type PrFlowStatusReport } from "../pr/flow-status.js";
import { resolveCleanupCandidates } from "../branch/cleanup-merged.js";
import { buildTaskResumeContext, type TaskResumeContext } from "../task/handoff.shared.js";
import { resolveBatchOwnership } from "./route-batch-ownership.js";
import { deriveBlockers } from "./route-decision-blockers.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import { taskSummary, type TaskRouteDecision } from "./route-decision-types.js";
import { deriveRouteExecutionPacket, deriveRouteOracle } from "./route-oracle.js";
import { deriveRouteAmbiguities, deriveRouteRepairPlan } from "./route-decision-repair.js";

import { loadBackendTask, loadCommandContext, type CommandContext } from "./task-backend.js";
import { buildRouteSourceConfidenceBase } from "./source-confidence.js";
import { hasClosedPreMergeClosureMarker, parsePrMeta } from "./pr-meta.js";
import { taskCloseAlreadyRecordedOnBase } from "../task/close-tail-state.js";

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
}) {
  return deriveRouteAmbiguities(opts);
}

function deriveRepairPlan(decision: Omit<TaskRouteDecision, "repairPlan" | "sourceConfidence">) {
  return deriveRouteRepairPlan(decision);
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
    if (meta.status === "OPEN") {
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
          reason: preMergeClosed
            ? "pre-merge closure records finalization before implementation PR merge"
            : "implementation PR is open; pre-merge closure is still recorded on the task branch",
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    opts.onDiagnostic?.(`local PR metadata fallback failed: ${message}`);
    return null;
  }
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

async function resolveDoneCleanupCandidateCount(opts: {
  ctx: CommandContext;
  resume: TaskResumeContext;
  task: Awaited<ReturnType<typeof loadBackendTask>>["task"];
  onDiagnostic?: (message: string) => void;
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    opts.onDiagnostic?.(`cleanup candidate probe failed: ${message}`);
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
    }
  } else if (ctx.config.workflow_mode === "branch_pr") {
    prFlow = await resolveLocalRecordedCloseFlow({
      ctx,
      task,
      onDiagnostic: recordLocalDiagnostic,
    });
  }
  const batchOwnership =
    ctx.config.workflow_mode === "branch_pr"
      ? await resolveBatchOwnership({ ctx, task })
      : { role: "none" as const };
  const cleanupCandidateCount = await resolveDoneCleanupCandidateCount({
    ctx,
    resume,
    task,
    onDiagnostic: recordLocalDiagnostic,
  });
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
      localDiagnostics,
    }),
  };
}
