import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";

type RecipesCacheParsed = Record<string, never>;

const RECIPES_CACHE_SUBCOMMANDS = ["prune"] as const;

export const recipesCacheSpec: CommandSpec<RecipesCacheParsed> = {
  id: ["recipes", "cache"],
  group: "Recipes",
  summary: "Manage recipes cache.",
  synopsis: ["agentplane recipes cache <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: () => ({}),
  validateRaw: (raw) => {
    const rest = Array.isArray(raw.args.subcommand) ? raw.args.subcommand : [];
    const sub = rest[0];
    if (!sub) {
      throw usageError({
        spec: recipesCacheSpec,
        command: "recipes cache",
        message: "Missing recipes cache subcommand.",
      });
    }
    const suggestion = suggestOne(String(sub), [...RECIPES_CACHE_SUBCOMMANDS]);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: recipesCacheSpec,
      command: "recipes cache",
      message: `Unknown recipes cache subcommand: ${String(sub)}.${suffix}`,
    });
  },
};

export const runRecipesCache: CommandHandler<RecipesCacheParsed> = (
  _ctx: CommandCtx,
): Promise<number> => {
  // Should be unreachable because validateRaw always throws.
  throw usageError({
    spec: recipesCacheSpec,
    command: "recipes cache",
    message: "Missing recipes cache subcommand.",
  });
};
