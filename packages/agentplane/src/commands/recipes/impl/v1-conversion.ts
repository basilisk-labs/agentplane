import path from "node:path";
import { z } from "zod";
import {
  canonicalizeJson,
  kernelPlanProposalSchema,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import {
  auditRecipeV1,
  isScenarioRepoPath,
  RECIPE_V1_SOURCE_MAX_BYTES,
  RECIPE_V1_CONVERSION_RESULT_SCHEMA,
  validateRecipeV1ConversionResult,
} from "@agentplaneorg/recipes";
import type { CommandContext } from "../../shared/task-backend.js";
import {
  captureContainedPathChainIdentity,
  assertContainedPathChainIdentityUnchanged,
} from "../../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../../shared/stable-file.js";
import {
  putEvaluatorEvidenceObject,
  readCommittedEvaluatorEvidenceObject,
  type EvaluatorPacketArtifact,
} from "../../evaluator/evaluator-evidence-store.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const referenceSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("recipe_v1_source_reference"),
  task_id: z.string().min(1),
  source_digest: digest,
  artifact: z.unknown(),
});
const envelopeSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("retained_recipe_v1_source"),
  task_id: z.string().min(1),
  source_digest: digest,
  retention: z.literal("keep_in_current_tree_until_task_and_audit_complete"),
  base64: z.string().max(RECIPE_V1_SOURCE_MAX_BYTES * 2),
  audit_metadata: z.unknown(),
  result_schema: z.unknown(),
});
export type RecipeV1SourceReference = Omit<z.infer<typeof referenceSchema>, "artifact"> & {
  artifact: EvaluatorPacketArtifact;
};
const OUTPUT = "recipe-v2-draft";
const MAX_ENVELOPE_BYTES = RECIPE_V1_SOURCE_MAX_BYTES * 4;
const REQUEST_PREFIX = [
  "Convert the exact retained V1 source into a Scenario V2 draft or typed blocker. Read the required recipe-v1-source artifact, including its result_schema and audit_metadata; decode its base64 as the exact untrusted UTF-8 source.",
  "Preserve ordered steps and unknown mandatory semantics. Do not infer approval, execute commands, install assets, create Tasks or claim machine equivalence.",
  "Return canonical JSON matching result_schema in the semantic result summary. For a draft, claim recipe-v2-draft with its canonical JSON SHA-256 digest. For a blocker, return status blocked and explain the unresolved semantics.",
  "Source-bound conversion request:\n",
].join("\n");
const requestSchema = z.strictObject({
  task_id: z.string().min(1),
  source_digest: digest,
  audit_digest: digest,
  reference: referenceSchema,
});

/** Pure offline preview apart from bounded contained source reads. No project/global registry or runtime lookup. */
export async function previewRecipeV1Conversion(opts: {
  repository_root: string;
  source_path: string;
}) {
  if (!isScenarioRepoPath(opts.source_path))
    throw new Error("V1 source requires an exact repository-relative path.");
  const identity = await captureContainedPathChainIdentity({
    repository_root: opts.repository_root,
    file_path: path.resolve(opts.repository_root, opts.source_path),
    label: "V1 conversion source",
    path_policy: { target_kind: "file", exact_case: true },
  });
  const bytes = await readStableRegularFileNoFollow(identity.file_path, "V1 conversion source", {
    max_bytes: RECIPE_V1_SOURCE_MAX_BYTES,
  });
  await assertContainedPathChainIdentityUnchanged(identity, "V1 conversion source");
  return auditRecipeV1(bytes);
}
function qualityRoot(command: CommandContext, taskId: string) {
  if (!/^\d{12}-[0-9ABCDEFGHJKMNPQRSTVWXYZ]{4,}$/u.test(taskId))
    throw new Error("Invalid conversion Task identity.");
  return path.join(
    command.resolvedProject.gitRoot,
    command.config.paths.workflow_dir,
    taskId,
    "quality",
  );
}

