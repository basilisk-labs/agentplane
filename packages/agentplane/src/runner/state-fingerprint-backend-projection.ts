import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import type { TaskBackendProjectionObservation } from "../backends/task-backend.js";
import { isStale } from "../backends/task-backend/cloud-backend-utils.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";

const BACKEND_CONFIG_MAX_BYTES = 1024 * 1024;
const PROJECTION_CLOCK_SKEW_TOLERANCE_MS = 60_000;
const SHA256_DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/u;

type ObservedProjectionFreshness = TaskBackendProjectionObservation["projection_freshness"] & {
  stale: boolean;
};

type ObservedProjection = TaskBackendProjectionObservation & {
  projection_freshness: ObservedProjectionFreshness;
};

function digestText(text: string): string {
  return `sha256:${createHash("sha256").update(text, "utf8").digest("hex")}`;
}

function unavailableComponent(
  reason_code: string,
  evidence?: unknown,
): StateFingerprintComponentInput {
  return {
    state: "unavailable",
    source: "task_backend_runtime",
    reason_code,
    ...(evidence === undefined ? {} : { evidence }),
  };
}

function relativeConfigPath(ctx: CommandContext): string {
  return path
    .relative(ctx.resolvedProject.gitRoot, ctx.backendConfigPath)
    .split(path.sep)
    .join("/");
}

async function observeBackendConfig(
  ctx: CommandContext,
): Promise<
  | { state: "present"; sha256: string }
  | { state: "missing"; reason_code: "backend_config_defaulted" }
  | { state: "unavailable"; reason_code: "backend_config_unreadable" }
> {
  try {
    return {
      state: "present",
      sha256: digestText(
        await readContainedStableTextNoFollow({
          repository_root: ctx.resolvedProject.gitRoot,
          file_path: ctx.backendConfigPath,
          label: "task backend configuration",
          max_bytes: BACKEND_CONFIG_MAX_BYTES,
        }),
      ),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return {
        state: "missing",
        reason_code: "backend_config_defaulted",
      };
    }
    return {
      state: "unavailable",
      reason_code: "backend_config_unreadable",
    };
  }
}

function resolveBackendProjectionFreshness(observation: TaskBackendProjectionObservation):
  | {
      state: "fresh";
      value: ObservedProjection & {
        projection_freshness: ObservedProjectionFreshness & {
          stale: false;
        };
      };
    }
  | {
      state: "unavailable";
      reason_code:
        | "backend_projection_identity_mismatch"
        | "backend_projection_identity_unavailable"
        | "backend_projection_freshness_unavailable"
        | "backend_projection_pending_push"
        | "backend_projection_stale";
      evidence: ObservedProjection;
    } {
  const lastCheckedAt = observation.projection_freshness.last_checked_at;
  const staleAfterSeconds = observation.projection_freshness.stale_after_seconds;
  const checkedAt = lastCheckedAt ? Date.parse(lastCheckedAt) : Number.NaN;
  const nowMs = Date.now();
  const ageMs = nowMs - checkedAt;
  const bounded =
    Number.isFinite(checkedAt) &&
    Number.isSafeInteger(staleAfterSeconds) &&
    (staleAfterSeconds ?? 0) > 0 &&
    ageMs >= -PROJECTION_CLOCK_SKEW_TOLERANCE_MS;
  const stale = !bounded || isStale(lastCheckedAt, staleAfterSeconds, nowMs);
  const evidence = {
    ...observation,
    projection_freshness: {
      ...observation.projection_freshness,
      stale,
    },
  };
  const remoteProjection = observation.remote_projection;
  if (
    !remoteProjection ||
    !SHA256_DIGEST_PATTERN.test(remoteProjection.identity_sha256) ||
    !remoteProjection.checkpoint_identity_sha256 ||
    !SHA256_DIGEST_PATTERN.test(remoteProjection.checkpoint_identity_sha256)
  ) {
    return {
      state: "unavailable",
      reason_code: "backend_projection_identity_unavailable",
      evidence,
    };
  }
  if (remoteProjection.identity_sha256 !== remoteProjection.checkpoint_identity_sha256) {
    return {
      state: "unavailable",
      reason_code: "backend_projection_identity_mismatch",
      evidence,
    };
  }
  if (observation.projection_freshness.pending_push) {
    return {
      state: "unavailable",
      reason_code: "backend_projection_pending_push",
      evidence,
    };
  }
  if (!bounded) {
    return {
      state: "unavailable",
      reason_code: "backend_projection_freshness_unavailable",
      evidence,
    };
  }
  if (stale) {
    return {
      state: "unavailable",
      reason_code: "backend_projection_stale",
      evidence,
    };
  }
  return {
    state: "fresh",
    value: {
      ...observation,
      projection_freshness: {
        ...observation.projection_freshness,
        stale: false,
      },
    },
  };
}

export async function observeBackendProjection(
  ctx: CommandContext,
): Promise<StateFingerprintComponentInput> {
  const config = await observeBackendConfig(ctx);
  if (config.state === "unavailable") {
    return unavailableComponent(config.reason_code);
  }
  let projection: TaskBackendProjectionObservation | null = null;
  if (ctx.taskBackend.capabilities.canonical_source === "remote") {
    if (!ctx.taskBackend.observeProjection) {
      return unavailableComponent("backend_projection_freshness_unavailable");
    }
    try {
      projection = await ctx.taskBackend.observeProjection();
      const freshness = resolveBackendProjectionFreshness(projection);
      if (freshness.state === "unavailable") {
        return unavailableComponent(freshness.reason_code, freshness.evidence);
      }
      projection = freshness.value;
    } catch {
      return unavailableComponent("backend_projection_observation_unavailable");
    }
  }
  return {
    state: "present",
    source: "task_backend_runtime",
    value: {
      backend_id: ctx.backendId,
      backend_config_path: relativeConfigPath(ctx),
      backend_config: config,
      capabilities: ctx.taskBackend.capabilities ?? null,
      projection_revision: projection?.projection_revision ?? null,
      projection_freshness: projection?.projection_freshness ?? null,
      remote_projection: projection?.remote_projection ?? null,
    },
  };
}
