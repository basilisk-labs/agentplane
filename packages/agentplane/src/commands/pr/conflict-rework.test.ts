import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  gitDiffNames: vi.fn(),
  gitMergeBase: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  gitDiffNames: mocks.gitDiffNames,
  gitMergeBase: mocks.gitMergeBase,
}));

vi.mock("../shared/git-ops.js", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  gitRevParse: mocks.gitRevParse,
}));

import {
  hasProviderReportedMergeConflict,
  needsProviderConflictReworkPreparation,
  prepareConflictReworkPacket,
} from "./conflict-rework.js";
import type { PrFlowStatusReport } from "./flow-status.js";
import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";

const taskId = "202607252223-THDN0G";
const branch = `task/${taskId}/bound-branch-snapshot-probes`;
const headSha = "040d8df0eaf431e2292eb161efe80e1466ffbd8e";
const baseSha = "e27c938698668ce242243d166f8c7c1b64cce88f";
const mergeBase = "1111111111111111111111111111111111111111";

function report(overrides: Partial<PrFlowStatusReport> = {}): PrFlowStatusReport {
  return {
    task: { id: taskId, status: "DONE", verification: "ok" },
    branch: { name: branch, headSha, metaHeadSha: headSha },
    pr: {
      provider: "github",
      state: "OPEN",
      source: "lookup",
      prNumber: 4626,
      prUrl: "https://github.example/acme/agentplane/pull/4626",
      base: "main",
      headSha,
      mergeCommit: null,
    },
    providerObservation: {
      state: "found",
      pr: {
        prNumber: 4626,
        prUrl: "https://github.example/acme/agentplane/pull/4626",
        status: "OPEN",
        mergedAt: null,
        mergeCommit: null,
        base: "main",
        baseSha,
        headSha,
        headRef: branch,
        mergeability: { state: "conflicting", mergeable: false, providerState: "dirty" },
      },
    },
    publication: { state: "aligned", branch, localHeadSha: headSha, upstreamHeadSha: headSha },
    closeTail: { state: "not_applicable", reason: "implementation PR remains open" },
    hostedChecks: {
      checked: true,
      total: 2,
      pending: 0,
      failing: 0,
      passing: 2,
      missingRequired: [],
      rows: [
        { name: "lint", state: "SUCCESS" },
        { name: "test", state: "SUCCESS" },
      ],
    },
    reviewThreads: { checked: true, unresolved: 0 },
    queue: { present: true, status: "handoff", reason: "provider conflict", updatedAt: "now" },
    handoff: {
      present: true,
      reason: "integration conflict",
      routeStatus: "handoff",
      nextActions: [],
    },
    nextAction: "wait hosted checks, then merge remote PR 4626 through the configured provider API",
    ...overrides,
  };
}

const cleanWorktree = {
  state: "clean",
  branch,
  worktreePath: "/repo/.agentplane/worktrees/thdn",
  changedPaths: [],
} as const satisfies TaskWorktreeCleanliness;

function primeGit(opts: { baseChanged?: string[]; headChanged?: string[] } = {}): void {
  mocks.gitRevParse.mockReset().mockResolvedValue(baseSha);
  mocks.gitMergeBase.mockReset().mockResolvedValue(mergeBase);
  mocks.gitDiffNames
    .mockReset()
    .mockResolvedValueOnce(opts.baseChanged ?? ["README.md", "shared.ts"])
    .mockResolvedValueOnce(opts.headChanged ?? ["feature.ts", "shared.ts"]);
}

