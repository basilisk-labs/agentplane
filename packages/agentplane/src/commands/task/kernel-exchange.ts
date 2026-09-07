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
  const semantic = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(resultPath, "canonical semantic result", {
        max_bytes: 4 * 1024 * 1024,
      }),
    ),
  );
  const directory = await kernelExchangeDirectory(ctx, taskId, semantic.work_order_id);
  if (path.resolve(resultPath) !== path.join(directory, "result.json"))
    throw new Error("Canonical result path mismatch");
  const workOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "work-order.json"),
        "canonical work order",
      ),
    ),
  );
  if (
    workOrder.task.id !== taskId ||
    workOrder.work_order_id !== semantic.work_order_id ||
    !workOrder.canonical_binding ||
    k.kernelDigest(workOrder.canonical_binding) !==
      k.kernelDigest(semantic.canonical_binding ?? null)
  )
    throw new Error("Canonical result binding mismatch");
  if (semantic.task_plan_proposal || semantic.task_intent || semantic.plan_refinement)
    throw new Error("Legacy lifecycle payloads cannot mutate a canonical Task");
  return { directory, workOrder, semantic };
}

async function withKernelReworkEvidence(
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
        previous.attempt !== binding.attempt - 1
      )
        continue;
      const validationPath = path.join(source, "validation.json");
      const validation = JSON.parse(
        await readStableRegularTextNoFollow(validationPath, "rework validation"),
      ) as KernelValidationEvidence;
      if (
        validation.repository_fingerprint !== previous.repository_fingerprint ||
        validation.review_digest !== k.kernelDigest(review) ||
        validation.result_digest !== previous.result_digest ||
        validation.checks.status !== "failed"
      )
        continue;
      inputs.push(
        {
          id: `review:${name}`,
          kind: "source_artifact",
          path: reviewPath,
          digest: k.kernelDigest(review),
          description:
            "Unresolved evaluator findings from the preceding attempt. Digest uses canonical JSON.",
          required: true,
        },
        {
          id: `checks:${name}`,
          kind: "source_artifact",
          path: validationPath,
          digest: k.kernelDigest(validation),
          description:
            "Native failed checks from the preceding attempt. Digest uses canonical JSON.",
          required: true,
        },
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  if (inputs.length === 0)
    throw new Error(
      "Canonical rework requires retained evaluator findings and failed-check evidence",
    );
  return AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse({
    ...order,
    required_inputs: [...order.required_inputs, ...inputs],
  });
}

export async function issueKernelExchange(
  ctx: CommandContext,
  order: AgentWorkOrderV2,
  transport: "host" | "managed",
  record?: KernelRecord,
) {
  const directory = await kernelExchangeDirectory(ctx, order.task.id, order.work_order_id);
  order = await withKernelReworkEvidence(order, directory, record);
  await writeKernelArtifact(directory, "transport-owner.json", {
    transport,
    work_order_id: order.work_order_id,
  });
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
      stored = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(directory, "result-schema-object.json"),
          "canonical schema descriptor",
        ),
      );
    } catch (missing) {
      if ((missing as NodeJS.ErrnoException).code !== "ENOENT") throw missing;
      stored = await putEvaluatorEvidenceObject({
        gitRoot: ctx.resolvedProject.gitRoot,
        taskQualityRoot: qualityRoot,
        logicalName: "canonical-result-schema",
        kind: "result_schema",
        extension: ".json",
        mediaType: "application/schema+json",
        contents: renderAgentSemanticResultSchemaJson(),
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
