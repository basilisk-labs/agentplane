import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  registerAgentplaneHome,
  silenceStdIO,
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
  it("verify requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const previous = process.env.AGENTPLANE_TASK_ID;
    delete process.env.AGENTPLANE_TASK_ID;
    try {
      const code = await runCli(["verify", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane verify");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = previous;
    }
  });

  it("verify requires --ok|--rework and exactly one note source", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify args",
        "--description",
        "Verify requires ok/rework and by/note",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, "--ok", "--by", "REVIEWER", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane verify");
    } finally {
      io.restore();
    }

    const ioConflict = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "inline",
        "--note-file",
        "note.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(ioConflict.stderr).toContain("Options --note and --note-file are mutually exclusive.");
    } finally {
      ioConflict.restore();
    }
  });

  it("verify records ok result and prints a status summary", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify ok",
        "--description",
        "Verify records ok result",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`✅ verified ${taskId} (state=ok`);
      expect(io.stdout).toContain(`readme=.agentplane/tasks/${taskId}/README.md`);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("VERIFY — ok");
    expect(readme).toContain("Note: Looks good");
  });

  it("verify accepts --local-only without a structured finding", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify local only",
        "--description",
        "Verify accepts a plain local-only flag",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Looks good",
        "--local-only",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`✅ verified ${taskId} (state=ok`);
      expect(io.stderr).not.toContain("Provide --observation, --impact, and --resolution");
    } finally {
      io.restore();
    }
  });

  it("verify supports --note-file and normalizes it to a single line", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify file note",
        "--description",
        "Verify records normalized note-file content",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const notePath = path.join(root, "verify-note.txt");
    await writeFile(notePath, "Looks\\n\\n  good   from file\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note-file",
        notePath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`✅ verified ${taskId} (state=ok`);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("Note: Looks good from file");
  });

  it("verify supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify quiet",
        "--description",
        "Quiet verify output",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("verify rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify flags",
        "--description",
        "Unknown verify flag",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--nope",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown option: --nope");
      expect(io.stderr).toContain("Did you mean --note?");
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane verify");
    } finally {
      io.restore();
    }
  });

  it("task verify ok writes record", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Task verify",
        "--description",
        "Task verify ok writes record",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "verify",
        "ok",
        taskId,
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`✅ verified ${taskId} (state=ok`);
      expect(io.stdout).toContain(`readme=.agentplane/tasks/${taskId}/README.md`);
    } finally {
      io.restore();
    }
  });

  it("task verify ok supports --note-file", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Task verify file note",
        "--description",
        "Task verify ok accepts --note-file",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const notePath = path.join(root, "task-verify-note.txt");
    await writeFile(notePath, "Needs\\n no changes\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "verify",
        "ok",
        taskId,
        "--by",
        "REVIEWER",
        "--note-file",
        notePath,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(`✅ verified ${taskId} (state=ok`);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("Note: Needs no changes");
  });

  it("verify does not accept missing task id even when flags come first (no env fallback)", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const previous = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202601010101-ABCDEF";
    const io = captureStdIO();
    try {
      const code = await runCli([
        "verify",
        "--ok",
        "--by",
        "REVIEWER",
        "--note",
        "Ok",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane verify");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENTPLANE_TASK_ID;
      else process.env.AGENTPLANE_TASK_ID = previous;
    }
  });
});
