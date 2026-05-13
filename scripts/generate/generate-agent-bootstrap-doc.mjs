import { writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { assertAgentplaneCliDistFreshForDocs, fileExists } from "../lib/generated-artifacts.mjs";
import { defineScript, runBunx, runScriptMain } from "../lib/script-runtime.mjs";

const ROOT = process.cwd();
const CLI_SOURCE_ENTRY = path.join(
  ROOT,
  "packages",
  "agentplane",
  "src",
  "cli",
  "bootstrap-guide.ts",
);
const DOC_PATH = path.join(ROOT, "docs", "user", "agent-bootstrap.generated.mdx");

function reexecWithBunForSourceImports() {
  if (globalThis.Bun) return false;
  if (process.env.AGENTPLANE_BUN_REEXEC === "1") {
    throw new Error(
      "Bun runtime is required to import TypeScript source modules for this generator.",
    );
  }
  const result = spawnSync("bun", [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, AGENTPLANE_BUN_REEXEC: "1" },
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
  return true;
}

const main = defineScript({
  name: "generate-agent-bootstrap-doc",
  async run() {
    if (reexecWithBunForSourceImports()) return;
    await assertAgentplaneCliDistFreshForDocs(ROOT);
    if (!(await fileExists(CLI_SOURCE_ENTRY))) {
      throw new Error(
        "CLI source bootstrap renderer is missing. Restore packages/agentplane/src/cli/bootstrap-guide.ts before retrying.",
      );
    }

    const moduleUrl = pathToFileURL(CLI_SOURCE_ENTRY).href;
    const { renderBootstrapDoc } = await import(moduleUrl);
    const content = renderBootstrapDoc();
    await writeFile(DOC_PATH, content, "utf8");
    await runBunx(["prettier", "--write", DOC_PATH], { cwd: ROOT });
    process.stdout.write(`generated ${path.relative(ROOT, DOC_PATH)}\n`);
  },
});

runScriptMain(main);
