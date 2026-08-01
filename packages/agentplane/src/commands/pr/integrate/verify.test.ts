import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  line: vi.fn<(message: string, channel?: "stdout" | "stderr") => void>(),
  success: vi.fn(),
  runShellCommand:
    vi.fn<(command: string, cwd: string) => Promise<{ code: number; output: string }>>(),
}));

vi.mock("../../../cli/output.js", () => ({
  createCliEmitter: () => ({ line: mocks.line, success: mocks.success }),
}));
vi.mock("../../shared/pr-meta.js", () => ({
  extractLastVerifiedSha: vi.fn(),
  runShellCommand: mocks.runShellCommand,
}));

import { runVerifyCommands } from "./verify.js";

describe("pr/integrate verify", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("prints a bounded failure tail before returning the verify error", async () => {
    const output = `discard-me${"x".repeat(32 * 1024)}tail`;
    mocks.runShellCommand.mockResolvedValue({ code: 1, output });

    await expect(
      runVerifyCommands({
        commands: ["bun test"],
        worktreePath: "/repo",
        branchHeadSha: "deadbeef",
        quiet: true,
        taskId: "T-1",
      }),
    ).rejects.toMatchObject({ code: "E_IO" });

    expect(mocks.line).toHaveBeenCalledTimes(1);
    const call = mocks.line.mock.calls[0];
    expect(call).toBeDefined();
    const visibleTail = call?.[0] ?? "";
    const channel = call?.[1];
    expect(channel).toBe("stderr");
    expect(visibleTail).toContain("[verify output truncated; showing final 32768 characters]");
    expect(visibleTail).not.toContain("discard-me");
    expect(visibleTail.endsWith("tail")).toBe(true);
  });
});
