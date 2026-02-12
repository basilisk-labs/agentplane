import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const CLI_BIN = path.join(ROOT, "packages", "agentplane", "bin", "agentplane.js");
const DOC_PATH = path.join(ROOT, "docs", "user", "cli-reference.generated.mdx");

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
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-docs-"));
  const generatedPath = path.join(tempDir, "cli-reference.generated.mdx");

  try {
    await runNode([CLI_BIN, "docs", "cli", "--out", generatedPath]);
    await runBunx(["prettier", "--write", generatedPath]);
    const [expected, actual] = await Promise.all([
      readFile(DOC_PATH, "utf8"),
      readFile(generatedPath, "utf8"),
    ]);

    if (expected !== actual) {
      throw new Error(
        "CLI reference is stale. Regenerate with: node packages/agentplane/bin/agentplane.js docs cli --out docs/user/cli-reference.generated.mdx",
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
