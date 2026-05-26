import path from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import type { readFile as readFileFn } from "node:fs/promises";
import type { loadConfig as loadConfigFn } from "@agentplaneorg/core/config";
import type { resolveProject as resolveProjectFn } from "@agentplaneorg/core/project";
import type { fileExists as fileExistsFn } from "../../../cli/fs-utils.js";
import type { gitShowFile as gitShowFileFn } from "@agentplaneorg/core/git";

const mocks = {
  resolveProject: vi.fn(),
  loadConfig: vi.fn(),
  fileExists: vi.fn(),
  readFile: vi.fn(),
  gitShowFile: vi.fn(),
};

const callResolveProject = (
  ...args: Parameters<typeof resolveProjectFn>
): ReturnType<typeof resolveProjectFn> =>
  mocks.resolveProject(...args) as ReturnType<typeof resolveProjectFn>;
const callLoadConfig = (
  ...args: Parameters<typeof loadConfigFn>
): ReturnType<typeof loadConfigFn> => mocks.loadConfig(...args) as ReturnType<typeof loadConfigFn>;
const callFileExists = (
  ...args: Parameters<typeof fileExistsFn>
): ReturnType<typeof fileExistsFn> => mocks.fileExists(...args) as ReturnType<typeof fileExistsFn>;
const callReadFile = (...args: Parameters<typeof readFileFn>): ReturnType<typeof readFileFn> =>
  mocks.readFile(...args) as ReturnType<typeof readFileFn>;
const callGitShowFile = (
  ...args: Parameters<typeof gitShowFileFn>
): ReturnType<typeof gitShowFileFn> =>
  mocks.gitShowFile(...args) as ReturnType<typeof gitShowFileFn>;

vi.mock("@agentplaneorg/core/project", () => ({
  resolveProject: callResolveProject,
}));
vi.mock("@agentplaneorg/core/config", () => ({
  loadConfig: callLoadConfig,
}));
vi.mock("../../../cli/fs-utils.js", () => ({
  fileExists: callFileExists,
}));
vi.mock("node:fs/promises", () => ({
  readFile: callReadFile,
}));
vi.mock("@agentplaneorg/core/git", () => ({
  toGitPath: (value: string) => value.replaceAll("\\", "/"),
  gitShowFile: callGitShowFile,
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
    mocks.gitShowFile
      .mockRejectedValueOnce(new Error("missing local branch"))
      .mockRejectedValueOnce(new Error("missing remote branch"));
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
