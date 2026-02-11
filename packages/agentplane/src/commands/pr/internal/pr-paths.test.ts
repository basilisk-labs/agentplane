import path from "node:path";

import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  resolveProject: vi.fn(),
  loadConfig: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  gitShowFile: vi.fn(),
}));

vi.mock("@agentplaneorg/core", () => ({
  resolveProject: mocks.resolveProject,
  loadConfig: mocks.loadConfig,
}));
vi.mock("../../../cli/fs-utils.js", () => ({ fileExists: mocks.fileExists }));
vi.mock("node:fs/promises", () => ({ readFile: mocks.readFile }));
vi.mock("../../shared/git-diff.js", () => ({
  toGitPath: (value: string) => value.replaceAll("\\", "/"),
  gitShowFile: mocks.gitShowFile,
}));

describe("pr/internal/pr-paths", () => {
  it("resolvePrPaths uses ctx data when provided", async () => {
    const { resolvePrPaths } = await import("./pr-paths.js");
    const cfg = { paths: { workflow_dir: ".agentplane/tasks" } };
    const resolved = await resolvePrPaths({
      ctx: {
        resolvedProject: {
          gitRoot: "/repo",
          agentplaneDir: "/repo/.agentplane",
        },
        config: cfg,
      } as unknown as Parameters<typeof resolvePrPaths>[0]["ctx"],
      cwd: "/repo",
      taskId: "T-1",
    });
    expect(resolved.prDir).toBe(path.join("/repo", ".agentplane/tasks", "T-1", "pr"));
    expect(resolved.metaPath).toBe(
      path.join("/repo", ".agentplane/tasks", "T-1", "pr", "meta.json"),
    );
  });

  it("resolvePrPaths falls back to resolveProject/loadConfig when ctx is absent", async () => {
    const { resolvePrPaths } = await import("./pr-paths.js");
    const cfg = { paths: { workflow_dir: ".agentplane/tasks" } };
    mocks.resolveProject.mockResolvedValue({
      gitRoot: "/tmp/repo",
      agentplaneDir: "/tmp/repo/.agentplane",
    });
    mocks.loadConfig.mockResolvedValue({ config: cfg });
    const resolved = await resolvePrPaths({
      cwd: "/tmp/repo/sub",
      rootOverride: "/tmp/repo",
      taskId: "T-2",
    });
    expect(mocks.resolveProject).toHaveBeenCalledTimes(1);
    expect(mocks.loadConfig).toHaveBeenCalledTimes(1);
    expect(resolved.reviewPath).toBe(
      path.join("/tmp/repo", ".agentplane/tasks", "T-2", "pr", "review.md"),
    );
  });

  it("readPrArtifact reads local file first, then falls back to git show, then returns null", async () => {
    const { readPrArtifact } = await import("./pr-paths.js");
    mocks.fileExists.mockResolvedValueOnce(true);
    mocks.readFile.mockResolvedValueOnce("local-content");
    const local = await readPrArtifact({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "meta.json",
      branch: "task/T-3",
    });
    expect(local).toBe("local-content");

    mocks.fileExists.mockResolvedValueOnce(false);
    mocks.gitShowFile.mockResolvedValueOnce("git-content");
    const fromGit = await readPrArtifact({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "review.md",
      branch: "task/T-3",
    });
    expect(fromGit).toBe("git-content");

    mocks.fileExists.mockResolvedValueOnce(false);
    mocks.gitShowFile.mockRejectedValueOnce(new Error("missing"));
    const missing = await readPrArtifact({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "verify.log",
      branch: "task/T-3",
    });
    expect(missing).toBeNull();
  });
});
