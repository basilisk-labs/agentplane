import { describe, expect, it } from "vitest";

import { isVerifyStepsFilled, VERIFY_STEPS_PLACEHOLDER } from "./shared.js";

describe("isVerifyStepsFilled", () => {
  it("returns false when the section is missing", () => {
    expect(isVerifyStepsFilled(null)).toBe(false);
  });

  it("returns false when the section is empty or whitespace", () => {
    expect(isVerifyStepsFilled("")).toBe(false);
    expect(isVerifyStepsFilled("   \n\n")).toBe(false);
  });

  it("returns false when the placeholder marker is present", () => {
    expect(isVerifyStepsFilled(VERIFY_STEPS_PLACEHOLDER)).toBe(false);
    expect(isVerifyStepsFilled(`Some text\n${VERIFY_STEPS_PLACEHOLDER}\nMore text`)).toBe(false);
  });

  it("returns true when the section has real content without placeholder", () => {
    expect(isVerifyStepsFilled("### Checks\n\n- bun run test:agentplane")).toBe(true);
  });
});
