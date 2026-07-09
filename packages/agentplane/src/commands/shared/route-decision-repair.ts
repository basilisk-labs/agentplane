import { humanInputAnswerCommand } from "../task/human-input.js";
import type { RouteAmbiguity, RouteRepairStep, TaskRouteDecision } from "./route-decision-types.js";
import type { RouteBlockerCode } from "./route-oracle.js";
import { workStartCommand } from "./work-start-command.js";

type DecisionForAmbiguity = Omit<
  TaskRouteDecision,
  "ambiguities" | "repairPlan" | "sourceConfidence"
>;
type DecisionForRepair = Omit<TaskRouteDecision, "repairPlan" | "sourceConfidence">;
type RepairFactory = (decision: DecisionForRepair) => RouteRepairStep;

const qualityReviewRepair: RepairFactory = (decision) => ({
  code: "run_quality_review",
  command:
    `agentplane evaluator run ${decision.task.id} --verdict pass --summary "Quality review passed." ` +
    `--finding "No blocking findings." --evidence .agentplane/tasks/${decision.task.id}/README.md`,
  summary: "record EVALUATOR quality review before PR publication or integration",
  mutates: true,
});

const REPAIR_BY_BLOCKER_CODE = {
  branch_head_missing: (decision) => ({
    code: "fetch_branch",
    command: decision.workspace.prBranch ? `git fetch origin ${decision.workspace.prBranch}` : null,
    summary: "fetch or recover the recorded task branch before continuing",
    mutates: true,
  }),
  close_tail_missing: (decision) => ({
    code: "open_close_tail",
    command: `agentplane task hosted-close-pr ${decision.task.id}`,
    summary: "open the hosted close-tail PR",
    mutates: true,
  }),
  close_tail_open: () => ({
    code: "wait_close_tail",
    command: null,
    summary: "wait for hosted checks and merge the open close-tail PR through the provider",
    mutates: false,
  }),
  dirty_task_artifacts: (decision) => ({
    code: "commit_direct_task_artifacts",
    command: `agentplane commit ${decision.task.id} --close --unstage-others`,
    summary: "commit the tracked direct-workflow task artifacts left by manual close handling",
    mutates: true,
  }),
  human_input_required: (decision) => ({
    code: "answer_user_question",
    command: humanInputAnswerCommand(decision.task.id),
    summary: "answer the open user question before continuing task execution",
    mutates: true,
  }),
  missing_included_batch_metadata: () => ({
    code: "repair_included_batch_metadata",
    command: null,
    summary:
      "restore structured extensions.branch_pr_batch or primary PR batch metadata before reconciling the included task",
    mutates: false,
  }),
  missing_pr_branch: (decision) => ({
    code: "create_worktree",
    command: workStartCommand(decision.task),
    summary: "create the missing branch_pr worktree",
    mutates: true,
  }),
  on_base_checkout: (decision) => ({
    code: "resume_worktree",
    command: `agentplane work resume ${decision.task.id}`,
    summary: "switch to or inspect the dedicated task worktree before continuing",
    mutates: false,
  }),
  plan_not_approved: (decision) => ({
    code: "approve_plan",
    command: `agentplane task plan approve ${decision.task.id} --by ORCHESTRATOR`,
    summary: "approve the task plan before owner-scoped execution",
    mutates: true,
  }),
  pr_meta_stale: (decision) => ({
    code: "update_pr_artifacts",
    command: `agentplane pr update ${decision.task.id}`,
    summary: "refresh stale local PR metadata",
    mutates: true,
  }),
  pre_merge_closure_missing: (decision) => ({
    code: "record_pre_merge_closure",
    command:
      `agentplane finish ${decision.task.id} --author ${decision.task.owner} ` +
      `--body "Verified: pre-merge closure packet is ready for the task PR." ` +
      `--result "pre-merge closure" --commit HEAD --pre-merge-closure`,
    summary: "record task DONE and pre-merge closure on the task branch before integration",
    mutates: true,
  }),
  quality_review_missing: qualityReviewRepair,
  quality_review_stale: qualityReviewRepair,
  remote_pr_missing: (decision) => ({
    code: "open_pr",
    command: `agentplane pr open ${decision.task.id} --author ${decision.task.owner}`,
    summary: "create or relink remote PR artifacts",
    mutates: true,
  }),
  runner_alive: (decision) => ({
    code: "inspect_runner",
    command: `agentplane task resume-context ${decision.task.id}`,
    summary: "inspect active runner state before reclaiming",
    mutates: false,
  }),
} satisfies Record<RouteBlockerCode, RepairFactory>;

export function deriveRouteAmbiguities(opts: { decision: DecisionForAmbiguity }): RouteAmbiguity[] {
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

export function deriveRouteRepairPlan(decision: DecisionForRepair): RouteRepairStep[] {
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
  if (decision.blockers.length === 0) {
    return [
      {
        code: "no_repair_needed",
        command: decision.nextAction.command,
        summary: decision.nextAction.summary,
        mutates: false,
      },
    ];
  }
  return decision.blockers.map((blocker) => REPAIR_BY_BLOCKER_CODE[blocker.code](decision));
}
