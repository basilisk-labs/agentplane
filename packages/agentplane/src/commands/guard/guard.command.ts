import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const guardSpec: CommandSpec<GroupCommandParsed> = {
  id: ["guard"],
  group: "Guard",
  summary: "Guard commands (commit checks, git hygiene, and allowlist helpers).",
  synopsis: ["agentplane guard <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runGuard: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: guardSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["guard"]),
  });
};
