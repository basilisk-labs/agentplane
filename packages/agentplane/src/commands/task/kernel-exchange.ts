import { isRecord } from "../../shared/guards.js";
import { kernelRecoveryInputs } from "./kernel-recovery-evidence.js";
import {
  putEvaluatorEvidenceObject,
  readEvaluatorEvidenceObject,
} from "../evaluator/evaluator-evidence-store.js";
import {
  buildWorkOrderContextManifest,
  WORK_ORDER_CONTEXT_FILENAME,
  workOrderContextManifestDigest,
} from "../../runner/context/work-order-context.js";
import type { KernelValidationEvidence } from "./kernel-inspection.js";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  renderAgentSemanticResultSchemaJson,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../../shared/stable-file.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { captureKernelRepositoryBaseline } from "./kernel-repository-coordinator.js";
import { admitSemanticResult } from "../shared/semantic-result-admission.js";

/** Immutable native exchange artifacts are evidence, not a second Task aggregate. */
export async function kernelExchangeDirectory(
  ctx: CommandContext,
  taskId: string,
  orderId: string,
) {
  if (!/^[A-Za-z0-9_-]+$/u.test(taskId) || !/^sha256:[a-f0-9]{64}$/u.test(orderId))
    throw new Error("Invalid canonical exchange identity");
  return path.join(
    await resolveCommandGitCommonDir(ctx),
    "agentplane",
    "kernel",
    "exchanges",
    taskId,
    orderId.slice(7),
  );
}

export async function writeKernelArtifact(directory: string, name: string, value: unknown) {
  if (!/^[a-z0-9-]+\.json$/u.test(name)) throw new Error("Invalid canonical artifact name");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const target = path.join(directory, name);
  try {
    await writeNewStableRegularFileNoFollow(
      target,
      `${JSON.stringify(value, null, 2)}\n`,
      "canonical artifact",
    );
    return true;
  } catch (error) {
    const stored: unknown = JSON.parse(
      await readStableRegularTextNoFollow(target, "canonical artifact"),
    );
    if (k.kernelDigest(stored) !== k.kernelDigest(value)) throw error;
    return false;
  }
}

export async function readKernelOrderResult(
  ctx: CommandContext,
  taskId: string,
  resultPath: string,
) {
  const raw: unknown = JSON.parse(
    await readStableRegularTextNoFollow(resultPath, "canonical semantic result", {
      max_bytes: 4 * 1024 * 1024,
    }),
  );
  if (
    !raw ||
    typeof raw !== "object" ||
    Array.isArray(raw) ||
    !("work_order_id" in raw) ||
    typeof raw.work_order_id !== "string"
  )
    throw new Error("Canonical result requires its issued work_order_id");
  const directory = await kernelExchangeDirectory(ctx, taskId, raw.work_order_id);
  if (path.resolve(resultPath) !== path.join(directory, "result.json"))
    throw new Error("Canonical result path mismatch");
  const workOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    await retainedJson(directory, "work-order.json"),
  );
  const compact = !("kind" in raw);
  if (compact) {
    const owner: unknown = await retainedJson(directory, "transport-owner.json");
    if (
      !isRecord(owner) ||
      owner.result_format !== "semantic_payload_v1" ||
      owner.work_order_id !== workOrder.work_order_id
    )
      throw new Error("This canonical exchange does not accept compact results");
  }
  const admission = admitSemanticResult({
    owner: {
      task_id: taskId,
      work_order_id: workOrder.work_order_id,
      role: workOrder.role,
    },
    work_order: workOrder,
    result: raw,
    ...(compact ? { format: "semantic_payload_v1" as const } : {}),
  });
  const semantic = admission.result;
  if (!workOrder.canonical_binding) throw new Error("Canonical result binding mismatch");
  if (semantic.task_plan_proposal || semantic.task_intent || semantic.plan_refinement)
    throw new Error("Legacy lifecycle payloads cannot mutate a canonical Task");
  return {
    directory,
    workOrder: admission.work_order,
    semantic,
    applicationId: admission.application_id,
  };
}

