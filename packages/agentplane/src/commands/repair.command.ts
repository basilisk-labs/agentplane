import {
  loadDirectSubcommandNames,
  parseGroupCommand,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandHandler, CommandSpec } from "../cli/spec/spec.js";

export const repairSpec: CommandSpec<GroupCommandParsed> = {
  id: ["repair"],
  group: "Maintenance",
  summary: "Run explicit compatibility and recovery operations.",
  synopsis: ["agentplane repair <adopt-legacy-conflict> [args] [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane repair adopt-legacy-conflict <task-id> --expect-adoption-token <sha256:...>",
      why: "Record a verified legacy protected-conflict recovery receipt.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export type RepairAdoptLegacyConflictParsed = {
  taskId: string;
  expectedAdoptionToken: string;
};

export const repairAdoptLegacyConflictSpec: CommandSpec<RepairAdoptLegacyConflictParsed> = {
  id: ["repair", "adopt-legacy-conflict"],
  group: "Maintenance",
  summary: "Record a verified legacy protected-PR conflict recovery receipt.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "expect-adoption-token",
      valueHint: "<sha256:...>",
      description: "Exact token from task next-action or pr conflict-rework.",
    },
  ],
  examples: [
    {
      cmd: "agentplane repair adopt-legacy-conflict <task-id> --expect-adoption-token <sha256:...>",
      why: "Adopt only the exact legacy recovery context emitted by the route oracle.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    expectedAdoptionToken:
      typeof raw.opts["expect-adoption-token"] === "string"
        ? raw.opts["expect-adoption-token"].trim()
        : "",
  }),
  validateRaw: (raw) => {
    const token =
      typeof raw.opts["expect-adoption-token"] === "string"
        ? raw.opts["expect-adoption-token"].trim()
        : "";
    if (!token) {
      throw usageError({
        spec: repairAdoptLegacyConflictSpec,
        message: "Missing required --expect-adoption-token.",
      });
    }
    if (!/^sha256:[a-f0-9]{64}$/.test(token)) {
      throw usageError({
        spec: repairAdoptLegacyConflictSpec,
        message: "Invalid --expect-adoption-token: expected sha256:<64 lowercase hex characters>.",
      });
    }
  },
};

export const runRepair: CommandHandler<GroupCommandParsed> = async (_ctx, parsed) => {
  throwGroupCommandUsage({
    spec: repairSpec,
    cmd: parsed.cmd,
    subcommands: await loadDirectSubcommandNames(["repair"]),
    command: "repair",
  });
};
