import { z, type ZodIssue } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { formatZodIssues } from "../schemas/zod-error-format.js";

const nonEmptyString = () => z.string().min(1);
const nonEmptyStringArray = (defaults?: string[]) =>
  defaults ? z.array(nonEmptyString()).default(defaults) : z.array(nonEmptyString());

const COMMENT_POLICY_DEFAULTS = {
  start: { prefix: "Start:", min_chars: 40 },
  blocked: { prefix: "Blocked:", min_chars: 40 },
  verified: { prefix: "Verified:", min_chars: 60 },
};

const EXECUTION_DEFAULTS: {
  profile: "balanced";
  reasoning_effort: "medium";
  text_verbosity: "medium";
  tool_budget: {
    discovery: number;
    implementation: number;
    verification: number;
  };
  stop_conditions: string[];
  handoff_conditions: string[];
  unsafe_actions_requiring_explicit_user_ok: string[];
} = {
  profile: "balanced",
  reasoning_effort: "medium",
  text_verbosity: "medium",
  tool_budget: {
    discovery: 6,
    implementation: 10,
    verification: 6,
  },
  stop_conditions: [
    "Missing required input blocks correctness.",
    "Requested action expands scope or risk beyond approved plan.",
    "Verification fails and remediation changes scope.",
  ],
  handoff_conditions: [
    "Role boundary reached (for example CODER -> TESTER/REVIEWER).",
    "Task depends_on prerequisites are incomplete.",
    "Specialized agent is required.",
  ],
  unsafe_actions_requiring_explicit_user_ok: [
    "Destructive git history operations.",
    "Outside-repo read/write.",
    "Credential, keychain, or SSH material changes.",
  ],
};

const RUNNER_TRACE_DEFAULTS: {
  mode: "raw";
  max_tail_bytes: number;
  capture_stderr: boolean;
  retention: "keep";
  compression: "none";
  redact_patterns: string[];
} = {
  mode: "raw",
  max_tail_bytes: 65_536,
  capture_stderr: true,
  retention: "keep",
  compression: "none",
  redact_patterns: [] as string[],
};

const RUNNER_TIMEOUT_DEFAULTS: {
  wall_clock_ms: number;
  idle_ms: number;
  terminate_grace_ms: number;
} = {
  wall_clock_ms: 900_000,
  idle_ms: 180_000,
  terminate_grace_ms: 1500,
};

const ACR_DEFAULTS: {
  enabled: boolean;
  version: "0.1.0";
  write_on_finish: boolean;
  require_for_pr_check: boolean;
  default_validation_mode: "local";
  include_model_identity: "when_known";
  include_prompts: false;
  include_tool_outputs: false;
} = {
  enabled: true,
  version: "0.1.0",
  write_on_finish: true,
  require_for_pr_check: false,
  default_validation_mode: "local",
  include_model_identity: "when_known",
  include_prompts: false,
  include_tool_outputs: false,
};

const TASK_DOC_SECTIONS_DEFAULT = [
  "Summary",
  "Scope",
  "Plan",
  "Verify Steps",
  "Verification",
  "Rollback Plan",
  "Findings",
] as string[];

const TASK_DOC_REQUIRED_SECTIONS_DEFAULT = [
  "Summary",
  "Scope",
  "Plan",
  "Verification",
  "Rollback Plan",
] as string[];

const ARTIFACTS_LANGUAGE = z.enum(["any", "en"]).default("any");

const COMMENT_POLICY_SCHEMA = z
  .object({
    prefix: nonEmptyString(),
    min_chars: z.number().int().min(0),
  })
  .passthrough();

const RUNNER_CUSTOM_ENFORCEMENT_SCHEMA = z
  .object({
    mode: z.enum(["none", "codex_sandbox_full_auto"]).optional(),
    platform: z.enum(["auto", "macos", "linux", "windows"]).optional(),
  })
  .passthrough();

const RUNNER_CUSTOM_SCHEMA = z
  .object({
    command: z.array(nonEmptyString()).min(1),
    env: z.record(z.string()).default({}),
    enforcement: RUNNER_CUSTOM_ENFORCEMENT_SCHEMA.optional(),
  })
  .passthrough();

