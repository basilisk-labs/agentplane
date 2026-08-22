import path from "node:path";

import type { CommandContext } from "../../commands/shared/task-backend.js";
import { assembleRunnerRecipeContext } from "../context/recipe-context.js";
import type { RunnerRecipeContext } from "../types.js";

export async function resolveTaskRunnerRecipe(opts: {
  command: CommandContext;
  recipe?: RunnerRecipeContext;
}): Promise<RunnerRecipeContext | undefined> {
  const recipeDirectory = opts.recipe?.recipe_dir;
  const recipeDirectoryRelative = recipeDirectory
    ? path.relative(opts.command.resolvedProject.gitRoot, path.resolve(recipeDirectory))
    : null;
  const isOutsideRepository =
    recipeDirectoryRelative !== null &&
    (recipeDirectoryRelative === ".." ||
      recipeDirectoryRelative.startsWith(`..${path.sep}`) ||
      path.isAbsolute(recipeDirectoryRelative));
  if (!opts.recipe || !isOutsideRepository) return opts.recipe;
  const assembled = await assembleRunnerRecipeContext({
    project: opts.command.resolvedProject,
    recipe_id: opts.recipe.recipe_id,
    scenario_id: opts.recipe.scenario_id,
  });
  return assembled.recipe;
}
