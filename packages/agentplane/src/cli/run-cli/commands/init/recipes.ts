import { execFile } from "node:child_process";
import { promisify } from "node:util";

import { cmdRecipeAddParsed } from "../../../../commands/recipes/impl/commands/add.js";
import { readAndMigrateInstalledRecipesFile } from "../../../../commands/recipes/impl/installed-recipes.js";
import { resolveInstalledRecipesPath } from "../../../../commands/recipes/impl/paths.js";
import { CliError } from "../../../../shared/errors.js";

const execFileAsync = promisify(execFile);

type CachedRecipeInfo = {
  id: string;
  summary: string;
  version: string;
};

export async function listCachedRecipes(): Promise<CachedRecipeInfo[]> {
  const cached = await readAndMigrateInstalledRecipesFile(resolveInstalledRecipesPath(), {
    dropInvalidEntries: true,
  });
  return cached.recipes.map((recipe) => ({
    id: recipe.id,
    summary: recipe.manifest.summary,
    version: recipe.version,
  }));
}

function renderCachedRecipesHint(recipes: CachedRecipeInfo[]): string {
  if (recipes.length === 0) {
    return "Cached recipes: none. Use `agentplane recipes install <id>` before selecting recipes during init.";
  }
  return `Cached recipes: ${recipes.map((entry) => entry.id).join(", ")}`;
}

async function gitStatusPaths(cwd: string): Promise<string[]> {
  const { stdout } = await execFileAsync(
    "git",
    ["status", "--porcelain", "--untracked-files=all"],
    {
      cwd,
    },
  );
  return stdout
    .split(/\r?\n/u)
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
}

export async function validateCachedRecipesSelection(recipes: string[]): Promise<void> {
  if (recipes.length === 0) return;
  const cached = await listCachedRecipes();
  const available = new Set(cached.map((entry) => entry.id));
  const missing = recipes.filter((recipe) => !available.has(recipe));
  if (missing.length === 0) return;
  throw new CliError({
    exitCode: 2,
    code: "E_USAGE",
    message: `Unknown cached recipe id(s): ${missing.join(", ")}. ${renderCachedRecipesHint(cached)}`,
  });
}

export async function maybeAddCachedRecipes(opts: {
  recipes: string[];
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  if (opts.recipes.length === 0) return [];

  const before = new Set(await gitStatusPaths(opts.rootOverride ?? opts.cwd));

  for (const recipeId of opts.recipes) {
    await cmdRecipeAddParsed({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      recipeRef: recipeId,
      activate: true,
    });
  }

  const after = await gitStatusPaths(opts.rootOverride ?? opts.cwd);
  return after.filter((entry) => !before.has(entry));
}
