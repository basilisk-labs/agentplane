import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentSemanticResult,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import {
  decideIndependentReviewApplication,
  taskKernel as k,
  type KernelEpisodeBinding,
} from "@agentplaneorg/core/tasks";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import { buildKernelStateFingerprint } from "./kernel-work-order.js";
import {
  issueKernelExchange,
  writeKernelArtifact,
  kernelExchangeDirectory,
} from "./kernel-exchange.js";
import {
  directTaskVerificationInputIdentity,
  runDirectTaskVerification,
  type DirectTaskVerificationInputIdentity,
  type DirectTaskVerificationResult,
} from "./direct-task-verification.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import {
  isInfrastructureVerification,
  prepareInfrastructureVerificationForCheckout,
} from "./verification-infrastructure.js";
import {
  readKernelRepositoryEvidence,
  type KernelRepositoryEvidence,
} from "./kernel-repository-coordinator.js";
import { projectKernelOperationalEvidence } from "./kernel-operational-projection.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;
export type KernelValidationEvidence = {
  task_id: string;
  work_item_id: string;
  attempt: number;
  contract_digest: string;
  repository_fingerprint: string;
  result_digest: string;
  review_digest: string | null;
  native_evidence_digest: k.Sha256Digest;
  status: k.ValidationRecord["status"];
  checks: DirectTaskVerificationResult;
  repository_evidence: KernelRepositoryEvidence | null;
};

type KernelNativeValidationInput = Readonly<{
  schema_version: 1;
  kind: "kernel_native_validation_input";
  task_id: string;
  work_item_id: string;
  result_digest: string;
  repository_fingerprint: string;
  repository_evidence_digest: string | null;
  verification: DirectTaskVerificationInputIdentity;
}>;

type KernelNativeValidationEvidence = Readonly<{
  schema_version: 1;
  kind: "kernel_native_validation";
  input_digest: k.Sha256Digest;
  input: KernelNativeValidationInput;
  checks: DirectTaskVerificationResult;
  repository_evidence: KernelRepositoryEvidence | null;
}>;

type InspectionBinding = Extract<KernelEpisodeBinding, { phase: "inspection" }>;

type ResolvedRepositoryEvidence = Readonly<{
  directory: string;
  evidence: KernelRepositoryEvidence;
}>;

export function kernelCheckReviewDisposition(
  checks: DirectTaskVerificationResult,
): "review" | "rework" | "blocked" | "retry" {
  if (isInfrastructureVerification(checks)) return "retry";
  if (checks.status === "passed") return "review";
  return checks.status === "failed" ? "rework" : "blocked";
}

