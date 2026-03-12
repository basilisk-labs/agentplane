import { generateKeyPairSync, sign, type KeyObject } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, vi } from "vitest";

import {
  cmdRecipeCachePruneParsed,
  cmdRecipeExplainParsed,
  cmdRecipeInfoParsed,
  cmdRecipeInstall,
  cmdRecipeListParsed,
  cmdRecipeListRemoteParsed,
  cmdRecipeRemoveParsed,
} from "./recipes.js";
import { cmdScenarioInfoParsed, cmdScenarioListParsed, cmdScenarioRunParsed } from "./scenario.js";
import { exitCodeForError } from "../cli/exit-codes.js";
import { parseCommandArgv } from "../cli/spec/parse.js";
import { captureStdIO, createRecipeArchive } from "../cli/run-cli.test-helpers.js";
import { CliError } from "../shared/errors.js";
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

const originalAgentplaneHome = process.env.AGENTPLANE_HOME;
const originalRecipesKeys = process.env.AGENTPLANE_RECIPES_INDEX_PUBLIC_KEYS;
let tempHome: string | null = null;
const testKeyId = "test-key";
let testPrivateKey: KeyObject | null = null;

export {
  captureStdIO,
  createRecipeArchive,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

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
    vi.unstubAllGlobals();
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

export async function writeInstalledRecipes(projectDir: string, recipes: unknown[]): Promise<void> {
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
    kind: "agent-skill",
    file: "skills/recipe.json",
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
    file: "agents/recipe.json",
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
