import { z } from "zod";

import {
  AGENT_WORK_ORDER_ROLE_VALUES,
  AGENT_WORK_ORDER_SCHEMA_VERSION,
  AGENT_WORK_ORDER_KIND,
  validateAgentWorkOrderV2,
  type AgentWorkOrderRole,
  type AgentWorkOrderV2,
} from "./agent-work-order.js";
import { AGENT_WORK_ORDER_V2_VALID_FIXTURE } from "./agent-work-order-fixtures.js";

export const AGENT_WORK_CONTEXT_V1_KIND = "agentplane.agent_work_context" as const;
export const AGENT_WORK_CONTEXT_V1_VERSION = 1 as const;
export const AGENT_WORK_ORDER_V1_SURFACE_VALUES = ["brief", "runner", "hermes"] as const;

const LEGACY_CONTRACT_ZOD_SCHEMA = z
  .object({
    kind: z.literal(AGENT_WORK_CONTEXT_V1_KIND),
    version: z.literal(AGENT_WORK_CONTEXT_V1_VERSION),
  })
  .strict();
const LEGACY_TASK_ZOD_SCHEMA = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1).optional(),
    owner: z.string().trim().min(1).optional(),
  })
  .passthrough();
const LEGACY_EXECUTION_PACKET_ZOD_SCHEMA = z
  .object({
    recommended_role: z.string().trim().min(1).optional(),
  })
  .passthrough();

const LEGACY_BRIEF_V1_ZOD_SCHEMA = z
  .object({
    contract: LEGACY_CONTRACT_ZOD_SCHEMA,
    task: LEGACY_TASK_ZOD_SCHEMA,
    execution_packet: LEGACY_EXECUTION_PACKET_ZOD_SCHEMA.optional(),
  })
  .passthrough();
const LEGACY_RUNNER_V1_ZOD_SCHEMA = z
  .object({
    task: z
      .object({
        data: LEGACY_TASK_ZOD_SCHEMA,
      })
      .passthrough(),
    execution: LEGACY_EXECUTION_PACKET_ZOD_SCHEMA.optional(),
  })
  .passthrough();
const LEGACY_HERMES_V1_ZOD_SCHEMA = z
  .object({
    task: LEGACY_TASK_ZOD_SCHEMA,
    execution_packet: LEGACY_EXECUTION_PACKET_ZOD_SCHEMA.optional(),
  })
  .passthrough();

export type AgentWorkOrderV1Surface = (typeof AGENT_WORK_ORDER_V1_SURFACE_VALUES)[number];
export type AgentWorkContextV1Contract = z.infer<typeof LEGACY_CONTRACT_ZOD_SCHEMA>;
export type AgentWorkOrderV1OmissionReceipt = {
  field:
    | "task.revision"
    | "task.objective"
    | "task.acceptance_criteria"
    | "task.unresolved_questions"
    | "state_fingerprint"
    | "authority"
    | "context_intent"
    | "knowledge_refs"
    | "prepared_evidence"
    | "required_inputs"
    | "required_outputs"
    | "verification_intent"
    | "semantic_result_schema"
    | "stop_rules";
  reason_code: "legacy_v1_field_not_carried";
};
export type AgentWorkOrderV1CompatibilityView = {
  source_version: typeof AGENT_WORK_CONTEXT_V1_VERSION;
  source_surface: AgentWorkOrderV1Surface;
  contract: AgentWorkContextV1Contract;
  task: {
    id: string;
    title: string | null;
    owner: string | null;
  };
  role: AgentWorkOrderRole | null;
  omissions: AgentWorkOrderV1OmissionReceipt[];
};

const V1_OMISSION_FIELDS: AgentWorkOrderV1OmissionReceipt["field"][] = [
  "task.revision",
  "task.objective",
  "task.acceptance_criteria",
  "task.unresolved_questions",
  "state_fingerprint",
  "authority",
  "context_intent",
  "knowledge_refs",
  "prepared_evidence",
  "required_inputs",
  "required_outputs",
  "verification_intent",
  "semantic_result_schema",
  "stop_rules",
];

function normalizedRole(value: string | undefined): AgentWorkOrderRole | null {
  return AGENT_WORK_ORDER_ROLE_VALUES.find((role) => role === value) ?? null;
}

