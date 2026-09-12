import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";

type LifecycleTiming = NonNullable<
  SupervisorExecutionEpisodeJournal["operations"][number]["lifecycle_timing"]
>;
type LifecycleStage = LifecycleTiming["spans"][number]["stage"];
type LifecycleTimeCategory = LifecycleTiming["spans"][number]["category"];

export type MonotonicStageObservation = {
  span_id: string;
  parent_span_id: string;
  stage: LifecycleStage;
  category: LifecycleTimeCategory;
  started_ms: number;
  ended_ms: number;
};

function sample(value: number, fallback: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : fallback;
}

export function workflowOperationLifecycleStage(opts: {
  operation_id: string;
  semantic: boolean;
  evaluator: boolean;
}): { stage: LifecycleStage; category: LifecycleTimeCategory } {
  if (opts.evaluator) return { stage: "review", category: "external_wait" };
  if (opts.semantic) return { stage: "semantic_dispatch", category: "external_wait" };
  if (opts.operation_id === "task.start") return { stage: "preparation", category: "local_work" };
  if (opts.operation_id.includes("verify")) {
    return { stage: "native_verification", category: "local_work" };
  }
  if (opts.operation_id.startsWith("provider.") || opts.operation_id.startsWith("integration.")) {
    return { stage: "provider_or_integration", category: "external_wait" };
  }
  if (opts.operation_id.includes("finish") || opts.operation_id.includes("complete")) {
    return { stage: "closure", category: "local_work" };
  }
  return { stage: "lifecycle", category: "local_work" };
}

export function buildSingleStageLifecycleTiming(opts: {
  root_span_id: string;
  stage: LifecycleStage;
  category: LifecycleTimeCategory;
  started_ms: number;
  ended_ms: number;
  first_scoped_mutation: boolean;
}): LifecycleTiming {
  return buildMonotonicLifecycleTiming({
    root_span_id: opts.root_span_id,
    started_ms: opts.started_ms,
    ended_ms: opts.ended_ms,
    spans: [
      {
        span_id: `${opts.root_span_id}:${opts.stage}`,
        parent_span_id: opts.root_span_id,
        stage: opts.stage,
        category: opts.category,
        started_ms: opts.started_ms,
        ended_ms: opts.ended_ms,
      },
      ...(opts.first_scoped_mutation
        ? [
            {
              span_id: `${opts.root_span_id}:first_scoped_mutation`,
              parent_span_id: opts.root_span_id,
              stage: "first_scoped_mutation" as const,
              category: "local_work" as const,
              started_ms: opts.ended_ms,
              ended_ms: opts.ended_ms,
            },
          ]
        : []),
    ],
  });
}

export function buildMonotonicLifecycleTiming(opts: {
  root_span_id: string;
  started_ms: number;
  ended_ms: number;
  root_category?: LifecycleTimeCategory;
  spans?: readonly MonotonicStageObservation[];
}): LifecycleTiming {
  const rootStart = sample(opts.started_ms, 0);
  const rootEnd = Math.max(rootStart, sample(opts.ended_ms, rootStart));
  const elapsed = rootEnd - rootStart;
  const observations = [
    {
      span_id: opts.root_span_id,
      parent_span_id: null,
      stage: "lifecycle" as const,
      category: opts.root_category ?? ("local_work" as const),
      start: rootStart,
      end: rootEnd,
    },
    ...(opts.spans ?? []).map((span) => {
      const start = Math.min(rootEnd, Math.max(rootStart, sample(span.started_ms, rootStart)));
      const end = Math.min(rootEnd, Math.max(start, sample(span.ended_ms, start)));
      return { ...span, start, end };
    }),
  ];
  const byId = new Map(observations.map((span) => [span.span_id, span]));
  if (byId.size !== observations.length || !opts.root_span_id.trim()) {
    throw new Error("Lifecycle timing span identities must be non-empty and unique.");
  }
  const ancestors = (spanId: string): string[] => {
    const seen = new Set<string>();
    let current = byId.get(spanId);
    while (current?.parent_span_id !== null) {
      if (!current || seen.has(current.span_id))
        throw new Error("Lifecycle timing contains a cycle.");
      seen.add(current.span_id);
      const parentId: string = current.parent_span_id;
      const parent = byId.get(parentId);
      if (!parent) throw new Error("Lifecycle timing parent span is missing.");
      if (current.start < parent.start || current.end > parent.end) {
        throw new Error("Lifecycle timing child span is outside its parent.");
      }
      current = parent;
    }
    return [...seen];
  };
  const ancestry = new Map(observations.map((span) => [span.span_id, ancestors(span.span_id)]));
  for (let left = 1; left < observations.length; left += 1) {
    for (let right = left + 1; right < observations.length; right += 1) {
      const a = observations[left];
      const b = observations[right];
      const overlap = a.start < b.end && b.start < a.end;
      const nested = [
        ancestry.get(a.span_id)?.includes(b.span_id),
        ancestry.get(b.span_id)?.includes(a.span_id),
      ].some(Boolean);
      if (overlap && !nested) throw new Error("Lifecycle timing sibling spans must not overlap.");
    }
  }
  const boundaries = [...new Set(observations.flatMap((span) => [span.start, span.end]))].toSorted(
    (a, b) => a - b,
  );
  const partitioned = { local_work: 0, user_wait: 0, external_wait: 0 };
  for (let index = 1; index < boundaries.length; index += 1) {
    const start = boundaries[index - 1];
    const end = boundaries[index];
    const active = observations
      .filter((span) => span.start <= start && span.end >= end)
      .toSorted(
        (a, b) => (ancestry.get(b.span_id)?.length ?? 0) - (ancestry.get(a.span_id)?.length ?? 0),
      )[0];
    if (active) partitioned[active.category] += end - start;
  }
  return {
    schema_version: 1,
    clock: "monotonic",
    root_span_id: opts.root_span_id,
    elapsed_ms: elapsed,
    partitioned_ms: partitioned,
    spans: observations.map((span) => ({
      span_id: span.span_id,
      parent_span_id: span.parent_span_id,
      stage: span.stage,
      category: span.category,
      offset_ms: span.start - rootStart,
      elapsed_ms: span.end - span.start,
    })),
  };
}
