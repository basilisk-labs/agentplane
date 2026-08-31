import { mkdir } from "node:fs/promises";
import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  renderAgentSemanticResultSchemaJson,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
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

export async function issueKernelExchange(
  ctx: CommandContext,
  order: AgentWorkOrderV2,
  transport: "host" | "managed",
) {
  const directory = await kernelExchangeDirectory(ctx, order.task.id, order.work_order_id);
  await writeKernelArtifact(directory, "transport-owner.json", {
    transport,
    work_order_id: order.work_order_id,
  });
  await writeKernelArtifact(directory, "work-order.json", order);
  await writeKernelArtifact(
    directory,
    "result-schema.json",
    JSON.parse(renderAgentSemanticResultSchemaJson()),
  );
  return {
    schema_version: 1,
    task_id: order.task.id,
    transition_id: `tr_${order.work_order_id.slice(7, 39)}`,
    state_fingerprint: order.state_fingerprint.digest,
    action: {
      kind: "agent_episode",
      instruction: "Perform this canonical WorkOrder and return its typed semantic result.",
    },
    stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    authority: {
      role: order.role,
      mutation: order.authority.writable_roots.length > 0 ? "scoped_write" : "read_only",
      network: "deny",
      required: false,
      reference:
        order.canonical_binding?.phase === "implementation"
          ? order.canonical_binding.authority_digest
          : null,
    },
    exchange: {
      directory,
      work_order_ref: "work-order.json",
      result_schema_ref: "result-schema.json",
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
