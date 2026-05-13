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
  summary: "Route incident advice candidates through CURATOR-bounded matching and promotion gates.",
  synopsis: ["agentplane incidents <collect|advise> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  notes: [
    "Use `incidents collect` to promote resolved reusable external findings into `.agentplane/policy/incidents.md` after deterministic validation.",
    "Use `incidents advise` to query registry advice by task id or lightweight scope/tags; the score is a candidate scaffold for CURATOR-style judgment, not semantic truth.",
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
