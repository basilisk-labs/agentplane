import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mkGitRepoRootWithCommit, writeDefaultConfig } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import * as executionContext from "../../runtime/task-execution-context/index.js";
import {
  makeKernelRecord,
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { renderDirectTaskVerificationDetails } from "./direct-task-verification.js";
import {
  assessLocalVerificationRecords,
  verificationRecordPaths,
} from "../shared/task-verification-records.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { createCanonicalTask } from "./kernel-create.js";
import { cmdVerifyParsed as executeVerify } from "./verify-record.js";

const mocks = vi.hoisted(() => ({ writeJsonStableIfChanged: vi.fn() }));
vi.mock("../../shared/write-if-changed.js", async (importOriginal) => {
  const actualUnknown: unknown = await importOriginal();
  const actual =
    actualUnknown && typeof actualUnknown === "object"
      ? (actualUnknown as Record<string, unknown>)
      : {};
  return { ...actual, writeJsonStableIfChanged: mocks.writeJsonStableIfChanged };
});
async function makeRepo(): Promise<string> {
  const root = await mkGitRepoRootWithCommit();
  await writeDefaultConfig(root);
  return root;
}

describe("native no-check verification durability", () => {
  beforeEach(() => mocks.writeJsonStableIfChanged.mockReset());
  it("projects a native no-check report into a durable assessed verification record", async () => {
    mocks.writeJsonStableIfChanged.mockImplementation(async (filePath, value) => {
      await mkdir(path.dirname(String(filePath)), { recursive: true });
      await writeFile(String(filePath), `${JSON.stringify(value)}\n`, "utf8");
      return true;
    });
    const root = await makeRepo();
    const taskId = "202610260100-NC11";
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    const report = makeTaskFixture({
      id: taskId,
      title: "Report",
      description: "Report evidence",
      task_kind: "analysis",
      mutation_scope: "none",
      verify: [],
      sections: { "Verify Steps": "Review report evidence." },
    });
    report.execution_contract = resolveTaskExecutionContract({
      config: ctx.config,
      task: report,
      requestedMode: "direct",
    });
    const created = await createCanonicalTask(ctx, report);
    const task = created.task;
    const identity = await resolveLogicalRepositoryIdentity({ git_root: root, task });
    const planDigest = k.kernelDigest("report-plan");
    const evidenceDigest = k.kernelDigest("native-no-check-evidence");
    const record = makeKernelRecord(
      identity,
      {
        schema_version: 1,
        id: taskId,
        revision: (task.revision ?? 0) + 1,
        state: "FINAL_VALIDATION",
        intent_digest: k.kernelDigest("report-intent"),
        current_plan: {
          revision: 1,
          digest: planDigest,
          state: "APPROVED",
          approval_actor_id: "USER",
          approval_evidence_digest: k.kernelDigest("report-approval"),
          work_items: [],
        },
        plan_history: [],
        work_items: {},
        final_validation: {
          status: "PASSED",
          identity: {
            implementation_identity: k.kernelDigest("report-state"),
            check_id: "canonical-final-contracts-v2",
            command_digest: k.kernelDigest([]),
            toolchain_digest: k.kernelDigest([]),
            environment_digest: k.kernelDigest("environment"),
          },
          evidence_digests: [evidenceDigest],
          observed_at: "2026-10-26T00:00:00.000Z",
        },
        effects: [],
        mutation_receipts: {},
        controller_transfer: null,
        migration_receipts: [],
      },
      [],
    );
    const reportTask = {
      ...task,
      status: "DOING" as const,
      task_kind: "analysis" as const,
      mutation_scope: "none" as const,
      verify: [],
      execution_contract: report.execution_contract,
      extensions: { ...task.extensions, [TASK_KERNEL_EXTENSION]: record },
    };
    await ctx.taskBackend.writeTask(reportTask);
    expect(readKernelRecord(await ctx.taskBackend.getTask(taskId), identity).kind).toBe(
      "canonical",
    );
    const details = renderDirectTaskVerificationDetails({
      task: reportTask,
      taskId,
      workflow: "direct",
      result: {
        status: "passed",
        reason: "No executable checks required",
        checks: [],
        artifact_path: "native.json",
      },
      no_check_evidence: { plan_digest: planDigest, evidence_digest: evidenceDigest },
    });
    expect(details).toContain("No-Executable-Checks: approved");
    expect(
      await executeVerify({
        ctx,
        cwd: root,
        taskId,
        state: "ok",
        by: "SUPERVISOR",
        note: "Report reviewed",
        details,
        localOnly: false,
        repoFixable: false,
        incidentTags: [],
        incidentMatch: [],
        quiet: true,
        allowCanonicalProjection: true,
      }),
    ).toBe(0);
    const projected = await ctx.taskBackend.getTask(taskId);
    if (!projected) throw new Error("missing projected report");
    expect(projected.verification?.state).toBe("ok");
    const taskRoot = path.join(root, ".agentplane", "tasks", taskId);
    const entries = await readdir(path.join(taskRoot, "verification"));
    const filename = entries.find((name) => name.endsWith(".json"));
    if (!filename) throw new Error("missing verification receipt");
    const receipt = JSON.parse(
      await readFile(path.join(taskRoot, "verification", filename), "utf8"),
    ) as { implementation_sha: string | null };
    const execution = await executionContext.resolveTaskExecutionContext({
      ctx,
      tasks: [projected],
      primaryTaskId: taskId,
    });
    const targetContext = {
      gitRoot: root,
      workflowDir: ".agentplane/tasks",
      taskIds: [taskId],
      workflowMode: "direct" as const,
      execution,
    };
    const assessment = await assessLocalVerificationRecords({
      taskRoot,
      task: projected,
      evaluatedSha: receipt.implementation_sha,
      targetContext,
    });
    expect(assessment.reason).toBe("verification_current");
    expect(
      await verificationRecordPaths(taskRoot, projected, receipt.implementation_sha, targetContext),
    ).toHaveLength(1);
  });
});
