import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";

import { cmdRecipeAddParsed } from "../recipes.js";

export type RecipesAddParsed = {
  recipeRef: string;
  mode?: "copy" | "link";
};

export const recipesAddSpec: CommandSpec<RecipesAddParsed> = {
  id: ["recipes", "add"],
  group: "Recipes",
  summary: "Vendor a cached recipe into the current project.",
  args: [{ name: "recipe", required: true, valueHint: "<id|id@version>" }],
  options: [
    {
      kind: "string",
      name: "mode",
      valueHint: "<copy|link>",
      choices: ["copy", "link"],
      description: "Materialization mode for the project-local package.",
    },
  ],
  examples: [
    { cmd: "agentplane recipes add tdd", why: "Vendor the latest cached recipe into the project." },
    {
      cmd: "agentplane recipes add tdd@1.2.0 --mode link",
      why: "Link a cached recipe into the project for local recipe development.",
    },
  ],
  parse: (raw) => ({
    recipeRef: String(raw.args.recipe ?? "").trim(),
    mode: raw.opts.mode === "copy" || raw.opts.mode === "link" ? raw.opts.mode : undefined,
  }),
};

export const runRecipesAdd: CommandHandler<RecipesAddParsed> = (ctx, parsed) =>
  cmdRecipeAddParsed({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    recipeRef: parsed.recipeRef,
    mode: parsed.mode,
  });
