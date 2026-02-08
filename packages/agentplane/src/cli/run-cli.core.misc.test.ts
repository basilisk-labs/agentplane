/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/consistent-type-imports */
import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import {
  chmod,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  defaultConfig,
  extractTaskSuffix,
  readTask,
  renderTaskReadme,
  type ResolvedProject,
} from "@agentplaneorg/core";

import { runCli } from "./run-cli.js";
import { BUNDLED_RECIPES_CATALOG } from "../recipes/bundled-recipes.js";
import {
  filterAgentsByWorkflow,
  loadAgentTemplates,
  loadAgentsTemplate,
} from "../agents/agents-template.js";
import * as taskBackend from "../backends/task-backend.js";
import {
  captureStdIO,
  cleanGitEnv,
  commitAll,
  configureGitUser,
  createUpgradeBundle,
  getAgentplaneHome,
  gitBranchExists,
  runCliSilent,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  mkTempDir,
  pathExists,
  registerAgentplaneHome,
  silenceStdIO,
  stageGitignoreIfPresent,
  writeConfig,
  writeDefaultConfig,
} from "./run-cli.test-helpers.js";
import { resolveUpdateCheckCachePath } from "./update-check.js";
import * as prompts from "./prompts.js";

registerAgentplaneHome();
let restoreStdIO: (() => void) | null = null;

beforeEach(() => {
  restoreStdIO = silenceStdIO();
});

afterEach(() => {
  restoreStdIO?.();
  restoreStdIO = null;
});

function stubTaskBackend(overrides: Partial<taskBackend.TaskBackend>): taskBackend.TaskBackend {
  return {
    id: "local",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockImplementation(() => Promise.resolve()),
    ...overrides,
  };
}

describe("runCli", () => {
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
      expect(io.stderr).toContain("Unknown subcommand: nope");
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
      expect(io.stderr).toContain("Usage:");
      expect(io.stderr).toContain("agentplane task show");
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
      expect(io.stderr).toContain("agentplane task new");
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
      expect(io.stderr).toContain("Unknown option");
    } finally {
      io.restore();
    }
  });

  it("recipes list-remote requires --yes in non-tty mode when require_network=true", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "list-remote", "--refresh", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
    } finally {
      io.restore();
    }
  });

  it("recipes install requires --yes in non-tty mode when require_network=true", async () => {
    const root = await mkGitRepoRoot();
    await writeDefaultConfig(root);
    const io = captureStdIO();
    try {
      const code = await runCli(["recipes", "install", "--name", "viewer", "--root", root]);
      expect(code).toBe(3);
      expect(io.stderr).toContain("--yes");
    } finally {
      io.restore();
    }
  });
});
