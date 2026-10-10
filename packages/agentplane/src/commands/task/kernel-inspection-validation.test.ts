import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  aggregate,
  runtime,
  validation,
  resultDigest,
} from "../../../../core/src/tasks/task-kernel/kernel.test-fixtures.js";
import { makeKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  resolveRecordedNativeValidation,
  type InspectionBinding,
} from "./kernel-inspection-validation.js";

describe("native validation operator boundary", () => {
  function fixture() {
    const item = {
      ...runtime("VALIDATING"),
      result_digest: resultDigest,
      definition: {
        ...runtime("VALIDATING").definition,
        contract_digest: k.kernelDigest("contract"),
      },
      validation: {
        ...validation(resultDigest),
        status: "BLOCKED" as const,
        identity: { ...validation(resultDigest).identity, check_id: "canonical-native-checks" },
      },
    };
    const record = makeKernelRecord(
      k.kernelDigest("repo"),
      aggregate({ work_items: { kernel: item } }),
      [],
    );
    const binding: InspectionBinding = {
      phase: "inspection",
      task_id: record.aggregate.id,
      repository_identity: record.repository_identity,
      repository_fingerprint: k.kernelDigest("repo-state"),
      plan_revision: record.aggregate.current_plan!.revision,
      plan_digest: record.aggregate.current_plan!.digest,
      work_item_id: "kernel",
      attempt: 1,
      claim_id: item.claim_id!,
      contract_digest: item.definition.contract_digest,
      authority_digest: k.kernelDigest("authority"),
      result_digest: resultDigest,
    };
    const apply = vi.fn();
    const native = {
      adapter: { read: vi.fn().mockResolvedValue({ kind: "canonical", record }) },
      lifecycle: { apply },
    } as unknown as Parameters<typeof resolveRecordedNativeValidation>[0];
    return { record, item, binding, native, apply };
  }

  it("emits exact USER resume argv and leaves validation blocked without mutation", async () => {
    const f = fixture();
    const before = structuredClone(f.record);
    expect(
      await resolveRecordedNativeValidation(f.native, f.binding, f.item.validation),
    ).toMatchObject({
      kind: "human_required",
      reason: "canonical_validation_infrastructure",
      operator_action: {
        argv: [
          "agentplane",
          "task",
          "work-item",
          "resume",
          f.record.aggregate.id,
          "--work-item",
          "kernel",
          "--state-digest",
          f.record.digest,
          "--by",
          "USER",
        ],
        required_input: { option: "--note" },
      },
    });
    expect(f.apply).not.toHaveBeenCalled();
    expect(f.record).toEqual(before);
  });

  it.each([
    "claim_id",
    "result_digest",
    "plan_digest",
    "repository_identity",
    "contract_digest",
  ] as const)("rejects stale %s before emitting recovery", async (field) => {
    const f = fixture();
    await expect(
      resolveRecordedNativeValidation(
        f.native,
        { ...f.binding, [field]: k.kernelDigest("wrong") },
        f.item.validation,
      ),
    ).rejects.toThrow("stale");
    expect(f.apply).not.toHaveBeenCalled();
  });
});
