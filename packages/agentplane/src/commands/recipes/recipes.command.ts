import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { recipesCacheSpec } from "./cache.command.js";
import { recipesExplainSpec } from "./explain.command.js";
import { recipesInfoSpec } from "./info.command.js";
import { recipesInstallSpec } from "./install.spec.js";
import { recipesListSpec } from "./list.command.js";
import { recipesListRemoteSpec } from "./list-remote.command.js";
import { recipesRemoveSpec } from "./remove.command.js";

const RECIPES_CHILD_SPECS = [
  recipesListSpec,
  recipesListRemoteSpec,
  recipesInfoSpec,
  recipesExplainSpec,
  recipesInstallSpec,
  recipesRemoveSpec,
  recipesCacheSpec,
] as const;

export const recipesSpec: CommandSpec<GroupCommandParsed> = {
  id: ["recipes"],
  group: "Recipes",
  summary: "Recipe management commands.",
  synopsis: ["agentplane recipes <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runRecipes: CommandHandler<GroupCommandParsed> = (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: recipesSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["recipes"], RECIPES_CHILD_SPECS),
    command: "recipes",
    missingMessage: "Missing recipes subcommand.",
    unknownMessage: (subcommand) => `Unknown recipes subcommand: ${subcommand}.`,
  });
};
