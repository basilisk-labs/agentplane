import { describe, expect, it } from "vitest";

import { inferTaskIdFromBranch } from "./task-context.js";

describe("hook task context", () => {
  it("prefers close branch parsing when task and close prefixes overlap", () => {
    expect(
      inferTaskIdFromBranch(
        "agents/task-close/202605171455-ZS8AE7/39cd91244be1",
        "agents",
        "agents/task-close",
      ),
    ).toBe("202605171455-ZS8AE7");
  });
});
