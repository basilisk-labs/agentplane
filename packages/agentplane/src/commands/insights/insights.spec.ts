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
  agentContext?: string;
  agentContextFile?: string;
  allowMissingAgentContext: boolean;
  failureCommand?: string;
  failurePhase?: string;
  failureReasonCode?: string;
  failureMessageClass?: string;
  failureArgvShape: string[];
  transport?: "github" | "cloud" | "auto";
  allowDisabledFeedback: boolean;
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
      why: "Create a privacy-bounded Agentplane GitHub issue after feedback opt-in.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export const insightsReportSpec: CommandSpec<InsightsReportParsed> = {
  id: ["insights", "report"],
  group: "Diagnostics",
  summary: "Print a local-only privacy-bounded Agentplane diagnostic report.",
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
  summary: "Create an opt-in GitHub issue with privacy-bounded Agentplane diagnostics.",
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<title>",
      description: "Issue title. Defaults to an internal Agentplane error report title.",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Optional short user-visible context to include before diagnostics.",
    },
    {
      kind: "string",
      name: "agent-context",
      valueHint: "<text>",
      description:
        "Sanitized agent-written diagnostic context to include in the public issue body.",
    },
    {
      kind: "string",
      name: "agent-context-file",
      valueHint: "<path>",
      description:
        "Read sanitized agent-written diagnostic context from a file before creating the issue.",
    },
    {
      kind: "boolean",
      name: "allow-missing-agent-context",
      default: false,
      description:
        "Allow creating an E_INTERNAL issue without the recommended agent-written context.",
    },
    {
      kind: "string",
      name: "error-code",
      valueHint: "<code>",
      description: "Agentplane error code that triggered the report.",
    },
    {
      kind: "string",
      name: "failure-command",
      valueHint: "<command>",
      description:
        "Privacy-safe command id associated with the failure, for example task start-ready.",
    },
    {
      kind: "string",
      name: "failure-phase",
      valueHint: "<phase>",
      description: "Privacy-safe lifecycle phase associated with the failure.",
    },
    {
      kind: "string",
      name: "failure-reason-code",
      valueHint: "<code>",
      description: "Privacy-safe reason code associated with the failure.",
    },
    {
      kind: "string",
      name: "failure-message-class",
      valueHint: "<class>",
      description: "Privacy-safe error message class, not the raw error message.",
    },
    {
      kind: "string",
      name: "failure-argv-shape",
      valueHint: "<token>",
      repeatable: true,
      description: "Repeatable sanitized argv shape token; values must not include raw secrets.",
    },
    {
      kind: "string",
      name: "transport",
      valueHint: "<github|cloud|auto>",
      choices: ["github", "cloud", "auto"],
      description:
        "Issue transport. github uses the user's gh auth, cloud uses anonymous Agentplane intake, auto falls back to cloud when GitHub publishing fails.",
    },
    {
      kind: "boolean",
      name: "allow-disabled-feedback",
      default: false,
      description:
        "Allow this one issue creation when feedback.github_issues.enabled=false without modifying project config.",
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
    {
      cmd: "agentplane insights issue --allow-disabled-feedback --error-code E_INTERNAL",
      why: "Create one issue from an explicitly opted-out project without changing config.",
    },
  ],
  parse: (raw) => ({
    title: raw.opts.title as string | undefined,
    body: raw.opts.body as string | undefined,
    agentContext: raw.opts["agent-context"] as string | undefined,
    agentContextFile: raw.opts["agent-context-file"] as string | undefined,
    allowMissingAgentContext: raw.opts["allow-missing-agent-context"] === true,
    errorCode: raw.opts["error-code"] as string | undefined,
    failureCommand: raw.opts["failure-command"] as string | undefined,
    failurePhase: raw.opts["failure-phase"] as string | undefined,
    failureReasonCode: raw.opts["failure-reason-code"] as string | undefined,
    failureMessageClass: raw.opts["failure-message-class"] as string | undefined,
    failureArgvShape: Array.isArray(raw.opts["failure-argv-shape"])
      ? (raw.opts["failure-argv-shape"] as string[])
      : [],
    transport: raw.opts.transport as InsightsIssueParsed["transport"],
    allowDisabledFeedback: raw.opts["allow-disabled-feedback"] === true,
    dryRun: raw.opts["dry-run"] === true,
  }),
};
