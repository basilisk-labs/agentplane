import { describe } from "vitest";

import {
  captureStdIO,
  expect,
  it,
  mkGitRepoRoot,
  runCli,
  seedTaskQueryFixture,
  useRunCliIntegrationHarness,
} from "@agentplane/testkit/cli-core-tasks-query";

useRunCliIntegrationHarness();

describe("runCli task list active summary", () => {
  it("defaults to active tasks and keeps full history behind --all", async () => {
    const root = await mkGitRepoRoot();
    await seedTaskQueryFixture(root, [
      {
        id: "202603010300-AAAAAA",
        title: "Active task",
        description: "Visible by default",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
      },
      {
        id: "202603010301-BBBBBB",
        title: "Closed task",
        description: "Historical task",
        status: "DONE",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
        commit: { hash: "abcdef1", message: "close task" },
      },
    ]);

    const activeIo = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(activeIo.stdout).toContain("202603010300-AAAAAA");
      expect(activeIo.stdout).not.toContain("202603010301-BBBBBB");
      expect(activeIo.stdout).toContain("Total: 1 (TODO=1)");
    } finally {
      activeIo.restore();
    }

    const allIo = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--all", "--root", root]);
      expect(code).toBe(0);
      expect(allIo.stdout).toContain("202603010300-AAAAAA");
      expect(allIo.stdout).toContain("202603010301-BBBBBB");
      expect(allIo.stdout).toContain("Total: 2 (DONE=1, TODO=1)");
    } finally {
      allIo.restore();
    }
  });

  it("keeps DONE dependencies available while hiding historical tasks by default", async () => {
    const root = await mkGitRepoRoot();
    await seedTaskQueryFixture(root, [
      {
        id: "202603010400-AAAAAA",
        title: "Active task",
        description: "Depends on completed work",
        status: "TODO",
        priority: "med",
        owner: "CODER",
        depends_on: ["202603010401-BBBBBB"],
        tags: ["docs"],
        verify: [],
      },
      {
        id: "202603010401-BBBBBB",
        title: "Closed dependency",
        description: "Historical dependency",
        status: "DONE",
        priority: "med",
        owner: "CODER",
        depends_on: [],
        tags: ["docs"],
        verify: [],
        commit: { hash: "abcdef1", message: "close dependency" },
      },
    ]);

    const io = captureStdIO();
    try {
      const code = await runCli(["task", "list", "--root", root]);
      expect(code).toBe(0);
      expect(io.stdout).toContain("202603010400-AAAAAA");
      expect(io.stdout).toContain("deps=ready");
      expect(io.stdout).not.toContain("202603010401-BBBBBB");
      expect(io.stdout).not.toContain("missing:202603010401-BBBBBB");
      expect(io.stdout).toContain("Total: 1 (TODO=1)");
    } finally {
      io.restore();
    }
  });
});
