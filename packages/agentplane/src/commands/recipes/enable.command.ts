import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeEnableParsed } from "./impl/commands/enable.js";

export type RecipesEnableParsed = { id: string };

export const recipesEnableSpec: CommandSpec<RecipesEnableParsed> = {
  id: ["recipes", "enable"],
  group: "Recipes",
  summary: "Enable an installed project overlay for the current project.",
  args: [{ name: "id", required: true, valueHint: "<recipe-id>" }],
  examples: [{ cmd: "agentplane recipes enable tdd", why: "Activate an installed overlay." }],
  parse: (raw) => ({ id: String(raw.args.id ?? "").trim() }),
};

export const runRecipesEnable: CommandHandler<RecipesEnableParsed> = (ctx, parsed) =>
  cmdRecipeEnableParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, id: parsed.id });
