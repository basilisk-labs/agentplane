import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import {
  approveTaskPlan,
  captureStdIO,
  installRunCliIntegrationHarness,
  recordVerificationOk,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "./run-cli.test-helpers.js";

const execFileAsync = promisify(execFile);

installRunCliIntegrationHarness();

describe("runCli", () => {
  it("task hosted-close closes a merged branch_pr task exactly once", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });
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
    await execFileAsync("git", ["commit", "-m", "feat: hosted close fixture"], { cwd: root });
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
  }, 120_000);
});
