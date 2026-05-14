import { randomUUID } from "node:crypto";

import type { TaskData } from "./shared.js";
import { BackendError } from "./shared.js";
import { sleep } from "./shared/concurrency.js";
import {
  CLOUD_PUSH_BATCH_RETRY_DELAYS_MS,
  CLOUD_PUSH_BATCH_REQUEST_TIMEOUT_MS,
  CLOUD_PUSH_BATCH_TASK_BYTES,
  CLOUD_REQUEST_TIMEOUT_MS,
  CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES,
  cloudPushBatchFinalized,
  isCloudRetriableError,
  splitTasksByPayloadBytes,
  type CloudSyncResponse,
} from "./cloud-backend-utils.js";

export async function requestCloudPush(opts: {
  provider: string | null;
  projectId: string;
  localTasks: TaskData[];
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  quiet: boolean;
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
}): Promise<CloudSyncResponse> {
  const directBody = JSON.stringify({
    provider: opts.provider,
    direction: "push",
    conflict: opts.conflict,
    tasks: opts.localTasks,
  });
  if (Buffer.byteLength(directBody, "utf8") <= CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES) {
    return await opts.request<CloudSyncResponse>(
      `/v1/projects/${encodeURIComponent(opts.projectId)}/sync/push`,
      { method: "POST", body: directBody },
      { timeoutMs: CLOUD_REQUEST_TIMEOUT_MS },
    );
  }

  const chunks = splitTasksByPayloadBytes(opts.localTasks, CLOUD_PUSH_BATCH_TASK_BYTES);
  const batchId = `batch_${Date.now()}_${randomUUID()}`;
  let lastResponse: CloudSyncResponse | null = null;
  for (const [index, tasks] of chunks.entries()) {
    lastResponse = await requestCloudPushBatchChunk({
      request: opts.request,
      provider: opts.provider,
      projectId: opts.projectId,
      batchId,
      chunkIndex: index,
      totalChunks: chunks.length,
      totalTasks: opts.localTasks.length,
      tasks,
      conflict: opts.conflict,
      quiet: opts.quiet,
    });
    if (!opts.quiet) {
      process.stderr.write(
        `cloud push uploaded batch ${index + 1}/${chunks.length} tasks=${tasks.length}\n`,
      );
    }
    if (index === chunks.length - 1 && !cloudPushBatchFinalized(lastResponse)) {
      throw new BackendError(
        [
          "Cloud backend batch push did not finalize.",
          "Why: the service did not confirm that every expected chunk was received before replacing the projection.",
          "Fix: retry the cloud push; chunks are idempotent for one batch id during the run.",
          "Safe command: agentplane backend sync cloud --direction push --yes",
          "Stop condition: stop if the service repeatedly reports an incomplete batch after all chunks are uploaded.",
        ].join("\n"),
        "E_BACKEND",
      );
    }
  }
  return lastResponse ?? { data: { last_checked_at: new Date().toISOString() } };
}

async function requestCloudPushBatchChunk(opts: {
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
  provider: string | null;
  projectId: string;
  batchId: string;
  chunkIndex: number;
  totalChunks: number;
  totalTasks: number;
  tasks: TaskData[];
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  quiet: boolean;
}): Promise<CloudSyncResponse> {
  const body = JSON.stringify({
    provider: opts.provider,
    direction: "push",
    conflict: opts.conflict,
    batch: {
      id: opts.batchId,
      total_batches: opts.totalChunks,
      total_tasks: opts.totalTasks,
      chunk_index: opts.chunkIndex,
      finalize: opts.chunkIndex === opts.totalChunks - 1,
    },
    tasks: opts.tasks,
  });
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await opts.request<CloudSyncResponse>(
        `/v1/projects/${encodeURIComponent(opts.projectId)}/sync/push-batch`,
        { method: "POST", body },
        { timeoutMs: CLOUD_PUSH_BATCH_REQUEST_TIMEOUT_MS },
      );
    } catch (error) {
      if (!isCloudRetriableError(error) || attempt >= CLOUD_PUSH_BATCH_RETRY_DELAYS_MS.length) {
        throw error;
      }
      const delayMs = CLOUD_PUSH_BATCH_RETRY_DELAYS_MS[attempt] ?? 0;
      if (!opts.quiet) {
        process.stderr.write(
          `cloud push retrying batch ${opts.chunkIndex + 1}/${opts.totalChunks} after transient error attempt=${attempt + 1}\n`,
        );
      }
      await sleep(delayMs);
    }
  }
}
