import type { CliReportEntry } from "../../cli/output.js";
import { renderQuickstart } from "../../cli/command-guide.js";

import type { InsightsReport } from "./insights-report.js";

export type InsightsTriagePreset = "startup-routing";

export type InsightsTriageFinding = {
  code: string;
  severity: "info" | "warning";
  confidence: "low" | "medium" | "high";
  summary: string;
  evidence: string[];
  impact: string;
  suggested_maintainer_checks: string[];
};

export type InsightsTriage = {
  schema: "agentplane.insights.triage.v1";
  generated_at: string;
  preset: InsightsTriagePreset;
  privacy: {
    local_only: true;
    network: "not_used";
    excludes: string[];
  };
  facts: {
    workflow_mode: string;
    quickstart_configured_route: string | null;
    quickstart_route_sections: string[];
    failure_error_code: string | null;
    failure_command: string | null;
    failure_reason_code: string | null;
    git_dirty: boolean;
    active_task_count: number;
    runner_status: Record<string, number>;
  };
  findings: InsightsTriageFinding[];
  agent_required: {
    field: "agent_context";
    instruction: string;
  };
};

function unique(values: string[]): string[] {
  return [...new Set(values)].toSorted();
}

function extractQuickstartRoutes(text: string): {
  configuredRoute: string | null;
  routeSections: string[];
} {
  const lines = text.split("\n");
  const headingIndex = lines.findIndex((line) => line.trim() === "Configured workflow route:");
  if (headingIndex === -1) return { configuredRoute: null, routeSections: [] };

  const routeLines = lines.slice(headingIndex + 1).filter((line) => line.trim().startsWith("- `"));
  const routePattern = /^- `([^`]+)`:/;
  const routes = routeLines.flatMap((line) => {
    const match = routePattern.exec(line.trim());
    return match?.[1] ? [match[1]] : [];
  });
  return {
    configuredRoute: routes[0] ?? null,
    routeSections: unique(routes),
  };
}

function buildStartupRoutingFinding(opts: {
  report: InsightsReport;
  configuredRoute: string | null;
  routeSections: string[];
}): InsightsTriageFinding {
  const workflowMode = opts.report.project.workflow_mode;
  if (opts.configuredRoute && opts.configuredRoute !== workflowMode) {
    return {
      code: "CONFIG_QUICKSTART_ROUTE_MISMATCH",
      severity: "warning",
      confidence: "high",
      summary:
        "Runtime config and quickstart configured-route guidance disagree for the startup workflow route.",
      evidence: [
        `runtime workflow_mode=${workflowMode}`,
        `quickstart configured_route=${opts.configuredRoute}`,
        `quickstart route_sections=${opts.routeSections.join(", ") || "none"}`,
      ],
      impact:
        "Agents can load the wrong workflow mental model before they call the task route oracle.",
      suggested_maintainer_checks: [
        "Confirm quickstart renders the configured route from the same loaded config source as config show.",
        "Add a direct-mode regression fixture for quickstart configured-route rendering.",
        "Keep alternative workflow guidance clearly marked as non-default when both routes are documented.",
      ],
    };
  }

  return {
    code: "NO_STARTUP_ROUTING_MISMATCH",
    severity: "info",
    confidence: opts.configuredRoute ? "high" : "medium",
    summary:
      "No configured-route mismatch was detected between runtime config and quickstart route guidance.",
    evidence: [
      `runtime workflow_mode=${workflowMode}`,
      `quickstart configured_route=${opts.configuredRoute ?? "unknown"}`,
      `quickstart route_sections=${opts.routeSections.join(", ") || "none"}`,
    ],
    impact:
      "Startup routing is unlikely to be the primary failure cause based on the available bounded facts.",
    suggested_maintainer_checks: [
      "Inspect the agent-written context for the concrete failure path.",
      "Use the failure command, reason code, and dedupe signature from the insights report for triage.",
    ],
  };
}

export function buildInsightsTriage(opts: {
  report: InsightsReport;
  preset: InsightsTriagePreset;
}): InsightsTriage {
  const quickstartRoutes = extractQuickstartRoutes(renderQuickstart());
  const findings =
    opts.preset === "startup-routing"
      ? [
          buildStartupRoutingFinding({
            report: opts.report,
            configuredRoute: quickstartRoutes.configuredRoute,
            routeSections: quickstartRoutes.routeSections,
          }),
        ]
      : [];

  return {
    schema: "agentplane.insights.triage.v1",
    generated_at: new Date().toISOString(),
    preset: opts.preset,
    privacy: {
      local_only: true,
      network: "not_used",
      excludes: opts.report.privacy.excludes,
    },
    facts: {
      workflow_mode: opts.report.project.workflow_mode,
      quickstart_configured_route: quickstartRoutes.configuredRoute,
      quickstart_route_sections: quickstartRoutes.routeSections,
      failure_error_code: opts.report.failure.error_code,
      failure_command: opts.report.failure.command_id,
      failure_reason_code: opts.report.failure.reason_code,
      git_dirty: opts.report.git.dirty,
      active_task_count: opts.report.tasks.active_task_ids.length,
      runner_status: opts.report.runner.by_status,
    },
    findings,
    agent_required: {
      field: "agent_context",
      instruction:
        "The reporting agent must still provide its own sanitized analysis of observed facts, impact, expected behavior, and omitted sensitive data.",
    },
  };
}

function renderList(items: readonly string[]): string[] {
  return items.length > 0 ? items.map((item) => `  - ${item}`) : ["  - none"];
}

export function renderInsightsTriageMarkdown(triage: InsightsTriage): string {
  const lines = [
    "## AgentPlane diagnostic triage",
    "",
    `- Schema: ${triage.schema}`,
    `- Preset: ${triage.preset}`,
    `- Local only: ${triage.privacy.local_only}`,
    `- Network: ${triage.privacy.network}`,
    "",
    "### Bounded facts",
    "",
    `- workflow_mode: ${triage.facts.workflow_mode}`,
    `- quickstart_configured_route: ${triage.facts.quickstart_configured_route ?? "unknown"}`,
    `- quickstart_route_sections: ${triage.facts.quickstart_route_sections.join(", ") || "none"}`,
    `- failure_error_code: ${triage.facts.failure_error_code ?? "unknown"}`,
    `- failure_command: ${triage.facts.failure_command ?? "unknown"}`,
    `- failure_reason_code: ${triage.facts.failure_reason_code ?? "unknown"}`,
    `- git_dirty: ${triage.facts.git_dirty}`,
    `- active_task_count: ${triage.facts.active_task_count}`,
    "",
    "### Findings",
    "",
  ];

  for (const finding of triage.findings) {
    lines.push(
      `- Code: ${finding.code}`,
      `  Severity: ${finding.severity}`,
      `  Confidence: ${finding.confidence}`,
      `  Summary: ${finding.summary}`,
      "  Evidence:",
      ...renderList(finding.evidence),
      `  Impact: ${finding.impact}`,
      "  Suggested maintainer checks:",
      ...renderList(finding.suggested_maintainer_checks),
      "",
    );
  }

  lines.push(
    "### Required agent field",
    "",
    `- Field: ${triage.agent_required.field}`,
    `- Instruction: ${triage.agent_required.instruction}`,
  );

  return lines.join("\n").trimEnd();
}

export function renderInsightsTriageReport(triage: InsightsTriage): CliReportEntry[] {
  const primaryFinding = triage.findings[0];
  return [
    { label: "schema", value: triage.schema },
    { label: "generated_at", value: triage.generated_at },
    { label: "preset", value: triage.preset },
    { label: "local_only", value: triage.privacy.local_only },
    { label: "network", value: triage.privacy.network },
    { label: "workflow_mode", value: triage.facts.workflow_mode },
    {
      label: "quickstart_configured_route",
      value: triage.facts.quickstart_configured_route ?? "unknown",
    },
    {
      label: "quickstart_route_sections",
      value: triage.facts.quickstart_route_sections.join(", ") || "none",
    },
    { label: "finding_code", value: primaryFinding?.code ?? "none" },
    { label: "finding_confidence", value: primaryFinding?.confidence ?? "unknown" },
    { label: "agent_required_field", value: triage.agent_required.field },
  ];
}
