import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  execFileAsync: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: mocks.execFileAsync,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  gitEnv: () => ({}),
}));

describe("taskCloseAlreadyRecordedOnBase", () => {
  beforeEach(() => {
    mocks.execFileAsync.mockReset();
  });

  it("detects a historical close commit for the task readme on base", async () => {
    mocks.execFileAsync.mockResolvedValue({
      stdout: ["chore: unrelated", "✅ G7YHZY close: done (202604191200-G7YHZY)", ""].join("\n"),
      stderr: "",
    });

    const { taskCloseAlreadyRecordedOnBase } = await import("./close-tail-state.js");
    await expect(
      taskCloseAlreadyRecordedOnBase({
        gitRoot: "/repo",
        workflowDir: ".agentplane/tasks",
        taskId: "202604191200-G7YHZY",
        baseBranch: "main",
      }),
    ).resolves.toBe(true);
  });

  it("returns false when base history has no close commit for the task readme", async () => {
    mocks.execFileAsync.mockResolvedValue({
      stdout: ["seed", "feat: task implementation", ""].join("\n"),
      stderr: "",
    });

    const { taskCloseAlreadyRecordedOnBase } = await import("./close-tail-state.js");
    await expect(
      taskCloseAlreadyRecordedOnBase({
        gitRoot: "/repo",
        workflowDir: ".agentplane/tasks",
        taskId: "202604191200-G7YHZY",
        baseBranch: "main",
      }),
    ).resolves.toBe(false);
  });
});
