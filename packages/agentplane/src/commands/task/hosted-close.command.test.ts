import { describe, expect, it } from "vitest";

import { isExplicitHostedCloseFollowupBranch } from "./hosted-close.command.js";
import type { TaskData } from "../../backends/task-backend.js";

const task = { id: "202605131603-PFXN5E" } as TaskData;

describe("isExplicitHostedCloseFollowupBranch", () => {
  it("accepts explicit post-merge and followup task branches", () => {
    for (const branch of [
      "task/202605131603-PFXN5E/post-merge-hotspot",
      "task/202605131603-PFXN5E/hosted-close-followup",
      "task/202605131603-PFXN5E/followup-hosted-close",
    ]) {
      expect(
        isExplicitHostedCloseFollowupBranch({
          branch,
          taskBranchPrefix: "task",
          task,
        }),
      ).toBe(true);
    }
  });

  it("rejects accidental task id reuse and unrelated task branches", () => {
    for (const branch of [
      "task/202605131603-PFXN5E/accidental-reuse",
      "task/202605131603-PFXN5E/feature",
      "task/202605131604-OTHER/hosted-close-followup",
    ]) {
      expect(
        isExplicitHostedCloseFollowupBranch({
          branch,
          taskBranchPrefix: "task",
          task,
        }),
      ).toBe(false);
    }
  });
});
