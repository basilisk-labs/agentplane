import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  cmdTaskAdd,
  cmdTaskDocSet,
  cmdTaskDocShow,
  cmdTaskPlanSet,
  cmdTaskPlanApprove,
  cmdTaskPlanReject,
} from "./workflow.js";
import { defaultConfig } from "@agentplaneorg/core";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  silenceStdIO,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

function baseTaskBackend(overrides: Partial<taskBackend.TaskBackend>): taskBackend.TaskBackend {
  return {
    id: "local",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    ...overrides,
  };
}

async function makeRepo(): Promise<string> {
  const root = await mkGitRepoRoot();
  await writeDefaultConfig(root);
  return root;
}

async function addTask(root: string, taskId: string): Promise<void> {
  await cmdTaskAdd({
    cwd: root,
    taskIds: [taskId],
    title: "Task",
    description: "Desc",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["nodejs"],
    dependsOn: [],
    verify: [],
    commentAuthor: null,
    commentBody: null,
  });
}

describe("commands/workflow", () => {
  let restoreStdIO: (() => void) | null = null;

  beforeEach(() => {
    restoreStdIO = silenceStdIO();
  });

  afterEach(() => {
    restoreStdIO?.();
    restoreStdIO = null;
  });

  it("task doc set validates usage and updated-by inputs", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-A1B2";
    await addTask(root, taskId);

    await expect(cmdTaskDocSet({ cwd: root, taskId, section: "Summary" })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await expect(
      cmdTaskDocSet({
        cwd: root,
        taskId,
        section: "Summary",
        text: "Hello",
        file: "note.txt",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      cmdTaskDocSet({
        cwd: root,
        taskId,
        section: "Summary",
        text: "Hello",
        updatedBy: "   ",
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("task doc set reads from files and handles missing files", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-C3D4";
    await addTask(root, taskId);

    await expect(
      cmdTaskDocSet({
        cwd: root,
        taskId,
        section: "Summary",
        file: "missing.txt",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    const notePath = path.join(root, "note.md");
    await writeFile(notePath, "## Summary\n\nHello from file", "utf8");
    const io = captureStdIO();
    try {
      const code = await cmdTaskDocSet({
        cwd: root,
        taskId,
        section: "Summary",
        file: "note.md",
      });
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=section-updated section=Summary");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect((text.match(/^## Summary$/gm) ?? []).length).toBe(1);
    expect(text).toContain("Hello from file");
  });

  it("task doc set accepts full-doc content with multiple headings", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-E5F6";
    await addTask(root, taskId);
    const io = captureStdIO();
    try {
      const code = await cmdTaskDocSet({
        cwd: root,
        taskId,
        section: "Summary",
        text: "## Summary\n\nAlpha\n\n## Scope\n\nBeta",
      });
      expect(code).toBe(0);
      expect(io.stderr).toContain("task doc set outcome=full-doc-updated section=Summary");
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect(text).toContain("## Summary");
    expect(text).toContain("Alpha");
    expect(text).toContain("## Scope");
    expect(text).toContain("Beta");
  });

  it("task plan set writes ## Plan and resets plan_approval to pending", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A1";
    await addTask(root, taskId);

    const io = captureStdIO();
    try {
      const code = await cmdTaskPlanSet({
        cwd: root,
        taskId,
        text: "Do X then Y.",
        updatedBy: "ORCHESTRATOR",
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect(text).toContain("## Plan");
    expect(text).toContain("Do X then Y.");
    expect(text).toContain("plan_approval:");
    expect(text).toContain('state: "pending"');
  });

  it("task plan set decodes escaped inline newlines", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A4";
    await addTask(root, taskId);

    await cmdTaskPlanSet({
      cwd: root,
      taskId,
      text: String.raw`1. Do X\n2. Verify Y`,
    });

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect(text).toContain("1. Do X\n2. Verify Y");
    expect(text).not.toContain(String.raw`1. Do X\n2. Verify Y`);
  });

  it("task plan approve rejects when plan is empty", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A2";
    await addTask(root, taskId);
    await cmdTaskDocSet({
      cwd: root,
      taskId,
      section: "Plan",
      text: "",
    });

    await expect(cmdTaskPlanApprove({ cwd: root, taskId, by: "USER" })).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("task plan approve and reject update plan_approval state", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A3";
    await addTask(root, taskId);

    await cmdTaskPlanSet({ cwd: root, taskId, text: "Plan content." });
    await cmdTaskPlanApprove({ cwd: root, taskId, by: "USER", note: "OK" });

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const approved = await readFile(readmePath, "utf8");
    expect(approved).toContain('state: "approved"');
    expect(approved).toContain('updated_by: "USER"');

    await expect(
      cmdTaskPlanReject({ cwd: root, taskId, by: "USER", note: "" }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await cmdTaskPlanReject({ cwd: root, taskId, by: "USER", note: "Nope" });

    const rejected = await readFile(readmePath, "utf8");
    expect(rejected).toContain('state: "rejected"');
    expect(rejected).toContain('note: "Nope"');
  });

  it("task doc show reports missing content and empty docs", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-G7H8";

    const spyEmptySection = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend: baseTaskBackend({
        getTaskDoc: vi.fn().mockResolvedValue("## Summary\n## Scope\n\ncontent"),
      }),
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });
    const io = captureStdIO();
    try {
      const code = await cmdTaskDocShow({
        cwd: root,
        taskId,
        section: "Summary",
        quiet: false,
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("section has no content");
    } finally {
      io.restore();
      spyEmptySection.mockRestore();
    }

    const spyEmpty = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend: baseTaskBackend({ getTaskDoc: vi.fn().mockResolvedValue("") }),
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });
    const ioEmpty = captureStdIO();
    try {
      const code = await cmdTaskDocShow({ cwd: root, taskId, section: undefined, quiet: false });
      expect(code).toBe(0);
      expect(ioEmpty.stdout).toContain("task doc metadata missing");
    } finally {
      ioEmpty.restore();
      spyEmpty.mockRestore();
    }
  });

  it("task doc show prints section content and honors quiet", async () => {
    const root = await makeRepo();
    const taskId = "202602051630-DSH3";
    await addTask(root, taskId);
    await cmdTaskDocSet({
      cwd: root,
      taskId,
      section: "Summary",
      text: "Hello docs",
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskDocShow({ cwd: root, taskId, section: "Summary", quiet: false });
      expect(code).toBe(0);
      expect(io.stdout).toContain("Hello docs");
    } finally {
      io.restore();
    }

    const ioQuiet = captureStdIO();
    try {
      const code = await cmdTaskDocShow({
        cwd: root,
        taskId,
        section: "Scope",
        quiet: true,
      });
      expect(code).toBe(0);
      expect(ioQuiet.stdout).toContain("- In scope:");
    } finally {
      ioQuiet.restore();
    }
  });
});
