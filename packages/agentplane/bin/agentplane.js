#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { mkdir, rm, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { distExists, isPackageBuildFresh } from "./dist-guard.js";
import {
  FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
  FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
  FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS,
} from "./framework-dev-contract.js";
import { getWatchedRuntimePathsForPackage } from "./runtime-watch.js";
import { classifyStaleDistPolicy } from "./stale-dist-policy.js";
import { isPathInside, resolveFrameworkBinaryContext } from "./runtime-context.js";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function maybeWarnGlobalBinaryInRepoCheckout() {
  const thisBin = fileURLToPath(import.meta.url);
  const context = resolveFrameworkBinaryContext({ cwd: process.cwd(), thisBin });
  const currentBinaryContext = resolveFrameworkBinaryContext({
    cwd: path.dirname(thisBin),
    thisBin,
  });
  if (
    !context.inFrameworkCheckout ||
    context.isRepoLocalBinary ||
    context.isRepoLocalRuntime ||
    currentBinaryContext.isRepoLocalRuntime
  )
    return;

  const normalizedThis = path.resolve(thisBin);
  const normalizedRepo = path.resolve(context.checkout.repoBin);

  process.stderr.write(
    "warning: running global agentplane binary inside repository checkout.\n" +
      "using global binary: " +
      normalizedThis +
      "\n" +
      "expected local binary: " +
      normalizedRepo +
      "\n" +
      "tip: run `node packages/agentplane/bin/agentplane.js ...` for repo-local changes.\n",
  );
}

function shouldUseGlobalBinaryInFramework() {
  return (process.env.AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK ?? "").trim() === "1";
}

function isRepoLocalHandoffInvocation() {
  return (process.env.AGENTPLANE_REPO_LOCAL_HANDOFF ?? "").trim() === "1";
}

function inferRuntimeMode(context) {
  if (context.inFrameworkCheckout && context.isRepoLocalRuntime) {
    return isRepoLocalHandoffInvocation() ? "repo-local-handoff" : "repo-local";
  }
  if (context.inFrameworkCheckout && shouldUseGlobalBinaryInFramework()) {
    return "global-forced-in-framework";
  }
  if (context.inFrameworkCheckout) {
    return "global-in-framework";
  }
  return "global-installed";
}

function primeRuntimeEnv(context) {
  process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = context.thisBin;
  process.env.AGENTPLANE_RUNTIME_MODE = inferRuntimeMode(context);
  if (!isRepoLocalHandoffInvocation()) {
    delete process.env.AGENTPLANE_RUNTIME_HANDOFF_FROM;
  }
}

function handoffToRepoLocalBinary(context) {
  const repoBin = context.checkout?.repoBin;
  if (!repoBin) return false;

  process.stderr.write(
    `info: detected framework checkout; delegating to repo-local binary: ${repoBin}\n`,
  );

  const result = spawnSync(process.execPath, [repoBin, ...process.argv.slice(2)], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: {
      ...process.env,
      AGENTPLANE_REPO_LOCAL_HANDOFF: "1",
      AGENTPLANE_RUNTIME_MODE: "repo-local-handoff",
      AGENTPLANE_RUNTIME_ACTIVE_BIN: path.resolve(repoBin),
      AGENTPLANE_RUNTIME_HANDOFF_FROM: context.thisBin,
    },
  });

  if (result.error) {
    process.stderr.write(`error: failed to launch repo-local binary: ${result.error.message}\n`);
    process.exitCode = 2;
    return true;
  }

  process.exitCode = result.status ?? (result.signal ? 1 : 0);
  return true;
}

async function repoLocalRuntimeReady(repoBin) {
  if (!repoBin) return false;
  const agentplaneRoot = path.resolve(path.dirname(repoBin), "..");
  if (!(await distExists(agentplaneRoot))) return false;
  return missingRepoRuntimeDependencies(agentplaneRoot).length === 0;
}

