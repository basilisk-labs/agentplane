import { describe, expect, it } from "vitest";

import { TESTKIT_VERSION } from "./index.js";

describe("@agentplane/testkit", () => {
  it("exports version", () => {
    expect(TESTKIT_VERSION).toBeTypeOf("string");
  });
});
