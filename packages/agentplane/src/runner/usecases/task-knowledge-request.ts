import {
  validateAgentSemanticResult,
  type AgentWorkOrderV2,
  type KnowledgeRef,
  type PreparedKnowledgeExcerpt,
} from "@agentplaneorg/core/schemas";

import { prepareKnowledgeExcerpt } from "../../context/knowledge-ref.js";
import { readContextProjection, searchContextProjection } from "../../context/reindex.js";
import { approximateTokens, compactQuery, requestDigest } from "./task-knowledge-request-codec.js";
import {
  createTaskKnowledgeRequestResponse,
  TASK_KNOWLEDGE_REQUEST_POLICY,
  type TaskKnowledgeRequestAudit,
  type TaskKnowledgeRequestResponse,
} from "./task-knowledge-request-response.js";
import {
  canonicalKnowledgePath,
  matchTaskContextReferences,
  materializableKnowledgeRef,
  projectionScopes,
  taskContextReferences,
  uniqueKnowledgeRefs,
} from "./task-knowledge-request-scope.js";

type KnowledgeRequestInvocation = {
  run_id: string;
  work_order_id: string;
  state_fingerprint_digest: string;
};

const response = createTaskKnowledgeRequestResponse;

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
  const query = compactQuery(request.query, TASK_KNOWLEDGE_REQUEST_POLICY.max_query_terms);
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
  const appendBoundedOmission = (omission: TaskKnowledgeRequestResponse["omissions"][number]) => {
    const candidate = response({
      invocation: opts.invocation,
      work_order: opts.work_order,
      round,
      request_digest: requestId,
      outcome: "unresolved",
      request_tokens: requestTokens,
      knowledge_refs: references,
      prepared_evidence: excerpts,
      omissions: [...omissions, omission],
    });
    if (candidate.usage.estimated_response_tokens > candidate.usage.max_response_tokens) return;
    omissions.push(omission);
    responseTokens = candidate.usage.estimated_response_tokens;
  };
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
      const excerpt = await prepareKnowledgeExcerpt({
        repository_root: opts.repository_root,
        knowledge_ref: knowledgeRef,
        index_snapshot: projection,
        max_bytes: TASK_KNOWLEDGE_REQUEST_POLICY.max_excerpt_bytes,
        max_lines: TASK_KNOWLEDGE_REQUEST_POLICY.max_excerpt_lines,
      });
      if (excerpt.status !== "included") {
        appendBoundedOmission({
          code: "excerpt_not_included",
          detail:
            `Digest-bound KnowledgeRef ${knowledgeRef.ref} was not included ` +
            `(${excerpt.status}:${excerpt.reason_code}).`,
        });
        continue;
      }
      const candidate = response({
        invocation: opts.invocation,
        work_order: opts.work_order,
        round,
        request_digest: requestId,
        outcome: "served",
        request_tokens: requestTokens,
        knowledge_refs: [...references, knowledgeRef],
        prepared_evidence: [...excerpts, excerpt],
        omissions,
      });
      if (candidate.usage.estimated_response_tokens > candidate.usage.max_response_tokens) {
        appendBoundedOmission({
          code: "excerpt_not_included",
          detail: `KnowledgeRef ${knowledgeRef.ref} would exceed the complete response token budget.`,
        });
        continue;
      }
      references.push(knowledgeRef);
      excerpts.push(excerpt);
      responseTokens = candidate.usage.estimated_response_tokens;
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
    knowledge_refs: references,
    prepared_evidence: excerpts,
    omissions,
  });
}

export {
  loadTaskKnowledgeRequestAudits,
  persistTaskKnowledgeRequestAudit,
  taskKnowledgeRequestReservationUnavailableResponse,
  taskKnowledgeRequestAuditPath,
  TASK_KNOWLEDGE_REQUEST_AUDIT_DIRECTORY,
  withTaskKnowledgeRequestAuditReservation,
} from "./task-knowledge-request-audit.js";
export {
  createTaskKnowledgeRequestResponse,
  TASK_KNOWLEDGE_REQUEST_POLICY,
  validateTaskKnowledgeRequestResponse,
} from "./task-knowledge-request-response.js";
export type {
  TaskKnowledgeRequestAudit,
  TaskKnowledgeRequestAuditOutcome,
  TaskKnowledgeRequestResponse,
} from "./task-knowledge-request-response.js";
