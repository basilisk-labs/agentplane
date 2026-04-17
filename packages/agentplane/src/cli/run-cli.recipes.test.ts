import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  createRecipeArchive,
  createRecipeArchiveWithManifest,
  createUnsafeRecipeArchive,
  getAgentplaneHome,
  mkGitRepoRoot,
  pathExists,
  registerAgentplaneHome,
  resetAgentplaneHomeRecipes,
  runCliSilent,
  silenceStdIO,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";

registerAgentplaneHome();

const agentplaneHomePath = () => getAgentplaneHome() ?? "";
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let restoreStdIO: (() => void) | null = null;
let testKeyId = "test-key";
let testPrivateKey: ReturnType<typeof generateKeyPairSync>["privateKey"] | null = null;

function signIndexPayload(indexText: string): {
  schema_version: 1;
  key_id: string;
  signature: string;
} {
  if (!testPrivateKey) throw new Error("test private key not set");
  const signature = sign(null, Buffer.from(indexText), testPrivateKey).toString("base64");
  return { schema_version: 1, key_id: testKeyId, signature };
}

async function writeSignedIndex(indexPath: string, payload: unknown): Promise<void> {
  const indexText = JSON.stringify(payload, null, 2);
  await writeFile(indexPath, indexText, "utf8");
  const signature = signIndexPayload(indexText);
  await writeFile(`${indexPath}.sig`, JSON.stringify(signature, null, 2), "utf8");
}

beforeEach(() => {
  restoreStdIO = silenceStdIO();
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  testPrivateKey = privateKey;
  const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ [testKeyId]: publicPem });
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
  if (originalRecipesKeys === undefined) {
    delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
  } else {
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
  }
  testPrivateKey = null;
});

