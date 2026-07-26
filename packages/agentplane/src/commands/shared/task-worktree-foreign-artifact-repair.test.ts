import {
  lstat,
  mkdir,
  readFile,
  realpath,
  rename,
  symlink,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";
import {
  cleanGitEnv,
  captureStdIO,
  defaultConfig,
  expect,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { describe, it } from "vitest";

import { loadCommandContext } from "./task-backend.js";
import {
  applyForeignTaskReadmeReplicaRepair,
  classifyForeignTaskReadmeReplicaText,
  inspectForeignTaskReadmeReplicaRepair,
} from "./task-worktree-foreign-artifact-repair.js";

const ACTIVE_TASK_ID = "202607260101-ABCD";
const FOREIGN_TASK_ID = "202607260102-BCDE";
const OTHER_TASK_ID = "202607260103-CDEF";
const TODO_UPDATED_AT = "2026-07-26T00:00:00.000Z";
const STARTED_AT = "2026-07-26T00:01:00.000Z";
const START_COMMENT = "Start: preserve the foreign task lifecycle replica for guarded repair.";
const VERIFIED_AT = "2026-07-26T00:02:00.000Z";
const VERIFIED_NOTE = "Verified fixture checks for the guarded repair history.";
const DONE_AT = "2026-07-26T00:03:00.000Z";
const DONE_COMMENT = "Verified: close the guarded repair history fixture.";

type ReplicaMode =
  | "start_ready"
  | "byte_identical"
  | "modified"
  | "missing"
  | "active"
  | "mixed"
  | "symlink";

function taskReadme(opts: {
  taskId: string;
  status: "TODO" | "DOING" | "DONE";
  revision: number;
  title?: string;
}): string {
  const started = opts.status !== "TODO";
  const completed = opts.status === "DONE";
  return renderTaskReadme(
    {
      id: opts.taskId,
      title: opts.title ?? "Foreign task lifecycle replica",
      result_summary: completed ? "Guarded fixture closure" : undefined,
      status: opts.status,
      priority: "med",
      owner: "CODER",
      revision: opts.revision,
      depends_on: [],
      tags: ["code"],
      verify: ["bun test"],
      plan_approval: {
        state: "approved",
        updated_at: "2026-07-25T23:59:00.000Z",
        updated_by: "ORCHESTRATOR",
        note: null,
      },
      verification: completed
        ? {
            state: "ok",
            updated_at: VERIFIED_AT,
            updated_by: "TESTER",
            note: VERIFIED_NOTE,
          }
        : { state: "pending", updated_at: null, updated_by: null, note: null },
      comments: started
        ? completed
          ? [
              { author: "CODER", body: START_COMMENT },
              { author: "CODER", body: DONE_COMMENT },
            ]
          : [{ author: "CODER", body: START_COMMENT }]
        : [],
      events: started
        ? completed
          ? [
              {
                type: "status",
                at: STARTED_AT,
                author: "CODER",
                from: "TODO",
                to: "DOING",
                note: START_COMMENT,
              },
              {
                type: "verify",
                at: VERIFIED_AT,
                author: "TESTER",
                state: "ok",
                note: VERIFIED_NOTE,
              },
              {
                type: "status",
                at: DONE_AT,
                author: "CODER",
                from: "DOING",
                to: "DONE",
                note: DONE_COMMENT,
              },
            ]
          : [
              {
                type: "status",
                at: STARTED_AT,
                author: "CODER",
                from: "TODO",
                to: "DOING",
                note: START_COMMENT,
              },
            ]
        : [],
      doc_version: 3,
      doc_updated_at: completed ? DONE_AT : started ? STARTED_AT : TODO_UPDATED_AT,
      doc_updated_by: started ? "CODER" : "ORCHESTRATOR",
      description: "Exercise guarded removal of a stale foreign lifecycle replica.",
      extensions: started
        ? { workflow_route_baseline: { version: 1, start_head_sha: "abcdef123456" } }
        : undefined,
      id_source: "generated",
    },
    "## Summary\n\nGuarded foreign README replica fixture.\n",
  );
}

function taskReadmeWithLifecycleSections(opts: {
  taskId: string;
  status: "TODO" | "DOING" | "DONE";
  revision: number;
  scope?: string;
}): string {
  const parsed = parseTaskReadme(taskReadme(opts));
  const completed = opts.status === "DONE";
  return renderTaskReadme(
    {
      ...parsed.frontmatter,
      sections: {
        Summary: "Stable historical task identity.",
        Scope: opts.scope ?? "Stable guarded-repair scope.",
        Plan: "Preserve the bounded historical repair contract.",
        "Verify Steps": "Run the guarded repair fixture.",
        Verification: completed
          ? "Verified lifecycle evidence for the completed fixture."
          : "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->",
        "Rollback Plan": "Restore the replica if the proof is not exact.",
        Findings: completed ? "Completion finding may evolve." : "",
      },
    },
    parsed.body,
  );
}

async function git(root: string, args: string[]): Promise<void> {
  await execFileAsync("git", args, { cwd: root, env: cleanGitEnv() });
}

async function gitOutput(root: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: root, env: cleanGitEnv() });
  return String(stdout).trim();
}

