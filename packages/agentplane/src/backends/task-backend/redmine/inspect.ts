import { isRecord } from "../../../shared/guards.js";

import {
  toStringSafe,
  type TaskBackendFieldNameDrift,
  type TaskBackendVisibleField,
} from "../shared.js";

type RawCustomField = {
  id: number;
  name: string;
  nonEmptyCount: number;
};

function expectedFieldNameForKey(key: string): string {
  return key;
}

export async function inspectVisibleCustomFields(opts: {
  projectId: string;
  requestJson: (
    method: string,
    reqPath: string,
    payload?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ) => Promise<Record<string, unknown>>;
}): Promise<TaskBackendVisibleField[]> {
  const fields = new Map<number, RawCustomField>();
  let offset = 0;
  const limit = 100;

  while (true) {
    const payload = await opts.requestJson("GET", "issues.json", undefined, {
      project_id: opts.projectId,
      limit,
      offset,
      status_id: "*",
    });
    const issues = Array.isArray(payload.issues) ? payload.issues : [];
    const pageIssues = issues.filter((issue): issue is Record<string, unknown> => isRecord(issue));
    for (const issue of pageIssues) {
      const customFields = Array.isArray(issue.custom_fields) ? issue.custom_fields : [];
      for (const field of customFields) {
        if (!isRecord(field) || typeof field.id !== "number") continue;
        const name = toStringSafe(field.name).trim();
        if (!name) continue;
        const current = fields.get(field.id) ?? {
          id: field.id,
          name,
          nonEmptyCount: 0,
        };
        const value = field.value;
        if (value !== undefined && value !== null && toStringSafe(value).trim().length > 0) {
          current.nonEmptyCount += 1;
        }
        fields.set(field.id, current);
      }
    }

    const total = Number(payload.total_count ?? 0);
    if (total === 0 || offset + limit >= total) break;
    offset += limit;
  }

  return [...fields.values()]
    .toSorted((a, b) => a.id - b.id)
    .map((field) => ({
      id: field.id,
      name: field.name,
      nonEmptyCount: field.nonEmptyCount,
    }));
}

export function inferVisibleCanonicalStateFieldId(
  visibleFields: TaskBackendVisibleField[],
): number | null {
  const field = visibleFields.find((entry) => entry.name.trim() === "canonical_state");
  return field?.id ?? null;
}

export function detectConfiguredFieldNameDrift(opts: {
  configuredFields: Record<string, unknown>;
  visibleFields: TaskBackendVisibleField[];
}): TaskBackendFieldNameDrift[] {
  const byId = new Map(opts.visibleFields.map((field) => [field.id, field]));
  const drift: TaskBackendFieldNameDrift[] = [];

  for (const [key, rawId] of Object.entries(opts.configuredFields)) {
    if (typeof rawId !== "number") continue;
    const visible = byId.get(rawId);
    if (!visible) continue;
    const expectedName = expectedFieldNameForKey(key);
    if (visible.name.trim() === expectedName) continue;
    drift.push({
      key,
      configuredId: rawId,
      visibleName: visible.name,
    });
  }

  return drift.toSorted((a, b) => a.configuredId - b.configuredId || a.key.localeCompare(b.key));
}
