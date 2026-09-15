import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { isReusableWorkspaceInstallLayout } from "./work-start.materialize.js";

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

async function writeDependency(root: string): Promise<void> {
  const dependencyRoot = path.join(root, "node_modules", "eslint");
  await mkdir(dependencyRoot, { recursive: true });
  await writeFile(path.join(dependencyRoot, "package.json"), '{"name":"eslint"}\n', "utf8");
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (root) await rm(root, { recursive: true, force: true });
  }
});

describe("reusable workspace install layout", () => {
  it("accepts a complete repository-local install layout", async () => {
    const repoRoot = await temporaryRepo();
    await writeRootManifest(repoRoot);
    await writeDependency(repoRoot);

    await expect(
      isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot: repoRoot }),
    ).resolves.toBe(true);
  });

  it("accepts a complete active-runtime layout from another repository root", async () => {
    const repoRoot = await temporaryRepo();
    const sourceRoot = await temporaryRepo();
    await writeRootManifest(sourceRoot);
    await writeDependency(sourceRoot);

    await expect(isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot })).resolves.toBe(true);
  });

  it("rejects a node_modules source owned by another task worktree", async () => {
    const repoRoot = await temporaryRepo();
    const sourceRoot = path.join(repoRoot, ".agentplane", "worktrees", "foreign");
    await mkdir(sourceRoot, { recursive: true });
    await writeRootManifest(sourceRoot);
    await writeDependency(sourceRoot);

    await expect(isReusableWorkspaceInstallLayout({ repoRoot, sourceRoot })).resolves.toBe(false);
  });

  it("rejects workspace and dependency targets owned outside the repository", async () => {
    const repoRoot = await temporaryRepo();
    const foreignRoot = await temporaryRepo();
    await writeRootManifest(repoRoot);
    await writeDependency(foreignRoot);
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

  it("rejects missing and incomplete declared dependency targets", async () => {
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
});