async function createFixture(mode: ReplicaMode): Promise<{
  baseRoot: string;
  targetWorktree: string;
  foreignWorktree: string;
  activeReadmePath: string;
  replicaPath: string;
  sourcePath: string;
}> {
  const baseRoot = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(baseRoot, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", baseRoot]);
  await git(baseRoot, ["add", ".agentplane"]);
  await git(baseRoot, ["commit", "--no-verify", "-m", "test: configure guarded repair fixture"]);

  const worktreeRoot = path.join(baseRoot, ".agentplane", "worktrees");
  const targetWorktree = path.join(worktreeRoot, "target");
  const foreignWorktree = path.join(worktreeRoot, "foreign");
  await mkdir(worktreeRoot, { recursive: true });
  await git(baseRoot, [
    "worktree",
    "add",
    "-b",
    `task/${ACTIVE_TASK_ID}/active`,
    targetWorktree,
    "main",
  ]);
  await git(baseRoot, [
    "worktree",
    "add",
    "-b",
    `task/${FOREIGN_TASK_ID}/foreign`,
    foreignWorktree,
    "main",
  ]);

  const activeReadmePath = path.join(
    targetWorktree,
    ".agentplane",
    "tasks",
    ACTIVE_TASK_ID,
    "README.md",
  );
  await mkdir(path.dirname(activeReadmePath), { recursive: true });
  await writeFile(
    activeReadmePath,
    taskReadme({ taskId: ACTIVE_TASK_ID, status: "DOING", revision: 7 }),
    "utf8",
  );
  await git(targetWorktree, ["add", path.relative(targetWorktree, activeReadmePath)]);
  await git(targetWorktree, ["commit", "--no-verify", "-m", "test: add active task snapshot"]);

  const sourcePath = path.join(
    foreignWorktree,
    ".agentplane",
    "tasks",
    FOREIGN_TASK_ID,
    "README.md",
  );
  const replicaPath = path.join(
    targetWorktree,
    ".agentplane",
    "tasks",
    FOREIGN_TASK_ID,
    "README.md",
  );
  const sourceText = taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 });
  const replicaText = taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 });
  await mkdir(path.dirname(sourcePath), { recursive: true });
  await writeFile(sourcePath, sourceText, "utf8");

  if (mode === "missing") {
    return { baseRoot, targetWorktree, foreignWorktree, activeReadmePath, replicaPath, sourcePath };
  }
  if (mode === "active") {
    await writeFile(activeReadmePath, replicaText, "utf8");
    await git(targetWorktree, ["reset", "--", path.relative(targetWorktree, activeReadmePath)]);
    return { baseRoot, targetWorktree, foreignWorktree, activeReadmePath, replicaPath, sourcePath };
  }

  await mkdir(path.dirname(replicaPath), { recursive: true });
  if (mode === "symlink") {
    await symlink(sourcePath, replicaPath);
  } else {
    const value =
      mode === "byte_identical"
        ? sourceText
        : mode === "modified"
          ? taskReadme({
              taskId: FOREIGN_TASK_ID,
              status: "TODO",
              revision: 6,
              title: "Modified foreign task",
            })
          : replicaText;
    await writeFile(replicaPath, value, "utf8");
  }
  if (mode === "mixed") {
    await writeFile(path.join(targetWorktree, "mixed-worktree-change.txt"), "mixed\n", "utf8");
  }
  return { baseRoot, targetWorktree, foreignWorktree, activeReadmePath, replicaPath, sourcePath };
}

