import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { cmdRecipeInfoParsed } from "../recipes.js";

export type RecipesInfoParsed = { id: string };

export const recipesInfoSpec: CommandSpec<RecipesInfoParsed> = {
  id: ["recipes", "info"],
  group: "Recipes",
  summary: "Show installed recipe metadata.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  examples: [{ cmd: "agentplane recipes info viewer", why: "Show recipe metadata." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "") }),
};

export const runRecipesInfo: CommandHandler<RecipesInfoParsed> = (ctx, p) =>
  cmdRecipeInfoParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: p.id });
