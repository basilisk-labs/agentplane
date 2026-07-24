import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  type ExecutionReceipt,
} from "@agentplaneorg/core/schemas";

import { resolveTaskRunnerPaths } from "../runner/task-run-paths.js";

export async function attachObservedExecutionReceiptFixture(opts: {
  root: string;
  task: { id: string; runner?: Record<string, unknown> };
  changedPaths: string[];
  workflowDir?: string;
  runId?: string;
  receiptRunId?: string;
  workOrderId?: string;
  legacy?: boolean;
}): Promise<{ path: string; text: string; receipt: ExecutionReceipt }> {
  const workflowDir = opts.workflowDir ?? ".agentplane/tasks";
  const runId = opts.runId ?? `run-${opts.task.id}`;
  const receipt = structuredClone(
    opts.legacy ? EXECUTION_RECEIPT_V1_VALID_FIXTURE : EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  ) as ExecutionReceipt;
  receipt.run_id = opts.receiptRunId ?? runId;
  receipt.work_order_id = opts.workOrderId ?? runId;
  if (receipt.git.state !== "observed") throw new Error("expected observed receipt fixture");
  receipt.git.before.dirty_paths = [];
  receipt.git.after.dirty_paths = [...opts.changedPaths];
  receipt.git.delta.changed_paths = [...opts.changedPaths];
  receipt.git.delta.entries = opts.changedPaths.map((changedPath) => ({
    path: changedPath,
    change: "modified",
    before_sha256: `sha256:${"1".repeat(64)}`,
    after_sha256: `sha256:${"2".repeat(64)}`,
  }));

  const absolutePath = resolveTaskRunnerPaths({
    git_root: opts.root,
    workflow_dir: workflowDir,
    task_id: opts.task.id,
    run_id: runId,
  }).receipt_path;
  const receiptPath = path.relative(opts.root, absolutePath).split(path.sep).join("/");
  const text = `${JSON.stringify(receipt, null, 2)}\n`;
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, text, "utf8");
  const reference = {
    path: receiptPath,
    sha256: `sha256:${createHash("sha256").update(text).digest("hex")}`,
    verification_state: receipt.success_policy.outcome,
    observed_by: "agentplane" as const,
  };
  opts.task.runner = {
    ...(opts.task.runner ?? {}),
    run_id: runId,
    execution_receipt: reference,
  };
  return { path: receiptPath, text, receipt };
}
