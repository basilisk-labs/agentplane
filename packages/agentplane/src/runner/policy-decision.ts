import type { CliError } from "../shared/errors.js";

import type {
  RunnerAdapterCapabilities,
  RunnerPolicyDecision,
  RunnerRecipeContext,
} from "./types.js";
import { readRecipeRunProfile } from "./adapters/recipe-run-profile.js";

function toRequestedMap(profile: ReturnType<typeof readRecipeRunProfile>): Record<string, unknown> {
  if (!profile) return {};
  const requested: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(profile)) {
    if (value !== undefined) {
      requested[key] = value;
    }
  }
  return requested;
}

export function buildRunnerPolicyDecision(opts: {
  adapter_id: string;
  capabilities: RunnerAdapterCapabilities | undefined;
  recipe: RunnerRecipeContext | undefined;
  requested?: Record<string, unknown>;
}): RunnerPolicyDecision {
  const profile = readRecipeRunProfile(opts.recipe);
  const requested = opts.requested ?? toRequestedMap(profile);
  const effective: Record<string, unknown> = {};
  const fields: RunnerPolicyDecision["fields"] = {};
  const capabilityFields = opts.capabilities?.fields ?? {};

  for (const [fieldName, capability] of Object.entries(capabilityFields)) {
    const hasRequest = Object.hasOwn(requested, fieldName);
    const requestedValue = hasRequest ? requested[fieldName] : undefined;
    const decision = {
      requested: requestedValue,
      status: "not_requested" as const,
      capability_level: capability.level,
      channel: capability.channel,
      ...(capability.supported_values ? { supported_values: capability.supported_values } : {}),
      ...(capability.note ? { note: capability.note } : {}),
    };
    if (!hasRequest) {
      fields[fieldName] = decision;
      continue;
    }
    if (capability.level === "native" || capability.level === "wrapper") {
      if (
        Array.isArray(capability.supported_values) &&
        typeof requestedValue === "string" &&
        !capability.supported_values.includes(requestedValue)
      ) {
        fields[fieldName] = {
          ...decision,
          status: "unsupported",
        };
        continue;
      }
      effective[fieldName] = requestedValue;
      fields[fieldName] = {
        ...decision,
        effective: requestedValue,
        status: "enforced",
      };
      continue;
    }
    fields[fieldName] = {
      ...decision,
      status: capability.level === "advisory" ? "advisory" : "unsupported",
    };
  }

  for (const [fieldName, requestedValue] of Object.entries(requested)) {
    if (Object.hasOwn(fields, fieldName)) continue;
    fields[fieldName] = {
      requested: requestedValue,
      status: "unsupported",
      capability_level: "unsupported",
      channel: "none",
    };
  }

  return {
    adapter_id: opts.adapter_id,
    requested,
    effective,
    fields,
    refusal_reason: null,
  };
}

export function applyRunnerPolicyRefusal(opts: {
  decision: RunnerPolicyDecision;
  error: CliError;
}): RunnerPolicyDecision {
  return {
    ...opts.decision,
    refusal_reason: {
      code: opts.error.code,
      message: opts.error.message,
      ...(typeof opts.error.context?.policy_field === "string"
        ? { policy_field: opts.error.context.policy_field }
        : {}),
      ...(Object.hasOwn(opts.error.context ?? {}, "declared_value")
        ? { declared_value: opts.error.context?.declared_value }
        : {}),
    },
  };
}
