import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import { describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../commands/shared/task-backend.js";
import { observeKernelTestRunner } from "../commands/task/kernel-run.testkit.js";
import { runManagedTransportStep } from "../commands/task/kernel-run.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { runJson } from "./task-create-planner-intent.testkit.js";

installRunCliIntegrationHarness();

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "create",
      "Managed owner parity",
      "--description",
      "Preserve one semantic obligation across transports.",
      "--owner",
      "CODER",
      "--priority",
      "med",
      "--tag",
      "code",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--scope-root",
      "managed-result.txt",
      "--capability",
      "repository_write",
      "--allow-duplicate",
      "--json",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    const created = JSON.parse(io.stdout) as {
      task_id: string;
      execution_contract: { authority: { allowed_capabilities?: string[] } };
    };
    expect(created.execution_contract.authority.allowed_capabilities).toContain("repository_write");
    return created.task_id;
  } finally {
    io.restore();
  }
}

const plan = {
  work_items: [
    {
      id: "build",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["source"],
      optional: false,
      execution_requirements: {
        scope_roots: ["managed-result.txt"],
        repository_effects: ["source_code"],
        external_effects: [],
        capabilities: ["repository_write"],
        resources: [],
      },
      contract: {
        role: "EXECUTOR",
        objective: "Write the managed result.",
        acceptance_criteria: ["The managed result exists."],
        verification_commands: ["node --version"],
      },
    },
  ],
};

async function externalPlanner(root: string, taskId: string) {
  const packet = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
  const exchange = packet.exchange as { directory: string; result_path: string };
  const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
    JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
  );
  await writeFile(
    exchange.result_path,
    JSON.stringify({
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: order.work_order_id,
      canonical_binding: order.canonical_binding,
      status: "completed",
      summary: "Shared transport plan",
      findings: [],
      uncertainty: [],
      canonical_plan: plan,
    }),
  );
  return await runJson(root, [
    "task",
    "advance",
    taskId,
    "--result",
    exchange.result_path,
    "--agent-json",
  ]);
}

