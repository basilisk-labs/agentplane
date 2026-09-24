import { readTask } from "@agentplaneorg/core/tasks";
import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import { runEvaluatorRun } from "./evaluator.command.js";
import { addTask, commitPath } from "./evaluator-test-helpers.js";

describe("evaluator review identity across shared direct history", () => {
  it("preserves a known target across unrelated task artifacts", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202609240100-DIRECT";
    const implementationSha = await commitPath(
      root,
      "src/direct.ts",
      "export const value = 1;\n",
      "feat: direct implementation",
    );
    await commitPath(
      root,
      ".agentplane/tasks/202609240100-OTHER/manual-note.md",
      "other task metadata\n",
      "docs: other task metadata",
    );

    await expect(
      resolveQualityReviewTargetSha({
        gitRoot: root,
        workflowDir: ".agentplane/tasks",
        taskId,
        previousEvaluatedSha: implementationSha,
        workflowMode: "direct",
      }),
    ).resolves.toBe(implementationSha);
    await expect(
      resolveQualityReviewTargetSha({
        gitRoot: root,
        workflowDir: ".agentplane/tasks",
        taskId,
        previousEvaluatedSha: "f".repeat(40),
        workflowMode: "direct",
      }),
    ).resolves.toBeNull();
  });

  it("rejects a passing review when no committed target exists", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202609240100-N0TG";
    await addTask(root, taskId);
    await commitPath(root, "src/older.ts", "export {};\n", "feat: older work");
    await commitPath(
      root,
      ".agentplane/tasks/202609240100-OTHER/manual-note.md",
      "unrelated task artifact\n",
      "docs: unrelated task artifact",
    );

    await expect(
      runEvaluatorRun(
        { cwd: root, rootOverride: undefined },
        {
          taskId,
          evaluator: "recovery-context",
          provenance: "human_supplied",
          verdict: "pass",
          summary: "No committed target",
          findings: ["Unrelated workflow history is not a review target."],
          evidenceRefs: [`.agentplane/tasks/${taskId}/README.md`],
          missingTests: [],
          hiddenAssumptions: [],
          residualRisks: [],
          json: false,
          record: true,
        },
      ),
    ).rejects.toThrow("passing evaluator review requires a committed review target");

    const stored = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(stored.frontmatter.quality_review?.state).not.toBe("pass");
  });
});
