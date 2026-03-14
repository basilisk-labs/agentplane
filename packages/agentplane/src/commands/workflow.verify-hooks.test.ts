import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  cmdTaskAdd,
  cmdTaskExport,
  cmdTaskVerifyOk,
  cmdTaskVerifyRework,
  cmdFinish,
  cmdHooksInstall,
  cmdHooksRun,
  cmdHooksUninstall,
} from "./workflow.js";
import * as taskBackend from "../backends/task-backend.js";
import { parseCommandArgv } from "../cli/spec/parse.js";
import {
  captureStdIO,
  mkGitRepoRoot,
  silenceStdIO,
  writeDefaultConfig,
} from "../cli/run-cli.test-helpers.js";
import { loadCommandContext } from "./shared/task-backend.js";
import { verifySpec } from "./verify.command.js";
import { cmdVerifyParsed } from "./task/verify-record.js";

const execFileAsync = promisify(execFile);
const VERIFY_REWORK_FULL_GATE_TIMEOUT_MS = 60_000;

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

  it("verify requires --ok|--rework and --by/--note", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F2";
    await addTask(root, taskId);

    expect(() => parseCommandArgv(verifySpec, [taskId])).toThrow();
    expect(() =>
      parseCommandArgv(verifySpec, [taskId, "--ok", "--by", "REVIEWER", "--note"]),
    ).toThrow();
    expect(() =>
      parseCommandArgv(verifySpec, [taskId, "--ok", "--rework", "--by", "REVIEWER", "--note", "x"]),
    ).toThrow();
    expect(() => parseCommandArgv(verifySpec, [taskId, "--ok", "--by", "REVIEWER"])).toThrow();
  });

  it("verify appends a result entry and updates task.verification state", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F4B";
    await addTask(root, taskId);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    const code = await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "REVIEWER",
      note: "Looks good",
      quiet: true,
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

    const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
    const code = await cmdVerifyParsed({
      ctx,
      cwd: root,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "REVIEWER",
      note: "Ok",
      file: detailsPath,
      quiet: true,
    });
    expect(code).toBe(0);

    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("detail-line");

    expect(() =>
      parseCommandArgv(verifySpec, [
        taskId,
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
      ]),
    ).toThrow();
  });

  it(
    "task verify rework resets commit and sets status to DOING",
    async () => {
      const root = await makeRepo();
      const taskId = "202602050900-V1F5";
      await addTask(root, taskId);
      await gitCommitFile(root, "seed.txt", "chore: seed");
      const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
      await cmdVerifyParsed({
        ctx,
        cwd: root,
        rootOverride: undefined,
        taskId,
        state: "ok",
        by: "TESTER",
        note: "Ok to finish",
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

      const code = await cmdTaskVerifyRework({
        cwd: root,
        taskId,
        by: "REVIEWER",
        note: "Needs changes",
        quiet: true,
      });
      expect(code).toBe(0);

      const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
      const task = await backend.getTask(taskId);
      expect(task?.status).toBe("DOING");
      expect(task?.commit ?? null).toBeNull();
      expect(task?.verification?.state).toBe("needs_rework");
    },
    VERIFY_REWORK_FULL_GATE_TIMEOUT_MS,
  );

  it("task verify ok records ok state without changing status or commit", async () => {
    const root = await makeRepo();
    const taskId = "202602050900-V1F6";
    await addTask(root, taskId);

    const code = await cmdTaskVerifyOk({
      cwd: root,
      taskId,
      by: "REVIEWER",
      note: "Ok to proceed",
      quiet: true,
    });
    expect(code).toBe(0);

    const { backend } = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
    const task = await backend.getTask(taskId);
    expect(task?.status).toBe("TODO");
    expect(task?.commit ?? null).toBeNull();
    expect(task?.verification?.state).toBe("ok");
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
});
