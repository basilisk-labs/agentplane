import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  withSideEffectAuthorityState,
} from "./side-effect-authority.js";
import { reduceRouteState } from "./workflow-step-reducer.js";
import {
  withBootstrapWorkflowFingerprint,
  type WorkflowRouteStateInput,
} from "./workflow-step-fingerprint.js";
import type { WorkflowRouteState } from "./workflow-step.js";

export const task = {
  id: "202607250100-TYPED1",
  title: "Typed route fixture",
  description: "Exercise typed route state.",
  status: "DOING",
  priority: "high",
  owner: "CODER",
  revision: 7,
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
  plan_approval: {
    state: "approved",
    approved_by: "ORCHESTRATOR",
    approved_at: "2026-07-25T00:00:00.000Z",
  },
  verification: { state: "pending" },
} satisfies TaskData;

export const resume = {
  task_id: task.id,
  task_status: task.status,
  branch: `task/${task.id}/typed-route-fixture`,
  base_branch: "main",
  head_sha: "1111111111111111111111111111111111111111",
  workspace_root: `/repo/.agentplane/worktrees/${task.id}`,
  pr_branch: `task/${task.id}/typed-route-fixture`,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${task.id}`,
    resume_command: `agentplane task run ${task.id}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

export function prFlow(state: "not_found" | "OPEN" = "not_found"): PrFlowStatusReport {
  return {
    task: { id: task.id, status: task.status, verification: "pending" },
    branch: {
      name: resume.pr_branch,
      headSha: resume.head_sha,
      metaHeadSha: state === "OPEN" ? resume.head_sha : null,
    },
    pr:
      state === "OPEN"
        ? {
            provider: "github",
            state: "OPEN",
            source: "lookup",
            prNumber: 4612,
            prUrl: "https://github.com/basilisk-labs/agentplane/pull/4612",
            base: "main",
            headSha: resume.head_sha,
            mergeCommit: null,
          }
        : { provider: "github", state: "not_found", source: "metadata" },
    closeTail: { state: "not_applicable", reason: "implementation PR is not merged" },
    hostedChecks: { checked: false, reason: "not requested" },
    reviewThreads: { checked: false, reason: "not requested" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

export function routeState(overrides: Partial<WorkflowRouteState> = {}): WorkflowRouteState {
  const base: WorkflowRouteStateInput = {
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow: prFlow(),
    cleanupProbe: { state: "not_requested" },
    blockers: [{ code: "remote_pr_missing", summary: "remote PR is missing" }],
    batchOwnership: { role: "none" },
    taskWorktree: {
      state: "clean",
      branch: resume.pr_branch ?? "",
      worktreePath: resume.workspace_root,
      changedPaths: [],
    },
  };
  const { preconditionFingerprint, ...stateOverrides } = overrides;
  return {
    ...withBootstrapWorkflowFingerprint({ ...base, ...stateOverrides }),
    ...(preconditionFingerprint ? { preconditionFingerprint } : {}),
  };
}

export function routeStateWithAuthority(
  overrides: Partial<WorkflowRouteState> = {},
): WorkflowRouteState {
  const initial = routeState(overrides);
  const approval = reduceRouteState(initial);
  if (approval.kind !== "approval" || approval.request.type !== "side_effect") return initial;
  const issuedAt = "1970-01-01T00:00:00.000Z";
  const expiresAt = "9999-12-31T23:59:59.999Z";
  const grant = createSideEffectAuthorityRecord({
    id: `authority-${approval.request.operationId}`,
    actor: "USER",
    operation: approval.request.operation,
    fingerprint: approval.preconditionFingerprint,
    issuedAt,
    expiresAt,
  });
  const authorityState = appendSideEffectAuthorityAudit({
    state: { schemaVersion: 1, grants: [grant], audit: [] },
    at: issuedAt,
    actor: "USER",
    operation: approval.request.operation,
    fingerprint: approval.preconditionFingerprint,
    authority: grant,
    outcome: "approved",
  });
  return routeState({
    ...overrides,
    task: {
      ...initial.task,
      extensions: withSideEffectAuthorityState(initial.task, authorityState),
    },
  });
}
