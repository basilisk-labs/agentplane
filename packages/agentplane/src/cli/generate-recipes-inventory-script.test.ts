import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

type GitResolver = (cwd: string, args: string[]) => string;
type ScriptModule = {
  resolveCommonRepoRoot: (cwd?: string, resolveGit?: GitResolver) => string;
  resolveRecipesSourceRoot: (cwd?: string, options?: { resolveGit?: GitResolver }) => string;
};

const tempRoots: string[] = [];

async function loadScriptModule(): Promise<ScriptModule> {
  return (await import("../../../../scripts/generate-recipes-inventory.mjs")) as ScriptModule;
}

function fakeGitResolver(repoRoot: string, commonDir = path.join(repoRoot, ".git")): GitResolver {
  return (_cwd, args) => {
    if (args[0] === "--show-toplevel") return repoRoot;
    if (args[0] === "--git-common-dir") return commonDir;
    throw new Error(`unexpected git rev-parse args: ${args.join(" ")}`);
  };
}

async function makeTempRoot(prefix: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("generate-recipes-inventory script", () => {
  it("falls back to the common repo root when the task worktree lacks the recipes checkout", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const repoRoot = await makeTempRoot("agentplane-recipes-source-");
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");

    expect(resolveRecipesSourceRoot(worktreeRoot, { resolveGit: fakeGitResolver(repoRoot) })).toBe(
      repoRoot,
    );
  });

  it("prefers the current worktree when the recipes checkout exists locally", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const repoRoot = await makeTempRoot("agentplane-recipes-source-");
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");
    await mkdir(path.join(repoRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(repoRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");
    await mkdir(path.join(worktreeRoot, "agentplane-recipes"), { recursive: true });
    await writeFile(path.join(worktreeRoot, "agentplane-recipes", "index.json"), "{}\n", "utf8");

    expect(resolveRecipesSourceRoot(worktreeRoot, { resolveGit: fakeGitResolver(repoRoot) })).toBe(
      worktreeRoot,
    );
  });

  it("surfaces a precise error when neither the worktree nor the common repo root has recipes", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const repoRoot = await makeTempRoot("agentplane-recipes-source-");
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");

    expect(() =>
      resolveRecipesSourceRoot(worktreeRoot, { resolveGit: fakeGitResolver(repoRoot) }),
    ).toThrow(/agentplane-recipes\/index\.json not found/);
  });
});
