import type { RunnerAdapterCapabilities } from "../../runner/types.js";

import { createCapabilityRegistry } from "./registry.js";
import type { AgentplaneCapabilityEntry, AgentplaneCapabilityRegistry } from "./types.js";

function source(adapterId: string) {
  return {
    id: "runner_adapter" as const,
    detail: adapterId,
  };
}

function adapterCapabilityId(adapterId: string): string {
  return `runner.adapter.${adapterId}`;
}

function policyFieldCapabilityId(adapterId: string, fieldName: string): string {
  return `runner.adapter.${adapterId}.policy_field.${fieldName}`;
}

export function resolveRunnerAdapterCapabilityRegistry(opts: {
  adapter_id: string;
  capabilities: RunnerAdapterCapabilities | undefined;
  requested?: Record<string, unknown>;
}): AgentplaneCapabilityRegistry {
  const adapterId = opts.capabilities?.adapter_id ?? opts.adapter_id;
  const requested = opts.requested ?? {};
  const entries: AgentplaneCapabilityEntry[] = [
    {
      id: adapterCapabilityId(adapterId),
      kind: "runner_adapter",
      availability: "available",
      source: source(adapterId),
      summary: `Runner adapter ${adapterId}`,
      metadata: {
        adapter_id: adapterId,
        declared_fields: Object.keys(opts.capabilities?.fields ?? {}).toSorted(),
      },
    },
  ];

  for (const [fieldName, capability] of Object.entries(opts.capabilities?.fields ?? {})) {
    const hasRequest = Object.hasOwn(requested, fieldName);
    const requestedValue = hasRequest ? requested[fieldName] : undefined;
    const supportedValues = capability.supported_values
      ? [...capability.supported_values]
      : undefined;
    const stringRequest = typeof requestedValue === "string" ? requestedValue : null;

    const availability =
      capability.level === "unsupported"
        ? "unavailable"
        : stringRequest &&
            Array.isArray(supportedValues) &&
            !supportedValues.includes(stringRequest)
          ? "blocked"
          : "available";

    entries.push({
      id: policyFieldCapabilityId(adapterId, fieldName),
      kind: "runner_policy_field",
      availability,
      source: source(adapterId),
      summary: `Runner policy field ${fieldName}`,
      ...(hasRequest ? { value: requestedValue } : {}),
      ...(supportedValues ? { supported_values: supportedValues } : {}),
      ...(availability === "unavailable"
        ? {
            reason: "The adapter declares this policy field unsupported.",
          }
        : {}),
      ...(availability === "blocked"
        ? {
            reason: "The requested policy value is outside the adapter-supported set.",
            blocked_by: [adapterCapabilityId(adapterId)],
          }
        : {}),
      metadata: {
        adapter_id: adapterId,
        field: fieldName,
        level: capability.level,
        channel: capability.channel,
        ...(capability.note ? { note: capability.note } : {}),
      },
    });
  }

  return createCapabilityRegistry(entries);
}
