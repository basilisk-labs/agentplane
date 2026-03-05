import { defaultConfig, type ResolvedProject } from "@agentplaneorg/core";
import { describe, expect, it, vi } from "vitest";

import type { CommandContext } from "./task-backend.js";
import { ensureReconciledBeforeMutation } from "./reconcile-check.js";

function mkCtx(overrides?: Partial<CommandContext>): CommandContext {
  const resolved = {
    gitRoot: "/repo",
    agentplaneDir: "/repo/.agentplane",
  } as unknown as ResolvedProject;
  const config = defaultConfig();
  const backend = {
    id: "mock",
    listTasks: vi.fn().mockResolvedValue([]),
    getTask: vi.fn().mockResolvedValue(null),
    writeTask: vi.fn().mockResolvedValue(),
    getLastListWarnings: vi.fn().mockReturnValue([]),
  };
  const ctx: CommandContext = {
    resolvedProject: resolved,
    config,
    taskBackend: backend,
    backendId: "mock",
    backendConfigPath: "/repo/.agentplane/backends/local/backend.json",
    git: {
      statusChangedPaths: vi.fn().mockResolvedValue([]),
    } as unknown as CommandContext["git"],
    memo: {},
    resolved,
    backend: backend as unknown as CommandContext["backend"],
  };
  return { ...ctx, ...overrides };
}

describe("commands/shared/reconcile-check", () => {
  it("passes when git status is readable and strict task scan has no warnings", async () => {
    const ctx = mkCtx();
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "finish" }),
    ).resolves.toBeUndefined();
  });

  it("returns E_GIT with reason_code when git status cannot be inspected", async () => {
    const ctx = mkCtx({
      git: {
        statusChangedPaths: vi.fn().mockRejectedValue(new Error("fatal: not a git repository")),
      } as unknown as CommandContext["git"],
    });
    await expect(ensureReconciledBeforeMutation({ ctx, command: "finish" })).rejects.toMatchObject({
      code: "E_GIT",
      context: { command: "finish", reason_code: "reconcile_git_state_unreadable" },
    });
  });

  it("returns E_VALIDATION with reason_code when task scan fails", async () => {
    const ctx = mkCtx({
      taskBackend: {
        id: "mock",
        listTasks: vi.fn().mockRejectedValue(new Error("parse failure")),
        getTask: vi.fn().mockResolvedValue(null),
        writeTask: vi.fn().mockResolvedValue(),
        getLastListWarnings: vi.fn().mockReturnValue([]),
      } as unknown as CommandContext["taskBackend"],
    });
    await expect(ensureReconciledBeforeMutation({ ctx, command: "verify" })).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { command: "verify", reason_code: "reconcile_task_scan_failed" },
    });
  });

  it("returns E_VALIDATION with reason_code when task scan reports skipped files", async () => {
    const ctx = mkCtx({
      taskBackend: {
        id: "mock",
        listTasks: vi.fn().mockResolvedValue([]),
        getTask: vi.fn().mockResolvedValue(null),
        writeTask: vi.fn().mockResolvedValue(),
        getLastListWarnings: vi
          .fn()
          .mockReturnValue(["skip:T-1: invalid_readme_frontmatter", "skip:T-2: unreadable_readme"]),
      } as unknown as CommandContext["taskBackend"],
    });
    await expect(ensureReconciledBeforeMutation({ ctx, command: "commit" })).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        command: "commit",
        reason_code: "reconcile_task_scan_incomplete",
        warning_count: 2,
      },
    });
  });

  it("skips task scan when strictTaskScan=false", async () => {
    const listTasks = vi.fn().mockRejectedValue(new Error("should not run"));
    const ctx = mkCtx({
      taskBackend: {
        id: "mock",
        listTasks,
        getTask: vi.fn().mockResolvedValue(null),
        writeTask: vi.fn().mockResolvedValue(),
        getLastListWarnings: vi.fn().mockReturnValue(["skip:bad"]),
      } as unknown as CommandContext["taskBackend"],
    });
    await expect(
      ensureReconciledBeforeMutation({ ctx, command: "commit", strictTaskScan: false }),
    ).resolves.toBeUndefined();
    expect(listTasks).not.toHaveBeenCalled();
  });
});
