import { describe, expect, it, vi } from "vitest";
import { applyEvaluatorSgrReview, applyHumanEvaluatorReview } from "./evaluator-review-apply.js";
import { makeRunEvaluatorRunHandler } from "./evaluator.command.js";

function fixture() {
  const task = { id: "T-1", extensions: { task_kernel: { kind: "canonical_task" } } };
  const writeTask = vi.fn();
  const command = {
    resolvedProject: { gitRoot: process.cwd() },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    taskBackend: { getTask: vi.fn().mockResolvedValue(task), writeTask },
  };
  return { task, command, writeTask };
}

describe("canonical compatibility evaluator rejection", () => {
  it.each(["human", "sgr"])(
    "rejects %s review before reading or writing any artifact",
    async (kind) => {
      const { task, command, writeTask } = fixture();
      const opts = { ctx: command, task, workOrderPath: "nonexistent-review/work-order.json" };
      const operation =
        kind === "human"
          ? applyHumanEvaluatorReview({ ...opts, input: {} } as never)
          : applyEvaluatorSgrReview({ ...opts, result: {} } as never);
      await expect(operation).rejects.toThrow("ap task advance T-1 --agent-json");
      expect(writeTask).not.toHaveBeenCalled();
    },
  );

  it("rejects a JSON-forged native permit before artifact access", async () => {
    const { task, command, writeTask } = fixture();
    await expect(
      applyEvaluatorSgrReview({
        ctx: command,
        task,
        workOrderPath: "nonexistent/work-order.json",
        result: {},
        nativePermit: { kind: "completed_native_review_permit" },
      } as never),
    ).rejects.toThrow("ap task advance T-1 --agent-json");
    expect(writeTask).not.toHaveBeenCalled();
  });

  it("rejects recorded compatibility run before artifact preparation", async () => {
    const { command, writeTask } = fixture();
    const prepare = vi.fn().mockRejectedValue(new Error("artifact preparation must not run"));
    const handler = makeRunEvaluatorRunHandler({
      getCommandContext: () => Promise.resolve(command as never),
      getEvaluatorArtifactPort: () => Promise.resolve({ prepare }),
    });
    await expect(
      handler({ cwd: process.cwd() }, {
        taskId: "T-1",
        evaluator: "recovery-context",
        provenance: "human_supplied",
        verdict: "pass",
        summary: "Reviewed",
        findings: ["Reviewed"],
        evidenceRefs: ["evidence"],
        missingTests: [],
        hiddenAssumptions: [],
        residualRisks: [],
        json: true,
        record: true,
      } as never),
    ).rejects.toThrow("ap task advance T-1 --agent-json");
    expect(prepare).not.toHaveBeenCalled();
    expect(writeTask).not.toHaveBeenCalled();
  });
});
