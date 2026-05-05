import { describe, expect, it } from "vitest";

import {
  resolveRecipeBlueprintExtensions,
  validateRecipeManifest,
  type RecipeManifest,
} from "./index.js";

function manifest(id: string, extensions: RecipeManifest["blueprint_extensions"]): RecipeManifest {
  return validateRecipeManifest({
    schema_version: "2",
    kind: "project_overlay",
    id,
    version: "1.0.0",
    name: id,
    summary: `${id} recipe`,
    blueprint_extensions: extensions,
  });
}

describe("resolveRecipeBlueprintExtensions", () => {
  it("accepts matching active recipe hints with provenance", () => {
    const resolved = resolveRecipeBlueprintExtensions({
      runtime: { task_kind: "research", tags: ["market"], repo_types: ["generic"] },
      recipes: [
        {
          manifest: manifest("market", [
            {
              id: "market.sources",
              kind: "evidence_requirement",
              summary: "Require source evidence",
              when: { tags_any: ["market"] },
              target_node_kind: "verify_record",
              evidence: ["sources", "weak_links"],
            },
          ]),
        },
      ],
    });

    expect(resolved.rejected).toEqual([]);
    expect(resolved.accepted).toEqual([
      {
        recipe_id: "market",
        recipe_version: "1.0.0",
        recipe_name: "market",
        extension_id: "market.sources",
        kind: "evidence_requirement",
        summary: "Require source evidence",
        target_node_kind: "verify_record",
        value: { evidence: ["sources", "weak_links"] },
        reasons: [
          "recipe market@1.0.0 declared evidence_requirement",
          "extension matched task context",
        ],
      },
    ]);
  });

  it("rejects unmatched and incompatible recipe hints with reasons", () => {
    const resolved = resolveRecipeBlueprintExtensions({
      runtime: { tags: ["docs"] },
      recipes: [
        {
          manifest: manifest("market", [
            {
              id: "market.context",
              kind: "context_hint",
              summary: "Market context",
              when: { tags_any: ["market"] },
              value: { docs: ["market.md"] },
            },
          ]),
        },
        {
          manifest: manifest("ops", [
            {
              id: "ops.risk",
              kind: "risk_hint",
              summary: "External system risk",
              risk: "external_system",
            },
          ]),
          compatible: false,
          incompatibility_reasons: ["platform mismatch"],
        },
      ],
    });

    expect(resolved.accepted).toEqual([]);
    expect(resolved.rejected.map((item) => item.reason)).toEqual([
      "Recipe blueprint extension did not match the current task context.",
      "platform mismatch",
    ]);
  });

  it("sorts normalized extensions deterministically", () => {
    const resolved = resolveRecipeBlueprintExtensions({
      recipes: [
        {
          manifest: manifest("zeta", [
            {
              id: "zeta.context",
              kind: "context_hint",
              summary: "Zeta",
              value: "zeta",
            },
          ]),
        },
        {
          manifest: manifest("alpha", [
            {
              id: "alpha.context",
              kind: "context_hint",
              summary: "Alpha",
              value: "alpha",
            },
          ]),
        },
      ],
    });

    expect(resolved.accepted.map((item) => item.recipe_id)).toEqual(["alpha", "zeta"]);
  });
});
