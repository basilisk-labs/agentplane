import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeExplainActiveParsed } from "./impl/commands/explain-active.js";

export type RecipesExplainActiveParsed = Record<string, never>;

export const recipesExplainActiveSpec: CommandSpec<RecipesExplainActiveParsed> = {
  id: ["recipes", "explain-active"],
  group: "Recipes",
  summary: "Print the compiled active overlay bundle.",
  examples: [
    { cmd: "agentplane recipes explain-active", why: "Inspect compiled overlay runtime data." },
  ],
  parse: () => ({}),
};

export const runRecipesExplainActive: CommandHandler<RecipesExplainActiveParsed> = (ctx) =>
  cmdRecipeExplainActiveParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
