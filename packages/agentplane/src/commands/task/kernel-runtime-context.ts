import { readKernelScopeRequest } from "./kernel-scope-request-evidence.js";
import { observeReviewedBaseImport, type ReviewedBasePins } from "./kernel-reviewed-base-import.js";
import { resolveKernelPolicyBaseline } from "./kernel-policy-baseline.js";
import { validateKernelRecipeBindings } from "./kernel-recipe-admission.js";
import { writeKernelArtifact } from "./kernel-exchange.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  KernelBackendAdapter,
  type KernelAdapterResult,
  type KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import type { KernelRead } from "../../adapters/task-backend/kernel-record.js";
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
import { executionContractCeiling } from "./kernel-plan-authority.js";
import { CliError } from "../../shared/errors.js";
import { observeKernelWorktreePreparation } from "./kernel-worktree-preparation.js";

export function requireKernelCommit(result: KernelAdapterResult) {
  if (result.kind === "unavailable" && result.mutation) {
    throw Object.assign(
      new CliError({
        code: "E_HANDOFF",
        message: `Canonical write requires reconciliation: ${result.code}. Preserve mutation ${result.mutation.mutation_id} for task ${result.mutation.task_id}. Restore storage reads and retry the exact original invocation; retained mutation receipts are checked before another write. Do not migrate or scaffold this task.`,
        context: {
          reason_code: "canonical_write_reconciliation_required",
          backend_result: result.code,
          ...result.mutation,
        },
      }),
      { result },
    );
  }
  if (result.kind !== "committed")
    throw Object.assign(
      new CliError({
        code: "E_VALIDATION",
        message: `Canonical command rejected: ${result.code} (${result.facts.join(", ")}). Inspect the current task route before retrying; do not edit native records.`,
        context: {
          reason_code: result.code,
          facts: result.facts,
          required_action:
            result.kind === "rejected"
              ? result.required_action
              : "inspect_backend_capabilities_and_native_state",
        },
      }),
      { result },
    );
  return result;
}

export type KernelCommandPayload = k.TaskCommand extends infer C
  ? C extends k.TaskCommand
    ? Omit<C, "task_id" | "expected_task_revision" | "expected_state_fingerprint">
    : never
  : never;

export function assertPlanningAuthorityBoundary(
  payloadKind: KernelCommandPayload["kind"],
  read: KernelRead,
): void {
  if (
    payloadKind !== "reject_plan" &&
    read.kind === "canonical" &&
    read.record.aggregate.authority_lineage?.length &&
    !(
      read.record.aggregate.state === "PLANNING" &&
      read.record.aggregate.current_plan?.state === "REJECTED"
    )
  )
    throw new Error("Planning cannot replace canonical user authority");
}

