import { describe, expect, it } from "vitest";

import {
  runnerAdapterCancelledResult,
  runnerAdapterFailureResult,
  runnerAdapterSuccessResult,
} from "./shared.js";

describe("runner adapter result timestamps", () => {
  it.each([
    ["success", runnerAdapterSuccessResult],
    ["failed", runnerAdapterFailureResult],
    ["cancelled", runnerAdapterCancelledResult],
  ] as const)("clamps %s results across wall-clock regression", (_label, buildResult) => {
    const startedAt = "2026-07-24T10:00:01.000Z";
    const endedAt = "2026-07-24T10:00:00.000Z";
    const common = {
      started_at: startedAt,
      ended_at: endedAt,
      output_paths: [],
    };
    const result =
      buildResult === runnerAdapterSuccessResult
        ? buildResult({ ...common, stdout_summary: "" })
        : buildResult === runnerAdapterFailureResult
          ? buildResult({ ...common, err: new Error("failed") })
          : buildResult({ ...common, reason: "cancelled" });

    expect(result.started_at).toBe(startedAt);
    expect(result.ended_at).toBe(startedAt);
  });
});
