import { execFileSync } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";

import {
  FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
  FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
} from "../packages/agentplane/bin/framework-dev-contract.js";
import { listStagedGitFiles } from "./lib/staged-git-files.mjs";
import { eslintTargets, prettierTargets } from "./lib/pre-commit-staged-files.mjs";

function run(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: env ? { ...process.env, ...env } : process.env,
  });
}

function repoRoot() {
  return execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
}

function localBin(root, name) {
  const ext = process.platform === "win32" ? ".cmd" : "";
  return path.join(root, "node_modules", ".bin", `${name}${ext}`);
}

async function ensureLocalTool(root, name) {
  const toolPath = localBin(root, name);
  try {
    await access(toolPath);
    return toolPath;
  } catch {
    return null;
  }
}

function printMissingToolError(root, missingTools) {
  process.stderr.write(
    "error: pre-commit hook dependencies are missing for this checkout.\n" +
      `Missing local tool${missingTools.length > 1 ? "s" : ""}:\n` +
      missingTools.map((tool) => `  ${tool}: ${localBin(root, tool)}\n`).join("") +
      "Fix:\n" +
      `  ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n` +
      "If you intentionally want to force the installed CLI inside a framework checkout:\n" +
      `  ${FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE}\n`,
  );
}

async function runChecked(root, tool, args, missingTools) {
  const toolPath = await ensureLocalTool(root, tool);
  if (!toolPath) {
    missingTools.push(tool);
    return;
  }
  run(toolPath, args);
}

const root = repoRoot();
const files = listStagedGitFiles();
const missingTools = [];

const prettierFiles = prettierTargets(files);
if (prettierFiles.length > 0) {
  await runChecked(root, "prettier", ["--check", ...prettierFiles], missingTools);
} else {
  process.stdout.write("pre-commit: no staged files for Prettier, skipping.\n");
}

const eslintFiles = eslintTargets(files);
if (eslintFiles.length > 0) {
  await runChecked(root, "eslint", eslintFiles, missingTools);
} else {
  process.stdout.write("pre-commit: no staged files for ESLint, skipping.\n");
}

if (missingTools.length > 0) {
  printMissingToolError(root, [...new Set(missingTools)]);
  process.exitCode = 2;
}
