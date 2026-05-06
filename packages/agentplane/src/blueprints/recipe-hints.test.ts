import { describe, expect, it } from "vitest";

import { recipeBlueprintExtensionToHint } from "./recipe-hints.js";

describe("recipe blueprint hint normalization", () => {
  it("normalizes recipe extensions as v2 hints with provenance", () => {
    expect(
      recipeBlueprintExtensionToHint({
        recipe_id: "market",
        recipe_version: "1.0.0",
        recipe_name: "Market",
        extension_id: "market.sources",
        kind: "evidence_requirement",
        summary: "Require sources",
        target_node_kind: "verify_record",
        value: { evidence: ["sources"] },
        reasons: ["recipe market@1.0.0 declared evidence_requirement"],
      }),
    ).toEqual({
      schemaVersion: 2,
      source: "recipe_blueprint_extension",
      recipeId: "market",
      recipeVersion: "1.0.0",
      recipeName: "Market",
      extensionId: "market.sources",
      kind: "evidence_requirement",
      summary: "Require sources",
      targetNodeKind: "verify_record",
      value: { evidence: ["sources"] },
      matchReasons: ["recipe market@1.0.0 declared evidence_requirement"],
    });
  });
});
