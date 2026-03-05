import type { CommandCtx, CommandHandler, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import { suggestOne } from "../cli/spec/suggest.js";

type WorkflowParsed = Record<string, never>;

const WORKFLOW_SUBCOMMANDS = ["build", "restore"] as const;

export const workflowSpec: CommandSpec<WorkflowParsed> = {
  id: ["workflow"],
  group: "Workflow",
  summary: "Workflow contract commands.",
  synopsis: ["agentplane workflow <subcommand> [options]"],
  args: [{ name: "subcommand", required: false, variadic: true, valueHint: "<subcommand>" }],
  parse: () => ({}),
  validateRaw: (raw) => {
    const rest = Array.isArray(raw.args.subcommand) ? raw.args.subcommand : [];
    const sub = rest[0];
    if (!sub) {
      throw usageError({
        spec: workflowSpec,
        command: "workflow",
        message: "Missing workflow subcommand.",
      });
    }
    const suggestion = suggestOne(String(sub), [...WORKFLOW_SUBCOMMANDS]);
    const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
    throw usageError({
      spec: workflowSpec,
      command: "workflow",
      message: `Unknown workflow subcommand: ${String(sub)}.${suffix}`,
    });
  },
};

export const runWorkflow: CommandHandler<WorkflowParsed> = (_ctx: CommandCtx): Promise<number> => {
  throw usageError({
    spec: workflowSpec,
    command: "workflow",
    message: "Missing workflow subcommand.",
  });
};
