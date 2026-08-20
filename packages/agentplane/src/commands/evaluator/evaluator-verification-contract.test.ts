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
  prepareTypedReview,
} from "./evaluator-test-helpers.js";

describe("evaluator verification contract", () => {
  it("fails closed when passing verification has no persisted contract", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV24";
    await addTask(root, taskId);
    await commitPath(root, "src/evaluated.ts", "export const evaluated = true;\n", "feat: target");
    const command = await loadCommandContext({ cwd: root, rootOverride: root });
    await applyTaskMutation({
      ctx: command,
      taskId,
      build: () => ({
        intents: setTaskFieldsIntent({
          verification: {
            state: "ok",
            updated_at: "2026-01-02T00:00:00.000Z",
            updated_by: "TESTER",
            note: "Legacy verification",
          },
        }),
      }),
    });

    await expect(prepareTypedReview(root, taskId)).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "verification_contract_missing" },
    });
  });

  it("fails closed when the persisted contract omits the exact evaluated diff", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const taskId = "202605240900-EV26";
    await commitPath(root, "README.md", "base\n", "chore: establish base");
    await addTask(root, taskId);
    await freezeTaskExecutionBase(root, taskId);
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
});
