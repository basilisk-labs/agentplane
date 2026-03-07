import { stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

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

function runBunx(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("bunx", args, {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`bunx ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

async function main() {
  if (!(await fileExists(CLI_DIST_ENTRY))) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  const moduleUrl = pathToFileURL(CLI_DIST_ENTRY).href;
  const { renderBootstrapDoc } = await import(moduleUrl);
  const content = renderBootstrapDoc();
  await writeFile(DOC_PATH, content, "utf8");
  await runBunx(["prettier", "--write", DOC_PATH]);
  process.stdout.write(`generated ${path.relative(ROOT, DOC_PATH)}\n`);
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
