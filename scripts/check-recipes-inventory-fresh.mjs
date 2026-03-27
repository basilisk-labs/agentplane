import path from "node:path";
import { ROOT, checkGeneratedArtifactFresh, runNode } from "./lib/generated-artifacts.mjs";

const DOC_PATH = path.join(ROOT, "docs", "recipes-inventory.json");

async function main() {
  await checkGeneratedArtifactFresh({
    outputPath: DOC_PATH,
    tempPrefix: "agentplane-recipes-inventory-",
    fileName: "recipes-inventory.json",
    generate: (generatedPath) =>
      runNode(["scripts/generate-recipes-inventory.mjs", "--out", generatedPath]),
    missingMessage:
      "docs/recipes-inventory.json is missing. Regenerate with: node scripts/generate-recipes-inventory.mjs",
    staleMessage:
      "Recipes inventory is stale. Regenerate with: node scripts/generate-recipes-inventory.mjs",
  });

  process.stdout.write("ok: docs/recipes-inventory.json is up to date\n");
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
