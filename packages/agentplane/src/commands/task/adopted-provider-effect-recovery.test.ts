import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";

import type { CommandContext } from "../shared/task-backend.js";
import { workflowOperationAuthorityDigest } from "../shared/side-effect-authority.js";
import { WORKFLOW_OPERATION_AUTHORITY_POLICY } from "../shared/side-effect-authority-policy.js";
import { recoverAdoptedProviderEffect } from "./adopted-provider-effect-recovery.js";

const head = "a".repeat(40);
const updated = "b".repeat(40);
const base = "c".repeat(40);
const mergeCommit = "d".repeat(40);
const fingerprint = `sha256:${"e".repeat(64)}`;
const now = "2026-10-27T10:00:00.500Z";
const receipt = {
  schema_version: 1,
  task_id: "T-adopted",
  provider: "github",
  hostname: "github.com",
  remote: "origin",
  source_project: "org/repo",
  target_project: "org/repo",
  pr_number: 42,
  head_ref: "dependency/update",
  base_ref: "main",
  head_sha: head,
  base_sha: base,
  observed_at: now,
  readback_digest: fingerprint,
  authority_digest: fingerprint,
} as const;
const identity = {
  provider: "github",
  hostname: "github.com",
  remote: "origin",
  sourceProject: "org/repo",
  targetProject: "org/repo",
  sourceUrl: "https://github.com/org/repo",
  targetUrl: "https://github.com/org/repo",
} as const;

const mocks = vi.hoisted(() => ({
  journal: null as unknown,
  compareAndSwap: vi.fn().mockResolvedValue(true),
  release: vi.fn().mockResolvedValue(undefined),
  readTask: vi.fn(),
  readMetadata: vi.fn(),
  recordUpdatedHead: vi.fn().mockResolvedValue(undefined),
  recordMerged: vi.fn().mockResolvedValue(undefined),
  observation: vi.fn(),
  update: vi.fn(),
  authority: vi.fn(),
  route: vi.fn(),
  verification: vi.fn().mockResolvedValue(true),
  readiness: vi.fn(),
  proveBase: vi.fn(),
  localMeta: vi.fn(),
  commonDir: vi.fn().mockResolvedValue("/repo/.git"),
}));

vi.mock("../../shared/contained-stable-file.js", () => ({
  readContainedStableTextNoFollow: mocks.localMeta,
}));

vi.mock("../shared/supervisor-execution-episode.js", () => ({
  resolveSupervisorExecutionEpisodePath: vi.fn().mockResolvedValue("/repo/.git/journal.json"),
  tryAcquireSupervisorExecutionLease: vi
    .fn()
    .mockImplementation(() => Promise.resolve({ release: mocks.release })),
  createSupervisorEpisodeStore: () => ({
    read: () => Promise.resolve(mocks.journal),
    compareAndSwap: mocks.compareAndSwap,
  }),
}));
vi.mock("../shared/task-backend.js", () => ({
  resolveCommandGitCommonDir: mocks.commonDir,
}));
vi.mock("../pr/adoption-store.js", () => ({
  resolveAdoptionControlRoot: vi.fn().mockResolvedValue("/repo"),
  createExistingPrAdoptionStore: () => ({
    readTask: mocks.readTask,
    readMetadata: mocks.readMetadata,
    recordUpdatedHead: mocks.recordUpdatedHead,
    recordMerged: mocks.recordMerged,
  }),
}));
vi.mock("../pr/internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.observation,
}));
vi.mock("../pr/adoption-merge.js", () => ({ proveAdoptedMergeExactBaseParent: mocks.proveBase }));
vi.mock("../pr/provider-update-branch.js", () => ({ updateProviderBranch: mocks.update }));
vi.mock("../shared/side-effect-authority-store.js", () => ({
  loadSideEffectAuthorityState: mocks.authority,
}));
vi.mock("../shared/route-decision.js", () => ({ buildTaskRouteDecision: mocks.route }));
vi.mock("../pr/adoption-task-authority.js", () => ({
  assertAdoptedPrMergeReadiness: mocks.readiness,
}));
vi.mock("../pr/adoption-verification.js", () => ({
  hasExactAdoptedVerificationRecord: mocks.verification,
}));

