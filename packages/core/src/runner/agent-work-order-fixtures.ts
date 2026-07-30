import { createHash } from "node:crypto";

import { KNOWLEDGE_REF_SCHEMA_VERSION } from "./knowledge-ref.js";
import { buildStateFingerprint, type StateFingerprint } from "./state-fingerprint.js";
import {
  AGENT_WORK_ORDER_KIND,
  AGENT_WORK_ORDER_SCHEMA_VERSION,
  AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
  validateAgentWorkOrderV2,
  type AgentWorkOrderV2,
} from "./agent-work-order.js";

function sha256(value: string): string {
  return `sha256:${createHash("sha256").update(value, "utf8").digest("hex")}`;
}

function buildFixtureFingerprint(): StateFingerprint {
  return buildStateFingerprint({
    task_id: "task-example-001",
    task_revision: 7,
    git_head: "0123456789abcdef0123456789abcdef01234567",
    worktree: "/workspace/agentplane",
    components: {
      task: { state: "present", source: "fixture", value: { revision: 7 } },
      git: { state: "present", source: "fixture", value: { head: "0123456789abcdef" } },
      backend_projection: { state: "present", source: "fixture", value: { revision: 7 } },
      policy: { state: "present", source: "fixture", value: { digest: "policy-v2" } },
      blueprint: { state: "present", source: "fixture", value: { digest: "blueprint-v2" } },
      knowledge: { state: "present", source: "fixture", value: { digest: "knowledge-v1" } },
      provider: { state: "missing", source: "fixture", reason_code: "not_requested" },
      authority: { state: "present", source: "fixture", value: { role: "EXECUTOR" } },
    },
  });
}

export function buildAgentWorkOrderV2ValidFixture(): AgentWorkOrderV2 {
  const knowledgeContent = "The executor changes only files inside the approved task worktree.";
  const knowledgeRef = {
    schema_version: KNOWLEDGE_REF_SCHEMA_VERSION,
    ref: "context/wiki/architecture.md#section=execution-boundary",
    digest: `sha256:${"1".repeat(64)}`,
    kind: "wiki",
    reason: "The executor needs the canonical execution-boundary decision.",
    retrieval: "exact",
    required: true,
    score: 1,
  } as const;
  const fingerprint = buildFixtureFingerprint();
  return validateAgentWorkOrderV2({
    schema_version: AGENT_WORK_ORDER_SCHEMA_VERSION,
    kind: AGENT_WORK_ORDER_KIND,
    work_order_id: "work-order-example-001",
    role: "EXECUTOR",
    task: {
      id: "task-example-001",
      revision: 7,
      objective: "Publish one bounded schema change with observed verification evidence.",
      acceptance_criteria: [
        {
          id: "schema-generated",
          description: "The canonical Zod model generates the public schema and fixture.",
          required: true,
        },
      ],
      unresolved_questions: [],
    },
    state_fingerprint: fingerprint,
    state_fingerprint_policy: {
      required_components: [
        "task",
        "git",
        "backend_projection",
        "policy",
        "blueprint",
        "knowledge",
        "authority",
      ],
      provider: { required: false, unavailable: "allow_if_unchanged" },
    },
    authority: {
      mutation_scope: "task",
      writable_roots: ["packages/core", "schemas"],
      protected_paths: [".agentplane/tasks.json"],
      allowed_tool_classes: [
        "repository_read",
        "workspace_write",
        "git_read",
        "run_checks",
        "knowledge_read",
        "knowledge_request",
        "report_result",
        "report_blocker",
      ],
      network: "deny",
      external_side_effects: [],
      sandbox: "workspace-write",
      expires_at: null,
    },
    context_intent: {
      purpose: "Provide the executor with the canonical execution-boundary decision.",
      required_knowledge_ref_digests: [knowledgeRef.digest],
      require_prepared_evidence: true,
    },
    knowledge_refs: [knowledgeRef],
    prepared_evidence: [
      {
        role: "EXECUTOR",
        excerpt: {
          schema_version: 1,
          kind: "prepared_knowledge_excerpt",
          knowledge_ref: knowledgeRef,
          index_freshness: {
            status: "unavailable",
            projection_version: null,
            generated_at: null,
            indexed_digest: null,
            observed_digest: knowledgeRef.digest,
          },
          status: "included",
          reason_code: "included",
          source: {
            ref: knowledgeRef.ref,
            path: "context/wiki/architecture.md",
            selector: { key: "section", value: "execution-boundary" },
            line_start: 1,
            line_end: 1,
            observed_source_digest: knowledgeRef.digest,
            content_digest: sha256(knowledgeContent),
            content_bytes: Buffer.byteLength(knowledgeContent, "utf8"),
            content_lines: 1,
          },
          limits: { max_bytes: 1024, max_lines: 8 },
          observed: {
            original_bytes: Buffer.byteLength(knowledgeContent, "utf8"),
            emitted_bytes: Buffer.byteLength(knowledgeContent, "utf8"),
            original_lines: 1,
            emitted_lines: 1,
          },
          content: knowledgeContent,
        },
      },
    ],
    required_inputs: [
      {
        id: "task-readme",
        kind: "task_document",
        description: "The approved task contract.",
        path: ".agentplane/tasks/task-example-001/README.md",
        required: true,
      },
    ],
    required_outputs: [
      {
        id: "semantic-result",
        kind: "semantic_result",
        description: "Agent-reported semantic outcome; observed facts remain supervisor-owned.",
        required: true,
      },
    ],
    verification_intent: {
      requirements: [
        {
          id: "schemas-check",
          description: "Run the schema synchronization check after the implementation change.",
          required: true,
          observed_by: "agentplane",
        },
      ],
      require_execution_receipt: true,
    },
    semantic_result_schema: AGENT_WORK_ORDER_SEMANTIC_RESULT_SCHEMA,
    stop_rules: ["Return control when required knowledge is missing or stale."],
  });
}

export const AGENT_WORK_ORDER_V2_VALID_FIXTURE = buildAgentWorkOrderV2ValidFixture();

export function renderAgentWorkOrderV2ValidFixtureJson(): string {
  return `${JSON.stringify(AGENT_WORK_ORDER_V2_VALID_FIXTURE, null, 2)}\n`;
}
