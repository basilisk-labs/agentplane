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
});
