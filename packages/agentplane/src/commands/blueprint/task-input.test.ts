import { describe, expect, it } from "vitest";

import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { blueprintResolveInputFromTask } from "./task-input.js";

const config = {
  workflow_mode: "branch_pr",
} as AgentplaneConfig;

function task(input: Partial<TaskData>): TaskData {
  return {
    id: "T-1",
    title: "Task",
    description: "Task description",
    status: "TODO",
    priority: "med",
    owner: "CODER",
    tags: ["code"],
    ...input,
  } as TaskData;
}

describe("blueprintResolveInputFromTask", () => {
  it("accepts specialized built-in blueprint requests from task intent", () => {
    const input = blueprintResolveInputFromTask({
      config,
      task: task({
        task_kind: "code",
        mutation_scope: "code",
        blueprint_request: "performance.benchmark",
        tags: ["code", "performance"],
      }),
    });

    expect(input).toMatchObject({
      taskKind: "code",
      mutation: "code",
      mutationScope: "code",
      blueprintRequest: "performance.benchmark",
      workflowMode: "branch_pr",
    });
  });

  it("accepts context task kind and mutation scope", () => {
    const input = blueprintResolveInputFromTask({
      config,
      task: task({
        task_kind: "context",
        mutation_scope: "context",
        blueprint_request: "context.assimilation",
        tags: ["context"],
      }),
    });

    expect(input).toMatchObject({
      taskKind: "context",
      mutation: "context",
      mutationScope: "context",
      blueprintRequest: "context.assimilation",
      workflowMode: "branch_pr",
    });
  });

  it("accepts maximum context assimilation blueprint requests", () => {
    const input = blueprintResolveInputFromTask({
      config,
      task: task({
        task_kind: "context",
        mutation_scope: "context",
        blueprint_request: "context.maximum_assimilation",
        tags: ["context", "assimilation"],
      }),
    });

    expect(input).toMatchObject({
      taskKind: "context",
      mutation: "context",
      mutationScope: "context",
      blueprintRequest: "context.maximum_assimilation",
      workflowMode: "branch_pr",
    });
  });

  it("uses the persisted task execution route over a less isolated repository default", () => {
    const directConfig = { workflow_mode: "direct" } as AgentplaneConfig;
    const input = blueprintResolveInputFromTask({
      config: directConfig,
      task: task({
        task_kind: "release",
        mutation_scope: "release",
        execution_route: {
          schema_version: 1,
          requested_mode: "auto",
          selected_mode: "branch_pr",
          repository_mode: "direct",
          reason_codes: ["mutation_requires_isolation"],
          frozen: true,
        },
      }),
    });

    expect(input.workflowMode).toBe("branch_pr");
  });

  it("derives deterministic blueprint risk only from the execution contract", () => {
    const directConfig = { workflow_mode: "direct" } as AgentplaneConfig;
    const executionContract = resolveTaskExecutionContract({
      config: directConfig,
      task: { task_kind: "code", mutation_scope: "code", risk_flags: [] },
      declaration: {
        schema_version: 1,
        preferred_mode: "direct",
        scope_roots: ["infra"],
        repository_effects: ["repository_write"],
        external_effects: ["deploy", "destructive_git"],
        uncertainty: "bounded",
        reversibility: "irreversible",
        rationale: ["deployment is a separately approved external effect"],
      },
    });
    const input = blueprintResolveInputFromTask({
      config: directConfig,
      task: task({
        title: "Write local documentation without deploying anything",
        task_kind: "code",
        execution_contract: executionContract,
        tags: ["docs", "safe", "local"],
      }),
    });

    expect(input.workflowMode).toBe("branch_pr");
    expect(input.riskFlags).toEqual(["deploy", "merge"]);
    expect(input.mutation).toBe("ops");
  });
});
