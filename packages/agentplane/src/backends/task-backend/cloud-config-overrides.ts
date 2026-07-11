import { isDotEnvLoadedKey } from "../../shared/env.js";

export type CloudConfigOverride = {
  key: string;
  configured: string | null;
  effective: string;
};

function normalizedString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
function normalizeEndpoint(value: unknown): string | null {
  const normalized = normalizedString(value);
  return normalized ? normalized.replaceAll(/\/+$/gu, "") : null;
}

export function cloudConfigOverrides(
  settings: { endpoint?: string; project_id?: string; provider?: string },
  effective: Record<string, string>,
): CloudConfigOverride[] {
  const configured: Record<string, string | null> = {
    AGENTPLANE_CLOUD_ENDPOINT: normalizeEndpoint(settings.endpoint),
    AGENTPLANE_CLOUD_PROJECT_ID: normalizedString(settings.project_id),
    AGENTPLANE_CLOUD_PROVIDER: normalizedString(settings.provider),
  };
  const out: CloudConfigOverride[] = [];
  for (const [key, value] of Object.entries(effective)) {
    if (!isDotEnvLoadedKey(key)) continue;
    const configuredValue = configured[key] ?? null;
    if (configuredValue === value) continue;
    out.push({ key, configured: configuredValue, effective: value });
  }
  return out;
}
