import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./git.js", () => {
  return {
    execFileAsync: vi.fn(),
    gitEnv: () => ({}),
  };
});

import { GitContext } from "./git-context.js";
import { execFileAsync } from "./git.js";

describe("commands/shared/GitContext", () => {
  beforeEach(() => {
    vi.mocked(execFileAsync).mockReset();
  });

  it("parses porcelain v1 -z output (spaces, renames, deletes, untracked) and ignores ignored", async () => {
    const mocked = vi.mocked(execFileAsync);
    mocked.mockResolvedValueOnce({
      stdout: Buffer.from(
        [
          " M tracked with space.txt",
          "R  old name.txt",
          "new name.txt",
          " D deleted.txt",
          "?? untracked.txt",
          "!! ignored.txt",
          "",
        ].join("\0"),
        "utf8",
      ),
      stderr: Buffer.from("", "utf8"),
    } as never);

    const git = new GitContext({ gitRoot: "/repo" });
    await expect(git.statusChangedPaths()).resolves.toEqual([
      "deleted.txt",
      "new name.txt",
      "old name.txt",
      "tracked with space.txt",
      "untracked.txt",
    ]);
  });

  it("memoizes porcelain status within a single GitContext instance", async () => {
    const mocked = vi.mocked(execFileAsync);
    mocked.mockResolvedValueOnce({
      stdout: Buffer.from(["?? a.txt", ""].join("\0"), "utf8"),
      stderr: Buffer.from("", "utf8"),
    } as never);

    const git = new GitContext({ gitRoot: "/repo" });
    await expect(git.statusChangedPaths()).resolves.toEqual(["a.txt"]);
    await expect(git.statusChangedPaths()).resolves.toEqual(["a.txt"]);
    expect(mocked).toHaveBeenCalledTimes(1);
  });
});
