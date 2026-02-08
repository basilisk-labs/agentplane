import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { cmdRecipeRemoveParsed } from "../recipes.js";

export type RecipesRemoveParsed = { id: string };

export const recipesRemoveSpec: CommandSpec<RecipesRemoveParsed> = {
  id: ["recipes", "remove"],
  group: "Recipes",
  summary: "Remove an installed recipe.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  examples: [{ cmd: "agentplane recipes remove viewer", why: "Remove a recipe by id." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "") }),
};

export const runRecipesRemove: CommandHandler<RecipesRemoveParsed> = (ctx, p) =>
  cmdRecipeRemoveParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: p.id });
