import { execFile } from "node:child_process";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import {
  captureStdIO,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeDefaultConfig,
} from "@agentplane/testkit";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const COMMIT_WRAPPER_SUITE_TIMEOUT_MS = 120_000;

describe("runCli commit wrapper: env", { timeout: COMMIT_WRAPPER_SUITE_TIMEOUT_MS }, () => {
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
        "✨ ABCDEF commit: wrapper command",
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
    expect(stdout.trim()).toBe("✨ ABCDEF commit: wrapper command");
  });

  it("commit wrapper auto-stages allowlist-scoped changes when the index is empty", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await mkdir(path.join(root, "src"), { recursive: true });
    await writeFile(path.join(root, "src", "app.ts"), "export const x = 1;\n", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: auto stage allowlist",
        "--allow",
        "src",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("commit auto-staged 1 path(s) from allowlist");
      expect(io.stdout).toContain("staged=src/app.ts");
    } finally {
      io.restore();
    }

    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("✨ ABCDEF commit: auto stage allowlist");
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
        "✨ ABCDEF commit: quiet mode",
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

  it("commit wrapper rejects auto-allow", async () => {
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
        "✨ ABCDEF commit: auto allow",
        "--auto-allow",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--auto-allow is disabled");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper compresses noisy pre-commit output into summary", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "file.txt"), "x", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "file.txt"], { cwd: root });

    const hookLines = Array.from({ length: 40 }, (_, i) =>
      i === 19
        ? "\u001B[33mCode style issues found in the above file. Run Prettier with --write to fix.\u001B[0m"
        : `HOOK_LINE_${String(i + 1).padStart(2, "0")}`,
    );
    const preCommit = [
      "#!/bin/sh",
      ...hookLines.map((line) => `echo "${line}" 1>&2`),
      "exit 1",
      "",
    ].join("\n");
    const hookPath = path.join(root, ".git", "hooks", "pre-commit");
    await writeFile(hookPath, preCommit, "utf8");
    await chmod(hookPath, 0o755);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: hook failure summary",
        "--allow",
        "file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("error [E_GIT]");
      expect(io.stderr).toContain("git commit failed");
      expect(io.stderr).toContain("state: git rejected the requested task-scoped commit");
      expect(io.stderr).toContain(
        "likely_cause: a formatting check in the pre-commit path rejected the staged task-scoped commit",
      );
      expect(io.stderr).toContain(
        "next_action: bun run format (apply formatter fixes before retrying the commit flow)",
      );
      expect(io.stderr).toContain("reason_code: git_pre_commit_format");
      expect(io.stderr).toContain("output_summary:");
      expect(io.stderr).toContain("HOOK_LINE_01");
      expect(io.stderr).toContain(
        "Code style issues found in the above file. Run Prettier with --write to fix.",
      );
      expect(io.stderr).toContain("HOOK_LINE_40");
      expect(io.stderr).toContain("lines omitted");
      expect(io.stderr).not.toContain("HOOK_LINE_20");
      expect(io.stderr).not.toContain("\u001B[33m");
      expect(io.stderr).not.toContain("generated close commit");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper rejects --unstage-others without --close", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: docs update",
        "--unstage-others",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--unstage-others requires --close");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper rejects --check-only without --close", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: docs update",
        "--check-only",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("--check-only requires --close");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
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
        "✨ ABCDEF commit: run commit",
        "--nope",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane commit");
    } finally {
      io.restore();
    }
  });
});
