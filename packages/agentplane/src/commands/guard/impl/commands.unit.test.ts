import { describe, expect, it, vi } from "vitest";

import { CliError } from "../../../shared/errors.js";

const mocks = vi.hoisted(() => ({
  mapCoreError: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  suggestAllowPrefixes: vi.fn(),
  buildCloseCommitMessage: vi.fn(),
  taskReadmePathForTask: vi.fn(),
  buildGitCommitEnv: vi.fn(),
  guardCommitCheck: vi.fn(),
}));

vi.mock("../../../cli/error-map.js", () => ({ mapCoreError: mocks.mapCoreError }));
vi.mock("../../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));
vi.mock("./allow.js", () => ({ suggestAllowPrefixes: mocks.suggestAllowPrefixes }));
vi.mock("./close-message.js", () => ({
  buildCloseCommitMessage: mocks.buildCloseCommitMessage,
  taskReadmePathForTask: mocks.taskReadmePathForTask,
}));
vi.mock("./env.js", () => ({ buildGitCommitEnv: mocks.buildGitCommitEnv }));
vi.mock("./policy.js", () => ({ guardCommitCheck: mocks.guardCommitCheck }));

function mkCtx() {
  return {
    resolvedProject: { gitRoot: "/repo" },
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    git: {
      statusStagedPaths: vi.fn().mockResolvedValue([]),
      stage: vi.fn().mockResolvedValue(),
      commit: vi.fn().mockResolvedValue(),
      headHashSubject: vi.fn().mockResolvedValue({ hash: "abcdef123456", subject: "subject" }),
    },
  };
}

describe("guard/impl/commands", () => {
  it("cmdCommit non-close path commits with env and provided ctx", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-1" });
    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-1",
      message: "✅ ABC123 task: message",
      close: false,
      allow: ["src"],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });
    expect(rc).toBe(0);
    expect(mocks.guardCommitCheck).toHaveBeenCalledTimes(1);
    expect(ctx.git.commit).toHaveBeenCalledWith({
      message: "✅ ABC123 task: message",
      env: { AGENTPLANE_TASK_ID: "T-1" },
    });
  });

  it("cmdCommit close path stages absolute README when outside gitRoot", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    mocks.loadTaskFromContext.mockResolvedValue({ id: "T-2" });
    mocks.buildCloseCommitMessage.mockResolvedValue({
      subject: "✅ ABC123 close: done",
      body: "body",
    });
    mocks.taskReadmePathForTask.mockReturnValue("/outside/README.md");
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-2" });
    const rc = await cmdCommit({
      ctx: ctx as never,
      cwd: "/repo",
      taskId: "T-2",
      message: "",
      close: true,
      allow: [],
      autoAllow: false,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });
    expect(rc).toBe(0);
    expect(ctx.git.stage).toHaveBeenCalledWith(["/outside/README.md"]);
  });

  it("cmdCommit auto-allow fails when staged list is empty", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    ctx.git.statusStagedPaths.mockResolvedValue([]);
    mocks.suggestAllowPrefixes.mockReturnValue([]);
    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-3",
        message: "✅ ABC123 task: message",
        close: false,
        allow: [],
        autoAllow: true,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toMatchObject<CliError>({ code: "E_GIT" });
  });

  it("cmdCommit maps unknown errors via mapCoreError when not git-commit shaped", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    const mapped = new CliError({ exitCode: 1, code: "E_IO", message: "mapped" });
    mocks.mapCoreError.mockReturnValue(mapped);
    ctx.git.commit.mockRejectedValue(new Error("boom"));
    await expect(
      cmdCommit({
        ctx: ctx as never,
        cwd: "/repo",
        taskId: "T-4",
        message: "✅ ABC123 task: message",
        close: false,
        allow: ["src"],
        autoAllow: false,
        allowTasks: false,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: false,
        quiet: true,
      }),
    ).rejects.toBe(mapped);
  });

  it("cmdCommit non-close auto-allow resolves ctx when absent and uses inferred allowlist", async () => {
    const { cmdCommit } = await import("./commands.js");
    const ctx = mkCtx();
    (ctx.git.statusStagedPaths as ReturnType<typeof vi.fn>).mockResolvedValue(["src/app.ts"]);
    mocks.loadCommandContext.mockResolvedValue(ctx);
    mocks.suggestAllowPrefixes.mockReturnValue(["src"]);
    mocks.buildGitCommitEnv.mockReturnValue({ AGENTPLANE_TASK_ID: "T-5" });

    const rc = await cmdCommit({
      cwd: "/repo",
      taskId: "T-5",
      message: "✅ ABC123 task: auto allow",
      close: false,
      allow: [],
      autoAllow: true,
      allowTasks: false,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
      requireClean: false,
      quiet: true,
    });
    expect(rc).toBe(0);
    expect(mocks.loadCommandContext).toHaveBeenCalled();
    expect(mocks.guardCommitCheck).toHaveBeenCalledWith(
      expect.objectContaining({ allow: ["src"] }),
    );
    expect(ctx.git.commit).toHaveBeenCalledWith({
      message: "✅ ABC123 task: auto allow",
      env: { AGENTPLANE_TASK_ID: "T-5" },
    });
  });
});
