import { isRecord } from "../../../shared/guards.js";

export type PreMergeClosureMarker = {
  state: "closed_before_merge";
  branch: string;
  basisCommit: string;
};

export function readPreMergeClosureMarker(meta: unknown): PreMergeClosureMarker | null {
  if (!isRecord(meta)) return null;
  const marker = meta.pre_merge_closure;
  if (!isRecord(marker)) return null;

  const state = marker.state;
  const branch = marker.branch;
  const basisCommit = marker.basis_commit;
  if (state !== "closed_before_merge") return null;
  if (typeof branch !== "string" || branch.trim().length === 0) return null;
  if (typeof basisCommit !== "string" || basisCommit.trim().length === 0) return null;

  return { state, branch: branch.trim(), basisCommit: basisCommit.trim() };
}

export function hasClosedPreMergeClosureMarker(meta: unknown): boolean {
  return readPreMergeClosureMarker(meta) !== null;
}
