import { mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig, loadConfig } from "@agentplaneorg/core";

import { extractArchive } from "../../../../cli/archive.js";
import { sha256File } from "../../../../cli/checksum.js";
import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../../../cli/fs-utils.js";
import { downloadToFile } from "../../../../cli/http.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureNetworkApproved } from "../../../shared/network-approval.js";
import { resolvePathFallback } from "../../../shared/path.js";

import { applyRecipeAgents, applyRecipeScenarios, moveRecipeDir } from "../apply.js";
import { resolveRecipeRoot } from "../archive.js";
import { DEFAULT_RECIPES_INDEX_URL } from "../constants.js";
import { loadRecipesRemoteIndex, willFetchRemoteRecipesIndex } from "../index.js";
import { readInstalledRecipesFile, writeInstalledRecipesFile } from "../installed-recipes.js";
import { readRecipeManifest } from "../manifest.js";
import { normalizeRecipeTags } from "../normalize.js";
import {
  resolveGlobalRecipesDir,
  resolveInstalledRecipeDir,
  resolveInstalledRecipesPath,
  resolveRecipesIndexCachePath,
} from "../paths.js";
import { maybeResolveProject } from "../project.js";
import type { RecipeConflictMode, RecipeInstallSource } from "../types.js";

function isHttpUrl(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
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
            exitCode: exitCodeForError("E_IO"),
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
            exitCode: exitCodeForError("E_IO"),
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
              exitCode: exitCodeForError("E_IO"),
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
          exitCode: exitCodeForError("E_IO"),
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
