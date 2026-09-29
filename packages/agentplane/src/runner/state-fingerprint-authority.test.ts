import { describe, expect, it } from "vitest";

import type { RunnerContextBundle } from "./types.js";
import { preparedRunnerExecutionConfigProjection } from "./state-fingerprint-authority.js";
import { bundle, context, task } from "./state-fingerprint.testkit.js";

describe("runner authority fingerprint native execution projections", () => {
  it("does not bind the retired legacy agent contract route", () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);

    expect(
      preparedRunnerExecutionConfigProjection(runnerBundle, context(taskData).config),
    ).not.toHaveProperty("route_evidence");
  });

  it("does not bind a partial legacy PR flow", () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    runnerBundle.route_decision = { prFlow: {} } as RunnerContextBundle["route_decision"];

    expect(
      preparedRunnerExecutionConfigProjection(runnerBundle, context(taskData).config),
    ).not.toHaveProperty("route_evidence");
  });
});
