import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";

type RecipesParsed = Record<string, never>;

const RECIPES_SUBCOMMANDS = [
  "list",
  "list-remote",
  "info",
  "explain",
  "install",
  "remove",
  "cache",
] as const;

export const recipesSpec: CommandSpec<RecipesParsed> = {
  id: ["recipes"],
  group: "Recipes",
  summary: "Recipe management commands.",
  synopsis: ["agentplane recipes <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: () => ({}),
  validateRaw: (raw) => {
    const rest = Array.isArray(raw.args.subcommand) ? raw.args.subcommand : [];
    const sub = rest[0];
    if (!sub) {
      throw usageError({
        spec: recipesSpec,
        command: "recipes",
        message: "Missing recipes subcommand.",
      });
    }
    const suggestion = suggestOne(String(sub), [...RECIPES_SUBCOMMANDS]);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: recipesSpec,
      command: "recipes",
      message: `Unknown recipes subcommand: ${String(sub)}.${suffix}`,
    });
  },
};

export const runRecipes: CommandHandler<RecipesParsed> = (_ctx: CommandCtx): Promise<number> => {
  // Should be unreachable because validateRaw always throws.
  throw usageError({
    spec: recipesSpec,
    command: "recipes",
    message: "Missing recipes subcommand.",
  });
};
