import { createHash } from "node:crypto";

import type { RetrievalAdapter, RetrievalSignal } from "./task-knowledge-retrieval-query.js";

export const SEMANTIC_RETRIEVAL_SELECTION_LIMITS = {
  max_selector_episodes: 1,
  max_candidates: 12,
  max_selected_references: 12,
  max_input_tokens: 2048,
  max_output_tokens: 512,
  low_confidence_top_score: 0.7,
  conflicting_domain_score_delta: 0.1,
  broad_synthesis_signal_count: 4,
  broad_synthesis_candidate_count: 4,
  broad_synthesis_domain_count: 2,
} as const;

export type SemanticRetrievalEscalationReason =
  | "candidate_set_oversized"
  | "low_confidence"
  | "conflicting_domains"
  | "broad_synthesis";

export type SemanticRetrievalSelectionCandidate = {
  ref: string;
  digest: string;
  kind: "wiki" | "source" | "fact" | "entity" | "edge";
  retrieval: RetrievalAdapter;
  score: number;
  reasons: string[];
};

export type SemanticRetrievalSelectionWorkOrder = {
  schema_version: 1;
  kind: "task_knowledge_selection";
  selection_id: string;
  candidate_set_digest: string;
  trigger: {
    reasons: SemanticRetrievalEscalationReason[];
    inputs: {
      collected_candidate_count: number;
      materialized_candidate_count: number;
      top_score: number | null;
      near_top_domain_count: number;
      materialized_domain_count: number;
      distinct_query_signal_count: number;
    };
  };
  authority: {
    network: "deny";
    allowed_tool_classes: ["knowledge_read", "report_result", "report_blocker"];
    max_selector_episodes: number;
    max_candidates: number;
    max_selected_references: number;
    max_input_tokens: number;
    max_output_tokens: number;
  };
  candidates: SemanticRetrievalSelectionCandidate[];
};

export type SemanticRetrievalSelectorResponse = {
  schema_version: 1;
  kind: "task_knowledge_selection_result";
  candidate_set_digest: string;
  selected: { ref: string; digest: string }[];
  usage?: {
    episode_count?: number;
    input_tokens?: number;
    output_tokens?: number;
  };
};

/**
 * This callback is an invocation seam, not a provider integration. The caller
 * owns any provider episode and must enforce the work-order authority before
 * invoking it. Keeping the seam here prevents retrieval from creating a
 * second task-run lifecycle or granting network authority to the task agent.
 */
export type SemanticRetrievalSelector = (
  workOrder: SemanticRetrievalSelectionWorkOrder,
) => Promise<SemanticRetrievalSelectorResponse>;

type SelectorFailureCode =
  | "selector_unavailable"
  | "selector_failed"
  | "candidate_set_stale"
  | "invalid_selection"
  | "selector_budget_exceeded";

export type SemanticRetrievalEscalationReceipt = {
  state: "not_requested" | "selected" | "fallback";
  policy: {
    version: 1;
    inputs: SemanticRetrievalSelectionWorkOrder["trigger"]["inputs"];
    thresholds: {
      max_candidates: number;
      low_confidence_top_score: number;
      conflicting_domain_score_delta: number;
      broad_synthesis_signal_count: number;
      broad_synthesis_candidate_count: number;
      broad_synthesis_domain_count: number;
    };
  };
  work_order: SemanticRetrievalSelectionWorkOrder | null;
  selected: {
    source: "deterministic" | "semantic_selector";
    references: { ref: string; digest: string }[];
  };
  episode: {
    invoked: boolean;
    count: 0 | 1;
    input_tokens: number | null;
    output_tokens: number | null;
    total_tokens: number | null;
  };
  downstream_quality: {
    state: "not_observed";
    note: string;
  };
  comparison: {
    baseline: {
      escalation_rate: 0;
      episode_count: 0;
      total_tokens: null;
      selected_reference_count: number;
      downstream_quality_state: "not_observed";
    };
    observed: {
      escalation_rate: 0 | 1;
      episode_count: 0 | 1;
      total_tokens: number | null;
      selected_reference_count: number;
      downstream_quality_state: "not_observed";
    };
  };
  failure: { code: SelectorFailureCode } | null;
};

