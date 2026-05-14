import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();
const PR_CLOSE_SUPERSEDED_TIMEOUT_MS = 60_000;

function expectLabeledValue(output: string, label: string, expected: string): void {
  const line = output.split(/\r?\n/u).find((line) => line.trimStart().startsWith(`${label}:`));
  expect(line?.split(/:\s*/u, 2)[1]).toBe(expected);
}

async function installFakeGhRepair(opts: {
  scenarioName: string;
  branch: string;
  prNumber?: number;
  openPrs?: number;
  captureEnv?: boolean;
}) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-close-superseded-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const prNumber = opts.prNumber ?? 141;
  const openPrs = opts.openPrs ?? 1;
  const expectedHead = `example:${opts.branch}`;
  const openPrsPayload = JSON.stringify(
    Array.from({ length: openPrs }, (_, index) => ({
      number: prNumber + index,
      state: "open",
      html_url: `https://github.com/example/repo/pull/${prNumber + index}`,
      head: { ref: opts.branch, repo: { full_name: "example/repo" } },
      base: { ref: "main" },
    })),
  );
  const closePayloadJson = JSON.stringify({
    number: prNumber,
    state: "closed",
    html_url: `https://github.com/example/repo/pull/${prNumber}`,
    head: { ref: opts.branch, repo: { full_name: "example/repo" } },
  });
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      "const envLogPath = process.env.AGENTPLANE_GH_ENV_LOG;",
      opts.captureEnv
        ? "if (envLogPath) fs.appendFileSync(envLogPath, `${JSON.stringify({ GH_TOKEN: process.env.GH_TOKEN ?? null, HOME: process.env.HOME ?? null, GIT_DIR: process.env.GIT_DIR ?? null, GIT_WORK_TREE: process.env.GIT_WORK_TREE ?? null })}\\n`);"
        : "",
      `const expectedHead = ${JSON.stringify(expectedHead)};`,
      `const openPrs = ${openPrsPayload};`,
      `const closePayload = ${closePayloadJson};`,
      'if (args[0] === "pr" && args[1] === "list") {',
      '  const repoIndex = args.indexOf("--repo");',
      '  const headIndex = args.indexOf("--head");',
      '  const stateIndex = args.indexOf("--state");',
      '  if (repoIndex >= 0 && args[repoIndex + 1] === "example/repo" && headIndex >= 0 && args[headIndex + 1] === expectedHead && stateIndex >= 0 && args[stateIndex + 1] === "open") {',
      `    console.log(JSON.stringify(${openPrs > 0 ? "openPrs" : "[]"}));`,
      "    process.exit(0);",
      "  }",
      "}",
      'if (args[0] === "api") {',
      '  const endpoint = args[1] ?? "";',
      '  const [route, query = ""] = endpoint.split("?", 2);',
      '  if (route === "repos/example/repo/pulls" && query === `head=${encodeURIComponent(expectedHead)}&state=open&per_page=100`) {',
      "    console.log(JSON.stringify(openPrs));",
      "    process.exit(0);",
      "  }",
      '  if (route === "repos/example/repo/pulls/' +
        prNumber +
        '" && !query && !args.includes("-X")) {',
      "    console.log(JSON.stringify(closePayload));",
      "    process.exit(0);",
      "  }",
      `  if (route === "repos/example/repo/issues/${prNumber}/comments" && args.includes("-X") && args[args.indexOf("-X") + 1] === "POST") {`,
      "    console.log(JSON.stringify({ id: 1 }));",
      "    process.exit(0);",
      "  }",
      `  if (route === "repos/example/repo/pulls/${prNumber}" && args.includes("-X") && args[args.indexOf("-X") + 1] === "PATCH") {`,
      "    console.log(JSON.stringify(closePayload));",
      "    process.exit(0);",
      "  }",
      `  if (route === "repos/example/repo/git/refs/heads/${encodeURIComponent(opts.branch)}" && args.includes("-X") && args[args.indexOf("-X") + 1] === "DELETE") {`,
      "    process.exit(0);",
      "  }",
      '  console.error(`unexpected gh api call: ${args.join(" ")}`);',
      "  process.exit(91);",
      "}",
      'console.error(`unexpected gh command: ${args.join(" ")}`);',
      "process.exit(90);",
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
  return {
    fakeBin,
    logPath: path.join(fakeBin, "gh.log"),
    envLogPath: path.join(fakeBin, "gh-env.log"),
  };
}

async function prepareDoneTaskWithPrMeta(
  root: string,
  taskId: string,
  branch: string,
): Promise<void> {
  const task = await readTask({ cwd: root, taskId });
  const readmeText = await readFile(task.readmePath, "utf8");
  await writeFile(task.readmePath, readmeText.replace('status: "TODO"', 'status: "DONE"'), "utf8");
  const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    JSON.stringify(
      {
        schema_version: 1,
        task_id: taskId,
        branch,
        created_at: "2026-04-09T00:00:00.000Z",
        updated_at: "2026-04-09T00:00:00.000Z",
        status: "MERGED",
      },
      null,
      2,
    ),
    "utf8",
  );
}

