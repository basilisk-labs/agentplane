#!/usr/bin/env node
import path from "node:path";
import { readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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

function isTestLikePath(absPath) {
  // The repo build does not emit test files to dist. If we treat test mtimes as
  // "src is newer than dist", we can block normal commits that only change tests.
  const normalized = absPath.replaceAll("\\", "/");
  if (normalized.includes("/__snapshots__/")) return true;
  if (normalized.endsWith(".snap")) return true;
  if (/\.(unit\.)?test\.[cm]?ts$/.test(normalized)) return true;
  if (/\.(unit\.)?test\.tsx$/.test(normalized)) return true;
  return false;
}

// Keep this file dependency-free and simple: rely on directory mtime scans below.
async function newestMtimeMsInDir(dir) {
  let newest = 0;
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
        continue;
      }
      if (!entry.isFile()) continue;
      if (isTestLikePath(abs)) continue;
      try {
        const s = await stat(abs);
        if (s.mtimeMs > newest) newest = s.mtimeMs;
      } catch {
        // ignore
      }
    }
  }
  return newest;
}

async function assertDistUpToDate() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const agentplaneRoot = path.resolve(here, "..");
  const inRepo = await exists(path.join(agentplaneRoot, "src", "cli.ts"));
  if (!inRepo) return true;

  const allowStale = (process.env.AGENTPLANE_DEV_ALLOW_STALE_DIST ?? "").trim() === "1";
  const agentplaneDistDir = path.join(agentplaneRoot, "dist");
  if (!(await exists(agentplaneDistDir))) {
    process.stderr.write(
      "error: agentplane dist is missing for this repo checkout.\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n",
    );
    process.exitCode = 2;
    return false;
  }

  const agentplaneSrcDir = path.join(agentplaneRoot, "src");
  const agentplaneSrcNewest = await newestMtimeMsInDir(agentplaneSrcDir);
  const agentplaneDistNewest = await newestMtimeMsInDir(agentplaneDistDir);
  const isStaleAgentplane = agentplaneSrcNewest > agentplaneDistNewest;

  // If we're in the monorepo, also check core dist because the CLI imports it.
  const repoRoot = path.resolve(agentplaneRoot, "..", "..");
  const coreRoot = path.join(repoRoot, "packages", "core");
  const coreSrcDir = path.join(coreRoot, "src");
  const coreDistDir = path.join(coreRoot, "dist");
  let isStaleCore = false;
  if ((await exists(coreSrcDir)) && (await exists(coreDistDir))) {
    const coreSrcNewest = await newestMtimeMsInDir(coreSrcDir);
    const coreDistNewest = await newestMtimeMsInDir(coreDistDir);
    isStaleCore = coreSrcNewest > coreDistNewest;
  }

  if ((isStaleAgentplane || isStaleCore) && !allowStale) {
    process.stderr.write(
      "error: refusing to run a stale repo build (dist is older than src).\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n" +
        "Override (not recommended): set AGENTPLANE_DEV_ALLOW_STALE_DIST=1\n",
    );
    process.exitCode = 2;
    return false;
  }

  return true;
}

await maybeWarnGlobalBinaryInRepoCheckout();
const ok = await assertDistUpToDate();
if (ok) await import("../dist/cli.js");
