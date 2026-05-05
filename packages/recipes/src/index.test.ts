import { describe, expect, it } from "vitest";

import {
  RECIPES_SCENARIOS_DIR_NAME,
  RECIPES_VERSION,
  normalizeRecipeId,
  validateRecipeManifest,
} from "./index.js";

describe("@agentplaneorg/recipes", () => {
  it("exports version", () => {
    expect(RECIPES_VERSION).toBeTypeOf("string");
  });

  it("exports recipe domain helpers", () => {
    expect(RECIPES_SCENARIOS_DIR_NAME).toBe("scenarios");
    expect(normalizeRecipeId("demo")).toBe("demo");
  });

  it("normalizes legacy v1 scenario descriptors that omit modern metadata", () => {
    const manifest = validateRecipeManifest({
      schema_version: "1",
      kind: "project_overlay",
      id: "viewer",
      version: "1.0.0",
      name: "Viewer",
      summary: "Preview tasks",
      agents: [
        {
          id: "viewer",
          display_name: "Viewer",
          role: "viewer",
          summary: "Preview tasks",
          file: "agents/viewer.md",
        },
      ],
      scenarios: [
        {
          id: "viewer",
          summary: "Launch the viewer",
        },
      ],
    });

    expect(manifest.scenarios?.[0]?.name).toBe("Launch the viewer");
    expect(manifest.scenarios?.[0]?.use_when).toEqual(["Launch the viewer"]);
    expect(manifest.scenarios?.[0]?.required_inputs).toEqual([]);
    expect(manifest.scenarios?.[0]?.outputs).toEqual([]);
    expect(manifest.scenarios?.[0]?.agents_involved).toEqual([]);
    expect(manifest.scenarios?.[0]?.run_profile).toEqual({ mode: "analysis" });
    expect(manifest.scenarios?.[0]?.file).toBe("scenarios/viewer.json");
  });

  it("keeps v2 scenario descriptors strict", () => {
    expect(() =>
      validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "viewer",
        version: "1.0.0",
        name: "Viewer",
        summary: "Preview tasks",
        agents: [
          {
            id: "viewer",
            display_name: "Viewer",
            role: "viewer",
            summary: "Preview tasks",
            file: "agents/viewer.md",
          },
        ],
        scenarios: [
          {
            id: "viewer",
            summary: "Launch the viewer",
            file: "scenarios/viewer.json",
          },
        ],
      }),
    ).toThrow("Invalid field manifest.scenarios[0].use_when: expected string[]");
  });

  it("keeps v2 scenario files strict", () => {
    expect(() =>
      validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "viewer",
        version: "1.0.0",
        name: "Viewer",
        summary: "Preview tasks",
        agents: [
          {
            id: "viewer",
            display_name: "Viewer",
            role: "viewer",
            summary: "Preview tasks",
            file: "agents/viewer.md",
          },
        ],
        scenarios: [
          {
            id: "viewer",
            name: "Launch the viewer",
            summary: "Launch the viewer",
            use_when: ["Preview tasks"],
            required_inputs: [],
            outputs: [],
            agents_involved: ["viewer"],
            run_profile: { mode: "analysis" },
          },
        ],
      }),
    ).toThrow("Invalid field manifest.scenarios[0].file: expected string");
  });

  it("allows v2 overlays to declare prompt module assets without legacy prompt fragments", () => {
    const manifest = validateRecipeManifest({
      schema_version: "2",
      kind: "project_overlay",
      id: "modular",
      version: "1.0.0",
      name: "Modular",
      summary: "Modular prompt assets",
      prompt_modules: [
        {
          id: "policy-guidance",
          summary: "Policy guidance module",
          file: "prompt-modules/policy.json",
        },
      ],
      prompt_mutation_sets: [
        {
          id: "gateway-load-rules",
          summary: "Gateway load-rule mutations",
          file: "prompt-modules/mutations.json",
        },
      ],
    });

    expect(manifest.prompt_modules?.[0]?.file).toBe("prompt-modules/policy.json");
    expect(manifest.prompt_mutation_sets?.[0]?.id).toBe("gateway-load-rules");
  });

  it("allows v2 overlays to declare blueprint extensions without prompt assets", () => {
    const manifest = validateRecipeManifest({
      schema_version: "2",
      kind: "project_overlay",
      id: "market-analysis",
      version: "1.0.0",
      name: "Market Analysis",
      summary: "Evidence hints for market analysis",
      blueprint_extensions: [
        {
          id: "market-analysis.sources",
          kind: "evidence_requirement",
          summary: "Require source evidence for market analysis",
          when: { tags_any: ["market-analysis"] },
          target_node_kind: "verify_record",
          evidence: ["sources", "confidence", "weak_links"],
        },
        {
          id: "market-analysis.prefer-analysis",
          kind: "preferred_blueprint",
          summary: "Prefer the lightweight analysis route",
          blueprint_id: "analysis.light",
        },
      ],
    });

    expect(manifest.blueprint_extensions?.map((extension) => extension.id)).toEqual([
      "market-analysis.sources",
      "market-analysis.prefer-analysis",
    ]);
    expect(manifest.blueprint_extensions?.[0]?.evidence).toEqual([
      "sources",
      "confidence",
      "weak_links",
    ]);
  });

  it("rejects recipe blueprint extensions that try to override lifecycle gates", () => {
    expect(() =>
      validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "unsafe",
        version: "1.0.0",
        name: "Unsafe",
        summary: "Unsafe lifecycle override",
        blueprint_extensions: [
          {
            id: "unsafe.approval",
            kind: "context_hint",
            summary: "Try to bypass approval",
            approval_bypass: true,
            value: "skip approval",
          },
        ],
      }),
    ).toThrow("no lifecycle override fields");
  });

  it("rejects empty recipe blueprint extension declarations", () => {
    expect(() =>
      validateRecipeManifest({
        schema_version: "2",
        kind: "project_overlay",
        id: "empty",
        version: "1.0.0",
        name: "Empty",
        summary: "Empty blueprint extension",
        blueprint_extensions: [
          {
            id: "empty.context",
            kind: "context_hint",
            summary: "Missing value",
          },
        ],
      }),
    ).toThrow("Invalid field manifest.blueprint_extensions[0].value");
  });
});