function compatibilityView(opts: {
  source_surface: AgentWorkOrderV1Surface;
  task: { id: string; title?: string; owner?: string };
  role?: string;
}): AgentWorkOrderV1CompatibilityView {
  return {
    source_version: AGENT_WORK_CONTEXT_V1_VERSION,
    source_surface: opts.source_surface,
    contract: {
      kind: AGENT_WORK_CONTEXT_V1_KIND,
      version: AGENT_WORK_CONTEXT_V1_VERSION,
    },
    task: {
      id: opts.task.id,
      title: opts.task.title ?? null,
      owner: opts.task.owner ?? null,
    },
    role: normalizedRole(opts.role),
    omissions: V1_OMISSION_FIELDS.map((field) => ({
      field,
      reason_code: "legacy_v1_field_not_carried",
    })),
  };
}

/**
 * Read only the v1 data the old surface actually carries. Missing v2 fields are recorded as
 * omission receipts instead of being invented by a migration helper.
 */
export function readAgentWorkOrderV1CompatibilityView(opts: {
  source_surface: AgentWorkOrderV1Surface;
  payload: unknown;
}): AgentWorkOrderV1CompatibilityView {
  switch (opts.source_surface) {
    case "brief": {
      const payload = LEGACY_BRIEF_V1_ZOD_SCHEMA.parse(opts.payload);
      return compatibilityView({
        source_surface: "brief",
        task: payload.task,
        role: payload.execution_packet?.recommended_role,
      });
    }
    case "runner": {
      const payload = LEGACY_RUNNER_V1_ZOD_SCHEMA.parse(opts.payload);
      return compatibilityView({
        source_surface: "runner",
        task: payload.task.data,
        role: payload.execution?.recommended_role ?? payload.task.data.owner,
      });
    }
    case "hermes": {
      const payload = LEGACY_HERMES_V1_ZOD_SCHEMA.parse(opts.payload);
      return compatibilityView({
        source_surface: "hermes",
        task: payload.task,
        role: payload.execution_packet?.recommended_role,
      });
    }
  }
}

export type AgentWorkOrderV2MigrationOverrides = Omit<
  AgentWorkOrderV2,
  "schema_version" | "kind" | "role" | "task"
> & {
  role: AgentWorkOrderRole;
  task: Omit<AgentWorkOrderV2["task"], "id">;
};
export type AgentWorkOrderV1MigrationResult = {
  source_version: typeof AGENT_WORK_CONTEXT_V1_VERSION;
  compatibility: AgentWorkOrderV1CompatibilityView;
  work_order: AgentWorkOrderV2;
};

/**
 * Migrate a parsed v1 view only with caller-supplied v2 facts. The v1 payload does not contain
 * authority, fingerprint, evidence, or verification intent, so accepting defaults here would
 * create false authority.
 */
export function migrateAgentWorkOrderV1ToV2(opts: {
  compatibility: AgentWorkOrderV1CompatibilityView;
  overrides: AgentWorkOrderV2MigrationOverrides;
}): AgentWorkOrderV1MigrationResult {
  if (opts.compatibility.role !== null && opts.compatibility.role !== opts.overrides.role) {
    throw new Error("Legacy work-order role must match the explicit v2 migration role.");
  }
  const workOrder = validateAgentWorkOrderV2({
    ...opts.overrides,
    schema_version: AGENT_WORK_ORDER_SCHEMA_VERSION,
    kind: AGENT_WORK_ORDER_KIND,
    role: opts.overrides.role,
    task: {
      ...opts.overrides.task,
      id: opts.compatibility.task.id,
    },
  });
  return {
    source_version: AGENT_WORK_CONTEXT_V1_VERSION,
    compatibility: opts.compatibility,
    work_order: workOrder,
  };
}

export type AgentWorkOrderCasingDiagnostic = {
  code: "casing_collision";
  path: string;
  normalized_key: string;
};

export class AgentWorkOrderCasingError extends Error {
  readonly diagnostic: AgentWorkOrderCasingDiagnostic;

