import { runKernelFinalValidation } from "./kernel-final-validation.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import {
  issueKernelInspection,
  acceptKernelInspection,
  resumeKernelInspection,
} from "./kernel-inspection.js";
import { canonicalPlanFromProposal } from "./kernel-plan.js";
import path from "node:path";
import {
  repositoryEffectsForPath,
  taskKernel as k,
  kernelPlanProposalSchema,
} from "@agentplaneorg/core/tasks";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { KernelWorkBinding } from "../../runner/usecases/kernel-task-lifecycle.js";
import { kernelApprovalReference } from "../../runner/usecases/kernel-authority.js";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { buildKernelAgentWorkOrder } from "./kernel-work-order.js";
import {
  issueKernelExchange,
  readKernelOrderResult,
  writeKernelArtifact,
} from "./kernel-exchange.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

async function authorityDeltaStop(runtime: Runtime, taskId: string) {
  const prepared = await runtime.authority.prepareDelta(taskId, repositoryEffectsForPath);
  return {
    kind: "human_required" as const,
    reason: "canonical_authority_delta_requires_user",
    summary: "Repository changes exceed the approved canonical scope.",
    authority_delta: prepared,
    operator_action: {
      kind: "extend_scope" as const,
      argv: [
        "agentplane",
        "task",
        "scope",
        "extend",
        taskId,
        ...prepared.request.added_scope_roots.flatMap((root) => ["--scope-root", root]),
        ...prepared.request.added_repository_effects.flatMap((effect) => [
          "--repository-effect",
          effect,
        ]),
        "--request-digest",
        prepared.request_digest,
        "--state-scope-digest",
        prepared.request_digest,
        "--by",
        "USER",
      ],
    },
  };
}