const RUNNER_TRACE_SCHEMA = z
  .object({
    mode: z.enum(["raw", "off"]).default(RUNNER_TRACE_DEFAULTS.mode),
    max_tail_bytes: z.number().int().min(0).default(RUNNER_TRACE_DEFAULTS.max_tail_bytes),
    capture_stderr: z.boolean().default(RUNNER_TRACE_DEFAULTS.capture_stderr),
    retention: z
      .enum(["keep", "remove_on_success", "remove_always"])
      .default(RUNNER_TRACE_DEFAULTS.retention),
    compression: z.enum(["none", "gzip"]).default(RUNNER_TRACE_DEFAULTS.compression),
    redact_patterns: nonEmptyStringArray(RUNNER_TRACE_DEFAULTS.redact_patterns),
  })
  .strict()
  .default({
    ...RUNNER_TRACE_DEFAULTS,
    redact_patterns: [...RUNNER_TRACE_DEFAULTS.redact_patterns],
  });

const RUNNER_TIMEOUTS_SCHEMA = z
  .object({
    wall_clock_ms: z.number().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.wall_clock_ms),
    idle_ms: z.number().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.idle_ms),
    terminate_grace_ms: z.number().int().min(0).default(RUNNER_TIMEOUT_DEFAULTS.terminate_grace_ms),
  })
  .strict()
  .default({ ...RUNNER_TIMEOUT_DEFAULTS });

