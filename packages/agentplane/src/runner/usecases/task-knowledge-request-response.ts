import type {
  AgentWorkOrderV2,
  KnowledgeRef,
  PreparedKnowledgeExcerpt,
} from "@agentplaneorg/core/schemas";

import { digestJson, serializedResponseTokens } from "./task-knowledge-request-codec.js";

export const TASK_KNOWLEDGE_REQUEST_POLICY = {
  schema_version: 1,
  max_rounds: 2,
  max_references: 6,
  max_excerpt_bytes: 2048,
  max_excerpt_lines: 60,
  max_response_tokens: 1024,
  max_query_terms: 16,
} as const;

export type TaskKnowledgeRequestAuditOutcome = "served" | "unresolved" | "denied" | "escalated";

export type TaskKnowledgeRequestResponse = {
  schema_version: 1;
  kind: "task_knowledge_response";
  run: {
    run_id: string;
    work_order_id: string;
    state_fingerprint_digest: string;
    role: AgentWorkOrderV2["role"];
  };
  round: number;
  request_digest: string | null;
  outcome: TaskKnowledgeRequestAuditOutcome;
  knowledge_refs: KnowledgeRef[];
  prepared_evidence: PreparedKnowledgeExcerpt[];
  omissions: {
    code:
      | "invalid_semantic_result"
      | "work_order_mismatch"
      | "state_fingerprint_mismatch"
      | "role_forbidden"
      | "knowledge_request_not_authorized"
      | "round_budget_exhausted"
      | "query_invalid"
      | "projection_unavailable"
      | "no_match"
      | "task_context_unavailable"
      | "reference_outside_task_context"
      | "reference_not_materializable"
      | "excerpt_not_included"
      | "repeated_unresolved"
      | "reservation_unavailable";
    detail: string;
  }[];
  usage: {
    estimated_request_tokens: number;
    estimated_response_tokens: number;
    max_response_tokens: number;
  };
  blocker: {
    summary: string;
    recommended_action: string | null;
  } | null;
  digest: string;
};

export type TaskKnowledgeRequestAudit = TaskKnowledgeRequestResponse;

type KnowledgeRequestInvocation = {
  run_id: string;
  work_order_id: string;
  state_fingerprint_digest: string;
};

function sealedResponse(
  response: Omit<TaskKnowledgeRequestResponse, "schema_version" | "kind" | "digest">,
): TaskKnowledgeRequestResponse {
  const unsigned = {
    schema_version: 1 as const,
    kind: "task_knowledge_response" as const,
    ...response,
    usage: { ...response.usage, estimated_response_tokens: 0 },
  };
  const tokenCount = serializedResponseTokens({
    response: unsigned,
    seal: (base) => ({ ...base, digest: digestJson(base) }),
  });
  const base = {
    ...unsigned,
    usage: { ...unsigned.usage, estimated_response_tokens: tokenCount },
  };
  return { ...base, digest: digestJson(base) };
}

export function createTaskKnowledgeRequestResponse(opts: {
  invocation: KnowledgeRequestInvocation;
  work_order: Pick<AgentWorkOrderV2, "role">;
  round: number;
  request_digest: string | null;
  outcome: TaskKnowledgeRequestAuditOutcome;
  omissions: TaskKnowledgeRequestResponse["omissions"];
  request_tokens?: number;
  knowledge_refs?: KnowledgeRef[];
  prepared_evidence?: PreparedKnowledgeExcerpt[];
  blocker?: TaskKnowledgeRequestResponse["blocker"];
}): TaskKnowledgeRequestResponse {
  return sealedResponse({
    run: { ...opts.invocation, role: opts.work_order.role },
    round: opts.round,
    request_digest: opts.request_digest,
    outcome: opts.outcome,
    knowledge_refs: opts.knowledge_refs ?? [],
    prepared_evidence: opts.prepared_evidence ?? [],
    omissions: opts.omissions,
    usage: {
      estimated_request_tokens: opts.request_tokens ?? 0,
      estimated_response_tokens: 0,
      max_response_tokens: TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens,
    },
    blocker: opts.blocker ?? null,
  });
}

export function validateTaskKnowledgeRequestResponse(
  responseValue: unknown,
): TaskKnowledgeRequestResponse {
  if (!responseValue || typeof responseValue !== "object" || Array.isArray(responseValue)) {
    throw new Error("Knowledge request response must be an object.");
  }
  const response = responseValue as TaskKnowledgeRequestResponse;
  const { digest: responseDigest, ...unsigned } = response;
  if (
    response.schema_version !== 1 ||
    response.kind !== "task_knowledge_response" ||
    typeof responseDigest !== "string" ||
    responseDigest !== digestJson(unsigned)
  ) {
    throw new Error("Knowledge request response digest or version is invalid.");
  }
  const identities = response.knowledge_refs.map((ref) => `${ref.ref}\u0000${ref.digest}`);
  if (new Set(identities).size !== identities.length) {
    throw new Error("Knowledge request response contains duplicate knowledge references.");
  }
  const excerptIdentities = response.prepared_evidence.map(
    (excerpt) => `${excerpt.knowledge_ref.ref}\u0000${excerpt.knowledge_ref.digest}`,
  );
  if (!excerptIdentities.every((identity) => identities.includes(identity))) {
    throw new Error(
      "Knowledge request response excerpt is not paired with a returned KnowledgeRef.",
    );
  }
  if (response.prepared_evidence.some((excerpt) => excerpt.status !== "included")) {
    throw new Error("Knowledge request response may contain only included excerpts.");
  }
  const measuredResponseTokens = serializedResponseTokens({
    response: {
      ...unsigned,
      usage: { ...unsigned.usage, estimated_response_tokens: 0 },
    },
    seal: (base) => ({ ...base, digest: digestJson(base) }),
  });
  if (
    response.usage.estimated_response_tokens !== measuredResponseTokens ||
    response.usage.estimated_response_tokens > response.usage.max_response_tokens
  ) {
    throw new Error("Knowledge request response exceeded its token budget.");
  }
  return response;
}
