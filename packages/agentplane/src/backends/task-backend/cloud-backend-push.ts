import { createHash, randomUUID } from "node:crypto";
import { isDeepStrictEqual } from "node:util";

import { isRecord } from "../../shared/guards.js";
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
  compareCodeUnits,
  isCloudRetriableError,
  splitTasksByPayloadBytes,
  type CloudSyncResponse,
} from "./cloud-backend-utils.js";

export type CloudPushReceipt = {
  requestId: string;
  projectionSha256: string;
  taskCount: number;
  projectId: string;
  provider: string | null;
  batchId: string | null;
};

export type CloudPushResult = {
  response: CloudSyncResponse;
  receipt: CloudPushReceipt;
};

export async function requestCloudPush(opts: {
  provider: string | null;
  projectId: string;
  localTasks: TaskData[];
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  quiet: boolean;
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
}): Promise<CloudPushResult> {
  const requestId = `push_${randomUUID()}`;
  const projectionSha256 = cloudTaskProjectionSha256(opts.localTasks);
  const projection = {
    request_id: requestId,
    projection_sha256: projectionSha256,
    task_count: opts.localTasks.length,
    project_id: opts.projectId,
    provider: opts.provider,
  };
  const directBody = JSON.stringify({
    provider: opts.provider,
    project_id: opts.projectId,
    direction: "push",
    conflict: opts.conflict,
    projection,
    tasks: opts.localTasks,
  });
  if (Buffer.byteLength(directBody, "utf8") <= CLOUD_PUSH_DIRECT_BODY_LIMIT_BYTES) {
    const response = await opts.request<CloudSyncResponse>(
      `/v1/projects/${encodeURIComponent(opts.projectId)}/sync/push`,
      { method: "POST", body: directBody },
      { timeoutMs: CLOUD_REQUEST_TIMEOUT_MS },
    );
    return {
      response,
      receipt: {
        requestId,
        projectionSha256,
        taskCount: opts.localTasks.length,
        projectId: opts.projectId,
        provider: opts.provider,
        batchId: null,
      },
    };
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
      projection,
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
    if (
      index === chunks.length - 1 &&
      (!cloudPushBatchFinalized(lastResponse) || readCloudPushBatchId(lastResponse) !== batchId)
    ) {
      throw new BackendError(
        [
          "Cloud backend batch push did not finalize.",
          "Why: the service did not confirm the exact batch id after receiving every expected chunk.",
          "Fix: retry the cloud push; chunks are idempotent for one batch id during the run.",
          "Safe command: agentplane backend sync cloud --direction push --yes",
          "Stop condition: stop if the service repeatedly reports an incomplete batch after all chunks are uploaded.",
        ].join("\n"),
        "E_BACKEND",
      );
    }
  }
  if (!lastResponse) {
    throw new BackendError(
      "Cloud backend batch push produced no persistence acknowledgement.",
      "E_BACKEND",
      { reasonCode: "cloud_push_ack_invalid" },
    );
  }
  return {
    response: lastResponse,
    receipt: {
      requestId,
      projectionSha256,
      taskCount: opts.localTasks.length,
      projectId: opts.projectId,
      provider: opts.provider,
      batchId,
    },
  };
}

async function requestCloudPushBatchChunk(opts: {
  request: <T>(pathname: string, init: RequestInit, opts?: { timeoutMs?: number }) => Promise<T>;
  provider: string | null;
  projectId: string;
  batchId: string;
  projection: {
    request_id: string;
    projection_sha256: string;
    task_count: number;
    project_id: string;
    provider: string | null;
  };
  chunkIndex: number;
  totalChunks: number;
  totalTasks: number;
  tasks: TaskData[];
  conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
  quiet: boolean;
}): Promise<CloudSyncResponse> {
  const body = JSON.stringify({
    provider: opts.provider,
    project_id: opts.projectId,
    direction: "push",
    conflict: opts.conflict,
    projection: opts.projection,
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

export function assertCloudPushAcknowledged(
  response: CloudSyncResponse,
  receipt: CloudPushReceipt,
): void {
  if (response.data !== undefined && !isRecord(response.data)) {
    throw invalidCloudPushAcknowledgementError();
  }
  const data = isRecord(response.data) ? response.data : {};
  const dataAcknowledgement = readOptionalCloudPushAcknowledgement(data.projection_ack);
  const responseAcknowledgement = readOptionalCloudPushAcknowledgement(response.projection_ack);
  if (
    dataAcknowledgement &&
    responseAcknowledgement &&
    !isDeepStrictEqual(dataAcknowledgement, responseAcknowledgement)
  ) {
    throw invalidCloudPushAcknowledgementError();
  }
  const acknowledgement = dataAcknowledgement ?? responseAcknowledgement;
  const status = acknowledgement?.status;
  const acceptedStatus = status === "persisted" || status === "unchanged";
  const matches =
    acceptedStatus &&
    acknowledgement?.request_id === receipt.requestId &&
    acknowledgement?.projection_sha256 === receipt.projectionSha256 &&
    acknowledgement?.task_count === receipt.taskCount &&
    acknowledgement?.project_id === receipt.projectId &&
    acknowledgement?.provider === receipt.provider &&
    (receipt.batchId === null
      ? acknowledgement?.batch_id === null || acknowledgement?.batch_id === undefined
      : acknowledgement?.batch_id === receipt.batchId);
  if (matches) return;
  throw invalidCloudPushAcknowledgementError();
}

function readOptionalCloudPushAcknowledgement(input: unknown): Record<string, unknown> | null {
  if (input === undefined) return null;
  if (isRecord(input)) return input;
  throw invalidCloudPushAcknowledgementError();
}

function invalidCloudPushAcknowledgementError(): BackendError {
  return new BackendError(
    [
      "Cloud push response did not acknowledge the submitted projection.",
      "Why: HTTP success was not correlated to the exact request id, projection digest, task count, project, provider, and batch.",
      "Fix: retry only after the cloud service returns a matching data.projection_ack receipt with status persisted or unchanged.",
      "Safe command: agentplane backend inspect cloud --yes",
      "Stop condition: do not clear local dirty or pending state from an uncorrelated response.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_push_ack_invalid" },
  );
}

export function cloudTaskProjectionSha256(tasks: TaskData[]): string {
  const canonical = tasks
    .toSorted((left, right) => compareCodeUnits(left.id, right.id))
    .map((task) => sortJson(task));
  return `sha256:${createHash("sha256").update(JSON.stringify(canonical)).digest("hex")}`;
}

function readCloudPushBatchId(response: CloudSyncResponse): string | null {
  const data = isRecord(response.data) ? response.data : {};
  const batch = isRecord(data.batch) ? data.batch : null;
  return typeof batch?.id === "string" ? batch.id : null;
}

function sortJson(input: unknown): unknown {
  if (Array.isArray(input)) return input.map((item) => sortJson(item));
  if (!isRecord(input)) return input;
  return Object.fromEntries(
    Object.entries(input)
      .toSorted(([left], [right]) => compareCodeUnits(left, right))
      .map(([key, value]) => [key, sortJson(value)]),
  );
}
