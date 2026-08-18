import { describe, expect, it } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { makeTaskCommandContext, makeTaskFixture } from "@agentplane/testkit/task";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";

import { extendBlockedTaskExecutionContract } from "./scope-extend.js";

function fixture(overrides: Partial<TaskData> = {}) {
  const command = makeTaskCommandContext({
    configureConfig: (config) => {
      config.workflow_mode = "branch_pr";
    },
  });
  const executionContract = resolveTaskExecutionContract({
    config: command.config,
    task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
    requestedMode: "branch_pr",
    declaration: {
      schema_version: 2,
      preferred_mode: "branch_pr",
      scope_roots: ["docs/releases"],
      repository_effects: ["documentation"],
      external_effects: [],
      requirements_uncertainty: "bounded",
      implementation_uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["release documentation"],
    },
  });
  executionContract.observed.changed_paths = ["docs/releases/v0.7.7.md"];
  const task = makeTaskFixture({
    id: "202608181404-SCOPE1",
    status: "BLOCKED",
    execution_contract: executionContract,
    execution_route: {
      requested_mode: "branch_pr",
      selected_mode: "branch_pr",
      repository_mode: "branch_pr",
      reason_codes: [...executionContract.reason_codes],
    },
    comments: [
      {
        author: "SUPERVISOR",
        body: "Agentplane receipt: external-agent-blocker/tr_1/sha256:abc.",
      },
    ],
    ...overrides,
  });
  return { command, task };
}

describe("blocked task execution scope extension", () => {
  it("adds repository authority monotonically and preserves observations", () => {
    const { command, task } = fixture();

    const extended = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: ["website"],
      repository_effects: ["release_metadata"],
      by: "USER",
    });

    expect(extended.declaration.scope_roots).toEqual(["docs/releases", "website"]);
    expect(extended.declaration.repository_effects).toEqual(["documentation", "release_metadata"]);
    expect(extended.observed.changed_paths).toEqual(["docs/releases/v0.7.7.md"]);
    expect(extended.authority.allowed_repository_effects).toContain("release_metadata");
    expect(extended.declaration.rationale).toContain(
      "USER-approved blocked-result scope extension: roots=website; repository_effects=release_metadata",
    );
  });

  it("requires a BLOCKED task, blocker receipt, and explicit USER authority", () => {
    const { command, task } = fixture();
    const cases: { task: TaskData; by: string; message: RegExp }[] = [
      { task: { ...task, status: "DOING" }, by: "USER", message: /only after a recorded BLOCKED/u },
      { task: { ...task, comments: [] }, by: "USER", message: /blocker receipt/u },
      { task, by: "SUPERVISOR", message: /explicit --by USER/u },
    ];

    for (const testCase of cases) {
      expect(() =>
        extendBlockedTaskExecutionContract({
          command,
          task: testCase.task,
          scope_roots: ["website"],
          repository_effects: [],
          by: testCase.by,
        }),
      ).toThrow(testCase.message);
    }
  });

  it("rejects unsafe roots and no-op extensions", () => {
    const { command, task } = fixture();

    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["../outside"],
        repository_effects: [],
        by: "USER",
      }),
    ).toThrow(/Invalid scope root/u);
    expect(() =>
      extendBlockedTaskExecutionContract({
        command,
        task,
        scope_roots: ["docs/releases"],
        repository_effects: ["documentation"],
        by: "USER",
      }),
    ).toThrow(/must add a new scope root or repository effect/u);
  });
});
