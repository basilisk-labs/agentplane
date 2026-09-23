import { readFile } from "node:fs/promises";
import path from "node:path";

import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";

import {
  addTask,
  commitPath,
  freezeTaskExecutionBase,
  execFileAsync,
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

describe("evaluator verification contract", () => {
  it("fails closed when the persisted contract omits the exact evaluated diff", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV26";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-contract"], { cwd: root });
    await commitPath(root, "src/evaluated.ts", "export const evaluated = true;\n", "feat: target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    const contract = resolveTaskExecutionContract({
      config: command.config,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      requestedMode: "repository",
    });
    await applyTaskMutation({
      ctx: command,
      taskId,
      build: () => ({
        intents: setTaskFieldsIntent({
          execution_contract: contract,
          verification: {
            state: "ok",
            updated_at: "2026-01-02T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Verification with an undercomputed contract",
          },
        }),
      }),
    });

    await expect(prepareTypedReview(root, taskId)).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "verification_contract_diff_incomplete",
        missing_paths: ["src/evaluated.ts"],
      },
    });
  });

  it("evaluates a branch from the current base merge point after base integration", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV27";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
    await execFileAsync("git", ["switch", "-c", "task/evaluator-current-base"], { cwd: root });
    await commitPath(root, "src/task-owned.ts", "export const taskOwned = true;\n", "feat: task");
    await execFileAsync("git", ["switch", "main"], { cwd: root });
    await commitPath(
      root,
      "src/unrelated-main.ts",
      "export const unrelated = true;\n",
      "feat: main",
    );
    await execFileAsync("git", ["switch", "task/evaluator-current-base"], { cwd: root });
    await execFileAsync("git", ["merge", "--no-edit", "main"], { cwd: root });

    const { prepared } = await prepareTypedReview(root, taskId);
    const actualDiff = prepared.work_order.evidence.find((entry) => entry.kind === "actual_diff");
    if (!actualDiff) throw new Error("Missing actual-diff evidence.");
    const frozenDiff = await readFile(path.join(root, actualDiff.path), "utf8");

    expect(frozenDiff).toContain("src/task-owned.ts");
    expect(frozenDiff).not.toContain("src/unrelated-main.ts");
  });
});