function resolveCurrentBinaryFrameworkContext(thisBin) {
  return resolveFrameworkBinaryContext({
    cwd: path.dirname(thisBin),
    thisBin,
  });
}

async function maybeHandoffToRepoLocalBinary() {
  if (shouldUseGlobalBinaryInFramework() || isRepoLocalHandoffInvocation()) return false;

  const context = resolveFrameworkBinaryContext({
    cwd: process.cwd(),
    thisBin: fileURLToPath(import.meta.url),
  });
  if (!context.inFrameworkCheckout || context.isRepoLocalBinary) return false;

  if (!(await repoLocalRuntimeReady(context.checkout?.repoBin ?? ""))) {
    const currentBinaryContext = resolveCurrentBinaryFrameworkContext(context.thisBin);
    const canStayOnCurrentRepoLocalBinary =
      currentBinaryContext.inFrameworkCheckout &&
      currentBinaryContext.isRepoLocalRuntime &&
      currentBinaryContext.checkout?.repoRoot !== context.checkout?.repoRoot;
    if (canStayOnCurrentRepoLocalBinary) {
      process.stderr.write(
        "warning: target framework checkout repo-local runtime is not bootstrapped; " +
          `staying on current repo-local binary: ${context.thisBin}\n` +
          `unbootstrapped checkout binary: ${context.checkout?.repoBin ?? "<missing>"}\n` +
          `fix target checkout with: ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n`,
      );
      return false;
    }

    const canStayOnCurrentInstalledBinary =
      !currentBinaryContext.inFrameworkCheckout &&
      !currentBinaryContext.isRepoLocalBinary &&
      !currentBinaryContext.isRepoLocalRuntime;
    if (canStayOnCurrentInstalledBinary) {
      process.stderr.write(
        "warning: target framework checkout repo-local runtime is not bootstrapped; " +
          `staying on current installed binary: ${context.thisBin}\n` +
          `unbootstrapped checkout binary: ${context.checkout?.repoBin ?? "<missing>"}\n` +
          `fix target checkout with: ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n`,
      );
      return false;
    }
  }

  return handoffToRepoLocalBinary(context);
}

function isHooksRunCommitMsgInvocation(argv) {
  const args = argv.slice(2).map((value) => String(value ?? "").trim());
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] !== "hooks") continue;
    return args[i + 1] === "run" && args[i + 2] === "commit-msg";
  }
  return false;
}

function renderStalePolicyWarning(reason) {
  if (reason === "task_artifact_mutation") {
    return "warning: allowing task-artifact lifecycle command to run with a stale repo build inside the framework checkout.\n";
  }
  return "warning: allowing read-only diagnostic command to run with a stale repo build inside the framework checkout.\n";
}

function staleAutoBootstrapEnabled() {
  return (process.env.AGENTPLANE_DEV_AUTO_BOOTSTRAP ?? "1").trim() !== "0";
}

function alreadyTriedStaleAutoBootstrap() {
  return (process.env.AGENTPLANE_DEV_AUTO_BOOTSTRAPPED ?? "").trim() === "1";
}

async function withBootstrapLock(repoRoot, fn) {
  const lockParent = path.join(repoRoot, ".agentplane", "cache");
  const lockDir = path.join(lockParent, "framework-dev-bootstrap.lock");
  await mkdir(lockParent, { recursive: true });
  try {
    await mkdir(lockDir, { recursive: false });
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
    process.stderr.write(
      "error: another framework dev bootstrap is already running.\n" +
        `Retry after the lock is released: ${path.relative(repoRoot, lockDir)}\n`,
    );
    process.exitCode = 2;
    return false;
  }

  try {
    return await fn();
  } finally {
    await rm(lockDir, { recursive: true, force: true });
  }
}

