import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import type { RouteCleanupProbe } from "./route-decision-types.js";

const task = {
  id: "T-1",
  title: "Task",
  description: "Task",
  status: "DONE",
  priority: "med",
  owner: "CODER",
  depends_on: [],
  tags: [],
  verify: [],
} as TaskData;

const resume = {
  task_id: "T-1",
  task_status: "DONE",
  branch: "main",
  base_branch: "main",
  head_sha: "head",
  workspace_root: "/repo",
  pr_branch: "task/T-1/work",
  latest_handoff: null,
  runner: {},
} as TaskResumeContext;

function report(state: "CLOSED" | "MERGED"): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DONE", verification: "ok" },
    branch: { name: "task/T-1/work", headSha: "head", metaHeadSha: "head" },
    pr: {
      provider: "github",
      state,
      source: "lookup",
      prNumber: 101,
      prUrl: "https://github.com/example/repo/pull/101",
      base: "main",
      headSha: "head",
      mergeCommit: state === "MERGED" ? "merge" : null,
    },
    providerObservation: {
      state: "found",
      pr: {
        prNumber: 101,
        prUrl: "https://github.com/example/repo/pull/101",
        status: state,
        mergedAt: state === "MERGED" ? "2026-01-01T00:00:00.000Z" : null,
        mergeCommit: state === "MERGED" ? "merge" : null,
        base: "main",
        headSha: "head",
      },
    },
    closeTail: {
      state: "not_applicable",
      reason: state === "MERGED" ? "close-tail proof is pending" : "implementation PR is closed",
    },
    hostedChecks: { checked: false, reason: "not needed" },
    reviewThreads: { checked: false, reason: "not needed" },
    queue: { present: false },
    handoff: { present: false },
    nextAction: "",
  };
}

function nextAction(prFlow: PrFlowStatusReport, cleanupProbe: RouteCleanupProbe) {
  return deriveNextAction({
    task,
    resume,
    workflowMode: "branch_pr",
    prFlow,
    cleanupProbe,
    blockers:
      cleanupProbe.state === "blocked"
        ? [{ code: "cleanup_blocked", summary: cleanupProbe.reasons.join("; ") }]
        : [],
    batchOwnership: { role: "none" },
  });
}

describe("DONE branch_pr route cleanup boundary", () => {
  it("blocks a dirty DONE task worktree before enqueueing an open PR", () => {
    const openPr = {
      ...report("MERGED"),
      pr: {
        provider: "github" as const,
        state: "OPEN" as const,
        source: "lookup" as const,
        prNumber: 101,
        prUrl: "https://github.com/example/repo/pull/101",
        base: "main",
        headSha: "head",
        mergeCommit: null,
      },
    } satisfies PrFlowStatusReport;

    expect(
      deriveNextAction({
        task,
        resume,
        workflowMode: "branch_pr",
        prFlow: openPr,
        cleanupProbe: { state: "not_requested" },
        blockers: [
          {
            code: "task_worktree_dirty",
            summary: "task worktree contains uncommitted closure artifacts",
          },
        ],
        batchOwnership: { role: "none" },
      }),
    ).toMatchObject({
      code: "resolve_task_worktree_state",
      command: null,
    });
  });

  it("blocks a legacy DONE task with pending verification before enqueueing an open PR", () => {
    const openPr = {
      ...report("MERGED"),
      pr: {
        provider: "github" as const,
        state: "OPEN" as const,
        source: "lookup" as const,
        prNumber: 101,
        prUrl: "https://github.com/example/repo/pull/101",
        base: "main",
        headSha: "head",
        mergeCommit: null,
      },
    } satisfies PrFlowStatusReport;

    expect(
      deriveNextAction({
        task: { ...task, verification: { state: "pending" } },
        resume,
        workflowMode: "branch_pr",
        prFlow: openPr,
        cleanupProbe: { state: "not_requested" },
        blockers: [
          {
            code: "verification_required",
            summary: "the committed task implementation has no passing verification record",
          },
        ],
        batchOwnership: { role: "none" },
      }),
    ).toMatchObject({
      code: "verification_required",
      command: null,
    });
  });

  it("keeps a live CLOSED PR on inspect/reopen instead of cleanup", () => {
    expect(nextAction(report("CLOSED"), { state: "candidate", count: 1 })).toMatchObject({
      code: "inspect_pr",
      command: null,
    });
  });

  it("emits exact targeted cleanup only for a proven MERGED candidate", () => {
    expect(nextAction(report("MERGED"), { state: "candidate", count: 1 })).toMatchObject({
      code: "cleanup",
      command: "agentplane cleanup merged --task-id T-1 --finalize --base main",
    });
  });

  it("surfaces blocked merged identity instead of treating zero candidates as clean", () => {
    const action = nextAction(report("MERGED"), {
      state: "blocked",
      reasons: ["branch=task/T-1/work: provider head mismatch"],
    });
    expect(action).toMatchObject({
      code: "cleanup_blocked",
      command: null,
    });
    expect(action.summary).toContain("provider head mismatch");
  });
});

