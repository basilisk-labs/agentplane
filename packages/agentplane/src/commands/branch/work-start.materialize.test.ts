import {
  lstat,
  mkdtemp,
  mkdir,
  readFile,
  readlink,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isReusableWorkspaceInstallLayout,
  materializeRepoLocalInstallLayoutForWorktree,
} from "./work-start.materialize.js";

const tempRoots: string[] = [];

async function temporaryRepo(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-install-layout-"));
  tempRoots.push(root);
  await mkdir(path.join(root, ".agentplane", "worktrees"), { recursive: true });
  return root;
}

async function writeRootManifest(root: string): Promise<void> {
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({
      name: "fixture",
      private: true,
      devDependencies: { eslint: "^10.5.0" },
    }),
    "utf8",
  );
}

afterEach(async () => {
  vi.restoreAllMocks();
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("task-worktree install layout materialization", () => {
  it("rejects unreadable manifests, missing dependencies, and dependency roots without manifests", async () => {
    const repoRoot = await temporaryRepo();
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);

    await writeRootManifest(repoRoot);
    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);

    await mkdir(path.join(repoRoot, "node_modules", "eslint"), { recursive: true });
    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);
  });

  it("rejects a dangling declared dependency target", async () => {
    const repoRoot = await temporaryRepo();
    await writeRootManifest(repoRoot);
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await symlink(
      path.join(repoRoot, ".agentplane", "worktrees", "removed", "node_modules", "eslint"),
      path.join(repoRoot, "node_modules", "eslint"),
      "dir",
    );

    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);
  });

  it("rejects a declared dependency owned by another task worktree", async () => {
    const repoRoot = await temporaryRepo();
    await writeRootManifest(repoRoot);
    const foreignDependency = path.join(
      repoRoot,
      ".agentplane",
      "worktrees",
      "foreign",
      "node_modules",
      "eslint",
    );
    await mkdir(foreignDependency, { recursive: true });
    await writeFile(path.join(foreignDependency, "package.json"), '{"name":"eslint"}\n', "utf8");
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await symlink(foreignDependency, path.join(repoRoot, "node_modules", "eslint"), "dir");

    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);
  });

  it("rejects workspace and dependency symlinks owned outside the repository", async () => {
    const repoRoot = await temporaryRepo();
    const foreignRoot = await temporaryRepo();
    await writeRootManifest(repoRoot);
    await mkdir(path.join(foreignRoot, "node_modules", "eslint"), { recursive: true });
    await writeFile(
      path.join(foreignRoot, "node_modules", "eslint", "package.json"),
      '{"name":"eslint"}\n',
      "utf8",
    );
    await symlink(
      path.join(foreignRoot, "node_modules"),
      path.join(repoRoot, "node_modules"),
      "dir",
    );
    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);

    await rm(path.join(repoRoot, "node_modules"), { force: true });
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await symlink(
      path.join(foreignRoot, "node_modules", "eslint"),
      path.join(repoRoot, "node_modules", "eslint"),
      "dir",
    );
    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(false);
  });

  it("keeps package dependencies usable when the runtime root install is foreign", async () => {
    const repoRoot = await temporaryRepo();
    const runtimeRoot = await temporaryRepo();
    const worktreePath = path.join(repoRoot, ".agentplane", "worktrees", "current");
    const dependencyRoot = path.join(runtimeRoot, "node_modules", "canonicalize");
    await mkdir(dependencyRoot, { recursive: true });
    await writeFile(path.join(dependencyRoot, "package.json"), '{"name":"canonicalize"}\n');
    const packageInstall = path.join(runtimeRoot, "packages", "core", "node_modules");
    await mkdir(packageInstall, { recursive: true });
    await symlink(dependencyRoot, path.join(packageInstall, "canonicalize"), "dir");
    const localCore = path.join(worktreePath, "packages", "core");
    await mkdir(localCore, { recursive: true });
    await writeFile(path.join(localCore, "package.json"), '{"name":"@agentplaneorg/core"}\n');
    await mkdir(path.join(packageInstall, "@agentplaneorg"), { recursive: true });
    await symlink(
      path.join(runtimeRoot, "packages", "core"),
      path.join(packageInstall, "@agentplaneorg", "core"),
      "dir",
    );
    vi.spyOn(process, "cwd").mockReturnValue(runtimeRoot);

    await materializeRepoLocalInstallLayoutForWorktree({ repoRoot, worktreePath });

    await expect(lstat(path.join(worktreePath, "node_modules"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    const targetInstall = path.join(localCore, "node_modules");
    expect(await readlink(path.join(targetInstall, "canonicalize"))).toBe(dependencyRoot);
    await expect(
      readFile(path.join(targetInstall, "canonicalize", "package.json"), "utf8"),
    ).resolves.toContain('"canonicalize"');
    await expect(
      readFile(path.join(targetInstall, "@agentplaneorg", "core", "package.json"), "utf8"),
    ).resolves.toContain('"@agentplaneorg/core"');
    expect(
      path.resolve(
        targetInstall,
        "@agentplaneorg",
        await readlink(path.join(targetInstall, "@agentplaneorg", "core")),
      ),
    ).toBe(localCore);
  });

  it("preserves healthy workspace, website, recipes, and package-local reuse", async () => {
    const repoRoot = await temporaryRepo();
    const worktreePath = path.join(repoRoot, ".agentplane", "worktrees", "current");
    await writeRootManifest(repoRoot);
    await mkdir(path.join(repoRoot, "node_modules", "eslint"), { recursive: true });
    await writeFile(
      path.join(repoRoot, "node_modules", "eslint", "package.json"),
      '{"name":"eslint"}\n',
      "utf8",
    );
    await mkdir(path.join(repoRoot, "website", "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    await mkdir(path.join(repoRoot, "packages", "core", "node_modules"), { recursive: true });
    await writeFile(
      path.join(repoRoot, "packages", "core", "node_modules", "marker.txt"),
      "healthy\n",
      "utf8",
    );
    await mkdir(worktreePath, { recursive: true });

    await materializeRepoLocalInstallLayoutForWorktree({ repoRoot, worktreePath });

    const workspaceNodeModules = await lstat(path.join(worktreePath, "node_modules"));
    const websiteNodeModules = await lstat(path.join(worktreePath, "website", "node_modules"));
    const recipes = await lstat(path.join(worktreePath, "agentplane-recipes"));

    expect(workspaceNodeModules.isSymbolicLink()).toBe(true);
    expect(await readlink(path.join(worktreePath, "node_modules"))).toBe(
      path.join(repoRoot, "node_modules"),
    );
    expect(websiteNodeModules.isSymbolicLink()).toBe(true);
    expect(recipes.isSymbolicLink()).toBe(true);
    await expect(
      readFile(path.join(worktreePath, "packages", "core", "node_modules", "marker.txt"), "utf8"),
    ).resolves.toBe("healthy\n");
  });
});
