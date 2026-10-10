import { hasAuthenticatedCompletedNativeReview } from "./kernel-completed-native-review.js";
import {
  requireKernelReportOnlyCompletion,
  kernelTaskMetadataStatusOnly,
} from "./kernel-report-only-completion.js";
import path from "node:path";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";
import { taskExecutionBaseFromExtensions, taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskData } from "../../backends/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { CommandContext } from "../shared/task-backend.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import {
  validationRecord,
  type KernelNativeValidationEvidence,
  type KernelValidationEvidence,
} from "./kernel-inspection-validation.js";
import {
  projectKernelOperationalEvidence,
  kernelProjectedReviewMatches,
  readKernelOperationalProjection,
} from "./kernel-operational-projection.js";
import {
  listKernelRepositoryEvidence,
  type KernelRepositoryEvidence,
} from "./kernel-repository-coordinator.js";

async function artifact(directory: string, name: string): Promise<unknown> {
  return JSON.parse(
    await readStableRegularTextNoFollow(
      path.join(directory, name),
      "canonical projection recovery",
    ),
  );
}

function recoveryBoundary(task: TaskData, detail: string) {
  const base = taskExecutionBaseFromExtensions(task.extensions);
  const declaration = task.execution_contract?.declaration;
  const argv = [
    "agentplane",
    "task",
    "create",
    `Re-evaluate implementation for ${task.id}`,
    "--description",
    `Recover ${task.id} by reapplying its implementation from the preserved task branch onto the current development base. Run fresh checks and independent evaluation. Do not inherit the historical passing review.`,
    "--route",
    "branch_pr",
    "--task-kind",
    "code",
    "--mutation-scope",
    "code",
    ...(base ? ["--base", base.base_ref] : []),
    ...(declaration?.scope_roots ?? []).flatMap((root) => ["--scope-root", root]),
    ...(declaration?.repository_effects ?? []).flatMap((effect) => ["--repository-effect", effect]),
    "--json",
  ];
  return {
    kind: "human_required" as const,
    reason: "canonical_operational_projection_recovery_required",
    summary:
      "The operational projection cannot be reconstructed from current commit-bound evidence. Preserve this task and use a replacement task for fresh implementation checks and evaluation.",
    detail,
    operator_action: { kind: "create_recovery_task", argv },
  };
}

