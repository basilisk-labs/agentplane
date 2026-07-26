import { z } from "zod";

import {
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
    // Hermes projects the task owner directly from the lifecycle route, where an
    // unassigned task is represented as null. Preserve that fact instead of
    // rejecting an otherwise valid legacy packet.
    title: z.string().trim().min(1).nullable().optional(),
    owner: z.string().trim().min(1).nullable().optional(),
  })
  .passthrough();
const LEGACY_BRIEF_EXECUTION_PACKET_ZOD_SCHEMA = z
  .object({
    recommended_role: z.string().trim().min(1).optional(),
  })
  .passthrough();
const LEGACY_RUNNER_EXECUTION_ZOD_SCHEMA = z
  .object({
    adapter_id: z.string().trim().min(1).optional(),
    mode: z.enum(["execute", "dry_run"]).optional(),
    run_id: z.string().trim().min(1).optional(),
  })
  .passthrough();
const LEGACY_RUNNER_ROUTE_DECISION_ZOD_SCHEMA = z
  .object({
    executionPacket: z
      .object({
        recommendedRole: z.string().trim().min(1).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
const LEGACY_HERMES_EXECUTION_PACKET_ZOD_SCHEMA = z
  .object({
    schemaVersion: z.literal(1).optional(),
    actionKind: z.enum(["local_command", "provider_action", "wait", "stop"]).optional(),
    safeToMutate: z.boolean().optional(),
    requiresProviderAction: z.boolean().optional(),
    recommendedRole: z.string().trim().min(1).optional(),
    exactArgv: z.array(z.string()).nullable().optional(),
  })
  .passthrough();

const LEGACY_BRIEF_V1_ZOD_SCHEMA = z
  .object({
    contract: LEGACY_CONTRACT_ZOD_SCHEMA,
    task: LEGACY_TASK_ZOD_SCHEMA,
    execution_packet: LEGACY_BRIEF_EXECUTION_PACKET_ZOD_SCHEMA.optional(),
  })
  .passthrough();
const LEGACY_RUNNER_V1_ZOD_SCHEMA = z
  .object({
    task: z
      .object({
        data: LEGACY_TASK_ZOD_SCHEMA,
      })
      .passthrough(),
    execution: LEGACY_RUNNER_EXECUTION_ZOD_SCHEMA.optional(),
    route_decision: LEGACY_RUNNER_ROUTE_DECISION_ZOD_SCHEMA.optional(),
  })
  .passthrough();
const LEGACY_HERMES_V1_ZOD_SCHEMA = z
  .object({
    task: LEGACY_TASK_ZOD_SCHEMA,
    execution_packet: LEGACY_HERMES_EXECUTION_PACKET_ZOD_SCHEMA.optional(),
  })
  .passthrough();

export type AgentWorkOrderV1Surface = (typeof AGENT_WORK_ORDER_V1_SURFACE_VALUES)[number];
export type AgentWorkContextV1Contract = z.infer<typeof LEGACY_CONTRACT_ZOD_SCHEMA>;
export type AgentWorkOrderV1OmissionReceipt = {
  field:
    | "work_order_id"
    | "role"
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
  /**
   * The legacy route role is lifecycle guidance (for example CODER), not an
   * AgentWorkOrder semantic role. It is preserved for audit only and never
   * fills the required v2 `role` field.
   */
  legacy_recommended_role: string | null;
  omissions: AgentWorkOrderV1OmissionReceipt[];
};

const V1_OMISSION_FIELDS: AgentWorkOrderV1OmissionReceipt["field"][] = [
  "work_order_id",
  "role",
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

function compatibilityView(opts: {
  source_surface: AgentWorkOrderV1Surface;
  task: { id: string; title?: string | null; owner?: string | null };
  legacy_recommended_role?: string;
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
    legacy_recommended_role: opts.legacy_recommended_role ?? null,
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
        legacy_recommended_role: payload.execution_packet?.recommended_role,
      });
    }
    case "runner": {
      const payload = LEGACY_RUNNER_V1_ZOD_SCHEMA.parse(opts.payload);
      return compatibilityView({
        source_surface: "runner",
        task: payload.task.data,
        legacy_recommended_role: payload.route_decision?.executionPacket?.recommendedRole,
      });
    }
    case "hermes": {
      const payload = LEGACY_HERMES_V1_ZOD_SCHEMA.parse(opts.payload);
      return compatibilityView({
        source_surface: "hermes",
        task: payload.task,
        legacy_recommended_role: payload.execution_packet?.recommendedRole,
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
 * a work-order id, semantic role, authority, fingerprint, evidence, or verification intent, so
 * accepting defaults here would create false authority or false semantics.
 */
export function migrateAgentWorkOrderV1ToV2(opts: {
  compatibility: AgentWorkOrderV1CompatibilityView;
  overrides: AgentWorkOrderV2MigrationOverrides;
}): AgentWorkOrderV1MigrationResult {
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
      owner: "CODER",
    },
    workflow: { mode: "branch_pr" },
    route: { phase: "agent_episode" },
    execution_packet: { recommended_role: "CODER" },
    verify_steps: { text: "Run the schema synchronization check." },
  },
  runner: {
    schema_version: 1,
    runner_api_version: "1",
    target: { kind: "task", task_id: "task-example-001" },
    task: {
      data: {
        id: "task-example-001",
        title: "Publish one bounded schema change with observed verification evidence.",
        owner: "CODER",
      },
    },
    execution: {
      adapter_id: "codex",
      mode: "execute",
      run_id: "run-example-001",
      artifact_paths: {
        run_dir: ".agentplane/runs/run-example-001",
        bundle_path: ".agentplane/runs/run-example-001/bundle.json",
      },
    },
    route_decision: {
      executionPacket: {
        schemaVersion: 1,
        actionKind: "local_command",
        safeToMutate: true,
        requiresProviderAction: false,
        recommendedRole: "CODER",
        authoritativeCheckout: "task_worktree",
        authoritativeCheckoutPath: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
        mutationPathHint: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
        mustRunFrom: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
        exactArgv: ["agentplane", "task", "start-ready", "task-example-001"],
        mustNot: ["do not mutate outside the task worktree"],
        returnControlWhen: "after the task starts",
        humanProviderAction: null,
        staleStateCheck: "agentplane task next-action task-example-001 --explain",
        evidenceMissing: [],
        verificationCandidate: null,
        stopReason: null,
      },
    },
  },
  hermes: {
    task: {
      id: "task-example-001",
      title: "Publish one bounded schema change with observed verification evidence.",
      status: "DOING",
      owner: null,
      revision: 7,
      verification_state: null,
    },
    next_action: {
      code: "implementation_rework_required",
      summary: "Return control to the CODER for implementation rework in the task worktree.",
    },
    execution_packet: {
      schemaVersion: 1,
      actionKind: "local_command",
      safeToMutate: true,
      requiresProviderAction: false,
      recommendedRole: "CODER",
      authoritativeCheckout: "task_worktree",
      authoritativeCheckoutPath: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
      mutationPathHint: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
      mustRunFrom: "/workspace/agentplane/.agentplane/worktrees/task-example-001",
      exactArgv: ["agentplane", "task", "start-ready", "task-example-001"],
      mustNot: ["do not mutate outside the task worktree"],
      returnControlWhen: "after the task starts",
      humanProviderAction: null,
      staleStateCheck: "agentplane task next-action task-example-001 --explain",
      evidenceMissing: [],
      verificationCandidate: null,
      stopReason: null,
    },
    route_oracle: { phase: "implementation_rework_required" },
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
