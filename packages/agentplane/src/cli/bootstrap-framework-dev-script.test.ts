import { lstat, mkdtemp, mkdir, readlink, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

const tempRoots: string[] = [];
const workspaceRoot = process.cwd();
type FrameworkDevExec = (repoRoot: string, cmd: string, args: string[]) => void;
type BootstrapOptions = {
  resolveCommonRepoRoot?: (cwd?: string) => string;
};
type BootstrapModule = {
  resolveRepoRoot: (cwd?: string) => string;
  runFrameworkDevBootstrap: (
    cwd?: string,
    exec?: FrameworkDevExec,
    options?: BootstrapOptions,
  ) => void;
};
const recordCallExec = (_repoRoot: string, cmd: string, args: string[], calls: string[]) => {
  calls.push([cmd, ...args].join(" "));
};
function gitFailureExec(_repoRoot: string, cmd: string, args: string[]) {
  if (cmd === "git") {
    throw new Error(`failed: ${args.join(" ")}`);
  }
}

async function loadBootstrapModule(): Promise<BootstrapModule> {
  return (await import("../../../../scripts/bootstrap-framework-dev.mjs")) as BootstrapModule;
}

async function mkFrameworkRepo() {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-framework-bootstrap-"));
  tempRoots.push(repoRoot);
  await mkdir(path.join(repoRoot, ".agentplane"), { recursive: true });
  await mkdir(path.join(repoRoot, "packages", "agentplane"), { recursive: true });
  await mkdir(path.join(repoRoot, "packages", "core"), { recursive: true });
  await writeFile(path.join(repoRoot, ".agentplane", "config.json"), "{}\n", "utf8");
  await writeFile(path.join(repoRoot, "package.json"), '{ "name": "agentplane-repo" }\n', "utf8");
  await writeFile(
    path.join(repoRoot, "packages", "agentplane", "package.json"),
    '{ "name": "agentplane" }\n',
    "utf8",
  );
  await writeFile(
    path.join(repoRoot, "packages", "core", "package.json"),
    '{ "name": "@agentplaneorg/core" }\n',
    "utf8",
  );
  return repoRoot;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("bootstrap-framework-dev script", () => {
  it("resolves the framework repo root from nested paths", async () => {
    const { resolveRepoRoot } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    const nested = path.join(repoRoot, "packages", "agentplane");
    expect(resolveRepoRoot(nested)).toBe(repoRoot);
  });

  it("runs install, submodule init, builds, and repo-local verify when prerequisites are missing", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(calls).toEqual([
      "bun install",
      "git submodule update --init --recursive agentplane-recipes",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("skips install and submodule init when prerequisites already exist", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    await symlink(path.join(workspaceRoot, "node_modules"), path.join(repoRoot, "node_modules"));
    await symlink(
      path.join(workspaceRoot, "packages", "core", "node_modules"),
      path.join(repoRoot, "packages", "core", "node_modules"),
    );
    await symlink(
      path.join(workspaceRoot, "packages", "agentplane", "node_modules"),
      path.join(repoRoot, "packages", "agentplane", "node_modules"),
    );
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(calls).toEqual([
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("reuses common-root dependencies and recipes for a fresh worktree checkout", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const commonRepoRoot = await mkFrameworkRepo();
    const repoRoot = await mkFrameworkRepo();
    await symlink(
      path.join(workspaceRoot, "node_modules"),
      path.join(commonRepoRoot, "node_modules"),
    );
    await symlink(
      path.join(workspaceRoot, "packages", "core", "node_modules"),
      path.join(commonRepoRoot, "packages", "core", "node_modules"),
    );
    await symlink(
      path.join(workspaceRoot, "packages", "agentplane", "node_modules"),
      path.join(commonRepoRoot, "packages", "agentplane", "node_modules"),
    );
    await mkdir(path.join(commonRepoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(commonRepoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => commonRepoRoot,
    });

    expect(calls).toEqual([
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
    const nodeModulesStat = await lstat(path.join(repoRoot, "node_modules"));
    expect(nodeModulesStat.isSymbolicLink()).toBe(true);
    expect(await readlink(path.join(repoRoot, "node_modules"))).toBe(
      path.join(commonRepoRoot, "node_modules"),
    );
    expect(await readlink(path.join(repoRoot, "packages", "core", "node_modules"))).toBe(
      path.join(commonRepoRoot, "packages", "core", "node_modules"),
    );
    expect(await readlink(path.join(repoRoot, "packages", "agentplane", "node_modules"))).toBe(
      path.join(commonRepoRoot, "packages", "agentplane", "node_modules"),
    );
  });

  it("runs bun install when the shared root lacks package-local build layout", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const commonRepoRoot = await mkFrameworkRepo();
    const repoRoot = await mkFrameworkRepo();
    await symlink(
      path.join(workspaceRoot, "node_modules"),
      path.join(commonRepoRoot, "node_modules"),
    );
    await mkdir(path.join(commonRepoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(commonRepoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => commonRepoRoot,
    });

    expect(calls).toEqual([
      "bun install",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("surfaces a precise error when the recipes gitlink cannot be initialized", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();

    expect(() =>
      runFrameworkDevBootstrap(repoRoot, gitFailureExec, {
        resolveCommonRepoRoot: () => repoRoot,
      }),
    ).toThrow(/Failed to initialize agentplane-recipes/);
  });
});
