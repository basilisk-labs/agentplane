import type { RunnerAdapterCapabilities, RunnerPolicyDecision } from "./types.js";

function appendPart(parts: string[], key: string, value: string | null | undefined): void {
  if (!value) return;
  parts.push(`${key}=${value}`);
}

function renderValue(value: unknown): string | null {
  if (value === undefined) return null;
  return JSON.stringify(value);
}

export function formatRunnerCapabilitySummaryLines(
  capabilities: RunnerAdapterCapabilities | undefined,
): string[] {
  if (!capabilities) return [];
  return Object.entries(capabilities.fields).map(([fieldName, capability]) => {
    const parts = [
      `capability[${fieldName}]:`,
      `level=${capability.level}`,
      `channel=${capability.channel}`,
    ];
    appendPart(
      parts,
      "supported",
      capability.supported_values?.length ? capability.supported_values.join(",") : null,
    );
    appendPart(parts, "note", capability.note ?? null);
    return parts.join(" ");
  });
}

export function formatRunnerPolicyFieldSummaryLines(
  decision: RunnerPolicyDecision | undefined,
): string[] {
  if (!decision) return [];
  return Object.entries(decision.fields).map(([fieldName, field]) => {
    const parts = [
      `policy_field[${fieldName}]:`,
      `status=${field.status}`,
      `capability=${field.capability_level}`,
      `channel=${field.channel}`,
    ];
    appendPart(parts, "requested", renderValue(field.requested));
    appendPart(parts, "effective", renderValue(field.effective));
    appendPart(
      parts,
      "supported",
      field.supported_values?.length ? field.supported_values.join(",") : null,
    );
    appendPart(parts, "note", field.note ?? null);
    return parts.join(" ");
  });
}
