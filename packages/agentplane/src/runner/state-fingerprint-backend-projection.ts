import { createHash } from "node:crypto";
import path from "node:path";

import type { StateFingerprintComponentInput } from "@agentplaneorg/core/schemas";

import type { TaskBackendProjectionObservation } from "../backends/task-backend.js";
import { isStale } from "../backends/task-backend/cloud-backend-utils.js";
import type { CommandContext } from "../commands/shared/task-backend.js";
import { readContainedStableTextNoFollow } from "../shared/contained-stable-file.js";

const BACKEND_CONFIG_MAX_BYTES = 1024 * 1024;
const BACKEND_STATE_MAX_BYTES = 1024 * 1024;
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
  return relativeRepositoryPath(ctx, ctx.backendConfigPath);
}

function relativeRepositoryPath(ctx: CommandContext, filePath: string): string {
  return path.relative(ctx.resolvedProject.gitRoot, filePath).split(path.sep).join("/");
}

function remapRepositoryPath(
  ctx: CommandContext,
  filePath: string,
  repositoryRoot: string,
): { filePath: string; relativePath: string } | null {
  const relativePath = relativeRepositoryPath(ctx, filePath);
  if (
    relativePath === "" ||
    relativePath === ".." ||
    relativePath.startsWith("../") ||
    path.posix.isAbsolute(relativePath)
  ) {
    return null;
  }
  return {
    filePath: path.join(repositoryRoot, ...relativePath.split("/")),
    relativePath,
  };
}

function runtimeBackendStatePath(ctx: CommandContext): string | null {
  const backend = ctx.taskBackend as CommandContext["taskBackend"] & { statePath?: unknown };
  return typeof backend.statePath === "string" && backend.statePath.trim().length > 0
    ? path.resolve(backend.statePath)
    : null;
}

async function observeBackendConfig(
  ctx: CommandContext,
  repositoryRoot: string,
): Promise<
  | { state: "present"; sha256: string }
  | { state: "missing"; reason_code: "backend_config_defaulted" }
  | { state: "unavailable"; reason_code: "backend_config_unreadable" }
> {
  const observed = remapRepositoryPath(ctx, ctx.backendConfigPath, repositoryRoot);
  if (!observed) {
    return { state: "unavailable", reason_code: "backend_config_unreadable" };
  }
  try {
    return {
      state: "present",
      sha256: digestText(
        await readContainedStableTextNoFollow({
          repository_root: repositoryRoot,
          file_path: observed.filePath,
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

async function observeBackendState(
  ctx: CommandContext,
  repositoryRoot: string,
): Promise<
  | { state: "present"; path: string; sha256: string }
  | { state: "missing"; path: string | null; reason_code: string }
  | { state: "unavailable"; path: string; reason_code: "backend_state_unreadable" }
> {
  const statePath = runtimeBackendStatePath(ctx);
  if (!statePath) {
    return {
      state: "missing",
      path: null,
      reason_code: "backend_state_not_applicable",
    };
  }
  const observed = remapRepositoryPath(ctx, statePath, repositoryRoot);
  const relativePath = observed?.relativePath ?? relativeRepositoryPath(ctx, statePath);
  if (!observed) {
    return {
      state: "unavailable",
      path: relativePath,
      reason_code: "backend_state_unreadable",
    };
  }
  try {
    return {
      state: "present",
      path: relativePath,
      sha256: digestText(
        await readContainedStableTextNoFollow({
          repository_root: repositoryRoot,
          file_path: observed.filePath,
          label: "task backend projection state",
          max_bytes: BACKEND_STATE_MAX_BYTES,
        }),
      ),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") {
      return {
        state: "missing",
        path: relativePath,
        reason_code: "backend_state_missing",
      };
    }
    return {
      state: "unavailable",
      path: relativePath,
      reason_code: "backend_state_unreadable",
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
  opts?: { projection?: TaskBackendProjectionObservation; repository_root?: string },
): Promise<StateFingerprintComponentInput> {
  const repositoryRoot = path.resolve(opts?.repository_root ?? ctx.resolvedProject.gitRoot);
  const [config, backendState] = await Promise.all([
    observeBackendConfig(ctx, repositoryRoot),
    observeBackendState(ctx, repositoryRoot),
  ]);
  if (config.state === "unavailable") {
    return unavailableComponent(config.reason_code);
  }
  if (backendState.state === "unavailable") {
    return unavailableComponent(backendState.reason_code, {
      backend_state_path: backendState.path,
    });
  }
  let projection: TaskBackendProjectionObservation | null = null;
  if (ctx.taskBackend.capabilities.canonical_source === "remote") {
    if (!opts?.projection && !ctx.taskBackend.observeProjection) {
      return unavailableComponent("backend_projection_freshness_unavailable");
    }
    try {
      projection = opts?.projection ?? (await ctx.taskBackend.observeProjection?.()) ?? null;
      if (!projection) {
        return unavailableComponent("backend_projection_freshness_unavailable");
      }
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
      backend_state_path: backendState.path,
      backend_state: backendState,
      capabilities: ctx.taskBackend.capabilities ?? null,
      projection_revision: projection?.projection_revision ?? null,
      projection_freshness: projection?.projection_freshness ?? null,
      remote_projection: projection?.remote_projection ?? null,
    },
  };
}
