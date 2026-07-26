import { describe, expect, it } from "vitest";

import { buildStateFingerprint, type StateFingerprint } from "@agentplaneorg/core/schemas";

import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  evaluateWorkflowOperationAuthority,
  readSideEffectAuthorityState,
  withSideEffectAuthorityState,
  WORKFLOW_OPERATION_AUTHORITY_POLICY,
  workflowAuthorityStateScopeDigest,
} from "./side-effect-authority.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";

const taskId = "202607261849-AUTH01";
const operation = {
  id: "pr.open",
  type: "pr_sync",
  params: { taskId, author: "CODER", includeTaskIds: [] },
} as Pick<WorkflowOperation, "id" | "type" | "params">;

function fingerprint(gitHead = "a".repeat(40), trackedContent = gitHead): StateFingerprint {
  return buildStateFingerprint({
    task_id: taskId,
    task_revision: 4,
    git_head: gitHead,
    worktree: "/repo/.agentplane/worktrees/auth",
    components: {
      task: { state: "present", source: "fixture", value: { title: "Authority fixture" } },
      git: {
        state: "present",
        source: "fixture",
        value: {
          trackedContent,
        },
      },
      backend_projection: { state: "present", source: "fixture", value: { backend: "local" } },
      policy: { state: "present", source: "fixture", value: { rule: "workflow" } },
      blueprint: { state: "present", source: "fixture", value: { digest: "blueprint" } },
      knowledge: { state: "present", source: "fixture", value: { digest: "knowledge" } },
      provider: { state: "present", source: "fixture", value: { pr: "not_found" } },
      authority: { state: "present", source: "fixture", value: { route: "pr.open" } },
    },
  });
}

function approvedTask(at = "2026-07-26T12:00:00.000Z") {
  const state = { schemaVersion: 1 as const, grants: [], audit: [] };
  const grant = createSideEffectAuthorityRecord({
    id: "authority-fixture",
    actor: "USER",
    operation,
    fingerprint: fingerprint(),
    issuedAt: at,
    expiresAt: "2026-07-26T12:15:00.000Z",
  });
  const audited = appendSideEffectAuthorityAudit({
    state: { ...state, grants: [grant] },
    at,
    actor: "USER",
    operation,
    fingerprint: fingerprint(),
    authority: grant,
    outcome: "approved",
  });
  return { extensions: withSideEffectAuthorityState({ extensions: {} }, audited) };
}

describe("side-effect authority", () => {
  it("classifies every formal workflow operation deliberately", () => {
    expect(Object.keys(WORKFLOW_OPERATION_AUTHORITY_POLICY).toSorted()).toEqual(
      Object.keys(WORKFLOW_OPERATION_REGISTRY).toSorted(),
    );
    expect(WORKFLOW_OPERATION_AUTHORITY_POLICY["pr.open"]).toMatchObject({
      class: "external_reversible",
      requiresAuthority: true,
    });
    expect(WORKFLOW_OPERATION_AUTHORITY_POLICY["integration.enqueue"]).toMatchObject({
      class: "external_high_risk",
      requiresAuthority: true,
    });
    for (const operationId of [
      "pr.artifacts.update",
      "pr.sync_or_verify",
      "provider.pr.refresh",
      "route.remote.refresh",
    ] as const) {
      expect(WORKFLOW_OPERATION_AUTHORITY_POLICY[operationId]).toMatchObject({
        class: "external_reversible",
        requiresAuthority: true,
      });
    }
    expect(WORKFLOW_OPERATION_AUTHORITY_POLICY["task.hosted_close.finalize"]).toMatchObject({
      class: "external_high_risk",
      requiresAuthority: true,
    });
  });

  it("accepts only an unexpired authority with exact operation and state scope", () => {
    const task = approvedTask();
    const audit = readSideEffectAuthorityState(task)?.audit[0];
    expect(audit).toMatchObject({
      actor: "USER",
      policyRule: "workflow.external_reversible",
      operationId: "pr.open",
      authorityDigest: expect.stringMatching(/^sha256:/u),
      stateFingerprintDigest: expect.stringMatching(/^sha256:/u),
      outcome: "approved",
    });
    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: fingerprint(),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "allowed", authorityRef: "authority:authority-fixture" });

    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation: {
          ...operation,
          params: { ...operation.params, author: "OTHER" },
        } as typeof operation,
        fingerprint: fingerprint(),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "approval_required" });

    const tampered = structuredClone(task);
    const raw = tampered.extensions?.["agentplane.side_effect_authority"] as {
      grants: Array<{ actor: string }>;
    };
    raw.grants[0]!.actor = "OTHER";
    expect(
      evaluateWorkflowOperationAuthority({
        task: tampered,
        operation,
        fingerprint: fingerprint(),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "denied" });

    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: fingerprint("b".repeat(40)),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "approval_required" });

    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: fingerprint(),
        now: new Date("2026-07-26T12:15:00.000Z"),
      }),
    ).toMatchObject({ state: "approval_required" });
  });

  it("keeps authority valid across its own task-state commit but not a code change", () => {
    const task = approvedTask();
    const technicalAuthorityCommit = fingerprint("b".repeat(40), "a".repeat(40));
    expect(workflowAuthorityStateScopeDigest(technicalAuthorityCommit)).toBe(
      workflowAuthorityStateScopeDigest(fingerprint()),
    );
    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: technicalAuthorityCommit,
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "allowed" });
    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: fingerprint("b".repeat(40), "changed-source"),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "approval_required" });
  });

  it("fails closed when the append-only audit chain is tampered", () => {
    const task = approvedTask();
    const raw = task.extensions?.["agentplane.side_effect_authority"] as {
      audit: Array<{ previousDigest: string | null }>;
    };
    raw.audit[0]!.previousDigest = "sha256:" + "0".repeat(64);

    expect(readSideEffectAuthorityState(task)).toBeNull();
    expect(
      evaluateWorkflowOperationAuthority({
        task,
        operation,
        fingerprint: fingerprint(),
        now: new Date("2026-07-26T12:01:00.000Z"),
      }),
    ).toMatchObject({ state: "denied" });
  });

  it("does not require authority for local reversible operations", () => {
    const local = {
      id: "task.start",
      type: "task_start",
      params: { taskId, author: "CODER", body: "Start" },
    } as Pick<WorkflowOperation, "id" | "type" | "params">;
    expect(
      evaluateWorkflowOperationAuthority({
        task: { extensions: {} },
        operation: local,
        fingerprint: fingerprint(),
      }),
    ).toMatchObject({ state: "allowed", authority: null });
  });
});
