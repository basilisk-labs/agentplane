import { describe, expect, it } from "vitest";

import { buildGitCommitEnv } from "./index.js";

describe("guard/buildGitCommitEnv", () => {
  it("never enables allow-base unless explicitly requested", () => {
    const env = buildGitCommitEnv({
      taskId: "202601010101-ABCDEF",
      allowTasks: true,
      allowBase: false,
    });
    expect(env.AGENTPLANE_TASK_ID).toBe("202601010101-ABCDEF");
    expect(env.AGENTPLANE_ALLOW_TASKS).toBe("1");
    expect(env.AGENTPLANE_ALLOW_BASE).toBe("0");
  });
});
