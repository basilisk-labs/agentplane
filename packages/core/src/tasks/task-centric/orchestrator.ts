import { taskCentricDigest } from "./digest.js";
import { WorkItemScheduler } from "./graph.js";
import { aggregateValidation, evaluateTaskCompletion } from "./lifecycle.js";
import { consumeRetryBudget, recoveryDecisionForFailure } from "./policy.js";
import { assertAutonomousRepositoryCapabilities } from "./ports.js";
import type {
  ArtifactPort,
  ContentActorPort,
  ContextPort,
  GitPort,
  TaskRepositoryPort,
  ValidationPort,
  WorkspacePort,
} from "./ports.js";
import type {
  ExecutionAuthority,
  ExecutionLease,
  Failure,
  OutputManifest,
  RetryBudget,
  SemanticWorkRequest,
  TaskCheckpoint,
  ValidationEvidence,
  WorkItem,
} from "./model.js";

export type TaskLoopOutcome =
  | Readonly<{ status: "completed"; task_id: string; task_revision: number }>
  | Readonly<{
      status: "paused" | "waiting" | "blocked" | "effect_in_doubt";
      task_id: string;
      reason_code: string;
      detail: string;
    }>;

export type TaskCentricOrchestratorPorts = Readonly<{
  repository: TaskRepositoryPort;
  git: GitPort;
  workspace: WorkspacePort;
  actor: ContentActorPort;
  validation: ValidationPort;
  artifacts: ArtifactPort;
  context: ContextPort;
}>;

function operationId(taskId: string, itemId: string, attempt: number, phase: string): string {
  return `op_${taskCentricDigest({ taskId, itemId, attempt, phase }).slice(7, 39)}`;
}

function executionLease(opts: {
  task_id: string;
  plan_revision: number;
  plan_digest: `sha256:${string}`;
  item: WorkItem;
  repository_digest: `sha256:${string}`;
  workspace: string;
  actor: ContentActorPort["identity"];
  attempt: number;
  now: string;
}): ExecutionLease {
  const authority: ExecutionAuthority = Object.freeze({
    task_id: opts.task_id,
    plan_revision: opts.plan_revision,
    plan_digest: opts.plan_digest,
    work_item_id: opts.item.id,
    repository_snapshot_digest: opts.repository_digest,
    workspace: opts.workspace,
    writable_roots: opts.item.scope_roots,
    allowed_operations: ["repository.write", "validation.run"],
    expires_at: null,
  });
  const id = operationId(opts.task_id, opts.item.id, opts.attempt, "lease");
  return Object.freeze({
    schema_version: 1,
    id,
    authority,
    actor: opts.actor,
    resource_claims: opts.item.resource_claims,
    issued_at: opts.now,
    expires_at: null,
  });
}

function checkpoint(
  snapshot: Awaited<ReturnType<TaskRepositoryPort["reconcile"]>>,
): TaskCheckpoint {
  return Object.freeze({
    schema_version: 1,
    task_id: snapshot.task.id,
    task_revision: snapshot.task.revision,
    plan_revision: snapshot.task.current_plan?.revision ?? null,
    event_cursor: snapshot.task.event_cursor,
    work_item_states: Object.freeze(
      Object.fromEntries(
        Object.values(snapshot.task.work_items).map((item) => [item.id, item.state]),
      ),
    ),
    context_refs: [],
    validation_refs: [],
    artifact_refs: snapshot.artifact_refs,
    pending_effects: snapshot.pending_effects,
    created_at: snapshot.repository.captured_at,
  });
}

async function validationEvidence(opts: {
  port: ValidationPort;
  item: WorkItem;
  workspace: string;
  repository_digest: `sha256:${string}`;
}): Promise<readonly ValidationEvidence[]> {
  const evidence: ValidationEvidence[] = [];
  for (const check of opts.item.validation.checks) {
    if (!opts.port.supports(check.capability)) {
      evidence.push({
        check_id: check.id,
        status: "unsupported",
        observed_at: new Date().toISOString(),
        repository_snapshot_digest: opts.repository_digest,
        command_identity: null,
        exit_code: null,
        artifact_refs: [],
        detail: `Validation capability ${check.capability} is unsupported.`,
      });
      continue;
    }
    evidence.push(
      await opts.port.execute({
        check,
        workspace: opts.workspace,
        repository_snapshot_digest: opts.repository_digest,
      }),
    );
  }
  return evidence;
}

function retryBudget(opts: {
  existing: RetryBudget | null;
  task_id: string;
  work_item_id: string;
  failure: Failure;
  fingerprint: `sha256:${string}`;
}): RetryBudget {
  return (
    opts.existing ?? {
      task_id: opts.task_id,
      work_item_id: opts.work_item_id,
      operation: "semantic_work",
      failure_kind: opts.failure.kind,
      maximum: 2,
      consumed: 0,
      reset_fingerprint: opts.fingerprint,
    }
  );
}

export class TaskCentricOrchestrator {
  readonly ports: TaskCentricOrchestratorPorts;
  readonly scheduler: WorkItemScheduler;

