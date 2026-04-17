import { stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertAgentplaneCliDistFreshForDocs } from "./lib/generated-artifacts.mjs";
import { runBunx } from "./lib/script-runtime.mjs";

const ROOT = process.cwd();
const CLI_DIST_DIR = path.join(ROOT, "packages", "agentplane", "dist", "cli");
const CLI_DIST_ENTRY = path.join(CLI_DIST_DIR, "bootstrap-guide.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await assertAgentplaneCliDistFreshForDocs(ROOT);
  if (!(await fileExists(CLI_DIST_ENTRY))) {
    throw new Error(
      "CLI dist bootstrap renderer is missing. Refresh repo-local runtime first:\n" +
        "  bun run framework:dev:bootstrap\n" +
        "Or rebuild explicitly:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  const moduleUrl = pathToFileURL(CLI_DIST_ENTRY).href;
  const { renderBootstrapDoc } = await import(moduleUrl);
  const content = renderBootstrapDoc();
  await writeFile(DOC_PATH, content, "utf8");
  await runBunx(["prettier", "--write", DOC_PATH], { cwd: ROOT });
  process.stdout.write(`generated ${path.relative(ROOT, DOC_PATH)}\n`);
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
