import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import {
  collectWatchedRuntimeSnapshot,
  getWatchedRuntimePathsForPackage,
  isRuntimeRelevantWatchedFile,
} from "../../bin/runtime-watch.js";
import type { WatchedRuntimeSnapshotFile } from "../../bin/runtime-watch.js";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
type ManifestShape = {
  schema_version: number;
  watched_runtime_paths: string[];
  watched_runtime_snapshot_hash: string;
  watched_runtime_files: WatchedRuntimeSnapshotFile[];
};

async function readManifest(packageDir: string): Promise<ManifestShape> {
  return JSON.parse(
    await readFile(path.join(packageDir, "dist", ".build-manifest.json"), "utf8"),
  ) as ManifestShape;
}

async function setupPackageFixture(packageName: string) {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-runtime-watch-"));
  tempRoots.push(repoRoot);
  const packageDir =
    packageName === "agentplane"
      ? path.join(repoRoot, "packages", "agentplane")
      : path.join(repoRoot, "packages", "core");

  await mkdir(path.join(packageDir, "src"), { recursive: true });
  await mkdir(path.join(packageDir, "bin"), { recursive: true });
  await mkdir(path.join(packageDir, "dist"), { recursive: true });

  await writeFile(
    path.join(packageDir, "package.json"),
    `${JSON.stringify({ name: packageName, type: "module" }, null, 2)}\n`,
    "utf8",
  );
  await writeFile(path.join(packageDir, "src", "index.ts"), "export const index = 1;\n", "utf8");
  await writeFile(path.join(packageDir, "src", "cli.ts"), "export const cli = 1;\n", "utf8");
  await writeFile(path.join(packageDir, "bin", "agentplane.js"), "#!/usr/bin/env node\n", "utf8");
  await writeFile(
    path.join(packageDir, "bin", "dist-guard.js"),
    "export const guard = 1;\n",
    "utf8",
  );
  await writeFile(
    path.join(packageDir, "bin", "runtime-context.js"),
    "export const runtime = 1;\n",
    "utf8",
  );
  await writeFile(
    path.join(packageDir, "bin", "stale-dist-policy.js"),
    "export const policy = 1;\n",
    "utf8",
  );
  await writeFile(path.join(packageDir, "dist", "cli.js"), "export {};\n", "utf8");
  await writeFile(path.join(packageDir, "dist", "index.js"), "export {};\n", "utf8");

  return { repoRoot, packageDir };
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("runtime-watch", () => {
  it("returns explicit watched runtime paths for agentplane", () => {
    expect(getWatchedRuntimePathsForPackage("agentplane")).toEqual([
      "src",
      "bin/agentplane.js",
      "bin/dist-guard.js",
      "bin/runtime-context.js",
      "bin/stale-dist-policy.js",
    ]);
  });

  it("collects deterministic file snapshots across watched runtime paths", async () => {
    const { packageDir } = await setupPackageFixture("agentplane");

    const snapshot = await collectWatchedRuntimeSnapshot(
      packageDir,
      getWatchedRuntimePathsForPackage("agentplane"),
    );

    expect(snapshot.watchedPaths).toEqual(getWatchedRuntimePathsForPackage("agentplane"));
    expect(snapshot.files.map((file) => file.path)).toEqual([
      "bin/agentplane.js",
      "bin/dist-guard.js",
      "bin/runtime-context.js",
      "bin/stale-dist-policy.js",
      "src/cli.ts",
      "src/index.ts",
    ]);
    expect(snapshot.files.every((file) => file.sha256.length === 64)).toBe(true);
    expect(snapshot.snapshotHash.length).toBe(64);
  });

  it("ignores test-only source files and snapshots when collecting runtime snapshots", async () => {
    const { packageDir } = await setupPackageFixture("agentplane");
    await mkdir(path.join(packageDir, "src", "__snapshots__"), { recursive: true });
    await writeFile(
      path.join(packageDir, "src", "cli.test.ts"),
      "export const runtimeWatchTest = true;\n",
      "utf8",
    );
    await writeFile(
      path.join(packageDir, "src", "__snapshots__", "runtime-watch.snap"),
      "snapshot\n",
      "utf8",
    );

    const snapshot = await collectWatchedRuntimeSnapshot(
      packageDir,
      getWatchedRuntimePathsForPackage("agentplane"),
    );

    expect(snapshot.files.map((file) => file.path)).not.toContain("src/cli.test.ts");
    expect(snapshot.files.map((file) => file.path)).not.toContain(
      "src/__snapshots__/runtime-watch.snap",
    );
  });

  it("classifies runtime-relevant watched files conservatively", () => {
    expect(isRuntimeRelevantWatchedFile("src/cli.ts")).toBe(true);
    expect(isRuntimeRelevantWatchedFile("src/cli.test.ts")).toBe(false);
    expect(isRuntimeRelevantWatchedFile("src/__snapshots__/help.snap")).toBe(false);
    expect(isRuntimeRelevantWatchedFile("bin/stale-dist-policy.js")).toBe(true);
  });

  it("writes watched runtime snapshots into build manifests for agentplane", async () => {
    const { packageDir } = await setupPackageFixture("agentplane");
    const scriptPath = path.join(workspaceRoot, "scripts", "write-build-manifest.mjs");

    await execFileAsync("node", [scriptPath, packageDir], { cwd: workspaceRoot });
    const manifest = await readManifest(packageDir);

    expect(manifest.schema_version).toBe(1);
    expect(manifest.watched_runtime_paths).toEqual(getWatchedRuntimePathsForPackage("agentplane"));
    expect(manifest.watched_runtime_files.map((file) => file.path)).toEqual([
      "bin/agentplane.js",
      "bin/dist-guard.js",
      "bin/runtime-context.js",
      "bin/stale-dist-policy.js",
      "src/cli.ts",
      "src/index.ts",
    ]);
    expect(typeof manifest.watched_runtime_snapshot_hash).toBe("string");
    expect(manifest.watched_runtime_snapshot_hash.length).toBe(64);
  });

  it("limits core snapshots to src files", async () => {
    const { packageDir } = await setupPackageFixture("@agentplaneorg/core");
    const scriptPath = path.join(workspaceRoot, "scripts", "write-build-manifest.mjs");

    await execFileAsync("node", [scriptPath, packageDir], { cwd: workspaceRoot });
    const manifest = await readManifest(packageDir);

    expect(manifest.watched_runtime_paths).toEqual(["src"]);
    expect(manifest.watched_runtime_files.map((file) => file.path)).toEqual([
      "src/cli.ts",
      "src/index.ts",
    ]);
  });
});
