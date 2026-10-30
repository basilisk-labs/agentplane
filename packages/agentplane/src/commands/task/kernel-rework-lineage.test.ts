import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { authenticatedAmendmentHistory } from "./kernel-rework-proof.js";
import { retainedIssuanceAuthority } from "./kernel-rework-lineage.js";
import { withKernelReworkEvidence } from "./kernel-exchange.js";
import { createDirectory, fixture, write } from "./kernel-rework-lineage.testkit.js";

describe("authenticated multi-Plan prerequisite lineage", () => {
  it.each([
    "valid",
    "missing-event",
    "tampered-event",
    "missing-receipt",
    "tampered-receipt",
    "ambiguous-event",
    "wrong-fingerprint",
    "changed-paths",
  ])(
    "authenticates retained scope issuance after native worktree preparation: %s",
    async (kind) => {
      const directory = await createDirectory("kernel-prepared-scope-");
      const { record, order, oldOrder, target } = await fixture(
        directory,
        true,
        false,
        false,
        true,
        true,
      );
      const event = record.events.find((entry) => entry.mutation_id === "worktree-preparation")!;
      const continuation = record.aggregate.authority_lineage.find(
        (entry) => entry.observation?.kind === "worktree_preparation",
      )!;
      expect(event.task_revision).toBeLessThanOrEqual(oldOrder.task.revision!);
      if (kind === "missing-event") record.events.splice(record.events.indexOf(event), 1);
      if (kind === "tampered-event") event.payload_digest = k.kernelDigest("tampered");
      if (kind === "missing-receipt") delete record.aggregate.mutation_receipts[event.mutation_id];
      if (kind === "tampered-receipt")
        record.aggregate.mutation_receipts[event.mutation_id]!.event_digests = [];
      if (kind === "ambiguous-event") record.events.push(structuredClone(event));
      if (kind === "wrong-fingerprint")
        oldOrder.canonical_binding!.repository_fingerprint = k.kernelDigest("unissued worktree");
      if (kind === "changed-paths")
        continuation.observation!.changed_paths = ["outside/unauthorized.ts"];
      expect(retainedIssuanceAuthority(record, oldOrder)).toBe(kind === "valid");
      await write(
        path.join(directory, oldOrder.work_order_id.slice(7)),
        "work-order.json",
        oldOrder,
      );
      const operation = withKernelReworkEvidence(order, target, record);
      if (kind === "valid") {
        const enriched = await operation;
        expect(enriched.required_inputs).toContainEqual(
          expect.objectContaining({ id: `scope-stop:${oldOrder.work_order_id}` }),
        );
        expect(enriched.required_inputs).toContainEqual(
          expect.objectContaining({ id: "approved-scope-replan" }),
        );
      } else await expect(operation).rejects.toThrow();
    },
  );

  it.each([
    "valid",
    "approval-event",
    "approval-receipt",
    "unapproved",
    "amendment",
    "wrong-task",
    "claim",
    "authority",
  ])("admits retained scope stops through genuine mixed history: %s", async (kind) => {
    const directory = await createDirectory("kernel-mixed-scope-");
    const { record, order, oldOrder, target } = await fixture(directory, true, false, false, true);
    const event = record.events.find((entry) => entry.mutation_id.startsWith("mixed-approval-"))!;
    if (kind === "approval-event") event.payload_digest = k.kernelDigest("tampered");
    if (kind === "approval-receipt")
      record.aggregate.mutation_receipts[event.mutation_id]!.command_digest =
        k.kernelDigest("tampered");
    if (kind === "unapproved")
      record.aggregate.plan_history.find((plan) => plan.revision === 4)!.approval_evidence_digest =
        null;
    if (kind === "amendment")
      record.events.find((entry) => entry.mutation_id === "mixed-amendment")!.command_digest =
        k.kernelDigest("tampered");
    if (kind === "wrong-task") order.canonical_binding!.task_id = "other-task";
    if (kind === "claim") order.canonical_binding!.claim_id = "other-claim";
    if (kind === "authority")
      record.aggregate.authority_lineage.at(-1)!.authority.provenance.parent_authority_digest =
        k.kernelDigest("other");
    const operation = withKernelReworkEvidence(order, target, record);
    if (kind === "valid") {
      const enriched = await operation;
      expect(enriched.required_inputs).toContainEqual(
        expect.objectContaining({ id: `scope-stop:${oldOrder.work_order_id}` }),
      );
      const context: unknown = JSON.parse(
        await readFile(
          enriched.required_inputs.find((item) => item.id === "approved-scope-replan")!.path!,
          "utf8",
        ),
      );
      expect(context).toMatchObject({
        grants_authority: false,
        approval_events: [expect.anything(), expect.anything()],
        amendment_events: [expect.anything()],
      });
    } else await expect(operation).rejects.toThrow();
  });

  it.each(["valid", "missing", "tampered", "ambiguous", "stale"])(
    "authenticates a fresh approval after an older scope grant: %s",
    async (kind) => {
      const directory = await createDirectory("kernel-fresh-seed-");
      const { record, oldOrder } = await fixture(directory, false, false, true);
      const approval = record.events.find((event) => event.mutation_id === "fresh-approval")!;
      const oldGrant = record.events.find((event) => event.kind === "authority_continued")!;
      expect(oldGrant.task_revision).toBeLessThan(approval.task_revision);
      expect(approval.task_revision).toBeLessThanOrEqual(oldOrder.task.revision!);
      expect(record.aggregate.current_plan!.revision).toBe(4);
      expect(record.aggregate.work_items.prerequisite).toMatchObject({
        state: "COMPLETED",
        attempt: 2,
      });
      if (kind === "missing") record.events = record.events.filter((event) => event !== approval);
      if (kind === "tampered")
        record.aggregate.mutation_receipts[approval.mutation_id]!.before_revision--;
      if (kind === "ambiguous") record.events.push(structuredClone(approval));
      const retained = structuredClone(oldOrder);
      if (kind === "stale") retained.task.revision = record.aggregate.revision;
      expect(retainedIssuanceAuthority(record, retained)).toBe(kind === "valid");
    },
  );

  it.each([
    "valid",
    ...["plan", "parent", "fingerprint", "receipt"].map((field) => `wrong-${field}`),
    "outside-scope",
    "retry-without-amendment",
  ])("authenticates post-BLOCKED canonical repository observation: %s", async (kind) => {
    const directory = await createDirectory("kernel-observation-");
    const { record, order, target } = await fixture(directory, false, true);
    const event = record.events.find((e) => e.mutation_id === "post-block-observation")!;
    const entry = record.aggregate.authority_lineage.find(
      (e) =>
        e.authority.repository_fingerprint === k.kernelDigest("post-block repository observation"),
    )!;
    if (kind === "wrong-plan") entry.authority.plan_digest = k.kernelDigest("wrong Plan");
    if (kind === "wrong-parent")
      entry.authority.provenance.parent_authority_digest = k.kernelDigest("wrong parent");
    if (kind === "wrong-fingerprint" && entry.observation)
      entry.observation.previous_fingerprint = k.kernelDigest("wrong fingerprint");
    if (kind === "wrong-receipt")
      record.aggregate.mutation_receipts[event.mutation_id]!.event_digests = [];
    if (kind === "outside-scope" && entry.observation)
      entry.observation.changed_paths = ["outside/unauthorized.ts"];
    if (kind === "retry-without-amendment") {
      record.events = record.events.filter((e) => e.mutation_id !== "amend-prerequisite");
    }
    const origin = record.events.find((e) => e.kind === "plan_amended")!;
    expect(await authenticatedAmendmentHistory(order, target, record, origin)).toBe(
      kind === "valid",
    );
  });

  it("retains the originating target stop through a prerequisite-only amendment and genuine retry", async () => {
    const directory = await createDirectory("kernel-lineage-");
    const { record, order, oldOrder, stopCommand, target } = await fixture(directory);
    const origin = record.events.find((event) => event.kind === "plan_amended")!;
    expect(record.aggregate.current_plan!.revision).toBe(3);
    expect(record.aggregate.work_items.prerequisite).toMatchObject({
      state: "COMPLETED",
      attempt: 2,
    });
    expect(record.aggregate.work_items.kernel).toMatchObject({ state: "EXECUTING", attempt: 3 });
    expect(record.events.filter((event) => event.kind === "plan_amended")).toHaveLength(2);
    expect(await authenticatedAmendmentHistory(order, target, record, origin)).toBe(true);
    const prior = path.join(directory, oldOrder.work_order_id.slice(7));
    await write(prior, "work-order.json", oldOrder);
    await write(prior, "semantic-stop-command.json", stopCommand);
    const enriched = await withKernelReworkEvidence(order, target, record);
    expect(enriched.required_inputs).toContainEqual(
      expect.objectContaining({
        id: `previous-definition:${oldOrder.work_order_id}`,
        required: true,
      }),
    );
  });

  it.each([
    "authority",
    "missing-stop-event",
    "stop-event",
    "continuation-event",
    "continuation-receipt",
  ])("rejects original target %s tampering at complete rework admission", async (kind) => {
    const directory = await createDirectory("kernel-lineage-origin-");
    const { record, order, oldOrder, stopCommand, target } = await fixture(directory);
    const prior = path.join(directory, oldOrder.work_order_id.slice(7));
    const stop = record.events.find(
      (event) => event.mutation_id === `semantic-stop:${oldOrder.work_order_id}`,
    )!;
    const continuation = record.events.find(
      (event) => event.mutation_id === "pre-stop-continuation",
    )!;
    if (kind === "authority")
      oldOrder.canonical_binding!.authority_digest = k.kernelDigest("unissued");
    if (kind === "missing-stop-event") record.events.splice(record.events.indexOf(stop), 1);
    if (kind === "stop-event") stop.payload_digest = k.kernelDigest("tampered");
    if (kind === "continuation-event") continuation.payload_digest = k.kernelDigest("tampered");
    if (kind === "continuation-receipt")
      record.aggregate.mutation_receipts[continuation.mutation_id]!.event_digests = [];
    await write(prior, "work-order.json", oldOrder);
    await write(prior, "semantic-stop-command.json", stopCommand);
    await expect(withKernelReworkEvidence(order, target, record)).rejects.toThrow();
  });

  it.each([
    ...["missing", "tampered", "unknown"].map((kind) => `${kind}-contract`),
    ...["missing", "tampered"].map((kind) => `${kind}-block`),
    "missing-block-order",
    ...["claim", "attempt", "plan", "authority"].map((field) => `wrong-block-${field}`),
    ...["receipt", "event"].map((kind) => `amendment-${kind}`),
    ...["missing", "unknown", "unrelated"].map((kind) => `${kind}-event`),
    "target-changing-suffix",
    "unauthorized-amendment",
    "cycle",
    "target-retry",
  ])("rejects %s without accepting historical evidence", async (kind) => {
    const directory = await createDirectory("kernel-lineage-");
    const { record, order, blockedDirectory, target } = await fixture(
      directory,
      kind === "target-retry",
    );
    const amendments = record.events.filter((event) => event.kind === "plan_amended");
    const origin = amendments[0]!;
    const latest = amendments[1]!;
    const oldContract = record.aggregate.plan_history[0]!.work_items[0]!.contract_digest;
    if (kind === "missing-contract") delete record.documents.contracts[String(oldContract)];
    if (kind === "tampered-contract")
      record.documents.contracts[String(oldContract)]!.objective = "tampered";
    if (kind === "unknown-contract")
      record.aggregate.plan_history[0]!.work_items[0]!.contract_digest = k.kernelDigest("unknown");
    if (kind === "missing-block")
      await rm(path.join(blockedDirectory, "semantic-stop-command.json"));
    if (kind === "tampered-block")
      await writeFile(path.join(blockedDirectory, "semantic-stop-command.json"), "{}");
    if (kind === "missing-block-order") await rm(path.join(blockedDirectory, "work-order.json"));
    if (kind.startsWith("wrong-block-")) {
      const retained = JSON.parse(
        await readFile(path.join(blockedDirectory, "work-order.json"), "utf8"),
      ) as { canonical_binding: Record<string, unknown> };
      const field = kind.slice("wrong-block-".length);
      const bindingKeys: Record<string, string> = {
        plan: "plan_digest",
        authority: "authority_digest",
        claim: "claim_id",
      };
      const key = bindingKeys[field] ?? "attempt";
      retained.canonical_binding[key] = field === "attempt" ? 99 : k.kernelDigest("wrong");
      await writeFile(path.join(blockedDirectory, "work-order.json"), JSON.stringify(retained));
    }
    if (kind === "amendment-receipt")
      record.aggregate.mutation_receipts[latest.mutation_id]!.command_digest =
        k.kernelDigest("wrong");
    if (kind === "amendment-event") latest.payload_digest = k.kernelDigest("wrong");
    if (kind === "missing-event") record.events.splice(record.events.indexOf(latest), 1);
    if (kind === "unknown-event") latest.kind = "final_validation_recorded";
    if (kind === "unrelated-event")
      record.events.find(
        (event) =>
          event.mutation_id.startsWith("semantic-stop:") &&
          event.task_revision > origin.task_revision,
      )!.task_id = "unrelated";
    if (kind === "target-changing-suffix")
      record.aggregate.current_plan!.work_items.find(
        (item) => item.id === "kernel",
      )!.expected_outputs = ["unapproved"];
    if (kind === "unauthorized-amendment")
      record.aggregate.current_plan!.approval_actor_id = "AGENT";
    if (kind === "cycle")
      record.aggregate.current_plan!.work_items.find(
        (item) => item.id === "prerequisite",
      )!.depends_on = ["kernel"];
    expect(await authenticatedAmendmentHistory(order, target, record, origin)).toBe(false);
  });
});
