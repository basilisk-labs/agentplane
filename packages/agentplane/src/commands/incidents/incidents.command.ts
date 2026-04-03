import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";

export const incidentsSpec: CommandSpec<GroupCommandParsed> = {
  id: ["incidents"],
  group: "Policy",
  summary: "Promote external incident advice and resolve incident hints for analogous tasks.",
  synopsis: ["agentplane incidents <collect|advise> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  notes: [
    "Use `incidents collect` to promote structured incident-candidate findings into `.agentplane/policy/incidents.md`.",
    "Use `incidents advise` to query registry advice by task id or lightweight scope/tags.",
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const runIncidents: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: incidentsSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["incidents"]),
    command: "incidents",
  });
};
