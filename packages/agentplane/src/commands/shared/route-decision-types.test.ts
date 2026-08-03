import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { taskSummary } from "./route-decision-types.js";

describe("task route summary", () => {
  it("projects the canonical hash from structured task commit evidence", () => {
    const task = {
      id: "202608030100-C0MM1T",
      title: "Structured commit",
      status: "DOING",
      owner: "CODER",
      commit: { hash: "a".repeat(40), message: "feat: implementation" },
    } as TaskData;

    expect(taskSummary(task).commit).toBe("a".repeat(40));
  });
});
