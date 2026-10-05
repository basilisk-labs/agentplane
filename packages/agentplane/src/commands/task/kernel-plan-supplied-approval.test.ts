import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { generateKeyPairSync, sign } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { defaultConfig } from "../../cli/core-imports.js";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  canonicalUserApprovalReceiptPayload,
  type UserApprovalReceipt,
} from "./user-approval-receipt.js";
import { kernelApprovalReference } from "../../runner/usecases/kernel-authority.js";
import { runTaskNewParsed } from "./new.js";
import { advanceTaskStep } from "./advance-task-step.js";
import { compactPlanInput } from "./create-plan-input.testkit.js";
import { parseSuppliedPlanInput } from "./create-plan-input.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { makeRunTaskPlanRejectHandler } from "./plan-reject.command.js";

installRunCliIntegrationHarness();

async function setup() {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const keys = generateKeyPairSync("ed25519");
  const config = defaultConfig();
  config.agents.approvals.require_plan = true;
  config.authority.approval_receipts.trusted_issuers = [
    {
      id: "test-operator",
      public_key_spki: keys.publicKey.export({ format: "der", type: "spki" }).toString("base64"),
    },
  ];
  await writeConfig(root, config);
  await writeFile(path.join(root, "source.txt"), "original\n");
  await commitAll(root, "seed approval fixture");
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const created = await runTaskNewParsed({
    ctx,
    cwd: root,
    rootOverride: root,
    printTaskId: false,
    parsed: {
      title: "Supplied approval contract",
      description: "Produce a report",
      owner: "CODER",
      priority: "med",
      tags: ["workflow"],
      taskKind: "analysis",
      mutationScope: "none",
      verify: [],
      dependsOn: [],
      allowDuplicate: true,
      suppliedPlan: compactPlanInput(),
    },
  });
  const id = created.task_id;
  const runtime = (encoded?: string) =>
    createKernelRuntime({
      command: ctx,
      task_id: id,
      transport: "manual",
      operation_id: "test-approval",
      ...(encoded ? { approval: { kind: "signed_user_receipt" as const, encoded } } : {}),
    });
  const advance = () => advanceTaskStep({ command: ctx, task_id: id, transport: "host" });
  const packet = await advance();
  expect(packet.action.kind).toBe("approval_required");
  const native = await runtime();
  const record = await native.adapter.read(id);
  if (record.kind !== "canonical" || !record.record.aggregate.current_plan)
    throw new Error("Proposed supplied Plan missing");
  const context = await native.native.readContext(id);
  const receipt: UserApprovalReceipt = {
    schema_version: 1,
    kind: "agentplane.user_approval_receipt",
    receipt_id: "supplied-plan-approval",
    issuer: "test-operator",
    subject: "owner",
    decision: "approved",
    approval_type: "plan_approval",
    task_id: id,
    authority_reference: kernelApprovalReference(context, record.record.aggregate.current_plan),
    state_fingerprint: context.repository_fingerprint,
    operation_id: null,
    operation_digest: null,
    state_scope_digest: null,
    issued_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 5 * 60_000).toISOString(),
    signature: "pending",
  };
  receipt.signature = sign(
    null,
    Buffer.from(canonicalUserApprovalReceiptPayload(receipt)),
    keys.privateKey,
  ).toString("base64url");
  const encoded = Buffer.from(JSON.stringify(receipt)).toString("base64url");
  return { root, ctx, id, runtime, advance, encoded, original: record.record };
}

