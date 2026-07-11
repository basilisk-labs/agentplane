import type { CliReportEntry } from "../../cli/output.js";
import type { InsightsReport } from "./insights-report.js";

type CountMap = Record<string, number>;

function renderCountMap(map: CountMap, limit?: number): string {
  let entries = Object.entries(map).filter(([, value]) => value > 0);
  if (entries.length === 0) return "none";
  entries = entries.toSorted(([keyA, valueA], [keyB, valueB]) => {
    if (valueA !== valueB) return valueB - valueA;
    return keyA.localeCompare(keyB);
  });
  if (limit !== undefined && entries.length > limit) {
    const visible = entries.slice(0, limit);
    const other = entries.slice(limit).reduce((sum, [, value]) => sum + value, 0);
    entries = [...visible, ["other", other]];
  }
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
}

export function renderInsightsReport(report: InsightsReport): CliReportEntry[] {
  return [
    { label: "schema", value: report.schema },
    { label: "generated_at", value: report.generated_at },
    { label: "local_only", value: report.privacy.local_only },
    { label: "network", value: report.privacy.network },
    { label: "upload", value: report.privacy.upload },
    { label: "failure_error_code", value: report.failure.error_code ?? "unknown" },
    { label: "failure_command", value: report.failure.command_id ?? "unknown" },
    { label: "failure_phase", value: report.failure.phase ?? "unknown" },
    { label: "failure_reason_code", value: report.failure.reason_code ?? "unknown" },
    { label: "failure_dedupe", value: report.failure.dedupe_signature },
    { label: "agentplane", value: report.environment.agentplane_version ?? "unknown" },
    { label: "node_major", value: report.environment.node_major ?? "unknown" },
    { label: "platform", value: `${report.environment.platform}/${report.environment.arch}` },
    { label: "workflow_mode", value: report.project.workflow_mode },
    { label: "backend", value: report.project.backend.id },
    { label: "backend_cache_configured", value: report.project.backend.cache_configured },
    { label: "git_branch", value: report.git.branch ?? "unknown" },
    { label: "git_dirty", value: report.git.dirty },
    { label: "git_status", value: renderCountMap(report.git.status_counts) },
    { label: "tasks_total", value: report.tasks.total },
    { label: "tasks_by_status", value: renderCountMap(report.tasks.by_status) },
    { label: "tasks_by_owner", value: renderCountMap(report.tasks.by_owner) },
    { label: "tasks_by_primary_tag", value: renderCountMap(report.tasks.by_primary_tag, 20) },
    { label: "plan_approval", value: renderCountMap(report.tasks.plan_approval) },
    { label: "verification", value: renderCountMap(report.tasks.verification) },
    { label: "verify_steps", value: renderCountMap(report.tasks.verify_steps) },
    { label: "quality_verify_steps", value: renderCountMap(report.quality.verify_steps) },
    { label: "quality_intake_manifest", value: renderCountMap(report.quality.intake_manifest) },
    { label: "quality_runner_repeat", value: renderCountMap(report.quality.runner_repeat) },
    {
      label: "quality_runner_failure_fingerprints",
      value: renderCountMap(report.quality.runner_failure_fingerprints, 5),
    },
    { label: "task_event_types", value: renderCountMap(report.tasks.event_types) },
    { label: "active_task_ids", value: report.tasks.active_task_ids.join(", ") || "none" },
    { label: "recent_task_ids", value: report.tasks.recent_task_ids.join(", ") || "none" },
    { label: "runner_tasks", value: report.runner.tasks_with_runner },
    { label: "runner_status", value: renderCountMap(report.runner.by_status) },
    { label: "runner_adapters", value: renderCountMap(report.runner.by_adapter) },
    { label: "runner_modes", value: renderCountMap(report.runner.mode) },
    { label: "runner_duration", value: renderCountMap(report.runner.duration_ms_buckets) },
    {
      label: "excluded_content",
      value: report.privacy.excludes.join("; "),
    },
  ];
}
