import { mkdir, mkdtemp, readdir, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig, loadConfig } from "@agentplaneorg/core";

import { extractArchive } from "../../../cli/archive.js";
import { sha256File } from "../../../cli/checksum.js";
import { mapCoreError } from "../../../cli/error-map.js";
import { fileExists, getPathKind } from "../../../cli/fs-utils.js";
import { downloadToFile } from "../../../cli/http.js";
import { emptyStateMessage, infoMessage, successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { ensureNetworkApproved } from "../../shared/network-approval.js";
import { resolvePathFallback } from "../../shared/path.js";

import { applyRecipeAgents, applyRecipeScenarios, moveRecipeDir } from "./apply.js";
import { resolveRecipeRoot } from "./archive.js";
import { DEFAULT_RECIPES_INDEX_URL } from "./constants.js";
import { formatJsonBlock } from "./format.js";
import { loadRecipesRemoteIndex, willFetchRemoteRecipesIndex } from "./index.js";
import { readInstalledRecipesFile, writeInstalledRecipesFile } from "./installed-recipes.js";
import { normalizeRecipeTags } from "./normalize.js";
import { maybeResolveProject } from "./project.js";
import { collectRecipeScenarioDetails } from "./scenario.js";
import {
  resolveGlobalRecipesDir,
  resolveInstalledRecipeDir,
  resolveInstalledRecipesPath,
  resolveRecipesIndexCachePath,
} from "./paths.js";
import { readRecipeManifest } from "./manifest.js";
import type {
  RecipeCachePruneFlags,
  RecipeConflictMode,
  RecipeInstallSource,
  RecipeListFlags,
  RecipeListRemoteFlags,
} from "./types.js";

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export async function cmdRecipeListParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const filePath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(filePath);

    let recipes = installed.recipes;
    if (flags.tag) {
      const needle = flags.tag.toLowerCase();
      recipes = recipes.filter((entry) => entry.tags.some((tag) => tag.toLowerCase() === needle));
    }

    if (recipes.length === 0) {
      if (flags.tag) {
        process.stdout.write(`${emptyStateMessage(`installed recipes for tag ${flags.tag}`)}\n`);
        return 0;
      }
      process.stdout.write(
        `${emptyStateMessage(
          "installed recipes",
          "Use `agentplane recipes list-remote` or `agentplane recipes install <id>`.",
        )}\n`,
      );
      return 0;
    }

    if (flags.full) {
      process.stdout.write(
        `${JSON.stringify(
          { schema_version: 1, updated_at: installed.updated_at, recipes },
          null,
          2,
        )}\n`,
      );
      return 0;
    }

    for (const entry of recipes) {
      process.stdout.write(
        `${entry.id}@${entry.version} - ${entry.manifest.summary || "No summary"}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeListRemoteParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeListRemoteFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const project = await maybeResolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    let config = defaultConfig();
    if (project) {
      const loaded = await loadConfig(project.agentplaneDir);
      config = loaded.config;
    }
    const source = flags.index ?? DEFAULT_RECIPES_INDEX_URL;
    const cachePath = resolveRecipesIndexCachePath();
    const willFetchRemote = willFetchRemoteRecipesIndex({
      source,
      refresh: flags.refresh,
      cachePathExists: await fileExists(cachePath),
    });
    if (willFetchRemote) {
      await ensureNetworkApproved({
        config,
        yes: flags.yes,
        reason: "recipes list-remote fetches the remote recipes index",
      });
    }
    const index = await loadRecipesRemoteIndex({
      cwd: opts.cwd,
      source: flags.index,
      refresh: flags.refresh,
    });
    for (const recipe of index.recipes) {
      const latest = [...recipe.versions]
        .toSorted((a, b) => a.version.localeCompare(b.version))
        .at(-1);
      if (!latest) continue;
      process.stdout.write(`${recipe.id}@${latest.version} - ${recipe.summary}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes list-remote", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeInfoParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const manifest = entry.manifest;

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];
    const scenarios = manifest.scenarios ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarios.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarios) {
        const label = scenario?.id ?? "unknown";
        const summary = scenario?.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes info", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeExplainParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }

    const manifest = entry.manifest;
    const recipeDir = resolveInstalledRecipeDir(entry);
    const scenarioDetails = await collectRecipeScenarioDetails(recipeDir, manifest);

    process.stdout.write(`Recipe: ${manifest.id}@${manifest.version}\n`);
    process.stdout.write(`Name: ${manifest.name}\n`);
    process.stdout.write(`Summary: ${manifest.summary}\n`);
    process.stdout.write(`Description: ${manifest.description}\n`);
    if (manifest.tags && manifest.tags.length > 0) {
      process.stdout.write(`Tags: ${manifest.tags.join(", ")}\n`);
    }

    const agents = manifest.agents ?? [];
    const tools = manifest.tools ?? [];

    if (agents.length > 0) {
      process.stdout.write("Agents:\n");
      for (const agent of agents) {
        const label = agent?.id ?? "unknown";
        const summary = agent?.summary ? ` - ${agent.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (tools.length > 0) {
      process.stdout.write("Tools:\n");
      for (const tool of tools) {
        const label = tool?.id ?? "unknown";
        const summary = tool?.summary ? ` - ${tool.summary}` : "";
        process.stdout.write(`  - ${label}${summary}\n`);
      }
    }
    if (scenarioDetails.length > 0) {
      process.stdout.write("Scenarios:\n");
      for (const scenario of scenarioDetails) {
        const summary = scenario.summary ? ` - ${scenario.summary}` : "";
        process.stdout.write(`  - ${scenario.id}${summary}\n`);
        if (scenario.description) {
          process.stdout.write(`    Description: ${scenario.description}\n`);
        }
        if (scenario.goal) {
          process.stdout.write(`    Goal: ${scenario.goal}\n`);
        }
        if (scenario.inputs !== undefined) {
          const payload = formatJsonBlock(scenario.inputs, "      ");
          if (payload) process.stdout.write(`    Inputs:\n${payload}\n`);
        }
        if (scenario.outputs !== undefined) {
          const payload = formatJsonBlock(scenario.outputs, "      ");
          if (payload) process.stdout.write(`    Outputs:\n${payload}\n`);
        }
        if (scenario.steps && scenario.steps.length > 0) {
          process.stdout.write("    Steps:\n");
          let stepIndex = 1;
          for (const step of scenario.steps) {
            process.stdout.write(`      ${stepIndex}. ${JSON.stringify(step)}\n`);
            stepIndex += 1;
          }
          continue;
        }
        if (scenario.source !== "definition") {
          process.stdout.write("    Details: Scenario definition not found in recipe.\n");
        }
      }
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes explain", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeInstall(opts: {
  cwd: string;
  rootOverride?: string;
  source: RecipeInstallSource;
  index?: string;
  refresh: boolean;
  onConflict: RecipeConflictMode;
  yes: boolean;
}): Promise<number> {
  try {
    const project = await maybeResolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride });
    let config = defaultConfig();
    if (project) {
      const loaded = await loadConfig(project.agentplaneDir);
      config = loaded.config;
    }
    let networkApproved = false;
    const ensureApproved = async (reason: string): Promise<void> => {
      if (networkApproved) return;
      await ensureNetworkApproved({ config, yes: opts.yes, reason });
      networkApproved = true;
    };

    const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
    try {
      let sourceLabel = "";
      let expectedSha = "";
      let indexTags: string[] = [];

      const resolveFromIndex = async (recipeId: string): Promise<string> => {
        const indexSource = opts.index ?? DEFAULT_RECIPES_INDEX_URL;
        const cachePath = resolveRecipesIndexCachePath();
        const willFetchRemote = willFetchRemoteRecipesIndex({
          source: indexSource,
          refresh: opts.refresh,
          cachePathExists: await fileExists(cachePath),
        });
        if (willFetchRemote) {
          await ensureApproved("recipes install fetches the remote recipes index");
        }
        const index = await loadRecipesRemoteIndex({
          cwd: opts.cwd,
          source: opts.index,
          refresh: opts.refresh,
        });
        const entry = index.recipes.find((recipe) => recipe.id === recipeId);
        if (!entry) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe not found in remote index: ${recipeId}`,
          });
        }
        const latest = [...entry.versions]
          .toSorted((a, b) => a.version.localeCompare(b.version))
          .at(-1);
        if (!latest) {
          throw new CliError({
            exitCode: 3,
            code: "E_VALIDATION",
            message: `Recipe ${entry.id} has no versions in the remote index`,
          });
        }
        expectedSha = latest.sha256;
        sourceLabel = `${entry.id}@${latest.version}`;
        indexTags = normalizeRecipeTags(latest.tags ?? []);

        if (isHttpUrl(latest.url)) {
          await ensureApproved("recipes install downloads a recipe archive");
          const url = new URL(latest.url);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          await downloadToFile(latest.url, target);
          return target;
        }
        const resolved = path.resolve(opts.cwd, latest.url);
        if (!(await fileExists(resolved))) {
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Recipe archive not found: ${latest.url}`,
          });
        }
        return resolved;
      };

      const resolveSourcePath = async (source: RecipeInstallSource): Promise<string> => {
        if (source.type === "name") return await resolveFromIndex(source.value);
        if (source.type === "url") {
          await ensureApproved("recipes install downloads a recipe archive");
          const url = new URL(source.value);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          sourceLabel = source.value;
          await downloadToFile(source.value, target);
          return target;
        }
        if (source.type === "path") {
          const candidate = await resolvePathFallback(source.value);
          if (!(await fileExists(candidate))) {
            throw new CliError({
              exitCode: 5,
              code: "E_IO",
              message: `Recipe archive not found: ${source.value}`,
            });
          }
          sourceLabel = candidate;
          return candidate;
        }
        if (isHttpUrl(source.value)) {
          return await resolveSourcePath({ type: "url", value: source.value });
        }
        const candidate = await resolvePathFallback(source.value);
        if (await fileExists(candidate)) {
          return await resolveSourcePath({ type: "path", value: source.value });
        }
        return await resolveSourcePath({ type: "name", value: source.value });
      };

      const sourcePath = await resolveSourcePath(opts.source);
      if (!sourceLabel) sourceLabel = opts.source.value;

      const actualSha = expectedSha ? await sha256File(sourcePath) : "";
      if (expectedSha && actualSha !== expectedSha) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Recipe checksum mismatch for ${sourceLabel}`,
        });
      }

      await extractArchive({
        archivePath: sourcePath,
        destDir: tempRoot,
      });
      const recipeRoot = await resolveRecipeRoot(tempRoot);
      const manifest = await readRecipeManifest(path.join(recipeRoot, "manifest.json"));
      const resolvedTags =
        manifest.tags && manifest.tags.length > 0 ? manifest.tags : normalizeRecipeTags(indexTags);
      const manifestWithTags =
        resolvedTags.length > 0 ? { ...manifest, tags: resolvedTags } : manifest;

      const installDir = resolveInstalledRecipeDir(manifestWithTags);
      const installKind = await getPathKind(installDir);
      if (installKind && installKind !== "dir") {
        throw new CliError({
          exitCode: 5,
          code: "E_IO",
          message: `Recipe install path is not a directory: ${installDir}`,
        });
      }

      const hadExisting = Boolean(installKind);
      if (installKind) {
        await rm(installDir, { recursive: true, force: true });
      }
      await mkdir(resolveGlobalRecipesDir(), { recursive: true });
      await moveRecipeDir({ from: recipeRoot, to: installDir });

      try {
        if (project) {
          await applyRecipeAgents({
            manifest: manifestWithTags,
            recipeDir: installDir,
            agentplaneDir: project.agentplaneDir,
            onConflict: opts.onConflict,
          });
        }
        await applyRecipeScenarios({ manifest: manifestWithTags, recipeDir: installDir });
      } catch (err) {
        if (!hadExisting) {
          await rm(installDir, { recursive: true, force: true });
        }
        throw err;
      }

      const recipesPath = resolveInstalledRecipesPath();
      const installed = await readInstalledRecipesFile(recipesPath);
      const updated = installed.recipes.filter((entry) => entry.id !== manifestWithTags.id);
      updated.push({
        id: manifestWithTags.id,
        version: manifestWithTags.version,
        source: sourceLabel,
        installed_at: new Date().toISOString(),
        tags: resolvedTags,
        manifest: manifestWithTags,
      });
      await writeInstalledRecipesFile(recipesPath, {
        schema_version: 1,
        updated_at: installed.updated_at,
        recipes: updated,
      });

      process.stdout.write(`Installed recipe ${manifestWithTags.id}@${manifestWithTags.version}\n`);
      return 0;
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes install", root: opts.rootOverride ?? null });
  }
}

