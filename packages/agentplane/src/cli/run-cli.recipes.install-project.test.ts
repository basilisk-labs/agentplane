import { generateKeyPairSync } from "node:crypto";
import { lstat, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  runCliSilent,
  silenceStdIO,
  writeDefaultConfig,
} from "../testing/index.js";

registerAgentplaneHome();

const agentplaneHomePath = () => getAgentplaneHome() ?? "";
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
  const { publicKey } = generateKeyPairSync("ed25519");
  const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ "test-key": publicPem });
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
  if (originalRecipesKeys === undefined) {
    delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
  } else {
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
  }
});

describe("runCli recipes install and project lifecycle", () => {
  it("recipes install keeps --on-conflict as a compatibility no-op", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const agentsDir = path.join(root, ".agentplane", "agents");
    await mkdir(agentsDir, { recursive: true });
    await writeFile(
      path.join(agentsDir, "viewer__RECIPE_AGENT.json"),
      JSON.stringify({ id: "viewer__RECIPE_AGENT", role: "Existing agent" }, null, 2),
      "utf8",
    );

    const { archivePath } = await createRecipeArchive({ id: "viewer" });
    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--path",
        archivePath,
        "--on-conflict",
        "rename",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await pathExists(path.join(agentsDir, "viewer__RECIPE_AGENT__1.json"))).toBe(false);
    const registry = JSON.parse(
      await readFile(
        path.join(process.env.AGENTPLANE_HOME ?? agentplaneHomePath(), "recipes.json"),
        "utf8",
      ),
    ) as { recipes: { id: string; version: string }[] };
    expect(registry.recipes).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: "viewer", version: "1.2.3" })]),
    );
  });

  it("recipes install accepts zip archives with a top-level folder", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "zipper",
      version: "0.1.0",
      format: "zip",
      wrapDir: true,
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const registry = JSON.parse(
      await readFile(
        path.join(process.env.AGENTPLANE_HOME ?? agentplaneHomePath(), "recipes.json"),
        "utf8",
      ),
    ) as { recipes: { id: string; version: string }[] };
    expect(registry.recipes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: String(manifest.id), version: String(manifest.version) }),
      ]),
    );
  });

  it("recipes add vendors a cached recipe into the project", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "vendored",
      version: "0.4.0",
    });
    const manifestRef = `${String(manifest.id)}@${String(manifest.version)}`;

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "add", manifestRef, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Vendored recipe vendored@0.4.0 into project (copy)");
    } finally {
      io.restore();
    }

    const manifestPath = path.join(
      root,
      ".agentplane",
      "recipes",
      "packages",
      "vendored",
      "manifest.json",
    );
    const registryPath = path.join(root, ".agentplane", "recipes", "registry.json");
    const assetRegistryPath = path.join(root, ".agentplane", "generated", "recipe-assets.json");
    expect(await pathExists(manifestPath)).toBe(true);
    const projectRegistry = JSON.parse(await readFile(registryPath, "utf8")) as {
      recipes: unknown[];
    };
    expect(projectRegistry).toMatchObject({
      recipes: [
        expect.objectContaining({
          id: "vendored",
          path: "packages/vendored",
          active: false,
          materialization: "copy",
          source_ref: "vendored@0.4.0",
          source_sha256: expect.stringMatching(/^[0-9a-f]{64}$/) as unknown,
          vendored_sha256: expect.stringMatching(/^[0-9a-f]{64}$/) as unknown,
        }),
      ],
    });
    expect(
      await pathExists(
        path.join(root, ".agentplane", "recipes", "packages", "vendored", ".install.json"),
      ),
    ).toBe(false);
    const assetRegistry = JSON.parse(await readFile(assetRegistryPath, "utf8")) as {
      kind: string;
      entries: unknown[];
    };
    expect(assetRegistry).toMatchObject({
      kind: "recipe_asset_registry",
      entries: expect.arrayContaining([
        expect.objectContaining({
          id: "recipe:vendored/agent:RECIPE_AGENT",
          kind: "agent",
          recipe_id: "vendored",
          asset_id: "RECIPE_AGENT",
        }),
        expect.objectContaining({
          id: "recipe:vendored/skill:RECIPE_SKILL",
          kind: "skill",
          recipe_id: "vendored",
          asset_id: "RECIPE_SKILL",
        }),
        expect.objectContaining({
          id: "recipe:vendored/tool:RECIPE_TOOL",
          kind: "tool",
          recipe_id: "vendored",
          asset_id: "RECIPE_TOOL",
        }),
        expect.objectContaining({
          id: "recipe:vendored/scenario:RECIPE_SCENARIO",
          kind: "scenario",
          recipe_id: "vendored",
          asset_id: "RECIPE_SCENARIO",
        }),
      ]) as unknown,
    });

    const ioExplain = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain", "vendored", "--root", root]);
      expect(code).toBe(0);
      expect(ioExplain.stdout).toContain("Materialization: copy");
      expect(ioExplain.stdout).toContain("State: clean");
      expect(ioExplain.stdout).toContain("Source ref: vendored@0.4.0");
    } finally {
      ioExplain.restore();
    }
  });

  it("recipes public CLI exposes active overlay lifecycle commands", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "overlayctl",
      version: "0.6.0",
      summary: "Overlay control recipe",
    });
    const manifestRef = `${String(manifest.id)}@${String(manifest.version)}`;

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(await runCliSilent(["recipes", "add", manifestRef, "--root", root])).toBe(0);

    const ioEnable = captureStdIO();
    try {
      const code = await runCli(["recipes", "enable", "overlayctl", "--root", root]);
      expect(code).toBe(0);
      expect(ioEnable.stdout).toContain("Enabled overlay overlayctl (1 active)");
    } finally {
      ioEnable.restore();
    }

    const ioActive = captureStdIO();
    try {
      const code = await runCli(["recipes", "active", "--root", root]);
      expect(code).toBe(0);
      expect(ioActive.stdout).toContain("overlayctl@0.6.0 [project_overlay]");
    } finally {
      ioActive.restore();
    }

    const ioExplainActive = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain-active", "--root", root]);
      expect(code).toBe(0);
      expect(ioExplainActive.stdout).toContain('"kind": "overlay_bundle"');
      expect(ioExplainActive.stdout).toContain('"id": "overlayctl"');
    } finally {
      ioExplainActive.restore();
    }

    const ioDisable = captureStdIO();
    try {
      const code = await runCli(["recipes", "disable", "overlayctl", "--root", root]);
      expect(code).toBe(0);
      expect(ioDisable.stdout).toContain("Disabled overlay overlayctl (0 active)");
    } finally {
      ioDisable.restore();
    }
  });

  it("recipes add picks the latest cached recipe by semver order", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archives = await Promise.all([
      createRecipeArchive({ id: "semver-pick", version: "1.2.0" }),
      createRecipeArchive({ id: "semver-pick", version: "1.10.0" }),
      createRecipeArchive({ id: "semver-pick", version: "1.2.10" }),
    ]);

    for (const fixture of archives) {
      expect(
        await runCliSilent(["recipes", "install", "--path", fixture.archivePath, "--root", root]),
      ).toBe(0);
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "add", "semver-pick", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Vendored recipe semver-pick@1.10.0 into project (copy)");
    } finally {
      io.restore();
    }
  });

  it("recipes add refuses to overwrite an already vendored recipe", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "vendored",
      version: "0.4.0",
    });
    const manifestRef = `${String(manifest.id)}@${String(manifest.version)}`;

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(await runCliSilent(["recipes", "add", manifestRef, "--root", root])).toBe(0);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "add", manifestRef, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Recipe already vendored");
      expect(io.stderr).toContain("agentplane recipes update vendored");
    } finally {
      io.restore();
    }
  });

  it("recipes update refreshes a cached copy and refuses local vendored edits without --force", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "syncable",
      version: "0.5.0",
    });
    const manifestRef = `${String(manifest.id)}@${String(manifest.version)}`;

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(await runCliSilent(["recipes", "add", manifestRef, "--root", root])).toBe(0);

    const cachedManifestPath = path.join(
      agentplaneHomePath(),
      "recipes-store",
      "syncable",
      "0.5.0",
      "manifest.json",
    );
    const vendoredManifestPath = path.join(
      root,
      ".agentplane",
      "recipes",
      "packages",
      "syncable",
      "manifest.json",
    );

    const cachedManifest = JSON.parse(await readFile(cachedManifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    cachedManifest.summary = "Updated from cache";
    await writeFile(cachedManifestPath, JSON.stringify(cachedManifest, null, 2), "utf8");

    const ioUpdated = captureStdIO();
    try {
      const code = await runCli(["recipes", "update", "syncable", "--root", root]);
      expect(code).toBe(0);
      expect(ioUpdated.stdout).toContain("Updated vendored recipe syncable@0.5.0 from cache.");
    } finally {
      ioUpdated.restore();
    }
    expect(JSON.parse(await readFile(vendoredManifestPath, "utf8"))).toMatchObject({
      summary: "Updated from cache",
    });

    const locallyModified = JSON.parse(await readFile(vendoredManifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    locallyModified.summary = "Locally modified";
    await writeFile(vendoredManifestPath, JSON.stringify(locallyModified, null, 2), "utf8");

    const ioRefused = captureStdIO();
    try {
      const code = await runCli(["recipes", "update", "syncable", "--root", root]);
      expect(code).toBe(2);
      expect(ioRefused.stderr).toContain("has local project edits");
    } finally {
      ioRefused.restore();
    }

    const cachedManifestForce = JSON.parse(await readFile(cachedManifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    cachedManifestForce.summary = "Forced from cache";
    await writeFile(cachedManifestPath, JSON.stringify(cachedManifestForce, null, 2), "utf8");

    const ioForced = captureStdIO();
    try {
      const code = await runCli(["recipes", "update", "syncable", "--force", "--root", root]);
      expect(code).toBe(0);
      expect(ioForced.stdout).toContain("Updated vendored recipe syncable@0.5.0 from cache.");
    } finally {
      ioForced.restore();
    }
    expect(JSON.parse(await readFile(vendoredManifestPath, "utf8"))).toMatchObject({
      summary: "Forced from cache",
    });
  });

  it("recipes detach converts a linked recipe into a portable project copy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "linked",
      version: "0.6.0",
    });
    const manifestRef = `${String(manifest.id)}@${String(manifest.version)}`;

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );

    const ioAdd = captureStdIO();
    try {
      const code = await runCli(["recipes", "add", manifestRef, "--mode", "link", "--root", root]);
      expect(code).toBe(0);
      expect(ioAdd.stdout).toContain("Warning: link mode is not portable");
    } finally {
      ioAdd.restore();
    }

    const vendoredDir = path.join(root, ".agentplane", "recipes", "packages", "linked");
    const cachedManifestPath = path.join(
      agentplaneHomePath(),
      "recipes-store",
      "linked",
      "0.6.0",
      "manifest.json",
    );
    const vendoredLinkStat = await lstat(vendoredDir);
    expect(vendoredLinkStat.isSymbolicLink()).toBe(true);
    expect(
      await pathExists(
        path.join(agentplaneHomePath(), "recipes-store", "linked", "0.6.0", ".install.json"),
      ),
    ).toBe(false);

    const ioDetach = captureStdIO();
    try {
      const code = await runCli(["recipes", "detach", "linked", "--root", root]);
      expect(code).toBe(0);
      expect(ioDetach.stdout).toContain("Detached recipe linked@0.6.0 into a project-local copy.");
    } finally {
      ioDetach.restore();
    }

    const vendoredDetachedStat = await lstat(vendoredDir);
    expect(vendoredDetachedStat.isSymbolicLink()).toBe(false);
    const vendoredManifestPath = path.join(vendoredDir, "manifest.json");
    const vendoredManifest = JSON.parse(await readFile(vendoredManifestPath, "utf8")) as Record<
      string,
      unknown
    >;
    vendoredManifest.summary = "Detached project copy";
    await writeFile(vendoredManifestPath, JSON.stringify(vendoredManifest, null, 2), "utf8");
    expect(JSON.parse(await readFile(cachedManifestPath, "utf8"))).not.toMatchObject({
      summary: "Detached project copy",
    });
    const detachedRegistry = JSON.parse(
      await readFile(path.join(root, ".agentplane", "recipes", "registry.json"), "utf8"),
    ) as { recipes: unknown[] };
    expect(detachedRegistry).toMatchObject({
      recipes: [
        expect.objectContaining({
          id: "linked",
          materialization: "copy",
          source_sha256: expect.stringMatching(/^[0-9a-f]{64}$/) as unknown,
          vendored_sha256: expect.stringMatching(/^[0-9a-f]{64}$/) as unknown,
        }),
      ],
    });
  });
});
