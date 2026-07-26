import { describe, expect, it } from "vitest";

import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import type { GithubBasePullRequestProtection } from "./integrate/internal/github-protection.js";
import type { GithubPrMergeability } from "./internal/sync-github.js";
import {
  hasProviderReportedMergeConflict,
  needsProviderConflictReworkPreparation,
  prepareConflictReworkPacket,
  type ConflictReworkGitOps,
} from "./conflict-rework.js";
import type { PrFlowStatusReport } from "./flow-status.js";

const taskId = "202607252223-THDN0G";
const branch = `task/${taskId}/bound-branch-snapshot-probes`;
const headSha = "040d8df0eaf431e2292eb161efe80e1466ffbd8e";
const baseSha = "e27c938698668ce242243d166f8c7c1b64cce88f";
const mergeBase = "1111111111111111111111111111111111111111";

const protectedBase = {
  state: "protected",
  baseBranch: "main",
} as const satisfies GithubBasePullRequestProtection;

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
    queue: {
      present: true,
      status: "handoff",
      reason: "provider conflict",
      updatedAt: "now",
      branch,
      base: "main",
      headSha,
      baseSha,
      prNumber: 4626,
      leaseExpiresAt: "2026-07-26T01:00:00.000Z",
    },
    handoff: {
      present: true,
      reason: "protected-base integration conflict",
      routeKind: "protected_base_integrate",
      routeStatus: "awaiting_github_merge",
      branch,
      baseBranch: "main",
      headSha,
      prBranch: branch,
      routePrNumber: 4626,
      routeProviderBaseSha: baseSha,
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

function primeGit(
  opts: {
    baseChanged?: string[];
    headChanged?: string[];
    localBase?: string;
  } = {},
) {
  const calls = { diffNames: 0, mergeBase: [] as string[][] };
  const gitOps: ConflictReworkGitOps = {
    resolveRef: () => Promise.resolve(opts.localBase ?? baseSha),
    mergeBase: (gitRoot, base, head) => {
      calls.mergeBase.push([gitRoot, base, head]);
      return Promise.resolve(mergeBase);
    },
    diffNames: () => {
      calls.diffNames += 1;
      return Promise.resolve(
        calls.diffNames === 1
          ? (opts.baseChanged ?? ["README.md", "shared.ts"])
          : (opts.headChanged ?? ["feature.ts", "shared.ts"]),
      );
    },
  };
  return { calls, gitOps };
}

function prepare(
  opts: {
    report?: PrFlowStatusReport;
    taskWorktree?: TaskWorktreeCleanliness;
    baseProtection?: GithubBasePullRequestProtection;
    git?: ReturnType<typeof primeGit>;
    now?: Date;
  } = {},
) {
  const git = opts.git ?? primeGit();
  return prepareConflictReworkPacket({
    gitRoot: "/repo",
    taskId,
    report: opts.report ?? report(),
    taskWorktree: opts.taskWorktree ?? cleanWorktree,
    baseProtection: opts.baseProtection ?? protectedBase,
    gitOps: git.gitOps,
    now: opts.now,
  });
}

describe("provider conflict rework packet", () => {
  it("prepares a bounded THDN-shaped packet without selecting conflict semantics", async () => {
    const git = primeGit();
    const conflicting = report();
    expect(hasProviderReportedMergeConflict(conflicting)).toBe(true);
    expect(needsProviderConflictReworkPreparation(conflicting)).toBe(true);
    const prepared = await prepare({ git, report: conflicting });

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
        base_protection: {
          provider: "github",
          base: "main",
          state: "protected_pull_request_merge",
        },
        local: { branch_head_sha: headSha, base_head_sha: baseSha, merge_base_sha: mergeBase },
        task_worktree: { path: cleanWorktree.worktreePath, state: "clean" },
        candidate_conflict_paths: {
          derivation: "paths_modified_on_both_sides_since_merge_base",
          paths: ["shared.ts"],
          total: 1,
          truncated: false,
        },
        safety: { preparation_mutations: [] },
      },
    });
    if (prepared.state !== "ready") throw new Error("expected ready packet");
    expect(prepared.packet.safety.cli_must_not.some((rule) => rule.includes("auto-rebase"))).toBe(
      true,
    );
    expect(prepared.packet.safety.cli_must_not.some((rule) => rule.includes("force-push"))).toBe(
      true,
    );
    expect(prepared.packet.freshness.token).toMatch(/^sha256:/u);
    expect(prepared.packet.resolution_contract.revalidate_command).toContain(
      `--expect-freshness-token ${prepared.packet.freshness.token}`,
    );
    expect(git.calls.mergeBase).toEqual([["/repo", baseSha, headSha]]);
    expect(git.calls.diffNames).toBe(2);
  });

  it("invalidates when the provider head no longer matches the local task branch", async () => {
    const conflicting = report();
    if (conflicting.providerObservation?.state !== "found") throw new Error("fixture error");
    conflicting.providerObservation.pr.headSha = "2222222222222222222222222222222222222222";

    await expect(prepare({ report: conflicting })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_head_mismatch",
    });
  });

  it("fails closed for missing or unavailable provider PR truth", async () => {
    const missing = report({
      pr: { provider: "github", state: "not_found", source: "lookup" },
      providerObservation: { state: "not_found" },
    });
    await expect(prepare({ report: missing })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_pr_missing",
    });

    const unavailable = report({
      providerObservation: { state: "unavailable", reason: "GitHub timeout" },
    });
    await expect(prepare({ report: unavailable })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_pr_unavailable",
    });
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
    await expect(prepare({ taskWorktree })).resolves.toMatchObject({
      state: "invalid",
      reason_code: reasonCode,
    });
  });

  it("invalidates when local base truth changed after the provider observation", async () => {
    await expect(
      prepare({ git: primeGit({ localBase: "3333333333333333333333333333333333333333" }) }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_base_mismatch" });
  });

  it.each(["clean", "behind", "unstable", "blocked"] as const)(
    "keeps coherent mergeable=true/%s provider truth on the ordinary route without claiming readiness",
    async (providerState) => {
      const git = primeGit();
      const nonConflicting = report();
      if (nonConflicting.providerObservation?.state !== "found") {
        throw new Error("fixture error");
      }
      nonConflicting.providerObservation.pr.mergeability = {
        state: "not_conflicting",
        mergeable: true,
        providerState,
      };
      expect(hasProviderReportedMergeConflict(nonConflicting)).toBe(false);
      expect(needsProviderConflictReworkPreparation(nonConflicting)).toBe(false);
      await expect(prepare({ git, report: nonConflicting })).resolves.toMatchObject({
        state: "not_conflicting",
      });
      expect(git.calls.mergeBase).toEqual([]);
      expect(git.calls.diffNames).toBe(0);
    },
  );

  it.each([
    ["absent mergeability", undefined],
    [
      "pending mergeability",
      {
        state: "pending",
        mergeable: null,
        providerState: "unknown",
      } satisfies GithubPrMergeability,
    ],
    [
      "unsettled null and pending mergeability",
      {
        state: "unknown",
        mergeable: null,
        providerState: "pending",
      } satisfies GithubPrMergeability,
    ],
    [
      "contradictory conflict mergeability",
      {
        state: "conflicting",
        mergeable: false,
        providerState: "unknown",
      } satisfies GithubPrMergeability,
    ],
    [
      "contradictory true and dirty mergeability",
      {
        state: "not_conflicting",
        mergeable: true,
        providerState: "dirty",
      } satisfies GithubPrMergeability,
    ],
    [
      "contradictory true and conflicting mergeability",
      {
        state: "not_conflicting",
        mergeable: true,
        providerState: "conflicting",
      } satisfies GithubPrMergeability,
    ],
  ] as const)("fails closed for %s", async (_label, mergeability) => {
    const uncertain = report();
    if (uncertain.providerObservation?.state !== "found") throw new Error("fixture error");
    if (mergeability === undefined) delete uncertain.providerObservation.pr.mergeability;
    else uncertain.providerObservation.pr.mergeability = mergeability;

    expect(hasProviderReportedMergeConflict(uncertain)).toBe(false);
    expect(needsProviderConflictReworkPreparation(uncertain)).toBe(true);
    await expect(prepare({ report: uncertain })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_mergeability_unknown",
    });
  });

  it("bounds candidate paths, hosted-check rows, and missing required checks deterministically", async () => {
    const paths = Array.from(
      { length: 34 },
      (_, index) => `shared-${String(index).padStart(2, "0")}.ts`,
    );
    const checkRows = Array.from({ length: 68 }, (_, index) => ({
      name: `check-${String(67 - index).padStart(2, "0")}`,
      state: "SUCCESS",
    }));
    const missingRequired = Array.from(
      { length: 36 },
      (_, index) => `required-${String(35 - index).padStart(2, "0")}`,
    );
    const oversized = report({
      hostedChecks: {
        checked: true,
        total: checkRows.length,
        passing: checkRows.length,
        pending: 0,
        failing: 0,
        rows: checkRows,
        missingRequired: [...missingRequired, "required-00"],
      },
    });
    const prepared = await prepare({
      report: oversized,
      git: primeGit({ baseChanged: paths, headChanged: paths }),
    });

    if (prepared.state !== "ready") throw new Error("expected ready packet");
    expect(prepared.packet.candidate_conflict_paths).toMatchObject({ total: 34, truncated: true });
    expect(prepared.packet.candidate_conflict_paths.paths).toHaveLength(32);
    if (!prepared.packet.checks.checked) throw new Error("expected checked hosted checks");
    expect(prepared.packet.checks.rows).toMatchObject({ total: 68, truncated: true });
    expect(prepared.packet.checks.rows.entries).toHaveLength(64);
    expect(prepared.packet.checks.rows.entries[0]).toEqual({ name: "check-00", state: "SUCCESS" });
    expect(prepared.packet.checks.missingRequired).toMatchObject({ total: 36, truncated: true });
    expect(prepared.packet.checks.missingRequired.names).toHaveLength(32);
    expect(prepared.packet.checks.missingRequired.names[0]).toBe("required-00");
  });

  it("allows a matching protected-base handoff when no active queue entry remains", async () => {
    const viaHandoff = report({ queue: { present: false } });

    await expect(prepare({ report: viaHandoff })).resolves.toMatchObject({ state: "ready" });
  });

  it("invalidates semantic rework when the protected-base handoff observed a stale provider base", async () => {
    const viaHandoff = report({ queue: { present: false } });
    if (!viaHandoff.handoff.present) throw new Error("fixture error");
    viaHandoff.handoff.routeProviderBaseSha = "3333333333333333333333333333333333333333";
    const git = primeGit();

    await expect(prepare({ git, report: viaHandoff })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
    expect(git.calls.mergeBase).toEqual([]);
    expect(git.calls.diffNames).toBe(0);
  });

  it("rejects an expired claimed lease but accepts a current claimed lease", async () => {
    const now = new Date("2026-07-26T00:00:00.000Z");
    const expired = report({ handoff: { present: false } });
    if (!expired.queue.present) throw new Error("fixture error");
    expired.queue = {
      ...expired.queue,
      status: "claimed",
      leaseExpiresAt: "2026-07-25T23:59:59.000Z",
    };
    await expect(prepare({ report: expired, now })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });

    const current = report({ handoff: { present: false } });
    if (!current.queue.present) throw new Error("fixture error");
    current.queue = {
      ...current.queue,
      status: "claimed",
      leaseExpiresAt: "2026-07-26T00:00:01.000Z",
    };
    await expect(prepare({ report: current, now })).resolves.toMatchObject({ state: "ready" });
  });

  it("rejects a protected-base handoff recorded for a different PR", async () => {
    const staleHandoff = report({ queue: { present: false } });
    if (!staleHandoff.handoff.present) throw new Error("fixture error");
    staleHandoff.handoff = { ...staleHandoff.handoff, routePrNumber: 4627 };

    await expect(prepare({ report: staleHandoff })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
  });

  it("rejects nonqueued or unverified task PR conflicts before semantic routing", async () => {
    const nonqueued = report({ queue: { present: false }, handoff: { present: false } });
    await expect(prepare({ report: nonqueued })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });

    const doing = report({ task: { id: taskId, status: "DOING", verification: "ok" } });
    await expect(prepare({ report: doing })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
  });

  it("rejects unprotected, unavailable, or stale base-protection observations", async () => {
    await expect(
      prepare({ baseProtection: { state: "unprotected", baseBranch: "main" } }),
    ).resolves.toMatchObject({ state: "invalid", reason_code: "provider_base_unprotected" });
    await expect(
      prepare({
        baseProtection: {
          state: "unavailable",
          baseBranch: "main",
          reason: "GitHub protection lookup timed out",
        },
      }),
    ).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_base_protection_unavailable",
    });
    await expect(
      prepare({ baseProtection: { state: "protected", baseBranch: "release/0.7" } }),
    ).resolves.toMatchObject({
      state: "invalid",
      reason_code: "provider_base_protection_mismatch",
    });
  });
});
