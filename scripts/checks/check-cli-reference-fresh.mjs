import path from "node:path";
import {
  ROOT,
  defineGeneratedArtifactCheck,
  fileExists,
  runNode,
} from "../lib/generated-artifacts.mjs";
import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";

const CLI_DIST = path.join(ROOT, "packages", "agentplane", "dist", "cli.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "cli-reference.generated.mdx");

async function assertCliDistExists() {
  if (!(await fileExists(CLI_DIST))) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n" +
        "  bun run --filter=@agentplane/testkit build",
    );
  }
}

const main = defineScript({
  name: "check-cli-reference-fresh",
  run: defineGeneratedArtifactCheck({
    outputPath: DOC_PATH,
    tempPrefix: "agentplane-cli-docs-",
    fileName: "cli-reference.generated.mdx",
    generate: (generatedPath) => runNode([CLI_DIST, "docs", "cli", "--out", generatedPath]),
    formatWithPrettier: true,
    missingMessage:
      "docs/user/cli-reference.generated.mdx is missing. Regenerate with: bun run docs:cli:generate",
    staleMessage:
      "CLI reference is stale. Regenerate with: bun run docs:cli:generate (inside a stale framework checkout, rebuild first with bun run framework:dev:bootstrap)",
    successMessage: "ok: docs/user/cli-reference.generated.mdx is up to date",
    beforeCheck: assertCliDistExists,
  }),
});

runScriptMain(main);
