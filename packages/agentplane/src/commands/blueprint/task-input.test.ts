import { describe, expect, it } from "vitest";

import type { AgentplaneConfig } from "@agentplaneorg/core/config";

import type { TaskData } from "../../backends/task-backend.js";
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
});
