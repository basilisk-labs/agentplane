import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { LocalBackend, type TaskBackend, type TaskData } from "../../backends/task-backend.js";
import {
  LocalTaskRecordSerialization,
  serializedKernelBackend,
} from "../../backends/task-backend/serialized-kernel-backend.js";

export const replayBackendKinds = ["local", "serialized-direct", "cloud-fake"] as const;
export type ReplayBackendKind = (typeof replayBackendKinds)[number];

/** Test/capture storage only. The caller owns cleanup of every returned local root. */
export async function kernelReplayStorage(kind: ReplayBackendKind, roots: string[]) {
  if (kind !== "cloud-fake") {
    const dir = await mkdtemp(path.join(os.tmpdir(), "kernel-replay-"));
    roots.push(dir);
    const client = () => {
      const backend = new LocalBackend({ dir });
      if (kind === "local") return backend;
      Object.defineProperty(backend, "capabilities", {
        value: { ...backend.capabilities, supports_revision_guarded_writes: false },
      });
      return serializedKernelBackend(
        backend,
        new LocalTaskRecordSerialization(path.join(dir, ".serialization")),
      );
    };
    return { backend: client(), restart: client };
  }
  let saved: TaskData | null = null;
  function client(): TaskBackend {
    const base = makeTaskBackendDouble();
    return makeTaskBackendDouble({
      id: "cloud-fake",
      capabilities: { ...base.capabilities, canonical_source: "remote", atomic_task_record: true },
      getTask: () => Promise.resolve(structuredClone(saved)),
      writeTask: (next, options) => {
        if ((saved?.revision ?? 0) !== options?.expectedRevision)
          return Promise.reject(new Error("CAS conflict"));
        saved = structuredClone(next);
        return Promise.resolve();
      },
    });
  }
  return { backend: client(), restart: client };
}
