import { readFile } from "node:fs/promises";
import path from "node:path";

import { mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { executeLoop, type LoopStepExecutorRegistry } from "./engine.js";
import { getLoop } from "./registry.js";
import type { LoopSpec, LoopStepExecutionResult } from "./model.js";

function tddLoop(overrides: Partial<LoopSpec> = {}): LoopSpec {
  const loop = getLoop("tdd.fix");
  if (!loop) throw new Error("missing tdd.fix loop");
  return {
    ...loop,
    ...overrides,
    budgets: { ...loop.budgets, ...overrides.budgets },
    permissions: { ...loop.permissions, ...overrides.permissions },
  };
}

function successfulExecutors(
  opts: {
    checks?: LoopStepExecutionResult[];
    calls?: string[];
  } = {},
): LoopStepExecutorRegistry {
  const checks = [...(opts.checks ?? [{ status: "success", data: { ok: true } }])];
  const calls = opts.calls ?? [];
  return {
    "context.load": ({ step }) => {
      calls.push(step.id);
      return Promise.resolve({
        status: "success",
        data: { contextRefs: ["task.plan", "task.verify"] },
      });
    },
    "prompt.render": ({ step, iteration }) => {
      calls.push(step.id);
      return Promise.resolve({
        status: "success",
        data: { renderedPrompt: `iteration ${String(iteration)}`, promptModule: step.promptModule },
      });
    },
    "agent.run": ({ step }) => {
      calls.push(step.id);
      return Promise.resolve({
        status: "success",
        usage: { inputTokens: 100, outputTokens: 40, totalTokens: 140 },
      });
    },
    "git.diff": ({ step }) => {
      calls.push(step.id);
      return Promise.resolve({ status: "success", changedFiles: 2, diffLines: 24 });
    },
    "check.run": ({ step }) => {
      calls.push(step.id);
      return Promise.resolve(checks.shift() ?? { status: "success", data: { ok: true } });
    },
    "evaluator.run": ({ step, latestByStep }) => {
      calls.push(step.id);
      const check = latestByStep.get("focused_check");
      return Promise.resolve({
        status: "success",
        data: { verdict: check?.status === "success" ? "pass" : "rework" },
        progressScore: check?.status === "success" ? 1 : 0,
      });
    },
  };
}

describe("executeLoop", () => {
  it("executes tdd.fix end-to-end and records token and diff budgets", async () => {
    const root = await mkTempDir();
    const calls: string[] = [];
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-1",
      loop: tddLoop(),
      executors: successfulExecutors({ calls }),
      now: () => new Date("2026-07-10T00:00:00.000Z"),
    });

    expect(state.status).toBe("passed");
    expect(calls).toEqual([
      "load_context",
      "render_prompt",
      "agent_patch",
      "capture_diff",
      "focused_check",
      "evaluator",
    ]);
    expect(state.usage).toMatchObject({
      inputTokens: 100,
      outputTokens: 40,
      totalTokens: 140,
      agentRuns: 1,
      changedFiles: 2,
      diffLines: 24,
    });
    const events = await readFile(
      path.join(root, ".agentplane/tasks/TASK-1/runs", state.runId, "events.jsonl"),
      "utf8",
    );
    expect(events).toContain("step.completed");
    expect(events).toContain("decision.made");
  });

  it("retries from prompt.render with feedback while preserving completed evidence", async () => {
    const root = await mkTempDir();
    const calls: string[] = [];
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-2",
      loop: tddLoop(),
      executors: successfulExecutors({
        calls,
        checks: [
          { status: "failed", summary: "test failed" },
          { status: "success", summary: "test passed" },
        ],
      }),
    });

    expect(state.status).toBe("passed");
    expect(state.cursor.iteration).toBe(2);
    expect(calls.filter((call) => call === "load_context")).toHaveLength(1);
    expect(calls.filter((call) => call === "render_prompt")).toHaveLength(2);
    expect(calls.filter((call) => call === "agent_patch")).toHaveLength(2);
  });

  it("resumes from the last durable cursor without replaying completed steps", async () => {
    const root = await mkTempDir();
    const calls: string[] = [];
    let failOnce = true;
    const executors = successfulExecutors({ calls });
    executors["agent.run"] = ({ step }) => {
      calls.push(step.id);
      if (failOnce) {
        failOnce = false;
        return Promise.reject(new Error("simulated adapter crash"));
      }
      return Promise.resolve({ status: "success" });
    };

    await expect(
      executeLoop({
        projectRoot: root,
        workflowDir: ".agentplane/tasks",
        taskId: "TASK-3",
        loop: tddLoop(),
        executors,
        now: () => new Date("2026-07-10T01:00:00.000Z"),
      }),
    ).rejects.toThrow("simulated adapter crash");

    const runsRoot = path.join(root, ".agentplane/tasks/TASK-3/runs");
    const { readdir } = await import("node:fs/promises");
    const [runId] = await readdir(runsRoot);
    const resumed = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-3",
      loop: tddLoop(),
      executors,
      runId,
      now: () => new Date("2026-07-10T01:01:00.000Z"),
    });

    expect(resumed.status).toBe("passed");
    expect(calls.filter((call) => call === "load_context")).toHaveLength(1);
    expect(calls.filter((call) => call === "render_prompt")).toHaveLength(1);
    expect(calls.filter((call) => call === "agent_patch")).toHaveLength(2);
  });

  it("blocks before an agent mutation when loop permissions deny edits", async () => {
    const root = await mkTempDir();
    const calls: string[] = [];
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-4",
      loop: tddLoop({ permissions: { canEditFiles: false, canRunCommands: true } }),
      executors: successfulExecutors({ calls }),
    });

    expect(state.status).toBe("blocked");
    expect(state.stopReason).toBe("agent_run_requires_canEditFiles");
    expect(calls).not.toContain("agent_patch");
  });

  it("stops immediately when an effectful step reports blocked", async () => {
    const root = await mkTempDir();
    const calls: string[] = [];
    const executors = successfulExecutors({ calls });
    executors["agent.run"] = ({ step }) => {
      calls.push(step.id);
      return Promise.resolve({ status: "blocked", summary: "runner policy refused mutation" });
    };
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-4B",
      loop: tddLoop(),
      executors,
    });

    expect(state.status).toBe("blocked");
    expect(state.stopReason).toBe("runner policy refused mutation");
    expect(calls).toEqual(["load_context", "render_prompt", "agent_patch"]);
  });

  it("blocks when the measured token budget is exhausted", async () => {
    const root = await mkTempDir();
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-5",
      loop: tddLoop({ budgets: { maxIterations: 5, maxTotalTokens: 50 } }),
      executors: successfulExecutors({
        checks: [{ status: "failed", summary: "retry would require another model call" }],
      }),
    });

    expect(state.status).toBe("blocked");
    expect(state.stopReason).toContain("max_total_tokens");
  });

  it("blocks after repeated iterations make no measured progress", async () => {
    const root = await mkTempDir();
    const state = await executeLoop({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-5B",
      loop: tddLoop({ budgets: { maxIterations: 5, maxNoProgressIterations: 2 } }),
      executors: successfulExecutors({
        checks: [
          { status: "failed", summary: "same failure" },
          { status: "failed", summary: "same failure" },
          { status: "failed", summary: "same failure" },
        ],
      }),
    });

    expect(state.status).toBe("blocked");
    expect(state.stopReason).toContain("max_no_progress_iterations");
    expect(state.usage.agentRuns).toBe(3);
  });

  it("fails closed for loops without an executable runtime", async () => {
    const root = await mkTempDir();
    const loop = getLoop("docs.sync");
    if (!loop) throw new Error("missing docs.sync loop");
    await expect(
      executeLoop({
        projectRoot: root,
        workflowDir: ".agentplane/tasks",
        taskId: "TASK-6",
        loop,
        executors: {},
      }),
    ).rejects.toThrow("supports only tdd.fix");
  });
});
