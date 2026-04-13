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

function resolveGitHooksDir(repoRoot) {
  const hooksPath = execFileSync("git", ["rev-parse", "--git-path", "hooks"], {
    cwd: repoRoot,
    encoding: "utf8",
    env: process.env,
  }).trim();
  return path.resolve(repoRoot, hooksPath);
}

function readHookIfPresent(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function isManagedAgentplaneHook(text) {
  return typeof text === "string" && text.includes("agentplane-hook");
}

function isLegacyLefthookHook(text) {
  return (
    typeof text === "string" &&
    (text.includes("call_lefthook()") || text.includes("Can't find lefthook in PATH"))
  );
}

const HOOK_MARKER = "agentplane-hook";
const SHIM_MARKER = "agentplane-hook-shim";
const HOOK_NAMES = ["commit-msg", "pre-commit", "pre-push"];

function hookScriptText(hook) {
  return [
    "#!/usr/bin/env sh",
    `# ${HOOK_MARKER} (do not edit)`,
    "set -e",
    'REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"',
    'SHIM="$REPO_ROOT/.agentplane/bin/agentplane"',
    'if [ -x "$SHIM" ]; then',
    `  exec "$SHIM" hooks run ${hook} "$@"`,
    "fi",
    "if ! command -v agentplane >/dev/null 2>&1; then",
    '  echo "agentplane hooks: runner not found (PATH missing and shim unavailable)." >&2',
    "  exit 127",
    "fi",
    `exec agentplane hooks run ${hook} "$@"`,
    "",
  ].join("\n");
}

function shimScriptText() {
  return [
    "#!/usr/bin/env sh",
    `# ${SHIM_MARKER} (do not edit)`,
    "set -e",
    'SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"',
    'REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"',
    'LOCAL_BIN="$REPO_ROOT/packages/agentplane/bin/agentplane.js"',
    'if command -v node >/dev/null 2>&1 && [ -f "$LOCAL_BIN" ]; then',
    '  exec node "$LOCAL_BIN" "$@"',
    "fi",
    'ENV_BIN="${AGENTPLANE_HOOK_RUNNER:-}"',
    'if [ -n "$ENV_BIN" ] && command -v node >/dev/null 2>&1 && [ -f "$ENV_BIN" ]; then',
    '  exec node "$ENV_BIN" "$@"',
    "fi",
    "if command -v agentplane >/dev/null 2>&1; then",
    '  exec agentplane "$@"',
    "fi",
    "if command -v npx >/dev/null 2>&1; then",
    '  exec npx --yes agentplane "$@"',
    "fi",
    'echo "agentplane shim: runner not found (need env runner, repo-local source, agentplane in PATH, or node+npx)." >&2',
    "  exit 127",
    "",
  ].join("\n");
}

function ensureManagedShim(repoRoot) {
  const shimDir = path.join(repoRoot, ".agentplane", "bin");
  const shimPath = path.join(shimDir, "agentplane");
  const existingShim = readHookIfPresent(shimPath);
  if (existingShim && !existingShim.includes(SHIM_MARKER)) {
    throw new Error(`Refusing to overwrite existing shim: ${path.relative(repoRoot, shimPath)}`);
  }
  fs.mkdirSync(shimDir, { recursive: true });
  fs.writeFileSync(shimPath, shimScriptText(), "utf8");
  fs.chmodSync(shimPath, 0o755);
}

function listLegacyLefthookHooks(repoRoot) {
  const hooksDir = resolveGitHooksDir(repoRoot);
  return HOOK_NAMES.filter((hookName) => {
    const hookText = readHookIfPresent(path.join(hooksDir, hookName));
    return (
      Boolean(hookText) && !isManagedAgentplaneHook(hookText) && isLegacyLefthookHook(hookText)
    );
  });
}

function repairLegacyLefthookHooks(repoRoot) {
  const hooksDir = resolveGitHooksDir(repoRoot);
  const legacyHooks = listLegacyLefthookHooks(repoRoot);
  if (legacyHooks.length === 0) return [];
  ensureManagedShim(repoRoot);
  for (const hookName of legacyHooks) {
    const hookPath = path.join(hooksDir, hookName);
    fs.writeFileSync(hookPath, hookScriptText(hookName), "utf8");
    fs.chmodSync(hookPath, 0o755);
  }
  return legacyHooks;
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

  ensureManagedShim(repoRoot);
  const repairedLegacyHooks = repairLegacyLefthookHooks(repoRoot);
  if (repairedLegacyHooks.length > 0) {
    process.stdout.write(
      `==> Repairing legacy lefthook-generated git hooks: ${repairedLegacyHooks.join(", ")}\n`,
    );
  }

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
