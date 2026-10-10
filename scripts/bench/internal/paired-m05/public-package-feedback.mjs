import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateRecipeManifest } from "../../../../packages/recipes/dist/index.js";
import { validateRecipeAssets } from "../../../../packages/agentplane/src/commands/recipes/impl/apply.ts";
import { publicCompilerFeedback, boundedPublicFeedbackFile } from "./public-compiler-feedback.mjs";

// Runs only inside the existing read-only worker. No install or registry effects.
export async function publicPackageFeedback(candidate, cases, contract) {
  const result = publicCompilerFeedback(candidate, cases, contract);
  const manifest = validateRecipeManifest(
    JSON.parse(boundedPublicFeedbackFile(path.join(candidate, "manifest.json"))),
  );
  try {
    await validateRecipeAssets({ manifest, recipeDir: candidate });
    result.package_assets = {
      passed: true,
      scope:
        "Actual read-only installer asset validation; not installation, native selection or admission.",
    };
  } catch (error) {
    result.package_assets = {
      passed: false,
      error: String(error.message).slice(0, 2048),
      scope: "Actual read-only installer asset validation; no installation performed.",
    };
  }
  return result;
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [candidate, cases, contract, ...extra] = process.argv.slice(2);
  assert.equal(extra.length, 0);
  console.log(JSON.stringify(await publicPackageFeedback(candidate, cases, contract)));
}