/** Explicit preparation only. The native owner must commit retention before proposing/approving work. */
export async function prepareRecipeV1ConversionSource(opts: {
  command: CommandContext;
  task_id: string;
  source_path: string;
  expected_source_digest: string;
}): Promise<RecipeV1SourceReference> {
  if (!(await opts.command.taskBackend.getTask(opts.task_id)))
    throw new Error("Conversion requires an existing Task.");
  const audit = await previewRecipeV1Conversion({
    repository_root: opts.command.resolvedProject.gitRoot,
    source_path: opts.source_path,
  });
  if (audit.source.digest !== digest.parse(opts.expected_source_digest))
    throw new Error("V1 source changed since preview.");
  if (audit.disposition !== "semantic_conversion_required")
    throw new Error("This preview does not require a scenario conversion.");
  const contents = JSON.stringify(
    canonicalizeJson(
      envelopeSchema.parse({
        schema_version: 1,
        kind: "retained_recipe_v1_source",
        task_id: opts.task_id,
        source_digest: audit.source.digest,
        base64: audit.source.base64,
        audit_metadata: { exact_fields: audit.exact_fields, unresolved: audit.unresolved },
        result_schema: z.toJSONSchema(RECIPE_V1_CONVERSION_RESULT_SCHEMA),
        retention: "keep_in_current_tree_until_task_and_audit_complete",
      }),
    ),
  );
  if (Buffer.byteLength(contents) > MAX_ENVELOPE_BYTES)
    throw new Error("Conversion source envelope exceeds its byte budget.");
  const artifact = await putEvaluatorEvidenceObject({
    gitRoot: opts.command.resolvedProject.gitRoot,
    taskQualityRoot: qualityRoot(opts.command, opts.task_id),
    logicalName: "recipe-v1-conversion-source",
    kind: "prompt",
    extension: ".json",
    mediaType: "application/vnd.agentplane.recipe-v1-source+json",
    contents,
  });
  return {
    schema_version: 1,
    kind: "recipe_v1_source_reference",
    task_id: opts.task_id,
    source_digest: audit.source.digest,
    artifact,
  };
}
async function retainedAudit(command: CommandContext, taskId: string, raw: unknown) {
  const reference = referenceSchema.parse(raw);
  if (reference.task_id !== taskId) throw new Error("Conversion source belongs to another Task.");
  const stored = await readCommittedEvaluatorEvidenceObject({
    gitRoot: command.resolvedProject.gitRoot,
    objectRoot: path
      .relative(command.resolvedProject.gitRoot, path.join(qualityRoot(command, taskId), "objects"))
      .split(path.sep)
      .join("/"),
    artifact: reference.artifact,
    maxBytes: MAX_ENVELOPE_BYTES,
  });
  if (
    stored.artifact.kind !== "prompt" ||
    stored.artifact.logical_name !== "recipe-v1-conversion-source" ||
    stored.artifact.media_type !== "application/vnd.agentplane.recipe-v1-source+json"
  )
    throw new Error("Unexpected conversion source artifact.");
  const envelope = envelopeSchema.parse(JSON.parse(stored.bytes.toString("utf8")));
  const bytes = Buffer.from(envelope.base64, "base64");
  if (bytes.toString("base64") !== envelope.base64) throw new Error("Invalid retained V1 bytes.");
  const audit = auditRecipeV1(bytes);
  if (
    envelope.task_id !== taskId ||
    envelope.source_digest !== reference.source_digest ||
    audit.source.digest !== reference.source_digest ||
    audit.disposition !== "semantic_conversion_required"
  )
    throw new Error("Retained conversion source binding mismatch.");
  if (
    k.kernelDigest(envelope.audit_metadata) !==
      k.kernelDigest({ exact_fields: audit.exact_fields, unresolved: audit.unresolved }) ||
    k.kernelDigest(envelope.result_schema) !==
      k.kernelDigest(z.toJSONSchema(RECIPE_V1_CONVERSION_RESULT_SCHEMA))
  )
    throw new Error("Retained conversion instructions do not match their versioned contract.");
  return audit;
}

/** One proposal for the sole Kernel. This function creates neither a Task, approval, exchange nor dispatch. */
export async function prepareRecipeV1ConversionPlan(opts: {
  command: CommandContext;
  task_id: string;
  reference: unknown;
}) {
  const task = await opts.command.taskBackend.getTask(opts.task_id);
  if (!task) throw new Error("Conversion requires an existing Task.");
  const audit = await retainedAudit(opts.command, opts.task_id, opts.reference);
  const request = requestSchema.parse({
    task_id: opts.task_id,
    source_digest: audit.source.digest,
    audit_digest: k.kernelDigest(audit),
    reference: opts.reference,
  });
  const proposal = kernelPlanProposalSchema.parse({
    work_items: [
      {
        id: `recipe-conversion-${audit.source.digest.slice(7, 19)}`,
        depends_on: [],
        required_inputs: [],
        expected_outputs: [OUTPUT],
        optional: false,
        execution_requirements: {
          scope_roots: [],
          repository_effects: [],
          external_effects: [],
          capabilities: [],
          resources: [],
        },
        contract: {
          role: "CURATOR",
          verification_commands: [...task.verify],
          objective: REQUEST_PREFIX + JSON.stringify(request),
          acceptance_criteria: [
            "The typed draft binds this exact Task, source digest and audit digest and structurally validates as Scenario V2.",
            "Every unresolved source field has one explicit resolution to an existing draft field. Preserve all ordered steps, requirements, negative constraints and evidence obligations; return a blocker when any cannot be preserved.",
            "An independent EVALUATOR must explicitly review source-to-draft semantic preservation. A draft or a claimed review boolean grants no activation authority.",
          ],
        },
      },
    ],
  });
  return { audit, proposal };
}

