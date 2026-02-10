#!/usr/bin/env node
import path from "node:path";
import { stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function mtimeMs(p) {
  const s = await stat(p);
  return s.mtimeMs;
}

async function assertDistUpToDate() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const agentplaneRoot = path.resolve(here, "..");
  const inRepo = await exists(path.join(agentplaneRoot, "src", "cli.ts"));
  if (!inRepo) return true;

  const allowStale = (process.env.AGENTPLANE_DEV_ALLOW_STALE_DIST ?? "").trim() === "1";
  const distCli = path.join(agentplaneRoot, "dist", "cli.js");
  if (!(await exists(distCli))) {
    process.stderr.write(
      "error: agentplane dist is missing for this repo checkout.\n" +
        "Fix:\n" +
        "  bun run --filter=@agentplaneorg/core build\n" +
        "  bun run --filter=agentplane build\n",
    );
    process.exitCode = 2;
    return false;
  }

  const srcSentinel = path.join(agentplaneRoot, "src", "cli.ts");
  const distTime = await mtimeMs(distCli);
  const srcTime = await mtimeMs(srcSentinel);
  const isStaleAgentplane = srcTime > distTime;

  // If we're in the monorepo, also check core dist because the CLI imports it.
  const repoRoot = path.resolve(agentplaneRoot, "..", "..");
  const coreRoot = path.join(repoRoot, "packages", "core");
  const coreSrc = path.join(coreRoot, "src", "index.ts");
  const coreDist = path.join(coreRoot, "dist", "index.js");
  let isStaleCore = false;
  if ((await exists(coreSrc)) && (await exists(coreDist))) {
    isStaleCore = (await mtimeMs(coreSrc)) > (await mtimeMs(coreDist));
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

const ok = await assertDistUpToDate();
if (ok) await import("../dist/cli.js");