async function autoBootstrapAndRerun(repoRoot, staleReasons, commandPolicy) {
  if (!staleAutoBootstrapEnabled() || alreadyTriedStaleAutoBootstrap()) return false;

  const commandText = process.argv
    .slice(2)
    .map((value) => String(value ?? "").trim())
    .filter(Boolean)
    .join(" ");
  process.stderr.write(
    "info: stale repo build detected; running framework dev bootstrap before command.\n" +
      `command: ${commandText || "<unknown>"}\n` +
      `detected: ${staleReasons.join(", ")}\n` +
      `reason: ${commandPolicy.reason}\n`,
  );

  return await withBootstrapLock(repoRoot, async () => {
    const bootstrap = spawnSync("bun", ["run", "framework:dev:bootstrap"], {
      cwd: repoRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        AGENTPLANE_DEV_AUTO_BOOTSTRAP: "0",
      },
    });

    if (bootstrap.error || bootstrap.status !== 0) {
      const reason = bootstrap.error?.message ?? `exit ${bootstrap.status ?? "unknown"}`;
      process.stderr.write(
        `error: automatic framework dev bootstrap failed (${reason}).\n` +
          "Manual fallback:\n" +
          FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS.map((command) => `  ${command}\n`).join(""),
      );
      process.exitCode = bootstrap.status ?? 2;
      return true;
    }

    const rerun = spawnSync(
      process.execPath,
      [fileURLToPath(import.meta.url), ...process.argv.slice(2)],
      {
        cwd: process.cwd(),
        stdio: "inherit",
        env: {
          ...process.env,
          AGENTPLANE_DEV_AUTO_BOOTSTRAPPED: "1",
        },
      },
    );
    if (rerun.error) {
      process.stderr.write(`error: failed to rerun after bootstrap: ${rerun.error.message}\n`);
      process.exitCode = 2;
      return true;
    }
    process.exitCode = rerun.status ?? (rerun.signal ? 1 : 0);
    return true;
  });
}

function missingRepoRuntimeDependencies(agentplaneRoot) {
  const requireFromAgentplane = createRequire(path.join(agentplaneRoot, "package.json"));
  const frameworkRoot = path.resolve(agentplaneRoot, "..", "..");
  let packageJson = null;
  try {
    packageJson = requireFromAgentplane("./package.json");
  } catch {
    return [];
  }
  const declaredDeps = {};
  if (packageJson?.dependencies && typeof packageJson.dependencies === "object") {
    Object.assign(declaredDeps, packageJson.dependencies);
  }
  if (packageJson?.optionalDependencies && typeof packageJson.optionalDependencies === "object") {
    Object.assign(declaredDeps, packageJson.optionalDependencies);
  }
  if (!("@agentplaneorg/core" in declaredDeps)) {
    return [];
  }
  const requiredSpecifiers = ["@agentplaneorg/core"];
  return requiredSpecifiers.filter((specifier) => {
    try {
      const resolved = requireFromAgentplane.resolve(specifier);
      if (isPathInside(frameworkRoot, resolved)) return false;
      return !existsSync(path.join(agentplaneRoot, "node_modules", ...specifier.split("/")));
    } catch {
      return true;
    }
  });
}

