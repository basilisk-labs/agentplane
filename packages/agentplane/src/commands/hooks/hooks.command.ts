import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const hooksSpec: CommandSpec<GroupCommandParsed> = {
  id: ["hooks"],
  group: "Hooks",
  summary: "Manage and run git hooks installed by agentplane.",
  synopsis: ["agentplane hooks <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runHooks: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: hooksSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["hooks"]),
  });
};
