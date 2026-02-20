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
        primaryTag: "code",
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
        primaryTag: "code",
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

  it("rejects auto-allow mode", async () => {
    const git = makeGit();
    const cfg = defaultConfig();
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        primaryTag: "code",
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
        primaryTag: "code",
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
    ).rejects.toThrow("--commit-auto-allow is disabled");
  });

  it("commits using derived message/body from comment metadata", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "1234567890abcdef",
      subject: "🚧 2S7HGD code: doing",
    });

    const ctx = makeCtx(git);
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      primaryTag: "code",
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
    expect(commitCall?.message).toBe("🚧 2S7HGD code: doing");
    expect(commitCall?.body).toContain("Task: 202602111631-2S7HGD");
    expect(commitCall?.body).toContain("Primary: code");
    expect(commitCall?.body).toContain("Status: DOING");
    expect(commitCall?.body).toContain("Comment: Start: implement commit from comment");
    expect(result.hash).toBe("1234567890abcdef");
    expect(result.message).toContain("2S7HGD code:");
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
        primaryTag: "code",
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

  it("accepts blank formatted comment and falls back to raw comment for body", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "1234567890abcdef",
      subject: "🚧 2S7HGD code: doing",
    });
    const ctx = makeCtx(git);
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      primaryTag: "code",
      commentBody: "Start: do work",
      formattedComment: "   ",
      emoji: "🚧",
      allow: ["src"],
      autoAllow: false,
      allowTasks: false,
      requireClean: false,
      quiet: true,
      config: defaultConfig(),
    });
    expect(result.message).toContain("2S7HGD code: doing");
  });

  it("accepts formatted comment with only prefix for body while keeping status-based subject", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "1234567890abcdef",
      subject: "🚧 2S7HGD code: doing",
    });
    const ctx = makeCtx(git);
    const result = await commitFromComment({
      ctx,
      cwd: "/tmp/repo",
      taskId: "202602111631-2S7HGD",
      primaryTag: "code",
      commentBody: "Start: do work",
      formattedComment: "Start:",
      emoji: "🚧",
      allow: ["src"],
      autoAllow: false,
      allowTasks: false,
      requireClean: false,
      quiet: true,
      config: defaultConfig(),
    });
    expect(result.message).toContain("2S7HGD code: doing");
  });

  it("rejects auto-allow even when allowTasks=true", async () => {
    const git = makeGit();
    const cfg = defaultConfig();
    const ctx = makeCtx(git, { paths: cfg.paths });
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        primaryTag: "code",
        commentBody: "Start: update task artifacts",
        formattedComment: "Start: update task artifacts",
        emoji: "🚧",
        allow: [],
        autoAllow: true,
        allowTasks: true,
        requireClean: false,
        quiet: true,
        config: cfg,
      }),
    ).rejects.toThrow("--commit-auto-allow is disabled");
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
        primaryTag: "code",
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

  it("fails when primary tag is empty", async () => {
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
        primaryTag: "   ",
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
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        primaryTag: "   ",
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
    ).rejects.toThrow("Primary tag is required");
  });

  it("rejects auto-allow before commit output is produced", async () => {
    const git = makeGit();
    const ctx = makeCtx(git);
    const io = captureStdIO();
    try {
      await expect(
        commitFromComment({
          ctx,
          cwd: "/tmp/repo",
          taskId: "202602111631-2S7HGD",
          primaryTag: "code",
          commentBody: "Start: mixed staged set",
          formattedComment: "Start: mixed staged set",
          emoji: "🚧",
          allow: [],
          autoAllow: true,
          allowTasks: false,
          requireClean: false,
          quiet: false,
          config: defaultConfig(),
        }),
      ).rejects.toThrow("--commit-auto-allow is disabled");
      expect(io.stdout.trim()).toBe("");
    } finally {
      io.restore();
    }
  });

  it("rejects auto-allow even with explicit allow list", async () => {
    const git = makeGit();
    const ctx = makeCtx(git);
    await expect(
      commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        primaryTag: "code",
        commentBody: "Start: explicit allow",
        formattedComment: "Start: explicit allow",
        emoji: "🚧",
        allow: ["src"],
        autoAllow: true,
        allowTasks: false,
        requireClean: false,
        quiet: true,
        config: defaultConfig(),
      }),
    ).rejects.toThrow("--commit-auto-allow is disabled");
  });

  it("prints commit summary when quiet=false", async () => {
    const git = makeGit();
    git.statusChangedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusStagedPaths.mockResolvedValue(["src/app.ts"]);
    git.statusUnstagedTrackedPaths.mockResolvedValue([]);
    git.headHashSubject.mockResolvedValue({
      hash: "1234567890abcdef",
      subject: "🚧 2S7HGD code: doing",
    });
    const ctx = makeCtx(git);
    const io = captureStdIO();
    try {
      await commitFromComment({
        ctx,
        cwd: "/tmp/repo",
        taskId: "202602111631-2S7HGD",
        primaryTag: "code",
        commentBody: "Start: do work",
        formattedComment: "Start: do work",
        emoji: "🚧",
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        requireClean: false,
        quiet: false,
        config: defaultConfig(),
      });
      expect(io.stdout).toContain("committed");
      expect(io.stdout).toContain("staged=src/app.ts");
    } finally {
      io.restore();
    }
  });
});
