import type { TaskRouteDecision } from "./route-decision-types.js";
import { buildRouteSourceConfidenceBase } from "./source-confidence.js";

export function buildRouteSourceConfidence(opts: {
  remoteEnabled: boolean;
  remoteResolved: boolean;
  localDiagnostics: string[];
}): TaskRouteDecision["sourceConfidence"] {
  const probeDiagnostics = [...opts.localDiagnostics];
  if (opts.remoteEnabled && !opts.remoteResolved) {
    probeDiagnostics.push("remote route probe produced no provider state; local fallback used");
  }
  return {
    ...buildRouteSourceConfidenceBase({
      remoteEnabled: opts.remoteEnabled,
      remoteResolved: opts.remoteResolved,
      batchOwnershipSource: "pr_artifact",
    }),
    route_probes: {
      source: "local_git",
      freshness: "computed_local",
      confidence: probeDiagnostics.length > 0 ? "low" : "high",
      note:
        probeDiagnostics.length > 0
          ? probeDiagnostics.join("; ")
          : "route probes completed without suppressed diagnostics",
    },
  };
}
