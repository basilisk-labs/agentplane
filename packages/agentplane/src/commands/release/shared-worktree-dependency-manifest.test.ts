import { existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import * as dependencyManifestModule from "../../../../../scripts/bench/internal/agent-efficiency-dependency-manifest.mjs";
import * as anchorRuntimeModule from "../../../../../scripts/bench/internal/agent-efficiency-anchor-runtime.mjs";

const { replayDependencySeeds } = dependencyManifestModule as {
  replayDependencySeeds: (root: string) => { label: string; path: string }[];
};
const { mirrorDependencyLayout } = anchorRuntimeModule as {
  mirrorDependencyLayout: (source: string, target: string, subject: string) => void;
};
const tempRoots: string[] = [];

afterEach(() => {
  for (const root of tempRoots.splice(0)) rmSync(root, { force: true, recursive: true });
});

function temporaryRoot(prefix: string) {
  const root = mkdtempSync(path.join(tmpdir(), prefix));
  tempRoots.push(root);
  return root;
}

function writePackage(root: string, relativePath: string, name: string) {
  const packageRoot = path.join(root, relativePath);
  mkdirSync(packageRoot, { recursive: true });
  writeFileSync(path.join(packageRoot, "package.json"), `${JSON.stringify({ name })}\n`);
}

describe("RF-04 shared-worktree dependency discovery", () => {
  it("accepts workspace packages owned by the checkout that provides shared node_modules", () => {
    const owner = temporaryRoot("agentplane-dependency-owner-");
    const worktree = temporaryRoot("agentplane-dependency-worktree-");

    for (const relativePath of [
      "node_modules/tsup",
      "node_modules/typescript",
      "packages/agentplane/node_modules/@agentplane",
      "packages/core/node_modules",
    ]) {
      mkdirSync(path.join(owner, relativePath), { recursive: true });
    }
    writePackage(owner, "packages/agentplane", "agentplane");
    writePackage(owner, "packages/core", "@agentplaneorg/core");
    writePackage(owner, "packages/recipes", "@agentplaneorg/recipes");
    writePackage(owner, "packages/testkit", "@agentplane/testkit");
    for (const packageName of ["core", "recipes", "testkit"]) {
      symlinkSync(
        path.join(owner, "packages", packageName),
        path.join(owner, "packages/agentplane/node_modules/@agentplane", packageName),
      );
    }

    mkdirSync(path.join(worktree, "packages/agentplane"), { recursive: true });
    mkdirSync(path.join(worktree, "packages/core"), { recursive: true });
    symlinkSync(path.join(owner, "node_modules"), path.join(worktree, "node_modules"));
    symlinkSync(
      path.join(owner, "packages/agentplane/node_modules"),
      path.join(worktree, "packages/agentplane/node_modules"),
    );
    symlinkSync(
      path.join(owner, "packages/core/node_modules"),
      path.join(worktree, "packages/core/node_modules"),
    );

    expect(replayDependencySeeds(worktree).map((seed) => seed.label)).toEqual([
      "node_modules/tsup",
      "node_modules/typescript",
    ]);
  });

  it("ignores stale package-manager symlinks whose targets no longer exist", () => {
    const root = temporaryRoot("agentplane-dependency-stale-link-");
    for (const relativePath of [
      "node_modules/tsup",
      "node_modules/typescript",
      "packages/agentplane/node_modules/@types",
      "packages/core/node_modules",
    ]) {
      mkdirSync(path.join(root, relativePath), { recursive: true });
    }
    writePackage(root, "packages/agentplane", "agentplane");
    writePackage(root, "packages/core", "@agentplaneorg/core");
    symlinkSync(
      path.join(root, "node_modules/.bun/removed-package"),
      path.join(root, "packages/agentplane/node_modules/@types/removed-package"),
    );

    expect(replayDependencySeeds(root).map((seed) => seed.label)).toEqual([
      "node_modules/tsup",
      "node_modules/typescript",
    ]);
  });

  it("omits stale package-manager symlinks from the exact-anchor runtime mirror", () => {
    const root = temporaryRoot("agentplane-anchor-stale-link-");
    const source = path.join(root, "source");
    const target = path.join(root, "target");
    const subject = path.join(root, "subject");
    const installed = path.join(root, "installed-package");
    mkdirSync(path.join(source, "@types"), { recursive: true });
    mkdirSync(installed, { recursive: true });
    symlinkSync(installed, path.join(source, "installed-package"));
    symlinkSync(path.join(root, "removed-package"), path.join(source, "@types/removed-package"));

    mirrorDependencyLayout(source, target, subject);

    expect(existsSync(path.join(target, "installed-package"))).toBe(true);
    expect(existsSync(path.join(target, "@types/removed-package"))).toBe(false);
  });
});