  constructor(diagnostic: AgentWorkOrderCasingDiagnostic) {
    super(`AgentWorkOrder casing collision at ${diagnostic.path}: ${diagnostic.normalized_key}.`);
    this.name = "AgentWorkOrderCasingError";
    this.diagnostic = diagnostic;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function camelToSnakeKey(key: string): string {
  return key
    .replaceAll(/([a-z0-9])([A-Z])/gu, "$1_$2")
    .replaceAll(/([A-Z])([A-Z][a-z])/gu, "$1_$2")
    .toLowerCase();
}

function snakeToCamelKey(key: string): string {
  return key.replaceAll(/_([a-z0-9])/gu, (_match, character: string) => character.toUpperCase());
}

function normalizeKeysToSnakeCase(value: unknown, path: string): unknown {
  if (Array.isArray(value)) {
    return value.map((entry, index) => normalizeKeysToSnakeCase(entry, `${path}[${index}]`));
  }
  if (!isRecord(value)) return value;
  const normalized: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = camelToSnakeKey(key);
    if (Object.hasOwn(normalized, normalizedKey)) {
      throw new AgentWorkOrderCasingError({
        code: "casing_collision",
        path,
        normalized_key: normalizedKey,
      });
    }
    normalized[normalizedKey] = normalizeKeysToSnakeCase(entry, `${path}.${key}`);
  }
  return normalized;
}

function normalizeKeysToCamelCase(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((entry) => normalizeKeysToCamelCase(entry));
  if (!isRecord(value)) return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [
      snakeToCamelKey(key),
      normalizeKeysToCamelCase(entry),
    ]),
  );
}

/** Parse snake_case or camelCase transport data into the one canonical snake_case v2 model. */
export function parseAgentWorkOrderV2(value: unknown): AgentWorkOrderV2 {
  return validateAgentWorkOrderV2(normalizeKeysToSnakeCase(value, "$"));
}

/** Render the canonical model through the only supported camelCase compatibility boundary. */
export function toAgentWorkOrderV2CamelCase(value: unknown): unknown {
  return normalizeKeysToCamelCase(validateAgentWorkOrderV2(value));
}

function migrationOverrides(): AgentWorkOrderV2MigrationOverrides {
  const {
    schema_version: _schemaVersion,
    kind: _kind,
    role: _role,
    task,
    ...rest
  } = AGENT_WORK_ORDER_V2_VALID_FIXTURE;
  const { id: _taskId, ...taskOverrides } = task;
  return {
    ...rest,
    role: "EXECUTOR",
    task: taskOverrides,
  };
}

export const AGENT_WORK_ORDER_V1_COMPATIBILITY_FIXTURES = {
  brief: {
    contract: {
      kind: AGENT_WORK_CONTEXT_V1_KIND,
      version: AGENT_WORK_CONTEXT_V1_VERSION,
    },
    task: {
      id: "task-example-001",
      title: "Publish one bounded schema change with observed verification evidence.",
      owner: "EXECUTOR",
    },
    workflow: { mode: "branch_pr" },
    route: { phase: "agent_episode" },
    execution_packet: { recommended_role: "EXECUTOR" },
    verify_steps: { text: "Run the schema synchronization check." },
  },
  runner: {
    task: {
      data: {
        id: "task-example-001",
        title: "Publish one bounded schema change with observed verification evidence.",
        owner: "EXECUTOR",
      },
    },
    execution: { recommended_role: "EXECUTOR" },
    route_decision: { phase: "agent_episode" },
  },
  hermes: {
    task: {
      id: "task-example-001",
      title: "Publish one bounded schema change with observed verification evidence.",
      owner: "EXECUTOR",
    },
    execution_packet: { recommended_role: "EXECUTOR" },
    route_oracle: { phase: "agent_episode" },
  },
} as const;

export function buildAgentWorkOrderV1MigrationFixture(
  source_surface: AgentWorkOrderV1Surface,
): AgentWorkOrderV1MigrationResult {
  const compatibility = readAgentWorkOrderV1CompatibilityView({
    source_surface,
    payload: AGENT_WORK_ORDER_V1_COMPATIBILITY_FIXTURES[source_surface],
  });
  return migrateAgentWorkOrderV1ToV2({ compatibility, overrides: migrationOverrides() });
}

export function renderAgentWorkOrderV1CompatibilityFixtureJson(
  source_surface: AgentWorkOrderV1Surface,
): string {
  return `${JSON.stringify(AGENT_WORK_ORDER_V1_COMPATIBILITY_FIXTURES[source_surface], null, 2)}\n`;
}

export function renderAgentWorkOrderV2CamelCaseFixtureJson(): string {
  return `${JSON.stringify(toAgentWorkOrderV2CamelCase(AGENT_WORK_ORDER_V2_VALID_FIXTURE), null, 2)}\n`;
}
