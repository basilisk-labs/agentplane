import {
  taskKernel,
  kernelIntentSchema,
  kernelWorkContractSchema,
} from "@agentplaneorg/core/tasks";
import { z } from "zod";

export { kernelIntentSchema, kernelWorkContractSchema } from "@agentplaneorg/core/tasks";

/** Immutable content addressed inputs. Lifecycle authority lives only in the aggregate. */
export const kernelDocumentsSchema = z.strictObject({
  intent: kernelIntentSchema,
  contracts: z.record(z.string().regex(/^sha256:[a-f0-9]{64}$/u), kernelWorkContractSchema),
});
export type KernelIntent = z.infer<typeof kernelIntentSchema>;
export type KernelWorkContract = z.infer<typeof kernelWorkContractSchema>;
export type KernelDocuments = z.infer<typeof kernelDocumentsSchema>;

export function kernelDocumentIssues(
  aggregate: taskKernel.TaskAggregate,
  documents: KernelDocuments | undefined,
): string[] {
  if (!documents) {
    return [aggregate.current_plan, ...aggregate.plan_history].some((plan) =>
      plan?.work_items.some((item) => item.contract_digest !== undefined),
    )
      ? ["documents_missing"]
      : [];
  }
  const issues: string[] = [];
  if (taskKernel.kernelDigest(documents.intent) !== aggregate.intent_digest)
    issues.push("intent_digest");
  for (const [digest, contract] of Object.entries(documents.contracts)) {
    if (taskKernel.kernelDigest(contract) !== digest) issues.push(`contract_digest:${digest}`);
  }
  const referenced = new Set<taskKernel.Sha256Digest>();
  for (const plan of [aggregate.current_plan, ...aggregate.plan_history]) {
    if (
      plan &&
      plan.digest !==
        taskKernel.kernelDigest({ revision: plan.revision, work_items: plan.work_items })
    )
      issues.push(`plan_digest:${plan.revision}`);
    for (const item of plan?.work_items ?? []) {
      if (!item.contract_digest || !Object.hasOwn(documents.contracts, item.contract_digest))
        issues.push(`contract_missing:${item.id}`);
      else referenced.add(item.contract_digest);
    }
  }
  for (const digest of Object.keys(documents.contracts)) {
    if (!referenced.has(digest as taskKernel.Sha256Digest))
      issues.push(`contract_unreferenced:${digest}`);
  }
  return issues;
}
