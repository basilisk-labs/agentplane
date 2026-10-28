import { describe, expect, it, vi } from "vitest";
import { taskKernel } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { mergeAdoptedPr, type AdoptedMergeDependencies } from "./adoption-merge.js";
import type { AdoptedPrIdentity } from "./adoption-identity.js";
import type { ObservedChangeRequest } from "./internal/change-request-model.js";

const head = "a".repeat(40);
const base = "b".repeat(40);
const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/project",
  targetProject: "example/project",
  sourceUrl: "https://github.com/example/project.git",
  targetUrl: "https://github.com/example/project.git",
};
const receipt: AdoptedPrIdentity = {
  schema_version: 1,
  task_id: "T-1",
  provider: "github",
  hostname: "github.com",
  remote: "origin",
  source_project: "example/project",
  target_project: "example/project",
  pr_number: 42,
  head_ref: "automation/upgrade",
  base_ref: "main",
  head_sha: head,
  base_sha: base,
  observed_at: "2026-10-27T00:00:00Z",
  readback_digest: `sha256:${"c".repeat(64)}`,
  authority_digest: `sha256:${"d".repeat(64)}`,
};
const hostedDigest = `sha256:${"9".repeat(64)}`;
const reviewDigest = `sha256:${"8".repeat(64)}`;
const canonical = {
  kind: "canonical_task",
  aggregate: {
    state: "COMPLETED",
    work_items: {
      W1: {
        state: "COMPLETED",
        validation: {
          status: "PASSED",
          identity: { hosted_head_evidence_digest: hostedDigest },
        },
      },
    },
    final_validation: {
      status: "PASSED",
      identity: { hosted_head_evidence_digest: hostedDigest },
      evidence_digests: [hostedDigest],
    },
  },
};
const projection = {
  source: "task_kernel",
  implementation_commit: head,
  implementation_tree: "7".repeat(40),
  review_identity_digest: reviewDigest,
  evidence_refs: ["exact-head-native-validation"],
  findings: ["Reviewed exact hosted head"],
};
const task = {
  status: "DOING",
  commit: { hash: head, message: "Hosted PR" },
  verification: { state: "ok" },
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
  quality_review: {
    state: "pass",
    updated_by: "EVALUATOR",
    provenance: "evaluator_supplied",
    evaluated_sha: head,
    review_identity_digest: reviewDigest,
    findings: ["Reviewed exact hosted change"],
    evidence_refs: [".agentplane/tasks/T-1/quality-report.json"],
  },
  extensions: {
    task_kernel: { ...canonical, digest: taskKernel.kernelDigest(canonical) },
    "agentplane.kernel_operational_projection": {
      ...projection,
      digest: taskKernel.kernelDigest(projection),
    },
  },
} as TaskData;
const open: ObservedChangeRequest = {
  provider: "github",
  identity,
  prNumber: 42,
  prUrl: "https://github.com/example/project/pull/42",
  status: "OPEN",
  mergedAt: null,
  mergeCommit: null,
  base: "main",
  baseSha: base,
  headRef: "automation/upgrade",
  headSha: head,
  mergeability: { state: "not_conflicting", mergeable: true, providerState: "clean" },
};

function harness(observations: ObservedChangeRequest[]) {
  const observe = vi.fn(() => Promise.resolve(observations.shift() ?? open));
  const checks = vi.fn(() => Promise.resolve());
  const protection = vi.fn(() => Promise.resolve());
  const proveBase = vi.fn(() => Promise.resolve(true));
  const merge = vi.fn((_root, _receipt, _identity, _head, guard: () => Promise<void>) => guard());
  const assertAuthority = vi.fn(() => Promise.resolve());
  const assertVerification = vi.fn(() => Promise.resolve());
  const dependencies = {
    resolveIdentity: vi.fn(() => Promise.resolve(identity)),
    observe,
    checks,
    protection,
    merge,
    proveBase,
  } as AdoptedMergeDependencies;
  return {
    dependencies,
    observe,
    checks,
    protection,
    merge,
    proveBase,
    assertAuthority,
    assertVerification,
  };
}

