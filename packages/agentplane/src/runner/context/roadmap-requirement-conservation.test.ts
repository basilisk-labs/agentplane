import { buildAgentWorkOrderV2ValidFixture } from "@agentplaneorg/core/schemas";
import { makeRunnerContextBundle } from "@agentplane/testkit/runner";
import { describe, expect, it } from "vitest";

import { renderTaskRunnerBootstrap } from "../usecases/task-run.js";

describe("roadmap semantic requirement conservation", () => {
  it("preserves mandatory process-repair requirements without granting lifecycle authority", () => {
    const bundle = makeRunnerContextBundle({ runId: "roadmap-requirement-conservation" });
    const workOrder = buildAgentWorkOrderV2ValidFixture("roadmap-requirement-conservation");
    workOrder.task.work_item_id = "conserve_requirements";
    const acceptance =
      "Repair `agentplane task verify TASK-1` and `agentplane finish TASK-1` handling without executing either command.";
    const check =
      "Confirm `agentplane task verify TASK-1` remains task-owned input rather than supervisor authority.";
    const stop =
      "Stop before `agentplane finish TASK-1` if the required prompt would exceed its byte budget.";
    workOrder.task.acceptance_criteria = [
      { id: "required-process-repair", description: acceptance, required: true },
    ];
    workOrder.verification_intent.requirements = [
      {
        id: "required-process-check",
        description: check,
        required: true,
        observed_by: "agentplane",
      },
    ];
    workOrder.stop_rules = [stop];
    bundle.work_order = workOrder;
    bundle.execution.write_scope = {
      ...bundle.execution.write_scope!,
      writable_roots: [...workOrder.authority.writable_roots],
    };
    bundle.task!.metadata.tags = [...bundle.task!.metadata.tags, "process-mechanism-repair"];
    bundle.task!.narrative.description =
      "Repair lifecycle process choreography projection without granting lifecycle authority.";

    const bootstrap = renderTaskRunnerBootstrap(bundle);

    expect(bootstrap).toContain(workOrder.work_order_id);
    expect(bootstrap).toContain(workOrder.task.objective);
    expect(bootstrap).toContain(workOrder.task.work_item_id!);
    expect(bootstrap).toContain(acceptance);
    expect(bootstrap).toContain(check);
    expect(bootstrap).toContain(stop);
    for (const output of workOrder.required_outputs) expect(bootstrap).toContain(output.id);
    for (const root of workOrder.authority.writable_roots) expect(bootstrap).toContain(root);
    expect(bootstrap).toContain(workOrder.authority.network);
    expect(bootstrap).toContain("Return one typed semantic result");
  });

  it("keeps supervisor commands out of ordinary semantic work orders", () => {
    const bundle = makeRunnerContextBundle({ runId: "ordinary-requirement-filter" });
    const workOrder = buildAgentWorkOrderV2ValidFixture("ordinary-requirement-filter");
    workOrder.task.acceptance_criteria = [
      {
        id: "supervisor-command",
        description: "Run agentplane task verify TASK-1 before implementation.",
        required: true,
      },
    ];
    bundle.work_order = workOrder;

    expect(renderTaskRunnerBootstrap(bundle)).not.toContain("agentplane task verify TASK-1");
  });
});
