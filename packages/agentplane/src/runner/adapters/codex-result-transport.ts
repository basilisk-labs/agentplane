import {
  AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES,
  AGENT_SEMANTIC_RESULT_KIND,
  AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES,
  KNOWLEDGE_REQUEST_KIND,
  KNOWLEDGE_REQUEST_SCHEMA_VERSION,
  KNOWLEDGE_REQUEST_SCOPE_VALUES,
  validateAgentSemanticResult,
  type AgentSemanticResult,
} from "@agentplaneorg/core/schemas";
import { atomicWriteFile } from "@agentplaneorg/core/fs";
import path from "node:path";

import { isRecord } from "../../shared/guards.js";

export const CODEX_RESULT_TRANSPORT = "supervisor_jsonl_event_collector" as const;
export const CODEX_RESULT_TRANSPORT_ENV = "AGENTPLANE_RUNNER_RESULT_TRANSPORT";
const CODEX_RESULT_OUTPUT_SCHEMA_FILENAME = "codex-semantic-output.schema.json";
const MAX_CODEX_AGENT_MESSAGE_BYTES = 16 * 1024 * 1024;

const NON_EMPTY_STRING_SCHEMA = {
  type: "string",
  minLength: 1,
} as const;

const NULLABLE_NON_EMPTY_STRING_SCHEMA = {
  type: ["string", "null"],
  minLength: 1,
} as const;

const CODEX_RESULT_OUTPUT_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Codex AgentSemanticResult transport",
  description:
    "Strict structured-output transport normalized by the AgentPlane supervisor into AgentSemanticResult v2.",
  type: "object",
  additionalProperties: false,
  properties: {
    schema_version: {
      type: "integer",
      enum: [AGENT_SEMANTIC_RESULT_SCHEMA_VERSION],
    },
    kind: {
      type: "string",
      enum: [AGENT_SEMANTIC_RESULT_KIND],
    },
    work_order_id: NON_EMPTY_STRING_SCHEMA,
    status: {
      type: "string",
      enum: AGENT_SEMANTIC_RESULT_STATUS_VALUES,
    },
    summary: NON_EMPTY_STRING_SCHEMA,
    findings: {
      type: "array",
      items: { type: "string" },
    },
    uncertainty: {
      type: "array",
      items: { type: "string" },
    },
    claimed_checks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          check: NON_EMPTY_STRING_SCHEMA,
          claimed_status: {
            type: "string",
            enum: AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES,
          },
          details: NULLABLE_NON_EMPTY_STRING_SCHEMA,
        },
        required: ["check", "claimed_status", "details"],
      },
    },
    blocker: {
      type: ["object", "null"],
      additionalProperties: false,
      properties: {
        summary: NON_EMPTY_STRING_SCHEMA,
        recommended_action: NULLABLE_NON_EMPTY_STRING_SCHEMA,
      },
      required: ["summary", "recommended_action"],
    },
    knowledge_request: {
      type: ["object", "null"],
      additionalProperties: false,
      properties: {
        schema_version: {
          type: "integer",
          enum: [KNOWLEDGE_REQUEST_SCHEMA_VERSION],
        },
        kind: {
          type: "string",
          enum: [KNOWLEDGE_REQUEST_KIND],
        },
        query: NON_EMPTY_STRING_SCHEMA,
        reason: NON_EMPTY_STRING_SCHEMA,
        desired_kind: {
          type: "string",
          enum: KNOWLEDGE_REQUEST_DESIRED_KIND_VALUES,
        },
        scope: {
          type: "string",
          enum: KNOWLEDGE_REQUEST_SCOPE_VALUES,
        },
        blocking: { type: "boolean" },
      },
      required: ["schema_version", "kind", "query", "reason", "desired_kind", "scope", "blocking"],
    },
  },
  required: [
    "schema_version",
    "kind",
    "work_order_id",
    "status",
    "summary",
    "findings",
    "uncertainty",
    "claimed_checks",
    "blocker",
    "knowledge_request",
  ],
} as const;

const CODEX_RESULT_TRANSPORT_KEYS = [
  "schema_version",
  "kind",
  "work_order_id",
  "status",
  "summary",
  "findings",
  "uncertainty",
  "claimed_checks",
  "blocker",
  "knowledge_request",
] as const;
const CODEX_CLAIMED_CHECK_TRANSPORT_KEYS = ["check", "claimed_status", "details"] as const;
const CODEX_BLOCKER_TRANSPORT_KEYS = ["summary", "recommended_action"] as const;
const CODEX_KNOWLEDGE_REQUEST_TRANSPORT_KEYS = [
  "schema_version",
  "kind",
  "query",
  "reason",
  "desired_kind",
  "scope",
  "blocking",
] as const;

