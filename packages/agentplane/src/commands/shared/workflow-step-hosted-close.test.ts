import { describe, expect, it } from "vitest";
import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { RouteCleanupProbe } from "./route-decision-types.js";
import { withBootstrapWorkflowFingerprint } from "./workflow-step-fingerprint.js";
import { reduceRouteState } from "./workflow-step-reducer.js";

const taskId = "202608031426-0BY4B4";
const branch = `task/${taskId}/hosted-close`;
const headSha = "2222222222222222222222222222222222222222";

const task = {
  id: taskId,
  title: "Converge hosted close",
  description: "Exercise terminal route convergence.",
  status: "DONE",
  priority: "high",
  owner: "CODER",
  revision: 1,
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  plan_approval: {
    state: "approved",
    approved_by: "ORCHESTRATOR",
    approved_at: "2026-08-03T00:00:00.000Z",
  },
  verification: { state: "ok" },
  commit: { hash: headSha, message: "feat: implementation" },
} satisfies TaskData;

const resume = {
  task_id: taskId,
  task_status: "DONE",
  branch,
  base_branch: "main",
  head_sha: headSha,
  workspace_root: "/repo",
  pr_branch: branch,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${taskId}`,
    resume_command: `agentplane task run ${taskId}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

const prFlow = {
  task: { id: taskId, status: "DONE", verification: "ok" },
  branch: { name: branch, headSha, metaHeadSha: headSha },
  pr: {
    provider: "github",
    state: "MERGED",
    source: "lookup",
    prNumber: 4756,
    prUrl: "https://github.com/basilisk-labs/agentplane/pull/4756",
    base: "main",
    headSha,
    mergeCommit: "3333333333333333333333333333333333333333",
  },
  closeTail: { state: "recorded_on_base", base: "main" },
  hostedChecks: { checked: true, failing: 0, pending: 0, total: 21 },
  reviewThreads: { checked: true, unresolved: 0 },
  queue: { present: true, status: "done", reason: null, updatedAt: null },
  handoff: { present: false },
  nextAction: "pull main and run merged branch/worktree cleanup",
} satisfies PrFlowStatusReport;

function route(cleanupProbe: RouteCleanupProbe) {
  return reduceRouteState(
    withBootstrapWorkflowFingerprint({
      task,
      resume,
      workflowMode: "branch_pr",
      prFlow,
      cleanupProbe,
      blockers: [],
      batchOwnership: { role: "none" },
      taskWorktree: {
        state: "not_present",
        branch,
        worktreePath: null,
        changedPaths: [],
      },
    }),
  );
}

describe("hosted-close route convergence", () => {
  it("terminates when targeted cleanup is complete and base matches origin", () => {
    expect(route({ state: "already_clean", baseSynchronized: true })).toMatchObject({
      kind: "terminal",
      id: "terminal.done",
      phase: "done",
      outcome: { type: "done" },
    });
  });

  it("keeps finalization when cleanup is empty but base is not synchronized", () => {
    expect(route({ state: "already_clean", baseSynchronized: false })).toMatchObject({
      kind: "cli_operation",
      operation: { id: "task.hosted_close.finalize" },
      compatibility: { code: "sync_hosted_close" },
    });
  });
});
