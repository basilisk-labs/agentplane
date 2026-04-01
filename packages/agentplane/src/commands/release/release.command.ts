import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const releaseSpec: CommandSpec<GroupCommandParsed> = {
  id: ["release"],
  group: "Release",
  summary: "Prepare a release (agent-assisted notes + version bump workflow).",
  synopsis: ["agentplane release <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runRelease: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: releaseSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["release"]),
  });
};
