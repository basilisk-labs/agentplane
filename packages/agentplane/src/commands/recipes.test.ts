import { generateKeyPairSync, sign } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { resolveProject } from "@agentplaneorg/core";

import {
  buildRecipeResolverContext,
  cmdRecipeCachePruneParsed,
  cmdRecipeExplainParsed,
  cmdRecipeInfoParsed,
  cmdRecipeInstall,
  cmdRecipeListParsed,
  cmdRecipeListRemoteParsed,
  cmdRecipeRemoveParsed,
  listResolvedRecipeScenarios,
  resolveRecipeScenarioSelection,
} from "./recipes.js";
import { cmdScenarioInfoParsed, cmdScenarioListParsed, cmdScenarioRunParsed } from "./scenario.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { CliError } from "../shared/errors.js";
import { parseCommandArgv } from "../cli/spec/parse.js";
import { recipesCachePruneSpec } from "./recipes/cache-prune.command.js";
import { recipesExplainSpec } from "./recipes/explain.command.js";
import { recipesInfoSpec } from "./recipes/info.command.js";
import { recipesInstallSpec } from "./recipes/install.command.js";
import { recipesListRemoteSpec } from "./recipes/list-remote.command.js";
import { recipesListSpec } from "./recipes/list.command.js";
import { recipesRemoveSpec } from "./recipes/remove.command.js";
import { scenarioInfoSpec } from "./scenario/info.command.js";
import { scenarioListSpec } from "./scenario/list.command.js";
import { scenarioRunSpec } from "./scenario/run.command.js";
import {
  captureStdIO,
  createRecipeArchive,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let tempHome: string | null = null;
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

function resolveProjectRecipeDir(projectDir: string, recipeId: string): string {
  return path.join(projectDir, ".agentplane", "recipes", recipeId);
}

function readStringFixtureValue(
  record: Record<string, unknown>,
  key: string,
  fallback: string,
): string {
  const value = record[key];
  return typeof value === "string" ? value : fallback;
}

async function writeInstalledRecipes(projectDir: string, recipes: unknown[]): Promise<void> {
  const recipesDir = path.join(projectDir, ".agentplane", "recipes");
  await rm(recipesDir, { recursive: true, force: true });
  await mkdir(recipesDir, { recursive: true });

  for (const entry of recipes) {
    const record = entry as Record<string, unknown>;
    const manifest = record.manifest as Record<string, unknown>;
    const recipeId = readStringFixtureValue(
      record,
      "id",
      readStringFixtureValue(manifest, "id", ""),
    );
    const recipeVersion = readStringFixtureValue(
      record,
      "version",
      readStringFixtureValue(manifest, "version", ""),
    );
    const source = readStringFixtureValue(record, "source", "local");
    const installedAt = readStringFixtureValue(record, "installed_at", "2026-02-05T00:00:00Z");
    const tags = Array.isArray(record.tags)
      ? record.tags
      : Array.isArray(manifest.tags)
        ? manifest.tags
        : [];
    const recipeDir = resolveProjectRecipeDir(projectDir, recipeId);
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(manifest, null, 2),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, ".install.json"),
      JSON.stringify(
        {
          schema_version: 1,
          id: recipeId,
          version: recipeVersion,
          source,
          installed_at: installedAt,
          tags,
          install_mode: "project-local",
        },
        null,
        2,
      ),
      "utf8",
    );
  }
}

async function writeInstalledRecipesRegistry(recipes: unknown[]): Promise<void> {
  if (!tempHome) throw new Error("temp home not set");
  const payload = {
    schema_version: 1,
    updated_at: "2026-02-05T00:00:00Z",
    recipes,
  };
  await writeFile(path.join(tempHome, "recipes.json"), JSON.stringify(payload, null, 2), "utf8");
}

function skillEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_SKILL",
    summary: "Recipe skill",
    kind: "agent-skill",
    file: "skills/recipe.json",
    ...overrides,
  };
}

function toolEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_TOOL",
    summary: "Recipe tool",
    runtime: "node",
    entrypoint: "tools/run.mjs",
    ...overrides,
  };
}

function agentEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_AGENT",
    display_name: "Recipe Agent",
    role: "executor",
    summary: "Recipe agent",
    skills: ["RECIPE_SKILL"],
    tools: ["RECIPE_TOOL"],
    file: "agents/recipe.json",
    ...overrides,
  };
}

function scenarioDescriptor(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_SCENARIO",
    name: "Recipe Scenario",
    summary: "Recipe scenario",
    use_when: ["Recipe scenario is appropriate"],
    required_inputs: [],
    outputs: [],
    permissions: [],
    artifacts: [],
    agents_involved: ["RECIPE_AGENT"],
    skills_used: ["RECIPE_SKILL"],
    tools_used: ["RECIPE_TOOL"],
    run_profile: { mode: "analysis" },
    file: "scenarios/recipe.json",
    ...overrides,
  };
}

function baseRecipeManifest(overrides?: Partial<Record<string, unknown>>) {
  return {
    schema_version: "1",
    id: "viewer",
    version: "1.2.3",
    name: "Viewer",
    summary: "Preview tasks",
    description: "Preview tasks",
    tags: ["docs"],
    compatibility: {
      min_agentplane_version: "0.3.5",
      manifest_api_version: "1",
      scenario_api_version: "1",
      runtime_api_version: "1",
      platforms: ["darwin", "linux"],
      repo_types: ["generic"],
    },
    skills: [skillEntry()],
    agents: [agentEntry()],
    tools: [toolEntry()],
    scenarios: [scenarioDescriptor()],
    ...overrides,
  };
}

function baseRecipeEntry(overrides?: Partial<Record<string, unknown>>) {
  const base = {
    id: "viewer",
    version: "1.2.3",
    source: "local",
    installed_at: "2026-02-05T00:00:00Z",
    tags: ["docs"],
    manifest: baseRecipeManifest(),
  };
  if (!overrides) return base;
  return { ...base, ...overrides };
}

async function installRecipe(opts: {
  projectDir: string;
  archivePath?: string;
  tags?: string[];
}): Promise<void> {
  const { archivePath } = opts.archivePath
    ? { archivePath: opts.archivePath }
    : await createRecipeArchive({ tags: opts.tags });
  const io = captureStdIO();
  try {
    await runRecipesTest({
      cwd: opts.projectDir,
      command: "install",
      args: ["--path", archivePath],
    });
  } finally {
    io.restore();
  }
}

