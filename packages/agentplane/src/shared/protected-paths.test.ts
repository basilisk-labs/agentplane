import { describe, expect, it } from "vitest";

import { protectedPathAllowPrefixes, protectedPathKindForFile } from "./protected-paths.js";

describe("shared/protected-paths", () => {
  it("treats .agentplane/policy as an allow-policy prefix", () => {
    const prefixes = protectedPathAllowPrefixes({
      tasksPath: ".agentplane/tasks",
      workflowDir: ".agentplane/tasks",
      taskId: "202604061916-2860KH",
      allowPolicy: true,
    });
    expect(prefixes).toContain(".agentplane/policy");
    expect(prefixes).toContain("packages/agentplane/assets/policy");
  });

  it("classifies incidents registry under .agentplane/policy as policy", () => {
    const kind = protectedPathKindForFile({
      filePath: ".agentplane/policy/incidents.md",
      tasksPath: ".agentplane/tasks",
      workflowDir: ".agentplane/tasks",
      taskId: "202604061916-2860KH",
    });
    expect(kind).toBe("policy");
  });

  it("classifies canonical policy assets as policy", () => {
    const kind = protectedPathKindForFile({
      filePath: "packages/agentplane/assets/policy/incidents.md",
      tasksPath: ".agentplane/tasks",
      workflowDir: ".agentplane/tasks",
      taskId: "202604061916-2860KH",
    });
    expect(kind).toBe("policy");
  });
});
