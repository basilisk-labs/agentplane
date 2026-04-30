import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { consumeExecutionProfileBudget, resolveExecutionProfileRuntime } from "./index.js";

describe("runtime/execution-profile", () => {
  it("resolves budgets, governance, approvals, and runner policies from config", () => {
    const config = defaultConfig();
    const runtime = resolveExecutionProfileRuntime(config);

    expect(runtime).toMatchObject({
      profile: "balanced",
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
        require_force: false,
      },
    });
    expect(runtime.stop_conditions.length).toBeGreaterThan(0);
    expect(runtime.handoff_conditions.length).toBeGreaterThan(0);
    expect(runtime.runner.trace_policy.retention).toBe("keep");
  });

  it("applies conservative profile overrides to approvals and runner trace/timeout policies", () => {
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

    expect(runtime.reasoning_effort).toBe("xhigh");
    expect(runtime.text_verbosity).toBe("high");
    expect(runtime.approvals.require_network).toBe(true);
    expect(runtime.approvals.require_force).toBe(true);
    expect(runtime.runner.trace_policy.capture_stderr).toBe(true);
    expect(runtime.runner.trace_policy.retention).toBe("keep");
    expect(runtime.runner.timeout_policy.terminate_grace_ms).toBe(5000);
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