type ForeignTaskReadmeReplicaFixture = Awaited<ReturnType<typeof createFixture>>;

async function commitForeignReadme(
  fixture: ForeignTaskReadmeReplicaFixture,
  text: string,
  message: string,
): Promise<void> {
  await mkdir(path.dirname(fixture.sourcePath), { recursive: true });
  await writeFile(fixture.sourcePath, text, "utf8");
  const relativePath = path.relative(fixture.foreignWorktree, fixture.sourcePath);
  await git(fixture.foreignWorktree, ["add", "--", relativePath]);
  await git(fixture.foreignWorktree, ["commit", "--no-verify", "-m", message]);
}

async function removeForeignReadme(
  fixture: ForeignTaskReadmeReplicaFixture,
  message: string,
): Promise<void> {
  const relativePath = path.relative(fixture.foreignWorktree, fixture.sourcePath);
  await git(fixture.foreignWorktree, ["rm", "--", relativePath]);
  await git(fixture.foreignWorktree, ["commit", "--no-verify", "-m", message]);
}

async function createHistoricalFixture(opts?: {
  initialSnapshot?: "todo" | "missing";
  sourceTaskId?: string;
  lifecycleSections?: boolean;
}): Promise<ForeignTaskReadmeReplicaFixture> {
  const fixture = await createFixture("start_ready");
  const sourceTaskId = opts?.sourceTaskId ?? FOREIGN_TASK_ID;
  const createReadme = opts?.lifecycleSections ? taskReadmeWithLifecycleSections : taskReadme;
  if (opts?.initialSnapshot !== "missing") {
    await commitForeignReadme(
      fixture,
      createReadme({ taskId: sourceTaskId, status: "TODO", revision: 6 }),
      "test: record foreign TODO snapshot",
    );
  }
  await commitForeignReadme(
    fixture,
    createReadme({ taskId: sourceTaskId, status: "DOING", revision: 7 }),
    "test: record foreign Start transition",
  );
  await commitForeignReadme(
    fixture,
    createReadme({ taskId: sourceTaskId, status: "DONE", revision: 9 }),
    "test: record verified foreign completion",
  );
  if (opts?.lifecycleSections) {
    await writeFile(
      fixture.replicaPath,
      createReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "utf8",
    );
  }
  return fixture;
}

async function replaceRegularFile(filePath: string, text: string): Promise<void> {
  const replacementPath = `${filePath}.replacement`;
  await writeFile(replacementPath, text, "utf8");
  await rename(replacementPath, filePath);
}

async function mutateAuthoritativeSourceAfterProof(opts: {
  fixture: ForeignTaskReadmeReplicaFixture;
  mutation: "contents" | "replacement" | "missing" | "symlink";
}): Promise<void> {
  const { fixture, mutation } = opts;
  if (mutation === "contents") {
    await writeFile(
      fixture.sourcePath,
      taskReadme({
        taskId: FOREIGN_TASK_ID,
        status: "DOING",
        revision: 7,
        title: "Source changed after repair proof",
      }),
      "utf8",
    );
    return;
  }
  if (mutation === "replacement") {
    await replaceRegularFile(
      fixture.sourcePath,
      taskReadme({
        taskId: FOREIGN_TASK_ID,
        status: "DOING",
        revision: 7,
        title: "Source replaced after repair proof",
      }),
    );
    return;
  }
  await unlink(fixture.sourcePath);
  if (mutation === "symlink") {
    await symlink(fixture.replicaPath, fixture.sourcePath);
  }
}

async function mutateReplicaAfterSourceRevalidation(opts: {
  fixture: ForeignTaskReadmeReplicaFixture;
  mutation: "contents" | "replacement" | "missing" | "symlink";
}): Promise<void> {
  const { fixture, mutation } = opts;
  if (mutation === "contents") {
    await writeFile(
      fixture.replicaPath,
      taskReadme({
        taskId: FOREIGN_TASK_ID,
        status: "TODO",
        revision: 6,
        title: "Replica changed after repair proof",
      }),
      "utf8",
    );
    return;
  }
  if (mutation === "replacement") {
    await replaceRegularFile(fixture.replicaPath, await readFile(fixture.replicaPath, "utf8"));
    return;
  }
  await unlink(fixture.replicaPath);
  if (mutation === "symlink") {
    await symlink(fixture.sourcePath, fixture.replicaPath);
  }
}

