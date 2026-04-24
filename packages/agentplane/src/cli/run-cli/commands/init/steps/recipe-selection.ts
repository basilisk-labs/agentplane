import type { InitFlags, SetupProfilePreset } from "../model.js";
import { setupProfilePresets } from "../presets.js";

import { parseCommaSeparatedSelection, textStepValue } from "./prompt-utils.js";
import type {
  InitSetupProfileMode,
  InitPromptClack,
  RecipeSelectionStepAnswers,
} from "./contracts.js";

type InitRecipeSelectionItem = {
  id: string;
  label?: string;
};

function normalizeCachedRecipeIds(
  cachedRecipes: readonly (InitRecipeSelectionItem | string)[],
): string[] {
  return cachedRecipes.map((recipe) => (typeof recipe === "string" ? recipe : recipe.id));
}

export async function promptRecipeSelectionStep(opts: {
  clack: InitPromptClack;
  flags: Pick<InitFlags, "recipes">;
  setupProfilePreset: SetupProfilePreset;
  setupProfileMode: InitSetupProfileMode;
  cachedRecipes: readonly (InitRecipeSelectionItem | string)[];
}): Promise<RecipeSelectionStepAnswers> {
  if (opts.flags.recipes) {
    return { recipes: [...opts.flags.recipes] };
  }

  const presetRecipes = setupProfilePresets[opts.setupProfilePreset].defaultRecipes;
  if (opts.setupProfileMode !== "full") {
    return { recipes: [...presetRecipes] };
  }

  const cachedRecipeIds = normalizeCachedRecipeIds(opts.cachedRecipes);
  if (cachedRecipeIds.length === 0) {
    return { recipes: [] };
  }

  const defaultValue = presetRecipes.length > 0 ? presetRecipes.join(", ") : "none";
  const answer = await textStepValue(opts.clack, {
    message: "Materialize cached recipes",
    defaultValue,
    placeholder: cachedRecipeIds.join(", "),
    validate: (value) => {
      const selected = parseCommaSeparatedSelection(value, presetRecipes);
      const available = new Set(cachedRecipeIds);
      const missing = selected.filter((recipe) => !available.has(recipe));
      if (missing.length > 0) {
        return `Unknown cached recipe: ${missing.join(", ")}`;
      }
      return;
    },
    cancelMessage: "Recipe selection cancelled.",
  });

  return { recipes: parseCommaSeparatedSelection(answer, presetRecipes) };
}
