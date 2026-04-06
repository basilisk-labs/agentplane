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
  installRunCliIntegrationHarness,
  runCliSilent,
  writeConfig,
  writeAndConfigureRoot,
} from "./run-cli.test-helpers.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

describe("runCli", () => {
  it("task normalize and migrate support quiet/force flags", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202602011330-NRM01";

    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Normalize task",
      "--description",
      "Normalize test",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "nodejs",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    const ioNormalize = captureStdIO();
    try {
      const code = await runCli(["task", "normalize", "--quiet", "--force", "--root", root]);
      expect(code).toBe(0);
      expect(ioNormalize.stdout).toBe("");
    } finally {
      ioNormalize.restore();
    }

    const exportPath = path.join(root, "tasks-export.json");
    await writeFile(
      exportPath,
      JSON.stringify(
        {
          tasks: [
            {
              id: "202602011330-MGR01",
              title: "Migrated task",
              description: "Migrate test",
              status: "TODO",
              priority: "med",
              owner: "CODER",
              depends_on: [],
              tags: ["nodejs"],
              verify: [],
              comments: [],
              doc_version: 2,
              doc_updated_at: new Date().toISOString(),
              doc_updated_by: "agentplane",
            },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    const ioMigrate = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "migrate",
        "--source",
        path.relative(root, exportPath),
        "--quiet",
        "--force",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioMigrate.stdout).toBe("");
    } finally {
      ioMigrate.restore();
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", "202602011330-MGR01", "--root", root]);
      expect(code).toBe(0);
      const migrated = JSON.parse(ioShow.stdout) as { id?: string };
      expect(migrated.id).toBe("202602011330-MGR01");
    } finally {
      ioShow.restore();
    }
  }, 15_000);

  it("task normalize and migrate reject unknown flags and missing source values", async () => {
    const root = await writeAndConfigureRoot();

    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "normalize", "--nope"], msg: "Unknown option: --nope." },
      { args: ["task", "migrate", "--source"], msg: "Missing value after --source" },
      { args: ["task", "migrate", "--nope"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task normalize --sync-hosted-merges reconciles stale branch_pr task state from hosted PR data", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const taskId = "202603271330-SYNC01";
    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Hosted merge sync task",
      "--description",
      "Sync stale local branch_pr task state",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "workflow",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch: `task/${taskId}/sync-hosted`,
          created_at: "2026-03-27T17:24:00.000Z",
          updated_at: "2026-03-27T17:24:00.000Z",
          last_verified_sha: null,
          last_verified_at: null,
          verify: { status: "skipped" },
        },
        null,
        2,
      ),
      "utf8",
    );

    const fakeBin = path.join(os.tmpdir(), `agentplane-gh-${Date.now()}`);
    await mkdir(fakeBin, { recursive: true });
    const ghPath = path.join(fakeBin, process.platform === "win32" ? "gh.cmd" : "gh");
    const ghScript =
      process.platform === "win32"
        ? '@echo off\r\necho [{"number":23,"title":"Hosted merge sync task (#23)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/202603271330-SYNC01/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345678"}}]\r\n'
        : '#!/bin/sh\nprintf \'%s\n\' \'[{"number":23,"title":"Hosted merge sync task (#23)","mergedAt":"2026-03-27T17:40:00.000Z","baseRefName":"main","headRefName":"task/202603271330-SYNC01/sync-hosted","headRefOid":"abcdef1234567890abcdef1234567890abcdef12","mergeCommit":{"oid":"1234567890abcdef1234567890abcdef12345678"}}]\'\n';
    await writeFile(ghPath, ghScript, "utf8");
    if (process.platform !== "win32") {
      await chmod(ghPath, 0o755);
    }

    const originalPath = process.env.PATH;
    process.env.PATH = `${fakeBin}${path.delimiter}${originalPath ?? ""}`;
    try {
      const code = await runCli(["task", "normalize", "--sync-hosted-merges", "--root", root]);
      expect(code).toBe(0);
    } finally {
      process.env.PATH = originalPath;
    }

    const ioShow = captureStdIO();
    try {
      const code = await runCli(["task", "show", taskId, "--root", root]);
      expect(code).toBe(0);
      const task = JSON.parse(ioShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe("Merged via PR #23.");
      expect(task.commit?.hash).toBe("1234567890abcdef1234567890abcdef12345678");
    } finally {
      ioShow.restore();
    }

    const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
    expect(metaRaw).toContain('"status": "MERGED"');
    expect(metaRaw).toContain('"merge_commit": "1234567890abcdef1234567890abcdef12345678"');

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--status", "DONE", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
    } finally {
      io.restore();
    }
  }, 20_000);

  it("task normalize --sync-branch-pr-state reconciles verified branch_pr tasks already shipped on base", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root, env: cleanGitEnv() });
    await writeFile(path.join(root, "feature.txt"), "shipped payload\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt", ".agentplane/config.json"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "feat: shipped payload"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const { stdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
      env: cleanGitEnv(),
    });
    const shippedHash = stdout.trim();

    const taskId = "202604050900-SYNC02";
    const addCode = await runCliSilent([
      "task",
      "add",
      taskId,
      "--title",
      "Local branch_pr sync task",
      "--description",
      "Sync locally shipped branch_pr task state",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "workflow",
      "--root",
      root,
    ]);
    expect(addCode).toBe(0);

    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--commit",
      shippedHash,
      "--root",
      root,
    ]);
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "verified shipped state",
      "--quiet",
      "--root",
      root,
    ]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          branch: `task/${taskId}/sync-local`,
          base: "main",
          created_at: "2026-04-05T09:00:00.000Z",
          updated_at: "2026-04-05T09:00:00.000Z",
          last_verified_sha: null,
          last_verified_at: null,
          verify: { status: "skipped" },
        },
        null,
        2,
      ),
      "utf8",
    );

    const code = await runCli(["task", "normalize", "--sync-branch-pr-state", "--root", root]);
    expect(code).toBe(0);

    const ioShow = captureStdIO();
    try {
      const showCode = await runCli(["task", "show", taskId, "--root", root]);
      expect(showCode).toBe(0);
      const task = JSON.parse(ioShow.stdout) as {
        status?: string;
        result_summary?: string;
        commit?: { hash?: string } | null;
      };
      expect(task.status).toBe("DONE");
      expect(task.result_summary).toBe(
        "Shipped on main and reconciled from local branch_pr state.",
      );
      expect(task.commit?.hash).toBe(shippedHash);
    } finally {
      ioShow.restore();
    }
  }, 20_000);
});
