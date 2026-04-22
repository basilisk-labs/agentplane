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
});
