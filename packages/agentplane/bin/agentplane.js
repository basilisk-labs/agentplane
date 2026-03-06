#!/usr/bin/env node
import path from "node:path";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { distExists, isPackageBuildFresh } from "./dist-guard.js";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function maybeWarnGlobalBinaryInRepoCheckout() {
  const cwd = process.cwd();
  const repoCli = path.join(cwd, "packages", "agentplane", "src", "cli.ts");
  const repoBin = path.join(cwd, "packages", "agentplane", "bin", "agentplane.js");
  if (!(await exists(repoCli)) || !(await exists(repoBin))) return;

  const thisBin = fileURLToPath(import.meta.url);
  const normalizedThis = path.resolve(thisBin);
  const normalizedRepo = path.resolve(repoBin);
  if (normalizedThis === normalizedRepo) return;

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

await maybeWarnGlobalBinaryInRepoCheckout();
const ok = isHooksRunCommitMsgInvocation(process.argv) ? true : await assertDistUpToDate();
if (ok) await import("../dist/cli.js");
