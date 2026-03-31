import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { cmdTaskList } from "../../commands/task/list.js";

const mocks = vi.hoisted(() => ({
  cmdTaskList: vi.fn(),
  makeReadOnlyUsecaseContext: vi.fn(),
  makeUsecaseContext: vi.fn(),
}));

vi.mock("../../commands/task/list.js", () => ({
  cmdTaskList: mocks.cmdTaskList,
}));

vi.mock("../context/resolve-context.js", () => ({
  makeReadOnlyUsecaseContext: mocks.makeReadOnlyUsecaseContext,
  makeUsecaseContext: mocks.makeUsecaseContext,
}));

describe("task-list usecase (unit)", () => {
  beforeEach(() => {
    mocks.cmdTaskList.mockReset();
    mocks.makeReadOnlyUsecaseContext.mockReset();
    mocks.makeUsecaseContext.mockReset();
    mocks.cmdTaskList.mockResolvedValue(0);
  });

  it("uses the read-only usecase context for list queries", async () => {
    const cli = { cwd: "/repo", rootOverride: "/root" } as CommandCtx;
    const command = { backendId: "local" } as CommandContext;
    const filters = { quiet: false } as Parameters<typeof cmdTaskList>[0]["filters"];
    mocks.makeReadOnlyUsecaseContext.mockReturnValue({ command });

    const { taskListUsecase } = await import("./task-list-usecase.js");

    await expect(taskListUsecase({ cli, command, filters })).resolves.toBe(0);
    expect(mocks.makeReadOnlyUsecaseContext).toHaveBeenCalledWith(command);
    expect(mocks.makeUsecaseContext).not.toHaveBeenCalled();
    expect(mocks.cmdTaskList).toHaveBeenCalledWith({
      ctx: command,
      cwd: "/repo",
      rootOverride: "/root",
      filters,
    });
  });
});
