import { KernelTaskLifecycle } from "../runner/usecases/kernel-task-lifecycle.js";
import { execFileSync } from "node:child_process";
import * as finalChecks from "../commands/task/direct-task-verification.js";
import {
  acceptKernelInspection,
  resumeKernelInspection,
} from "../commands/task/kernel-inspection.js";
import { AGENT_WORK_ORDER_V2_ZOD_SCHEMA } from "@agentplaneorg/core/schemas";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
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
import {
  loadCommandContext,
  resolveTaskOwnerCommandContext,
} from "../commands/shared/task-backend.js";
import { createKernelRuntime } from "../commands/task/kernel-runtime-context.js";

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
  it("keeps canonical observation and WorkOrder roots in the invocation worktree", async () => {
    const root = await mkGitRepoRootWithCommit();
    await writeConfig(root, defaultConfig());
    const taskId = await createTask(root);
    const git = (args: string[]) =>
      execFileSync("git", ["-c", "core.hooksPath=/dev/null", ...args], { cwd: root });
    git(["add", "."]);
    git(["commit", "-m", "canonical worktree fixture"]);
    const linked = path.join(root, ".agentplane/worktrees/canonical-context");
    git(["worktree", "add", "-b", "canonical-context", linked]);
    const initial = await loadCommandContext({ cwd: linked });
    const command = await resolveTaskOwnerCommandContext({ ctx: initial, taskId });
    expect(command.resolvedProject.gitRoot).toBe(initial.resolvedProject.gitRoot);
    const runtime = await createKernelRuntime({
      command,
      task_id: taskId,
      transport: "host",
      operation_id: "worktree-fixture",
    });
    const before = await runtime.observe();
    await writeFile(path.join(root, "unrelated-primary.txt"), "primary change");
    expect(await runtime.observe()).toMatchObject({ fingerprint: before.fingerprint });
    const packet = await runJson(linked, ["task", "advance", taskId, "--agent-json"]);
    const exchange = packet.exchange as { directory: string };
    const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
      JSON.parse(await readFile(path.join(exchange.directory, "work-order.json"), "utf8")),
    );
    expect(order.state_fingerprint.worktree).toBe(initial.resolvedProject.gitRoot);
    expect(order.canonical_binding?.repository_fingerprint).toBe(before.fingerprint);
    await writeFile(path.join(linked, "local-change.txt"), "local change");
    expect(await runtime.observe()).not.toMatchObject({ fingerprint: before.fingerprint });
  });
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
      expect(accepted.action).toMatchObject({ kind: "agent_episode" });
      const finalRead = await runtime.adapter.read(taskId);
      expect(finalRead.kind).toBe("canonical");
      if (finalRead.kind !== "canonical") throw new Error("Canonical result readback missing");
      expect(finalRead.record.aggregate.work_items.build).toMatchObject({
        state: "INSPECTING",
        attempt: 1,
      });
      expect(finalRead.task.extensions?.[TASK_CENTRIC_EXTENSION_KEY]).toBeUndefined();
      expect(finalRead.record.aggregate.authority_lineage?.at(-1)?.observation?.kind).toBe(
        "repository_implementation",
      );
      await mkdir(path.join(root, "packages/core/schemas"), { recursive: true });
      await writeFile(path.join(root, "packages/core/schemas/generated.json"), "{}");
      const delta = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      expect(delta.action).toMatchObject({
        kind: "human_required",
        reason: "canonical_authority_delta_requires_user",
        authority_delta: {
          request: {
            added_scope_roots: ["packages/core/schemas/generated.json"],
            added_repository_effects: ["repository_write", "schema"],
          },
        },
      });
      const operatorArgv = (delta.action as { operator_action: { argv: string[] } }).operator_action
        .argv;
      await runCliSilent([...operatorArgv.slice(1), "--root", root]);
      const afterDelta = await runtime.adapter.read(taskId);
      if (afterDelta.kind !== "canonical") throw new Error("Authority delta fixture missing");
      expect(afterDelta.record.aggregate.current_plan).toEqual(
        finalRead.record.aggregate.current_plan,
      );
      expect(afterDelta.record.aggregate.work_items).toEqual(finalRead.record.aggregate.work_items);
      expect(afterDelta.record.aggregate.authority_lineage?.at(-1)).toMatchObject({
        approval_mode: "manual_operator",
        observation: {
          kind: "authority_delta",
          added_scope_roots: ["packages/core/schemas/generated.json"],
        },
      });
      const resumed = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      expect(resumed.action).toMatchObject({ kind: "agent_episode" });
      const item = finalRead.record.aggregate.work_items.build!;
      const inspectionExchange = resumed.exchange as { directory: string; result_path: string };
      const inspection = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(
          await readFile(path.join(inspectionExchange.directory, "work-order.json"), "utf8"),
        ),
      );
      expect(inspection).toMatchObject({
        role: "EVALUATOR",
        authority: { mutation_scope: "none", writable_roots: [] },
      });
      expect(inspection.canonical_binding).toMatchObject({
        phase: "inspection",
        result_digest: item.result_digest,
      });
      const repeatedInspection = await runJson(root, ["task", "advance", taskId, "--agent-json"]);
      expect(repeatedInspection.exchange).toEqual(resumed.exchange);
      const review = {
        schema_version: 2 as const,
        kind: "agent_semantic_result" as const,
        work_order_id: inspection.work_order_id,
        canonical_binding: inspection.canonical_binding,
        status: "completed" as const,
        summary: "Independent inspection passed",
        findings: [],
        uncertainty: [],
        review: {
          verdict: "pass" as const,
          missing_tests: [],
          hidden_assumptions: [],
          residual_risks: [],
        },
      };
      await writeFile(path.join(root, "result.txt"), "changed after inspection");
      await expect(
        acceptKernelInspection(command, runtime, inspectionExchange.directory, review),
      ).rejects.toThrow("stale");
      await writeFile(path.join(root, "result.txt"), "implementation");
      const apply = runtime.lifecycle.apply.bind(runtime.lifecycle);
      const crash = vi.spyOn(runtime.lifecycle, "apply").mockImplementation(async (...args) => {
        const result = await apply(...args);
        if (args[0].command.kind === "record_work_item_validation")
          throw new Error("crash after durable validation");
        return result;
      });
      await expect(
        acceptKernelInspection(command, runtime, inspectionExchange.directory, review),
      ).rejects.toThrow("crash after durable validation");
      crash.mockRestore();
      const interrupted = await runtime.adapter.read(taskId);
      if (interrupted.kind !== "canonical") throw new Error("Native validation missing");
      expect(interrupted.record.aggregate.work_items.build!.state).toBe("VALIDATING");
      await resumeKernelInspection(command, runtime, interrupted.record, "build");

      const evidence = JSON.parse(
        await readFile(path.join(inspectionExchange.directory, "validation.json"), "utf8"),
      ) as { checks: unknown };
      expect(evidence.checks).toMatchObject({
        status: "passed",
        checks: [{ command: "node --version", exit_code: 0 }],
      });
      await acceptKernelInspection(command, runtime, inspectionExchange.directory, review);
      expect(
        JSON.parse(
          await readFile(path.join(inspectionExchange.directory, "validation.json"), "utf8"),
        ),
      ).toEqual(evidence);
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
      } else if (order.role === 'EVALUATOR') {
        assert.equal(order.authority.mutation_scope, 'none');
        result.review = { verdict: ${backendKind === "cloud" ? "order.canonical_binding.attempt === 1 ? 'rework' : 'pass'" : "'pass'"}, missing_tests: [], hidden_assumptions: [], residual_risks: [] };
      } else {
        assert(order.required_outputs.some(output => output.id === 'output:source'));
        if (order.canonical_binding.attempt > 1) {
          const review = order.required_inputs.find(input => input.id.startsWith('review:'));
          assert(review && review.required);
          assert.equal(JSON.parse(fs.readFileSync(review.path, 'utf8')).review.verdict, 'rework');
          assert(order.required_inputs.some(input => input.id.startsWith('checks:') && input.required));
        }
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
      const command = await loadCommandContext({ cwd: root });
      const runtime = await createKernelRuntime({
        command,
        task_id: taskId,
        transport: "managed",
        operation_id: "inspect-completion",
      });
      if (backendKind === "local") {
        const unchanged = await runtime.adapter.read(taskId);
        if (unchanged.kind !== "canonical") throw new Error("Missing canonical plan");
        const noProgress = vi.spyOn(KernelTaskLifecycle.prototype, "apply").mockResolvedValue({
          kind: "committed",
          record: unchanged.record,
          receipts: [],
          replayed: true,
        } as never);
        try {
          const stopped = await runJson(root, ["task", "run", taskId, "--json"]);
          expect(stopped.action).toMatchObject({
            kind: "human_required",
            reason: "canonical_transition_no_progress",
          });
          expect(execute).toHaveBeenCalledTimes(1);
        } finally {
          noProgress.mockRestore();
        }
        const verify = finalChecks.runDirectTaskVerification;
        let calls = 0;
        const drift = vi
          .spyOn(finalChecks, "runDirectTaskVerification")
          .mockImplementation(async (options) => {
            const result = await verify(options);
            if (++calls === 2)
              await writeFile(path.join(root, "result.txt"), "changed during final validation");
            return result;
          });
        try {
          await refused(root, ["task", "run", taskId, "--json"], "inputs changed during checks");
        } finally {
          drift.mockRestore();
        }
        await writeFile(path.join(root, "result.txt"), "managed implementation");
      } else {
        // The captured method is invoked with its original receiver through apply below.
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const apply = KernelTaskLifecycle.prototype.apply;
        const crash = vi
          .spyOn(KernelTaskLifecycle.prototype, "apply")
          .mockImplementation(async function (...args) {
            const result = await apply.apply(this, args);
            if (args[0].command.kind === "record_final_validation")
              throw new Error("crash after final validation");
            return result;
          });
        try {
          await refused(root, ["task", "run", taskId, "--json"], "crash after final validation");
        } finally {
          crash.mockRestore();
        }
        const interrupted = await runtime.adapter.read(taskId);
        expect(interrupted.kind === "canonical" && interrupted.record.aggregate.state).toBe(
          "FINAL_VALIDATION",
        );
      }
      const implemented = await runJson(root, ["task", "run", taskId, "--json"]);
      expect(implemented.action).toMatchObject({
        kind: "terminal",
        reason: "kernel_task_completed",
      });
      const completed = await runtime.adapter.read(taskId);
      if (completed.kind !== "canonical") throw new Error("Missing completed task");
      expect(completed.record.aggregate.final_validation?.status).toBe("PASSED");
      if (backendKind === "cloud")
        expect(
          Object.keys(completed.record.aggregate.mutation_receipts).filter((id) =>
            id.startsWith("final-validation:"),
          ),
        ).toHaveLength(2);
      expect(await readFile(path.join(root, "result.txt"), "utf8")).toBe("managed implementation");
      expect(execute).toHaveBeenCalledTimes(backendKind === "cloud" ? 5 : 3);
      const again = await runJson(root, ["task", "run", taskId, "--json"]);
      expect(again.action).toMatchObject({ kind: "terminal", reason: "kernel_task_completed" });
      expect(execute).toHaveBeenCalledTimes(backendKind === "cloud" ? 5 : 3);
    },
  );
});
