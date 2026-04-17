import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const scenarioSpec: CommandSpec<GroupCommandParsed> = {
  id: ["recipes", "scenario"],
  group: "Recipes",
  summary: "Recipe scenario commands.",
  synopsis: ["agentplane recipes scenario <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runScenario: CommandHandler<GroupCommandParsed> = async (
  _ctx: CommandCtx,
  p,
): Promise<number> => {
  throwGroupCommandUsage({
    spec: scenarioSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["recipes", "scenario"]),
    command: "recipes scenario",
    missingMessage: "Missing recipes scenario subcommand.",
    unknownMessage: (subcommand) => `Unknown recipes scenario subcommand: ${subcommand}.`,
  });
};
