import type { TaskData } from "../backends/task-backend.js";
import { describe, expect, it } from "vitest";

import {
  RUNNER_DANGER_FULL_ACCESS_SANDBOX,
  RUNNER_READ_ONLY_SANDBOX,
  RUNNER_WORKSPACE_WRITE_SANDBOX,
} from "./types.js";
import {
  hasExplicitRunnerDangerFullAccessAuthority,
  resolveRunnerSandboxPolicy,
  resolveRunnerWriteScopePolicy,
} from "./sandbox-policy.js";

function task(overrides: Partial<TaskData> = {}): TaskData {
  return {
    id: "202607231200-ABC123",
    title: "Sandbox policy",
    description: "Exercise role-derived sandbox policy.",
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    mutation_scope: "code",
    task_kind: "code",
    ...overrides,
  };
}

const protectedPathGroups = {
  tasks: [".agentplane/tasks"],
  policy: ["AGENTS.md", ".agentplane/policy"],
  config: [".agentplane/config.json"],
  hooks: ["lefthook.yml"],
  ci: [".github/workflows"],
};

describe("runner sandbox policy", () => {
  it.each([
    [
      "null source",
      {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: null,
      },
    ],
    [
      "blank source",
      {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: " ",
      },
    ],
  ])("rejects runtime danger authority with %s", (_label, authority) => {
    expect(hasExplicitRunnerDangerFullAccessAuthority(authority)).toBe(false);
  });

  it("derives workspace-write for code and context execution, and read-only for evaluator", () => {
    const coder = resolveRunnerSandboxPolicy({ task: task() });
    const curator = resolveRunnerSandboxPolicy({
      task: task({ owner: "CURATOR", mutation_scope: "context", task_kind: "context" }),
    });
    const evaluator = resolveRunnerSandboxPolicy({
      task: task(),
      execution_role: "EVALUATOR",
    });

    expect(coder).toMatchObject({
      requested: RUNNER_WORKSPACE_WRITE_SANDBOX,
      source: "role_default",
      role: "CODER",
    });
    expect(curator).toMatchObject({
      requested: RUNNER_WORKSPACE_WRITE_SANDBOX,
      role: "CURATOR",
    });
    expect(evaluator).toMatchObject({
      requested: RUNNER_READ_ONLY_SANDBOX,
      role: "EVALUATOR",
    });
  });

  it("derives narrow context roots while keeping protected paths separate", () => {
    const contextTask = task({
      owner: "CURATOR",
      mutation_scope: "context",
      task_kind: "context",
    });
    const sandbox = resolveRunnerSandboxPolicy({ task: contextTask });
    const scope = resolveRunnerWriteScopePolicy({
      sandbox,
      task: contextTask,
      protected_path_groups: protectedPathGroups,
    });

    expect(scope).toEqual({
      mutation_scope: "context",
      writable_roots: [".agentplane/context", "context"],
      protected_paths: [
        ".agentplane/config.json",
        ".agentplane/policy",
        ".agentplane/tasks",
        ".github/workflows",
        "AGENTS.md",
        "lefthook.yml",
      ],
    });
  });

  it("uses recipe artifact prefixes as actual writable roots and expands task placeholders", () => {
    const codeTask = task();
    const sandbox = resolveRunnerSandboxPolicy({ task: codeTask });
    const scope = resolveRunnerWriteScopePolicy({
      sandbox,
      task: codeTask,
      recipe: {
        recipe_id: "artifact-writer",
        scenario_id: "write-report",
        run_profile: {
          writes_artifacts_to: ["reports/", ".agentplane/tasks/<task-id>/"],
        },
      },
      protected_path_groups: protectedPathGroups,
    });

    expect(scope.writable_roots).toEqual(["reports", `.agentplane/tasks/${codeTask.id}`]);
  });

  it("requires a complete typed operator authority before authorizing danger", () => {
    const recipe = {
      recipe_id: "unsafe",
      scenario_id: "explicit",
      run_profile: { sandbox: RUNNER_DANGER_FULL_ACCESS_SANDBOX },
    };
    const absent = resolveRunnerSandboxPolicy({ task: task(), recipe });
    const malformed = resolveRunnerSandboxPolicy({
      task: task(),
      recipe,
      danger_authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: " ",
      },
    });
    const authorized = resolveRunnerSandboxPolicy({
      task: task(),
      recipe,
      danger_authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: "task run --allow-danger-full-access",
      },
    });

    expect(absent.authority.danger_full_access_authorized).toBe(false);
    expect(malformed.authority.danger_full_access_authorized).toBe(false);
    expect(authorized.authority).toEqual({
      danger_full_access_authorized: true,
      provenance: "explicit_operator",
      source: "task run --allow-danger-full-access",
    });
  });

  it("lets an explicit CLI sandbox override the role and recipe defaults", () => {
    const policy = resolveRunnerSandboxPolicy({
      task: task(),
      recipe: {
        recipe_id: "viewer",
        scenario_id: "read-only",
        run_profile: { sandbox: RUNNER_READ_ONLY_SANDBOX },
      },
      requested_sandbox: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      danger_authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: "task run --allow-danger-full-access",
      },
    });

    expect(policy).toEqual({
      requested: RUNNER_DANGER_FULL_ACCESS_SANDBOX,
      source: "cli_override",
      role: "CODER",
      authority: {
        danger_full_access_authorized: true,
        provenance: "explicit_operator",
        source: "task run --allow-danger-full-access",
      },
    });
  });
});
