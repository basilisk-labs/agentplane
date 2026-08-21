import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import { resolveLocalRecordedCloseFlow } from "./route-decision.js";
import { deriveNextAction } from "./route-decision-next-action.js";
import type { RouteCleanupProbe } from "./route-decision-types.js";
import type { CommandContext } from "./task-backend.js";

const localCloseMocks = vi.hoisted(() => ({
  readTaskPrMetaArtifact: vi.fn(),
  taskCloseAlreadyRecordedOnBase: vi.fn(),
}));

vi.mock("../pr/internal/pr-paths.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  readTaskPrMetaArtifact: localCloseMocks.readTaskPrMetaArtifact,
}));

vi.mock("../task/close-tail-state.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  taskCloseAlreadyRecordedOnBase: localCloseMocks.taskCloseAlreadyRecordedOnBase,
}));

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

describe("local recorded close fallback", () => {
  const ctx = {
    resolvedProject: { gitRoot: process.cwd() },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
  } as CommandContext;
  const staleOpenMeta = JSON.stringify({
    schema_version: 1,
    task_id: "T-1",
    status: "OPEN",
    branch: "task/T-1/work",
    base: "main",
    head_sha: "1111111111111111111111111111111111111111",
    pr_number: 101,
    pr_url: "https://github.com/example/repo/pull/101",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    verify: { status: "pass" },
    pre_merge_closure: {
      state: "closed_before_merge",
      branch: "task/T-1/work",
      pr_number: 101,
      basis_commit: "1111111111111111111111111111111111111111",
      recorded_at: "2026-01-01T00:00:00.000Z",
    },
  });

  beforeEach(() => {
    localCloseMocks.readTaskPrMetaArtifact.mockReset();
    localCloseMocks.taskCloseAlreadyRecordedOnBase.mockReset();
    localCloseMocks.readTaskPrMetaArtifact.mockResolvedValue({ content: staleOpenMeta });
  });

  it("prefers canonical base closure over stale OPEN metadata for a DONE task", async () => {
    localCloseMocks.taskCloseAlreadyRecordedOnBase
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);

    const result = await resolveLocalRecordedCloseFlow({
      ctx,
      task: { ...task, verification: { state: "ok" } },
      workflowMode: "branch_pr",
    });

    expect(localCloseMocks.taskCloseAlreadyRecordedOnBase).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ taskId: "T-1", baseBranch: "origin/main" }),
    );
    expect(localCloseMocks.taskCloseAlreadyRecordedOnBase).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ taskId: "T-1", baseBranch: "main" }),
    );
    expect(result).toMatchObject({
      task: { id: "T-1", status: "DONE", verification: "ok" },
      branch: { name: "task/T-1/work", headSha: null },
      pr: { state: "MERGED", source: "metadata", mergeCommit: null },
      closeTail: { state: "recorded_on_base", base: "main" },
      hostedChecks: { checked: false, reason: "remote lookup skipped" },
      reviewThreads: { checked: false, reason: "remote lookup skipped" },
    });
  });

  it("keeps ordinary OPEN metadata when the task is not finalized", async () => {
    const result = await resolveLocalRecordedCloseFlow({
      ctx,
      task: { ...task, status: "DOING" },
      workflowMode: "branch_pr",
    });

    expect(localCloseMocks.taskCloseAlreadyRecordedOnBase).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      task: { id: "T-1", status: "DOING" },
      pr: { state: "OPEN", source: "metadata", mergeCommit: null },
      closeTail: { state: "not_applicable" },
    });
  });
});

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

  it("requires a fresh semantic review before enqueueing a DONE open PR", () => {
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
            code: "quality_review_stale",
            summary: "the recorded review does not cover the current work unit",
          },
        ],
        batchOwnership: { role: "none" },
      }),
    ).toMatchObject({
      code: "quality_review_required",
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
      command:
        "agentplane cleanup merged --task-id T-1 --finalize --yes --delete-remote-branches --base main",
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
    commit: { hash: "1111111111111111111111111111111111111111", message: "feat: implementation" },
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
      command: expect.stringContaining(
        "agentplane task authority grant T-1 --operation pr.open",
      ) as unknown as string,
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
