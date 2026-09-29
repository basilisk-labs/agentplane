import { describe, expect, it, vi } from "vitest";

import { assertConfirmed } from "./answers.js";
import { InitAborted, type InitClackPrompts } from "./prompts.js";

describe("init confirmation", () => {
  it.each([true, false])("preserves the boolean response %s", (value) => {
    const cancel = vi.fn();
    const clack = { cancel, isCancel: () => false } as unknown as InitClackPrompts;

    expect(assertConfirmed(clack, value)).toBe(value);
    expect(cancel).not.toHaveBeenCalled();
  });

  it.each([true, false])("rejects symbols when isCancel returns %s", (recognized) => {
    const cancel = vi.fn();
    const clack = { cancel, isCancel: () => recognized } as unknown as InitClackPrompts;

    expect(() => assertConfirmed(clack, Symbol("cancel"))).toThrow(InitAborted);
    expect(cancel).toHaveBeenCalledWith("Init cancelled before apply.");
  });
});
