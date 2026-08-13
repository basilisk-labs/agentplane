import { mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { loadCommandContext } from "../shared/task-backend.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { setTaskFieldsIntent } from "../shared/task-store.js";

import { addTask, commitPath, prepareTypedReview } from "./evaluator-test-helpers.js";

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
});
