import { describe, expect, it } from "vitest";

import { requireBlueprint } from "../blueprints/registry.js";
import { CODE_WORKFLOW_LIFECYCLE_CONTRACTS, lifecycleBlueprintNodeKinds } from "./contract.js";

describe("workflow lifecycle contract", () => {
  it("keeps direct and branch_pr blueprint routes sourced from the lifecycle contract", () => {
    for (const mode of ["direct", "branch_pr"] as const) {
      const contract = CODE_WORKFLOW_LIFECYCLE_CONTRACTS[mode];
      const blueprint = requireBlueprint(contract.blueprintId);

      expect(blueprint.nodes.map((node) => node.kind)).toEqual(lifecycleBlueprintNodeKinds(mode));
    }
  });

  it("models order-sensitive branch_pr side effects and cwd ownership", () => {
    const steps = CODE_WORKFLOW_LIFECYCLE_CONTRACTS.branch_pr.commandSteps;
    const ids = steps.map((step) => step.id);

    expect(ids.indexOf("verify_show")).toBeLessThan(ids.indexOf("pr_open"));
    expect(ids.indexOf("verify")).toBeLessThan(ids.indexOf("hosted_checks"));
    expect(ids.indexOf("hosted_checks")).toBeLessThan(ids.indexOf("integrate"));
    const prOpen = steps.find((step) => step.id === "pr_open");
    expect(prOpen?.cwd).toBe("task_worktree");
    expect(prOpen?.sideEffects).toEqual(expect.arrayContaining(["git_remote"]));

    expect(steps.find((step) => step.id === "integrate")).toMatchObject({
      role: "INTEGRATOR",
      cwd: "base_checkout",
    });
  });

  it("models direct approval before execution and verification before finish", () => {
    const ids = CODE_WORKFLOW_LIFECYCLE_CONTRACTS.direct.commandSteps.map((step) => step.id);

    expect(ids.indexOf("plan_approve")).toBeLessThan(ids.indexOf("start_ready"));
    expect(ids.indexOf("verify")).toBeLessThan(ids.indexOf("finish"));
  });
});