export async function recoverableInspection(
  command: CommandContext,
  record: KernelRecord,
  repository: KernelRepositoryEvidence | null,
  workItemId = repository?.work_item_id ?? "",
) {
  const item = record.aggregate.work_items[workItemId];
  const plan = record.aggregate.current_plan;
  const contract = record.documents?.contracts[String(item?.definition.contract_digest ?? "")];
  if (item?.state !== "COMPLETED" || item.validation?.status !== "PASSED" || !plan || !contract)
    throw new Error("Completed inspection evidence is unavailable");
  for (const mutationId of Object.keys(record.aggregate.mutation_receipts).toReversed()) {
    if (!/^validation:sha256:[a-f0-9]{64}$/u.test(mutationId)) continue;
    const orderId = mutationId.slice("validation:".length);
    const directory = await kernelExchangeDirectory(command, record.aggregate.id, orderId);
    const review = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
      await artifact(directory, "inspection-result.json"),
    );
    const binding = review.canonical_binding;
    if (binding?.phase !== "inspection" || binding.work_item_id !== item.definition.id) continue;
    if (
      review.work_order_id !== orderId ||
      review.status !== "completed" ||
      review.review?.verdict !== "pass" ||
      binding.task_id !== record.aggregate.id ||
      binding.plan_digest !== plan.digest ||
      binding.plan_revision !== plan.revision ||
      binding.attempt !== item.attempt ||
      binding.claim_id !== item.claim_id ||
      binding.contract_digest !== item.definition.contract_digest ||
      binding.result_digest !== item.result_digest ||
      !item.validation.evidence_digests.includes(k.kernelDigest(review))
    )
      throw new Error("Retained inspection identity does not match the completed WorkItem");
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      await artifact(directory, "work-order.json"),
    );
    if (
      order.work_order_id !== orderId ||
      k.kernelDigest(order.canonical_binding) !== k.kernelDigest(binding)
    )
      throw new Error("Retained inspection WorkOrder binding changed");
    const implementationInput = order.required_inputs.find(
      (input) => input.id === "implementation-result",
    );
    if (!implementationInput?.path || implementationInput.digest !== binding.result_digest)
      throw new Error("Retained implementation result is unavailable");
    const implementation = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
      await artifact(
        path.dirname(implementationInput.path),
        path.basename(implementationInput.path),
      ),
    );
    const implementationDirectory = await kernelExchangeDirectory(
      command,
      record.aggregate.id,
      implementation.work_order_id,
    );
    if (implementation.canonical_binding?.phase !== "implementation")
      throw new Error("Retained result is not an implementation attempt");
    const {
      result_digest: _resultDigest,
      repository_fingerprint: _inspectionFingerprint,
      authority_digest: _inspectionAuthority,
      ...inspectionBinding
    } = binding;
    const {
      repository_fingerprint: _implementationFingerprint,
      authority_digest: _implementationAuthority,
      ...implementationBinding
    } = implementation.canonical_binding;
    // Commit continuation can change repository authority but not the WorkItem attempt identity.
    if (
      implementationInput.path !== path.join(implementationDirectory, "received-result.json") ||
      k.kernelDigest(implementation) !== binding.result_digest ||
      implementation.status !== "completed" ||
      k.kernelDigest(implementationBinding) !==
        k.kernelDigest({ ...inspectionBinding, phase: "implementation" })
    )
      throw new Error("Retained implementation attempt does not match the inspection");
    const nativeInput = order.required_inputs.find((input) => input.id === "native-validation");
    if (
      !nativeInput?.path ||
      path.dirname(nativeInput.path) !== implementationDirectory ||
      !/^native-validation-[a-f0-9]{64}\.json$/u.test(path.basename(nativeInput.path))
    )
      throw new Error("Retained native-check evidence is unavailable");
    const native = (await artifact(
      implementationDirectory,
      path.basename(nativeInput.path),
    )) as KernelNativeValidationEvidence;
    const evidence = (await artifact(directory, "validation.json")) as KernelValidationEvidence;
    const nativeDigest = k.kernelDigest(native);
    if (
      nativeDigest !== nativeInput.digest ||
      !item.validation.evidence_digests.includes(nativeDigest) ||
      native.input_digest !== k.kernelDigest(native.input) ||
      native.checks.status !== "passed" ||
      native.input.task_id !== binding.task_id ||
      native.input.work_item_id !== binding.work_item_id ||
      native.input.result_digest !== binding.result_digest ||
      native.input.repository_fingerprint !== binding.repository_fingerprint ||
      native.input.repository_evidence_digest !== (repository?.digest ?? null) ||
      k.kernelDigest(native.repository_evidence) !== k.kernelDigest(repository) ||
      evidence.status !== "PASSED" ||
      evidence.task_id !== binding.task_id ||
      evidence.work_item_id !== binding.work_item_id ||
      evidence.attempt !== binding.attempt ||
      evidence.contract_digest !== binding.contract_digest ||
      evidence.repository_fingerprint !== binding.repository_fingerprint ||
      evidence.result_digest !== binding.result_digest ||
      evidence.review_digest !== k.kernelDigest(review) ||
      evidence.native_evidence_digest !== nativeDigest ||
      k.kernelDigest(evidence.repository_evidence) !== k.kernelDigest(repository) ||
      k.kernelDigest(evidence.checks) !== k.kernelDigest(native.checks) ||
      k.kernelDigest(
        validationRecord({
          binding,
          contractCommands: contract.verification_commands,
          native,
          reviewDigest: k.kernelDigest(review),
          status: "PASSED",
          observedAt: item.validation.observed_at,
        }),
      ) !== k.kernelDigest(item.validation)
    )
      throw new Error("Retained native validation does not match canonical evidence");
    return {
      directory,
      review,
      evidence,
      order,
      implementation,
      projectedAt: item.validation.observed_at,
    };
  }
  throw new Error("No retained passing inspection matches the implementation");
}

