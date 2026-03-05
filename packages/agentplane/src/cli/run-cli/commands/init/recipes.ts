import { cmdRecipeInstall } from "../../../../commands/recipes.js";
import { infoMessage, warnMessage } from "../../../output.js";
import { getBundledRecipeSourcePath, listBundledRecipes } from "../../../recipes-bundled.js";

export async function maybeInstallBundledRecipes(opts: {
  recipes: string[];
  cwd: string;
  rootOverride?: string;
}): Promise<void> {
  if (opts.recipes.length === 0) return;

  if (listBundledRecipes().length === 0) {
    process.stdout.write(`${infoMessage("bundled recipes are empty; nothing to install")}\n`);
    return;
  }

  for (const recipeId of opts.recipes) {
    const sourcePath = getBundledRecipeSourcePath(recipeId);
    if (!sourcePath) {
      process.stdout.write(
        `${warnMessage(`bundled recipe ${recipeId} has no local source path; skipping`)}\n`,
      );
      continue;
    }
    await cmdRecipeInstall({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      source: { type: "path", value: sourcePath },
      index: undefined,
      refresh: false,
      onConflict: "overwrite",
      yes: true,
    });
  }
}
