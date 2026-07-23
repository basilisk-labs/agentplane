import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../shared/errors.js";
import type { PrFlowStatusReport } from "./pr/flow-status.js";
import type { CommandContext } from "./shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  loadBackendTask: vi.fn(),
  resolvePrFlowStatus: vi.fn(),
  gitBranchUpstream: vi.fn(),
  gitRevParse: vi.fn(),
  requireOpenGithubPrAtHead: vi.fn(),
  inspectTaskWorktreeCleanliness: vi.fn(),
  assertTaskWorktreeClean: vi.fn(),
  output: {
    json: vi.fn(),
    line: vi.fn(),
    lines: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("./shared/task-backend.js", () => ({
  loadBackendTask: mocks.loadBackendTask,
}));

vi.mock("./pr/flow-status.js", () => ({
  resolvePrFlowStatus: mocks.resolvePrFlowStatus,
}));

vi.mock("./shared/git-ops.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual = actualUnknown && typeof actualUnknown === "object" ? actualUnknown : {};
  return {
    ...actual,
    gitBranchUpstream: mocks.gitBranchUpstream,
    gitRevParse: mocks.gitRevParse,
  };
});

vi.mock("./pr/provider-head.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual = actualUnknown && typeof actualUnknown === "object" ? actualUnknown : {};
  return {
    ...actual,
    requireOpenGithubPrAtHead: mocks.requireOpenGithubPrAtHead,
  };
});

vi.mock("../cli/output.js", () => ({
  createCliEmitter: () => mocks.output,
}));
vi.mock("./shared/task-worktree-cleanliness.js", () => ({
  inspectTaskWorktreeCleanliness: mocks.inspectTaskWorktreeCleanliness,
  assertTaskWorktreeClean: mocks.assertTaskWorktreeClean,
  summarizeTaskWorktreeChanges: (paths: string[]) => paths.join(", "),
}));

import { runIntegrationQueueDoctor } from "./integrate-queue-doctor-command.js";
import {
  findActiveIntegrationLane,
  normalizeTerminalQueueEntries,
  recoverStaleActiveLane,
  rejectIfQueuedEntryIsStale,
  rejectIfQueuedEntryPublicationIsStale,
  renderIntegrationQueueEntry,
} from "./integrate-queue-lane.js";
import {
  readIntegrationQueue,
  writeIntegrationQueue,
  type IntegrationQueueEntry,
} from "./pr/integrate/queue-state.js";

