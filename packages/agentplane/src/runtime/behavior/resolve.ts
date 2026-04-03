import type {
  BehaviorCandidate,
  BehaviorLayer,
  BehaviorResolutionEntry,
  BehaviorResolutionTrace,
  ResolvedBehavior,
} from "./types.js";

const BEHAVIOR_LAYER_RANK = {
  harness: 0,
  extension: 1,
  user: 2,
  builtin: 3,
} as const satisfies Record<BehaviorLayer, number>;

type RankedBehaviorCandidate<TValue, TMetadata> = BehaviorCandidate<TValue, TMetadata> & {
  index: number;
  order: number;
};

function normalizeKey(key: string): string {
  const normalized = key.trim();
  if (!normalized) {
    throw new Error("Behavior resolution requires a non-empty key.");
  }
  return normalized;
}

function rankCandidates<TValue, TMetadata>(
  candidates: readonly BehaviorCandidate<TValue, TMetadata>[],
): RankedBehaviorCandidate<TValue, TMetadata>[] {
  return candidates.map((candidate, index) => ({
    ...candidate,
    order: candidate.order ?? 0,
    index,
  }));
}

function compareCandidates<TValue, TMetadata>(
  left: RankedBehaviorCandidate<TValue, TMetadata>,
  right: RankedBehaviorCandidate<TValue, TMetadata>,
): number {
  return (
    BEHAVIOR_LAYER_RANK[left.layer] - BEHAVIOR_LAYER_RANK[right.layer] ||
    left.order - right.order ||
    left.source.localeCompare(right.source) ||
    left.index - right.index
  );
}

function toTraceEntry<TValue, TMetadata>(
  candidate: RankedBehaviorCandidate<TValue, TMetadata>,
  selected: boolean,
): BehaviorResolutionEntry<TMetadata> {
  return {
    layer: candidate.layer,
    source: candidate.source,
    order: candidate.order,
    selected,
    ...(candidate.metadata ? { metadata: structuredClone(candidate.metadata) } : {}),
  };
}

export function resolveBehavior<TValue, TMetadata = Record<string, unknown>>(opts: {
  key: string;
  candidates: readonly BehaviorCandidate<TValue, TMetadata>[];
}): ResolvedBehavior<TValue, TMetadata> {
  const key = normalizeKey(opts.key);
  if (opts.candidates.length === 0) {
    throw new Error(`Behavior resolution requires at least one candidate: ${key}`);
  }

  const ranked = rankCandidates(opts.candidates).toSorted(compareCandidates);
  const winner = ranked[0];
  if (!winner) {
    throw new Error(`Behavior resolution lost its winner unexpectedly: ${key}`);
  }

  const trace = ranked.map((candidate, index) => toTraceEntry(candidate, index === 0));
  const [winnerTrace, ...conflicts] = trace;
  if (!winnerTrace) {
    throw new Error(`Behavior resolution trace is unexpectedly empty: ${key}`);
  }

  return {
    key,
    value: winner.value,
    winner: winnerTrace,
    conflicts,
    trace,
  };
}

export function stripBehaviorValue<TValue, TMetadata>(
  resolved: ResolvedBehavior<TValue, TMetadata>,
): BehaviorResolutionTrace<TMetadata> {
  return {
    key: resolved.key,
    winner: resolved.winner,
    conflicts: resolved.conflicts,
    trace: resolved.trace,
  };
}
