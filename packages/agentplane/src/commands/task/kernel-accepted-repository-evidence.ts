import path from "node:path";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { KernelRepositoryEvidence } from "./kernel-repository-types.js";

export async function readKernelRepositoryEvidence(
  directory: string,
): Promise<KernelRepositoryEvidence> {
  const evidence = JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, "repository-evidence.json"),
      "canonical repository evidence",
    ),
  ) as KernelRepositoryEvidence;
  const { digest, ...contents } = evidence;
  if (k.kernelDigest(contents) !== digest)
    throw new Error("Canonical repository evidence is invalid");
  return evidence;
}

export async function listKernelRepositoryEvidence(
  command: CommandContext,
  record: KernelRecord,
): Promise<KernelRepositoryEvidence[]> {
  const root = path.join(
    await resolveCommandGitCommonDir(command),
    "agentplane",
    "kernel",
    "exchanges",
    record.aggregate.id,
  );
  const evidence: KernelRepositoryEvidence[] = [];
  for (const mutationId of Object.keys(record.aggregate.mutation_receipts ?? {}).toSorted()) {
    const match = /^validation:sha256:([a-f0-9]{64})$/u.exec(mutationId);
    if (!match) continue;
    const directory = path.join(root, match[1]!);
    let reviewText: string;
    try {
      reviewText = await readStableRegularTextNoFollow(
        path.join(directory, "inspection-result.json"),
        "canonical inspection",
      );
    } catch (error) {
      // Failed native checks also retain validation receipts, without an agent inspection.
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    const review = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(JSON.parse(reviewText));
    const binding = review.canonical_binding;
    if (binding?.phase !== "inspection") continue;
    const item = record.aggregate.work_items[binding.work_item_id];
    if (
      item?.state !== "COMPLETED" ||
      item.validation?.status !== "PASSED" ||
      !item.validation.evidence_digests.includes(k.kernelDigest(review))
    )
      continue;
    // The accepted validation selects repository evidence. Its commit may originate in an
    // earlier attempt, but historical WorkItem completion alone cannot select that commit.
    if (
      review.work_order_id !== `sha256:${match[1]}` ||
      review.status !== "completed" ||
      review.review?.verdict !== "pass" ||
      binding.task_id !== record.aggregate.id ||
      binding.attempt !== item.attempt ||
      binding.claim_id !== item.claim_id ||
      binding.contract_digest !== item.definition.contract_digest ||
      binding.result_digest !== item.result_digest ||
      item.validation.identity.implementation_identity !== item.result_digest
    )
      throw new Error("Repository evidence does not match the accepted inspection");
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "work-order.json"),
          "canonical inspection WorkOrder",
        ),
      ),
    );
    if (
      order.work_order_id !== review.work_order_id ||
      k.kernelDigest(order.canonical_binding) !== k.kernelDigest(binding)
    )
      throw new Error("Retained inspection WorkOrder binding changed");
    const input = order.required_inputs.find((entry) => entry.id === "native-validation");
    if (
      !input?.path ||
      !/^native-validation-[a-f0-9]{64}\.json$/u.test(path.basename(input.path)) ||
      path.dirname(path.dirname(input.path)) !== root ||
      !/^[a-f0-9]{64}$/u.test(path.basename(path.dirname(input.path)))
    )
      throw new Error("Accepted native validation is unavailable");
    const native = JSON.parse(
      await readStableRegularTextNoFollow(input.path, "accepted native validation"),
    ) as {
      input_digest: string;
      input: {
        task_id: string;
        work_item_id: string;
        result_digest: string;
        repository_fingerprint: string;
        repository_evidence_digest: string | null;
      };
      checks: { status: string };
      repository_evidence: KernelRepositoryEvidence | null;
    };
    const digest = k.kernelDigest(native);
    if (
      digest !== input.digest ||
      !item.validation.evidence_digests.includes(digest) ||
      native.input_digest !== k.kernelDigest(native.input) ||
      native.checks.status !== "passed" ||
      native.input.task_id !== record.aggregate.id ||
      native.input.work_item_id !== item.definition.id ||
      native.input.result_digest !== item.result_digest ||
      native.input.repository_fingerprint !== binding.repository_fingerprint ||
      native.input.repository_evidence_digest !== (native.repository_evidence?.digest ?? null)
    )
      throw new Error("Accepted native validation does not match repository evidence");
    const candidate = native.repository_evidence;
    if (!candidate) continue;
    if (
      candidate.task_id !== record.aggregate.id ||
      candidate.work_item_id !== item.definition.id ||
      !/^sha256:[a-f0-9]{64}$/u.test(candidate.work_order_id)
    )
      throw new Error("Accepted repository evidence identity is invalid");
    const retained = await readKernelRepositoryEvidence(
      path.join(root, candidate.work_order_id.slice(7)),
    );
    if (k.kernelDigest(retained) !== k.kernelDigest(candidate))
      throw new Error("Accepted repository evidence differs from its retained receipt");
    evidence.push(candidate);
  }
  return evidence.toSorted(
    (left, right) =>
      left.task_revision - right.task_revision ||
      left.work_order_id.localeCompare(right.work_order_id),
  );
}
