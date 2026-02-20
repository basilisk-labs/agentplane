import { describe, expect, it, vi } from "vitest";

import type { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  resolveProject: vi.fn(),
  statusChangedPaths: vi.fn(),
  loadCommandContext: vi.fn(),
}));

vi.mock("@agentplaneorg/core", () => ({
  resolveProject: mocks.resolveProject,
}));
vi.mock("../../shared/git-context.js", () => ({
  GitContext: class {
    constructor(opts: { gitRoot: string }) {
      void opts.gitRoot;
    }
    statusChangedPaths = mocks.statusChangedPaths;
  },
}));
vi.mock("../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
}));

describe("guard/impl/allow", () => {
  it("suggestAllowPrefixes returns sorted unique prefixes", async () => {
    const { suggestAllowPrefixes } = await import("./allow.js");
    const out = suggestAllowPrefixes([
      "src/a.ts",
      "README.md",
      "src/b.ts",
      "docs/r.md",
      "./docs/x.md",
      "src//nested/z.ts",
    ]);
    expect(out).toEqual(["docs", "README.md", "src", "src/nested"]);
  });

  it("gitStatusChangedPaths resolves project and delegates to GitContext", async () => {
    const { gitStatusChangedPaths } = await import("./allow.js");
    mocks.resolveProject.mockResolvedValue({
      gitRoot: "/repo",
      agentplaneDir: "/repo/.agentplane",
    });
    mocks.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    const out = await gitStatusChangedPaths({ cwd: "/repo/sub", rootOverride: "/repo" });
    expect(out).toEqual(["src/app.ts"]);
    expect(mocks.resolveProject).toHaveBeenCalledTimes(1);
  });

  it("ensureGitClean fails for staged and unstaged tracked changes", async () => {
    const { ensureGitClean } = await import("./allow.js");
    const ctxStaged = {
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue(["file.txt"]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      },
    };
    await expect(
      ensureGitClean({ ctx: ctxStaged as never, cwd: "/repo" }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
      message: "Working tree has staged changes",
    });

    const ctxUnstaged = {
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue([]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue(["file.txt"]),
      },
    };
    await expect(
      ensureGitClean({ ctx: ctxUnstaged as never, cwd: "/repo" }),
    ).rejects.toMatchObject<CliError>({
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  });

  it("ensureGitClean loads context when ctx is absent", async () => {
    const { ensureGitClean } = await import("./allow.js");
    mocks.loadCommandContext.mockResolvedValue({
      git: {
        statusStagedPaths: vi.fn().mockResolvedValue([]),
        statusUnstagedTrackedPaths: vi.fn().mockResolvedValue([]),
      },
    });
    await expect(ensureGitClean({ cwd: "/repo" })).resolves.toBeUndefined();
    expect(mocks.loadCommandContext).toHaveBeenCalledTimes(1);
  });

  it("stageAllowlist enforces no-change/no-match branches and stages matched files", async () => {
    const { stageAllowlist } = await import("./allow.js");
    const ctx = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue([]),
        stage: vi.fn(),
      },
    };
    const ctxEmptyAllow = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/a.ts"]),
        stage: vi.fn(),
      },
    };
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: [],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
      message: "Provide at least one allowed prefix",
    });
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: ["."],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    await expect(
      stageAllowlist({
        ctx: ctxEmptyAllow as never,
        allow: ["."],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toThrow("Repo-wide allowlist");

    await expect(
      stageAllowlist({
        ctx: ctx as never,
        allow: ["src"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toMatchObject<CliError>({
      code: "E_USAGE",
      message: "No changes to stage (working tree clean)",
    });

    const ctxNoMatch = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue([".agentplane/tasks.json"]),
        stage: vi.fn(),
      },
    };
    await expect(
      stageAllowlist({
        ctx: ctxNoMatch as never,
        allow: [".agentplane/tasks.json"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    await expect(
      stageAllowlist({
        ctx: ctxNoMatch as never,
        allow: [".agentplane/tasks.json"],
        allowTasks: false,
        tasksPath: ".agentplane/tasks.json",
      }),
    ).rejects.toThrow("No changes matched allowed prefixes");

    const ctxOk = {
      git: {
        statusChangedPaths: vi.fn().mockResolvedValue(["src/a.ts", "src/b.ts", "docs/readme.md"]),
        stage: vi.fn().mockResolvedValue(),
      },
    };
    const staged = await stageAllowlist({
      ctx: ctxOk as never,
      allow: ["src", "./src", "src/a.ts", "src//"],
      allowTasks: false,
      tasksPath: ".agentplane/tasks.json",
    });
    expect(staged).toEqual(["src/a.ts", "src/b.ts"]);
    expect(ctxOk.git.stage).toHaveBeenCalledWith(["src/a.ts", "src/b.ts"]);
  });
});
