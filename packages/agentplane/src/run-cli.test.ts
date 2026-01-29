import { execFile } from "node:child_process";
import { chmod, mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { defaultConfig, extractTaskSuffix, readTask } from "@agentplane/core";

import { runCli } from "./run-cli.js";

function captureStdIO() {
  let stdout = "";
  let stderr = "";

  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stdout.write as any) = (chunk: unknown) => {
    stdout += String(chunk);
    return true;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (process.stderr.write as any) = (chunk: unknown) => {
    stderr += String(chunk);
    return true;
  };

  return {
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
    restore() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    },
  };
}

async function mkGitRepoRoot(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  const execFileAsync = promisify(execFile);
  await mkdir(path.join(root, ".git"), { recursive: true });
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  return root;
}

async function writeDefaultConfig(root: string): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  const configPath = path.join(agentplaneDir, "config.json");
  await writeFile(configPath, JSON.stringify(defaultConfig(), null, 2), "utf8");
}

async function writeConfig(root: string, config: ReturnType<typeof defaultConfig>): Promise<void> {
  const agentplaneDir = path.join(root, ".agentplane");
  await mkdir(agentplaneDir, { recursive: true });
  const configPath = path.join(agentplaneDir, "config.json");
  await writeFile(configPath, JSON.stringify(config, null, 2), "utf8");
}

async function mkGitRepoRootWithBranch(branch: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
  const execFileAsync = promisify(execFile);
  await execFileAsync("git", ["init", "-q"], { cwd: root });
  await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
  return root;
}

async function configureGitUser(root: string): Promise<void> {
  const execFileAsync = promisify(execFile);
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "Test User"], { cwd: root });
}

function cleanGitEnv(): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GIT_DIR;
  delete env.GIT_WORK_TREE;
  delete env.GIT_COMMON_DIR;
  delete env.GIT_INDEX_FILE;
  delete env.GIT_OBJECT_DIRECTORY;
  delete env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  return env;
}

