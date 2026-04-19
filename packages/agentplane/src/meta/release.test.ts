import path from "node:path";
import { fileURLToPath } from "node:url";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mockExistsSync = vi.fn<(p: string) => boolean>();
const mockRunProcessSync =
  vi.fn<
    (
      opts: Record<string, unknown>,
    ) => {
      stdout: string;
    }
  >();

vi.mock("node:fs", () => ({ existsSync: mockExistsSync }));
vi.mock("@agentplaneorg/core", async () => {
  const actual = await vi.importActual<typeof import("@agentplaneorg/core")>("@agentplaneorg/core");
  return {
    ...actual,
    runProcessSync: mockRunProcessSync,
  };
});
vi.mock("./version.js", () => ({ getVersion: () => "1.2.3" }));

function repoRootFromThisFile(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  return path.resolve(here, "../../../../");
}

describe("release meta", () => {
  beforeEach(() => {
    vi.resetModules();
    mockExistsSync.mockReset();
    mockRunProcessSync.mockReset();
  });

  it("returns null when git root cannot be resolved (and does not call git)", async () => {
    mockExistsSync.mockReturnValue(false);

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBeNull();
    expect(mockRunProcessSync).not.toHaveBeenCalled();
  });

  it("returns trimmed tag date and caches it", async () => {
    const cwd = process.cwd();
    mockExistsSync.mockImplementation((p) => p === path.join(cwd, ".git"));
    mockRunProcessSync.mockReturnValue({ stdout: "2026-02-09\n" });

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBe("2026-02-09");
    expect(getReleaseCommitDate()).toBe("2026-02-09");

    expect(mockRunProcessSync).toHaveBeenCalledTimes(1);
    expect(mockRunProcessSync).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "git",
        args: ["-C", cwd, "show", "-s", "--format=%cs", "v1.2.3"],
      }),
    );
  });

  it("returns null when git show fails and caches null", async () => {
    const cwd = process.cwd();
    mockExistsSync.mockImplementation((p) => p === path.join(cwd, ".git"));
    mockRunProcessSync.mockImplementation(() => {
      throw new Error("boom");
    });

    const { getReleaseCommitDate } = await import("./release.js");
    expect(getReleaseCommitDate()).toBeNull();
    expect(getReleaseCommitDate()).toBeNull();
    expect(mockRunProcessSync).toHaveBeenCalledTimes(1);
  });

  it("falls back to locating git root from the package location when CWD is outside repo", async () => {
    const repoRoot = repoRootFromThisFile();
    const cwdSpy = vi.spyOn(process, "cwd").mockReturnValue("/tmp");

    mockExistsSync.mockImplementation((p) => p === path.join(repoRoot, ".git"));
    mockRunProcessSync.mockReturnValue({ stdout: "2026-02-01\n" });

    try {
      const { getReleaseCommitDate } = await import("./release.js");
      expect(getReleaseCommitDate()).toBe("2026-02-01");
      expect(mockRunProcessSync).toHaveBeenCalledWith(
        expect.objectContaining({
          command: "git",
          args: ["-C", repoRoot, "show", "-s", "--format=%cs", "v1.2.3"],
        }),
      );
    } finally {
      cwdSpy.mockRestore();
    }
  });
});
