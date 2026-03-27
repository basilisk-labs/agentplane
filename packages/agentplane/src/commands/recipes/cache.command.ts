import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { recipesCachePruneSpec } from "./cache-prune.command.js";

const RECIPES_CACHE_CHILD_SPECS = [recipesCachePruneSpec] as const;

export const recipesCacheSpec: CommandSpec<GroupCommandParsed> = {
  id: ["recipes", "cache"],
  group: "Recipes",
  summary: "Manage recipes cache.",
  synopsis: ["agentplane recipes cache <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runRecipesCache: CommandHandler<GroupCommandParsed> = (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: recipesCacheSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["recipes", "cache"], RECIPES_CACHE_CHILD_SPECS),
    command: "recipes cache",
    missingMessage: "Missing recipes cache subcommand.",
    unknownMessage: (subcommand) => `Unknown recipes cache subcommand: ${subcommand}.`,
  });
};
