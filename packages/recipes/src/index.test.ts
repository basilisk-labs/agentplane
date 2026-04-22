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

  it("normalizes legacy scenario descriptors that omit name", () => {
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
          use_when: ["Need a browser preview"],
          required_inputs: [],
          outputs: [],
          agents_involved: ["viewer"],
          run_profile: { mode: "analysis" },
          file: "scenarios/viewer.json",
        },
      ],
    });

    expect(manifest.scenarios?.[0]?.name).toBe("Launch the viewer");
  });
});