export async function withKernelReworkEvidence(
  order: AgentWorkOrderV2,
  directory: string,
  record?: KernelRecord,
): Promise<AgentWorkOrderV2> {
  const binding = order.canonical_binding;
  if (binding?.phase !== "implementation" || binding.attempt === 1) return order;
  const inputs: AgentWorkOrderV2["required_inputs"] = [];
  for (const mutationId of Object.keys(record?.aggregate.mutation_receipts ?? {}).toSorted()) {
    if (!/^validation:sha256:[a-f0-9]{64}$/u.test(mutationId)) continue;
    const name = mutationId.slice("validation:sha256:".length);
    const source = path.join(path.dirname(directory), name);
    try {
      const validationPath = path.join(source, "validation.json");
      const validation = JSON.parse(
        await readStableRegularTextNoFollow(validationPath, "rework validation"),
      ) as KernelValidationEvidence;
      if (
        validation.task_id !== binding.task_id ||
        validation.work_item_id !== binding.work_item_id ||
        validation.contract_digest !== binding.contract_digest ||
        validation.attempt !== binding.attempt - 1 ||
        validation.status !== "FAILED"
      )
        continue;
      if (validation.review_digest) {
        const reviewPath = path.join(source, "inspection-result.json");
        const review = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
          JSON.parse(await readStableRegularTextNoFollow(reviewPath, "rework review")),
        );
        const previous = review.canonical_binding;
        if (
          previous?.phase !== "inspection" ||
          previous.task_id !== binding.task_id ||
          previous.repository_identity !== binding.repository_identity ||
          previous.contract_digest !== binding.contract_digest ||
          previous.work_item_id !== binding.work_item_id ||
          previous.attempt !== binding.attempt - 1 ||
          validation.repository_fingerprint !== previous.repository_fingerprint ||
          validation.review_digest !== k.kernelDigest(review) ||
          validation.result_digest !== previous.result_digest
        )
          continue;
        inputs.push({
          id: `review:${name}`,
          kind: "source_artifact",
          path: reviewPath,
          digest: k.kernelDigest(review),
          description: "Prior unresolved EVALUATOR findings. Digest uses canonical JSON.",
          required: true,
        });
      } else if (validation.checks.status !== "failed") {
        continue;
      }
      inputs.push({
        id: `checks:${name}`,
        kind: "source_artifact",
        path: validationPath,
        digest: k.kernelDigest(validation),
        description: "Prior native check or review failure. Digest uses canonical JSON.",
        required: true,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  if (inputs.length === 0)
    inputs.push(...(await approvedAmendmentInputs(order, directory, record)));
  if (inputs.length === 0) inputs.push(...(await kernelRecoveryInputs(order, directory, record)));
  if (inputs.length === 0)
    throw new Error("Canonical rework requires retained review or failed-check evidence");
  return AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse({
    ...order,
    required_inputs: [...order.required_inputs, ...inputs],
  });
}

/** Recognize an approved changed definition; preceding-attempt evidence is checked separately. */
export function isKernelScopeExpansionRecovery(
  order: AgentWorkOrderV2,
  record?: KernelRecord,
): boolean {
  const binding = order.canonical_binding;
  const aggregate = record?.aggregate;
  if (binding?.phase !== "implementation" || !aggregate || !record) return false;
  const current = aggregate.current_plan;
  const source = aggregate.plan_history.at(-1);
  const lineage = aggregate.authority_lineage ?? [];
  const authority = lineage.at(-1)?.authority;
  const amendmentIndex = lineage.findLastIndex(
    (entry) =>
      entry.observation?.kind === "plan_amendment" &&
      entry.authority.plan_digest === current?.digest,
  );
  const parent = lineage[amendmentIndex - 1]?.authority;
  const previous = source?.work_items.find((item) => item.id === binding.work_item_id);
  const amended = current?.work_items.find((item) => item.id === binding.work_item_id);
  const runtime = aggregate.work_items[binding.work_item_id];
  if (!current || !source || !authority || !parent || !previous || !amended || !runtime)
    return false;
  return Boolean(
    current.state === "APPROVED" &&
    source.state === "SUPERSEDED" &&
    source.revision === current.revision - 1 &&
    /^USER(?::[A-Za-z0-9._@-]+)?$/u.test(current.approval_actor_id ?? "") &&
    current.digest ===
      k.kernelDigest({ revision: current.revision, work_items: current.work_items }) &&
    source.digest ===
      k.kernelDigest({ revision: source.revision, work_items: source.work_items }) &&
    binding.task_id === aggregate.id &&
    order.task.id === aggregate.id &&
    order.task.revision === aggregate.revision &&
    order.task.work_item_id === binding.work_item_id &&
    binding.repository_identity === record.repository_identity &&
    binding.repository_identity === authority.repository_identity &&
    binding.repository_fingerprint === authority.repository_fingerprint &&
    binding.plan_revision === current.revision &&
    binding.plan_digest === current.digest &&
    binding.contract_digest === amended.contract_digest &&
    runtime.state === "EXECUTING" &&
    runtime.attempt === binding.attempt &&
    runtime.claim_id !== null &&
    runtime.claim_id === binding.claim_id &&
    runtime.result_digest === null &&
    runtime.validation === null &&
    runtime.output_manifests.length === 0 &&
    k.kernelDigest(runtime.definition) === k.kernelDigest(amended) &&
    k.kernelDigest(previous) !== k.kernelDigest(amended) &&
    parent.plan_digest === source.digest &&
    parent.plan_revision === source.revision &&
    authority.plan_digest === current.digest &&
    authority.plan_revision === current.revision &&
    authority.work_item_id === null &&
    order.state_fingerprint.components.authority.digest ===
      k.kernelDigest({
        state: "present",
        source: "canonical_authority",
        value: { issued: binding.authority_digest, lineage: authority.digest },
      }) &&
    k.canonicalAuthorityIssues(aggregate).length === 0 &&
    current.approval_evidence_digest ===
      k.planScopeExpansionApprovalDigest({
        task_id: aggregate.id,
        current_plan_digest: source.digest,
        amended_plan_digest: current.digest,
        actor_id: current.approval_actor_id!,
      }) &&
    k.planAmendmentScopeRoots({ current: source, amended: current, authority: parent }) !== null,
  );
}

async function retainedJson(source: string, name: string): Promise<unknown> {
  return JSON.parse(await readStableRegularTextNoFollow(path.join(source, name), name));
}

function precedingStopContinuation(
  record: KernelRecord,
  prior: AgentWorkOrderV2,
  revision: number,
  fingerprint: unknown,
  roots: readonly string[],
): boolean {
  const binding = prior.canonical_binding!;
  let cursor = prior.task.revision!;
  let observed = binding.repository_fingerprint;
  const events = record.events.filter(
    (event) => event.task_revision > cursor && event.task_revision <= revision,
  );
  for (const event of events) {
    const receipt = record.aggregate.mutation_receipts[event.mutation_id];
    const continuation = record.aggregate.authority_lineage?.find(
      (entry) =>
        entry.observation?.kind === "repository_implementation" &&
        entry.observation.previous_fingerprint === observed &&
        entry.authority.plan_digest === binding.plan_digest &&
        entry.observation.changed_paths.every((changed) =>
          roots.some((root) => root === "." || changed === root || changed.startsWith(`${root}/`)),
        ) &&
        event.command_digest ===
          k.kernelDigest({
            kind: "continue_authority",
            task_id: binding.task_id,
            expected_task_revision: cursor,
            expected_state_fingerprint: entry.authority.repository_fingerprint,
            record: entry,
          }),
    );
    if (
      event.kind !== "authority_continued" ||
      event.task_revision !== cursor + 1 ||
      receipt?.before_revision !== cursor ||
      receipt.after_revision !== event.task_revision ||
      receipt.command_digest !== event.command_digest ||
      !continuation
    )
      return false;
    cursor = event.task_revision;
    observed = continuation.authority.repository_fingerprint;
  }
  return cursor === revision && observed === fingerprint;
}

/** A retained native stop/failure binds this exemption to the first attempt of the new definition. */
async function approvedAmendmentInputs(
  order: AgentWorkOrderV2,
  directory: string,
  record?: KernelRecord,
): Promise<AgentWorkOrderV2["required_inputs"]> {
  if (!record || !isKernelScopeExpansionRecovery(order, record)) return [];
  const binding = order.canonical_binding!;
  if (binding.phase !== "implementation") return [];
  const sourcePlan = record.aggregate.plan_history.at(-1)!;
  const previous = sourcePlan.work_items.find((item) => item.id === binding.work_item_id)!;
  const amendment = record.events.findLast((event) => event.kind === "plan_amended");
  if (!amendment) return [];
  // Native events do not retain attempt payloads. Require the exact immediate
  // continuation/claim/begin sequence; an intervening retry cannot reuse approval.
  const after = record.events.filter((event) => event.task_revision > amendment.task_revision);
  if (after.length !== 3 || after[0]?.kind !== "authority_continued") return [];
  for (const [index, action] of ["claim", "begin"].entries()) {
    const event = after[index + 1]!;
    const receipt = record.aggregate.mutation_receipts[event.mutation_id];
    const command = {
      kind: "transition_work_item",
      action,
      task_id: binding.task_id,
      expected_task_revision: amendment.task_revision + index + 1,
      expected_state_fingerprint: binding.repository_fingerprint,
      work_item_id: binding.work_item_id,
      claim_id: binding.claim_id,
    };
    if (
      event.kind !== "work_item_transitioned" ||
      event.task_revision !== amendment.task_revision + index + 2 ||
      event.command_digest !== k.kernelDigest(command) ||
      receipt?.command_digest !== event.command_digest ||
      receipt.after_revision !== event.task_revision ||
      receipt.before_revision !== event.task_revision - 1
    )
      return [];
  }
  if (after[2]!.task_revision !== record.aggregate.revision) return [];
  for (const [id, receipt] of Object.entries(record.aggregate.mutation_receipts).toSorted(
    ([a], [b]) => a.localeCompare(b),
  )) {
    const match = /^(semantic-stop|validation):(sha256:[a-f0-9]{64})$/u.exec(id);
    if (!match || receipt.after_revision >= amendment.task_revision) continue;
    const source = path.join(path.dirname(directory), match[2]!.slice(7));
    try {
      const orderPath = path.join(source, "work-order.json");
      const prior = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        await retainedJson(source, "work-order.json"),
      );
      const old = prior.canonical_binding;
      if (
        !old ||
        old.phase === "planning" ||
        prior.work_order_id !== match[2] ||
        old.task_id !== binding.task_id ||
        old.repository_identity !== binding.repository_identity ||
        old.plan_revision !== sourcePlan.revision ||
        old.plan_digest !== sourcePlan.digest ||
        old.work_item_id !== binding.work_item_id ||
        old.contract_digest !== previous.contract_digest ||
        old.attempt !== binding.attempt - 1 ||
        prior.task.revision === null ||
        prior.task.revision > receipt.before_revision
      )
        continue;
      if (match[1] === "semantic-stop") {
        const saved: unknown = await retainedJson(source, "semantic-stop-command.json");
        if (
          !isRecord(saved) ||
          !isRecord(saved.command) ||
          k.kernelDigest(saved.command) !== receipt.command_digest ||
          saved.command.kind !== "transition_work_item" ||
          saved.command.action !== "block" ||
          saved.command.task_id !== old.task_id ||
          saved.command.work_item_id !== old.work_item_id ||
          old.phase !== "implementation" ||
          saved.command.claim_id !== old.claim_id ||
          saved.command.expected_task_revision !== receipt.before_revision ||
          !precedingStopContinuation(
            record,
            prior,
            receipt.before_revision,
            saved.command.expected_state_fingerprint,
            previous.execution_requirements.scope_roots,
          )
        )
          continue;
      } else {
        const validation = (await retainedJson(
          source,
          "validation.json",
        )) as KernelValidationEvidence;
        const saved: unknown = await retainedJson(source, "validation-command.json");
        if (
          !isRecord(saved) ||
          !isRecord(saved.command) ||
          k.kernelDigest(saved.command) !== receipt.command_digest ||
          saved.command.kind !== "record_work_item_validation" ||
          saved.command.task_id !== old.task_id ||
          saved.command.work_item_id !== old.work_item_id ||
          !isRecord(saved.command.validation) ||
          saved.command.validation.status !== "FAILED" ||
          !isRecord(saved.command.validation.identity) ||
          saved.command.validation.identity.implementation_identity !== validation.result_digest ||
          !Array.isArray(saved.command.validation.evidence_digests) ||
          !saved.command.validation.evidence_digests.includes(validation.native_evidence_digest) ||
          (validation.review_digest !== null &&
            !saved.command.validation.evidence_digests.includes(validation.review_digest)) ||
          validation.task_id !== old.task_id ||
          validation.work_item_id !== old.work_item_id ||
          validation.attempt !== old.attempt ||
          validation.contract_digest !== old.contract_digest ||
          validation.repository_fingerprint !== old.repository_fingerprint ||
          validation.status !== "FAILED"
        )
          continue;
      }
      return [
        {
          id: `previous-definition:${match[2]}`,
          kind: "source_artifact",
          path: orderPath,
          digest: k.kernelDigest(prior),
          required: true,
          description:
            "Preceding native attempt under the immediate superseded Plan. The current definition has exact USER-approved amendment authority. Digest uses canonical JSON.",
        },
      ];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  return [];
}

export async function issueKernelExchange(
  ctx: CommandContext,
  order: AgentWorkOrderV2,
  transport: "host" | "managed",
  record?: KernelRecord,
) {
  const directory = await kernelExchangeDirectory(ctx, order.task.id, order.work_order_id);
  order = await withKernelReworkEvidence(order, directory, record);
  let resultFormat: "semantic_payload_v1" | undefined;
  try {
    const owner: unknown = await retainedJson(directory, "transport-owner.json");
    if (
      !isRecord(owner) ||
      owner.transport !== transport ||
      owner.work_order_id !== order.work_order_id ||
      (owner.result_format !== undefined && owner.result_format !== "semantic_payload_v1")
    )
      throw new Error("Canonical transport owner mismatch");
    resultFormat = owner.result_format;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    resultFormat = "semantic_payload_v1";
    await writeKernelArtifact(directory, "transport-owner.json", {
      transport,
      work_order_id: order.work_order_id,
      result_format: resultFormat,
    });
  }
  await writeKernelArtifact(directory, "work-order.json", order);
  const qualityRoot = path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    order.task.id,
    "quality",
  );
  let resultSchemaRef = "result-schema.json";
  try {
    // Historical exchange files retain their original paths and bytes.
    await readStableRegularTextNoFollow(
      path.join(directory, resultSchemaRef),
      "canonical result schema",
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    let stored: unknown;
    try {
      stored = await retainedJson(directory, "result-schema-object.json");
    } catch (missing) {
      if ((missing as NodeJS.ErrnoException).code !== "ENOENT") throw missing;
      stored = await putEvaluatorEvidenceObject({
        gitRoot: ctx.resolvedProject.gitRoot,
        taskQualityRoot: qualityRoot,
        logicalName: "canonical-result-schema",
        kind: "result_schema",
        extension: ".json",
        mediaType: "application/schema+json",
        contents: renderAgentSemanticResultSchemaJson(
          resultFormat
            ? {
                role: order.role,
                phase: order.canonical_binding?.phase,
              }
            : undefined,
        ),
      });
      // Publish the descriptor after its object. Interrupted publication reuses verified bytes.
      await writeKernelArtifact(directory, "result-schema-object.json", stored);
    }
    const { artifact } = await readEvaluatorEvidenceObject({
      gitRoot: ctx.resolvedProject.gitRoot,
      objectRoot: path
        .relative(ctx.resolvedProject.gitRoot, path.join(qualityRoot, "objects"))
        .replaceAll("\\", "/"),
      artifact: stored,
    });
    if (artifact.kind !== "result_schema" || artifact.logical_name !== "canonical-result-schema")
      throw new Error("Canonical schema descriptor has an invalid identity");
    resultSchemaRef = path.relative(
      directory,
      path.join(ctx.resolvedProject.gitRoot, artifact.path),
    );
  }
  const manifest = buildWorkOrderContextManifest(order, path.join(directory, "work-order.json"));
  await writeKernelArtifact(directory, WORK_ORDER_CONTEXT_FILENAME, manifest);
  if (order.canonical_binding?.phase === "implementation") {
    await writeKernelArtifact(
      directory,
      "repository-baseline.json",
      await captureKernelRepositoryBaseline(ctx, order),
    );
  }
  return {
    context_manifest: {
      ref: path.join(directory, WORK_ORDER_CONTEXT_FILENAME),
      digest: workOrderContextManifestDigest(manifest),
      blocks: manifest.blocks.length,
      required: manifest.blocks.filter((block) => block.required).length,
    },
    schema_version: 1,
    task_id: order.task.id,
    transition_id: `tr_${order.work_order_id.slice(7, 39)}`,
    state_fingerprint: order.state_fingerprint.digest,
    action: {
      kind: "agent_episode",
      instruction:
        "Read the complete context manifest and resolve every required block before semantic work. Validate digests against the referenced WorkOrder. Reload required blocks after context loss. Load optional blocks on demand. Perform this canonical WorkOrder and return its typed semantic result.",
    },
    stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    authority: {
      role: order.role,
      mutation: order.authority.writable_roots.length > 0 ? "scoped_write" : "read_only",
      network: "deny",
      required: false,
      reference:
        order.canonical_binding && order.canonical_binding.phase !== "planning"
          ? order.canonical_binding.authority_digest
          : null,
    },
    exchange: {
      ...(resultFormat ? { result_format: resultFormat } : {}),
      directory,
      work_order_ref: "work-order.json",
      result_schema_ref: resultSchemaRef,
      result_ref: "result.json",
      result_path: path.join(directory, "result.json"),
      resume_argv: [
        "agentplane",
        "task",
        "advance",
        order.task.id,
        "--result",
        path.join(directory, "result.json"),
        "--agent-json",
      ],
    },
  };
}
