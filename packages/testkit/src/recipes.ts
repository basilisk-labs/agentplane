import { generateKeyPairSync, sign, type KeyObject } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, vi } from "vitest";

import {
  cmdScenarioInfoParsed,
  cmdScenarioListParsed,
  cmdScenarioRunParsed,
} from "../../agentplane/src/commands/scenario.js";
import { exitCodeForError } from "../../agentplane/src/cli/exit-codes.js";
import { parseCommandArgv } from "../../agentplane/src/cli/spec/parse.js";
import { captureStdIO, createRecipeArchive, mkGitRepoRoot, writeDefaultConfig } from "./cli.js";
import { CliError } from "../../agentplane/src/shared/errors.js";
import { recipesCachePruneSpec } from "../../agentplane/src/commands/recipes/cache-prune.command.js";
import { recipesAddSpec } from "../../agentplane/src/commands/recipes/add.command.js";
import { recipesExplainSpec } from "../../agentplane/src/commands/recipes/explain.command.js";
import { recipesInfoSpec } from "../../agentplane/src/commands/recipes/info.command.js";
import { recipesInstallSpec } from "../../agentplane/src/commands/recipes/install.spec.js";
import { recipesListRemoteSpec } from "../../agentplane/src/commands/recipes/list-remote.command.js";
import { recipesListSpec } from "../../agentplane/src/commands/recipes/list.command.js";
import { recipesDetachSpec } from "../../agentplane/src/commands/recipes/detach.command.js";
import { recipesRemoveSpec } from "../../agentplane/src/commands/recipes/remove.command.js";
import { recipesUpdateSpec } from "../../agentplane/src/commands/recipes/update.command.js";
import { cmdRecipeAddParsed } from "../../agentplane/src/commands/recipes/impl/commands/add.js";
import { cmdRecipeCachePruneParsed } from "../../agentplane/src/commands/recipes/impl/commands/cache-prune.js";
import { cmdRecipeDetachParsed } from "../../agentplane/src/commands/recipes/impl/commands/detach.js";
import { cmdRecipeExplainParsed } from "../../agentplane/src/commands/recipes/impl/commands/explain.js";
import { cmdRecipeInfoParsed } from "../../agentplane/src/commands/recipes/impl/commands/info.js";
import { cmdRecipeInstall } from "../../agentplane/src/commands/recipes/impl/commands/install.js";
import { cmdRecipeListParsed } from "../../agentplane/src/commands/recipes/impl/commands/list.js";
import { cmdRecipeListRemoteParsed } from "../../agentplane/src/commands/recipes/impl/commands/list-remote.js";
import { cmdRecipeRemoveParsed } from "../../agentplane/src/commands/recipes/impl/commands/remove.js";
import { cmdRecipeUpdateParsed } from "../../agentplane/src/commands/recipes/impl/commands/update.js";
import { hashRecipeTree } from "../../agentplane/src/commands/recipes/impl/project-recipe-state.js";
import { scenarioInfoSpec } from "../../agentplane/src/commands/scenario/info.command.js";
import { scenarioListSpec } from "../../agentplane/src/commands/scenario/list.command.js";
import { scenarioRunSpec } from "../../agentplane/src/commands/scenario/run.command.js";
import { resetRecipeArchiveCache } from "./cli-harness/recipe-archives.js";

const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let tempHome: string | null = null;
const testKeyId = "test-key";
let testPrivateKey: KeyObject | null = null;
const viWithGlobalStubReset = vi as typeof vi & { unstubAllGlobals?: () => void };

export { captureStdIO, createRecipeArchive, mkGitRepoRoot, writeDefaultConfig } from "./cli.js";

