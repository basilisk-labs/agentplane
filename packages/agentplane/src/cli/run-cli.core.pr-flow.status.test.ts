import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  readFile,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";
import { execFileAsync } from "@agentplaneorg/core/process";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  observeExistingGithubPrByBranch,
  tryLookupExistingGithubPrByNumber,
} from "../commands/pr/internal/sync-github.js";

function expectLabeledValue(output: string, label: string, expected: string): void {
  const line = output.split(/\r?\n/u).find((line) => line.trimStart().startsWith(`${label}:`));
  const separator = line?.indexOf(":") ?? -1;
  expect(separator >= 0 ? line?.slice(separator + 1).trim() : undefined).toBe(expected);
}

type FakePull = {
  number: number;
  html_url: string;
  state: "open" | "closed";
  merged_at: string | null;
  merge_commit_sha: string | null;
  head: { ref: string; sha: string };
  base: { ref: string };
};

async function installFakeGh(
  root: string,
  opts: { checksExitCode: number; pull?: FakePull; lookupFailure?: string },
) {
  const fakeBin = path.join(root, "fake-bin");
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  await writeFile(
    scriptPath,
    [
      "const args = process.argv.slice(2);",
      `const pull = ${JSON.stringify(opts.pull ?? null)};`,
      `const lookupFailure = ${JSON.stringify(opts.lookupFailure ?? null)};`,
      'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls") && lookupFailure) {',
      "  console.error(lookupFailure);",
      "  process.exit(1);",
      "}",
      'if (args[0] === "api" && /^repos\\/example\\/repo\\/pulls\\/\\d+$/.test(args[1] ?? "")) {',
      "  if (!pull || args[1] !== `repos/example/repo/pulls/${pull.number}`) process.exit(1);",
      "  console.log(JSON.stringify(pull));",
      "  process.exit(0);",
      "}",
      'if (args[0] === "api" && (args[1] ?? "").startsWith("repos/example/repo/pulls?")) {',
      "  console.log(JSON.stringify([]));",
      "  process.exit(0);",
      "}",
      'if (args[0] === "pr" && args[1] === "checks") {',
      "  console.log(JSON.stringify([",
      '    { name: "unit", state: "SUCCESS" },',
      '    { name: "lint", state: "PENDING" },',
      '    { name: "static", state: "SKIPPING" }',
      "  ]));",
      `  process.exit(${opts.checksExitCode});`,
      "}",
      'if (args[0] === "api" && args[1] === "graphql") {',
      "  console.log(JSON.stringify({ data: { repository: { pullRequest: { reviewThreads: { nodes: [] } } } } }));",
      "  process.exit(0);",
      "}",
      "console.error(`unexpected gh args: ${JSON.stringify(args)}`);",
      "process.exit(91);",
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

describe("runCli pr flow status", () => {
  it("distinguishes a confirmed missing PR from unavailable GitHub lookup", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await execFileAsync("git", ["remote", "add", "origin", "git@github.com:example/repo.git"], {
      cwd: root,
    });
    const branch = "task/T-1/lookup";
    const oldPath = process.env.PATH;

    const availableBin = await installFakeGh(root, { checksExitCode: 0 });
    process.env.PATH = `${availableBin}${path.delimiter}${oldPath ?? ""}`;
    await expect(
      observeExistingGithubPrByBranch({
        gitRoot: root,
        branch,
        baseBranch: "main",
      }),
    ).resolves.toEqual({ state: "not_found" });

    const unavailableBin = await installFakeGh(root, {
      checksExitCode: 0,
      lookupFailure: "authentication required",
    });
    process.env.PATH = `${unavailableBin}${path.delimiter}${oldPath ?? ""}`;
    try {
      const unavailable = await observeExistingGithubPrByBranch({
        gitRoot: root,
        branch,
        baseBranch: "main",
      });
      expect(unavailable.state).toBe("unavailable");
      if (unavailable.state !== "unavailable") {
        throw new Error("expected unavailable GitHub observation");
      }
      expect(unavailable.reason).toContain("authentication required");
    } finally {
      process.env.PATH = oldPath;
    }
  });

  it("reports task branch, local PR metadata, close-tail state, and next action", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const taskIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Inspect PR flow status",
        "--description",
        "PR flow status should summarize branch_pr state without mutating remote providers.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }

    const branch = `task/${taskId}/flow-status`;
    expect(
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--sync-only",
        "--root",
        root,
      ]),
    ).toBe(0);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as { branch?: string };
    expect(meta.branch).toBe(branch);
    await mkdir(path.join(root, ".agentplane", "cache"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "cache", "integration-queue.json"),
      `${JSON.stringify({
        schema_version: 1,
        entries: [
          {
            task_id: taskId,
            branch,
            base: "main",
            head_sha: "head",
            base_sha: "base",
            changed_paths: ["file.txt"],
            pr_number: null,
            pr_url: null,
            priority: 0,
            status: "handoff",
            enqueued_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:01:00.000Z",
            reason: "protected base handoff recorded",
          },
        ],
      })}\n`,
      "utf8",
    );
    const handoffDir = path.join(root, ".agentplane", "tasks", taskId, "handoff");
    await mkdir(handoffDir, { recursive: true });
    await writeFile(
      path.join(handoffDir, "latest.json"),
      `${JSON.stringify({
        schema_version: 1,
        task_id: taskId,
        created_at: "2026-01-01T00:00:00.000Z",
        from_role: "INTEGRATOR",
        reason: "branch_pr integration is waiting for hosted close",
        route: { kind: "protected_base_integrate", status: "awaiting_github_merge" },
        next_actions: ["git pull --ff-only"],
      })}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "flow", "status", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("PR flow status");
      expectLabeledValue(io.stdout, "task", `${taskId} TODO`);
      expectLabeledValue(io.stdout, "branch", branch);
      expectLabeledValue(io.stdout, "remote_pr", "github: not_found (source=metadata)");
      expectLabeledValue(
        io.stdout,
        "hosted_checks",
        "unchecked: GitHub PR number is not recorded in PR metadata",
      );
      expectLabeledValue(
        io.stdout,
        "review_threads",
        "unchecked: GitHub PR number is not recorded in PR metadata",
      );
      expectLabeledValue(io.stdout, "queue", "handoff: protected base handoff recorded");
      expectLabeledValue(
        io.stdout,
        "handoff",
        "awaiting_github_merge: branch_pr integration is waiting for hosted close",
      );
      expectLabeledValue(io.stdout, "next", `agentplane pr open ${taskId} --author <ROLE>`);
    } finally {
      io.restore();
    }
  });

  it("reports hosted check counts when gh returns pending status with exit code 8", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "git@github.com:example/repo.git"], {
      cwd: root,
    });

    let taskId = "";
    const taskIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Inspect hosted checks",
        "--description",
        "PR flow status should summarize pending hosted checks.",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }

    const branch = `task/${taskId}/flow-status`;
    expect(
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--sync-only",
        "--root",
        root,
      ]),
    ).toBe(0);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    await writeFile(
      metaPath,
      `${JSON.stringify({ ...meta, pr_number: 123, pr_url: "https://github.com/example/repo/pull/123", status: "OPEN" })}\n`,
      "utf8",
    );

    const fakeBin = await installFakeGh(root, { checksExitCode: 8 });
    const oldPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${oldPath ?? ""}`;
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "flow", "status", taskId, "--root", root]);
      expect(code).toBe(0);
      expectLabeledValue(io.stdout, "hosted_checks", "total=3 passing=2 pending=1 failing=0");
      expectLabeledValue(io.stdout, "review_threads", "unresolved=0");
    } finally {
      io.restore();
      process.env.PATH = oldPath;
    }
  });

  it("resolves a merged PR by persisted number after its remote head branch is deleted", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "git@github.com:example/repo.git"], {
      cwd: root,
    });

    const taskIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Resolve merged PR by number",
          "--description",
          "Queue recovery must survive provider deletion of the merged PR head branch.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }

    const branch = `task/${taskId}/flow-status`;
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      branch,
      "--sync-only",
      "--root",
      root,
    ]);
    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    await writeFile(
      metaPath,
      `${JSON.stringify({ ...meta, pr_number: 123, pr_url: "https://github.com/example/repo/pull/123", status: "OPEN" })}\n`,
      "utf8",
    );

    const fakeBin = await installFakeGh(root, {
      checksExitCode: 0,
      pull: {
        number: 123,
        html_url: "https://github.com/example/repo/pull/123",
        state: "closed",
        merged_at: "2026-07-10T10:31:44Z",
        merge_commit_sha: "merge123",
        head: { ref: branch, sha: "head123" },
        base: { ref: "main" },
      },
    });
    const oldPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${oldPath ?? ""}`;
    const io = captureStdIO();
    try {
      expect(await runCli(["pr", "flow", "status", taskId, "--root", root])).toBe(0);
      expectLabeledValue(
        io.stdout,
        "remote_pr",
        "github: MERGED #123 https://github.com/example/repo/pull/123 (source=lookup)",
      );
      await expect(
        tryLookupExistingGithubPrByNumber({
          gitRoot: root,
          prNumber: 123,
          branch: `${branch}-other`,
          baseBranch: "main",
        }),
      ).resolves.toBeNull();
      await expect(
        tryLookupExistingGithubPrByNumber({
          gitRoot: root,
          prNumber: 123,
          branch,
          baseBranch: "release",
        }),
      ).resolves.toBeNull();
    } finally {
      io.restore();
      process.env.PATH = oldPath;
    }
  });

  it("uses queue identity conservatively when task PR artifacts are not on the base checkout", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["remote", "add", "origin", "git@github.com:example/repo.git"], {
      cwd: root,
    });

    const taskIo = captureStdIO();
    let taskId = "";
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Resolve queued PR identity",
          "--description",
          "Queue diagnostics must not invent a missing PR before task artifacts reach main.",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }

    const branch = `task/${taskId}/queued-work`;
    await mkdir(path.join(root, ".agentplane", "cache"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "cache", "integration-queue.json"),
      `${JSON.stringify({
        schema_version: 1,
        entries: [
          {
            task_id: taskId,
            branch,
            base: "main",
            head_sha: "queued-head",
            base_sha: "base",
            changed_paths: ["file.txt"],
            pr_number: 124,
            pr_url: "https://github.com/example/repo/pull/124",
            priority: 0,
            status: "queued",
            enqueued_at: "2026-01-01T00:00:00.000Z",
            updated_at: "2026-01-01T00:01:00.000Z",
          },
        ],
      })}\n`,
      "utf8",
    );

    const fakeBin = await installFakeGh(root, { checksExitCode: 0 });
    const oldPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${oldPath ?? ""}`;
    const io = captureStdIO();
    try {
      expect(await runCli(["pr", "flow", "status", taskId, "--root", root])).toBe(0);
      expectLabeledValue(io.stdout, "branch", branch);
      expectLabeledValue(
        io.stdout,
        "remote_pr",
        "github: OPEN #124 https://github.com/example/repo/pull/124 (source=metadata)",
      );
      expectLabeledValue(io.stdout, "queue", "queued");
    } finally {
      io.restore();
    }

    const queuePath = path.join(root, ".agentplane", "cache", "integration-queue.json");
    const queue = JSON.parse(await readFile(queuePath, "utf8")) as {
      entries: Record<string, unknown>[];
    };
    queue.entries[0] = { ...queue.entries[0], status: "handoff" };
    await writeFile(queuePath, `${JSON.stringify(queue)}\n`, "utf8");

    const handoffIo = captureStdIO();
    try {
      expect(await runCli(["pr", "flow", "status", taskId, "--root", root])).toBe(0);
      expectLabeledValue(handoffIo.stdout, "remote_pr", "github: not_found (source=metadata)");
      expectLabeledValue(handoffIo.stdout, "queue", "handoff");
    } finally {
      handoffIo.restore();
      process.env.PATH = oldPath;
    }
  });
});
