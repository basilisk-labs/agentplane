import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { createSuppliedCliTask, readSuppliedCliOrder } from "../../cli/supplied-plan.testkit.js";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { runCli } from "../../cli/run-cli.js";

installRunCliIntegrationHarness();

function proposal() {
  return {
    work_items: [
      {
        id: "report",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["report"],
        optional: false,
        execution_requirements: {
          scope_roots: ["result.txt"],
          repository_effects: ["source_code"],
          external_effects: [],
          capabilities: [],
          resources: [],
        },
        contract: {
          role: "EXECUTOR",
          objective: "Write the report",
          acceptance_criteria: ["Report exists"],
          verification_commands: ["node --version"],
        },
      },
    ],
  };
}

describe("planning recovery retains authority and source evidence", { timeout: 120_000 }, () => {
  it.each(["self_waiver", "wrong_order", "material_drift", "expanded_effects"] as const)(
    "rejects %s without applying a Plan or losing supplied source",
    async (failure) => {
      const f = await createSuppliedCliTask({ requirePlanner: true });
      const source = await readFile(path.join(f.root, "supplied.json"), "utf8");
      const issued = await runJson(f.root, ["task", "advance", f.id, "--agent-json"]);
      const { order, exchange } = await readSuppliedCliOrder(issued);
      expect(order.role).toBe("PLANNER");
      const plan = proposal();
      if (failure === "expanded_effects")
        plan.work_items[0]!.execution_requirements.repository_effects.push("schema");
      const result = {
        work_order_id: failure === "wrong_order" ? `sha256:${"f".repeat(64)}` : order.work_order_id,
        status: "completed",
        summary: "Proposed report plan",
        findings: [],
        uncertainty: [],
        canonical_plan: plan,
        ...(failure === "self_waiver"
          ? { planning_requirement: "not_required", plan_origin: "caller_supplied" }
          : {}),
      };
      await writeFile(exchange.result_path, JSON.stringify(result));
      if (failure === "material_drift")
        await writeFile(path.join(f.root, "new-source.txt"), "material change");
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "advance",
            f.id,
            "--result",
            exchange.result_path,
            "--agent-json",
            "--root",
            f.root,
          ]),
        ).not.toBe(0);
        expect(io.stderr.length).toBeGreaterThan(0);
        if (failure === "material_drift") expect(io.stderr).toContain("stale");
        if (failure === "expanded_effects")
          expect(io.stderr).toContain("exceeds the trusted execution contract");
      } finally {
        io.restore();
      }
      const show = await runJson(f.root, ["task", "show", f.id]);
      expect(show.planning).toMatchObject({
        requirement: "required",
        outcome: "missing",
        plan_digest: null,
        supplied_input_present: true,
        accepted_results: [],
        managed_attempts: null,
      });
      expect(await readFile(path.join(f.root, "supplied.json"), "utf8")).toBe(source);
    },
  );

  it("preserves an accepted external Plan on repeated return without another planning exchange", async () => {
    const f = await createSuppliedCliTask({ requirePlanner: true });
    const issued = await runJson(f.root, ["task", "advance", f.id, "--agent-json"]);
    const { order, exchange } = await readSuppliedCliOrder(issued);
    const result = {
      work_order_id: order.work_order_id,
      status: "completed",
      summary: "Resolved report plan",
      findings: [],
      uncertainty: [],
      canonical_plan: proposal(),
    };
    await writeFile(exchange.result_path, JSON.stringify(result));
    const args = ["task", "advance", f.id, "--result", exchange.result_path, "--agent-json"];
    const initialReturn = await runJson(f.root, args);
    expect(initialReturn.action).toMatchObject({ kind: "approval_required" });
    const first = await runJson(f.root, ["task", "show", f.id]);
    expect(first.planning).toMatchObject({
      outcome: "passed",
      supplied_input_present: true,
      issued_work_orders: [order.work_order_id],
    });
    const repeatedReturn = await runJson(f.root, args);
    expect(repeatedReturn.action).toMatchObject({ kind: "approval_required" });
    const repeated = await runJson(f.root, ["task", "show", f.id]);
    expect(repeated.planning).toEqual(first.planning);
  });
});