describe("LC-16 managed owner cutover", { timeout: 120_000 }, () => {
  it("keeps non-semantic stops real and never launches an adapter for them", async () => {
    const commandSource = await readFile(
      new URL("../commands/task/run.command.ts", import.meta.url),
      "utf8",
    );
    expect(commandSource).not.toContain("superviseDirectTaskRun");
    expect(commandSource).not.toContain("superviseBranchTaskRun");
    type Packet =
      | { action: { kind: "approval_required"; reason: string } }
      | { action: { kind: "external_wait"; reason: string } }
      | { action: { kind: "human_required"; reason: string } }
      | { exchange: object };
    const execute = vi.fn<(packet: Extract<Packet, { exchange: object }>) => Promise<Packet>>();
    for (const packet of [
      { action: { kind: "approval_required", reason: "user_plan_approval_required" } },
      { action: { kind: "external_wait", reason: "provider_status_pending" } },
      { action: { kind: "human_required", reason: "canonical_effect_reconciliation_required" } },
    ] satisfies Packet[]) {
      await expect(
        runManagedTransportStep<Packet, Packet>({
          advance: () => Promise.resolve(packet),
          execute,
        }),
      ).resolves.toEqual(packet);
    }
    expect(execute).not.toHaveBeenCalled();
  });

  it("rejects legacy managed execution with the exact migration command", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeConfig(root, defaultConfig());
    const command = await loadCommandContext({ cwd: root });
    const task = makeTaskFixture({ id: "202609210003-ABC1", status: "TODO" });
    await command.taskBackend.writeTask(task);
    const io = captureStdIO();
    try {
      expect(await runCli(["task", "run", task.id, "--json", "--root", root])).not.toBe(0);
      expect(io.stderr).toContain(`agentplane task kernel-migrate ${task.id}`);
      expect(io.stderr).toContain("Managed legacy execution is disabled");
    } finally {
      io.restore();
    }
  });

  it("preserves executor obligations across transports and launches one adapter per run", async () => {
    const root = await mkGitRepoRootWithCommit();
    const config = defaultConfig();
    config.runner.default_adapter = "custom";
    config.runner.custom = { command: [process.execPath, path.join(root, "runner.cjs")] };
    await writeConfig(root, config);
    await writeFile(
      path.join(root, "runner.cjs"),
      `
      const crypto = require('node:crypto');
      const fs = require('node:fs');
      const bundle = JSON.parse(fs.readFileSync(process.env.AGENTPLANE_RUNNER_BUNDLE_PATH, 'utf8'));
      const order = bundle.work_order;
      const result = { schema_version: 2, kind: 'agent_semantic_result', work_order_id: order.work_order_id,
        canonical_binding: order.canonical_binding, status: 'completed', summary: 'Managed semantic step', findings: [], uncertainty: [] };
      if (order.role === 'PLANNER') result.canonical_plan = ${JSON.stringify(plan)};
      if (order.role === 'EXECUTOR') {
        const contents = 'managed implementation';
        fs.writeFileSync('managed-result.txt', contents);
        result.canonical_outputs = [{ id: 'source', kind: 'source', digest: 'sha256:' + crypto.createHash('sha256').update(contents).digest('hex') }];
      }
      fs.writeFileSync(process.env.AGENTPLANE_RUNNER_RESULT_PATH, JSON.stringify(result));
    `,
    );
    const externalTask = await createTask(root);
    const managedTask = await createTask(root);
    const externalApproval = await externalPlanner(root, externalTask);
    expect(externalApproval.action).toMatchObject({ kind: "approval_required" });

    const execute = observeKernelTestRunner(config.runner.custom, true);
    const managedApproval = await runJson(root, ["task", "run", managedTask, "--json"]);
    expect(managedApproval.action, JSON.stringify(managedApproval)).toMatchObject({
      kind: "approval_required",
    });
    expect(execute).toHaveBeenCalledTimes(1);

    const repeatedApproval = await runJson(root, ["task", "run", managedTask, "--json"]);
    expect(repeatedApproval.action).toMatchObject({ kind: "approval_required" });
    expect(execute).toHaveBeenCalledTimes(1);

    await runCliSilent(["task", "plan", "approve", externalTask, "--by", "USER", "--root", root]);
    await runCliSilent(["task", "plan", "approve", managedTask, "--by", "USER", "--root", root]);
    const externalPacket = await runJson(root, ["task", "advance", externalTask, "--agent-json"]);
    const externalExchange = externalPacket.exchange as { directory: string };
    const externalOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(externalExchange.directory, "work-order.json"), "utf8")),
    );

    const managedNext = await runJson(root, ["task", "run", managedTask, "--json"]);
    expect(managedNext).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "EVALUATOR" },
    });
    expect(execute).toHaveBeenCalledTimes(2);
    const managedInvocation = execute.mock.calls.at(-1)?.[0];
    expect(managedInvocation).toBeDefined();
    const managedBundle = JSON.parse(await readFile(managedInvocation!.bundle_path, "utf8")) as {
      work_order: unknown;
    };
    const managedOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(managedBundle.work_order);
    expect(managedOrder.role).toBe("EXECUTOR");
    expect({
      objective: managedOrder.task.objective,
      acceptance: managedOrder.task.acceptance_criteria,
      requiredOutputs: managedOrder.required_outputs,
      mutation: managedOrder.authority.mutation_scope,
      checks: managedOrder.verification_intent.requirements.map((item) => item.description),
    }).toEqual({
      objective: externalOrder.task.objective,
      acceptance: externalOrder.task.acceptance_criteria,
      requiredOutputs: externalOrder.required_outputs,
      mutation: externalOrder.authority.mutation_scope,
      checks: externalOrder.verification_intent.requirements.map((item) => item.description),
    });
  });
});
