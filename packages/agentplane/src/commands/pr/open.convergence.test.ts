import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import { buildObservedChangeRequestMeta, buildOpenedPrMeta } from "../shared/pr-meta.js";

const mocks = vi.hoisted(() => ({
  loadTaskCommandContext: vi.fn(),
  syncPrArtifacts: vi.fn(),
  maybeAutoCommitTaskPrArtifacts: vi.fn(),
  pushTaskBranchUpstreamIfConfigured: vi.fn(),
  resolvePrFlowStatus: vi.fn(),
}));

vi.mock("../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: mocks.loadTaskCommandContext,
}));
vi.mock("./internal/sync.js", () => ({ syncPrArtifacts: mocks.syncPrArtifacts }));
vi.mock("./internal/auto-commit.js", () => ({
  maybeAutoCommitTaskPrArtifacts: mocks.maybeAutoCommitTaskPrArtifacts,
}));
vi.mock("./branch-publication.js", () => ({
  pushTaskBranchUpstreamIfConfigured: mocks.pushTaskBranchUpstreamIfConfigured,
}));
vi.mock("./flow-status.js", () => ({ resolvePrFlowStatus: mocks.resolvePrFlowStatus }));

import { cmdPrOpen } from "./open.js";

const taskId = "202610271638-AX942H";
const branch = `task/${taskId}/publication`;
const prDir = `/repo/.agentplane/tasks/${taskId}/pr`;

function syncedMeta(prNumber?: number) {
  return {
    branch,
    base: "main",
    ...(prNumber ? { pr_number: prNumber } : {}),
  };
}

function syncResult(prNumber?: number) {
  return {
    meta: syncedMeta(prNumber),
    prDir,
    resolved: { gitRoot: "/repo" },
    openOutcome: prNumber ? { action: "created", message: `created #${prNumber}` } : null,
  };
}