describe("runCli recipes", () => {
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
    ) as { recipes: Array<{ id: string; version: string }> };
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
    ) as { recipes: Array<{ id: string; version: string }> };
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

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "add",
        `${manifest.id}@${manifest.version}`,
        "--root",
        root,
      ]);
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
    expect(JSON.parse(await readFile(registryPath, "utf8"))).toMatchObject({
      recipes: [
        expect.objectContaining({
          id: "vendored",
          path: "packages/vendored",
          active: false,
          materialization: "copy",
          source_ref: "vendored@0.4.0",
          source_sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
          vendored_sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
        }),
      ],
    });
    expect(
      await pathExists(
        path.join(root, ".agentplane", "recipes", "packages", "vendored", ".install.json"),
      ),
    ).toBe(false);
    expect(JSON.parse(await readFile(assetRegistryPath, "utf8"))).toMatchObject({
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
      ]),
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

  it("recipes add refuses to overwrite an already vendored recipe", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "vendored",
      version: "0.4.0",
    });

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent(["recipes", "add", `${manifest.id}@${manifest.version}`, "--root", root]),
    ).toBe(0);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "add",
        `${manifest.id}@${manifest.version}`,
        "--root",
        root,
      ]);
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

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );
    expect(
      await runCliSilent(["recipes", "add", `${manifest.id}@${manifest.version}`, "--root", root]),
    ).toBe(0);

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

    expect(await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root])).toBe(
      0,
    );

    const ioAdd = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "add",
        `${manifest.id}@${manifest.version}`,
        "--mode",
        "link",
        "--root",
        root,
      ]);
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
    expect((await lstat(vendoredDir)).isSymbolicLink()).toBe(true);
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

    expect((await lstat(vendoredDir)).isSymbolicLink()).toBe(false);
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
    expect(
      JSON.parse(
        await readFile(path.join(root, ".agentplane", "recipes", "registry.json"), "utf8"),
      ),
    ).toMatchObject({
      recipes: [
        expect.objectContaining({
          id: "linked",
          materialization: "copy",
          source_sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
          vendored_sha256: expect.stringMatching(/^[0-9a-f]{64}$/),
        }),
      ],
    });
  });

  it("rejects tar archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "tar" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Unsafe archive entry");
    } finally {
      io.restore();
    }
  });

  it("rejects zip archives with path traversal entries", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const archivePath = await createUnsafeRecipeArchive({ format: "zip" });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("invalid relative path");
    } finally {
      io.restore();
    }
  });

  it("recipes list reports when no recipes are cached", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("No cached recipes found.");
    } finally {
      io.restore();
    }
  });

  it("recipes list supports --full output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "full",
        version: "1.0.0",
        name: "Full recipe",
        summary: "Full summary",
        description: "Full description",
        agents: [
          {
            id: "FULL_AGENT",
            display_name: "Full Agent",
            role: "executor",
            summary: "Full agent",
            file: "agents/full.md",
          },
        ],
        scenarios: [
          {
            id: "FULL_SCENARIO",
            name: "Full Scenario",
            summary: "Full scenario",
            use_when: ["Full recipe fixture"],
            required_inputs: [],
            outputs: [],
            permissions: [],
            artifacts: [],
            agents_involved: ["FULL_AGENT"],
            skills_used: [],
            tools_used: [],
            run_profile: { mode: "analysis" },
            file: "scenarios/full.json",
          },
        ],
      },
      files: {
        "agents/full.md": "# Full Agent\n\nUse the full recipe fixture.\n",
        "scenarios/full.json": JSON.stringify(
          {
            schema_version: "1",
            id: "FULL_SCENARIO",
            goal: "Full scenario goal",
            task_template: {
              title: "Full scenario task",
              description: "Materialize the full recipe scenario.",
              owner: "CODER",
            },
            inputs: [],
            outputs: [],
            steps: [],
          },
          null,
          2,
        ),
      },
    });
    await runCliSilent(["recipes", "install", "--path", archivePath, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--full", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"id": "full"');
      expect(io.stdout).toContain('"version": "1.0.0"');
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects empty tag values", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--tag", " ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Option --tag must not be empty.");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes list");
      expect(io.stderr).toContain("agentplane help recipes list --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects invalid cached recipes payloads", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(
      path.join(agentplaneHomePath(), "recipes.json"),
      JSON.stringify(
        { schema_version: 1, updated_at: "2026-02-05T00:00:00Z", recipes: [{ id: "bad" }] },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid field manifest: expected object");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest tags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "invalid-tags",
        version: "1.0.0",
        name: "Invalid Tags",
        summary: "Invalid",
        description: "Invalid",
        tags: "nope",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid field manifest.tags: expected string[]");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid manifest id", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const archivePath = await createRecipeArchiveWithManifest({
      manifest: {
        schema_version: "1",
        id: "bad/path",
        version: "1.0.0",
        name: "Invalid Id",
        summary: "Invalid",
        description: "Invalid",
      },
    });

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toContain("Invalid manifest.id: must not contain path separators");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects invalid agent and scenario assets", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const cases: {
      manifest: Record<string, unknown>;
      files?: Record<string, string>;
      pattern: RegExp;
    }[] = [
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-id",
          version: "1.0.0",
          name: "Bad Agent",
          summary: "Bad Agent",
          description: "Bad Agent",
          agents: [
            {
              id: "bad/id",
              display_name: "Bad Agent",
              role: "executor",
              summary: "Bad",
              file: "agents/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_AGENT_SCENARIO",
              name: "Bad Agent Scenario",
              summary: "Bad agent scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["bad/id"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-agent.json",
            },
          ],
        },
        files: { "agents/bad.md": "# Bad Agent\n\nBroken id fixture.\n" },
        pattern: /Invalid agent\.id: must not contain path separators/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "missing-agent-file",
          version: "1.0.0",
          name: "Missing Agent",
          summary: "Missing Agent",
          description: "Missing Agent",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              file: "agents/missing.md",
            },
          ],
          scenarios: [
            {
              id: "MISSING_AGENT_SCENARIO",
              name: "Missing Agent Scenario",
              summary: "Missing agent scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/missing-agent.json",
            },
          ],
        },
        pattern: /Missing recipe agent file/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-agent-markdown",
          version: "1.0.0",
          name: "Bad Agent Markdown",
          summary: "Bad Agent Markdown",
          description: "Bad Agent Markdown",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              file: "agents/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_AGENT_MARKDOWN_SCENARIO",
              name: "Bad Agent Markdown Scenario",
              summary: "Bad agent markdown scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-agent.json",
            },
          ],
        },
        files: { "agents/bad.md": "   \n" },
        pattern: /Invalid field recipe agent file: expected non-empty markdown document/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-skill-markdown",
          version: "1.0.0",
          name: "Bad Skill Markdown",
          summary: "Bad Skill Markdown",
          description: "Bad Skill Markdown",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              skills: ["SKILL"],
              file: "agents/agent.md",
            },
          ],
          skills: [
            {
              id: "SKILL",
              summary: "Skill",
              file: "skills/bad.md",
            },
          ],
          scenarios: [
            {
              id: "BAD_SKILL_SCENARIO",
              name: "Bad Skill Scenario",
              summary: "Bad skill scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: ["SKILL"],
              tools_used: [],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad-skill.json",
            },
          ],
        },
        files: {
          "agents/agent.md": "# Agent\n\nExercise skill validation.\n",
          "skills/bad.md": "",
        },
        pattern: /Invalid field recipe skill file: expected non-empty markdown document/,
      },
      {
        manifest: {
          schema_version: "1",
          id: "bad-scenario-id",
          version: "1.0.0",
          name: "Bad Scenario",
          summary: "Bad Scenario",
          description: "Bad Scenario",
          agents: [
            {
              id: "AGENT",
              display_name: "Agent",
              role: "executor",
              summary: "Agent",
              tools: ["TOOL"],
              file: "agents/agent.md",
            },
          ],
          tools: [{ id: "TOOL", summary: "Tool", runtime: "bash", entrypoint: "tools/run.sh" }],
          scenarios: [
            {
              id: "BAD_SCENARIO",
              name: "Bad Scenario",
              summary: "Bad scenario",
              use_when: ["Validation fixture"],
              required_inputs: [],
              outputs: [],
              permissions: [],
              artifacts: [],
              agents_involved: ["AGENT"],
              skills_used: [],
              tools_used: ["TOOL"],
              run_profile: { mode: "analysis" },
              file: "scenarios/bad.json",
            },
          ],
        },
        files: {
          "agents/agent.md": "# Agent\n\nRun the scenario validation fixture.\n",
          "tools/run.sh": "#!/usr/bin/env bash\n",
          "scenarios/bad.json": JSON.stringify(
            {
              schema_version: "1",
              id: "..",
              summary: "Bad",
              goal: "Goal",
              task_template: {
                title: "Bad scenario task",
                description: "Broken scenario fixture.",
                owner: "CODER",
              },
              inputs: [],
              outputs: [],
              steps: [{ tool: "TOOL" }],
            },
            null,
            2,
          ),
        },
        pattern: /Invalid scenario\.id: must not be '\.' or '\.\.'/,
      },
    ];

    for (const entry of cases) {
      await resetAgentplaneHomeRecipes();
      const archivePath = await createRecipeArchiveWithManifest({
        manifest: entry.manifest,
        files: entry.files,
      });
      const io = captureStdIO();
      try {
        const code = await runCli(["recipes", "install", "--path", archivePath, "--root", root]);
        expect(code).toBe(4);
        expect(io.stderr).toMatch(entry.pattern);
      } finally {
        io.restore();
      }
    }
  });

  it("recipes list-remote reads cached index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const indexPath = path.join(agentplaneHomePath(), "recipes-index.json");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Viewer recipe",
          versions: [
            {
              version: "1.2.3",
              url: "https://example.com/viewer.tar.gz",
              sha256: "abc123",
            },
          ],
        },
      ],
    };
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("viewer@1.2.3 - Viewer recipe");
    } finally {
      io.restore();
    }
  });

  it("recipes list-remote rejects invalid cached index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const indexPath = path.join(agentplaneHomePath(), "recipes-index.json");
    const index = {
      schema_version: 1,
      recipes: [{ id: "broken", summary: "Broken", versions: [] }],
    };
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote"]);
      expect(code).toBe(4);
      expect(io.stderr).toContain(
        "Invalid field recipes index.recipes[]: expected id, summary, versions",
      );
    } finally {
      io.restore();
    }
  });

  it("recipes flag parsing rejects invalid usage", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const cases: { args: string[]; msg: string }[] = [
      { args: ["recipes", "install"], msg: "Exactly one source is required" },
      { args: ["recipes", "install", "--name"], msg: "Missing value after --name" },
      { args: ["recipes", "install", "--path"], msg: "Missing value after --path" },
      { args: ["recipes", "install", "--url"], msg: "Missing value after --url" },
      {
        args: ["recipes", "install", "--name", "x", "--path", "y"],
        msg: "Exactly one source is required",
      },
      {
        args: ["recipes", "install", "--path", "x", "extra"],
        msg: "Exactly one source is required",
      },
      {
        args: ["recipes", "install", "--conflict", "nope", "--path", "x"],
        msg: "Unknown option: --conflict",
      },
      { args: ["recipes", "list", "--tag"], msg: "Missing value after --tag" },
      { args: ["recipes", "list", "--nope"], msg: "Unknown option: --nope" },
      { args: ["recipes", "cache"], msg: "Missing recipes cache subcommand" },
      {
        args: ["recipes", "cache", "nope"],
        msg: "Unknown recipes cache subcommand",
      },
      {
        args: ["recipes", "cache", "prune", "--wat"],
        msg: "Unknown option: --wat",
      },
      {
        args: ["recipes", "list-remote", "--index"],
        msg: "Missing value after --index",
      },
      {
        args: ["recipes", "list-remote", "--wat"],
        msg: "Unknown option: --wat",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("recipes list-remote refreshes cache from local index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-index-"));
    const localIndexPath = path.join(tempDir, "index.json");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "redmine",
          summary: "Redmine sync",
          versions: [
            {
              version: "2.0.0",
              url: "https://example.com/redmine.tar.gz",
              sha256: "def456",
            },
          ],
        },
      ],
    };
    await writeSignedIndex(localIndexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote", "--refresh", "--index", localIndexPath]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("redmine@2.0.0 - Redmine sync");
    } finally {
      io.restore();
    }

    const cacheText = await readFile(path.join(agentplaneHomePath(), "recipes-index.json"), "utf8");
    expect(cacheText).toContain('"redmine"');
  });

  it("recipes list-remote refreshes cache from remote index", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await resetAgentplaneHomeRecipes();
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: "remote-recipe",
          summary: "Remote recipe",
          versions: [{ version: "1.0.0", url: "https://example.com/remote.tgz", sha256: "abc" }],
        },
      ],
    };

    const originalFetch = globalThis.fetch;
    const indexText = JSON.stringify(index, null, 2);
    const signature = signIndexPayload(indexText);
    globalThis.fetch = vi.fn((url: string) => {
      if (url.endsWith(".sig")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: () => Promise.resolve(signature),
        } as unknown as Response);
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        text: () => Promise.resolve(indexText),
      } as unknown as Response);
    }) as unknown as typeof fetch;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "list-remote",
        "--refresh",
        "--index",
        "https://example.com/index.json",
        "--yes",
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("remote-recipe@1.0.0");
    } finally {
      io.restore();
      globalThis.fetch = originalFetch;
    }
  });

  it("recipes install supports id from indexed catalog", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const { archivePath, manifest } = await createRecipeArchive({
      id: "viewer",
      version: "1.0.0",
      summary: "Viewer recipe",
    });
    const sha256 = createHash("sha256")
      .update(await readFile(archivePath))
      .digest("hex");
    const index = {
      schema_version: 1,
      recipes: [
        {
          id: String(manifest.id),
          summary: "Viewer recipe",
          versions: [
            {
              version: String(manifest.version),
              url: archivePath,
              sha256,
            },
          ],
        },
      ],
    };
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-index-"));
    const indexPath = path.join(tempDir, "index.json");
    await writeSignedIndex(indexPath, index);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--name",
        "viewer",
        "--index",
        indexPath,
        "--refresh",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const registry = JSON.parse(
      await readFile(
        path.join(process.env.AGENTPLANE_HOME ?? agentplaneHomePath(), "recipes.json"),
        "utf8",
      ),
    ) as { recipes: Array<{ id: string; version: string }> };
    expect(registry.recipes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: String(manifest.id), version: String(manifest.version) }),
      ]),
    );
  });

  it("recipes install rejects unsupported archives", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const filePath = path.join(root, "recipe.txt");
    await writeFile(filePath, "not an archive", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--path", filePath, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes install");
    } finally {
      io.restore();
    }
  });

  it("recipes list rejects extra args", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes list");
      expect(io.stderr).toContain("agentplane help recipes list --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes info rejects missing id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "info"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing required argument");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes info");
      expect(io.stderr).toContain("agentplane help recipes info --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes explain rejects missing id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "explain"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing required argument");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes explain");
      expect(io.stderr).toContain("agentplane help recipes explain --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects missing subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing recipes subcommand");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes");
      expect(io.stderr).toContain("agentplane help recipes --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes rejects unknown subcommand", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "noop"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown recipes subcommand");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes");
      expect(io.stderr).toContain("agentplane help recipes --compact");
    } finally {
      io.restore();
    }
  });

  it("recipes install rejects extra args", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "recipes",
        "install",
        "--path",
        "a.tar.gz",
        "extra",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Exactly one source is required");
    } finally {
      io.restore();
    }
  });

  it("recipes remove rejects extra args", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "remove", "id", "extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: extra");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane recipes remove");
      expect(io.stderr).toContain("agentplane help recipes remove --compact");
    } finally {
      io.restore();
    }
  });
});
