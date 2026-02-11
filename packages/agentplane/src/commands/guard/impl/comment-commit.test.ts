import { describe, expect, it, vi } from "vitest";

import { defaultConfig, type AgentplaneConfig } from "@agentplaneorg/core";

import type { CliError } from "../../../shared/errors.js";
import { captureStdIO } from "../../../cli/run-cli.test-helpers.js";
import type { CommandContext } from "../../shared/task-backend.js";
import { commitFromComment } from "./comment-commit.js";

type FakeGit = {
  statusChangedPaths: ReturnType<typeof vi.fn<() => Promise<string[]>>>;
  statusStagedPaths: ReturnType<typeof vi.fn<() => Promise<string[]>>>;
  statusUnstagedTrackedPaths: ReturnType<typeof vi.fn<() => Promise<string[]>>>;
  stage: ReturnType<typeof vi.fn<(paths: string[]) => Promise<void>>>;
  commit: ReturnType<
    typeof vi.fn<
      (opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }) => Promise<void>
    >
  >;
  headHashSubject: ReturnType<typeof vi.fn<() => Promise<{ hash: string; subject: string }>>>;
};

function makeCtx(git: FakeGit, configOverride?: Partial<AgentplaneConfig>): CommandContext {
  const config = { ...defaultConfig(), ...configOverride } as AgentplaneConfig;
  return {
    resolvedProject: {
      gitRoot: "/tmp/repo",
      agentplaneDir: "/tmp/repo/.agentplane",
      backendConfigPath: "/tmp/repo/.agentplane/backends/local/backend.json",
    },
    config,
    backend: {} as never,
    git: git as unknown as CommandContext["git"],
    memo: {},
  } as CommandContext;
}

function makeGit(): FakeGit {
  return {
    statusChangedPaths: vi.fn<() => Promise<string[]>>(),
    statusStagedPaths: vi.fn<() => Promise<string[]>>(),
    statusUnstagedTrackedPaths: vi.fn<() => Promise<string[]>>(),
    stage: vi.fn<(paths: string[]) => Promise<void>>(),
    commit:
      vi.fn<(opts: { message: string; body?: string; env?: NodeJS.ProcessEnv }) => Promise<void>>(),
    headHashSubject: vi.fn<() => Promise<{ hash: string; subject: string }>>(),
  };
}

describe("commitFromComment", () => {
  it("fails when allowlist is empty and auto-allow is disabled", async () => {
    const git = makeGit();
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: implement test",
        formattedComment: "Start: implement test",
        emoji: "🚧",
        allow: [],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: implement test",
        formattedComment: "Start: implement test",
        emoji: "🚧",
        allow: [],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toThrow("Provide at least one --commit-allow");
  });

  it("fails when auto-allow resolves only protected tasks path", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue([".agentplane/tasks.json"]);
    const cfg = defaultConfig();
    const ctx = makeCtx(git, { paths: cfg.paths });
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: implement test",
        formattedComment: "Start: implement test",
        emoji: "🚧",
        allow: [],
        autoAllow: true,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: cfg,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: implement test",
        formattedComment: "Start: implement test",
        emoji: "🚧",
        allow: [],
        autoAllow: true,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: cfg,
      }),
    ).rejects.toThrow("Provide at least one --commit-allow");
  });

  it("commits using derived message/body from comment metadata", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "1234567890abcdef",
      subject: "🚧 2S7HGD task: implement commit from comment",
    });

    const ctx = makeCtx(git);
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      executorAgent: "CODER",
      author: "CODER",
      statusFrom: "TODO",
      statusTo: "DOING",
      commentBody: "Start: implement commit from comment",
      formattedComment: "Start: implement commit from comment",
      emoji: "🚧",
      allow: ["src"],
      autoAllow: false,
      allowTasks: false,
      requireClean: true,
      quiet: true,
      config: defaultConfig(),
    });

    expect(git.stage).toHaveBeenCalledWith(["src/app.ts"]);
    expect(git.commit).toHaveBeenCalledTimes(1);
    const commitCall = git.commit.mock.calls[0]?.[0];
    expect(commitCall?.message).toBe("🚧 2S7HGD task: implement commit from comment");
    expect(commitCall?.body).toContain("Task: 202602111631-2S7HGD");
    expect(commitCall?.body).toContain("Status: TODO -> DOING");
    expect(commitCall?.body).toContain("Comment: Start: implement commit from comment");
    expect(result.hash).toBe("1234567890abcdef");
    expect(result.message).toContain("2S7HGD task:");
    expect(result.staged).toEqual(["src/app.ts"]);
  });

  it("fails when emoji is empty", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: do work",
        formattedComment: "Start: do work",
        emoji: " ",
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("fails when formatted comment is blank", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: do work",
        formattedComment: "   ",
        emoji: "🚧",
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("fails when formatted comment has only status prefix without summary", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: do work",
        formattedComment: "Start:",
        emoji: "🚧",
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("auto-allow can stage task artifacts when allowTasks=true", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue([".agentplane/tasks.json"]);
    git.statusStagedPaths.mockResolvedValue([".agentplane/tasks.json"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "abcdef1234567890",
      subject: "🚧 2S7HGD task: update task artifacts",
    });
    const cfg = defaultConfig();
    const ctx = makeCtx(git, { paths: cfg.paths });
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      commentBody: "Start: update task artifacts",
      formattedComment: "Start: update task artifacts",
      emoji: "🚧",
      allow: [],
      autoAllow: true,
      allowTasks: true,
      requireClean: false,
      quiet: true,
      config: cfg,
    });
    expect(git.stage).toHaveBeenCalledWith([".agentplane/tasks.json"]);
    expect(result.staged).toEqual([".agentplane/tasks.json"]);
  });

  it("fails with invalid task id when suffix cannot be extracted", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "",
        commentBody: "Start: do work",
        formattedComment: "Start: do work",
        emoji: "🚧",
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_USAGE" });
  });

  it("auto-allow excludes protected non-task paths and prints success when quiet=false", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["AGENTS.md", "src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "feedface12345678",
      subject: "🚧 2S7HGD task: mixed staged set",
    });
    const ctx = makeCtx(git);
    const io = captureStdIO();
    try {
      const result = await commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        commentBody: "Start: mixed staged set",
        formattedComment: "Start: mixed staged set",
        emoji: "🚧",
        allow: [],
        autoAllow: true,
        allowTasks: false,
        requireClean: false,
        quiet: false,
        config: defaultConfig(),
      });
      expect(git.stage).toHaveBeenCalledWith(["src/app.ts"]);
      expect(result.staged).toEqual(["src/app.ts"]);
      expect(io.stdout).toContain("committed");
    } finally {
      io.restore();
    }
  });

  it("supports auto-allow=true with explicit allow list", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "aabbccddeeff0011",
      subject: "🚧 2S7HGD task: explicit allow",
    });
    const ctx = makeCtx(git);
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      commentBody: "Start: explicit allow",
      formattedComment: "Start: explicit allow",
      emoji: "🚧",
      allow: ["src"],
      autoAllow: true,
      allowTasks: false,
      requireClean: false,
      quiet: true,
      config: defaultConfig(),
    });
    expect(result.staged).toEqual(["src/app.ts"]);
  });
});
