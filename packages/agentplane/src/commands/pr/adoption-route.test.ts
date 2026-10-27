import { describe, expect, it, vi } from "vitest";

import { buildStateFingerprint } from "@agentplaneorg/core/schemas";

import {
  createSideEffectAuthorityRecord,
  withSideEffectAuthorityState,
} from "../shared/side-effect-authority.js";
import { adoptExistingPr, type ExistingPrAdoptionStore } from "./adoption-route.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { AdoptedPrIdentity } from "./adoption-identity.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";

const taskId = "T-1";
const requestDigest = `sha256:${"f".repeat(64)}`;
const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/project",
  targetProject: "example/project",
  sourceUrl: "https://github.com/example/project.git",
  targetUrl: "https://github.com/example/project.git",
};
const claim = {
  taskId,
  identity,
  prNumber: 42,
  headRef: "automation/upgrade",
  baseRef: "main",
  headSha: "a".repeat(40),
  baseSha: "b".repeat(40),
};
const observed: ObservedChangeRequest = {
  provider: "github",
  identity,
  prNumber: claim.prNumber,
  prUrl: "https://github.com/example/project/pull/42",
  status: "OPEN",
  mergedAt: null,
  mergeCommit: null,
  base: claim.baseRef,
  baseSha: claim.baseSha,
  headRef: claim.headRef,
  headSha: claim.headSha,
  mergeability: { state: "not_conflicting", mergeable: true, providerState: "clean" },
};
const fingerprint = buildStateFingerprint({
  task_id: taskId,
  task_revision: 1,
  git_head: "c".repeat(40),
  worktree: "/repo/worktree",
  components: {
    task: { state: "present", source: "fixture", value: { taskId } },
    git: { state: "present", source: "fixture", value: { head: "c".repeat(40) } },
    backend_projection: { state: "present", source: "fixture", value: {} },
    policy: { state: "present", source: "fixture", value: {} },
    plan: { state: "present", source: "fixture", value: {} },
    capability: { state: "present", source: "fixture", value: {} },
    knowledge: { state: "present", source: "fixture", value: {} },
    provider: { state: "present", source: "fixture", value: observed },
    authority: { state: "present", source: "fixture", value: {} },
  },
});
const operation = {
  id: "pr.existing.adopt" as const,
  type: "pr_adopt" as const,
  params: { taskId, requestDigest },
};
const grant = createSideEffectAuthorityRecord({
  actor: "USER",
  operation,
  fingerprint,
  issuedAt: "2026-10-27T10:00:00.000Z",
  expiresAt: "2099-10-27T10:15:00.000Z",
});
const task = {
  plan_approval: { state: "approved" },
  execution_contract: {
    selected_mode: "branch_pr",
    authority: {
      allowed_external_effects: ["network_read", "external_write"],
      forbidden_external_effects: [],
    },
  },
  extensions: withSideEffectAuthorityState(
    { extensions: { task_kernel: { kind: "canonical_task" } } },
    { schemaVersion: 1, grants: [grant], audit: [] },
  ),
} as TaskData;

function fixture() {
  let retained: AdoptedPrIdentity | null = null;
  const observe = vi.fn((): Promise<ObservedChangeRequest> => Promise.resolve(observed));
  const createIfUnbound = vi.fn((value: AdoptedPrIdentity) => {
    if (retained) throw new Error("concurrent duplicate binding");
    retained = value;
    return Promise.resolve();
  });
  const store: ExistingPrAdoptionStore = {
    readTask: () => Promise.resolve(retained),
    findBinding: () => Promise.resolve(retained),
    createIfUnbound,
  };
  const input = {
    claim,
    task,
    fingerprint,
    grant,
    requestDigest,
    observedAt: "2026-10-27T10:01:00.000Z",
    observe,
    store,
  };
  return { input, observe, createIfUnbound };
}