async function assertDistUpToDate() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const agentplaneRoot = path.resolve(here, "..");
  const inRepo = await exists(path.join(agentplaneRoot, "src", "cli.ts"));
  if (!inRepo) return true;

  const allowStale = (process.env.AGENTPLANE_DEV_ALLOW_STALE_DIST ?? "").trim() === "1";
  if (!(await distExists(agentplaneRoot))) {
    process.stderr.write(
      "error: agentplane dist is missing for this framework checkout.\n" +
        "This worktree is not bootstrapped yet.\n" +
        "Fix:\n" +
        `  ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n` +
        "Manual fallback:\n" +
        FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS.map((command) => `  ${command}\n`).join("") +
        "Supported global override when you intentionally want the installed binary:\n" +
        `  ${FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE}\n`,
    );
    process.exitCode = 2;
    return false;
  }

  const missingDeps = missingRepoRuntimeDependencies(agentplaneRoot);
  if (missingDeps.length > 0) {
    process.stderr.write(
      "error: repo-local runtime dependencies are missing for this framework checkout.\n" +
        "This worktree is not bootstrapped yet.\n" +
        "Missing module resolution:\n" +
        missingDeps.map((specifier) => `  ${specifier}\n`).join("") +
        "Fix:\n" +
        `  ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n` +
        "Manual fallback:\n" +
        FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS.map((command) => `  ${command}\n`).join("") +
        "Supported global override when you intentionally want the installed binary:\n" +
        `  ${FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE}\n`,
    );
    process.exitCode = 2;
    return false;
  }

  const repoRoot = path.resolve(agentplaneRoot, "..", "..");
  const coreRoot = path.join(repoRoot, "packages", "core");
  const checks = [
    {
      name: "agentplane",
      root: agentplaneRoot,
      watchedPaths: getWatchedRuntimePathsForPackage("agentplane"),
    },
  ];
  if (await exists(path.join(coreRoot, "src"))) {
    checks.push({
      name: "core",
      root: coreRoot,
      watchedPaths: getWatchedRuntimePathsForPackage("@agentplaneorg/core"),
    });
  }

  const staleReasons = [];
  for (const check of checks) {
    const result = await isPackageBuildFresh(check.root, { watchedPaths: check.watchedPaths });
    if (!result.ok) {
      const detail =
        Array.isArray(result.changedPaths) && result.changedPaths.length > 0
          ? `(${result.changedPaths.slice(0, 5).join(", ")}${result.changedPaths.length > 5 ? ", ..." : ""})`
          : "";
      staleReasons.push(`${check.name}:${result.reason}${detail}`);
    }
  }

  if (staleReasons.length > 0 && !allowStale) {
    const runningInsideCheckout = isPathInside(repoRoot, process.cwd());
    if (!runningInsideCheckout) {
      process.stderr.write(
        "warning: linked development binary has a stale build, but current working directory is outside the agentplane checkout.\n" +
          "proceeding with existing dist output.\n" +
          `detected: ${staleReasons.join(", ")}\n` +
          "tip: rebuild (`bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && bun run --filter=@agentplane/testkit build`) or reinstall from npm for stable global usage.\n",
      );
      return true;
    }

    const commandPolicy = classifyStaleDistPolicy(process.argv);
    if (commandPolicy.mode === "warn_and_run") {
      if (await autoBootstrapAndRerun(repoRoot, staleReasons, commandPolicy)) {
        return false;
      }

      const commandText = process.argv
        .slice(2)
        .map((value) => String(value ?? "").trim())
        .filter(Boolean)
        .join(" ");
      process.stderr.write(
        renderStalePolicyWarning(commandPolicy.reason) +
          `command: ${commandText || "<unknown>"}\n` +
          `detected: ${staleReasons.join(", ")}\n` +
          "rebuild recommended:\n" +
          `  ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n`,
      );
      return true;
    }

    process.stderr.write(
      "error: refusing to run a stale repo build (manifest/git quick-check failed).\n" +
        "Fix:\n" +
        `  ${FRAMEWORK_DEV_BOOTSTRAP_COMMAND}\n` +
        "Manual fallback:\n" +
        FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS.map((command) => `  ${command}\n`).join("") +
        `Detected: ${staleReasons.join(", ")}\n` +
        "Override (not recommended): set AGENTPLANE_DEV_ALLOW_STALE_DIST=1\n",
    );
    process.exitCode = 2;
    return false;
  }

  return true;
}

const runtimeContext = resolveFrameworkBinaryContext({
  cwd: process.cwd(),
  thisBin: fileURLToPath(import.meta.url),
});
primeRuntimeEnv(runtimeContext);

if (!(await maybeHandoffToRepoLocalBinary())) {
  await maybeWarnGlobalBinaryInRepoCheckout();
  const ok = isHooksRunCommitMsgInvocation(process.argv) ? true : await assertDistUpToDate();
  if (ok) await import("../dist/cli.js");
}
