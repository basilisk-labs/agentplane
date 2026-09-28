import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { installRunCliIntegrationHarness, runCliSilent } from "@agentplane/testkit";
import { runJson } from "./task-create-planner-intent.testkit.js";
import { createSuppliedCliTask, readSuppliedCliOrder } from "./supplied-plan.testkit.js";

installRunCliIntegrationHarness();

describe("external supplied Plan shortcut", { timeout: 120_000 }, () => {
  it("uses zero PLANNER dispatches while retaining USER approval and EVALUATOR", async () => {
    const { root, id, created } = await createSuppliedCliTask();
    expect(created).toMatchObject({ status: "advance_required", required_role: null });
    const approval = await runJson(root, ["task", "advance", id, "--agent-json"]);
    expect(approval.action).toMatchObject({ kind: "approval_required" });
    expect(approval).not.toHaveProperty("exchange");
    expect(
      await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
    ).toBe(0);
    const first = await runJson(root, ["task", "advance", id, "--agent-json"]);
    const { order, exchange } = await readSuppliedCliOrder(first);
    expect(order.role).toBe("EXECUTOR");
    expect(order.context_intent.purpose).toContain("Caller-supplied Plan input (not approval)");
    await writeFile(path.join(root, "result.txt"), "report\n");
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Produced the report",
        findings: [],
        uncertainty: [],
        canonical_outputs: [
          {
            id: "report",
            kind: "source",
            digest: "sha256:" + createHash("sha256").update("report\n").digest("hex"),
          },
        ],
      }),
    );
    const review = await runJson(root, [
      "task",
      "advance",
      id,
      "--result",
      exchange.result_path,
      "--agent-json",
    ]);
    const evaluator = await readSuppliedCliOrder(review);
    expect(evaluator.order.role).toBe("EVALUATOR");
    expect(evaluator.order.authority.mutation_scope).toBe("none");
    expect(evaluator.order.verification_intent.requirements).toContainEqual({
      id: "criterion-1",
      description: "result.txt contains the report",
      required: true,
      observed_by: "evaluator",
    });
    expect(evaluator.order.required_inputs.some((input) => input.id === "native-validation")).toBe(
      true,
    );
    expect(
      evaluator.order.required_inputs.some((input) => input.id === "repository-evidence"),
    ).toBe(true);
  });

  it.each([{ missing: true }, { unresolved: true }, { requirePlanner: true }])(
    "retains read-only planning for %j",
    async (options) => {
      const { root, id, created } = await createSuppliedCliTask(options);
      expect(created).toMatchObject(
        options.missing
          ? { status: "semantic_input_required", required_role: "PLANNER" }
          : { status: "advance_required", required_role: null },
      );
      const packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
      const { order } = await readSuppliedCliOrder(packet);
      expect(order.role).toBe("PLANNER");
      expect(order.authority.mutation_scope).toBe("none");
      expect(order.authority.writable_roots).toEqual([]);
      if (options.unresolved)
        expect(order.task.unresolved_questions).toContainEqual(
          expect.objectContaining({ question: "Which report?", blocking: true }),
        );
    },
  );
});
