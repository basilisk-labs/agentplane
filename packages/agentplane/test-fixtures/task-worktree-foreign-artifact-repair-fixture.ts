import { mkdir, readFile, rename, symlink, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";
import {
  cleanGitEnv,
  defaultConfig,
  expect,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

import { loadCommandContext } from "../src/commands/shared/task-backend.js";
import {
  applyForeignTaskReadmeReplicaRepair,
  inspectForeignTaskReadmeReplicaRepair,
} from "../src/commands/shared/task-worktree-foreign-artifact-repair.js";

export const ACTIVE_TASK_ID = "202607260101-ABCD";
export const FOREIGN_TASK_ID = "202607260102-BCDE";
export const OTHER_TASK_ID = "202607260103-CDEF";
export const TODO_UPDATED_AT = "2026-07-26T00:00:00.000Z";
export const START_COMMENT =
  "Start: preserve the foreign task lifecycle replica for guarded repair.";

const STARTED_AT = "2026-07-26T00:01:00.000Z";
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

export function taskReadme(opts: {
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

export function taskReadmeWithLifecycleSections(opts: {
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

export async function git(root: string, args: string[]): Promise<void> {
  await execFileAsync("git", args, { cwd: root, env: cleanGitEnv() });
}

export async function gitOutput(root: string, args: string[]): Promise<string> {
  const { stdout } = await execFileAsync("git", args, { cwd: root, env: cleanGitEnv() });
  return String(stdout).trim();
}

export async function createFixture(mode: ReplicaMode): Promise<{
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

export type ForeignTaskReadmeReplicaFixture = Awaited<ReturnType<typeof createFixture>>;

export async function commitForeignReadme(
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

export async function commitForeignTaskStates(
  fixture: ForeignTaskReadmeReplicaFixture,
  states: readonly (readonly ["TODO" | "DOING" | "DONE", number])[],
  label: string,
): Promise<void> {
  for (const [status, revision] of states) {
    await commitForeignReadme(
      fixture,
      taskReadme({ taskId: FOREIGN_TASK_ID, status, revision }),
      `test: ${label} ${status} ${revision}`,
    );
  }
}

export async function removeForeignReadme(
  fixture: ForeignTaskReadmeReplicaFixture,
  message: string,
): Promise<void> {
  const relativePath = path.relative(fixture.foreignWorktree, fixture.sourcePath);
  await git(fixture.foreignWorktree, ["rm", "--", relativePath]);
  await git(fixture.foreignWorktree, ["commit", "--no-verify", "-m", message]);
}

export async function createHistoricalFixture(opts?: {
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

export async function mutateAuthoritativeSourceAfterProof(opts: {
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

export async function mutateReplicaAfterSourceRevalidation(opts: {
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

export async function targetContext(baseRoot: string, targetWorktree: string) {
  return loadCommandContext({ cwd: baseRoot, rootOverride: targetWorktree });
}

export async function expectHistoricalRepairRejected(
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

export async function withUnavailableGh<T>(baseRoot: string, fn: () => Promise<T>): Promise<T> {
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
