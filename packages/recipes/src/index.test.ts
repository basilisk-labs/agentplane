import { describe, expect, it } from "vitest";

import { RECIPES_VERSION } from "./index.js";

describe("@agentplane/recipes", () => {
  it("exports version", () => {
    expect(RECIPES_VERSION).toBeTypeOf("string");
  });
});