export async function cmdRecipeRemoveParsed(opts: {
  cwd: string;
  rootOverride?: string;
  id: string;
}): Promise<number> {
  try {
    const recipesPath = resolveInstalledRecipesPath();
    const installed = await readInstalledRecipesFile(recipesPath);
    const entry = installed.recipes.find((recipe) => recipe.id === opts.id);
    if (!entry) {
      throw new CliError({
        exitCode: 5,
        code: "E_IO",
        message: `Recipe not installed: ${opts.id}`,
      });
    }
    const recipeDir = resolveInstalledRecipeDir(entry);
    await rm(recipeDir, { recursive: true, force: true });

    const updated = installed.recipes.filter((recipe) => recipe.id !== opts.id);
    await writeInstalledRecipesFile(recipesPath, {
      schema_version: 1,
      updated_at: installed.updated_at,
      recipes: updated,
    });

    process.stdout.write(`${successMessage("removed recipe", `${entry.id}@${entry.version}`)}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes remove", root: opts.rootOverride ?? null });
  }
}

async function listRecipeCacheEntries(cacheDir: string): Promise<
  {
    id: string;
    version: string;
    path: string;
  }[]
> {
  const entries: { id: string; version: string; path: string }[] = [];
  const recipeDirs = await readdir(cacheDir, { withFileTypes: true });
  for (const recipeDir of recipeDirs) {
    if (!recipeDir.isDirectory()) continue;
    const recipeId = recipeDir.name;
    const versionRoot = path.join(cacheDir, recipeId);
    const versions = await readdir(versionRoot, { withFileTypes: true });
    for (const versionDir of versions) {
      if (!versionDir.isDirectory()) continue;
      const version = versionDir.name;
      entries.push({
        id: recipeId,
        version,
        path: path.join(versionRoot, version),
      });
    }
  }
  return entries;
}

export async function cmdRecipeCachePruneParsed(opts: {
  cwd: string;
  rootOverride?: string;
  flags: RecipeCachePruneFlags;
}): Promise<number> {
  const flags = opts.flags;
  try {
    const cacheDir = resolveGlobalRecipesDir();
    if (!(await fileExists(cacheDir))) {
      process.stdout.write(`${infoMessage(`recipe cache directory not found: ${cacheDir}`)}\n`);
      return 0;
    }

    const cacheEntries = await listRecipeCacheEntries(cacheDir);
    if (cacheEntries.length === 0) {
      process.stdout.write(`${infoMessage("recipe cache is empty")}\n`);
      return 0;
    }

    if (flags.all) {
      if (flags.dryRun) {
        for (const entry of cacheEntries) {
          process.stdout.write(
            `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
          );
        }
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${cacheEntries.length} cached recipes`)}\n`,
        );
        return 0;
      }
      await rm(cacheDir, { recursive: true, force: true });
      await writeInstalledRecipesFile(resolveInstalledRecipesPath(), {
        schema_version: 1,
        updated_at: "",
        recipes: [],
      });
      process.stdout.write(
        `${successMessage("removed cached recipes", undefined, `count=${cacheEntries.length}`)}\n`,
      );
      return 0;
    }

    const installed = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const keep = new Set(installed.recipes.map((entry) => `${entry.id}@${entry.version}`));
    const prune = cacheEntries.filter((entry) => !keep.has(`${entry.id}@${entry.version}`));

    if (prune.length === 0) {
      process.stdout.write(
        `${infoMessage("recipe cache already clean (no uninstalled entries)")}\n`,
      );
      return 0;
    }

    if (flags.dryRun) {
      for (const entry of prune) {
        process.stdout.write(
          `${infoMessage(`dry-run: would remove ${entry.id}@${entry.version}`)}\n`,
        );
      }
      process.stdout.write(
        `${infoMessage(`dry-run: would remove ${prune.length} cached recipes`)}\n`,
      );
      return 0;
    }

    const recipeDirs = new Set<string>();
    for (const entry of prune) {
      recipeDirs.add(path.dirname(entry.path));
      await rm(entry.path, { recursive: true, force: true });
    }
    for (const recipeDir of recipeDirs) {
      const remaining = await readdir(recipeDir);
      if (remaining.length === 0) {
        await rm(recipeDir, { recursive: true, force: true });
      }
    }

    process.stdout.write(
      `${successMessage("removed cached recipes", undefined, `count=${prune.length}`)}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes cache prune", root: opts.rootOverride ?? null });
  }
}
