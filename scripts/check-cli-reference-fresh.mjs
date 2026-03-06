import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const CLI_DIST = path.join(ROOT, "packages", "agentplane", "dist", "cli.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "cli-reference.generated.mdx");

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`Command failed with exit code ${code ?? "unknown"}`));
    });
  });
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
  if (!(await fileExists(CLI_DIST))) {
    throw new Error(
      "CLI dist is missing. Build first:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build",
    );
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-docs-"));
  const generatedPath = path.join(tempDir, "cli-reference.generated.mdx");

  try {
    // Run dist entrypoint directly to avoid dev wrapper stale-check guards from bin/agentplane.js.
    await runNode([CLI_DIST, "docs", "cli", "--out", generatedPath]);
    await runBunx(["prettier", "--write", generatedPath]);
    const [expected, actual] = await Promise.all([
      readFile(DOC_PATH, "utf8"),
      readFile(generatedPath, "utf8"),
    ]);

    if (expected !== actual) {
      throw new Error(
        "CLI reference is stale. Regenerate with: node packages/agentplane/dist/cli.js docs cli --out docs/user/cli-reference.generated.mdx",
      );
    }

    process.stdout.write("ok: docs/user/cli-reference.generated.mdx is up to date\n");
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
