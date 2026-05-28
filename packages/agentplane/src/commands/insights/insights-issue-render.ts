import { renderAgentContext } from "./insights-issue-context.js";
import type { InsightsReport } from "./insights-report.js";

export function trimOptional(value: string | undefined): string | null {
  const trimmed = value?.trim() ?? "";
  return trimmed || null;
}

export function sanitizeIssueTitle(
  title: string | undefined,
  errorCode: string | undefined,
): string {
  const explicit = trimOptional(title);
  if (explicit) return explicit.slice(0, 120);
  const suffix = trimOptional(errorCode) ? ` (${trimOptional(errorCode)})` : "";
  return `AgentPlane internal error report${suffix}`;
}

export function renderIssueBody(opts: {
  body: string | undefined;
  errorCode: string | undefined;
  report: InsightsReport;
  includeInsightsReport: boolean;
  agentContext: string | null;
}): string {
  const sections = [
    "## Summary",
    trimOptional(opts.body) ??
      "AgentPlane reported an internal error and prompted an opt-in report.",
    "",
    "## Error",
    `- Code: ${trimOptional(opts.errorCode) ?? "unknown"}`,
    `- AgentPlane: ${opts.report.environment.agentplane_version ?? "unknown"}`,
    `- Platform: ${opts.report.environment.platform}/${opts.report.environment.arch}`,
    "",
    "## Privacy",
    "- This issue was created only after project opt-in.",
    "- The attached diagnostic report is privacy-bounded.",
    `- Excluded content: ${opts.report.privacy.excludes.join("; ")}`,
    "",
    ...renderAgentContext(opts.agentContext),
  ];
  if (opts.includeInsightsReport) {
    sections.push("", "## Insights report", "```json", JSON.stringify(opts.report, null, 2), "```");
  }
  return `${sections.join("\n")}\n`;
}
