import { describe, expect, it } from "vitest";

import { stripAnsi, visibleLen } from "./ansi.js";

describe("ansi utils", () => {
  it("strips ansi escape codes", () => {
    expect(stripAnsi("\u001B[36mhello\u001B[0m")).toBe("hello");
  });

  it("computes visible length from ansi-colored strings", () => {
    expect(visibleLen("\u001B[1magent\u001B[0m/\u001B[36mplane\u001B[0m")).toBe(11);
  });
});
