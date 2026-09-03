import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { parseTaskReadme, readTask, renderTaskFrontmatter } from "@agentplaneorg/core/tasks";

import { runCli } from "../../cli/run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  mkGitRepoRootWithBranch,
  mkTempDir,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const TEST_WORKFLOW_GITIGNORE =
  ".agentplane/worktrees\n" +
  ".agentplane/cache\n" +
  ".agentplane/cache.sqlite\n" +
  ".agentplane/cache.sqlite-wal\n" +
  ".agentplane/cache.sqlite-shm\n";

export type TargetedFixture = {
  root: string;
  taskId: string;
  branch: string;
  branchHead: string;
  mergeCommit: string;
  worktreePath: string;
  unrelatedBranch: string;
  unrelatedWorktreePath: string;
  siblingBaseWorktreePath: string | null;
};

export async function createTask(root: string, title: string): Promise<string> {
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

export function markDone(readme: string, commitHash: string): string {
  const done = readme.replace('status: "TODO"', 'status: "DONE"');
  const commitBlock = `commit:\n  hash: "${commitHash}"\n  message: "pre-merge closure basis"`;
  return done.includes("commit: null")
    ? done.replace("commit: null", commitBlock)
    : done.replace("comments:", `${commitBlock}\ncomments:`);
}

export async function createTargetedFixture(
  opts: {
    directExternalWorktree?: boolean;
    legacyMissingPrNumber?: boolean;
    nestedSiblingWorktree?: boolean;
  } = {},
): Promise<TargetedFixture> {
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
  const siblingBaseWorktreePath = opts.nestedSiblingWorktree
    ? path.join(await mkTempDir(), "base-main")
    : null;
  const directExternalWorktreeRoot = opts.directExternalWorktree ? await mkTempDir() : null;
  if (siblingBaseWorktreePath) {
    await execFileAsync("git", ["worktree", "add", "--force", siblingBaseWorktreePath, "main"], {
      cwd: root,
      env: cleanGitEnv(),
    });
  }
  const worktreePath = siblingBaseWorktreePath
    ? path.join(siblingBaseWorktreePath, ".agentplane", "worktrees", `${taskId}-targeted`)
    : directExternalWorktreeRoot
      ? path.join(directExternalWorktreeRoot, `${taskId}-targeted`)
      : path.join(root, ".agentplane", "worktrees", `${taskId}-targeted`);
  await mkdir(path.dirname(worktreePath), { recursive: true });
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
        ...(opts.legacyMissingPrNumber
          ? {}
          : {
              pr_number: 123,
              pr_url: "https://github.com/example/repo/pull/123",
              status: "OPEN",
            }),
        created_at: "2026-07-23T00:00:00.000Z",
        updated_at: "2026-07-23T00:00:00.000Z",
        last_verified_at: "2026-07-23T00:00:00.000Z",
        verify: { status: "pass" },
        pre_merge_closure: {
          state: "closed_before_merge",
          branch,
          basis_commit: scaffoldCommit,
          recorded_at: "2026-07-23T00:00:00.000Z",
          ...(opts.legacyMissingPrNumber ? {} : { pr_number: 123 }),
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
    siblingBaseWorktreePath,
  };
}

export async function installFakeGh(opts: {
  additionalBranchPrNumbers?: number[];
  kind: "found" | "not_found" | "unavailable";
  fixture: TargetedFixture;
  headSha?: string;
  baseRef?: string;
  mergeCommitSha?: string;
  prNumber?: number;
  providerStatus?: "MERGED" | "OPEN" | "CLOSED";
  providerUpdateBaseSha?: string;
}): Promise<string> {
  const fakeBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-cleanup-gh-"));
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const providerStatus = opts.providerStatus ?? "MERGED";
  const payload = {
    number: opts.prNumber ?? 123,
    state: providerStatus === "OPEN" ? "open" : "closed",
    merged_at: providerStatus === "MERGED" ? "2026-07-23T00:01:00.000Z" : null,
    merge_commit_sha: opts.mergeCommitSha ?? opts.fixture.mergeCommit,
    html_url: "https://github.com/example/repo/pull/123",
    head: { ref: opts.fixture.branch, sha: opts.headSha ?? opts.fixture.branchHead },
    base: { ref: opts.baseRef ?? "main" },
  };
  const branchPayloads = [
    payload,
    ...(opts.additionalBranchPrNumbers ?? []).map((number) => ({
      ...payload,
      number,
      html_url: `https://github.com/example/repo/pull/${number}`,
    })),
  ];
  const providerUpdatePayload =
    opts.providerUpdateBaseSha && opts.headSha
      ? {
          sha: opts.headSha,
          parents: [{ sha: opts.fixture.branchHead }, { sha: opts.providerUpdateBaseSha }],
        }
      : null;
  await writeFile(
    scriptPath,
    [
      "const args = process.argv.slice(2);",
      'if (args[0] !== "api") process.exit(90);',
      providerUpdatePayload
        ? `if (args[1] === ${JSON.stringify(
            `repos/example/repo/commits/${opts.headSha}`,
          )}) { console.log(${JSON.stringify(JSON.stringify(providerUpdatePayload))}); process.exit(0); }`
        : "",
      opts.kind === "found"
        ? `console.log(args[1]?.includes("pulls?") ? ${JSON.stringify(
            JSON.stringify(branchPayloads),
          )} : ${JSON.stringify(JSON.stringify(payload))});`
        : opts.kind === "not_found"
          ? `console.log(args[1]?.includes("pulls?") ? ${JSON.stringify(
              JSON.stringify([
                {
                  ...payload,
                  head: { ...payload.head, ref: `${payload.head.ref}-different` },
                },
              ]),
            )} : ${JSON.stringify(
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

export async function configureFinalizationRemote(fixture: TargetedFixture): Promise<string> {
  const remoteRoot = path.join(await mkTempDir(), "origin.git");
  await execFileAsync("git", ["init", "--bare", remoteRoot], {
    cwd: fixture.root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["remote", "set-url", "origin", remoteRoot], {
    cwd: fixture.root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["push", "-u", "origin", "main"], {
    cwd: fixture.root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["push", "-u", "origin", fixture.branch], {
    cwd: fixture.root,
    env: cleanGitEnv(),
  });
  return remoteRoot;
}

export async function commitAuthorityOnlyTail(fixture: TargetedFixture): Promise<string> {
  const task = await readTask({ cwd: fixture.worktreePath, taskId: fixture.taskId });
  const readme = await readFile(task.readmePath, "utf8");
  const parsed = parseTaskReadme(readme);
  const updated = `${renderTaskFrontmatter({
    ...parsed.frontmatter,
    extensions: {
      ...parsed.frontmatter.extensions,
      "agentplane.side_effect_authority": {
        schemaVersion: 1,
        grants: [],
        audit: [],
      },
    },
  })}${parsed.body}`;
  expect(updated).not.toBe(readme);
  await writeFile(task.readmePath, updated, "utf8");
  await commitAll(fixture.worktreePath, `authority ${fixture.taskId} post-merge cleanup`);
  const { stdout } = await execFileAsync("git", ["rev-parse", fixture.branch], {
    cwd: fixture.root,
    env: cleanGitEnv(),
  });
  return stdout.trim();
}

export async function installFakeGithubOriginLookup(
  fakeBin: string,
  pullRemote?: string,
): Promise<void> {
  const locator = process.platform === "win32" ? "where" : "which";
  const { stdout } = await execFileAsync(locator, ["git"], { env: cleanGitEnv() });
  const actualGit = stdout
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0)
    ?.trim();
  if (!actualGit) throw new Error("Could not resolve the real git executable for the test fixture");

  const gitPath = path.join(fakeBin, process.platform === "win32" ? "git.cmd" : "git");
  if (process.platform === "win32") {
    await writeFile(
      gitPath,
      [
        "@echo off",
        'if "%~1"=="remote" if "%~2"=="get-url" if "%~3"=="origin" (',
        "  echo https://github.com/example/repo.git",
        "  exit /b 0",
        ")",
        ...(pullRemote
          ? [
              'if "%~1"=="pull" if "%~2"=="--ff-only" if "%~3"=="origin" (',
              `  "${actualGit}" pull --ff-only "${pullRemote}" "%~4"`,
              "  exit /b %errorlevel%",
              ")",
              'if "%~1"=="fetch" if "%~2"=="--prune" if "%~3"=="origin" (',
              `  "${actualGit}" fetch --prune "${pullRemote}" "+refs/heads/*:refs/remotes/origin/*"`,
              "  exit /b %errorlevel%",
              ")",
              'if "%~1"=="ls-remote" if "%~2"=="--heads" if "%~3"=="origin" (',
              `  "${actualGit}" ls-remote --heads "${pullRemote}" "%~4"`,
              "  exit /b %errorlevel%",
              ")",
              'if "%~1"=="push" if "%~2"=="origin" if "%~3"=="--delete" (',
              `  "${actualGit}" push "${pullRemote}" --delete "%~4"`,
              "  exit /b %errorlevel%",
              ")",
            ]
          : []),
        `"${actualGit}" %*`,
        "",
      ].join("\r\n"),
      "utf8",
    );
    return;
  }

  await writeFile(
    gitPath,
    [
      "#!/bin/sh",
      'if [ "$1" = "remote" ] && [ "$2" = "get-url" ] && [ "$3" = "origin" ]; then',
      "  printf '%s\\n' 'https://github.com/example/repo.git'",
      "  exit 0",
      "fi",
      ...(pullRemote
        ? [
            'if [ "$1" = "pull" ] && [ "$2" = "--ff-only" ] && [ "$3" = "origin" ]; then',
            `  exec ${JSON.stringify(actualGit)} pull --ff-only ${JSON.stringify(pullRemote)} "$4"`,
            "fi",
            'if [ "$1" = "fetch" ] && [ "$2" = "--prune" ] && [ "$3" = "origin" ]; then',
            `  exec ${JSON.stringify(actualGit)} fetch --prune ${JSON.stringify(pullRemote)} '+refs/heads/*:refs/remotes/origin/*'`,
            "fi",
            'if [ "$1" = "ls-remote" ] && [ "$2" = "--heads" ] && [ "$3" = "origin" ]; then',
            `  exec ${JSON.stringify(actualGit)} ls-remote --heads ${JSON.stringify(pullRemote)} "$4"`,
            "fi",
            'if [ "$1" = "push" ] && [ "$2" = "origin" ] && [ "$3" = "--delete" ]; then',
            `  exec ${JSON.stringify(actualGit)} push ${JSON.stringify(pullRemote)} --delete "$4"`,
            "fi",
          ]
        : []),
      `exec ${JSON.stringify(actualGit)} "$@"`,
      "",
    ].join("\n"),
    "utf8",
  );
  await chmod(gitPath, 0o755);
}

export async function runWithFakeGh(fakeBin: string, argv: string[]) {
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

export async function runTargetedCleanup(fakeBin: string, fixture: TargetedFixture) {
  return runWithFakeGh(fakeBin, [
    "cleanup",
    "merged",
    "--task-id",
    fixture.taskId,
    "--yes",
    "--root",
    fixture.root,
  ]);
}

describe("targeted cleanup test support", () => {
  it("exposes the reusable real-Git fixture helpers", () => {
    expect(createTargetedFixture).toBeTypeOf("function");
    expect(runTargetedCleanup).toBeTypeOf("function");
  });
});
