/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  validateCommitSubject,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import {
  approveTaskPlan,
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  installRunCliIntegrationHarness,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  stageGitignoreIfPresent,
  stubTaskBackend,
  writeConfig,
  writeDefaultConfig,
  recordVerificationOk,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

installRunCliIntegrationHarness();

async function installFakeGhPrLookup(opts: {
  scenarioName: string;
  branch: string;
  state?: "open" | "closed";
  mergedAt?: string | null;
  mergeCommitSha?: string | null;
}) {
  const fakeBin = path.join(
    os.tmpdir(),
    `agentplane-gh-pr-lookup-${Date.now()}-${opts.scenarioName}`,
  );
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'const endpoint = args[1] ?? "";',
      'const [route, query = ""] = endpoint.split("?", 2);',
      "const params = new URLSearchParams(query);",
      `const expectedHead = ${JSON.stringify(`example:${opts.branch}`)};`,
      `const response = ${JSON.stringify([
        {
          number: 321,
          html_url: "https://github.com/example/repo/pull/321",
          state: opts.state ?? "open",
          merged_at: opts.mergedAt ?? null,
          merge_commit_sha: opts.mergeCommitSha ?? null,
          head: { sha: "remote-head-sha" },
          base: { ref: "main" },
        },
      ])};`,
      'if (route === "repos/example/repo/pulls" && params.get("head") === expectedHead) {',
      "  console.log(JSON.stringify(response));",
      "  process.exit(0);",
      "}",
      'console.log("[]");',
      "process.exit(0);",
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

async function installFakeGhPrApi(opts: {
  scenarioName: string;
  branch: string;
  existingResponse?: object[];
  createResponse: object;
}) {
  const fakeBin = path.join(os.tmpdir(), `agentplane-gh-pr-api-${Date.now()}-${opts.scenarioName}`);
  await mkdir(fakeBin, { recursive: true });
  const scriptPath = path.join(fakeBin, "fake-gh.mjs");
  const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
  await writeFile(
    scriptPath,
    [
      'import fs from "node:fs";',
      "const args = process.argv.slice(2);",
      "const logPath = process.env.AGENTPLANE_GH_LOG;",
      "if (logPath) fs.appendFileSync(logPath, `${JSON.stringify(args)}\\n`);",
      'if (args[0] !== "api") { console.error("unexpected gh command"); process.exit(90); }',
      'const endpoint = args[1] ?? "";',
      'const [route, query = ""] = endpoint.split("?", 2);',
      "const params = new URLSearchParams(query);",
      `const expectedHead = ${JSON.stringify(`example:${opts.branch}`)};`,
      `const existingResponse = ${JSON.stringify(opts.existingResponse ?? [])};`,
      `const createResponse = ${JSON.stringify(opts.createResponse)};`,
      'let method = "GET";',
      "for (let i = 2; i < args.length; i += 1) {",
      '  if (args[i] === "-X" && typeof args[i + 1] === "string") method = String(args[i + 1]).toUpperCase();',
      "}",
      'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("head") === expectedHead) {',
      "  console.log(JSON.stringify(existingResponse));",
      "  process.exit(0);",
      "}",
      'if (route === "repos/example/repo/pulls" && method === "POST") {',
      "  console.log(JSON.stringify(createResponse));",
      "  process.exit(0);",
      "}",
      'console.log("[]");',
      "process.exit(0);",
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

describe("runCli", () => {
  it("pr open creates PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open task",
        "--description",
        "PR open creates artifacts",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr open");
      expect(io.stdout).toContain(
        "local PR artifacts synced; remote PR creation staged (GitHub origin repo unavailable)",
      );
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
    const meta = JSON.parse(metaRaw) as { task_id?: string; branch?: string };
    expect(meta.task_id).toBe(taskId);
    expect(meta.branch).toBe(`task/${taskId}/pr-open`);
    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toContain("## Scope");
    await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    expect(await readFile(path.join(prDir, "notes.jsonl"), "utf8")).toBe("");
    await readFile(path.join(prDir, "verify.log"), "utf8");
    expect(await readFile(path.join(prDir, "github-title.txt"), "utf8")).toContain(
      `(${extractTaskSuffix(taskId)})`,
    );
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toContain("## Verification");
  });

  it("pr open creates a remote GitHub PR when origin and gh are available", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open remote create",
        "--description",
        "PR open should create a remote PR when GitHub is available",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/remote-create`;
    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-create",
      branch,
      createResponse: {
        number: 654,
        html_url: "https://github.com/example/repo/pull/654",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #654");
      expect(io.stdout).toContain("https://github.com/example/repo/pull/654");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
    };
    expect(meta.pr_number).toBe(654);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/654");
    expect(meta.status).toBe("OPEN");

    const logText = await readFile(logPath, "utf8");
    const log = logText
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as string[]);
    expect(
      log.some(
        (args) =>
          args[0] === "api" &&
          args[1] === "repos/example/repo/pulls" &&
          args.includes("-X") &&
          args.includes("POST"),
      ),
    ).toBe(true);
  });

  it("pr open respects --sync-only and skips remote GitHub PR creation", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open sync only",
        "--description",
        "PR open should allow local-only artifact sync without remote creation",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/sync-only`;
    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-sync-only",
      branch,
      createResponse: {
        number: 987,
        html_url: "https://github.com/example/repo/pull/987",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
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
      expect(code).toBe(0);
      expect(io.stdout).toContain("remote PR creation skipped (--sync-only)");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
    };
    expect(meta.pr_number).toBeUndefined();

    const logText = await readFile(logPath, "utf8");
    const log = logText
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line) as string[]);
    expect(
      log.some(
        (args) =>
          args[0] === "api" &&
          args[1] === "repos/example/repo/pulls" &&
          args.includes("-X") &&
          args.includes("POST"),
      ),
    ).toBe(false);
  });

  it("task start-ready auto-creates PR artifacts in branch_pr mode", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start ready PR auto init",
        "--description",
        "Start ready should create PR artifacts automatically",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/start-ready-auto`], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: auto-create PR artifacts from the start-ready lifecycle boundary.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const meta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
      branch?: string;
    };
    expect(meta.branch).toBe(`task/${taskId}/start-ready-auto`);
    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toContain("BEGIN AUTO SUMMARY");
    await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    await readFile(path.join(prDir, "notes.jsonl"), "utf8");
    await readFile(path.join(prDir, "verify.log"), "utf8");
    await readFile(path.join(prDir, "github-title.txt"), "utf8");
    await readFile(path.join(prDir, "github-body.md"), "utf8");
  });

  it("task set-status --commit-from-comment refreshes branch_pr PR head_sha after the commit", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch PR meta head sync",
        "--description",
        "Comment-driven task commits should keep pr/meta head_sha current",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/status-sync`], { cwd: root });

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/status-sync`,
      "--root",
      root,
    ]);

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before the comment-driven status commit sync regression.",
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const before = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(before.head_sha).toMatch(/^[0-9a-f]{40}$/u);

    await writeFile(path.join(root, "blocker.txt"), "blocked\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "set-status",
        taskId,
        "BLOCKED",
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on a dependency while the branch_pr PR artifact refresh regression is under test.",
        "--commit-from-comment",
        "--commit-allow",
        "blocker.txt",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const after = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    const { stdout: headStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const headSha = headStdout.trim();
    expect(after.head_sha).toBe(headSha);
    expect(after.head_sha).not.toBe(before.head_sha);
  });

  it("commit refreshes branch_pr PR head_sha after a task-scoped commit", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Branch PR guard commit sync",
        "--description",
        "Commit should keep pr/meta head_sha current on task branches",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/guard-sync`], { cwd: root });
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/guard-sync`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const before = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    expect(before.head_sha).toMatch(/^[0-9a-f]{40}$/u);
    const suffix = extractTaskSuffix(taskId);

    await writeFile(path.join(root, "src.ts"), "export const value = 1;\n", "utf8");
    await execFileAsync("git", ["add", "src.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        taskId,
        "-m",
        `🧩 ${suffix} workflow: refresh branch_pr artifacts after guard commit`,
        "--allow",
        "src.ts",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const after = JSON.parse(await readFile(metaPath, "utf8")) as { head_sha?: string | null };
    const { stdout: headStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const headSha = headStdout.trim();
    expect(after.head_sha).toBe(headSha);
    expect(after.head_sha).not.toBe(before.head_sha);
  });

  it("pr update refreshes diffstat and auto summary", { timeout: 60_000 }, async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update task",
        "--description",
        "PR update writes diffstat",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-update`,
      "--root",
      root,
    ]);

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update`], { cwd: root });
    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    expect(diffstat).toContain("change.txt");
    const review = await readFile(path.join(prDir, "review.md"), "utf8");
    expect(review).toContain("BEGIN AUTO SUMMARY");
    expect(review).toContain("change.txt");
    const githubTitle = await readFile(path.join(prDir, "github-title.txt"), "utf8");
    const githubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");
    expect(githubTitle.trim()).toContain(`(${extractTaskSuffix(taskId)})`);
    expect(githubTitle).not.toContain(`task/${taskId}/pr-update`);
    expect(githubBody).toContain("## Summary");
    expect(githubBody).toContain("## Scope");
    expect(githubBody).toContain("## Verification");
    expect(githubBody).toContain("<details>");
    expect(githubBody).toContain("change.txt");
  });

  it("pr update is idempotent when HEAD and diff are unchanged", { timeout: 60_000 }, async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update idempotent task",
        "--description",
        "PR update stays byte-stable when nothing changed",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-update-idempotent`,
      "--root",
      root,
    ]);

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update-idempotent`], {
      cwd: root,
    });
    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

    await runCliSilent(["pr", "update", taskId, "--root", root]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const firstMeta = await readFile(path.join(prDir, "meta.json"), "utf8");
    const firstDiffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    const firstReview = await readFile(path.join(prDir, "review.md"), "utf8");
    const firstGithubTitle = await readFile(path.join(prDir, "github-title.txt"), "utf8");
    const firstGithubBody = await readFile(path.join(prDir, "github-body.md"), "utf8");

    await runCliSilent(["pr", "update", taskId, "--root", root]);

    expect(await readFile(path.join(prDir, "meta.json"), "utf8")).toBe(firstMeta);
    expect(await readFile(path.join(prDir, "diffstat.txt"), "utf8")).toBe(firstDiffstat);
    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(firstReview);
    expect(await readFile(path.join(prDir, "github-title.txt"), "utf8")).toBe(firstGithubTitle);
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(firstGithubBody);
  });

  it("pr note appends to the note store and rerenders handoff notes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note task",
        "--description",
        "PR note appends handoff notes",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-note`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: reviewed docs changes.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const review = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      "utf8",
    );
    const notesText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "notes.jsonl"),
      "utf8",
    );
    const [record] = notesText
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as { author?: string; body?: string });
    expect(record?.author).toBe("DOCS");
    expect(record?.body).toBe("Handoff: reviewed docs changes.");
    expect(review).toContain("DOCS: Handoff: reviewed docs changes.");
    expect(
      await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "pr", "github-body.md"),
        "utf8",
      ),
    ).toContain("DOCS: Handoff: reviewed docs changes.");
  });

  it("pr note regenerates the handoff section from append-only notes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note render task",
        "--description",
        "PR note regenerates handoff section from the note store",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-note-render`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const original = await readFile(reviewPath, "utf8");
    await writeFile(
      reviewPath,
      original
        .replace("- ", "- Keep manual summary")
        .replace(
          "- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.",
          "- stale manual handoff",
        ),
      "utf8",
    );

    await runCliSilent([
      "pr",
      "note",
      taskId,
      "--author",
      "REVIEWER",
      "--body",
      "First handoff note.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "pr",
      "note",
      taskId,
      "--author",
      "DOCS",
      "--body",
      "Second handoff note.",
      "--root",
      root,
    ]);

    const review = await readFile(reviewPath, "utf8");
    const githubBody = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "github-body.md"),
      "utf8",
    );
    const notesText = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "notes.jsonl"),
      "utf8",
    );
    expect(review).not.toContain("Keep manual summary");
    expect(review).not.toContain("stale manual handoff");
    expect(review).toContain("REVIEWER: First handoff note.");
    expect(review).toContain("DOCS: Second handoff note.");
    expect(githubBody).toContain("REVIEWER: First handoff note.");
    expect(githubBody).toContain("DOCS: Second handoff note.");
    expect(notesText.trim().split("\n")).toHaveLength(2);
  });

  it(
    "verify recreates PR artifacts without a manual pr open or pr update",
    { timeout: 90_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
      await writeConfig(root, config);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify PR auto sync",
          "--description",
          "Verify should restore PR artifacts automatically",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-auto-sync`], {
        cwd: root,
      });

      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create the initial PR artifact scaffold without manual PR commands.",
        "--root",
        root,
      ]);

      const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
      await rm(path.join(prDir, "review.md"));

      const io = captureStdIO();
      try {
        const code = await runCli([
          "verify",
          taskId,
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Looks good",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }

      expect(await readFile(path.join(prDir, "review.md"), "utf8")).toContain("BEGIN AUTO SUMMARY");
      const meta = JSON.parse(await readFile(path.join(prDir, "meta.json"), "utf8")) as {
        branch?: string;
      };
      expect(meta.branch).toBe(`task/${taskId}/verify-auto-sync`);
    },
  );

  it("verify keeps incidents.md unchanged when syncing existing PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await configureGitUser(root);

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    const baselineIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- id: INC-20260406-00",
      "  date: 2026-04-06",
      "  scope: baseline",
      "  failure: baseline",
      "  rule: Baseline rule MUST stay unchanged.",
      "  evidence: test fixture",
      "  enforcement: test",
      "  state: open",
      "",
    ].join("\n");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(incidentsPath, baselineIncidents, "utf8");

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify leaves incident registry alone",
        "--description",
        "Verification should not mutate incidents policy",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-incidents`], {
      cwd: root,
    });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: keep incident policy unchanged while verification refreshes PR artifacts.",
      "--root",
      root,
    ]);

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Verification updated PR artifacts only",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it("verify explains branch_pr incident locality when findings stay on the task worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    config.agents.approvals.require_plan = false;
    await writeConfig(root, config);
    await configureGitUser(root);

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    const baselineIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- id: INC-20260406-00",
      "  date: 2026-04-06",
      "  scope: baseline",
      "  failure: baseline",
      "  rule: Baseline rule MUST stay unchanged.",
      "  evidence: test fixture",
      "  enforcement: test",
      "  state: open",
      "",
    ].join("\n");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(incidentsPath, baselineIncidents, "utf8");

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify explains branch_pr incident locality",
        "--description",
        "Verification should explain when incident candidates stay local to the task worktree",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-incident-locality`], {
      cwd: root,
    });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: explain when branch_pr incident findings remain local to the current task branch.",
      "--root",
      root,
    ]);

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Verification captured a reusable incident candidate",
        "--observation",
        "Incident promotion still depends on an explicit base-branch step.",
        "--impact",
        "Operators can misread a task-branch verify as a shared incidents registry update.",
        "--resolution",
        "Emit an explicit branch_pr locality note during verify.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(
        "branch_pr note: structured findings stay in the current task worktree until promoted on the base branch or collected explicitly with `--collect-incidents` or `agentplane incidents collect <task-id>`.",
      );
      expect(io.stdout).toContain("finding=incident-candidate");
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it(
    "pr check fails when review metadata is stale relative to branch head",
    { timeout: 90_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR stale review check",
          "--description",
          "PR check should reject stale rendered review metadata",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/stale-review`], { cwd: root });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create initial PR artifacts before the first code change.",
        "--root",
        root,
      ]);

      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("PR artifacts stale:");
      } finally {
        io.restore();
      }
    },
  );

  it(
    "pr check fails when verify metadata is stale relative to branch head",
    { timeout: 90_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR stale verify check",
          "--description",
          "PR check should reject stale verify sha metadata",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/stale-verify`], { cwd: root });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create PR artifacts before recording the first verification snapshot.",
        "--root",
        root,
      ]);

      await writeFile(path.join(root, "feature-1.txt"), "feature-1", "utf8");
      await execFileAsync("git", ["add", "feature-1.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature-1"], { cwd: root });
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);
      await runCliSilent(["pr", "check", taskId, "--root", root]);

      await writeFile(path.join(root, "feature-2.txt"), "feature-2", "utf8");
      await execFileAsync("git", ["add", "feature-2.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature-2"], { cwd: root });
      await runCliSilent(["pr", "update", taskId, "--root", root]);

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(3);
        expect(io.stderr).toContain("Verify state stale:");
      } finally {
        io.restore();
      }
    },
  );

  it(
    "pr check accepts verify-log-backed verification when pr meta verify fields drift",
    { timeout: 90_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      config.agents.approvals.require_plan = false;
      await writeConfig(root, config);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR verify log fallback",
          "--description",
          "PR check should accept verify.log as authoritative when meta verify fields drift",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--verify",
          "echo ok",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = ioTask.stdout.trim();
      } finally {
        ioTask.restore();
      }

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await execFileAsync("git", ["checkout", "-b", `task/${taskId}/verify-log-fallback`], {
        cwd: root,
      });
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify first, then simulate stale PR verify metadata.",
        "--root",
        root,
      ]);

      await writeFile(path.join(root, "feature.txt"), "feature", "utf8");
      await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feature"], { cwd: root });
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);

      const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
      const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
      meta.last_verified_sha = null;
      meta.last_verified_at = null;
      meta.verify = { status: "skipped" };
      await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stderr).not.toContain("Verify metadata missing");
        expect(io.stderr).not.toContain("Verify state stale");
      } finally {
        io.restore();
      }
    },
  );

  it("pr note requires branch_pr workflow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note direct",
        "--description",
        "Branch_pr required",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail in direct mode.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid workflow_mode: direct (expected branch_pr)");
    } finally {
      io.restore();
    }
  });

  it("pr note maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail without git repo.",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects empty author or body", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "   ",
        "--body",
        "Handoff: should fail on empty author.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr check passes when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check task",
        "--description",
        "PR check validates artifacts",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  });

  it(
    "pr check falls back to PR artifacts committed on the task branch",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);

      let taskId = "";
      const ioTask = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "PR check branch fallback",
          "--description",
          "Base checkout should validate PR artifacts from branch history",
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

      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

      const branch = `task/${taskId}/pr-check-branch-fallback`;
      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

      await execFileAsync("git", ["checkout", "main"], { cwd: root });
      await rm(path.join(root, ".agentplane", "tasks", taskId), { recursive: true, force: true });
      await execFileAsync("git", ["add", "-A", `.agentplane/tasks/${taskId}`], { cwd: root });
      await execFileAsync("git", ["commit", "-m", `${taskId} remove base task snapshot`], {
        cwd: root,
      });
      expect(await pathExists(path.join(root, ".agentplane", "tasks", taskId, "README.md"))).toBe(
        false,
      );
      expect(
        await pathExists(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json")),
      ).toBe(false);

      const io = captureStdIO();
      try {
        const code = await runCli(["pr", "check", taskId, "--root", root]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("✅ pr check");
      } finally {
        io.restore();
      }
    },
  );

  it("pr check prefers local PR artifacts when multiple task branches match", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check local artifact preference",
        "--description",
        "Local PR artifacts should beat ambiguous branch fallback",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-primary`,
      "--root",
      root,
    ]);
    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-secondary`], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  }, 120_000);

  it("pr check still reports multiple task branches when fallback is required", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check ambiguous fallback",
        "--description",
        "Fallback should stay strict when multiple task branches match",
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

    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-primary`], { cwd: root });
    await execFileAsync("git", ["branch", `task/${taskId}/pr-check-secondary`], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Multiple task branches match");
    } finally {
      io.restore();
    }
  }, 120_000);

  it("pr open requires --author", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open requires author",
        "--description",
        "PR open must have author flag",
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

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open unknown flag",
        "--description",
        "PR open should reject unknown flags",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open uses current branch when --branch is omitted", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open branch default",
        "--description",
        "PR open uses current branch",
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

    await runCliSilent(["pr", "open", taskId, "--author", "CODER", "--root", root]);

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    const meta = JSON.parse(metaRaw) as { branch?: string; head_sha?: string | null };
    expect(meta.branch).toBe("main");
    expect(meta.head_sha).toMatch(/^[0-9a-f]{40}$/u);
  });

  it("pr open keeps incidents.md unchanged while creating PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const incidentsPath = path.join(root, ".agentplane", "policy", "incidents.md");
    const baselineIncidents = [
      "# Policy Incidents Log",
      "",
      "## Entry contract",
      "",
      "- Add entries append-only.",
      "",
      "## Entries",
      "",
      "- id: INC-20260406-00",
      "  date: 2026-04-06",
      "  scope: baseline",
      "  failure: baseline",
      "  rule: Baseline rule MUST stay unchanged.",
      "  evidence: test fixture",
      "  enforcement: test",
      "  state: open",
      "",
    ].join("\n");
    await mkdir(path.dirname(incidentsPath), { recursive: true });
    await writeFile(incidentsPath, baselineIncidents, "utf8");

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open leaves incident registry alone",
        "--description",
        "PR artifact sync should not mutate incidents policy",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const incidentsBefore = await readFile(incidentsPath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open-incidents`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    expect(await readFile(incidentsPath, "utf8")).toBe(incidentsBefore);
  });

  it("pr open is idempotent when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open idempotent task",
        "--description",
        "PR open can be re-run safely",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-open`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "REVIEWER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("pr open reports linked GitHub PR identity when pr metadata already has one", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open linked identity",
        "--description",
        "PR open should report a linked remote PR when metadata already knows it",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-open`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      pr_number?: number;
      pr_url?: string;
    };
    meta.pr_number = 321;
    meta.pr_url = "https://github.com/example/repo/pull/321";
    await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("linked to GitHub PR #321");
      expect(io.stdout).toContain("https://github.com/example/repo/pull/321");
    } finally {
      io.restore();
    }
  });

  it("pr open hydrates an existing GitHub PR by branch into pr metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open hydrates existing PR",
        "--description",
        "PR open should discover an already-existing remote PR for the branch",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/existing-pr`;
    const { fakeBin, logPath } = await installFakeGhPrLookup({
      scenarioName: "open-existing",
      branch,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("linked to GitHub PR #321");
      expect(io.stdout).not.toContain("GitHub PR not created");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      head_sha?: string;
    };
    expect(meta.pr_number).toBe(321);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/321");
    expect(meta.status).toBe("OPEN");
    expect(meta.head_sha).toBe("remote-head-sha");

    const rawLog = await readFile(logPath, "utf8");
    expect(rawLog).toContain(`head=example%3Atask%2F${taskId}%2Fexisting-pr`);
  });

  it("pr open keeps review/body stable when a second run creates the remote PR", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open preserves rendered packet on remote create",
        "--description",
        "A second pr open should avoid rewriting review/body when only PR linkage changes",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/remote-create-second-pass`;
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

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const reviewBefore = await readFile(path.join(prDir, "review.md"), "utf8");
    const githubBodyBefore = await readFile(path.join(prDir, "github-body.md"), "utf8");

    const { fakeBin, logPath } = await installFakeGhPrApi({
      scenarioName: "open-create-second-pass",
      branch,
      createResponse: {
        number: 654,
        html_url: "https://github.com/example/repo/pull/654",
        state: "open",
        merged_at: null,
        merge_commit_sha: null,
        head: { sha: "remote-head-sha" },
        base: { ref: "main" },
      },
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #654");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(reviewBefore);
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(githubBodyBefore);
  });

  it("pr open keeps review/body stable when a second run links an existing remote PR", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open preserves rendered packet on existing PR hydration",
        "--description",
        "A second pr open should avoid rewriting review/body when it only links an existing PR",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const branch = `task/${taskId}/existing-pr-second-pass`;
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

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const reviewBefore = await readFile(path.join(prDir, "review.md"), "utf8");
    const githubBodyBefore = await readFile(path.join(prDir, "github-body.md"), "utf8");

    const { fakeBin, logPath } = await installFakeGhPrLookup({
      scenarioName: "open-existing-second-pass",
      branch,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        branch,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("linked to GitHub PR #321");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    expect(await readFile(path.join(prDir, "review.md"), "utf8")).toBe(reviewBefore);
    expect(await readFile(path.join(prDir, "github-body.md"), "utf8")).toBe(githubBodyBefore);
  });

  it("pr update hydrates existing GitHub PR state into previously local-only artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update hydrates existing PR",
        "--description",
        "PR update should discover an already-existing remote PR for the branch",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "github",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const branch = `task/${taskId}/existing-pr-update`;
    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      branch,
      "--root",
      root,
    ]);

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["remote", "add", "origin", "https://github.com/example/repo.git"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { fakeBin, logPath } = await installFakeGhPrLookup({
      scenarioName: "update-existing",
      branch,
      state: "closed",
      mergedAt: "2026-04-07T22:00:00.000Z",
      mergeCommitSha: "1234567890abcdef1234567890abcdef12345678",
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = logPath;

    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const meta = JSON.parse(
      await readFile(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), "utf8"),
    ) as {
      pr_number?: number;
      pr_url?: string;
      status?: string;
      merged_at?: string;
      merge_commit?: string;
    };
    expect(meta.pr_number).toBe(321);
    expect(meta.pr_url).toBe("https://github.com/example/repo/pull/321");
    expect(meta.status).toBe("MERGED");
    expect(meta.merged_at).toBe("2026-04-07T22:00:00.000Z");
    expect(meta.merge_commit).toBe("1234567890abcdef1234567890abcdef12345678");

    const rawLog = await readFile(logPath, "utf8");
    expect(rawLog).toContain(`head=example%3Atask%2F${taskId}%2Fexisting-pr-update`);
  });

  it("pr update rejects missing artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update missing artifacts",
        "--description",
        "PR update should error without pr open",
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

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("PR artifacts missing");
    } finally {
      io.restore();
    }
  });

  it("pr update rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr update");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects missing review", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note missing review",
        "--description",
        "PR note requires review",
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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: missing review should fail.",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing .agentplane/tasks");
    } finally {
      io.restore();
    }
  });

  it("pr check fails when verify requirements are unmet", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check verify task",
        "--description",
        "PR check should fail until verify passes",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Verify requirements not satisfied");
    } finally {
      io.restore();
    }
  });

  it("pr check reports missing auto summary markers", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check markers",
        "--description",
        "Missing auto summary markers",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-markers`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const review = await readFile(reviewPath, "utf8");
    const stripped = review
      .replace("<!-- BEGIN AUTO SUMMARY -->", "")
      .replace("<!-- END AUTO SUMMARY -->", "");
    await writeFile(reviewPath, stripped, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing auto summary start marker");
      expect(io.stderr).toContain("Missing auto summary end marker");
    } finally {
      io.restore();
    }
  });

  it("pr check reports invalid meta.json", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check invalid meta",
        "--description",
        "Invalid meta.json",
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

    await runCliSilent([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-meta`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await writeFile(metaPath, "{ not-json", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("JSON Parse error:");
    } finally {
      io.restore();
    }
  });

  it("pr check rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr check");
    } finally {
      io.restore();
    }
  });

  it("pr check maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{}", "utf8");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: unknown flag check.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr note requires --author and --body", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "note", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr commands require a task id", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "nope", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane pr <open|update|check|note|close|close-superseded>");
    } finally {
      io.restore();
    }
  });
});
