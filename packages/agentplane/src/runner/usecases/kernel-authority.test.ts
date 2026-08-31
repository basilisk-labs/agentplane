import { generateKeyPairSync, sign } from "node:crypto";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { describe, expect, it } from "vitest";
import type { TaskData } from "../../backends/task-backend.js";
import {
  canonicalUserApprovalReceiptPayload,
  type UserApprovalReceipt,
} from "../../adapters/authority/user-approval-receipt.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import {
  kernelReplayJourney,
  replayRepositoryIdentity,
} from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import type {
  KernelAuthorityPort,
  NativeApprovalObservation,
  NativeAuthorityContext,
} from "../../ports/kernel-authority.js";
import { kernelApprovalReference, KernelAuthorityResolver } from "./kernel-authority.js";

const keys = generateKeyPairSync("ed25519");
const now = "2026-08-31T10:00:00.000Z";
const expiry = "2026-08-31T10:10:00.000Z";

async function fixture(mode: k.CanonicalApprovalMode = "manual_operator") {
  const journey = kernelReplayJourney("direct");
  const seed = journey.steps[0]!.input;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(structuredClone(saved)),
    writeTask: (next, options) => {
      if ((saved?.revision ?? 0) !== options?.expectedRevision)
        return Promise.reject(new Error("CAS conflict"));
      saved = structuredClone(next);
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, replayRepositoryIdentity);
  expect(await adapter.create(journey.task, seed)).toMatchObject({ kind: "committed" });
  const proposal = journey.steps[1]!.input;
  if (proposal.command.kind !== "propose_plan") throw new Error("plan fixture missing");
  const definitions = proposal.command.plan.work_items.map((item) => ({
    ...item,
    execution_requirements: { ...item.execution_requirements, scope_roots: ["src"] },
  }));
  const plan = {
    ...proposal.command.plan,
    work_items: definitions,
    digest: k.kernelDigest({ revision: 1, work_items: definitions }),
  };
  expect(
    await adapter.execute({ ...proposal, command: { ...proposal.command, plan } }),
  ).toMatchObject({ kind: "committed" });
  const root = seed.authority!;
  let counter = 0;
  type ContextValues = Omit<NativeAuthorityContext, "task_revision" | "mutation_id">;
  const values: { -readonly [P in keyof ContextValues]: ContextValues[P] } = {
    task_id: journey.task.id,
    repository_identity: replayRepositoryIdentity,
    repository_fingerprint: root.repository_fingerprint,
    actor: {
      id: "native-controller",
      kind: "SYSTEM",
      transport: "manual",
      capabilities: ["repository_write", "authority.observe"],
    },
    occurred_at: now,
    approval_receipts: {
      trusted_issuers: [
        {
          id: "test-host",
          public_key_spki: keys.publicKey
            .export({ format: "der", type: "spki" })
            .toString("base64"),
        },
      ],
      max_ttl_minutes: 15,
      clock_skew_seconds: 0,
    },
    ceiling: {
      scope_roots: ["src"],
      repository_effects: root.repository_effects,
      external_effects: root.external_effects,
      capabilities: root.capabilities,
      resources: root.resources,
      validation_requirements: root.validation_requirements,
      policy_digests: [k.kernelDigest("policy")],
      completion_requirements: root.completion_requirements,
      risk: root.risk,
      expires_at: expiry,
    },
  };
  function signed(overrides: Partial<UserApprovalReceipt> = {}) {
    const receipt: UserApprovalReceipt = {
      schema_version: 1,
      kind: "agentplane.user_approval_receipt",
      receipt_id: "native-approval-1",
      issuer: "test-host",
      subject: "operator",
      decision: "approved",
      approval_type: "plan_approval",
      task_id: journey.task.id,
      authority_reference: kernelApprovalReference(
        { ...values, task_revision: 2, mutation_id: "challenge" },
        plan,
      ),
      state_fingerprint: values.repository_fingerprint,
      operation_id: null,
      operation_digest: null,
      state_scope_digest: null,
      issued_at: now,
      expires_at: expiry,
      signature: "pending",
      ...overrides,
    };
    receipt.signature = sign(
      null,
      Buffer.from(canonicalUserApprovalReceiptPayload(receipt)),
      keys.privateKey,
    ).toString("base64url");
    return Buffer.from(JSON.stringify(receipt)).toString("base64url");
  }
  let approval: NativeApprovalObservation | null =
    mode === "manual_operator"
      ? { kind: mode, actor_id: "USER", invocation_id: "operator-invocation-1" }
      : mode === "signed_user_receipt"
        ? { kind: mode, encoded: signed() }
        : {
            kind: mode,
            repository_identity: replayRepositoryIdentity,
            host_id: "host-1",
            conversation_id: "conversation-1",
            message_id: "message-1",
            encoded: Buffer.from(
              JSON.stringify({
                schema_version: 1,
                kind: "agentplane.host_user_decision",
                origin: "user",
                host_id: "host-1",
                conversation_id: "conversation-1",
                message_id: "message-1",
                task_id: journey.task.id,
                plan_digest: plan.digest,
                state_fingerprint: values.repository_fingerprint,
                decision: "approved",
                decided_at: now,
              }),
            ).toString("base64url"),
          };
  let observation: k.AuthorityObservation | null = null;
  const port: KernelAuthorityPort = {
    readContext: async () => {
      const read = await adapter.read(journey.task.id);
      if (read.kind !== "canonical") throw new Error(read.kind);
      return {
        ...values,
        task_revision: read.record.aggregate.revision,
        mutation_id: `native-${++counter}`,
      };
    },
    readApproval: () => Promise.resolve(approval),
    observeContinuation: () => Promise.resolve(observation),
  };
  const resolver = new KernelAuthorityResolver(adapter, port);
  return {
    taskId: journey.task.id,
    adapter,
    resolver,
    port,
    values,
    plan,
    signed,
    setApproval: (next: NativeApprovalObservation | null) => {
      approval = next;
    },
    setObservation: (next: k.AuthorityObservation) => {
      observation = next;
    },
  };
}

