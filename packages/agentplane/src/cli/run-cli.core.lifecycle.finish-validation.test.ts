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
        "EVALUATOR",
        "--note",
        "Ok to finish with formatter close-commit blocker coverage.",
        "--quiet",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);

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
        "EVALUATOR",
        "--note",
        "Ok to finish: verification recorded for finish metadata persistence test coverage.",
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
            "EVALUATOR",
            "--note",
            "Ok to finish under conservative force-approval test.",
            "--quiet",
            "--root",
            root,
          ]);
          expect(code).toBe(0);
          await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
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

    await writeFile(path.join(root, "finish.txt"), "done\n", "utf8");
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "finish changes"], { cwd: root });

    await runCliSilent([
      "verify",
      taskA,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      "Ok A",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent(["blueprint", "snapshot", taskA, "--root", root]);
    await runCliSilent([
      "verify",
      taskB,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      "Ok B",
      "--quiet",
      "--root",
      root,
    ]);
    await runCliSilent(["blueprint", "snapshot", taskB, "--root", root]);

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