describe("runCli", () => {
  it("prints help on --help", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--help"]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Usage:");
    } finally {
      io.restore();
    }
  });

  it("prints version on --version", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--version"]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("0.0.0");
    } finally {
      io.restore();
    }
  });

  it("prints json error when --json is set", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["--json", "config", "set"]);
      expect(code).toBe(2);
      expect(io.stdout).toContain('"error"');
      expect(io.stdout).toContain('"code"');
    } finally {
      io.restore();
    }
  });

  it("returns usage error on unknown command", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Not implemented yet");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when --root is missing a value", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing value for --root");
    } finally {
      io.restore();
    }
  });

  it("returns usage error when config set is missing key/value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane config set");
    } finally {
      io.restore();
    }
  });

  it("maps resolveProject errors to E_GIT", async () => {
    const notGitRoot = await mkdtemp(path.join(os.tmpdir(), "agentplane-not-git-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", notGitRoot]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("maps invalid JSON config to E_VALIDATION", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "config.json"), "{\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Invalid JSON:");
    } finally {
      io.restore();
    }
  });

  it("maps IO errors while reading config to E_IO", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    const configPath = path.join(root, ".agentplane", "config.json");
    await writeFile(configPath, '{\n  "schema_version": 1\n}\n', "utf8");
    await chmod(configPath, 0o000);

    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toMatch(/EACCES|permission denied/i);
    } finally {
      io.restore();
      await chmod(configPath, 0o600);
    }
  });

  it("config show prints default config when missing", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "show", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain('"schema_version": 1');
    } finally {
      io.restore();
    }
  });

  it("config set writes .agentplane/config.json", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["config", "set", "workflow_mode", "direct", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "direct"');
  });

  it("task new creates a task README and prints the id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let id = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "sleep 1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      id = io.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain(`id: "${id}"`);
    expect(readme).toContain('status: "TODO"');
    expect(readme).toContain('title: "My task"');
  });

  it("task new supports depends-on and verify flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dependent task",
        "--description",
        "Has deps and verify",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--depends-on",
        "202601010101-ABCDEF",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.depends_on).toContain("202601010101-ABCDEF");
    expect(task.frontmatter.verify).toContain("bun run ci");
  });

  it("task show prints task frontmatter json", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "show", id, "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(`"id": "${id}"`);
      expect(io2.stdout).toContain('"status": "TODO"');
    } finally {
      io2.restore();
    }
  });

  it("task list prints tasks", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "list", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(id);
      expect(io2.stdout).toContain("[TODO]");
      expect(io2.stdout).toContain("My task");
    } finally {
      io2.restore();
    }
  });

  it("task list is empty when no tasks exist", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("task doc set updates a task README section and bumps metadata", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
      id = io1.stdout.trim();
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
        "Hello",
        "--updated-by",
        "DOCS",
        "--root",
        root,
      ]);
      expect(code2).toBe(0);
      expect(io2.stdout).toContain(path.join(root, ".agentplane", "tasks", id, "README.md"));
    } finally {
      io2.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const readme = await readFile(readmePath, "utf8");
    expect(readme).toContain("## Summary");
    expect(readme).toContain("Hello");
    expect(readme).toContain('doc_updated_by: "DOCS"');
  });

  it("task doc set validates usage and maps unknown doc sections", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["task", "doc", "set", "X", "--root", root]);
      expect(code1).toBe(2);
      expect(io1.stderr).toContain("Usage: agentplane task doc set");
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
      expect(io4.stderr).toContain("Usage: agentplane task doc set");
    } finally {
      io4.restore();
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
      expect(io1.stderr).toContain("Missing value for --updated-by");
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
      expect(io2.stderr).toContain("Unknown flag");
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
        "Notes",
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

  it("task export writes .agentplane/tasks.json", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
      id = io1.stdout.trim();
      expect(id).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "export", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe(".agentplane/tasks.json");
    } finally {
      io2.restore();
    }

    const outPath = path.join(root, ".agentplane", "tasks.json");
    const text = await readFile(outPath, "utf8");
    const parsed = JSON.parse(text) as { tasks: unknown[]; meta: { checksum: string } };
    expect(Array.isArray(parsed.tasks)).toBe(true);
    expect(typeof parsed.meta.checksum).toBe("string");
    expect(parsed.meta.checksum.length).toBeGreaterThan(0);
  });

  it("branch base get returns default when not pinned", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("main");
    } finally {
      io.restore();
    }
  });

  it("branch base get maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "get", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set writes git config and returns value", async () => {
    const root = await mkGitRepoRoot();
    const io1 = captureStdIO();
    try {
      const code1 = await runCli(["branch", "base", "set", "develop", "--root", root]);
      expect(code1).toBe(0);
      expect(io1.stdout.trim()).toBe("develop");
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["branch", "base", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("develop");
    } finally {
      io2.restore();
    }
  });

  it("branch base set maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "main", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("branch base set rejects blank values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "   ", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base set requires a value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "set", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("branch base rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["branch", "base", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane branch base");
    } finally {
      io.restore();
    }
  });

  it("guard clean succeeds when no staged files", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "clean", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("guard clean fails when staged files exist", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "clean", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Staged files exist");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow outputs prefixes for staged files", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("src");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow supports args format", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--format", "args", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("--allow file.txt");
    } finally {
      io.restore();
    }
  });

  it("guard suggest-allow rejects invalid format", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "suggest-allow", "--format", "nope", "--root", root]);
      expect(code).toBe(2);
    } finally {
      io.restore();
    }
  });

  it("guard commit validates allowlist and message", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        "src",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit fails without allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Provide at least one --allow");
    } finally {
      io.restore();
    }
  });

  it("guard commit fails when tasks.json is staged without allow-tasks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        ".agentplane",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("forbidden by default");
    } finally {
      io.restore();
    }
  });

  it("guard commit allows tasks.json with --allow-tasks", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane"), { recursive: true });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow tasks",
        "--allow",
        ".agentplane",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("OK");
    } finally {
      io.restore();
    }
  });

  it("guard commit quiet suppresses output", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF quiet guard",
        "--allow",
        "file.txt",
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

  it("guard commit fails with --require-clean and unstaged changes", async () => {
    const root = await mkGitRepoRoot();
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await writeFile(path.join(root, "other.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF add guard checks",
        "--allow",
        ".",
        "--require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Working tree is dirty");
    } finally {
      io.restore();
    }
  });

  it("guard commit requires a message", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects missing --allow value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard allow",
        "--allow",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects missing -m value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "commit", "202601010101-ABCDEF", "-m", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard commit rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "guard",
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF guard",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard commit");
    } finally {
      io.restore();
    }
  });

  it("guard rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["guard", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane guard");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper creates a commit with allowlist", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit wrapper",
        "--allow",
        "file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("✨ ABCDEF commit wrapper");
  });

  it("commit wrapper supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF quiet commit",
        "--allow",
        "file.txt",
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

  it("commit wrapper supports auto-allow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF auto allow",
        "--auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper supports --allow-base and --require-clean", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "base.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow base",
        "--allow",
        "base.txt",
        "--allow-base",
        "--require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper supports --allow-tasks flag", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "note.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "note.txt"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF allow tasks",
        "--allow",
        "note.txt",
        "--allow-tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("commit wrapper requires a message", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["commit", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("start requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["start", "202601010101-ABCDEF", "--body", "x", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
    }
  });

  it("start requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "--author",
        "CODER",
        "--body",
        "Start: test",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
    }
  });

  it("start rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "202601010101-ABCDEF",
        "--author",
        "CODER",
        "--body",
        "Start: test unknown flag handling",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane start");
    } finally {
      io.restore();
    }
  });

  it("start accepts --commit-require-clean flag without commit-from-comment", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Commit require clean flag",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: validate commit require clean parsing",
        "--commit-require-clean",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("start uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env start task",
        "--description",
        "Start uses env task id",
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

    const previous = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        "--author",
        "CODER",
        "--body",
        "Start: use env task id for start command with required prefix and length.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
      else delete process.env.AGENT_PLANE_TASK_ID;
    }
  });

  it("start --commit-from-comment commits and updates status", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Test start command with commit-from-comment",
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
      expect(taskId).toMatch(/\d{12}-[A-Z0-9]+/);
    } finally {
      ioNew.restore();
    }

    const commentBody =
      "Start: implement comment-driven commit for start flow | detail A; detail B";

    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        commentBody,
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ started");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement comment-driven commit for start flow | details: detail A; detail B`,
    );
  });

  it("start blocks comment-driven commits when status_commit_policy=confirm", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "confirm";
    await writeConfig(root, cfg);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Confirm policy",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: blocked by confirm policy because comment is long enough",
        "--commit-from-comment",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("status/comment-driven commit blocked");
    } finally {
      io.restore();
    }
  });

  it("start warns on status_commit_policy=warn without confirmation", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Warn policy",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: implement warning path for status commit policy on start action",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).toContain("policy=warn");
    } finally {
      io.restore();
    }
  });

  it("start commit-from-comment supports auto-allow and sentence formatting", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Auto allow",
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

    const commentBody =
      "Start: implement sentence-based summary for commit messages. Add follow-up details.";

    const io = captureStdIO();
    try {
      const code = await runCli([
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        commentBody,
        "--commit-from-comment",
        "--commit-auto-allow",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement sentence-based summary for commit messages. | details: Add follow-up details.`,
    );
  });

  it("start rejects comments without the required prefix", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Prefix enforcement",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Missing prefix even if long enough to pass length checks",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Comment body must start with");
    } finally {
      io.restore();
    }
  });

  it("start commit-from-comment supports status_commit_policy=off with semicolon details", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "off";
    await writeConfig(root, cfg);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Off policy",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: handle policy off; follow-up; extra details included for coverage",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stderr).not.toContain("policy=warn");
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: handle policy off | details: follow-up; extra details included for coverage`,
    );
  });

  it("start commit-from-comment formats -- separators and supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Dash separator",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: apply separator rules -- include extra details in the commit message",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: apply separator rules | details: include extra details in the commit message`,
    );
  });

  it("start rejects comments that are too short", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Short comment",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: too short",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("at least");
    } finally {
      io.restore();
    }
  });

  it("start supports status_commit_policy=confirm when acknowledged", async () => {
    const root = await mkGitRepoRoot();
    const cfg = defaultConfig();
    cfg.status_commit_policy = "confirm";
    await writeConfig(root, cfg);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Confirm acknowledged",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: confirm policy acknowledged for status commit workflow and logging",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("start commit-from-comment formats single-sentence summaries without details", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Single sentence",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: implement summary-only commit message formatting for start actions",
        "--commit-from-comment",
        "--commit-allow",
        ".agentplane/tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `🚧 ${suffix} start: implement summary-only commit message formatting for start actions`,
    );
  });

  it("start commit-from-comment honors custom commit emoji", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Custom emoji",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: custom emoji commit path for start command coverage and validation",
        "--commit-from-comment",
        "--commit-emoji",
        "✨",
        "--commit-allow",
        ".agentplane/tasks",
        "--commit-allow-tasks",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    const suffix = extractTaskSuffix(taskId);
    expect(stdout.trim()).toBe(
      `✨ ${suffix} start: custom emoji commit path for start command coverage and validation`,
    );
  });

  it("start commit-from-comment fails when allow prefixes do not match changes", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Start task",
        "--description",
        "Allowlist mismatch",
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
        "start",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: allowlist mismatch should fail with helpful error message for debugging",
        "--commit-from-comment",
        "--commit-allow",
        "src",
        "--confirm-status-commit",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("No changes matched the allowed prefixes");
    } finally {
      io.restore();
    }
  });

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

  it("block uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env block task",
        "--description",
        "Block uses env task id",
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

    const previous = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "block",
        "--author",
        "CODER",
        "--body",
        "Blocked: waiting on upstream API response to unblock env task id flow.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
      else delete process.env.AGENT_PLANE_TASK_ID;
    }
  });

  it("block requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["block", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
    }
  });

  it("block requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;
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
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
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
      expect(io.stderr).toContain("Usage: agentplane block");
    } finally {
      io.restore();
    }
  });

  it("finish marks done and records commit metadata", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed commit"], { cwd: root });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Finish task",
        "--description",
        "Finish command updates commit metadata",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "bun run ci",
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
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: direct workflow finish updates export and lint with commit metadata present.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ finished");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");
    expect(task.frontmatter.commit?.hash).toBeTruthy();
    const tasksJson = await readFile(path.join(root, ".agentplane", "tasks.json"), "utf8");
    expect(tasksJson).toContain(taskId);
  });

  it("finish uses env task id when omitted", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });

    const ioNew = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Env finish task",
        "--description",
        "Finish uses env task id",
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

    const previous = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "finish",
        "--author",
        "CODER",
        "--body",
        "Verified: finish with env task id should record commit metadata and close task.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
      else delete process.env.AGENT_PLANE_TASK_ID;
    }
  });

  it("finish requires --author and --body", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["finish", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("finish requires a task id when env is unset", async () => {
    const root = await mkGitRepoRoot();
    const previous = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;
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
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
      if (previous) process.env.AGENT_PLANE_TASK_ID = previous;
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
      expect(io.stderr).toContain("Usage: agentplane finish");
    } finally {
      io.restore();
    }
  });

  it("verify requires a task id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    const previous = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;
    try {
      const code = await runCli(["verify", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane verify");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = previous;
    }
  });

  it("verify reports when no commands are configured", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify info",
        "--description",
        "No verify commands configured",
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
      const code = await runCli(["verify", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("no verify commands configured");
    } finally {
      io.restore();
    }
  });

  it("verify --require fails when no commands are configured", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify required",
        "--description",
        "Require verify commands",
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
      const code = await runCli(["verify", taskId, "--require", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("no verify commands configured");
    } finally {
      io.restore();
    }
  });

  it("verify runs commands and updates pr meta/log", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });
    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const headSha = headOut.trim();

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify task",
        "--description",
        "Verify command runs",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    const metaPath = path.join(prDir, "meta.json");
    const now = new Date().toISOString();
    await writeFile(
      metaPath,
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          created_at: now,
          updated_at: now,
          last_verified_sha: null,
          last_verified_at: null,
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ verify passed");
    } finally {
      io.restore();
    }

    const logText = await readFile(path.join(prDir, "verify.log"), "utf8");
    expect(logText).toContain("$ echo ok");
    expect(logText).toContain("verified_sha=");

    const meta = JSON.parse(await readFile(metaPath, "utf8")) as {
      last_verified_sha?: string;
      last_verified_at?: string;
      verify?: { status?: string };
    };
    expect(meta.last_verified_sha).toBe(headSha);
    expect(meta.last_verified_at).toBeTruthy();
    expect(meta.verify?.status).toBe("pass");
  });

  it("verify skips when unchanged and updates log", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, ".gitignore"), ".agentplane/\n", "utf8");
    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".gitignore", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });
    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const headSha = headOut.trim();

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify skip",
        "--description",
        "Verify skip-if-unchanged",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    const metaPath = path.join(prDir, "meta.json");
    const now = new Date().toISOString();
    await writeFile(
      metaPath,
      JSON.stringify(
        {
          schema_version: 1,
          task_id: taskId,
          created_at: now,
          updated_at: now,
          last_verified_sha: headSha,
          last_verified_at: now,
        },
        null,
        2,
      ),
      "utf8",
    );

    const io = captureStdIO();
    try {
      const code = await runCli(["verify", taskId, "--skip-if-unchanged", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("verify skipped");
    } finally {
      io.restore();
    }

    const logText = await readFile(path.join(prDir, "verify.log"), "utf8");
    expect(logText).toContain("skipped (unchanged verified_sha=");
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
        "--verify",
        "echo ok",
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
      const code = await runCli(["verify", taskId, "--nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane verify");
    } finally {
      io.restore();
    }
  });

  it("verify supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });

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
        "--verify",
        "echo ok",
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
      const code = await runCli(["verify", taskId, "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("verify rejects --cwd outside repo root", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify cwd",
        "--description",
        "Reject cwd outside root",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
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
      const outside = path.join(os.tmpdir(), "agentplane-verify-outside");
      const code = await runCli(["verify", taskId, "--cwd", outside, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--cwd must stay under repo root");
    } finally {
      io.restore();
    }
  });

  it("verify rejects --log outside repo root", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify log",
        "--description",
        "Reject log outside root",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
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
      const outside = path.join(os.tmpdir(), "agentplane-verify.log");
      const code = await runCli(["verify", taskId, "--log", outside, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--log must stay under repo root");
    } finally {
      io.restore();
    }
  });

  it("verify returns command exit code on failure", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify failure",
        "--description",
        "Verify command fails",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "exit 3",
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
      const code = await runCli(["verify", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Verify command failed");
    } finally {
      io.restore();
    }
  });

  it("verify uses env task id when flags come first", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);

    await writeFile(path.join(root, "file.txt"), "content", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: seed"], { cwd: root });

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify env",
        "--description",
        "Verify uses env task id",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const previous = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = taskId;
    const io = captureStdIO();
    try {
      const code = await runCli(["verify", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
      if (previous === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = previous;
    }
  });

  it("work start requires task id and flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["work", "start", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --slug value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--worktree",
        "--slug",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --agent value", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects missing --worktree flag", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "missing-worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "unknown-flag",
        "--worktree",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane work start");
    } finally {
      io.restore();
    }
  });

  it("work start requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "work",
        "start",
        "202601010101-ABCDEF",
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("workflow_mode=branch_pr");
    } finally {
      io.restore();
    }
  });

  it("work start creates a branch and worktree", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Work start task",
        "--description",
        "Work start creates branch and worktree",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    let branchName = "";
    let worktreePath = "";
    try {
      const code = await runCli([
        "work",
        "start",
        taskId,
        "--agent",
        "CODER",
        "--slug",
        "work-start",
        "--worktree",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ work start");
      branchName = `task/${taskId}/work-start`;
      worktreePath = path.join(root, ".agentplane", "worktrees", `${taskId}-work-start`);
    } finally {
      io.restore();
    }

    await expect(
      execFileAsync("git", ["show-ref", "--verify", `refs/heads/${branchName}`], { cwd: root }),
    ).resolves.toBeDefined();

    const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
      cwd: root,
    });
    expect(stdout).toContain(worktreePath);
  });

  it("pr open creates PR artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open task",
        "--description",
        "PR open creates artifacts",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr open");
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const metaRaw = await readFile(path.join(prDir, "meta.json"), "utf8");
    const meta = JSON.parse(metaRaw) as { task_id?: string; branch?: string };
    expect(meta.task_id).toBe(taskId);
    expect(meta.branch).toBe(`task/${taskId}/pr-open`);
    await readFile(path.join(prDir, "review.md"), "utf8");
    await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    await readFile(path.join(prDir, "verify.log"), "utf8");
  });

  it("pr update refreshes diffstat and auto summary", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await configureGitUser(root);

    await writeFile(path.join(root, "seed.txt"), "seed", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "seed.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update task",
        "--description",
        "PR update writes diffstat",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-update`,
      "--root",
      root,
    ]);

    await execFileAsync("git", ["checkout", "-b", `task/${taskId}/pr-update`], { cwd: root });
    await writeFile(path.join(root, "change.txt"), "change", "utf8");
    await execFileAsync("git", ["add", "change.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "change"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const diffstat = await readFile(path.join(prDir, "diffstat.txt"), "utf8");
    expect(diffstat).toContain("change.txt");
    const review = await readFile(path.join(prDir, "review.md"), "utf8");
    expect(review).toContain("BEGIN AUTO SUMMARY");
    expect(review).toContain("change.txt");
  });

  it("pr note appends to handoff notes", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note task",
        "--description",
        "PR note appends handoff notes",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-note`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: reviewed docs changes.",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const review = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md"),
      "utf8",
    );
    expect(review).toContain("DOCS: Handoff: reviewed docs changes.");
  });

  it("pr note requires branch_pr workflow", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note direct",
        "--description",
        "Branch_pr required",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail in direct mode.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("workflow_mode=branch_pr");
    } finally {
      io.restore();
    }
  });

  it("pr note maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: should fail without git repo.",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects empty author or body", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "   ",
        "--body",
        "Handoff: should fail on empty author.",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr check passes when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check task",
        "--description",
        "PR check validates artifacts",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ pr check");
    } finally {
      io.restore();
    }
  });

  it("pr open requires --author", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open requires author",
        "--description",
        "PR open must have author flag",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open unknown flag",
        "--description",
        "PR open should reject unknown flags",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "CODER",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr open uses current branch when --branch is omitted", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open branch default",
        "--description",
        "PR open uses current branch",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);

    const metaRaw = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json"),
      "utf8",
    );
    const meta = JSON.parse(metaRaw) as { branch?: string };
    expect(meta.branch).toBe("main");
  });

  it("pr open is idempotent when artifacts exist", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR open idempotent task",
        "--description",
        "PR open can be re-run safely",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-open`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "open",
        taskId,
        "--author",
        "REVIEWER",
        "--branch",
        `task/${taskId}/pr-open`,
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("pr update rejects missing artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR update missing artifacts",
        "--description",
        "PR update should error without pr open",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("PR artifacts missing");
    } finally {
      io.restore();
    }
  });

  it("pr update rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "update", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr update");
    } finally {
      io.restore();
    }
  });

  it("pr note rejects missing review", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR note missing review",
        "--description",
        "PR note requires review",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        taskId,
        "--author",
        "DOCS",
        "--body",
        "Handoff: missing review should fail.",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing pr/review.md");
    } finally {
      io.restore();
    }
  });

  it("pr check fails when verify requirements are unmet", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check verify task",
        "--description",
        "PR check should fail until verify passes",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "bun run ci",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check`,
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Verify requirements not satisfied");
    } finally {
      io.restore();
    }
  });

  it("pr check reports missing auto summary markers", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check markers",
        "--description",
        "Missing auto summary markers",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-markers`,
      "--root",
      root,
    ]);

    const reviewPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "review.md");
    const review = await readFile(reviewPath, "utf8");
    const stripped = review
      .replace("<!-- BEGIN AUTO SUMMARY -->", "")
      .replace("<!-- END AUTO SUMMARY -->", "");
    await writeFile(reviewPath, stripped, "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing auto summary start marker");
      expect(io.stderr).toContain("Missing auto summary end marker");
    } finally {
      io.restore();
    }
  });

  it("pr check reports invalid meta.json", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "PR check invalid meta",
        "--description",
        "Invalid meta.json",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    await runCli([
      "pr",
      "open",
      taskId,
      "--author",
      "CODER",
      "--branch",
      `task/${taskId}/pr-check-meta`,
      "--root",
      root,
    ]);

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    await writeFile(metaPath, "{ not-json", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", taskId, "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Expected property name");
    } finally {
      io.restore();
    }
  });

  it("pr check rejects extra arguments", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--extra", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr check");
    } finally {
      io.restore();
    }
  });

  it("pr check maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "check", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("integrate requires a task id", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects invalid merge strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--merge-strategy", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unexpected arguments", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "extra"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate rejects unknown flags", async () => {
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--nope"]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate requires branch_pr workflow", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("workflow_mode=branch_pr");
    } finally {
      io.restore();
    }
  });

  it("integrate maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("integrate merges branch and marks task done", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate task",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli(["integrate", taskId, "--branch", branch, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }

    const task = await readTask({ cwd: root, taskId });
    expect(task.frontmatter.status).toBe("DONE");

    const metaPath = path.join(root, ".agentplane", "tasks", taskId, "pr", "meta.json");
    const meta = await readFile(metaPath, "utf8");
    expect(meta).toContain('"status": "MERGED"');
  });

  it("integrate supports dry-run", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Dry run integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/dry-run`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    const { stdout: headBefore } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--dry-run",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("dry-run");
    } finally {
      io.restore();
    }

    const { stdout: headAfter } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: root,
    });
    expect(headAfter.trim()).toBe(headBefore.trim());
  });

  it("integrate supports merge strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Merge strategy integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/merge`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "merge",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate supports rebase strategy", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Rebase integrate",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/rebase`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "base.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base update"], { cwd: root });
    const worktreePath = await mkdtemp(path.join(os.tmpdir(), "agentplane-rebase-"));
    await execFileAsync("git", ["worktree", "add", worktreePath, branch], {
      cwd: root,
      env: cleanGitEnv(),
    });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "rebase",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ integrate");
    } finally {
      io.restore();
    }
  });

  it("integrate fails when post-merge hook removes pr dir", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Integrate missing PR",
        "--description",
        "Branch integration",
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
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/integrate-missing-pr`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    const hookPath = path.join(root, ".git", "hooks", "post-merge");
    const hookBody = `#!/bin/sh\nrm -rf "${prDir}"\n`;
    await writeFile(hookPath, hookBody, "utf8");
    await chmod(hookPath, 0o755);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--merge-strategy",
        "merge",
        "--root",
        root,
      ]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("Missing PR artifact dir after merge");
    } finally {
      io.restore();
    }
  });

  it("integrate runs verify when requested", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);

    const execFileAsync = promisify(execFile);
    await writeFile(path.join(root, "README.md"), "base\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "chore base"], { cwd: root });

    let taskId = "";
    const ioTask = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Verify integrate",
        "--description",
        "Branch integration",
        "--priority",
        "med",
        "--owner",
        "CODER",
        "--tag",
        "nodejs",
        "--verify",
        "echo ok",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      taskId = ioTask.stdout.trim();
    } finally {
      ioTask.restore();
    }
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `chore ${taskId} scaffold`], { cwd: root });

    const branch = `task/${taskId}/verify`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "feature.txt"), "feature\n", "utf8");
    await execFileAsync("git", ["add", "feature.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add feature`], { cwd: root });

    await runCli(["pr", "open", taskId, "--author", "CODER", "--root", root]);
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", `${taskId} add pr artifacts`], { cwd: root });

    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "integrate",
        taskId,
        "--branch",
        branch,
        "--base",
        "main",
        "--run-verify",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const verifyLog = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "pr", "verify.log"),
      "utf8",
    );
    expect(verifyLog).toContain("verified_sha=");
  });

  it("pr note rejects unknown flags", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli([
        "pr",
        "note",
        "202601010101-ABCDEF",
        "--author",
        "DOCS",
        "--body",
        "Handoff: unknown flag check.",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr note requires --author and --body", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "note", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr note");
    } finally {
      io.restore();
    }
  });

  it("pr commands require a task id", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "open", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open");
    } finally {
      io.restore();
    }
  });

  it("pr rejects unknown subcommands", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const io = captureStdIO();
    try {
      const code = await runCli(["pr", "nope", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane pr open|update|check|note");
    } finally {
      io.restore();
    }
  });

  it("hooks install writes managed hooks and shim", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const hooksDir = path.join(root, ".git", "hooks");
    const commitMsg = await readFile(path.join(hooksDir, "commit-msg"), "utf8");
    const preCommit = await readFile(path.join(hooksDir, "pre-commit"), "utf8");
    const shim = await readFile(path.join(root, ".agentplane", "bin", "agentplane"), "utf8");

    expect(commitMsg).toContain("agentplane-hook");
    expect(preCommit).toContain("agentplane-hook");
    expect(shim).toContain("agentplane-hook-shim");
  });

  it("hooks install refuses to overwrite unmanaged hook", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await mkdir(path.join(root, ".git", "hooks"), { recursive: true });
    await writeFile(path.join(root, ".git", "hooks", "commit-msg"), "custom", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Refusing to overwrite existing hook");
    } finally {
      io.restore();
    }
  });

  it("hooks install is idempotent for managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCli(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks install supports --quiet", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--quiet", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toBe("");
    } finally {
      io.restore();
    }
  }, 15_000);

  it("hooks install maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "install", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane hooks install|uninstall");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall removes managed hooks", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await runCli(["hooks", "install", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }

    const hookPath = path.join(root, ".git", "hooks", "commit-msg");
    await expect(readFile(hookPath, "utf8")).rejects.toThrow();
  });

  it("hooks uninstall reports when no hooks are present", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("No agentplane hooks found");
    } finally {
      io.restore();
    }
  });

  it("hooks uninstall maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "uninstall", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg requires a message file", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Missing commit message file");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg enforces task id env", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "✨ ABCDEF add guard checks\n", "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run rejects unknown hook", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane hooks run <hook>");
    } finally {
      io.restore();
    }
  });

  it("hooks run commit-msg rejects empty subject", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "# comment\n\n", "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Commit message subject is empty");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects missing suffix", async () => {
    const root = await mkGitRepoRoot();
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "chore: update\n", "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    process.env.AGENT_PLANE_TASK_ID = "202601010101-ABCDEF";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg uses task list when env is unset", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Context",
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

    const messagePath = path.join(root, "COMMIT_EDITMSG");
    const suffix = taskId.split("-").at(-1) ?? "";
    await writeFile(messagePath, `feat: ${suffix} add hooks\n`, "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg rejects missing suffix from task list", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const ioTask = captureStdIO();
    let taskId = "";
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "Suffix required",
        "--description",
        "Commit hook validation",
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

    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "feat: add hooks\n", "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Commit subject must mention a task suffix");
      expect(taskId).not.toEqual("");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run commit-msg fails when no tasks exist", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const messagePath = path.join(root, "COMMIT_EDITMSG");
    await writeFile(messagePath, "feat: add hooks\n", "utf8");
    const prev = process.env.AGENT_PLANE_TASK_ID;
    delete process.env.AGENT_PLANE_TASK_ID;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "commit-msg", messagePath, "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("No task IDs available");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_TASK_ID;
      else process.env.AGENT_PLANE_TASK_ID = prev;
    }
  });

  it("hooks run pre-commit succeeds when nothing is staged", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit maps errors for non-git roots", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cli-test-"));
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("Not a git repository");
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit blocks tasks.json without allow flag", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENT_PLANE_ALLOW_TASKS;
    process.env.AGENT_PLANE_ALLOW_TASKS = "0";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("protected by agentplane hooks");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_ALLOW_TASKS;
      else process.env.AGENT_PLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-push returns success", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-push", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("hooks run pre-commit allows tasks.json with env override", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENT_PLANE_ALLOW_TASKS;
    process.env.AGENT_PLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_ALLOW_TASKS;
      else process.env.AGENT_PLANE_ALLOW_TASKS = prev;
    }
  });

  it("hooks run pre-commit allows base branch with allowBase", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENT_PLANE_ALLOW_BASE;
    process.env.AGENT_PLANE_ALLOW_BASE = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_ALLOW_BASE;
      else process.env.AGENT_PLANE_ALLOW_BASE = prev;
    }
  });

  it("hooks run pre-commit enforces branch_pr base restrictions", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "src/app.ts"], { cwd: root });

    const prev = process.env.AGENT_PLANE_ALLOW_BASE;
    delete process.env.AGENT_PLANE_ALLOW_BASE;

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("forbidden on main");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_ALLOW_BASE;
      else process.env.AGENT_PLANE_ALLOW_BASE = prev;
    }
  });

  it("hooks run pre-commit blocks tasks.json off base in branch_pr", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["checkout", "-b", "feature"], { cwd: root });
    await writeFile(path.join(root, ".agentplane", "tasks.json"), "{}", "utf8");
    await execFileAsync("git", ["add", ".agentplane/tasks.json"], { cwd: root });

    const prev = process.env.AGENT_PLANE_ALLOW_TASKS;
    process.env.AGENT_PLANE_ALLOW_TASKS = "1";

    const io = captureStdIO();
    try {
      const code = await runCli(["hooks", "run", "pre-commit", "--root", root]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("allowed only on main");
    } finally {
      io.restore();
      if (prev === undefined) delete process.env.AGENT_PLANE_ALLOW_TASKS;
      else process.env.AGENT_PLANE_ALLOW_TASKS = prev;
    }
  });

  it("task lint reports OK for a valid export", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "export", "--root", root]);
      expect(code2).toBe(0);
    } finally {
      io2.restore();
    }

    const io3 = captureStdIO();
    try {
      const code3 = await runCli(["task", "lint", "--root", root]);
      expect(code3).toBe(0);
      expect(io3.stdout.trim()).toBe("OK");
    } finally {
      io3.restore();
    }
  });

  it("task lint returns validation error when checksum is wrong", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
    } finally {
      io1.restore();
    }

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "export", "--root", root]);
      expect(code2).toBe(0);
    } finally {
      io2.restore();
    }

    const outPath = path.join(root, ".agentplane", "tasks.json");
    const text = await readFile(outPath, "utf8");
    const parsed = JSON.parse(text) as { tasks: unknown[]; meta: { checksum: string } };
    parsed.meta.checksum = "bad";
    await writeFile(outPath, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");

    const io3 = captureStdIO();
    try {
      const code3 = await runCli(["task", "lint", "--root", root]);
      expect(code3).toBe(3);
      expect(io3.stderr).toContain("meta.checksum does not match");
    } finally {
      io3.restore();
    }
  });

  it("task doc rejects unknown subcommands", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "doc", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane task doc set");
    } finally {
      io.restore();
    }
  });

  it("wraps unexpected errors as E_INTERNAL", async () => {
    const origStdoutWrite = process.stdout.write.bind(process.stdout);
    const origStderrWrite = process.stderr.write.bind(process.stderr);

    let stderr = "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stdout.write as any) = () => {
      throw new Error("boom");
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.stderr.write as any) = (chunk: unknown) => {
      stderr += String(chunk);
      return true;
    };

    try {
      const code = await runCli(["--version"]);
      expect(code).toBe(1);
      expect(stderr).toContain("boom");
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stdout.write as any) = origStdoutWrite;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (process.stderr.write as any) = origStderrWrite;
    }
  });

  it("task show fails when required doc metadata is missing", async () => {
    const root = await mkGitRepoRoot();

    const io1 = captureStdIO();
    let id = "";
    try {
      const code1 = await runCli([
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
      expect(code1).toBe(0);
      id = io1.stdout.trim();
    } finally {
      io1.restore();
    }

    const readmePath = path.join(root, ".agentplane", "tasks", id, "README.md");
    const original = await readFile(readmePath, "utf8");
    await writeFile(readmePath, original.replace(/^\s*doc_updated_by:.*\n/m, ""), "utf8");

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["task", "show", id, "--root", root]);
      expect(code2).toBe(3);
      expect(io2.stderr).toContain("Invalid task README metadata");
      expect(io2.stderr).toContain("doc_updated_by");
    } finally {
      io2.restore();
    }
  });

  it("task show requires an id", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "show", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane task show");
    } finally {
      io.restore();
    }
  });

  it("task show maps missing readme to E_IO", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "show", "202601010101-ABCDEF", "--root", root]);
      expect(code).toBe(4);
      expect(io.stderr).toMatch(/ENOENT|no such file/i);
    } finally {
      io.restore();
    }
  });

  it("task new validates required flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        "My task",
        "--description",
        "Why it matters",
        "--owner",
        "CODER",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane task new");
    } finally {
      io.restore();
    }
  });

  it("task new rejects unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
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
        "--wat",
        "x",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Unknown flag");
    } finally {
      io.restore();
    }
  });

  it("mode get prints workflow mode (default)", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "get", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("direct");
    } finally {
      io.restore();
    }
  });

  it("mode set persists workflow_mode and prints the new mode", async () => {
    const root = await mkGitRepoRoot();

    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "branch_pr", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout.trim()).toBe("branch_pr");
    } finally {
      io.restore();
    }

    const configPath = path.join(root, ".agentplane", "config.json");
    const text = await readFile(configPath, "utf8");
    expect(text).toContain('"workflow_mode": "branch_pr"');

    const io2 = captureStdIO();
    try {
      const code2 = await runCli(["mode", "get", "--root", root]);
      expect(code2).toBe(0);
      expect(io2.stdout.trim()).toBe("branch_pr");
    } finally {
      io2.restore();
    }
  });

  it("mode set rejects invalid values", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["mode", "set", "nope", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage: agentplane mode set");
    } finally {
      io.restore();
    }
  });
});
