import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const SOURCE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const TASK_LOCAL_SEMANTIC_FILES = [
  "commands/task/finish-plan.ts",
  "commands/task/finish-execute.ts",
  "commands/task/verify-record-execute.ts",
  "commands/task/run.command.ts",
  "commands/evaluator/evaluator-review-usecase.ts",
  "commands/evaluator/evaluator-diff-evidence.ts",
  "commands/evaluator/evaluator-qualification-review.ts",
  "commands/shared/route-decision.ts",
  "commands/pr/open.ts",
  "commands/integrate-queue.command.ts",
  "runner/usecases/task-run.ts",
] as const;

const TASK_CENTRIC_CANONICAL_WRITERS = [
  "adapters/task-backend/task-centric-backend-adapter.ts",
  "commands/task/external-agent-planning-authority.ts",
  "commands/task/plan.ts",
] as const;

describe("task execution architecture guard", () => {
  it("keeps repository workflow_mode out of task-local lifecycle semantics", async () => {
    const violations: string[] = [];
    for (const relativePath of TASK_LOCAL_SEMANTIC_FILES) {
      const source = await readFile(path.join(SOURCE_ROOT, relativePath), "utf8");
      if (/\b(?:ctx|command|commandCtx|opts\.ctx)\.config\.workflow_mode\b/u.test(source)) {
        violations.push(relativePath);
      }
    }
    expect(violations).toEqual([]);
  });

  it("does not reintroduce CommandContext workflow-mode mutation", async () => {
    const routingSource = await readFile(
      path.join(SOURCE_ROOT, "runtime/task-routing/resolve.ts"),
      "utf8",
    );
    expect(routingSource).not.toContain("withEffectiveTaskWorkflowMode");
  });

  it("keeps canonical lifecycle and plan writes in the approved transition modules", async () => {
    for (const relativePath of TASK_CENTRIC_CANONICAL_WRITERS) {
      const source = await readFile(path.join(SOURCE_ROOT, relativePath), "utf8");
      expect(source.length, relativePath).toBeGreaterThan(0);
    }
    const actorAdapter = await readFile(
      path.join(SOURCE_ROOT, "commands/task/task-centric-external-result.ts"),
      "utf8",
    );
    expect(actorAdapter).not.toMatch(/\.lifecycle\s*=|current_plan\s*:/u);
    expect(actorAdapter).not.toContain("writeTask(");
  });
});
