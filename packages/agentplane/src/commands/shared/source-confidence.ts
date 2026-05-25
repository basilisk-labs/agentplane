type SourceConfidenceSource =
  | "static"
  | "task_backend"
  | "local_git"
  | "pr_artifact"
  | "task_doc"
  | "blueprint_resolver"
  | "snapshot_digest"
  | "remote_provider";

type SourceConfidenceFreshness =
  | "static"
  | "live_local"
  | "computed_local"
  | "cached_artifact"
  | "remote_live"
  | "remote_skipped";

type SourceConfidenceLevel = "high" | "medium" | "low" | "skipped";

export type SourceConfidence = {
  source: SourceConfidenceSource;
  freshness: SourceConfidenceFreshness;
  confidence: SourceConfidenceLevel;
  note?: string;
};

export function buildRouteSourceConfidenceBase<
  TBatchSource extends "local_git" | "pr_artifact",
>(opts: {
  batchOwnershipSource: TBatchSource;
  batchOwnershipNote?: string;
  remoteEnabled: boolean;
  remoteResolved: boolean;
}): {
  task: SourceConfidence;
  workflow: SourceConfidence;
  route: SourceConfidence;
  next_action: SourceConfidence;
  blockers: SourceConfidence;
  batch_ownership: SourceConfidence & { source: TBatchSource };
  remote: SourceConfidence;
} {
  const routeFreshness = opts.remoteResolved ? "remote_live" : "computed_local";
  const routeConfidence = opts.remoteResolved ? "medium" : opts.remoteEnabled ? "medium" : "high";
  const routeNote = opts.remoteResolved
    ? "route includes provider-derived PR/check state"
    : opts.remoteEnabled
      ? "remote lookup was requested but no provider state was available"
      : "route excludes hosted PR/check/review lookups";
  const remoteFreshness = opts.remoteResolved ? "remote_live" : "remote_skipped";
  const remoteConfidence = opts.remoteResolved ? "medium" : opts.remoteEnabled ? "low" : "skipped";
  const remoteNote = opts.remoteResolved
    ? "remote provider state fetched"
    : opts.remoteEnabled
      ? "remote lookup was requested but route resolution fell back to local data"
      : "remote lookup skipped by default";

  return {
    task: {
      source: "task_backend",
      freshness: "live_local",
      confidence: "high",
    },
    workflow: {
      source: "local_git",
      freshness: "live_local",
      confidence: "high",
    },
    route: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
      note: routeNote,
    },
    next_action: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
    },
    blockers: {
      source: "local_git",
      freshness: routeFreshness,
      confidence: routeConfidence,
    },
    batch_ownership: {
      source: opts.batchOwnershipSource,
      freshness: "live_local",
      confidence: "medium",
      note: opts.batchOwnershipNote ?? "derived from local branch_pr PR metadata",
    },
    remote: {
      source: "remote_provider",
      freshness: remoteFreshness,
      confidence: remoteConfidence,
      note: remoteNote,
    },
  };
}
