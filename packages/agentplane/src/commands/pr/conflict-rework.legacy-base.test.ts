import { describe, expect, it } from "vitest";

import type { TaskWorktreeCleanliness } from "../shared/task-worktree-cleanliness.js";
import type { GithubBasePullRequestProtection } from "./integrate/internal/github-protection.js";
import { createLegacyProtectedConflictAdoptionReceipt } from "./integrate/queue-state.js";
import { prepareConflictReworkPacket, type ConflictReworkGitOps } from "./conflict-rework.js";
import type { PrFlowStatusReport } from "./flow-status.js";

const taskId = "202607252223-THDN0G";
const branch = `task/${taskId}/bound-branch-snapshot-probes`;
const headSha = "040d8df0eaf431e2292eb161efe80e1466ffbd8e";
const providerBaseSha = "1111111111111111111111111111111111111111";
const queueBaseSha = "2222222222222222222222222222222222222222";
const currentBaseSha = "3333333333333333333333333333333333333333";
const conflictMergeBaseSha = "0000000000000000000000000000000000000000";

const protectedBase = {
  state: "protected",
  baseBranch: "main",
} as const satisfies GithubBasePullRequestProtection;

const cleanWorktree = {
  state: "clean",
  branch,
  worktreePath: "/repo/.agentplane/worktrees/thdn",
  changedPaths: [],
} as const satisfies TaskWorktreeCleanliness;

function adoptionReceipt(
  opts: {
    queueBaseSha?: string;
    queueUpdatedAt?: string;
    currentBaseSha?: string;
  } = {},
) {
  return createLegacyProtectedConflictAdoptionReceipt({
    adoptedAt: "2026-07-26T05:30:00.000Z",
    evidence: {
      schema_version: 1,
      kind: "legacy_protected_conflict_adoption",
      task_id: taskId,
      source_handoff: {
        created_at: "2026-07-25T23:59:34.585Z",
        from_role: "INTEGRATOR",
        route_kind: "protected_base_integrate",
        route_status: "awaiting_github_merge",
        provider_base_sha_state: "absent",
        branch,
        base: "main",
        head_sha: headSha,
        pr_branch: branch,
        pr_number: 4626,
      },
      provider: {
        pr_number: 4626,
        branch,
        head_sha: headSha,
        base: "main",
        base_sha: providerBaseSha,
      },
      queue: {
        branch,
        base: "main",
        head_sha: headSha,
        base_sha: opts.queueBaseSha ?? queueBaseSha,
        pr_number: 4626,
        updated_at: opts.queueUpdatedAt ?? "2026-07-26T05:24:58.052Z",
      },
      topology: {
        provider_base_sha: providerBaseSha,
        queue_base_sha: opts.queueBaseSha ?? queueBaseSha,
        observed_current_base_sha: opts.currentBaseSha ?? currentBaseSha,
        provider_to_queue: "ancestor_or_equal",
        queue_to_current: "ancestor_or_equal",
        provider_to_current: "strict_ancestor",
      },
    },
  });
}

function key(left: string, right: string): string {
  return `${left}:${right}`;
}

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
        baseSha: providerBaseSha,
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
      status: "rework",
      reason: "released after protected provider merge failed",
      updatedAt: "2026-07-26T05:24:58.052Z",
      branch,
      base: "main",
      headSha,
      baseSha: queueBaseSha,
      prNumber: 4626,
      leaseExpiresAt: null,
      legacyProtectedConflictAdoption: adoptionReceipt(),
    },
    handoff: {
      present: true,
      reason: "branch_pr integration is waiting for the GitHub PR merge into main.",
      routeKind: "protected_base_integrate",
      routeStatus: "awaiting_github_merge",
      branch,
      baseBranch: "main",
      headSha,
      prBranch: branch,
      routePrNumber: 4626,
      routeProviderBaseSha: null,
      routeProviderBaseShaState: "absent",
      createdAt: "2026-07-25T23:59:34.585Z",
      fromRole: "INTEGRATOR",
      nextActions: [],
    },
    nextAction: "wait hosted checks, then merge remote PR 4626 through the configured provider API",
    ...overrides,
  };
}

