import { describe, expect, it } from "vitest";
import { finalValidationIdentityMatches } from "./kernel-final-validation.js";

const evaluatorTarget = "a".repeat(40);
const storedIdentity = "sha256:" + "a".repeat(64);
const changedFingerprint = "sha256:" + "b".repeat(64);

describe("canonical final-validation identity recovery", () => {
  it("restores validation across managed task artifacts for the same evaluator target", () => {
    expect(
      finalValidationIdentityMatches({
        stored_identity: storedIdentity,
        repository_fingerprint: changedFingerprint,
        previous_evaluator_target: evaluatorTarget,
        resolved_evaluator_target: evaluatorTarget,
        status_lines: [
          " M .agentplane/tasks/T-1/README.md",
          "?? .agentplane/tasks/T-1/quality/report.json",
        ],
        task_artifact_prefix: ".agentplane/tasks/T-1/",
      }),
    ).toBe(true);
  });

  it.each([
    {
      name: "evaluator target changed",
      previousTarget: evaluatorTarget,
      target: "c".repeat(40),
      lines: [" M .agentplane/tasks/T-1/README.md"],
    },
    {
      name: "previous evaluator target is unavailable",
      previousTarget: null,
      target: evaluatorTarget,
      lines: [" M .agentplane/tasks/T-1/README.md"],
    },
    {
      name: "source is dirty",
      previousTarget: evaluatorTarget,
      target: evaluatorTarget,
      lines: [" M packages/agentplane/src/commands/task/kernel-advance.ts"],
    },
  ])("rejects recovery when $name", ({ previousTarget, target, lines }) => {
    expect(
      finalValidationIdentityMatches({
        stored_identity: storedIdentity,
        repository_fingerprint: changedFingerprint,
        previous_evaluator_target: previousTarget,
        resolved_evaluator_target: target,
        status_lines: lines,
        task_artifact_prefix: ".agentplane/tasks/T-1/",
      }),
    ).toBe(false);
  });
});
