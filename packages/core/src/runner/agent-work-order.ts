import { z } from "zod";

import {
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "../tasks/task-artifact-schema.shared.js";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  type AgentSemanticResult,
} from "./agent-semantic-result.js";
import {
  KNOWLEDGE_REF_ZOD_SCHEMA,
  PREPARED_KNOWLEDGE_EXCERPT_ZOD_SCHEMA,
} from "./knowledge-ref.js";
import {
  STATE_FINGERPRINT_POLICY_ZOD_SCHEMA,
  STATE_FINGERPRINT_ZOD_SCHEMA,
  evaluateStateFingerprintPrecondition,
  validateStateFingerprint,
  type StateFingerprint,
  type StateFingerprintPreconditionDiagnostic,
} from "./state-fingerprint.js";

export const AGENT_WORK_ORDER_SCHEMA_VERSION = 2 as const;
export const AGENT_WORK_ORDER_KIND = "agent_work_order" as const;
export const AGENT_WORK_ORDER_ROLE_VALUES = [
  "PLANNER",
  "CURATOR",
  "EXECUTOR",
  "EVALUATOR",
] as const;
export const AGENT_WORK_ORDER_NETWORK_POLICY_VALUES = ["deny", "allowlisted", "allowed"] as const;
export const AGENT_WORK_ORDER_SANDBOX_VALUES = [
  "read-only",
  "workspace-write",
  "danger-full-access",
] as const;
export const AGENT_WORK_ORDER_TOOL_CLASS_VALUES = [
  "repository_read",
  "workspace_write",
  "git_read",
  "git_write",
  "run_checks",
  "knowledge_read",
  "knowledge_request",
  "report_result",
  "report_blocker",
] as const;
export const AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA =
  "agentplane.agent_semantic_result.v2" as const;

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const IDENTIFIER_SCHEMA = z.string().trim().min(1).max(160);
const DESCRIPTION_SCHEMA = z.string().trim().min(1).max(8192);
const PATH_SCHEMA = z.string().trim().min(1).max(4096);
const ISO_UTC_TIMESTAMP_SCHEMA = z.string().datetime({ offset: true });

const ACCEPTANCE_CRITERION_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    description: DESCRIPTION_SCHEMA,
    required: z.boolean(),
  })
  .strict();

const UNRESOLVED_QUESTION_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    question: DESCRIPTION_SCHEMA,
    blocking: z.boolean(),
  })
  .strict();

const AGENT_WORK_ORDER_TASK_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    revision: z.number().int().positive().nullable(),
    objective: DESCRIPTION_SCHEMA,
    acceptance_criteria: z.array(ACCEPTANCE_CRITERION_ZOD_SCHEMA).min(1),
    unresolved_questions: z.array(UNRESOLVED_QUESTION_ZOD_SCHEMA),
  })
  .strict();

const AGENT_WORK_ORDER_AUTHORITY_ZOD_SCHEMA = z
  .object({
    mutation_scope: IDENTIFIER_SCHEMA,
    writable_roots: z.array(PATH_SCHEMA),
    protected_paths: z.array(PATH_SCHEMA),
    allowed_tool_classes: z.array(z.enum(AGENT_WORK_ORDER_TOOL_CLASS_VALUES)),
    network: z.enum(AGENT_WORK_ORDER_NETWORK_POLICY_VALUES),
    external_side_effects: z.array(IDENTIFIER_SCHEMA),
    sandbox: z.enum(AGENT_WORK_ORDER_SANDBOX_VALUES),
    expires_at: ISO_UTC_TIMESTAMP_SCHEMA.nullable(),
  })
  .strict();

const AGENT_WORK_ORDER_CONTEXT_INTENT_ZOD_SCHEMA = z
  .object({
    purpose: DESCRIPTION_SCHEMA,
    required_knowledge_ref_digests: z.array(SHA256_DIGEST_SCHEMA),
    require_prepared_evidence: z.boolean(),
  })
  .strict();

const AGENT_WORK_ORDER_PREPARED_EVIDENCE_ZOD_SCHEMA = z
  .object({
    role: z.enum(AGENT_WORK_ORDER_ROLE_VALUES),
    excerpt: PREPARED_KNOWLEDGE_EXCERPT_ZOD_SCHEMA,
  })
  .strict();

