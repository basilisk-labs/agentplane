import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { PolicyEngine } from "./engine.js";

describe("PolicyEngine", () => {
  it("classifies actions even when evaluation is a no-op", () => {
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "task_run",
      config: defaultConfig(),
      taskId: "202602091644-XXXXXX",
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(true);
    expect(out.violations).toEqual([]);
    expect(out.action).toMatchObject({
      id: "task_run",
      family: "runner",
      mutates_state: true,
      risky: true,
    });
  });

  it("delegates known policy actions to existing rule evaluation", () => {
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "guard_commit",
      config: defaultConfig(),
      taskId: "",
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(false);
    expect(out.action).toMatchObject({
      id: "guard_commit",
      family: "git",
      enforcement: "git_rules",
    });
    expect(out.violations.some((v) => v.level === "error")).toBe(true);
  });
});
