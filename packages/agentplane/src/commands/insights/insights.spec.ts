import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type InsightsReportParsed = {
  json: boolean;
  recentLimit: number;
};

export type InsightsIssueParsed = {
  title?: string;
  body?: string;
  errorCode?: string;
  dryRun: boolean;
};

export const insightsSpec: CommandSpec<GroupCommandParsed> = {
  id: ["insights"],
  group: "Diagnostics",
  summary: "Generate local-only diagnostic insights for support analysis.",
  synopsis: ["agentplane insights <report|issue> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane insights report",
      why: "Print a local diagnostic summary that can be shared manually.",
    },
    {
      cmd: "agentplane insights issue --error-code E_INTERNAL",
      why: "Create a privacy-bounded AgentPlane GitHub issue after feedback opt-in.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const insightsReportSpec: CommandSpec<InsightsReportParsed> = {
  id: ["insights", "report"],
  group: "Diagnostics",
  summary: "Print a local-only privacy-bounded AgentPlane diagnostic report.",
  options: [
    {
      kind: "boolean",
      name: "json",
      default: false,
      description: "Emit the full report as machine-readable JSON.",
    },
    {
      kind: "string",
      name: "recent-limit",
      valueHint: "<n>",
      description: "Number of recent task ids to include (default: 8, max: 25).",
    },
  ],
  examples: [
    {
      cmd: "agentplane insights report",
      why: "Print a readable local diagnostic summary.",
    },
    {
      cmd: "agentplane insights report --json",
      why: "Print the full local diagnostic report for support tooling.",
    },
  ],
  parse: (raw) => {
    const rawLimit = raw.opts["recent-limit"];
    const parsedLimit =
      typeof rawLimit === "string" && rawLimit.trim() !== "" ? Number.parseInt(rawLimit, 10) : 8;
    const recentLimit = Number.isFinite(parsedLimit) ? Math.max(0, Math.min(25, parsedLimit)) : 8;
    return {
      json: raw.opts.json === true,
      recentLimit,
    };
  },
};

export const insightsIssueSpec: CommandSpec<InsightsIssueParsed> = {
  id: ["insights", "issue"],
  group: "Diagnostics",
  summary: "Create an opt-in GitHub issue with privacy-bounded AgentPlane diagnostics.",
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<title>",
      description: "Issue title. Defaults to an internal AgentPlane error report title.",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Optional short user-visible context to include before diagnostics.",
    },
    {
      kind: "string",
      name: "error-code",
      valueHint: "<code>",
      description: "AgentPlane error code that triggered the report.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Print the GitHub issue payload without creating an issue.",
    },
  ],
  examples: [
    {
      cmd: "agentplane insights issue --error-code E_INTERNAL",
      why: "Create a GitHub issue after feedback GitHub issues are enabled.",
    },
    {
      cmd: "agentplane insights issue --dry-run --error-code E_INTERNAL",
      why: "Preview the privacy-bounded issue payload without network access.",
    },
  ],
  parse: (raw) => ({
    title: raw.opts.title as string | undefined,
    body: raw.opts.body as string | undefined,
    errorCode: raw.opts["error-code"] as string | undefined,
    dryRun: raw.opts["dry-run"] === true,
  }),
};
