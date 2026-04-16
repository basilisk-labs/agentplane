import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeDisableParsed } from "../recipes.js";

export type RecipesDisableParsed = { id: string };

export const recipesDisableSpec: CommandSpec<RecipesDisableParsed> = {
  id: ["recipes", "disable"],
  group: "Recipes",
  summary: "Disable an active project overlay for the current project.",
  args: [{ name: "id", required: true, valueHint: "<recipe-id>" }],
  examples: [{ cmd: "agentplane recipes disable tdd", why: "Deactivate an overlay." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "").trim() }),
};

export const runRecipesDisable: CommandHandler<RecipesDisableParsed> = (ctx, parsed) =>
  cmdRecipeDisableParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: parsed.id });
