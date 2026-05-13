import { lstat, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

const tempRoots: string[] = [];
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
  execFileSync("git", ["init", "-q"], { cwd: repoRoot });
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

async function mkWorkflowOnlyFrameworkRepo() {
  const repoRoot = await mkFrameworkRepo();
  await rm(path.join(repoRoot, ".agentplane", "config.json"), { force: true });
  await writeFile(
    path.join(repoRoot, ".agentplane", "WORKFLOW.md"),
    "---\nworkflow:\n  mode: branch_pr\n---\n\n",
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

  it("resolves WORKFLOW.md-only framework repo roots", async () => {
    const { resolveRepoRoot } = await loadBootstrapModule();
    const repoRoot = await mkWorkflowOnlyFrameworkRepo();
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
      "bun install --ignore-scripts",
      "git submodule update --init --recursive agentplane-recipes",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("holds the framework build lock while running build and verify steps", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    const lockDir = path.join(repoRoot, ".agentplane", "cache", "framework-dev-bootstrap.lock");
    const observedLocks: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) => {
      recordCallExec(currentRepoRoot, cmd, args, []);
      if (cmd === "bun" && args.includes("build")) {
        observedLocks.push(fs.readFileSync(path.join(lockDir, "owner.json"), "utf8"));
      }
    };

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(observedLocks.length).toBeGreaterThan(0);
    expect(observedLocks[0]).toContain('"operation": "framework-dev-bootstrap"');
    await expect(lstat(lockDir)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("rejects concurrent framework bootstrap while the build lock is held", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    const lockDir = path.join(repoRoot, ".agentplane", "cache", "framework-dev-bootstrap.lock");
    await mkdir(lockDir, { recursive: true });
    await writeFile(
      path.join(lockDir, "owner.json"),
      JSON.stringify({
        pid: process.pid,
        operation: "other-build",
        acquired_at: "2026-01-01T00:00:00Z",
      }),
      "utf8",
    );

    expect(() =>
      runFrameworkDevBootstrap(
        repoRoot,
        (currentRepoRoot: string, cmd: string, args: string[]) =>
          recordCallExec(currentRepoRoot, cmd, args, []),
        {
          resolveCommonRepoRoot: () => repoRoot,
        },
      ),
    ).toThrow(/Another framework dev build is already running/);
  });

  it("clears stale framework build locks before bootstrapping", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    const lockDir = path.join(repoRoot, ".agentplane", "cache", "framework-dev-bootstrap.lock");
    await mkdir(lockDir, { recursive: true });
    await writeFile(
      path.join(lockDir, "owner.json"),
      JSON.stringify({
        pid: 999_999_999,
        operation: "interrupted-build",
        acquired_at: "2026-01-01T00:00:00Z",
      }),
      "utf8",
    );
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(calls).toContain("bun run --filter=agentplane build");
    await expect(lstat(lockDir)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("skips install and submodule init when prerequisites already exist", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "core", "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "agentplane", "node_modules"), {
      recursive: true,
    });
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
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
    const shim = await readFile(path.join(repoRoot, ".agentplane", "bin", "agentplane"), "utf8");
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(
      `INSTALL_BIN='${path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js")}'`,
    );
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_GLOBAL");
  });

  it("reconciles the managed hook set and adds a missing post-merge hook", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "core", "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "agentplane", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    await writeFile(
      path.join(repoRoot, ".git", "hooks", "pre-push"),
      '#!/usr/bin/env sh\n# agentplane-hook (do not edit)\nexec agentplane hooks run pre-push "$@"\n',
      "utf8",
    );
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(calls).toEqual([
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
    const postMerge = await readFile(path.join(repoRoot, ".git", "hooks", "post-merge"), "utf8");
    expect(postMerge).toContain("agentplane-hook");
    expect(postMerge).toContain("hooks run post-merge");
  });

  it("reuses only recipes metadata from the common root for a fresh worktree checkout", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const commonRepoRoot = await mkFrameworkRepo();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(commonRepoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(commonRepoRoot, "packages", "core", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(commonRepoRoot, "packages", "agentplane", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(commonRepoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(commonRepoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => commonRepoRoot,
    });

    expect(calls).toEqual([
      "bun install --ignore-scripts",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("runs bun install when the shared root lacks package-local build layout", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const commonRepoRoot = await mkFrameworkRepo();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(commonRepoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(commonRepoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(commonRepoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => commonRepoRoot,
    });

    expect(calls).toEqual([
      "bun install --ignore-scripts",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
  });

  it("removes foreign package-local install layout before rebuilding the worktree runtime", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const commonRepoRoot = await mkFrameworkRepo();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(commonRepoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(commonRepoRoot, "packages", "core", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(commonRepoRoot, "packages", "agentplane", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(commonRepoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(commonRepoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    await fs.promises.symlink(
      path.join(commonRepoRoot, "packages", "core", "node_modules"),
      path.join(repoRoot, "packages", "core", "node_modules"),
      "dir",
    );
    await fs.promises.symlink(
      path.join(commonRepoRoot, "packages", "agentplane", "node_modules"),
      path.join(repoRoot, "packages", "agentplane", "node_modules"),
      "dir",
    );
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => commonRepoRoot,
    });

    expect(calls).toEqual([
      "bun install --ignore-scripts",
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
    await expect(lstat(path.join(repoRoot, "node_modules"))).rejects.toThrow();
    await expect(lstat(path.join(repoRoot, "packages", "core", "node_modules"))).rejects.toThrow();
    await expect(
      lstat(path.join(repoRoot, "packages", "agentplane", "node_modules")),
    ).rejects.toThrow();
  });

  it("repairs legacy lefthook-generated hooks after building the repo-local runtime", async () => {
    const { runFrameworkDevBootstrap } = await loadBootstrapModule();
    const repoRoot = await mkFrameworkRepo();
    await mkdir(path.join(repoRoot, "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "core", "node_modules"), { recursive: true });
    await mkdir(path.join(repoRoot, "packages", "agentplane", "node_modules"), {
      recursive: true,
    });
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    await writeFile(
      path.join(repoRoot, ".git", "hooks", "pre-push"),
      '#!/bin/sh\ncall_lefthook()\n{\n  echo "Can\'t find lefthook in PATH"\n}\n',
      "utf8",
    );
    const calls: string[] = [];
    const exec = (currentRepoRoot: string, cmd: string, args: string[]) =>
      recordCallExec(currentRepoRoot, cmd, args, calls);

    runFrameworkDevBootstrap(repoRoot, exec, {
      resolveCommonRepoRoot: () => repoRoot,
    });

    expect(calls).toEqual([
      "bun run --filter=@agentplaneorg/core build",
      "bun run --filter=agentplane build",
      "bun run --filter=@agentplane/testkit build",
      "node packages/agentplane/bin/agentplane.js runtime explain",
    ]);
    const prePush = await readFile(path.join(repoRoot, ".git", "hooks", "pre-push"), "utf8");
    const shim = await readFile(path.join(repoRoot, ".agentplane", "bin", "agentplane"), "utf8");
    expect(prePush).toContain("agentplane-hook");
    expect(prePush).toContain("hooks run pre-push");
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(
      `INSTALL_BIN='${path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js")}'`,
    );
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_GLOBAL");
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
