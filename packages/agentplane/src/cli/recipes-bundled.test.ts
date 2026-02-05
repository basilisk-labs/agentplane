import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import { CliError } from "../shared/errors.js";
import { captureStdIO } from "./run-cli.test-helpers.js";
import {
  listBundledRecipes,
  renderBundledRecipesHint,
  validateBundledRecipesSelection,
} from "./recipes-bundled.js";

const originalRecipes = [...BUNDLED_RECIPES_CATALOG.recipes];

beforeEach(() => {
  BUNDLED_RECIPES_CATALOG.recipes = [];
});

afterEach(() => {
  BUNDLED_RECIPES_CATALOG.recipes = [...originalRecipes];
});

describe("cli/recipes-bundled", () => {
  it("lists bundled recipes with unknown version fallback", () => {
    BUNDLED_RECIPES_CATALOG.recipes = [
      { id: "one", summary: "First", versions: [] },
      { id: "two", summary: "Second", versions: [{ version: "1.2.3" }] },
    ];

    expect(listBundledRecipes()).toEqual([
      { id: "one", summary: "First", version: "unknown" },
      { id: "two", summary: "Second", version: "1.2.3" },
    ]);
  });

  it("renders bundled hint when none exist", () => {
    expect(renderBundledRecipesHint()).toBe("Bundled recipes: none");
  });

  it("renders bundled hint with ids", () => {
    BUNDLED_RECIPES_CATALOG.recipes = [
      { id: "one", summary: "First", versions: [{ version: "1.0.0" }] },
      { id: "two", summary: "Second", versions: [{ version: "2.0.0" }] },
    ];

    expect(renderBundledRecipesHint()).toBe("Bundled recipes: one, two");
  });

  it("validateBundledRecipesSelection returns when no selection", () => {
    expect(() => validateBundledRecipesSelection([])).not.toThrow();
  });

  it("validateBundledRecipesSelection prints hint when nothing is available", () => {
    const io = captureStdIO();

    expect(() => validateBundledRecipesSelection(["one"])).not.toThrow();
    io.restore();

    expect(io.stdout).toContain("Bundled recipes: none");
  });

  it("validateBundledRecipesSelection throws when ids are missing", () => {
    BUNDLED_RECIPES_CATALOG.recipes = [
      { id: "one", summary: "First", versions: [{ version: "1.0.0" }] },
    ];

    expect(() => validateBundledRecipesSelection(["two"])).toThrowError(CliError);
  });

  it("validateBundledRecipesSelection accepts known ids", () => {
    BUNDLED_RECIPES_CATALOG.recipes = [
      { id: "one", summary: "First", versions: [{ version: "1.0.0" }] },
    ];

    expect(() => validateBundledRecipesSelection(["one"])).not.toThrow();
  });
});