describe("existing PR adoption route", () => {
  it("persists one exact provider readback and accepts a bounded replay", async () => {
    const f = fixture();
    const first = await adoptExistingPr(f.input);
    expect(first.state).toBe("adopted");
    expect(f.observe).toHaveBeenCalledTimes(2);
    f.observe.mockResolvedValue({
      ...observed,
      mergeability: { state: "pending", mergeable: null, providerState: "pending" },
    });
    const replay = await adoptExistingPr({
      ...f.input,
      observedAt: "2026-10-27T10:02:00.000Z",
      fingerprint: { ...fingerprint, digest: `sha256:${"e".repeat(64)}` },
    });
    expect(replay.state).toBe("already_adopted");
    expect(f.createIfUnbound).toHaveBeenCalledTimes(1);
  });

  it("does not write when the provider head changed during readback", async () => {
    const f = fixture();
    f.observe.mockResolvedValueOnce(observed).mockResolvedValueOnce({
      ...observed,
      headSha: "d".repeat(40),
    });
    await expect(adoptExistingPr(f.input)).rejects.toThrow("changed");
    expect(f.createIfUnbound).not.toHaveBeenCalled();
  });

  it("rejects a mismatched grant before reading or writing the provider", async () => {
    const f = fixture();
    await expect(
      adoptExistingPr({ ...f.input, requestDigest: `sha256:${"e".repeat(64)}` }),
    ).rejects.toThrow("matching, separate USER grant");
    expect(f.observe).not.toHaveBeenCalled();
    expect(f.createIfUnbound).not.toHaveBeenCalled();
  });

  it("rejects a supplied grant absent from durable task authority", async () => {
    const f = fixture();
    await expect(
      adoptExistingPr({
        ...f.input,
        task: { ...task, extensions: { task_kernel: { kind: "canonical_task" } } } as TaskData,
      }),
    ).rejects.toThrow("missing from durable authority state");
    expect(f.observe).not.toHaveBeenCalled();
    expect(f.createIfUnbound).not.toHaveBeenCalled();
  });

  it("rejects a task that forbids external writes even with a matching USER grant", async () => {
    const f = fixture();
    const denied = {
      ...task,
      execution_contract: {
        ...task.execution_contract!,
        authority: {
          ...task.execution_contract!.authority,
          allowed_external_effects: ["network_read"],
          forbidden_external_effects: ["external_write"],
        },
      },
    } as TaskData;
    await expect(adoptExistingPr({ ...f.input, task: denied })).rejects.toThrow(
      "native execution contract",
    );
    expect(f.observe).not.toHaveBeenCalled();
    expect(f.createIfUnbound).not.toHaveBeenCalled();
  });

  it("rejects another task's binding before a write", async () => {
    const f = fixture();
    const first = await adoptExistingPr(f.input);
    const prior = first.receipt;
    const fresh = fixture();
    fresh.input.store.readTask = () => Promise.resolve(null);
    fresh.input.store.findBinding = () => Promise.resolve({ ...prior, task_id: "T-OTHER" });
    await expect(adoptExistingPr(fresh.input)).rejects.toThrow("already bound");
    expect(fresh.createIfUnbound).not.toHaveBeenCalled();
  });

  it("does not overwrite a retained receipt after an incomplete replay", async () => {
    const f = fixture();
    const first = await adoptExistingPr(f.input);
    const prior = first.receipt;
    f.input.store.readTask = () =>
      Promise.resolve({
        ...prior,
        readback_digest: `sha256:${"0".repeat(64)}`,
      });
    await expect(adoptExistingPr(f.input)).rejects.toThrow("different or partially replayed");
    expect(f.createIfUnbound).toHaveBeenCalledTimes(1);
    f.input.store.readTask = () => Promise.resolve({ ...prior, head_sha: "d".repeat(40) });
    await expect(adoptExistingPr(f.input)).rejects.toThrow("different or partially replayed");
  });

  it("rejects a replay when the retained PR binding belongs to another task", async () => {
    const f = fixture();
    const first = await adoptExistingPr(f.input);
    f.input.store.findBinding = () => Promise.resolve({ task_id: "T-OTHER" });
    await expect(adoptExistingPr(f.input)).rejects.toThrow("no unique matching task binding");
    expect(f.createIfUnbound).toHaveBeenCalledTimes(1);
    expect(first.state).toBe("adopted");
  });

  it("propagates a concurrent uniqueness rejection without a second write", async () => {
    const f = fixture();
    f.input.store.createIfUnbound = () => {
      throw new Error("concurrent duplicate binding");
    };
    await expect(adoptExistingPr(f.input)).rejects.toThrow("concurrent duplicate binding");
    expect(f.createIfUnbound).not.toHaveBeenCalled();
  });
});
