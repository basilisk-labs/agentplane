import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  commit: vi.fn(),
}));

vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));

import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";

describe("commitBranchSupervisorTaskArtifacts", () => {
  beforeEach(() => {
    mocks.commit.mockReset();
  });

  it("invalidates cached Git status before committing newly written task artifacts", async () => {
    const invalidateStatus = vi.fn();
    mocks.commit.mockImplementation(() => {
      expect(invalidateStatus).toHaveBeenCalledTimes(1);
      return Promise.resolve(0);
    });

    await commitBranchSupervisorTaskArtifacts({
      command: { git: { invalidateStatus } } as never,
      cwd: "/repo",
      task_id: "202608130001-ABC123",
      message: "record verification",
    });

    expect(mocks.commit).toHaveBeenCalledTimes(1);
  });
});