async function acceptKernelSemanticResult(
  command: CommandContext,
  taskId: string,
  runtime: Runtime,
  resultPath: string,
) {
  const { directory, workOrder, semantic } = await readKernelOrderResult(
    command,
    taskId,
    resultPath,
  );
  const inputPath = path.join(directory, "command-input.json");
  let saved: KernelCommandInput | null = null;
  try {
    saved = JSON.parse(
      await readStableRegularTextNoFollow(inputPath, "native command input"),
    ) as KernelCommandInput;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  if (semantic.status !== "completed")
    return {
      kind: "human_required",
      reason: `semantic_${semantic.status}`,
      summary: semantic.summary,
    };
  const binding = workOrder.canonical_binding!;
  if (binding.phase === "inspection")
    return (await acceptKernelInspection(command, runtime, directory, semantic)) ?? null;
  const mutationId = `result:${workOrder.work_order_id}`;
  if (saved) await writeKernelArtifact(directory, "received-result.json", semantic);
  if (binding.phase === "planning") {
    if (semantic.canonical_outputs)
      throw new Error("Planning cannot submit implementation outputs");
    const proposal = kernelPlanProposalSchema.parse(semantic.canonical_plan);
    const read = await runtime.adapter.read(taskId);
    if (read.kind !== "canonical") throw new Error("Canonical Task unavailable");
    const observation = await runtime.observe();
    if (
      !saved &&
      (read.record.aggregate.revision !== workOrder.task.revision ||
        observation.fingerprint !== binding.repository_fingerprint)
    )
      throw new Error("Canonical planning result is stale");
    const plan = canonicalPlanFromProposal(proposal, binding.plan_revision + 1);
    await writeKernelArtifact(directory, "received-result.json", semantic);
    const input = saved ?? (await runtime.input({ kind: "propose_plan", plan }, mutationId, true));
    await writeKernelArtifact(directory, "command-input.json", input);
    requireKernelCommit(
      await runtime.lifecycle.apply(
        input,
        proposal.work_items.map((item) => item.contract),
      ),
    );
  } else {
    if (semantic.canonical_plan) throw new Error("Implementation cannot replace the approved plan");
    if (!semantic.canonical_outputs) throw new Error("Canonical outputs are required");
    if (!saved) {
      const read = await runtime.adapter.read(taskId);
      if (read.kind !== "canonical") throw new Error("Canonical Task unavailable");
      const aggregate = read.record.aggregate;
      const item = aggregate.work_items[binding.work_item_id];
      const plan = aggregate.current_plan;
      const parent = aggregate.authority_lineage?.at(-1)?.authority;
      if (
        item?.state !== "EXECUTING" ||
        plan?.state !== "APPROVED" ||
        plan.revision !== binding.plan_revision ||
        plan.digest !== binding.plan_digest ||
        item.definition.contract_digest !== binding.contract_digest ||
        item.attempt !== binding.attempt ||
        item.claim_id !== binding.claim_id ||
        !parent ||
        !runtime.lifecycle.resultFingerprintMatches(
          read.record,
          binding as KernelWorkBinding,
          parent.repository_fingerprint,
        )
      )
        throw new Error("Canonical implementation result is stale");
      const outputIds = semantic.canonical_outputs.map((output) => output.id);
      if (
        new Set(outputIds).size !== outputIds.length ||
        outputIds.length !== item.definition.expected_outputs.length ||
        item.definition.expected_outputs.some((id) => !outputIds.includes(id))
      )
        throw new Error("Canonical output claims do not match the WorkItem contract");
      const observation = await runtime.observe();
      if (parent.repository_fingerprint !== observation.fingerprint) {
        const continuation = await runtime.native.observeContinuation(taskId, parent);
        if (
          continuation?.kind !== "repository_implementation" ||
          continuation.changed_paths.some(
            (changed) =>
              !parent.scope_roots.some(
                (root) => root === "." || changed === root || changed.startsWith(`${root}/`),
              ),
          )
        )
          throw new Error("Canonical implementation changed paths outside its WorkItem scope");
        await writeKernelArtifact(directory, "received-result.json", semantic);
        requireKernelCommit(await runtime.authority.continue(taskId));
      }
      await writeKernelArtifact(directory, "received-result.json", semantic);
    }
    const context = await runtime.native.readContext(taskId);
    const input =
      saved ??
      (await runtime.input(
        {
          kind: "accept_work_item_result",
          work_item_id: binding.work_item_id,
          plan_revision: binding.plan_revision,
          plan_digest: binding.plan_digest as k.Sha256Digest,
          result_digest: k.kernelDigest(semantic),
          output_manifests: semantic.canonical_outputs.map((output) => ({
            ...output,
            digest: output.digest as k.Sha256Digest,
            task_id: taskId,
            plan_revision: binding.plan_revision,
            work_item_id: binding.work_item_id,
            attempt: binding.attempt,
            repository_fingerprint: context.repository_fingerprint,
          })),
        },
        mutationId,
      ));
    await writeKernelArtifact(directory, "command-input.json", input);
    const {
      phase: _phase,
      repository_identity: _repository,
      authority_digest: _authority,
      ...workBinding
    } = binding;
    requireKernelCommit(
      await runtime.lifecycle.receiveResult(input, workBinding as KernelWorkBinding),
    );
  }
  await writeKernelArtifact(directory, "accepted-result.json", {
    mutation_id: mutationId,
    semantic_digest: k.kernelDigest(semantic),
  });
  return null;
}

export async function advanceCanonicalTask(opts: {
  command: CommandContext;
  task_id: string;
  result_path?: string;
  transport: "host" | "managed";
}) {
  const runtime = await createKernelRuntime({
    command: opts.command,
    task_id: opts.task_id,
    transport: opts.transport,
    operation_id: `continuation:${opts.task_id}`,
  });
  if (opts.result_path) {
    const stop = await acceptKernelSemanticResult(
      opts.command,
      opts.task_id,
      runtime,
      opts.result_path,
    );
    if (stop) return { schema_version: 1, task_id: opts.task_id, action: stop };
  }
  const visited = new Set<string>();
  let finalValidation: {
    fingerprint: string;
    environment_digest: string;
    evidence_digest: k.Sha256Digest;
    plan_digest: string;
  } | null = null;
  for (let step = 0; step < 16; step++) {
    const context = await runtime.native.readContext(opts.task_id);
    const current = await runtime.lifecycle.read(opts.task_id, context.repository_fingerprint);
    if (current.read.kind !== "canonical")
      throw new Error(`Explicit canonical migration required: ${current.read.kind}`);
    const { record } = current.read;
    const plan = record.aggregate.current_plan;
    const route = current.next_action;
    if (route.reason_code === "kernel_plan_required") {
      const order = buildKernelAgentWorkOrder({ command: opts.command, record, context });
      return issueKernelExchange(opts.command, order, opts.transport);
    }
    if (route.reason_code === "kernel_plan_approval_required" && plan) {
      await runtime.checkpoint(await runtime.observe());
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "approval_required", reason: route.reason_code },
        authority: {
          required: true,
          reference: kernelApprovalReference(context, plan),
          repository_fingerprint: context.repository_fingerprint,
        },
        operator_action: {
          kind: "approve_plan",
          argv: ["agentplane", "task", "plan", "approve", opts.task_id, "--by", "USER"],
        },
      };
    }
    const operationId = `${route.reason_code}:${record.digest}:${context.repository_fingerprint}`;
    const parent = record.aggregate.authority_lineage?.at(-1)?.authority;
    if (
      plan?.state === "APPROVED" &&
      parent &&
      parent.repository_fingerprint !== context.repository_fingerprint
    ) {
      try {
        requireKernelCommit(await runtime.authority.continue(opts.task_id));
        continue;
      } catch (error) {
        if ((error as { reason_code?: string }).reason_code !== "repository_observation_scope")
          throw error;
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: await authorityDeltaStop(runtime, opts.task_id),
          canonical_revision: record.aggregate.revision,
        };
      }
    }
    if (visited.has(operationId))
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "human_required", reason: "canonical_transition_no_progress" },
      };
    visited.add(operationId);
    if (
      route.reason_code === "kernel_final_validation_required" ||
      route.reason_code === "kernel_task_completion_required"
    ) {
      if (
        route.reason_code === "kernel_task_completion_required" &&
        finalValidation?.fingerprint === context.repository_fingerprint &&
        finalValidation.environment_digest === k.kernelDigest(verificationChildEnv()) &&
        finalValidation.plan_digest === plan?.digest &&
        record.aggregate.final_validation?.evidence_digests.includes(
          finalValidation.evidence_digest,
        )
      ) {
        const completion = await runtime.input({ kind: "complete_task" }, operationId);
        if (completion.command.expected_task_revision !== record.aggregate.revision)
          throw new Error("Canonical task changed before completion");
        requireKernelCommit(await runtime.lifecycle.apply(completion));
      } else {
        const checked = await runKernelFinalValidation(opts.command, runtime, record);
        if (checked.stop) return { schema_version: 1, task_id: opts.task_id, action: checked.stop };
        finalValidation = {
          fingerprint: checked.fingerprint,
          environment_digest: checked.environment_digest,
          evidence_digest: checked.evidence_digest,
          plan_digest: checked.plan_digest,
        };
      }
      continue;
    }

    if (
      route.reason_code === "kernel_work_item_validation_resolution_required" &&
      route.work_item_id
    ) {
      const stop = await resumeKernelInspection(opts.command, runtime, record, route.work_item_id);
      if (stop) return { schema_version: 1, task_id: opts.task_id, action: stop };
      continue;
    }

    if (
      route.work_item_id &&
      ["kernel_work_item_inspection_required", "kernel_work_item_validation_required"].includes(
        route.reason_code,
      )
    ) {
      if (route.reason_code === "kernel_work_item_inspection_required") {
        requireKernelCommit(
          await runtime.lifecycle.apply(
            await runtime.input(
              {
                kind: "transition_work_item",
                action: "inspect",
                work_item_id: route.work_item_id,
                claim_id: record.aggregate.work_items[route.work_item_id]!.claim_id,
              },
              operationId,
            ),
          ),
        );
        continue;
      }
      return issueKernelInspection(opts.command, runtime, record, route.work_item_id);
    }

    if (route.reason_code === "kernel_work_item_materialization_required" && plan) {
      requireKernelCommit(
        await runtime.lifecycle.apply(
          await runtime.input(
            {
              kind: "materialize_work_items",
              plan_revision: plan.revision,
              plan_digest: plan.digest,
            },
            operationId,
          ),
        ),
      );
      continue;
    }
    if (
      (route.reason_code === "kernel_work_item_claim_required" ||
        route.reason_code === "kernel_work_item_rework_claim_required") &&
      route.work_item_id
    ) {
      await runtime.checkpoint(await runtime.observe());
      requireKernelCommit(
        await runtime.lifecycle.apply(
          await runtime.input(
            {
              kind: "transition_work_item",
              action: "claim",
              work_item_id: route.work_item_id,
              claim_id: k.kernelDigest(operationId),
            },
            operationId,
          ),
        ),
      );
      continue;
    }
    if (route.reason_code === "kernel_work_item_execution_required" && route.work_item_id) {
      const item = record.aggregate.work_items[route.work_item_id]!;
      const begun = await runtime.lifecycle.begin(
        await runtime.input(
          {
            kind: "transition_work_item",
            action: "begin",
            work_item_id: route.work_item_id,
            claim_id: item.claim_id,
          },
          operationId,
        ),
      );
      const result = requireKernelCommit(begun.result);
      if (!begun.work_order)
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "human_required", reason: "canonical_begin_dispatch_uncertain" },
        };
      const order = buildKernelAgentWorkOrder({
        command: opts.command,
        record: result.record,
        context,
        implementation: begun.work_order,
      });
      return issueKernelExchange(opts.command, order, opts.transport, result.record);
    }
    return {
      schema_version: 1,
      task_id: opts.task_id,
      action: {
        kind: ["kernel_task_completed", "kernel_task_cancelled"].includes(route.reason_code)
          ? "terminal"
          : "external_wait",
        reason: route.reason_code,
      },
      canonical_revision: record.aggregate.revision,
    };
  }
  return {
    schema_version: 1,
    task_id: opts.task_id,
    action: { kind: "human_required", reason: "canonical_transition_budget_exhausted" },
  };
}
