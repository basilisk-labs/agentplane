import { createHash } from "node:crypto";
import path from "node:path";

import {
  AGENT_WORK_ORDER_KIND,
  AGENT_WORK_ORDER_SCHEMA_VERSION,
  AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
  validateAgentWorkOrderV2,
  type AgentWorkOrderRole,
  type AgentWorkOrderV2,
  type StateFingerprint,
  type StateFingerprintPolicy,
} from "@agentplaneorg/core/schemas";

import {
  createRepositorySnapshot,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  WorkItemScheduler,
  type WorkItem,
} from "@agentplaneorg/core/tasks";
import { readTaskRouteGitSnapshot } from "../../commands/shared/route-decision.js";
import type { TaskRouteDecision } from "../../commands/shared/route-decision-types.js";
import { conflictReworkRequiredInputs } from "../../commands/pr/conflict-rework-semantic-input.js";
import type { ReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  resolveNativeSemanticToolClasses,
  type NativeTaskObligations,
} from "../../runtime/task-obligations/index.js";
import type { RunnerPromptBlock } from "../types.js";
import type { RunnerTaskContextEnvelope } from "../context/task-context.js";

import type { AgentWorkOrderSourceManifest } from "./agent-work-order-projection.js";
import type { TaskKnowledgeRetrieval } from "./task-knowledge-retrieval.js";

/**
 * A work order carries the resolved prompt, policy, and native obligation manifests as
 * prepared inputs. Their route observations may legitimately be unavailable in
 * a minimal project, but a later change still produces a stale fingerprint.
 * The durable invocation gate therefore requires only live identity and
 * authority components, while comparing every component for drift.
 */
const AGENT_WORK_ORDER_STATE_FINGERPRINT_POLICY = {
  required_components: ["task", "git", "backend_projection", "authority"],
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
  },
} as const satisfies StateFingerprintPolicy;

const AGENT_WORK_ORDER_STATE_FINGERPRINT_V2_POLICY = {
  fingerprint_schema_version: 2,
  required_components: [
    "task",
    "git",
    "backend_projection",
    "plan",
    "policy",
    "capability",
    "authority",
  ],
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
  },
} as const satisfies StateFingerprintPolicy;

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function compactText(value: string, fallback: string, maxLength = 8000): string {
  const compact = value.replaceAll(/\s+/gu, " ").trim();
  if (compact.length === 0) return fallback;
  return compact.length <= maxLength ? compact : `${compact.slice(0, maxLength - 3).trimEnd()}...`;
}

function uniqueSorted(values: readonly string[]): string[] {
  return [
    ...new Set(values.map((value) => value.trim()).filter((value) => value.length > 0)),
  ].toSorted();
}

function stableSourcePath(value: string | undefined, gitRoot: string): string | null {
  if (!value?.trim()) return null;
  const normalized = value.trim().replaceAll("\\", "/");
  if (!path.isAbsolute(normalized)) return normalized;
  const relative = path.relative(gitRoot, normalized).replaceAll(path.sep, "/");
  return relative.length > 0 && !relative.startsWith("../") ? relative : normalized;
}

function verifyStepLines(value: string): string[] {
  return uniqueSorted(
    value
      .split(/\r?\n/gu)
      .map((line) => line.replace(/^\s*(?:[-*]|\d+[.)])\s*/u, "").trim())
      .filter((line) => line.length > 0 && !line.startsWith("#")),
  );
}

function episodeSectionText(opts: {
  task_envelope: RunnerTaskContextEnvelope;
  section: string;
}): string {
  const wanted = opts.section.trim().replaceAll(/\s+/gu, " ").toLocaleLowerCase();
  return (
    opts.task_envelope.task.narrative.sections.find(
      (entry) => entry.name.trim().replaceAll(/\s+/gu, " ").toLocaleLowerCase() === wanted,
    )?.text ?? ""
  );
}

function workOrderRole(owner: string): AgentWorkOrderRole {
  const normalized = owner.trim().toUpperCase();
  if (normalized === "PLANNER" || normalized === "CURATOR" || normalized === "EVALUATOR") {
    return normalized;
  }
  return "EXECUTOR";
}

