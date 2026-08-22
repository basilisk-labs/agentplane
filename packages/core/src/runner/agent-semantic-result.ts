import { z } from "zod";

import {
  NON_EMPTY_STRING,
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "../tasks/task-artifact-schema.shared.js";
import { TASK_PLAN_PROPOSAL_ZOD_SCHEMA } from "../tasks/task-centric/schema.js";

export const AGENT_SEMANTIC_RESULT_SCHEMA_VERSION = 2 as const;
export const AGENT_SEMANTIC_RESULT_KIND = "agent_semantic_result" as const;
export const AGENT_SEMANTIC_RESULT_STATUS_VALUES = [
  "completed",
  "blocked",
  "needs_context",
  "failed",
] as const;
export const AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES = [
  "passed",
  "failed",
  "not_run",
] as const;
export const AGENT_SEMANTIC_RESULT_REVIEW_VERDICT_VALUES = [
  "pass",
  "rework",
  "blocked",
  "human_review",
] as const;
export const KNOWLEDGE_REQUEST_SCHEMA_VERSION = 1 as const;
export const KNOWLEDGE_REQUEST_KIND = "knowledge_request" as const;
export const KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES = [
  "any",
  "wiki",
  "source",
  "fact",
  "entity",
  "edge",
] as const;
export const KNOWLEDGE_REQUEST_SCOPE_VALUES = ["task_context"] as const;

const AGENT_SEMANTIC_RESULT_REPOSITORY_EFFECT_ZOD_SCHEMA = z.enum([
  "repository_write",
  "documentation",
  "source_code",
  "tests",
  "public_api",
  "schema",
  "dependencies",
  "ci",
  "release_metadata",
  "security_boundary",
]);

const SCOPE_EXTENSION_REQUEST_BASE = {
  schema_version: z.literal(1),
  rationale: NON_EMPTY_STRING,
} as const;

const AGENT_SEMANTIC_RESULT_SCOPE_EXTENSION_REQUEST_ZOD_SCHEMA = z.union([
  z
    .object({
      ...SCOPE_EXTENSION_REQUEST_BASE,
      scope_roots: z.array(NON_EMPTY_STRING).min(1),
      repository_effects: z.array(AGENT_SEMANTIC_RESULT_REPOSITORY_EFFECT_ZOD_SCHEMA),
    })
    .strict(),
  z
    .object({
      ...SCOPE_EXTENSION_REQUEST_BASE,
      scope_roots: z.array(NON_EMPTY_STRING),
      repository_effects: z.array(AGENT_SEMANTIC_RESULT_REPOSITORY_EFFECT_ZOD_SCHEMA).min(1),
    })
    .strict(),
]);

const AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA = z
  .object({
    summary: NON_EMPTY_STRING,
    recommended_action: NON_EMPTY_STRING.optional(),
    scope_extension_request: AGENT_SEMANTIC_RESULT_SCOPE_EXTENSION_REQUEST_ZOD_SCHEMA.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(KNOWLEDGE_REQUEST_SCHEMA_VERSION),
    kind: z.literal(KNOWLEDGE_REQUEST_KIND),
    query: NON_EMPTY_STRING,
    reason: NON_EMPTY_STRING,
    desired_kind: z.enum(KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES),
    scope: z.enum(KNOWLEDGE_REQUEST_SCOPE_VALUES),
    blocking: z.boolean(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA = z
  .object({
    check: NON_EMPTY_STRING,
    claimed_status: z.enum(AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES),
    details: NON_EMPTY_STRING.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_REVIEW_ZOD_SCHEMA = z
  .object({
    verdict: z.enum(AGENT_SEMANTIC_RESULT_REVIEW_VERDICT_VALUES),
    missing_tests: z.array(z.string()),
    hidden_assumptions: z.array(z.string()),
    residual_risks: z.array(z.string()),
    recovery_context: NON_EMPTY_STRING.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_EXTERNAL_EFFECT_ZOD_SCHEMA = z.enum([
  "network_read",
  "external_write",
  "credentials",
  "publish",
  "deploy",
  "destructive_git",
]);
const AGENT_SEMANTIC_RESULT_REVERSIBILITY_ZOD_SCHEMA = z.enum([
  "reversible",
  "recovery_required",
  "irreversible",
]);
const AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_BASE = {
  preferred_mode: z.enum(["direct", "branch_pr"]),
  scope_roots: z.array(NON_EMPTY_STRING),
  repository_effects: z.array(AGENT_SEMANTIC_RESULT_REPOSITORY_EFFECT_ZOD_SCHEMA),
  external_effects: z.array(AGENT_SEMANTIC_RESULT_EXTERNAL_EFFECT_ZOD_SCHEMA),
  reversibility: AGENT_SEMANTIC_RESULT_REVERSIBILITY_ZOD_SCHEMA,
  rationale: z.array(NON_EMPTY_STRING).min(1),
} as const;

const AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_V1_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(1),
    ...AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_BASE,
    uncertainty: z.enum(["bounded", "material"]),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_V2_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(2),
    ...AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_BASE,
    requirements_uncertainty: z.enum(["bounded", "material"]),
    implementation_uncertainty: z.enum(["bounded", "material"]),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_ZOD_SCHEMA = z.union([
  AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_V2_ZOD_SCHEMA,
  AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_V1_ZOD_SCHEMA,
]);

const AGENT_SEMANTIC_RESULT_TASK_INTENT_ZOD_SCHEMA = z
  .object({
    task_kind: z.enum(["analysis", "content", "docs", "code", "release", "ops", "context"]),
    mutation_scope: z.enum(["none", "docs", "code", "release", "ops", "context"]),
    risk_flags: z.array(
      z.enum([
        "network",
        "credentials",
        "deploy",
        "publish",
        "merge",
        "security",
        "external_system",
      ]),
    ),
    tags: z.array(NON_EMPTY_STRING).min(1),
    blueprint_request: z
      .enum([
        "analysis.light",
        "content.light",
        "docs.change",
        "code.direct",
        "code.branch_pr",
        "performance.benchmark",
        "quality.regression",
        "context.assimilation",
        "context.maximum_assimilation",
        "post_run.improvement_review",
        "release.strict",
        "ops.approval",
      ])
      .optional(),
    execution: AGENT_SEMANTIC_RESULT_EXECUTION_DECLARATION_ZOD_SCHEMA.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_PLAN_REFINEMENT_ZOD_SCHEMA = z
  .object({
    description: NON_EMPTY_STRING,
    scope_roots_added: z.array(NON_EMPTY_STRING),
    outputs_added: z.array(NON_EMPTY_STRING),
    acceptance_changed: z.boolean(),
    risk_changed: z.boolean(),
    external_effects_added: z.array(NON_EMPTY_STRING),
    dependencies_changed: z.boolean(),
    architecture_constraints_changed: z.boolean(),
    operations: z.array(z.enum(["split", "reorder", "add_test", "clarify"])),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_BASE_SHAPE = {
  schema_version: z.literal(AGENT_SEMANTIC_RESULT_SCHEMA_VERSION),
  kind: z.literal(AGENT_SEMANTIC_RESULT_KIND),
  work_order_id: NON_EMPTY_STRING,
  summary: NON_EMPTY_STRING,
  findings: z.array(z.string()),
  uncertainty: z.array(z.string()),
  task_intent: AGENT_SEMANTIC_RESULT_TASK_INTENT_ZOD_SCHEMA.optional(),
  task_plan_proposal: TASK_PLAN_PROPOSAL_ZOD_SCHEMA.optional(),
  plan_refinement: AGENT_SEMANTIC_RESULT_PLAN_REFINEMENT_ZOD_SCHEMA.optional(),
  claimed_checks: z.array(AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA).optional(),
  review: AGENT_SEMANTIC_RESULT_REVIEW_ZOD_SCHEMA.optional(),
} as const;

export const AGENT_SEMANTIC_RESULT_ZOD_SCHEMA = z.discriminatedUnion("status", [
  z
    .object({
      ...AGENT_SEMANTIC_RESULT_BASE_SHAPE,
      status: z.literal("blocked"),
      blocker: AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA,
      knowledge_request: AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA.optional(),
    })
    .strict(),
  z
    .object({
      ...AGENT_SEMANTIC_RESULT_BASE_SHAPE,
      status: z.literal("needs_context"),
      blocker: AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA.optional(),
      knowledge_request: AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA,
    })
    .strict(),
  z
    .object({
      ...AGENT_SEMANTIC_RESULT_BASE_SHAPE,
      status: z.enum(["completed", "failed"]),
      blocker: AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA.optional(),
      knowledge_request: AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA.optional(),
    })
    .strict(),
]);

export type AgentSemanticResult = z.infer<typeof AGENT_SEMANTIC_RESULT_ZOD_SCHEMA>;
export type AgentSemanticResultStatus = (typeof AGENT_SEMANTIC_RESULT_STATUS_VALUES)[number];
export type AgentSemanticResultBlocker = z.infer<typeof AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA>;
export type AgentSemanticResultScopeExtensionRequest = z.infer<
  typeof AGENT_SEMANTIC_RESULT_SCOPE_EXTENSION_REQUEST_ZOD_SCHEMA
>;
export type AgentSemanticResultKnowledgeRequest = z.infer<
  typeof AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA
>;
export type AgentSemanticResultClaimedCheck = z.infer<
  typeof AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA
>;
export type AgentSemanticResultTaskIntent = z.infer<
  typeof AGENT_SEMANTIC_RESULT_TASK_INTENT_ZOD_SCHEMA
>;
export type AgentSemanticResultTaskPlanProposal = z.infer<typeof TASK_PLAN_PROPOSAL_ZOD_SCHEMA>;
export type AgentSemanticResultReview = z.infer<typeof AGENT_SEMANTIC_RESULT_REVIEW_ZOD_SCHEMA>;

const AGENT_SEMANTIC_RESULT_SCHEMA = buildJsonSchemaDocument(AGENT_SEMANTIC_RESULT_ZOD_SCHEMA, {
  $id: "https://agentplane.org/schemas/agent-semantic-result.schema.json",
  title: "Agent semantic result (v2)",
  description:
    "Agent-writable semantic output. Process, Git, filesystem, artifact, and observed check facts are intentionally excluded and remain supervisor-owned.",
});

export function buildAgentSemanticResultV2ValidFixtures(
  workOrderId: string,
): Readonly<Record<AgentSemanticResultStatus, AgentSemanticResult>> {
  if (workOrderId.trim().length === 0) {
    throw new Error("Agent semantic result fixture work_order_id must be a non-empty string.");
  }
  const base = {
    schema_version: AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
    kind: AGENT_SEMANTIC_RESULT_KIND,
    work_order_id: workOrderId,
  } as const;
  return {
    completed: {
      ...base,
      status: "completed",
      summary: "Implemented the requested semantic change.",
      findings: ["The compatibility reader still needs to preserve legacy claims."],
      uncertainty: [],
      claimed_checks: [
        {
          check: "bun run schemas:check",
          claimed_status: "passed",
          details: "The agent reports that the schema check passed.",
        },
      ],
    },
    blocked: {
      ...base,
      status: "blocked",
      summary: "The requested work cannot continue within the current authority.",
      findings: ["The required provider action is outside the delegated runner scope."],
      uncertainty: [],
      blocker: {
        summary: "The runner needs a provider action from the parent workflow.",
        recommended_action: "Return control to the parent workflow for the provider action.",
        scope_extension_request: {
          schema_version: 1,
          scope_roots: ["website/static/img/social"],
          repository_effects: ["documentation"],
          rationale: "The generated release image is outside the current writable roots.",
        },
      },
    },
    needs_context: {
      ...base,
      status: "needs_context",
      summary: "The requested work needs one additional canonical contract.",
      findings: ["The current work order does not contain the required contract."],
      uncertainty: ["Inventing the missing contract could widen task scope."],
      knowledge_request: {
        schema_version: KNOWLEDGE_REQUEST_SCHEMA_VERSION,
        kind: KNOWLEDGE_REQUEST_KIND,
        query: "Provide the canonical contract required by this work order.",
        reason: "The runner cannot safely infer the missing semantic input.",
        desired_kind: "any",
        scope: "task_context",
        blocking: true,
      },
    },
    failed: {
      ...base,
      status: "failed",
      summary: "The semantic implementation attempt did not satisfy the requested outcome.",
      findings: ["The attempted change did not meet the work-order acceptance criteria."],
      uncertainty: [],
      claimed_checks: [
        {
          check: "task-specific verification",
          claimed_status: "failed",
          details: "The agent reports that task-specific verification failed.",
        },
      ],
    },
  };
}

export const AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES =
  buildAgentSemanticResultV2ValidFixtures("work-order-example-001");

export const AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE =
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES.completed;

export const AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES = {
  blocked_without_blocker: {
    ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES.completed,
    status: "blocked",
  },
  needs_context_without_knowledge_request: {
    ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES.completed,
    status: "needs_context",
  },
  supervisor_owned_exit_code: {
    ...AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES.completed,
    exit_code: 0,
  },
} as const;

export const RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE = {
  schema_version: 1,
  status: "success",
  exit_code: 0,
  summary: "Implemented the requested semantic change.",
  stdout_summary: "Schema check completed.",
  stderr_summary: "",
  timeout_reason: null,
  artifacts: [
    {
      path: "schemas/agent-semantic-result.schema.json",
      label: "Generated schema",
    },
  ],
  findings: ["The compatibility reader still needs to preserve legacy claims."],
  verification_hints: ["bun run schemas:check"],
  capabilities_used: ["filesystem-write"],
  metrics: {
    duration_ms: 1250,
    stdout_bytes: 96,
    stderr_bytes: 0,
    output_last_message_bytes: 64,
  },
  evidence: {
    evidence_paths: ["schemas/agent-semantic-result.schema.json"],
    changed_paths: ["packages/core/src/runner/agent-semantic-result.ts"],
    conflict_paths: [],
    files_changed_count: 1,
    tests_run: ["bun run schemas:check"],
    verification_candidates: ["bun run typecheck"],
  },
} as const;

export function listAgentSemanticResultSchemaErrors(value: unknown): string[] {
  return schemaErrors("agent semantic result", AGENT_SEMANTIC_RESULT_ZOD_SCHEMA, value);
}

export function validateAgentSemanticResult(value: unknown): AgentSemanticResult {
  return assertValid("agent semantic result", AGENT_SEMANTIC_RESULT_ZOD_SCHEMA, value);
}

export function renderAgentSemanticResultSchemaJson(): string {
  return `${JSON.stringify(AGENT_SEMANTIC_RESULT_SCHEMA, null, 2)}\n`;
}

export function renderAgentSemanticResultV2ValidFixtureJson(
  status: AgentSemanticResultStatus = "completed",
): string {
  return `${JSON.stringify(AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES[status], null, 2)}\n`;
}

export function renderRunnerResultManifestV1LegacyFixtureJson(): string {
  return `${JSON.stringify(RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE, null, 2)}\n`;
}
