import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";

const CHECK_FIELDS = ["Command", "Result", "Evidence", "Scope"] as const;

function hasConcreteCheckDetails(details: unknown): boolean {
  if (typeof details !== "string" || !details.trim()) return false;
  const checks = details.trim().split(/\n\s*\n/gu);
  return checks.every((check) => {
    const fields = new Map(
      check.split("\n").map((line) => {
        const [field, ...value] = line.split(":");
        return [field?.trim(), value.join(":").trim()] as const;
      }),
    );
    return (
      CHECK_FIELDS.every((field) => fields.get(field)) &&
      ["pass", "fail"].includes(fields.get("Result") ?? "")
    );
  });
}

function matchesCurrentVerification(
  raw: unknown,
  verification: TaskData["verification"] | null | undefined,
): boolean {
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || !verification) return false;
  const record = raw as Record<string, unknown>;
  return (
    record.kind === "task_verification_record" &&
    record.recorded_at === verification.updated_at &&
    record.result === verification.state &&
    record.verifier === verification.updated_by &&
    record.note === verification.note &&
    hasConcreteCheckDetails(record.details)
  );
}

async function isAcceptedVerificationRecord(
  filePath: string,
  verification: TaskData["verification"] | null | undefined,
): Promise<boolean> {
  try {
    return matchesCurrentVerification(JSON.parse(await readFile(filePath, "utf8")), verification);
  } catch {
    return false;
  }
}

export async function verificationRecordPaths(
  taskRoot: string,
  verification: TaskData["verification"] | null | undefined,
): Promise<string[]> {
  try {
    const entries = await readdir(path.join(taskRoot, "verification"), { withFileTypes: true });
    const candidates = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => path.join(taskRoot, "verification", entry.name))
      .toSorted();
    const accepted = await Promise.all(
      candidates.map(async (filePath) => ({
        filePath,
        accepted: await isAcceptedVerificationRecord(filePath, verification),
      })),
    );
    return accepted.filter((entry) => entry.accepted).map((entry) => entry.filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
}
