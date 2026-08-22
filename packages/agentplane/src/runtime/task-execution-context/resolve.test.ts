import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplane/testkit/cli-core-pr-flow";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { resolveTaskExecutionContext, selectLegacyBaseRef } from "./resolve.js";

function commandContext(mode: "direct" | "branch_pr"): CommandContext {
  const config = defaultConfig();
  config.workflow_mode = mode;
  return {
    config,
    resolvedProject: { gitRoot: "/repo" },
  } as unknown as CommandContext;
}

function task(
  id: string,
  route: NonNullable<TaskData["execution_route"]>,
  baseSha = "a".repeat(40),
): TaskData {
  return {
    id,
    title: id,
    description: id,
    status: "DOING",
    priority: "med",
    owner: "CODER",
    depends_on: [],
    tags: ["code"],
    verify: [],
    execution_route: route,
    extensions: {
      task_execution_context: { base_ref: "main", base_sha: baseSha },
    },
  };
}

describe("TaskExecutionContext", () => {
  it("recovers a legacy task base from the long-lived development branch", () => {
    expect(
      selectLegacyBaseRef({
        candidates: ["main", "typescript", "task/TASK-1/work"],
        exact_candidates: ["typescript"],
        current_branch: "task/TASK-1/work",
        configured_base: "main",
        task_prefix: "task/",
      }),
    ).toBe("typescript");
  });

  it("fails closed when a legacy base commit belongs to multiple non-current branches", () => {
    expect(() =>
      selectLegacyBaseRef({
        candidates: ["release/a", "release/b"],
        exact_candidates: [],
        current_branch: "task/TASK-1/work",
        configured_base: null,
        task_prefix: "task/",
      }),
    ).toThrow(/ambiguous/u);
  });

  it("normalizes historical repository requests without mutating repository config", async () => {
    const ctx = commandContext("direct");
    const context = await resolveTaskExecutionContext({
      ctx,
      tasks: [
        task("TASK-1", {
          schema_version: 1,
          requested_mode: "repository",
          selected_mode: "direct",
          repository_mode: "direct",
          reason_codes: ["repository_mode_selected"],
          frozen: true,
        }),
      ],
    });

    expect(context).toMatchObject({
      requested_mode: "auto",
      selected_mode: "direct",
      route_source: "legacy_migration",
      base_ref: "main",
      base_sha: "a".repeat(40),
    });
    expect(context.reason_codes).toContain("legacy_repository_request_normalized");
    expect(ctx.config.workflow_mode).toBe("direct");
  });

  it("enforces the repository branch_pr safety floor", async () => {
    const context = await resolveTaskExecutionContext({
      ctx: commandContext("branch_pr"),
      tasks: [
        task("TASK-1", {
          schema_version: 1,
          requested_mode: "direct",
          selected_mode: "direct",
          repository_mode: "direct",
          reason_codes: ["explicit_direct"],
          frozen: true,
        }),
      ],
    });

    expect(context.selected_mode).toBe("branch_pr");
    expect(context.reason_codes).toContain("repository_branch_pr_floor");
  });

  it("rejects batch tasks with different frozen bases", async () => {
    const route = {
      schema_version: 1,
      requested_mode: "auto",
      selected_mode: "direct",
      repository_mode: "direct",
      reason_codes: ["automatic_safe_direct"],
      frozen: true,
    } as const;

    await expect(
      resolveTaskExecutionContext({
        ctx: commandContext("direct"),
        tasks: [task("TASK-1", route), task("TASK-2", route, "b".repeat(40))],
      }),
    ).rejects.toThrow(/mismatched base_sha/u);
  });

  it("rejects the historical zero-SHA sentinel instead of treating it as a commit", async () => {
    const route = {
      schema_version: 1,
      requested_mode: "auto",
      selected_mode: "direct",
      repository_mode: "direct",
      reason_codes: ["automatic_safe_direct"],
      frozen: true,
    } as const;

    await expect(
      resolveTaskExecutionContext({
        ctx: commandContext("direct"),
        tasks: [task("TASK-1", route, "0".repeat(40))],
      }),
    ).rejects.toMatchObject({ reason_code: "git_base_identity_invalid" });
  });
});