export type SemanticRetrievalSelectionResult = {
  candidates: SemanticRetrievalSelectionCandidate[];
  receipt: SemanticRetrievalEscalationReceipt;
};

function digest(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function domain(candidate: SemanticRetrievalSelectionCandidate): string {
  return candidate.kind;
}

function signalCount(queries: { signals: RetrievalSignal[] }[]): number {
  return new Set(queries.flatMap((query) => query.signals)).size;
}

function escalationReasons(opts: {
  candidates: SemanticRetrievalSelectionCandidate[];
  collected_candidate_count: number;
  queries: { signals: RetrievalSignal[] }[];
}): {
  reasons: SemanticRetrievalEscalationReason[];
  inputs: SemanticRetrievalSelectionWorkOrder["trigger"]["inputs"];
} {
  const topScore = opts.candidates[0]?.score ?? null;
  const nearTopDomains = new Set(
    topScore === null
      ? []
      : opts.candidates
          .filter(
            (candidate) =>
              candidate.score >=
              topScore - SEMANTIC_RETRIEVAL_SELECTION_LIMITS.conflicting_domain_score_delta,
          )
          .map((candidate) => domain(candidate)),
  );
  const distinctQuerySignalCount = signalCount(opts.queries);
  const materializedDomainCount = new Set(opts.candidates.map((candidate) => domain(candidate)))
    .size;
  const reasons: SemanticRetrievalEscalationReason[] = [];
  if (opts.collected_candidate_count > SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_candidates) {
    reasons.push("candidate_set_oversized");
  }
  if (
    topScore !== null &&
    topScore < SEMANTIC_RETRIEVAL_SELECTION_LIMITS.low_confidence_top_score
  ) {
    reasons.push("low_confidence");
  }
  if (nearTopDomains.size > 1) reasons.push("conflicting_domains");
  if (
    opts.candidates.length >= SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_candidate_count &&
    materializedDomainCount >= SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_domain_count &&
    distinctQuerySignalCount >= SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_signal_count
  ) {
    reasons.push("broad_synthesis");
  }
  return {
    reasons,
    inputs: {
      collected_candidate_count: opts.collected_candidate_count,
      materialized_candidate_count: opts.candidates.length,
      top_score: topScore,
      near_top_domain_count: nearTopDomains.size,
      materialized_domain_count: materializedDomainCount,
      distinct_query_signal_count: distinctQuerySignalCount,
    },
  };
}

function selectedReferences(candidates: SemanticRetrievalSelectionCandidate[]): {
  ref: string;
  digest: string;
}[] {
  return candidates.map(({ ref, digest: candidateDigest }) => ({ ref, digest: candidateDigest }));
}

function receipt(opts: {
  state: SemanticRetrievalEscalationReceipt["state"];
  inputs: SemanticRetrievalSelectionWorkOrder["trigger"]["inputs"];
  work_order: SemanticRetrievalSelectionWorkOrder | null;
  selected: SemanticRetrievalSelectionCandidate[];
  source: SemanticRetrievalEscalationReceipt["selected"]["source"];
  invoked: boolean;
  usage?: { input_tokens: number | null; output_tokens: number | null };
  failure?: SelectorFailureCode;
}): SemanticRetrievalEscalationReceipt {
  const inputTokens = opts.usage?.input_tokens ?? null;
  const outputTokens = opts.usage?.output_tokens ?? null;
  const totalTokens =
    inputTokens === null && outputTokens === null ? null : (inputTokens ?? 0) + (outputTokens ?? 0);
  const selected = selectedReferences(opts.selected);
  return {
    state: opts.state,
    policy: {
      version: 1,
      inputs: opts.inputs,
      thresholds: {
        max_candidates: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_candidates,
        low_confidence_top_score: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.low_confidence_top_score,
        conflicting_domain_score_delta:
          SEMANTIC_RETRIEVAL_SELECTION_LIMITS.conflicting_domain_score_delta,
        broad_synthesis_signal_count:
          SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_signal_count,
        broad_synthesis_candidate_count:
          SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_candidate_count,
        broad_synthesis_domain_count:
          SEMANTIC_RETRIEVAL_SELECTION_LIMITS.broad_synthesis_domain_count,
      },
    },
    work_order: opts.work_order,
    selected: { source: opts.source, references: selected },
    episode: {
      invoked: opts.invoked,
      count: opts.invoked ? 1 : 0,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_tokens: totalTokens,
    },
    downstream_quality: {
      state: "not_observed",
      note: "Selection provenance is recorded here; downstream task quality requires a separate evaluator observation.",
    },
    comparison: {
      baseline: {
        escalation_rate: 0,
        episode_count: 0,
        total_tokens: null,
        selected_reference_count: opts.inputs.materialized_candidate_count,
        downstream_quality_state: "not_observed",
      },
      observed: {
        escalation_rate: opts.invoked ? 1 : 0,
        episode_count: opts.invoked ? 1 : 0,
        total_tokens: totalTokens,
        selected_reference_count: selected.length,
        downstream_quality_state: "not_observed",
      },
    },
    failure: opts.failure ? { code: opts.failure } : null,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function usageFrom(response: unknown):
  | {
      ok: true;
      value: { input_tokens: number | null; output_tokens: number | null };
    }
  | {
      ok: false;
      failure: "invalid_selection" | "selector_budget_exceeded";
    } {
  if (!isRecord(response)) return { ok: false, failure: "invalid_selection" };
  const usage = response.usage;
  if (usage === undefined) return { ok: true, value: { input_tokens: null, output_tokens: null } };
  if (!isRecord(usage)) return { ok: false, failure: "invalid_selection" };
  const rawEpisodeCount = usage.episode_count;
  const rawInputTokens = usage.input_tokens;
  const rawOutputTokens = usage.output_tokens;
  if (
    (rawEpisodeCount !== undefined && typeof rawEpisodeCount !== "number") ||
    (rawInputTokens !== undefined && typeof rawInputTokens !== "number") ||
    (rawOutputTokens !== undefined && typeof rawOutputTokens !== "number")
  ) {
    return { ok: false, failure: "invalid_selection" };
  }
  const episodeCount = rawEpisodeCount ?? 1;
  const inputTokens = rawInputTokens ?? null;
  const outputTokens = rawOutputTokens ?? null;
  const validCount = episodeCount === 1;
  const validInput =
    inputTokens === null ||
    (Number.isSafeInteger(inputTokens) &&
      inputTokens >= 0 &&
      inputTokens <= SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_input_tokens);
  const validOutput =
    outputTokens === null ||
    (Number.isSafeInteger(outputTokens) &&
      outputTokens >= 0 &&
      outputTokens <= SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_output_tokens);
  return validCount && validInput && validOutput
    ? { ok: true, value: { input_tokens: inputTokens, output_tokens: outputTokens } }
    : { ok: false, failure: "selector_budget_exceeded" };
}

function selectedCandidates(opts: {
  response: unknown;
  work_order: SemanticRetrievalSelectionWorkOrder;
}):
  | { ok: true; value: SemanticRetrievalSelectionCandidate[] }
  | {
      ok: false;
      failure: "candidate_set_stale" | "invalid_selection";
    } {
  if (!isRecord(opts.response)) return { ok: false, failure: "invalid_selection" };
  if (typeof opts.response.candidate_set_digest !== "string") {
    return { ok: false, failure: "invalid_selection" };
  }
  if (opts.response.candidate_set_digest !== opts.work_order.candidate_set_digest) {
    return { ok: false, failure: "candidate_set_stale" };
  }
  if (
    opts.response.schema_version !== 1 ||
    opts.response.kind !== "task_knowledge_selection_result" ||
    !Array.isArray(opts.response.selected) ||
    opts.response.selected.length === 0 ||
    opts.response.selected.length > opts.work_order.authority.max_selected_references ||
    !opts.response.selected.every(
      (item) => isRecord(item) && typeof item.ref === "string" && typeof item.digest === "string",
    )
  ) {
    return { ok: false, failure: "invalid_selection" };
  }
  const byIdentity = new Map(
    opts.work_order.candidates.map((candidate) => [
      `${candidate.ref}\u0000${candidate.digest}`,
      candidate,
    ]),
  );
  const selectedReferences = opts.response.selected as { ref: string; digest: string }[];
  const selected = selectedReferences.map((item) =>
    byIdentity.get(`${item.ref}\u0000${item.digest}`),
  );
  if (selected.some((candidate) => !candidate)) return { ok: false, failure: "invalid_selection" };
  const identities = selectedReferences.map((item) => `${item.ref}\u0000${item.digest}`);
  if (new Set(identities).size !== identities.length)
    return { ok: false, failure: "invalid_selection" };
  return { ok: true, value: selected as SemanticRetrievalSelectionCandidate[] };
}

export async function selectSemanticRetrievalCandidates(opts: {
  candidates: SemanticRetrievalSelectionCandidate[];
  collected_candidate_count: number;
  queries: { signals: RetrievalSignal[] }[];
  selector?: SemanticRetrievalSelector;
}): Promise<SemanticRetrievalSelectionResult> {
  const deterministic = opts.candidates;
  const escalation = escalationReasons(opts);
  if (escalation.reasons.length === 0) {
    return {
      candidates: deterministic,
      receipt: receipt({
        state: "not_requested",
        inputs: escalation.inputs,
        work_order: null,
        selected: deterministic,
        source: "deterministic",
        invoked: false,
      }),
    };
  }
  const candidateSetDigest = digest(
    deterministic.map((candidate) => ({
      ref: candidate.ref,
      digest: candidate.digest,
      retrieval: candidate.retrieval,
      score: candidate.score,
    })),
  );
  const workOrder: SemanticRetrievalSelectionWorkOrder = {
    schema_version: 1,
    kind: "task_knowledge_selection",
    selection_id: `knowledge-selection-${candidateSetDigest.slice("sha256:".length, 24)}`,
    candidate_set_digest: candidateSetDigest,
    trigger: { reasons: escalation.reasons, inputs: escalation.inputs },
    authority: {
      network: "deny",
      allowed_tool_classes: ["knowledge_read", "report_result", "report_blocker"],
      max_selector_episodes: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_selector_episodes,
      max_candidates: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_candidates,
      max_selected_references: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_selected_references,
      max_input_tokens: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_input_tokens,
      max_output_tokens: SEMANTIC_RETRIEVAL_SELECTION_LIMITS.max_output_tokens,
    },
    candidates: deterministic,
  };
  if (!opts.selector) {
    return {
      candidates: deterministic,
      receipt: receipt({
        state: "fallback",
        inputs: escalation.inputs,
        work_order: workOrder,
        selected: deterministic,
        source: "deterministic",
        invoked: false,
        failure: "selector_unavailable",
      }),
    };
  }
  let response: unknown;
  try {
    response = await opts.selector(workOrder);
  } catch {
    return {
      candidates: deterministic,
      receipt: receipt({
        state: "fallback",
        inputs: escalation.inputs,
        work_order: workOrder,
        selected: deterministic,
        source: "deterministic",
        invoked: true,
        failure: "selector_failed",
      }),
    };
  }
  const usage = usageFrom(response);
  if (!usage.ok) {
    return {
      candidates: deterministic,
      receipt: receipt({
        state: "fallback",
        inputs: escalation.inputs,
        work_order: workOrder,
        selected: deterministic,
        source: "deterministic",
        invoked: true,
        failure: usage.failure,
      }),
    };
  }
  const selection = selectedCandidates({ response, work_order: workOrder });
  if (!selection.ok) {
    return {
      candidates: deterministic,
      receipt: receipt({
        state: "fallback",
        inputs: escalation.inputs,
        work_order: workOrder,
        selected: deterministic,
        source: "deterministic",
        invoked: true,
        usage: usage.value,
        failure: selection.failure,
      }),
    };
  }
  return {
    candidates: selection.value,
    receipt: receipt({
      state: "selected",
      inputs: escalation.inputs,
      work_order: workOrder,
      selected: selection.value,
      source: "semantic_selector",
      invoked: true,
      usage: usage.value,
    }),
  };
}
