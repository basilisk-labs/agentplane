import type { CommandCtx, CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import {
  directSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import { workflowBuildSpec } from "./workflow-build.command.js";
import {
  workflowDebugSpec,
  workflowLandSpec,
  workflowSyncSpec,
} from "./workflow-playbook.command.js";
import { workflowRestoreSpec } from "./workflow-restore.command.js";

const WORKFLOW_CHILD_SPECS = [
  workflowBuildSpec,
  workflowRestoreSpec,
  workflowDebugSpec,
  workflowSyncSpec,
  workflowLandSpec,
] as const;

export const workflowSpec: CommandSpec<GroupCommandParsed> = {
  id: ["workflow"],
  group: "Workflow",
  summary: "Workflow contract commands.",
  synopsis: ["agentplane workflow <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: (raw) => parseGroupCommand(raw, "subcommand"),
};

export const runWorkflow: CommandHandler<GroupCommandParsed> = (_ctx: CommandCtx, p) => {
  throwGroupCommandUsage({
    spec: workflowSpec,
    cmd: p.cmd,
    subcommands: directSubcommandNames(["workflow"], WORKFLOW_CHILD_SPECS),
    command: "workflow",
    missingMessage: "Missing workflow subcommand.",
    unknownMessage: (subcommand) => `Unknown workflow subcommand: ${subcommand}.`,
  });
};
