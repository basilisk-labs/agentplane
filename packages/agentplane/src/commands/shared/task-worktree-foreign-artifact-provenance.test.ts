import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { expect } from "@agentplane/testkit/cli-core-pr-flow";
import { describe, it } from "vitest";

import {
  ACTIVE_TASK_ID,
  FOREIGN_TASK_ID,
  TODO_UPDATED_AT,
  commitForeignTaskStates,
  createFixture,
  createHistoricalFixture,
  expectHistoricalRepairRejected,
  git,
  gitOutput,
  taskReadme,
  targetContext,
} from "../../../test-fixtures/task-worktree-foreign-artifact-repair-fixture.js";
import { applyForeignTaskReadmeReplicaRepair } from "./task-worktree-foreign-artifact-repair.js";

describe("foreign task README historical provenance", () => {
  it("fails closed when the direct Start predecessor is missing (the XBH/THDN shape)", async () => {
    await expectHistoricalRepairRejected(
      await createHistoricalFixture({ initialSnapshot: "missing" }),
    );
  });

  it("fails closed when the replica is semantically valid but differs from the pre-Start Git bytes", async () => {
    const fixture = await createHistoricalFixture();
    const replicaText = await readFile(fixture.replicaPath, "utf8");
    expect(replicaText).toContain(TODO_UPDATED_AT);
    await writeFile(
      fixture.replicaPath,
      replicaText.replace(TODO_UPDATED_AT, "2026-07-26T00:00:00.001Z"),
      "utf8",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when an exact TODO receipt appears only after an earlier Start", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignTaskStates(
      fixture,
      [
        ["DOING", 7],
        ["TODO", 6],
        ["DOING", 7],
        ["DONE", 9],
      ],
      "record post-Start receipt",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when a valid proof exists only on the wrong branch", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignTaskStates(
      fixture,
      [
        ["TODO", 6],
        ["DOING", 7],
        ["DONE", 9],
      ],
      "record old",
    );
    await git(fixture.foreignWorktree, ["branch", "scratch-valid-foreign-history"]);
    await git(fixture.foreignWorktree, ["reset", "--hard", "main"]);
    await commitForeignTaskStates(
      fixture,
      [
        ["DOING", 8],
        ["DONE", 10],
      ],
      "record current",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the only valid proof is reachable through reflog history", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignTaskStates(
      fixture,
      [
        ["TODO", 6],
        ["DOING", 7],
        ["DONE", 9],
      ],
      "record reflog lifecycle",
    );
    const reflogOnlyHead = await gitOutput(fixture.foreignWorktree, ["rev-parse", "HEAD"]);
    await git(fixture.foreignWorktree, ["reset", "--hard", "main"]);
    await commitForeignTaskStates(
      fixture,
      [
        ["DOING", 7],
        ["DONE", 9],
      ],
      "record current",
    );
    expect(await gitOutput(fixture.foreignWorktree, ["reflog", "show", "--format=%H"])).toContain(
      reflogOnlyHead,
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the only matching TODO blob is in a stash", async () => {
    const fixture = await createHistoricalFixture({ initialSnapshot: "missing" });
    await writeFile(
      fixture.sourcePath,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "utf8",
    );
    await git(fixture.foreignWorktree, [
      "stash",
      "push",
      "-m",
      "test: stash matching foreign TODO receipt",
      "--",
      path.relative(fixture.foreignWorktree, fixture.sourcePath),
    ]);
    expect(await gitOutput(fixture.foreignWorktree, ["stash", "list"])).toContain(
      "stash matching foreign TODO receipt",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("revalidates authoritative branch resolution before removing a historical replica", async () => {
    const fixture = await createHistoricalFixture();
    const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

    await expect(
      applyForeignTaskReadmeReplicaRepair({
        ctx,
        activeTaskId: ACTIVE_TASK_ID,
        baseBranch: "main",
        after_source_revalidation: async () => {
          await git(fixture.foreignWorktree, ["branch", `task/${FOREIGN_TASK_ID}/competing-proof`]);
        },
      }),
    ).resolves.toEqual({
      state: "skipped",
      reason: "authoritative_branch_changed_before_remove",
    });
    await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');
  });
});