describe("branch_pr pre-integration safety gates", () => {
  const doingTask = {
    ...task,
    status: "DOING",
    plan_approval: {
      state: "approved" as const,
      approved_by: "ORCHESTRATOR",
      approved_at: "2026-01-01T00:00:00.000Z",
    },
    verification: { state: "pending" as const },
  } as TaskData;
  const openPr = {
    ...report("MERGED"),
    task: { id: "T-1", status: "DOING", verification: "pending" },
    pr: {
      provider: "github" as const,
      state: "OPEN" as const,
      source: "lookup" as const,
      prNumber: 101,
      prUrl: "https://github.com/example/repo/pull/101",
      base: "main",
      headSha: "head",
      mergeCommit: null,
    },
  } satisfies PrFlowStatusReport;

  function branchAction(blockers: Parameters<typeof deriveNextAction>[0]["blockers"]) {
    return deriveNextAction({
      task: doingTask,
      resume: { ...resume, task_status: "DOING", branch: "task/T-1/work" },
      workflowMode: "branch_pr",
      prFlow: openPr,
      cleanupProbe: { state: "not_requested" },
      blockers,
      batchOwnership: { role: "none" },
    });
  }

  it("returns control to CODER instead of enqueueing a dirty task worktree", () => {
    expect(
      branchAction([
        { code: "task_worktree_dirty", summary: "task worktree contains src/work.ts" },
      ]),
    ).toMatchObject({
      code: "resolve_task_worktree_state",
      command: null,
      requiresApproval: false,
    });
  });

  it("hands a clean pending implementation to TESTER without synthesizing a command", () => {
    expect(
      branchAction([
        {
          code: "verification_required",
          summary: "the committed implementation has no passing verification record",
        },
      ]),
    ).toMatchObject({
      code: "verification_required",
      command: null,
      requiresApproval: false,
    });
  });

  it("allows primary PR artifact creation before the verification handoff", () => {
    const action = deriveNextAction({
      task: doingTask,
      resume: { ...resume, task_status: "DOING", branch: "task/T-1/work" },
      workflowMode: "branch_pr",
      prFlow: {
        ...openPr,
        pr: { provider: "github", state: "not_found", source: "lookup" },
      },
      cleanupProbe: { state: "not_requested" },
      blockers: [
        { code: "remote_pr_missing", summary: "task branch is not linked to a remote PR" },
        {
          code: "verification_required",
          summary: "the committed implementation has no passing verification record",
        },
      ],
      batchOwnership: { role: "none" },
    });

    expect(action).toMatchObject({
      code: "open_pr",
      command: "agentplane pr open T-1 --author CODER",
    });
  });

  it("keeps needs_rework on the CODER path instead of requesting verification", () => {
    expect(
      branchAction([
        {
          code: "implementation_rework_required",
          summary: "implementation rework is required",
        },
        {
          code: "verification_required",
          summary: "the committed implementation has no passing verification record",
        },
      ]),
    ).toMatchObject({
      code: "implementation_rework_required",
      command: null,
    });
  });
});
