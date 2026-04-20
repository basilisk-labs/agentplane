import { writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { assertAgentplaneCliDistFreshForDocs, fileExists } from "./lib/generated-artifacts.mjs";
import { defineScript, runBunx, runScriptMain } from "./lib/script-runtime.mjs";

const ROOT = process.cwd();
const CLI_DIST_DIR = path.join(ROOT, "packages", "agentplane", "dist", "cli");
const CLI_DIST_ENTRY = path.join(CLI_DIST_DIR, "bootstrap-guide.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");

const main = defineScript({
  name: "generate-agent-bootstrap-doc",
  async run() {
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
  },
});

runScriptMain(main);
