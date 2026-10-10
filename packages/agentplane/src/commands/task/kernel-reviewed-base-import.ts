import { readdir } from "node:fs/promises";
import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  validateStateFingerprint,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { KernelRepositoryObservation } from "../../runner/observation/kernel-repository.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { verifyReviewedBaseTrees } from "./kernel-reviewed-base-tree.js";

export type ReviewedBasePins = Pick<
  k.ReviewedBaseImport,
  "old_commit" | "new_commit" | "work_order_digest" | "checkpoint_digest"
>;

/** Operator pins select historical bytes; native begin receipts authenticate the live attempt. */
export function authenticateReviewedBaseOrder(opts: {
  raw: unknown;
  pins: ReviewedBasePins;
  record: KernelRecord;
  parent: k.ExecutionAuthority;
  root: string;
}) {
  const { pins, record, parent } = opts;
  if (
    k.kernelDigest(opts.raw) !== pins.work_order_digest ||
    pins.checkpoint_digest !== parent.repository_fingerprint
  )
    throw new Error("Reviewed base operator evidence pins changed");
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(opts.raw);
  const binding = order.canonical_binding;
  const fingerprint = validateStateFingerprint(order.state_fingerprint);
  if (binding?.phase !== "implementation")
    throw new Error("Reviewed base requires an implementation WorkOrder");
  const item = record.aggregate.work_items[binding.work_item_id];
  if (
    item?.state !== "EXECUTING" ||
    item.result_digest !== null ||
    binding.task_id !== record.aggregate.id ||
    order.task.id !== record.aggregate.id ||
    order.task.revision !== record.aggregate.revision ||
    fingerprint.task_revision !== record.aggregate.revision ||
    binding.repository_identity !== parent.repository_identity ||
    binding.repository_fingerprint !== parent.repository_fingerprint ||
    binding.plan_revision !== parent.plan_revision ||
    binding.plan_digest !== parent.plan_digest ||
    binding.claim_id !== item.claim_id ||
    binding.attempt !== item.attempt ||
    binding.contract_digest !== item.definition.contract_digest ||
    fingerprint.git_head !== pins.old_commit ||
    path.resolve(fingerprint.worktree) !== path.resolve(opts.root) ||
    fingerprint.components.task.digest !==
      k.kernelDigest({ state: "present", source: "canonical_task", value: record.digest }) ||
    fingerprint.components.git.digest !==
      k.kernelDigest({
        state: "present",
        source: "native_repository_content",
        value: parent.repository_fingerprint,
      })
  )
    throw new Error("Reviewed base retained WorkOrder does not bind the current canonical attempt");
  const delegated = {
    ...parent,
    ...item.definition.execution_requirements,
    work_item_id: item.definition.id,
    provenance: {
      ...parent.provenance,
      kind: "DELEGATED" as const,
      actor_id: "agentplane:kernel-controller",
      parent_authority_digest: parent.digest,
    },
  };
  if (
    binding.authority_digest !== k.authorityDigest(delegated) ||
    order.work_order_id !==
      k.kernelDigest({
        binding,
        revision: record.aggregate.revision,
        record: record.digest,
        state_fingerprint: fingerprint.digest,
      })
  )
    throw new Error("Reviewed base retained WorkOrder authority changed");
  const begin = record.events.find((event) => {
    if (event.kind !== "work_item_transitioned") return false;
    const receipt = record.aggregate.mutation_receipts[event.mutation_id];
    return (
      record.aggregate.authority_lineage?.some(({ authority }) => {
        if (
          authority.plan_digest !== parent.plan_digest ||
          authority.plan_revision !== parent.plan_revision
        )
          return false;
        const command = {
          kind: "transition_work_item",
          action: "begin",
          task_id: record.aggregate.id,
          expected_task_revision: event.task_revision - 1,
          expected_state_fingerprint: authority.repository_fingerprint,
          work_item_id: binding.work_item_id,
          claim_id: binding.claim_id,
        };
        return (
          receipt?.after_revision === event.task_revision &&
          receipt.before_revision === event.task_revision - 1 &&
          receipt.command_digest === k.kernelDigest(command) &&
          event.command_digest === receipt.command_digest &&
          receipt.event_digests.includes(k.kernelDigest(event))
        );
      }) === true
    );
  });
  if (!begin) throw new Error("Reviewed base has no matching native begin mutation receipt");
  return {
    order,
    mutation_receipt_digest: k.kernelDigest(record.aggregate.mutation_receipts[begin.mutation_id]),
  };
}

export async function readPinnedReviewedBaseOrder(directory: string, digest: k.Sha256Digest) {
  let raw: unknown;
  let selectedPath: string | undefined;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^[a-f0-9]{64}$/u.test(entry.name)) continue;
    let text: string;
    try {
      text = await readStableRegularTextNoFollow(
        path.join(directory, entry.name, "work-order.json"),
        "retained reviewed-base WorkOrder",
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    const candidate = JSON.parse(text) as unknown;
    if (k.kernelDigest(candidate) === digest) {
      raw = candidate;
      selectedPath = path.join(directory, entry.name, "work-order.json");
      break;
    }
  }
  if (!raw) throw new Error("Reviewed base pinned WorkOrder is unavailable");
  return { raw, selectedPath };
}

export async function observeReviewedBaseImport(opts: {
  root: string;
  common: string;
  pins: ReviewedBasePins;
  parent: k.ExecutionAuthority;
  record: KernelRecord;
  current: KernelRepositoryObservation;
}): Promise<k.ReviewedBaseImport> {
  const directory = path.join(opts.common, "agentplane/kernel/exchanges", opts.record.aggregate.id);
  const { raw, selectedPath } = await readPinnedReviewedBaseOrder(
    directory,
    opts.pins.work_order_digest,
  );
  const proof = authenticateReviewedBaseOrder({ ...opts, raw });
  const before = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(
        opts.common,
        "agentplane/kernel/observations",
        `${opts.pins.checkpoint_digest.slice(7)}.json`,
      ),
      "reviewed-base checkpoint",
    ),
  ) as KernelRepositoryObservation;
  const trees = await verifyReviewedBaseTrees({
    root: opts.root,
    ...opts.pins,
    parent: opts.parent,
    before,
    after: opts.current,
  });
  if (
    !selectedPath ||
    k.kernelDigest(
      JSON.parse(
        await readStableRegularTextNoFollow(selectedPath, "reviewed-base pinned WorkOrder"),
      ),
    ) !== opts.pins.work_order_digest
  )
    throw new Error("Reviewed base WorkOrder changed during observation");
  return {
    ...opts.pins,
    ...trees,
    canonical_record_digest: opts.record.digest,
    mutation_receipt_digest: proof.mutation_receipt_digest,
  };
}