async function targetContext(baseRoot: string, targetWorktree: string) {
  return loadCommandContext({ cwd: baseRoot, rootOverride: targetWorktree });
}

async function expectHistoricalRepairRejected(
  fixture: ForeignTaskReadmeReplicaFixture,
): Promise<void> {
  const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);
  await expect(
    inspectForeignTaskReadmeReplicaRepair({
      ctx,
      activeTaskId: ACTIVE_TASK_ID,
      taskWorktreePath: fixture.targetWorktree,
      baseBranch: "main",
    }),
  ).resolves.toMatchObject({ state: "not_applicable" });
  await expect(
    applyForeignTaskReadmeReplicaRepair({
      ctx,
      activeTaskId: ACTIVE_TASK_ID,
      baseBranch: "main",
    }),
  ).resolves.toMatchObject({ state: "skipped" });
  await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');
}

async function withUnavailableGh<T>(baseRoot: string, fn: () => Promise<T>): Promise<T> {
  const fakeGh = path.join(baseRoot, "unavailable-gh.js");
  await writeFile(fakeGh, "process.stderr.write('unavailable'); process.exit(1);\n", "utf8");
  const previousGhBin = process.env.AGENTPLANE_GH_BIN;
  const previousGhArgs = process.env.AGENTPLANE_GH_ARGS;
  process.env.AGENTPLANE_GH_BIN = process.execPath;
  process.env.AGENTPLANE_GH_ARGS = JSON.stringify([fakeGh]);
  try {
    return await fn();
  } finally {
    if (previousGhBin === undefined) delete process.env.AGENTPLANE_GH_BIN;
    else process.env.AGENTPLANE_GH_BIN = previousGhBin;
    if (previousGhArgs === undefined) delete process.env.AGENTPLANE_GH_ARGS;
    else process.env.AGENTPLANE_GH_ARGS = previousGhArgs;
  }
}

