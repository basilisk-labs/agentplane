import path from "node:path";
import { fileURLToPath } from "node:url";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mockExistsSync = vi.fn<(p: string) => boolean>();
const mockExecFileSync =
  vi.fn<(cmd: string, args: string[], opts: { encoding: string; stdio: unknown }) => string>();

vi.mock("node:fs", () => ({ existsSync: mockExistsSync }));
vi.mock("node:child_process", () => ({ execFileSync: mockExecFileSync }));
vi.mock("./version.js", () => ({ getVersion: () => "1.2.3" }));

function repoRootFromThisFile(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../../../");
}

describe("release meta", () => {
  const originalCwd = process.cwd();

  beforeEach(() => {
    vi.resetModules();
    mockExistsSync.mockReset();
    mockExecFileSync.mockReset();
    process.chdir(originalCwd);
  });

  it("returns null when git root cannot be resolved (and does not call git)", async () => {
    mockExistsSync.mockReturnValue(false);

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBeNull();
    expect(mockExecFileSync).not.toHaveBeenCalled();
  });

  it("returns trimmed tag date and caches it", async () => {
    const cwd = process.cwd();
    mockExistsSync.mockImplementation((p) => p === path.join(cwd, ".git"));
    mockExecFileSync.mockReturnValue("2026-02-09\n");

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBe("2026-02-09");
    expect(getReleaseCommitDate()).toBe("2026-02-09");

    expect(mockExecFileSync).toHaveBeenCalledTimes(1);
    expect(mockExecFileSync).toHaveBeenCalledWith(
      "git",
      ["-C", cwd, "show", "-s", "--format=%cs", "v1.2.3"],
      expect.any(Object),
    );
  });

  it("returns null when git show fails and caches null", async () => {
    const cwd = process.cwd();
    mockExistsSync.mockImplementation((p) => p === path.join(cwd, ".git"));
    mockExecFileSync.mockImplementation(() => {
      throw new Error("boom");
    });

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBeNull();
    expect(getReleaseCommitDate()).toBeNull();
    expect(mockExecFileSync).toHaveBeenCalledTimes(1);
  });

  it("falls back to locating git root from the package location when CWD is outside repo", async () => {
    const repoRoot = repoRootFromThisFile();
    process.chdir("/tmp");

    mockExistsSync.mockImplementation((p) => p === path.join(repoRoot, ".git"));
    mockExecFileSync.mockReturnValue("2026-02-01\n");

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBe("2026-02-01");
    expect(mockExecFileSync).toHaveBeenCalledWith(
      "git",
      ["-C", repoRoot, "show", "-s", "--format=%cs", "v1.2.3"],
      expect.any(Object),
    );
  });
});
