/* eslint-disable @typescript-eslint/no-unused-vars */
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
import type * as taskBackend from "../backends/task-backend.js";
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
  it("task next shows ready tasks only", async () => {
    const root = await mkGitRepoRoot();
    let taskA = "";
    let taskB = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "No deps",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskA = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Blocked task",
          "--description",
          "Depends on A",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--depends-on",
          taskA,
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskB = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskA);
      expect(io.stdout).not.toContain(taskB);
    } finally {
      io.restore();
    }
  });

  it("task next supports limit and quiet flags", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Ready task",
          "--description",
          "Limit test",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "next", "--limit", "1", "--quiet", "--root", root]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task next applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered next",
          "--description",
          "Filter me",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "next",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task next rejects invalid limit values", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "next", "--limit"], msg: "Missing value after --limit" },
      {
        args: ["task", "next", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task search finds matching tasks", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Searchable task",
          "--description",
          "Find me",
          "--priority",
          "med",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "search", "Searchable", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain(taskId);
    } finally {
      io.restore();
    }
  });

  it("task search supports regex and limit filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Regex task",
          "--description",
          "Searchable content",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Regex.*",
        "--regex",
        "--limit",
        "1",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task search applies status, owner, and tag filters", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filtered search",
          "--description",
          "Search scope",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "search",
        "Filtered",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task search rejects empty queries and invalid limits", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "search", "  "], msg: "Missing query (expected non-empty text)" },
      { args: ["task", "search", "query", "--limit"], msg: "Missing value after --limit" },
      {
        args: ["task", "search", "query", "--limit", "nope"],
        msg: "Invalid value for --limit: nope (expected integer)",
      },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task search rejects invalid regex", async () => {
    const root = await mkGitRepoRoot();
    const io = captureStdIO();
    try {
      const code = await runCli(["task", "search", "(", "--regex", "--root", root]);
      expect(code).toBe(2);
      expect(io.stderr).toContain("Invalid regex");
    } finally {
      io.restore();
    }
  });

  it("task doc show prints section content", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc task",
          "--description",
          "Has doc",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Summary",
          "--text",
          "Doc section text",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "show",
        taskId,
        "--section",
        "Summary",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Doc section text");
    } finally {
      io.restore();
    }
  });

  it("task verify-show prints Verify Steps", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Verify show",
          "--description",
          "Has verify steps",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "doc",
          "set",
          taskId,
          "--section",
          "Verify Steps",
          "--text",
          "Verifier instructions",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "verify-show", taskId, "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("Verifier instructions");
    } finally {
      io.restore();
    }
  });

  it("task doc show supports quiet when section is missing", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Doc show quiet",
          "--description",
          "Missing section",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "doc",
        "show",
        taskId,
        "--section",
        "Findings",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task doc show rejects missing values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "202602011330-DOC01";
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "doc", "show", taskId, "--section"], msg: "Missing value after --section" },
      { args: ["task", "doc", "show", taskId, "--nope"], msg: "Unknown option: --nope." },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });

  it("task comment and set-status update task metadata", async () => {
    const root = await mkGitRepoRoot();
    let taskId = "";
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Status task",
          "--description",
          "Tracks status",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "comment",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Comment body",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "set-status",
          taskId,
          "DOING",
          "--author",
          "CODER",
          "--body",
          "Status update body",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const task = await readTask({ cwd: root, rootOverride: root, taskId });
    expect(task.frontmatter.status).toBe("DOING");
    expect(task.frontmatter.comments.length).toBeGreaterThan(0);
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
      expect(io.stdout).toContain("Total: 0");
    } finally {
      io.restore();
    }
  });

  it("task list supports filters and quiet mode", async () => {
    const root = await mkGitRepoRoot();
    {
      const io = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "new",
          "--title",
          "Filter task",
          "--description",
          "Tagged task",
          "--owner",
          "CODER",
          "--tag",
          "docs",
          "--root",
          root,
        ]);
        expect(code).toBe(0);
      } finally {
        io.restore();
      }
    }

    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "list",
        "--status",
        "TODO",
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--quiet",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
    } finally {
      io.restore();
    }
  });

  it("task list rejects missing filter values and unknown flags", async () => {
    const root = await mkGitRepoRoot();
    const cases: { args: string[]; msg: string }[] = [
      { args: ["task", "list", "--status"], msg: "Missing value after --status" },
      { args: ["task", "list", "--owner"], msg: "Missing value after --owner" },
      { args: ["task", "list", "--tag"], msg: "Missing value after --tag" },
      { args: ["task", "list", "--nope"], msg: "Unknown option: --nope" },
    ];

    for (const entry of cases) {
      const io = captureStdIO();
      try {
        const code = await runCli([...entry.args, "--root", root]);
        expect(code).toBe(2);
        expect(io.stderr).toContain(entry.msg);
      } finally {
        io.restore();
      }
    }
  });
});
