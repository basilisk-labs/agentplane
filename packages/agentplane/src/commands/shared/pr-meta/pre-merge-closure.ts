import { isRecord } from "../../../shared/guards.js";

export type PreMergeClosureMarker = {
  state: "closed_before_merge";
  branch: string;
  basisCommit: string;
  recordedAt?: string;
  prNumber?: number;
};

export function readPreMergeClosureMarker(meta: unknown): PreMergeClosureMarker | null {
  if (!isRecord(meta)) return null;
  const marker = meta.pre_merge_closure;
  if (!isRecord(marker)) return null;

  const state = marker.state;
  const branch = marker.branch;
  const basisCommit = marker.basis_commit;
  const recordedAt = marker.recorded_at;
  const prNumber = marker.pr_number;
  if (state !== "closed_before_merge") return null;
  if (typeof branch !== "string" || branch.trim().length === 0) return null;
  if (typeof basisCommit !== "string" || basisCommit.trim().length === 0) return null;
  if (
    recordedAt !== undefined &&
    (typeof recordedAt !== "string" || recordedAt.trim().length === 0)
  ) {
    return null;
  }
  if (
    prNumber != null &&
    (typeof prNumber !== "number" || !Number.isInteger(prNumber) || prNumber <= 0)
  ) {
    return null;
  }

  return {
    state,
    branch: branch.trim(),
    basisCommit: basisCommit.trim(),
    ...(recordedAt === undefined ? {} : { recordedAt: recordedAt.trim() }),
    ...(prNumber == null ? {} : { prNumber }),
  };
}

export function hasClosedPreMergeClosureMarker(meta: unknown): boolean {
  return readPreMergeClosureMarker(meta) !== null;
}
