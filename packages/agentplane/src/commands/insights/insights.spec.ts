import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export type InsightsReportParsed = {
  json: boolean;
  recentLimit: number;
};

export const insightsSpec: CommandSpec<GroupCommandParsed> = {
  id: ["insights"],
  group: "Diagnostics",
  summary: "Generate local-only diagnostic insights for support analysis.",
  synopsis: ["agentplane insights <report> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    {
      cmd: "agentplane insights report",
      why: "Print a local diagnostic summary that can be shared manually.",
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
