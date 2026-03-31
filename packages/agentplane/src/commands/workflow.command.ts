import type { CommandCtx, CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";

export const workflowSpec: CommandSpec<GroupCommandParsed> = {
  id: ["workflow"],
  group: "Workflow",
  summary: "Workflow contract commands.",
  synopsis: ["agentplane workflow <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runWorkflow: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: workflowSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["workflow"]),
    command: "workflow",
    missingMessage: "Missing workflow subcommand.",
    unknownMessage: (subcommand) => `Unknown workflow subcommand: ${subcommand}.`,
  });
};
