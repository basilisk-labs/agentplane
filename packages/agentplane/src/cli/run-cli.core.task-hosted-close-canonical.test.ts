import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { loadTaskBackend } from "../backends/task-backend.js";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  writeAndConfigureRoot,
  writeConfig,
} from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS = 300_000;

installRunCliIntegrationHarness();

describe("runCli", { timeout: HOSTED_CLOSE_INTEGRATION_TIMEOUT_MS }, () => {
  it("leaves canonical hosted-close to the Task Kernel lifecycle", async () => {
    const root = await writeAndConfigureRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
    const { stdout: baseBranchStdout } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      { cwd: root },
    );
    const baseBranch = baseBranchStdout.trim();

    const createIo = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Canonical hosted close task",
        "--description",
        "Keep hosted closure under Task Kernel ownership",
        "--owner",
        "CODER",
        "--tag",
        "meta",
        "--task-kind",
        "code",
        "--mutation-scope",
        "code",
        "--route",
        "branch_pr",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = createIo.stdout.trim().split(/\s+/u).at(-1) ?? "";
    } finally {
      createIo.restore();
    }
    expect(taskId).toMatch(/^\d{12}-[A-Z0-9]+$/u);
    const { backend } = await loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.extensions).toHaveProperty("task_kernel");

    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "add canonical task"], {
      cwd: root,
    });
    const branch = `task/${taskId}/canonical-hosted-close`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "canonical-hosted-close.ts"), "export {};\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "exercise canonical close"], {
      cwd: root,
    });
    const { stdout: branchHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const branchHead = branchHeadStdout.trim();
    await execFileAsync("git", ["checkout", baseBranch], { cwd: root });
    await execFileAsync("git", ["merge", "--no-ff", branch, "-m", "Merge canonical task"], {
      cwd: root,
    });
    const { stdout: mergeHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    const mergeSha = mergeHeadStdout.trim();
    const taskReadme = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const beforeTask = await readFile(taskReadme, "utf8");

    const eventDir = await mkdtemp(path.join(tmpdir(), "agentplane-canonical-hosted-close-"));
    const eventPath = path.join(eventDir, "event.json");
    await writeFile(
      eventPath,
      `${JSON.stringify({
        pull_request: {
          merged: true,
          number: 89,
          title: "Canonical hosted close task",
          merge_commit_sha: mergeSha,
          merged_at: "2026-09-20T10:00:00.000Z",
          head: { ref: branch, sha: branchHead },
          base: { ref: baseBranch },
        },
      })}\n`,
      "utf8",
    );

    const closeIo = captureStdIO();
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
      expect(closeIo.stdout).toContain("hosted close skipped");
      expect(closeIo.stdout).toContain("canonical Task Kernel lifecycle");
    } finally {
      closeIo.restore();
    }

    const { stdout: afterHeadStdout } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    expect(afterHeadStdout.trim()).toBe(mergeSha);
    expect(await readFile(taskReadme, "utf8")).toBe(beforeTask);
    const { stdout: statusStdout } = await execFileAsync(
      "git",
      ["status", "--short", "--untracked-files=all"],
      { cwd: root },
    );
    expect(statusStdout.trim()).toBe("");
  });
});
