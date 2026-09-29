import { execFileSync } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { ROOT, defineGeneratedArtifactCheck, runNode } from "../lib/generated-artifacts.mjs";
import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const DOC_PATH = path.join(ROOT, "docs", "recipes-inventory.json");
const RECIPES_SOURCE_ENV = "AGENTPLANE_RECIPES_SOURCE";
const RECIPES_REPOSITORY_URL = "https://github.com/basilisk-labs/agentplane-recipes.git";

async function prepareRecipesSource() {
  if (String(process.env[RECIPES_SOURCE_ENV] ?? "").trim()) {
    return async () => {};
  }

  const checkout = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-checkout-"));
  try {
    execFileSync("git", ["clone", "--depth", "1", "--quiet", RECIPES_REPOSITORY_URL, checkout], {
      cwd: ROOT,
      stdio: "pipe",
    });
  } catch (error) {
    await rm(checkout, { recursive: true, force: true });
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `recipes source is unavailable; set ${RECIPES_SOURCE_ENV} to an existing checkout or allow a read-only clone of ${RECIPES_REPOSITORY_URL}: ${detail}`,
    );
  }

  process.env[RECIPES_SOURCE_ENV] = checkout;
  return async () => {
    delete process.env[RECIPES_SOURCE_ENV];
    await rm(checkout, { recursive: true, force: true });
  };
}

const checkInventory = defineGeneratedArtifactCheck({
  outputPath: DOC_PATH,
  tempPrefix: "agentplane-recipes-inventory-",
  fileName: "recipes-inventory.json",
  generate: (generatedPath) =>
    runNode(["scripts/generate-recipes-inventory.mjs", "--out", generatedPath]),
  missingMessage:
    "docs/recipes-inventory.json is missing. Regenerate with an external recipes checkout: AGENTPLANE_RECIPES_SOURCE=/path/to/agentplane-recipes node scripts/generate-recipes-inventory.mjs",
  staleMessage:
    "Recipes inventory is stale. Regenerate with the same external source: AGENTPLANE_RECIPES_SOURCE=/path/to/agentplane-recipes node scripts/generate-recipes-inventory.mjs",
  successMessage: "ok: docs/recipes-inventory.json is up to date",
});

const main = defineScript({
  name: "check-recipes-inventory-fresh",
  async run() {
    const cleanup = await prepareRecipesSource();
    try {
      await checkInventory();
    } finally {
      await cleanup();
    }
  },
});

runScriptMain(main);
