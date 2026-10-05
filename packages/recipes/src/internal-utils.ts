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

/** Portable lexical repo path. Filesystem/symlink containment belongs to the effect boundary. */
export function isScenarioRepoPath(value: string): boolean {
  return (
    value.length > 0 &&
    value === value.trim() &&
    !/[\\:]/u.test(value) &&
    [...value].every((char) => (char.codePointAt(0) ?? 0) >= 32 && char.codePointAt(0) !== 127) &&
    !value.startsWith("/") &&
    !value.includes("{{") &&
    !value.includes("}}") &&
    value.split("/").every((part) => part !== ".." && part !== "")
  );
}
