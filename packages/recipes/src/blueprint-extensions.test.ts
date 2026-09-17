import { describe, expect, it } from "vitest";

import {
  convertRecipeV1Extensions,
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

  it("converts every supported V1 extension into a native non-authority surface", () => {
    const converted = convertRecipeV1Extensions({
      runtime: { tags: ["market"] },
      recipes: [
        {
          manifest: manifest("market", [
            {
              id: "market.context",
              kind: "context_hint",
              summary: "Use market context",
              target_node_kind: "context_resolve",
              value: { sources: ["market.md"] },
            },
            {
              id: "market.evidence",
              kind: "evidence_requirement",
              summary: "Require sources",
              target_node_kind: "verify_record",
              evidence: ["sources", "confidence"],
            },
            {
              id: "market.check",
              kind: "check_suggestion",
              summary: "Suggest a check",
              target_node_kind: "deterministic_check",
              command: "bun run market:check",
            },
            {
              id: "market.output",
              kind: "output_schema",
              summary: "Define the output",
              target_node_kind: "work_unit",
              value: { type: "object", required: ["answer"] },
            },
            {
              id: "market.artifact",
              kind: "artifact_template",
              summary: "Define the artifact",
              target_node_kind: "work_unit",
              value: { path: "report.md", sections: ["Answer"] },
            },
            {
              id: "market.risk",
              kind: "risk_hint",
              summary: "Strengthen network risk",
              target_node_kind: "context_resolve",
              risk: "network",
            },
            {
              id: "market.route",
              kind: "preferred_blueprint",
              summary: "Prefer analysis",
              blueprint_id: "analysis.light",
            },
          ]),
        },
      ],
    });

    expect(converted.status).toBe("converted");
    expect(converted.manual_conversion).toEqual([]);
    expect(converted.native_surfaces.guidance).toEqual([
      expect.objectContaining({
        extension_id: "market.check",
        kind: "check_suggestion",
        strength: "advisory",
        command: "bun run market:check",
      }),
      expect.objectContaining({
        extension_id: "market.context",
        kind: "context_hint",
        strength: "advisory",
      }),
      expect.objectContaining({
        extension_id: "market.risk",
        kind: "risk_hint",
        strength: "strengthen_only",
        risk: "network",
      }),
    ]);
    expect(converted.native_surfaces.required_evidence).toEqual([
      expect.objectContaining({
        extension_id: "market.evidence",
        evidence_id: "confidence",
        required: true,
      }),
      expect.objectContaining({
        extension_id: "market.evidence",
        evidence_id: "sources",
        required: true,
      }),
    ]);
    expect(converted.native_surfaces.outputs[0]?.extension_id).toBe("market.output");
    expect(converted.native_surfaces.outputs[0]?.digest).toMatch(/^sha256:/u);
    expect(converted.native_surfaces.artifacts[0]?.extension_id).toBe("market.artifact");
    expect(converted.native_surfaces.artifacts[0]?.digest).toMatch(/^sha256:/u);
    expect(converted.native_surfaces.route_preferences).toEqual([
      expect.objectContaining({
        extension_id: "market.route",
        legacy_blueprint_id: "analysis.light",
        compatible_task_kinds: ["analysis"],
        compatible_mutation_scopes: ["none"],
        preferred_mode: "direct",
        authority: "advisory",
      }),
    ]);
  });

  it("requires manual conversion for custom graph targets, routes, and risks", () => {
    const converted = convertRecipeV1Extensions({
      recipes: [
        {
          manifest: manifest("custom", [
            {
              id: "custom.target",
              kind: "context_hint",
              summary: "Custom target",
              target_node_kind: "custom_context_node",
              value: "context",
            },
            {
              id: "custom.route",
              kind: "preferred_blueprint",
              summary: "Custom route",
              blueprint_id: "company.custom_graph",
            },
            {
              id: "custom.risk",
              kind: "risk_hint",
              summary: "Custom risk",
              risk: "vendor_specific_risk",
            },
          ]),
        },
      ],
    });

    expect(converted.status).toBe("manual_conversion_required");
    expect(converted.manual_conversion.map((diagnostic) => diagnostic.code)).toEqual([
      "unknown_risk",
      "custom_blueprint",
      "custom_target_node",
    ]);
    const routeDiagnostic = converted.manual_conversion.find(
      (diagnostic) => diagnostic.extension_id === "custom.route",
    );
    expect(routeDiagnostic).toMatchObject({
      recipe_id: "custom",
      extension_id: "custom.route",
      legacy_declaration: { blueprint_id: "company.custom_graph" },
    });
    expect(routeDiagnostic?.suggested_native_surface).toBeTypeOf("string");
  });

  it("maps every retired built-in preference and never grants route authority", () => {
    const ids = [
      "analysis.light",
      "content.light",
      "docs.change",
      "code.direct",
      "code.branch_pr",
      "performance.benchmark",
      "quality.regression",
      "context.assimilation",
      "context.maximum_assimilation",
      "post_run.improvement_review",
      "release.strict",
      "ops.approval",
    ];
    const converted = convertRecipeV1Extensions({
      recipes: [
        {
          manifest: manifest(
            "routes",
            ids.map((blueprintId) => ({
              id: `routes.${blueprintId}`,
              kind: "preferred_blueprint" as const,
              summary: `Prefer ${blueprintId}`,
              blueprint_id: blueprintId,
            })),
          ),
        },
      ],
    });

    expect(converted.status).toBe("converted");
    expect(converted.native_surfaces.route_preferences).toHaveLength(ids.length);
    expect(
      converted.native_surfaces.route_preferences.every(
        (preference) => preference.authority === "advisory",
      ),
    ).toBe(true);
  });
});
