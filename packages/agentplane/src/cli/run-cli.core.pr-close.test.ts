import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "@agentplane/testkit";

const execFileAsync = promisify(execFile);

installRunCliIntegrationHarness();
const PR_CLOSE_INTEGRATION_TIMEOUT_MS = 240_000;

function expectLabeledValue(output: string, label: string, expected: string): void {
  const line = output.split(/\r?\n/u).find((line) => line.trimStart().startsWith(`${label}:`));
  expect(line?.split(/:\s*/u, 2)[1]).toBe(expected);
}

async function installFakeGh(opts: {
  scenarioName: string;
  branchRepo?: string | null;
  captureEnv?: boolean;
  transientFailures?: { endpoint: string; method?: string; times?: number; message?: string }[];
  permanentFailures?: { endpoint: string; method?: string; message: string }[];
}) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-close-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const branchRepo = opts.branchRepo ?? "example/repo";
  const statePath = path.join(fakeBin, "gh-state.json");
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      `const statePath = ${JSON.stringify(statePath)};`,
      `const transientFailures = ${JSON.stringify(opts.transientFailures ?? [])};`,
      `const permanentFailures = ${JSON.stringify(opts.permanentFailures ?? [])};`,
      "function loadState() {",
      "  if (!fs.existsSync(statePath)) return {};",
      '  return JSON.parse(fs.readFileSync(statePath, "utf8"));',
      "}",
      "function saveState(state) {",
      "  fs.writeFileSync(statePath, JSON.stringify(state));",
      "}",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      "const envLogPath = process.env.AGENTPLANE_GH_ENV_LOG;",
      opts.captureEnv
        ? "if (envLogPath) fs.appendFileSync(envLogPath, `${JSON.stringify({ GH_TOKEN: process.env.GH_TOKEN ?? null, HOME: process.env.HOME ?? null, GIT_DIR: process.env.GIT_DIR ?? null, GIT_WORK_TREE: process.env.GIT_WORK_TREE ?? null })}\\n`);"
        : "",
      'const endpoint = args[1] ?? "";',
      'const methodIndex = args.indexOf("-X");',
      'const method = methodIndex >= 0 ? args[methodIndex + 1] : "GET";',
      "const state = loadState();",
      "for (const failure of permanentFailures) {",
      '  const failureMethod = failure.method ?? "GET";',
      "  if (failure.endpoint === endpoint && failureMethod === method) {",
      "    console.error(failure.message);",
      "    process.exit(1);",
      "  }",
      "}",
      "for (const failure of transientFailures) {",
      '  const failureMethod = failure.method ?? "GET";',
      "  const limit = Number.isInteger(failure.times) && failure.times > 0 ? failure.times : 1;",
      "  const key = `${failureMethod} ${failure.endpoint}`;",
      "  const seen = Number(state[key] ?? 0);",
      "  if (failure.endpoint === endpoint && failureMethod === method && seen < limit) {",
      "    state[key] = seen + 1;",
      "    saveState(state);",
      "    console.error(failure.message ?? 'gh: Post \"https://api.github.com/graphql\": EOF');",
      "    process.exit(1);",
      "  }",
      "}",
      'const payload = { number: 321, state: "open", html_url: "https://github.com/example/repo/pull/321", head: { ref: "task/321/cleanup", repo: { full_name: ' +
        JSON.stringify(branchRepo) +
        " } } };",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'if (endpoint === "repos/example/repo/pulls/321" && method === "GET") { console.log(JSON.stringify(payload)); process.exit(0); }',
      'if (endpoint === "repos/example/repo/issues/321/comments" && method === "POST") { console.log(JSON.stringify({ id: 1 })); process.exit(0); }',
      'if (endpoint === "repos/example/repo/pulls/321" && method === "PATCH") { console.log(JSON.stringify({ ...payload, state: "closed" })); process.exit(0); }',
      'if (endpoint === "repos/example/repo/git/refs/heads/task%2F321%2Fcleanup" && method === "DELETE") { process.exit(0); }',
      'console.error(`unexpected gh api call: ${args.join(" ")}`);',
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
  return {
    fakeBin,
    logPath: path.join(fakeBin, "gh.log"),
    envLogPath: path.join(fakeBin, "gh-env.log"),
    statePath,
  };
}

describe("runCli pr close", { timeout: PR_CLOSE_INTEGRATION_TIMEOUT_MS }, () => {
  it("closes a GitHub PR through REST and reports the result deterministically", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGh({ scenarioName: "close-only" });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "close",
        "321",
        "--comment",
        "Superseded by #456",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr close #321");
      expectLabeledValue(io.stdout, "repo", "example/repo");
      expectLabeledValue(io.stdout, "state", "closed");
      expectLabeledValue(io.stdout, "comment", "added");
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
    expect(log).toHaveLength(3);
    expect(log[0]).toEqual(["api", "repos/example/repo/pulls/321"]);
    expect(log[1]).toEqual([
      "api",
      "repos/example/repo/issues/321/comments",
      "-X",
      "POST",
      "-f",
      "body=Superseded by #456",
    ]);
    expect(log[2]).toEqual([
      "api",
      "repos/example/repo/pulls/321",
      "-X",
      "PATCH",
      "-f",
      "state=closed",
    ]);
  });

  it("deletes the remote head branch only after a successful REST close", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGh({ scenarioName: "close-delete" });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "close", "321", "--delete-remote-branch", "--root", root]);
      expect(code).toBe(0);
      expectLabeledValue(io.stdout, "remote_branch", "task/321/cleanup");
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
    expect(log).toHaveLength(3);
    expect(log[0]).toEqual(["api", "repos/example/repo/pulls/321"]);
    expect(log[1]).toEqual([
      "api",
      "repos/example/repo/pulls/321",
      "-X",
      "PATCH",
      "-f",
      "state=closed",
    ]);
    expect(log[2]).toEqual([
      "api",
      "repos/example/repo/git/refs/heads/task%2F321%2Fcleanup",
      "-X",
      "DELETE",
    ]);
  });

  it("passes auth env through to gh while stripping git worktree overrides", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, envLogPath } = await installFakeGh({
      scenarioName: "env-sanitized",
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
      const code = await runCli(["pr", "close", "321", "--root", root]);
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
  });

  it("retries transient gh transport failures before closing through REST", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGh({
      scenarioName: "retry-get",
      transientFailures: [
        {
          endpoint: "repos/example/repo/pulls/321",
          message: 'gh: Post "https://api.github.com/graphql": EOF',
        },
      ],
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "close", "321", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr close #321");
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
    expect(log).toHaveLength(3);
    expect(log[0]).toEqual(["api", "repos/example/repo/pulls/321"]);
    expect(log[1]).toEqual(["api", "repos/example/repo/pulls/321"]);
    expect(log[2]).toEqual([
      "api",
      "repos/example/repo/pulls/321",
      "-X",
      "PATCH",
      "-f",
      "state=closed",
    ]);
  });

  it("does not retry permanent gh auth failures", async () => {
    const root = await mkGitRepoRoot();
    await configureGitUser(root);
    const config = defaultConfig();
    await writeConfig(root, config);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGh({
      scenarioName: "auth-fail",
      permanentFailures: [
        {
          endpoint: "repos/example/repo/pulls/321",
          message: "gh: authentication required",
        },
      ],
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "close", "321", "--root", root]);
      expect(code).toBeGreaterThan(0);
      expect(io.stderr).toContain("authentication required");
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
    expect(log).toHaveLength(1);
    expect(log[0]).toEqual(["api", "repos/example/repo/pulls/321"]);
  });
});
