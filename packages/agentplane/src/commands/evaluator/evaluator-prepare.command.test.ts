import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../shared/task-backend.js";

import { createEvaluatorArtifactPreparationPort } from "./evaluator-artifact-port.js";
import {
  makeRunEvaluatorRunPrepareHandler,
  runEvaluatorPrepareOnlyCommand,
} from "./evaluator.command.js";
import { addTask, commitPath } from "./evaluator-test-helpers.js";

describe("evaluator prepare command", () => {
  it("returns a typed no-record result without using stdout as a data channel", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EVNR";
    await addTask(root, taskId);
    await commitPath(root, "src/review-target.txt", "review target", "feat: review target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const io = captureStdIO();

    try {
      const result = await runEvaluatorPrepareOnlyCommand(
        { cwd: root, rootOverride: root },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "evaluator_supplied",
          verdict: "pass",
          summary: "Prepared review context without recording a semantic verdict.",
          findings: ["The typed preparation result is available without recording a review."],
          evidenceRefs: [],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: true,
          record: false,
        },
        {
          getEvaluatorArtifactPort: () =>
            Promise.resolve(createEvaluatorArtifactPreparationPort(command)),
        },
      );

      expect(result).toMatchObject({
        provenance: "evaluator_supplied",
        verdict: "pass",
        recorded: false,
      });
      expect(result.work_order).toMatch(/work-order\.json$/u);
      expect(result.prompt).toMatch(/evaluator-prompt\.md$/u);
      expect(io.stdout).toBe("");
      expect(io.stderr).toBe("");

      const getEvaluatorArtifactPort = vi.fn(() =>
        Promise.resolve(createEvaluatorArtifactPreparationPort(command)),
      );
      const handler = makeRunEvaluatorRunPrepareHandler({ getEvaluatorArtifactPort });
      await handler(
        { cwd: root, rootOverride: root },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "evaluator_supplied",
          verdict: "pass",
          summary: "Prepared review context without recording a semantic verdict.",
          findings: ["The typed preparation result is available without recording a review."],
          evidenceRefs: [],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: true,
          record: false,
        },
      );
      expect(getEvaluatorArtifactPort).toHaveBeenCalledOnce();
    } finally {
      io.restore();
    }
  });
});