describe("native PR publication artifact convergence", () => {
  const statusChangedPaths = vi.fn();
  const ctx = {
    resolvedProject: { gitRoot: "/repo" },
    config: {
      paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
    },
    git: { statusChangedPaths },
  } as unknown as CommandContext;

  beforeEach(() => {
    vi.resetAllMocks();
    statusChangedPaths.mockResolvedValue([]);
    mocks.loadTaskCommandContext.mockResolvedValue({
      command: ctx,
      execution: { selected_mode: "branch_pr", base_ref: "main" },
    });
    mocks.syncPrArtifacts
      .mockResolvedValueOnce(syncResult())
      .mockResolvedValueOnce(syncResult(6947));
    mocks.maybeAutoCommitTaskPrArtifacts.mockResolvedValue(true);
    mocks.pushTaskBranchUpstreamIfConfigured.mockResolvedValue(true);
    mocks.resolvePrFlowStatus.mockResolvedValue({
      pr: { state: "OPEN", prNumber: 6947 },
      publication: { state: "aligned" },
    });
  });

  it("commits the observed PR link after creation and publishes the final head", async () => {
    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).resolves.toBe(0);

    expect(mocks.maybeAutoCommitTaskPrArtifacts).toHaveBeenCalledTimes(2);
    expect(mocks.pushTaskBranchUpstreamIfConfigured).toHaveBeenCalledTimes(2);
    expect(mocks.pushTaskBranchUpstreamIfConfigured).toHaveBeenLastCalledWith(
      expect.objectContaining({ branch, prNumber: 6947 }),
    );
    expect(mocks.resolvePrFlowStatus).toHaveBeenCalledTimes(1);
    expect(mocks.syncPrArtifacts).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ remoteMode: "sync-only" }),
    );
    expect(mocks.syncPrArtifacts).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ remoteMode: "auto" }),
    );
  });

  it("does not create a second commit or push when the linked PR artifacts are unchanged", async () => {
    mocks.syncPrArtifacts.mockReset();
    mocks.syncPrArtifacts
      .mockResolvedValueOnce(syncResult(6947))
      .mockResolvedValueOnce(syncResult(6947));
    mocks.maybeAutoCommitTaskPrArtifacts.mockResolvedValue(false);

    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).resolves.toBe(0);

    expect(mocks.maybeAutoCommitTaskPrArtifacts).toHaveBeenCalledTimes(2);
    expect(mocks.pushTaskBranchUpstreamIfConfigured).toHaveBeenCalledTimes(1);
    expect(mocks.resolvePrFlowStatus).toHaveBeenCalledTimes(1);
  });

  it("preserves metadata and updated_at when the same hosted PR is observed again", () => {
    const observed = {
      prNumber: 6947,
      prUrl: "https://github.com/basilisk-labs/agentplane/pull/6947",
      status: "OPEN" as const,
      mergedAt: null,
      mergeCommit: null,
      base: "main",
      baseSha: "base-head",
      headSha: "branch-head",
      headRef: branch,
    };
    const first = buildObservedChangeRequestMeta({
      meta: buildOpenedPrMeta({
        taskId,
        branch,
        base: "main",
        previousMeta: null,
        at: "2026-10-27T16:00:00Z",
      }),
      observed,
      at: "2026-10-27T16:01:00Z",
    });
    const second = buildObservedChangeRequestMeta({
      meta: buildOpenedPrMeta({
        taskId,
        branch,
        base: "main",
        previousMeta: first,
        at: "2026-10-27T16:02:00Z",
      }),
      observed,
      at: "2026-10-27T16:02:00Z",
    });

    expect(second).toEqual(first);
    expect(second.updated_at).toBe("2026-10-27T16:01:00Z");
  });

  it("fails before a second push when the final PR artifact cannot be committed", async () => {
    statusChangedPaths.mockResolvedValue([`.agentplane/tasks/${taskId}/pr/meta.json`]);
    mocks.maybeAutoCommitTaskPrArtifacts.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).rejects.toThrow("uncommitted task artifacts");
    expect(mocks.pushTaskBranchUpstreamIfConfigured).toHaveBeenCalledTimes(1);
    expect(mocks.resolvePrFlowStatus).not.toHaveBeenCalled();
  });

  it("does not claim success when the final artifact head cannot be published", async () => {
    mocks.pushTaskBranchUpstreamIfConfigured
      .mockResolvedValueOnce(true)
      .mockRejectedValueOnce(new Error("push rejected"));

    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).rejects.toThrow("push rejected");
    expect(mocks.resolvePrFlowStatus).not.toHaveBeenCalled();
  });

  it("does not claim success when the hosted PR head differs from the published head", async () => {
    mocks.resolvePrFlowStatus.mockResolvedValue({
      pr: { state: "OPEN", prNumber: 6947 },
      publication: { state: "hosted_mismatch" },
    });

    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).rejects.toThrow("does not confirm the final local and upstream head");
  });

  it("keeps failed hosted creation staged without inventing a PR identity", async () => {
    mocks.syncPrArtifacts.mockReset();
    mocks.syncPrArtifacts.mockResolvedValueOnce(syncResult()).mockResolvedValueOnce({
      ...syncResult(),
      openOutcome: { action: "staged", message: "hosted creation unavailable" },
    });

    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", quiet: true }),
    ).resolves.toBe(0);

    expect(mocks.pushTaskBranchUpstreamIfConfigured).toHaveBeenLastCalledWith(
      expect.objectContaining({ prNumber: null }),
    );
    expect(mocks.resolvePrFlowStatus).not.toHaveBeenCalled();
  });

  it("keeps sync-only mode local and does not publish or read hosted state", async () => {
    await expect(
      cmdPrOpen({ ctx, cwd: "/repo", taskId, author: "CODER", syncOnly: true, quiet: true }),
    ).resolves.toBe(0);

    expect(mocks.syncPrArtifacts).toHaveBeenCalledTimes(1);
    expect(mocks.pushTaskBranchUpstreamIfConfigured).not.toHaveBeenCalled();
    expect(mocks.resolvePrFlowStatus).not.toHaveBeenCalled();
  });
});
