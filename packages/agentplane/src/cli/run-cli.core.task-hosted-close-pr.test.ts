import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { loadTaskBackend } from "../backends/task-backend.js";
import { createIncidentRegistrySkeleton } from "../runtime/incidents/index.js";

import { runCli } from "./run-cli.js";
import {
  approveTaskPlan,
  captureStdIO,
  installRunCliIntegrationHarness,
  recordVerificationOk,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS = 300_000;

installRunCliIntegrationHarness();

async function installFakeGhHostedClosePr(opts: {
  scenarioName: string;
  branch: string;
  existingResponse: object[];
  mergedResponse?: object[];
  closeMergedResponse?: object[];
  commitPullsResponse?: object[];
  createResponse: object;
  allowCreate: boolean;
}) {
  const fakeBin = path.join(
    tmpdir(),
    `agentplane-gh-hosted-close-pr-${Date.now()}-${opts.scenarioName}`,
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
      `const existingResponse = ${JSON.stringify(opts.existingResponse)};`,
      `const mergedResponse = ${JSON.stringify(opts.mergedResponse ?? [])};`,
      `const closeMergedResponse = ${JSON.stringify(opts.closeMergedResponse ?? [])};`,
      `const commitPullsResponse = ${JSON.stringify(opts.commitPullsResponse ?? [])};`,
      `const createResponse = ${JSON.stringify(opts.createResponse)};`,
      `const allowCreate = ${JSON.stringify(opts.allowCreate)};`,
      'let method = "GET";',
      "for (let i = 2; i < args.length; i += 1) {",
      '  if (args[i] === "-X" && typeof args[i + 1] === "string") method = String(args[i + 1]).toUpperCase();',
      "}",
      'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("state") === "open" && params.get("head") === expectedHead) {',
      "  console.log(JSON.stringify(existingResponse));",
      "  process.exit(0);",
      "}",
      'if (route === "repos/example/repo/pulls" && method === "GET" && params.get("state") === "closed") {',
      "  console.log(JSON.stringify(params.get('head') === expectedHead ? closeMergedResponse : mergedResponse));",
      "  process.exit(0);",
      "}",
      'if (route.startsWith("repos/example/repo/commits/") && route.endsWith("/pulls") && method === "GET") {',
      "  console.log(JSON.stringify(commitPullsResponse));",
      "  process.exit(0);",
      "}",
      'if (route === "repos/example/repo/pulls" && method === "POST") {',
      "  if (!allowCreate) {",
      '    console.error("unexpected gh api create");',
      "    process.exit(91);",
      "  }",
      "  console.log(JSON.stringify(createResponse));",
      "  process.exit(0);",
      "}",
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

describe("runCli", { timeout: HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS }, () => {
  it("task hosted-close-pr skips opening a follow-up PR when hosted close is already recorded on base", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202604091257-AD043V";
    const branch = `task/${taskId}/hosted-close-pr`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close PR helper",
        "--description",
        "Open a hosted closure PR from a remote task-close branch",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run task hosted-close-pr against a remote task-close branch after a manual hosted-close handoff.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify hosted-close PR helper against a remote closure branch.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);
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

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "hosted-close-pr.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const hostedClosePr = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: hosted close PR fixture"], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", branch, "-m", "Merge hosted close PR fixture"],
      {
        cwd: root,
      },
    );
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      status?: string;
      branch?: string;
      merge_commit?: string;
      pr_number?: number;
      base?: string;
    };
    const mergeCommit = mergeSha;
    await writeFile(
      metaPath,
      `${JSON.stringify(
        {
          ...meta,
          status: "MERGED",
          branch,
          base: baseBranch,
          pr_number: 97,
          merge_commit: mergeCommit,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const closureBranch = `task-close/${taskId}/${mergeCommit.slice(0, 12)}`;

    const bareOrigin = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-pr-origin-"));
    await execFileAsync("git", ["init", "--bare", bareOrigin], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", bareOrigin], { cwd: root });
    await execFileAsync(
      "git",
      ["push", "--no-verify", "origin", `HEAD:refs/heads/${closureBranch}`],
      {
        cwd: root,
      },
    );
    const taskReadmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskReadme = await readFile(taskReadmePath, "utf8");
    await writeFile(
      taskReadmePath,
      `${taskReadme.trim()}\n\nHosted close already landed.\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", taskReadmePath], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", `✅ AD043V close: Merged via PR #97. (${taskId})`],
      {
        cwd: root,
      },
    );
    const firstGh = await installFakeGhHostedClosePr({
      scenarioName: "already-closed",
      branch: closureBranch,
      existingResponse: [],
      mergedResponse: [],
      createResponse: {
        number: 902,
        html_url: "https://github.com/example/repo/pull/902",
        state: "open",
        merged_at: null,
      },
      allowCreate: false,
    });

    const originalPath = process.env.PATH;
    process.env.PATH = `${firstGh.fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = firstGh.logPath;

    const ioCreate = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close-pr",
        taskId,
        "--repo",
        "example/repo",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioCreate.stdout).toContain("hosted close already recorded on");
      expect(ioCreate.stdout).toContain("skipped follow-up PR");
    } finally {
      ioCreate.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const { stdout: localBranchStdout } = await execFileAsync("git", ["branch", "--list", branch], {
      cwd: root,
    });
    expect(localBranchStdout.trim()).toBe("");

    const firstLog = await readFile(firstGh.logPath, "utf8");
    expect(firstLog).not.toContain('"POST"');
  }, 240_000);

  it("task hosted-close-pr skips opening a duplicate when the close branch PR is already merged remotely", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202604091258-DPCT5S";
    const branch = `task/${taskId}/duplicate-close-pr`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Duplicate hosted close PR helper",
        "--description",
        "Avoid opening a second hosted closure PR when the first one already merged",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run task hosted-close-pr after the close branch PR has already merged remotely.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify hosted-close-pr skips duplicate remote close PR creation.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);
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

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "duplicate-close-pr.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const duplicateClosePr = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: duplicate close fixture"], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", branch, "-m", "Merge duplicate close fixture"],
      {
        cwd: root,
      },
    );
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = JSON.parse(await readFile(metaPath, "utf8")) as Record<string, unknown>;
    await writeFile(
      metaPath,
      `${JSON.stringify(
        {
          ...meta,
          status: "MERGED",
          branch,
          base: baseBranch,
          pr_number: 98,
          merge_commit: mergeSha,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    const closureBranch = `task-close/${taskId}/${mergeSha.slice(0, 12)}`;
    const bareOrigin = await mkdtemp(
      path.join(tmpdir(), "agentplane-hosted-close-pr-duplicate-origin-"),
    );
    await execFileAsync("git", ["init", "--bare", bareOrigin], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", bareOrigin], { cwd: root });
    await execFileAsync(
      "git",
      ["push", "--no-verify", "origin", `HEAD:refs/heads/${closureBranch}`],
      { cwd: root },
    );

    const fakeGh = await installFakeGhHostedClosePr({
      scenarioName: "duplicate-merged-close",
      branch: closureBranch,
      existingResponse: [],
      mergedResponse: [],
      closeMergedResponse: [
        {
          number: 905,
          html_url: "https://github.com/example/repo/pull/905",
          state: "closed",
          merged_at: "2026-04-09T12:59:00.000Z",
          merge_commit_sha: "close-merge-sha",
          head: { ref: closureBranch },
          base: { ref: baseBranch },
        },
      ],
      createResponse: {
        number: 906,
        html_url: "https://github.com/example/repo/pull/906",
        state: "open",
        merged_at: null,
      },
      allowCreate: false,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGh.fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = fakeGh.logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close-pr",
        taskId,
        "--repo",
        "example/repo",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("hosted close already merged in PR #905");
      expect(io.stdout).toContain("skipped follow-up PR");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const log = await readFile(fakeGh.logPath, "utf8");
    expect(log).toContain(
      `"repos/example/repo/pulls?state=closed&head=example%3A${closureBranch.replaceAll("/", "%2F")}&base=${baseBranch}"`,
    );
    expect(log).not.toContain('"POST"');
  }, 240_000);

  it("task hosted-close-pr recovers merge metadata from GitHub when base pr meta is stale", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202604091600-348SVA";
    const branch = `task/${taskId}/hosted-close-pr-fallback`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close PR fallback",
        "--description",
        "Recover hosted-close-pr from stale base metadata",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run task hosted-close-pr with a remote closure branch and stale base-side pr metadata.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify hosted-close-pr fallback against stale base-side PR metadata.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);
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

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "hosted-close-pr-fallback.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const hostedClosePrFallback = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "feat: hosted close PR fallback fixture"],
      {
        cwd: root,
      },
    );
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();

    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", branch, "-m", "Merge hosted close PR fallback fixture"],
      { cwd: root },
    );
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();
    const closureBranch = `task-close/${taskId}/${mergeSha.slice(0, 12)}`;

    const bareOrigin = await mkdtemp(
      path.join(tmpdir(), "agentplane-hosted-close-pr-fallback-origin-"),
    );
    await execFileAsync("git", ["init", "--bare", bareOrigin], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", bareOrigin], { cwd: root });
    await execFileAsync(
      "git",
      ["push", "--no-verify", "origin", `HEAD:refs/heads/${closureBranch}`],
      {
        cwd: root,
      },
    );

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const staleMeta = {
      base: baseBranch,
      branch,
      created_at: "2026-04-09T16:00:00.000Z",
      head_sha: branchHead,
      schema_version: 1,
      task_id: taskId,
      updated_at: "2026-04-09T16:00:00.000Z",
      verify: { status: "pass" },
    };
    await writeFile(metaPath, `${JSON.stringify(staleMeta, null, 2)}\n`, "utf8");

    const createResponse = {
      number: 903,
      html_url: "https://github.com/example/repo/pull/903",
      state: "open",
      merged_at: null,
    };
    const mergedResponse = [
      {
        number: 198,
        html_url: "https://github.com/example/repo/pull/198",
        state: "closed",
        merged_at: "2026-04-09T16:01:00.000Z",
        merge_commit_sha: mergeSha,
        head: { ref: branch },
        base: { ref: baseBranch },
      },
    ];

    const fakeGh = await installFakeGhHostedClosePr({
      scenarioName: "fallback",
      branch: closureBranch,
      existingResponse: [],
      mergedResponse,
      createResponse,
      allowCreate: true,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGh.fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = fakeGh.logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close-pr",
        taskId,
        "--repo",
        "example/repo",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #903");
      expect(io.stdout).toContain("https://github.com/example/repo/pull/903");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const log = await readFile(fakeGh.logPath, "utf8");
    expect(log).toContain(
      '"repos/example/repo/pulls?state=closed&head=example%3Atask%2F202604091600-348SVA%2Fhosted-close-pr-fallback&base=main"',
    );
    expect(log).toContain(
      "title=task-close: Hosted close PR fallback [202604091600-348SVA]",
    );
    expect(log).toContain("## Source");
    expect(log).toContain('"POST"');
  }, 240_000);

  it("task hosted-close-pr recovers from missing base pr meta via merge-commit lookup", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
      recursive: true,
    });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(
      path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
      createIncidentRegistrySkeleton(),
      "utf8",
    );
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const taskId = "202604091625-5Y1QMK";
    const branch = `task/${taskId}/hosted-close-pr-commit-fallback`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close PR commit fallback",
        "--description",
        "Recover hosted-close-pr from missing base metadata via merge commit lookup",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]),
    ).toBe(0);
    expect(
      await runCliSilent([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Verify Steps",
        "--text",
        "1. Run task hosted-close-pr after deleting base-side pr metadata.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await approveTaskPlan(root, taskId);
    expect(
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: verify hosted-close-pr commit fallback without base-side PR metadata.",
        "--root",
        root,
      ]),
    ).toBe(0);
    await recordVerificationOk(root, taskId);
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

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "hosted-close-pr-commit-fallback.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const hostedClosePrCommitFallback = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "feat: hosted close PR commit fallback"],
      {
        cwd: root,
      },
    );

    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync(
      "git",
      ["merge", "--no-ff", branch, "-m", "Merge hosted close PR commit fallback"],
      { cwd: root },
    );
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();
    const closureBranch = `task-close/${taskId}/${mergeSha.slice(0, 12)}`;

    const bareOrigin = await mkdtemp(
      path.join(tmpdir(), "agentplane-hosted-close-pr-commit-fallback-origin-"),
    );
    await execFileAsync("git", ["init", "--bare", bareOrigin], { cwd: root });
    await execFileAsync("git", ["remote", "add", "origin", bareOrigin], { cwd: root });
    await execFileAsync(
      "git",
      ["push", "--no-verify", "origin", `HEAD:refs/heads/${closureBranch}`],
      {
        cwd: root,
      },
    );
    await execFileAsync("git", ["branch", "-D", branch], { cwd: root });

    const { backend } = await loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task).not.toBeNull();
    await backend.writeTask({
      ...task!,
      commit: { hash: mergeSha, message: "Hosted close PR commit fallback" },
      result_summary: "Merged via PR #204.",
    });

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await rm(metaPath, { force: true });

    const createResponse = {
      number: 904,
      html_url: "https://github.com/example/repo/pull/904",
      state: "open",
      merged_at: null,
    };
    const commitPullsResponse = [
      {
        number: 204,
        html_url: "https://github.com/example/repo/pull/204",
        state: "closed",
        merged_at: "2026-04-09T16:26:00.000Z",
        merge_commit_sha: mergeSha,
        head: { ref: branch },
        base: { ref: baseBranch },
      },
    ];

    const fakeGh = await installFakeGhHostedClosePr({
      scenarioName: "commit-fallback",
      branch: closureBranch,
      existingResponse: [],
      mergedResponse: [],
      commitPullsResponse,
      createResponse,
      allowCreate: true,
    });
    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeGh.fakeBin}${path.delimiter}${originalPath ?? ""}`;
    process.env.AGENTPLANE_GH_LOG = fakeGh.logPath;

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close-pr",
        taskId,
        "--repo",
        "example/repo",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("created GitHub PR #904");
      expect(io.stdout).toContain("https://github.com/example/repo/pull/904");
    } finally {
      io.restore();
      process.env.PATH = originalPath;
      delete process.env.AGENTPLANE_GH_LOG;
    }

    const log = await readFile(fakeGh.logPath, "utf8");
    expect(log).toContain(`"repos/example/repo/commits/${mergeSha}/pulls"`);
    expect(log).toContain('"POST"');
  }, 240_000);
});
