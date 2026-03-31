import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const recipesSpec: CommandSpec<GroupCommandParsed> = {
  id: ["recipes"],
  group: "Recipes",
  summary: "Recipe management commands.",
  synopsis: ["agentplane recipes <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runRecipes: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: recipesSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["recipes"]),
    command: "recipes",
    missingMessage: "Missing recipes subcommand.",
    unknownMessage: (subcommand) => `Unknown recipes subcommand: ${subcommand}.`,
  });
};
