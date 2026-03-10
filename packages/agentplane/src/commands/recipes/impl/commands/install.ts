import { cp, mkdir, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { defaultConfig, loadConfig, resolveProject } from "@agentplaneorg/core";

import { extractArchive } from "../../../../cli/archive.js";
import { sha256File } from "../../../../cli/checksum.js";
import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../../../cli/fs-utils.js";
import { downloadToFile } from "../../../../cli/http.js";
import {
  getBundledRecipeEntry,
  resolveBundledRecipeSourcePath,
} from "../../../../recipes/bundled-recipes.js";
import { CliError } from "../../../../shared/errors.js";
import { ensureNetworkApproved } from "../../../shared/network-approval.js";
import { resolvePathFallback } from "../../../shared/path.js";

import { moveRecipeDir, validateRecipeAssets } from "../apply.js";
import { resolveRecipeRoot } from "../archive.js";
import { DEFAULT_RECIPES_INDEX_URL, RECIPE_RUNS_DIR_NAME } from "../constants.js";
import { loadRecipesRemoteIndex, willFetchRemoteRecipesIndex } from "../index.js";
import { readRecipeManifest } from "../manifest.js";
import { normalizeRecipeTags } from "../normalize.js";
import { writeRecipeInstallMetadata } from "../project-installed-recipes.js";
import {
  resolveProjectInstalledRecipeDir,
  resolveProjectRecipeInstallMetaPath,
  resolveProjectRecipesDir,
  resolveRecipesIndexCachePath,
} from "../paths.js";
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
  void opts.onConflict;
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    let config = defaultConfig();
    const loaded = await loadConfig(project.agentplaneDir);
    config = loaded.config;
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

      const resolveFromIndex = async (
        recipeId: string,
      ): Promise<{ kind: "archive"; path: string }> => {
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
          return { kind: "archive", path: target };
        }
        const resolved = path.resolve(opts.cwd, latest.url);
        if (!(await fileExists(resolved))) {
          throw new CliError({
            exitCode: exitCodeForError("E_IO"),
            code: "E_IO",
            message: `Recipe archive not found: ${latest.url}`,
          });
        }
        return { kind: "archive", path: resolved };
      };

      const resolveSourcePath = async (
        source: RecipeInstallSource,
      ): Promise<{ kind: "archive" | "directory"; path: string }> => {
        if (source.type === "name") {
          const bundledPath = resolveBundledRecipeSourcePath(source.value);
          if (bundledPath && (await fileExists(path.join(bundledPath, "manifest.json")))) {
            const bundledEntry = getBundledRecipeEntry(source.value);
            const bundledVersion = bundledEntry?.versions.at(-1)?.version ?? "unknown";
            sourceLabel = `bundled:${source.value}@${bundledVersion}`;
            return { kind: "directory", path: bundledPath };
          }
          return await resolveFromIndex(source.value);
        }
        if (source.type === "url") {
          await ensureApproved("recipes install downloads a recipe archive");
          const url = new URL(source.value);
          const filename = path.basename(url.pathname) || "recipe.tar.gz";
          const target = path.join(tempRoot, filename);
          sourceLabel = source.value;
          await downloadToFile(source.value, target);
          return { kind: "archive", path: target };
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
          const kind = await getPathKind(candidate);
          if (kind === "dir") {
            sourceLabel = candidate;
            return { kind: "directory", path: candidate };
          }
          sourceLabel = candidate;
          return { kind: "archive", path: candidate };
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

      const sourceInput = await resolveSourcePath(opts.source);
      const sourcePath = sourceInput.path;
      if (!sourceLabel) sourceLabel = opts.source.value;

      const actualSha =
        expectedSha && sourceInput.kind === "archive" ? await sha256File(sourcePath) : "";
      if (expectedSha && actualSha !== expectedSha) {
        throw new CliError({
          exitCode: 3,
          code: "E_VALIDATION",
          message: `Recipe checksum mismatch for ${sourceLabel}`,
        });
      }

      let recipeRoot: string;
      if (sourceInput.kind === "archive") {
        await extractArchive({
          archivePath: sourcePath,
          destDir: tempRoot,
        });
        recipeRoot = await resolveRecipeRoot(tempRoot);
      } else {
        const stagedRecipeRoot = path.join(tempRoot, "recipe");
        await cp(sourcePath, stagedRecipeRoot, { recursive: true });
        recipeRoot = stagedRecipeRoot;
      }
      const manifest = await readRecipeManifest(path.join(recipeRoot, "manifest.json"));
      const resolvedTags =
        manifest.tags && manifest.tags.length > 0 ? manifest.tags : normalizeRecipeTags(indexTags);
      const manifestWithTags =
        resolvedTags.length > 0 ? { ...manifest, tags: resolvedTags } : manifest;
      await validateRecipeAssets({ manifest: manifestWithTags, recipeDir: recipeRoot });

      const installDir = resolveProjectInstalledRecipeDir(project, manifestWithTags.id);
      const installKind = await getPathKind(installDir);
      if (installKind && installKind !== "dir") {
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Recipe install path is not a directory: ${installDir}`,
        });
      }

      const hadExisting = Boolean(installKind);
      const existingRunsDir = path.join(installDir, RECIPE_RUNS_DIR_NAME);
      const preservedRunsDir = path.join(tempRoot, RECIPE_RUNS_DIR_NAME);
      if (installKind) {
        if ((await getPathKind(existingRunsDir)) === "dir") {
          await cp(existingRunsDir, preservedRunsDir, { recursive: true });
        }
        await rm(installDir, { recursive: true, force: true });
      }
      await mkdir(resolveProjectRecipesDir(project), { recursive: true });
      await moveRecipeDir({ from: recipeRoot, to: installDir });

      try {
        if ((await getPathKind(preservedRunsDir)) === "dir") {
          await cp(preservedRunsDir, path.join(installDir, RECIPE_RUNS_DIR_NAME), {
            recursive: true,
          });
        }
        await writeRecipeInstallMetadata(
          resolveProjectRecipeInstallMetaPath(project, manifestWithTags.id),
          {
            schema_version: 1,
            id: manifestWithTags.id,
            version: manifestWithTags.version,
            source: sourceLabel,
            installed_at: new Date().toISOString(),
            tags: resolvedTags,
            install_mode: "project-local",
          },
        );
      } catch (err) {
        if (!hadExisting) {
          await rm(installDir, { recursive: true, force: true });
        }
        throw err;
      }

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
