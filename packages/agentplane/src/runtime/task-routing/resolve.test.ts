import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import { resolveEffectiveTaskWorkflowMode, resolveTaskExecutionRoute } from "./resolve.js";

describe("task execution route", () => {
  it("keeps legacy task new behavior when repository mode is requested", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "repository",
        task: { task_kind: "release", mutation_scope: "release", risk_flags: ["publish"] },
      }),
    ).toMatchObject({ selected_mode: "direct", reason_codes: ["repository_mode_selected"] });
  });

  it("escalates an automatic release task from direct to branch_pr", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    const route = resolveTaskExecutionRoute({
      config,
      requestedMode: "auto",
      task: { task_kind: "release", mutation_scope: "release", risk_flags: ["publish"] },
    });
    expect(route.selected_mode).toBe("branch_pr");
    expect(route.reason_codes).toEqual(["mutation_requires_isolation", "risk_publish"]);
  });

  it("keeps a safe automatic docs task direct", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "auto",
        task: { task_kind: "docs", mutation_scope: "docs", risk_flags: [] },
      }).selected_mode,
    ).toBe("direct");
  });

  it("isolates unknown mutation scope even when direct is requested", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveTaskExecutionRoute({
        config,
        requestedMode: "direct",
        task: { mutation_scope: "unknown", risk_flags: [] },
      }),
    ).toMatchObject({
      requested_mode: "direct",
      selected_mode: "branch_pr",
      reason_codes: ["direct_request_overridden", "mutation_scope_unknown"],
    });
  });

  it("treats repository branch_pr mode as a non-downgradeable policy floor", () => {
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const route = resolveTaskExecutionRoute({
      config,
      requestedMode: "direct",
      task: { task_kind: "docs", mutation_scope: "docs", risk_flags: [] },
    });
    expect(route.selected_mode).toBe("branch_pr");
    expect(route.reason_codes).toContain("direct_request_overridden");
  });

  it("lets a persisted route escalate a direct repository", () => {
    const config = defaultConfig();
    config.workflow_mode = "direct";
    expect(
      resolveEffectiveTaskWorkflowMode(
        {
          execution_route: {
            schema_version: 1,
            requested_mode: "auto",
            selected_mode: "branch_pr",
            repository_mode: "direct",
            reason_codes: ["risk_publish"],
            frozen: true,
          },
        },
        config,
      ),
    ).toBe("branch_pr");
  });
});
