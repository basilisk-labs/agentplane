import { describe, expect, it, vi, beforeEach } from "vitest";

import type { CommandContext } from "../../shared/task-backend.js";
import { maybeAutoCommitTaskPrArtifacts } from "./auto-commit.js";

vi.mock("@agentplaneorg/core/process", () => ({
  execFileAsync: vi.fn(() => Promise.resolve({ stdout: "", stderr: "" })),
}));

vi.mock("../../guard/impl/dco.js", () => ({
  appendDcoSignoff: vi.fn(() => "Signed-off-by: AgentPlane <agentplane@example.invalid>"),
}));

vi.mock("../../guard/impl/env.js", () => ({
  buildGitCommitEnv: vi.fn(() => ({ AGENTPLANE_TASK_ID: "202606042225-FE57GC" })),
  resolveCanonicalGitIdentity: vi.fn(() =>
    Promise.resolve({
      name: "AgentPlane",
      email: "agentplane@example.invalid",
    }),
  ),
}));

vi.mock("../../shared/git-ops.js", () => ({
  gitCurrentBranch: vi.fn(() =>
    Promise.resolve("task/202606042157-020DWK/reduce-agent-cognitive-load"),
  ),
}));

function mkCtx(): {
  ctx: CommandContext;
  stage: ReturnType<typeof vi.fn>;
  commitAmendNoEdit: ReturnType<typeof vi.fn>;
} {
  const stage = vi.fn(() => Promise.resolve());
  const commitAmendNoEdit = vi.fn(() => Promise.resolve());
  const ctx = {
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
      statusChangedPaths: vi.fn(() =>
        Promise.resolve([
          ".agentplane/tasks/202606042157-020DWK/README.md",
          ".agentplane/tasks/202606042157-020DWK/pr/meta.json",
          ".agentplane/tasks/202606042204-NX58GD/README.md",
        ]),
      ),
      stage,
      commitAmendNoEdit,
      commit: vi.fn(() => Promise.resolve()),
      invalidateStatus: vi.fn(),
    },
  } as unknown as CommandContext;
  return { ctx, stage, commitAmendNoEdit };
}

describe("task PR artifact auto-commit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("bounds artifact amend commits so hook hangs return control", async () => {
    const { ctx, stage, commitAmendNoEdit } = mkCtx();
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

    expect(commitAmendNoEdit).toHaveBeenCalledWith({
      env: { AGENTPLANE_TASK_ID: "202606042225-FE57GC" },
      skipHooks: true,
      timeoutMs: 123,
    });
    expect(stage).toHaveBeenCalledWith([
      ".agentplane/tasks/202606042157-020DWK/README.md",
      ".agentplane/tasks/202606042157-020DWK/pr/meta.json",
      ".agentplane/tasks/202606042204-NX58GD/README.md",
    ]);
  });
});
