import path from "node:path";
import {
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  buildStateFingerprint,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k, type KernelEpisodeBinding } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { KernelWorkOrder } from "../../runner/usecases/kernel-task-lifecycle.js";
import type { NativeAuthorityContext } from "../../ports/kernel-authority.js";
import type { CommandContext } from "../shared/task-backend.js";

export function buildKernelStateFingerprint(opts: {
  command: CommandContext;
  record: KernelRecord;
  context: NativeAuthorityContext;
  authority_digest: string | null;
}) {
  const present = (source: string, value: unknown) => ({
    state: "present" as const,
    source,
    value,
  });
  const absent = {
    state: "unavailable" as const,
    source: "canonical_episode",
    reason_code: "not_required_for_semantic_episode",
  };
  return buildStateFingerprint({
    task_id: opts.record.aggregate.id,
    task_revision: opts.record.aggregate.revision,
    git_head: null,
    worktree: opts.command.resolvedProject.gitRoot,
    components: {
      task: present("canonical_task", opts.record.digest),
      git: present("native_repository_content", opts.context.repository_fingerprint),
      backend_projection: present("canonical_backend", opts.command.backendId),
      policy: present("native_policy", opts.context.ceiling.policy_digests),
      authority: present("canonical_authority", {
        issued: opts.authority_digest,
        lineage: opts.record.aggregate.authority_lineage?.at(-1)?.authority.digest ?? null,
      }),
      blueprint: absent,
      knowledge: absent,
      provider: absent,
    },
  });
}

/** Project one semantic episode. This object never selects or executes a lifecycle transition. */
export function buildKernelAgentWorkOrder(opts: {
  command: CommandContext;
  record: KernelRecord;
  context: NativeAuthorityContext;
  implementation?: KernelWorkOrder;
}): AgentWorkOrderV2 {
  const { record, context, implementation } = opts;
  const aggregate = record.aggregate;
  if (!record.documents) throw new Error("Canonical documents require explicit migration");
  const plan = aggregate.current_plan;
  const binding: KernelEpisodeBinding = implementation
    ? {
        ...implementation.binding,
        phase: "implementation",
        repository_identity: context.repository_identity,
        authority_digest: implementation.authority.digest,
      }
    : {
        phase: "planning",
        task_id: aggregate.id,
        repository_identity: context.repository_identity,
        repository_fingerprint: context.repository_fingerprint,
        plan_revision: plan?.revision ?? 0,
        plan_digest: plan?.digest ?? aggregate.intent_digest,
      };
  const authority = implementation?.authority;
  const policy = {
    required_components: ["task", "git", "backend_projection", "policy", "authority"] as const,
    provider: { required: false, unavailable: "allow_if_unchanged" as const },
  };
  const fingerprint = buildKernelStateFingerprint({
    command: opts.command,
    record,
    context,
    authority_digest: authority?.digest ?? null,
  });
  const objective = implementation?.contract.objective ?? record.documents.intent.objective;
  const criteria = implementation?.contract.acceptance_criteria ?? [
    "Return a bounded canonical plan with contracts, dependencies, output IDs, scope and verification commands.",
  ];
  return AGENT_WORK_ORDER_V2_ZOD_SCHEMA.parse({
    schema_version: 2,
    kind: "agent_work_order",
    work_order_id: k.kernelDigest({ binding, revision: aggregate.revision, record: record.digest }),
    role: implementation?.contract.role ?? "PLANNER",
    task: {
      id: aggregate.id,
      revision: aggregate.revision,
      objective,
      acceptance_criteria: criteria.map((description, index) => ({
        id: `criterion-${index + 1}`,
        description,
        required: true,
      })),
      unresolved_questions: [],
      ...(implementation ? { work_item_id: implementation.binding.work_item_id } : {}),
    },
    canonical_binding: binding,
    state_fingerprint: fingerprint,
    state_fingerprint_policy: policy,
    authority: {
      mutation_scope: authority ? "code" : "none",
      writable_roots:
        authority?.scope_roots.map((root) =>
          path.resolve(opts.command.resolvedProject.gitRoot, root),
        ) ?? [],
      protected_paths: [
        ".git",
        opts.command.config.paths.workflow_dir,
        opts.command.config.paths.tasks_path,
        ".agentplane/config.json",
        ".agentplane/backends",
      ],
      allowed_tool_classes: [
        "repository_read",
        "git_read",
        "report_result",
        "report_blocker",
        ...(authority ? ["workspace_write", "run_checks"] : []),
      ],
      network: "deny",
      external_side_effects: [],
      sandbox: authority ? "workspace-write" : "read-only",
      expires_at: authority?.expires_at ?? null,
    },
    context_intent: {
      purpose: record.documents.intent.context,
      required_knowledge_ref_digests: [],
      require_prepared_evidence: false,
    },
    knowledge_refs: [],
    prepared_evidence: [],
    required_inputs:
      implementation?.inputs.map((manifest) => ({
        id: manifest.id,
        kind: "source_artifact",
        description: manifest.kind,
        digest: manifest.digest,
        required: true,
      })) ?? [],
    required_outputs: [
      {
        id: "semantic-result",
        kind: "semantic_result",
        description:
          "Return AgentSemanticResult v2 with the exact canonical_binding. Use canonical_plan for planning or canonical_outputs for implementation. Do not claim user authority or native verification.",
        required: true,
      },
      ...(implementation?.expected_outputs.map((id) => ({
        id: `output:${id}`,
        kind: "report" as const,
        description: `Return a canonical_outputs entry with id ${JSON.stringify(id)}, its kind and content digest.`,
        required: true,
      })) ?? []),
    ],
    verification_intent: {
      requirements: [
        ...criteria,
        ...(implementation?.contract.verification_commands.map(
          (command) => `Run the contract check: ${command}`,
        ) ?? []),
      ].map((description, index) => ({
        id: `criterion-${index + 1}`,
        description,
        required: true,
        observed_by: "agentplane",
      })),
      require_execution_receipt: true,
    },
    semantic_result_schema: "agentplane.agent_semantic_result.v2",
    stop_rules: [
      "Perform only this semantic objective.",
      "Return the exact canonical_binding with the semantic result.",
      "Do not invoke task, Git or provider lifecycle commands.",
      "Do not write outside authorized roots or modify protected native state.",
      "Return blocked if scope or context is insufficient.",
    ],
  });
}
