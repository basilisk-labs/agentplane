import { describe, expect, it } from "vitest";

import type { RunnerContextBundle } from "./types.js";
import { preparedRunnerExecutionConfigProjection } from "./state-fingerprint-authority.js";
import { bundle, context, task } from "./state-fingerprint.testkit.js";

describe("runner authority fingerprint legacy route projections", () => {
  it("records an omitted legacy route workspace as explicit unknown authority evidence", () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);

    expect(
      preparedRunnerExecutionConfigProjection(runnerBundle, context(taskData).config),
    ).toMatchObject({
      route_evidence: {
        agent_contract: { workspace: null },
      },
    });
  });

  it("records a partial legacy PR flow without assuming its branch projection", () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    runnerBundle.route_decision = { prFlow: {} } as RunnerContextBundle["route_decision"];

    expect(
      preparedRunnerExecutionConfigProjection(runnerBundle, context(taskData).config),
    ).toMatchObject({
      route_evidence: {
        pr_flow: { branch: null },
      },
    });
  });
});