/** Reconstruct compatibility metadata without changing canonical lifecycle or approval identity. */
export async function recoverKernelOperationalProjection(
  command: CommandContext,
  record: KernelRecord,
  task: TaskData,
  reason?: string,
) {
  if (
    reason &&
    ![
      "kernel_final_validation_required",
      "kernel_task_completion_required",
      "kernel_task_completed",
    ].includes(reason)
  )
    return { kind: "unchanged" as const };
  const projection = readKernelOperationalProjection(task.extensions);
  if (task.execution_route?.repository_mode !== "branch_pr") return { kind: "unchanged" as const };
  let recovered: Awaited<ReturnType<typeof recoverableInspection>>;
  let repository: KernelRepositoryEvidence;
  try {
    if (
      record.aggregate.state === "COMPLETED" &&
      (await hasAuthenticatedCompletedNativeReview(command, task))
    )
      return { kind: "unchanged" as const };
    if (projection && kernelProjectedReviewMatches(task, projection))
      return { kind: "unchanged" as const };
    const candidates = await listKernelRepositoryEvidence(command, record);
    const candidate = candidates.at(-1);
    if (!candidate) {
      await requireKernelReportOnlyCompletion(command, record, recoverableInspection);
      return { kind: "report_only" as const };
    }
    repository = candidate;
    const target = await resolveQualityReviewTargetSha({
      gitRoot: command.resolvedProject.gitRoot,
      workflowDir: command.config.paths.workflow_dir,
      taskId: task.id,
      previousEvaluatedSha: repository.implementation_commit,
      workflowMode: "branch_pr",
    });
    const status = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
    const prefix = `${command.config.paths.workflow_dir}/${task.id}/`;
    if (target !== repository.implementation_commit || repository.evaluator_target !== target)
      throw new Error("The current implementation differs from the retained evaluated commit");
    if (!status || status.lines.some((line) => !kernelTaskMetadataStatusOnly(line, prefix)))
      throw new Error("The worktree contains changes outside the task evidence");
    recovered = await recoverableInspection(command, record, repository);
  } catch (error) {
    return {
      kind: "stop" as const,
      action: recoveryBoundary(task, error instanceof Error ? error.message : String(error)),
    };
  }
  const findings =
    recovered.review.findings.length > 0 ? recovered.review.findings : [recovered.review.summary];
  try {
    await writeKernelArtifact(recovered.directory, "quality-report.json", {
      schema_version: 1,
      kind: "canonical_quality_review",
      task_id: task.id,
      work_order_id: recovered.review.work_order_id,
      verdict: "pass",
      findings,
      residual_risks: recovered.review.review!.residual_risks,
      review_identity_digest: k.kernelDigest(recovered.review),
      repository_evidence_digest: repository.digest,
    });
  } catch (error) {
    return {
      kind: "stop" as const,
      action: recoveryBoundary(task, error instanceof Error ? error.message : String(error)),
    };
  }
  await projectKernelOperationalEvidence({
    command,
    task_id: task.id,
    repository_evidence: repository,
    verification_evidence_digest: k.kernelDigest(recovered.evidence),
    review_identity_digest: k.kernelDigest(recovered.review),
    evidence_refs: [
      path
        .relative(
          command.resolvedProject.gitRoot,
          path.join(recovered.directory, "quality-report.json"),
        )
        .replaceAll(path.sep, "/"),
    ],
    findings,
    projected_at: recovered.projectedAt,
  });
  return { kind: "restored" as const };
}
