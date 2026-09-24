import { describe, expect, it } from "vitest";
import {
  canonicalFinalValidationTask,
  finalValidationIdentityMatches,
} from "./kernel-final-validation.js";
import { bindDirectTaskVerificationChecks } from "./direct-task-verification.js";

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

describe("canonical final-validation command ownership", () => {
  it("binds an observed verification contract to already executed checks", () => {
    const task = {
      execution_contract: {
        verification: {
          contract: {
            selected_checks: ["docs_contract", "full_regression", "task_outcome"],
          },
        },
      },
    } as never;
    const check = {
      runtime: undefined,
      command: "bun run test:critical",
      script: "test:critical",
      check_ids: ["plan-check"],
      exit_code: 0,
      duration_ms: 1,
      stdout_tail: "",
      stderr_tail: "",
    };

    const result = bindDirectTaskVerificationChecks(
      {
        status: "passed",
        artifact_path: "old.json",
        checks: [check, { ...check, command: "bun run ci:local:full", script: "ci:local:full" }],
        reason: null,
      },
      task,
      "final-validation.json",
    );

    expect(result.artifact_path).toBe("final-validation.json");
    expect(result.checks[0]?.check_ids).toEqual(["plan-check", "docs_contract", "task_outcome"]);
    expect(result.checks[1]?.check_ids).toEqual([
      "plan-check",
      "docs_contract",
      "full_regression",
      "task_outcome",
    ]);
  });

  it("removes legacy operational verification commands without mutating the task", () => {
    const task = {
      id: "T-1",
      verify: ["legacy stale command"],
      description: "Canonical task projection",
    };

    expect(canonicalFinalValidationTask(task)).toEqual({
      ...task,
      verify: [],
    });
    expect(task.verify).toEqual(["legacy stale command"]);
  });

  it("preserves dynamically observed verification requirements", () => {
    const executionContract = {
      verification: { contract: { selected_checks: ["docs_contract", "task_outcome"] } },
    };
    const task = { verify: ["legacy stale command"], execution_contract: executionContract };

    const prepared = canonicalFinalValidationTask(task);

    expect(prepared.verify).toEqual([]);
    expect(prepared.execution_contract).toBe(executionContract);
  });
});
