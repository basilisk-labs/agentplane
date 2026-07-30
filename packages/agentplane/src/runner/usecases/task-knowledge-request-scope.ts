import {
  parseCanonicalKnowledgeRef,
  type AgentSemanticResultKnowledgeRequest,
  type AgentWorkOrderV2,
  type KnowledgeRef,
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
 * `task_context` is the preselected, digest-bound context in the current work
 * order. Keep the full reference, including its digest and selector: a
 * canonical path is sufficient for search filtering, but not for authority to
 * rematerialize evidence with a new digest.
 */
export function taskContextReferences(
  workOrder: Pick<AgentWorkOrderV2, "knowledge_refs">,
): readonly KnowledgeRef[] {
  return workOrder.knowledge_refs;
}

export function canonicalKnowledgeKind(ref: string): KnowledgeRef["kind"] | null {
  try {
    const parsed = parseCanonicalKnowledgeRef(ref);
    if (parsed.path.startsWith("context/wiki/")) return "wiki";
    if (parsed.path.startsWith("context/raw/")) return "source";
    if (parsed.selector?.key === "fact") return "fact";
    if (parsed.selector?.key === "entity") return "entity";
    if (parsed.selector?.key === "edge") return "edge";
  } catch {
    return null;
  }
  return null;
}

export function matchTaskContextReferences(opts: {
  candidate_refs: readonly string[];
  task_context: readonly KnowledgeRef[];
  desired_kind: AgentSemanticResultKnowledgeRequest["desired_kind"];
}): { matches: KnowledgeRef[]; out_of_scope_candidate_count: number } {
  let outOfScopeCandidateCount = 0;
  const matches = opts.candidate_refs.flatMap((candidateRef) => {
    const candidatePath = canonicalKnowledgePath(candidateRef);
    const matchingContext = opts.task_context.filter(
      (knowledge) =>
        canonicalKnowledgePath(knowledge.ref) === candidatePath &&
        (opts.desired_kind === "any" || knowledge.kind === opts.desired_kind),
    );
    if (matchingContext.length > 0) return matchingContext;
    const candidateKind = canonicalKnowledgeKind(candidateRef);
    if (!candidateKind || opts.desired_kind === "any" || candidateKind === opts.desired_kind) {
      outOfScopeCandidateCount += 1;
    }
    return [];
  });
  return { matches, out_of_scope_candidate_count: outOfScopeCandidateCount };
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