describe("adopted PR protected merge", () => {
  it("rechecks separate authority, exact provider head/base and checks immediately before merge", async () => {
    const h = harness([
      open,
      open,
      { ...open, status: "MERGED", mergeCommit: "e".repeat(40), mergedAt: "2026-10-27T01:00:00Z" },
    ]);
    await expect(
      mergeAdoptedPr({
        gitRoot: "/repo",
        task,
        receipt,
        expectedHeadSha: head,
        expectedBaseSha: base,
        assertAuthority: h.assertAuthority,
        assertVerification: h.assertVerification,
        dependencies: h.dependencies,
      }),
    ).resolves.toEqual({
      status: "merged",
      mergeCommit: "e".repeat(40),
      mergedAt: "2026-10-27T01:00:00Z",
    });
    expect(h.assertAuthority).toHaveBeenCalledTimes(2);
    expect(h.assertVerification).toHaveBeenCalledTimes(2);
    expect(h.checks).toHaveBeenCalledTimes(2);
    expect(h.merge).toHaveBeenCalledTimes(1);
    expect(h.proveBase).toHaveBeenCalledWith("/repo", receipt, base, "e".repeat(40));
  });

  it("rejects a merge whose target base advances after the guard while the head stays exact", async () => {
    const h = harness([
      open,
      open,
      {
        ...open,
        baseSha: "f".repeat(40),
        status: "MERGED",
        mergeCommit: "e".repeat(40),
        mergedAt: "2026-10-27T01:00:00Z",
      },
    ]);
    h.proveBase.mockResolvedValue(false);
    await expect(
      mergeAdoptedPr({
        gitRoot: "/repo",
        task,
        receipt,
        expectedHeadSha: head,
        expectedBaseSha: base,
        assertAuthority: h.assertAuthority,
        assertVerification: h.assertVerification,
        dependencies: h.dependencies,
      }),
    ).rejects.toThrow("immutable exact pre-merge base proof");
    expect(h.merge).toHaveBeenCalledOnce();
    expect(h.proveBase).toHaveBeenCalledWith("/repo", receipt, base, "e".repeat(40));
  });

  it("refuses a moving hosted head before provider mutation", async () => {
    const h = harness([{ ...open, headSha: "f".repeat(40) }]);
    await expect(
      mergeAdoptedPr({
        gitRoot: "/repo",
        task,
        receipt,
        expectedHeadSha: head,
        expectedBaseSha: base,
        assertAuthority: h.assertAuthority,
        assertVerification: h.assertVerification,
        dependencies: h.dependencies,
      }),
    ).rejects.toThrow("exact head/base changed");
    expect(h.merge).not.toHaveBeenCalled();
  });

  it("does not convert a USER grant into a verification or exact-review waiver", async () => {
    const h = harness([open]);
    await expect(
      mergeAdoptedPr({
        gitRoot: "/repo",
        task: { ...task, verification: { state: "pending" } } as TaskData,
        receipt,
        expectedHeadSha: head,
        expectedBaseSha: base,
        assertAuthority: h.assertAuthority,
        assertVerification: h.assertVerification,
        dependencies: h.dependencies,
      }),
    ).rejects.toThrow("successful verification");
    expect(h.assertAuthority).not.toHaveBeenCalled();
    expect(h.merge).not.toHaveBeenCalled();
  });

  it("refuses to merge when the native verification record is not bound to the hosted head", async () => {
    const h = harness([open]);
    h.assertVerification.mockRejectedValueOnce(new Error("exact-head verification missing"));
    await expect(
      mergeAdoptedPr({
        gitRoot: "/repo",
        task,
        receipt,
        expectedHeadSha: head,
        expectedBaseSha: base,
        assertAuthority: h.assertAuthority,
        assertVerification: h.assertVerification,
        dependencies: h.dependencies,
      }),
    ).rejects.toThrow("exact-head verification missing");
    expect(h.merge).not.toHaveBeenCalled();
  });
});