describe("supplied Plan approval", { timeout: 180_000 }, () => {
  it("requires native USER approval and retains caller-supplied provenance after admission", async () => {
    const f = await setup();
    const unapproved = await f.runtime();
    await expect(unapproved.authority.approve(f.id)).rejects.toThrow(
      "native_user_decision_required",
    );
    const waiting = await f.advance();
    expect(waiting.action.kind).toBe("approval_required");
    const approved = await f.runtime(f.encoded);
    requireKernelCommit(await approved.authority.approve(f.id));
    const read = await approved.adapter.read(f.id);
    if (read.kind !== "canonical") throw new Error("Canonical record missing");
    const plan = read.record.aggregate.current_plan!;
    expect(plan.approval_actor_id).toBe("USER:owner@test-operator");
    expect(read.record.aggregate.authority_lineage?.[0]?.authority).toMatchObject({
      plan_digest: plan.digest,
      plan_revision: plan.revision,
      provenance: { kind: "USER", actor_id: "USER:owner@test-operator" },
    });
    expect(read.record.documents?.plan_inputs).toEqual(f.original.documents?.plan_inputs);
    const packet = await f.advance();
    expect(packet.action.kind).toBe("agent_episode");
    if (!("exchange" in packet)) throw new Error("Implementation exchange missing");
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8")),
    );
    expect(order.role).toBe("EXECUTOR");
    expect(order.context_intent.purpose).toContain("Caller-supplied Plan input (not approval)");
  });

  it.each(["plan", "repository", "policy"] as const)(
    "rejects a signed receipt after %s drift",
    async (kind) => {
      const f = await setup();
      if (kind === "plan") {
        await makeRunTaskPlanRejectHandler(() => Promise.resolve(f.ctx))(
          { cwd: f.root },
          { taskId: f.id, by: "USER", note: "Revise the objective before approval" },
        );
        const changed = compactPlanInput();
        changed.work_items[0]!.objective = "Produce a different report";
        await setCanonicalPlan(f.ctx, f.id, changed);
      } else if (kind === "repository") {
        await writeFile(path.join(f.root, "source.txt"), "different source\n");
      } else {
        f.ctx.config.agents.approvals.require_network =
          !f.ctx.config.agents.approvals.require_network;
      }
      const native = await f.runtime(f.encoded);
      await expect(native.authority.approve(f.id)).rejects.toThrow("stale or does not match");
      const read = await native.adapter.read(f.id);
      if (read.kind !== "canonical") throw new Error("Canonical record missing");
      expect(read.record.aggregate.current_plan?.state).toBe("PROPOSED");
      expect(read.record.aggregate.authority_lineage ?? []).toEqual([]);
    },
  );

  it("does not transfer approval to a wider supplied contract", async () => {
    const f = await setup();
    const native = await f.runtime(f.encoded);
    requireKernelCommit(await native.authority.approve(f.id));
    const changed = compactPlanInput();
    changed.work_items[0]!.scope_roots = ["src"];
    await expect(setCanonicalPlan(f.ctx, f.id, changed)).rejects.toThrow(
      "exceeds the trusted execution contract",
    );
    const read = await native.adapter.read(f.id);
    if (read.kind !== "canonical") throw new Error("Canonical record missing");
    expect(read.record.aggregate.current_plan?.digest).toBe(
      f.original.aggregate.current_plan?.digest,
    );
  });

  it("admits a pinned common recovery refinement only with exact USER approval and continues authority", async () => {
    const f = await setup();
    const native = await f.runtime(f.encoded);
    requireKernelCommit(await native.authority.approve(f.id));
    const approved = await native.adapter.read(f.id);
    if (approved.kind !== "canonical") throw new Error("Canonical record missing");
    const current = approved.record.aggregate.current_plan!;
    requireKernelCommit(
      await native.lifecycle.apply(
        await native.input(
          {
            kind: "materialize_work_items",
            plan_revision: current.revision,
            plan_digest: current.digest,
          },
          "materialize-recovery-fixture",
        ),
      ),
    );
    const definition = current.work_items[0]!;
    const { contract_digest, ...base } = definition;
    const originalContract = approved.record.documents!.contracts[String(contract_digest)]!;
    const request = {
      schema_version: 1,
      kind: "plan_refinement",
      task_id: f.id,
      base_plan_digest: current.digest,
      operations: [
        {
          kind: "add",
          work_item: {
            ...base,
            id: "bounded-recovery",
            depends_on: [definition.id],
            expected_outputs: ["recovery-evidence"],
            contract: { ...originalContract, objective: "Produce bounded recovery evidence" },
          },
        },
      ],
    };
    const before = await native.adapter.read(f.id);
    await expect(setCanonicalPlan(f.ctx, f.id, request)).rejects.toThrow(
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expect(await native.adapter.read(f.id)).toEqual(before);
    await setCanonicalPlan(f.ctx, f.id, request, { scopeExpansionApprovedBy: "USER" });
    const after = await native.adapter.read(f.id);
    if (after.kind !== "canonical" || before.kind !== "canonical")
      throw new Error("Canonical record missing");
    expect(after.record.aggregate.work_items[definition.id]).toEqual(
      before.record.aggregate.work_items[definition.id],
    );
    expect(after.record.aggregate.work_items["bounded-recovery"]).toMatchObject({
      state: "PLANNED",
      attempt: 0,
    });
    expect(after.record.aggregate.plan_history.at(-1)).toEqual({ ...current, state: "SUPERSEDED" });
    expect(after.record.aggregate.authority_lineage?.at(-1)?.authority.plan_digest).toBe(
      after.record.aggregate.current_plan?.digest,
    );
    expect(k.canonicalAuthorityIssues(after.record.aggregate)).toEqual([]);
    await expect(
      setCanonicalPlan(f.ctx, f.id, request, { scopeExpansionApprovedBy: "USER" }),
    ).rejects.toThrow("base digest mismatch");
    expect(await native.adapter.read(f.id)).toEqual(after);
  });

  it.each(["origin", "approval_actor_id", "authority"])(
    "rejects caller-supplied %s authority metadata",
    (field) => {
      expect(() => parseSuppliedPlanInput({ ...compactPlanInput(), [field]: "USER" })).toThrow();
    },
  );
});
