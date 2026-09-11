import { createHash } from "node:crypto";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { validateAgentWorkOrderV2, type AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

export const WORK_ORDER_CONTEXT_FILENAME = "work-order-context.json";
const serialize = (value: unknown) => JSON.stringify(canonicalizeJson(value));
const digest = (value: unknown) =>
  `sha256:${createHash("sha256").update(serialize(value)).digest("hex")}`;

export type WorkOrderContextManifest = {
  schema_version: 1;
  kind: "agentplane.work_order_context";
  work_order_id: string;
  role: AgentWorkOrderV2["role"];
  work_item_id: string | null;
  source_ref: string;
  source_digest: string;
  blocks: {
    id: string;
    type: string;
    pointer: string;
    ref: string;
    digest: string;
    bytes: number;
    required: boolean;
  }[];
};

/** References select exact values from the existing WorkOrder. No second content store is created. */
export function buildWorkOrderContextManifest(
  order: AgentWorkOrderV2,
  sourceRef: string,
): WorkOrderContextManifest {
  order = validateAgentWorkOrderV2(order);
  const blocks: WorkOrderContextManifest["blocks"] = [];
  const add = (id: string, type: string, pointer: string, value: unknown, required = true) => {
    if (value === undefined) return;
    blocks.push({
      id,
      type,
      pointer,
      ref: `${sourceRef}${sourceRef.includes("#") ? "" : "#"}${pointer}`,
      digest: digest(value),
      bytes: Buffer.byteLength(serialize(value)),
      required,
    });
  };
  add("objective", "objective_and_acceptance", "/task", order.task);
  add("authority", "authority_and_scope", "/authority", order.authority);
  add("constraints", "context_constraints", "/context_intent", order.context_intent);
  add("stops", "stop_rules", "/stop_rules", order.stop_rules);
  add("verification", "verification_contract", "/verification_intent", order.verification_intent);
  add("outputs", "output_contract", "/required_outputs", order.required_outputs);
  add("binding", "canonical_binding", "/canonical_binding", order.canonical_binding);
  add("fingerprint", "state_fingerprint", "/state_fingerprint", order.state_fingerprint);
  add(
    "fingerprint-policy",
    "state_fingerprint_policy",
    "/state_fingerprint_policy",
    order.state_fingerprint_policy,
  );
  add("planning", "planning_context", "/planning_context", order.planning_context);
  for (const [index, input] of order.required_inputs.entries())
    add(`input:${input.id}`, input.kind, `/required_inputs/${index}`, input, input.required);
  for (const [index, input] of order.knowledge_refs.entries())
    add(
      `knowledge:${index}`,
      "knowledge_ref",
      `/knowledge_refs/${index}`,
      input,
      order.context_intent.required_knowledge_ref_digests.includes(input.digest),
    );
  for (const [index, input] of order.prepared_evidence.entries())
    add(
      `evidence:${index}`,
      "prepared_evidence",
      `/prepared_evidence/${index}`,
      input,
      input.role === order.role,
    );
  return {
    schema_version: 1,
    kind: "agentplane.work_order_context",
    work_order_id: order.work_order_id,
    role: order.role,
    work_item_id: order.task.work_item_id ?? null,
    source_ref: sourceRef,
    source_digest: digest(order),
    blocks,
  };
}

export function workOrderContextManifestDigest(manifest: WorkOrderContextManifest): string {
  return digest(manifest);
}

export function assertWorkOrderContextManifest(
  order: AgentWorkOrderV2,
  manifest: WorkOrderContextManifest,
): void {
  if (digest(buildWorkOrderContextManifest(order, manifest.source_ref)) !== digest(manifest))
    throw new Error("WorkOrder context manifest is incomplete or stale");
}

/** Retention is explicit process-local knowledge. A fresh process supplies no retained block set. */
export function resolveWorkOrderContextBlocks(opts: {
  order: AgentWorkOrderV2;
  manifest: WorkOrderContextManifest;
  optional_ids?: readonly string[];
  session_id?: string;
  retained?: {
    blocks: ReadonlyMap<string, string>;
    session_id: string;
    boundary_digest: string;
  };
}) {
  assertWorkOrderContextManifest(opts.order, opts.manifest);
  const expected = opts.manifest;
  const requested = new Set(opts.optional_ids);
  if ([...requested].some((id) => !expected.blocks.some((block) => block.id === id)))
    throw new Error("Requested context block is not in the complete manifest");
  return expected.blocks
    .filter((block) => block.required || requested.has(block.id))
    .flatMap((block) => {
      let content: unknown = opts.order;
      for (const key of block.pointer.split("/").slice(1)) {
        if (!content || typeof content !== "object" || !Object.hasOwn(content, key))
          throw new Error(`Required context block missing: ${block.id}`);
        content = (content as Record<string, unknown>)[key];
      }
      if (digest(content) !== block.digest)
        throw new Error(`Required context block changed: ${block.id}`);
      if (
        opts.session_id &&
        opts.retained?.session_id === opts.session_id &&
        opts.retained.boundary_digest === workOrderContextBoundaryDigest(opts.order) &&
        opts.retained.blocks.get(block.id) === block.digest
      )
        return [];
      return [{ ...block, content }];
    });
}

/** A live transport must acknowledge delivery before retaining blocks across work orders. */
export function workOrderContextBoundaryDigest(order: AgentWorkOrderV2): string {
  return digest({
    task_id: order.task.id,
    work_item_id: order.task.work_item_id ?? null,
    role: order.role,
    authority: order.authority,
    canonical_binding: order.canonical_binding ?? null,
  });
}