function legacyGit(
  opts: {
    localBase?: string;
    resolveError?: Error;
    mergeBases?: Record<string, string | Error>;
    diffs?: Record<string, string[]>;
  } = {},
) {
  const calls = { mergeBase: [] as string[][], diffNames: [] as string[][] };
  const mergeBases = {
    [key(providerBaseSha, queueBaseSha)]: providerBaseSha,
    [key(queueBaseSha, currentBaseSha)]: queueBaseSha,
    [key(currentBaseSha, headSha)]: conflictMergeBaseSha,
    ...opts.mergeBases,
  };
  const diffs = {
    [key(conflictMergeBaseSha, currentBaseSha)]: ["current-only-overlap.ts", "shared.ts"],
    [key(conflictMergeBaseSha, headSha)]: ["current-only-overlap.ts", "head-only.ts", "shared.ts"],
    ...opts.diffs,
  };
  const gitOps: ConflictReworkGitOps = {
    resolveRef: () => {
      if (opts.resolveError) return Promise.reject(opts.resolveError);
      return Promise.resolve(opts.localBase ?? currentBaseSha);
    },
    mergeBase: (_gitRoot, left, right) => {
      calls.mergeBase.push([left, right]);
      const result = mergeBases[key(left, right)];
      if (result instanceof Error) return Promise.reject(result);
      if (!result)
        return Promise.reject(new Error(`missing merge base fixture for ${left}:${right}`));
      return Promise.resolve(result);
    },
    diffNames: (_gitRoot, left, right) => {
      calls.diffNames.push([left, right]);
      return Promise.resolve(diffs[key(left, right)] ?? []);
    },
  };
  return { calls, gitOps };
}

function prepare(opts: { report?: PrFlowStatusReport; git?: ReturnType<typeof legacyGit> } = {}) {
  const git = opts.git ?? legacyGit();
  return prepareConflictReworkPacket({
    gitRoot: "/repo",
    taskId,
    report: opts.report ?? report(),
    taskWorktree: cleanWorktree,
    baseProtection: protectedBase,
    gitOps: git.gitOps,
  });
}

