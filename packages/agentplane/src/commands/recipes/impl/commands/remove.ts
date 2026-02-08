import { rm } from "node:fs/promises";

import { mapCoreError } from "../../../../cli/error-map.js";
import { successMessage } from "../../../../cli/output.js";
import { CliError } from "../../../../shared/errors.js";

import { readInstalledRecipesFile, writeInstalledRecipesFile } from "../installed-recipes.js";
import { resolveInstalledRecipeDir, resolveInstalledRecipesPath } from "../paths.js";

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
