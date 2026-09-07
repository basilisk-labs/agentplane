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
  order.required_inputs.forEach((input, index) =>
    add(`input:${input.id}`, input.kind, `/required_inputs/${index}`, input, input.required),
  );
  order.knowledge_refs.forEach((input, index) =>
    add(
      `knowledge:${index}`,
      "knowledge_ref",
      `/knowledge_refs/${index}`,
      input,
      order.context_intent.required_knowledge_ref_digests.includes(input.digest),
    ),
  );
  order.prepared_evidence.forEach((input, index) =>
    add(
      `evidence:${index}`,
      "prepared_evidence",
      `/prepared_evidence/${index}`,
      input,
      input.role === order.role,
    ),
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

/** Retention is explicit process-local knowledge. A fresh process supplies no retained block set. */
export function resolveWorkOrderContextBlocks(opts: {
  order: AgentWorkOrderV2;
  manifest: WorkOrderContextManifest;
  optional_ids?: readonly string[];
  retained?: { source_digest: string; blocks: ReadonlyMap<string, string> };
}) {
  const expected = buildWorkOrderContextManifest(opts.order, opts.manifest.source_ref);
  if (digest(expected) !== digest(opts.manifest))
    throw new Error("WorkOrder context manifest is incomplete or stale");
  const requested = new Set(opts.optional_ids ?? []);
  if ([...requested].some((id) => !expected.blocks.some((block) => block.id === id)))
    throw new Error("Requested context block is not in the complete manifest");
  return expected.blocks
    .filter((block) => block.required || requested.has(block.id))
    .flatMap((block) => {
      const content = block.pointer
        .split("/")
        .slice(1)
        .reduce<unknown>((value, key) => {
          if (!value || typeof value !== "object" || !Object.hasOwn(value, key))
            throw new Error(`Required context block missing: ${block.id}`);
          return (value as Record<string, unknown>)[key];
        }, opts.order);
      if (digest(content) !== block.digest)
        throw new Error(`Required context block changed: ${block.id}`);
      if (
        opts.retained?.source_digest === expected.source_digest &&
        opts.retained.blocks.get(block.id) === block.digest
      )
        return [];
      return [{ ...block, content }];
    });
}
