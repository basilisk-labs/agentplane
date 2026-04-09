import path from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = {
  resolveProject: vi.fn(),
  loadConfig: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  gitShowFile: vi.fn(),
};

vi.mock("@agentplaneorg/core", () => ({
  resolveProject: (...args: unknown[]) => mocks.resolveProject(...args),
  loadConfig: (...args: unknown[]) => mocks.loadConfig(...args),
}));
vi.mock("../../../cli/fs-utils.js", () => ({
  fileExists: (...args: unknown[]) => mocks.fileExists(...args),
}));
vi.mock("node:fs/promises", () => ({
  readFile: (...args: unknown[]) => mocks.readFile(...args),
}));
vi.mock("../../shared/git-diff.js", () => ({
  toGitPath: (value: string) => value.replaceAll("\\", "/"),
  gitShowFile: (...args: unknown[]) => mocks.gitShowFile(...args),
}));

describe("pr/internal/pr-paths", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    expect(resolved.notesPath).toBe(
      path.join("/repo", ".agentplane/tasks", "T-1", "pr", "notes.jsonl"),
    );
    expect(resolved.githubTitlePath).toBe(
      path.join("/repo", ".agentplane/tasks", "T-1", "pr", "github-title.txt"),
    );
    expect(resolved.githubBodyPath).toBe(
      path.join("/repo", ".agentplane/tasks", "T-1", "pr", "github-body.md"),
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
    expect(resolved.githubBodyPath).toBe(
      path.join("/tmp/repo", ".agentplane/tasks", "T-2", "pr", "github-body.md"),
    );
  });

  it("readPrArtifact reads local file first, then falls back to git show, then returns null", async () => {
    const { readPrArtifact, readPrArtifactFromBranch } = await import("./pr-paths.js");
    mocks.fileExists.mockResolvedValueOnce(true);
    mocks.readFile.mockResolvedValueOnce("local-content");
    const local = await readPrArtifact({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "meta.json",
      branch: "task/T-3",
    });
    expect(local).toBe("local-content");

    mocks.fileExists.mockResolvedValueOnce(true);
    mocks.readFile.mockResolvedValueOnce("worktree-content");
    const fromWorktree = await readPrArtifact({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "review.md",
      branch: "task/T-3",
      worktreePath: "/repo/.agentplane/worktrees/T-3",
    });
    expect(fromWorktree).toBe("worktree-content");

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

    mocks.fileExists.mockResolvedValueOnce(true);
    mocks.readFile.mockResolvedValueOnce("worktree-preferred");
    const branchPreferred = await readPrArtifactFromBranch({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "meta.json",
      branch: "task/T-3",
      worktreePath: "/repo/.agentplane/worktrees/T-3",
    });
    expect(branchPreferred).toBe("worktree-preferred");

    mocks.fileExists.mockResolvedValueOnce(false);
    mocks.gitShowFile.mockResolvedValueOnce("git-only");
    const fromBranchOnly = await readPrArtifactFromBranch({
      resolved: { gitRoot: "/repo" },
      prDir: "/repo/.agentplane/tasks/T-3/pr",
      fileName: "meta.json",
      branch: "task/T-3",
    });
    expect(fromBranchOnly).toBe("git-only");
  });
});
