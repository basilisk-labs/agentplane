import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { distExists, isPackageBuildFresh } from "../../packages/agentplane/bin/dist-guard.js";
import { runBunx } from "./script-runtime.mjs";

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

export async function checkGeneratedTextArtifactFresh({
  outputPath,
  generateText,
  missingMessage,
  staleMessage,
}) {
  if (!(await fileExists(outputPath))) {
    throw new Error(missingMessage);
  }

  const [expected, actual] = await Promise.all([readFile(outputPath, "utf8"), generateText()]);
  if (expected !== actual) {
    throw new Error(staleMessage);
  }
}

export async function writeGeneratedTextArtifact({ outputPath, generateText }) {
  await writeFile(outputPath, await generateText(), "utf8");
}

export function defineGeneratedArtifactCheck({
  outputPath,
  tempPrefix,
  fileName,
  generate,
  formatWithPrettier = false,
  missingMessage,
  staleMessage,
  successMessage,
  beforeCheck,
}) {
  return async function runGeneratedArtifactCheck() {
    if (beforeCheck) {
      await beforeCheck();
    }
    await checkGeneratedArtifactFresh({
      outputPath,
      tempPrefix,
      fileName,
      generate,
      formatWithPrettier,
      missingMessage,
      staleMessage,
    });
    if (successMessage) {
      process.stdout.write(`${successMessage}\n`);
    }
  };
}

export async function assertAgentplaneCliDistFreshForDocs(root = ROOT) {
  const packageRoot = path.join(root, "packages", "agentplane");
  if (!(await distExists(packageRoot))) {
    throw new Error(
      "CLI dist is missing for bootstrap docs. Refresh repo-local runtime first:\n" +
        "  bun run framework:dev:bootstrap\n" +
        "Or rebuild explicitly:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n" +
        "  bun run --filter=@agentplane/testkit build",
    );
  }

  const freshness = await isPackageBuildFresh(packageRoot, {
    watchedPaths: [
      "src",
      "bin/agentplane.js",
      "bin/runtime-context.js",
      "bin/stale-dist-policy.js",
    ],
  });
  if (freshness.ok) return;

  const changedSummary =
    Array.isArray(freshness.changedPaths) && freshness.changedPaths.length > 0
      ? `\nChanged watched paths:\n- ${freshness.changedPaths.join("\n- ")}`
      : "";
  throw new Error(
    `CLI dist is stale for bootstrap docs (${freshness.reason}). Refresh repo-local runtime first:\n` +
      "  bun run framework:dev:bootstrap\n" +
      "Or rebuild explicitly:\n" +
      "  bun run --filter=@agentplaneorg/core build\n" +
      "  bun run --filter=agentplane build\n" +
      "  bun run --filter=@agentplane/testkit build" +
      changedSummary,
  );
}
