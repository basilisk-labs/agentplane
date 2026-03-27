import path from "node:path";
import {
  ROOT,
  checkGeneratedArtifactFresh,
  fileExists,
  runNode,
} from "./lib/generated-artifacts.mjs";

const CLI_DIST = path.join(ROOT, "packages", "agentplane", "dist", "cli.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "cli-reference.generated.mdx");

async function main() {
  if (!(await fileExists(CLI_DIST))) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  await checkGeneratedArtifactFresh({
    outputPath: DOC_PATH,
    tempPrefix: "agentplane-cli-docs-",
    fileName: "cli-reference.generated.mdx",
    generate: (generatedPath) => runNode([CLI_DIST, "docs", "cli", "--out", generatedPath]),
    formatWithPrettier: true,
    missingMessage:
      "docs/user/cli-reference.generated.mdx is missing. Regenerate with: agentplane docs cli --out docs/user/cli-reference.generated.mdx",
    staleMessage:
      "CLI reference is stale. Regenerate with: agentplane docs cli --out docs/user/cli-reference.generated.mdx (inside a stale framework checkout, rebuild first or run node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx)",
  });

  process.stdout.write("ok: docs/user/cli-reference.generated.mdx is up to date\n");
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
