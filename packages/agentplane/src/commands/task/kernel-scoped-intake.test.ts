import { advanceTaskStep } from "./advance-task-step.js";
import type { KernelWorkOrder } from "../../runner/usecases/kernel-task-lifecycle.js";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { makeRunTaskCorrectiveAuthorityHandler } from "./corrective-authority.command.js";
import { tryApplyBoundedFinalCorrection } from "./kernel-corrective-authority.js";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { describe, expect, it, vi } from "vitest";
import { configureGitUser, mockConfig, tempRepo } from "@agentplane/testkit";
import { makeTaskFixture } from "@agentplane/testkit/task";
import {
  taskKernel as k,
  kernelPlanProposalSchema,
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
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";
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
  for (const correctionMode of ["manual", "bounded"] as const)
    it(
      `native ${correctionMode} correction`,
      { timeout: correctionMode === "bounded" ? 300_000 : 120_000 },
      async () => {
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
        const baseHead = await git("git", ["rev-parse", "HEAD"], { cwd: repo.root });
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
                base_sha: baseHead.stdout.trim(),
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
        const usedOrders: string[] = [];
        const usedDirectories: string[] = [];
        async function implementAndReview(
          workItemId: string,
          value: number,
          claimId = "fixture-claim",
          dispatched?: {
            implementation: KernelWorkOrder;
            workOrder: AgentWorkOrderV2;
            directory: string;
          },
        ) {
          const begun = dispatched
            ? null
            : await runtime.lifecycle.begin(
                await runtime.input(
                  {
                    kind: "transition_work_item",
                    action: "begin",
                    work_item_id: workItemId,
                    claim_id: claimId,
                  },
                  `fixture:${++sequence}`,
                ),
              );
          if (begun) requireKernelCommit(begun.result);
          const order = dispatched?.implementation ?? begun?.work_order;
          if (!order) throw new Error("Missing implementation order");
          claimId = order.binding.claim_id;
          expect(order.authority.scope_roots).toEqual(["src"]);
          expect(order.authority.external_effects).toEqual([]);
          read = await runtime.adapter.read(taskId);
          if (read.kind !== "canonical") throw new Error("Missing executing task");
          plan = read.record.aggregate.current_plan!;
          const agentOrder =
            dispatched?.workOrder ??
            (await buildKernelAgentWorkOrder({
              command,
              record: read.record,
              context: await runtime.native.readContext(taskId),
              implementation: order,
            }));
          const issued = dispatched ? null : await issueKernelExchange(command, agentOrder, "host");
          const resultDirectory = dispatched?.directory ?? issued!.exchange.directory;
          usedOrders.push(agentOrder.work_order_id);
          usedDirectories.push(resultDirectory);
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
          await writeKernelArtifact(
            resultDirectory,
            "repository-evidence.json",
            repositoryEvidence,
          );
          requireKernelCommit(await runtime.authority.continue(taskId));
          const implementation = {
            status: "completed",
            summary: `Scoped fixture source and test implemented for ${workItemId}`,
          };
          const resultDigest = k.kernelDigest(implementation);
          await writeKernelArtifact(resultDirectory, "received-result.json", implementation);
          const observation = await runtime.observe();
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
                  repository_fingerprint: observation.fingerprint,
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
            claim_id: claimId,
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
          expect(
            reviewOrder.required_inputs.some((input) => input.id === "native-validation"),
          ).toBe(true);
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
            review: {
              verdict: "pass",
              missing_tests: [],
              hidden_assumptions: [],
              residual_risks: [],
            },
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
        const corrective = kernelPlanProposalSchema.parse(
          JSON.parse(await readFile(recovery.corrective_plan, "utf8")),
        );
        const failureEvidence = await readFile(
          path.join(failed.stop.evidence, "final-validation.json"),
          "utf8",
        );
        await expect(setCanonicalPlan(command, taskId, corrective)).rejects.toThrow();
        if (correctionMode === "manual") {
          await setCanonicalPlan(command, taskId, corrective, { scopeExpansionApprovedBy: "USER" });
        } else {
          expect(await tryApplyBoundedFinalCorrection(command, taskId, failed.stop)).toBe(false);
          const beforeGrant = await runtime.adapter.read(taskId);
          if (beforeGrant.kind !== "canonical") throw new Error("Missing grant target");
          const handler = makeRunTaskCorrectiveAuthorityHandler(() => Promise.resolve(command));
          expect(
            await handler(
              {},
              {
                taskId,
                action: "grant",
                by: "USER",
                stateDigest: beforeGrant.record.digest,
                maxAttempts: 2,
                expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
              },
            ),
          ).toBe(0);
          const granted = await runtime.adapter.read(taskId);
          if (granted.kind !== "canonical") throw new Error("Missing explicit grant");
          const activeGrant = granted.record.aggregate.corrective_authority![0]!;
          vi.useFakeTimers({ toFake: ["Date"] });
          vi.setSystemTime(new Date(Date.parse(activeGrant.expires_at) + 1));
          try {
            expect(await tryApplyBoundedFinalCorrection(command, taskId, failed.stop)).toBe(false);
          } finally {
            vi.useRealTimers();
          }
          await command.taskBackend.writeTask({ ...granted.task, execution_contract: undefined });
          expect(await tryApplyBoundedFinalCorrection(command, taskId, failed.stop)).toBe(false);
          const drifted = (await command.taskBackend.getTask(taskId))!;
          await command.taskBackend.writeTask({
            ...drifted,
            execution_contract: granted.task.execution_contract,
          });
          const beforeRevoke = await runtime.adapter.read(taskId);
          if (beforeRevoke.kind !== "canonical") throw new Error("Missing revocation target");
          expect(
            await handler(
              {},
              {
                taskId,
                action: "revoke",
                by: "USER",
                stateDigest: beforeRevoke.record.digest,
                grantDigest: activeGrant.digest,
              },
            ),
          ).toBe(0);
          expect(await tryApplyBoundedFinalCorrection(command, taskId, failed.stop)).toBe(false);
          const revoked = await runtime.adapter.read(taskId);
          if (revoked.kind !== "canonical") throw new Error("Missing revoked grant");
          expect(
            await handler(
              {},
              {
                taskId,
                action: "grant",
                by: "USER",
                stateDigest: revoked.record.digest,
                maxAttempts: 2,
                expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
              },
            ),
          ).toBe(0);
          expect(await tryApplyBoundedFinalCorrection(command, taskId, failed.stop)).toBe(true);
          const afterGrant = await runtime.adapter.read(taskId);
          if (afterGrant.kind !== "canonical") throw new Error("Missing consumed grant");
          expect(afterGrant.record.aggregate.corrective_authority?.at(-1)?.uses).toHaveLength(1);
        }
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
        expect(
          await readFile(path.join(failed.stop.evidence, "final-validation.json"), "utf8"),
        ).toBe(failureEvidence);
        read = await runtime.adapter.read(taskId);
        if (read.kind !== "canonical") throw new Error("Missing reviewed correction");
        expect(await listKernelRepositoryEvidence(command, read.record)).toHaveLength(2);
        if (correctionMode === "bounded") {
          const injected = vi
            .spyOn(verification, "runDirectTaskVerification")
            .mockResolvedValueOnce({
              status: "failed",
              checks: [],
              reason: "Injected repeated final-only regression",
            });
          let dispatched: Awaited<ReturnType<typeof advanceTaskStep>>;
          try {
            dispatched = await advanceTaskStep({ command, task_id: taskId, transport: "host" });
          } finally {
            injected.mockRestore();
          }
          if (dispatched?.action.kind !== "agent_episode" || !("exchange" in dispatched))
            throw new Error(`Expected fresh corrective episode: ${JSON.stringify(dispatched)}`);
          const exchange = dispatched.exchange;
          const order = AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse(
            JSON.parse(
              await readFile(path.join(exchange.directory, exchange.work_order_ref), "utf8"),
            ),
          );
          expect(usedOrders).not.toContain(order.work_order_id);
          expect(usedDirectories).not.toContain(exchange.directory);
          expect(order.canonical_binding?.work_item_id).not.toBe(correctionId);
          read = await runtime.adapter.read(taskId);
          if (read.kind !== "canonical") throw new Error("Missing repeated correction state");
          expect(read.record.aggregate.corrective_authority?.at(-1)?.uses).toHaveLength(2);
          const nextId = read.record.aggregate.current_plan!.work_items.at(-1)!.id;
          expect(order.canonical_binding?.work_item_id).toBe(nextId);
          const resolved = await runtime.authority.resolve(taskId, nextId);
          const implementation = resumeKernelWorkOrder({
            record: read.record,
            work_item_id: nextId,
            authority: resolved.authority,
            repository_fingerprint: resolved.authority.repository_fingerprint,
          });
          if (!implementation) throw new Error("Missing dispatched native implementation");
          await implementAndReview(nextId, 4, implementation.binding.claim_id, {
            implementation,
            workOrder: order,
            directory: exchange.directory,
          });
          read = await runtime.adapter.read(taskId);
          if (read.kind !== "canonical") throw new Error("Missing second independent review");
          const exhaustedFailure = vi
            .spyOn(verification, "runDirectTaskVerification")
            .mockResolvedValueOnce({
              status: "failed",
              checks: [],
              reason: "Injected exhausted final-only regression",
            });
          let exhausted: Awaited<ReturnType<typeof runKernelFinalValidation>>;
          try {
            exhausted = await runKernelFinalValidation(command, runtime, read.record);
          } finally {
            exhaustedFailure.mockRestore();
          }
          if (!exhausted.stop) throw new Error("Missing exhausted boundary");
          expect(await tryApplyBoundedFinalCorrection(command, taskId, exhausted.stop)).toBe(false);
          read = await runtime.adapter.read(taskId);
          if (read.kind !== "canonical") throw new Error("Missing exhausted grant state");
          expect(read.record.aggregate.corrective_authority?.at(-1)?.uses).toHaveLength(2);
        }
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
      },
    );
});
