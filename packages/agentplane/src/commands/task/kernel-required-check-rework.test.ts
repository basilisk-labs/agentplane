import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  fingerprint,
  plan,
  runtime,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  historicalAmendment,
  historicalAmendmentWithFailedCheck,
} from "./kernel-rework-lineage.js";

const directories: string[] = [];
afterEach(async () => {
  for (const directory of directories.splice(0))
    await rm(directory, { recursive: true, force: true });
});

async function fixture(corrected: boolean) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "kernel-required-rework-"));
  directories.push(directory);
  const oldCheck = "Focused tests covering negative drift";
  const replacement =
    "bunx vitest run packages/agentplane/src/commands/task/kernel-required-check-rework.test.ts";
  const oldContract = {
    role: "EXECUTOR" as const,
    objective: "Verify recovery",
    acceptance_criteria: ["Checks pass"],
    verification_commands: ["bun run typecheck", oldCheck],
  };
  const nextContract = {
    ...oldContract,
    verification_commands: ["bun run typecheck", replacement],
  };
  const oldDefinition = { ...plan.work_items[0]!, contract_digest: k.kernelDigest(oldContract) };
  const nextDefinition = {
    ...oldDefinition,
    contract_digest: k.kernelDigest(nextContract),
    ...(corrected ? {} : { expected_outputs: ["new-output"] }),
  };
  const source = {
    ...plan,
    state: "SUPERSEDED" as const,
    work_items: [oldDefinition],
    digest: k.kernelDigest({ revision: 1, work_items: [oldDefinition] }),
  };
  const amended = {
    revision: 2,
    work_items: [nextDefinition],
    digest: k.kernelDigest({ revision: 2, work_items: [nextDefinition] }),
  };
  const approval = k.planScopeExpansionApprovalDigest({
    task_id: "task-1",
    current_plan_digest: source.digest,
    amended_plan_digest: amended.digest,
    actor_id: "USER",
  });
  const current = {
    ...source,
    ...amended,
    state: "APPROVED" as const,
    approval_actor_id: "USER",
    approval_evidence_digest: approval,
  };
  const workOrderId = k.kernelDigest("failed-check-work-order");
  const native = {
    checks: {
      status: "failed",
      checks: [{ command: oldCheck, runtime: { status: "unavailable" } }],
    },
  };
  const failedWorkOrder = {
    work_order_id: workOrderId,
    canonical_binding: { plan_digest: source.digest },
  };
  const acceptedResult = {
    command: { kind: "accept_work_item_result", plan_digest: source.digest },
  };
  const validation = { command: { validation: { evidence_digests: [k.kernelDigest(native)] } } };
  const proof = {
    work_item_id: "kernel",
    failed_work_order_id: workOrderId,
    previous_command: oldCheck,
    replacement_command: replacement,
    failed_work_order: failedWorkOrder,
    accepted_result_command_input: acceptedResult,
    validation_command_input: validation,
    native_validation: native,
  };
  const contracts = {
    [k.kernelDigest(oldContract)]: oldContract,
    [k.kernelDigest(nextContract)]: nextContract,
  };
  const command: k.TaskCommand = {
    kind: "amend_plan",
    task_id: "task-1",
    expected_task_revision: 7,
    expected_state_fingerprint: fingerprint,
    plan_revision: 1,
    plan_digest: source.digest,
    amended_plan: amended,
    amendment_digest: k.kernelDigest(amended),
    authority_delta_digest: approval,
    work_contracts: contracts,
    ...(corrected ? { required_check_correction: proof } : {}),
  };
  const event: k.DomainEvent = {
    id: "amendment:plan_amended",
    task_id: "task-1",
    mutation_id: "amendment",
    task_revision: 8,
    kind: "plan_amended",
    command_digest: k.kernelDigest(command),
    payload_digest: k.kernelDigest({ kind: "amend_plan", aggregate_revision: 8 }),
    occurred_at: "2026-10-26T00:00:00.000Z",
  };
  const record = makeKernelRecord(
    k.kernelDigest("repository"),
    aggregate({
      revision: 8,
      plan_history: [source],
      current_plan: current,
      work_items: { kernel: { ...runtime("READY"), definition: nextDefinition } },
      mutation_receipts: {
        amendment: {
          mutation_id: "amendment",
          command_digest: event.command_digest,
          before_revision: 7,
          after_revision: 8,
          aggregate_digest: k.kernelDigest("post-amendment"),
          event_digests: [k.kernelDigest(event)],
          effect_ids: [],
        },
        [`validation:${workOrderId}`]: {
          mutation_id: `validation:${workOrderId}`,
          command_digest: k.kernelDigest(validation),
          before_revision: 6,
          after_revision: 7,
          aggregate_digest: k.kernelDigest("failed-validation"),
          event_digests: [],
          effect_ids: [],
        },
      },
    }),
    [event],
    { intent: { objective: "Verify recovery", context: "Test" }, contracts },
  );
  const exchange = path.join(directory, workOrderId.slice(7));
  await mkdir(exchange);
  await Promise.all([
    writeFile(path.join(exchange, "command-input.json"), JSON.stringify(acceptedResult)),
    writeFile(path.join(exchange, "work-order.json"), JSON.stringify(failedWorkOrder)),
    writeFile(path.join(exchange, "validation-command.json"), JSON.stringify(validation)),
    writeFile(
      path.join(exchange, `native-validation-${k.kernelDigest(native).slice(7)}.json`),
      JSON.stringify(native),
    ),
  ]);
  return { record, current, event, directory, exchange, command };
}

