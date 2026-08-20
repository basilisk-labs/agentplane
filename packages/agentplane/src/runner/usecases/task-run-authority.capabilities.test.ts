import { describe, expect, it } from "vitest";

import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { assertTaskRunnerPreExecutionCapabilities } from "./task-run-authority.js";

function execution(selectedMode: "direct" | "branch_pr"): TaskExecutionContext {
  return {
    schema_version: 1,
    primary_task_id: "AP-0803",
    task_ids: ["AP-0803"],
    repository_mode: "direct",
    selected_mode: selectedMode,
    requested_mode: "auto",
    route_source: "execution_contract",
    reason_codes: [],
    base_ref: "main",
    base_sha: "0".repeat(40),
    authoritative_task_source: "task_worktree",
  };
}

describe("task runner pre-execution capability enforcement", () => {
  it("blocks a direct runner before invocation when an external capability is requested", () => {
    expect(() =>
      assertTaskRunnerPreExecutionCapabilities({
        execution: execution("direct"),
        taskId: "AP-0803",
        network: "deny",
        externalSideEffects: ["deploy"],
      }),
    ).toThrowError(/side_effect_requires_isolation|direct execution cannot start/u);
  });

  it("allows an effect-free direct runner and delegates isolated effects only after branch routing", () => {
    expect(() =>
      assertTaskRunnerPreExecutionCapabilities({
        execution: execution("direct"),
        taskId: "AP-0803",
        network: "deny",
        externalSideEffects: [],
      }),
    ).not.toThrow();
    expect(() =>
      assertTaskRunnerPreExecutionCapabilities({
        execution: execution("branch_pr"),
        taskId: "AP-0803",
        network: "allowed",
        externalSideEffects: ["deploy"],
      }),
    ).not.toThrow();
  });
});
