import { readFile } from "node:fs/promises";
import { taskKernel as k, kernelPlanProposalSchema } from "@agentplaneorg/core/tasks";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import type { runKernelFinalValidation } from "./kernel-final-validation.js";

/** Admission consumes a durable opt-in grant. A conversation never creates that grant. */
export async function tryApplyBoundedFinalCorrection(
  command: CommandContext,
  taskId: string,
  stop: NonNullable<Awaited<ReturnType<typeof runKernelFinalValidation>>["stop"]>,
): Promise<boolean> {
  if (
    stop.reason !== "canonical_final_checks_failed" ||
    !("recovery" in stop) ||
    !stop.recovery?.corrective_plan
  )
    return false;
  const runtime = await createKernelRuntime({
    command,
    task_id: taskId,
    transport: "host",
    operation_id: "bounded-final-correction",
  });
  const read = await runtime.adapter.read(taskId);
  if (read.kind !== "canonical") return false;
  const plan = read.record.aggregate.current_plan;
  const context = await runtime.native.readContext(taskId);
  const now = Date.parse(context.occurred_at);
  const grant = read.record.aggregate.corrective_authority?.findLast(
    (item) =>
      item.revoked_at === null &&
      item.uses.length < item.max_attempts &&
      now >= Date.parse(item.issued_at) &&
      now < Date.parse(item.expires_at) &&
      (item.uses.at(-1)?.to_plan_digest ?? item.initial_plan_digest) === plan?.digest &&
      item.verification_contract_digest === k.kernelDigest(read.task.execution_contract ?? null) &&
      item.policy_digest === k.kernelDigest(context.ceiling.policy_digests),
  );
  if (!grant) return false;
  const proposal = kernelPlanProposalSchema.parse(
    JSON.parse(await readFile(stop.recovery.corrective_plan, "utf8")),
  );
  try {
    await setCanonicalPlan(command, taskId, proposal, { correctiveGrantDigest: grant.digest });
  } catch (error) {
    const result = error && typeof error === "object" && "result" in error ? error.result : null;
    if (
      result &&
      typeof result === "object" &&
      "kind" in result &&
      result.kind === "rejected" &&
      "code" in result &&
      result.code === "AUTHORITY_SCOPE_EXCEEDED" &&
      "facts" in result &&
      Array.isArray(result.facts) &&
      result.facts.length === 1 &&
      result.facts[0] === "corrective_grant_not_applicable"
    )
      return false;
    throw error;
  }
  return true;
}
