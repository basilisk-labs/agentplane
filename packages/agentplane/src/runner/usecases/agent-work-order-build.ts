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

import type { BlueprintPlanArtifact } from "../../blueprints/index.js";
import { checkTaskBlueprintSnapshotDrift } from "../../commands/blueprint/snapshot-artifact.js";
import type { TaskRouteDecision } from "../../commands/shared/route-decision-types.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { TaskBlueprintLifecycleSummary } from "../../commands/task/blueprint-summary.js";
import type { ReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import type { RunnerPromptBlock } from "../types.js";
import type { RunnerTaskContextEnvelope } from "../context/task-context.js";

import type {
  AgentWorkOrderLegacyBriefProjection,
  AgentWorkOrderSourceManifest,
} from "./agent-work-order-projection.js";

/**
 * A work order carries the resolved prompt, policy, and blueprint manifests as
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

function legacyBlueprintSummary(opts: {
  task_id: string;
  blueprint: BlueprintPlanArtifact;
}): TaskBlueprintLifecycleSummary {
  const workflowGit = opts.blueprint.workflowGitCapabilities;
  return {
    blueprint_id: opts.blueprint.blueprintId,
    blueprint_version: opts.blueprint.blueprintVersion,
    ...(opts.blueprint.workflowMode ? { workflow_mode: opts.blueprint.workflowMode } : {}),
    ...(workflowGit
      ? {
          workflow_git: [
            `implementation_commit_location=${workflowGit.implementationCommitLocation}`,
            `finish_commit_source=${workflowGit.finishCommitSource}`,
            `close_tail_required=${workflowGit.closeTailRequired ? "yes" : "no"}`,
            `finish_commit_from_comment=${workflowGit.finishCommitFromComment ? "yes" : "no"}`,
          ].join(" "),
        }
      : {}),
    route: opts.blueprint.states.map((state) => state.kind),
    selection_reasons: [...opts.blueprint.whySelected],
    policy_modules: [...opts.blueprint.policyModules],
    required_evidence: opts.blueprint.requiredEvidence.map((item) => item.id),
    stop_reasons: opts.blueprint.stopReasons.map((reason) => reason.id),
    explain_command: `agentplane blueprint explain ${opts.task_id}`,
    snapshot_command: `agentplane blueprint snapshot ${opts.task_id}`,
  };
}

export async function buildAgentWorkOrderLegacyBriefProjection(opts: {
  command_ctx: CommandContext;
  task_envelope: RunnerTaskContextEnvelope;
  blueprint: BlueprintPlanArtifact;
}): Promise<AgentWorkOrderLegacyBriefProjection> {
  const snapshot = await checkTaskBlueprintSnapshotDrift({
    ctx: opts.command_ctx,
    task: opts.task_envelope.source_task,
  });
  return {
    blueprint: legacyBlueprintSummary({
      task_id: opts.task_envelope.task.metadata.task_id,
      blueprint: opts.blueprint,
    }),
    snapshot: {
      state: snapshot.state,
      path: snapshot.path,
      digest: snapshot.previous.digest,
      current_digest: snapshot.current.digest,
      route_changed: snapshot.routeChanged,
      safe_command: snapshot.safeCommand,
    },
  };
}

export function buildAgentWorkOrderSourceManifest(opts: {
  prepared: {
    task_envelope: RunnerTaskContextEnvelope;
    base_prompts: RunnerPromptBlock[];
    blueprint: BlueprintPlanArtifact;
    execution_context: ReadOnlyExecutionContext;
  };
}): AgentWorkOrderSourceManifest {
  const {
    task_envelope: taskEnvelope,
    base_prompts: basePrompts,
    blueprint,
    execution_context,
  } = opts.prepared;
  const promptModules = basePrompts
    .map((prompt) => ({
      id: prompt.id,
      source: stableSourcePath(prompt.source, execution_context.repo.git_root),
      content_digest: sha256(prompt.content),
    }))
    .toSorted((left, right) => left.id.localeCompare(right.id));
  const blueprintContext = blueprint.contextManifest
    .map((entry) => ({
      id: entry.id,
      kind: entry.kind,
      source: stableSourcePath(entry.source, execution_context.repo.git_root),
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
      ...blueprint.policyModules,
      ...promptModules.flatMap((prompt) => (prompt.source ? [prompt.source] : [])),
      ...blueprintContext.flatMap((entry) => (entry.source ? [entry.source] : [])),
    ]),
    policy_modules: uniqueSorted(blueprint.policyModules),
    prompt_modules: promptModules,
    blueprint_context: blueprintContext,
    verification_context: {
      task_verify: uniqueSorted(taskEnvelope.task.verification.commands),
      verify_steps: verifySteps,
    },
  };
}

function acceptanceCriteria(opts: {
  task_envelope: RunnerTaskContextEnvelope;
  source_manifest: AgentWorkOrderSourceManifest;
}): AgentWorkOrderV2["task"]["acceptance_criteria"] {
  const candidates = uniqueSorted([
    ...opts.source_manifest.verification_context.task_verify,
    ...opts.source_manifest.verification_context.verify_steps,
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
}): AgentWorkOrderV2["verification_intent"] {
  const candidates = uniqueSorted([
    ...opts.source_manifest.verification_context.task_verify,
    ...opts.source_manifest.verification_context.verify_steps,
  ]);
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
  for (const [index, modulePath] of opts.source_manifest.policy_modules.entries()) {
    inputs.push({
      id: `policy-module-${index + 1}`,
      kind: "policy_module",
      description: "Policy module selected by the resolved blueprint context.",
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
  return inputs;
}

export function buildCanonicalAgentWorkOrder(opts: {
  prepared: {
    task_envelope: RunnerTaskContextEnvelope;
    execution_context: ReadOnlyExecutionContext;
    route_decision: TaskRouteDecision;
  };
  source_manifest: AgentWorkOrderSourceManifest;
}): AgentWorkOrderV2 {
  const {
    task_envelope: taskEnvelope,
    execution_context: executionContext,
    route_decision: decision,
  } = opts.prepared;
  const task = taskEnvelope.task;
  const role = workOrderRole(task.metadata.owner ?? "");
  const stateFingerprint = structuredClone(decision.workflowStep.preconditionFingerprint);
  const mutationPath = decision.oracle.mutationPathHint;
  const canMutate = decision.executionPacket.safeToMutate && mutationPath !== null;
  const allowedToolClasses: AgentWorkOrderV2["authority"]["allowed_tool_classes"] = canMutate
    ? [
        "repository_read",
        "git_read",
        "run_checks",
        "report_result",
        "report_blocker",
        "workspace_write",
      ]
    : ["repository_read", "git_read", "run_checks", "report_result", "report_blocker"];
  const summary =
    episodeSectionText({ task_envelope: taskEnvelope, section: "Summary" }) ||
    task.narrative.description;
  const verification = verificationIntent({ source_manifest: opts.source_manifest });
  const stopRules = uniqueSorted([
    ...decision.executionPacket.mustNot,
    decision.executionPacket.returnControlWhen,
    "Stop and return a blocked semantic result when the prepared state is stale or required context is missing.",
  ]);
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
      revision: task.metadata.revision,
      objective: compactText(summary, task.narrative.title),
      acceptance_criteria: acceptanceCriteria({
        task_envelope: taskEnvelope,
        source_manifest: opts.source_manifest,
      }),
      unresolved_questions: [],
    },
    state_fingerprint: stateFingerprint,
    state_fingerprint_policy: AGENT_WORK_ORDER_STATE_FINGERPRINT_POLICY,
    authority: {
      mutation_scope: task.metadata.mutation_scope ?? "unknown",
      writable_roots: canMutate ? [mutationPath] : [],
      protected_paths: protectedPaths(executionContext),
      allowed_tool_classes: allowedToolClasses,
      // Hosted lifecycle evidence is collected by the CLI before delegation;
      // this does not grant an executor independent network authority.
      network: "deny",
      external_side_effects: [],
      sandbox: canMutate ? "workspace-write" : "read-only",
      expires_at: null,
    },
    context_intent: {
      purpose:
        "Provide the bounded task, route, prompt, and verification context for one semantic agent episode.",
      required_knowledge_ref_digests: [],
      require_prepared_evidence: false,
    },
    knowledge_refs: [],
    prepared_evidence: [],
    required_inputs: requiredInputs({
      task_envelope: taskEnvelope,
      source_manifest: opts.source_manifest,
    }),
    required_outputs: [
      {
        id: "semantic-result",
        kind: "semantic_result",
        description: "Agent-reported semantic outcome; observed facts remain supervisor-owned.",
        required: true,
      },
    ],
    verification_intent: verification,
    semantic_result_schema: AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
    stop_rules: stopRules,
  });
}