export function buildAgentWorkOrderSourceManifest(opts: {
  prepared: {
    task_envelope: RunnerTaskContextEnvelope;
    base_prompts: RunnerPromptBlock[];
    task_obligations: NativeTaskObligations;
    execution_context: ReadOnlyExecutionContext;
  };
}): AgentWorkOrderSourceManifest {
  const {
    task_envelope: taskEnvelope,
    base_prompts: basePrompts,
    task_obligations: taskObligations,
    execution_context,
  } = opts.prepared;
  const promptModules = basePrompts
    .map((prompt) => ({
      id: prompt.id,
      source: stableSourcePath(prompt.source, execution_context.repo.git_root),
      content_digest: sha256(prompt.content),
    }))
    .toSorted((left, right) => left.id.localeCompare(right.id));
  const verifySteps = verifyStepLines(
    episodeSectionText({ task_envelope: taskEnvelope, section: "Verify Steps" }),
  );
  const taskReadme = taskEnvelope.task.readme_path
    ? stableSourcePath(taskEnvelope.task.readme_path, execution_context.repo.git_root)
    : `${taskEnvelope.repository.workflow_dir}/${taskEnvelope.task.metadata.task_id}/README.md`;
  return {
    schema_version: 1,
    source_paths: uniqueSorted([
      taskReadme ?? "",
      ...taskObligations.policy_modules,
      ...promptModules.flatMap((prompt) => (prompt.source ? [prompt.source] : [])),
    ]),
    policy_modules: uniqueSorted(taskObligations.policy_modules),
    prompt_modules: promptModules,
    verification_context: {
      task_verify: uniqueSorted(taskEnvelope.task.verification.commands),
      verify_steps: verifySteps,
    },
  };
}

function acceptanceCriteria(opts: {
  task_envelope: RunnerTaskContextEnvelope;
  source_manifest: AgentWorkOrderSourceManifest;
  work_item?: WorkItem | null;
}): AgentWorkOrderV2["task"]["acceptance_criteria"] {
  if (opts.work_item) {
    return opts.work_item.acceptance_criteria.slice(0, 64).map((criterion) => ({
      id: criterion.id,
      description: compactText(criterion.description, "Complete the work-item criterion."),
      required: criterion.required,
    }));
  }
  const candidates = uniqueSorted([
    ...opts.source_manifest.verification_context.task_verify,
    ...opts.source_manifest.verification_context.verify_steps,
    ...(opts.task_envelope.task.metadata.execution_contract?.verification.required_evidence ?? []),
  ]);
  const descriptions =
    candidates.length > 0
      ? candidates
      : [`Complete the approved task outcome for ${opts.task_envelope.task.narrative.title}.`];
  return descriptions.slice(0, 64).map((description, index) => ({
    id: `acceptance-${index + 1}`,
    description: compactText(description, "Complete the approved task outcome."),
    required: true,
  }));
}

function verificationIntent(opts: {
  source_manifest: AgentWorkOrderSourceManifest;
  execution_contract?: RunnerTaskContextEnvelope["task"]["metadata"]["execution_contract"];
  task_obligations: NativeTaskObligations;
  work_item?: WorkItem | null;
}): AgentWorkOrderV2["verification_intent"] {
  if (opts.work_item) {
    return {
      requirements: opts.work_item.validation.criteria.slice(0, 64).map((criterion) => ({
        id: criterion.id,
        description: compactText(criterion.description, "Record work-item verification evidence."),
        required: criterion.required,
        observed_by: "agentplane",
      })),
      require_execution_receipt: true,
    };
  }
  const candidates = uniqueSorted([
    ...opts.source_manifest.verification_context.task_verify,
    ...opts.source_manifest.verification_context.verify_steps,
    ...(opts.execution_contract?.verification.required_evidence ?? []),
  ]);
  const nativeRequirements = opts.task_obligations.evidence_requirements.map((requirement) => ({
    id: requirement.id,
    description: compactText(requirement.description, requirement.id),
    required: requirement.required,
    observed_by: "agentplane" as const,
  }));
  if (nativeRequirements.length > 0) {
    return {
      requirements: [
        ...nativeRequirements,
        ...candidates
          .filter((candidate) => !nativeRequirements.some((item) => item.id === candidate))
          .map((description, index) => ({
            id: `verification-${index + 1}`,
            description: compactText(description, "Record verification evidence."),
            required: true,
            observed_by: "agentplane" as const,
          })),
      ].slice(0, 64),
      require_execution_receipt: true,
    };
  }
  const descriptions =
    candidates.length > 0
      ? candidates
      : ["Record the task-specific verification evidence before reporting completion."];
  return {
    requirements: descriptions.slice(0, 64).map((description, index) => ({
      id: `verification-${index + 1}`,
      description: compactText(description, "Record verification evidence."),
      required: true,
      observed_by: "agentplane",
    })),
    require_execution_receipt: true,
  };
}

