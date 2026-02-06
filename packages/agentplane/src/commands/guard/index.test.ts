import { describe, expect, it } from "vitest";

import { buildGitCommitEnv } from "./index.js";

describe("guard/buildGitCommitEnv", () => {
  it("never enables allow-base unless explicitly requested", () => {
    const env = buildGitCommitEnv({
      taskId: "202601010101-ABCDEF",
      allowTasks: true,
      allowBase: false,
      allowPolicy: false,
      allowConfig: false,
      allowHooks: false,
      allowCI: false,
    });
    expect(env.AGENTPLANE_TASK_ID).toBe("202601010101-ABCDEF");
    expect(env.AGENTPLANE_ALLOW_TASKS).toBe("1");
    expect(env.AGENTPLANE_ALLOW_BASE).toBe("0");
    expect(env.AGENTPLANE_ALLOW_POLICY).toBe("0");
    expect(env.AGENTPLANE_ALLOW_CONFIG).toBe("0");
    expect(env.AGENTPLANE_ALLOW_HOOKS).toBe("0");
    expect(env.AGENTPLANE_ALLOW_CI).toBe("0");
  });
});