export function installRecipesCommandHarness(): void {
  beforeEach(async () => {
    tempHome = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipes-test-"));
    process.env.AGENTPLANE_HOME = tempHome;
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    testPrivateKey = privateKey;
    const publicPem = publicKey.export({ type: "spki", format: "pem" }).toString();
    process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS = JSON.stringify({ [testKeyId]: publicPem });
  });

  afterEach(async () => {
    viWithGlobalStubReset.unstubAllGlobals?.();
    await resetRecipeArchiveCache();
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
}

export function requireRecipesTempHome(): string {
  if (!tempHome) throw new Error("temp home not set");
  return tempHome;
}

export function signIndexPayload(indexText: string): {
  schema_version: 1;
  key_id: string;
  signature: string;
} {
  if (!testPrivateKey) throw new Error("test private key not set");
  const signature = sign(null, Buffer.from(indexText), testPrivateKey).toString("base64");
  return { schema_version: 1, key_id: testKeyId, signature };
}

export async function writeSignedIndex(indexPath: string, payload: unknown): Promise<void> {
  const indexText = JSON.stringify(payload, null, 2);
  await writeFile(indexPath, indexText, "utf8");
  const signature = signIndexPayload(indexText);
  await writeFile(`${indexPath}.sig`, JSON.stringify(signature, null, 2), "utf8");
}

export function resolveProjectRecipeDir(projectDir: string, recipeId: string): string {
  return path.join(projectDir, ".agentplane", "recipes", "packages", recipeId);
}

export function resolveProjectRecipesRegistryPath(projectDir: string): string {
  return path.join(projectDir, ".agentplane", "recipes", "registry.json");
}

function readStringFixtureValue(
  record: Record<string, unknown>,
  key: string,
  fallback: string,
): string {
  const value = record[key];
  return typeof value === "string" ? value : fallback;
}

export async function writeInstalledRecipes(projectDir: string, recipes: unknown[]): Promise<void> {
  const recipesHome = requireRecipesTempHome();
  const recipesDir = path.join(recipesHome, "recipes-store");
  await rm(recipesDir, { recursive: true, force: true });
  await mkdir(recipesDir, { recursive: true });
  const vendoredRecipesDir = path.join(projectDir, ".agentplane", "recipes", "packages");
  await rm(vendoredRecipesDir, { recursive: true, force: true });
  await mkdir(vendoredRecipesDir, { recursive: true });

  const cachedEntries: Record<string, unknown>[] = [];
  const registryEntries: Record<string, unknown>[] = [];

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
    const recipeDir = path.join(recipesDir, recipeId, recipeVersion);
    await mkdir(recipeDir, { recursive: true });
    await writeFile(
      path.join(recipeDir, "manifest.json"),
      JSON.stringify(manifest, null, 2),
      "utf8",
    );
    const vendoredRecipeDir = resolveProjectRecipeDir(projectDir, recipeId);
    await mkdir(vendoredRecipeDir, { recursive: true });
    await writeFile(
      path.join(vendoredRecipeDir, "manifest.json"),
      JSON.stringify(manifest, null, 2),
      "utf8",
    );
    cachedEntries.push({
      id: recipeId,
      version: recipeVersion,
      source,
      installed_at: installedAt,
      tags,
      manifest,
    });
    const scenarios = Array.isArray(manifest.scenarios)
      ? manifest.scenarios.filter(
          (scenario): scenario is Record<string, unknown> =>
            !!scenario && typeof scenario === "object",
        )
      : [];
    for (const scenario of scenarios) {
      const scenarioFile = readStringFixtureValue(scenario, "file", "").trim();
      if (!scenarioFile) continue;
      const scenarioId = readStringFixtureValue(scenario, "id", "SCENARIO");
      const scenarioName = readStringFixtureValue(scenario, "name", scenarioId);
      const scenarioSummary = readStringFixtureValue(scenario, "summary", scenarioName);
      const scenarioOutputs = Array.isArray(scenario.outputs)
        ? scenario.outputs.filter((entry): entry is string => typeof entry === "string")
        : [];
      const scenarioInputs = Array.isArray(scenario.required_inputs)
        ? scenario.required_inputs.filter((entry): entry is string => typeof entry === "string")
        : [];
      const scenarioPath = path.join(recipeDir, scenarioFile);
      const vendoredScenarioPath = path.join(vendoredRecipeDir, scenarioFile);
      await mkdir(path.dirname(scenarioPath), { recursive: true });
      await mkdir(path.dirname(vendoredScenarioPath), { recursive: true });
      const scenarioPayload = JSON.stringify(
        {
          schema_version: "1",
          id: scenarioId,
          summary: scenarioSummary,
          goal: scenarioSummary,
          task_template: {
            title: `${scenarioName} task`,
            description: scenarioSummary,
            owner: "CODER",
          },
          inputs: scenarioInputs.map((name) => ({ name, type: "string" })),
          outputs: scenarioOutputs.map((name) => ({ name, type: "string" })),
          steps: [],
        },
        null,
        2,
      );
      await writeFile(scenarioPath, scenarioPayload, "utf8");
      await writeFile(vendoredScenarioPath, scenarioPayload, "utf8");
    }

    const tools = Array.isArray(manifest.tools)
      ? manifest.tools.filter(
          (tool): tool is Record<string, unknown> => !!tool && typeof tool === "object",
        )
      : [];
    for (const tool of tools) {
      const entrypoint = readStringFixtureValue(tool, "entrypoint", "").trim();
      if (!entrypoint) continue;
      const toolSource = "console.log('ok');\n";
      const toolPath = path.join(recipeDir, entrypoint);
      const vendoredToolPath = path.join(vendoredRecipeDir, entrypoint);
      await mkdir(path.dirname(toolPath), { recursive: true });
      await mkdir(path.dirname(vendoredToolPath), { recursive: true });
      await writeFile(toolPath, toolSource, "utf8");
      await writeFile(vendoredToolPath, toolSource, "utf8");
    }

    registryEntries.push({
      id: recipeId,
      version: recipeVersion,
      path: `packages/${recipeId}`,
      active: false,
      materialization: "copy",
      source_ref: source,
      source_sha256: await hashRecipeTree(recipeDir),
      vendored_sha256: await hashRecipeTree(vendoredRecipeDir),
      installed_at: installedAt,
      tags,
    });
  }

  await writeInstalledRecipesRegistry(cachedEntries);
  await writeFile(
    resolveProjectRecipesRegistryPath(projectDir),
    JSON.stringify(
      {
        schema_version: 1,
        updated_at: "2026-02-05T00:00:00Z",
        recipes: registryEntries,
      },
      null,
      2,
    ),
    "utf8",
  );
}

export async function writeInstalledRecipesRegistry(recipes: unknown[]): Promise<void> {
  const recipesHome = requireRecipesTempHome();
  const payload = {
    schema_version: 1,
    updated_at: "2026-02-05T00:00:00Z",
    recipes,
  };
  await writeFile(path.join(recipesHome, "recipes.json"), JSON.stringify(payload, null, 2), "utf8");
}

export function skillEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_SKILL",
    summary: "Recipe skill",
    file: "skills/recipe.md",
    ...overrides,
  };
}

