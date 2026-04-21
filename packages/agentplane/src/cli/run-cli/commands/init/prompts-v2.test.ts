import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  assertNotCancelled,
  InitAborted,
  loadInitV2ClackPrompts,
  shouldUseInitV2ClackPrompts,
} from "./prompts-v2.js";

const mocks = vi.hoisted(() => {
  const cancelSymbol = Symbol("cancel");
  return {
    cancelSymbol,
    cancelMock: vi.fn(),
    isCancelMock: vi.fn((value: unknown) => value === cancelSymbol),
    selectMock: vi.fn(),
  };
});

vi.mock("@clack/prompts", () => ({
  cancel: mocks.cancelMock,
  isCancel: mocks.isCancelMock,
  select: mocks.selectMock,
}));

const originalStdinIsTty = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
const originalStdoutIsTty = Object.getOwnPropertyDescriptor(process.stdout, "isTTY");
const originalPromptMode = process.env.AGENTPLANE_PROMPTS;

function setTty(enabled: boolean): void {
  Object.defineProperty(process.stdin, "isTTY", {
    value: enabled,
    configurable: true,
  });
  Object.defineProperty(process.stdout, "isTTY", {
    value: enabled,
    configurable: true,
  });
}

function restoreTty(): void {
  if (originalStdinIsTty) {
    Object.defineProperty(process.stdin, "isTTY", originalStdinIsTty);
  } else {
    delete (process.stdin as { isTTY?: boolean }).isTTY;
  }
  if (originalStdoutIsTty) {
    Object.defineProperty(process.stdout, "isTTY", originalStdoutIsTty);
  } else {
    delete (process.stdout as { isTTY?: boolean }).isTTY;
  }
}

describe("init prompts v2 loader", () => {
  beforeEach(() => {
    setTty(false);
    if (originalPromptMode === undefined) {
      delete process.env.AGENTPLANE_PROMPTS;
    } else {
      process.env.AGENTPLANE_PROMPTS = originalPromptMode;
    }
    mocks.cancelMock.mockReset();
    mocks.isCancelMock.mockClear();
    mocks.selectMock.mockReset();
  });

  afterEach(() => {
    restoreTty();
    if (originalPromptMode === undefined) {
      delete process.env.AGENTPLANE_PROMPTS;
    } else {
      process.env.AGENTPLANE_PROMPTS = originalPromptMode;
    }
  });

  it("does not load Clack when init runs in plain or non-TTY mode", async () => {
    setTty(false);
    await expect(loadInitV2ClackPrompts()).resolves.toBeNull();
    expect(shouldUseInitV2ClackPrompts()).toBe(false);

    setTty(true);
    process.env.AGENTPLANE_PROMPTS = "plain";
    await expect(loadInitV2ClackPrompts()).resolves.toBeNull();
    expect(shouldUseInitV2ClackPrompts()).toBe(false);
  });

  it("loads and reuses the same Clack module in interactive mode", async () => {
    setTty(true);

    const first = await loadInitV2ClackPrompts();
    const second = await loadInitV2ClackPrompts();

    expect(first).not.toBeNull();
    expect(second).toBe(first);
    expect(first?.select).toBe(mocks.selectMock);
  });

  it("propagates cancelled prompts as InitAborted", () => {
    expect(() =>
      assertNotCancelled(
        {
          cancel: mocks.cancelMock,
          isCancel: mocks.isCancelMock,
        },
        mocks.cancelSymbol,
        "Setup aborted.",
      ),
    ).toThrow(InitAborted);
    expect(mocks.cancelMock).toHaveBeenCalledWith("Setup aborted.");
  });

  it("returns non-cancelled values unchanged", () => {
    const value = assertNotCancelled(
      {
        cancel: mocks.cancelMock,
        isCancel: mocks.isCancelMock,
      },
      "normal",
    );

    expect(value).toBe("normal");
    expect(mocks.cancelMock).not.toHaveBeenCalled();
  });
});
