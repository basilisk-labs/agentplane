import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteBatchNextAction, RouteBatchOwnership } from "./route-batch-ownership.js";
import type { RouteBlocker, RouteExecutionPacket, RouteOracle } from "./route-oracle.js";
import type { SourceConfidence as RouteSourceConfidence } from "./source-confidence.js";

export type RouteNextAction = RouteBatchNextAction;

export type RouteRepairStep = {
  code: string;
  command: string | null;
  summary: string;
  mutates: boolean;
};

export type RouteAmbiguity = {
  code: string;
  summary: string;
  resolution: string;
};

export type TaskRouteDecision = {
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
    checkoutRole: "base" | "task_worktree" | "unknown";
    baseCheckoutPath: string | null;
    taskWorktreePath: string | null;
  };
  approval: {
    runtime: {
      requirePlan: boolean;
      requireNetwork: boolean;
      requireVerify: boolean;
    };
    gatewayMutationApprovalRequired: boolean;
    effectiveMutationApprovalRequired: boolean;
  };
  batchOwnership: RouteBatchOwnership;
  prFlow: PrFlowStatusReport | null;
  blockers: RouteBlocker[];
  ambiguities: RouteAmbiguity[];
  nextAction: RouteNextAction;
  oracle: RouteOracle;
  executionPacket: RouteExecutionPacket;
  repairPlan: RouteRepairStep[];
  sourceConfidence: Record<string, RouteSourceConfidence>;
};

export function taskSummary(task: TaskData): TaskRouteDecision["task"] {
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
