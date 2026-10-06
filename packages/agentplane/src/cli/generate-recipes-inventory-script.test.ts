import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

type ScriptModule = {
  resolveRecipesSourceRoot: (
    cwd?: string,
    options?: { recipesSource?: string; env?: Record<string, string | undefined> },
  ) => string;
};

const tempRoots: string[] = [];

async function loadScriptModule(): Promise<ScriptModule> {
  return (await import("../../../../scripts/generate-recipes-inventory.mjs")) as ScriptModule;
}

async function makeTempRoot(prefix: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  tempRoots.push(root);
  return root;
}

afterEach(async () => {
  vi.unstubAllEnvs();
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("generate-recipes-inventory script", () => {
  it("uses an explicit external recipes checkout", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");
    const recipesRoot = await makeTempRoot("agentplane-recipes-source-");
    await mkdir(path.join(recipesRoot, "recipes"));
    await writeFile(path.join(recipesRoot, "index.json"), "{}\n", "utf8");

    expect(resolveRecipesSourceRoot(worktreeRoot, { recipesSource: recipesRoot })).toBe(
      recipesRoot,
    );
  });

  it("resolves a relative source from the current worktree", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");
    const relativeSource = "external/recipes";
    const recipesRoot = path.join(worktreeRoot, relativeSource);
    await mkdir(path.join(recipesRoot, "recipes"), { recursive: true });
    await writeFile(path.join(recipesRoot, "index.json"), "{}\n", "utf8");

    expect(
      resolveRecipesSourceRoot(worktreeRoot, {
        env: { AGENTPLANE_RECIPES_SOURCE: relativeSource },
      }),
    ).toBe(recipesRoot);
  });

  it("requires an explicit recipes source", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");

    expect(() => resolveRecipesSourceRoot(worktreeRoot, { env: {} })).toThrow(
      /recipes source is required/,
    );
  });

  it.each([{}, { UNRELATED_SETTING: "value" }])(
    "does not inherit the populated host when an environment is supplied: %j",
    async (env) => {
      const { resolveRecipesSourceRoot } = await loadScriptModule();
      const root = await makeTempRoot("agentplane-recipes-host-");
      await mkdir(path.join(root, "recipes"));
      await writeFile(path.join(root, "index.json"), "{}\n");
      vi.stubEnv("AGENTPLANE_RECIPES_SOURCE", root);

      expect(() => resolveRecipesSourceRoot(root, { env })).toThrow(/recipes source is required/);
      expect(process.env.AGENTPLANE_RECIPES_SOURCE).toBe(root);
    },
  );

  it("uses the populated host only when environment is omitted", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const root = await makeTempRoot("agentplane-recipes-host-");
    await mkdir(path.join(root, "recipes"));
    await writeFile(path.join(root, "index.json"), "{}\n");
    vi.stubEnv("AGENTPLANE_RECIPES_SOURCE", root);

    expect(resolveRecipesSourceRoot(root)).toBe(root);
    expect(resolveRecipesSourceRoot(root, {})).toBe(root);
  });

  it("keeps explicit source precedence over supplied and host environments", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const root = await makeTempRoot("agentplane-recipes-explicit-");
    await mkdir(path.join(root, "recipes"));
    await writeFile(path.join(root, "index.json"), "{}\n");
    vi.stubEnv("AGENTPLANE_RECIPES_SOURCE", "/invalid-host-source");

    expect(
      resolveRecipesSourceRoot(root, {
        recipesSource: ".",
        env: { AGENTPLANE_RECIPES_SOURCE: "/invalid-supplied-source" },
      }),
    ).toBe(root);
    expect(resolveRecipesSourceRoot(root, { recipesSource: "." })).toBe(root);
  });

  it("surfaces a precise error for an invalid external checkout", async () => {
    const { resolveRecipesSourceRoot } = await loadScriptModule();
    const worktreeRoot = await makeTempRoot("agentplane-recipes-worktree-");
    const recipesRoot = await makeTempRoot("agentplane-recipes-source-");

    expect(() => resolveRecipesSourceRoot(worktreeRoot, { recipesSource: recipesRoot })).toThrow(
      /invalid recipes source.*missing index\.json, recipes/,
    );
  });
});
