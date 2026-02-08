import { isRecord } from "../../../shared/guards.js";

import { toStringSafe } from "../shared.js";

export function customFieldValue(issue: Record<string, unknown>, fieldId: unknown): string | null {
  if (!fieldId) return null;
  const fields = Array.isArray(issue.custom_fields) ? issue.custom_fields : [];
  for (const field of fields) {
    if (isRecord(field) && field.id === fieldId) {
      const value = field.value;
      return value !== undefined && value !== null ? toStringSafe(value) : "";
    }
  }
  return null;
}

export function setIssueCustomFieldValue(
  issue: Record<string, unknown>,
  fieldId: unknown,
  value: unknown,
): void {
  const fields: unknown[] = Array.isArray(issue.custom_fields) ? issue.custom_fields : [];
  let found = false;
  const updated = fields.map((field) => {
    if (isRecord(field) && field.id === fieldId) {
      found = true;
      return { ...field, value };
    }
    return field;
  });
  if (!found) updated.push({ id: fieldId, value });
  issue.custom_fields = updated;
}

export function appendCustomField(opts: {
  customFields: Record<string, unknown>;
  fields: Record<string, unknown>[];
  key: string;
  value: unknown;
}): void {
  const fieldId = opts.customFields?.[opts.key];
  if (!fieldId) return;
  let payloadValue: unknown = opts.value;
  if (Array.isArray(opts.value) || isRecord(opts.value)) {
    payloadValue = JSON.stringify(opts.value);
  }
  opts.fields.push({ id: fieldId, value: payloadValue });
}
