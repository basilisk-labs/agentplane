import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TASK_CENTRIC_EXTENSION_KEY, taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithCommit,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";
import { runJson } from "./task-create-planner-intent.testkit.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import {
  requireKernelCommit,
  createKernelRuntime,
} from "../commands/task/kernel-runtime-context.js";

import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import * as taskBackend from "../backends/task-backend.js";
import { observeKernelTestRunner } from "../commands/task/kernel-run.testkit.js";

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--canonical",
      "--title",
      "Canonical creation",
      "--description",
      "Persist immutable intent with the canonical aggregate",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function refused(root: string, argv: string[], message: string) {
  const io = captureStdIO();
  try {
    expect(await runCli([...argv, "--root", root])).not.toBe(0);
    expect(io.stderr).toContain(message);
  } finally {
    io.restore();
  }
}

async function installCloudBackend(root: string) {
  const original = await taskBackend.loadTaskBackend({ cwd: root, rootOverride: null });
  const records = new Map<string, taskBackend.TaskData>();
  const backend = makeTaskBackendDouble({
    id: "canonical-cloud-fake",
    generateTaskId: (options) => original.backend.generateTaskId!(options),
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      projection: "canonical",
      reads_from_projection_by_default: false,
      atomic_task_record: true,
    },
    getTask: (id) => Promise.resolve(structuredClone(records.get(id) ?? null)),
    listTasks: () => Promise.resolve(structuredClone([...records.values()])),
    writeTask: (task, options) => {
      if ((records.get(task.id)?.revision ?? 0) !== options?.expectedRevision)
        return Promise.reject(new Error("CAS conflict"));
      records.set(task.id, structuredClone(task));
      return Promise.resolve();
    },
  });
  vi.spyOn(taskBackend, "loadTaskBackend").mockResolvedValue({
    ...original,
    backend,
    backendId: backend.id,
  });
}

installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());
describe("canonical CLI transport", { timeout: 60_000 }, () => {
  it.each(["local", "cloud"] as const)(
    "canonical first-write and host lifecycle on %s storage",
    async (backendKind) => {
      const root = await mkGitRepoRootWithCommit();
      await writeConfig(root, defaultConfig());
      if (backendKind === "cloud") await installCloudBackend(root);
      const taskId = await createTask(root);
      const command = await loadCommandContext({ cwd: root });
      const runtime = await createKernelRuntime({
        command,
        task_id: taskId,
        transport: "host",
        operation_id: "inspect",
      });
      const read = await runtime.adapter.read(taskId);
      expect(read.kind).toBe("canonical");
      if (read.kind !== "canonical") throw new Error("Canonical readback missing");
      expect(read.task.revision).toBe(1);
      expect(read.record.aggregate).toMatchObject({ state: "PLANNING", revision: 1 });
      expect(read.record.documents?.intent.objective).toBe("Canonical creation");
      expect(read.task.extensions?.[TASK_CENTRIC_EXTENSION_KEY]).toBeUndefined();
      const planning = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      const planningExchange = planning.exchange as { directory: string; result_path: string };
      const planner = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(
          await readFile(path.join(planningExchange.directory, "work-order.json"), "utf8"),
        ),
      );
      const semantic = {
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: planner.work_order_id,
        status: "completed",
        summary: "Bounded canonical plan",
        findings: [],
        uncertainty: [],
        canonical_binding: planner.canonical_binding,
        canonical_plan: {
          work_items: [
            {
              id: "build",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["source"],
              optional: false,
              execution_requirements: {
                scope_roots: ["result.txt"],
                repository_effects: ["source_code"],
                external_effects: [],
                capabilities: ["repository_write"],
                resources: [],
              },
              contract: {
                objective: "Write result.txt",
                acceptance_criteria: ["Result contains implementation"],
                verification_commands: ["node --version"],
                role: "EXECUTOR",
              },
            },
          ],
        },
      };
      semantic.canonical_plan.work_items.push({
        ...structuredClone(semantic.canonical_plan.work_items[0]!),
        id: "followup",
        depends_on: ["build"],
        required_inputs: ["source"],
        expected_outputs: ["followup-output"],
        execution_requirements: {
          ...semantic.canonical_plan.work_items[0]!.execution_requirements,
          scope_roots: ["more"],
        },
      });
      await writeFile(planningExchange.result_path, JSON.stringify(semantic));
      const approval = await runJson(root, [
        "task",
        "advance",
        taskId,
        "--result",
        planningExchange.result_path,
        "--agent-json",
      ]);
      expect(approval.action).toMatchObject({ kind: "approval_required" });
      const replay = await runJson(root, [
        "task",
        "advance",
        taskId,
        "--result",
        planningExchange.result_path,
        "--agent-json",
      ]);
      expect(replay.action).toMatchObject({ kind: "approval_required" });
      await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]);
      const executing = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      expect(executing.action).toMatchObject({ kind: "agent_episode" });
      const implementationExchange = executing.exchange as {
        directory: string;
        result_path: string;
      };
      const executor = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(
          await readFile(path.join(implementationExchange.directory, "work-order.json"), "utf8"),
        ),
      );
      expect(executor.canonical_binding).toMatchObject({
        phase: "implementation",
        work_item_id: "build",
        attempt: 1,
        plan_revision: 1,
      });
      const waiting = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      expect(waiting.action).toMatchObject({
        kind: "external_wait",
        reason: "kernel_work_item_result_required",
      });
      await writeFile(path.join(root, "result.txt"), "implementation");
      const result = {
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: executor.work_order_id,
        status: "completed",
        summary: "Created implementation",
        findings: [],
        uncertainty: [],
        canonical_binding: executor.canonical_binding,
        canonical_outputs: [
          { id: "source", kind: "source", digest: k.kernelDigest("implementation") },
        ],
      };
      const beforeInvalid = await runtime.adapter.read(taskId);
      for (const invalid of [
        { ...result, canonical_binding: { ...result.canonical_binding, claim_id: "foreign" } },
        { ...result, canonical_outputs: [] },
      ]) {
        await writeFile(implementationExchange.result_path, JSON.stringify(invalid));
        await refused(
          root,
          [
            "task",
            "advance",
            taskId,
            "--result",
            implementationExchange.result_path,
            "--agent-json",
          ],
          "Canonical",
        );
        expect(await runtime.adapter.read(taskId)).toEqual(beforeInvalid);
      }
      await writeFile(path.join(root, "outside.txt"), "not authorized");
      await writeFile(implementationExchange.result_path, JSON.stringify(result));
      await refused(
        root,
        ["task", "advance", taskId, "--result", implementationExchange.result_path, "--agent-json"],
        "outside its WorkItem scope",
      );
      expect(await runtime.adapter.read(taskId)).toEqual(beforeInvalid);
      await rm(path.join(root, "outside.txt"));
      await refused(
        root,
        ["task", "update", taskId, "--title", "Legacy overwrite"],
        "legacy mutation is refused",
      );
      expect(await runtime.adapter.read(taskId)).toEqual(beforeInvalid);
      await writeFile(implementationExchange.result_path, JSON.stringify(result));
      const accepted = await runJson(root, [
        "task",
        "advance",
        taskId,
        "--result",
        implementationExchange.result_path,
        "--agent-json",
      ]);
      expect(accepted.action).toMatchObject({ reason: "kernel_work_item_inspection_required" });
      const finalRead = await runtime.adapter.read(taskId);
      expect(finalRead.kind).toBe("canonical");
      if (finalRead.kind !== "canonical") throw new Error("Canonical result readback missing");
      expect(finalRead.record.aggregate.work_items.build).toMatchObject({
        state: "RESULT_RECEIVED",
        attempt: 1,
      });
      expect(finalRead.task.extensions?.[TASK_CENTRIC_EXTENSION_KEY]).toBeUndefined();
      expect(finalRead.record.aggregate.authority_lineage?.at(-1)?.observation?.kind).toBe(
        "repository_implementation",
      );
      const item = finalRead.record.aggregate.work_items.build!;
      // Fixture-only native validation. This is not production artifact qualification.
      for (const payload of [
        {
          kind: "transition_work_item",
          action: "inspect",
          work_item_id: "build",
          claim_id: item.claim_id,
        },
        {
          kind: "record_work_item_validation",
          work_item_id: "build",
          validation: {
            status: "PASSED",
            identity: {
              implementation_identity: item.result_digest!,
              check_id: "fixture",
              command_digest: k.kernelDigest("test"),
              toolchain_digest: k.kernelDigest("toolchain"),
              environment_digest: k.kernelDigest("env"),
            },
            evidence_digests: [k.kernelDigest("fixture-log")],
            observed_at: new Date().toISOString(),
          },
        },
        {
          kind: "transition_work_item",
          action: "complete",
          work_item_id: "build",
          claim_id: item.claim_id,
        },
      ] as const)
        requireKernelCommit(
          await runtime.lifecycle.apply(await runtime.input(payload, k.kernelDigest(payload))),
        );
      const completed = await runtime.adapter.read(taskId);
      if (completed.kind !== "canonical") throw new Error("Completed fixture missing");
      const refined = structuredClone(semantic.canonical_plan);
      refined.work_items[1]!.execution_requirements.scope_roots = ["more/result.txt"];
      await runCliSilent([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        JSON.stringify(refined),
        "--root",
        root,
      ]);
      const amended = await runtime.adapter.read(taskId);
      if (amended.kind !== "canonical") throw new Error("Amendment missing");
      expect(amended.record.aggregate.current_plan?.revision).toBe(2);
      expect(amended.record.aggregate.work_items.build).toEqual(
        completed.record.aggregate.work_items.build,
      );
      expect(amended.record.aggregate.authority_lineage?.at(-1)?.observation?.kind).toBe(
        "plan_amendment",
      );
      await runCliSilent([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        JSON.stringify(refined),
        "--root",
        root,
      ]);
      expect(await runtime.adapter.read(taskId)).toEqual(amended);
      refined.work_items[1]!.execution_requirements.scope_roots = ["."];
      await refused(
        root,
        ["task", "plan", "set", taskId, "--text", JSON.stringify(refined)],
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
      expect(await runtime.adapter.read(taskId)).toEqual(amended);
    },
  );
  it.each([
    "real-custom:local",
    "trusted-adapter-contract-double:local",
    "trusted-adapter-contract-double:cloud",
  ] as const)(
    "managed transport: %s preserves receipt admission and dispatch ownership",
    async (scenario) => {
      const [mode, backendKind] = scenario.split(":");
      const root = await mkGitRepoRootWithCommit();
      const config = defaultConfig();
      config.runner.default_adapter = "custom";
      config.runner.custom = { command: [process.execPath, path.join(root, "runner.cjs")] };
      await writeConfig(root, config);
      await writeFile(
        path.join(root, "runner.cjs"),
        `
      const fs = require('node:fs');
      const assert = require('node:assert/strict');
      const bundle = JSON.parse(fs.readFileSync(process.env.AGENTPLANE_RUNNER_BUNDLE_PATH, 'utf8'));
      const order = bundle.work_order;
      const bootstrap = fs.readFileSync(process.env.AGENTPLANE_RUNNER_BOOTSTRAP_PATH, 'utf8');
      assert(bootstrap.includes('canonical_binding'));
      assert(bootstrap.includes(order.canonical_binding.repository_fingerprint));
      const result = { schema_version: 2, kind: 'agent_semantic_result', work_order_id: order.work_order_id,
        status: 'completed', summary: 'Managed canonical episode', findings: [], uncertainty: [], canonical_binding: order.canonical_binding };
      if (order.role === 'PLANNER') {
        result.canonical_plan = { work_items: [{ id: 'build', depends_on: [], required_inputs: [], expected_outputs: ['source'], optional: false,
          execution_requirements: { scope_roots: ['result.txt'], repository_effects: ['source_code'], external_effects: [], capabilities: ['repository_write'], resources: [] },
          contract: { role: 'EXECUTOR', objective: 'Write result.txt', acceptance_criteria: ['Result exists'], verification_commands: ['node --version'] } }] };
      } else {
        assert(order.required_outputs.some(output => output.id === 'output:source'));
        fs.writeFileSync('result.txt', 'managed implementation');
        result.canonical_outputs = [{ id: 'source', kind: 'source', digest: 'sha256:' + require('node:crypto').createHash('sha256').update('managed implementation').digest('hex') }];
      }
      fs.writeFileSync(process.env.AGENTPLANE_RUNNER_RESULT_PATH, JSON.stringify(result));
    `,
      );
      if (backendKind === "cloud") await installCloudBackend(root);
      const taskId = await createTask(root);
      const execute = observeKernelTestRunner(
        config.runner.custom,
        mode === "trusted-adapter-contract-double",
      );
      const preview = await runJson(root, ["task", "run", taskId, "--dry-run", "--json"]);
      expect(preview.action).toMatchObject({ kind: "read_only" });
      expect(execute).not.toHaveBeenCalled();
      const planned = await runJson(root, ["task", "run", taskId, "--json"]);
      if (mode === "real-custom") {
        expect(planned.action).toMatchObject({
          kind: "human_required",
          reason: "canonical_runner_receipt_not_successful",
        });
        const command = await loadCommandContext({ cwd: root });
        const runtime = await createKernelRuntime({
          command,
          task_id: taskId,
          transport: "managed",
          operation_id: "inspect",
        });
        const state = await runtime.adapter.read(taskId);
        expect(state.kind === "canonical" && state.record.aggregate.current_plan).toBeNull();
        expect(execute).toHaveBeenCalledTimes(1);
        return;
      }
      expect(planned.action).toMatchObject({ kind: "approval_required" });
      await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]);
      const implemented = await runJson(root, ["task", "run", taskId, "--json"]);
      expect(implemented.action).toMatchObject({ reason: "kernel_work_item_inspection_required" });
      expect(await readFile(path.join(root, "result.txt"), "utf8")).toBe("managed implementation");
      expect(execute).toHaveBeenCalledTimes(2);
      const again = await runJson(root, ["task", "run", taskId, "--json"]);
      expect(again.action).toMatchObject({ reason: "kernel_work_item_inspection_required" });
      expect(execute).toHaveBeenCalledTimes(2);
    },
  );
});
