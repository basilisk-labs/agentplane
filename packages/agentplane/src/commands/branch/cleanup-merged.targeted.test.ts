import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "../../cli/run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  gitBranchExists,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  pathExists,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const TEST_TIMEOUT_MS = 120_000;
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

type TargetedFixture = {
  root: string;
  taskId: string;
  branch: string;
  branchHead: string;
  mergeCommit: string;
  worktreePath: string;
  unrelatedBranch: string;
  unrelatedWorktreePath: string;
};

async function createTask(root: string, title: string): Promise<string> {
  const io = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "new",
        "--title",
        title,
        "--description",
        "targeted cleanup fixture",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]),
    ).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

function markDone(readme: string, commitHash: string): string {
  const done = readme.replace('status: "TODO"', 'status: "DONE"');
  const commitBlock = `commit:\n  hash: "${commitHash}"\n  message: "pre-merge closure basis"`;
  return done.includes("commit: null")
    ? done.replace("commit: null", commitBlock)
    : done.replace("comments:", `${commitBlock}\ncomments:`);
}

async function createTargetedFixture(): Promise<TargetedFixture> {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await writeFile(path.join(root, "README.md"), "base\n", "utf8");
  await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
  await commitAll(root, "chore base");
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);

  const taskId = await createTask(root, "Targeted rebase cleanup");
  await commitAll(root, `chore ${taskId} scaffold`);
  const scaffoldCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const scaffoldCommit = scaffoldCommitResult.stdout.trim();

  const branch = `task/${taskId}/targeted-rebase-cleanup`;
  const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-targeted`);
  await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const task = await readTask({ cwd: worktreePath, taskId });
  await writeFile(
    task.readmePath,
    markDone(await readFile(task.readmePath, "utf8"), scaffoldCommit),
    "utf8",
  );
  const prDir = path.join(worktreePath, ".agentplane", "tasks", taskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    `${JSON.stringify(
      {
        schema_version: 1,
        task_id: taskId,
        branch,
        base: "main",
        pr_number: 123,
        pr_url: "https://github.com/example/repo/pull/123",
        status: "OPEN",
        created_at: "2026-07-23T00:00:00.000Z",
        updated_at: "2026-07-23T00:00:00.000Z",
        last_verified_at: "2026-07-23T00:00:00.000Z",
        verify: { status: "pass" },
        pre_merge_closure: {
          state: "closed_before_merge",
          branch,
          basis_commit: scaffoldCommit,
          recorded_at: "2026-07-23T00:00:00.000Z",
          pr_number: 123,
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  await writeFile(path.join(worktreePath, "targeted-change.txt"), "landed by rebase\n", "utf8");
  await commitAll(worktreePath, `chore ${taskId} pre-merge closure`);
  const branchHeadResult = await execFileAsync("git", ["rev-parse", branch], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const branchHead = branchHeadResult.stdout.trim();

  await writeFile(path.join(root, "base-only.txt"), "forces rewritten commit identity\n", "utf8");
  await commitAll(root, "chore advance base before rebase merge");
  await execFileAsync("git", ["cherry-pick", branchHead], { cwd: root, env: cleanGitEnv() });
  const mergeCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const mergeCommit = mergeCommitResult.stdout.trim();
  expect(mergeCommit).not.toBe(branchHead);

  const unrelatedTaskId = await createTask(root, "Unrelated cleanup candidate");
  await commitAll(root, `chore ${unrelatedTaskId} scaffold`);
  const unrelatedTask = await readTask({ cwd: root, taskId: unrelatedTaskId });
  await writeFile(
    unrelatedTask.readmePath,
    markDone(await readFile(unrelatedTask.readmePath, "utf8"), mergeCommit),
    "utf8",
  );
  await commitAll(root, `chore ${unrelatedTaskId} done`);
  const unrelatedBranch = `task/${unrelatedTaskId}/unrelated`;
  const unrelatedWorktreePath = path.join(
    root,
    ".agentplane",
    "worktrees",
    `${unrelatedTaskId}-unrelated`,
  );
  await execFileAsync(
    "git",
    ["worktree", "add", "-b", unrelatedBranch, unrelatedWorktreePath, "main"],
    { cwd: root, env: cleanGitEnv() },
  );
  await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  return {
    root,
    taskId,
    branch,
    branchHead,
    mergeCommit,
    worktreePath,
    unrelatedBranch,
    unrelatedWorktreePath,
  };
}

async function installFakeGh(opts: {
  kind: "found" | "not_found" | "unavailable";
  fixture: TargetedFixture;
  headSha?: string;
  baseRef?: string;
  mergeCommitSha?: string;
}): Promise<string> {
  const fakeBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-gh-"));
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const payload = {
    number: 123,
    state: "closed",
    merged_at: "2026-07-23T00:01:00.000Z",
    merge_commit_sha: opts.mergeCommitSha ?? opts.fixture.mergeCommit,
    html_url: "https://github.com/example/repo/pull/123",
    head: { ref: opts.fixture.branch, sha: opts.headSha ?? opts.fixture.branchHead },
    base: { ref: opts.baseRef ?? "main" },
  };
  await writeFile(
    scriptPath,
    [
      "const args = process.argv.slice(2);",
      'if (args[0] !== "api") process.exit(90);',
      opts.kind === "found"
        ? `console.log(${JSON.stringify(JSON.stringify(payload))});`
        : opts.kind === "not_found"
          ? `console.log(${JSON.stringify(
              JSON.stringify({
                ...payload,
                head: { ...payload.head, ref: `${payload.head.ref}-different` },
              }),
            )});`
          : `console.error(${JSON.stringify("authentication required")});`,
      `process.exit(${opts.kind === "unavailable" ? 1 : 0});`,
      "",
    ].join("\n"),
    "utf8",
  );
  if (process.platform === "win32") {
    await writeFile(ghPath, '@echo off\r\nnode "%~dp0\\fake-gh.mjs" %*\r\n', "utf8");
  } else {
    await writeFile(ghPath, '#!/bin/sh\nnode "$(dirname "$0")/fake-gh.mjs" "$@"\n', "utf8");
    await chmod(ghPath, 0o755);
  }
  return fakeBin;
}

async function runWithFakeGh(fakeBin: string, argv: string[]) {
  const previous = process.env.PATH;
  process.env.PATH = `${fakeBin}${path.delimiter}${previous ?? ""}`;
  try {
    const io = captureStdIO();
    try {
      return { code: await runCli(argv), stdout: io.stdout, stderr: io.stderr };
    } finally {
      io.restore();
    }
  } finally {
    if (previous === undefined) delete process.env.PATH;
    else process.env.PATH = previous;
  }
}

describe("cleanup merged targeted provider proof", { timeout: TEST_TIMEOUT_MS }, () => {
  it("deletes only the requested rebase-merged task and is idempotent", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const first = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(first.code).toBe(0);
    expect(first.stdout).toContain("proof=provider_merge");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(false);
    expect(await pathExists(fixture.worktreePath)).toBe(false);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
    expect(await pathExists(fixture.unrelatedWorktreePath)).toBe(true);

    const second = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(second.code).toBe(0);
    expect(second.stdout).toContain(`already clean: task=${fixture.taskId}`);
  });

  it("fails closed on provider head mismatch before deleting any candidate", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture, headSha: "0".repeat(40) });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider head mismatch");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
  });

  it("fails closed on provider base mismatch before deleting the worktree", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({ kind: "found", fixture, baseRef: "release" });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider PR was not found for the exact branch and base");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("fails closed when the provider merge commit is not on base", async () => {
    const fixture = await createTargetedFixture();
    const fakeBin = await installFakeGh({
      kind: "found",
      fixture,
      mergeCommitSha: fixture.branchHead,
    });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("provider merge commit is not on main");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(fixture.worktreePath)).toBe(true);
  });

  it("requires exact pre-merge closure evidence on base", async () => {
    const fixture = await createTargetedFixture();
    const metaPath = path.join(
      fixture.root,
      ".agentplane",
      "tasks",
      fixture.taskId,
      "pr",
      "meta.json",
    );
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pre_merge_closure: { branch: string };
    };
    meta.pre_merge_closure.branch = `${fixture.branch}-mismatch`;
    await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");
    await commitAll(fixture.root, `chore ${fixture.taskId} corrupt closure fixture`);

    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("exact pre-merge closure evidence is not recorded on base");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
  });

  it("distinguishes provider not-found from unavailable and fails closed for both", async () => {
    const fixture = await createTargetedFixture();
    for (const kind of ["not_found", "unavailable"] as const) {
      const fakeBin = await installFakeGh({ kind, fixture });
      const result = await runWithFakeGh(fakeBin, [
        "cleanup",
        "merged",
        "--task-id",
        fixture.taskId,
        "--yes",
        "--root",
        fixture.root,
      ]);
      expect(result.code).toBe(5);
      expect(result.stderr).toContain(
        kind === "not_found" ? "provider PR was not found" : "provider lookup is unavailable",
      );
      if (kind === "unavailable") expect(result.stderr).toContain("authentication required");
      expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    }
  });

  it("refuses a dirty requested worktree without touching unrelated candidates", async () => {
    const fixture = await createTargetedFixture();
    await writeFile(path.join(fixture.worktreePath, "uncommitted.txt"), "preserve me\n", "utf8");
    const fakeBin = await installFakeGh({ kind: "found", fixture });
    const result = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);
    expect(result.code).toBe(5);
    expect(result.stderr).toContain("Refusing to remove dirty worktree");
    expect(await gitBranchExists(fixture.root, fixture.branch)).toBe(true);
    expect(await pathExists(path.join(fixture.worktreePath, "uncommitted.txt"))).toBe(true);
    expect(await gitBranchExists(fixture.root, fixture.unrelatedBranch)).toBe(true);
  });

  it("cleans a provider-less task-close branch only after close evidence reaches base", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
    await commitAll(root, "chore base");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createTask(root, "Targeted close-tail cleanup");
    await commitAll(root, `chore ${taskId} scaffold`);
    const basisCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const basisCommit = basisCommitResult.stdout.trim();
    const task = await readTask({ cwd: root, taskId });
    await writeFile(
      task.readmePath,
      markDone(await readFile(task.readmePath, "utf8"), basisCommit),
      "utf8",
    );
    await commitAll(root, `chore ${taskId} done without close proof`);

    const branch = `task-close/${taskId}/1234567890ab`;
    const worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-close-tail`);
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const blockedIo = captureStdIO();
    try {
      expect(
        await runCli(["cleanup", "merged", "--task-id", taskId, "--yes", "--root", root]),
      ).toBe(5);
      expect(blockedIo.stderr).toContain("task-close evidence is not recorded on base");
    } finally {
      blockedIo.restore();
    }
    expect(await gitBranchExists(root, branch)).toBe(true);

    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "close-proof.txt"),
      "close evidence\n",
      "utf8",
    );
    await writeFile(task.readmePath, `${await readFile(task.readmePath, "utf8")}\n`, "utf8");
    const suffix = taskId.split("-").at(-1) ?? taskId;
    await commitAll(root, `✅ ${suffix} close: recorded (${taskId})`);

    const io = captureStdIO();
    try {
      expect(
        await runCli(["cleanup", "merged", "--task-id", taskId, "--yes", "--root", root]),
      ).toBe(0);
      expect(io.stdout).toContain("proof=patch_equivalent");
    } finally {
      io.restore();
    }
    expect(await gitBranchExists(root, branch)).toBe(false);
    expect(await pathExists(worktreePath)).toBe(false);
  });
});