describe("provider conflict rework packet", () => {
  it("prepares a bounded THDN-shaped packet without selecting conflict semantics", async () => {
    primeGit();

    const prepared = await prepareConflictReworkPacket({
      gitRoot: "/repo",
      taskId,
      report: report(),
      taskWorktree: cleanWorktree,
    });

    expect(prepared).toMatchObject({
      state: "ready",
      packet: {
        schema_version: 1,
        task_id: taskId,
        provider: {
          pr_number: 4626,
          branch,
          head_sha: headSha,
          base: "main",
          base_sha: baseSha,
          mergeability: { state: "conflicting", mergeable: false, provider_state: "dirty" },
        },
        local: { branch_head_sha: headSha, base_head_sha: baseSha, merge_base_sha: mergeBase },
        task_worktree: { path: cleanWorktree.worktreePath, state: "clean" },
        candidate_conflict_paths: {
          derivation: "paths_modified_on_both_sides_since_merge_base",
          paths: ["shared.ts"],
          total: 1,
          truncated: false,
        },
        safety: {
          preparation_mutations: [],
          cli_must_not: expect.arrayContaining([
            expect.stringMatching(/auto-rebase/u),
            expect.stringMatching(/force-push/u),
          ]),
        },
      },
    });
    if (prepared.state !== "ready") throw new Error("expected ready packet");
    expect(prepared.packet.freshness.token).toMatch(/^sha256:/u);
    expect(prepared.packet.resolution_contract.revalidate_command).toContain(
      `--expect-freshness-token ${prepared.packet.freshness.token}`,
    );
    expect(mocks.gitMergeBase).toHaveBeenCalledWith("/repo", baseSha, headSha);
    expect(mocks.gitDiffNames).toHaveBeenCalledTimes(2);
  });

  it("invalidates when the provider head no longer matches the local task branch", async () => {
    const conflicting = report();
    if (conflicting.providerObservation?.state !== "found") throw new Error("fixture error");
    conflicting.providerObservation.pr.headSha = "2222222222222222222222222222222222222222";

    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: conflicting,
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_head_mismatch" });
  });

  it("fails closed for missing or unavailable provider PR truth", async () => {
    const missing = report({
      pr: { provider: "github", state: "not_found", source: "lookup" },
      providerObservation: { state: "not_found" },
    });
    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: missing,
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_pr_missing" });

    const unavailable = report({
      providerObservation: { state: "unavailable", reason: "GitHub timeout" },
    });
    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: unavailable,
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_pr_unavailable" });
  });

  it.each([
    [
      "missing worktree",
      {
        state: "not_present",
        branch,
        worktreePath: null,
        changedPaths: [],
      } satisfies TaskWorktreeCleanliness,
      "task_worktree_missing",
    ],
    [
      "foreign task artifact",
      {
        state: "dirty",
        branch,
        worktreePath: cleanWorktree.worktreePath,
        changedPaths: [".agentplane/tasks/foreign/README.md"],
      } satisfies TaskWorktreeCleanliness,
      "task_worktree_dirty",
    ],
    [
      "unavailable worktree",
      {
        state: "unavailable",
        branch,
        worktreePath: cleanWorktree.worktreePath,
        changedPaths: [],
        reason: "cannot inspect worktree",
      } satisfies TaskWorktreeCleanliness,
      "task_worktree_unavailable",
    ],
  ])("fails closed for %s", async (_label, taskWorktree, reasonCode) => {
    await expect(
      prepareConflictReworkPacket({ gitRoot: "/repo", taskId, report: report(), taskWorktree }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: reasonCode });
  });

  it("invalidates when local base truth changed after the provider observation", async () => {
    primeGit();
    mocks.gitRevParse.mockResolvedValue("3333333333333333333333333333333333333333");

    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: report(),
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_base_mismatch" });
  });

  it("keeps clean PRs on the ordinary route but fails closed for unknown provider mergeability", async () => {
    const clean = report();
    if (clean.providerObservation?.state !== "found") throw new Error("fixture error");
    clean.providerObservation.pr.mergeability = {
      state: "not_conflicting",
      mergeable: true,
      providerState: "clean",
    };
    expect(hasProviderReportedMergeConflict(clean)).toBe(false);
    expect(needsProviderConflictReworkPreparation(clean)).toBe(false);
    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: clean,
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "not_conflicting" });

    const pending = report();
    if (pending.providerObservation?.state !== "found") throw new Error("fixture error");
    pending.providerObservation.pr.mergeability = {
      state: "pending",
      mergeable: null,
      providerState: "unknown",
    };
    expect(hasProviderReportedMergeConflict(pending)).toBe(false);
    expect(needsProviderConflictReworkPreparation(pending)).toBe(true);
    await expect(
      prepareConflictReworkPacket({
        gitRoot: "/repo",
        taskId,
        report: pending,
        taskWorktree: cleanWorktree,
      }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_mergeability_unknown" });
  });

  it("bounds the emitted candidate path list while retaining its total", async () => {
    const paths = Array.from(
      { length: 34 },
      (_, index) => `shared-${String(index).padStart(2, "0")}.ts`,
    );
    primeGit({ baseChanged: paths, headChanged: paths });

    const prepared = await prepareConflictReworkPacket({
      gitRoot: "/repo",
      taskId,
      report: report(),
      taskWorktree: cleanWorktree,
    });

    if (prepared.state !== "ready") throw new Error("expected ready packet");
    expect(prepared.packet.candidate_conflict_paths).toMatchObject({
      total: 34,
      truncated: true,
    });
    expect(prepared.packet.candidate_conflict_paths.paths).toHaveLength(32);
  });
});
