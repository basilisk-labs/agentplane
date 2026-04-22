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

  it("block updates status and appends comment", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Block task",
        "--description",
        "Block command updates status",
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
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on upstream API response to unblock direct workflow testing.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ blocked");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("BLOCKED");
    expect(task.frontmatter.comments.at(-1)?.author).toBe("CODER");
  });

  it("block supports --quiet output", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Quiet block task",
        "--description",
        "Block command with quiet flag",
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
      taskId = ioNew.stdout.trim();
    } finally {
      ioNew.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Blocked: testing quiet output in block command.",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
    }
  });

  it("block does not accept missing task id (no env fallback)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "--author",
        "CODER",
        "--body",
        "Blocked: block should require an explicit task id.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane block");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
      else delete process.env.AGENTPLANE_TASK_ID;
    }
  });

  it("block requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["block", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane block");
    } finally {
      io.restore();
    }
  });

  it("block requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "--author",
        "CODER",
        "--body",
        "Blocked: missing task id should trigger usage error in block.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane block");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("block rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Blocked: test unknown flag handling for block command errors.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane block");
    } finally {
      io.restore();
    }
  });

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

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: direct workflow finish updates export and lint with commit metadata present.",
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
    await runCliSilent(["task", "export", "--root", root]);
    const tasksJson = await readFile(path.join(root, ".agentplane", "tasks.json"), "utf8");
    expect(tasksJson).toContain(taskId);
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
      expect(headSubject).toContain("close:");
    },
  );

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
    expect(headSubject).toContain("close:");
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
      expect(headSubject).toContain("close:");
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
      expect(headSubject).toContain("close:");
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

  it(
    "finish --commit-from-comment records implementation hash in task metadata and uses a separate close commit for tracked task docs",
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
        expect(code).toBe(0);
        expect(io.stdout).toContain("creating commit from verification comment");
        expect(io.stdout).toContain("creating deterministic close commit");
        expect(io.stdout).toMatch(/\nfinished\n/);
      } finally {
        io.restore();
      }

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      const { stdout: headHash } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
      const { stdout: parentHash } = await execFileAsync("git", ["rev-parse", "HEAD^"], {
        cwd: root,
      });
      const { stdout: headSubject } = await execFileAsync("git", ["show", "-s", "--format=%s"], {
        cwd: root,
      });

      expect(task.frontmatter.commit?.hash).toBe(parentHash.trim());
      expect(task.frontmatter.commit?.hash).not.toBe(headHash.trim());
      expect(headSubject.trim()).toContain("close:");
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
    "finish promotes formatter hook blockers into close-commit next-action guidance",
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
          "Finish close commit formatter guidance",
          "--description",
          "Finish should surface formatter guidance when the close commit is blocked",
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
        "Ok to finish with formatter close-commit blocker coverage.",
        "--quiet",
        "--root",
        root,
      ]);

      const hookPath = path.join(root, ".git", "hooks", "pre-commit");
      const preCommit = [
        "#!/bin/sh",
        'echo "Code style issues found. Run Prettier with --write." 1>&2',
        "exit 1",
        "",
      ].join("\n");
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
          "Verified: finish should surface formatter guidance when the close commit is blocked.",
          "--result",
          "finish close commit formatter guidance",
          "--commit",
          implHash.trim(),
          "--close-commit",
          "--root",
          root,
        ]);
        expect(code).toBe(5);
        expect(io.stderr).toContain("state: git rejected the generated close commit");
        expect(io.stderr).toContain(
          "likely_cause: a formatting check in the pre-commit path rejected the deterministic close commit after the task README was staged",
        );
        expect(io.stderr).toContain(
          "next_action: bun run format (apply formatter fixes before retrying the commit flow)",
        );
        expect(io.stderr).toContain(
          "reason_code: git_pre_commit_format [git] a formatting check in the pre-commit path blocked the commit",
        );
      } finally {
        io.restore();
      }
    },
  );

  it(
    "finish persists result_summary/risk_level/breaking in task README frontmatter",
    { timeout: BLOCK_FINISH_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);

      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      const execFileAsync = promisify(execFile);
      await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

      const ioNew = captureStdIO();
      let taskId = "";
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish metadata persistence",
          "--description",
          "Ensure finish writes metadata into README frontmatter",
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
        "Ok to finish: verification recorded for finish metadata persistence test coverage.",
        "--quiet",
        "--root",
        root,
      ]);

      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Verified: ensure finish persists result_summary, risk_level, and breaking in frontmatter.",
          "--result",
          "persist finish metadata",
          "--risk",
          "high",
          "--breaking",
          "--commit",
          "HEAD",
          "--force",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toMatch(/\nfinished\n/);
      } finally {
        io.restore();
      }

      const task = await readTask({ cwd: root, rootOverride: root, taskId });
      expect(task.frontmatter.status).toBe("DONE");
      expect(task.frontmatter.result_summary).toBe("persist finish metadata");
      expect(task.frontmatter.risk_level).toBe("high");
      expect(task.frontmatter.breaking).toBe(true);
    },
  );

  it("finish does not accept missing task id (no env fallback)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "--author",
        "CODER",
        "--body",
        "Verified: finish should require explicit task ids (no env fallback).",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      const usageOutput = `${io.stderr}${io.stdout}`;
      expect(usageOutput).toContain("Usage:");
      expect(usageOutput).toContain("agentplane finish");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
      else delete process.env.AGENTPLANE_TASK_ID;
    }
  });

  it(
    "finish --force requires explicit approval in conservative profile",
    { timeout: BLOCK_FINISH_TIMEOUT_MS },
    async () => {
      const root = await mkGitRepoRoot();
      await configureGitUser(root);
      await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
      await commitAll(root, "seed");
      const cfg = defaultConfig();
      cfg.execution.profile = "conservative";
      await writeConfig(root, cfg);

      let taskId = "";
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "task",
            "new",
            "--title",
            "Finish force approval",
            "--description",
            "conservative force approval check for finish",
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
          taskId = io.stdout.trim();
        } finally {
          io.restore();
        }
      }
      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "verify",
            taskId,
            "--ok",
            "--by",
            "TESTER",
            "--note",
            "Ok to finish under conservative force-approval test.",
            "--quiet",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "finish",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Verified: force finish requires explicit approval in conservative profile mode.",
            "--result",
            "force-finish-check",
            "--force",
            "--root",
            root,
          ]);
          expect(code).toBe(3);
          expect(io.stderr).toContain("Force action requires explicit approval");
        } finally {
          io.restore();
        }
      }

      {
        const io = captureStdIO();
        try {
          const code = await runCli([
            "finish",
            taskId,
            "--author",
            "CODER",
            "--body",
            "Verified: force finish proceeds with explicit yes approval in conservative profile mode.",
            "--result",
            "force-finish-check",
            "--commit",
            "HEAD",
            "--force",
            "--yes",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
        } finally {
          io.restore();
        }
      }
    },
  );

  it("finish supports multiple task ids", async () => {
    const root = await mkGitRepoRoot();
    const execFileAsync = promisify(execFile);
    let taskA = "";
    let taskB = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish shared closeout alpha",
          "--description",
          "First task for multi-id finish coverage",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskA = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Finish shared closeout beta",
          "--description",
          "Second task for multi-id finish coverage",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskB = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent([
      "verify",
      taskA,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok A",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent([
      "verify",
      taskB,
      "--ok",
      "--by",
      "TESTER",
      "--note",
      "Ok B",
      "--quiet",
      "--root",
      root,
    ]);

    await writeFile(path.join(root, "finish.txt"), "done\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "finish changes"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        taskA,
        taskB,
        "--author",
        "CODER",
        "--body",
        "Verified: finish two tasks with a shared comment to close both records.",
        "--commit",
        "HEAD",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const a = await readTask({ cwd: root, rootOverride: root, taskId: taskA });
    const b = await readTask({ cwd: root, rootOverride: root, taskId: taskB });
    expect(a.frontmatter.status).toBe("DONE");
    expect(b.frontmatter.status).toBe("DONE");
  });

  it("finish requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["finish", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "--author",
        "CODER",
        "--body",
        "Verified: missing task id should trigger usage error in finish command.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane finish");
    } finally {
      io.restore();
      if (previous) process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("finish rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Verified: test unknown flag handling for finish command errors in direct mode.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish requires a commit value when --commit is provided", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Verified: missing commit hash should trigger usage error for finish.",
        "--commit",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish rejects missing values for commit and status commit flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; label: string }[] = [
      { args: ["--commit-emoji"], label: "--commit-emoji" },
      { args: ["--commit-allow"], label: "--commit-allow" },
      { args: ["--status-commit-emoji"], label: "--status-commit-emoji" },
      { args: ["--status-commit-allow"], label: "--status-commit-allow" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "finish",
          "202601010101-ABCDEF",
          "--author",
          "CODER",
          "--body",
          "Verified: missing finish flag values should trigger usage errors for parsing.",
          ...entry.args,
          "--root",
          root,
        ]);
        expect(code).toBe(2);
        expect(io.stderr).toContain("Usage:");
        expect(io.stderr).toContain("agentplane finish");
      } finally {
        io.restore();
      }
    }
  });

  it("finish rejects commit-from-comment with multiple task ids", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "202601010101-AAA111",
        "202601010101-BBB222",
        "--author",
        "CODER",
        "--body",
        "Verified: finish with multiple task ids should fail when status-commit is requested.",
        "--commit-from-comment",
        "--commit-emoji",
        "✅",
        "--commit-allow",
        "docs/",
        "--commit-require-clean",
        "--status-commit",
        "--status-commit-emoji",
        "✅",
        "--status-commit-allow",
        "docs/",
        "--status-commit-require-clean",
        "--confirm-status-commit",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain(
        "--commit-from-comment/--status-commit requires exactly one task id",
      );
    } finally {
      io.restore();
    }
  });
});
