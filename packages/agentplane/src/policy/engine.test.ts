import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { PolicyEngine } from "./engine.js";

describe("PolicyEngine", () => {
  it("is a no-op for unknown actions", () => {
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "task_list",
      config: defaultConfig(),
      taskId: "202602091644-XXXXXX",
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(true);
    expect(out.violations).toEqual([]);
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
    expect(out.violations.some((v) => v.level === "error")).toBe(true);
  });
});
