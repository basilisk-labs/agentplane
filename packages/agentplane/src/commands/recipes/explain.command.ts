import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { cmdRecipeExplainParsed } from "../recipes.js";

export type RecipesExplainParsed = { id: string };

export const recipesExplainSpec: CommandSpec<RecipesExplainParsed> = {
  id: ["recipes", "explain"],
  group: "Recipes",
  summary: "Show detailed info for an installed recipe.",
  args: [{ name: "id", required: true, valueHint: "<id>" }],
  examples: [{ cmd: "agentplane recipes explain viewer", why: "Show detailed recipe info." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "") }),
};

export const runRecipesExplain: CommandHandler<RecipesExplainParsed> = (ctx, p) =>
  cmdRecipeExplainParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: p.id });
