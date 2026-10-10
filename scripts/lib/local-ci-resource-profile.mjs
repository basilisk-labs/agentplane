import os from "node:os";

const MIB = 1024 * 1024;
const DEFAULT_FULL_GROUP_TIMEOUT_MS = 60 * 60_000;
const DEFAULT_LINT_HEAP_MB = 4096;
const LINT_OVERHEAD_MB = 1536;

function positiveInteger(raw, name, fallback = null) {
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}

function memoryCapacityBytes() {
  const constrained = process.constrainedMemory?.();
  return constrained && Number.isSafeInteger(constrained) && constrained > 0
    ? Math.min(os.totalmem(), constrained)
    : os.totalmem();
}

function nodeHeapLimitMb(nodeOptions) {
  const marker = /--max[-_]old[-_]space[-_]size/gu;
  const valid = /(?:^|[\s"'])--max[-_]old[-_]space[-_]size=(\d+)(?=$|[\s"'])/gu;
  const markers = [...nodeOptions.matchAll(marker)];
  const matches = [...nodeOptions.matchAll(valid)];
  if (markers.length !== matches.length) {
    throw new Error("NODE_OPTIONS contains an unsupported or ambiguous heap limit.");
  }
  const effective = matches.at(-1);
  return effective ? positiveInteger(effective[1], "NODE_OPTIONS heap limit") : null;
}

export function resolveFullCiResourceProfile(
  env = process.env,
  capacityBytes = memoryCapacityBytes(),
  nowMs = Date.now(),
) {
  const configuredGroupTimeout = positiveInteger(
    env.AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS,
    "AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS",
  );
  const groupTimeoutMs = configuredGroupTimeout ?? DEFAULT_FULL_GROUP_TIMEOUT_MS;
  const outerTimeoutMs = positiveInteger(
    env.AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS,
    "AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS",
  );
  const outerDeadlineEpochMs =
    positiveInteger(
      env.AGENTPLANE_NATIVE_CHECK_DEADLINE_EPOCH_MS,
      "AGENTPLANE_NATIVE_CHECK_DEADLINE_EPOCH_MS",
    ) ?? (outerTimeoutMs === null ? null : nowMs + outerTimeoutMs);
  const configuredHeap = positiveInteger(
    env.AGENTPLANE_LOCAL_LINT_HEAP_MB,
    "AGENTPLANE_LOCAL_LINT_HEAP_MB",
  );
  const inheritedHeap = nodeHeapLimitMb(env.NODE_OPTIONS ?? "");
  if (configuredHeap && inheritedHeap && configuredHeap !== inheritedHeap) {
    throw new Error("AGENTPLANE_LOCAL_LINT_HEAP_MB conflicts with NODE_OPTIONS heap limit.");
  }
  const lintHeapMb = configuredHeap ?? inheritedHeap ?? DEFAULT_LINT_HEAP_MB;
  const capacityMb = Math.floor(capacityBytes / MIB);
  const minimumMemoryMb = lintHeapMb + LINT_OVERHEAD_MB;
  if (capacityMb < minimumMemoryMb) {
    throw new Error(
      `Full CI lint requires at least ${minimumMemoryMb} MiB memory for its ${lintHeapMb} MiB heap; detected ${capacityMb} MiB. Set AGENTPLANE_LOCAL_LINT_HEAP_MB or NODE_OPTIONS to a supported smaller budget, or use a larger host.`,
    );
  }
  return {
    schema_version: 1,
    kind: "full_ci_resource_profile",
    group_timeout_ms: groupTimeoutMs,
    group_timeout_source: configuredGroupTimeout
      ? "AGENTPLANE_LOCAL_VITEST_SUITE_TIMEOUT_MS"
      : "default",
    outer_timeout_ms: outerTimeoutMs,
    outer_deadline_epoch_ms: outerDeadlineEpochMs,
    observed_at_epoch_ms: nowMs,
    outer_timeout_source: outerTimeoutMs
      ? env.AGENTPLANE_NATIVE_CHECK_TIMEOUT_SOURCE || "AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS"
      : "not_applicable",
    limiting_deadline: limitingDeadline(
      groupTimeoutMs,
      outerDeadlineEpochMs === null ? null : Math.max(0, outerDeadlineEpochMs - nowMs),
    ),
    lint_heap_mb: lintHeapMb,
    lint_heap_source: configuredHeap
      ? "AGENTPLANE_LOCAL_LINT_HEAP_MB"
      : inheritedHeap
        ? "NODE_OPTIONS"
        : "default",
    memory_capacity_mb: capacityMb,
    minimum_memory_mb: minimumMemoryMb,
  };
}

function limitingDeadline(groupTimeoutMs, outerRemainingMs) {
  if (outerRemainingMs === null || groupTimeoutMs < outerRemainingMs) return "local_group";
  return outerRemainingMs < groupTimeoutMs ? "native_check" : "both";
}

export function describeFullCiGroupLaunch(profile, groupIds, nowMs = Date.now()) {
  const outerRemainingMs =
    profile.outer_deadline_epoch_ms === null
      ? null
      : Math.max(0, profile.outer_deadline_epoch_ms - nowMs);
  return {
    schema_version: 1,
    kind: "full_ci_group_launch",
    groups: [...groupIds],
    group_timeout_ms: profile.group_timeout_ms,
    group_timeout_source: profile.group_timeout_source,
    outer_remaining_ms: outerRemainingMs,
    outer_timeout_source: profile.outer_timeout_source,
    limiting_deadline: limitingDeadline(profile.group_timeout_ms, outerRemainingMs),
  };
}

export function lintNodeOptions(env, profile) {
  const current = String(env.NODE_OPTIONS ?? "").trim();
  return nodeHeapLimitMb(current)
    ? current
    : `${current} --max-old-space-size=${profile.lint_heap_mb}`.trim();
}
