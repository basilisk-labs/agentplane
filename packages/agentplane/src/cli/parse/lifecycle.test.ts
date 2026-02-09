import { describe, expect, it } from "vitest";

import { parseBlock, parseFinish, parseStart, parseVerify } from "./lifecycle.js";

const usage = { usage: "agentplane start <task-id> --author A --body B", example: "example" };

describe("lifecycle argv parsing (legacy)", () => {
  it("parseStart parses flags and defaults", () => {
    const parsed = parseStart({
      taskIdToken: "T-1",
      args: [
        "--author",
        "CODER",
        "--body",
        "Start: work",
        "--commit-from-comment",
        "--commit-emoji",
        "✨",
        "--commit-allow",
        "packages/agentplane",
        "--commit-auto-allow",
        "--commit-require-clean",
        "--confirm-status-commit",
        "--force",
        "--quiet",
      ],
      usage,
    });
    expect(parsed.taskId).toBe("T-1");
    expect(parsed.author).toBe("CODER");
    expect(parsed.body).toBe("Start: work");
    expect(parsed.commitFromComment).toBe(true);
    expect(parsed.commitEmoji).toBe("✨");
    expect(parsed.commitAllow).toEqual(["packages/agentplane"]);
    expect(parsed.commitAutoAllow).toBe(true);
    expect(parsed.commitAllowTasks).toBe(true);
    expect(parsed.commitRequireClean).toBe(true);
    expect(parsed.confirmStatusCommit).toBe(true);
    expect(parsed.force).toBe(true);
    expect(parsed.quiet).toBe(true);
  });

  it("parseBlock delegates to the same lifecycle parser", () => {
    const parsed = parseBlock({
      taskIdToken: "T-2",
      args: ["--author", "CODER", "--body", "Blocked: reason"],
      usage,
    });
    expect(parsed.taskId).toBe("T-2");
    expect(parsed.body).toBe("Blocked: reason");
  });

  it("parseStart rejects missing task id and unknown flags", () => {
    try {
      parseStart({ taskIdToken: undefined, args: ["--author", "A", "--body", "B"], usage });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
      expect(String((e as { message?: unknown }).message)).toContain("Example:");
    }

    try {
      parseStart({ taskIdToken: "T-1", args: ["--author", "A", "--body", "B", "--nope"], usage });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
      expect(String((e as { message?: unknown }).message)).toContain("Example:");
    }
  });

  it("parseFinish parses multiple task ids and status-commit flags", () => {
    const parsed = parseFinish({
      commandToken: "T-1",
      args: [
        "T-2",
        "--author",
        "CODER",
        "--body",
        "Verified: ok",
        "--commit",
        "abc123",
        "--commit-from-comment",
        "--commit-allow",
        "packages/agentplane",
        "--status-commit",
        "--status-commit-emoji",
        "✅",
        "--status-commit-allow",
        ".agentplane/tasks/T-1",
        "--status-commit-auto-allow",
        "--status-commit-require-clean",
        "--confirm-status-commit",
        "--quiet",
      ],
      usage: {
        usage: "agentplane finish <task-id> [<task-id> ...] --author A --body B",
        example: "ex",
      },
    });
    expect(parsed.taskIds).toEqual(["T-1", "T-2"]);
    expect(parsed.author).toBe("CODER");
    expect(parsed.commit).toBe("abc123");
    expect(parsed.commitFromComment).toBe(true);
    expect(parsed.commitAllow).toEqual(["packages/agentplane"]);
    expect(parsed.statusCommit).toBe(true);
    expect(parsed.statusCommitEmoji).toBe("✅");
    expect(parsed.statusCommitAllow).toEqual([".agentplane/tasks/T-1"]);
    expect(parsed.statusCommitAutoAllow).toBe(true);
    expect(parsed.statusCommitRequireClean).toBe(true);
    expect(parsed.confirmStatusCommit).toBe(true);
    expect(parsed.quiet).toBe(true);
  });

  it("parseFinish rejects missing task ids and missing required flag values", () => {
    try {
      parseFinish({ commandToken: undefined, args: ["--author", "A", "--body", "B"], usage });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
    }

    try {
      parseFinish({
        commandToken: "T-1",
        args: ["--author"],
        usage,
      });
      expect.unreachable();
    } catch (e) {
      expect(e).toHaveProperty("code", "E_USAGE");
    }
  });

  it("parseVerify preserves args", () => {
    const parsed = parseVerify({ taskIdToken: "T-1", args: ["--ok", "--note", "x"], usage });
    expect(parsed.taskId).toBe("T-1");
    expect(parsed.args).toEqual(["--ok", "--note", "x"]);
  });
});
