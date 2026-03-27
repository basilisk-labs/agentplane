import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

export const ROOT = process.cwd();

export async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`node ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

export function runBunx(args) {
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

export async function checkGeneratedArtifactFresh({
  outputPath,
  tempPrefix,
  fileName,
  generate,
  formatWithPrettier = false,
  missingMessage,
  staleMessage,
}) {
  if (!(await fileExists(outputPath))) {
    throw new Error(missingMessage);
  }

  const tempDir = await mkdtemp(path.join(os.tmpdir(), tempPrefix));
  const generatedPath = path.join(tempDir, fileName);

  try {
    await generate(generatedPath);
    if (formatWithPrettier) {
      await runBunx(["prettier", "--write", generatedPath]);
    }
    const [expected, actual] = await Promise.all([
      readFile(outputPath, "utf8"),
      readFile(generatedPath, "utf8"),
    ]);
    if (expected !== actual) {
      throw new Error(staleMessage);
    }
  } finally {
    await rm(tempDir, { recursive: true, force: true });
  }
}