  constructor(ports: TaskCentricOrchestratorPorts, concurrency = 1) {
    assertAutonomousRepositoryCapabilities(ports.repository.capabilities);
    this.ports = ports;
    this.scheduler = new WorkItemScheduler(concurrency);
  }

  async run(taskId: string, maxCycles = 128): Promise<TaskLoopOutcome> {
    for (let cycle = 0; cycle < maxCycles; cycle += 1) {
      let snapshot = await this.ports.repository.reconcile(taskId);
      await this.ports.repository.writeCheckpoint(checkpoint(snapshot));
      snapshot = await this.ports.repository.reconcile(taskId);
      const task = snapshot.task;
      const plan = task.current_plan;
      if (task.lifecycle === "COMPLETED") {
        return { status: "completed", task_id: task.id, task_revision: task.revision };
      }
      if (
        !plan ||
        plan.approval.state !== "approved" ||
        plan.approval.approved_digest !== plan.digest
      ) {
        return {
          status: "paused",
          task_id: task.id,
          reason_code: "exact_plan_approval_required",
          detail: "The current immutable task plan revision is not approved.",
        };
      }
      if (snapshot.pending_effects.some((effect) => effect.state === "effect_in_doubt")) {
        return {
          status: "effect_in_doubt",
          task_id: task.id,
          reason_code: "effect_reconciliation_required",
          detail: "A non-idempotent effect must be reconciled before the task can continue.",
        };
      }

      const selected = this.scheduler.select({
        graph: plan.proposal.work_items,
        runtime: task.work_items,
        active_leases: snapshot.active_leases,
      });
      if (selected.length === 0) {
        const allRequiredComplete = plan.proposal.work_items.work_items.every(
          (item) => item.optional || task.work_items[item.id]?.state === "COMPLETED",
        );
        if (!allRequiredComplete) {
          return {
            status: "waiting",
            task_id: task.id,
            reason_code: "no_ready_work_item",
            detail: "No work item is ready; dependencies, inputs, or claims are unresolved.",
          };
        }
        const rootEvidence: ValidationEvidence[] = [];
        for (const check of plan.proposal.top_level_validation.checks) {
          rootEvidence.push(
            this.ports.validation.supports(check.capability)
              ? await this.ports.validation.execute({
                  check,
                  workspace: snapshot.active_leases[0]?.authority.workspace ?? "",
                  repository_snapshot_digest: snapshot.repository.digest,
                })
              : {
                  check_id: check.id,
                  status: "unsupported",
                  observed_at: new Date().toISOString(),
                  repository_snapshot_digest: snapshot.repository.digest,
                  command_identity: null,
                  exit_code: null,
                  artifact_refs: [],
                  detail: `Validation capability ${check.capability} is unsupported.`,
                },
          );
        }
        const rootValidation = aggregateValidation(
          plan.proposal.top_level_validation,
          rootEvidence,
        );
        const completion = evaluateTaskCompletion({
          task: { ...task, final_validation: rootValidation },
          repository_digest: snapshot.repository.digest,
          pending_effects: snapshot.pending_effects,
        });
        if (!completion.eligible) {
          return {
            status: "blocked",
            task_id: task.id,
            reason_code: "root_completion_ineligible",
            detail: completion.reason_codes.join(", "),
          };
        }
        const completionEvent = {
          schema_version: 1 as const,
          id: operationId(task.id, "root", 0, "complete-event"),
          mutation_id: operationId(task.id, "root", 0, "complete-mutation"),
          task_id: task.id,
          task_revision: task.revision,
          plan_revision: plan.revision,
          plan_digest: plan.digest,
          work_item_id: null,
          entity: "task" as const,
          from: task.lifecycle,
          to: "COMPLETED",
          cause_refs: rootEvidence.map((evidence) => evidence.check_id),
          actor_id: "agentplane",
          repository_fingerprint: snapshot.repository.digest,
          at: new Date().toISOString(),
        };
        await this.ports.repository.compareAndSwap({
          task_id: task.id,
          expected_revision: task.revision,
          next: {
            ...task,
            revision: task.revision + 1,
            lifecycle: "COMPLETED",
            final_validation: rootValidation,
            event_cursor: task.event_cursor + 1,
            updated_at: completionEvent.at,
          },
          mutation_id: completionEvent.mutation_id,
          event: completionEvent,
        });
        continue;
      }

      const item = selected[0]!;
      const runtime = task.work_items[item.id]!;
      const attempt = runtime.attempt + 1;
      const lease = executionLease({
        task_id: task.id,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        item,
        repository_digest: snapshot.repository.digest,
        workspace: "pending",
        actor: this.ports.actor.identity,
        attempt,
        now: new Date().toISOString(),
      });
      await this.ports.repository.claimWorkItem({
        task_id: task.id,
        expected_revision: task.revision,
        work_item_id: item.id,
        lease,
        idempotency_key: lease.id,
      });
      const workspace = await this.ports.workspace.prepare({
        task_id: task.id,
        plan_revision: plan.revision,
        work_item: item,
        repository: snapshot.repository,
        lease,
      });
      const authority: ExecutionAuthority = {
        ...lease.authority,
        workspace: workspace.workspace,
      };
      const upstreamOutputs = item.depends_on.flatMap(
        (dependency) => task.work_items[dependency]?.output_manifests ?? [],
      );
      const context = await this.ports.context.buildWorkItemContext({
        task,
        work_item: item,
        repository: snapshot.repository,
        spec: item.context,
        authority,
        upstream_outputs: upstreamOutputs,
      });
      if (
        context.repository_snapshot.digest !== snapshot.repository.digest ||
        context.plan_digest !== plan.digest
      ) {
        return {
          status: "paused",
          task_id: task.id,
          reason_code: "stale_context_bundle",
          detail: "The work item context changed before semantic execution.",
        };
      }
      const request: SemanticWorkRequest = {
        schema_version: 1,
        kind: runtime.state === "REWORK_READY" ? "repair" : "execute",
        task_id: task.id,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        work_item: item,
        context,
        authority,
        required_outputs: item.expected_outputs,
        stop_rules: [
          "Do not mutate lifecycle, approval, Git integration, or validation truth.",
          "Do not exceed the supplied authority or repository fingerprint.",
        ],
      };
      const result = await this.ports.actor.perform(request);
      if (
        result.task_id !== task.id ||
        result.work_item_id !== item.id ||
        result.plan_revision !== plan.revision ||
        result.plan_digest !== plan.digest ||
        result.context_digest !== context.digest
      ) {
        return {
          status: "paused",
          task_id: task.id,
          reason_code: "stale_or_foreign_semantic_result",
          detail: "The semantic result does not match its task, plan, work item, or context.",
        };
      }
      if (result.status !== "completed") {
        const failure: Failure = {
          kind: result.status === "needs_context" ? "context" : "semantic",
          code: `semantic_${result.status}`,
          message: result.summary,
          retryable: result.status !== "blocked",
          cause_refs: result.questions,
        };
        await this.ports.repository.recordWorkItemResult({
          task_id: task.id,
          expected_revision: task.revision + 1,
          work_item_id: item.id,
          semantic_result: result,
          outputs: [],
          validation: [],
          idempotency_key: operationId(task.id, item.id, attempt, "semantic-failure"),
        });
        const recovery = recoveryDecisionForFailure(failure);
        if (recovery.action === "retry") {
          const existing = await this.ports.repository.readRetryBudget({
            task_id: task.id,
            work_item_id: item.id,
            operation: "semantic_work",
            failure_kind: failure.kind,
          });
          const next = consumeRetryBudget({
            budget: retryBudget({
              existing,
              task_id: task.id,
              work_item_id: item.id,
              failure,
              fingerprint: snapshot.repository.digest,
            }),
            current_fingerprint: snapshot.repository.digest,
          });
          if (next) {
            await this.ports.repository.writeRetryBudget(next);
            continue;
          }
        }
        return {
          status: recovery.action === "require_human" ? "paused" : "blocked",
          task_id: task.id,
          reason_code: recovery.reason_code,
          detail: failure.message,
        };
      }
      const observed = await this.ports.git.observe(workspace.workspace);
      const unauthorized = observed.changed_paths.filter(
        (changed) =>
          !authority.writable_roots.some(
            (root) => changed === root || changed.startsWith(`${root.replace(/\/$/u, "")}/`),
          ),
      );
      if (unauthorized.length > 0) {
        return {
          status: "blocked",
          task_id: task.id,
          reason_code: "out_of_scope_mutation",
          detail: unauthorized.join(", "),
        };
      }
      const evidence = await validationEvidence({
        port: this.ports.validation,
        item,
        workspace: workspace.workspace,
        repository_digest: observed.snapshot.digest,
      });
      const validation = aggregateValidation(item.validation, evidence);
      const outputs: OutputManifest[] = [];
      for (const artifact of result.artifacts) {
        const bytes = new TextEncoder().encode(artifact);
        outputs.push(
          await this.ports.artifacts.put({
            kind: "semantic_artifact_ref",
            schema: "agentplane.semantic-artifact-ref.v1",
            bytes,
            producer: {
              task_id: task.id,
              plan_revision: plan.revision,
              work_item_id: item.id,
              attempt,
            },
            repository_snapshot_digest: observed.snapshot.digest,
            provenance: [context.digest],
          }),
        );
      }
      await this.ports.repository.recordWorkItemResult({
        task_id: task.id,
        expected_revision: task.revision + 1,
        work_item_id: item.id,
        semantic_result: result,
        outputs,
        validation: evidence,
        idempotency_key: operationId(task.id, item.id, attempt, "result"),
      });
      if (validation.status !== "passed") continue;
    }
    return {
      status: "blocked",
      task_id: taskId,
      reason_code: "cycle_budget_exhausted",
      detail: `Task-centric loop exceeded ${maxCycles} cycles.`,
    };
  }
}
