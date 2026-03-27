import type { CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../../cli/group-command.js";
import { hooksInstallSpec } from "./install.command.js";
import { hooksRunSpec } from "./run.command.js";
import { hooksUninstallSpec } from "./uninstall.command.js";

const HOOKS_CHILD_SPECS = [hooksInstallSpec, hooksRunSpec, hooksUninstallSpec] as const;

export const hooksSpec: CommandSpec<GroupCommandParsed> = {
  id: ["hooks"],
  group: "Hooks",
  summary: "Manage and run git hooks installed by agentplane.",
  synopsis: ["agentplane hooks <command> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<command>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const runHooks: CommandHandler<GroupCommandParsed> = (_ctx, p) => {
  throwGroupCommandUsage({
    spec: hooksSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["hooks"], HOOKS_CHILD_SPECS),
  });
};