describe("canonical native authority", () => {
  it.each(["manual_operator", "signed_user_receipt", "host_user_decision"] as const)(
    "persists exact %s approval and delegates without USER provenance",
    async (mode) => {
      const f = await fixture(mode);
      expect(await f.resolver.approve(f.taskId)).toMatchObject({ kind: "committed" });
      const read = await f.adapter.read(f.taskId);
      expect(read).toMatchObject({
        kind: "canonical",
        record: { aggregate: { authority_lineage: [{ approval_mode: mode }] } },
      });
      const { authority: root } = await f.resolver.resolve(f.taskId);
      const { authority: child } = await f.resolver.resolve(f.taskId, "build");
      expect(root.provenance.kind).toBe("USER");
      expect(child.provenance).toMatchObject({
        kind: "DELEGATED",
        parent_authority_digest: root.digest,
      });
      expect(k.compareExecutionAuthority(root, child)).toEqual({ ok: true });
      expect(child.plan_digest).toBe(f.plan.digest);
    },
  );

  it.each(["issuer", "signature", "plan", "fingerprint", "expired"] as const)(
    "rejects a signed receipt with invalid %s without persisting approval",
    async (kind) => {
      const f = await fixture("signed_user_receipt");
      let encoded = f.signed(
        kind === "issuer"
          ? { issuer: "untrusted" }
          : kind === "plan"
            ? { authority_reference: k.kernelDigest("other-plan") }
            : kind === "fingerprint"
              ? { state_fingerprint: k.kernelDigest("old-state") }
              : kind === "expired"
                ? { issued_at: "2026-08-31T09:40:00.000Z", expires_at: "2026-08-31T09:50:00.000Z" }
                : {},
      );
      if (kind === "signature") {
        const raw = JSON.parse(Buffer.from(encoded, "base64url").toString()) as UserApprovalReceipt;
        raw.signature = Buffer.alloc(64).toString("base64url");
        encoded = Buffer.from(JSON.stringify(raw)).toString("base64url");
      }
      f.setApproval({ kind: "signed_user_receipt", encoded });
      const before = await f.adapter.read(f.taskId);
      await expect(f.resolver.approve(f.taskId)).rejects.toThrow();
      expect(await f.adapter.read(f.taskId)).toEqual(before);
    },
  );

  it("rejects agent authority claims, missing native approval and foreign repositories", async () => {
    const f = await fixture();
    f.setApproval(null);
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("native_user_decision_required");
    f.setApproval({ kind: "manual_operator", actor_id: "AGENT", invocation_id: "forged" });
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("explicit_manual_operator_required");
    f.values.actor = { ...f.values.actor, kind: "AGENT" };
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("native_context_binding");
    f.values.actor = { ...f.values.actor, kind: "SYSTEM" };
    f.values.repository_identity = k.kernelDigest("foreign-repository");
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("native_context_binding");
  });

  it("admits native repository observations with lineage and rejects unstated or out-of-scope changes", async () => {
    const f = await fixture();
    await f.resolver.approve(f.taskId);
    const { authority: parent } = await f.resolver.resolve(f.taskId);
    f.values.repository_fingerprint = k.kernelDigest("implementation-tree");
    await expect(f.resolver.resolve(f.taskId)).rejects.toThrow("native_continuation_required");
    await expect(f.resolver.continue(f.taskId)).rejects.toThrow("native_observation_required");
    const observation: k.AuthorityObservation = {
      kind: "repository_implementation",
      previous_fingerprint: parent.repository_fingerprint,
      evidence_digest: k.kernelDigest("native-git-checkpoint"),
      changed_paths: ["outside/secret.ts"],
    };
    f.setObservation(observation);
    await expect(f.resolver.continue(f.taskId)).rejects.toThrow("repository_observation_scope");
    f.setObservation({ ...observation, changed_paths: ["src/implementation.ts"] });
    const native = await f.port.readContext(f.taskId);
    const contents = {
      ...parent,
      repository_fingerprint: native.repository_fingerprint,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: native.actor.id,
        parent_authority_digest: parent.digest,
      },
    };
    const beforeForgedCommand = await f.adapter.read(f.taskId);
    expect(
      await f.adapter.execute({
        command: {
          kind: "continue_authority",
          task_id: f.taskId,
          expected_task_revision: native.task_revision,
          expected_state_fingerprint: native.repository_fingerprint,
          record: {
            authority: { ...contents, digest: k.authorityDigest(contents) },
            approval_mode: null,
            observation: { ...observation, changed_paths: ["src/implementation.ts"] },
          },
        },
        authority: parent,
        actor: { ...native.actor, kind: "AGENT" },
        repository_fingerprint: native.repository_fingerprint,
        occurred_at: now,
        mutation_id: "forged-agent-continuation",
      }),
    ).toMatchObject({ kind: "rejected", code: "AUTHORITY_SCOPE_EXCEEDED" });
    expect(await f.adapter.read(f.taskId)).toEqual(beforeForgedCommand);
    expect(await f.resolver.continue(f.taskId)).toMatchObject({ kind: "committed" });
    const { authority: current } = await f.resolver.resolve(f.taskId);
    expect(current.provenance).toMatchObject({
      kind: "SYSTEM",
      parent_authority_digest: parent.digest,
    });
    expect(current.repository_fingerprint).toBe(f.values.repository_fingerprint);
    expect(k.compareExecutionAuthority(parent, current)).toMatchObject({
      ok: false,
      violations: ["state_fingerprint"],
    });
    const read = await f.adapter.read(f.taskId);
    if (read.kind !== "canonical") throw new Error(read.kind);
    expect(k.canonicalAuthorityIssues(read.record.aggregate)).toEqual([]);
    expect(read.record.aggregate.authority_lineage).toHaveLength(2);
  });

  it("requires a new native decision for material expansion and rejects changed policy or expiry", async () => {
    const f = await fixture();
    f.values.ceiling = { ...f.values.ceiling, scope_roots: ["different"] };
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow(
      "plan_exceeds_native_approval_scope",
    );
    f.values.ceiling = { ...f.values.ceiling, scope_roots: ["src"] };
    await f.resolver.approve(f.taskId);
    f.values.ceiling = { ...f.values.ceiling, policy_digests: [k.kernelDigest("changed-policy")] };
    await expect(f.resolver.resolve(f.taskId)).rejects.toThrow("native_policy_changed");
    f.values.occurred_at = "2026-08-31T10:11:00.000Z";
    await expect(f.resolver.resolve(f.taskId)).rejects.toThrow("authority_expired");
  });

  it("binds an unsigned host decision to the native channel instead of trusting its JSON identity", async () => {
    const f = await fixture("host_user_decision");
    const observed = await f.port.readApproval(f.taskId);
    if (observed?.kind !== "host_user_decision") throw new Error("host fixture missing");
    f.setApproval({ ...observed, message_id: "another-native-message" });
    const before = await f.adapter.read(f.taskId);
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("host_decision_binding");
    expect(await f.adapter.read(f.taskId)).toEqual(before);
  });

  it("rejects native state drift between observing and applying approval", async () => {
    const f = await fixture();
    const observe = f.port.readApproval.bind(f.port);
    f.port.readApproval = async (taskId) => {
      f.values.repository_fingerprint = k.kernelDigest("concurrent-edit");
      return observe(taskId);
    };
    const before = await f.adapter.read(f.taskId);
    await expect(f.resolver.approve(f.taskId)).rejects.toThrow("native_context_changed");
    expect(await f.adapter.read(f.taskId)).toEqual(before);
  });

  it("continues an approved non-material plan only through a native observation and preserves WorkItems", async () => {
    const f = await fixture();
    await expect(f.resolver.resolve(f.taskId)).rejects.toThrow("canonical_authority_missing");
    await f.resolver.approve(f.taskId);
    let resolved = await f.resolver.resolve(f.taskId);
    expect(
      await f.adapter.execute({
        command: {
          kind: "materialize_work_items",
          task_id: f.taskId,
          expected_task_revision: resolved.context.task_revision,
          expected_state_fingerprint: resolved.context.repository_fingerprint,
          plan_revision: f.plan.revision,
          plan_digest: f.plan.digest,
        },
        authority: resolved.authority,
        actor: resolved.context.actor,
        repository_fingerprint: resolved.context.repository_fingerprint,
        occurred_at: now,
        mutation_id: "materialize-before-amendment",
      }),
    ).toMatchObject({ kind: "committed" });
    const before = await f.adapter.read(f.taskId);
    if (before.kind !== "canonical") throw new Error(before.kind);
    resolved = await f.resolver.resolve(f.taskId);
    const amended = {
      revision: 2,
      work_items: f.plan.work_items,
      digest: k.kernelDigest({ revision: 2, work_items: f.plan.work_items }),
    };
    expect(
      await f.adapter.execute({
        command: {
          kind: "amend_plan",
          task_id: f.taskId,
          expected_task_revision: resolved.context.task_revision,
          expected_state_fingerprint: resolved.context.repository_fingerprint,
          plan_revision: f.plan.revision,
          plan_digest: f.plan.digest,
          amended_plan: amended,
          amendment_digest: k.kernelDigest(amended),
          authority_delta_digest: null,
        },
        authority: resolved.authority,
        actor: resolved.context.actor,
        repository_fingerprint: resolved.context.repository_fingerprint,
        occurred_at: now,
        mutation_id: "nonmaterial-amendment",
      }),
    ).toMatchObject({ kind: "committed" });
    await expect(f.resolver.resolve(f.taskId)).rejects.toThrow("native_continuation_required");
    f.setObservation({
      kind: "plan_amendment",
      previous_fingerprint: resolved.authority.repository_fingerprint,
      evidence_digest: k.kernelDigest("native-amendment-checkpoint"),
      changed_paths: [],
    });
    expect(await f.resolver.continue(f.taskId)).toMatchObject({ kind: "committed" });
    const next = await f.resolver.resolve(f.taskId);
    expect(next.authority.plan_digest).toBe(amended.digest);
    expect(next.authority.provenance).toMatchObject({
      kind: "SYSTEM",
      parent_authority_digest: resolved.authority.digest,
    });
    const after = await f.adapter.read(f.taskId);
    if (after.kind !== "canonical") throw new Error(after.kind);
    expect(after.record.aggregate.work_items).toEqual(before.record.aggregate.work_items);
  });
});
