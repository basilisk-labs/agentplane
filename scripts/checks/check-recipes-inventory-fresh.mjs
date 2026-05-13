import path from "node:path";
import { ROOT, defineGeneratedArtifactCheck, runNode } from "../lib/generated-artifacts.mjs";
import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const DOC_PATH = path.join(ROOT, "docs", "recipes-inventory.json");

const main = defineScript({
  name: "check-recipes-inventory-fresh",
  run: defineGeneratedArtifactCheck({
    outputPath: DOC_PATH,
    tempPrefix: "agentplane-recipes-inventory-",
    fileName: "recipes-inventory.json",
    generate: (generatedPath) =>
      runNode(["scripts/generate-recipes-inventory.mjs", "--out", generatedPath]),
    missingMessage:
      "docs/recipes-inventory.json is missing. Regenerate with: node scripts/generate-recipes-inventory.mjs",
    staleMessage:
      "Recipes inventory is stale. Regenerate with: node scripts/generate-recipes-inventory.mjs",
    successMessage: "ok: docs/recipes-inventory.json is up to date",
  }),
});

runScriptMain(main);
