import { describe, expect, it } from "vitest";
import {
  bindHostedPrHeadEvidence,
  validateHostedPrHeadEvidence,
  type HostedPrHeadEvidence,
} from "./hosted-pr-head-evidence.js";
import { isTaskCompletionEligible, kernelDigest, reduceTaskCommand } from "./kernel.js";
import type { Sha256Digest, TaskCommand } from "./model.js";
import {
  aggregate,
  fingerprint,
  input as kernelInput,
  manifest,
  resultDigest,
  runtime,
  validation,
} from "./kernel.test-fixtures.js";

const sha = (character: string) => character.repeat(40);
const digest = (character: string) => `sha256:${character.repeat(64)}` as Sha256Digest;

function input() {
  return {
    task_id: "task-1",
    work_order_id: digest("a"),
    adoption_digest: digest("b"),
    identity: {
      provider: "github",
      hostname: "github.com",
      remote: "origin",
      source_project: "org/repo",
      target_project: "org/repo",
      pr_number: 42,
      head_ref: "change",
      base_ref: "main",
    },
    adopted_head: sha("1"),
    adopted_base: sha("2"),
    current_head: sha("3"),
    current_base: sha("4"),
    current_readback_digest: digest("c"),
    head_tree: sha("5"),
    checkout_head: sha("3"),
    checkout_tree: sha("5"),
    head_descends_from_adoption: true,
    base_descends_from_adoption: true,
  };
}

describe("canonical adopted hosted PR head evidence", () => {
  it("binds the immutable adoption and exact mutable provider head to the inspected checkout", () => {
    const bound = bindHostedPrHeadEvidence(input());
    expect(
      validateHostedPrHeadEvidence(bound, {
        task_id: bound.task_id,
        work_order_id: bound.work_order_id,
        adoption_digest: bound.adoption_digest,
        identity: bound.identity,
        current_head: bound.current_head,
        current_base: bound.current_base,
        current_readback_digest: bound.current_readback_digest,
      }),
    ).toBe(true);
  });

  it.each([
    ["changed head", { current_head: sha("6") }],
    ["changed base", { current_base: sha("6") }],
    ["changed readback", { current_readback_digest: digest("d") }],
    ["replayed adoption", { adoption_digest: digest("d") }],
    ["different task", { task_id: "task-2" }],
  ])("rejects %s", (_label, changed) => {
    const bound = bindHostedPrHeadEvidence(input());
    expect(
      validateHostedPrHeadEvidence(bound, {
        task_id: bound.task_id,
        work_order_id: bound.work_order_id,
        adoption_digest: bound.adoption_digest,
        identity: bound.identity,
        current_head: bound.current_head,
        current_base: bound.current_base,
        current_readback_digest: bound.current_readback_digest,
        ...changed,
      }),
    ).toBe(false);
  });

  it.each([
    ["fork", { identity: { ...input().identity, target_project: "elsewhere" } }],
    ["forced head", { head_descends_from_adoption: false }],
    ["rewritten base", { base_descends_from_adoption: false }],
    ["wrong checkout", { checkout_head: sha("6") }],
    ["wrong tree", { checkout_tree: sha("6") }],
  ])("rejects %s before recording", (_label, changed) => {
    expect(() => bindHostedPrHeadEvidence({ ...input(), ...changed })).toThrow();
  });

  it("rejects a tampered retained receipt", () => {
    const bound = bindHostedPrHeadEvidence(input());
    const tampered: HostedPrHeadEvidence = { ...bound, current_base: sha("6") };
    expect(
      validateHostedPrHeadEvidence(tampered, {
        task_id: bound.task_id,
        work_order_id: bound.work_order_id,
        adoption_digest: bound.adoption_digest,
        identity: bound.identity,
        current_head: bound.current_head,
        current_base: bound.current_base,
        current_readback_digest: bound.current_readback_digest,
      }),
    ).toBe(false);
  });
  it("binds final validation to the exact hosted head accepted by WorkItem review", () => {
    const acceptedHead = kernelDigest("hosted-head-a");
    const changedHead = kernelDigest("hosted-head-b");
    const itemValidation = {
      ...validation(resultDigest),
      identity: {
        ...validation(resultDigest).identity,
        hosted_head_evidence_digest: acceptedHead,
      },
    };
    const completed = aggregate({
      work_items: {
        kernel: {
          ...runtime("COMPLETED"),
          result_digest: resultDigest,
          output_manifests: [manifest()],
          validation: itemValidation,
        },
      },
    });
    const command: Extract<TaskCommand, { kind: "record_final_validation" }> = {
      kind: "record_final_validation",
      task_id: completed.id,
      expected_task_revision: completed.revision,
      expected_state_fingerprint: fingerprint,
      validation: {
        ...validation(fingerprint),
        identity: {
          ...validation(fingerprint).identity,
          hosted_head_evidence_digest: changedHead,
        },
      },
    };
    expect(reduceTaskCommand(kernelInput(completed, command))).toMatchObject({
      kind: "rejected",
      code: "VALIDATION_IDENTITY_MISMATCH",
    });
    const matching = {
      ...command,
      validation: {
        ...command.validation,
        identity: {
          ...command.validation.identity,
          hosted_head_evidence_digest: acceptedHead,
        },
      },
    };
    expect(reduceTaskCommand(kernelInput(completed, matching))).toMatchObject({
      kind: "accepted",
      aggregate: { state: "FINAL_VALIDATION" },
    });
    expect(
      isTaskCompletionEligible(
        {
          ...completed,
          state: "FINAL_VALIDATION",
          final_validation: command.validation,
        },
        fingerprint,
      ),
    ).toBe(false);
  });
});
