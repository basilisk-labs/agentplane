import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentSemanticResult,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { decideIndependentReviewApplication, taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { buildKernelStateFingerprint } from "./kernel-work-order.js";
import {
  issueKernelExchange,
  writeKernelArtifact,
  kernelExchangeDirectory,
} from "./kernel-exchange.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import { readKernelRepositoryEvidence } from "./kernel-repository-coordinator.js";
import { projectKernelOperationalEvidence } from "./kernel-operational-projection.js";
import {
  kernelCheckReviewDisposition,
  nativeValidationInput,
  recordKernelValidation,
  requireNativeValidationEvidence,
  resolveInspectionRepositoryEvidence,
  resolveRecordedNativeValidation,
  runKernelNativeValidation,
  validationRecord,
  type InspectionBinding,
  type KernelNativeValidationEvidence,
  type KernelValidationEvidence,
} from "./kernel-inspection-validation.js";

export {
  kernelCheckReviewDisposition,
  type KernelValidationEvidence,
} from "./kernel-inspection-validation.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

export async function issueKernelInspection(
  command: CommandContext,
  runtime: Runtime,
  record: KernelRecord,
  workItemId: string,
) {
  const item = record.aggregate.work_items[workItemId];
  const plan = record.aggregate.current_plan;
  const contract = record.documents?.contracts[String(item?.definition.contract_digest ?? "")];
  if (
    !item?.claim_id ||
    !item.result_digest ||
    !contract ||
    plan?.state !== "APPROVED" ||
    item.state !== "INSPECTING"
  )
    throw new Error("Canonical inspection requires a bound received result");
  const { authority, context } = await runtime.authority.resolve(record.aggregate.id, workItemId);
  const binding: InspectionBinding = {
    phase: "inspection",
    task_id: record.aggregate.id,
    repository_identity: context.repository_identity,
    repository_fingerprint: context.repository_fingerprint,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    work_item_id: workItemId,
    attempt: item.attempt,
    claim_id: item.claim_id,
    contract_digest: item.definition.contract_digest!,
    authority_digest: authority.digest,
    result_digest: item.result_digest,
  };
  let resultPath: string | undefined;
  let resultDirectory: string | undefined;
  for (const mutationId of Object.keys(record.aggregate.mutation_receipts)
    .filter((id) => /^result:sha256:[a-f0-9]{64}$/u.test(id))
    .toReversed()) {
    const directory = await kernelExchangeDirectory(
      command,
      record.aggregate.id,
      mutationId.slice("result:".length),
    );
    const candidate = path.join(directory, "received-result.json");
    const semantic: unknown = JSON.parse(
      await readStableRegularTextNoFollow(candidate, "canonical received result"),
    );
    if (k.kernelDigest(semantic) === item.result_digest) {
      resultPath = candidate;
      resultDirectory = directory;
      break;
    }
  }
  if (!resultPath) throw new Error("Canonical received implementation evidence missing");
  const resolvedRepositoryEvidence = await resolveInspectionRepositoryEvidence(
    command,
    record,
    workItemId,
    resultDirectory!,
  );
  const repositoryEvidence = resolvedRepositoryEvidence?.evidence ?? null;
  const native = await runKernelNativeValidation({
    command,
    runtime,
    binding,
    commands: contract.verification_commands,
    directory: resultDirectory!,
    repositoryEvidence,
  });
  if (native.kind === "retry") {
    return {
      schema_version: 1,
      task_id: binding.task_id,
      action: {
        kind: "external_wait" as const,
        reason: "canonical_validation_infrastructure_retry",
        summary: native.reason,
      },
    };
  }
  const nativeDisposition = kernelCheckReviewDisposition(native.evidence.checks);
  if (nativeDisposition !== "review") {
    const status = nativeDisposition === "rework" ? "FAILED" : "BLOCKED";
    const validation = validationRecord({
      binding,
      contractCommands: contract.verification_commands,
      native: native.evidence,
      reviewDigest: null,
      status,
      observedAt: context.occurred_at,
    });
    const evidence: KernelValidationEvidence = {
      task_id: binding.task_id,
      work_item_id: binding.work_item_id,
      attempt: binding.attempt,
      contract_digest: binding.contract_digest,
      repository_fingerprint: binding.repository_fingerprint,
      result_digest: binding.result_digest,
      review_digest: null,
      native_evidence_digest: k.kernelDigest(native.evidence),
      status,
      checks: native.evidence.checks,
      repository_evidence: repositoryEvidence,
    };
    await recordKernelValidation({
      runtime,
      directory: resultDirectory!,
      binding,
      evidence,
      validation,
      mutationId: `validation:sha256:${path.basename(resultDirectory!)}`,
    });
    const stop = await resolveRecordedNativeValidation(runtime, binding, validation);
    if (stop)
      return {
        schema_version: 1,
        task_id: binding.task_id,
        action: { ...stop, summary: native.evidence.checks.reason },
      };
    return null;
  }
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse({
    schema_version: 2,
    kind: "agent_work_order",
    work_order_id: k.kernelDigest({ binding, revision: record.aggregate.revision }),
    role: "EVALUATOR",
    task: {
      id: record.aggregate.id,
      revision: record.aggregate.revision,
      work_item_id: workItemId,
      objective: `Independently inspect the implementation: ${contract.objective}`,
      acceptance_criteria: contract.acceptance_criteria.map((description, index) => ({
        id: `criterion-${index + 1}`,
        description,
        required: true,
      })),
      unresolved_questions: [],
    },
    canonical_binding: binding,
    state_fingerprint: await buildKernelStateFingerprint({
      command,
      record,
      context,
      authority_digest: authority.digest,
    }),
    state_fingerprint_policy: {
      fingerprint_schema_version: 2,
      required_components: [
        "task",
        "git",
        "backend_projection",
        "plan",
        "policy",
        "capability",
        "authority",
      ],
      provider: { required: false, unavailable: "allow_if_unchanged" },
    },
    authority: {
      mutation_scope: "none",
      writable_roots: [],
      protected_paths: ["."],
      allowed_tool_classes: ["repository_read", "git_read", "report_result", "report_blocker"],
      network: "deny",
      external_side_effects: [],
      sandbox: "read-only",
      expires_at: authority.expires_at,
    },
    context_intent: {
      purpose:
        "Inspect source and output evidence against the approved contract. Return a review verdict. Do not modify implementation or claim native verification. The controller executes the approved checks independently.",
      required_knowledge_ref_digests: [],
      require_prepared_evidence: false,
    },
    knowledge_refs: [],
    prepared_evidence: [],
    required_inputs: [
      {
        id: "implementation-result",
        kind: "source_artifact",
        path: resultPath,
        digest: item.result_digest,
        description:
          "Native-accepted implementation result and evidence references. Digest uses canonical JSON.",
        required: true,
      },
      ...(repositoryEvidence
        ? [
            {
              id: "repository-evidence",
              kind: "source_artifact" as const,
              path: path.join(resolvedRepositoryEvidence!.directory, "repository-evidence.json"),
              digest: repositoryEvidence.digest,
              description:
                "AgentPlane-owned commit, tree, changed-path, and evaluator-target evidence.",
              required: true,
            },
          ]
        : []),
      {
        id: "native-validation",
        kind: "source_artifact" as const,
        path: native.path,
        digest: k.kernelDigest(native.evidence),
        description:
          "AgentPlane-observed native checks bound to the implementation, command, toolchain, and environment inputs.",
        required: true,
      },
      ...item.output_manifests.map((manifest) => ({
        id: manifest.id,
        kind: "source_artifact",
        description: manifest.kind,
        digest: manifest.digest,
        required: true,
      })),
    ],
    required_outputs: [
      {
        id: "review",
        kind: "semantic_result",
        description:
          "Return AgentSemanticResult v2 with the exact canonical_binding and review. Use pass, rework, blocked or human_review. Include findings and residual risks.",
        required: true,
      },
    ],
    verification_intent: {
      requirements: contract.verification_commands.map((check, index) => ({
        id: `check-${index + 1}`,
        description: check,
        required: true,
        observed_by: "agentplane",
      })),
      require_execution_receipt: true,
    },
    semantic_result_schema: "agentplane.agent_semantic_result.v2",
    stop_rules: [
      "Perform only independent inspection.",
      "Do not invoke lifecycle commands or modify repository files.",
      "Return the exact canonical_binding and a review verdict.",
    ],
  });
  return issueKernelExchange(
    command,
    order,
    context.actor.transport === "managed" ? "managed" : "host",
  );
}

/** Reviewer claims never become observed check results. Only this native runner records validation. */
export async function acceptKernelInspection(
  command: CommandContext,
  runtime: Runtime,
  directory: string,
  semantic: AgentSemanticResult,
  workOrder?: AgentWorkOrderV2,
) {
  const binding = semantic.canonical_binding;
  if (binding?.phase !== "inspection" || !semantic.review)
    throw new Error("Canonical inspection review required");
  const read = await runtime.adapter.read(binding.task_id);
  if (read.kind !== "canonical") throw new Error("Canonical Task unavailable");
  const item = read.record.aggregate.work_items[binding.work_item_id];
  const context = await runtime.native.readContext(binding.task_id);
  const plan = read.record.aggregate.current_plan;
  if (
    item?.result_digest !== binding.result_digest ||
    item.attempt !== binding.attempt ||
    item.claim_id !== binding.claim_id ||
    item.definition.contract_digest !== binding.contract_digest ||
    plan?.digest !== binding.plan_digest ||
    plan.revision !== binding.plan_revision ||
    context.repository_fingerprint !== binding.repository_fingerprint ||
    !["INSPECTING", "VALIDATING", "COMPLETED", "REWORK_READY"].includes(item.state)
  )
    throw new Error("Canonical inspection result is stale");
  const resolved = await runtime.authority.resolve(binding.task_id, binding.work_item_id);
  if (resolved.authority.digest !== binding.authority_digest)
    throw new Error("Canonical inspection authority changed");
  await writeKernelArtifact(directory, "inspection-result.json", semantic);
  if (item.state === "COMPLETED" || item.state === "REWORK_READY") return;
  const reviewDecision = decideIndependentReviewApplication({
    verdict: semantic.review.verdict,
    provenance_accepted: true,
    evidence_current: true,
  });
  if (reviewDecision.action === "attention")
    return {
      kind: "human_required",
      reason: "canonical_inspection_requires_attention",
      summary: semantic.summary,
    };
  if (reviewDecision.action === "reject")
    throw new Error(`Canonical inspection rejected: ${reviewDecision.reason_code}`);
  const contract = read.record.documents!.contracts[String(binding.contract_digest)]!;
  const repositoryEvidenceInput = workOrder?.required_inputs.find(
    (input) => input.id === "repository-evidence",
  );
  const repositoryEvidence = repositoryEvidenceInput?.path
    ? await readKernelRepositoryEvidence(path.dirname(repositoryEvidenceInput.path))
    : null;
  if (
    repositoryEvidence &&
    (repositoryEvidence.digest !== repositoryEvidenceInput?.digest ||
      repositoryEvidence.evaluator_target !== repositoryEvidence.implementation_commit ||
      (await readDirectTaskHead(command.resolvedProject.gitRoot)) !==
        repositoryEvidence.implementation_commit)
  ) {
    throw new Error("Canonical inspection commit identity changed");
  }
  const nativeEvidenceInput = workOrder?.required_inputs.find(
    (input) => input.id === "native-validation",
  );
  if (!nativeEvidenceInput?.path)
    throw new Error("Canonical inspection requires native validation evidence");
  const expectedNative = nativeValidationInput({
    command,
    binding,
    commands: contract.verification_commands,
    repositoryEvidence,
  });
  const nativeEvidence = requireNativeValidationEvidence({
    evidence: JSON.parse(
      await readStableRegularTextNoFollow(
        nativeEvidenceInput.path,
        "canonical native validation evidence",
      ),
    ) as KernelNativeValidationEvidence,
    input: expectedNative.input,
    digest: expectedNative.digest,
  });
  if (
    nativeEvidenceInput.digest !== k.kernelDigest(nativeEvidence) ||
    nativeEvidence.checks.status !== "passed"
  )
    throw new Error("Canonical inspection native validation is not reusable");
  const observed = await runtime.observe();
  if (observed.fingerprint !== binding.repository_fingerprint)
    throw new Error("Canonical repository changed after native validation");
  const evidencePath = path.join(directory, "validation.json");
  let evidence: KernelValidationEvidence;
  try {
    evidence = JSON.parse(
      await readStableRegularTextNoFollow(evidencePath, "canonical validation"),
    ) as KernelValidationEvidence;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const status = reviewDecision.action === "complete" ? "PASSED" : "FAILED";
    evidence = {
      task_id: binding.task_id,
      work_item_id: binding.work_item_id,
      attempt: binding.attempt,
      contract_digest: binding.contract_digest,
      repository_fingerprint: binding.repository_fingerprint,
      result_digest: binding.result_digest,
      review_digest: k.kernelDigest(semantic),
      native_evidence_digest: k.kernelDigest(nativeEvidence),
      status,
      checks: nativeEvidence.checks,
      repository_evidence: repositoryEvidence,
    };
    if (
      repositoryEvidence &&
      (await readDirectTaskHead(command.resolvedProject.gitRoot)) !==
        repositoryEvidence.implementation_commit
    )
      throw new Error("Canonical evaluator target changed during validation");
    await writeKernelArtifact(directory, "validation.json", evidence);
  }
  if (
    evidence.task_id !== binding.task_id ||
    evidence.work_item_id !== binding.work_item_id ||
    evidence.attempt !== binding.attempt ||
    evidence.contract_digest !== binding.contract_digest ||
    evidence.repository_fingerprint !== binding.repository_fingerprint ||
    evidence.result_digest !== binding.result_digest ||
    evidence.review_digest !== k.kernelDigest(semantic) ||
    evidence.native_evidence_digest !== k.kernelDigest(nativeEvidence)
  )
    throw new Error("Canonical validation evidence binding mismatch");
  const validation = validationRecord({
    binding,
    contractCommands: contract.verification_commands,
    native: nativeEvidence,
    reviewDigest: k.kernelDigest(semantic),
    status: evidence.status,
    observedAt: context.occurred_at,
  });
  await recordKernelValidation({
    runtime,
    directory,
    binding,
    evidence,
    validation,
    mutationId: `validation:${semantic.work_order_id}`,
  });
  await resolveRecordedNativeValidation(runtime, binding, validation);
  if (validation.status === "PASSED" && repositoryEvidence) {
    const reportPath = path.join(directory, "quality-report.json");
    const findings = semantic.findings.length > 0 ? semantic.findings : [semantic.summary];
    await writeKernelArtifact(directory, "quality-report.json", {
      schema_version: 1,
      kind: "canonical_quality_review",
      task_id: binding.task_id,
      work_order_id: semantic.work_order_id,
      verdict: semantic.review.verdict,
      findings,
      residual_risks: semantic.review.residual_risks,
      review_identity_digest: k.kernelDigest(semantic),
      repository_evidence_digest: repositoryEvidence.digest,
    });
    await projectKernelOperationalEvidence({
      command,
      task_id: binding.task_id,
      repository_evidence: repositoryEvidence,
      verification_evidence_digest: k.kernelDigest(evidence),
      review_identity_digest: k.kernelDigest(semantic),
      evidence_refs: [
        path.relative(command.resolvedProject.gitRoot, reportPath).replaceAll(path.sep, "/"),
      ],
      findings,
      projected_at: validation.observed_at,
    });
  }
}

export async function resumeKernelInspection(
  command: CommandContext,
  runtime: Runtime,
  record: KernelRecord,
  workItemId: string,
) {
  const item = record.aggregate.work_items[workItemId];
  if (item?.validation?.identity.check_id === "canonical-native-checks") {
    if (!item.claim_id || !item.result_digest)
      throw new Error("Canonical native validation lost its WorkItem binding");
    const plan = record.aggregate.current_plan;
    const context = await runtime.native.readContext(record.aggregate.id);
    const authority = await runtime.authority.resolve(record.aggregate.id, workItemId);
    if (!plan || !item.definition.contract_digest)
      throw new Error("Canonical native validation lost its Plan binding");
    return resolveRecordedNativeValidation(
      runtime,
      {
        phase: "inspection",
        task_id: record.aggregate.id,
        repository_identity: context.repository_identity,
        repository_fingerprint: context.repository_fingerprint,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        work_item_id: workItemId,
        attempt: item.attempt,
        claim_id: item.claim_id,
        contract_digest: item.definition.contract_digest,
        authority_digest: authority.authority.digest,
        result_digest: item.result_digest,
      },
      item.validation,
    );
  }
  if (item?.validation?.identity.check_id !== "canonical-contract-and-inspection")
    return { kind: "human_required", reason: "canonical_native_validation_evidence_required" };
  for (const mutationId of Object.keys(record.aggregate.mutation_receipts)
    .filter((id) => /^validation:sha256:[a-f0-9]{64}$/u.test(id))
    .toReversed()) {
    const directory = await kernelExchangeDirectory(
      command,
      record.aggregate.id,
      mutationId.slice("validation:".length),
    );
    const [semantic, workOrder] = await Promise.all([
      readStableRegularTextNoFollow(
        path.join(directory, "inspection-result.json"),
        "canonical saved inspection",
      ).then((raw) => AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(JSON.parse(raw))),
      readStableRegularTextNoFollow(
        path.join(directory, "work-order.json"),
        "canonical saved inspection work order",
      ).then((raw) => AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(JSON.parse(raw))),
    ]);
    if (
      semantic.canonical_binding?.phase === "inspection" &&
      semantic.canonical_binding.work_item_id === workItemId &&
      item.validation.evidence_digests.includes(k.kernelDigest(semantic))
    )
      return acceptKernelInspection(command, runtime, directory, semantic, workOrder);
  }
  throw new Error("Canonical native validation evidence is missing");
}
