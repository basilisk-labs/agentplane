import { createHash } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";

const gitRevParse = vi.hoisted(() => vi.fn());

vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  gitRevParse,
}));

import {
  verificationContractEvidenceCoverage,
  verificationRecordPaths,
} from "./task-verification-records.js";

const tempRoots: string[] = [];

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function makeTask(taskId: string): TaskData {
  return {
    id: taskId,
    title: "Task",
    description: "Task",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: ["bun test"],
    verification: {
      state: "ok" as const,
      updated_at: "2026-01-02T00:00:00.000Z",
      updated_by: "TESTER",
      note: "Current verification",
    },
    sections: { "Verify Steps": "Run bun test. Expected: pass." },
  } satisfies TaskData;
}

async function writeValidRecord(opts: {
  taskRoot: string;
  task: TaskData;
  implementationSha: string | null;
  details?: string | null;
  omitImplementationSha?: boolean;
}): Promise<string> {
  const verification = opts.task.verification;
  if (!verification) throw new Error("test task must have verification metadata");
  const verificationDir = path.join(opts.taskRoot, "verification");
  await mkdir(verificationDir, { recursive: true });
  const record = {
    schema_version: 1,
    kind: "task_verification_record",
    task_id: opts.task.id,
    recorded_at: verification.updated_at,
    verification_command: `agentplane verify ${opts.task.id} --ok --by TESTER`,
    result: verification.state,
    verifier: verification.updated_by,
    note: verification.note,
    details:
      opts.details === undefined
        ? "Command: bun test\nResult: pass\nEvidence: focused tests passed\nScope: verification matching"
        : opts.details,
    ...(opts.omitImplementationSha ? {} : { implementation_sha: opts.implementationSha }),
    scope: opts.task.sections?.["Verify Steps"],
    scope_digest: sha256(opts.task.sections?.["Verify Steps"]?.trim() ?? ""),
  };
  const recordPath = path.join(verificationDir, "record.json");
  await writeFile(
    recordPath,
    `${JSON.stringify({
      ...record,
      digest: sha256(JSON.stringify(canonicalizeJson(record))),
    })}\n`,
    "utf8",
  );
  return recordPath;
}

afterEach(async () => {
  gitRevParse.mockReset();
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("task verification records", () => {
  it("requires exact structured coverage for every selected Verification Contract check", () => {
    const task = makeTask("T-CONTRACT");
    task.execution_contract = {
      verification: {
        contract: { selected_checks: ["critical_paths", "task_outcome"] },
      },
    } as TaskData["execution_contract"];

    expect(
      verificationContractEvidenceCoverage(
        task,
        "Check: task_outcome\nCommand: bun test\nResult: pass\nEvidence: report.json\nScope: outcome",
      ),
    ).toMatchObject({ accepted: false, missingChecks: ["critical_paths"] });
    expect(
      verificationContractEvidenceCoverage(
        task,
        "Check: critical_paths\nCommand: bun test\nResult: pass\nEvidence: report.json\nScope: critical\n\nCheck: task_outcome\nCommand: bun test\nResult: pass\nEvidence: report.json\nScope: outcome",
      ),
    ).toMatchObject({ accepted: true, missingChecks: [], unexpectedChecks: [] });
  });

  it("rejects a persisted passing record that omits a selected contract check", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-contract-"));
    tempRoots.push(gitRoot);
    const task = makeTask("T-CONTRACT-RECORD");
    task.execution_contract = {
      verification: {
        contract: { selected_checks: ["critical_paths", "task_outcome"] },
      },
    } as TaskData["execution_contract"];
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", task.id);
    await writeValidRecord({
      taskRoot,
      task,
      implementationSha: null,
      details:
        "Check: task_outcome\nCommand: bun test\nResult: pass\nEvidence: report.json\nScope: outcome",
    });

    await expect(verificationRecordPaths(taskRoot, task, null)).resolves.toEqual([]);
  });

  it("accepts a current metadata-only record when both target SHAs are null", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
    tempRoots.push(gitRoot);
    const task = makeTask("T-METADATA");
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", task.id);
    const recordPath = await writeValidRecord({ taskRoot, task, implementationSha: null });

    await expect(verificationRecordPaths(taskRoot, task, null)).resolves.toEqual([recordPath]);
  });

  it.each([
    { evaluatedSha: null, implementationSha: "b".repeat(40) },
    { evaluatedSha: "a".repeat(40), implementationSha: null },
  ])(
    "rejects target mismatch for evaluatedSha=$evaluatedSha and implementationSha=$implementationSha",
    async ({ evaluatedSha, implementationSha }) => {
      const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
      tempRoots.push(gitRoot);
      const task = makeTask("T-MISMATCH");
      const taskRoot = path.join(gitRoot, ".agentplane", "tasks", task.id);
      await writeValidRecord({ taskRoot, task, implementationSha });

      await expect(verificationRecordPaths(taskRoot, task, evaluatedSha)).resolves.toEqual([]);
    },
  );

  it("rejects a current metadata-only record without concrete check details", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
    tempRoots.push(gitRoot);
    const task = makeTask("T-NON-CONCRETE");
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", task.id);
    await writeValidRecord({ taskRoot, task, implementationSha: null, details: null });

    await expect(verificationRecordPaths(taskRoot, task, null)).resolves.toEqual([]);
  });

  it("rejects a metadata-only record without an explicit implementation SHA field", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
    tempRoots.push(gitRoot);
    const task = makeTask("T-MISSING-SHA");
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", task.id);
    await writeValidRecord({
      taskRoot,
      task,
      implementationSha: null,
      omitImplementationSha: true,
    });

    await expect(verificationRecordPaths(taskRoot, task, null)).resolves.toEqual([]);
  });

  it("rejects stale record metadata before resolving semantic Git history", async () => {
    const gitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-verification-record-"));
    tempRoots.push(gitRoot);
    const taskId = "T-1";
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks", taskId);
    const verificationDir = path.join(taskRoot, "verification");
    await mkdir(verificationDir, { recursive: true });
    await writeFile(
      path.join(verificationDir, "stale.json"),
      `${JSON.stringify({
        implementation_sha: "b".repeat(40),
        recorded_at: "2026-01-01T00:00:00.000Z",
      })}\n`,
      "utf8",
    );
    const task = makeTask(taskId);

    await expect(
      verificationRecordPaths(taskRoot, task, "a".repeat(40), {
        gitRoot,
        workflowDir: ".agentplane/tasks",
        taskIds: [taskId],
        workflowMode: "branch_pr",
      }),
    ).resolves.toEqual([]);
    expect(gitRevParse).not.toHaveBeenCalled();
  });
});
