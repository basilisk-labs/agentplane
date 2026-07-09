import { describe, expect, it } from "vitest";

import { buildRouteSourceConfidence } from "./route-decision.js";

describe("route decision source confidence", () => {
  it("surfaces remote fallback and local probe diagnostics", () => {
    const confidence = buildRouteSourceConfidence({
      remoteEnabled: true,
      remoteResolved: false,
      localDiagnostics: ["PR flow probe failed: provider command exited with code 2"],
    });

    expect(confidence.route_probes).toMatchObject({
      source: "local_git",
      freshness: "computed_local",
      confidence: "low",
    });
    expect(confidence.route_probes.note).toContain("PR flow probe failed");
    expect(confidence.route_probes.note).toContain("remote route probe produced no provider state");
  });
});
