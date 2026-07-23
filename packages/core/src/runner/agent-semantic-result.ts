import { z } from "zod";

import {
  NON_EMPTY_STRING,
  assertValid,
  buildJsonSchemaDocument,
  schemaErrors,
} from "../tasks/task-artifact-schema.shared.js";

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

const AGENT_SEMANTIC_RESULT_BLOCKER_ZOD_SCHEMA = z
  .object({
    summary: NON_EMPTY_STRING,
    recommended_action: NON_EMPTY_STRING.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA = z
  .object({
    query: NON_EMPTY_STRING,
    reason: NON_EMPTY_STRING,
  })
  .strict();

const AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA = z
  .object({
    check: NON_EMPTY_STRING,
    claimed_status: z.enum(AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES),
    details: NON_EMPTY_STRING.optional(),
  })
  .strict();

const AGENT_SEMANTIC_RESULT_BASE_SHAPE = {
  schema_version: z.literal(AGENT_SEMANTIC_RESULT_SCHEMA_VERSION),
  kind: z.literal(AGENT_SEMANTIC_RESULT_KIND),
  work_order_id: NON_EMPTY_STRING,
  summary: NON_EMPTY_STRING,
  findings: z.array(z.string()),
  uncertainty: z.array(z.string()),
  claimed_checks: z.array(AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA).optional(),
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
export type AgentSemanticResultKnowledgeRequest = z.infer<
  typeof AGENT_SEMANTIC_RESULT_KNOWLEDGE_REQUEST_ZOD_SCHEMA
>;
export type AgentSemanticResultClaimedCheck = z.infer<
  typeof AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_ZOD_SCHEMA
>;

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
      },
    },
    needs_context: {
      ...base,
      status: "needs_context",
      summary: "The requested work needs one additional canonical contract.",
      findings: ["The current work order does not contain the required contract."],
      uncertainty: ["Inventing the missing contract could widen task scope."],
      knowledge_request: {
        query: "Provide the canonical contract required by this work order.",
        reason: "The runner cannot safely infer the missing semantic input.",
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
