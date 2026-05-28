import { CliError } from "../../shared/errors.js";

export type TaskRunLogsParsed = {
  taskId: string;
  runId?: string;
  stream: "events" | "trace" | "stderr";
  follow: boolean;
  tail: number;
};

export function parsePositiveInteger(value: unknown, fallback: number, flag: string): number {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: `Invalid ${flag}: ${String(value)} (expected a non-negative integer)`,
    });
  }
  return parsed;
}
