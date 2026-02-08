import { execFile } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  cmdTaskAdd,
  cmdTaskDocSet,
  cmdTaskDocShow,
  cmdTaskExport,
  cmdTaskLint,
  cmdTaskListWithFilters,
  cmdTaskMigrate,
  cmdTaskNew,
  cmdTaskNext,
  cmdTaskSearch,
  cmdTaskPlan,
  cmdTaskUpdate,
  cmdBlock,
  cmdFinish,
  cmdGuardClean,
  cmdGuardSuggestAllow,
  cmdHooksInstall,
  cmdHooksRun,
  cmdHooksUninstall,
  cmdStart,
  cmdVerify,
  cmdTaskVerify,
  cmdReady,
  cmdTaskNormalize,
  cmdTaskScaffold,
  cmdTaskScrub,
  dedupeStrings,
  ensureInitCommit,
  promptInitBaseBranch,
  suggestAllowPrefixes,
} from "./workflow.js";
import { defaultConfig } from "@agentplaneorg/core";
import * as taskBackend from "../backends/task-backend.js";
import type { TaskData } from "../backends/task-backend.js";
import * as prompts from "../cli/prompts.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  silenceStdIO,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";

const execFileAsync = promisify(execFile);

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

async function gitCommitFile(root: string, file: string, message: string): Promise<void> {
  const target = path.join(root, file);
  await writeFile(target, "content", "utf8");
  await execFileAsync("git", ["add", "--", file], { cwd: root });
  await execFileAsync("git", ["commit", "-m", message], { cwd: root });
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

  it("rejects task new with missing flags", async () => {
    await expect(
      cmdTaskNew({
        cwd: process.cwd(),
        args: [],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("dedupes and trims strings", () => {
    expect(dedupeStrings([" a ", "b", "a", " ", "b "])).toEqual(["a", "b"]);
  });

  it("suggests allow prefixes for paths", () => {
    expect(suggestAllowPrefixes(["file.txt", "dir/file.txt", "/abs/path.txt", ""])).toEqual([
      "/abs",
      "dir",
      "file.txt",
    ]);
  });

  it("task list reports deps, tags, and verify counts", async () => {
    const root = await makeRepo();
    await addTask(root, "202602051630-A1B2");
    await cmdTaskAdd({
      cwd: root,
      taskIds: ["202602051630-A1B3"],
      title: "Needs deps",
      description: "Desc",
      status: "TODO",
      priority: "high",
      owner: "CODER",
      tags: ["urgent"],
      dependsOn: ["202602051630-A1B2", "202602051630-A1B4"],
      verify: ["echo ok"],
      commentAuthor: null,
      commentBody: null,
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskListWithFilters({
        cwd: root,
        filters: { status: [], owner: [], tag: [], quiet: false },
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("deps=missing:202602051630-A1B4,wait:202602051630-A1B2");
      expect(io.stdout).toContain("tags=urgent");
      expect(io.stdout).toContain("verify=1");
      expect(io.stdout).toContain("owner=CODER");
      expect(io.stdout).toContain("prio=high");
    } finally {
      io.restore();
    }
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
      const code = await cmdTaskPlan({
        cwd: root,
        args: ["set", taskId, "--text", "Do X then Y.", "--updated-by", "ORCHESTRATOR"],
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

  it("task plan approve rejects when plan is empty", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A2";
    await addTask(root, taskId);

    await expect(
      cmdTaskPlan({ cwd: root, args: ["approve", taskId, "--by", "USER"] }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
    });
  });

  it("task plan approve and reject update plan_approval state", async () => {
    const root = await makeRepo();
    const taskId = "202602060840-P1A3";
    await addTask(root, taskId);

    await cmdTaskPlan({
      cwd: root,
      args: ["set", taskId, "--text", "Plan content."],
    });
    await cmdTaskPlan({
      cwd: root,
      args: ["approve", taskId, "--by", "USER", "--note", "OK"],
    });

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const approved = await readFile(readmePath, "utf8");
    expect(approved).toContain('state: "approved"');
    expect(approved).toContain('updated_by: "USER"');

    await expect(
      cmdTaskPlan({ cwd: root, args: ["reject", taskId, "--by", "USER"] }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await cmdTaskPlan({
      cwd: root,
      args: ["reject", taskId, "--by", "USER", "--note", "Nope"],
    });

    const rejected = await readFile(readmePath, "utf8");
    expect(rejected).toContain('state: "rejected"');
    expect(rejected).toContain('note: "Nope"');
  });

  it("task new writes tasks without requiring verify commands", async () => {
    const root = await makeRepo();
    const io = captureStdIO();
    try {
      const code = await cmdTaskNew({
        cwd: root,
        args: ["--title", "Title", "--description", "Desc", "--owner", "CODER", "--tag", "backend"],
      });
      expect(code).toBe(0);
      expect(io.stdout.trim()).toMatch(/^\d{12}-[A-Z0-9]{4,}$/);
    } finally {
      io.restore();
    }

    const backend = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const tasks = await backend.backend.listTasks();
    expect(tasks.length).toBe(1);
  });

  it("task new rejects backends without generateTaskId", async () => {
    const root = await makeRepo();
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend: baseTaskBackend({
        writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
        listTasks: vi.fn().mockResolvedValue([]),
      }),
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });
    await expect(
      cmdTaskNew({
        cwd: root,
        args: ["--title", "Title", "--description", "Desc", "--owner", "CODER", "--tag", "docs"],
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
    spy.mockRestore();
  });

  it("task add rejects duplicates", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-X1Y2";
    await addTask(root, taskId);

    {
      const io = captureStdIO();
      try {
        const code = await cmdTaskAdd({
          cwd: root,
          taskIds: ["202602050900-X1Y3"],
          title: "Task",
          description: "Desc",
          status: "TODO",
          priority: "med",
          owner: "CODER",
          tags: ["backend"],
          dependsOn: [],
          verify: [],
          commentAuthor: null,
          commentBody: null,
        });
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    await expect(
      cmdTaskAdd({
        cwd: root,
        taskIds: [taskId],
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        tags: ["docs"],
        dependsOn: [],
        verify: [],
        commentAuthor: null,
        commentBody: null,
      }),
    ).rejects.toMatchObject({ code: "E_IO" });
  });

  it("task add writes tasks via writeTask when writeTasks is missing", async () => {
    const root = await makeRepo();
    const writeTask = vi.fn();
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend: baseTaskBackend({
        listTasks: vi.fn().mockResolvedValue([]),
        writeTask: writeTask.mockImplementation(() => Promise.resolve()),
      }),
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskAdd({
        cwd: root,
        taskIds: ["202602050900-Z1Z2"],
        title: "Task",
        description: "Desc",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        tags: ["docs"],
        dependsOn: [],
        verify: [],
        commentAuthor: "CODER",
        commentBody: "Hello",
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
    expect(writeTask).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("task update replaces tags/depends/verify", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-Q1R2";
    await addTask(root, taskId);

    {
      const io = captureStdIO();
      try {
        const code = await cmdTaskUpdate({
          cwd: root,
          taskId,
          title: undefined,
          description: undefined,
          priority: undefined,
          owner: undefined,
          tags: ["backend"],
          replaceTags: true,
          dependsOn: [],
          replaceDependsOn: false,
          verify: [],
          replaceVerify: false,
        });
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await cmdTaskUpdate({
        cwd: root,
        taskId,
        title: undefined,
        description: undefined,
        priority: undefined,
        owner: undefined,
        tags: ["backend"],
        replaceTags: true,
        dependsOn: ["202602050900-Q1R3"],
        replaceDependsOn: true,
        verify: ["bun run test"],
        replaceVerify: true,
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task list and next apply filters and limits", async () => {
    const root = await makeRepo();
    await cmdTaskAdd({
      cwd: root,
      taskIds: ["202602050900-T1V2"],
      title: "Alpha",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      tags: ["docs"],
      dependsOn: [],
      verify: [],
      commentAuthor: null,
      commentBody: null,
    });
    await cmdTaskAdd({
      cwd: root,
      taskIds: ["202602050900-W3X4"],
      title: "Beta",
      description: "Desc",
      status: "DOING",
      priority: "med",
      owner: "DOCS",
      tags: ["backend"],
      dependsOn: [],
      verify: ["bun run test"],
      commentAuthor: null,
      commentBody: null,
    });

    const ioList = captureStdIO();
    try {
      const code = await cmdTaskListWithFilters({
        cwd: root,
        filters: { status: [], owner: ["CODER"], tag: ["docs"], quiet: true },
      });
      expect(code).toBe(0);
      expect(ioList.stdout).toContain("202602050900-T1V2");
      expect(ioList.stdout).not.toContain("202602050900-W3X4");
    } finally {
      ioList.restore();
    }

    const ioNext = captureStdIO();
    try {
      const code = await cmdTaskNext({
        cwd: root,
        filters: { status: ["TODO"], owner: [], tag: [], limit: 1, quiet: false },
      });
      expect(code).toBe(0);
      expect(ioNext.stdout).toContain("Ready:");
    } finally {
      ioNext.restore();
    }
  });

  it("ready reports missing and unknown tasks", async () => {
    const root = await makeRepo();
    await cmdTaskAdd({
      cwd: root,
      taskIds: ["202602050900-DEP1"],
      title: "Alpha",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      tags: ["docs"],
      dependsOn: ["202602050900-DEP2"],
      verify: [],
      commentAuthor: null,
      commentBody: null,
    });

    const ioMissing = captureStdIO();
    try {
      const code = await cmdReady({ cwd: root, taskId: "202602050900-DEP1" });
      expect(code).toBe(2);
      expect(ioMissing.stdout).toContain("missing deps");
    } finally {
      ioMissing.restore();
    }

    const ioUnknown = captureStdIO();
    try {
      const code = await cmdReady({ cwd: root, taskId: "202602050900-UNKNOWN" });
      expect(code).toBe(2);
      expect(ioUnknown.stdout).toContain("Unknown task id");
    } finally {
      ioUnknown.restore();
    }
  });

  it("task search rejects empty query and matches content", async () => {
    const root = await makeRepo();
    await cmdTaskAdd({
      cwd: root,
      taskIds: ["202602050900-S1R2"],
      title: "Searchable",
      description: "Alpha",
      status: "TODO",
      priority: "med",
      owner: "CODER",
      tags: ["docs"],
      dependsOn: [],
      verify: [],
      commentAuthor: "CODER",
      commentBody: "needle",
    });

    await expect(
      cmdTaskSearch({
        cwd: root,
        query: "   ",
        regex: false,
        filters: { status: [], owner: [], tag: [], quiet: true },
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskSearch({
        cwd: root,
        query: "needle",
        regex: false,
        filters: { status: [], owner: [], tag: [], quiet: true },
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("202602050900-S1R2");
    } finally {
      io.restore();
    }
  });

  it("task export writes tasks.json and task lint validates", async () => {
    const root = await makeRepo();
    await addTask(root, "202602050900-A1B2");

    const ioExport = captureStdIO();
    try {
      const code = await cmdTaskExport({ cwd: root });
      expect(code).toBe(0);
      expect(ioExport.stdout.trim()).toBe(".agentplane/tasks.json");
    } finally {
      ioExport.restore();
    }

    const ioLint = captureStdIO();
    try {
      const code = await cmdTaskLint({ cwd: root });
      expect(code).toBe(0);
      expect(ioLint.stdout).toContain("OK");
    } finally {
      ioLint.restore();
    }
  });

  it("task lint rejects invalid tasks.json payloads", async () => {
    const root = await makeRepo();
    const tasksPath = path.join(root, ".agentplane", "tasks.json");
    await writeFile(
      tasksPath,
      JSON.stringify(
        {
          schema_version: 1,
          updated_at: "2026-02-05T00:00:00Z",
          tasks: [
            { id: "202602050900-A1B2", title: "A" },
            { id: "202602050900-A1B2", title: "B" },
          ],
        },
        null,
        2,
      ),
      "utf8",
    );

    await expect(cmdTaskLint({ cwd: root })).rejects.toMatchObject({ code: "E_VALIDATION" });
  });

  it("guard clean and suggest-allow handle staged files", async () => {
    const root = await makeRepo();
    await writeFile(path.join(root, "file.txt"), "hello", "utf8");
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    await expect(cmdGuardClean({ cwd: root, quiet: true })).rejects.toMatchObject({
      code: "E_GIT",
    });

    const ioArgs = captureStdIO();
    try {
      const code = await cmdGuardSuggestAllow({ cwd: root, format: "args" });
      expect(code).toBe(0);
      expect(ioArgs.stdout).toContain("--allow file.txt");
    } finally {
      ioArgs.restore();
    }

    const ioLines = captureStdIO();
    try {
      const code = await cmdGuardSuggestAllow({ cwd: root, format: "lines" });
      expect(code).toBe(0);
      expect(ioLines.stdout).toContain("file.txt");
    } finally {
      ioLines.restore();
    }
  });

  it("guard suggest-allow rejects when index is empty", async () => {
    const root = await makeRepo();
    await expect(cmdGuardSuggestAllow({ cwd: root, format: "lines" })).rejects.toMatchObject({
      code: "E_IO",
    });
  });

  it("prompt init base branch creates new branch when repo has no branches", async () => {
    const root = await mkGitRepoRoot();
    const input = vi.spyOn(prompts, "promptInput").mockResolvedValue("");
    const branch = await promptInitBaseBranch({ gitRoot: root, fallback: "main" });
    expect(branch).toBe("main");
    const { stdout } = await execFileAsync("git", ["symbolic-ref", "--short", "HEAD"], {
      cwd: root,
    });
    expect(stdout.trim()).toBe("main");
    input.mockRestore();
  });

  it("prompt init base branch uses choice and creates a new branch", async () => {
    const root = await mkGitRepoRoot();
    await gitCommitFile(root, "seed.txt", "chore: seed");
    const choice = vi.spyOn(prompts, "promptChoice").mockResolvedValue("Create new branch");
    const input = vi.spyOn(prompts, "promptInput").mockResolvedValue("feature");
    const branch = await promptInitBaseBranch({ gitRoot: root, fallback: "main" });
    expect(branch).toBe("feature");
    const { stdout } = await execFileAsync("git", ["branch", "--list", "feature"], { cwd: root });
    expect(stdout.trim()).toContain("feature");
    choice.mockRestore();
    input.mockRestore();
  });

  it("ensure init commit rejects staged changes and commits when needed", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "staged.txt"), "data", "utf8");
    await execFileAsync("git", ["add", "--", "staged.txt"], { cwd: root });
    await expect(
      ensureInitCommit({
        gitRoot: root,
        baseBranch: "main",
        installPaths: ["staged.txt"],
        version: "0.1.0",
        skipHooks: true,
      }),
    ).rejects.toMatchObject({ code: "E_GIT" });

    await execFileAsync("git", ["reset", "-q"], { cwd: root });
    await writeFile(path.join(root, "install.txt"), "data", "utf8");
    await ensureInitCommit({
      gitRoot: root,
      baseBranch: "main",
      installPaths: ["install.txt"],
      version: "0.1.0",
      skipHooks: true,
    });
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("chore: install agentplane 0.1.0");
  });

  it("start/block/finish validate transitions and comments", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-A9B8";
    await addTask(root, taskId);

    await cmdTaskPlan({ cwd: root, args: ["set", taskId, "--text", "Plan content."] });
    await cmdTaskPlan({ cwd: root, args: ["approve", taskId, "--by", "USER"] });

    await expect(
      cmdStart({
        cwd: root,
        taskId,
        author: "CODER",
        body: "Start: short",
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        confirmStatusCommit: false,
        force: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await cmdTaskUpdate({
      cwd: root,
      taskId,
      title: undefined,
      description: undefined,
      priority: undefined,
      owner: undefined,
      tags: [],
      replaceTags: false,
      dependsOn: ["202602050900-Z9Y8"],
      replaceDependsOn: false,
      verify: [],
      replaceVerify: false,
    });

    await expect(
      cmdStart({
        cwd: root,
        taskId,
        author: "CODER",
        body: "Start: ".padEnd(50, "A"),
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        confirmStatusCommit: false,
        force: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    const codeStart = await cmdStart({
      cwd: root,
      taskId,
      author: "CODER",
      body: "Start: ".padEnd(50, "B"),
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: true,
      quiet: true,
    });
    expect(codeStart).toBe(0);

    const backend = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const started = await backend.backend.getTask(taskId);
    expect(started?.status).toBe("DOING");

    const codeBlock = await cmdBlock({
      cwd: root,
      taskId,
      author: "CODER",
      body: "Blocked: ".padEnd(60, "C"),
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      confirmStatusCommit: false,
      force: false,
      quiet: true,
    });
    expect(codeBlock).toBe(0);

    await addTask(root, "202602050900-Z9Y8");
    await gitCommitFile(root, "done.txt", "chore: done");
    await cmdVerify({
      cwd: root,
      taskId,
      args: ["--ok", "--by", "TESTER", "--note", "Looks good", "--quiet"],
    });
    const codeFinish = await cmdFinish({
      cwd: root,
      taskIds: [taskId],
      author: "CODER",
      body: "Verified: ".padEnd(70, "D"),
      commit: undefined,
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    expect(codeFinish).toBe(0);

    const finished = await backend.backend.getTask(taskId);
    expect(finished?.status).toBe("DONE");

    await expect(
      cmdFinish({
        cwd: root,
        taskIds: [taskId],
        author: "CODER",
        body: "Verified: ".padEnd(70, "D"),
        commit: undefined,
        force: false,
        commitFromComment: false,
        commitAllow: [],
        commitAutoAllow: false,
        commitAllowTasks: false,
        commitRequireClean: false,
        statusCommit: false,
        statusCommitAllow: [],
        statusCommitAutoAllow: false,
        statusCommitRequireClean: false,
        confirmStatusCommit: false,
        quiet: true,
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("verify requires --ok|--rework and --by/--note", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F2";
    await addTask(root, taskId);

    await expect(cmdVerify({ cwd: root, taskId, args: [] })).rejects.toMatchObject({
      code: "E_USAGE",
    });
    await expect(
      cmdVerify({ cwd: root, taskId, args: ["--ok", "--by", "REVIEWER", "--note"] }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdVerify({
        cwd: root,
        taskId,
        args: ["--ok", "--rework", "--by", "REVIEWER", "--note", "x"],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
    await expect(
      cmdVerify({ cwd: root, taskId, args: ["--ok", "--by", "REVIEWER"] }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("verify appends a result entry and updates task.verification state", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4B";
    await addTask(root, taskId);

    const code = await cmdVerify({
      cwd: root,
      taskId,
      args: ["--ok", "--by", "REVIEWER", "--note", "Looks good", "--quiet"],
    });
    expect(code).toBe(0);

    const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.verification?.state).toBe("ok");
    expect(task?.verification?.updated_by).toBe("REVIEWER");
    expect(task?.verification?.note).toBe("Looks good");

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
    expect(readme).toContain("VERIFY — ok");
    expect(readme).toContain("By: REVIEWER");
    expect(readme).toContain("Note: Looks good");
  });

  it("verify supports --file details and rejects --details with --file", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4C";
    await addTask(root, taskId);

    const detailsPath = path.join(root, "verify-details.txt");
    await writeFile(detailsPath, "detail-line\n", "utf8");

    const code = await cmdVerify({
      cwd: root,
      taskId,
      args: ["--ok", "--by", "REVIEWER", "--note", "Ok", "--file", detailsPath, "--quiet"],
    });
    expect(code).toBe(0);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("detail-line");

    await expect(
      cmdVerify({
        cwd: root,
        taskId,
        args: [
          "--ok",
          "--by",
          "REVIEWER",
          "--note",
          "Ok",
          "--details",
          "inline",
          "--file",
          detailsPath,
          "--quiet",
        ],
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
  });

  it("task verify rework resets commit and sets status to DOING", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F5";
    await addTask(root, taskId);
    await gitCommitFile(root, "seed.txt", "chore: seed");
    await cmdVerify({
      cwd: root,
      taskId,
      args: ["--ok", "--by", "TESTER", "--note", "Ok to finish", "--quiet"],
    });

    const codeFinish = await cmdFinish({
      cwd: root,
      taskIds: [taskId],
      author: "CODER",
      body: "Verified: ".padEnd(70, "D"),
      commit: undefined,
      force: false,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: false,
      commitRequireClean: false,
      statusCommit: false,
      statusCommitAllow: [],
      statusCommitAutoAllow: false,
      statusCommitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
    expect(codeFinish).toBe(0);

    const code = await cmdTaskVerify({
      cwd: root,
      args: ["rework", taskId, "--by", "REVIEWER", "--note", "Needs changes", "--quiet"],
    });
    expect(code).toBe(0);

    const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.status).toBe("DOING");
    expect(task?.commit ?? null).toBeNull();
    expect(task?.verification?.state).toBe("needs_rework");
  });

  it("hooks install/uninstall and run validate commit-msg and pre-commit", async () => {
    const root = await makeRepo();

    const ioInstall = captureStdIO();
    try {
      const code = await cmdHooksInstall({ cwd: root, quiet: false });
      expect(code).toBe(0);
      expect(ioInstall.stdout).toContain(".git/hooks");
    } finally {
      ioInstall.restore();
    }

    const ioUninstall = captureStdIO();
    try {
      const code = await cmdHooksUninstall({ cwd: root, quiet: false });
      expect(code).toBe(0);
      expect(ioUninstall.stdout).toContain("removed hooks");
    } finally {
      ioUninstall.restore();
    }

    const ioUninstallAgain = captureStdIO();
    try {
      const code = await cmdHooksUninstall({ cwd: root, quiet: false });
      expect(code).toBe(0);
      expect(ioUninstallAgain.stdout).toContain("no agentplane hooks found");
    } finally {
      ioUninstallAgain.restore();
    }

    const messagePath = path.join(root, "COMMIT_MSG");
    await writeFile(messagePath, "✨ A1B2 hooks: update policy\n\nBody\n", "utf8");
    const prevTaskId = process.env.AGENTPLANE_TASK_ID;
    process.env.AGENTPLANE_TASK_ID = "202602050900-A1B2";
    try {
      const code = await cmdHooksRun({
        cwd: root,
        hook: "commit-msg",
        args: [messagePath],
      });
      expect(code).toBe(0);
    } finally {
      if (prevTaskId === undefined) {
        delete process.env.AGENTPLANE_TASK_ID;
      } else {
        process.env.AGENTPLANE_TASK_ID = prevTaskId;
      }
    }

    await expect(cmdHooksRun({ cwd: root, hook: "commit-msg", args: [] })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await cmdTaskExport({ cwd: root });
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });
    const prevAllowTasks = process.env.AGENTPLANE_ALLOW_TASKS;
    delete process.env.AGENTPLANE_ALLOW_TASKS;
    try {
      await expect(cmdHooksRun({ cwd: root, hook: "pre-commit", args: [] })).rejects.toMatchObject({
        code: "E_GIT",
      });
    } finally {
      if (prevAllowTasks === undefined) {
        delete process.env.AGENTPLANE_ALLOW_TASKS;
      } else {
        process.env.AGENTPLANE_ALLOW_TASKS = prevAllowTasks;
      }
    }
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
      expect(ioQuiet.stdout.trim()).toBe("");
    } finally {
      ioQuiet.restore();
    }
  });

  it("task scrub validates args and supports dry-run output", async () => {
    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-1",
        title: "hello",
        description: "foo",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["foo"],
        verify: [],
        comments: [{ author: "A", body: "foo" }],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
      {
        id: "TASK-2",
        title: "other",
        description: "bar",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["bar"],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScrub({
        cwd: root,
        find: "foo",
        replace: "baz",
        dryRun: true,
        quiet: false,
      });
      expect(code).toBe(0);
      expect(io.stdout).toContain("dry-run: would update 1 task(s)");
      expect(io.stdout).toContain("TASK-1");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task scrub writes updates and respects quiet mode", async () => {
    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-3",
        title: "foo",
        description: "foo",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["foo"],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScrub({
        cwd: root,
        find: "foo",
        replace: "bar",
        dryRun: false,
        quiet: true,
      });
      expect(code).toBe(0);
      expect(writeTasks).toHaveBeenCalledOnce();
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task normalize handles writeTask and rejects unknown flags", async () => {
    await expect(cmdTaskNormalize({ cwd: process.cwd(), args: ["--nope"] })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    const root = await makeRepo();
    const tasks: TaskData[] = [
      {
        id: "TASK-4",
        title: "one",
        description: "one",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "CODER",
      },
    ];
    const writeTask = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue(tasks),
      writeTask: writeTask.mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });
    const io = captureStdIO();
    try {
      const code = await cmdTaskNormalize({ cwd: root, args: ["--quiet"] });
      expect(code).toBe(0);
      expect(writeTask).toHaveBeenCalledTimes(1);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task migrate validates flags and JSON payloads", async () => {
    const root = await makeRepo();
    const tasksPath = path.join(root, "tasks.json");
    await writeFile(tasksPath, "{not-json", "utf8");

    await expect(cmdTaskMigrate({ cwd: root, args: ["--source"] })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await expect(cmdTaskMigrate({ cwd: root, args: ["--nope"] })).rejects.toMatchObject({
      code: "E_USAGE",
    });

    await expect(
      cmdTaskMigrate({ cwd: root, args: ["--source", "tasks.json"] }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });

    const writeTasks = vi.fn();
    const backend = baseTaskBackend({
      listTasks: vi.fn().mockResolvedValue([]),
      writeTasks,
      writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved: { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") },
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    await writeFile(
      tasksPath,
      JSON.stringify({ tasks: [{ id: "TASK-5", title: "ok" }] }, null, 2),
      "utf8",
    );
    const io = captureStdIO();
    try {
      const code = await cmdTaskMigrate({ cwd: root, args: ["--source", "tasks.json"] });
      expect(code).toBe(0);
      expect(writeTasks).toHaveBeenCalledOnce();
    } finally {
      io.restore();
      spy.mockRestore();
    }
  });

  it("task scaffold handles missing tasks, overwrites, and writes readmes", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-J1K2";
    const resolved = { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") };
    const backend = baseTaskBackend({ getTask: vi.fn().mockResolvedValue(null) });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    await expect(
      cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: false,
        force: false,
        quiet: false,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
    });

    const io = captureStdIO();
    try {
      const code = await cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: false,
        force: true,
        quiet: false,
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const text = await readFile(readmePath, "utf8");
    expect(text).toContain(`id: "${taskId}"`);

    const fileIo = captureStdIO();
    try {
      await expect(
        cmdTaskScaffold({
          cwd: root,
          taskId,
          overwrite: false,
          force: false,
          quiet: false,
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
      });
    } finally {
      fileIo.restore();
      spy.mockRestore();
    }
  });

  it("task scaffold overwrites existing files when requested", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-L3M4";
    const resolved = { gitRoot: root, agentplaneDir: path.join(root, ".agentplane") };
    const backend = baseTaskBackend({
      getTask: vi.fn().mockResolvedValue({
        id: taskId,
        title: "T",
        description: "",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: [],
        verify: [],
        comments: [],
        doc_version: 2,
        doc_updated_at: "2026-02-05T00:00:00Z",
        doc_updated_by: "agentplane",
      } satisfies TaskData),
    });
    const spy = vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
      backendId: "local",
      backend,
      resolved,
      config: defaultConfig(),
      backendConfigPath: path.join(root, ".agentplane", "backends", "local", "backend.json"),
    });

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, "old", "utf8");

    const io = captureStdIO();
    try {
      const code = await cmdTaskScaffold({
        cwd: root,
        taskId,
        overwrite: true,
        force: false,
        quiet: false,
      });
      expect(code).toBe(0);
    } finally {
      io.restore();
      spy.mockRestore();
    }

    const text = await readFile(readmePath, "utf8");
    expect(text).toContain(`id: "${taskId}"`);
  });
});
