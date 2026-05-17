import type { TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { resolvePrFlowStatus, type PrFlowStatusReport } from "../pr/flow-status.js";
import { isTaskLocalOnlyAdvance } from "./task-local-freshness.js";
import { buildTaskResumeContext, type TaskResumeContext } from "../task/handoff.shared.js";

import { loadBackendTask, loadCommandContext, type CommandContext } from "./task-backend.js";

type RouteBlocker = {
  code: string;
  summary: string;
};

type RouteNextAction = {
  code: string;
  command: string | null;
  summary: string;
  requiresApproval: boolean;
};

type RouteRepairStep = {
  code: string;
  command: string | null;
  summary: string;
  mutates: boolean;
};

type TaskRouteDecision = {
  task: {
    id: string;
    title: string;
    status: string;
    owner: string;
    planApproval: string | null;
    verification: string | null;
    commit: string | null;
  };
  workflowMode: string;
  workspace: {
    root: string;
    branch: string | null;
    baseBranch: string | null;
    headSha: string | null;
    prBranch: string | null;
  };
  prFlow: PrFlowStatusReport | null;
  blockers: RouteBlocker[];
  nextAction: RouteNextAction;
  repairPlan: RouteRepairStep[];
};

function isCliUsageOrIo(err: unknown): boolean {
  return err instanceof CliError && (err.code === "E_USAGE" || err.code === "E_IO");
}

function taskSummary(task: TaskData): TaskRouteDecision["task"] {
  const commit = task.commit as unknown;
  return {
    id: task.id,
    title: task.title,
    status: task.status,
    owner: task.owner,
    planApproval: task.plan_approval?.state ?? null,
    verification: task.verification?.state ?? null,
    commit: typeof commit === "string" && commit.trim() ? commit : null,
  };
}

function addBlocker(blockers: RouteBlocker[], code: string, summary: string): void {
  if (blockers.some((blocker) => blocker.code === code)) return;
  blockers.push({ code, summary });
}

async function isPrMetaOnlyTaskLocalAdvance(opts: {
  ctx: CommandContext;
  taskId: string;
  prFlow: PrFlowStatusReport | null;
}): Promise<boolean> {
  const branchHeadSha = opts.prFlow?.branch.headSha ?? null;
  const metaHeadSha = opts.prFlow?.branch.metaHeadSha ?? null;
  if (!branchHeadSha || !metaHeadSha || branchHeadSha === metaHeadSha) return false;
  return isTaskLocalOnlyAdvance({
    gitRoot: opts.ctx.resolvedProject.gitRoot,
    workflowDir: opts.ctx.config.paths.workflow_dir,
    tasksPath: opts.ctx.config.paths.tasks_path,
    taskId: opts.taskId,
    fromRef: metaHeadSha,
    toRef: branchHeadSha,
  }).catch(() => false);
}

async function deriveBlockers(opts: {
  ctx: CommandContext;
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
}): Promise<RouteBlocker[]> {
  const blockers: RouteBlocker[] = [];
  if (opts.task.plan_approval?.state !== "approved") {
    addBlocker(blockers, "plan_not_approved", "task plan is not approved");
  }
  if (opts.workflowMode === "branch_pr") {
    if (!opts.resume.pr_branch && !opts.prFlow?.branch.name) {
      addBlocker(blockers, "missing_pr_branch", "branch_pr task has no recorded PR branch");
    }
    if (opts.resume.branch === opts.resume.base_branch) {
      addBlocker(blockers, "on_base_checkout", "current checkout appears to be the base branch");
    }
    if (opts.prFlow?.pr.state === "not_found") {
      addBlocker(blockers, "remote_pr_missing", "task branch is not linked to a remote PR");
    }
    if (opts.prFlow?.branch.name && !opts.prFlow.branch.headSha) {
      addBlocker(
        blockers,
        "branch_head_missing",
        "recorded task branch cannot be resolved locally",
      );
    }
    if (
      opts.prFlow?.branch.headSha &&
      opts.prFlow.branch.metaHeadSha &&
      opts.prFlow.branch.headSha !== opts.prFlow.branch.metaHeadSha &&
      !(await isPrMetaOnlyTaskLocalAdvance({
        ctx: opts.ctx,
        taskId: opts.task.id,
        prFlow: opts.prFlow,
      }))
    ) {
      addBlocker(blockers, "pr_meta_stale", "PR metadata head differs from local branch head");
    }
    if (opts.prFlow?.closeTail.state === "open") {
      addBlocker(blockers, "close_tail_open", "hosted close-tail PR is still open");
    }
    if (opts.prFlow?.closeTail.state === "not_found") {
      addBlocker(
        blockers,
        "close_tail_missing",
        "implementation PR is merged but close-tail is missing",
      );
    }
  }
  if (opts.resume.runner.next_action === "wait") {
    addBlocker(blockers, "runner_alive", "latest runner still appears alive");
  }
  return blockers;
}

function deriveNextAction(opts: {
  task: TaskData;
  resume: TaskResumeContext;
  workflowMode: string;
  prFlow: PrFlowStatusReport | null;
  blockers: readonly RouteBlocker[];
}): RouteNextAction {
  const id = opts.task.id;
  if (opts.task.plan_approval?.state !== "approved") {
    return {
      code: "approve_plan",
      command: `agentplane task plan approve ${id} --by ORCHESTRATOR`,
      summary: "approve the task plan before owner-scoped execution",
      requiresApproval: true,
    };
  }
  if (opts.workflowMode !== "branch_pr") {
    return {
      code: opts.resume.runner.next_action ?? "continue_direct",
      command: opts.resume.runner.next_command ?? `agentplane task verify-show ${id}`,
      summary: "continue the direct-mode task from the current checkout",
      requiresApproval: false,
    };
  }
  if (opts.resume.runner.next_action === "wait") {
    return {
      code: "wait_runner",
      command: null,
      summary: "wait for the active runner or reclaim with explicit force if it is orphaned",
      requiresApproval: false,
    };
  }
  if (opts.blockers.some((blocker) => blocker.code === "missing_pr_branch")) {
    return {
      code: "start_or_recover_worktree",
      command: `agentplane work start ${id} --agent ${opts.task.owner} --slug <slug> --worktree`,
      summary: "create or recover the dedicated branch_pr worktree before opening a PR",
      requiresApproval: false,
    };
  }
  if (opts.blockers.some((blocker) => blocker.code === "pr_meta_stale")) {
    return {
      code: "update_pr_artifacts",
      command: `agentplane pr update ${id}`,
      summary: "refresh stale PR metadata before hosted checks or integration",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.pr.state === "not_found") {
    return {
      code: "open_pr",
      command: `agentplane pr open ${id} --author ${opts.task.owner}`,
      summary: "publish/link the task PR",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.pr.state === "OPEN") {
    return {
      code: "wait_hosted_checks",
      command: `agentplane integrate queue enqueue ${id} --branch ${opts.prFlow.branch.name ?? "<branch>"}`,
      summary: "enqueue the verified branch after hosted checks are stable",
      requiresApproval: false,
    };
  }
  if (opts.prFlow?.closeTail.state === "open") {
    return {
      code: "merge_close_tail",
      command: null,
      summary: "wait for hosted checks and merge the close-tail PR through the provider",
      requiresApproval: true,
    };
  }
  if (opts.prFlow?.closeTail.state === "not_found") {
    return {
      code: "open_close_tail",
      command: `agentplane task hosted-close-pr ${id}`,
      summary: "open the hosted close-tail PR for the merged implementation PR",
      requiresApproval: false,
    };
  }
  if (opts.task.status === "DONE") {
    return {
      code: "cleanup",
      command: "agentplane cleanup merged",
      summary: "pull the base branch and clean merged task branches/worktrees",
      requiresApproval: false,
    };
  }
  return {
    code: "verify_or_update_pr",
    command: `agentplane pr update ${id}`,
    summary: "refresh PR artifacts, verify, then queue integration",
    requiresApproval: false,
  };
}

function deriveRepairPlan(decision: Omit<TaskRouteDecision, "repairPlan">): RouteRepairStep[] {
  const steps: RouteRepairStep[] = [];
  const id = decision.task.id;
  for (const blocker of decision.blockers) {
    if (blocker.code === "missing_pr_branch") {
      steps.push({
        code: "create_worktree",
        command: `agentplane work start ${id} --agent ${decision.task.owner} --slug <slug> --worktree`,
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

export async function buildTaskRouteDecision(opts: {
  ctx?: CommandContext;
  cwd: string;
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
  if (ctx.config.workflow_mode === "branch_pr") {
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
  const blockers = await deriveBlockers({
    ctx,
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
  });
  const nextAction = deriveNextAction({
    task,
    resume,
    workflowMode: ctx.config.workflow_mode,
    prFlow,
    blockers,
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
    },
    prFlow,
    blockers,
    nextAction,
  };
  return { ...partial, repairPlan: deriveRepairPlan(partial) };
}
