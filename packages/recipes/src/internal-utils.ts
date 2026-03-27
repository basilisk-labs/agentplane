export function requiredFieldMessage(field: string, source?: string): string {
  return `Missing required field: ${field}${source ? ` (${source})` : ""}`;
}

export function invalidFieldMessage(field: string, expected: string, source?: string): string {
  return `Invalid field ${field}: expected ${expected}${source ? ` (${source})` : ""}`;
}

export function invalidPathMessage(field: string, reason: string, source?: string): string {
  return `Invalid ${field}: ${reason}${source ? ` (${source})` : ""}`;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function dedupeStrings(values: string[]): string[] {
  return [...new Set(values)];
}
