import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const DOC_PATH = path.join(ROOT, "docs", "recipes-inventory.json");

async function fileExists(filePath) {
  try {
    await stat(filePath);
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

async function main() {
  if (!(await fileExists(DOC_PATH))) {
    throw new Error(
      "docs/recipes-inventory.json is missing. Regenerate with: node scripts/generate-recipes-inventory.mjs",
    );
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-inventory-"));
  const generatedPath = path.join(tempDir, "recipes-inventory.json");
  try {
    await runNode(["scripts/generate-recipes-inventory.mjs", "--out", generatedPath]);
    const [expected, actual] = await Promise.all([
      readFile(DOC_PATH, "utf8"),
      readFile(generatedPath, "utf8"),
    ]);
    if (expected !== actual) {
      throw new Error(
        "Recipes inventory is stale. Regenerate with: node scripts/generate-recipes-inventory.mjs",
      );
    }
    process.stdout.write("ok: docs/recipes-inventory.json is up to date\n");
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