async function resolveInspectionRepositoryEvidence(
  command: CommandContext,
  record: KernelRecord,
  workItemId: string,
  resultDirectory: string,
): Promise<ResolvedRepositoryEvidence | null> {
  const head = await readDirectTaskHead(command.resolvedProject.gitRoot);
  const currentOrderId = `sha256:${path.basename(resultDirectory)}`;
  let current: KernelRepositoryEvidence | null = null;
  try {
    current = await readKernelRepositoryEvidence(resultDirectory);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (current) {
    if (
      current.task_id !== record.aggregate.id ||
      current.work_item_id !== workItemId ||
      current.work_order_id !== currentOrderId ||
      path.resolve(current.checkout) !== path.resolve(command.resolvedProject.gitRoot) ||
      current.evaluator_target !== current.implementation_commit ||
      head !== current.implementation_commit
    ) {
      throw new Error("Canonical evaluator target differs from repository evidence");
    }
    return { directory: resultDirectory, evidence: current };
  }

  for (const mutationId of Object.keys(record.aggregate.mutation_receipts)
    .filter((id) => /^result:sha256:[a-f0-9]{64}$/u.test(id))
    .toReversed()) {
    const directory = await kernelExchangeDirectory(
      command,
      record.aggregate.id,
      mutationId.slice("result:".length),
    );
    if (directory === resultDirectory) continue;
    let candidate: KernelRepositoryEvidence;
    try {
      candidate = await readKernelRepositoryEvidence(directory);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    if (candidate.task_id !== record.aggregate.id || candidate.work_item_id !== workItemId)
      continue;
    if (
      candidate.work_order_id !== `sha256:${path.basename(directory)}` ||
      candidate.task_revision > record.aggregate.revision ||
      path.resolve(candidate.checkout) !== path.resolve(command.resolvedProject.gitRoot) ||
      candidate.evaluator_target !== candidate.implementation_commit
    ) {
      throw new Error("Canonical evaluator target differs from retained repository evidence");
    }
    if (candidate.implementation_commit === head) {
      return { directory, evidence: candidate };
    }
  }
  return null;
}

function nativeValidationInput(opts: {
  command: CommandContext;
  binding: InspectionBinding;
  commands: readonly string[];
  repositoryEvidence: KernelRepositoryEvidence | null;
}): { input: KernelNativeValidationInput; digest: k.Sha256Digest; path: string } {
  const input: KernelNativeValidationInput = {
    schema_version: 1,
    kind: "kernel_native_validation_input",
    task_id: opts.binding.task_id,
    work_item_id: opts.binding.work_item_id,
    result_digest: opts.binding.result_digest,
    repository_fingerprint: opts.binding.repository_fingerprint,
    repository_evidence_digest: opts.repositoryEvidence?.digest ?? null,
    verification: directTaskVerificationInputIdentity({
      cwd: opts.command.resolvedProject.gitRoot,
      commands: opts.commands,
    }),
  };
  const digest = k.kernelDigest(input);
  return {
    input,
    digest,
    path: `native-validation-${digest.slice(7)}.json`,
  };
}

async function readNativeValidation(
  directory: string,
  name: string,
): Promise<KernelNativeValidationEvidence | null> {
  try {
    return JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, name),
        "canonical native validation",
      ),
    ) as KernelNativeValidationEvidence;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function requireNativeValidationEvidence(opts: {
  evidence: KernelNativeValidationEvidence;
  input: KernelNativeValidationInput;
  digest: k.Sha256Digest;
}) {
  if (
    opts.evidence.schema_version !== 1 ||
    opts.evidence.kind !== "kernel_native_validation" ||
    opts.evidence.input_digest !== opts.digest ||
    k.kernelDigest(opts.evidence.input) !== opts.digest ||
    k.kernelDigest(opts.evidence.input) !== k.kernelDigest(opts.input) ||
    opts.evidence.repository_evidence?.digest !==
      (opts.input.repository_evidence_digest ?? undefined)
  ) {
    throw new Error("Canonical native validation input identity mismatch");
  }
  return opts.evidence;
}

async function runKernelNativeValidation(opts: {
  command: CommandContext;
  runtime: Runtime;
  binding: InspectionBinding;
  commands: readonly string[];
  directory: string;
  repositoryEvidence: KernelRepositoryEvidence | null;
}): Promise<
  | { kind: "observed"; evidence: KernelNativeValidationEvidence; path: string }
  | { kind: "retry"; reason: string | null }
> {
  const identity = nativeValidationInput(opts);
  const retained = await readNativeValidation(opts.directory, identity.path);
  if (retained) {
    return {
      kind: "observed",
      evidence: requireNativeValidationEvidence({
        evidence: retained,
        input: identity.input,
        digest: identity.digest,
      }),
      path: path.join(opts.directory, identity.path),
    };
  }
  const implementationCommit =
    opts.repositoryEvidence?.implementation_commit ??
    (await readDirectTaskHead(opts.command.resolvedProject.gitRoot));
  if (!implementationCommit)
    throw new Error("Canonical native validation requires an implementation commit");
  const retainInfrastructure = await prepareInfrastructureVerificationForCheckout({
    command: opts.command,
    task_id: opts.binding.task_id,
    implementation_commit: implementationCommit,
    verification_scope: opts.binding.work_item_id,
    identity: identity.input,
    checkout: opts.command.resolvedProject.gitRoot,
  });
  const checks = await runDirectTaskVerification({
    command: opts.command,
    task: { verify: [] },
    task_id: opts.binding.task_id,
    cwd: opts.command.resolvedProject.gitRoot,
    additional_only: true,
    additional_commands: opts.commands.map((check) => ({ command: check })),
    allow_empty: true,
  });
  if (kernelCheckReviewDisposition(checks) === "retry") {
    await retainInfrastructure({
      status: checks.status,
      checks: checks.checks,
      reason: checks.reason,
    });
    return { kind: "retry", reason: checks.reason };
  }
  const observed = await opts.runtime.observe();
  if (observed.fingerprint !== opts.binding.repository_fingerprint)
    throw new Error("Canonical repository changed during native validation");
  if (
    opts.repositoryEvidence &&
    (await readDirectTaskHead(opts.command.resolvedProject.gitRoot)) !==
      opts.repositoryEvidence.implementation_commit
  )
    throw new Error("Canonical evaluator target changed during native validation");
  const evidence: KernelNativeValidationEvidence = {
    schema_version: 1,
    kind: "kernel_native_validation",
    input_digest: identity.digest,
    input: identity.input,
    checks,
    repository_evidence: opts.repositoryEvidence,
  };
  await writeKernelArtifact(opts.directory, identity.path, evidence);
  return { kind: "observed", evidence, path: path.join(opts.directory, identity.path) };
}

function validationRecord(opts: {
  binding: InspectionBinding;
  contractCommands: readonly string[];
  native: KernelNativeValidationEvidence;
  reviewDigest: k.Sha256Digest | null;
  status: k.ValidationRecord["status"];
  observedAt: string;
}): k.ValidationRecord {
  return {
    status: opts.status,
    identity: {
      implementation_identity: opts.binding.result_digest as k.Sha256Digest,
      check_id:
        opts.reviewDigest === null
          ? "canonical-native-checks"
          : "canonical-contract-and-inspection",
      command_digest: k.kernelDigest(opts.contractCommands),
      toolchain_digest: k.kernelDigest(
        opts.native.input.verification.runtimes.map((runtime) => runtime.toolchain_digest),
      ),
      environment_digest: k.kernelDigest({
        repository: opts.binding.repository_fingerprint,
        verification: opts.native.input.verification,
      }),
    },
    evidence_digests: [
      k.kernelDigest(opts.native),
      ...(opts.reviewDigest === null ? [] : [opts.reviewDigest]),
    ],
    observed_at: opts.observedAt,
  };
}

async function recordKernelValidation(opts: {
  runtime: Runtime;
  directory: string;
  binding: InspectionBinding;
  evidence: KernelValidationEvidence;
  validation: k.ValidationRecord;
  mutationId: string;
}) {
  await writeKernelArtifact(opts.directory, "validation.json", opts.evidence);
  const inputPath = path.join(opts.directory, "validation-command.json");
  let input: KernelCommandInput;
  try {
    input = JSON.parse(
      await readStableRegularTextNoFollow(inputPath, "canonical validation command"),
    ) as KernelCommandInput;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    input = await opts.runtime.input(
      {
        kind: "record_work_item_validation",
        work_item_id: opts.binding.work_item_id,
        validation: opts.validation,
      },
      opts.mutationId,
    );
    await writeKernelArtifact(opts.directory, "validation-command.json", input);
  }
  requireKernelCommit(await opts.runtime.lifecycle.apply(input));
}

async function resolveRecordedNativeValidation(
  runtime: Runtime,
  binding: InspectionBinding,
  validation: k.ValidationRecord,
) {
  if (validation.status === "BLOCKED")
    return { kind: "human_required" as const, reason: "canonical_validation_infrastructure" };
  requireKernelCommit(
    await runtime.lifecycle.apply(
      await runtime.input(
        {
          kind: "transition_work_item",
          action: validation.status === "PASSED" ? "complete" : "rework",
          work_item_id: binding.work_item_id,
          claim_id: binding.claim_id,
        },
        `validation-resolution:${k.kernelDigest(validation)}`,
      ),
    ),
  );
  return null;
}

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
