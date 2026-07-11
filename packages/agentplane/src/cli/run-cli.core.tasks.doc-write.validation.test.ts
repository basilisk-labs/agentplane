import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import type { ResolvedProject } from "@agentplaneorg/core/project";
import { defaultConfig } from "@agentplaneorg/core/config";
import { renderTaskReadme } from "@agentplaneorg/core/tasks";

import { runCli } from "./run-cli.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  stubTaskBackend,
  writeAndConfigureRoot,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task doc set validation and errors", () => {
  it("task doc set reports a stable no-change outcome when content is unchanged", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300003-ABCD";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nUnchanged summary\n",
    );
    const readmePath = path.join(taskDir, "README.md");
    await writeFile(readmePath, readme, "utf8");

    const ioSeed = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Unchanged summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(ioSeed.stderr).toContain("task doc set outcome=no-change section=Summary");
    } finally {
      ioSeed.restore();
    }

    const before = await readFile(readmePath, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Unchanged summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=no-change section=Summary");
    } finally {
      io.restore();
    }

    const after = await readFile(readmePath, "utf8");
    expect(after).toBe(before);
  });

  it("task doc set fails when backend lacks doc support", async () => {
    const root = await writeAndConfigureRoot();
    const taskId = "202601300000-BCDE";
    const taskDir = path.join(root, ".agentplane", "tasks", taskId);
    await mkdir(taskDir, { recursive: true });
    const readme = renderTaskReadme(
      {
        id: taskId,
        title: "Task",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
      },
      "## Summary\n\nDoc",
    );
    await writeFile(path.join(taskDir, "README.md"), readme, "utf8");

    const resolved: ResolvedProject = {
      gitRoot: root,
      agentplaneDir: path.join(root, ".agentplane"),
    };
    const unsupportedBackend = stubTaskBackend({ id: "fake" });
    unsupportedBackend.capabilities.writes_task_readmes = false;

    const loadResult = {
      backend: unsupportedBackend,
      backendId: "fake",
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    } satisfies Awaited<ReturnType<typeof taskBackend.loadTaskBackend>>;
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue(loadResult);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        taskId,
        "--section",
        "Summary",
        "--text",
        "Hello",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Backend does not support task docs");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task doc set validates usage and maps unknown doc sections", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["task", "doc", "set", "X", "--root", root]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Missing required option: --section (or pass --full-doc)");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    let id = "";
    try {
      const code2 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
      id = io2.stdout.trim();
    } finally {
      io2.restore();
    }

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Nope",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code3).toBe(2);
      expect(io3.stderr).toContain("Unknown doc section");
    } finally {
      io3.restore();
    }

    const io4 = captureStdIO();
    try {
      const code4 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code4).toBe(2);
      expect(io4.stderr).toContain("Exactly one of --text or --file is required.");
    } finally {
      io4.restore();
    }

    const io5 = captureStdIO();
    try {
      const code5 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--full-doc",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code5).toBe(2);
      expect(io5.stderr).toContain("Use either --section or --full-doc");
    } finally {
      io5.restore();
    }
  });

  it("task doc set rejects missing flag values and unknown flags", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set flags",
        "--description",
        "Flag validation coverage",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "--root",
        root,
      ]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Missing value after --updated-by");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--nope",
        "y",
        "--root",
        root,
      ]);
      expect(code2).toBe(2);
      expect(io2.stderr).toContain("Unknown option: --nope.");
    } finally {
      io2.restore();
    }
  });

  it("task doc set rejects empty --updated-by", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set updated-by",
        "--description",
        "Updated-by validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Summary",
        "--text",
        "x",
        "--updated-by",
        "   ",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--updated-by must be non-empty");
    } finally {
      io.restore();
    }
  });

  it("task doc set rejects unexpected arguments", async () => {
    const root = await mkGitRepoRoot();

    let id = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Doc set unexpected arg",
        "--description",
        "Unexpected arg validation",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "set",
        id,
        "oops",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unexpected argument: oops");
    } finally {
      io.restore();
    }
  });

  it("task doc set maps missing task/file to E_IO", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
        "task",
        "doc",
        "set",
        "202601010101-ABCDEF",
        "--section",
        "Summary",
        "--text",
        "x",
        "--root",
        root,
      ]);
      expect(code1).toBe(4);
      expect(io1.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
    } finally {
      io2.restore();
    }

    const id = io2.stdout.trim();

    const io3 = captureStdIO();
    try {
      const code3 = await runCli([
        "task",
        "doc",
        "set",
        id,
        "--section",
        "Findings",
        "--file",
        path.join(root, "does-not-exist.txt"),
        "--root",
        root,
      ]);
      expect(code3).toBe(4);
      expect(io3.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io3.restore();
    }
  });
});
