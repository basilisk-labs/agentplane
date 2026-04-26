import type { PreflightReport } from "./preflight-report.js";

function probeYesNo(probe: { ok: boolean }): string {
  return probe.ok ? "yes" : "no";
}

function probeValueOrUnknown(probe: { ok: boolean; value?: string | boolean }): string {
  return probe.ok && probe.value !== undefined ? String(probe.value) : "unknown";
}

export function renderPreflightText(report: PreflightReport): string[] {
  const lines = [
    "Preflight Summary",
    `- mode: ${report.mode}`,
    `- project detected: ${report.project_detected ? "yes" : "no"}`,
    `- config loaded: ${probeYesNo(report.config_loaded)}`,
    `- quickstart loaded: ${probeYesNo(report.quickstart_loaded)}`,
    `- workflow loaded: ${probeYesNo(report.workflow_loaded)}`,
    `- task list loaded: ${probeYesNo(report.task_list_loaded)}`,
    `- working tree clean (tracked-only): ${probeValueOrUnknown(report.working_tree_clean_tracked)}`,
    `- task artifact drift: ${report.task_artifact_drift.present ? report.task_artifact_drift.task_ids.join(", ") : "none"}`,
    `- current git branch: ${probeValueOrUnknown(report.current_branch)}`,
    `- workflow_mode: ${report.workflow_mode}`,
    `- harness engeneering health: ${report.harness_health.status}`,
  ];
  if (report.harness_health.reasons.length > 0) {
    lines.push(`  - reasons: ${report.harness_health.reasons.join(", ")}`);
  }
  lines.push(
    "- approval gates:",
    `  - require_plan: ${String(report.approvals.require_plan)}`,
    `  - require_verify: ${String(report.approvals.require_verify)}`,
    `  - require_network: ${String(report.approvals.require_network)}`,
    "- outside-repo: not needed",
  );
  if (report.next_actions.length > 0) {
    lines.push("Next actions:");
    for (const action of report.next_actions) {
      lines.push(`- ${action.command}: ${action.reason}`);
    }
  }
  return lines;
}