function queueEntry(): IntegrationQueueEntry {
  return {
    task_id: "T-1",
    branch: "task/T-1/work",
    base: "main",
    head_sha: "head",
    base_sha: "base",
    changed_paths: ["src/work.ts"],
    pr_number: 101,
    pr_url: "https://example.invalid/pull/101",
    priority: 0,
    status: "queued",
    enqueued_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

function report(
  pr: PrFlowStatusReport["pr"],
  closeTail: PrFlowStatusReport["closeTail"],
): PrFlowStatusReport {
  return {
    task: { id: "T-1", status: "DONE", verification: "ok" },
    branch: { name: "task/T-1/work", headSha: "head", metaHeadSha: "head" },
    pr,
    closeTail,
    hostedChecks: { checked: false, reason: "not needed for queue recovery test" },
    reviewThreads: { checked: false, reason: "not needed for queue recovery test" },
    queue: { present: true, status: "queued", reason: null, updatedAt: null },
    handoff: { present: false },
    nextAction: "wait hosted checks",
  };
}

const openReport = report(
  {
    provider: "github",
    state: "OPEN",
    source: "lookup",
    prNumber: 101,
    prUrl: "https://example.invalid/pull/101",
    base: "main",
    headSha: "head",
    mergeCommit: null,
  },
  {
    state: "not_applicable",
    reason: "implementation PR is not merged or merge commit is unavailable",
  },
);

const completedReport = report(
  {
    provider: "github",
    state: "MERGED",
    source: "lookup",
    prNumber: 101,
    prUrl: "https://example.invalid/pull/101",
    base: "main",
    headSha: "head",
    mergeCommit: "merge",
  },
  { state: "recorded_on_base", base: "main" },
);

describe("integration queue terminal recovery", () => {
  const roots: string[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.loadBackendTask.mockResolvedValue({ task: { status: "DONE" } });
    mocks.gitBranchUpstream.mockResolvedValue("origin/task/T-1/work");
    mocks.gitRevParse.mockResolvedValue("head");
    mocks.requireOpenGithubPrAtHead.mockResolvedValue({
      prNumber: 101,
      prUrl: "https://example.invalid/pull/101",
      status: "OPEN",
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      headSha: "head",
    });
    mocks.inspectTaskWorktreeCleanliness.mockResolvedValue({
      state: "clean",
      branch: "task/T-1/work",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: [],
    });
    mocks.assertTaskWorktreeClean.mockReturnValue();
  });

  afterEach(async () => {
    await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
  });

  async function makeQueueRoot(): Promise<string> {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-queue-terminal-"));
    roots.push(root);
    await writeIntegrationQueue(root, { schema_version: 1, entries: [queueEntry()] });
    return root;
  }

  it("marks a queued entry rework when its actual task worktree is dirty", async () => {
    mocks.inspectTaskWorktreeCleanliness.mockResolvedValueOnce({
      state: "dirty",
      branch: "task/T-1/work",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: ["src/implementation.ts", "untracked.txt"],
    });

    await expect(
      rejectIfQueuedEntryIsStale({ gitRoot: "/repo", entry: queueEntry() }),
    ).resolves.toMatchObject({
      task_id: "T-1",
      status: "rework",
      reason:
        "task worktree contains uncommitted changes after enqueue: src/implementation.ts, untracked.txt",
    });
    expect(mocks.gitRevParse).not.toHaveBeenCalled();
  });

  it("fails closed when queued task-worktree state cannot be inspected", async () => {
    const unavailable = {
      state: "unavailable",
      branch: "task/T-1/work",
      worktreePath: "/repo/.agentplane/worktrees/T-1",
      changedPaths: [],
      reason: "git status failed",
    };
    mocks.inspectTaskWorktreeCleanliness.mockResolvedValueOnce(unavailable);
    mocks.assertTaskWorktreeClean.mockImplementationOnce(() => {
      throw new CliError({
        code: "E_GIT",
        message: "Task worktree state could not be inspected",
        context: { reason_code: "task_worktree_state_unavailable" },
      });
    });

    await expect(
      rejectIfQueuedEntryIsStale({ gitRoot: "/repo", entry: queueEntry() }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
      context: { reason_code: "task_worktree_state_unavailable" },
    });
  });

  it("does not normalize a pre-merge DONE task while its provider PR is open", async () => {
    const root = await makeQueueRoot();
    mocks.resolvePrFlowStatus.mockResolvedValue(openReport);

    await normalizeTerminalQueueEntries({
      ctx: {} as CommandContext,
      cwd: root,
      gitRoot: root,
      quiet: true,
    });

    const queue = await readIntegrationQueue(root);
    expect(queue.entries[0]?.status).toBe("queued");
    expect(mocks.resolvePrFlowStatus).toHaveBeenCalledOnce();
  });

  it("keeps doctor from repairing an open PR entry and closes it after Hosted Close evidence", async () => {
    const root = await makeQueueRoot();
    mocks.resolvePrFlowStatus.mockResolvedValueOnce(openReport);

    await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: true },
    });

    const openQueue = await readIntegrationQueue(root);
    expect(openQueue.entries[0]?.status).toBe("queued");

    mocks.resolvePrFlowStatus.mockResolvedValueOnce(completedReport);
    await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: true },
    });

    const completedQueue = await readIntegrationQueue(root);
    expect(completedQueue.entries[0]?.status).toBe("done");
  });

  it("reports the exact mutex path without deleting or repairing a held lock", async () => {
    const root = await makeQueueRoot();
    const lockPath = path.join(root, ".agentplane", "cache", "locks", "integration-queue.lock");
    await mkdir(lockPath, { recursive: true });
    await writeFile(path.join(lockPath, "owner.json"), "{invalid", "utf8");

    const jsonCode = await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: true },
    });
    expect(jsonCode).toBe(5);
    const rawJsonPayload: unknown = mocks.output.json.mock.calls[0]?.[0];
    const jsonPayload = rawJsonPayload as {
      applied?: unknown;
      mutex?: {
        state?: unknown;
        lock_path?: unknown;
        manual_recovery_required?: unknown;
      };
    };
    expect(jsonPayload.applied).toBe(false);
    expect(jsonPayload.mutex).toEqual({
      state: "invalid",
      reason: "integration queue lock owner is missing or invalid",
      lock_path: lockPath,
      manual_recovery_required: true,
    });

    const textCode = await runIntegrationQueueDoctor({
      commandCtx: { resolvedProject: { gitRoot: root } } as CommandContext,
      ctx: { cwd: root, rootOverride: null } as never,
      parsed: { fix: true, dryRun: false, json: false },
    });
    expect(textCode).toBe(5);
    expect(mocks.output.line).toHaveBeenCalledWith(expect.stringContaining(`path=${lockPath}`));
  });

  it("hands off provider unavailability without classifying implementation as rework", async () => {
    mocks.requireOpenGithubPrAtHead.mockRejectedValue(
      new CliError({
        code: "E_NETWORK",
        message: "GitHub authentication required",
        context: { reason_code: "github_pr_state_unavailable" },
      }),
    );

    await expect(
      rejectIfQueuedEntryPublicationIsStale({
        gitRoot: "/repo",
        entry: queueEntry(),
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "integration_queue_provider_unavailable" },
    });
  });

  it("classifies a confirmed provider head mismatch as rework", async () => {
    mocks.requireOpenGithubPrAtHead.mockRejectedValue(
      new CliError({
        code: "E_VALIDATION",
        message: "hosted head differs from the prepared branch",
      }),
    );

    await expect(
      rejectIfQueuedEntryPublicationIsStale({
        gitRoot: "/repo",
        entry: queueEntry(),
      }),
    ).resolves.toMatchObject({
      status: "rework",
      reason: "hosted head differs from the prepared branch",
    });
  });

  it("renders and blocks on a legacy-compatible active integration reservation", () => {
    const reserved: IntegrationQueueEntry = {
      ...queueEntry(),
      status: "handoff",
      claimed_by: "worker",
      claimed_at: "2026-01-01T00:00:00.000Z",
      lease_expires_at: "2026-01-01T00:30:00.000Z",
      claim_token: "claim-1",
      active_operation: "integration",
    };

    expect(findActiveIntegrationLane([reserved])).toBe(reserved);
    expect(renderIntegrationQueueEntry(reserved)).toContain("handoff");
  });

  it("does not apply a stale recovery decision to a replacement reservation", async () => {
    const root = await makeQueueRoot();
    const snapshot: IntegrationQueueEntry = {
      ...queueEntry(),
      status: "handoff",
      claimed_by: "worker",
      claimed_at: "2026-01-01T00:00:00.000Z",
      lease_expires_at: "2026-01-01T00:30:00.000Z",
      claim_token: "claim-1",
      active_operation: "integration",
    };
    await writeIntegrationQueue(root, { schema_version: 1, entries: [snapshot] });
    mocks.resolvePrFlowStatus.mockImplementation(async () => {
      await writeIntegrationQueue(root, {
        schema_version: 1,
        entries: [
          {
            ...snapshot,
            claim_token: "claim-2",
            updated_at: "2026-01-01T00:01:00.000Z",
          },
        ],
      });
      return completedReport;
    });

    await expect(
      recoverStaleActiveLane({
        ctx: {} as CommandContext,
        cwd: root,
        gitRoot: root,
        entry: snapshot,
        quiet: true,
      }),
    ).resolves.toBe(false);

    const currentQueue = await readIntegrationQueue(root);
    expect(currentQueue.entries[0]).toMatchObject({
      status: "handoff",
      claim_token: "claim-2",
    });
  });
});
