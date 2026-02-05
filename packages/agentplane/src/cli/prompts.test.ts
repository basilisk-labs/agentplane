import { beforeEach, describe, expect, it, vi } from "vitest";

import { captureStdIO } from "./run-cli.test-helpers.js";
import { promptChoice, promptInput, promptYesNo } from "./prompts.js";

const mocks = vi.hoisted(() => {
  const state = { nextAnswer: "" };
  const questionMock = vi.fn(() => state.nextAnswer);
  const closeMock = vi.fn();
  const createInterfaceMock = vi.fn(() => ({ question: questionMock, close: closeMock }));
  return { state, questionMock, closeMock, createInterfaceMock };
});

vi.mock("node:readline/promises", () => ({
  createInterface: mocks.createInterfaceMock,
}));

describe("cli/prompts", () => {
  beforeEach(() => {
    mocks.state.nextAnswer = "";
    mocks.questionMock.mockClear();
    mocks.closeMock.mockClear();
    mocks.createInterfaceMock.mockClear();
  });

  it("promptChoice returns default on empty input", async () => {
    mocks.state.nextAnswer = "   ";

    await expect(promptChoice("Pick", ["a", "b"], "a")).resolves.toBe("a");
    expect(mocks.createInterfaceMock).toHaveBeenCalledOnce();
    expect(mocks.closeMock).toHaveBeenCalledOnce();
  });

  it("promptChoice returns selected value when valid", async () => {
    mocks.state.nextAnswer = "b";

    await expect(promptChoice("Pick", ["a", "b"], "a")).resolves.toBe("b");
  });

  it("promptChoice warns and returns default on invalid choice", async () => {
    mocks.state.nextAnswer = "nope";
    const io = captureStdIO();

    await expect(promptChoice("Pick", ["a", "b"], "a")).resolves.toBe("a");
    io.restore();

    expect(io.stdout).toContain("Invalid choice; using default a");
  });

  it("promptYesNo uses default when input is empty", async () => {
    mocks.state.nextAnswer = "";

    await expect(promptYesNo("Continue", true)).resolves.toBe(true);
    await expect(promptYesNo("Continue", false)).resolves.toBe(false);
  });

  it("promptYesNo parses affirmative and negative inputs", async () => {
    mocks.state.nextAnswer = "yes";
    await expect(promptYesNo("Continue", false)).resolves.toBe(true);

    mocks.state.nextAnswer = "no";
    await expect(promptYesNo("Continue", true)).resolves.toBe(false);
  });

  it("promptInput trims input", async () => {
    mocks.state.nextAnswer = "  hello ";

    await expect(promptInput("Name: ")).resolves.toBe("hello");
  });
});
