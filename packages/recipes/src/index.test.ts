import { describe, expect, it } from "vitest";

import { RECIPES_SCENARIOS_DIR_NAME, RECIPES_VERSION, normalizeRecipeId } from "./index.js";

describe("@agentplane/recipes", () => {
  it("exports version", () => {
    expect(RECIPES_VERSION).toBeTypeOf("string");
  });

  it("exports recipe domain helpers", () => {
    expect(RECIPES_SCENARIOS_DIR_NAME).toBe("scenarios");
    expect(normalizeRecipeId("demo")).toBe("demo");
  });
});
