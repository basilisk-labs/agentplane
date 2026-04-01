import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CommandContext } from "../../commands/shared/task-backend.js";

const mocks = vi.hoisted(() => ({
  buildAdapters: vi.fn(),
  PolicyEngine: vi.fn(),
}));

vi.mock("../../adapters/index.js", () => ({
  buildAdapters: mocks.buildAdapters,
}));

vi.mock("../../policy/engine.js", () => ({
  PolicyEngine: mocks.PolicyEngine,
}));

describe("resolve-context usecase factories (unit)", () => {
  beforeEach(() => {
    mocks.buildAdapters.mockReset();
    mocks.PolicyEngine.mockReset();
    mocks.buildAdapters.mockReturnValue({ adapters: true });
    mocks.PolicyEngine.mockImplementation(function PolicyEngine() {
      return { policy: true };
    });
  });

  it("keeps read-only usecase context allocation-free", async () => {
    const { makeReadOnlyUsecaseContext } = await import("./resolve-context.js");
    const command = { backendId: "local" } as CommandContext;

    expect(makeReadOnlyUsecaseContext(command)).toEqual({ command });
    expect(mocks.buildAdapters).not.toHaveBeenCalled();
    expect(mocks.PolicyEngine).not.toHaveBeenCalled();
  });

  it("still builds the full usecase context when callers need it", async () => {
    const { makeUsecaseContext } = await import("./resolve-context.js");
    const command = { backendId: "local" } as CommandContext;

    expect(makeUsecaseContext(command)).toEqual({
      command,
      adapters: { adapters: true },
      policy: { policy: true },
    });
    expect(mocks.buildAdapters).toHaveBeenCalledWith(command);
    expect(mocks.PolicyEngine).toHaveBeenCalledTimes(1);
  });
});