const AGENT_WORK_ORDER_INPUT_KIND_VALUES = [
  "task_record",
  "task_document",
  "policy_module",
  "knowledge_ref",
  "prepared_evidence",
  "source_artifact",
] as const;
const AGENT_WORK_ORDER_OUTPUT_KIND_VALUES = [
  "semantic_result",
  "patch",
  "report",
  "knowledge_proposal",
  "verification_note",
] as const;

const ARTIFACT_REF_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    kind: z.enum(AGENT_WORK_ORDER_INPUT_KIND_VALUES),
    description: DESCRIPTION_SCHEMA,
    path: PATH_SCHEMA.optional(),
    digest: SHA256_DIGEST_SCHEMA.optional(),
    required: z.boolean(),
  })
  .strict();

const ARTIFACT_CONTRACT_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    kind: z.enum(AGENT_WORK_ORDER_OUTPUT_KIND_VALUES),
    description: DESCRIPTION_SCHEMA,
    required: z.boolean(),
  })
  .strict();

const VERIFICATION_REQUIREMENT_ZOD_SCHEMA = z
  .object({
    id: IDENTIFIER_SCHEMA,
    description: DESCRIPTION_SCHEMA,
    required: z.boolean(),
    observed_by: z.enum(["agentplane", "evaluator", "human"]),
  })
  .strict();

const VERIFICATION_INTENT_ZOD_SCHEMA = z
  .object({
    requirements: z.array(VERIFICATION_REQUIREMENT_ZOD_SCHEMA).min(1),
    require_execution_receipt: z.boolean(),
  })
  .strict();

function addDuplicateIdIssue(
  ctx: z.RefinementCtx,
  path: (string | number)[],
  entries: readonly { id: string }[],
  label: string,
): void {
  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.id)) {
      ctx.addIssue({
        code: "custom",
        path,
        message: `${label} identifiers must be unique.`,
      });
      return;
    }
    seen.add(entry.id);
  }
}

function knowledgeIdentity(value: { ref: string; digest: string }): string {
  return `${value.ref}\u0000${value.digest}`;
}

