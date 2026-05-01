import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
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

const COMMIT_WRAPPER_AUTO_STAGE_TIMEOUT_MS = 120_000;
const COMMIT_WRAPPER_SUITE_TIMEOUT_MS = 120_000;

describe("runCli commit wrapper: policy", { timeout: COMMIT_WRAPPER_SUITE_TIMEOUT_MS }, () => {
  it(
    "commit wrapper auto-stages CI-only changes with --allow-ci even without explicit --allow",
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      await configureGitUser(root);
      await mkdir(path.join(root, ".github", "workflows"), { recursive: true });
      await writeFile(
        path.join(root, ".github", "workflows", "publish.yml"),
        "name: publish\n",
        "utf8",
      );

      const io = captureStdIO();
      try {
        const code = await runCli([
          "commit",
          "202601010101-ABCDEF",
          "-m",
          "✨ ABCDEF commit: auto stage ci artifact",
          "--allow-ci",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        expect(io.stdout).toContain("commit auto-staged 1 path(s) from allowlist");
        expect(io.stdout).toContain("staged=.github/workflows/publish.yml");
      } finally {
        io.restore();
      }

      const execFileAsync = promisify(execFile);
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
      expect(stdout.trim()).toBe("✨ ABCDEF commit: auto stage ci artifact");
    },
    COMMIT_WRAPPER_AUTO_STAGE_TIMEOUT_MS,
  );

  it("commit wrapper blocks AGENTS.md without allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: protected policy",
        "--allow",
        "AGENTS.md",
        "--root",
        root,
      ]);
      expect(code).toBe(5);
      expect(io.stderr).toContain("AGENTS.md");
      expect(io.stderr).toContain("--allow-policy");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper allows AGENTS.md with allow-policy", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    await configureGitUser(root);
    await writeFile(path.join(root, "AGENTS.md"), "# policy\n", "utf8");
    const execFileAsync = promisify(execFile);
    await execFileAsync("git", ["add", "AGENTS.md"], { cwd: root });

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: protected policy",
        "--allow",
        "AGENTS.md",
        "--allow-policy",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }

    const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%s"], { cwd: root });
    expect(stdout.trim()).toBe("✨ ABCDEF commit: protected policy");
  });

  it("commit wrapper normalizes ./ prefixes in allowlist", async () => {
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
        "✨ ABCDEF commit: allow file.txt",
        "--allow",
        "./file.txt",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("✅ committed");
    } finally {
      io.restore();
    }
  });

  it("commit wrapper rejects repo-wide allowlist prefix", async () => {
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
        "✨ ABCDEF commit: reject repo wide",
        "--allow",
        ".",
        "--root",
        root,
      ]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("cannot be repo-wide");
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
    // Unstaged tracked changes should block --require-clean.
    await writeFile(path.join(root, "base.txt"), "y", "utf8");

    const io = captureStdIO();
    try {
      const code = await runCli([
        "commit",
        "202601010101-ABCDEF",
        "-m",
        "✨ ABCDEF commit: allow base",
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
        "✨ ABCDEF commit: allow tasks",
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
});