describe("foreign task README replica repair", () => {
  it("accepts only exact bytes or the exact TODO-to-DOING start-ready transition", () => {
    const todo = taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 });
    const doing = taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 });

    expect(
      classifyForeignTaskReadmeReplicaText({
        foreignTaskId: FOREIGN_TASK_ID,
        replicaText: doing,
        sourceText: doing,
      }),
    ).toBe("byte_identical");
    expect(
      classifyForeignTaskReadmeReplicaText({
        foreignTaskId: FOREIGN_TASK_ID,
        replicaText: todo,
        sourceText: doing,
      }),
    ).toBe("start_ready_replica");
    expect(
      classifyForeignTaskReadmeReplicaText({
        foreignTaskId: FOREIGN_TASK_ID,
        replicaText: taskReadme({
          taskId: FOREIGN_TASK_ID,
          status: "TODO",
          revision: 6,
          title: "Modified foreign task",
        }),
        sourceText: doing,
      }),
    ).toBeNull();
  });

  it.each([
    ["start_ready", "start_ready_replica"],
    ["byte_identical", "byte_identical"],
  ] as const)(
    "removes one proven %s replica through an explicit target worktree root",
    async (mode, proof) => {
      const fixture = await createFixture(mode);
      const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

      expect(path.resolve(ctx.resolvedProject.gitRoot)).toBe(path.resolve(fixture.targetWorktree));
      const inspection = await inspectForeignTaskReadmeReplicaRepair({
        ctx,
        activeTaskId: ACTIVE_TASK_ID,
        taskWorktreePath: fixture.targetWorktree,
        baseBranch: "main",
      });
      expect(inspection).toMatchObject({
        state: "eligible",
        foreignTaskId: FOREIGN_TASK_ID,
        proof,
      });

      await expect(
        applyForeignTaskReadmeReplicaRepair({
          ctx,
          activeTaskId: ACTIVE_TASK_ID,
          baseBranch: "main",
        }),
      ).resolves.toMatchObject({ state: "applied", foreignTaskId: FOREIGN_TASK_ID });
      await expect(readFile(fixture.replicaPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      await expect(readFile(fixture.sourcePath, "utf8")).resolves.toContain('status: "DOING"');
    },
  );

  it.each([
    ["recorded TODO snapshot", undefined],
    ["initial branch Start snapshot", "missing"],
  ] as const)(
    "removes a proven historical replica with a %s",
    async (_description, initialSnapshot) => {
      const fixture = await createHistoricalFixture({ initialSnapshot });
      const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

      await expect(
        inspectForeignTaskReadmeReplicaRepair({
          ctx,
          activeTaskId: ACTIVE_TASK_ID,
          taskWorktreePath: fixture.targetWorktree,
          baseBranch: "main",
        }),
      ).resolves.toMatchObject({
        state: "eligible",
        foreignTaskId: FOREIGN_TASK_ID,
        proof: "historical_start_ready_replica",
      });

      await expect(
        applyForeignTaskReadmeReplicaRepair({
          ctx,
          activeTaskId: ACTIVE_TASK_ID,
          baseBranch: "main",
        }),
      ).resolves.toEqual({
        state: "applied",
        foreignTaskId: FOREIGN_TASK_ID,
        proof: "historical_start_ready_replica",
      });
      await expect(readFile(fixture.replicaPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
      await expect(readFile(fixture.sourcePath, "utf8")).resolves.toContain('status: "DONE"');
    },
  );

  it("accepts only lifecycle evidence changes between the historical Start and DONE bodies", async () => {
    const fixture = await createHistoricalFixture({ lifecycleSections: true });
    const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

    await expect(
      applyForeignTaskReadmeReplicaRepair({
        ctx,
        activeTaskId: ACTIVE_TASK_ID,
        baseBranch: "main",
      }),
    ).resolves.toMatchObject({
      state: "applied",
      proof: "historical_start_ready_replica",
    });
    await expect(readFile(fixture.replicaPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("fails closed when the historical TODO replica has altered semantic fields", async () => {
    const fixture = await createHistoricalFixture();
    await writeFile(
      fixture.replicaPath,
      taskReadme({
        taskId: FOREIGN_TASK_ID,
        status: "TODO",
        revision: 6,
        title: "Altered foreign task semantics",
      }),
      "utf8",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the historical TODO replica body is altered", async () => {
    const fixture = await createHistoricalFixture();
    await writeFile(
      fixture.replicaPath,
      `${taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 })}\nChanged body.\n`,
      "utf8",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when a later DONE README changes an immutable task body section", async () => {
    const fixture = await createHistoricalFixture({ lifecycleSections: true });
    await commitForeignReadme(
      fixture,
      taskReadmeWithLifecycleSections({
        taskId: FOREIGN_TASK_ID,
        status: "DONE",
        revision: 10,
        scope: "Changed semantic scope after Start.",
      }),
      "test: change immutable historical task scope",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when no exact historical TODO revision matches the replica", async () => {
    const fixture = await createHistoricalFixture();
    await writeFile(
      fixture.replicaPath,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 5 }),
      "utf8",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the branch skipped the TODO-to-DOING Start transition", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "test: record foreign TODO snapshot",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DONE", revision: 9 }),
      "test: skip foreign Start transition",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the recorded Start transition is forged", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "test: record foreign TODO snapshot",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 }).replaceAll(
        START_COMMENT,
        "Forged lifecycle transition.",
      ),
      "test: record forged foreign Start transition",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DONE", revision: 9 }),
      "test: record verified foreign completion",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed for ambiguous historical Start transitions", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "test: record foreign TODO snapshot",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 }),
      "test: record first foreign Start transition",
    );
    await removeForeignReadme(fixture, "test: remove foreign task history path");
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 }),
      "test: record second foreign Start transition",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DONE", revision: 9 }),
      "test: record verified foreign completion",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when a valid transition exists only on an unrelated rebased history", async () => {
    const fixture = await createFixture("start_ready");
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "TODO", revision: 6 }),
      "test: record old foreign TODO snapshot",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 7 }),
      "test: record old foreign Start transition",
    );
    await git(fixture.foreignWorktree, ["branch", "scratch-valid-foreign-history"]);
    await git(fixture.foreignWorktree, ["reset", "--hard", "main"]);
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DOING", revision: 8 }),
      "test: record rebased foreign lifecycle",
    );
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status: "DONE", revision: 10 }),
      "test: record rebased foreign completion",
    );

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when the authoritative branch path contains a different task", async () => {
    const fixture = await createHistoricalFixture({ sourceTaskId: OTHER_TASK_ID });

    await expectHistoricalRepairRejected(fixture);
  });

  it("fails closed when multiple task branches claim the foreign task", async () => {
    const fixture = await createHistoricalFixture();
    await git(fixture.foreignWorktree, ["branch", `task/${FOREIGN_TASK_ID}/ambiguous-history`]);

    await expectHistoricalRepairRejected(fixture);
  });

  it.each([
    ["contents change", "contents"],
    ["regular file replacement", "replacement"],
    ["removal", "missing"],
    ["symlink substitution", "symlink"],
  ] as const)(
    "leaves the replica intact when the authoritative source has a %s after proof",
    async (_description, mutation) => {
      const fixture = await createHistoricalFixture();
      const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

      await expect(
        applyForeignTaskReadmeReplicaRepair({
          ctx,
          activeTaskId: ACTIVE_TASK_ID,
          baseBranch: "main",
          after_inspection: async () => {
            await mutateAuthoritativeSourceAfterProof({ fixture, mutation });
          },
        }),
      ).resolves.toEqual({
        state: "skipped",
        reason: "authoritative_source_changed_before_remove",
      });

      await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');
      if (mutation === "missing") {
        await expect(lstat(fixture.sourcePath)).rejects.toMatchObject({ code: "ENOENT" });
      } else if (mutation === "symlink") {
        const sourceStats = await lstat(fixture.sourcePath);
        expect(sourceStats.isSymbolicLink()).toBe(true);
      } else {
        await expect(readFile(fixture.sourcePath, "utf8")).resolves.toContain("Source");
      }
    },
  );

  it.each([
    ["contents change", "contents"],
    ["regular file replacement", "replacement"],
    ["removal", "missing"],
    ["symlink substitution", "symlink"],
  ] as const)(
    "does not unlink the replica when it has a %s after source revalidation",
    async (_description, mutation) => {
      const fixture = await createHistoricalFixture();
      const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

      await expect(
        applyForeignTaskReadmeReplicaRepair({
          ctx,
          activeTaskId: ACTIVE_TASK_ID,
          baseBranch: "main",
          after_source_revalidation: async () => {
            await mutateReplicaAfterSourceRevalidation({ fixture, mutation });
          },
        }),
      ).resolves.toEqual({
        state: "skipped",
        reason: "foreign_replica_changed_before_remove",
      });

      if (mutation === "missing") {
        await expect(lstat(fixture.replicaPath)).rejects.toMatchObject({ code: "ENOENT" });
      } else if (mutation === "symlink") {
        const replicaStats = await lstat(fixture.replicaPath);
        expect(replicaStats.isSymbolicLink()).toBe(true);
      } else {
        await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');
      }
    },
  );

  it("does not unlink a historical replica after the authoritative branch head advances", async () => {
    const fixture = await createHistoricalFixture();
    const ctx = await targetContext(fixture.baseRoot, fixture.targetWorktree);

    await expect(
      applyForeignTaskReadmeReplicaRepair({
        ctx,
        activeTaskId: ACTIVE_TASK_ID,
        baseBranch: "main",
        after_source_revalidation: async () => {
          const advancedHead = await gitOutput(fixture.foreignWorktree, [
            "commit-tree",
            "HEAD^{tree}",
            "-p",
            "HEAD",
            "-m",
            "test: advance authoritative branch after proof",
          ]);
          await git(fixture.foreignWorktree, [
            "update-ref",
            `refs/heads/task/${FOREIGN_TASK_ID}/foreign`,
            advancedHead,
            "HEAD",
          ]);
        },
      }),
    ).resolves.toEqual({
      state: "skipped",
      reason: "authoritative_branch_changed_before_remove",
    });
    await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');
  });

  it("dry-runs and then repairs a proven historical worktree selected by --root", async () => {
    const fixture = await createHistoricalFixture();
    const routeIo = captureStdIO();
    try {
      const routeCode = await runCli([
        "task",
        "next-action",
        ACTIVE_TASK_ID,
        "--json",
        "--root",
        fixture.targetWorktree,
      ]);
      if (routeCode !== 0) {
        throw new Error(`next-action failed: ${routeIo.stderr || routeIo.stdout}`);
      }
      const route = JSON.parse(routeIo.stdout) as {
        route_oracle: { authoritativeCheckoutPath: string | null };
        next_action: { code: string; command: string | null };
      };
      expect(await realpath(route.route_oracle.authoritativeCheckoutPath ?? "")).toBe(
        await realpath(fixture.targetWorktree),
      );
      expect(route.next_action).toMatchObject({
        code: "repair_foreign_task_readme_replica",
        command: `agentplane flow repair ${ACTIVE_TASK_ID} --safe-apply`,
      });
    } finally {
      routeIo.restore();
    }

    await withUnavailableGh(fixture.baseRoot, async () => {
      const wrongRootIo = captureStdIO();
      try {
        expect(
          await runCli([
            "flow",
            "repair",
            ACTIVE_TASK_ID,
            "--safe-apply",
            "--json",
            "--root",
            fixture.baseRoot,
          ]),
        ).toBe(0);
        const wrongRootRepair = JSON.parse(wrongRootIo.stdout) as {
          applied: { code: string; status: string; reason?: string }[];
        };
        expect(wrongRootRepair.applied).toMatchObject([
          {
            code: "repair_foreign_task_readme_replica",
            status: "skipped",
            reason: "must_run_from_task_worktree",
          },
        ]);
      } finally {
        wrongRootIo.restore();
      }
      await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');

      const dryRunIo = captureStdIO();
      try {
        expect(
          await runCli([
            "flow",
            "repair",
            ACTIVE_TASK_ID,
            "--dry-run",
            "--json",
            "--root",
            fixture.targetWorktree,
          ]),
        ).toBe(0);
        const dryRun = JSON.parse(dryRunIo.stdout) as {
          repair_plan: { code: string }[];
          applied: unknown[];
        };
        expect(dryRun.repair_plan).toMatchObject([{ code: "repair_foreign_task_readme_replica" }]);
        expect(dryRun.applied).toEqual([]);
      } finally {
        dryRunIo.restore();
      }
      await expect(readFile(fixture.replicaPath, "utf8")).resolves.toContain('status: "TODO"');

      const repairIo = captureStdIO();
      try {
        expect(
          await runCli([
            "flow",
            "repair",
            ACTIVE_TASK_ID,
            "--safe-apply",
            "--json",
            "--root",
            fixture.targetWorktree,
          ]),
        ).toBe(0);
        const repair = JSON.parse(repairIo.stdout) as {
          applied: { code: string; status: string }[];
        };
        expect(repair.applied).toMatchObject([
          { code: "repair_foreign_task_readme_replica", status: "applied" },
        ]);
      } finally {
        repairIo.restore();
      }
    });

    await expect(readFile(fixture.replicaPath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it.each([
    ["modified", "replicaPath"],
    ["missing", "sourcePath"],
    ["active", "activeReadmePath"],
    ["mixed", "replicaPath"],
    ["symlink", "replicaPath"],
  ] as const)("fails closed for %s candidate state", async (mode, retainedPathKey) => {
    const fixture = await createFixture(mode);
    const { baseRoot, targetWorktree } = fixture;
    const ctx = await targetContext(baseRoot, targetWorktree);
    const inspection = await inspectForeignTaskReadmeReplicaRepair({
      ctx,
      activeTaskId: ACTIVE_TASK_ID,
      taskWorktreePath: fixture.targetWorktree,
      baseBranch: "main",
    });
    expect(inspection.state).toBe("not_applicable");
    await expect(
      applyForeignTaskReadmeReplicaRepair({
        ctx,
        activeTaskId: ACTIVE_TASK_ID,
        baseBranch: "main",
      }),
    ).resolves.toMatchObject({ state: "skipped" });

    const retainedPath = fixture[retainedPathKey];
    await expect(readFile(retainedPath, "utf8")).resolves.toBeTruthy();
    if (mode === "symlink") {
      const stats = await lstat(fixture.replicaPath);
      expect(stats.isSymbolicLink()).toBe(true);
    }
  });
});
