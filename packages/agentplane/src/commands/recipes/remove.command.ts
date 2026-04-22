import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { cmdRecipeRemoveParsed } from "./impl/commands/remove.js";

export type RecipesRemoveParsed = { id: string };

export const recipesRemoveSpec: CommandSpec<RecipesRemoveParsed> = {
  id: ["recipes", "remove"],
  group: "Recipes",
  summary: "Remove a vendored recipe from the current project.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  examples: [{ cmd: "agentplane recipes remove viewer", why: "Remove a vendored recipe by id." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "") }),
};

export const runRecipesRemove: CommandHandler<RecipesRemoveParsed> = (ctx, p) =>
  cmdRecipeRemoveParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: p.id });
