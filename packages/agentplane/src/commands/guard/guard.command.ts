import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { guardCleanSpec } from "./clean.command.js";
import { guardCommitSpec } from "./commit.command.js";
import { guardSuggestAllowSpec } from "./suggest-allow.command.js";

const GUARD_CHILD_SPECS = [guardCommitSpec, guardCleanSpec, guardSuggestAllowSpec] as const;

export const guardSpec: CommandSpec<GroupCommandParsed> = {
  id: ["guard"],
  group: "Guard",
  summary: "Guard commands (commit checks, git hygiene, and allowlist helpers).",
  synopsis: ["agentplane guard <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runGuard: CommandHandler<GroupCommandParsed> = (_ctx, p) => {
  throwGroupCommandUsage({
    spec: guardSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["guard"], GUARD_CHILD_SPECS),
  });
};
