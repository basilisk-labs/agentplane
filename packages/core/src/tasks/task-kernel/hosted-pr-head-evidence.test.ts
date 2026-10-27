import { describe, expect, it } from "vitest";
import {
  bindHostedPrHeadEvidence,
  validateHostedPrHeadEvidence,
  type HostedPrHeadEvidence,
} from "./hosted-pr-head-evidence.js";
import type { Sha256Digest } from "./model.js";

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
});
