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

  it("finish --close-commit succeeds on main in branch_pr mode", { timeout: 120_000 }, async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
    await writeFile(path.join(root, "file.txt"), "content", "utf8");
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
        "Finish branch_pr close commit",
        "--description",
        "Finish should create deterministic close commit on base branch in branch_pr mode",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "REVIEWER",
      "--note",
      "Ok to finish on the base branch in branch_pr mode.",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskId,
        "--author",
        "INTEGRATOR",
        "--body",
        "Verified: branch_pr close commit should succeed on the pinned base branch without workaround branches.",
        "--result",
        "branch_pr close commit",
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

    const closeBranch = `task-close/${taskId}/${implHash.trim().slice(0, 12)}`;
    const { stdout: currentBranch } = await execFileAsync(
      "git",
      ["rev-parse", "--abbrev-ref", "HEAD"],
      {
        cwd: root,
      },
    );
    expect(currentBranch.trim()).toBe("main");
    const { stdout: headSubject } = await execFileAsync(
      "git",
      ["show", "-s", "--format=%s", closeBranch],
      {
        cwd: root,
      },
    );
    expect(headSubject.trim()).toBe("docs: branch_pr close commit");
    expect(headSubject).not.toContain("✅");
  });

  it(
    "finish --close-commit leaves branch_pr PR artifacts clean and verified on the base checkout",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
      await writeFile(path.join(root, "file.txt"), "content", "utf8");
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
          "Finish branch_pr close commit refreshes PR artifacts",
          "--description",
          "Finish should not leave refreshed pr artifacts dirty after the close commit.",
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

      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await runCliSilent([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/close-artifacts`,
        "--root",
        root,
      ]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok to finish after PR artifacts reflect pass state.",
        "--quiet",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "INTEGRATOR",
          "--body",
          "Verified: branch_pr close commit should commit the refreshed pr artifacts and leave the base checkout clean.",
          "--result",
          "branch_pr close commit refreshes PR artifacts",
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

      const { stdout: status } = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no"],
        { cwd: root },
      );
      expect(status.trim()).toBe("");

      const closeBranch = `task-close/${taskId}/${implHash.trim().slice(0, 12)}`;
      const prDirGitPath = `.agentplane/tasks/${taskId}/pr`;
      const { stdout: metaText } = await execFileAsync(
        "git",
        ["show", `${closeBranch}:${prDirGitPath}/meta.json`],
        { cwd: root },
      );
      const meta = JSON.parse(metaText) as {
        last_verified_at?: string | null;
        verify?: { status?: string | null };
      };
      expect(meta.last_verified_at).toBeTruthy();
      expect(meta.verify?.status).toBe("pass");
      const { stdout: reviewText } = await execFileAsync(
        "git",
        ["show", `${closeBranch}:${prDirGitPath}/review.md`],
        { cwd: root },
      );
      const { stdout: githubBodyText } = await execFileAsync(
        "git",
        ["show", `${closeBranch}:${prDirGitPath}/github-body.md`],
        { cwd: root },
      );
      expect(reviewText).toContain("- State: ok");
      expect(githubBodyText).toContain("- State: ok");
      expect(reviewText).not.toContain("Not recorded yet.");
      expect(githubBodyText).not.toContain("Not recorded yet.");
    },
  );

  it(
    "finish --close-commit succeeds on main in branch_pr mode without a pinned base when origin HEAD resolves main",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
      await writeFile(path.join(root, "file.txt"), "content", "utf8");
      await execFileAsync("git", ["add", "file.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });
      await execFileAsync(
        "git",
        ["symbolic-ref", "refs/remotes/origin/HEAD", "refs/remotes/origin/main"],
        {
          cwd: root,
        },
      );
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish branch_pr close commit without pinned base",
          "--description",
          "Finish should allow the default branch fallback when branch_pr base pin is absent",
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
        "REVIEWER",
        "--note",
        "Ok to finish on main when the effective base branch resolves from origin HEAD.",
        "--quiet",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "INTEGRATOR",
          "--body",
          "Verified: branch_pr close commit should succeed when origin HEAD resolves the base branch even without a pin.",
          "--result",
          "branch_pr close commit remote default base",
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

      const closeBranch = `task-close/${taskId}/${implHash.trim().slice(0, 12)}`;
      const { stdout: headSubject } = await execFileAsync(
        "git",
        ["show", "-s", "--format=%s", closeBranch],
        {
          cwd: root,
        },
      );
      expect(headSubject.trim()).toBe("docs: branch_pr close commit remote default base");
      expect(headSubject).not.toContain("✅");
    },
  );

  it(
    "finish --close-commit accepts an explicit --base override without a pinned branch_pr base",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await configureGitUser(root);

      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
      await writeFile(path.join(root, "file.txt"), "content", "utf8");
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
          "Finish branch_pr explicit base override",
          "--description",
          "Finish should honor --base when no branch_pr base is pinned",
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
        "REVIEWER",
        "--note",
        "Ok to finish when an explicit base override is provided.",
        "--quiet",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "INTEGRATOR",
          "--body",
          "Verified: branch_pr finish should honor an explicit base override without a pin.",
          "--result",
          "branch_pr finish explicit base override",
          "--commit",
          implHash.trim(),
          "--base",
          "main",
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

      const closeBranch = `task-close/${taskId}/${implHash.trim().slice(0, 12)}`;
      const { stdout: headSubject } = await execFileAsync(
        "git",
        ["show", "-s", "--format=%s", closeBranch],
        {
          cwd: root,
        },
      );
      expect(headSubject.trim()).toBe("docs: branch_pr finish explicit base override");
      expect(headSubject).not.toContain("✅");
    },
  );

  it("finish rejects non-base branches in branch_pr mode", { timeout: 120_000 }, async () => {
    const root = await mkGitRepoRoot();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "main"], { cwd: root });
    await writeFile(path.join(root, "file.txt"), "content", "utf8");
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
        "Reject branch_pr finish from task branch",
        "--description",
        "Finish must reject non-base branches in branch_pr mode",
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

    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "REVIEWER",
      "--note",
      "Ok to reject branch_pr finish from a task branch.",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
    await execFileAsync("git", ["checkout", "-b", "task/demo-finish-branch"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskId,
        "--author",
        "INTEGRATOR",
        "--body",
        "Verified: branch_pr finish should fail outside the base checkout.",
        "--result",
        "branch_pr finish guard",
        "--commit",
        implHash.trim(),
        "--close-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("finish must run on base branch main in branch_pr mode");
      expect(io.stderr).toContain("integrate first or reconcile from the base checkout");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("TODO");
  });

  it("finish rejects blank --base values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-ABCDEF",
        "--author",
        "INTEGRATOR",
        "--body",
        "Verified: finish should reject blank explicit base values.",
        "--base",
        " ",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid value for --base: empty.");
    } finally {
      io.restore();
    }
  });
});
