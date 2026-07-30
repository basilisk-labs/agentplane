import { createHash } from "node:crypto";

import {
  validateAgentSemanticResult,
  type AgentSemanticResultKnowledgeRequest,
  type AgentWorkOrderV2,
  type KnowledgeRef,
  type PreparedKnowledgeExcerpt,
} from "@agentplaneorg/core/schemas";

import { prepareKnowledgeExcerpt } from "../../context/knowledge-ref.js";
import { readContextProjection, searchContextProjection } from "../../context/reindex.js";
import {
  canonicalKnowledgePath,
  matchTaskContextReferences,
  materializableKnowledgeRef,
  projectionScopes,
  taskContextReferences,
  uniqueKnowledgeRefs,
} from "./task-knowledge-request-scope.js";

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
      | "repeated_unresolved";
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

function digest(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function requestDigest(request: AgentSemanticResultKnowledgeRequest): string {
  return digest({
    schema_version: request.schema_version,
    kind: request.kind,
    query: request.query,
    reason: request.reason,
    desired_kind: request.desired_kind,
    scope: request.scope,
    blocking: request.blocking,
  });
}

function approximateTokens(value: string): number {
  return Math.ceil(Buffer.byteLength(value, "utf8") / 4);
}

function compactQuery(value: string): string | null {
  const normalized = value
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .match(/[\p{L}\p{N}_]+/gu)
    ?.join(" ")
    .trim();
  if (
    !normalized ||
    normalized.length > 160 ||
    normalized.split(" ").length > TASK_KNOWLEDGE_REQUEST_POLICY.max_query_terms
  ) {
    return null;
  }
  return normalized;
}

function sealedResponse(
  response: Omit<TaskKnowledgeRequestResponse, "schema_version" | "kind" | "digest">,
): TaskKnowledgeRequestResponse {
  const base = {
    schema_version: 1 as const,
    kind: "task_knowledge_response" as const,
    ...response,
  };
  return { ...base, digest: digest(base) };
}

function auditBase(opts: {
  invocation: KnowledgeRequestInvocation;
  work_order: Pick<AgentWorkOrderV2, "role">;
  round: number;
  request_digest: string | null;
}): Omit<
  TaskKnowledgeRequestResponse,
  | "schema_version"
  | "kind"
  | "digest"
  | "outcome"
  | "omissions"
  | "usage"
  | "blocker"
  | "knowledge_refs"
  | "prepared_evidence"
> {
  return {
    run: { ...opts.invocation, role: opts.work_order.role },
    round: opts.round,
    request_digest: opts.request_digest,
  };
}

function response(opts: {
  invocation: KnowledgeRequestInvocation;
  work_order: Pick<AgentWorkOrderV2, "role">;
  round: number;
  request_digest: string | null;
  outcome: TaskKnowledgeRequestAuditOutcome;
  omissions: TaskKnowledgeRequestResponse["omissions"];
  request_tokens?: number;
  response_tokens?: number;
  knowledge_refs?: KnowledgeRef[];
  prepared_evidence?: PreparedKnowledgeExcerpt[];
  blocker?: TaskKnowledgeRequestResponse["blocker"];
}): TaskKnowledgeRequestResponse {
  return sealedResponse({
    ...auditBase(opts),
    outcome: opts.outcome,
    knowledge_refs: opts.knowledge_refs ?? [],
    prepared_evidence: opts.prepared_evidence ?? [],
    omissions: opts.omissions,
    usage: {
      estimated_request_tokens: opts.request_tokens ?? 0,
      estimated_response_tokens: opts.response_tokens ?? 0,
      max_response_tokens: TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens,
    },
    blocker: opts.blocker ?? null,
  });
}

function responseMatchesBinding(opts: {
  audit: TaskKnowledgeRequestAudit;
  invocation: KnowledgeRequestInvocation;
}): boolean {
  return (
    opts.audit.run.work_order_id === opts.invocation.work_order_id &&
    opts.audit.run.state_fingerprint_digest === opts.invocation.state_fingerprint_digest
  );
}

/**
 * The CLI calls this after an agent returns a typed request. It is deliberately
 * independent of a provider adapter: RF-23 owns the in-episode tool transport.
 */
export async function serveTaskKnowledgeRequest(opts: {
  repository_root: string;
  invocation: KnowledgeRequestInvocation;
  work_order: Pick<
    AgentWorkOrderV2,
    "work_order_id" | "role" | "state_fingerprint" | "authority" | "knowledge_refs"
  >;
  semantic_result: unknown;
  prior_audits?: readonly TaskKnowledgeRequestAudit[];
}): Promise<TaskKnowledgeRequestResponse> {
  let semantic;
  try {
    semantic = validateAgentSemanticResult(opts.semantic_result);
  } catch {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round: 1,
      request_digest: null,
      outcome: "denied",
      omissions: [
        {
          code: "invalid_semantic_result",
          detail: "The agent result is not a valid AgentSemanticResult v2 knowledge request.",
        },
      ],
    });
  }
  const request = "knowledge_request" in semantic ? semantic.knowledge_request : undefined;
  const prior = (opts.prior_audits ?? []).filter((audit) =>
    responseMatchesBinding({ audit, invocation: opts.invocation }),
  );
  const round = prior.length + 1;
  if (
    semantic.work_order_id !== opts.invocation.work_order_id ||
    semantic.work_order_id !== opts.work_order.work_order_id
  ) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: null,
      outcome: "denied",
      omissions: [
        {
          code: "work_order_mismatch",
          detail: "The agent result is not bound to the current work order.",
        },
      ],
    });
  }
  if (opts.work_order.state_fingerprint.digest !== opts.invocation.state_fingerprint_digest) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: request ? requestDigest(request) : null,
      outcome: "denied",
      omissions: [
        {
          code: "state_fingerprint_mismatch",
          detail: "The supplied work order does not match the invocation state fingerprint.",
        },
      ],
    });
  }
  if (opts.work_order.role !== "EXECUTOR" && opts.work_order.role !== "EVALUATOR") {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: request ? requestDigest(request) : null,
      outcome: "denied",
      omissions: [
        {
          code: "role_forbidden",
          detail: "Only EXECUTOR and EVALUATOR work orders may request knowledge.",
        },
      ],
    });
  }
  if (!opts.work_order.authority.allowed_tool_classes.includes("knowledge_request")) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: request ? requestDigest(request) : null,
      outcome: "denied",
      omissions: [
        {
          code: "knowledge_request_not_authorized",
          detail: "The current work order does not grant the knowledge_request tool class.",
        },
      ],
    });
  }
  if (!request) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: null,
      outcome: "denied",
      omissions: [
        {
          code: "invalid_semantic_result",
          detail: "The semantic result did not include a typed knowledge_request.",
        },
      ],
    });
  }
  const allowedContext = taskContextReferences(opts.work_order).filter(
    (knowledge) => canonicalKnowledgePath(knowledge.ref) !== null,
  );
  if (allowedContext.length === 0) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestDigest(request),
      outcome: "denied",
      omissions: [
        {
          code: "task_context_unavailable",
          detail: "The current work order contains no digest-valid task context to search.",
        },
      ],
    });
  }
  const requestId = requestDigest(request);
  const requestTokens = approximateTokens(`${request.query}\n${request.reason}`);
  if (round > TASK_KNOWLEDGE_REQUEST_POLICY.max_rounds) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: "denied",
      request_tokens: requestTokens,
      omissions: [
        {
          code: "round_budget_exhausted",
          detail: `The run already consumed ${TASK_KNOWLEDGE_REQUEST_POLICY.max_rounds} knowledge rounds.`,
        },
      ],
      blocker: request.blocking
        ? {
            summary: "Knowledge request round budget is exhausted.",
            recommended_action: "Return control to the parent workflow for escalation.",
          }
        : null,
    });
  }
  const repeatedUnresolved = prior.some(
    (audit) => audit.request_digest === requestId && audit.outcome === "unresolved",
  );
  if (repeatedUnresolved && request.blocking) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: "escalated",
      request_tokens: requestTokens,
      omissions: [
        {
          code: "repeated_unresolved",
          detail: "The same blocking knowledge request was unresolved in an earlier round.",
        },
      ],
      blocker: {
        summary: "A blocking knowledge request remains unresolved after a deduplicated retry.",
        recommended_action:
          "Escalate the missing canonical context to a human or CURATOR decision.",
      },
    });
  }
  const query = compactQuery(request.query);
  if (!query) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: "denied",
      request_tokens: requestTokens,
      omissions: [
        {
          code: "query_invalid",
          detail: `Query must contain at most ${TASK_KNOWLEDGE_REQUEST_POLICY.max_query_terms} normalized terms.`,
        },
      ],
    });
  }
  const projection = await readContextProjection(opts.repository_root);
  if (!projection) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: "unresolved",
      request_tokens: requestTokens,
      omissions: [
        {
          code: "projection_unavailable",
          detail: "The bounded context projection is unavailable for this request.",
        },
      ],
    });
  }

  let outOfScopeCandidateCount = 0;
  const omissions: TaskKnowledgeRequestResponse["omissions"] = [];
  const references: KnowledgeRef[] = [];
  const excerpts: PreparedKnowledgeExcerpt[] = [];
  let responseTokens = 0;
  const processed = new Set<string>();
  let offset = 0;
  let matchedScopedCandidate = false;
  while (
    references.length < TASK_KNOWLEDGE_REQUEST_POLICY.max_references &&
    responseTokens < TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens
  ) {
    const search = await searchContextProjection(opts.repository_root, {
      query,
      scopes: projectionScopes(request),
      limit: TASK_KNOWLEDGE_REQUEST_POLICY.max_references,
      offset,
    });
    if (!search) {
      return response({
        invocation: opts.invocation,
        work_order: opts.work_order,
        round,
        request_digest: requestId,
        outcome: "unresolved",
        request_tokens: requestTokens,
        response_tokens: responseTokens,
        omissions: [
          ...omissions,
          {
            code: "projection_unavailable",
            detail: "The bounded context projection became unavailable during this request.",
          },
        ],
      });
    }
    if (search.rows.length === 0) break;
    offset += search.rows.length;
    const pageRefs = uniqueKnowledgeRefs(
      search.rows
        .flatMap((row) => [row.path, ...(row.source_refs ?? [])])
        .map((ref) => materializableKnowledgeRef(ref)),
    );
    const matched = matchTaskContextReferences({
      candidate_refs: pageRefs,
      task_context: allowedContext,
      desired_kind: request.desired_kind,
    });
    outOfScopeCandidateCount += matched.out_of_scope_candidate_count;
    for (const knowledgeRef of matched.matches) {
      const identity = `${knowledgeRef.ref}\u0000${knowledgeRef.digest}`;
      if (processed.has(identity)) continue;
      processed.add(identity);
      matchedScopedCandidate = true;
      const remainingTokens = TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens - responseTokens;
      if (remainingTokens <= 0) break;
      const excerpt = await prepareKnowledgeExcerpt({
        repository_root: opts.repository_root,
        knowledge_ref: knowledgeRef,
        index_snapshot: projection,
        max_bytes: Math.min(
          TASK_KNOWLEDGE_REQUEST_POLICY.max_excerpt_bytes,
          Math.max(1, remainingTokens * 4),
        ),
        max_lines: TASK_KNOWLEDGE_REQUEST_POLICY.max_excerpt_lines,
      });
      if (excerpt.status !== "included") {
        omissions.push({
          code: "excerpt_not_included",
          detail:
            `Digest-bound KnowledgeRef ${knowledgeRef.ref} was not included ` +
            `(${excerpt.status}:${excerpt.reason_code}).`,
        });
        continue;
      }
      const excerptTokens = approximateTokens(excerpt.content);
      if (excerptTokens > remainingTokens) {
        omissions.push({
          code: "excerpt_not_included",
          detail: `KnowledgeRef ${knowledgeRef.ref} would exceed the response token budget.`,
        });
        continue;
      }
      references.push(knowledgeRef);
      excerpts.push(excerpt);
      responseTokens += excerptTokens;
      if (
        references.length >= TASK_KNOWLEDGE_REQUEST_POLICY.max_references ||
        responseTokens >= TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens
      ) {
        break;
      }
      if (
        references.length >= TASK_KNOWLEDGE_REQUEST_POLICY.max_references ||
        responseTokens >= TASK_KNOWLEDGE_REQUEST_POLICY.max_response_tokens
      ) {
        break;
      }
    }
    if (search.rows.length < TASK_KNOWLEDGE_REQUEST_POLICY.max_references) break;
  }
  if (references.length === 0) {
    return response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: !matchedScopedCandidate && outOfScopeCandidateCount > 0 ? "denied" : "unresolved",
      request_tokens: requestTokens,
      response_tokens: responseTokens,
      omissions:
        omissions.length > 0
          ? omissions
          : [
              {
                code:
                  !matchedScopedCandidate && outOfScopeCandidateCount > 0
                    ? "reference_outside_task_context"
                    : "no_match",
                detail:
                  !matchedScopedCandidate && outOfScopeCandidateCount > 0
                    ? "Search results were outside the digest-bound task context."
                    : "No scoped search result resolved to a canonical KnowledgeRef.",
              },
            ],
    });
  }
  return response({
    invocation: opts.invocation,
    work_order: opts.work_order,
    round,
    request_digest: requestId,
    outcome: "served",
    request_tokens: requestTokens,
    response_tokens: responseTokens,
    knowledge_refs: references,
    prepared_evidence: excerpts,
    omissions,
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
    responseDigest !== digest(unsigned)
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
  if (response.usage.estimated_response_tokens > response.usage.max_response_tokens) {
    throw new Error("Knowledge request response exceeded its token budget.");
  }
  return response;
}

export {
  loadTaskKnowledgeRequestAudits,
  persistTaskKnowledgeRequestAudit,
  taskKnowledgeRequestAuditPath,
  TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY,
} from "./task-knowledge-request-audit.js";
