import { execFile } from "node:child_process";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";

import { LocalBackend, type TaskData } from "./task-backend.js";

const execFileAsync = promisify(execFile);

describe("LocalBackend SQLite gitignore repair", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    restoreStdIO?.();
    restoreStdIO = null;
    if (tempDir) await rm(tempDir, { recursive: true, force: true });
  });

  it("repairs stale runtime gitignore entries before writing repository SQLite cache", async () => {
    await execFileAsync("git", ["init", "-q"], { cwd: tempDir });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: tempDir });
    await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: tempDir });
    await writeFile(path.join(tempDir, ".gitignore"), ".agentplane/worktrees\n", "utf8");
    await writeFile(path.join(tempDir, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", ".gitignore", "seed.txt"], { cwd: tempDir });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: tempDir });

    const task: TaskData = {
      id: "202601300015-ABCD",
      title: "Old ignore cache",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["projection"],
      verify: [],
      doc: "## Summary\n\nSQLite body",
    };
    const backend = new LocalBackend({
      dir: path.join(tempDir, ".agentplane", "tasks"),
      updatedBy: "tester",
    });

    await backend.writeTask(task);
    await backend.listProjectionTasks();

    const gitignore = await readFile(path.join(tempDir, ".gitignore"), "utf8");
    expect(gitignore).toContain(".agentplane/cache.sqlite");
    expect(gitignore).toContain(".agentplane/cache.sqlite-wal");
    expect(gitignore).toContain(".agentplane/cache.sqlite-shm");

    const { stdout } = await execFileAsync("git", ["status", "--short", "--untracked-files=all"], {
      cwd: tempDir,
    });
    expect(stdout).not.toContain(".agentplane/cache.sqlite");
  });

  it("keeps projection reads working when gitignore repair fails", async () => {
    await execFileAsync("git", ["init", "-q"], { cwd: tempDir });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: tempDir });
    await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: tempDir });
    await mkdir(path.join(tempDir, ".gitignore"));
    await writeFile(path.join(tempDir, "seed.txt"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "seed.txt"], { cwd: tempDir });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: tempDir });

    const task: TaskData = {
      id: "202601300016-ABCD",
      title: "Repair failure fallback",
      description: "Desc",
      status: "TODO",
      priority: "med",
      owner: "tester",
      depends_on: [],
      tags: ["projection"],
      verify: [],
      doc: "## Summary\n\nSQLite body",
    };
    const backend = new LocalBackend({
      dir: path.join(tempDir, ".agentplane", "tasks"),
      updatedBy: "tester",
    });

    await backend.writeTask(task);
    const projection = await backend.listProjectionTasks();

    expect(projection.map((entry) => entry.id)).toEqual([task.id]);
    const sqliteStat = await stat(path.join(tempDir, ".agentplane", "cache.sqlite"));
    expect(sqliteStat.size).toBeGreaterThan(0);
  });
});