export function toolEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_TOOL",
    summary: "Recipe tool",
    runtime: "node",
    entrypoint: "tools/run.mjs",
    ...overrides,
  };
}

export function agentEntry(overrides?: Partial<Record<string, unknown>>) {
  return {
    id: "RECIPE_AGENT",
    display_name: "Recipe Agent",
    role: "executor",
    summary: "Recipe agent",
    skills: ["RECIPE_SKILL"],
    tools: ["RECIPE_TOOL"],
    file: "agents/recipe.md",
    ...overrides,
  };
}

export function scenarioDescriptor(overrides?: Partial<Record<string, unknown>>) {
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

export function baseRecipeManifest(overrides?: Partial<Record<string, unknown>>) {
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

export function baseRecipeEntry(overrides?: Partial<Record<string, unknown>>) {
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

export async function installRecipe(opts: {
  projectDir: string;
  archivePath?: string;
  tags?: string[];
  vendor?: boolean;
  mode?: "copy" | "link";
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
    if (opts.vendor ?? true) {
      const recipesHome = process.env.AGENTPLANE_HOME?.trim() ?? requireRecipesTempHome();
      const installed = JSON.parse(
        await readFile(path.join(recipesHome, "recipes.json"), "utf8"),
      ) as {
        recipes?: { id: string; version: string }[];
      };
      const latest = installed.recipes?.at(-1);
      if (!latest) throw new Error("cached recipe registry unexpectedly empty after install");
      await runRecipesTest({
        cwd: opts.projectDir,
        command: "add",
        args: opts.mode
          ? [`${latest.id}@${latest.version}`, "--mode", opts.mode]
          : [`${latest.id}@${latest.version}`],
      });
    }
  } finally {
    io.restore();
  }
}

export async function installRecipeFixture(opts: { projectDir: string; tags?: string[] }): Promise<{
  archivePath: string;
  manifest: Record<string, unknown>;
  manifestId: string;
}> {
  const fixture = await createRecipeArchive({ tags: opts.tags });
  await installRecipe({ projectDir: opts.projectDir, archivePath: fixture.archivePath });
  return {
    archivePath: fixture.archivePath,
    manifest: fixture.manifest,
    manifestId: String(fixture.manifest.id),
  };
}

export async function createInstalledRecipeProject(
  opts: {
    tags?: string[];
  } = {},
): Promise<{
  projectDir: string;
  archivePath: string;
  manifest: Record<string, unknown>;
  manifestId: string;
}> {
  const projectDir = await mkGitRepoRoot();
  await writeDefaultConfig(projectDir);
  const fixture = await installRecipeFixture({ projectDir, tags: opts.tags });
  return {
    projectDir,
    ...fixture,
  };
}

export function resolveInstalledScenarioPath(
  projectDir: string,
  recipeId: string,
  scenarioFile = path.join("scenarios", "recipe-scenario.json"),
): string {
  return path.join(projectDir, ".agentplane", "recipes", "packages", recipeId, scenarioFile);
}

export async function runRecipesTest(opts: {
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
    case "add": {
      const parsed = parseCommandArgv(recipesAddSpec, opts.args).parsed;
      return await cmdRecipeAddParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        recipeRef: parsed.recipeRef,
        mode: parsed.mode,
      });
    }
    case "remove": {
      const parsed = parseCommandArgv(recipesRemoveSpec, opts.args).parsed;
      return await cmdRecipeRemoveParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
      });
    }
    case "update": {
      const parsed = parseCommandArgv(recipesUpdateSpec, opts.args).parsed;
      return await cmdRecipeUpdateParsed({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        id: parsed.id,
        force: parsed.force,
      });
    }
    case "detach": {
      const parsed = parseCommandArgv(recipesDetachSpec, opts.args).parsed;
      return await cmdRecipeDetachParsed({
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

export async function runScenarioTest(opts: {
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
