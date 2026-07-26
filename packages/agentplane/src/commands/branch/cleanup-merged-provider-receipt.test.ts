import { execFile } from "node:child_process";
import { chmod, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "../../cli/run-cli.js";
import {
  type ProviderReconciliationProof,
  validateMergedProviderReceipt,
} from "./cleanup-merged-provider-reconciliation.js";
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
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

type TaskCloseReceiptFixture = {
  root: string;
  taskId: string;
  closeBranch: string;
  closeWorktreePath: string;
  providerHeadBlob: string;
  mergeCommit: string;
};

function markDone(readme: string, commitHash: string): string {
  const done = readme.replace('status: "TODO"', 'status: "DONE"');
  const commitBlock = `commit:\n  hash: "${commitHash}"\n  message: "close evidence"`;
  return done.includes("commit: null")
    ? done.replace("commit: null", commitBlock)
    : done.replace("comments:", `${commitBlock}\ncomments:`);
}

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "new",
        "--title",
        "Provider receipt task-close fixture",
        "--description",
        "provider receipt type guard fixture",
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

async function createTaskCloseReceiptFixture(): Promise<TaskCloseReceiptFixture> {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await writeFile(path.join(root, "README.md"), "base\n", "utf8");
  await writeFile(path.join(root, ".gitignore"), TEST_WORKFLOW_GITIGNORE, "utf8");
  await commitAll(root, "chore base");
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);

  const taskId = await createTask(root);
  await commitAll(root, `chore ${taskId} scaffold`);
  const scaffoldCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const task = await readTask({ cwd: root, taskId });
  await writeFile(
    task.readmePath,
    markDone(await readFile(task.readmePath, "utf8"), scaffoldCommitResult.stdout.trim()),
    "utf8",
  );
  const suffix = taskId.split("-").at(-1) ?? taskId;
  await commitAll(root, `✅ ${suffix} close: recorded (${taskId})`);

  const blobPath = path.join(root, "provider-head-blob.txt");
  await writeFile(blobPath, "provider head must be a commit\n", "utf8");
  await commitAll(root, "chore provider head blob fixture");
  const [providerHeadBlobResult, mergeCommitResult] = await Promise.all([
    execFileAsync("git", ["rev-parse", "HEAD:provider-head-blob.txt"], {
      cwd: root,
      env: cleanGitEnv(),
    }),
    execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root, env: cleanGitEnv() }),
  ]);

  const closeBranch = `task-close/${taskId}/provider-head-blob`;
  const closeWorktreePath = path.join(
    root,
    ".agentplane",
    "worktrees",
    `${taskId}-provider-head-blob`,
  );
  await execFileAsync("git", ["worktree", "add", "-b", closeBranch, closeWorktreePath, "main"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
    cwd: root,
    env: cleanGitEnv(),
  });

  return {
    root,
    taskId,
    closeBranch,
    closeWorktreePath,
    providerHeadBlob: providerHeadBlobResult.stdout.trim(),
    mergeCommit: mergeCommitResult.stdout.trim(),
  };
}

async function installTaskCloseFakeGh(fixture: TaskCloseReceiptFixture): Promise<string> {
  const fakeBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-close-receipt-gh-"));
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const payload = {
    number: 123,
    state: "closed",
    merged_at: "2026-07-23T00:01:00.000Z",
    merge_commit_sha: fixture.mergeCommit,
    html_url: "https://github.com/example/repo/pull/123",
    head: { ref: fixture.closeBranch, sha: fixture.providerHeadBlob },
    base: { ref: "main" },
  };
  await writeFile(
    scriptPath,
    [
      'const args = process.argv.slice(2);',
      'if (args[0] !== "api" || !String(args[1] ?? "").includes("pulls?")) process.exit(90);',
      `console.log(JSON.stringify([${JSON.stringify(payload)}]));`,
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

describe("cleanup merged provider receipt type guard", () => {
  it("fails closed for a task-close provider head blob and preserves branch and worktree", async () => {
    const fixture = await createTaskCloseReceiptFixture();
    const fakeBin = await installTaskCloseFakeGh(fixture);
    const cleanup = await runWithFakeGh(fakeBin, [
      "cleanup",
      "merged",
      "--task-id",
      fixture.taskId,
      "--yes",
      "--root",
      fixture.root,
    ]);

    expect(cleanup.code).toBe(5);
    expect(cleanup.stderr).toContain(
      `provider head object is unavailable locally: ${fixture.providerHeadBlob}`,
    );
    expect(await gitBranchExists(fixture.root, fixture.closeBranch)).toBe(true);
    expect(await pathExists(fixture.closeWorktreePath)).toBe(true);

    const route = await runWithFakeGh(fakeBin, [
      "task",
      "next-action",
      fixture.taskId,
      "--remote",
      "--explain",
      "--root",
      fixture.root,
    ]);
    expect(route.code).toBe(0);
    expect(route.stdout).toMatch(/code:\s+cleanup_blocked/u);
    expect(route.stdout).toMatch(/next_command:\s+none/u);
    expect(route.stdout).toContain(
      `provider head object is unavailable locally: ${fixture.providerHeadBlob}`,
    );
    expect(await gitBranchExists(fixture.root, fixture.closeBranch)).toBe(true);
    expect(await pathExists(fixture.closeWorktreePath)).toBe(true);
  });

  it("requires every persisted reconciliation identity to resolve to a commit before accepting a receipt", async () => {
    const fixture = await createTaskCloseReceiptFixture();
    const proof: ProviderReconciliationProof = {
      kind: "exact_head",
      taskId: fixture.taskId,
      branch: fixture.closeBranch,
      baseBranch: "main",
      prNumber: 123,
      taskCommitSha: fixture.mergeCommit,
      localHeadSha: fixture.mergeCommit,
      providerHeadSha: fixture.mergeCommit,
      mergeCommit: fixture.mergeCommit,
      closureBasisCommit: fixture.mergeCommit,
    };
    const identities = [
      ["recorded task commit", { ...proof, taskCommitSha: fixture.providerHeadBlob }],
      ["recorded local task head", { ...proof, localHeadSha: fixture.providerHeadBlob }],
      ["recorded provider head", { ...proof, providerHeadSha: fixture.providerHeadBlob }],
      ["recorded provider merge commit", { ...proof, mergeCommit: fixture.providerHeadBlob }],
      [
        "recorded pre-merge closure basis",
        { ...proof, closureBasisCommit: fixture.providerHeadBlob },
      ],
    ] as const;
    const providerResult = {
      state: "found" as const,
      pr: {
        prNumber: 123,
        prUrl: "https://github.com/example/repo/pull/123",
        status: "MERGED" as const,
        mergedAt: "2026-07-23T00:01:00.000Z",
        mergeCommit: fixture.mergeCommit,
        base: "main",
        headSha: fixture.mergeCommit,
      },
    };

    for (const [label, expectedReconciliation] of identities) {
      const receipt = await validateMergedProviderReceipt({
        gitRoot: fixture.root,
        baseBranch: "main",
        expectedPrNumber: 123,
        expectedReconciliation,
        result: providerResult,
      });
      expect(receipt.receipt, label).toBeNull();
      expect(receipt.reason, label).toBe(
        `${label} object is unavailable locally: ${fixture.providerHeadBlob}`,
      );
    }
  });
});
