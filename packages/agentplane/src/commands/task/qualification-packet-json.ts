import { readFile } from "node:fs/promises";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";

export type JsonRecord = Record<string, unknown>;

export function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function recordValue(value: unknown): JsonRecord {
  return isRecord(value) ? value : {};
}

export async function readJson(
  pathname: string,
  label: string,
): Promise<{ raw: string; value: JsonRecord }> {
  let raw: string;
  try {
    raw = await readFile(pathname, "utf8");
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} is missing: ${pathname} (${error instanceof Error ? error.message : String(error)}).`,
    });
  }
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) throw new Error("expected a JSON object");
    return { raw, value };
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} is invalid JSON: ${pathname} (${error instanceof Error ? error.message : String(error)}).`,
    });
  }
}
