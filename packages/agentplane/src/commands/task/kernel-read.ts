import type { taskKernel } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import {
  readKernelRecord,
  TASK_KERNEL_EXTENSION,
  type KernelRead,
} from "../../adapters/task-backend/kernel-record.js";
import { projectKernelTask } from "../../adapters/task-backend/kernel-projector.js";
import { readKernelNextAction } from "../../adapters/task-backend/kernel-next-action.js";
import { createCliEmitter } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

/** Inspect canonical bytes once. Legacy inspection never becomes an implicit migration. */
export async function readTaskKernel(
  ctx: CommandContext,
  taskId: string,
  suppliedTask?: TaskData,
): Promise<KernelRead> {
  let task: TaskData;
  try {
    task = suppliedTask ?? (await loadTaskFromContext({ ctx, taskId }));
  } catch (error) {
    if (error instanceof CliError && error.code === "E_IO" && error.message.startsWith("ENOENT:")) {
      return { kind: "missing" };
    }
    throw error;
  }
  if (!Object.hasOwn(task.extensions ?? {}, TASK_KERNEL_EXTENSION)) {
    return { kind: "legacy_unmigrated", task };
  }
  const identity = await resolveLogicalRepositoryIdentity({
    git_root: ctx.resolvedProject.gitRoot,
    task: {},
    create_if_missing: false,
  });
  return readKernelRecord(task, identity as taskKernel.Sha256Digest);
}

export type CanonicalTaskRead = Exclude<KernelRead, { kind: "legacy_unmigrated" }>;

export function projectTaskKernelRead(read: CanonicalTaskRead, taskId: string) {
  // Read projections cannot invent a fresh implementation fingerprint or grant mutation authority.
  const next = readKernelNextAction(read, null);
  const ready = [
    "kernel_work_item_claim_required",
    "kernel_work_item_rework_claim_required",
  ].includes(next.reason_code);
  return {
    schema_version: 1,
    source: read.kind === "archived" ? "task_kernel_archive" : "task_kernel",
    record_kind: read.kind,
    task:
      read.kind === "canonical"
        ? {
            ...projectKernelTask(read.record.aggregate),
            title: read.task.title,
            owner: read.task.owner,
          }
        : { id: taskId, ...(read.kind === "archived" ? { title: read.task.title } : {}) },
    ready,
    next_action: { ...next, task_id: taskId, command: null },
    authority: { mutation: "read_only", grants_authority: false },
    ...(read.kind === "archived" ? { archive: read.archive } : {}),
    ...(read.kind === "malformed" ? { error: { reason: read.reason, fields: read.fields } } : {}),
  };
}

export function reportTaskKernelRead(
  read: CanonicalTaskRead,
  taskId: string,
  json: boolean,
): number {
  const view = projectTaskKernelRead(read, taskId);
  const output = createCliEmitter();
  if (json) output.json(view);
  else
    output.report([
      { label: "task", value: taskId },
      { label: "source", value: view.source },
      { label: "record", value: read.kind },
      ...(read.kind === "canonical"
        ? [{ label: "state", value: read.record.aggregate.state }]
        : []),
      { label: "ready", value: view.ready },
      { label: "next", value: view.next_action.reason_code },
      { label: "authority", value: "read_only" },
    ]);
  return read.kind === "missing" ? 4 : read.kind === "malformed" ? 3 : 0;
}
