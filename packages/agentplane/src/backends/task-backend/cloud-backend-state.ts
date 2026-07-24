import { readFile } from "node:fs/promises";
import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";

const CLOUD_BACKEND_STATE_MAX_BYTES = 64 * 1024;

export type CloudBackendPendingPush = {
  failed_at: string;
  reason: string;
};

export type CloudBackendState = {
  last_checked_at: string | null;
  last_start_ready_pull_at: string | null;
  pending_push: CloudBackendPendingPush | null;
};

function emptyCloudBackendState(): CloudBackendState {
  return { last_checked_at: null, last_start_ready_pull_at: null, pending_push: null };
}

function parseCloudBackendState(raw: unknown): CloudBackendState {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    const state = raw as {
      last_checked_at?: unknown;
      last_start_ready_pull_at?: unknown;
      pending_push?: unknown;
    };
    return {
      last_checked_at: typeof state.last_checked_at === "string" ? state.last_checked_at : null,
      last_start_ready_pull_at:
        typeof state.last_start_ready_pull_at === "string" ? state.last_start_ready_pull_at : null,
      pending_push: readPendingPush(state.pending_push),
    };
  }
  return emptyCloudBackendState();
}

export async function readCloudBackendState(statePath: string): Promise<CloudBackendState> {
  try {
    return parseCloudBackendState(JSON.parse(await readFile(statePath, "utf8")) as unknown);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT" && !(err instanceof SyntaxError)) throw err;
  }
  return emptyCloudBackendState();
}

export async function observeContainedCloudBackendState(opts: {
  repositoryRoot: string;
  statePath: string;
}): Promise<CloudBackendState> {
  try {
    return parseCloudBackendState(
      JSON.parse(
        await readContainedStableTextNoFollow({
          repository_root: opts.repositoryRoot,
          file_path: opts.statePath,
          label: "cloud backend projection state",
          max_bytes: CLOUD_BACKEND_STATE_MAX_BYTES,
        }),
      ) as unknown,
    );
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code !== "ENOENT" && !(err instanceof SyntaxError)) throw err;
  }
  return emptyCloudBackendState();
}

export async function writeCloudBackendState(
  statePath: string,
  state: CloudBackendState,
): Promise<void> {
  await atomicWriteFile(statePath, `${JSON.stringify(state, null, 2)}\n`, "utf8");
}

function readPendingPush(input: unknown): CloudBackendPendingPush | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const pending = input as { failed_at?: unknown; reason?: unknown };
  if (typeof pending.failed_at !== "string" || typeof pending.reason !== "string") return null;
  return {
    failed_at: pending.failed_at,
    reason: pending.reason,
  };
}
