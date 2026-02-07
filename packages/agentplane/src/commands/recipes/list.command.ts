import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";
import { cmdRecipeListParsed, type RecipeListFlags } from "../recipes.js";

export type RecipesListParsed = RecipeListFlags;

export const recipesListSpec: CommandSpec<RecipesListParsed> = {
  id: ["recipes", "list"],
  group: "Recipes",
  summary: "List installed recipes.",
  options: [
    { kind: "boolean", name: "full", default: false, description: "Print full JSON payload." },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      description: "Filter installed recipes by tag.",
    },
  ],
  examples: [
    { cmd: "agentplane recipes list", why: "List installed recipes." },
    { cmd: "agentplane recipes list --tag cli", why: "List installed recipes with a tag." },
    { cmd: "agentplane recipes list --full", why: "Print full JSON payload." },
  ],
  parse: (raw) => ({
    full: raw.opts.full === true,
    tag: (() => {
      const rawTag = raw.opts.tag as string | undefined;
      if (rawTag === undefined) return;
      const trimmed = rawTag.trim();
      if (!trimmed) {
        throw usageError({
          spec: recipesListSpec,
          command: "recipes list",
          message: "Option --tag must not be empty.",
        });
      }
      return trimmed;
    })(),
  }),
};

export const runRecipesList: CommandHandler<RecipesListParsed> = (ctx, flags) =>
  cmdRecipeListParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });
