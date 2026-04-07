import { describe, expect, it } from "vitest";

import { renderStructuredFindingBlock } from "./findings.js";

describe("task findings helpers", () => {
  it("renders canonical structured finding blocks with optional incident metadata", () => {
    const block = renderStructuredFindingBlock({
      observation: "GraphQL close paths returned EOF.",
      impact: "Task cleanup required repeated operator retries.",
      resolution: "Switch close flows to REST-backed helpers.",
      promote: true,
      external: true,
      incidentScope: "GitHub PR cleanup",
      incidentTags: ["github", "workflow", "github"],
      incidentMatch: ["close", "github", "close"],
      incidentAdvice: "Use REST-backed helpers when GraphQL is flaky.",
      incidentRule: "Cleanup flows MUST prefer REST-backed PR close helpers when GraphQL is flaky.",
    });

    expect(block).toBe(
      [
        "- Observation: GraphQL close paths returned EOF.",
        "  Impact: Task cleanup required repeated operator retries.",
        "  Resolution: Switch close flows to REST-backed helpers.",
        "  Promotion: incident-candidate",
        "  Fixability: external",
        "  IncidentScope: GitHub PR cleanup",
        "  IncidentTags: github, workflow",
        "  IncidentMatch: close, github",
        "  IncidentAdvice: Use REST-backed helpers when GraphQL is flaky.",
        "  IncidentRule: Cleanup flows MUST prefer REST-backed PR close helpers when GraphQL is flaky.",
      ].join("\n"),
    );
  });
});
