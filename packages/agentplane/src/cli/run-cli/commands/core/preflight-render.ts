import type { PreflightReport } from "./preflight-report.js";

function probeYesNo(probe: { ok: boolean }): string {
  return probe.ok ? "yes" : "no";
}

function probeValueOrUnknown(probe: { ok: boolean; value?: string | boolean }): string {
  return probe.ok && probe.value !== undefined ? String(probe.value) : "unknown";
}

function renderTaskArtifactDrift(report: PreflightReport): string {
  const drift = report.task_artifact_drift;
  if (!drift.present) return "none";
  const parts = [
    `tasks=${drift.task_ids.join(", ")}`,
    `active_parallel=${drift.counts.active_parallel_task_artifact}`,
    `stale_done_handoff=${drift.counts.stale_done_handoff}`,
    `blueprint_evidence=${drift.counts.task_blueprint_evidence}`,
    `unknown=${drift.counts.unknown_task_artifact}`,
    `actionable=${drift.actionable ? "yes" : "no"}`,
  ];
  return parts.join("; ");
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
    `- task artifact drift: ${renderTaskArtifactDrift(report)}`,
    `- message format guard: ${report.message_format_guard.ok ? "ok" : "failed"}`,
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
