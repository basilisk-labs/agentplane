import { describe, expect, it } from "vitest";

import {
  chmod,
  cleanGitEnv,
  configureGitUser,
  configurePushableOrigin,
  execFile,
  installFakeGhPrApi,
  mkGitRepoRootWithBranch,
  mkdtemp,
  os,
  path,
  promisify,
  readFile,
  writeFile,
} from "@agentplane/testkit/cli-core-pr-flow";

import { pushTaskBranchUpstreamIfConfigured } from "./branch-publication.js";

const TEST_TIMEOUT_MS = 180_000;
const MATCHING_GITHUB_PUSH_URL = "git@github.com:example/repo.git";

async function readRemoteHead(root: string, remotePath: string, branch: string): Promise<string> {
  const execFileAsync = promisify(execFile);
  const { stdout } = await execFileAsync(
    "git",
    ["ls-remote", "--heads", remotePath, `refs/heads/${branch}`],
    {
      cwd: root,
      env: cleanGitEnv(),
    },
  );
  return stdout.trim().split(/\s+/, 1)[0] ?? "";
}

async function installGithubPushTransport(opts: {
  root: string;
  remotePath: string;
  branch: string;
  advertisedPushUrl?: string;
  raceHead?: string | null;
  sourceRaceHead?: string | null;
}): Promise<{ fakeGitBin: string; pushLogPath: string }> {
  const execFileAsync = promisify(execFile);
  const fakeGitBin = await mkdtemp(path.join(os.tmpdir(), "agentplane-github-push-transport-"));
  const { stdout: realGitStdout } = await execFileAsync("which", ["git"], {
    cwd: opts.root,
    env: cleanGitEnv(),
  });
  const advertisedPushUrl = opts.advertisedPushUrl ?? MATCHING_GITHUB_PUSH_URL;
  const pushLogPath = path.join(fakeGitBin, "push.log");
  const fakeGitPath = path.join(fakeGitBin, "git");
  await writeFile(
    fakeGitPath,
    [
      "#!/usr/bin/env node",
      "const fs = require('node:fs');",
      "const { spawnSync } = require('node:child_process');",
      `const realGit = ${JSON.stringify(realGitStdout.trim())};`,
      `const remotePath = ${JSON.stringify(opts.remotePath)};`,
      `const remoteRef = ${JSON.stringify(`refs/heads/${opts.branch}`)};`,
      `const advertisedFetchUrl = ${JSON.stringify(MATCHING_GITHUB_PUSH_URL)};`,
      `const advertisedPushUrl = ${JSON.stringify(advertisedPushUrl)};`,
      `const raceHead = ${JSON.stringify(opts.raceHead ?? null)};`,
      `const sourceRaceHead = ${JSON.stringify(opts.sourceRaceHead ?? null)};`,
      `const pushLogPath = ${JSON.stringify(pushLogPath)};`,
      "const args = process.argv.slice(2);",
      "if (args[0] === 'remote' && args[1] === 'get-url' && args.at(-1) === 'origin') {",
      "  if (args.includes('--push')) {",
      "    console.log(advertisedPushUrl);",
      "    process.exit(0);",
      "  }",
      "  if (args.includes('--all')) {",
      "    console.log(advertisedFetchUrl);",
      "    process.exit(0);",
      "  }",
      "}",
      "if (args[0] === 'push') fs.appendFileSync(pushLogPath, `${JSON.stringify(args)}\\n`);",
      "if (raceHead && args[0] === 'push' && args.some((arg) => arg.startsWith('--force-with-lease='))) {",
      "  const update = spawnSync(realGit, [`--git-dir=${remotePath}`, 'update-ref', remoteRef, raceHead], { stdio: 'inherit', env: process.env });",
      "  if (update.error) throw update.error;",
      "  if ((update.status ?? 1) !== 0) process.exit(update.status ?? 1);",
      "}",
      "if (sourceRaceHead && args[0] === 'push' && args.some((arg) => arg.startsWith('--force-with-lease='))) {",
      "  const update = spawnSync(realGit, ['update-ref', 'HEAD', sourceRaceHead], { cwd: process.cwd(), stdio: 'inherit', env: process.env });",
      "  if (update.error) throw update.error;",
      "  if ((update.status ?? 1) !== 0) process.exit(update.status ?? 1);",
      "}",
      "const forwarded = args.map((arg) => arg === advertisedPushUrl ? remotePath : arg);",
      "const result = spawnSync(realGit, forwarded, { stdio: 'inherit', env: process.env });",
      "if (result.error) throw result.error;",
      "process.exit(result.status ?? 1);",
      "",
    ].join("\n"),
    "utf8",
  );
  await chmod(fakeGitPath, 0o755);
  return { fakeGitBin, pushLogPath };
}

