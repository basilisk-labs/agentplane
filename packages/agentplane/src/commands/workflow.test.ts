import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  cmdTaskAdd,
  cmdTaskExport,
  cmdTaskLint,
  cmdTaskListWithFilters,
  cmdTaskNext,
  cmdTaskSearch,
  cmdTaskPlanSet,
  cmdTaskPlanApprove,
  cmdTaskUpdate,
  cmdBlock,
  cmdFinish,
  cmdGuardClean,
  cmdGuardSuggestAllow,
  cmdStart,
  cmdReady,
  dedupeStrings,
  ensureInitCommit,
  promptInitBaseBranch,
  suggestAllowPrefixes,
} from "./workflow.js";
import { defaultConfig } from "@agentplaneorg/core";
import * as taskBackend from "../backends/task-backend.js";
import * as prompts from "../cli/prompts.js";
import { parseCommandArgv } from "../cli/spec/parse.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  silenceStdIO,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { taskNewSpec } from "./task/new.command.js";
import { runTaskNewParsed } from "./task/new.js";
import { loadCommandContext } from "./shared/task-backend.js";
import { cmdVerifyParsed } from "./task/verify-record.js";

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

  it("task new spec rejects missing required options", () => {
    expect(() => parseCommandArgv(taskNewSpec, [])).toThrow();
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

  it("task new writes tasks without requiring verify commands", async () => {
    const root = await makeRepo();
    const io = captureStdIO();
    try {
      const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
      const code = await runTaskNewParsed({
        ctx,
        cwd: root,
        rootOverride: undefined,
        parsed: {
          title: "Title",
          description: "Desc",
          owner: "CODER",
          priority: "med",
          tags: ["backend"],
          dependsOn: [],
          verify: [],
        },
      });
      expect(code).toBe(0);
      expect(io.stdout.trim()).toMatch(/^\d{12}-[A-Z0-9]{4,}$/);
    } finally {
      io.restore();
    }

    const backend = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const tasks = await backend.backend.listTasks();
    expect(tasks.length).toBe(1);
    const created = tasks[0];
    if (!created) throw new Error("expected created task");
    const readmePath = path.join(root, ".agentplane", "tasks", created.id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("## Verify Steps");
    expect(readme).toContain("<!-- BEGIN VERIFICATION RESULTS -->");
  });

  it("task new rejects empty required fields after trimming", async () => {
    const root = await makeRepo();
    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    await expect(
      runTaskNewParsed({
        ctx,
        cwd: root,
        parsed: {
          title: "   ",
          description: "Desc",
          owner: "CODER",
          priority: "med",
          tags: ["backend"],
          dependsOn: [],
          verify: [],
        },
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runTaskNewParsed({
        ctx,
        cwd: root,
        parsed: {
          title: "Title",
          description: "  ",
          owner: "CODER",
          priority: "med",
          tags: ["backend"],
          dependsOn: [],
          verify: [],
        },
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });

    await expect(
      runTaskNewParsed({
        ctx,
        cwd: root,
        parsed: {
          title: "Title",
          description: "Desc",
          owner: "   ",
          priority: "med",
          tags: ["backend"],
          dependsOn: [],
          verify: [],
        },
      }),
    ).rejects.toMatchObject({ code: "E_USAGE" });
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
      (async () => {
        const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
        return await runTaskNewParsed({
          ctx,
          cwd: root,
          rootOverride: undefined,
          parsed: {
            title: "Title",
            description: "Desc",
            owner: "CODER",
            priority: "med",
            tags: ["docs"],
            dependsOn: [],
            verify: [],
          },
        });
      })(),
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

  it("task update blocks primary-tag changes unless explicitly allowed", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-P1R1";
    await cmdTaskAdd({
      cwd: root,
      taskIds: [taskId],
      title: "Primary lock",
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

    await expect(
      cmdTaskUpdate({
        cwd: root,
        taskId,
        title: undefined,
        description: undefined,
        priority: undefined,
        owner: undefined,
        tags: ["code"],
        replaceTags: true,
        dependsOn: [],
        replaceDependsOn: false,
        verify: [],
        replaceVerify: false,
      }),
    ).rejects.toThrow("Primary tag change is locked");

    const io = captureStdIO();
    try {
      const code = await cmdTaskUpdate({
        cwd: root,
        taskId,
        title: undefined,
        description: undefined,
        priority: undefined,
        owner: undefined,
        tags: ["code"],
        replaceTags: true,
        dependsOn: [],
        replaceDependsOn: false,
        verify: [],
        replaceVerify: false,
        allowPrimaryChange: true,
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

    await cmdTaskPlanSet({ cwd: root, taskId, text: "Plan content." });
    await cmdTaskPlanApprove({ cwd: root, taskId, by: "USER" });

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
    const verifyCtx = await loadCommandContext({ cwd: root, rootOverride: null });
    await cmdVerifyParsed({
      ctx: verifyCtx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "TESTER",
      note: "Looks good",
      quiet: true,
    });
    const codeFinish = await cmdFinish({
      cwd: root,
      taskIds: [taskId],
      author: "CODER",
      body: "Verified: ".padEnd(70, "D"),
      result: "finish: mark task done",
      risk: undefined,
      breaking: false,
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
        result: "finish: mark task done",
        risk: undefined,
        breaking: false,
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
});
