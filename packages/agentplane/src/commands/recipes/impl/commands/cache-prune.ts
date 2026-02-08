import { readdir, rm } from "node:fs/promises";
import path from "node:path";

import { mapCoreError } from "../../../../cli/error-map.js";
import { fileExists } from "../../../../cli/fs-utils.js";
import { infoMessage, successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readInstalledRecipesFile, writeInstalledRecipesFile } from "../installed-recipes.js";
import { resolveGlobalRecipesDir, resolveInstalledRecipesPath } from "../paths.js";
import type { RecipeCachePruneFlags } from "../types.js";

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