describe("legacy protected conflict-base reconciliation", () => {
  it("prepares a read-only packet only for the proven provider-to-queue-to-current topology", async () => {
    const git = legacyGit();
    const prepared = await prepare({ git });

    if (prepared.state !== "ready") throw new Error("expected legacy packet to be ready");
    expect(prepared.packet.base_context).toEqual({
      provider_conflict_base_sha: providerBaseSha,
      current_base_sha: currentBaseSha,
      relation: "provider_base_ancestor_of_current_base",
      legacy_queue_base_sha: queueBaseSha,
      legacy_queue_relation:
        "provider_base_ancestor_of_queue_base_and_queue_base_ancestor_of_current_base",
    });
    expect(prepared.packet.route_evidence).toMatchObject({
      kind: "legacy_adopted_protected_base_handoff",
      queue: {
        status: "rework",
        base_sha: queueBaseSha,
        updated_at: "2026-07-26T05:24:58.052Z",
      },
      handoff: { provider_base_sha: null, provider_base_sha_state: "absent" },
    });
    expect(prepared.packet.local).toMatchObject({
      base_head_sha: currentBaseSha,
      merge_base_sha: conflictMergeBaseSha,
    });
    expect(prepared.packet.candidate_conflict_paths).toMatchObject({
      paths: ["current-only-overlap.ts", "shared.ts"],
      total: 2,
    });
    expect(git.calls.mergeBase).toEqual([
      [providerBaseSha, queueBaseSha],
      [queueBaseSha, currentBaseSha],
      [currentBaseSha, headSha],
    ]);
    expect(git.calls.diffNames).toEqual([
      [conflictMergeBaseSha, currentBaseSha],
      [conflictMergeBaseSha, headSha],
    ]);
    expect(prepared.packet.safety.preparation_mutations).toEqual([]);
  });

  it("does not use the legacy exception when the provider base equals current local base", async () => {
    const git = legacyGit({ localBase: providerBaseSha });

    await expect(prepare({ git })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
    expect(git.calls.mergeBase).toEqual([]);
    expect(git.calls.diffNames).toEqual([]);
  });

  it("allows the legacy route when provider and queue snapshots are the same prior base", async () => {
    const legacy = report();
    if (!legacy.queue.present) throw new Error("fixture error");
    legacy.queue.baseSha = providerBaseSha;
    legacy.queue.legacyProtectedConflictAdoption = adoptionReceipt({
      queueBaseSha: providerBaseSha,
    });
    const prepared = await prepare({
      report: legacy,
      git: legacyGit({
        mergeBases: {
          [key(providerBaseSha, providerBaseSha)]: providerBaseSha,
          [key(providerBaseSha, currentBaseSha)]: providerBaseSha,
        },
      }),
    });

    if (prepared.state !== "ready") throw new Error("expected legacy packet to be ready");
    expect(prepared.packet.base_context).toMatchObject({
      provider_conflict_base_sha: providerBaseSha,
      legacy_queue_base_sha: providerBaseSha,
      current_base_sha: currentBaseSha,
      relation: "provider_base_ancestor_of_current_base",
    });
  });

  it.each([
    [
      "provider conflict base is not an ancestor of released queue base",
      { [key(providerBaseSha, queueBaseSha)]: conflictMergeBaseSha },
      "provider_base_not_ancestor",
    ],
    [
      "released queue base is not an ancestor of current base",
      { [key(queueBaseSha, currentBaseSha)]: providerBaseSha },
      "legacy_queue_base_not_ancestor",
    ],
    [
      "ancestry cannot be resolved",
      { [key(providerBaseSha, queueBaseSha)]: new Error("missing locally") },
      "legacy_queue_base_unavailable",
    ],
  ] as const)("fails closed when %s", async (_label, mergeBases, reasonCode) => {
    const git = legacyGit({ mergeBases });

    await expect(prepare({ git })).resolves.toMatchObject({
      state: "invalid",
      reason_code: reasonCode,
    });
    expect(git.calls.diffNames).toEqual([]);
  });

  it.each([
    [
      "missing legacy handoff",
      (value: PrFlowStatusReport) => ({ ...value, handoff: { present: false } }),
    ],
    [
      "mismatched rework queue head",
      (value: PrFlowStatusReport) => {
        if (!value.queue.present) throw new Error("fixture error");
        return { ...value, queue: { ...value.queue, headSha: "mismatch" } };
      },
    ],
    [
      "nonlegacy handoff provider base",
      (value: PrFlowStatusReport) => {
        if (!value.handoff.present) throw new Error("fixture error");
        return {
          ...value,
          handoff: {
            ...value.handoff,
            routeProviderBaseSha: "mismatch",
            routeProviderBaseShaState: "present",
          },
        };
      },
    ],
  ] as const)("rejects %s without probing Git", async (_label, mutate) => {
    const git = legacyGit();

    await expect(prepare({ git, report: mutate(report()) })).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
    expect(git.calls.mergeBase).toEqual([]);
    expect(git.calls.diffNames).toEqual([]);
  });

  it("binds the released queue evidence into the freshness token", async () => {
    const first = await prepare({ git: legacyGit() });
    const changedQueueEvidence = report();
    if (!changedQueueEvidence.queue.present) throw new Error("fixture error");
    changedQueueEvidence.queue.updatedAt = "2026-07-26T05:25:58.052Z";
    changedQueueEvidence.queue.legacyProtectedConflictAdoption = adoptionReceipt({
      queueUpdatedAt: "2026-07-26T05:25:58.052Z",
    });
    const second = await prepare({ git: legacyGit(), report: changedQueueEvidence });

    if (first.state !== "ready" || second.state !== "ready") {
      throw new Error("expected ready legacy packets");
    }
    expect(first.packet.freshness.token).not.toBe(second.packet.freshness.token);
  });

  it("binds the current local base and its ancestry probe into the freshness token", async () => {
    const nextCurrentBase = "4444444444444444444444444444444444444444";
    const first = await prepare({ git: legacyGit() });
    const second = await prepare({
      report: (() => {
        const next = report();
        if (!next.queue.present) throw new Error("fixture error");
        next.queue.legacyProtectedConflictAdoption = adoptionReceipt({
          currentBaseSha: nextCurrentBase,
        });
        return next;
      })(),
      git: legacyGit({
        localBase: nextCurrentBase,
        mergeBases: {
          [key(queueBaseSha, nextCurrentBase)]: queueBaseSha,
          [key(nextCurrentBase, headSha)]: conflictMergeBaseSha,
        },
        diffs: {
          [key(conflictMergeBaseSha, nextCurrentBase)]: ["current-only-overlap.ts", "shared.ts"],
        },
      }),
    });

    if (first.state !== "ready" || second.state !== "ready") {
      throw new Error("expected ready legacy packets");
    }
    expect(second.packet.base_context.current_base_sha).toBe(nextCurrentBase);
    expect(first.packet.freshness.token).not.toBe(second.packet.freshness.token);
  });

  it("requires an explicit receipt before deriving semantic conflict paths", async () => {
    const unadopted = report();
    if (!unadopted.queue.present) throw new Error("fixture error");
    unadopted.queue.legacyProtectedConflictAdoption = null;
    const git = legacyGit();

    await expect(prepare({ git, report: unadopted })).resolves.toMatchObject({
      state: "adoption_required",
      adoption: { evidence: { task_id: taskId } },
    });
    expect(git.calls.mergeBase).toEqual([
      [providerBaseSha, queueBaseSha],
      [queueBaseSha, currentBaseSha],
    ]);
    expect(git.calls.diffNames).toEqual([]);
  });

  it("permits queue and current snapshots to be equal while provider base is strictly older", async () => {
    const legacy = report();
    if (!legacy.queue.present) throw new Error("fixture error");
    legacy.queue.baseSha = currentBaseSha;
    legacy.queue.legacyProtectedConflictAdoption = adoptionReceipt({
      queueBaseSha: currentBaseSha,
    });
    const prepared = await prepare({
      report: legacy,
      git: legacyGit({
        mergeBases: {
          [key(providerBaseSha, currentBaseSha)]: providerBaseSha,
          [key(currentBaseSha, currentBaseSha)]: currentBaseSha,
        },
      }),
    });

    expect(prepared).toMatchObject({
      state: "ready",
      packet: { base_context: { legacy_queue_base_sha: currentBaseSha } },
    });
  });

  it("does not bind queue audit reason into legacy admission or freshness", async () => {
    const first = await prepare({ git: legacyGit() });
    const changedReason = report();
    if (!changedReason.queue.present) throw new Error("fixture error");
    changedReason.queue.reason = "operator note changed without changing evidence";
    const second = await prepare({ git: legacyGit(), report: changedReason });

    if (first.state !== "ready" || second.state !== "ready") {
      throw new Error("expected ready legacy packets");
    }
    expect(first.packet.freshness.token).toBe(second.packet.freshness.token);
  });

  it("fails closed when an existing receipt is stale for the current local base", async () => {
    const nextCurrentBase = "4444444444444444444444444444444444444444";
    const prepared = await prepare({
      git: legacyGit({
        localBase: nextCurrentBase,
        mergeBases: {
          [key(queueBaseSha, nextCurrentBase)]: queueBaseSha,
          [key(nextCurrentBase, headSha)]: conflictMergeBaseSha,
        },
      }),
    });

    await expect(Promise.resolve(prepared)).resolves.toMatchObject({
      state: "invalid",
      reason_code: "conflict_rework_route_ineligible",
    });
  });
});
