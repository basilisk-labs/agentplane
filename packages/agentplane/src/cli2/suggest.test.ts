import { describe, expect, it } from "vitest";

import { suggestOne } from "./suggest.js";

describe("cli2 suggestOne", () => {
  it("suggests a close match", () => {
    expect(suggestOne("--depnds-on", ["--depends-on", "--verify"])).toBe("--depends-on");
  });

  it("returns null when far", () => {
    expect(suggestOne("x", ["--depends-on"])).toBeNull();
  });
});
