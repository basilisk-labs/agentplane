import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { ConflictReworkPacket } from "./conflict-rework.js";
import { createHash } from "node:crypto";
import path from "node:path";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

type SemanticConflictContext = Omit<ConflictReworkPacket, "resolution_contract"> & {
  resolution_contract: Omit<ConflictReworkPacket["resolution_contract"], "revalidate_command">;
};

/** Carry canonical conflict evidence without delegating operator commands to the agent. */
export function conflictReworkSemanticInput(
  packet: SemanticConflictContext,
  authority: {
    task_id: string;
    checkout: string;
    head: string | null;
    writable_roots: string[];
  },
): AgentWorkOrderV2["required_inputs"][number] {
  const checkout = path.resolve(authority.checkout);
  if (
    packet.task_id !== authority.task_id ||
    path.resolve(packet.task_worktree.path) !== checkout ||
    packet.local.branch_head_sha !== authority.head ||
    packet.provider.head_sha !== authority.head ||
    packet.task_worktree.branch !== packet.provider.branch ||
    authority.writable_roots.length === 0 ||
    authority.writable_roots.some((root) => {
      const relative = path.relative(checkout, path.resolve(root));
      return (
        !path.isAbsolute(root) ||
        relative === ".." ||
        relative.startsWith(`..${path.sep}`) ||
        path.isAbsolute(relative)
      );
    })
  ) {
    throw new Error("Conflict context does not match the semantic task, checkout, head or scope.");
  }
  const resolutionContract = { ...packet.resolution_contract };
  Reflect.deleteProperty(resolutionContract, "revalidate_command");
  const description = JSON.stringify({
    packet: { ...packet, resolution_contract: resolutionContract },
    authority: {
      ...authority,
      checkout,
      writable_roots: authority.writable_roots.map(
        (root) => path.relative(checkout, root).replaceAll(path.sep, "/") || ".",
      ),
    },
  });
  return {
    id: "provider-conflict-context",
    kind: "source_artifact",
    description,
    digest: `sha256:${createHash("sha256").update(description).digest("hex")}`,
    required: true,
  };
}

export function resolveConflictReworkSemanticInput(
  authority: Parameters<typeof conflictReworkSemanticInput>[1] & {
    required_inputs: AgentWorkOrderV2["required_inputs"];
  },
): SemanticConflictContext | null {
  const inputs = authority.required_inputs.filter(
    (input) => input.id === "provider-conflict-context",
  );
  if (inputs.length === 0) return null;
  if (inputs.length !== 1) throw new Error("Conflict context must occur exactly once.");
  const input = inputs[0]!;
  const value: unknown = JSON.parse(input.description);
  if (!value || typeof value !== "object" || !("packet" in value)) {
    throw new Error("Conflict context is missing its canonical packet.");
  }
  const packet = value.packet as SemanticConflictContext;
  const expected = conflictReworkSemanticInput(packet, {
    task_id: authority.task_id,
    checkout: authority.checkout,
    head: authority.head,
    writable_roots: authority.writable_roots,
  });
  if (
    input.kind !== expected.kind ||
    input.required !== true ||
    input.description !== expected.description ||
    input.digest !== expected.digest
  ) {
    throw new Error("Conflict context does not match its issued authority and digest.");
  }
  return packet;
}

export function conflictReworkRequiredInputs(
  decision: TaskRouteDecision,
  authority: Omit<Parameters<typeof conflictReworkSemanticInput>[1], "checkout"> & {
    checkout: string | null;
  },
): AgentWorkOrderV2["required_inputs"] {
  if (decision.workflowStep.id !== "agent.provider_conflict_rework") return [];
  if (decision.conflictRework?.state !== "ready" || authority.checkout === null)
    throw new Error("Conflict episode requires a fresh canonical conflict packet.");
  return [
    conflictReworkSemanticInput(decision.conflictRework.packet, {
      ...authority,
      checkout: authority.checkout,
    }),
  ];
}