async function runRecipesTest(opts: {
  cwd: string;
  rootOverride?: string;
  command: string | undefined;
  args: string[];
}): Promise<number> {
  if (!opts.command) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Missing recipes subcommand.",
    });
  }

  switch (opts.command) {
    case "list": {
      const parsed = parseCommandArgv(recipesListSpec, opts.args).parsed;
      return await cmdRecipeListParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    case "list-remote": {
      const parsed = parseCommandArgv(recipesListRemoteSpec, opts.args).parsed;
      return await cmdRecipeListRemoteParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    case "info": {
      const parsed = parseCommandArgv(recipesInfoSpec, opts.args).parsed;
      return await cmdRecipeInfoParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "explain": {
      const parsed = parseCommandArgv(recipesExplainSpec, opts.args).parsed;
      return await cmdRecipeExplainParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "install": {
      const parsed = parseCommandArgv(recipesInstallSpec, opts.args).parsed;
      return await cmdRecipeInstall({ cwd: opts.cwd, rootOverride: opts.rootOverride, ...parsed });
    }
    case "remove": {
      const parsed = parseCommandArgv(recipesRemoveSpec, opts.args).parsed;
      return await cmdRecipeRemoveParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "cache": {
      const [sub, ...tail] = opts.args;
      if (sub !== "prune") {
        throw new CliError({
          exitCode: 2,
          code: "E_USAGE",
          message: `Unknown recipes cache subcommand: ${String(sub ?? "")}`,
        });
      }
      const parsed = parseCommandArgv(recipesCachePruneSpec, tail).parsed;
      return await cmdRecipeCachePruneParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        flags: parsed,
      });
    }
    default: {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown recipes subcommand: ${opts.command}`,
      });
    }
  }
}

async function runScenarioTest(opts: {
  cwd: string;
  rootOverride?: string;
  command: string | undefined;
  args: string[];
}): Promise<number> {
  if (!opts.command) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: "Missing scenario subcommand.",
    });
  }

  switch (opts.command) {
    case "list": {
      parseCommandArgv(scenarioListSpec, opts.args);
      return await cmdScenarioListParsed({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    }
    case "info": {
      const parsed = parseCommandArgv(scenarioInfoSpec, opts.args).parsed;
      return await cmdScenarioInfoParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        recipeId: parsed.recipeId,
        scenarioId: parsed.scenarioId,
      });
    }
    case "run": {
      const parsed = parseCommandArgv(scenarioRunSpec, opts.args).parsed;
      return await cmdScenarioRunParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        recipeId: parsed.recipeId,
        scenarioId: parsed.scenarioId,
      });
    }
    default: {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: `Unknown scenario subcommand: ${opts.command}`,
      });
    }
  }
}

describe("commands/recipes", () => {
  beforeEach(async () => {
    tempHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-test-"));
    process.env.AGENTPLANE_HOME = tempHome;
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    testPrivateKey = privateKey;
    const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ [testKeyId]: publicPem });
  });

  afterEach(async () => {
    if (tempHome) {
      await rm(tempHome, { recursive: true, force: true });
    }
    tempHome = null;
    if (originalAgentplaneHome === undefined) {
      delete process.env.AGENTPLANE_HOME;
    } else {
      process.env.AGENTPLANE_HOME = originalAgentplaneHome;
    }
    if (originalRecipesKeys === undefined) {
      delete process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
    } else {
      process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = originalRecipesKeys;
    }
    testPrivateKey = null;
  });

  it("rejects missing recipes subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toBeInstanceOf(CliError);
  });

  it("rejects invalid recipes install usage", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid recipes list usage", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--tag"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--unknown"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid recipes list payloads", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const recipeDir = resolveProjectRecipeDir(projectDir, "bad");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(
        baseRecipeManifest({
          id: "bad",
          version: "1.0.0",
          name: "Bad",
          summary: "Bad",
          description: "Bad",
        }),
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, ".install.json"),
      JSON.stringify({ schema_version: 2, id: "bad", version: "1.0.0" }, null, 2),
      "utf8",
    );

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("rejects invalid recipes index data", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeSignedIndex(indexPath, { schema_version: 1, recipes: [{ id: "viewer" }] });

    await expect(
      runRecipesTest({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("rejects unsigned recipes index", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeFile(indexPath, JSON.stringify({ schema_version: 1, recipes: [] }, null, 2), "utf8");

    await expect(
      runRecipesTest({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await rm(cwd, { recursive: true, force: true });
  });

  it("rejects recipes install positional + flag mix", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "extra"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with multiple explicit flags", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--url", "https://example.test"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with too many positional args", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["one", "two"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects recipes install with invalid conflict mode", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--name", "viewer", "--on-conflict", "bad"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("installs a recipe from a local archive path", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const { archivePath } = await createRecipeArchive();

    await expect(installRecipe({ projectDir, archivePath })).resolves.toBeUndefined();

    const manifestPath = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json");
    const installMetaPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      ".install.json",
    );
    expect(JSON.parse(await readFile(manifestPath, "utf8"))).toMatchObject({ id: "viewer" });
    expect(JSON.parse(await readFile(installMetaPath, "utf8"))).toMatchObject({
      id: "viewer",
      install_mode: "project-local",
    });
  });

  it("installs a recipe from a local directory path", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const fixtureRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-dir-"));
    const recipeDir = path.join(fixtureRoot, "local-viewer");
    await mkdir(path.join(recipeDir, "agents"), { recursive: true });
    await mkdir(path.join(recipeDir, "skills"), { recursive: true });
    await mkdir(path.join(recipeDir, "scenarios"), { recursive: true });
    await mkdir(path.join(recipeDir, "tools"), { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(
        baseRecipeManifest({
          id: "local-viewer",
          version: "0.1.0",
          name: "Local Viewer",
          summary: "Local recipe fixture",
          description: "Local recipe fixture",
          tools: [
            toolEntry({
              id: "noop",
              summary: "No-op tool",
              runtime: "node",
              entrypoint: "tools/noop.mjs",
              permissions: ["fs.read"],
            }),
          ],
          agents: [agentEntry({ tools: ["noop"] })],
          scenarios: [
            scenarioDescriptor({
              id: "fixture",
              name: "Fixture Scenario",
              summary: "Fixture scenario",
              tools_used: ["noop"],
              file: "scenarios/fixture.json",
            }),
          ],
        }),
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "agents", "recipe.json"),
      JSON.stringify({ id: "RECIPE_AGENT", role: "Recipe agent" }, null, 2),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "skills", "recipe.json"),
      JSON.stringify({ id: "RECIPE_SKILL", kind: "agent-skill" }, null, 2),
      "utf8",
    );
    await writeFile(
      path.join(recipeDir, "scenarios", "fixture.json"),
      JSON.stringify(
        {
          schema_version: "1",
          id: "fixture",
          goal: "Fixture goal",
          inputs: [],
          outputs: [],
          steps: [{ tool: "noop" }],
        },
        null,
        2,
      ),
      "utf8",
    );
    await writeFile(path.join(recipeDir, "tools", "noop.mjs"), "console.log('ok');\n", "utf8");

    const io = captureStdIO();
    try {
      await expect(
        runRecipesTest({
          cwd: projectDir,
          args: ["--path", recipeDir],
          command: "install",
        }),
      ).resolves.toBe(0);
    } finally {
      io.restore();
      await rm(fixtureRoot, { recursive: true, force: true });
    }

    expect(
      JSON.parse(
        await readFile(
          path.join(resolveProjectRecipeDir(projectDir, "local-viewer"), "manifest.json"),
          "utf8",
        ),
      ),
    ).toMatchObject({ id: "local-viewer" });
  });

  it("prints recipe info details", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir, tags: ["docs"] });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "info",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("Recipe: viewer@1.2.3");
    expect(io.stdout).toContain("Tags: docs");
    expect(io.stdout).toContain("Agents:");
    expect(io.stdout).toContain("Tools:");
  });

  it("prints recipe explain output", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "explain",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("Scenarios:");
    expect(io.stdout).toContain("Steps:");
  });

  it("recipe explain uses manifest scenarios when no scenario files exist", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          tags: [],
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              summary: "Alpha scenario",
              file: "scenarios/alpha.json",
            }),
          ],
        }),
      }),
    ]);
    const recipeDir = resolveProjectRecipeDir(projectDir, "viewer");
    await mkdir(recipeDir, { recursive: true });

    const io = captureStdIO();
    try {
      const code = await runRecipesTest({
        cwd: projectDir,
        args: ["viewer"],
        command: "explain",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Scenarios:");
      expect(io.stdout).toContain("alpha");
    } finally {
      io.restore();
    }
  });

  it("removes an installed recipe", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();
    try {
      await expect(
        runRecipesTest({
          cwd: projectDir,
          args: ["viewer"],
          command: "remove",
        }),
      ).resolves.toBe(0);
    } finally {
      io.restore();
    }

    await expect(
      readFile(path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json")),
    ).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("rejects removing a missing recipe", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["missing"],
        command: "remove",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install from index when recipe is missing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const indexPath = path.join(projectDir, "recipes-index.json");
    await writeSignedIndex(indexPath, { schema_version: 1, recipes: [] });

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--name", "missing", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("rejects install when index checksum mismatches", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const { archivePath } = await createRecipeArchive();
    const target = path.join(projectDir, "recipe.tar.gz");
    await writeFile(target, await readFile(archivePath));

    const indexPath = path.join(projectDir, "recipes-index.json");
    await writeSignedIndex(indexPath, {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "recipe.tar.gz", sha256: "bad" }],
        },
      ],
    });

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--name", "viewer", "--index", indexPath, "--refresh"],
        command: "install",
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("scenario list and info read installed recipe scenarios", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const ioList = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      });
      expect(code).toBe(0);
      expect(ioList.stdout).toContain("viewer:RECIPE_SCENARIO");
    } finally {
      ioList.restore();
    }

    const ioInfo = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(ioInfo.stdout).toContain("Scenario:");
      expect(ioInfo.stdout).toContain("Use when:");
      expect(ioInfo.stdout).toContain("Run profile:");
      expect(ioInfo.stdout).toContain("Compatibility: satisfied");
    } finally {
      ioInfo.restore();
    }
  });

  it("builds deterministic resolver context and normalized run profiles", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeFile(
      path.join(projectDir, "package.json"),
      JSON.stringify({ name: "resolver-fixture", private: true }, null, 2),
      "utf8",
    );
    await writeInstalledRecipes(projectDir, [baseRecipeEntry()]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const context = await buildRecipeResolverContext({ project });
    const resolvedScenarios = await listResolvedRecipeScenarios({ project });

    expect(context).toMatchObject({
      manifest_api_version: "1",
      scenario_api_version: "1",
      runtime_api_version: "1",
      repo_types: ["generic", "node"],
    });
    expect(resolvedScenarios).toHaveLength(1);
    expect(resolvedScenarios[0]).toMatchObject({
      recipe_id: "viewer",
      scenario_id: "RECIPE_SCENARIO",
      compatibility: { ok: true },
      run_profile: {
        mode: "analysis",
        network: false,
        requires_human_approval: false,
        permissions: [],
        agents_involved: ["RECIPE_AGENT"],
        skills_used: ["RECIPE_SKILL"],
        tools_used: ["RECIPE_TOOL"],
        required_inputs: [],
        outputs: [],
        artifacts: [],
        writes_artifacts_to: [],
      },
    });
    expect(resolvedScenarios[0].compatibility.reasons).toEqual(
      expect.arrayContaining([
        expect.stringContaining("agentplane"),
        "manifest_api_version=1",
        "scenario_api_version=1",
        "runtime_api_version=1",
      ]),
    );
  });

  it("selects a single scenario with explicit resolver reasons", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              required_inputs: ["task_id"],
              permissions: ["network"],
              run_profile: {
                mode: "analysis",
                sandbox: "read-only",
              },
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    const selection = await resolveRecipeScenarioSelection({
      project,
      flags: {
        recipeId: "viewer",
        scenarioId: "RECIPE_SCENARIO",
        tags: ["docs"],
        mode: "analysis",
        available_inputs: ["task_id"],
      },
    });

    expect(selection.run_profile).toMatchObject({
      mode: "analysis",
      sandbox: "read-only",
      network: true,
      required_inputs: ["task_id"],
      permissions: ["network"],
    });
    expect(selection.selection_reasons).toEqual(
      expect.arrayContaining([
        "recipe compatibility satisfied",
        "matches requested recipe: viewer",
        "matches requested scenario: RECIPE_SCENARIO",
        "matches required tags: docs",
        "matches requested mode: analysis",
        "required inputs satisfied: task_id",
      ]),
    );
  });

  it("rejects ambiguous resolver selection instead of guessing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              file: "scenarios/alpha.json",
            }),
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);
    const project = await resolveProject({ cwd: projectDir, rootOverride: projectDir });

    await expect(
      resolveRecipeScenarioSelection({
        project,
        flags: { recipeId: "viewer" },
      }),
    ).rejects.toThrow("Scenario selection is ambiguous: viewer:alpha, viewer:beta");
  });

  it("scenario commands validate usage and run scenarios", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: undefined }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["extra"], command: "list" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: "info" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer"], command: "info" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: [], command: "run" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    const ioRun = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "run",
      });
      expect(code).toBe(0);
    } finally {
      ioRun.restore();
    }
  });

  it("scenario run rejects missing recipes and scenarios", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["missing:scenario"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    await installRecipe({ projectDir });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:UNKNOWN"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });

    const scenarioPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      "scenarios",
      "recipe-scenario.json",
    );
    await rm(scenarioPath, { force: true });

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("scenario list prints empty state when no recipes are installed", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({ cwd: projectDir, args: [], command: "list" });
      expect(code).toBe(0);
      expect(io.stdout).toContain("No scenarios found");
    } finally {
      io.restore();
    }
  });

  it("scenario info remains manifest-driven when definition is missing", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              summary: "Beta scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:beta"],
        command: "info",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Summary: Beta scenario");
      expect(io.stdout).toContain("Run profile:");
      expect(io.stdout).toContain("Use when:");
      expect(io.stdout).toContain("Scenario file:");
      expect(io.stdout).not.toContain("Steps:");
    } finally {
      io.restore();
    }
  });

  it("scenario run prints a prepared run plan without writing artifacts", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const io = captureStdIO();
    try {
      const code = await runScenarioTest({
        cwd: projectDir,
        args: ["viewer:RECIPE_SCENARIO"],
        command: "run",
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Prepared run plan: viewer:RECIPE_SCENARIO");
      expect(io.stdout).toContain("Selection reasons:");
      expect(io.stdout).toContain("Status: scenario orchestration runtime is not implemented yet.");
    } finally {
      io.restore();
    }

    await expect(
      readdir(path.join(projectDir, ".agentplane", "recipes", "viewer", "runs")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("scenario run rejects incompatible runtime context", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const manifestPath = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "manifest.json");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8")) as Record<string, unknown>;
    ((manifest.compatibility as Record<string, unknown>).platforms as unknown[]) = ["win32"];
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("scenario run validates recipe-local file references", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    await rm(path.join(resolveProjectRecipeDir(projectDir, "viewer"), "agents", "recipe.json"), {
      force: true,
    });
    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("scenario run validates scenario definition schema", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await installRecipe({ projectDir });

    const scenarioPath = path.join(
      resolveProjectRecipeDir(projectDir, "viewer"),
      "scenarios",
      "recipe-scenario.json",
    );
    const scenario = JSON.parse(await readFile(scenarioPath, "utf8")) as Record<string, unknown>;
    delete scenario.goal;
    await writeFile(scenarioPath, JSON.stringify(scenario, null, 2), "utf8");

    await expect(
      runScenarioTest({ cwd: projectDir, args: ["viewer:RECIPE_SCENARIO"], command: "run" }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("lists empty recipes with default hint", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("No installed recipes found");
  });

  it("lists empty recipes for a tag", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--tag", "docs"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("installed recipes for tag docs");
  });

  it("lists recipes in full JSON output", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [baseRecipeEntry()]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--full"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    const parsed = JSON.parse(io.stdout) as { recipes: { id: string }[] };
    expect(parsed.recipes[0]?.id).toBe("viewer");
  });

  it("lists recipes filtered by tag", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        id: "viewer",
        tags: ["docs"],
        manifest: {
          ...baseRecipeManifest({
            tags: ["docs"],
          }),
        },
      }),
      baseRecipeEntry({
        id: "runner",
        version: "2.0.0",
        tags: ["ops"],
        manifest: {
          ...baseRecipeManifest({
            id: "runner",
            version: "2.0.0",
            name: "Runner",
            summary: "Runs jobs",
            description: "Runs jobs",
            tags: ["ops"],
          }),
        },
      }),
    ]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: projectDir,
        args: ["--tag", "docs"],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer@1.2.3");
    expect(io.stdout).not.toContain("runner@2.0.0");
  });

  it("lists remote recipes from a local index", async () => {
    const cwd = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-cwd-"));
    const indexPath = path.join(cwd, "recipes-index.json");
    await writeSignedIndex(indexPath, {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
        },
      ],
    });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd,
        args: ["--index", indexPath, "--refresh"],
        command: "list-remote",
      }),
    ).resolves.toBe(0);

    io.restore();
    await rm(cwd, { recursive: true, force: true });

    expect(io.stdout).toContain("viewer@1.0.0");
  });

  it("lists remote recipes from an http index", async () => {
    const indexPayload = {
      schema_version: 1,
      recipes: [
        {
          id: "viewer",
          summary: "Preview tasks",
          description: "Preview tasks",
          versions: [{ version: "1.0.0", url: "https://example.test", sha256: "abc" }],
        },
      ],
    };
    const indexText = JSON.stringify(indexPayload, null, 2);
    const signature = signIndexPayload(indexText);
    const fetchMock = vi.fn((url: string) => {
      if (url.endsWith(".sig")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: "OK",
          json: () => signature,
        });
      }
      return Promise.resolve({
        ok: true,
        status: 200,
        statusText: "OK",
        text: () => Promise.resolve(indexText),
      });
    });
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["--index", "https://example.test/index.json", "--refresh", "--yes"],
        command: "list-remote",
      }),
    ).resolves.toBe(0);

    io.restore();
    vi.unstubAllGlobals();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(io.stdout).toContain("viewer@1.0.0");
  });

  it("rejects missing cache subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: [],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache subcommand", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["noop"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects invalid cache prune flags", async () => {
    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune", "--bad"],
        command: "cache",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("reports missing recipe cache directory", async () => {
    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache directory not found");
  });

  it("reports empty recipe cache directory", async () => {
    if (!tempHome) throw new Error("temp home not set");
    await mkdir(path.join(tempHome, "recipes"), { recursive: true });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache is empty");
  });

  it("reports dry-run cache prune with --all", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune", "--all", "--dry-run"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("dry-run: would remove viewer@1.2.3");
  });

  it("reports clean cache when all cached recipes are installed", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipesRegistry([baseRecipeEntry()]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("recipe cache already clean");
  });

  it("prunes uninstalled cached recipes", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });
    await writeInstalledRecipesRegistry([]);

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("removed cached recipes");
  });

  it("removes all cached recipes with --all", async () => {
    if (!tempHome) throw new Error("temp home not set");
    const cacheDir = path.join(tempHome, "recipes", "viewer", "1.2.3");
    await mkdir(cacheDir, { recursive: true });

    const io = captureStdIO();

    await expect(
      runRecipesTest({
        cwd: process.cwd(),
        args: ["prune", "--all"],
        command: "cache",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("removed cached recipes");
  });

  it("lists scenarios from manifest descriptors with matching definition files", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "alpha",
              name: "Alpha Scenario",
              summary: "Alpha scenario",
              file: "scenarios/alpha.json",
            }),
          ],
        }),
      }),
    ]);

    const recipeDir = path.join(resolveProjectRecipeDir(projectDir, "viewer"), "scenarios");
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "alpha.json"),
      JSON.stringify(
        {
          schema_version: "1",
          id: "alpha",
          goal: "Do the thing",
          inputs: [],
          outputs: [],
          steps: [],
          summary: "Alpha scenario",
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();

    await expect(
      runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:alpha");
  });

  it("lists scenarios from manifest descriptors without definition files", async () => {
    const projectDir = await mkGitRepoRoot();
    await writeDefaultConfig(projectDir);
    await writeInstalledRecipes(projectDir, [
      baseRecipeEntry({
        manifest: baseRecipeManifest({
          scenarios: [
            scenarioDescriptor({
              id: "beta",
              name: "Beta Scenario",
              summary: "Beta scenario",
              file: "scenarios/beta.json",
            }),
          ],
        }),
      }),
    ]);

    const io = captureStdIO();

    await expect(
      runScenarioTest({
        cwd: projectDir,
        args: [],
        command: "list",
      }),
    ).resolves.toBe(0);

    io.restore();
    expect(io.stdout).toContain("viewer:beta");
  });

  it("rejects missing scenario subcommand", async () => {
    await expect(
      runScenarioTest({
        cwd: process.cwd(),
        args: [],
        command: undefined,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("rejects scenario list with extra args", async () => {
    await expect(
      runScenarioTest({
        cwd: process.cwd(),
        args: ["extra"],
        command: "list",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });
});
