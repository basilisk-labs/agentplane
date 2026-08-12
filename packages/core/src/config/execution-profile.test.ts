import { describe, expect, it } from "vitest";

import { defaultConfig } from "./config.js";
import {
  applyExecutionToApprovals,
  buildExecutionProfile,
  resolveExecutionProfilePreset,
} from "./execution-profile.js";

describe("execution profile presets", () => {
  it("matches schema defaults for the standard policy", () => {
    const cfg = defaultConfig();
    const standard = resolveExecutionProfilePreset("standard");
    expect(standard).toEqual(cfg.execution);
  });

  it("returns a deep clone on each call", () => {
    const a = resolveExecutionProfilePreset("conservative");
    const b = resolveExecutionProfilePreset("conservative");
    a.tool_budget.discovery = 999;
    a.stop_conditions[0] = "changed";
    expect(b.tool_budget.discovery).toBe(6);
    expect(b.stop_conditions[0]).not.toBe("changed");
  });

  it("normalizes every legacy name to the canonical policy", () => {
    const profiles = ["standard", "conservative", "balanced", "aggressive"] as const;
    const resolved = profiles.map((profile) => resolveExecutionProfilePreset(profile));

    expect(resolved[0]).toEqual(resolved[1]);
    expect(resolved[1]).toEqual(resolved[2]);
    expect(resolved[2]).toEqual(resolved[3]);
    expect(resolved.every((profile) => profile.profile === "standard")).toBe(true);
  });

  it("ignores legacy strict profile overrides", () => {
    const strict = buildExecutionProfile("standard", { strictUnsafeConfirm: true });
    expect(strict).toEqual(resolveExecutionProfilePreset("standard"));
  });

  it("keeps force approval fixed while preserving other explicit approvals", () => {
    const execution = resolveExecutionProfilePreset("conservative");
    const effective = applyExecutionToApprovals({
      execution,
      approvals: {
        require_plan: false,
        require_network: false,
        require_verify: false,
        require_force: false,
      },
    });
    expect(effective.require_network).toBe(false);
    expect(effective.require_force).toBe(true);
  });

  it("standard keeps baseline approval settings", () => {
    const execution = resolveExecutionProfilePreset("standard");
    const effective = applyExecutionToApprovals({
      execution,
      approvals: {
        require_plan: true,
        require_network: false,
        require_verify: true,
        require_force: false,
      },
    });
    expect(effective).toEqual({
      require_plan: true,
      require_network: false,
      require_verify: true,
      require_force: true,
    });
  });
});
