import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentSemanticResult,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k, type KernelEpisodeBinding } from "@agentplaneorg/core/tasks";
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
import { runDirectTaskVerification } from "./direct-task-verification.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;
export type KernelValidationEvidence = {
  repository_fingerprint: string;
  result_digest: string;
  review_digest: string;
  checks: Awaited<ReturnType<typeof runDirectTaskVerification>>;
};

type InspectionBinding = Extract<KernelEpisodeBinding, { phase: "inspection" }>;

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
      break;
    }
  }
  if (!resultPath) throw new Error("Canonical received implementation evidence missing");
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
    state_fingerprint: buildKernelStateFingerprint({
      command,
      record,
      context,
      authority_digest: authority.digest,
    }),
    state_fingerprint_policy: {
      required_components: ["task", "git", "backend_projection", "policy", "authority"],
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
  if (semantic.review.verdict === "blocked" || semantic.review.verdict === "human_review")
    return {
      kind: "human_required",
      reason: "canonical_inspection_requires_attention",
      summary: semantic.summary,
    };
  const contract = read.record.documents!.contracts[String(binding.contract_digest)]!;
  const evidencePath = path.join(directory, "validation.json");
  let evidence: KernelValidationEvidence;
  try {
    evidence = JSON.parse(
      await readStableRegularTextNoFollow(evidencePath, "canonical validation"),
    ) as KernelValidationEvidence;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    const checks =
      semantic.review.verdict === "pass"
        ? await runDirectTaskVerification({
            command,
            task: { verify: [] },
            task_id: binding.task_id,
            cwd: command.resolvedProject.gitRoot,
            additional_only: true,
            additional_commands: contract.verification_commands.map((check) => ({
              command: check,
            })),
            allow_empty: true,
          })
        : {
            status: "failed" as const,
            artifact_path: "",
            checks: [],
            reason: "Independent inspection requires rework",
          };
    evidence = {
      repository_fingerprint: binding.repository_fingerprint,
      result_digest: binding.result_digest,
      review_digest: k.kernelDigest(semantic),
      checks,
    };
    const observed = await runtime.observe();
    if (observed.fingerprint !== binding.repository_fingerprint)
      throw new Error("Canonical repository changed during validation");
    await writeKernelArtifact(directory, "validation.json", evidence);
  }
  if (
    evidence.repository_fingerprint !== binding.repository_fingerprint ||
    evidence.result_digest !== binding.result_digest ||
    evidence.review_digest !== k.kernelDigest(semantic)
  )
    throw new Error("Canonical validation evidence binding mismatch");
  const validation: k.ValidationRecord = {
    status:
      evidence.checks.status === "passed"
        ? "PASSED"
        : evidence.checks.status === "unsupported"
          ? "BLOCKED"
          : "FAILED",
    identity: {
      implementation_identity: binding.result_digest,
      check_id: "canonical-contract-and-inspection",
      command_digest: k.kernelDigest(contract.verification_commands),
      toolchain_digest: k.kernelDigest(
        evidence.checks.checks.map((check) => check.runtime ?? null),
      ),
      environment_digest: k.kernelDigest({
        repository: binding.repository_fingerprint,
        platform: process.platform,
        arch: process.arch,
        node: process.version,
      }),
    },
    evidence_digests: [k.kernelDigest(evidence), k.kernelDigest(semantic)],
    observed_at: context.occurred_at,
  };
  // Save the native command input before CAS. A restart replays the same observation timestamp.
  const inputPath = path.join(directory, "validation-command.json");
  let input: KernelCommandInput;
  try {
    input = JSON.parse(
      await readStableRegularTextNoFollow(inputPath, "canonical validation command"),
    ) as KernelCommandInput;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    input = await runtime.input(
      { kind: "record_work_item_validation", work_item_id: binding.work_item_id, validation },
      `validation:${semantic.work_order_id}`,
    );
    await writeKernelArtifact(directory, "validation-command.json", input);
  }
  requireKernelCommit(await runtime.lifecycle.apply(input));
  if (validation.status === "BLOCKED")
    return {
      kind: "human_required",
      reason: "canonical_validation_infrastructure",
      summary: evidence.checks.reason,
    };
  requireKernelCommit(
    await runtime.lifecycle.apply(
      await runtime.input(
        {
          kind: "transition_work_item",
          action: validation.status === "PASSED" ? "complete" : "rework",
          work_item_id: binding.work_item_id,
          claim_id: binding.claim_id,
        },
        `validation-resolution:${semantic.work_order_id}`,
      ),
    ),
  );
}

export async function resumeKernelInspection(
  command: CommandContext,
  runtime: Runtime,
  record: KernelRecord,
  workItemId: string,
) {
  const item = record.aggregate.work_items[workItemId];
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
    const semantic = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
      JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "inspection-result.json"),
          "canonical saved inspection",
        ),
      ),
    );
    if (
      semantic.canonical_binding?.phase === "inspection" &&
      semantic.canonical_binding.work_item_id === workItemId &&
      item.validation.evidence_digests.includes(k.kernelDigest(semantic))
    )
      return acceptKernelInspection(command, runtime, directory, semantic);
  }
  throw new Error("Canonical native validation evidence is missing");
}
