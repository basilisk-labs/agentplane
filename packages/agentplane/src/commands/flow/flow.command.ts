import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const flowSpec: CommandSpec<GroupCommandParsed> = {
  id: ["flow"],
  group: "Workflow",
  summary: "Inspect and repair high-level task workflow routes.",
  synopsis: ["agentplane flow <repair> <task-id> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane flow repair 202602030608-F1Q8AB --dry-run",
      why: "Print a safe repair plan without mutating task or PR state.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const runFlow: CommandHandler<GroupCommandParsed> = async (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: flowSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["flow"]),
    command: "flow",
  });
};
