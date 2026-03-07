import { execFileSync } from "node:child_process";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  collectWatchedRuntimeSnapshot,
  getWatchedRuntimePathsForPackage,
} from "../packages/agentplane/bin/runtime-watch.js";

async function fileMtimeMs(p) {
  try {
    const s = await stat(p);
    return s.isFile() ? s.mtimeMs : null;
  } catch {
    return null;
  }
}

function resolveGitHead(cwd) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd, encoding: "utf8" }).trim() || null;
  } catch {
    return null;
  }
}

async function main() {
  const packageDirArg = process.argv[2];
  if (!packageDirArg) {
    throw new Error("usage: node scripts/write-build-manifest.mjs <package-dir>");
  }

  const packageDir = path.resolve(packageDirArg);
  const packageJson = JSON.parse(await readFile(path.join(packageDir, "package.json"), "utf8"));
  const watchedRuntime = await collectWatchedRuntimeSnapshot(
    packageDir,
    getWatchedRuntimePathsForPackage(packageJson.name),
  );
  const srcCliPath = path.join(packageDir, "src", "cli.ts");
  const srcIndexPath = path.join(packageDir, "src", "index.ts");
  const distCliPath = path.join(packageDir, "dist", "cli.js");
  const distIndexPath = path.join(packageDir, "dist", "index.js");
  const tsBuildInfoPath = path.join(packageDir, "tsconfig.tsbuildinfo");

  const srcCliMtimeMs = await fileMtimeMs(srcCliPath);
  const srcIndexMtimeMs = await fileMtimeMs(srcIndexPath);
  const distCliMtimeMs = await fileMtimeMs(distCliPath);
  const distIndexMtimeMs = await fileMtimeMs(distIndexPath);
  const tsBuildInfoMtimeMs = await fileMtimeMs(tsBuildInfoPath);

  const manifest = {
    schema_version: 1,
    package_dir: packageDir,
    generated_at: new Date().toISOString(),
    git_head: resolveGitHead(packageDir),
    src_cli_mtime_ms: srcCliMtimeMs,
    src_index_mtime_ms: srcIndexMtimeMs,
    dist_cli_mtime_ms: distCliMtimeMs,
    dist_index_mtime_ms: distIndexMtimeMs,
    tsbuildinfo_mtime_ms: tsBuildInfoMtimeMs,
    watched_runtime_paths: watchedRuntime.watchedPaths,
    watched_runtime_snapshot_hash: watchedRuntime.snapshotHash,
    watched_runtime_files: watchedRuntime.files,
  };

  const outPath = path.join(packageDir, "dist", ".build-manifest.json");
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

await main();
