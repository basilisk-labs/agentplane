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
  resolveProviderReconciliation,
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
  providerHeadTag: string;
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
  const mergeCommitResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const tagName = `provider-receipt-${taskId}`;
  await execFileAsync("git", ["tag", "-a", tagName, "-m", "provider receipt fixture", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const [providerHeadBlobResult, providerHeadTagResult, tagTypeResult] = await Promise.all([
    execFileAsync("git", ["rev-parse", "HEAD:provider-head-blob.txt"], {
      cwd: root,
      env: cleanGitEnv(),
    }),
    execFileAsync("git", ["rev-parse", tagName], { cwd: root, env: cleanGitEnv() }),
    execFileAsync("git", ["cat-file", "-t", tagName], { cwd: root, env: cleanGitEnv() }),
  ]);
  expect(tagTypeResult.stdout.trim()).toBe("tag");

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
    providerHeadTag: providerHeadTagResult.stdout.trim(),
    mergeCommit: mergeCommitResult.stdout.trim(),
  };
}

async function installTaskCloseFakeGh(opts: {
  fixture: TaskCloseReceiptFixture;
  headSha: string;
  mergeCommit?: string;
}): Promise<string> {
  const fakeBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-close-receipt-gh-"));
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const payload = {
    number: 123,
    state: "closed",
    merged_at: "2026-07-23T00:01:00.000Z",
    merge_commit_sha: opts.mergeCommit ?? opts.fixture.mergeCommit,
    html_url: "https://github.com/example/repo/pull/123",
    head: { ref: opts.fixture.closeBranch, sha: opts.headSha },
    base: { ref: "main" },
  };
  await writeFile(
    scriptPath,
    [
      "const args = process.argv.slice(2);",
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
  it("fails closed for noncommit task-close receipt identities and preserves branch and worktree", async () => {
    const fixture = await createTaskCloseReceiptFixture();
    const cases: {
      name: string;
      headSha: string;
      mergeCommit?: string;
      expectedReason: string;
    }[] = [
      {
        name: "provider head blob",
        headSha: fixture.providerHeadBlob,
        expectedReason: `provider head object is unavailable locally: ${fixture.providerHeadBlob}`,
      },
      {
        name: "provider head annotated tag",
        headSha: fixture.providerHeadTag,
        expectedReason: `provider head object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "provider merge annotated tag",
        headSha: fixture.mergeCommit,
        mergeCommit: fixture.providerHeadTag,
        expectedReason: `provider merge commit object is unavailable locally: ${fixture.providerHeadTag}`,
      },
    ];

    for (const testCase of cases) {
      const fakeBin = await installTaskCloseFakeGh({
        fixture,
        headSha: testCase.headSha,
        mergeCommit: testCase.mergeCommit,
      });
      const cleanup = await runWithFakeGh(fakeBin, [
        "cleanup",
        "merged",
        "--task-id",
        fixture.taskId,
        "--yes",
        "--root",
        fixture.root,
      ]);

      expect(cleanup.code, testCase.name).toBe(5);
      expect(cleanup.stderr, testCase.name).toContain(testCase.expectedReason);
      expect(await gitBranchExists(fixture.root, fixture.closeBranch), testCase.name).toBe(true);
      expect(await pathExists(fixture.closeWorktreePath), testCase.name).toBe(true);

      const route = await runWithFakeGh(fakeBin, [
        "task",
        "next-action",
        fixture.taskId,
        "--remote",
        "--explain",
        "--root",
        fixture.root,
      ]);
      expect(route.code, testCase.name).toBe(0);
      expect(route.stdout, testCase.name).toMatch(/code:\s+cleanup_blocked/u);
      expect(route.stdout, testCase.name).toMatch(/next_command:\s+none/u);
      expect(route.stdout, testCase.name).toContain(testCase.expectedReason);
      expect(await gitBranchExists(fixture.root, fixture.closeBranch), testCase.name).toBe(true);
      expect(await pathExists(fixture.closeWorktreePath), testCase.name).toBe(true);
    }
  });

  it("rejects a replacement ref that makes an annotated provider head look like a commit", async () => {
    const fixture = await createTaskCloseReceiptFixture();
    await execFileAsync(
      "git",
      ["update-ref", `refs/replace/${fixture.providerHeadTag}`, fixture.mergeCommit],
      { cwd: fixture.root, env: cleanGitEnv() },
    );
    const replacedType = await execFileAsync("git", ["cat-file", "-t", fixture.providerHeadTag], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    expect(replacedType.stdout.trim()).toBe("commit");

    const fakeBin = await installTaskCloseFakeGh({
      fixture,
      headSha: fixture.providerHeadTag,
    });
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
      `provider head object is unavailable locally: ${fixture.providerHeadTag}`,
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
      `provider head object is unavailable locally: ${fixture.providerHeadTag}`,
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
    const identities: {
      label: string;
      withValue: (value: string) => ProviderReconciliationProof;
    }[] = [
      { label: "recorded task commit", withValue: (value) => ({ ...proof, taskCommitSha: value }) },
      {
        label: "recorded local task head",
        withValue: (value) => ({ ...proof, localHeadSha: value }),
      },
      {
        label: "recorded provider head",
        withValue: (value) => ({ ...proof, providerHeadSha: value }),
      },
      {
        label: "recorded provider merge commit",
        withValue: (value) => ({ ...proof, mergeCommit: value }),
      },
      {
        label: "recorded pre-merge closure basis",
        withValue: (value) => ({ ...proof, closureBasisCommit: value }),
      },
    ];
    const invalidValues = [
      {
        name: "blob",
        value: fixture.providerHeadBlob,
        expectedReason: (label: string) =>
          `${label} object is unavailable locally: ${fixture.providerHeadBlob}`,
      },
      {
        name: "annotated tag",
        value: fixture.providerHeadTag,
        expectedReason: (label: string) =>
          `${label} object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "mutable ref",
        value: fixture.closeBranch,
        expectedReason: (label: string) =>
          `${label} must be a canonical full commit OID: ${fixture.closeBranch}`,
      },
      {
        name: "short OID",
        value: fixture.mergeCommit.slice(0, 12),
        expectedReason: (label: string) =>
          `${label} must be a canonical full commit OID: ${fixture.mergeCommit.slice(0, 12)}`,
      },
    ];
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

    for (const invalidValue of invalidValues) {
      for (const identity of identities) {
        const receipt = await validateMergedProviderReceipt({
          gitRoot: fixture.root,
          baseBranch: "main",
          expectedPrNumber: 123,
          expectedReconciliation: identity.withValue(invalidValue.value),
          result: providerResult,
        });
        const label = `${invalidValue.name}: ${identity.label}`;
        expect(receipt.receipt, label).toBeNull();
        expect(receipt.reason, label).toBe(invalidValue.expectedReason(identity.label));
      }
    }
  });

  it("rejects annotated tags for every live reconciliation identity before ancestry proof", async () => {
    const fixture = await createTaskCloseReceiptFixture();
    const input = {
      gitRoot: fixture.root,
      taskId: fixture.taskId,
      branch: fixture.closeBranch,
      baseBranch: "main",
      taskCommitSha: fixture.mergeCommit,
      branchHead: fixture.mergeCommit,
      closureBasisCommit: fixture.mergeCommit,
      receipt: {
        prNumber: 123,
        providerHeadSha: fixture.mergeCommit,
        mergeCommit: fixture.mergeCommit,
      },
    };
    const positive = await resolveProviderReconciliation(input);
    expect(positive.proof?.kind).toBe("exact_head");

    const cases = [
      {
        name: "task commit",
        input: { ...input, taskCommitSha: fixture.providerHeadTag },
        expectedReason: `task commit object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "local task head",
        input: { ...input, branchHead: fixture.providerHeadTag },
        expectedReason: `local task branch head object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "pre-merge closure basis",
        input: { ...input, closureBasisCommit: fixture.providerHeadTag },
        expectedReason: `pre-merge closure basis object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "provider head",
        input: {
          ...input,
          receipt: { ...input.receipt, providerHeadSha: fixture.providerHeadTag },
        },
        expectedReason: `provider rebase head object is unavailable locally: ${fixture.providerHeadTag}`,
      },
      {
        name: "provider merge",
        input: {
          ...input,
          receipt: { ...input.receipt, mergeCommit: fixture.providerHeadTag },
        },
        expectedReason: `provider merge commit object is unavailable locally: ${fixture.providerHeadTag}`,
      },
    ] as const;

    for (const testCase of cases) {
      const reconciliation = await resolveProviderReconciliation(testCase.input);
      expect(reconciliation.proof, testCase.name).toBeNull();
      expect(reconciliation.reason, testCase.name).toBe(testCase.expectedReason);
    }
  });
});