function fixture(kind: "update" | "merge", hardCrash = false, adopted = true) {
  const operation =
    kind === "update"
      ? {
          id: "provider.pr.update_branch" as const,
          type: "provider_update_branch" as const,
          params: {
            taskId: receipt.task_id,
            identity,
            prNumber: receipt.pr_number,
            branch: receipt.head_ref,
            baseBranch: receipt.base_ref,
            expectedHeadSha: head,
            expectedBaseSha: base,
          },
          preconditionFingerprint: { digest: fingerprint },
          idempotencyKey: `provider.pr.update_branch:${receipt.task_id}:${fingerprint}`,
          authorityRef: "authority:grant-1",
        }
      : {
          id: "integration.adopted_merge" as const,
          type: "integration_adopted_merge" as const,
          params: {
            taskId: receipt.task_id,
            prNumber: receipt.pr_number,
            headSha: head,
            baseSha: base,
          },
          preconditionFingerprint: { digest: fingerprint },
          idempotencyKey: `integration.adopted_merge:${receipt.task_id}:${fingerprint}`,
          authorityRef: "authority:grant-1",
        };
  const initial = createSupervisorExecutionEpisodeJournal({
    task_id: receipt.task_id,
    task_revision: null,
    state_fingerprint_digest: fingerprint,
    budget: {
      max_episodes: 10,
      max_agent_runs: null,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
    now,
  });
  const start = startSupervisorExecutionEpisode({
    journal: initial,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: operation,
    recovery_context: adopted
      ? {
          schema_version: 1,
          kind: "adopted_provider_effect",
          task_id: receipt.task_id,
          adoption: receipt,
        }
      : { schema_version: 1, kind: "integration_run_next", task_id: receipt.task_id },
    precondition_fingerprint_digest: fingerprint,
    authority_ref: `workflow-operation:${operation.id}`,
    authority_digest: fingerprint,
    effect_ref: operation.idempotencyKey,
    now,
  });
  if (start.status !== "started") throw new Error("fixture intent unavailable");
  mocks.journal = hardCrash
    ? start.journal
    : stopSupervisorExecutionEpisode({
        journal: start.journal,
        reason: "effect_in_doubt",
        now: "2026-10-27T10:01:00Z",
      });
  const operationDigest = workflowOperationAuthorityDigest(operation);
  const grant = {
    id: "grant-1",
    actor: "USER",
    policyRule: WORKFLOW_OPERATION_AUTHORITY_POLICY[operation.id].policyRule,
    operationId: operation.id,
    operationDigest,
    stateFingerprintDigest: fingerprint,
    stateScopeDigest: fingerprint,
    issuedAt: "2026-10-27T09:59:00Z",
    expiresAt: "2026-10-27T11:00:00Z",
    digest: fingerprint,
  };
  mocks.authority.mockResolvedValue({
    state: {
      grants: [grant],
      audit: [
        {
          outcome: "approved",
          actor: grant.actor,
          policyRule: grant.policyRule,
          authorityDigest: grant.digest,
          operationDigest,
          stateFingerprintDigest: fingerprint,
          at: "2026-10-27T09:59:01Z",
        },
      ],
    },
  });
  return operation;
}

const command = {
  resolvedProject: { gitRoot: "/repo" },
  config: { paths: { workflow_dir: ".agentplane/tasks" } },
  taskBackend: { getTask: vi.fn().mockResolvedValue({ id: receipt.task_id, extensions: {} }) },
} as unknown as CommandContext;

beforeEach(() => {
  vi.clearAllMocks();
  mocks.localMeta.mockResolvedValue(JSON.stringify({ adoption: receipt }));
  mocks.readTask.mockResolvedValue(receipt);
  mocks.readMetadata.mockResolvedValue({ status: "OPEN", head_sha: head });
  mocks.route.mockResolvedValue({
    workflowStep: { id: "next", preconditionFingerprint: { digest: fingerprint } },
  });
  mocks.proveBase.mockResolvedValue(true);
  mocks.observation.mockResolvedValue({
    state: "found",
    pr: {
      provider: "github",
      identity,
      prNumber: receipt.pr_number,
      headRef: receipt.head_ref,
      base: receipt.base_ref,
      headSha: head,
      baseSha: base,
      status: "OPEN",
      mergeCommit: null,
      mergedAt: null,
    },
  });
});

describe("adopted provider effect recovery", () => {
  it("retains a hard-crash running intent before reconciling the provider result", async () => {
    fixture("update", true);
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: updated,
        baseSha: base,
        status: "OPEN",
        mergeCommit: null,
        mergedAt: null,
      },
    });
    mocks.update.mockResolvedValue({
      state: "updated",
      effect: "reconciled",
      evidence: { observedHeadSha: updated },
    });
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      true,
    );
    expect(mocks.compareAndSwap).toHaveBeenCalledTimes(2);
    expect(mocks.compareAndSwap.mock.calls[0]?.[1]).toMatchObject({
      status: "stopped",
      stop: { reason: "effect_in_doubt" },
    });
    expect(mocks.recordUpdatedHead).toHaveBeenCalledWith(receipt.task_id, head, updated);
  });

  it("does not read or repeat a provider effect when the interrupted intent loses its CAS", async () => {
    fixture("merge", true);
    mocks.compareAndSwap.mockResolvedValueOnce(false);
    await expect(
      recoverAdoptedProviderEffect({ command, task_id: receipt.task_id }),
    ).rejects.toThrow("could not retain the interrupted intent");
    expect(mocks.observation).not.toHaveBeenCalled();
    expect(mocks.recordMerged).not.toHaveBeenCalled();
    expect(mocks.release).toHaveBeenCalledTimes(1);
  });

  it("leaves a non-adopted running intent to its own native recovery route", async () => {
    fixture("merge", true, false);
    mocks.localMeta.mockResolvedValue(JSON.stringify({ task_id: receipt.task_id }));
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      false,
    );
    expect(mocks.compareAndSwap).not.toHaveBeenCalled();
    expect(mocks.observation).not.toHaveBeenCalled();
    expect(mocks.commonDir).not.toHaveBeenCalled();
  });

  it("reconciles a crashed hosted update without another provider mutation", async () => {
    fixture("update");
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: updated,
        baseSha: base,
        status: "OPEN",
        mergeCommit: null,
        mergedAt: null,
      },
    });
    mocks.update.mockResolvedValue({
      state: "updated",
      effect: "reconciled",
      evidence: { observedHeadSha: updated },
    });
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      true,
    );
    expect(mocks.update).toHaveBeenCalledWith(
      expect.objectContaining({ reconcileHeadSha: updated }),
    );
    expect(mocks.recordUpdatedHead).toHaveBeenCalledWith(receipt.task_id, head, updated);
    expect(mocks.compareAndSwap).toHaveBeenCalledTimes(1);
    mocks.journal = mocks.compareAndSwap.mock.calls[0]?.[1];
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      false,
    );
    expect(mocks.recordUpdatedHead).toHaveBeenCalledTimes(1);
  });

  it("reconciles a crashed exact-head merge into a durable receipt", async () => {
    fixture("merge");
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: head,
        baseSha: mergeCommit,
        status: "MERGED",
        mergeCommit,
        mergedAt: "2026-10-27T10:02:00Z",
      },
    });
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      true,
    );
    expect(mocks.recordMerged).toHaveBeenCalledWith(
      receipt.task_id,
      head,
      mergeCommit,
      "2026-10-27T10:02:00Z",
    );
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("accepts a provider merge timestamp rounded to the intent second", async () => {
    fixture("merge");
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: head,
        baseSha: mergeCommit,
        status: "MERGED",
        mergeCommit,
        mergedAt: "2026-10-27T10:00:00Z",
      },
    });
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      true,
    );
  });

  it("rejects an update whose provider head did not move", async () => {
    fixture("update");
    await expect(
      recoverAdoptedProviderEffect({ command, task_id: receipt.task_id }),
    ).rejects.toThrow("head or retained operation changed");
    expect(mocks.recordUpdatedHead).not.toHaveBeenCalled();
  });

  it("rejects a changed PR identity and never records a merge", async () => {
    fixture("merge");
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: 43,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: head,
        baseSha: mergeCommit,
        status: "MERGED",
        mergeCommit,
        mergedAt: "2026-10-27T10:02:00Z",
      },
    });
    await expect(
      recoverAdoptedProviderEffect({ command, task_id: receipt.task_id }),
    ).rejects.toThrow("identity readback changed");
    expect(mocks.recordMerged).not.toHaveBeenCalled();
  });

  it("rejects a merge whose commit lacks expected-base ancestry", async () => {
    fixture("merge");
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: head,
        baseSha: mergeCommit,
        status: "MERGED",
        mergeCommit,
        mergedAt: "2026-10-27T10:02:00Z",
      },
    });
    mocks.proveBase.mockResolvedValue(false);
    await expect(
      recoverAdoptedProviderEffect({ command, task_id: receipt.task_id }),
    ).rejects.toThrow("exact pre-merge base proof");
    expect(mocks.recordMerged).not.toHaveBeenCalled();
  });

  it("rejects an absent historical USER grant", async () => {
    fixture("merge");
    mocks.authority.mockResolvedValue({ state: { grants: [], audit: [] } });
    await expect(
      recoverAdoptedProviderEffect({ command, task_id: receipt.task_id }),
    ).rejects.toThrow("USER grant");
    expect(mocks.recordMerged).not.toHaveBeenCalled();
  });

  it("uses the selected historical grant when an equivalent second grant exists", async () => {
    fixture("merge");
    const loaded = (await mocks.authority()) as {
      state: { grants: { id: string }[]; audit: unknown[] };
    };
    mocks.authority.mockResolvedValue({
      state: {
        grants: [...loaded.state.grants, { ...loaded.state.grants[0], id: "grant-2" }],
        audit: loaded.state.audit,
      },
    });
    mocks.observation.mockResolvedValue({
      state: "found",
      pr: {
        provider: "github",
        identity,
        prNumber: receipt.pr_number,
        headRef: receipt.head_ref,
        base: receipt.base_ref,
        headSha: head,
        baseSha: mergeCommit,
        status: "MERGED",
        mergeCommit,
        mergedAt: "2026-10-27T10:02:00Z",
      },
    });
    await expect(recoverAdoptedProviderEffect({ command, task_id: receipt.task_id })).resolves.toBe(
      true,
    );
    expect(mocks.recordMerged).toHaveBeenCalledOnce();
  });
});