export const AGENT_WORK_ORDER_V2_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(AGENT_WORK_ORDER_SCHEMA_VERSION),
    kind: z.literal(AGENT_WORK_ORDER_KIND),
    work_order_id: IDENTIFIER_SCHEMA,
    role: z.enum(AGENT_WORK_ORDER_ROLE_VALUES),
    task: AGENT_WORK_ORDER_TASK_ZOD_SCHEMA,
    state_fingerprint: STATE_FINGERPRINT_ZOD_SCHEMA,
    state_fingerprint_policy: STATE_FINGERPRINT_POLICY_ZOD_SCHEMA,
    authority: AGENT_WORK_ORDER_AUTHORITY_ZOD_SCHEMA,
    context_intent: AGENT_WORK_ORDER_CONTEXT_INTENT_ZOD_SCHEMA,
    knowledge_refs: z.array(KNOWLEDGE_REF_ZOD_SCHEMA),
    prepared_evidence: z.array(AGENT_WORK_ORDER_PREPARED_EVIDENCE_ZOD_SCHEMA),
    required_inputs: z.array(ARTIFACT_REF_ZOD_SCHEMA),
    required_outputs: z.array(ARTIFACT_CONTRACT_ZOD_SCHEMA).min(1),
    verification_intent: VERIFICATION_INTENT_ZOD_SCHEMA,
    semantic_result_schema: z.literal(AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA),
    stop_rules: z.array(DESCRIPTION_SCHEMA),
  })
  .strict()
  .superRefine((value, ctx) => {
    try {
      validateStateFingerprint(value.state_fingerprint);
    } catch (error) {
      ctx.addIssue({
        code: "custom",
        path: ["state_fingerprint", "digest"],
        message: error instanceof Error ? error.message : "State fingerprint is invalid.",
      });
    }
    if (value.state_fingerprint.task_id !== value.task.id) {
      ctx.addIssue({
        code: "custom",
        path: ["state_fingerprint", "task_id"],
        message: "State fingerprint task_id must match work-order task.id.",
      });
    }
    if (value.state_fingerprint.task_revision !== value.task.revision) {
      ctx.addIssue({
        code: "custom",
        path: ["state_fingerprint", "task_revision"],
        message: "State fingerprint task_revision must match work-order task.revision.",
      });
    }

    addDuplicateIdIssue(
      ctx,
      ["task", "acceptance_criteria"],
      value.task.acceptance_criteria,
      "Acceptance criterion",
    );
    addDuplicateIdIssue(
      ctx,
      ["task", "unresolved_questions"],
      value.task.unresolved_questions,
      "Question",
    );
    addDuplicateIdIssue(ctx, ["required_inputs"], value.required_inputs, "Required input");
    addDuplicateIdIssue(ctx, ["required_outputs"], value.required_outputs, "Required output");
    addDuplicateIdIssue(
      ctx,
      ["verification_intent", "requirements"],
      value.verification_intent.requirements,
      "Verification requirement",
    );

    const declaredKnowledge = new Map(
      value.knowledge_refs.map((knowledgeRef) => [knowledgeIdentity(knowledgeRef), knowledgeRef]),
    );
    if (declaredKnowledge.size !== value.knowledge_refs.length) {
      ctx.addIssue({
        code: "custom",
        path: ["knowledge_refs"],
        message: "Knowledge references must be unique by ref and digest.",
      });
    }
    const preparedByIdentity = new Map<string, (typeof value.prepared_evidence)[number][]>();
    for (const prepared of value.prepared_evidence) {
      const identity = knowledgeIdentity(prepared.excerpt.knowledge_ref);
      if (!declaredKnowledge.has(identity)) {
        ctx.addIssue({
          code: "custom",
          path: ["prepared_evidence"],
          message: "Prepared evidence must reference a declared KnowledgeRef with the same digest.",
        });
      }
      const assignments = preparedByIdentity.get(identity) ?? [];
      assignments.push(prepared);
      preparedByIdentity.set(identity, assignments);
    }
    for (const [identity] of declaredKnowledge) {
      if (!preparedByIdentity.has(identity)) {
        ctx.addIssue({
          code: "custom",
          path: ["prepared_evidence"],
          message:
            "Every declared KnowledgeRef requires an included, omitted, or stale prepared-evidence receipt.",
        });
      }
    }

    const declaredDigests = new Set(
      value.knowledge_refs.map((knowledgeRef) => knowledgeRef.digest),
    );
    for (const digest of value.context_intent.required_knowledge_ref_digests) {
      if (!declaredDigests.has(digest)) {
        ctx.addIssue({
          code: "custom",
          path: ["context_intent", "required_knowledge_ref_digests"],
          message: "Required knowledge digest must be declared by knowledge_refs.",
        });
        continue;
      }
      const preparedForRole = value.prepared_evidence.filter(
        (prepared) =>
          prepared.role === value.role &&
          prepared.excerpt.knowledge_ref.digest === digest &&
          prepared.excerpt.status === "included",
      );
      if (preparedForRole.length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["prepared_evidence"],
          message:
            "Required knowledge must have an included prepared-evidence receipt for the work-order role.",
        });
      }
    }
    if (
      value.context_intent.require_prepared_evidence &&
      !value.prepared_evidence.some(
        (prepared) => prepared.role === value.role && prepared.excerpt.status === "included",
      )
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["prepared_evidence"],
        message: "Context intent requires included prepared evidence for the work-order role.",
      });
    }
    if (value.role === "EXECUTOR" && value.authority.external_side_effects.length > 0) {
      ctx.addIssue({
        code: "custom",
        path: ["authority", "external_side_effects"],
        message: "EXECUTOR work orders cannot delegate external side effects.",
      });
    }
    if (
      !value.required_outputs.some((output) => output.kind === "semantic_result" && output.required)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["required_outputs"],
        message: "A work order must require an agent semantic result output.",
      });
    }
  });

export type AgentWorkOrderV2 = z.infer<typeof AGENT_WORK_ORDER_V2_ZOD_SCHEMA>;
export type AgentWorkOrderRole = (typeof AGENT_WORK_ORDER_ROLE_VALUES)[number];
export type AgentWorkOrderAuthority = z.infer<typeof AGENT_WORK_ORDER_AUTHORITY_ZOD_SCHEMA>;
export type AgentWorkOrderContextIntent = z.infer<
  typeof AGENT_WORK_ORDER_CONTEXT_INTENT_ZOD_SCHEMA