function assertExactKeys(
  value: Record<string, unknown>,
  expectedKeys: readonly string[],
  field: string,
): void {
  const expected = new Set(expectedKeys);
  const actual = Object.keys(value);
  const missing = expectedKeys.filter((key) => !Object.hasOwn(value, key));
  const unexpected = actual.filter((key) => !expected.has(key));
  if (missing.length === 0 && unexpected.length === 0) return;
  const details = [
    ...(missing.length > 0 ? [`missing fields: ${missing.join(", ")}`] : []),
    ...(unexpected.length > 0 ? [`unexpected fields: ${unexpected.join(", ")}`] : []),
  ].join("; ");
  throw new Error(
    `Codex structured semantic output ${field} must contain exactly the supervised transport fields (${details}).`,
  );
}

function nullableRecord(
  value: unknown,
  field: string,
  expectedKeys: readonly string[],
): Record<string, unknown> | null {
  if (value === null) return null;
  if (!isRecord(value)) {
    throw new Error(`Codex structured semantic output ${field} must be an object or null.`);
  }
  assertExactKeys(value, expectedKeys, field);
  return value;
}

function normalizeNullableNonEmptyString(value: unknown, field: string): string | undefined {
  if (value === null) return undefined;
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      `Codex structured semantic output ${field} must be a non-empty string or null.`,
    );
  }
  return value;
}

function normalizeClaimedChecks(value: unknown): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error("Codex structured semantic output claimed_checks must be an array.");
  }
  return value.map((entry) => {
    if (!isRecord(entry)) {
      throw new Error("Codex structured semantic output claimed_checks entries must be objects.");
    }
    assertExactKeys(entry, CODEX_CLAIMED_CHECK_TRANSPORT_KEYS, "claimed_checks entry");
    const details = normalizeNullableNonEmptyString(entry.details, "claimed_checks entry details");
    return {
      check: entry.check,
      claimed_status: entry.claimed_status,
      ...(details ? { details } : {}),
    };
  });
}

export function resolveCodexResultTransportPaths(runDir: string): {
  schema_path: string;
} {
  return {
    schema_path: path.join(runDir, CODEX_RESULT_OUTPUT_SCHEMA_FILENAME),
  };
}

export function renderCodexResultOutputSchemaJson(): string {
  return `${JSON.stringify(CODEX_RESULT_OUTPUT_SCHEMA, null, 2)}\n`;
}

function readCodexAgentMessage(providerEvent: Record<string, unknown>): string | null {
  if (providerEvent.type !== "item.completed" || !isRecord(providerEvent.item)) return null;
  if (providerEvent.item.type !== "agent_message") return null;
  return typeof providerEvent.item.text === "string"
    ? providerEvent.item.text
    : typeof providerEvent.item.content === "string"
      ? providerEvent.item.content
      : null;
}

export type CodexResultEventCollector = {
  observeStdoutLine(rawLine: string): void;
  readLastAgentMessage(): string | null;
  readUsage(): CodexProviderUsage | null;
};

export type CodexProviderUsage = {
  input_tokens: number;
  output_tokens: number;
  total_tokens: number;
};

// Provider usage is process-local supervisor evidence. It deliberately stays
// outside RunnerResult, receipts, and task projections so existing machine
// contracts do not start retaining a provider-specific telemetry field.
const CODEX_PROVIDER_USAGE_BY_RESULT = new WeakMap<object, CodexProviderUsage>();

export function recordCodexProviderUsageForResult(result: object, usage: CodexProviderUsage): void {
  CODEX_PROVIDER_USAGE_BY_RESULT.set(result, usage);
}

export function readCodexProviderUsageForResult(result: object): CodexProviderUsage | null {
  return CODEX_PROVIDER_USAGE_BY_RESULT.get(result) ?? null;
}

function nonNegativeInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

/**
 * Codex reports visible and reasoning output separately.  The supervisor
 * charges both to output and total so a reasoning-only turn cannot evade a
 * run budget. `total_tokens`, when the provider includes it, may be larger
 * (for example when it includes a cached component), but never smaller.
 */
function readCodexProviderUsage(providerEvent: Record<string, unknown>): CodexProviderUsage | null {
  if (providerEvent.type !== "turn.completed") return null;
  if (!isRecord(providerEvent.usage)) return null;
  const input = nonNegativeInteger(providerEvent.usage.input_tokens);
  const output = nonNegativeInteger(providerEvent.usage.output_tokens);
  const reasoning = nonNegativeInteger(providerEvent.usage.reasoning_output_tokens);
  if (input === null || output === null || reasoning === null) {
    throw new Error("Codex turn completion contains malformed provider usage.");
  }
  const chargedOutput = output + reasoning;
  const minimumTotal = input + chargedOutput;
  const reportedTotal =
    providerEvent.usage.total_tokens === undefined
      ? null
      : nonNegativeInteger(providerEvent.usage.total_tokens);
  if (providerEvent.usage.total_tokens !== undefined && reportedTotal === null) {
    throw new Error("Codex turn completion contains malformed total token usage.");
  }
  if (reportedTotal !== null && reportedTotal < minimumTotal) {
    throw new Error("Codex turn completion total token usage is lower than its components.");
  }
  return {
    input_tokens: input,
    output_tokens: chargedOutput,
    total_tokens: reportedTotal ?? minimumTotal,
  };
}

