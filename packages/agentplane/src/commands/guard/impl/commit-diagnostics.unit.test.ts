import { describe, expect, it } from "vitest";

import { asCommitFailure } from "./commit-diagnostics.js";

function gitCommitError(stderr: string): Error {
  return Object.assign(new Error("Command failed: git commit -m test"), {
    cmd: "git commit -m test",
    code: 1,
    stderr,
  });
}

describe("commit failure diagnostics", () => {
  it("classifies commit subject policy failures with a direct subject next action", () => {
    const error = asCommitFailure(
      gitCommitError(
        [
          "error [E_GIT]",
          "commit subject must match: <emoji> <suffix> <scope>: <summary>",
          "example: ✅ 020DWK close: <summary>",
        ].join("\n"),
      ),
      "task_commit",
    );

    expect(error?.context).toMatchObject({
      reason_code: "git_commit_subject_policy",
      diagnostic_next_action_command: "git commit --amend -s",
      diagnostic_next_action_reason_code: "git_commit_subject_policy",
    });
    expect(error?.message).toContain("commit subject must match");
  });

  it("classifies missing DCO failures with a direct sign-off next action", () => {
    const error = asCommitFailure(
      gitCommitError(
        [
          "error [E_GIT]",
          "DCO sign-off is required.",
          "AgentPlane default trailer:",
          "  Signed-off-by: Denis Smirnov <densmirnov@me.com>",
        ].join("\n"),
      ),
      "task_commit",
    );

    expect(error?.context).toMatchObject({
      reason_code: "git_commit_dco_missing",
      diagnostic_next_action_command: "git commit -s",
      diagnostic_next_action_reason_code: "git_commit_dco_missing",
    });
    expect(error?.message).toContain("DCO sign-off is required");
  });
});
