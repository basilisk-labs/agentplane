import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import {
  taskKernel as k,
  createTaskExecutionBaseIdentity,
  TASK_EXECUTION_CONTEXT_EXTENSION_KEY,
} from "@agentplaneorg/core/tasks";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { createCanonicalTask } from "./kernel-create.js";
import { setCanonicalPlan } from "./kernel-plan.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";
import {
  createKernelRuntime,
  requireKernelCommit,
  type KernelCommandPayload,
} from "./kernel-runtime-context.js";
import { ensureCanonicalTaskWorktree } from "./kernel-worktree-routing.js";
import { resolveTaskExecutionRoute } from "../../runtime/task-routing/index.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { projectCanonicalPlanApproval } from "./kernel-plan-authority.js";
import { issueKernelExchange, writeKernelArtifact } from "./kernel-exchange.js";
import { buildKernelAgentWorkOrder } from "./kernel-work-order.js";
import {
  commitCanonicalImplementation,
  listKernelRepositoryEvidence,
} from "./kernel-repository-coordinator.js";
import { issueKernelInspection, acceptKernelInspection } from "./kernel-inspection.js";
import { runKernelFinalValidation } from "./kernel-final-validation.js";
import * as verification from "./direct-task-verification.js";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
} from "@agentplaneorg/core/schemas";

const git = promisify(execFile);

