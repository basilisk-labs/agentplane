import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { releaseApplySpec } from "./apply.command.js";
import { releasePlanSpec } from "./plan.command.js";

const RELEASE_CHILD_SPECS = [releaseApplySpec, releasePlanSpec] as const;

export const releaseSpec: CommandSpec<GroupCommandParsed> = {
  id: ["release"],
  group: "Release",
  summary: "Prepare a release (agent-assisted notes + version bump workflow).",
  synopsis: ["agentplane release <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runRelease: CommandHandler<GroupCommandParsed> = (_ctx, p) => {
  throwGroupCommandUsage({
    spec: releaseSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["release"], RELEASE_CHILD_SPECS),
  });
};
