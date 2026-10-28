import { describe, expect, it } from "vitest";
import { buildStateFingerprint } from "@agentplaneorg/core/schemas";
import { withSideEffectAuthorityState } from "../shared/side-effect-authority.js";

import {
  prepareExistingPrAdoption,
  approveExistingPrAdoption,
  applyExistingPrAdoptionRequest,
} from "./adoption-request.js";
import type { AdoptedPrIdentity } from "./adoption-identity.js";
import type { TaskData } from "../../backends/task-backend.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";

const taskId = "T-1";
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
};
const fingerprint = buildStateFingerprint({
  task_id: taskId,
  task_revision: 1,
  git_head: "c".repeat(40),
  worktree: "/repo/worktree",
  components: {
    task: { state: "present", source: "fixture", value: { taskId } },
    git: { state: "present", source: "fixture", value: {} },
    backend_projection: { state: "present", source: "fixture", value: {} },
    plan: { state: "present", source: "fixture", value: {} },
    policy: { state: "present", source: "fixture", value: {} },
    capability: { state: "present", source: "fixture", value: {} },
    knowledge: { state: "present", source: "fixture", value: {} },
    provider: { state: "present", source: "fixture", value: observed },
    authority: { state: "present", source: "fixture", value: {} },
  },
});

describe("existing PR adoption operator request", () => {
  const prepared = prepareExistingPrAdoption({
    claim,
    observed,
    fingerprint,
    preparedAt: "2026-10-27T10:00:00.000Z",
  });

  it("binds a reviewed exact provider observation to an inert request", () => {
    expect(prepared.request).toMatchObject({
      claim,
      state_fingerprint_digest: fingerprint.digest,
    });
    expect(prepared.request.provider_readback_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(prepared.request.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    expect(() =>
      prepareExistingPrAdoption({
        claim,
        observed: { ...observed, headSha: "d".repeat(40) },
        fingerprint,
        preparedAt: "2026-10-27T10:00:00.000Z",
      }),
    ).toThrow("changed");
  });

  it("grants only the exact USER-approved request and rejects replay edits", () => {
    const options = {
      request: prepared.request,
      approvedDigest: prepared.approval_digest,
      actor: "USER",
      fingerprint,
      issuedAt: "2026-10-27T10:01:00.000Z",
      expiresAt: "2026-10-27T10:16:00.000Z",
    };
    expect(approveExistingPrAdoption(options)).toMatchObject({
      actor: "USER",
      operationId: "pr.existing.adopt",
      evidenceDigest: prepared.approval_digest,
    });
    expect(() => approveExistingPrAdoption({ ...options, actor: "AGENT" })).toThrow("USER");
    expect(() =>
      approveExistingPrAdoption({
        ...options,
        request: { ...prepared.request, claim: { ...claim, headSha: "d".repeat(40) } },
      }),
    ).toThrow("changed");
    expect(() =>
      approveExistingPrAdoption({ ...options, approvedDigest: `sha256:${"0".repeat(64)}` }),
    ).toThrow("USER");
  });

  it("applies an approved request once and rejects changed provider readback", async () => {
    const grant = approveExistingPrAdoption({
      request: prepared.request,
      approvedDigest: prepared.approval_digest,
      actor: "USER",
      fingerprint,
      issuedAt: "2026-10-27T10:01:00.000Z",
      expiresAt: "2099-10-27T10:16:00.000Z",
    });
    const task = {
      plan_approval: { state: "approved" },
      execution_contract: {
        selected_mode: "branch_pr",
        declaration: {
          external_effects: ["network_read", "external_write"],
        },
        authority: {
          allowed_external_effects: ["network_read"],
          forbidden_external_effects: ["external_write"],
        },
      },
      extensions: withSideEffectAuthorityState(
        { extensions: { task_kernel: { kind: "canonical_task" } } },
        { schemaVersion: 1, grants: [grant], audit: [] },
      ),
    } as TaskData;
    let retained: AdoptedPrIdentity | null = null;
    const store = {
      readTask: () => Promise.resolve(retained),
      findBinding: () => Promise.resolve(retained),
      createIfUnbound: (value: AdoptedPrIdentity) => {
        retained = value;
        return Promise.resolve();
      },
    };
    const input = {
      request: prepared.request,
      task,
      fingerprint,
      grant,
      observedAt: "2026-10-27T10:02:00.000Z",
      observe: () => Promise.resolve(observed),
      store,
    };
    await expect(applyExistingPrAdoptionRequest(input)).resolves.toMatchObject({
      state: "adopted",
      receipt: { task_id: taskId, pr_number: 42 },
    });
    await expect(applyExistingPrAdoptionRequest(input)).resolves.toMatchObject({
      state: "already_adopted",
    });
    await expect(
      applyExistingPrAdoptionRequest({
        ...input,
        observe: () => Promise.resolve({ ...observed, headSha: "d".repeat(40) }),
      }),
    ).rejects.toThrow("changed");
  });
});
