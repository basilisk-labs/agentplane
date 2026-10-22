import { readFile, writeFile, rename } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { defaultConfig } from "@agentplaneorg/core/config";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import {
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { runJson } from "../../cli/task-create-planner-intent.testkit.js";
import { ensureRuntimeGitignore } from "../../runtime/shared/runtime-gitignore.js";

import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { loadCommandContext } from "../shared/task-backend.js";
import { createKernelRuntime } from "./kernel-runtime-context.js";
import { rejectedPlanInputs } from "./kernel-rejected-plan-inputs.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";

installRunCliIntegrationHarness();
describe("rejected blocked-plan rework", { timeout: 180_000 }, () => {
  it("issues a fresh implementation with authentic blocked-plan evidence", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    await configureGitUser(root);
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);
    await ensureRuntimeGitignore({ gitRoot: root });
    await writeFile(path.join(root, "source.ts"), "export const value = 1;\n");
    await commitAll(root, "blocked plan fixture");
    const created = await runJson(root, [
      "task",
      "create",
      "Repair a declared check",
      "--route",
      "direct",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--scope-root",
      "source.ts",
      "--repository-effect",
      "source_code",
      "--capability",
      "repository_write",
      "--json",
    ]);
    const id = String(created.task_id);
    let packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    const submit = async (fields: Record<string, unknown>) => {
      const exchange = packet.exchange as { directory: string; result_path: string };
      const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
      );
      await writeFile(
        exchange.result_path,
        JSON.stringify({
          work_order_id: order.work_order_id,
          status: "completed",
          summary: "Fixture episode",
          findings: [],
          uncertainty: [],
          ...fields,
        }),
      );
      packet = await runJson(root, [
        "task",
        "advance",
        id,
        "--result",
        exchange.result_path,
        "--agent-json",
      ]);
      return { exchange, order };
    };
    const proposal = {
      work_items: [
        {
          id: "repair",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["report"],
          optional: false,
          execution_requirements: {
            scope_roots: ["source.ts"],
            repository_effects: ["source_code"],
            external_effects: [],
            capabilities: ["repository_write"],
            resources: [],
          },
          contract: {
            role: "EXECUTOR",
            objective: "Repair source",
            acceptance_criteria: ["Source remains valid"],
            verification_commands: ["node missing-check.mjs"],
          },
        },
      ],
    };
    await submit({ canonical_plan: proposal });
    expect(
      await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
    ).toBe(0);
    packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    expect(packet.authority).toMatchObject({ role: "EXECUTOR" });
    const blocked = await submit({
      status: "blocked",
      blocker: { summary: "The declared check does not exist; revise the plan before execution." },
    });
    expect(
      await runCliSilent([
        "task",
        "plan",
        "reject",
        id,
        "--by",
        "CODER",
        "--note",
        "Not an operator approval",
        "--root",
        root,
      ]),
    ).not.toBe(0);
    expect(
      await runCliSilent([
        "task",
        "plan",
        "reject",
        id,
        "--by",
        "USER",
        "--note",
        "Replace the nonexistent declared check with the actual runtime check.",
        "--root",
        root,
      ]),
    ).toBe(0);
    packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    expect(packet.authority).toMatchObject({ role: "PLANNER" });
    proposal.work_items[0]!.contract.verification_commands = ["node --version"];
    await submit({ canonical_plan: proposal });
    expect(
      await runCliSilent(["task", "plan", "approve", id, "--by", "USER", "--root", root]),
    ).toBe(0);
    packet = await runJson(root, ["task", "advance", id, "--agent-json"]);
    expect(packet.authority).toMatchObject({ role: "EXECUTOR" });
    const exchange = packet.exchange as { directory: string };
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
    );
    expect(order.canonical_binding).toMatchObject({
      phase: "implementation",
      attempt: 2,
      plan_revision: 2,
    });
    expect(order.work_order_id).not.toBe(blocked.order.work_order_id);
    expect(
      order.required_inputs.some(
        (entry) => entry.id === "approved-rejected-plan" && entry.required,
      ),
    ).toBe(true);
    const context = await loadCommandContext({ cwd: root, rootOverride: root });
    const native = await createKernelRuntime({
      command: context,
      task_id: id,
      transport: "host",
      operation_id: "inspect-rejected-plan-evidence",
    });
    const read = await native.adapter.read(id);
    if (read.kind !== "canonical") throw new Error("Expected canonical fixture");
    const noWrite = (): Promise<boolean> => {
      throw new Error("Invalid evidence must not write context");
    };
    const reject = read.record.events.find((event) => event.kind === "plan_rejected")!;
    const mutations: ((record: KernelRecord) => void)[] = [
      (record) => {
        record.events = record.events.filter(
          (event) =>
            event !== record.events.find((candidate) => candidate.kind === "plan_rejected"),
        );
      },
      (record) => {
        record.events.find((event) => event.kind === "plan_rejected")!.command_digest =
          k.kernelDigest("forged rejection");
      },
      (record) => {
        record.aggregate.mutation_receipts[reject.mutation_id]!.event_digests = [];
      },
      (record) => {
        record.aggregate.current_plan!.approval_actor_id = "forged-actor";
      },
      (record) => {
        record.aggregate.current_plan!.digest = k.kernelDigest("foreign plan");
      },
      (record) => {
        record.aggregate.work_items.repair!.attempt += 1;
      },
      (record) => {
        record.aggregate.work_items.repair!.claim_id = "foreign claim";
      },
      (record) => {
        record.repository_identity = k.kernelDigest("foreign repository");
      },
      (record) => {
        record.events.push(structuredClone(reject));
      },
    ];
    for (const mutate of mutations) {
      const changed = structuredClone(read.record);
      mutate(changed);
      expect(await rejectedPlanInputs(order, exchange.directory, changed, noWrite)).toEqual([]);
    }
    const oldResultPath = path.join(blocked.exchange.directory, "received-result.json");
    const oldResult = await readFile(oldResultPath, "utf8");
    await writeFile(
      oldResultPath,
      JSON.stringify({ ...JSON.parse(oldResult), summary: "forged blocker" }),
    );
    await expect(
      rejectedPlanInputs(order, exchange.directory, read.record, noWrite),
    ).rejects.toThrow("preceding blocked attempt");
    await writeFile(oldResultPath, oldResult);
    const oldOrderPath = path.join(blocked.exchange.directory, "work-order.json");
    const oldOrderBytes = await readFile(oldOrderPath, "utf8");
    const forgedOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(JSON.parse(oldOrderBytes));
    forgedOrder.task.revision = (forgedOrder.task.revision ?? 0) - 1;
    await writeFile(oldOrderPath, JSON.stringify(forgedOrder));
    await expect(
      rejectedPlanInputs(order, exchange.directory, read.record, noWrite),
    ).rejects.toThrow();
    await writeFile(oldOrderPath, oldOrderBytes);
    const stopPath = path.join(blocked.exchange.directory, "semantic-stop-command.json");
    await rename(stopPath, `${stopPath}.preserved`);
    try {
      await expect(
        rejectedPlanInputs(order, exchange.directory, read.record, noWrite),
      ).rejects.toThrow();
    } finally {
      await rename(`${stopPath}.preserved`, stopPath);
    }
    expect(
      await rejectedPlanInputs(order, exchange.directory, read.record, writeKernelArtifact),
    ).toHaveLength(2);
    expect(await readFile(path.join(root, "source.ts"), "utf8")).toBe("export const value = 1;\n");
  });
});