export const AgentplaneConfigSchema = z
  .object({
    schema_version: z.literal(1).default(1),
    workflow_mode: z.enum(["direct", "branch_pr"]).default("direct"),
    status_commit_policy: z.enum(["off", "warn", "confirm"]).default("warn"),
    commit_automation: z.enum(["manual", "finish_only"]).default("manual"),
    finish_auto_status_commit: z.boolean().default(false),
    close_commit: z
      .object({
        direct_dirty_policy: z
          .enum(["allow_other_task_readmes", "strict"])
          .default("allow_other_task_readmes"),
      })
      .passthrough()
      .default({
        direct_dirty_policy: "allow_other_task_readmes",
      }),
    agents: z
      .object({
        approvals: z
          .object({
            require_plan: z.boolean().default(true),
            require_network: z.boolean().default(true),
            require_verify: z.boolean().default(true),
            require_force: z.boolean().default(false),
          })
          .passthrough()
          .default({
            require_plan: true,
            require_network: true,
            require_verify: true,
            require_force: false,
          }),
      })
      .passthrough()
      .default({
        approvals: {
          require_plan: true,
          require_network: true,
          require_verify: true,
        },
      }),
    recipes: z
      .object({
        storage_default: z.enum(["link", "copy"]).default("copy"),
      })
      .passthrough()
      .default({ storage_default: "copy" }),
    execution: z
      .object({
        profile: z
          .enum(["conservative", "balanced", "aggressive"])
          .default(EXECUTION_DEFAULTS.profile),
        reasoning_effort: z
          .enum(["low", "medium", "high", "xhigh"])
          .default(EXECUTION_DEFAULTS.reasoning_effort),
        text_verbosity: z
          .enum(["low", "medium", "high"])
          .default(EXECUTION_DEFAULTS.text_verbosity),
        tool_budget: z
          .object({
            discovery: z.number().int().min(1).default(EXECUTION_DEFAULTS.tool_budget.discovery),
            implementation: z
              .number()
              .int()
              .min(1)
              .default(EXECUTION_DEFAULTS.tool_budget.implementation),
            verification: z
              .number()
              .int()
              .min(1)
              .default(EXECUTION_DEFAULTS.tool_budget.verification),
          })
          .passthrough()
          .default(EXECUTION_DEFAULTS.tool_budget),
        stop_conditions: nonEmptyStringArray([...EXECUTION_DEFAULTS.stop_conditions]),
        handoff_conditions: nonEmptyStringArray([...EXECUTION_DEFAULTS.handoff_conditions]),
        unsafe_actions_requiring_explicit_user_ok: nonEmptyStringArray([
          ...EXECUTION_DEFAULTS.unsafe_actions_requiring_explicit_user_ok,
        ]),
      })
      .passthrough()
      .default({
        profile: EXECUTION_DEFAULTS.profile,
        reasoning_effort: EXECUTION_DEFAULTS.reasoning_effort,
        text_verbosity: EXECUTION_DEFAULTS.text_verbosity,
        tool_budget: { ...EXECUTION_DEFAULTS.tool_budget },
        stop_conditions: [...EXECUTION_DEFAULTS.stop_conditions],
        handoff_conditions: [...EXECUTION_DEFAULTS.handoff_conditions],
        unsafe_actions_requiring_explicit_user_ok: [
          ...EXECUTION_DEFAULTS.unsafe_actions_requiring_explicit_user_ok,
        ],
      }),
    runner: z
      .object({
        default_adapter: z.enum(["codex", "custom"]).default("codex"),
        trace: RUNNER_TRACE_SCHEMA,
        timeouts: RUNNER_TIMEOUTS_SCHEMA,
        custom: RUNNER_CUSTOM_SCHEMA.optional(),
      })
      .passthrough()
      .default({
        default_adapter: "codex",
        trace: {
          ...RUNNER_TRACE_DEFAULTS,
          redact_patterns: [...RUNNER_TRACE_DEFAULTS.redact_patterns],
        },
        timeouts: { ...RUNNER_TIMEOUT_DEFAULTS },
      }),
    acr: z
      .object({
        enabled: z.boolean().default(ACR_DEFAULTS.enabled),
        version: z.literal("0.1.0").default(ACR_DEFAULTS.version),
        write_on_finish: z.boolean().default(ACR_DEFAULTS.write_on_finish),
        require_for_pr_check: z.boolean().default(ACR_DEFAULTS.require_for_pr_check),
        default_validation_mode: z
          .enum(["schema", "local", "ci"])
          .default(ACR_DEFAULTS.default_validation_mode),
        include_model_identity: z
          .enum(["never", "when_known", "always"])
          .default(ACR_DEFAULTS.include_model_identity),
        include_prompts: z.literal(false).default(ACR_DEFAULTS.include_prompts),
        include_tool_outputs: z.literal(false).default(ACR_DEFAULTS.include_tool_outputs),
      })
      .passthrough()
      .default({ ...ACR_DEFAULTS }),
    paths: z
      .object({
        agents_dir: nonEmptyString().default(".agentplane/agents"),
        tasks_path: nonEmptyString().default(".agentplane/tasks.json"),
        workflow_dir: nonEmptyString().default(".agentplane/tasks"),
        worktrees_dir: nonEmptyString().default(".agentplane/worktrees"),
      })
      .passthrough()
      .default({
        agents_dir: ".agentplane/agents",
        tasks_path: ".agentplane/tasks.json",
        workflow_dir: ".agentplane/tasks",
        worktrees_dir: ".agentplane/worktrees",
      }),
    branch: z
      .object({
        task_prefix: nonEmptyString().default("task"),
      })
      .passthrough()
      .default({ task_prefix: "task" }),
    framework: z
      .object({
        source: nonEmptyString().default("https://github.com/basilisk-labs/agentplane"),
        last_update: z.string().datetime({ offset: true }).nullable().default(null),
        cli: z
          .object({
            expected_version: z.string().nullable().default(null),
          })
          .passthrough()
          .default({ expected_version: null }),
      })
      .passthrough()
      .default({
        source: "https://github.com/basilisk-labs/agentplane",
        last_update: null,
        cli: { expected_version: null },
      }),
    tasks: z
      .object({
        id_suffix_length_default: z.number().int().min(3).max(16).default(6),
        verify: z
          .object({
            required_tags: nonEmptyStringArray(["code", "backend", "frontend"]),
            require_steps_for_tags: nonEmptyStringArray().optional(),
            require_steps_for_primary: nonEmptyStringArray(["code", "data", "ops"]),
            require_verification_for_primary: nonEmptyStringArray(["code", "data", "ops"]),
            spike_tag: nonEmptyString().default("spike"),
            enforce_on_plan_approve: z.boolean().default(true),
            enforce_on_start_when_no_plan: z.boolean().default(true),
          })
          .passthrough()
          .default({
            required_tags: ["code", "backend", "frontend"],
            require_steps_for_primary: ["code", "data", "ops"],
            require_verification_for_primary: ["code", "data", "ops"],
            spike_tag: "spike",
            enforce_on_plan_approve: true,
            enforce_on_start_when_no_plan: true,
          }),
        tags: z
          .object({
            primary_allowlist: z
              .array(nonEmptyString())
              .min(1)
              .default(["code", "data", "research", "docs", "ops", "product", "meta"]),
            strict_primary: z.boolean().default(false),
            fallback_primary: nonEmptyString().default("meta"),
            lock_primary_on_update: z.boolean().default(true),
          })
          .passthrough()
          .default({
            primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
            strict_primary: false,
            fallback_primary: "meta",
            lock_primary_on_update: true,
          }),
        doc: z
          .object({
            sections: nonEmptyStringArray([...TASK_DOC_SECTIONS_DEFAULT]),
            required_sections: nonEmptyStringArray([...TASK_DOC_REQUIRED_SECTIONS_DEFAULT]),
          })
          .passthrough()
          .default({
            sections: [...TASK_DOC_SECTIONS_DEFAULT],
            required_sections: [...TASK_DOC_REQUIRED_SECTIONS_DEFAULT],
          }),
        comments: z
          .object({
            start: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.start),
            blocked: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.blocked),
            verified: COMMENT_POLICY_SCHEMA.default(COMMENT_POLICY_DEFAULTS.verified),
          })
          .passthrough()
          .default(COMMENT_POLICY_DEFAULTS),
      })
      .passthrough()
      .default({
        id_suffix_length_default: 6,
        verify: {
          required_tags: ["code", "backend", "frontend"],
          require_steps_for_primary: ["code", "data", "ops"],
          require_verification_for_primary: ["code", "data", "ops"],
          spike_tag: "spike",
          enforce_on_plan_approve: true,
          enforce_on_start_when_no_plan: true,
        },
        tags: {
          primary_allowlist: ["code", "data", "research", "docs", "ops", "product", "meta"],
          strict_primary: false,
          fallback_primary: "meta",
          lock_primary_on_update: true,
        },
        doc: {
          sections: [...TASK_DOC_SECTIONS_DEFAULT],
          required_sections: [...TASK_DOC_REQUIRED_SECTIONS_DEFAULT],
        },
        comments: COMMENT_POLICY_DEFAULTS,
      }),
    commit: z
      .object({
        generic_tokens: nonEmptyStringArray([
          "start",
          "status",
          "mark",
          "done",
          "wip",
          "update",
          "tasks",
          "task",
        ]),
        dco: z
          .object({
            enabled: z.boolean().default(false),
            name: nonEmptyString().nullable().default(null),
            email: nonEmptyString().nullable().default(null),
          })
          .passthrough()
          .default({
            enabled: false,
            name: null,
            email: null,
          }),
      })
      .passthrough()
      .default({
        generic_tokens: ["start", "status", "mark", "done", "wip", "update", "tasks", "task"],
        dco: {
          enabled: false,
          name: null,
          email: null,
        },
      }),
    tasks_backend: z
      .object({
        config_path: nonEmptyString().default(".agentplane/backends/local/backend.json"),
      })
      .passthrough()
      .default({ config_path: ".agentplane/backends/local/backend.json" }),
    artifacts_language: ARTIFACTS_LANGUAGE,
    closure_commit_requires_approval: z.boolean().default(false),
  })
  .passthrough();

