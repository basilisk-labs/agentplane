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
    expect(out.phase).toBe("implement");
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
    expect(out.phase).toBeNull();
    expect(out.action).toMatchObject({
      id: "guard_commit",
      family: "git",
      enforcement: "git_rules",
    });
    expect(out.violations.some((v) => v.level === "error")).toBe(true);
  });

  it("allows task lifecycle actions in their expected phase", () => {
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "task_finish",
      phase: "finish",
      config: defaultConfig(),
      taskId: "202602091644-XXXXXX",
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(true);
    expect(out.phase).toBe("finish");
    expect(out.violations).toEqual([]);
  });

  it("rejects task lifecycle actions in the wrong phase", () => {
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "task_finish",
      phase: "implement",
      config: defaultConfig(),
      taskId: "202602091644-XXXXXX",
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(false);
    expect(out.phase).toBe("implement");
    expect(out.violations).toEqual([
      expect.objectContaining({
        level: "error",
        code: "E_PHASE_POLICY",
      }),
    ]);
  });

  it("blocks implementation start when plan approval is still pending", () => {
    const config = defaultConfig();
    config.agents.approvals.require_plan = true;
    const engine = new PolicyEngine();
    const out = engine.evaluate({
      action: "task_start",
      phase: "implement",
      config,
      taskId: "202602091644-XXXXXX",
      task: { planApprovalState: "pending" },
      git: { stagedPaths: [] },
    });
    expect(out.ok).toBe(false);
    const violation = out.violations[0];
    expect(violation).toMatchObject({ level: "error", code: "E_PHASE_POLICY" });
    expect(violation?.message).toContain("cannot start implementation before plan approval");
  });
});