>;
export type AgentWorkOrderPreparedEvidence = z.infer<
  typeof AGENT_WORK_ORDER_PREPARED_EVIDENCE_ZOD_SCHEMA
>;
export type AgentWorkOrderArtifactRef = z.infer<typeof ARTIFACT_REF_ZOD_SCHEMA>;
export type AgentWorkOrderArtifactContract = z.infer<typeof ARTIFACT_CONTRACT_ZOD_SCHEMA>;
export type AgentWorkOrderVerificationIntent = z.infer<typeof VERIFICATION_INTENT_ZOD_SCHEMA>;

export type AgentWorkOrderPreparationDiagnostic =
  | {
      code: "invalid_work_order";
      message: string;
    }
  | {
      code: "state_fingerprint_stale" | "state_fingerprint_blocked";
      message: string;
      precondition: StateFingerprintPreconditionDiagnostic;
    };

export class AgentWorkOrderPreparationError extends Error {
  readonly diagnostic: AgentWorkOrderPreparationDiagnostic;

  constructor(diagnostic: AgentWorkOrderPreparationDiagnostic) {
    super(diagnostic.message);
    this.name = "AgentWorkOrderPreparationError";
    this.diagnostic = diagnostic;
  }
}

const GENERATED_AGENT_WORK_ORDER_V2_SCHEMA = buildJsonSchemaDocument(
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  {
    $id: "https://agentplane.org/schemas/agent-work-order-v2.schema.json",
    title: "AgentWorkOrder (v2)",
    description:
      "Versioned CLI-prepared work order for one semantic agent episode. Lifecycle commands and supervisor-owned observations are intentionally excluded.",
  },
);

export function listAgentWorkOrderV2SchemaErrors(value: unknown): string[] {
  return schemaErrors("AgentWorkOrder v2", AGENT_WORK_ORDER_V2_ZOD_SCHEMA, value);
}

export function validateAgentWorkOrderV2(value: unknown): AgentWorkOrderV2 {
  return assertValid("AgentWorkOrder v2", AGENT_WORK_ORDER_V2_ZOD_SCHEMA, value);
}

export function assertAgentWorkOrderReadyForInvocation(opts: {
  work_order: unknown;
  current_state_fingerprint: StateFingerprint;
}): {
  work_order: AgentWorkOrderV2;
  precondition: StateFingerprintPreconditionDiagnostic;
} {
  let workOrder: AgentWorkOrderV2;
  try {
    workOrder = validateAgentWorkOrderV2(opts.work_order);
  } catch (error) {
    throw new AgentWorkOrderPreparationError({
      code: "invalid_work_order",
      message: error instanceof Error ? error.message : "AgentWorkOrder validation failed.",
    });
  }
  const precondition = evaluateStateFingerprintPrecondition({
    expected: workOrder.state_fingerprint,
    current: opts.current_state_fingerprint,
    policy: workOrder.state_fingerprint_policy,
  });
  if (precondition.status === "stale") {
    throw new AgentWorkOrderPreparationError({
      code: "state_fingerprint_stale",
      message: "AgentWorkOrder is stale and cannot be invoked.",
      precondition,
    });
  }
  if (precondition.status === "blocked") {
    throw new AgentWorkOrderPreparationError({
      code: "state_fingerprint_blocked",
      message: "AgentWorkOrder state cannot satisfy the required precondition.",
      precondition,
    });
  }
  return { work_order: workOrder, precondition };
}

export function validateAgentSemanticResultForWorkOrder(opts: {
  work_order: unknown;
  semantic_result: unknown;
}): AgentSemanticResult {
  const workOrder = validateAgentWorkOrderV2(opts.work_order);
  const semanticResult = AGENT_SEMANTIC_RESULT_ZOD_SCHEMA.parse(opts.semantic_result);
  if (semanticResult.work_order_id !== workOrder.work_order_id) {
    throw new Error("Agent semantic result work_order_id must match the prepared AgentWorkOrder.");
  }
  return semanticResult;
}

export function renderAgentWorkOrderV2SchemaJson(): string {
  return `${JSON.stringify(GENERATED_AGENT_WORK_ORDER_V2_SCHEMA, null, 2)}\n`;
}
