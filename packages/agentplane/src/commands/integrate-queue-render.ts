import { emptyStateMessage, type CommandResult } from "../cli/output.js";
import type { IntegrationQueueDoctorResult } from "./integrate-queue-doctor-command.js";
import type { IntegrationQueueListResult } from "./integrate-queue-list.js";
import { renderIntegrationQueueEntry } from "./integrate-queue-lane.js";

export function renderIntegrationQueueListResult(
  result: IntegrationQueueListResult,
  json: boolean,
): CommandResult[] {
  if (json) return [{ kind: "json", value: result.queue }];
  if (result.active_entries.length === 0) {
    return [{ kind: "line", text: emptyStateMessage("integration queue entries") }];
  }
  return result.active_entries.map((entry) => ({
    kind: "line" as const,
    text: renderIntegrationQueueEntry(entry),
  }));
}

export function renderIntegrationQueueDoctorResult(
  result: IntegrationQueueDoctorResult,
  json: boolean,
): CommandResult[] {
  if (json) {
    return [
      {
        kind: "json",
        value: {
          findings: result.findings.map(({ disposition: _disposition, ...finding }) => finding),
          applied: result.applied,
          mutex: result.mutex,
        },
      },
    ];
  }

  const output: CommandResult[] = [];
  if (result.mutex.manual_recovery_required) {
    const inspection = result.mutex;
    const owner = "owner" in inspection ? `${inspection.owner.pid}@${inspection.owner.host}` : "-";
    const reason = "reason" in inspection ? ` reason=${inspection.reason}` : "";
    output.push({
      kind: "line",
      text:
        `integration queue mutex: state=${inspection.state} owner=${owner}${reason} ` +
        `path=${result.mutex.lock_path} manual_recovery_required=yes`,
    });
  }
  if (result.findings.length === 0) {
    output.push({
      kind: "success",
      action: "integration queue doctor",
      details: "no stale entries detected",
    });
    return output;
  }
  for (const finding of result.findings) {
    output.push({
      kind: "line",
      text: `${finding.task_id} ${finding.status}: ${finding.reason} repair=${finding.repair ?? "none"} ${finding.disposition}`,
    });
  }
  return output;
}
