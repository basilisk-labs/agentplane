import { invalidValueForFlag } from "../../../output.js";
import { usageError } from "../../../spec/errors.js";
import type { CommandSpec } from "../../../spec/spec.js";

export function parseBooleanValueForInit<T>(
  spec: CommandSpec<T>,
  flag: string,
  value: string,
): boolean {
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "y", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "n", "off"].includes(normalized)) return false;
  throw usageError({
    spec,
    command: "init",
    message: invalidValueForFlag(flag, value, "true|false"),
  });
}

export function parseRecipesSelectionForInit(value: string): string[] {
  const normalized = value.trim().toLowerCase();
  if (normalized === "none" || normalized === "") return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
