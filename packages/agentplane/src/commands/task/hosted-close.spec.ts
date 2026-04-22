import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type TaskHostedCloseParsed = {
  eventJson: string;
  quiet: boolean;
};

export const taskHostedCloseSpec: CommandSpec<TaskHostedCloseParsed> = {
  id: ["task", "hosted-close"],
  group: "Task",
  summary: "Close a branch_pr task on the current branch from a merged hosted PR event payload.",
  options: [
    {
      kind: "string",
      name: "event-json",
      valueHint: "<path>",
      description: "Path to the GitHub pull_request closed event payload.",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  validateRaw: (raw) => {
    const value = raw.opts["event-json"];
    if (typeof value !== "string" || value.trim() === "") {
      throw usageError({
        spec: taskHostedCloseSpec,
        message: "Missing required option: --event-json.",
      });
    }
  },
  examples: [
    {
      cmd: 'agentplane task hosted-close --event-json "$GITHUB_EVENT_PATH"',
      why: "Apply the canonical branch_pr closure payload on an automation branch after a hosted PR merge.",
    },
  ],
  parse: (raw) => ({
    eventJson: String(raw.opts["event-json"]),
    quiet: raw.opts.quiet === true,
  }),
};
