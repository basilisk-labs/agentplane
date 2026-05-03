/* eslint-disable @typescript-eslint/no-unused-vars */
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
      "  console.log(JSON.stringify(mergedResponse));",
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
  it(
    "task hosted-close closes a merged branch_pr task exactly once",
    async () => {
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

      const taskId = "202603271940-EG3B0C";
      const branch = `task/${taskId}/hosted-close`;
      const addCode = await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close task",
        "--description",
        "Exercise hosted branch_pr closure",
        "--priority",
        "high",
        "--owner",
        "CODER",
        "--tag",
        "workflow",
        "--root",
        root,
      ]);
      expect(addCode).toBe(0);

      for (const [section, text] of [
        ["Verify Steps", "1. Run task hosted-close against a merged branch_pr task."],
        [
          "Findings",
          [
            "- Observation: hosted close automation can still depend on manual GitHub-side cleanup when the task PR merged but the closure branch could not be created automatically.",
            "  Impact: operators repeat the same reconciliation steps for equivalent hosted-close tails.",
            "  Resolution: inspect the merged PR state first, then create the missing closure branch only when the close metadata is absent.",
            "  Fixability: external",
          ].join("\n"),
        ],
      ] as const) {
        const code = await runCliSilent([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          section,
          "--text",
          text,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      }

      await approveTaskPlan(root, taskId);
      const startCode = await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: exercise hosted branch_pr closure from a merged PR event.",
        "--root",
        root,
      ]);
      expect(startCode).toBe(0);
      await recordVerificationOk(root, taskId);

      const prOpenCode = await runCliSilent([
        "pr",
        "open",
        taskId,
        "--branch",
        branch,
        "--sync-only",
        "--author",
        "CODER",
        "--root",
        root,
      ]);
      expect(prOpenCode).toBe(0);

      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      const touchedFile = path.join(root, "src", "hosted-close.ts");
      await mkdir(path.dirname(touchedFile), { recursive: true });
      await writeFile(touchedFile, "export const hostedClose = true;\n", "utf8");
      await execFileAsync("git", ["add", "."], { cwd: root });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: hosted close fixture"], {
        cwd: root,
      });
      const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const branchHead = branchHeadStdout.trim();

      await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
      await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge task branch"], {
        cwd: root,
      });
      const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const mergeSha = mergeHeadStdout.trim();

      const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-event-"));
      const eventPath = path.join(eventDir, "event.json");
      await writeFile(
        eventPath,
        `${JSON.stringify(
          {
            pull_request: {
              merged: true,
              number: 88,
              title: "Hosted close task",
              merge_commit_sha: mergeSha,
              merged_at: "2026-03-27T20:00:00.000Z",
              head: { ref: branch, sha: branchHead },
              base: { ref: baseBranch },
            },
          },
          null,
          2,
        )}\n`,
        "utf8",
      );

      const { stdout: beforeCloseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const beforeCloseHead = beforeCloseStdout.trim();
      expect(beforeCloseHead).toBe(mergeSha);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "hosted-close",
          "--event-json",
          eventPath,
          "--root",
          root,
        ]);
        if (code !== 0) {
          const { stdout: statusStdout } = await execFileAsync("git", ["status", "--short"], {
            cwd: root,
          });
          throw new Error(
            `hosted-close failed: code=${code} stderr=${io.stderr} status=${statusStdout}`,
          );
        }
        expect(code).toBe(0);
        expect(io.stdout).toContain(`task hosted close ${taskId}`);
        expect(io.stdout).toContain("incident registry updated (1 promoted)");
      } finally {
        io.restore();
      }

      const { stdout: afterCloseStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const closeHead = afterCloseStdout.trim();
      expect(closeHead).not.toBe(mergeSha);

      const taskShow = captureStdIO();
      try {
        const code = await runCli(["task", "show", taskId, "--root", root]);
        expect(code).toBe(0);
        const task = JSON.parse(taskShow.stdout) as {
          status?: string;
          result_summary?: string;
          commit?: { hash?: string } | null;
        };
        expect(task.status).toBe("DONE");
        expect(task.result_summary).toBe("Merged via PR #88.");
        expect(task.commit?.hash).toBe(mergeSha);
      } finally {
        taskShow.restore();
      }

      const metaRaw = await readFile(
        path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
        "utf8",
      );
      expect(metaRaw).toContain('"status": "MERGED"');
      expect(metaRaw).toContain(`"merge_commit": "${mergeSha}"`);
      const incidents = await readFile(
        path.join(root, ".agentplane", "policy", "incidents.md"),
        "utf8",
      );
      const incidentsAsset = await readFile(
        path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
        "utf8",
      );
      expect(incidents).toContain(`source_task: ${taskId}`);
      expect(incidents).toContain("fixability: external");
      expect(incidents).toContain("state: open");
      expect(incidents).toContain(
        "inspect the merged PR state first, then create the missing closure branch only when the close metadata is absent",
      );
      expect(incidentsAsset).toBe(incidents);

      const rerunIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "hosted-close",
          "--event-json",
          eventPath,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(rerunIo.stdout).toContain("hosted close skipped");
      } finally {
        rerunIo.restore();
      }

      const { stdout: afterRerunStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      expect(afterRerunStdout.trim()).toBe(closeHead);
    },
    HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS,
  );

  it(
    "task hosted-close closes included branch_pr batch tasks with the primary task",
    async () => {
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

      const primaryTaskId = "202603271940-BATCH1";
      const includedTaskId = "202603271940-BATCH2";
      for (const taskId of [primaryTaskId, includedTaskId]) {
        const addCode = await runCliSilent([
          "task",
          "add",
          taskId,
          "--title",
          `Batch task ${taskId}`,
          "--description",
          "Exercise hosted branch_pr batch closure",
          "--priority",
          "high",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]);
        expect(addCode).toBe(0);
        await approveTaskPlan(root, taskId);
        const startCode = await runCliSilent([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: exercise hosted branch_pr batch closure.",
          "--root",
          root,
        ]);
        expect(startCode).toBe(0);
        await recordVerificationOk(root, taskId);
      }

      const branch = `task/${primaryTaskId}/hosted-close-batch`;
      const prOpenCode = await runCliSilent([
        "pr",
        "open",
        primaryTaskId,
        "--branch",
        branch,
        "--include-task",
        includedTaskId,
        "--sync-only",
        "--author",
        "CODER",
        "--root",
        root,
      ]);
      expect(prOpenCode).toBe(0);

      await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
      const touchedFile = path.join(root, "src", "hosted-close-batch.ts");
      await mkdir(path.dirname(touchedFile), { recursive: true });
      await writeFile(touchedFile, "export const hostedCloseBatch = true;\n", "utf8");
      await execFileAsync("git", ["add", "."], { cwd: root });
      await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: hosted close batch"], {
        cwd: root,
      });
      const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const branchHead = branchHeadStdout.trim();

      await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
      await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge batch task branch"], {
        cwd: root,
      });
      const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });
      const mergeSha = mergeHeadStdout.trim();

      const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-batch-"));
      const eventPath = path.join(eventDir, "event.json");
      await writeFile(
        eventPath,
        `${JSON.stringify(
          {
            pull_request: {
              merged: true,
              number: 89,
              title: "Hosted close batch task",
              merge_commit_sha: mergeSha,
              merged_at: "2026-03-27T20:00:00.000Z",
              head: { ref: branch, sha: branchHead },
              base: { ref: baseBranch },
            },
          },
          null,
          2,
        )}\n`,
        "utf8",
      );

      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);

      for (const taskId of [primaryTaskId, includedTaskId]) {
        const taskShow = captureStdIO();
        try {
          const showCode = await runCli(["task", "show", taskId, "--root", root]);
          expect(showCode).toBe(0);
          const task = JSON.parse(taskShow.stdout) as {
            status?: string;
            commit?: { hash?: string } | null;
          };
          expect(task.status).toBe("DONE");
          expect(task.commit?.hash).toBe(mergeSha);
        } finally {
          taskShow.restore();
        }
      }
    },
    HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS,
  );

  it("task hosted-close falls back when the merge commit object is absent locally", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
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

    const taskId = "202604062228-9JBSSW";
    const branch = `task/${taskId}/missing-merge-object`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close fallback task",
        "--description",
        "Exercise hosted-close when merge object is missing locally",
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
        "1. Run task hosted-close against a merged branch_pr task whose merge object is absent locally.",
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
        "Start: exercise hosted-close fallback when merge object is absent locally.",
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
        "--branch",
        branch,
        "--sync-only",
        "--author",
        "CODER",
        "--root",
        root,
      ]),
    ).toBe(0);

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "missing-merge-object.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const missingMergeObject = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "feat: missing merge object fixture"],
      {
        cwd: root,
      },
    );
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge fallback task branch"], {
      cwd: root,
    });

    const mergeSha = "1234567890abcdef1234567890abcdef12345678";
    const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-close-missing-merge-"));
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify(
        {
          pull_request: {
            merged: true,
            number: 91,
            title: "Hosted close fallback task",
            merge_commit_sha: mergeSha,
            merged_at: "2026-04-06T22:14:40.000Z",
            head: { ref: branch, sha: branchHead },
            base: { ref: baseBranch },
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      if (code !== 0) {
        const { stdout: statusStdout } = await execFileAsync("git", ["status", "--short"], {
          cwd: root,
        });
        throw new Error(
          `hosted-close fallback failed: code=${code} stderr=${io.stderr} status=${statusStdout}`,
        );
      }
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task hosted close ${taskId}`);
      expect(io.stdout).toContain("plain finish body/result stayed task-local");
    } finally {
      io.restore();
    }

    const taskShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", taskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(taskShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string; message?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe("Merged via PR #91.");
      expect(task.commit?.hash).toBe(mergeSha);
      expect(task.commit?.message).toBe("Hosted close fallback task");
    } finally {
      taskShow.restore();
    }

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(metaRaw).toContain('"status": "MERGED"');
    expect(metaRaw).toContain(`"merge_commit": "${mergeSha}"`);
  }, 240_000);

  it("task hosted-close recreates missing base pr metadata from the merged event", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "policy", "incidents.md"),
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

    const taskId = "202604131329-KHYHBT";
    const branch = `task/${taskId}/missing-base-pr-meta`;
    expect(
      await runCliSilent([
        "task",
        "add",
        taskId,
        "--title",
        "Hosted close missing pr meta task",
        "--description",
        "Recover hosted-close when base-side PR metadata is missing",
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
        "1. Run task hosted-close after deleting base-side pr/meta.json for a merged branch_pr task.",
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
        "Start: recover hosted-close when base-side pr metadata is missing after merge.",
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
        "--branch",
        branch,
        "--sync-only",
        "--author",
        "CODER",
        "--root",
        root,
      ]),
    ).toBe(0);

    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const touchedFile = path.join(root, "src", "missing-base-pr-meta.ts");
    await mkdir(path.dirname(touchedFile), { recursive: true });
    await writeFile(touchedFile, "export const missingBasePrMeta = true;\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "feat: missing base pr meta fixture"],
      {
        cwd: root,
      },
    );
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge missing pr meta task"], {
      cwd: root,
    });
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();

    await execFileAsync("git", ["branch", "-D", branch], { cwd: root });
    await rm(path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"), { force: true });
    await rm(path.join(root, ".agentplane", "tasks", taskId, "README.md"), { force: true });

    const eventDir = await mkdtemp(
      path.join(tmpdir(), "agentplane-hosted-close-missing-base-pr-meta-"),
    );
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify(
        {
          pull_request: {
            merged: true,
            number: 92,
            title: "Hosted close missing pr meta task",
            html_url: "https://example.test/pr/92",
            merge_commit_sha: mergeSha,
            merged_at: "2026-04-13T13:35:00.000Z",
            head: { ref: branch, sha: branchHead },
            base: { ref: baseBranch },
          },
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "hosted-close",
        "--event-json",
        eventPath,
        "--root",
        root,
      ]);
      if (code !== 0) {
        const { stdout: statusStdout } = await execFileAsync("git", ["status", "--short"], {
          cwd: root,
        });
        throw new Error(
          `hosted-close missing-pr-meta failed: code=${code} stderr=${io.stderr} status=${statusStdout}`,
        );
      }
      expect(code).toBe(0);
      expect(io.stdout).toContain(`task hosted close ${taskId}`);
    } finally {
      io.restore();
    }

    const taskShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", taskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(taskShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe("Merged via PR #92.");
      expect(task.commit?.hash).toBe(mergeSha);
    } finally {
      taskShow.restore();
    }

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    expect(metaRaw).toContain('"status": "MERGED"');
    expect(metaRaw).toContain(`"merge_commit": "${mergeSha}"`);
    expect(metaRaw).toContain('"pr_number": 92');
    expect(metaRaw).toContain(`"branch": "${branch}"`);
    expect(metaRaw).toContain('"pr_url": "https://example.test/pr/92"');
  }, 240_000);
});
