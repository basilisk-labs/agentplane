export const PROMPT_MODULE_CONTRACT_SCHEMA_VERSION = 1 as const;

export type PromptModuleContractSchemaVersion = typeof PROMPT_MODULE_CONTRACT_SCHEMA_VERSION;

export const SUPPORTED_PROMPT_MODULE_SCHEMA_VERSIONS = [
  PROMPT_MODULE_CONTRACT_SCHEMA_VERSION,
] as const;

function invalid(field: string, expected: string): Error {
  return new Error(`Invalid field ${field}: expected ${expected}`);
}

function isRecord(raw: unknown): raw is Record<string, unknown> {
  return typeof raw === "object" && raw !== null && !Array.isArray(raw);
}

function expectedSchemaVersionLabel(): string {
  return SUPPORTED_PROMPT_MODULE_SCHEMA_VERSIONS.join(" | ");
}

export function migratePromptModuleSchemaVersion<T>(raw: T, field: string): T {
  if (!isRecord(raw)) throw invalid(field, "object");
  if (raw.schema_version !== PROMPT_MODULE_CONTRACT_SCHEMA_VERSION) {
    throw invalid(`${field}.schema_version`, expectedSchemaVersionLabel());
  }
  return raw;
}
