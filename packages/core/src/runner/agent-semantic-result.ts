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

export const AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE = {
  schema_version: AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
  kind: AGENT_SEMANTIC_RESULT_KIND,
  work_order_id: "work-order-example-001",
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
} as const satisfies AgentSemanticResult;

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

export function renderAgentSemanticResultV2ValidFixtureJson(): string {
  return `${JSON.stringify(AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE, null, 2)}\n`;
}

export function renderRunnerResultManifestV1LegacyFixtureJson(): string {
  return `${JSON.stringify(RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE, null, 2)}\n`;
}
