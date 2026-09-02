import { writeKernelArtifact } from "./kernel-exchange.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  KernelBackendAdapter,
  type KernelAdapterResult,
  type KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import { KernelTaskLifecycle } from "../../runner/usecases/kernel-task-lifecycle.js";
import { KernelAuthorityResolver } from "../../runner/usecases/kernel-authority.js";
import {
  observeKernelRepository,
  kernelRepositoryChangedPaths,
  type KernelRepositoryObservation,
} from "../../runner/observation/kernel-repository.js";
import type {
  KernelAuthorityPort,
  NativeApprovalObservation,
  NativeAuthorityContext,
} from "../../ports/kernel-authority.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";

export function requireKernelCommit(result: KernelAdapterResult) {
  if (result.kind !== "committed")
    throw Object.assign(
      new Error(`Canonical command rejected: ${result.code} (${result.facts.join(", ")})`),
      { result },
    );
  return result;
}

export type KernelCommandPayload = k.TaskCommand extends infer C
  ? C extends k.TaskCommand
    ? Omit<C, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
    : never
  : never;

/** Native command context. Semantic JSON cannot supply actor identity or approval evidence. */
export async function createKernelRuntime(opts: {
  command: CommandContext;
  task_id: string;
  transport: k.ActorIdentity["transport"];
  operation_id: string;
  approval?: NativeApprovalObservation;
}) {
  const ctx = opts.command;
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: ctx.resolvedProject.gitRoot,
    task: {},
    create_if_missing: false,
  })) as k.Sha256Digest;
  const adapter = new KernelBackendAdapter(ctx.taskBackend, identity);
  const lifecycle = new KernelTaskLifecycle(adapter);
  const observationDir = path.join(
    await resolveCommandGitCommonDir(ctx),
    "agentplane",
    "kernel",
    "observations",
  );
  const observe = () =>
    observeKernelRepository({
      repository_root: ctx.resolvedProject.gitRoot,
      repository_identity: identity,
      operational_paths: [ctx.config.paths.workflow_dir, ctx.config.paths.tasks_path],
    });
  async function checkpoint(observation: KernelRepositoryObservation) {
    await writeKernelArtifact(
      observationDir,
      `${observation.fingerprint.slice(7)}.json`,
      observation,
    );
  }
  const native: KernelAuthorityPort = {
    async readContext(taskId) {
      if (taskId !== opts.task_id) throw new Error("Canonical context task mismatch");
      const read = await adapter.read(taskId);
      if (read.kind !== "canonical" && read.kind !== "missing")
        throw new Error(`Canonical mutation requires explicit migration: ${read.kind}`);
      const aggregate = read.kind === "canonical" ? read.record.aggregate : null;
      const items = aggregate?.current_plan?.work_items ?? [];
      const union = (key: keyof k.ExecutionRequirements) =>
        [...new Set(items.flatMap((item) => item.execution_requirements[key]))].toSorted();
      const repository = await observe();
      const approved =
        aggregate?.current_plan?.state === "APPROVED"
          ? aggregate.authority_lineage?.findLast((entry) => entry.approval_mode !== null)
              ?.authority
          : undefined;
      const actor: k.ActorIdentity = {
        id: "agentplane:kernel-controller",
        kind: "SYSTEM",
        transport: opts.transport,
        capabilities: [...new Set(["authority.observe", ...union("capabilities")])],
      };
      const contracts = read.kind === "canonical" ? (read.record.documents?.contracts ?? {}) : {};
      const policyFiles = repository.files.filter(
        (file) => file.path === "AGENTS.md" || file.path.startsWith(".agentplane/policy/"),
      );
      return {
        task_id: taskId,
        task_revision: aggregate?.revision ?? 0,
        repository_identity: identity,
        repository_fingerprint: repository.fingerprint,
        actor,
        occurred_at: new Date().toISOString(),
        mutation_id: k.kernelDigest({
          operation: opts.operation_id,
          revision: aggregate?.revision ?? 0,
          repository: repository.fingerprint,
        }),
        approval_receipts: ctx.config.authority.approval_receipts,
        ceiling: {
          scope_roots: approved?.scope_roots ?? union("scope_roots"),
          repository_effects: approved?.repository_effects ?? union("repository_effects"),
          external_effects: approved?.external_effects ?? union("external_effects"),
          capabilities: approved?.capabilities ?? union("capabilities"),
          resources: approved?.resources ?? union("resources"),
          validation_requirements:
            approved?.validation_requirements ??
            [
              ...new Set(
                items.flatMap(
                  (item) =>
                    contracts[String(item.contract_digest ?? "")]?.verification_commands ?? [],
                ),
              ),
            ].toSorted(),
          policy_digests: [k.kernelDigest({ config: ctx.config, files: policyFiles })],
          completion_requirements: ["work_item_validation", "final_validation"],
          risk: { requirements: "bounded", implementation: "bounded", reversibility: "reversible" },
          expires_at: null,
        },
      } satisfies NativeAuthorityContext;
    },
    readApproval: () => Promise.resolve(opts.approval ?? null),
    async observeContinuation(taskId, parent) {
      if (taskId !== opts.task_id) throw new Error("Canonical continuation task mismatch");
      const read = await adapter.read(taskId);
      if (read.kind !== "canonical") return null;
      const current = await observe();
      if (parent.repository_fingerprint === current.fingerprint) {
        if (read.record.aggregate.current_plan?.digest === parent.plan_digest) return null;
        return {
          kind: "plan_amendment",
          evidence_digest: read.record.digest,
          previous_fingerprint: parent.repository_fingerprint,
          changed_paths: [],
        };
      }
      const before = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(observationDir, `${parent.repository_fingerprint.slice(7)}.json`),
          "canonical checkpoint",
        ),
      ) as KernelRepositoryObservation;
      const { fingerprint, ...contents } = before;
      if (fingerprint !== parent.repository_fingerprint || k.kernelDigest(contents) !== fingerprint)
        throw new Error("Canonical observation checkpoint is invalid");
      const changed = kernelRepositoryChangedPaths(before, current);
      await checkpoint(current);
      return {
        kind: "repository_implementation",
        evidence_digest: k.kernelDigest({
          before: fingerprint,
          after: current.fingerprint,
          changed,
        }),
        previous_fingerprint: parent.repository_fingerprint,
        changed_paths: changed,
      };
    },
  };
  const authority = new KernelAuthorityResolver(adapter, native);
  async function input(
    payload: KernelCommandPayload,
    mutationId: string,
    planning = false,
  ): Promise<KernelCommandInput> {
    const context = await native.readContext(opts.task_id);
    let grant: k.ExecutionAuthority;
    if (planning) {
      if (payload.kind !== "capture_intent" && payload.kind !== "propose_plan")
        throw new Error("Planning authority cannot execute implementation commands");
      const read = await adapter.read(opts.task_id);
      if (read.kind === "canonical" && read.record.aggregate.authority_lineage?.length)
        throw new Error("Planning cannot replace canonical user authority");
      const plan = read.kind === "canonical" ? read.record.aggregate.current_plan : null;
      const contents = {
        ...context.ceiling,
        scope_roots: [],
        repository_effects: [],
        external_effects: [],
        capabilities: [],
        resources: [],
        task_id: opts.task_id,
        plan_revision: plan?.revision ?? 0,
        plan_digest: plan?.digest ?? k.kernelDigest(null),
        work_item_id: null,
        repository_identity: identity,
        repository_fingerprint: context.repository_fingerprint,
        provenance: {
          kind: "SYSTEM" as const,
          actor_id: context.actor.id,
          evidence_digest: k.kernelDigest({ kind: "native_planning", task_id: opts.task_id }),
          parent_authority_digest: null,
        },
      };
      grant = { ...contents, digest: k.authorityDigest(contents) };
    } else {
      const resolved = await authority.resolve(
        opts.task_id,
        "work_item_id" in payload ? payload.work_item_id : undefined,
      );
      grant = resolved.authority;
    }
    return {
      command: {
        ...payload,
        task_id: opts.task_id,
        expected_task_revision: context.task_revision,
        expected_state_fingerprint: context.repository_fingerprint,
      } as k.TaskCommand,
      actor: context.actor,
      authority: grant,
      repository_fingerprint: context.repository_fingerprint,
      occurred_at: context.occurred_at,
      mutation_id: mutationId,
    };
  }
  return { adapter, lifecycle, authority, native, observe, checkpoint, input };
}
