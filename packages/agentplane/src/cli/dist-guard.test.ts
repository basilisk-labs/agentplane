import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { isPackageBuildFresh } from "../../bin/dist-guard.js";
import { collectWatchedRuntimeSnapshot } from "../../bin/runtime-watch.js";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
type DistGuardResult = {
  ok: boolean;
  reason: string;
  changedPaths: string[];
};
type BuildManifestFixture = Record<string, unknown>;
const readBuildFreshness = isPackageBuildFresh as (
  packageRoot: string,
  options: { watchedPaths: string[] },
) => Promise<DistGuardResult>;

async function setupPackageRepo() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-dist-guard-"));
  tempRoots.push(repoRoot);
  const packageRoot = path.join(repoRoot, "packages", "agentplane");
  await mkdir(path.join(packageRoot, "src"), { recursive: true });
  await mkdir(path.join(packageRoot, "dist"), { recursive: true });
  await mkdir(path.join(packageRoot, "bin"), { recursive: true });
  await writeFile(path.join(packageRoot, "src", "cli.ts"), "export const cli = 1;\n", "utf8");
  await writeFile(path.join(packageRoot, "src", "index.ts"), "export const index = 1;\n", "utf8");
  await writeFile(path.join(packageRoot, "bin", "agentplane.js"), "#!/usr/bin/env node\n", "utf8");
  await writeFile(
    path.join(packageRoot, "bin", "runtime-context.js"),
    "export const runtime = 1;\n",
    "utf8",
  );
  await writeFile(
    path.join(packageRoot, "bin", "stale-dist-policy.js"),
    "export const policy = 1;\n",
    "utf8",
  );

  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.name", "Dist Guard Test"], { cwd: repoRoot });
  await execFileAsync("git", ["config", "user.email", "dist-guard@example.com"], { cwd: repoRoot });
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "feat: initial package"], { cwd: repoRoot });

  const [{ stdout: head }, cliStat, indexStat] = await Promise.all([
    execFileAsync("git", ["rev-parse", "HEAD"], { cwd: packageRoot }),
    stat(path.join(packageRoot, "src", "cli.ts")),
    stat(path.join(packageRoot, "src", "index.ts")),
  ]);
  const manifest = {
    schema_version: 1,
    git_head: head.trim(),
    src_cli_mtime_ms: cliStat.mtimeMs,
    src_index_mtime_ms: indexStat.mtimeMs,
  };
  await writeFile(
    path.join(packageRoot, "dist", ".build-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  await execFileAsync("git", ["add", "."], { cwd: repoRoot });
  await execFileAsync("git", ["commit", "-m", "build: write manifest"], { cwd: repoRoot });

  return { repoRoot, packageRoot };
}

async function rewriteManifestWithSnapshot(packageRoot: string, watchedPaths: string[]) {
  const manifestPath = path.join(packageRoot, "dist", ".build-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as BuildManifestFixture;
  const snapshot = await collectWatchedRuntimeSnapshot(packageRoot, watchedPaths);
  const nextManifest = {
    ...manifest,
    watched_runtime_paths: snapshot.watchedPaths,
    watched_runtime_snapshot_hash: snapshot.snapshotHash,
    watched_runtime_files: snapshot.files,
  };
  await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`, "utf8");
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("dist-guard", () => {
  const DIST_GUARD_TIMEOUT_MS = 60_000;

  it(
    "allows commits after build when only non-runtime paths changed",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { repoRoot, packageRoot } = await setupPackageRepo();
      await writeFile(path.join(repoRoot, "README.md"), "docs only\n", "utf8");
      await execFileAsync("git", ["add", "README.md"], { cwd: repoRoot });
      await execFileAsync("git", ["commit", "-m", "docs: update readme"], { cwd: repoRoot });

      const result = await readBuildFreshness(packageRoot, {
        watchedPaths: [
          "src",
          "bin/agentplane.js",
          "bin/runtime-context.js",
          "bin/stale-dist-policy.js",
        ],
      });

      expect(result.ok).toBe(true);
    },
  );

  it(
    "blocks when runtime paths changed after the build manifest commit",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { repoRoot, packageRoot } = await setupPackageRepo();
      const cliPath = path.join(packageRoot, "src", "cli.ts");
      const current = await readFile(cliPath, "utf8");
      await writeFile(cliPath, `${current}export const changed = 1;\n`, "utf8");
      await execFileAsync("git", ["add", "."], { cwd: repoRoot });
      await execFileAsync("git", ["commit", "-m", "feat: change cli runtime"], { cwd: repoRoot });

      const result = await readBuildFreshness(packageRoot, {
        watchedPaths: [
          "src",
          "bin/agentplane.js",
          "bin/runtime-context.js",
          "bin/stale-dist-policy.js",
        ],
      });

      expect(result.ok).toBe(false);
      expect(result.reason).toBe("watched_paths_changed");
      expect(result.changedPaths).toContain("packages/agentplane/src/cli.ts");
    },
  );

  it(
    "ignores test-only source churn for legacy non-snapshot manifests",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { packageRoot } = await setupPackageRepo();
      await writeFile(
        path.join(packageRoot, "src", "cli.test.ts"),
        "export const cliTestOnly = 1;\n",
        "utf8",
      );

      const result = await readBuildFreshness(packageRoot, {
        watchedPaths: [
          "src",
          "bin/agentplane.js",
          "bin/runtime-context.js",
          "bin/stale-dist-policy.js",
        ],
      });

      expect(result.ok).toBe(true);
      expect(result.changedPaths).toEqual([]);
    },
  );

  it(
    "tracks standalone runtime bin policy files as watched paths",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { packageRoot } = await setupPackageRepo();
      const policyPath = path.join(packageRoot, "bin", "stale-dist-policy.js");
      const current = await readFile(policyPath, "utf8");
      await writeFile(policyPath, `${current}export const dirty = 1;\n`, "utf8");

      const result = await readBuildFreshness(packageRoot, {
        watchedPaths: [
          "src",
          "bin/agentplane.js",
          "bin/runtime-context.js",
          "bin/stale-dist-policy.js",
        ],
      });

      expect(result.ok).toBe(false);
      expect(result.reason).toBe("watched_paths_changed");
      expect(result.changedPaths).toContain("packages/agentplane/bin/stale-dist-policy.js");
    },
  );

  it(
    "treats rebuilt dirty runtime trees as fresh when manifest snapshots match current source",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { packageRoot } = await setupPackageRepo();
      const policyPath = path.join(packageRoot, "bin", "stale-dist-policy.js");
      const current = await readFile(policyPath, "utf8");
      await writeFile(policyPath, `${current}export const rebuilt = 1;\n`, "utf8");

      const watchedPaths = [
        "src",
        "bin/agentplane.js",
        "bin/runtime-context.js",
        "bin/stale-dist-policy.js",
      ];
      await rewriteManifestWithSnapshot(packageRoot, watchedPaths);

      const result = await readBuildFreshness(packageRoot, { watchedPaths });

      expect(result.ok).toBe(true);
      expect(result.reason).toBe("fresh_after_snapshot_match");
    },
  );

  it(
    "reports snapshot-changed runtime files when current source diverges from the built manifest",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { packageRoot } = await setupPackageRepo();
      const watchedPaths = [
        "src",
        "bin/agentplane.js",
        "bin/runtime-context.js",
        "bin/stale-dist-policy.js",
      ];
      await rewriteManifestWithSnapshot(packageRoot, watchedPaths);

      const policyPath = path.join(packageRoot, "bin", "stale-dist-policy.js");
      const current = await readFile(policyPath, "utf8");
      await writeFile(policyPath, `${current}export const changedAgain = 1;\n`, "utf8");

      const result = await readBuildFreshness(packageRoot, { watchedPaths });

      expect(result.ok).toBe(false);
      expect(result.reason).toBe("watched_runtime_snapshot_changed");
      expect(result.changedPaths).toContain("bin/stale-dist-policy.js");
    },
  );

  it(
    "ignores test-only source churn for snapshot-backed manifests",
    { timeout: DIST_GUARD_TIMEOUT_MS },
    async () => {
      const { packageRoot } = await setupPackageRepo();
      const watchedPaths = [
        "src",
        "bin/agentplane.js",
        "bin/runtime-context.js",
        "bin/stale-dist-policy.js",
      ];
      await rewriteManifestWithSnapshot(packageRoot, watchedPaths);
      await writeFile(
        path.join(packageRoot, "src", "cli.test.ts"),
        "export const cliTestOnly = 2;\n",
        "utf8",
      );

      const result = await readBuildFreshness(packageRoot, { watchedPaths });

      expect(result.ok).toBe(true);
      expect(result.changedPaths).toEqual([]);
    },
  );
});
