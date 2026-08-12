import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { consumeExecutionProfileBudget, resolveExecutionProfileRuntime } from "./index.js";

describe("runtime/execution-profile", () => {
  it("resolves budgets, governance, approvals, and runner policies from config", () => {
    const config = defaultConfig();
    const runtime = resolveExecutionProfileRuntime(config);

    expect(runtime).toMatchObject({
      profile: "standard",
      reasoning_effort: "medium",
      text_verbosity: "medium",
      budget: {
        discovery: { limit: 6, used: 0, remaining: 6, exhausted: false },
        implementation: { limit: 10, used: 0, remaining: 10, exhausted: false },
        verification: { limit: 6, used: 0, remaining: 6, exhausted: false },
      },
      approvals: {
        require_plan: true,
        require_network: true,
        require_verify: true,
        require_force: true,
      },
    });
    expect(runtime.stop_conditions.length).toBeGreaterThan(0);
    expect(runtime.handoff_conditions.length).toBeGreaterThan(0);
    expect(runtime.runner.trace_policy.retention).toBe("keep");
  });

  it("ignores mutable legacy execution fields while preserving explicit project policy", () => {
    const config = defaultConfig();
    config.execution.profile = "conservative";
    config.execution.reasoning_effort = "xhigh";
    config.execution.text_verbosity = "high";
    config.agents.approvals.require_network = false;
    config.agents.approvals.require_force = false;
    config.runner.trace.capture_stderr = false;
    config.runner.trace.retention = "remove_on_success";
    config.runner.timeouts.terminate_grace_ms = 1000;

    const runtime = resolveExecutionProfileRuntime(config);

    expect(runtime.profile).toBe("standard");
    expect(runtime.reasoning_effort).toBe("medium");
    expect(runtime.text_verbosity).toBe("medium");
    expect(runtime.approvals.require_network).toBe(false);
    expect(runtime.approvals.require_force).toBe(true);
    expect(runtime.runner.trace_policy.capture_stderr).toBe(false);
    expect(runtime.runner.trace_policy.retention).toBe("remove_on_success");
    expect(runtime.runner.timeout_policy.terminate_grace_ms).toBe(1000);
  });

  it("counts execution budgets per phase", () => {
    const runtime = resolveExecutionProfileRuntime(defaultConfig());
    const afterDiscovery = consumeExecutionProfileBudget({
      runtime,
      phase: "discovery",
      units: 2,
    });
    const afterImplementation = consumeExecutionProfileBudget({
      runtime: afterDiscovery,
      phase: "implementation",
      units: 11,
    });

    expect(afterDiscovery.budget.discovery).toMatchObject({
      used: 2,
      remaining: 4,
      exhausted: false,
    });
    expect(afterImplementation.budget.implementation).toMatchObject({
      used: 11,
      remaining: 0,
      exhausted: true,
    });
  });
});