export type AgentplaneConfig = z.infer<typeof AgentplaneConfigSchema>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function formatAgentplaneConfigIssues(issues: readonly ZodIssue[]): string {
  return formatZodIssues("config schema validation failed", issues);
}

export function validateAgentplaneConfig(raw: unknown): AgentplaneConfig {
  const parsed = AgentplaneConfigSchema.safeParse(raw);
  if (!parsed.success) {
    const err = new Error(formatAgentplaneConfigIssues(parsed.error.issues)) as Error & {
      cause?: unknown;
    };
    err.cause = parsed.error;
    throw err;
  }

  if (!isRecord(parsed.data)) {
    throw new Error("config must be an object");
  }

  return parsed.data;
}

const DEFAULT_AGENTPLANE_CONFIG = validateAgentplaneConfig({});

export function defaultAgentplaneConfig(): AgentplaneConfig {
  return structuredClone(DEFAULT_AGENTPLANE_CONFIG);
}

function buildAgentplaneConfigJsonSchema(): Record<string, unknown> {
  const schema = zodToJsonSchema(AgentplaneConfigSchema, {
    $refStrategy: "none",
    target: "jsonSchema7",
  }) as Record<string, unknown>;

  return {
    $schema: "http://json-schema.org/draft-07/schema#",
    $id: "https://agentplane.dev/schemas/config.schema.json",
    title: "agentplane config.json (v1)",
    ...schema,
  };
}

export const AGENTPLANE_CONFIG_SCHEMA = buildAgentplaneConfigJsonSchema();

export function renderAgentplaneConfigSchemaJson(): string {
  return `${JSON.stringify(AGENTPLANE_CONFIG_SCHEMA, null, 2)}\n`;
}