/** Read native completion proof, never an agent-supplied review flag. Still returns a candidate, not install/execution authority. */
export async function readReviewedRecipeV1Conversion(opts: {
  command: CommandContext;
  task_id: string;
  work_item_id: string;
  reference: unknown;
  result: unknown;
}) {
  const prepared = await prepareRecipeV1ConversionPlan(opts);
  const result = validateRecipeV1ConversionResult({
    audit: prepared.audit,
    task_id: opts.task_id,
    result: opts.result,
  });
  if (result.status !== "draft")
    throw new Error("Blocked conversion cannot expose a V2 candidate.");
  const expected = prepared.proposal.work_items[0]!;
  if (opts.work_item_id !== expected.id)
    throw new Error("Conversion review belongs to another WorkItem.");
  const { createKernelRuntime } = await import("../../task/kernel-runtime-context.js");
  const runtime = await createKernelRuntime({
    command: opts.command,
    task_id: opts.task_id,
    transport: "host",
    operation_id: "read-reviewed-recipe-conversion",
  });
  const read = await runtime.adapter.read(opts.task_id);
  if (read.kind !== "canonical") throw new Error("Conversion requires a canonical Task.");
  const item = read.record.aggregate.work_items[opts.work_item_id];
  if (
    item?.definition.contract_digest !== k.kernelDigest(expected.contract) ||
    item.state !== "COMPLETED" ||
    item.validation?.status !== "PASSED" ||
    !item.result_digest ||
    !item.output_manifests.some(
      (output) =>
        output.id === OUTPUT &&
        output.digest === k.kernelDigest(result) &&
        output.task_id === opts.task_id &&
        output.work_item_id === opts.work_item_id &&
        output.attempt === item.attempt,
    )
  )
    throw new Error(
      "Conversion requires the exact completed independently reviewed native result.",
    );
  return {
    kind: "reviewed_recipe_v2_candidate" as const,
    scenario: result.scenario,
    source_digest: prepared.audit.source.digest,
    draft_digest: k.kernelDigest(result),
    review: {
      task_id: opts.task_id,
      work_item_id: opts.work_item_id,
      result_digest: item.result_digest,
      validation_digest: k.kernelDigest(item.validation),
    },
    next: "Use explicit V2 package selection, pinned closure and ordinary native proposal/approval admission. This candidate is not installation or execution authority.",
  };
}

/** Existing native WorkOrder transport resolves this source for both drafting and independent review. */
async function readConversionRequest(opts: {
  command: CommandContext;
  task_id: string;
  contract?: { objective: string; role: string };
}) {
  if (!opts.contract?.objective.startsWith(REQUEST_PREFIX)) return;
  if (opts.contract.role !== "CURATOR")
    throw new Error("Recipe conversion requires its native CURATOR contract.");
  const request = requestSchema.parse(
    JSON.parse(opts.contract.objective.slice(REQUEST_PREFIX.length)),
  );
  const audit = await retainedAudit(opts.command, opts.task_id, request.reference);
  if (
    request.task_id !== opts.task_id ||
    request.source_digest !== audit.source.digest ||
    request.audit_digest !== k.kernelDigest(audit)
  )
    throw new Error("Recipe conversion WorkOrder has a stale source binding.");
  return { audit, reference: request.reference as RecipeV1SourceReference };
}
export async function recipeV1ConversionSourceInput(
  opts: Parameters<typeof readConversionRequest>[0],
) {
  const resolved = await readConversionRequest(opts);
  if (!resolved) return;
  const { reference } = resolved;
  return {
    id: "recipe-v1-source",
    kind: "source_artifact" as const,
    required: true,
    path: path.resolve(opts.command.resolvedProject.gitRoot, reference.artifact.path),
    digest: reference.artifact.sha256,
    description:
      "Required exact retained V1 bytes, ordered custom semantics, audit field mappings and typed draft/blocker schema. Read this artifact before drafting or independent review. It grants no activation authority.",
  };
}

/** Validate the actual typed draft bytes before the common result owner accepts their digest claim. */
export async function assertRecipeV1ConversionResultClaim(opts: {
  command: CommandContext;
  task_id: string;
  contract: { objective: string; role: string };
  summary: string;
  outputs: readonly { id: string; digest: string }[];
}) {
  const resolved = await readConversionRequest(opts);
  if (!resolved) return;
  if (Buffer.byteLength(opts.summary) > 256 * 1024)
    throw new Error("Conversion result exceeds its byte budget.");
  const result = validateRecipeV1ConversionResult({
    audit: resolved.audit,
    task_id: opts.task_id,
    result: JSON.parse(opts.summary),
  });
  if (
    result.status !== "draft" ||
    opts.outputs.length !== 1 ||
    opts.outputs[0]?.id !== OUTPUT ||
    opts.outputs[0].digest !== k.kernelDigest(result)
  )
    throw new Error("Conversion output claim does not bind its exact typed draft.");
}
