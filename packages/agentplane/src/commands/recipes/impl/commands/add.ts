import { cp, mkdir, rm, symlink } from "node:fs/promises";

import { loadConfig, resolveProject } from "@agentplaneorg/core";

import { mapCoreError } from "../../../../cli/error-map.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

import { refreshProjectOverlayArtifacts } from "../overlay-project.js";
import { readInstalledRecipesFile } from "../installed-recipes.js";
import { normalizeRecipeTags } from "../normalize.js";
import { writeRecipeInstallMetadata } from "../project-installed-recipes.js";
import {
  resolveInstalledRecipeDir,
  resolveInstalledRecipesPath,
  resolveProjectRecipeInstallMetaPath,
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
}): Promise<number> {
  try {
    const project = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(project.agentplaneDir);
    const requested = parseRecipeRef(opts.recipeRef);
    const cache = await readInstalledRecipesFile(resolveInstalledRecipesPath());
    const cachedEntries = cache.recipes
      .filter((entry) => entry.id === requested.id)
      .toSorted((left, right) => left.version.localeCompare(right.version));
    const cached = requested.version
      ? cachedEntries.find((entry) => entry.version === requested.version)
      : cachedEntries.at(-1);
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

    await mkdir(resolveProjectRecipesPackagesDir(project), { recursive: true });
    await rm(targetDir, { recursive: true, force: true });
    if (materialization === "link") {
      await symlink(sourceDir, targetDir, "dir");
    } else {
      await cp(sourceDir, targetDir, { recursive: true });
    }

    await writeRecipeInstallMetadata(resolveProjectRecipeInstallMetaPath(project, cached.id), {
      schema_version: 1,
      id: cached.id,
      version: cached.version,
      source: `${cached.id}@${cached.version}`,
      installed_at: new Date().toISOString(),
      tags: normalizeRecipeTags(cached.tags ?? cached.manifest.tags ?? []),
      install_mode: materialization === "link" ? "project-link" : "project-copy",
    });

    await refreshProjectOverlayArtifacts(project);
    process.stdout.write(
      `Vendored recipe ${cached.id}@${cached.version} into project (${materialization})\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "recipes add", root: opts.rootOverride ?? null });
  }
}
