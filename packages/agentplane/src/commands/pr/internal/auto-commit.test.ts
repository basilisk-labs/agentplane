import { describe, expect, it, vi, beforeEach } from "vitest";

import type { CommandContext } from "../../shared/task-backend.js";
import { maybeAutoCommitTaskPrArtifacts } from "./auto-commit.js";

vi.mock("@agentplaneorg/core/process", async () => {
  const actual = await vi.importActual<typeof import("@agentplaneorg/core/process")>(
    "@agentplaneorg/core/process",
  );
  return {
    ...actual,
    execFileAsync: vi.fn(async () => ({ stdout: "", stderr: "" })),
  };
});

vi.mock("../../guard/impl/dco.js", () => ({
  appendDcoSignoff: vi.fn(() => "Signed-off-by: AgentPlane <agentplane@example.invalid>"),
}));

vi.mock("../../guard/impl/env.js", () => ({
  buildGitCommitEnv: vi.fn(() => ({ AGENTPLANE_TASK_ID: "202606042225-FE57GC" })),
  resolveCanonicalGitIdentity: vi.fn(async () => ({
    name: "AgentPlane",
    email: "agentplane@example.invalid",
  })),
}));

vi.mock("../../shared/git-ops.js", () => ({
  gitCurrentBranch: vi.fn(async () => "task/202606042157-020DWK/reduce-agent-cognitive-load"),
}));

function mkCtx(): CommandContext {
  return {
    resolvedProject: {
      gitRoot: "/repo",
    },
    config: {
      workflow_mode: "branch_pr",
      paths: {
        workflow_dir: ".agentplane/tasks",
      },
    },
    git: {
      statusChangedPaths: vi.fn(async () => [
        ".agentplane/tasks/202606042157-020DWK/README.md",
        ".agentplane/tasks/202606042157-020DWK/pr/meta.json",
        ".agentplane/tasks/202606042204-NX58GD/README.md",
      ]),
      stage: vi.fn(async () => undefined),
      commitAmendNoEdit: vi.fn(async () => undefined),
      commit: vi.fn(async () => undefined),
      invalidateStatus: vi.fn(),
    },
  } as unknown as CommandContext;
}

describe("task PR artifact auto-commit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("bounds artifact amend commits so hook hangs return control", async () => {
    const ctx = mkCtx();
    const previousTimeout = process.env.AGENTPLANE_GIT_COMMIT_TIMEOUT_MS;
    process.env.AGENTPLANE_GIT_COMMIT_TIMEOUT_MS = "123";

    try {
      await expect(
        maybeAutoCommitTaskPrArtifacts({
          ctx,
          taskId: "202606042157-020DWK",
          relatedTaskIds: ["202606042204-NX58GD"],
          branch: "task/202606042157-020DWK/reduce-agent-cognitive-load",
          strategy: "amend",
        }),
      ).resolves.toBe(true);
    } finally {
      if (previousTimeout === undefined) delete process.env.AGENTPLANE_GIT_COMMIT_TIMEOUT_MS;
      else process.env.AGENTPLANE_GIT_COMMIT_TIMEOUT_MS = previousTimeout;
    }

    expect(ctx.git.commitAmendNoEdit).toHaveBeenCalledWith({
      env: { AGENTPLANE_TASK_ID: "202606042225-FE57GC" },
      skipHooks: true,
      timeoutMs: 123,
    });
    expect(ctx.git.stage).toHaveBeenCalledWith([
      ".agentplane/tasks/202606042157-020DWK/README.md",
      ".agentplane/tasks/202606042157-020DWK/pr/meta.json",
      ".agentplane/tasks/202606042204-NX58GD/README.md",
    ]);
  });
});
