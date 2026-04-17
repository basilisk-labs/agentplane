import { cp, mkdir, rm, symlink } from "node:fs/promises";

import { normalizeRecipeTags } from "@agentplaneorg/recipes";
import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { runVendoredRecipeMutation } from "../mutation-transaction.js";
import { publishProjectRecipesState } from "../overlay-project.js";
import { readInstalledRecipesFile } from "../installed-recipes.js";
import { hashRecipeTree } from "../project-recipe-state.js";
import {
  readProjectRecipesRegistry,
  replaceProjectRecipeRegistryEntry,
} from "../project-registry.js";
import { pickLatestRecipeVersion } from "../version.js";
import {
  resolveInstalledRecipeDir,
  resolveInstalledRecipesPath,
  resolveProjectRecipesPackagesDir,
  resolveProjectVendoredRecipeDir,
} from "../paths.js";

function parseRecipeRef(raw: string): { id: string; version?: string } {
  const value = raw.trim();
  if (!value) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "Recipe id must not be empty",
    });
  }
  const atIndex = value.lastIndexOf("@");
  if (atIndex <= 0) return { id: value };
  return { id: value.slice(0, atIndex), version: value.slice(atIndex + 1) || undefined };
}

export async function cmdRecipeAddParsed(opts: {
  cwd: string;
  rootOverride?: string;
  recipeRef: string;
  mode?: "copy" | "link";
  activate?: boolean;
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(project.agentplaneDir);
    const requested = parseRecipeRef(opts.recipeRef);
    const cache = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const cachedEntries = cache.recipes.filter((entry) => entry.id === requested.id);
    const cached = requested.version
      ? cachedEntries.find((entry) => entry.version === requested.version)
      : pickLatestRecipeVersion(cachedEntries);
    if (!cached) {
      throw new CliError({
        exitCode: exitCodeForError("E_IO"),
        code: "E_IO",
        message: requested.version
          ? `Recipe not found in global cache: ${requested.id}@${requested.version}. Run agentplane recipes install ${requested.id}@${requested.version}`
          : `Recipe not found in global cache: ${requested.id}. Run agentplane recipes install ${requested.id}`,
      });
    }

    const materialization =
      opts.mode ?? (loaded.config.recipes?.storage_default === "link" ? "link" : "copy");
    const sourceDir = resolveInstalledRecipeDir({ id: cached.id, version: cached.version });
    const targetDir = resolveProjectVendoredRecipeDir(project, cached.id);
    const registry = await readProjectRecipesRegistry(project);
    const existing = registry.recipes.find((entry) => entry.id === cached.id);
    if (existing) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message:
          existing.version === cached.version
            ? `Recipe already vendored: ${cached.id}@${cached.version}. Use agentplane recipes update ${cached.id} to resync it from cache.`
            : `Recipe already vendored: ${cached.id}@${existing.version}. Remove it first or use a dedicated update flow instead of overwriting it with recipes add.`,
      });
    }

    const installedAt = new Date().toISOString();
    const tags = normalizeRecipeTags(cached.tags ?? cached.manifest.tags ?? []);
    const sourceSha256 = await hashRecipeTree(sourceDir);
    await mkdir(resolveProjectRecipesPackagesDir(project), { recursive: true });
    await runVendoredRecipeMutation({
      targetDir,
      mode: "create",
      materialize: async (nextTargetDir) => {
        await rm(nextTargetDir, { recursive: true, force: true });
        await (materialization === "link"
          ? symlink(sourceDir, nextTargetDir, "dir")
          : cp(sourceDir, nextTargetDir, { recursive: true }));
      },
      commit: async () => {
        const vendoredSha256 = await hashRecipeTree(targetDir);
        const nextRegistry = replaceProjectRecipeRegistryEntry(registry, {
          id: cached.id,
          version: cached.version,
          path: `packages/${cached.id}`,
          active: opts.activate === true,
          materialization,
          source_ref: `${cached.id}@${cached.version}`,
          source_sha256: sourceSha256,
          vendored_sha256: vendoredSha256,
          installed_at: installedAt,
          tags,
        });
        await publishProjectRecipesState({ project, registry: nextRegistry });
      },
    });
    process.stdout.write(
      `Vendored recipe ${cached.id}@${cached.version} into project (${materialization})\n`,
    );
    if (materialization === "link") {
      process.stdout.write(
        "Warning: link mode is not portable; use `agentplane recipes detach` before sharing the repo.\n",
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes add", root: opts.rootOverride ?? null });
  }
}
