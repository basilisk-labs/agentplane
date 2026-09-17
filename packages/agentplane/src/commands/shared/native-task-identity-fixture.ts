import { gitRevParse } from "@agentplaneorg/core/git";
import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
  type ValidationPlan,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import { evaluatorAcceptanceCriteria } from "../evaluator/evaluator-review-shared.js";

import {
  buildNativeQualityReviewIdentity,
  latestVerificationInputDigest,
  resolveNativeTaskIdentity,
} from "./native-task-identity.js";
import { loadCommandContext, type CommandContext } from "./task-backend.js";

type FixtureGitIdentity =
  | { kind: "commit"; sha: string; ref: string | null }
  | { kind: "unborn"; ref: string | null };

/** Add current plan, capability, and check identity without transferring ownership to Task Kernel. */
export function withLegacyDrainIdentityFixture(opts: {
  task: TaskData;
  config: CommandContext["config"];
  git?: FixtureGitIdentity;
  work_items_completed?: boolean;
  task_terminal?: boolean;
}): TaskData {
  const rawTask = opts.task;
  const rawAggregate = taskCentricAggregateFromExtensions(rawTask.extensions);
  const completionSatisfied =
    opts.work_items_completed !== true ||
    Object.values(rawAggregate?.work_items ?? {}).every((item) => item.state === "COMPLETED");
  const terminalSatisfied =
    opts.task_terminal !== true ||
    (rawAggregate?.lifecycle === "COMPLETED" && rawTask.status === "DONE");
  if (resolveNativeTaskIdentity(rawTask) && completionSatisfied && terminalSatisfied)
    return rawTask;
  const now = "2026-08-22T00:00:00.000Z";
  const validation: ValidationPlan = {
    schema_version: 1,
    criteria: [
      {
        id: "legacy-drain-verification",
        description: "The legacy-drain fixture records its declared verification evidence.",
        required: true,
        check_ids: ["legacy-drain-check"],
      },
    ],
    checks: [
      {
        id: "legacy-drain-check",
        kind: "structural",
        required: true,
        capability: "task.verify",
      },
    ],
    evidence_fingerprint: taskCentricDigest({
      task_id: rawTask.id,
      kind: "legacy-drain-fixture",
    }),
  };
  const baseline = createRepositorySnapshot({
    git: opts.git ?? { kind: "unborn", ref: "HEAD" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: now,
  });
  const proposal = {
    schema_version: 1 as const,
    task_id: rawTask.id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1 as const,
      work_items: [
        {
          id: "legacy-drain",
          objective: rawTask.description || rawTask.title,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["verified-task"],
          scope_roots: ["."],
          acceptance_criteria: validation.criteria,
          validation,
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "low" as const,
          capabilities: ["task.verify"],
          resource_claims: [],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  const pendingPlan = createTaskPlanRevision({ proposal, revision: 1, created_at: now });
  const plan = approveTaskPlan({
    plan: pendingPlan,
    expected_digest: pendingPlan.digest,
    actor: "ORCHESTRATOR",
    approved_at: now,
  });
  const materialized = materializeApprovedWorkItems({
    task: {
      ...createLegacyTaskAggregate({
        id: rawTask.id,
        revision: rawTask.revision ?? 1,
        title: rawTask.title,
        description: rawTask.description,
        status: rawTask.status,
        acceptance_criteria: rawTask.verify ?? [],
        captured_at: now,
        updated_at: now,
      }),
      current_plan: plan,
    },
    plan,
    now,
  });
  const terminal = rawTask.status === "DONE" || opts.task_terminal === true;
  const workItemsCompleted = terminal || opts.work_items_completed === true;
  const passedValidation = {
    schema_version: 1 as const,
    status: "passed" as const,
    evidence: validation.checks.map((check) => ({
      check_id: check.id,
      status: "passed" as const,
      observed_at: now,
      repository_snapshot_digest: baseline.digest,
      command_identity: check.command ?? check.capability,
      exit_code: 0,
      artifact_refs: ["fixture://legacy-drain"],
      detail: "The legacy-drain fixture completed its declared verification.",
    })),
    unsatisfied_criteria: [],
    stale_evidence: [],
  };
  const blocked = rawTask.status === "BLOCKED";
  const aggregate = {
    ...materialized,
    lifecycle: terminal
      ? ("COMPLETED" as const)
      : blocked
        ? ("BLOCKED" as const)
        : materialized.lifecycle,
    work_items: workItemsCompleted
      ? Object.fromEntries(
          Object.entries(materialized.work_items).map(([id, item]) => {
            const workItem = plan.proposal.work_items.work_items.find(
              (candidate) => candidate.id === id,
            );
            return [
              id,
              {
                ...item,
                state: "COMPLETED" as const,
                attempt: Math.max(item.attempt, 1),
                output_manifests: (workItem?.expected_outputs ?? []).map((output) => ({
                  schema_version: 1 as const,
                  id: output,
                  kind: "fixture",
                  schema: "agentplane.fixture.v1",
                  digest: taskCentricDigest({ task_id: rawTask.id, work_item_id: id, output }),
                  producer: {
                    task_id: rawTask.id,
                    plan_revision: plan.revision,
                    work_item_id: id,
                    attempt: Math.max(item.attempt, 1),
                  },
                  repository_snapshot_digest: baseline.digest,
                  provenance: ["fixture://legacy-drain"],
                })),
                validation_result: passedValidation,
              },
            ];
          }),
        )
      : materialized.work_items,
    final_validation: terminal ? passedValidation : materialized.final_validation,
  };
  const prepared: TaskData = {
    ...rawTask,
    status: terminal ? "DONE" : blocked ? "BLOCKED" : "DOING",
    verification:
      workItemsCompleted && rawTask.verification === undefined
        ? {
            state: "ok",
            attempts: 1,
            updated_at: now,
            updated_by: "TEST",
            note: "The legacy-drain fixture completed its declared verification.",
          }
        : rawTask.verification,
    execution_contract: resolveTaskExecutionContract({
      config: opts.config,
      task: rawTask,
      requestedMode: opts.config.workflow_mode,
    }),
    extensions: withTaskCentricAggregate(rawTask.extensions, aggregate),
  };
  const nativeIdentity = resolveNativeTaskIdentity(prepared);
  const evaluatedSha = prepared.quality_review?.evaluated_sha ?? null;
  const reviewIdentity = nativeIdentity
    ? buildNativeQualityReviewIdentity({
        task: prepared,
        native_identity: nativeIdentity,
        verification_input_digest: latestVerificationInputDigest(prepared),
        acceptance_criteria: evaluatorAcceptanceCriteria(prepared),
        implementation_sha: evaluatedSha,
      })
    : null;
  return reviewIdentity && prepared.quality_review
    ? {
        ...prepared,
        quality_review: {
          ...prepared.quality_review,
          review_identity_digest: reviewIdentity.digest,
        },
      }
    : prepared;
}

/** Persist native identity for integration tests that exercise the legacy-drain path. */
export async function materializeLegacyDrainIdentityFixture(opts: {
  root: string;
  task_id: string;
  work_items_completed?: boolean;
  task_terminal?: boolean;
}): Promise<boolean> {
  const ctx = await loadCommandContext({ cwd: opts.root, rootOverride: opts.root });
  const rawTask = await ctx.taskBackend.getTask(opts.task_id);
  if (!rawTask) throw new Error(`Task not found: ${opts.task_id}`);
  const existingAggregate = taskCentricAggregateFromExtensions(rawTask.extensions);
  const completionSatisfied =
    opts.work_items_completed !== true ||
    Object.values(existingAggregate?.work_items ?? {}).every((item) => item.state === "COMPLETED");
  const terminalSatisfied =
    opts.task_terminal !== true ||
    (existingAggregate?.lifecycle === "COMPLETED" && rawTask.status === "DONE");
  if (
    resolveNativeTaskIdentity(rawTask) &&
    existingAggregate?.revision === rawTask.revision &&
    completionSatisfied &&
    terminalSatisfied
  ) {
    return false;
  }
  let git: FixtureGitIdentity;
  try {
    git = { kind: "commit", sha: await gitRevParse(opts.root, ["HEAD"]), ref: "HEAD" };
  } catch {
    git = { kind: "unborn", ref: "HEAD" };
  }
  const prepared = withLegacyDrainIdentityFixture({
    task: rawTask,
    config: ctx.config,
    git,
    work_items_completed: opts.work_items_completed,
    task_terminal: opts.task_terminal,
  });
  const aggregate = taskCentricAggregateFromExtensions(prepared.extensions);
  if (!aggregate) throw new Error(`Native fixture projection is missing: ${opts.task_id}`);
  await ctx.taskBackend.writeTask(
    {
      ...prepared,
      extensions: withTaskCentricAggregate(prepared.extensions, {
        ...aggregate,
        revision: (rawTask.revision ?? aggregate.revision) + 1,
      }),
    },
    { expectedRevision: rawTask.revision ?? 1 },
  );
  return true;
}
