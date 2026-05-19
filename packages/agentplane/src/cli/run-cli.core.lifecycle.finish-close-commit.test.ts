/* eslint-disable @typescript-eslint/no-unused-vars */
import { execFile } from "node:child_process";
import { chmod, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { readTask } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  mkGitRepoRoot,
  registerAgentplaneHome,
  runCliSilent,
  silenceStdIO,
  writeConfig,
  writeDefaultConfig,
} from "@agentplane/testkit";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

describe("runCli", () => {
  const BLOCK_FINISH_TIMEOUT_MS = 60_000;
  const BLOCK_FINISH_LONG_TIMEOUT_MS = 180_000;

  async function recordEvaluatorReview(root: string, taskId: string, note: string): Promise<void> {
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      note,
      "--quiet",
      "--root",
      root,
    ]);
  }

  it("finish marks done and records commit metadata", { timeout: 60_000 }, async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
    const { stdout: commitHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Finish task",
        "--description",
        "Finish command updates commit metadata",
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
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok to finish",
      "--quiet",
      "--root",
      root,
    ]);
    await recordEvaluatorReview(root, taskId, "EVALUATOR quality gate passed for finish smoke.");
    await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok to finish after current snapshot",
      "--quiet",
      "--root",
      root,
    ]);
    await recordEvaluatorReview(
      root,
      taskId,
      "EVALUATOR quality gate passed for close commit path.",
    );

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: direct workflow finish updates task docs with commit metadata present.",
        "--result",
        "lifecycle: finish task",
        "--commit",
        commitHash.trim(),
        "--force",
        "--root",
        root,
      ]);
      if (code !== 0) {
        throw new Error(`finish failed (code=${code}): ${io.stderr}`);
      }
      expect(code).toBe(0);
      expect(io.stdout).toMatch(/\nfinished\n/);
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(task.frontmatter.commit?.hash).toBeTruthy();
  });

  it(
    "finish --close-commit creates deterministic close commit in the same command",
    { timeout: BLOCK_FINISH_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      await writeFile(path.join(root, "file.txt"), "content", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "file.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish close commit",
          "--description",
          "Finish should optionally create close commit in one command",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }

      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Ok to finish with close commit path.",
        "--quiet",
        "--root",
        root,
      ]);
      await recordEvaluatorReview(
        root,
        taskId,
        "EVALUATOR quality gate passed for close commit path.",
      );

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: finish close commit path writes done metadata and close commit in one invocation.",
          "--result",
          "finish close commit",
          "--commit",
          implHash.trim(),
          "--close-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("creating deterministic close commit");
        expect(io.stdout).toMatch(/\nfinished\n/);
      } finally {
        io.restore();
      }

      const { stdout: headSubject } = await execFileAsync("git", ["show", "-s", "--format=%s"], {
        cwd: root,
      });
      expect(headSubject.trim()).toBe("docs: finish close commit");
      expect(headSubject).not.toContain("close:");
    },
  );

  it(
    "finish --commit-from-comment stops before DONE when quality review is stale after the generated commit",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      await writeFile(path.join(root, "file.txt"), "seed\n", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "file.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish commit-from-comment close commit",
          "--description",
          "Finish should keep implementation commit provenance while recording tracked task docs separately",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }

      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
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
        "Start: prepare commit-from-comment finish smoke path.",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Ok to finish via commit-from-comment path.",
        "--quiet",
        "--root",
        root,
      ]);
      await recordEvaluatorReview(
        root,
        taskId,
        "EVALUATOR quality gate passed for commit-from-comment close path.",
      );

      await writeFile(path.join(root, "file.txt"), "seed\nchanged\n", "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: finish commit-from-comment should create an implementation commit and then a deterministic close commit for the tracked task README.",
          "--result",
          "finish commit-from-comment close commit",
          "--commit-from-comment",
          "--commit-allow",
          "file.txt",
          "--commit-allow",
          ".agentplane/tasks",
          "--root",
          root,
        ]);
        expect(code).toBe(3);
        expect(io.stdout).toContain("creating commit from verification comment");
        expect(io.stdout).not.toContain("creating deterministic close commit");
        expect(io.stderr).toContain("requires a fresh EVALUATOR quality review");
      } finally {
        io.restore();
      }

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      const { stdout: headHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const { stdout: headSubject } = await execFileAsync("git", ["show", "-s", "--format=%s"], {
        cwd: root,
      });

      expect(task.frontmatter.status).not.toBe("DONE");
      expect(task.frontmatter.commit?.hash).not.toBe(headHash.trim());
      expect(headSubject.trim()).toContain("docs: done");
    },
  );

  it(
    "finish reports deterministic close-commit failures as close-commit phase errors",
    { timeout: 60_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      await writeFile(path.join(root, "file.txt"), "content", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "file.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish close commit failure",
          "--description",
          "Finish should report close-commit hook failures with the correct lifecycle phase",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }

      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Ok to finish with close commit failure path.",
        "--quiet",
        "--root",
        root,
      ]);
      await recordEvaluatorReview(
        root,
        taskId,
        "EVALUATOR quality gate passed before hook failure smoke.",
      );
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

      const hookPath = path.join(root, ".git", "hooks", "pre-commit");
      const preCommit = ["#!/bin/sh", 'echo "HOOK_CLOSE_COMMIT_BLOCKED" 1>&2', "exit 1", ""].join(
        "\n",
      );
      await writeFile(hookPath, preCommit, "utf8");
      await chmod(hookPath, 0o755);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: finish should preserve close-commit failure diagnostics.",
          "--result",
          "finish close commit blocked",
          "--commit",
          implHash.trim(),
          "--close-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stdout).toContain("creating deterministic close commit");
        expect(io.stderr).toContain("state: git rejected the generated close commit");
        expect(io.stderr).toContain(
          "likely_cause: a hook or commit policy blocked the deterministic task close commit after the task README was staged",
        );
        expect(io.stderr).toContain("HOOK_CLOSE_COMMIT_BLOCKED");
        expect(io.stderr).not.toContain("requested task-scoped commit");
      } finally {
        io.restore();
      }
    },
  );

  it(
    "finish --close-commit checks direct dirty tracked files before marking DONE",
    { timeout: BLOCK_FINISH_LONG_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      await writeFile(path.join(root, "file.txt"), "content", "utf8");
      await writeFile(path.join(root, ".gitignore"), "initial\n", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "file.txt", ".gitignore"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish dirty direct close preflight",
          "--description",
          "Finish should not mark DONE before direct close commit preflight rejects unrelated dirt",
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
        taskId = ioNew.stdout.trim();
      } finally {
        ioNew.restore();
      }

      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        "Ok to exercise direct dirty close preflight.",
        "--quiet",
        "--root",
        root,
      ]);
      await recordEvaluatorReview(
        root,
        taskId,
        "EVALUATOR quality gate passed before direct dirty preflight.",
      );
      await writeFile(path.join(root, ".gitignore"), "unrelated\n", "utf8");

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: finish should reject unrelated dirty tracked files before DONE.",
          "--result",
          "finish direct dirty preflight",
          "--commit",
          implHash.trim(),
          "--close-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stderr).toContain("requires a clean tracked working tree");
        expect(io.stderr).toContain(".gitignore");
        expect(io.stdout).not.toContain("task marked DONE");
      } finally {
        io.restore();
      }

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.status).not.toBe("DONE");
    },
  );
});
