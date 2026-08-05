import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { gitEnv, gitShowFile, toGitPath } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveQualityReviewTargetSha } from "./quality-review-target.js";
import { parseVerificationCheckDetails } from "./verification-details.js";

export type VerificationRecordTargetContext = {
  gitRoot: string;
  workflowDir: string;
  taskIds?: readonly string[];
  workflowMode?: "direct" | "branch_pr";
};

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function verifyStepsDigest(task: TaskData): `sha256:${string}` | null {
  const verifySteps = task.sections?.["Verify Steps"];
  return typeof verifySteps === "string" && verifySteps.trim() ? sha256(verifySteps.trim()) : null;
}

function hasConcreteCheckDetails(details: unknown): boolean {
  return parseVerificationCheckDetails(details) !== null;
}

function hasValidRecordDigest(record: Record<string, unknown>): boolean {
  const { digest, ...payload } = record;
  return (
    typeof digest === "string" &&
    /^sha256:[a-f0-9]{64}$/u.test(digest) &&
    digest === sha256(JSON.stringify(canonicalizeJson(payload)))
  );
}

async function matchesCurrentVerification(
  raw: unknown,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
): Promise<boolean> {
  const verification = task.verification;
  const scopeDigest = verifyStepsDigest(task);
  if (!raw || typeof raw !== "object" || Array.isArray(raw) || !verification || !evaluatedSha) {
    return false;
  }
  const record = raw as Record<string, unknown>;
  if (
    record.schema_version !== 1 ||
    record.kind !== "task_verification_record" ||
    record.task_id !== task.id ||
    record.recorded_at !== verification.updated_at ||
    record.result !== verification.state ||
    record.verifier !== verification.updated_by ||
    record.note !== verification.note ||
    record.scope_digest !== scopeDigest ||
    !hasValidRecordDigest(record) ||
    (requireConcreteCheckDetails && !hasConcreteCheckDetails(record.details))
  ) {
    return false;
  }
  const implementationSha =
    typeof record.implementation_sha === "string" ? record.implementation_sha : null;
  return (
    implementationSha === evaluatedSha ||
    (implementationSha !== null &&
      targetContext !== undefined &&
      (await resolveQualityReviewTargetSha({
        gitRoot: targetContext.gitRoot,
        workflowDir: targetContext.workflowDir,
        taskId: task.id,
        taskIds: targetContext.taskIds,
        headSha: implementationSha,
        previousEvaluatedSha: evaluatedSha,
        workflowMode: targetContext.workflowMode,
      })) === evaluatedSha)
  );
}

async function isAcceptedVerificationRecord(
  filePath: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
): Promise<boolean> {
  try {
    return await matchesCurrentVerification(
      JSON.parse(await readFile(filePath, "utf8")),
      task,
      evaluatedSha,
      targetContext,
      requireConcreteCheckDetails,
    );
  } catch {
    return false;
  }
}

export async function verificationRecordPaths(
  taskRoot: string,
  task: TaskData,
  evaluatedSha: string | null,
  targetContext?: VerificationRecordTargetContext,
  requireConcreteCheckDetails = true,
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
        accepted: await isAcceptedVerificationRecord(
          filePath,
          task,
          evaluatedSha,
          targetContext,
          requireConcreteCheckDetails,
        ),
      })),
    );
    return accepted.filter((entry) => entry.accepted).map((entry) => entry.filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return [];
    throw error;
  }
}

async function verificationRecordsFromGitSnapshot(opts: {
  gitRoot: string;
  taskRoot: string;
  ref: string;
}): Promise<unknown[]> {
  if (!/^[0-9a-f]{40,64}$/u.test(opts.ref)) return [];
  const taskRootRelative = toGitPath(path.relative(opts.gitRoot, opts.taskRoot));
  if (
    !taskRootRelative ||
    taskRootRelative === ".." ||
    taskRootRelative.startsWith("../") ||
    path.isAbsolute(taskRootRelative)
  ) {
    return [];
  }
  const verificationPrefix = `${taskRootRelative}/verification/`;
  try {
    const { stdout } = await execFileAsync(
      "git",
      ["ls-tree", "-r", "--name-only", "-z", opts.ref, "--", verificationPrefix],
      { cwd: opts.gitRoot, env: gitEnv(), encoding: "buffer" },
    );
    const names = (Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout))
      .split("\0")
      .filter(
        (name) =>
          name.startsWith(verificationPrefix) &&
          name.endsWith(".json") &&
          !name.slice(verificationPrefix.length).includes("/"),
      )
      .toSorted();
    return await Promise.all(
      names.map(
        async (name): Promise<unknown> =>
          JSON.parse(await gitShowFile(opts.gitRoot, opts.ref, name)) as unknown,
      ),
    );
  } catch {
    return [];
  }
}

export async function hasAcceptedVerificationRecord(opts: {
  taskRoot: string;
  task: TaskData;
  evaluatedSha: string | null;
  targetContext?: VerificationRecordTargetContext;
  snapshotRef?: string | null;
  requireConcreteCheckDetails?: boolean;
}): Promise<boolean> {
  const localRecords = await verificationRecordPaths(
    opts.taskRoot,
    opts.task,
    opts.evaluatedSha,
    opts.targetContext,
    opts.requireConcreteCheckDetails,
  );
  if (localRecords.length > 0) return true;
  if (!opts.snapshotRef || !opts.targetContext) return false;
  const snapshotRecords = await verificationRecordsFromGitSnapshot({
    gitRoot: opts.targetContext.gitRoot,
    taskRoot: opts.taskRoot,
    ref: opts.snapshotRef,
  });
  const accepted = await Promise.all(
    snapshotRecords.map((record) =>
      matchesCurrentVerification(
        record,
        opts.task,
        opts.evaluatedSha,
        opts.targetContext,
        opts.requireConcreteCheckDetails,
      ),
    ),
  );
  return accepted.some(Boolean);
}
