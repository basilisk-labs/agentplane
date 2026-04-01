import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const recipesCacheSpec: CommandSpec<GroupCommandParsed> = {
  id: ["recipes", "cache"],
  group: "Recipes",
  summary: "Manage recipes cache.",
  synopsis: ["agentplane recipes cache <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runRecipesCache: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: recipesCacheSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["recipes", "cache"]),
    command: "recipes cache",
    missingMessage: "Missing recipes cache subcommand.",
    unknownMessage: (subcommand) => `Unknown recipes cache subcommand: ${subcommand}.`,
  });
};