async function setupRewrittenOpenPrBranch(scenarioName: string): Promise<{
  branch: string;
  fakeGhBin: string;
  fakeGitBin: string;
  localHead: string;
  oldHead: string;
  pushLogPath: string;
  remotePath: string;
  root: string;
}> {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const execFileAsync = promisify(execFile);
  await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const remotePath = await configurePushableOrigin(root);
  await execFileAsync("git", ["commit", "--allow-empty", "-m", "chore initial main"], {
    cwd: root,
    env: cleanGitEnv(),
  });

  const branch = `task/T-LEASE/${scenarioName}`;
  await execFileAsync("git", ["checkout", "-b", branch], {
    cwd: root,
    env: cleanGitEnv(),
  });
  await execFileAsync("git", ["commit", "--allow-empty", "-m", "feat original task head"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const { stdout: oldHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const oldHead = oldHeadStdout.trim();
  await execFileAsync("git", ["push", "-u", "origin", `HEAD:refs/heads/${branch}`], {
    cwd: root,
    env: cleanGitEnv(),
  });
  await execFileAsync(
    "git",
    ["commit", "--amend", "--allow-empty", "-m", "feat rebased task head"],
    {
      cwd: root,
      env: cleanGitEnv(),
    },
  );
  const { stdout: localHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    env: cleanGitEnv(),
  });
  const localHead = localHeadStdout.trim();
  expect(localHead).not.toBe(oldHead);

  const { fakeBin: fakeGhBin } = await installFakeGhPrApi({
    scenarioName,
    branch,
    existingResponse: [
      {
        number: 321,
        html_url: "https://github.com/example/repo/pull/321",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { ref: branch, sha: oldHead },
        base: { ref: "main" },
      },
    ],
    createResponse: {},
  });
  const { fakeGitBin, pushLogPath } = await installGithubPushTransport({
    root,
    remotePath,
    branch,
  });
  return {
    branch,
    fakeGhBin,
    fakeGitBin,
    localHead,
    oldHead,
    pushLogPath,
    remotePath,
    root,
  };
}

describe("PR task branch publication", { timeout: TEST_TIMEOUT_MS }, () => {
  it("publishes a rebased existing open PR branch with a ref-scoped observed lease", async () => {
    const fixture = await setupRewrittenOpenPrBranch("force-lease-success");
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).resolves.toBe(true);
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.localHead,
    );
  });

  it("refuses rewrite publication when the task branch tracks the wrong upstream", async () => {
    const fixture = await setupRewrittenOpenPrBranch("wrong-upstream");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["config", `branch.${fixture.branch}.merge`, "refs/heads/main"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
  });

  it("does not publish a requested branch when another branch is checked out", async () => {
    const fixture = await setupRewrittenOpenPrBranch("wrong-current-branch");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "main"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).resolves.toBe(false);
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
  });

  it("refuses rewrite publication when origin fetch and push target different repositories", async () => {
    const fixture = await setupRewrittenOpenPrBranch("mismatched-push-repository");
    const { fakeGitBin, pushLogPath } = await installGithubPushTransport({
      root: fixture.root,
      remotePath: fixture.remotePath,
      branch: fixture.branch,
      advertisedPushUrl: "git@github.com:other/repo.git",
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
    const pushLogText = await readFile(pushLogPath, "utf8");
    expect(pushLogText).not.toContain("--force-with-lease=");
  });

  it("refuses rewrite publication when the provider head differs from the remote head", async () => {
    const fixture = await setupRewrittenOpenPrBranch("mismatched-provider-head");
    const providerHead = "f".repeat(40);
    expect(providerHead).not.toBe(fixture.oldHead);
    const { fakeBin: mismatchedGhBin } = await installFakeGhPrApi({
      scenarioName: "mismatched-provider-head-response",
      branch: fixture.branch,
      existingResponse: [
        {
          number: 321,
          html_url: "https://github.com/example/repo/pull/321",
          state: "open",
          merged_at: null,
          merge_commit_sha: null,
          head: { ref: fixture.branch, sha: providerHead },
          base: { ref: "main" },
        },
      ],
      createResponse: {},
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${mismatchedGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
  });

  it("refuses rewrite publication for a closed PR", async () => {
    const fixture = await setupRewrittenOpenPrBranch("closed-provider-pr");
    const { fakeBin: closedGhBin } = await installFakeGhPrApi({
      scenarioName: "closed-provider-pr-response",
      branch: fixture.branch,
      existingResponse: [
        {
          number: 321,
          html_url: "https://github.com/example/repo/pull/321",
          state: "closed",
          merged_at: null,
          merge_commit_sha: null,
          head: { ref: fixture.branch, sha: fixture.oldHead },
          base: { ref: "main" },
        },
      ],
      createResponse: {},
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${closedGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
  });

  it("refuses rewrite publication when no matching PR exists", async () => {
    const fixture = await setupRewrittenOpenPrBranch("missing-provider-pr");
    const { fakeBin: missingGhBin } = await installFakeGhPrApi({
      scenarioName: "missing-provider-pr-response",
      branch: fixture.branch,
      existingResponse: [],
      createResponse: {},
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fixture.fakeGitBin}${path.delimiter}${missingGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.oldHead,
    );
  });

  it("fails closed when the remote branch moves after observation", async () => {
    const fixture = await setupRewrittenOpenPrBranch("force-lease-race");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "race-head", fixture.oldHead], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "feat concurrent remote head"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const { stdout: raceHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const raceHead = raceHeadStdout.trim();
    await execFileAsync("git", ["push", "origin", "HEAD:refs/heads/race-seed"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["checkout", fixture.branch], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const { fakeGitBin, pushLogPath } = await installGithubPushTransport({
      root: fixture.root,
      remotePath: fixture.remotePath,
      branch: fixture.branch,
      raceHead,
    });

    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).rejects.toThrow();
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      raceHead,
    );
    const pushLogText = await readFile(pushLogPath, "utf8");
    const pushes = pushLogText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as string[]);
    const forcePush = pushes.find((args) =>
      args.some((arg) => arg.startsWith("--force-with-lease=")),
    );
    expect(forcePush).toContain(
      `--force-with-lease=refs/heads/${fixture.branch}:${fixture.oldHead}`,
    );
    expect(forcePush).not.toContain("--force");
  });

  it("publishes the observed source commit when worktree HEAD changes before push", async () => {
    const fixture = await setupRewrittenOpenPrBranch("force-lease-source-race");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "unobserved-source-head", fixture.localHead], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--allow-empty", "-m", "feat unobserved source head"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const { stdout: sourceRaceHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const sourceRaceHead = sourceRaceHeadStdout.trim();
    await execFileAsync("git", ["checkout", fixture.branch], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    const { fakeGitBin, pushLogPath } = await installGithubPushTransport({
      root: fixture.root,
      remotePath: fixture.remotePath,
      branch: fixture.branch,
      sourceRaceHead,
    });

    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGitBin}${path.delimiter}${fixture.fakeGhBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      await expect(
        pushTaskBranchUpstreamIfConfigured({
          gitRoot: fixture.root,
          branch: fixture.branch,
          baseBranch: "main",
          prNumber: 321,
        }),
      ).resolves.toBe(true);
    } finally {
      process.env.PATH = originalPath;
    }

    await expect(readRemoteHead(fixture.root, fixture.remotePath, fixture.branch)).resolves.toBe(
      fixture.localHead,
    );
    const { stdout: finalLocalHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: fixture.root,
      env: cleanGitEnv(),
    });
    expect(finalLocalHeadStdout.trim()).toBe(sourceRaceHead);

    const pushLogText = await readFile(pushLogPath, "utf8");
    const pushes = pushLogText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as string[]);
    const forcePush = pushes.find((args) =>
      args.some((arg) => arg.startsWith("--force-with-lease=")),
    );
    expect(forcePush).toContain(`${fixture.localHead}:refs/heads/${fixture.branch}`);
    expect(forcePush).not.toContain(`HEAD:refs/heads/${fixture.branch}`);
  });
});
