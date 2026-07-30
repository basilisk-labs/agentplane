import {
  parseCanonicalKnowledgeRef,
  type AgentSemanticResultKnowledgeRequest,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

export function canonicalKnowledgePath(ref: string): string | null {
  try {
    return parseCanonicalKnowledgeRef(ref).path;
  } catch {
    return null;
  }
}

export function materializableKnowledgeRef(ref: string): string {
  try {
    const parsed = parseCanonicalKnowledgeRef(ref);
    return parsed.path.startsWith("context/wiki/") || parsed.path.startsWith("context/raw/")
      ? parsed.path
      : ref;
  } catch {
    return ref;
  }
}

export function uniqueKnowledgeRefs(values: string[]): string[] {
  return [...new Set(values)].toSorted((left, right) => left.localeCompare(right));
}

/**
 * `task_context` is the preselected, digest-bound context in the current
 * work order. It is deliberately not a repository-wide FTS permission.
 */
export function taskContextPaths(
  workOrder: Pick<AgentWorkOrderV2, "knowledge_refs">,
): ReadonlySet<string> {
  return new Set(
    workOrder.knowledge_refs.flatMap((knowledge) => {
      const canonical = canonicalKnowledgePath(knowledge.ref);
      return canonical ? [canonical] : [];
    }),
  );
}

export function projectionScopes(
  request: AgentSemanticResultKnowledgeRequest,
): ("wiki" | "facts" | "graph" | "raw")[] {
  if (request.desired_kind === "wiki") return ["wiki"];
  if (request.desired_kind === "source") return ["raw"];
  if (request.desired_kind === "fact") return ["facts"];
  if (request.desired_kind === "entity" || request.desired_kind === "edge") return ["graph"];
  return ["wiki", "facts", "graph", "raw"];
}
