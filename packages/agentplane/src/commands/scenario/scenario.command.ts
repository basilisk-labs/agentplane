import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { scenarioExecuteSpec } from "./execute.command.js";
import { scenarioInfoSpec } from "./info.command.js";
import { scenarioListSpec } from "./list.command.js";
import { scenarioRunSpec } from "./run.command.js";

const SCENARIO_CHILD_SPECS = [
  scenarioListSpec,
  scenarioInfoSpec,
  scenarioRunSpec,
  scenarioExecuteSpec,
] as const;

export const scenarioSpec: CommandSpec<GroupCommandParsed> = {
  id: ["scenario"],
  group: "Scenario",
  summary: "Recipe scenario commands.",
  synopsis: ["agentplane scenario <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runScenario: CommandHandler<GroupCommandParsed> = (
  _ctx: CommandCtx,
  p,
): Promise<number> => {
  throwGroupCommandUsage({
    spec: scenarioSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["scenario"], SCENARIO_CHILD_SPECS),
    command: "scenario",
    missingMessage: "Missing scenario subcommand.",
    unknownMessage: (subcommand) => `Unknown scenario subcommand: ${subcommand}.`,
  });
};