describe("explicit code-and-tests intake lifecycle", { timeout: 120_000 }, () => {
  it("retains scoped authority through native preparation, implementation, inspection and completion", async () => {
    const repo = await tempRepo({ branch: "main" });
    await configureGitUser(repo.root);
    await git("git", ["config", "agentplane.baseBranch", "main"], { cwd: repo.root });
    await repo.writeConfig(
      mockConfig((config) => {
        config.workflow_mode = "branch_pr";
      }),
    );
    await mkdir(path.join(repo.root, "src"));
    await writeFile(path.join(repo.root, "src/value.ts"), "export const value = 1;\n");
    await writeFile(path.join(repo.root, "outside.txt"), "committed\n");
    await writeFile(path.join(repo.root, ".gitignore"), ".agentplane/bin/\n");
    await git("git", ["add", "."], { cwd: repo.root });
    await git("git", ["-c", "core.hooksPath=/dev/null", "commit", "-m", "seed scoped intake"], {
      cwd: repo.root,
    });
    await writeFile(path.join(repo.root, "outside.txt"), "preserve user edits\n");
    let command = await loadCommandContext({ cwd: repo.root });
    const taskId = "202610090003-ABC345";
    const contract = resolveExplicitExecutionContract({
      config: command.config,
      parsed: { route: "branch_pr", scopeRoots: ["src"], verify: ["node src/value.test.ts"] },
      intent: { taskKind: "code", mutationScope: "code" },
    });
    expect(contract.authority.allowed_repository_effects).toEqual(
      expect.arrayContaining(["source_code", "tests", "repository_write"]),
    );
    const created = await createCanonicalTask(
      command,
      makeTaskFixture({
        id: taskId,
        priority: "med",
        task_kind: "code",
        mutation_scope: "code",
        extensions: {
          [TASK_EXECUTION_CONTEXT_EXTENSION_KEY]: createTaskExecutionBaseIdentity({
            base_ref: "main",
            base_sha: (await git("git", ["rev-parse", "HEAD"], { cwd: repo.root })).stdout.trim(),
            source: "explicit",
            repository_identity: await resolveLogicalRepositoryIdentity({
              git_root: repo.root,
              task: {},
            }),
          }),
        },
        execution_contract: contract,
        execution_route: resolveTaskExecutionRoute({
          config: command.config,
          requestedMode: "branch_pr",
          task: { task_kind: "code", mutation_scope: "code" },
          declaration: contract.declaration,
        }),
      }),
    );
    const requirements = {
      scope_roots: ["src"],
      repository_effects: ["source_code", "tests", "repository_write"],
      external_effects: [],
      capabilities: ["repository_write"],
      resources: [],
    };
    const proposal = {
      work_items: [
        {
          id: "build",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["built"],
          optional: false,
          execution_requirements: requirements,
          contract: {
            objective: "Update scoped source and tests",
            acceptance_criteria: ["Source and test agree"],
            verification_commands: ["node src/value.test.ts"],
            role: "EXECUTOR",
          },
        },
      ],
    };
    for (const invalid of [
      { ...requirements, scope_roots: ["outside"] },
      { ...requirements, external_effects: ["network_read"] },
    ]) {
      await expect(
        setCanonicalPlan(command, taskId, {
          work_items: [{ ...proposal.work_items[0], execution_requirements: invalid }],
        }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: { reason_code: "plan_exceeds_execution_contract" },
      });
    }
    await expect(
      setCanonicalPlan(command, taskId, {
        work_items: [
          {
            ...proposal.work_items[0],
            execution_requirements: { ...requirements, external_effects: ["publish"] },
          },
        ],
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "invalid_canonical_plan" },
    });
    await setCanonicalPlan(command, taskId, proposal);
    // This is an isolated operator fixture, not a receipt for the repository under development.
    let runtime = await createKernelRuntime({
      command,
      task_id: taskId,
      transport: "manual",
      operation_id: `approve:${taskId}`,
      approval: {
        kind: "manual_operator",
        actor_id: "USER",
        invocation_id: "scoped-intake-fixture",
      },
    });
    await runtime.checkpoint(await runtime.observe());
    requireKernelCommit(await runtime.authority.approve(taskId));
    let read = await runtime.adapter.read(taskId);
    if (read.kind !== "canonical" || !read.record.aggregate.current_plan)
      throw new Error("Missing approved plan");
    let plan = read.record.aggregate.current_plan;
    await projectCanonicalPlanApproval(command, taskId, read.record);
    let sequence = 0;
    const apply = async (payload: KernelCommandPayload) =>
      requireKernelCommit(
        await runtime.lifecycle.apply(await runtime.input(payload, `fixture:${++sequence}`)),
      );
    await apply({
      kind: "materialize_work_items",
      plan_revision: plan.revision,
      plan_digest: plan.digest,
    });
    await apply({
      kind: "transition_work_item",
      action: "claim",
      work_item_id: "build",
      claim_id: "fixture-claim",
    });
    const route = await buildTaskRouteDecision({
      ctx: command,
      cwd: repo.root,
      rootOverride: null,
      includeRemote: false,
      freshHead: true,
      taskId,
    });
    expect(route.workflowStep).toMatchObject({
      kind: "cli_operation",
      operation: { id: "worktree.prepare" },
    });
    const prepared = await ensureCanonicalTaskWorktree({
      command,
      task: created.task,
      taskId,
      reasonCode: "kernel_work_item_execution_required",
      hasWorkItem: true,
      runtime,
    });
    expect(prepared?.kind).toBe("external_wait");
    if (!prepared) throw new Error("Missing native task worktree");
    command = await loadCommandContext({ cwd: prepared.must_run_from });
    runtime = await createKernelRuntime({
      command,
      task_id: taskId,
      transport: "manual",
      operation_id: "scoped-intake-execution",
    });
    requireKernelCommit(await runtime.authority.continue(taskId));
    async function implementAndReview(workItemId: string, value: number) {
      const begun = await runtime.lifecycle.begin(
        await runtime.input(
          {
            kind: "transition_work_item",
            action: "begin",
            work_item_id: workItemId,
            claim_id: "fixture-claim",
          },
          `fixture:${++sequence}`,
        ),
      );
      requireKernelCommit(begun.result);
      const order = begun.work_order;
      if (!order) throw new Error("Missing implementation order");
      expect(order.authority.scope_roots).toEqual(["src"]);
      expect(order.authority.external_effects).toEqual([]);
      read = await runtime.adapter.read(taskId);
      if (read.kind !== "canonical") throw new Error("Missing executing task");
      const agentOrder = await buildKernelAgentWorkOrder({
        command,
        record: read.record,
        context: await runtime.native.readContext(taskId),
        implementation: order,
      });
      const implementationExchange = await issueKernelExchange(command, agentOrder, "host");
      const resultDirectory = implementationExchange.exchange.directory;
      await writeFile(
        path.join(prepared!.must_run_from, "src/value.ts"),
        `export const value = ${value};\n`,
      );
      await writeFile(
        path.join(prepared!.must_run_from, "src/value.test.ts"),
        `import { value } from './value.ts';\nif (value !== ${value}) throw new Error('value');\n`,
      );
      const repositoryEvidence = await commitCanonicalImplementation({
        command,
        directory: resultDirectory,
        work_order: agentOrder,
        changed_paths: ["src/value.ts", "src/value.test.ts"],
        repository_effects: requirements.repository_effects,
      });
      expect(repositoryEvidence).not.toBeNull();
      await writeKernelArtifact(resultDirectory, "repository-evidence.json", repositoryEvidence);
      requireKernelCommit(await runtime.authority.continue(taskId));
      const implementation = {
        status: "completed",
        summary: `Scoped fixture source and test implemented for ${workItemId}`,
      };
      const resultDigest = k.kernelDigest(implementation);
      await writeKernelArtifact(resultDirectory, "received-result.json", implementation);
      const receipt = await runtime.input(
        {
          kind: "accept_work_item_result",
          plan_revision: plan.revision,
          plan_digest: plan.digest,
          work_item_id: workItemId,
          result_digest: resultDigest,
          output_manifests: [
            {
              id: order.expected_outputs[0]!,
              kind: "source",
              digest: resultDigest,
              task_id: taskId,
              plan_revision: plan.revision,
              work_item_id: workItemId,
              attempt: order.binding.attempt,
              repository_fingerprint: (await runtime.observe()).fingerprint,
            },
          ],
        },
        `result:${agentOrder.work_order_id}`,
      );
      requireKernelCommit(await runtime.lifecycle.receiveResult(receipt, order.binding));
      await apply({
        kind: "transition_work_item",
        action: "inspect",
        work_item_id: workItemId,
        claim_id: "fixture-claim",
      });
      read = await runtime.adapter.read(taskId);
      if (read.kind !== "canonical") throw new Error("Missing received implementation");
      const inspection = await issueKernelInspection(command, runtime, read.record, workItemId);
      if (!inspection || !("exchange" in inspection))
        throw new Error("Missing independent inspection exchange");
      const reviewOrder = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
        JSON.parse(
          await readFile(path.join(inspection.exchange.directory, "work-order.json"), "utf8"),
        ),
      );
      expect(reviewOrder.role).toBe("EVALUATOR");
      expect(reviewOrder.authority.writable_roots).toEqual([]);
      expect(reviewOrder.required_inputs.some((input) => input.id === "native-validation")).toBe(
        true,
      );
      const review = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse({
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: reviewOrder.work_order_id,
        status: "completed",
        canonical_binding: reviewOrder.canonical_binding,
        summary: "Independent fixture review",
        findings: ["Source and test agree within src."],
        uncertainty: [],
        claimed_checks: [],
        review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
      });
      await acceptKernelInspection(
        command,
        runtime,
        inspection.exchange.directory,
        review,
        reviewOrder,
      );
      read = await runtime.adapter.read(taskId);
      if (read.kind !== "canonical") throw new Error("Missing inspected implementation");
      expect(read.record.aggregate.work_items[workItemId]?.state).toBe("COMPLETED");
    }
    await implementAndReview("build", 2);
    read = await runtime.adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error("Missing inspected implementation");
    expect(await listKernelRepositoryEvidence(command, read.record)).toHaveLength(1);
    const completed = structuredClone(read.record.aggregate.work_items.build);
    // Inject a final-only check failure. WorkItem checks and both evaluator exchanges run normally.
    const failure = vi.spyOn(verification, "runDirectTaskVerification").mockResolvedValueOnce({
      status: "failed",
      checks: [],
      reason: "Injected final-only regression",
    });
    let failed: Awaited<ReturnType<typeof runKernelFinalValidation>>;
    try {
      failed = await runKernelFinalValidation(command, runtime, read.record);
    } finally {
      failure.mockRestore();
    }
    expect(failed).toMatchObject({
      stop: { reason: "canonical_final_checks_failed", failure_class: "code_regression" },
    });
    if (!("stop" in failed) || !("recovery" in failed.stop))
      throw new Error("Missing corrective route");
    const recovery = failed.stop.recovery;
    if (!("corrective_plan" in recovery) || typeof recovery.corrective_plan !== "string")
      throw new Error("Missing corrective plan");
    const corrective = JSON.parse(await readFile(recovery.corrective_plan, "utf8"));
    const failureEvidence = await readFile(
      path.join(failed.stop.evidence, "final-validation.json"),
      "utf8",
    );
    await expect(setCanonicalPlan(command, taskId, corrective)).rejects.toThrow();
    await setCanonicalPlan(command, taskId, corrective, { scopeExpansionApprovedBy: "USER" });
    await runtime.authority.resolve(taskId);
    read = await runtime.adapter.read(taskId);
    if (read.kind !== "canonical" || !read.record.aggregate.current_plan)
      throw new Error("Missing corrective plan admission");
    expect(read.record.aggregate.work_items.build).toEqual(completed);
    plan = read.record.aggregate.current_plan;
    const correctionId = plan.work_items.at(-1)!.id;
    await expect(apply({ kind: "complete_task" })).rejects.toThrow();
    await apply({
      kind: "transition_work_item",
      action: "claim",
      work_item_id: correctionId,
      claim_id: "fixture-claim",
    });
    await implementAndReview(correctionId, 3);
    expect(await readFile(path.join(failed.stop.evidence, "final-validation.json"), "utf8")).toBe(
      failureEvidence,
    );
    read = await runtime.adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error("Missing reviewed correction");
    expect(await listKernelRepositoryEvidence(command, read.record)).toHaveLength(2);
    const final = await runKernelFinalValidation(command, runtime, read.record);
    expect(final).not.toHaveProperty("stop");
    await apply({ kind: "complete_task" });
    read = await runtime.adapter.read(taskId);
    expect(read).toMatchObject({
      kind: "canonical",
      record: { aggregate: { state: "COMPLETED" } },
    });
    expect(await readFile(path.join(repo.root, "outside.txt"), "utf8")).toBe(
      "preserve user edits\n",
    );
  });
});
