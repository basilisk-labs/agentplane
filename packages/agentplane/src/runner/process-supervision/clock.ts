type SupervisionClockDiagnostic = {
  logical_time_source: "monotonic_projection";
  wall_clock_regression_count: number;
  maximum_wall_clock_regression_ms: number;
};

export type SupervisionClock = {
  nowIso: () => string;
  monotonicNowMs: () => number;
  advanceToIso: (timestamp: string) => void;
  diagnostic: () => SupervisionClockDiagnostic | null;
};

export function monotonicNowMs(): number {
  return Number(process.hrtime.bigint()) / 1_000_000;
}

export function createSupervisionClock(
  opts: {
    wall_now_ms?: () => number;
    monotonic_now_ms?: () => number;
  } = {},
): SupervisionClock {
  const wallNowMs = opts.wall_now_ms ?? Date.now;
  const readMonotonicNowMs = opts.monotonic_now_ms ?? monotonicNowMs;
  const anchorWallMs = wallNowMs();
  const anchorMonotonicMs = readMonotonicNowMs();
  let previousWallMs = anchorWallMs;
  let lastMonotonicMs = anchorMonotonicMs;
  let logicalFloorMs = anchorWallMs;
  let lastLogicalMs = anchorWallMs;
  let wallClockRegressionCount = 0;
  let maximumWallClockRegressionMs = 0;

  const nowIso = (): string => {
    const observedWallMs = wallNowMs();
    const observedMonotonicMs = readMonotonicNowMs();
    if (observedWallMs < previousWallMs) {
      wallClockRegressionCount += 1;
      maximumWallClockRegressionMs = Math.max(
        maximumWallClockRegressionMs,
        previousWallMs - observedWallMs,
      );
    }
    previousWallMs = observedWallMs;
    const monotonicElapsedMs = Math.max(0, observedMonotonicMs - lastMonotonicMs);
    lastMonotonicMs = Math.max(lastMonotonicMs, observedMonotonicMs);
    lastLogicalMs = Math.max(logicalFloorMs, lastLogicalMs + monotonicElapsedMs);
    return new Date(Math.floor(lastLogicalMs)).toISOString();
  };

  return {
    nowIso,
    monotonicNowMs: readMonotonicNowMs,
    advanceToIso(timestamp) {
      const parsed = Date.parse(timestamp);
      if (!Number.isNaN(parsed)) {
        logicalFloorMs = Math.max(logicalFloorMs, parsed);
        lastLogicalMs = Math.max(lastLogicalMs, logicalFloorMs);
      }
    },
    diagnostic() {
      if (wallClockRegressionCount === 0) return null;
      return {
        logical_time_source: "monotonic_projection",
        wall_clock_regression_count: wallClockRegressionCount,
        maximum_wall_clock_regression_ms: Math.round(maximumWallClockRegressionMs),
      };
    },
  };
}
