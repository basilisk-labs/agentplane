import type { CommandSpec } from "../cli/spec/spec.js";

export type WorkflowPlaybookParsed = Record<string, never>;

export const workflowDebugSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "debug"],
  group: "Workflow",
  summary: "Run built-in debug checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow debug", why: "Collect debug readiness evidence." }],
};

export const workflowSyncSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "sync"],
  group: "Workflow",
  summary: "Run built-in sync checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow sync", why: "Collect sync-state evidence." }],
};

export const workflowLandSpec: CommandSpec<WorkflowPlaybookParsed> = {
  id: ["workflow", "land"],
  group: "Workflow",
  summary: "Run built-in pre-land checks and capture workflow evidence.",
  parse: () => ({}),
  examples: [{ cmd: "agentplane workflow land", why: "Collect land-readiness evidence." }],
};
