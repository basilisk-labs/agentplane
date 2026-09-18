import path from "node:path";

import { kernelPlanProposalSchema, taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelCommandInput } from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { KernelWorkBinding } from "../../runner/usecases/kernel-task-lifecycle.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { CommandContext } from "../shared/task-backend.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import { acceptKernelInspection } from "./kernel-inspection.js";
import { canonicalPlanFromProposal } from "./kernel-plan.js";
import { readKernelOrderResult, writeKernelArtifact } from "./kernel-exchange.js";
import { commitCanonicalImplementation } from "./kernel-repository-coordinator.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

export async function blockKernelSemanticEpisode(opts: {
  runtime: Runtime;
  directory: string;
  work_order_id: string;
  work_item_id: string;
  claim_id: string | null;
}) {
  const stopInputPath = path.join(opts.directory, "semantic-stop-command.json");
  let stopInput: KernelCommandInput;
  try {
    stopInput = JSON.parse(
      await readStableRegularTextNoFollow(stopInputPath, "canonical semantic stop command"),
    ) as KernelCommandInput;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    stopInput = await opts.runtime.input(
      {
        kind: "transition_work_item",
        action: "block",
        work_item_id: opts.work_item_id,
        claim_id: opts.claim_id,
      },
      `semantic-stop:${opts.work_order_id}`,
    );
    await writeKernelArtifact(opts.directory, "semantic-stop-command.json", stopInput);
  }
  requireKernelCommit(await opts.runtime.lifecycle.apply(stopInput));
}

export async function acceptKernelSemanticResult(
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
  if (semantic.status !== "completed") {
    const binding = workOrder.canonical_binding;
    if (binding && binding.phase !== "planning") {
      await blockKernelSemanticEpisode({
        runtime,
        directory,
        work_order_id: semantic.work_order_id,
        work_item_id: binding.work_item_id,
        claim_id: binding.claim_id,
      });
    }
    return {
      kind: "human_required" as const,
      reason: `semantic_${semantic.status}`,
      summary: semantic.summary,
    };
  }
  if (
    workOrder.canonical_binding?.phase !== "implementation" &&
    workOrder.state_fingerprint.git_head !== null &&
    (await readDirectTaskHead(command.resolvedProject.gitRoot)) !==
      workOrder.state_fingerprint.git_head
  ) {
    throw new Error("Canonical semantic result changed Git history");
  }
  const binding = workOrder.canonical_binding!;
  if (binding.phase === "inspection")
    return (await acceptKernelInspection(command, runtime, directory, semantic, workOrder)) ?? null;
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
      let changedPaths: string[] = [];
      let continueAuthority = false;
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
        changedPaths = [...continuation.changed_paths];
        await writeKernelArtifact(directory, "received-result.json", semantic);
        continueAuthority = true;
      }
      await writeKernelArtifact(directory, "received-result.json", semantic);
      const evidence = await commitCanonicalImplementation({
        command,
        directory,
        work_order: workOrder,
        changed_paths: changedPaths,
      });
      if (evidence) await writeKernelArtifact(directory, "repository-evidence.json", evidence);
      if (continueAuthority) requireKernelCommit(await runtime.authority.continue(taskId));
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