describe("historical required-check amendment", () => {
  it("reconstructs the exact accepted correction from retained failed evidence", async () => {
    const f = await fixture(true);
    expect(historicalAmendment(f.record, f.current, f.event, fingerprint)).toBeNull();
    expect(
      await historicalAmendmentWithFailedCheck(
        f.record,
        f.current,
        f.event,
        fingerprint,
        path.join(f.directory, "current"),
      ),
    ).toEqual(f.command);
  });

  it.each([
    "missing-proof",
    "tampered-proof",
    "tampered-accepted-result",
    "wrong-plan",
    "wrong-work-order",
    "receipt-mismatch",
  ])("rejects %s", async (kind) => {
    const f = await fixture(true);
    if (kind === "missing-proof") await rm(path.join(f.exchange, "validation-command.json"));
    if (kind === "tampered-proof")
      await writeFile(
        path.join(f.exchange, "work-order.json"),
        JSON.stringify({ work_order_id: "forged" }),
      );
    if (kind === "tampered-accepted-result")
      await writeFile(
        path.join(f.exchange, "command-input.json"),
        JSON.stringify({ command: { kind: "unrelated" } }),
      );
    if (kind === "wrong-plan")
      await writeFile(
        path.join(f.exchange, "work-order.json"),
        JSON.stringify({
          work_order_id: k.kernelDigest("failed-check-work-order"),
          canonical_binding: { plan_digest: k.kernelDigest("other-plan") },
        }),
      );
    if (kind === "wrong-work-order") {
      const receipt =
        f.record.aggregate.mutation_receipts[
          `validation:${k.kernelDigest("failed-check-work-order")}`
        ]!;
      delete f.record.aggregate.mutation_receipts[receipt.mutation_id];
      f.record.aggregate.mutation_receipts[`validation:${k.kernelDigest("other")}`] = {
        ...receipt,
        mutation_id: `validation:${k.kernelDigest("other")}`,
      };
    }
    if (kind === "receipt-mismatch")
      f.record.aggregate.mutation_receipts.amendment!.command_digest = k.kernelDigest("forged");
    expect(
      await historicalAmendmentWithFailedCheck(
        f.record,
        f.current,
        f.event,
        fingerprint,
        path.join(f.directory, "current"),
      ),
    ).toBeNull();
  });

  it("retains ordinary amendment recovery without a failed-check proof", async () => {
    const f = await fixture(false);
    expect(
      await historicalAmendmentWithFailedCheck(
        f.record,
        f.current,
        f.event,
        fingerprint,
        path.join(f.directory, "current"),
      ),
    ).toEqual(f.command);
  });
});
