import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeActiveParsed } from "../recipes.js";

export type RecipesActiveParsed = { full: boolean };

export const recipesActiveSpec: CommandSpec<RecipesActiveParsed> = {
  id: ["recipes", "active"],
  group: "Recipes",
  summary: "List active project overlays.",
  options: [{ kind: "boolean", name: "full", default: false, description: "Print full JSON payload." }],
  examples: [{ cmd: "agentplane recipes active", why: "Show overlays active for the project." }],
  parse: (raw) => ({ full: raw.opts.full === true }),
};

export const runRecipesActive: CommandHandler<RecipesActiveParsed> = (ctx, parsed) =>
  cmdRecipeActiveParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, full: parsed.full });
