import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { captureStdIO } from "@agentplane/testkit";
import { confirmPrompt, selectPrompt, textPrompt } from "./prompts.js";

const mocks = vi.hoisted(() => {
  const state = { nextAnswer: "" };
  const questionMock = vi.fn(() => state.nextAnswer);
  const closeMock = vi.fn();
  const createInterfaceMock = vi.fn(() => ({ question: questionMock, close: closeMock }));
  const cancelSymbol = Symbol("cancel");
  const selectMock = vi.fn();
  const confirmMock = vi.fn();
  const textMock = vi.fn();
  const cancelMock = vi.fn();
  const isCancelMock = vi.fn((value: unknown) => value === cancelSymbol);
  return {
    state,
    questionMock,
    closeMock,
    createInterfaceMock,
    cancelSymbol,
    selectMock,
    confirmMock,
    textMock,
    cancelMock,
    isCancelMock,
  };
});

vi.mock("node:readline/promises", () => ({
  createInterface: mocks.createInterfaceMock,
}));

vi.mock("@clack/prompts", () => ({
  select: mocks.selectMock,
  confirm: mocks.confirmMock,
  text: mocks.textMock,
  cancel: mocks.cancelMock,
  isCancel: mocks.isCancelMock,
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

describe("cli/prompts", () => {
  beforeEach(() => {
    setTty(false);
    if (originalPromptMode === undefined) {
      delete process.env.AGENTPLANE_PROMPTS;
    } else {
      process.env.AGENTPLANE_PROMPTS = originalPromptMode;
    }
    mocks.state.nextAnswer = "";
    mocks.questionMock.mockReset().mockImplementation(() => mocks.state.nextAnswer);
    mocks.closeMock.mockReset();
    mocks.createInterfaceMock.mockReset().mockImplementation(() => ({
      question: mocks.questionMock,
      close: mocks.closeMock,
    }));
    mocks.selectMock.mockReset();
    mocks.confirmMock.mockReset();
    mocks.textMock.mockReset();
    mocks.cancelMock.mockReset();
    mocks.isCancelMock.mockClear();
  });

  afterEach(() => {
    restoreTty();
    if (originalPromptMode === undefined) {
      delete process.env.AGENTPLANE_PROMPTS;
    } else {
      process.env.AGENTPLANE_PROMPTS = originalPromptMode;
    }
  });

  it("selectPrompt returns default on empty input", async () => {
    mocks.state.nextAnswer = "   ";

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("a");
    expect(mocks.createInterfaceMock).toHaveBeenCalledOnce();
    expect(mocks.closeMock).toHaveBeenCalledOnce();
  });

  it("selectPrompt returns selected value when valid", async () => {
    mocks.state.nextAnswer = "b";

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("b");
  });

  it("selectPrompt warns and returns default on invalid choice", async () => {
    mocks.state.nextAnswer = "nope";
    const io = captureStdIO();

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("a");
    io.restore();

    expect(io.stdout).toContain("Invalid choice; using default a");
  });

  it("confirmPrompt uses default when input is empty", async () => {
    mocks.state.nextAnswer = "";

    await expect(confirmPrompt("Continue", true)).resolves.toBe(true);
    await expect(confirmPrompt("Continue", false)).resolves.toBe(false);
  });

  it("confirmPrompt parses affirmative and negative inputs", async () => {
    mocks.state.nextAnswer = "yes";
    await expect(confirmPrompt("Continue", false)).resolves.toBe(true);

    mocks.state.nextAnswer = "no";
    await expect(confirmPrompt("Continue", true)).resolves.toBe(false);
  });

  it("confirmPrompt falls back to default for invalid input", async () => {
    mocks.state.nextAnswer = "definitely";
    await expect(confirmPrompt("Continue", true)).resolves.toBe(true);

    mocks.state.nextAnswer = "definitely";
    await expect(confirmPrompt("Continue", false)).resolves.toBe(false);
  });

  it("textPrompt trims input", async () => {
    mocks.state.nextAnswer = "  hello ";

    await expect(textPrompt("Name: ")).resolves.toBe("hello");
  });

  it("uses clack select in TTY mode", async () => {
    setTty(true);
    mocks.selectMock.mockResolvedValue("b");

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("b");
    expect(mocks.selectMock).toHaveBeenCalledWith({
      message: "Pick",
      options: [
        { value: "a", label: "a" },
        { value: "b", label: "b" },
      ],
      initialValue: "a",
    });
    expect(mocks.createInterfaceMock).not.toHaveBeenCalled();
  });

  it("uses clack confirm in TTY mode", async () => {
    setTty(true);
    mocks.confirmMock.mockResolvedValue(false);

    await expect(confirmPrompt("Continue", true)).resolves.toBe(false);
    expect(mocks.confirmMock).toHaveBeenCalledWith({
      message: "Continue",
      initialValue: true,
    });
    expect(mocks.createInterfaceMock).not.toHaveBeenCalled();
  });

  it("uses clack text in TTY mode", async () => {
    setTty(true);
    mocks.textMock.mockResolvedValue("  hello ");

    await expect(textPrompt("Name")).resolves.toBe("hello");
    expect(mocks.textMock).toHaveBeenCalledWith({ message: "Name" });
    expect(mocks.createInterfaceMock).not.toHaveBeenCalled();
  });

  it("falls back to deterministic readline prompts when clack is disabled", async () => {
    setTty(true);
    process.env.AGENTPLANE_PROMPTS = "plain";
    mocks.state.nextAnswer = "b";

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("b");
    expect(mocks.selectMock).not.toHaveBeenCalled();
    expect(mocks.createInterfaceMock).toHaveBeenCalledOnce();
  });

  it("uses defaults when clack prompts are cancelled", async () => {
    setTty(true);
    mocks.selectMock.mockResolvedValue(mocks.cancelSymbol);
    mocks.confirmMock.mockResolvedValue(mocks.cancelSymbol);
    mocks.textMock.mockResolvedValue(mocks.cancelSymbol);

    await expect(selectPrompt("Pick", ["a", "b"], "a")).resolves.toBe("a");
    await expect(confirmPrompt("Continue", true)).resolves.toBe(true);
    await expect(textPrompt("Name")).resolves.toBe("");
    expect(mocks.cancelMock).toHaveBeenCalledTimes(3);
  });
});
