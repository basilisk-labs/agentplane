import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config.js";
import { buildExecutionProfile, resolveExecutionProfilePreset } from "./execution-profile.js";

describe("execution profile presets", () => {
  it("matches schema defaults for balanced profile", () => {
    const cfg = defaultConfig();
    const balanced = resolveExecutionProfilePreset("balanced");
    expect(balanced).toEqual(cfg.execution);
  });

  it("returns a deep clone on each call", () => {
    const a = resolveExecutionProfilePreset("conservative");
    const b = resolveExecutionProfilePreset("conservative");
    a.tool_budget.discovery = 999;
    a.stop_conditions[0] = "changed";
    expect(b.tool_budget.discovery).toBe(4);
    expect(b.stop_conditions[0]).not.toBe("changed");
  });

  it("provides lower reasoning effort and larger implementation budget for aggressive", () => {
    const aggressive = resolveExecutionProfilePreset("aggressive");
    const conservative = resolveExecutionProfilePreset("conservative");
    expect(aggressive.reasoning_effort).toBe("low");
    expect(aggressive.tool_budget.implementation).toBeGreaterThan(
      conservative.tool_budget.implementation,
    );
  });

  it("adds strict unsafe confirmation item when requested", () => {
    const strict = buildExecutionProfile("balanced", { strictUnsafeConfirm: true });
    expect(strict.unsafe_actions_requiring_explicit_user_ok).toContain(
      "Network actions when approvals are disabled.",
    );
  });
});
