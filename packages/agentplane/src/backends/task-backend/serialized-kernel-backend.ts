import path from "node:path";
import { taskKernel, withTaskReadmeTransaction } from "@agentplaneorg/core/tasks";
import type { TaskRecordSerialization } from "../../ports/task-record-serialization.js";
import type { TaskBackend } from "../task-backend.js";

/** Local processes share the existing fenced file-transaction primitive under one storage-owned root. */
export class LocalTaskRecordSerialization implements TaskRecordSerialization {
  constructor(readonly lockRoot: string) {}

  run<T>(taskId: string, operation: () => Promise<T>): Promise<T> {
    const key = taskKernel.kernelDigest(taskId).slice("sha256:".length);
    return withTaskReadmeTransaction(path.join(this.lockRoot, key, "record"), operation);
  }
}

/** A narrow kernel backend. All writers must use this wrapper and its shared storage-owned fence. */
export function serializedKernelBackend(
  backend: TaskBackend,
  serialization: TaskRecordSerialization,
): TaskBackend {
  if (
    !backend.capabilities.supports_task_revisions ||
    backend.capabilities.atomic_task_record !== true
  )
    throw new Error(
      "Serialized kernel persistence requires revisions and atomic whole-record writes.",
    );
  return {
    id: `${backend.id}:serialized`,
    get capabilities() {
      return { ...backend.capabilities, supports_revision_guarded_writes: true };
    },
    listTasks: () => backend.listTasks(),
    getTask: (taskId) => backend.getTask(taskId),
    writeTask: (task, options) =>
      serialization.run(task.id, async () => {
        if (
          !backend.capabilities.supports_task_revisions ||
          backend.capabilities.atomic_task_record !== true
        )
          throw new Error("Serialized kernel persistence capability changed.");
        const expected = options?.expectedRevision;
        if (!Number.isSafeInteger(expected) || expected! < 0)
          throw new Error("Serialized kernel write requires an explicit expected revision.");
        const current = await backend.getTask(task.id);
        if ((current?.revision ?? 0) !== expected)
          throw new Error("Serialized kernel revision conflict.");
        if (task.revision !== expected! + 1)
          throw new Error("Serialized kernel output revision is not the next revision.");
        await backend.writeTask(task);
      }),
  };
}
