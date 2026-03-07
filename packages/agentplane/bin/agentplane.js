#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { distExists, isPackageBuildFresh } from "./dist-guard.js";
import { resolveFrameworkBinaryContext } from "./runtime-context.js";

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
  if (!context.inFrameworkCheckout || context.isRepoLocalBinary) return;

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

function maybeHandoffToRepoLocalBinary() {
  if (shouldUseGlobalBinaryInFramework() || isRepoLocalHandoffInvocation()) return false;

  const context = resolveFrameworkBinaryContext({
    cwd: process.cwd(),
    thisBin: fileURLToPath(import.meta.url),
  });
  if (!context.inFrameworkCheckout || context.isRepoLocalBinary) return false;

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

function isPathInside(baseDir, targetPath) {
  const rel = path.relative(path.resolve(baseDir), path.resolve(targetPath));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

async function assertDistUpToDate() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const agentplaneRoot = path.resolve(here, "..");
  const inRepo = await exists(path.join(agentplaneRoot, "src", "cli.ts"));
  if (!inRepo) return true;

  const allowStale = (process.env.AGENTPLANE_DEV_ALLOW_STALE_DIST ?? "").trim() === "1";
  if (!(await distExists(agentplaneRoot))) {
    process.stderr.write(
      "error: agentplane dist is missing for this repo checkout.\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n",
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
      watchedPaths: ["src", "bin/agentplane.js", "bin/dist-guard.js"],
    },
  ];
  if (await exists(path.join(coreRoot, "src")))
    checks.push({ name: "core", root: coreRoot, watchedPaths: ["src"] });

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
          "tip: rebuild (`bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`) or reinstall from npm for stable global usage.\n",
      );
      return true;
    }

    process.stderr.write(
      "error: refusing to run a stale repo build (manifest/git quick-check failed).\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n" +
        `Detected: ${staleReasons.join(", ")}\n` +
        "Override (not recommended): set AGENTPLANE_DEV_ALLOW_STALE_DIST=1\n",
    );
    process.exitCode = 2;
    return false;
  }

  return true;
}

if (!maybeHandoffToRepoLocalBinary()) {
  await maybeWarnGlobalBinaryInRepoCheckout();
  const ok = isHooksRunCommitMsgInvocation(process.argv) ? true : await assertDistUpToDate();
  if (ok) await import("../dist/cli.js");
}
