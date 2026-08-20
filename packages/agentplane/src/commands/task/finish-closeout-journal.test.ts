import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";
import { afterEach, describe, expect, it } from "vitest";

import type { CommandContext } from "../shared/task-backend.js";
import type { FinishExecutionPlan, FinishOptions } from "./finish-types.js";
import {
  advanceFinishCloseoutJournal,
  markFinishCloseoutRecoveryRequired,
  openFinishCloseoutJournal,
} from "./finish-closeout-journal.js";

const roots: string[] = [];

function fixtures(root: string): {
  ctx: CommandContext;
  options: FinishOptions;
  plan: FinishExecutionPlan;
} {
  const execution = {
    schema_version: 1 as const,
    primary_task_id: "TASK-1",
    task_ids: ["TASK-1"],
    repository_mode: "direct" as const,
    selected_mode: "direct" as const,
    requested_mode: "auto" as const,
    route_source: "execution_contract" as const,
    reason_codes: [],
    base_ref: "main",
    base_sha: "0".repeat(40),
    authoritative_task_source: "task_worktree" as const,
  };
  const ctx = {
    resolvedProject: { gitRoot: root },
    config: defaultConfig(),
    memo: {},
  } as CommandContext;
  const options = {
    cwd: root,
    taskIds: ["TASK-1"],
    author: "CODER",
    body: "Verified: closeout is journaled.",
    result: "done",
    breaking: false,
    force: false,
    commitFromComment: false,
    commitAllow: [],
    commitAutoAllow: false,
    commitAllowTasks: true,
    commitRequireClean: false,
    statusCommit: false,
    statusCommitAllow: [],
    statusCommitAutoAllow: false,
    statusCommitRequireClean: false,
    confirmStatusCommit: false,
    quiet: true,
  } satisfies FinishOptions;
  const plan = {
    execution,
    useStore: false,
    store: null,
    statusCommitRequested: false,
    primaryTaskId: "TASK-1",
    metaTaskId: "TASK-1",
    resultProvided: true,
    resultSummary: "done",
    breaking: false,
    finishFinding: null,
    shouldCloseCommit: true,
    preMergeClosure: false,
    closeAdditionalTaskIds: [],
  } satisfies FinishExecutionPlan;
  return { ctx, options, plan };
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("finish closeout journal", () => {
  it("persists deterministic recovery state after task mutation", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-finish-journal-"));
    roots.push(root);
    await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
    const fixture = fixtures(root);
    const opened = await openFinishCloseoutJournal(fixture);
    const taskWritten = await advanceFinishCloseoutJournal({
      path: opened.path,
      journal: opened.journal,
      state: "task_state_written",
    });
    await markFinishCloseoutRecoveryRequired({
      path: opened.path,
      journal: taskWritten,
      error: new Error("close commit failed"),
      taskId: "TASK-1",
    });

    const stored = JSON.parse(await readFile(opened.path, "utf8")) as Record<string, unknown>;
    expect(stored).toMatchObject({
      state: "recovery_required",
      previous_state: "task_state_written",
      recovery: { error: "close commit failed" },
    });
  });

  it("rejects a different finish request while recovery is pending", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "agentplane-finish-journal-"));
    roots.push(root);
    await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
    const fixture = fixtures(root);
    const opened = await openFinishCloseoutJournal(fixture);
    await markFinishCloseoutRecoveryRequired({
      path: opened.path,
      journal: opened.journal,
      error: new Error("failed"),
      taskId: "TASK-1",
    });

    await expect(
      openFinishCloseoutJournal({
        ...fixture,
        options: { ...fixture.options, body: "Verified: a different request." },
      }),
    ).rejects.toThrow("requires recovery");
  });
});
