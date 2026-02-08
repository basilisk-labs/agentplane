import type { CommandHandler, CommandSpec } from "../../cli2/spec.js";
import { cmdRecipeCachePruneParsed, type RecipeCachePruneFlags } from "../recipes.js";

export type RecipesCachePruneParsed = RecipeCachePruneFlags;

export const recipesCachePruneSpec: CommandSpec<RecipesCachePruneParsed> = {
  id: ["recipes", "cache", "prune"],
  group: "Recipes",
  summary: "Prune global recipe cache entries.",
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Report removals without modifying files.",
    },
    {
      kind: "boolean",
      name: "all",
      default: false,
      description: "Remove all cached recipes (also clears installed recipes file).",
    },
  ],
  examples: [
    { cmd: "agentplane recipes cache prune --dry-run", why: "Preview removals." },
    { cmd: "agentplane recipes cache prune", why: "Prune unused cached recipes." },
    { cmd: "agentplane recipes cache prune --all", why: "Remove everything." },
  ],
  parse: (raw) => ({
    dryRun: raw.opts["dry-run"] === true,
    all: raw.opts.all === true,
  }),
};

export const runRecipesCachePrune: CommandHandler<RecipesCachePruneParsed> = (ctx, flags) =>
  cmdRecipeCachePruneParsed({ cwd: ctx.cwd, rootOverride: ctx.rootOverride, flags });
