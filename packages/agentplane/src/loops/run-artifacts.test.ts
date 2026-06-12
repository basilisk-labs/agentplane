import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { mkTempDir } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { getLoop } from "./registry.js";
import { createDryRunLoopRun } from "./run-artifacts.js";

describe("createDryRunLoopRun", () => {
  it("records execute-agent-step runs as stopped before follow-up checks", async () => {
    const root = await mkTempDir();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const loop = getLoop("tdd.fix");
    expect(loop).toBeTruthy();

    const record = await createDryRunLoopRun({
      projectRoot: root,
      workflowDir: ".agentplane/tasks",
      taskId: "TASK-1",
      loop: loop!,
      executionMode: "execute_agent_step",
      now: new Date("2026-06-12T00:00:00.000Z"),
      prepareRunnerHandoff: async (step) =>
        step.type === "agent.run"
          ? {
              adapterId: "codex",
              mode: "execute",
              runId: "runner-1",
              runDir: ".agentplane/tasks/TASK-1/runner/runs/runner-1",
              bundlePath: ".agentplane/tasks/TASK-1/runner/runs/runner-1/bundle.json",
              bootstrapPath: ".agentplane/tasks/TASK-1/runner/runs/runner-1/bootstrap.md",
              resultPath: ".agentplane/tasks/TASK-1/runner/runs/runner-1/result.json",
              resultStatus: "success",
              exitCode: 0,
              resultSummary: "agent step completed",
            }
          : null,
    });

    expect(record.dryRun).toBe(false);
    expect(record.status).toBe("human_review");
    expect(record.stopReason).toBe("agent_step_executed");

    const decisionPath = path.join(root, record.artifacts.iterationsDir, "001", "decision.json");
    const decision = JSON.parse(await readFile(decisionPath, "utf8"));
    expect(decision.reason).toBe("agent_step_executed_before_followup_checks");
    expect(decision.nextStep).toBe("capture_diff");

    const agentPatch = record.artifacts.stepArtifacts?.find(
      (step) => step.stepId === "agent_patch",
    );
    expect(agentPatch).toBeTruthy();
    const agentOutput = JSON.parse(await readFile(path.join(root, agentPatch!.outputPath), "utf8"));
    expect(agentOutput.dryRun).toBe(false);
    expect(agentOutput.status).toBe("success");
    expect(agentOutput.skippedExecution).toBe(false);
    expect(agentOutput.runnerHandoff.resultSummary).toBe("agent step completed");
  });
});