describe("runCli pr close-superseded", () => {
  it(
    "closes an open superseded task PR from task artifacts and deletes the remote branch",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await commitAll(root, "chore config");
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const execFileAsyncLocal = promisify(execFile);
      await execFileAsyncLocal(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Superseded PR repair",
          "--description",
          "Repair a stale task PR",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      const branch = `task/${taskId}/close-superseded`;
      await prepareDoneTaskWithPrMeta(root, taskId, branch);
      const { fakeBin, logPath } = await installFakeGhRepair({
        scenarioName: "open-repair",
        branch,
      });
      const originalPath = process.env.PATH;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      process.env.AGENTPLANE_GH_LOG = logPath;

      const io = captureStdIO();
      try {
        const code = await runCli([
          "pr",
          "close-superseded",
          taskId,
          "--delete-remote-branch",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain(`✅ pr close #141`);
        expectLabeledValue(io.stdout, "comment", "added");
        expectLabeledValue(io.stdout, "remote_branch_action", "deleted");
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        delete process.env.AGENTPLANE_GH_LOG;
      }

      const rawLog = await readFile(logPath, "utf8");
      const log = rawLog
        .trim()
        .split("\n")
        .map((line) => JSON.parse(line) as string[]);
      expect(log).toEqual([
        [
          "api",
          `repos/example/repo/pulls?head=${encodeURIComponent(`example:${branch}`)}&state=open&per_page=100`,
        ],
        ["api", "repos/example/repo/pulls/141"],
        [
          "api",
          "repos/example/repo/issues/141/comments",
          "-X",
          "POST",
          "-f",
          "body=Superseded by protected-main closure of task " + taskId + ".",
        ],
        ["api", "repos/example/repo/pulls/141", "-X", "PATCH", "-f", "state=closed"],
        ["api", `repos/example/repo/git/refs/heads/${encodeURIComponent(branch)}`, "-X", "DELETE"],
      ]);
    },
    PR_CLOSE_SUPERSEDED_TIMEOUT_MS,
  );

  it("no-ops when no open task PR remains", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsyncLocal = promisify(execFile);
    await execFileAsyncLocal(
      "git",
      ["remote", "add", "origin", "https://github.com/example/repo.git"],
      {
        cwd: root,
        env: cleanGitEnv(),
      },
    );

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Superseded PR no-op",
        "--description",
        "No open task PR remains",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/close-superseded`;
    await prepareDoneTaskWithPrMeta(root, taskId, branch);
    const { fakeBin, logPath } = await installFakeGhRepair({
      scenarioName: "noop",
      branch,
      openPrs: 0,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "close-superseded", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`pr close-superseded ${taskId}`);
      expectLabeledValue(io.stdout, "reason", "no open task PR found");
      expectLabeledValue(io.stdout, "remote_branch_action", "skipped");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const rawLog = await readFile(logPath, "utf8");
    const log = rawLog
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as string[]);
    expect(log).toEqual([
      [
        "api",
        `repos/example/repo/pulls?head=${encodeURIComponent(`example:${branch}`)}&state=open&per_page=100`,
      ],
    ]);
  });

  it("rejects tasks that are not DONE", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await commitAll(root, "chore config");
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Superseded PR gate",
        "--description",
        "Not done yet",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/close-superseded`;
    await mkdir(path.join(root, ".agentplane", "tasks", taskId, "pr"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch,
          created_at: "2026-04-09T00:00:00.000Z",
          updated_at: "2026-04-09T00:00:00.000Z",
          status: "OPEN",
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "close-superseded", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain(`Task ${taskId} must be DONE before closing superseded PRs.`);
    } finally {
      io.restore();
    }
  });

  it(
    "passes auth env through to gh while stripping git worktree overrides",
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await commitAll(root, "chore config");
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const execFileAsyncLocal = promisify(execFile);
      await execFileAsyncLocal(
        "git",
        ["remote", "add", "origin", "https://github.com/example/repo.git"],
        {
          cwd: root,
          env: cleanGitEnv(),
        },
      );

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Superseded PR auth env",
          "--description",
          "Ensure gh env propagates through close-superseded",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "nodejs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      const branch = `task/${taskId}/close-superseded`;
      await prepareDoneTaskWithPrMeta(root, taskId, branch);
      const { fakeBin, envLogPath } = await installFakeGhRepair({
        scenarioName: "env-sanitized",
        branch,
        captureEnv: true,
      });
      const originalPath = process.env.PATH;
      const originalGhToken = process.env.GH_TOKEN;
      const originalGitDir = process.env.GIT_DIR;
      const originalGitWorkTree = process.env.GIT_WORK_TREE;
      process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
      process.env.GH_TOKEN = "token-from-parent-env";
      process.env.GIT_DIR = "/tmp/should-not-leak.git";
      process.env.GIT_WORK_TREE = "/tmp/should-not-leak-tree";
      process.env.AGENTPLANE_GH_ENV_LOG = envLogPath;

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "close-superseded", taskId, "--root", root]);
        expect(code).toBe(0);
      } finally {
        io.restore();
        process.env.PATH = originalPath;
        if (originalGhToken === undefined) delete process.env.GH_TOKEN;
        else process.env.GH_TOKEN = originalGhToken;
        if (originalGitDir === undefined) delete process.env.GIT_DIR;
        else process.env.GIT_DIR = originalGitDir;
        if (originalGitWorkTree === undefined) delete process.env.GIT_WORK_TREE;
        else process.env.GIT_WORK_TREE = originalGitWorkTree;
        delete process.env.AGENTPLANE_GH_ENV_LOG;
      }

      const rawEnvLog = await readFile(envLogPath, "utf8");
      const envLog = rawEnvLog
        .trim()
        .split("\n")
        .map(
          (line) =>
            JSON.parse(line) as {
              GH_TOKEN: string | null;
              HOME: string | null;
              GIT_DIR: string | null;
              GIT_WORK_TREE: string | null;
            },
        );
      expect(envLog.length).toBeGreaterThan(0);
      expect(envLog[0]?.GH_TOKEN).toBe("token-from-parent-env");
      expect(envLog[0]?.HOME).toBeTruthy();
      expect(envLog[0]?.GIT_DIR).toBeNull();
      expect(envLog[0]?.GIT_WORK_TREE).toBeNull();
    },
    PR_CLOSE_SUPERSEDED_TIMEOUT_MS,
  );
});
