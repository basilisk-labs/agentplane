import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
  FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
  FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND,
  FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS,
  FRAMEWORK_DEV_REINSTALL_SCRIPT,
  FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND,
} from "../packages/agentplane/bin/framework-dev-contract.js";
import { resolveCommonRepoRoot } from "./generate-recipes-inventory.mjs";

function printUsage() {
  process.stdout.write(
    [
      `Usage: ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}`,
      "",
      "Prepare a fresh framework checkout for repo-local development:",
      "- install workspace dependencies when node_modules is missing",
      "- initialize the agentplane-recipes submodule when it is empty",
      "- build @agentplaneorg/core and agentplane",
      "- verify the repo-local runtime",
      "",
      `Repo-local verify: ${FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND}`,
    ].join("\n") + "\n",
  );
}

function isRepoRoot(repoRoot) {
  return (
    fs.existsSync(path.join(repoRoot, "package.json")) &&
    fs.existsSync(path.join(repoRoot, "packages", "agentplane")) &&
    fs.existsSync(path.join(repoRoot, ".agentplane", "config.json"))
  );
}

export function resolveRepoRoot(cwd = process.cwd()) {
  let current = path.resolve(cwd);
  while (true) {
    if (isRepoRoot(current)) return current;
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(
        "Run this command from the framework repository root or one of its children.",
      );
    }
    current = parent;
  }
}

function defaultExec(repoRoot, cmd, args) {
  execFileSync(cmd, args, {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env,
  });
}

function hasWorkspaceNodeModules(repoRoot) {
  return fs.existsSync(path.join(repoRoot, "node_modules"));
}

function hasBootstrapBuildInstallLayout(repoRoot) {
  return (
    hasWorkspaceNodeModules(repoRoot) &&
    fs.existsSync(path.join(repoRoot, "packages", "core", "node_modules")) &&
    fs.existsSync(path.join(repoRoot, "packages", "agentplane", "node_modules"))
  );
}

function hasRecipesIndex(repoRoot) {
  return fs.existsSync(path.join(repoRoot, "agentplane-recipes", "index.json"));
}

function linkDirectoryFromCommonRoot(repoRoot, commonRepoRoot, relativePath) {
  if (repoRoot === commonRepoRoot) return false;
  const localPath = path.join(repoRoot, relativePath);
  if (fs.existsSync(localPath)) return false;

  const commonPath = path.join(commonRepoRoot, relativePath);
  if (!fs.existsSync(commonPath)) return false;

  const symlinkType = process.platform === "win32" ? "junction" : "dir";
  fs.symlinkSync(commonPath, localPath, symlinkType);
  return true;
}

function linkBootstrapBuildInstallLayoutFromCommonRoot(repoRoot, commonRepoRoot) {
  return [
    "node_modules",
    path.join("packages", "core", "node_modules"),
    path.join("packages", "agentplane", "node_modules"),
  ].filter((relativePath) => linkDirectoryFromCommonRoot(repoRoot, commonRepoRoot, relativePath));
}

function printFooter() {
  process.stdout.write(
    [
      "",
      "Framework dev runtime is ready.",
      `Repo-local verify: ${FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND}`,
      `Global verify: ${FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND}`,
      `If PATH should resolve this checkout: ${FRAMEWORK_DEV_REINSTALL_SCRIPT}`,
      `Optional force-global override: ${FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE}`,
    ].join("\n") + "\n",
  );
}

function defaultResolveCommonRepoRoot(repoRoot) {
  try {
    return resolveCommonRepoRoot(repoRoot);
  } catch {
    return repoRoot;
  }
}

export function runFrameworkDevBootstrap(cwd = process.cwd(), exec = defaultExec, options = {}) {
  const repoRoot = resolveRepoRoot(cwd);
  const commonRepoRoot = (options.resolveCommonRepoRoot ?? defaultResolveCommonRepoRoot)(repoRoot);

  process.stdout.write(`==> Framework repo: ${repoRoot}\n`);

  const linkedInstallLayout = linkBootstrapBuildInstallLayoutFromCommonRoot(
    repoRoot,
    commonRepoRoot,
  );
  if (linkedInstallLayout.includes("node_modules")) {
    process.stdout.write(
      `==> Reusing workspace dependencies from common repo root: ${commonRepoRoot}\n`,
    );
  }
  if (linkedInstallLayout.some((relativePath) => relativePath !== "node_modules")) {
    process.stdout.write(
      `==> Reusing package-local install layout from common repo root: ${commonRepoRoot}\n`,
    );
  }

  if (hasBootstrapBuildInstallLayout(repoRoot)) {
    process.stdout.write("==> Bootstrap install layout already present; skipping bun install\n");
  } else {
    process.stdout.write("==> Installing workspace dependencies\n");
    exec(repoRoot, "bun", ["install"]);
  }

  if (hasRecipesIndex(repoRoot)) {
    process.stdout.write(
      "==> Recipes submodule already initialized; skipping git submodule update\n",
    );
  } else if (commonRepoRoot !== repoRoot && hasRecipesIndex(commonRepoRoot)) {
    process.stdout.write(
      `==> Recipes submodule already available in common repo root; skipping local git submodule update: ${commonRepoRoot}\n`,
    );
  } else {
    process.stdout.write("==> Initializing agentplane-recipes submodule\n");
    try {
      exec(repoRoot, "git", ["submodule", "update", "--init", "--recursive", "agentplane-recipes"]);
    } catch (error) {
      throw new Error(
        "Failed to initialize agentplane-recipes. The superproject may pin a submodule commit that is not available on the remote yet.",
        { cause: error },
      );
    }
  }

  process.stdout.write("==> Building @agentplaneorg/core\n");
  exec(repoRoot, "bun", ["run", "--filter=@agentplaneorg/core", "build"]);
  process.stdout.write("==> Building agentplane\n");
  exec(repoRoot, "bun", ["run", "--filter=agentplane", "build"]);

  process.stdout.write("==> Verifying repo-local runtime\n");
  exec(repoRoot, "node", ["packages/agentplane/bin/agentplane.js", "runtime", "explain"]);
  printFooter();
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (isDirectRun) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    printUsage();
  } else {
    try {
      runFrameworkDevBootstrap();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      process.stderr.write(`error: ${message}\n`);
      process.stderr.write("Manual fallback:\n");
      for (const command of FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS) {
        process.stderr.write(`  ${command}\n`);
      }
      process.exitCode = 2;
    }
  }
}
