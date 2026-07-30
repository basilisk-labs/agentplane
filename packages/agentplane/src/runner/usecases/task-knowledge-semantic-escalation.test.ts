import { describe, expect, it, vi } from "vitest";

import {
  selectSemanticRetrievalCandidates,
  type SemanticRetrievalEscalationReason,
  type SemanticRetrievalSelectionCandidate,
  type SemanticRetrievalSelectionWorkOrder,
} from "./task-knowledge-semantic-escalation.js";

function candidate(opts: {
  id: string;
  score?: number;
  kind?: SemanticRetrievalSelectionCandidate["kind"];
}): SemanticRetrievalSelectionCandidate {
  return {
    ref: `context/wiki/${opts.id}.md`,
    digest: `sha256:${opts.id}`,
    kind: opts.kind ?? "wiki",
    retrieval: "exact",
    score: opts.score ?? 1,
    reasons: ["golden_fixture"],
  };
}

function response(
  workOrder: SemanticRetrievalSelectionWorkOrder,
  selected = workOrder.candidates.slice(0, 1),
) {
  return {
    schema_version: 1 as const,
    kind: "task_knowledge_selection_result" as const,
    candidate_set_digest: workOrder.candidate_set_digest,
    selected: selected.map(({ ref, digest }) => ({ ref, digest })),
    usage: { episode_count: 1, input_tokens: 120, output_tokens: 20 },
  };
}

describe("selectSemanticRetrievalCandidates", () => {
  it("keeps a high-confidence bounded retrieval deterministic without a selector episode", async () => {
    const selector = vi.fn();
    const result = await selectSemanticRetrievalCandidates({
      candidates: [candidate({ id: "high-confidence" })],
      collected_candidate_count: 1,
      queries: [{ signals: ["path"] }],
      selector,
    });

    expect(selector).not.toHaveBeenCalled();
    expect(result.receipt).toMatchObject({
      state: "not_requested",
      work_order: null,
      episode: { invoked: false, count: 0 },
      comparison: {
        baseline: { escalation_rate: 0, episode_count: 0 },
        observed: { escalation_rate: 0, episode_count: 0 },
      },
    });
    expect(result.candidates).toEqual([candidate({ id: "high-confidence" })]);
  });

  it.each([
    {
      name: "oversized candidate set",
      candidates: Array.from({ length: 12 }, (_, index) => candidate({ id: `size-${index}` })),
      collected_candidate_count: 13,
      queries: [{ signals: ["path"] }],
      reason: "candidate_set_oversized",
    },
    {
      name: "low-confidence candidate set",
      candidates: [candidate({ id: "low", score: 0.6 })],
      collected_candidate_count: 1,
      queries: [{ signals: ["task_intent"] }],
      reason: "low_confidence",
    },
    {
      name: "conflicting near-top domains",
      candidates: [
        candidate({ id: "wiki", score: 0.92, kind: "wiki" }),
        candidate({ id: "source", score: 0.88, kind: "source" }),
      ],
      collected_candidate_count: 2,
      queries: [{ signals: ["task_intent"] }],
      reason: "conflicting_domains",
    },
    {
      name: "broad synthesis signals",
      candidates: [
        candidate({ id: "one", kind: "wiki" }),
        candidate({ id: "two", score: 0.8, kind: "source" }),
        candidate({ id: "three", score: 0.7, kind: "entity" }),
        candidate({ id: "four", score: 0.6, kind: "fact" }),
      ],
      collected_candidate_count: 4,
      queries: [{ signals: ["path", "symbol", "tag", "acceptance"] }],
      reason: "broad_synthesis",
    },
  ])("invokes exactly one bounded selector episode for $name", async (fixture) => {
    const selector = vi.fn((workOrder: SemanticRetrievalSelectionWorkOrder) => {
      return Promise.resolve(response(workOrder, [workOrder.candidates.at(-1)!]));
    });
    const result = await selectSemanticRetrievalCandidates({
      candidates: fixture.candidates,
      collected_candidate_count: fixture.collected_candidate_count,
      queries: fixture.queries,
      selector,
    });

    expect(selector).toHaveBeenCalledTimes(1);
    const workOrder = result.receipt.work_order;
    if (!workOrder) throw new Error("selector work order was not captured");
    expect(workOrder).toMatchObject({
      kind: "task_knowledge_selection",
      authority: {
        network: "deny",
        max_selector_episodes: 1,
        max_candidates: 12,
        max_selected_references: 12,
      },
    });
    expect(workOrder.trigger.reasons).toContain(
      fixture.reason as SemanticRetrievalEscalationReason,
    );
    expect(workOrder.candidates).toHaveLength(fixture.candidates.length);
    expect(result.receipt).toMatchObject({
      state: "selected",
      selected: { source: "semantic_selector" },
      episode: { invoked: true, count: 1, total_tokens: 140 },
      comparison: {
        baseline: { escalation_rate: 0, episode_count: 0 },
        observed: { escalation_rate: 1, episode_count: 1, total_tokens: 140 },
      },
      downstream_quality: { state: "not_observed" },
    });
    expect(result.candidates).toEqual([fixture.candidates.at(-1)]);
  });

  it.each([
    {
      name: "stale candidate set",
      selector: (workOrder: SemanticRetrievalSelectionWorkOrder) =>
        Promise.resolve({
          ...response(workOrder),
          candidate_set_digest: "sha256:stale",
        }),
      failure: "candidate_set_stale",
    },
    {
      name: "unknown candidate",
      selector: (workOrder: SemanticRetrievalSelectionWorkOrder) =>
        Promise.resolve({
          ...response(workOrder),
          selected: [{ ref: "context/wiki/unknown.md", digest: "sha256:unknown" }],
        }),
      failure: "invalid_selection",
    },
    {
      name: "selector failure",
      selector: () => Promise.reject(new Error("provider unavailable")),
      failure: "selector_failed",
    },
  ])("falls back to deterministic retrieval after $name", async (fixture) => {
    const deterministic = [candidate({ id: "fallback", score: 0.5 })];
    const result = await selectSemanticRetrievalCandidates({
      candidates: deterministic,
      collected_candidate_count: 1,
      queries: [{ signals: ["task_intent"] }],
      selector: fixture.selector,
    });

    expect(result.candidates).toEqual(deterministic);
    expect(result.receipt).toMatchObject({
      state: "fallback",
      selected: { source: "deterministic" },
      episode: { invoked: true, count: 1 },
      failure: { code: fixture.failure },
    });
  });

  it("uses a typed deterministic fallback when no selector adapter is configured", async () => {
    const deterministic = [candidate({ id: "unavailable", score: 0.5 })];
    const result = await selectSemanticRetrievalCandidates({
      candidates: deterministic,
      collected_candidate_count: 1,
      queries: [{ signals: ["task_intent"] }],
    });

    expect(result.candidates).toEqual(deterministic);
    expect(result.receipt).toMatchObject({
      state: "fallback",
      episode: { invoked: false, count: 0 },
      failure: { code: "selector_unavailable" },
    });
  });
});
