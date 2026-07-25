import { lstat, mkdir, readFile, realpath, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";
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
const TODO_UPDATED_AT = "2026-07-26T00:00:00.000Z";
const STARTED_AT = "2026-07-26T00:01:00.000Z";
const START_COMMENT = "Start: preserve the foreign task lifecycle replica for guarded repair.";

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
  status: "TODO" | "DOING";
  revision: number;
  title?: string;
}): string {
  const started = opts.status === "DOING";
  return renderTaskReadme(
    {
      id: opts.taskId,
      title: opts.title ?? "Foreign task lifecycle replica",
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
      verification: { state: "pending", updated_at: null, updated_by: null, note: null },
      comments: started ? [{ author: "CODER", body: START_COMMENT }] : [],
      events: started
        ? [
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
      doc_updated_at: started ? STARTED_AT : TODO_UPDATED_AT,
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

async function git(root: string, args: string[]): Promise<void> {
  await execFileAsync("git", args, { cwd: root, env: cleanGitEnv() });
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

async function targetContext(baseRoot: string, targetWorktree: string) {
  return loadCommandContext({ cwd: baseRoot, rootOverride: targetWorktree });
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

  it("lets the current CLI repair an older task worktree selected by --root", async () => {
    const fixture = await createFixture("start_ready");
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
