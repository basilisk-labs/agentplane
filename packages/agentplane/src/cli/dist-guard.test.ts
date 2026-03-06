import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

import { isPackageBuildFresh } from "../../bin/dist-guard.js";

const execFileAsync = promisify(execFile);
const tempRoots: string[] = [];
type DistGuardResult = {
  ok: boolean;
  reason: string;
  changedPaths: string[];
};
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

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("dist-guard", () => {
  it("allows commits after build when only non-runtime paths changed", async () => {
    const { repoRoot, packageRoot } = await setupPackageRepo();
    await writeFile(path.join(repoRoot, "README.md"), "docs only\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: repoRoot });
    await execFileAsync("git", ["commit", "-m", "docs: update readme"], { cwd: repoRoot });

    const result = await readBuildFreshness(packageRoot, {
      watchedPaths: ["src", "bin/agentplane.js"],
    });

    expect(result.ok).toBe(true);
  });

  it("blocks when runtime paths changed after the build manifest commit", async () => {
    const { repoRoot, packageRoot } = await setupPackageRepo();
    const cliPath = path.join(packageRoot, "src", "cli.ts");
    const current = await readFile(cliPath, "utf8");
    await writeFile(cliPath, `${current}export const changed = 1;\n`, "utf8");
    await execFileAsync("git", ["add", "."], { cwd: repoRoot });
    await execFileAsync("git", ["commit", "-m", "feat: change cli runtime"], { cwd: repoRoot });

    const result = await readBuildFreshness(packageRoot, {
      watchedPaths: ["src", "bin/agentplane.js"],
    });

    expect(result.ok).toBe(false);
    expect(result.reason).toBe("watched_paths_changed");
    expect(result.changedPaths).toContain("packages/agentplane/src/cli.ts");
  });
});
