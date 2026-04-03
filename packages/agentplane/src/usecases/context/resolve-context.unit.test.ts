import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../../commands/shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  buildAdapters: vi.fn(),
  PolicyEngine: vi.fn(),
  resolveHarnessFromCommandContext: vi.fn(),
}));

vi.mock("../../adapters/index.js", () => ({
  buildAdapters: mocks.buildAdapters,
}));

vi.mock("../../policy/engine.js", () => ({
  PolicyEngine: mocks.PolicyEngine,
}));

vi.mock("../../runtime/harness/index.js", () => ({
  resolveHarnessFromCommandContext: mocks.resolveHarnessFromCommandContext,
}));

describe("resolve-context usecase factories (unit)", () => {
  beforeEach(() => {
    mocks.buildAdapters.mockReset();
    mocks.PolicyEngine.mockReset();
    mocks.resolveHarnessFromCommandContext.mockReset();
    mocks.buildAdapters.mockReturnValue({ adapters: true });
    mocks.PolicyEngine.mockImplementation(function PolicyEngine() {
      return { policy: true };
    });
    mocks.resolveHarnessFromCommandContext.mockResolvedValue({
      execution: { profile: "balanced" },
      policy: { approvals: { require_plan: true, require_network: false, require_verify: true } },
    });
  });

  it("builds a canonical read-only execution context", async () => {
    const { makeReadOnlyUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: { projection_read_mode: "native" } },
    } as unknown as CommandContext;

    await expect(makeReadOnlyUsecaseContext(command)).resolves.toEqual({
      command,
      project: command.resolvedProject,
      repo: {
        git_root: "/repo",
        agentplane_dir: "/repo/.agentplane",
        workflow_dir: ".agentplane/tasks",
      },
      config: command.config,
      backend: {
        id: "local",
        config_path: "/repo/.agentplane/backends/local.json",
        capabilities: { projection_read_mode: "native" },
        task_backend: command.taskBackend,
      },
      harness: {
        execution: { profile: "balanced" },
        policy: {
          approvals: { require_plan: true, require_network: false, require_verify: true },
        },
      },
      execution: { profile: "balanced" },
      approvals: { require_plan: true, require_network: false, require_verify: true },
      policy: { policy: true },
    });
    expect(mocks.buildAdapters).not.toHaveBeenCalled();
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
    expect(mocks.resolveHarnessFromCommandContext).toHaveBeenCalledWith(command);
  });

  it("memoizes the read-only context per command", async () => {
    const { makeReadOnlyUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: null },
    } as unknown as CommandContext;

    const first = await makeReadOnlyUsecaseContext(command);
    const second = await makeReadOnlyUsecaseContext(command);

    expect(second).toBe(first);
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
    expect(mocks.resolveHarnessFromCommandContext).toHaveBeenCalledTimes(1);
  });

  it("still builds the full usecase context when callers need it", async () => {
    const { makeUsecaseContext } = await import("./resolve-context.js");
    const command = {
      backendId: "local",
      backendConfigPath: "/repo/.agentplane/backends/local.json",
      resolvedProject: {
        gitRoot: "/repo",
        agentplaneDir: "/repo/.agentplane",
      },
      config: {
        paths: { workflow_dir: ".agentplane/tasks" },
      },
      taskBackend: { capabilities: null },
    } as unknown as CommandContext;

    await expect(makeUsecaseContext(command)).resolves.toMatchObject({
      command,
      adapters: { adapters: true },
      execution: { profile: "balanced" },
      approvals: { require_plan: true, require_network: false, require_verify: true },
      policy: { policy: true },
    });
    expect(mocks.buildAdapters).toHaveBeenCalledWith(command);
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
  });
});