function deterministicWorkOrderId(opts: {
  task_id: string;
  role: AgentWorkOrderRole;
  fingerprint: StateFingerprint;
}): string {
  const taskPart = opts.task_id.replaceAll(/[^A-Za-z0-9_.-]/gu, "-").slice(0, 96) || "task";
  const fingerprintPart = opts.fingerprint.digest.replace(/^sha256:/u, "").slice(0, 24);
  return `work-order-${taskPart}-${opts.role.toLowerCase()}-${fingerprintPart}`;
}

function protectedPaths(executionContext: ReadOnlyExecutionContext): string[] {
  return uniqueSorted(Object.values(executionContext.harness.policy.protected_paths).flat());
}

function requiredInputs(opts: {
  task_envelope: RunnerTaskContextEnvelope;
  source_manifest: AgentWorkOrderSourceManifest;
  knowledge_retrieval: TaskKnowledgeRetrieval;
  work_item?: WorkItem | null;
}): AgentWorkOrderV2["required_inputs"] {
  const taskReadme = opts.source_manifest.source_paths.find((source) =>
    source.endsWith("/README.md"),
  );
  const inputs: AgentWorkOrderV2["required_inputs"] = [
    {
      id: "task-record",
      kind: "task_record",
      description: "Current task record resolved by the configured task backend.",
      required: true,
    },
    {
      id: "task-document",
      kind: "task_document",
      description: "Task document containing the approved scope and verification context.",
      ...(taskReadme ? { path: taskReadme } : {}),
      required: true,
    },
  ];
  if (opts.work_item) {
    inputs.push({
      id: `work-item-${opts.work_item.id}`,
      kind: "source_artifact",
      description: `Approved internal WorkItem ${opts.work_item.id}: ${opts.work_item.objective}`,
      required: true,
    });
  }
  for (const [index, modulePath] of opts.source_manifest.policy_modules.entries()) {
    inputs.push({
      id: `policy-module-${index + 1}`,
      kind: "policy_module",
      description: "Policy module required by the native task execution obligations.",
      path: modulePath,
      required: true,
    });
  }
  for (const [index, source] of opts.source_manifest.source_paths.entries()) {
    if (source === taskReadme || opts.source_manifest.policy_modules.includes(source)) continue;
    inputs.push({
      id: `source-artifact-${index + 1}`,
      kind: "source_artifact",
      description: "Source artifact selected for the prepared work-order context.",
      path: source,
      required: false,
    });
  }
  for (const [index, knowledge] of opts.knowledge_retrieval.knowledge_refs.entries()) {
    inputs.push({
      id: `knowledge-ref-${index + 1}`,
      kind: "knowledge_ref",
      description: `Prepared knowledge selected by ${knowledge.retrieval}: ${knowledge.reason}`,
      path: knowledge.ref,
      digest: knowledge.digest,
      required: knowledge.required,
    });
  }
  return inputs;
}

