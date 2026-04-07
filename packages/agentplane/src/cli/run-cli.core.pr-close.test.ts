import { execFile } from "node:child_process";
import { chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  cleanGitEnv,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "./run-cli.test-helpers.js";

const execFileAsync = promisify(execFile);

installRunCliIntegrationHarness();

async function installFakeGh(opts: { scenarioName: string; branchRepo?: string | null }) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-close-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  const branchRepo = opts.branchRepo ?? "example/repo";
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'const endpoint = args[1] ?? "";',
      'const methodIndex = args.indexOf("-X");',
      'const method = methodIndex >= 0 ? args[methodIndex + 1] : "GET";',
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
  return { fakeBin, logPath: path.join(fakeBin, "gh.log") };
}

describe("runCli pr close", () => {
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
      expect(io.stdout).toContain("repo: example/repo");
      expect(io.stdout).toContain("state: closed");
      expect(io.stdout).toContain("comment: added");
      expect(io.stdout).toContain("remote_branch_action: skipped");
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
      expect(io.stdout).toContain("remote_branch: task/321/cleanup");
      expect(io.stdout).toContain("remote_branch_action: deleted");
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
});
