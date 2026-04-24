import { describe, expect, it, vi } from "vitest";

import { InitAborted } from "../prompts.js";

import { promptConflictResolverStep } from "./conflict-resolver.js";
import type { InitPromptClack } from "./contracts.js";

const mocks = vi.hoisted(() => {
  const cancelSymbol = Symbol("cancel");
  return {
    cancelSymbol,
    cancelMock: vi.fn(),
    isCancelMock: vi.fn((value: unknown) => value === cancelSymbol),
    noteMock: vi.fn(),
    selectMock: vi.fn(),
  };
});

function clackMock(): InitPromptClack & { note: (message: string, title?: string) => void } {
  return {
    cancel: mocks.cancelMock,
    isCancel: mocks.isCancelMock,
    note: mocks.noteMock,
    select: mocks.selectMock,
    confirm: vi.fn(),
    text: vi.fn(),
  };
}

function resetMocks(): void {
  mocks.cancelMock.mockReset();
  mocks.isCancelMock.mockClear();
  mocks.noteMock.mockReset();
  mocks.selectMock.mockReset();
}

describe("init conflict resolver step", () => {
  it("returns overwrite for overwrite selection", async () => {
    resetMocks();
    mocks.selectMock.mockResolvedValueOnce("overwrite");

    await expect(
      promptConflictResolverStep({
        clack: clackMock(),
        gitRoot: "/repo",
        conflicts: ["/repo/.agentplane/config.json"],
      }),
    ).resolves.toBe("overwrite");

    expect(mocks.noteMock).toHaveBeenCalledWith(
      "- .agentplane/config.json",
      "Init conflicts detected",
    );
  });

  it("returns backup for backup selection", async () => {
    resetMocks();
    mocks.selectMock.mockResolvedValueOnce("backup");

    await expect(
      promptConflictResolverStep({
        clack: clackMock(),
        gitRoot: "/repo",
        conflicts: ["/repo/.agentplane/backends/local/backend.json"],
      }),
    ).resolves.toBe("backup");
  });

  it("throws InitAborted for explicit cancel selection", async () => {
    resetMocks();
    mocks.selectMock.mockResolvedValueOnce("cancel");

    await expect(
      promptConflictResolverStep({
        clack: clackMock(),
        gitRoot: "/repo",
        conflicts: ["/repo/.agentplane/config.json"],
      }),
    ).rejects.toBeInstanceOf(InitAborted);

    expect(mocks.cancelMock).toHaveBeenCalledWith("Init cancelled during conflict resolution.");
  });

  it("skips prompt when there are no conflicts", async () => {
    resetMocks();

    await expect(
      promptConflictResolverStep({
        clack: clackMock(),
        gitRoot: "/repo",
        conflicts: [],
      }),
    ).resolves.toBeNull();

    expect(mocks.noteMock).not.toHaveBeenCalled();
    expect(mocks.selectMock).not.toHaveBeenCalled();
  });
});