/**
 * Collects the semantic transport from the raw provider JSONL stream before
 * trace redaction or retention. The collector intentionally retains only the
 * latest agent message and protocol state, never the full provider stream.
 */
export function createCodexResultEventCollector(): CodexResultEventCollector {
  let lastMessage: string | null = null;
  let usage: CodexProviderUsage | null = null;
  let turnCompleted = false;
  let protocolError: Error | null = null;
  return {
    observeStdoutLine(rawLine) {
      const trimmed = rawLine.trim();
      if (!trimmed || protocolError) return;
      let parsed: unknown;
      try {
        parsed = JSON.parse(trimmed) as unknown;
      } catch {
        return;
      }
      if (!isRecord(parsed)) return;
      if (parsed.type === "turn.completed") {
        if (turnCompleted) {
          protocolError = new Error("Codex JSONL stream contained duplicate turn completion.");
          return;
        }
        try {
          usage = readCodexProviderUsage(parsed);
          turnCompleted = true;
        } catch (error) {
          protocolError = error instanceof Error ? error : new Error(String(error));
        }
        return;
      }
      const message = readCodexAgentMessage(parsed);
      if (message === null) return;
      if (turnCompleted) {
        protocolError = new Error("Codex agent message appeared after turn completion.");
        return;
      }
      if (Buffer.byteLength(message, "utf8") > MAX_CODEX_AGENT_MESSAGE_BYTES) {
        protocolError = new Error(
          `Codex agent message exceeds the ${MAX_CODEX_AGENT_MESSAGE_BYTES}-byte transport limit.`,
        );
        return;
      }
      lastMessage = message;
    },
    readLastAgentMessage() {
      if (protocolError) throw protocolError;
      if (!turnCompleted) {
        throw new Error("Codex JSONL stream ended before turn completion.");
      }
      return lastMessage;
    },
    readUsage() {
      if (protocolError) throw protocolError;
      if (!turnCompleted) {
        throw new Error("Codex JSONL stream ended before turn completion.");
      }
      return usage;
    },
  };
}

export async function materializeCodexResultTransport(opts: {
  raw_text: string | null;
  result_path: string;
  work_order_id: string;
}): Promise<AgentSemanticResult> {
  if (opts.raw_text === null) {
    throw new Error("Codex JSONL event stream did not contain a structured agent message.");
  }
  const raw = JSON.parse(opts.raw_text) as unknown;
  if (!isRecord(raw)) {
    throw new Error("Codex structured semantic output must contain a JSON object.");
  }
  assertExactKeys(raw, CODEX_RESULT_TRANSPORT_KEYS, "root");
  const blocker = nullableRecord(raw.blocker, "blocker", CODEX_BLOCKER_TRANSPORT_KEYS);
  const knowledgeRequest = nullableRecord(
    raw.knowledge_request,
    "knowledge_request",
    CODEX_KNOWLEDGE_REQUEST_TRANSPORT_KEYS,
  );
  const blockerRecommendedAction = blocker
    ? normalizeNullableNonEmptyString(blocker.recommended_action, "blocker recommended_action")
    : undefined;
  const normalized = validateAgentSemanticResult({
    schema_version: raw.schema_version,
    kind: raw.kind,
    work_order_id: raw.work_order_id,
    status: raw.status,
    summary: raw.summary,
    findings: raw.findings,
    uncertainty: raw.uncertainty,
    claimed_checks: normalizeClaimedChecks(raw.claimed_checks),
    ...(blocker
      ? {
          blocker: {
            summary: blocker.summary,
            ...(blockerRecommendedAction ? { recommended_action: blockerRecommendedAction } : {}),
          },
        }
      : {}),
    ...(knowledgeRequest
      ? {
          knowledge_request: {
            schema_version: knowledgeRequest.schema_version,
            kind: knowledgeRequest.kind,
            query: knowledgeRequest.query,
            reason: knowledgeRequest.reason,
            desired_kind: knowledgeRequest.desired_kind,
            scope: knowledgeRequest.scope,
            blocking: knowledgeRequest.blocking,
          },
        }
      : {}),
  });
  if (normalized.work_order_id !== opts.work_order_id) {
    throw new Error(
      `Codex structured semantic output work_order_id mismatch (${JSON.stringify(normalized.work_order_id)} != ${JSON.stringify(opts.work_order_id)}).`,
    );
  }
  await atomicWriteFile(opts.result_path, `${JSON.stringify(normalized, null, 2)}\n`, "utf8");
  return normalized;
}
