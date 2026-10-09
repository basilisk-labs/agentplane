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
  const match = /(?:^|\s)--max-old-space-size(?:=|\s+)(\d+)(?=\s|$)/u.exec(nodeOptions);
  return match ? positiveInteger(match[1], "NODE_OPTIONS heap limit") : null;
}

export function resolveFullCiResourceProfile(
  env = process.env,
  capacityBytes = memoryCapacityBytes(),
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
    outer_timeout_source: outerTimeoutMs
      ? env.AGENTPLANE_NATIVE_CHECK_TIMEOUT_SOURCE || "AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS"
      : "not_applicable",
    limiting_deadline:
      outerTimeoutMs === null || groupTimeoutMs < outerTimeoutMs
        ? "local_group"
        : outerTimeoutMs < groupTimeoutMs
          ? "native_check"
          : "both",
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

export function lintNodeOptions(env, profile) {
  const current = String(env.NODE_OPTIONS ?? "").trim();
  return nodeHeapLimitMb(current)
    ? current
    : `${current} --max-old-space-size=${profile.lint_heap_mb}`.trim();
}
