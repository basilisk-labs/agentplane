import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

const execFileAsync = promisify(execFile);

type Capture = {
  stdout: string;
  stderr: string;
  restore: () => void;
};

function captureStdIO(): Capture {
  const stdoutChunks: string[] = [];
  const stderrChunks: string[] = [];
  const stdoutWrite = process.stdout.write.bind(process.stdout);
  const stderrWrite = process.stderr.write.bind(process.stderr);

  function capture(chunks: string[]): typeof process.stdout.write {
    return ((chunk: unknown, _encoding?: unknown, _cb?: unknown) => {
      chunks.push(typeof chunk === "string" ? chunk : String(chunk));
      return true;
    }) as typeof process.stdout.write;
  }

  process.stdout.write = capture(stdoutChunks);
  process.stderr.write = capture(stderrChunks);

  return {
    stdout: "",
    stderr: "",
    restore() {
      process.stdout.write = stdoutWrite;
      process.stderr.write = stderrWrite;
      this.stdout = stdoutChunks.join("");
      this.stderr = stderrChunks.join("");
    },
  };
}

async function runCliWithOutput(root: string, args: string[]) {
  const io = captureStdIO();
  let code = 1;
  try {
    code = await runCli(["--root", root, ...args]);
  } finally {
    io.restore();
  }
  return { code, stdout: io.stdout, stderr: io.stderr };
}

async function initGitRepo(root: string): Promise<void> {
  await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "ci@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "CI"], { cwd: root });
  await writeFile(path.join(root, "README.md"), "smoke\n", "utf8");
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "init"], { cwd: root });
}

async function makeRecipeArchive(): Promise<{ archivePath: string; cleanup: () => Promise<void> }> {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-recipe-"));
  const recipeRoot = path.join(tempRoot, "viewer");
  await mkdir(recipeRoot, { recursive: true });
  const manifest = {
    schema_version: "1",
    id: "viewer",
    version: "0.0.0",
    name: "Viewer",
    summary: "Local viewer recipe for smoke tests.",
    description: "Minimal recipe archive used by smoke tests.",
  };
  await writeFile(
    path.join(recipeRoot, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8",
  );
  const archivePath = path.join(tempRoot, "viewer-0.0.0.tar.gz");
  await execFileAsync("tar", ["-czf", archivePath, "-C", recipeRoot, "."]);
  return {
    archivePath,
    cleanup: async () => {
      await rm(tempRoot, { recursive: true, force: true });
    },
  };
}

describe("agentplane CLI smoke", () => {
  it("runs init, task, finish, recipe, and work start flow", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-smoke-"));
    try {
      await initGitRepo(root);

      const init = await runCliWithOutput(root, [
        "init",
        "--yes",
        "--ide",
        "codex",
        "--workflow",
        "direct",
        "--hooks",
        "no",
      ]);
      expect(init.code).toBe(0);

      const taskNew = await runCliWithOutput(root, [
        "task",
        "new",
        "--title",
        "Smoke task",
        "--description",
        "Smoke test task",
        "--owner",
        "ORCHESTRATOR",
        "--tag",
        "smoke",
      ]);
      expect(taskNew.code).toBe(0);
      const taskId = taskNew.stdout.trim();
      expect(taskId).toMatch(/^\d{12}-/);

      const start = await runCliWithOutput(root, [
        "start",
        taskId,
        "--author",
        "ORCHESTRATOR",
        "--body",
        "Start: smoke start comment with enough length for validation.",
      ]);
      expect(start.code).toBe(0);

      await writeFile(path.join(root, "note.txt"), "smoke\n", "utf8");
      await execFileAsync("git", ["add", "."], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "smoke change"], { cwd: root });

      const finish = await runCliWithOutput(root, [
        "finish",
        taskId,
        "--author",
        "ORCHESTRATOR",
        "--body",
        "Verified: smoke finish comment with enough detail to pass minimum length checks.",
      ]);
      expect(finish.code).toBe(0);

      const recipe = await makeRecipeArchive();
      try {
        const install = await runCliWithOutput(root, ["recipe", "install", recipe.archivePath]);
        expect(install.code).toBe(0);
      } finally {
        await recipe.cleanup();
      }

      const list = await runCliWithOutput(root, ["recipe", "list"]);
      expect(list.code).toBe(0);
      expect(list.stdout).toContain("viewer@0.0.0");

      const mode = await runCliWithOutput(root, ["mode", "set", "branch_pr"]);
      expect(mode.code).toBe(0);

      const base = await runCliWithOutput(root, ["branch", "base", "set", "main"]);
      expect(base.code).toBe(0);

      const work = await runCliWithOutput(root, [
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "smoke",
        "--worktree",
      ]);
      expect(work.code).toBe(0);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }, 15_000);
});