export function buildCanonicalAgentWorkOrder(opts: {
  prepared: {
    task_envelope: RunnerTaskContextEnvelope;
    execution_context: ReadOnlyExecutionContext;
    route_decision: TaskRouteDecision;
    semantic_role?: AgentWorkOrderRole;
    task_execution?: TaskExecutionContext;
    task_obligations: NativeTaskObligations;
  };
  source_manifest: AgentWorkOrderSourceManifest;
  knowledge_retrieval: TaskKnowledgeRetrieval;
}): AgentWorkOrderV2 {
  const {
    task_envelope: taskEnvelope,
    execution_context: executionContext,
    route_decision: decision,
  } = opts.prepared;
  const task = taskEnvelope.task;
  const role =
    opts.prepared.semantic_role ??
    workOrderRole(decision.executionPacket.recommendedRole ?? task.metadata.owner ?? "");
  const stateFingerprint = structuredClone(decision.workflowStep.preconditionFingerprint);
  const routeGit = readTaskRouteGitSnapshot(decision);
  const repositorySnapshot = createRepositorySnapshot({
    git:
      stateFingerprint.git_head === null
        ? routeGit?.state === "available"
          ? { kind: "unborn", ref: null }
          : {
              kind: "unavailable",
              reason_code: routeGit?.errors[0]?.operation ?? "git_observation_unavailable",
              detail: routeGit?.errors[0]?.message,
            }
        : { kind: "commit", sha: stateFingerprint.git_head, ref: null },
    dirty_paths: routeGit?.dirty_paths ?? [],
    policy_digest:
      stateFingerprint.components.policy.state === "present"
        ? (stateFingerprint.components.policy.digest as `sha256:${string}`)
        : null,
    config_digest: null,
    context_digest:
      stateFingerprint.components.knowledge.state === "present"
        ? (stateFingerprint.components.knowledge.digest as `sha256:${string}`)
        : null,
    task_history_cursor:
      stateFingerprint.task_revision === null
        ? null
        : `task-revision:${String(stateFingerprint.task_revision)}`,
    captured_at: routeGit?.captured_at ?? new Date().toISOString(),
  });
  const planningRetrievals: NonNullable<AgentWorkOrderV2["planning_context"]>["retrievals"] = [
    ...opts.knowledge_retrieval.knowledge_refs.map((knowledge) => ({
      status: "available" as const,
      ref: knowledge.ref,
      digest: knowledge.digest,
    })),
    ...opts.knowledge_retrieval.receipt.omissions.map((omission) => ({
      status:
        omission.reason_code === "source_malformed"
          ? ("malformed" as const)
          : omission.reason_code === "source_denied"
            ? ("denied" as const)
            : omission.reason_code === "source_unavailable"
              ? ("unavailable" as const)
              : ("omitted" as const),
      ref: omission.query ?? `retrieval:${omission.adapter}`,
      reason_code: omission.reason_code,
      required: false,
    })),
  ];
  const planningContextIdentity = {
    schema_version: 1 as const,
    repository_snapshot: repositorySnapshot,
    retrievals: planningRetrievals,
  };
  const mutationPath =
    opts.prepared.task_execution?.authoritative_task_source === "task_worktree"
      ? taskEnvelope.repository.git_root
      : decision.oracle.mutationPathHint;
  const executionContract = task.metadata.execution_contract;
  const taskCentric = taskCentricAggregateFromExtensions(taskEnvelope.source_task.extensions);
  const selectedWorkItem =
    role === "EXECUTOR" &&
    taskCentric?.current_plan?.approval.state === "approved" &&
    taskCentric.current_plan.approval.approved_digest === taskCentric.current_plan.digest
      ? (new WorkItemScheduler(1).select({
          graph: taskCentric.current_plan.proposal.work_items,
          runtime: taskCentric.work_items,
          active_leases: [],
        })[0] ?? null)
      : null;
  const declaredScopeRoots =
    selectedWorkItem?.scope_roots ?? executionContract?.authority.writable_roots;
  const hasExplicitEmptyScope =
    executionContract?.source === "agent_declared" && declaredScopeRoots?.length === 0;
  const isolatedWorkItemCanMutate =
    opts.prepared.task_execution?.authoritative_task_source === "task_worktree" &&
    opts.prepared.task_execution.selected_mode === "direct" &&
    role === "EXECUTOR" &&
    selectedWorkItem !== null;
  const canMutate =
    (decision.executionPacket.safeToMutate || isolatedWorkItemCanMutate) &&
    mutationPath !== null &&
    !hasExplicitEmptyScope;
  const declaredWritableRoots = (() => {
    if (!canMutate || mutationPath === null) return [];
    if (!declaredScopeRoots || declaredScopeRoots.length === 0) return [mutationPath];
    const repositoryRoot = path.resolve(mutationPath);
    return declaredScopeRoots.map((root) => {
      const resolved = root === "." ? repositoryRoot : path.resolve(repositoryRoot, root);
      const relative = path.relative(repositoryRoot, resolved).replaceAll("\\", "/");
      if (relative === ".." || relative.startsWith("../") || path.isAbsolute(relative)) {
        throw new Error(`Execution declaration scope escapes the authoritative checkout: ${root}`);
      }
      return resolved;
    });
  })();
  const allowedToolClasses = resolveNativeSemanticToolClasses({
    can_mutate: canMutate,
    role,
    has_knowledge: opts.knowledge_retrieval.knowledge_refs.length > 0,
  });
  const summary =
    episodeSectionText({ task_envelope: taskEnvelope, section: "Summary" }) ||
    task.narrative.description;
  const verification = verificationIntent({
    source_manifest: opts.source_manifest,
    execution_contract: task.metadata.execution_contract,
    task_obligations: opts.prepared.task_obligations,
    work_item: selectedWorkItem,
  });
  const stopRules = uniqueSorted([
    ...decision.executionPacket.mustNot,
    decision.executionPacket.returnControlWhen,
    ...opts.prepared.task_obligations.stop_rules.map(
      (rule) => `${rule.severity}: ${rule.reason} (${rule.id})`,
    ),
    "Stop and return a blocked semantic result when the prepared state is stale or required context is missing.",
  ]);
  const allowedExternalEffects = executionContract?.authority.allowed_external_effects ?? [];
  const conflictEpisode = decision.workflowStep.id === "agent.provider_conflict_rework";
  const conflictInput = conflictReworkRequiredInputs(decision, {
    task_id: task.metadata.task_id,
    checkout: mutationPath,
    head: stateFingerprint.git_head,
    writable_roots: declaredWritableRoots,
  });
  return validateAgentWorkOrderV2({
    schema_version: AGENT_WORK_ORDER_SCHEMA_VERSION,
    kind: AGENT_WORK_ORDER_KIND,
    work_order_id: deterministicWorkOrderId({
      task_id: task.metadata.task_id,
      role,
      fingerprint: stateFingerprint,
    }),
    role,
    task: {
      id: task.metadata.task_id,
      revision: stateFingerprint.task_revision,
      objective: compactText(
        conflictEpisode && decision.workflowStep.kind === "agent_episode"
          ? decision.workflowStep.episode.objective
          : (selectedWorkItem?.objective ?? summary),
        task.narrative.title,
      ),
      acceptance_criteria: acceptanceCriteria({
        task_envelope: taskEnvelope,
        source_manifest: opts.source_manifest,
        work_item: selectedWorkItem,
      }),
      unresolved_questions: [...(taskCentric?.current_plan?.proposal.unresolved_questions ?? [])],
      work_item_id: selectedWorkItem?.id ?? null,
    },
    state_fingerprint: stateFingerprint,
    state_fingerprint_policy:
      stateFingerprint.schema_version === 2
        ? AGENT_WORK_ORDER_STATE_FINGERPRINT_V2_POLICY
        : AGENT_WORK_ORDER_STATE_FINGERPRINT_POLICY,
    authority: {
      mutation_scope: task.metadata.mutation_scope ?? "unknown",
      writable_roots: declaredWritableRoots,
      protected_paths: protectedPaths(executionContext),
      allowed_tool_classes: allowedToolClasses,
      // Hosted lifecycle evidence is collected by the CLI before delegation;
      // this does not grant an executor independent network authority.
      network: allowedExternalEffects.includes("network_read") ? "allowed" : "deny",
      external_side_effects: allowedExternalEffects.filter((effect) => effect !== "network_read"),
      sandbox: canMutate ? "workspace-write" : "read-only",
      expires_at: null,
    },
    context_intent: {
      purpose:
        "Provide bounded task, route, prompt, verification, and deterministic knowledge context for one semantic agent episode.",
      required_knowledge_ref_digests: opts.knowledge_retrieval.knowledge_refs
        .filter((knowledge) => knowledge.required)
        .map((knowledge) => knowledge.digest),
      require_prepared_evidence: opts.knowledge_retrieval.prepared_evidence.some(
        (excerpt) => excerpt.status === "included",
      ),
    },
    planning_context: {
      ...planningContextIdentity,
      digest: taskCentricDigest(planningContextIdentity),
    },
    knowledge_refs: opts.knowledge_retrieval.knowledge_refs,
    prepared_evidence: opts.knowledge_retrieval.prepared_evidence.map((excerpt) => ({
      role,
      excerpt,
    })),
    required_inputs: [
      ...requiredInputs({
        task_envelope: taskEnvelope,
        source_manifest: opts.source_manifest,
        knowledge_retrieval: opts.knowledge_retrieval,
        work_item: selectedWorkItem,
      }),
      ...conflictInput,
    ],
    required_outputs: [
      {
        id: "semantic-result",
        kind: "semantic_result",
        description: "Agent-reported semantic outcome; observed facts remain supervisor-owned.",
        required: true,
      },
      ...(selectedWorkItem?.expected_outputs.map((output) => ({
        id: output,
        kind: "report" as const,
        description: `Typed output required by WorkItem ${selectedWorkItem.id}.`,
        required: true,
      })) ?? []),
    ],
    verification_intent: verification,
    semantic_result_schema: AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
    stop_rules: stopRules,
  });
}