/** Native command context. Semantic JSON cannot supply actor identity or approval evidence. */
export async function createKernelRuntime(opts: {
  command: CommandContext;
  task_id: string;
  transport: k.ActorIdentity["transport"];
  operation_id: string;
  approval?: NativeApprovalObservation;
  reviewed_base?: ReviewedBasePins;
}) {
  const ctx = { ...opts.command, config: structuredClone(opts.command.config) };
  const liveConfig = structuredClone(ctx.config);
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: ctx.resolvedProject.gitRoot,
    task: {},
    create_if_missing: false,
  })) as k.Sha256Digest;
  const adapter = new KernelBackendAdapter(ctx.taskBackend, identity, async (request) => {
    const retained = await readKernelScopeRequest(ctx, request.task_id, request.work_item_id, {
      read: (id) => adapter.read(id),
      observe,
      readContext: (id) => native.readContext(id),
    });
    if (k.kernelDigest(retained.request) !== k.kernelDigest(request))
      throw new Error("Scope request does not match authenticated native stop evidence");
  });
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
      operational_paths: [
        ctx.config.paths.workflow_dir,
        ctx.config.paths.tasks_path,
        ctx.config.paths.worktrees_dir,
      ],
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
        throw new CliError({
          code: "E_VALIDATION",
          message:
            read.kind === "legacy_unmigrated"
              ? "Canonical mutation requires explicit migration: legacy_unmigrated"
              : `Canonical task ${taskId} is ${read.kind}; inspect its native record before retrying. Migration cannot repair this state.`,
          context: { task_id: taskId, record_kind: read.kind },
        });
      const aggregate = read.kind === "canonical" ? read.record.aggregate : null;
      if (read.kind === "canonical" && aggregate?.current_plan?.state !== "REJECTED")
        await validateKernelRecipeBindings({
          command: ctx,
          task: read.task,
          plan: aggregate?.current_plan ?? null,
          documents: read.record.documents,
        });
      const items = aggregate?.current_plan?.work_items ?? [];
      const union = (key: keyof k.ExecutionRequirements) =>
        [...new Set(items.flatMap((item) => item.execution_requirements[key]))].toSorted();
      const repository = await observe();
      const approved =
        aggregate?.current_plan?.state === "APPROVED"
          ? aggregate.authority_lineage?.findLast((entry) => entry.approval_mode !== null)
              ?.authority
          : undefined;
      const contracts = read.kind === "canonical" ? (read.record.documents?.contracts ?? {}) : {};
      const contractCeiling =
        read.kind === "canonical" ? executionContractCeiling(read.task) : null;
      const actor: k.ActorIdentity = {
        id: "agentplane:kernel-controller",
        kind: "SYSTEM",
        transport: opts.transport,
        capabilities: [
          ...new Set([
            "authority.observe",
            ...(approved?.capabilities ?? contractCeiling?.capabilities ?? union("capabilities")),
          ]),
        ],
      };
      // Explicit operator approval must observe current policy. This only supplies
      // observations; the authority resolver still validates and issues the approval.
      // In particular, the policy-renewal route must not renew the frozen digest.
      const explicitPolicyApproval =
        opts.transport === "manual" &&
        opts.operation_id === `approve:${opts.task_id}` &&
        opts.approval?.kind === "manual_operator" &&
        /^USER(?::[A-Za-z0-9._@-]+)?$/u.test(opts.approval.actor_id);
      const policy = await resolveKernelPolicyBaseline({
        root: ctx.resolvedProject.gitRoot,
        observation_directory: observationDir,
        config: liveConfig,
        repository,
        approved: explicitPolicyApproval ? undefined : approved,
        items,
      });
      ctx.config = policy.config;
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
          scope_roots:
            approved?.scope_roots ?? contractCeiling?.scope_roots ?? union("scope_roots"),
          repository_effects:
            approved?.repository_effects ??
            contractCeiling?.repository_effects ??
            union("repository_effects"),
          external_effects:
            approved?.external_effects ??
            contractCeiling?.external_effects ??
            union("external_effects"),
          capabilities:
            approved?.capabilities ?? contractCeiling?.capabilities ?? union("capabilities"),
          resources: approved?.resources ?? contractCeiling?.resources ?? union("resources"),
          validation_requirements:
            approved?.validation_requirements ??
            contractCeiling?.validation_requirements ??
            [
              ...new Set(
                items.flatMap(
                  (item) =>
                    contracts[String(item.contract_digest ?? "")]?.verification_commands ?? [],
                ),
              ),
            ].toSorted(),
          policy_digests: [policy.digest],
          completion_requirements: ["work_item_validation", "final_validation"],
          risk: contractCeiling?.risk ?? {
            requirements: "bounded",
            implementation: "bounded",
            reversibility: "reversible",
          },
          expires_at: null,
        },
      } satisfies NativeAuthorityContext;
    },
    readApproval: () => Promise.resolve(opts.approval ?? null),
    async observeReviewedBaseImport(taskId, parent) {
      if (!opts.reviewed_base) return null;
      if (
        taskId !== opts.task_id ||
        opts.transport !== "manual" ||
        opts.operation_id !== `approve:${taskId}` ||
        opts.approval?.kind !== "manual_operator" ||
        !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(opts.approval.actor_id)
      )
        throw new Error("Reviewed base import requires explicit operator renewal");
      const read = await adapter.read(taskId);
      if (read.kind !== "canonical") throw new Error("Reviewed base canonical record unavailable");
      return observeReviewedBaseImport({
        root: ctx.resolvedProject.gitRoot,
        common: await resolveCommandGitCommonDir(ctx),
        pins: opts.reviewed_base,
        parent,
        record: read.record,
        current: await observe(),
      });
    },
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
      const preparation = await observeKernelWorktreePreparation({
        command: ctx,
        taskId,
        parent,
        current,
      });
      if (preparation) return preparation;
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
      if (
        payload.kind !== "capture_intent" &&
        payload.kind !== "propose_plan" &&
        payload.kind !== "reject_plan"
      )
        throw new Error("Planning authority cannot execute implementation commands");
      const read = await adapter.read(opts.task_id);
      assertPlanningAuthorityBoundary(payload.kind, read);
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
  return { command: ctx, adapter, lifecycle, authority, native, observe, checkpoint, input };
}
