import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
import { z } from "zod";

export const LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION = 1 as const;
export const STATE_FINGERPRINT_SCHEMA_VERSION = 2 as const;
export const STATE_FINGERPRINT_KIND = "state_fingerprint" as const;
export const STATE_FINGERPRINT_OBSERVER = "agentplane" as const;

export const LEGACY_STATE_FINGERPRINT_COMPONENT_NAMES = [
  "task",
  "git",
  "backend_projection",
  "policy",
  "blueprint",
  "knowledge",
  "provider",
  "authority",
] as const;

export const STATE_FINGERPRINT_COMPONENT_NAMES = [
  "task",
  "git",
  "backend_projection",
  "plan",
  "policy",
  "capability",
  "knowledge",
  "provider",
  "authority",
] as const;

export const ALL_STATE_FINGERPRINT_COMPONENT_NAMES = [
  "task",
  "git",
  "backend_projection",
  "plan",
  "policy",
  "capability",
  "blueprint",
  "knowledge",
  "provider",
  "authority",
] as const;

export type StateFingerprintComponentName = (typeof STATE_FINGERPRINT_COMPONENT_NAMES)[number];
export type LegacyStateFingerprintComponentName =
  (typeof LEGACY_STATE_FINGERPRINT_COMPONENT_NAMES)[number];
export type AnyStateFingerprintComponentName =
  (typeof ALL_STATE_FINGERPRINT_COMPONENT_NAMES)[number];

const SHA256_DIGEST_SCHEMA = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const NON_EMPTY_STRING = z.string().trim().min(1);

const PRESENT_COMPONENT_SCHEMA = z
  .object({
    state: z.literal("present"),
    source: NON_EMPTY_STRING,
    digest: SHA256_DIGEST_SCHEMA,
    reason_code: z.null(),
  })
  .strict();

const ABSENT_COMPONENT_SCHEMA = z
  .object({
    state: z.enum(["missing", "unavailable"]),
    source: NON_EMPTY_STRING,
    digest: SHA256_DIGEST_SCHEMA,
    reason_code: NON_EMPTY_STRING,
  })
  .strict();

export const STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA = z.union([
  PRESENT_COMPONENT_SCHEMA,
  ABSENT_COMPONENT_SCHEMA,
]);

export const LEGACY_STATE_FINGERPRINT_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION),
    kind: z.literal(STATE_FINGERPRINT_KIND),
    observed_by: z.literal(STATE_FINGERPRINT_OBSERVER),
    task_id: NON_EMPTY_STRING,
    task_revision: z.number().int().positive().nullable(),
    git_head: NON_EMPTY_STRING.nullable(),
    worktree: NON_EMPTY_STRING,
    components: z
      .object({
        task: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        git: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        backend_projection: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        policy: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        blueprint: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        knowledge: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        provider: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        authority: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
      })
      .strict(),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const STATE_FINGERPRINT_V2_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(STATE_FINGERPRINT_SCHEMA_VERSION),
    kind: z.literal(STATE_FINGERPRINT_KIND),
    observed_by: z.literal(STATE_FINGERPRINT_OBSERVER),
    task_id: NON_EMPTY_STRING,
    task_revision: z.number().int().positive().nullable(),
    git_head: NON_EMPTY_STRING.nullable(),
    worktree: NON_EMPTY_STRING,
    components: z
      .object({
        task: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        git: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        backend_projection: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        plan: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        policy: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        capability: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        knowledge: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        provider: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
        authority: STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA,
      })
      .strict(),
    digest: SHA256_DIGEST_SCHEMA,
  })
  .strict();

export const STATE_FINGERPRINT_ZOD_SCHEMA = z.discriminatedUnion("schema_version", [
  LEGACY_STATE_FINGERPRINT_ZOD_SCHEMA,
  STATE_FINGERPRINT_V2_ZOD_SCHEMA,
]);

export type StateFingerprintComponent = z.infer<typeof STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA>;
type LegacyStateFingerprintParsed = z.infer<typeof LEGACY_STATE_FINGERPRINT_ZOD_SCHEMA>;
type StateFingerprintV2Parsed = z.infer<typeof STATE_FINGERPRINT_V2_ZOD_SCHEMA>;
export type LegacyStateFingerprint = LegacyStateFingerprintParsed & {
  components: LegacyStateFingerprintParsed["components"] & {
    plan?: never;
    capability?: never;
  };
};
export type StateFingerprintV2 = StateFingerprintV2Parsed & {
  components: StateFingerprintV2Parsed["components"] & { blueprint?: never };
};
export type StateFingerprint = LegacyStateFingerprint | StateFingerprintV2;

export type StateFingerprintComponentInput =
  | {
      state: "present";
      source: string;
      value: unknown;
    }
  | {
      state: "missing" | "unavailable";
      source: string;
      reason_code: string;
      evidence?: unknown;
    };

type StateFingerprintInputBase = {
  task_id: string;
  task_revision: number | null;
  git_head: string | null;
  worktree: string;
};

export type StateFingerprintInput = StateFingerprintInputBase & {
  components: Record<StateFingerprintComponentName, StateFingerprintComponentInput>;
};

export type LegacyStateFingerprintInput = StateFingerprintInputBase & {
  components: Record<LegacyStateFingerprintComponentName, StateFingerprintComponentInput>;
};

export const STATE_FINGERPRINT_POLICY_ZOD_SCHEMA = z
  .object({
    fingerprint_schema_version: z
      .union([
        z.literal(LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION),
        z.literal(STATE_FINGERPRINT_SCHEMA_VERSION),
      ])
      .optional(),
    required_components: z.array(z.enum(ALL_STATE_FINGERPRINT_COMPONENT_NAMES)).readonly(),
    provider: z
      .object({
        required: z.boolean(),
        unavailable: z.enum(["reject", "allow_if_unchanged"]),
        reject_reason_codes: z.array(NON_EMPTY_STRING).readonly().optional(),
      })
      .strict(),
  })
  .strict();

export const STATE_FINGERPRINT_V2_POLICY_ZOD_SCHEMA = z
  .object({
    fingerprint_schema_version: z.literal(STATE_FINGERPRINT_SCHEMA_VERSION),
    required_components: z.array(z.enum(STATE_FINGERPRINT_COMPONENT_NAMES)).readonly(),
    provider: z
      .object({
        required: z.boolean(),
        unavailable: z.enum(["reject", "allow_if_unchanged"]),
        reject_reason_codes: z.array(NON_EMPTY_STRING).readonly().optional(),
      })
      .strict(),
  })
  .strict();

export type StateFingerprintPolicy = z.infer<typeof STATE_FINGERPRINT_POLICY_ZOD_SCHEMA>;

export type StateFingerprintChange = {
  component: AnyStateFingerprintComponentName;
  expected_state: StateFingerprintComponent["state"];
  current_state: StateFingerprintComponent["state"];
  expected_digest: string;
  current_digest: string;
};

export type StateFingerprintIdentityChange = {
  field: "schema_version" | "task_id" | "task_revision" | "git_head" | "worktree";
  expected: string | number | null;
  current: string | number | null;
};

export type StateFingerprintPreconditionDiagnostic = {
  status: "fresh" | "fresh_with_bounded_uncertainty" | "stale" | "blocked";
  reason_code:
    | "state_fingerprint_fresh"
    | "state_fingerprint_provider_uncertainty_allowed"
    | "state_fingerprint_stale"
    | "state_fingerprint_required_component_unavailable"
    | "state_fingerprint_provider_unavailable";
  expected_digest: string;
  current_digest: string;
  changed_components: StateFingerprintChange[];
  identity_changes: StateFingerprintIdentityChange[];
  unavailable_required_components: AnyStateFingerprintComponentName[];
  provider_state: StateFingerprintComponent["state"];
};

export type StateFingerprintPreconditionFailureReason =
  | "state_fingerprint_stale"
  | "state_fingerprint_required_component_unavailable"
  | "state_fingerprint_provider_unavailable";

export class StateFingerprintPreconditionError extends Error {
  readonly code = "STATE_FINGERPRINT_PRECONDITION_FAILED";
  readonly reason_code: StateFingerprintPreconditionFailureReason;
  readonly diagnostic: StateFingerprintPreconditionDiagnostic;

  constructor(diagnostic: StateFingerprintPreconditionDiagnostic) {
    const changed = diagnostic.changed_components.map((entry) => entry.component).join(", ");
    const unavailable = diagnostic.unavailable_required_components.join(", ");
    const detail = changed || unavailable || diagnostic.provider_state;
    super(`State fingerprint precondition failed (${diagnostic.reason_code}): ${detail}.`);
    this.name = "StateFingerprintPreconditionError";
    this.reason_code = diagnostic.reason_code as StateFingerprintPreconditionFailureReason;
    this.diagnostic = diagnostic;
  }
}

export type PreparedOperation<T> = {
  operation: T;
  precondition_fingerprint: StateFingerprint;
  precondition_policy: StateFingerprintPolicy;
};

export type StateBoundOperationResult<T> = {
  result: T;
  precondition_fingerprint: StateFingerprint;
  state_before: StateFingerprint;
  state_after: StateFingerprint;
  precondition: StateFingerprintPreconditionDiagnostic;
};

function canonicalJson(value: unknown): string {
  const canonical = canonicalize(value);
  if (typeof canonical !== "string") {
    throw new Error("State fingerprint input must be canonical JSON.");
  }
  return canonical;
}

function digestCanonical(value: unknown): string {
  return `sha256:${createHash("sha256").update(canonicalJson(value), "utf8").digest("hex")}`;
}

function normalizeRequiredComponents(
  components: readonly AnyStateFingerprintComponentName[],
): AnyStateFingerprintComponentName[] {
  const selected = new Set(components);
  return ALL_STATE_FINGERPRINT_COMPONENT_NAMES.filter((name) => selected.has(name));
}

function buildComponent(input: StateFingerprintComponentInput): StateFingerprintComponent {
  const source = input.source.trim();
  if (!source) throw new Error("State fingerprint component source must be non-empty.");
  if (input.state === "present") {
    return {
      state: "present",
      source,
      digest: digestCanonical({
        state: input.state,
        source,
        value: input.value,
      }),
      reason_code: null,
    };
  }
  const reasonCode = input.reason_code.trim();
  if (!reasonCode) {
    throw new Error("Missing or unavailable fingerprint components require a reason_code.");
  }
  return {
    state: input.state,
    source,
    digest: digestCanonical(
      input.evidence === undefined
        ? {
            state: input.state,
            source,
            reason_code: reasonCode,
          }
        : {
            state: input.state,
            source,
            reason_code: reasonCode,
            evidence: input.evidence,
          },
    ),
    reason_code: reasonCode,
  };
}

function isLegacyStateFingerprintInput(
  input: StateFingerprintInput | LegacyStateFingerprintInput,
): input is LegacyStateFingerprintInput {
  return Object.hasOwn(input.components, "blueprint");
}

const buildStateFingerprintInternal = (
  input: StateFingerprintInput | LegacyStateFingerprintInput,
): StateFingerprint => {
  const taskId = input.task_id.trim();
  if (!taskId) throw new Error("State fingerprint task_id must be non-empty.");
  const worktree = input.worktree.trim();
  if (!worktree) throw new Error("State fingerprint worktree must be non-empty.");
  const gitHead = input.git_head?.trim() ?? null;
  const legacy = isLegacyStateFingerprintInput(input);
  const componentNames = legacy
    ? LEGACY_STATE_FINGERPRINT_COMPONENT_NAMES
    : STATE_FINGERPRINT_COMPONENT_NAMES;
  const inputComponents = input.components as Record<
    AnyStateFingerprintComponentName,
    StateFingerprintComponentInput
  >;
  const components = Object.fromEntries(
    componentNames.map((name) => [name, buildComponent(inputComponents[name])]),
  );
  const payload = {
    schema_version: legacy
      ? LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION
      : STATE_FINGERPRINT_SCHEMA_VERSION,
    kind: STATE_FINGERPRINT_KIND,
    observed_by: STATE_FINGERPRINT_OBSERVER,
    task_id: taskId,
    task_revision: input.task_revision,
    git_head: gitHead === "" ? null : gitHead,
    worktree,
    components,
  };
  return validateStateFingerprint({
    ...payload,
    digest: digestCanonical(payload),
  });
};

export const buildStateFingerprint = buildStateFingerprintInternal as {
  (input: StateFingerprintInput): StateFingerprintV2;
  (input: LegacyStateFingerprintInput): LegacyStateFingerprint;
};

export function validateStateFingerprint(input: unknown): StateFingerprint {
  const parsed = STATE_FINGERPRINT_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = digestCanonical(payload);
  if (digest !== expected) {
    throw new Error(`State fingerprint digest mismatch: expected ${expected}, observed ${digest}.`);
  }
  return parsed;
}

export function validateStateFingerprintPolicy(input: unknown): StateFingerprintPolicy {
  return STATE_FINGERPRINT_POLICY_ZOD_SCHEMA.parse(input);
}

export function evaluateStateFingerprintPrecondition(opts: {
  expected: StateFingerprint;
  current: StateFingerprint;
  policy: StateFingerprintPolicy;
}): StateFingerprintPreconditionDiagnostic {
  const expected = validateStateFingerprint(opts.expected);
  const current = validateStateFingerprint(opts.current);
  const policy = validateStateFingerprintPolicy(opts.policy);
  const sameDomain = expected.schema_version === current.schema_version;
  const componentNames = sameDomain
    ? expected.schema_version === LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION
      ? LEGACY_STATE_FINGERPRINT_COMPONENT_NAMES
      : STATE_FINGERPRINT_COMPONENT_NAMES
    : [];
  const changed_components: StateFingerprintChange[] = componentNames.flatMap((component) => {
    const expectedComponent = expected.components[component as keyof typeof expected.components];
    const currentComponent = current.components[component as keyof typeof current.components];
    if (!expectedComponent || !currentComponent) return [];
    return expectedComponent.state !== currentComponent.state ||
      expectedComponent.digest !== currentComponent.digest
      ? [
          {
            component,
            expected_state: expectedComponent.state,
            current_state: currentComponent.state,
            expected_digest: expectedComponent.digest,
            current_digest: currentComponent.digest,
          },
        ]
      : [];
  });
  const identity_changes: StateFingerprintIdentityChange[] = [
    ...(expected.schema_version === current.schema_version
      ? []
      : [
          {
            field: "schema_version" as const,
            expected: expected.schema_version,
            current: current.schema_version,
          },
        ]),
    ...(expected.task_id === current.task_id
      ? []
      : [{ field: "task_id" as const, expected: expected.task_id, current: current.task_id }]),
    ...(expected.task_revision === current.task_revision
      ? []
      : [
          {
            field: "task_revision" as const,
            expected: expected.task_revision,
            current: current.task_revision,
          },
        ]),
    ...(expected.git_head === current.git_head
      ? []
      : [{ field: "git_head" as const, expected: expected.git_head, current: current.git_head }]),
    ...(expected.worktree === current.worktree
      ? []
      : [{ field: "worktree" as const, expected: expected.worktree, current: current.worktree }]),
  ];
  const recordIdentityOnlyComponent = (component: "task" | "git"): void => {
    if (changed_components.some((entry) => entry.component === component)) return;
    const expectedComponent = expected.components[component];
    const currentComponent = current.components[component];
    changed_components.push({
      component,
      expected_state: expectedComponent.state,
      current_state: currentComponent.state,
      expected_digest: expectedComponent.digest,
      current_digest: currentComponent.digest,
    });
  };
  if (changed_components.length === 0) {
    if (
      identity_changes.some((entry) => entry.field === "task_id" || entry.field === "task_revision")
    ) {
      recordIdentityOnlyComponent("task");
    }
    if (
      identity_changes.some((entry) => entry.field === "git_head" || entry.field === "worktree")
    ) {
      recordIdentityOnlyComponent("git");
    }
  }
  const currentComponentNames = new Set(
    current.schema_version === LEGACY_STATE_FINGERPRINT_SCHEMA_VERSION
      ? LEGACY_STATE_FINGERPRINT_COMPONENT_NAMES
      : STATE_FINGERPRINT_COMPONENT_NAMES,
  );
  const unavailable_required_components = normalizeRequiredComponents(policy.required_components)
    .filter((component) => currentComponentNames.has(component as never))
    .filter(
      (component) =>
        current.components[component as keyof typeof current.components]?.state !== "present",
    );
  const base = {
    expected_digest: expected.digest,
    current_digest: current.digest,
    changed_components,
    identity_changes,
    unavailable_required_components,
    provider_state: current.components.provider.state,
  };
  const provider = current.components.provider;
  const rejectedProviderReasonCodes = policy.provider.reject_reason_codes
    ? new Set(policy.provider.reject_reason_codes)
    : null;
  if (
    (policy.fingerprint_schema_version !== undefined &&
      policy.fingerprint_schema_version !== current.schema_version) ||
    changed_components.length > 0 ||
    identity_changes.length > 0 ||
    expected.digest !== current.digest
  ) {
    return {
      ...base,
      status: "stale",
      reason_code: "state_fingerprint_stale",
    };
  }
  if (unavailable_required_components.length > 0) {
    return {
      ...base,
      status: "blocked",
      reason_code: "state_fingerprint_required_component_unavailable",
    };
  }
  if (
    provider.state !== "present" &&
    provider.reason_code !== null &&
    rejectedProviderReasonCodes?.has(provider.reason_code) === true
  ) {
    return {
      ...base,
      status: "blocked",
      reason_code: "state_fingerprint_provider_unavailable",
    };
  }
  if (provider.state === "missing" && policy.provider.required) {
    return {
      ...base,
      status: "blocked",
      reason_code: "state_fingerprint_provider_unavailable",
    };
  }
  if (provider.state === "unavailable") {
    if (policy.provider.required || policy.provider.unavailable === "reject") {
      return {
        ...base,
        status: "blocked",
        reason_code: "state_fingerprint_provider_unavailable",
      };
    }
    return {
      ...base,
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
    };
  }
  return {
    ...base,
    status: "fresh",
    reason_code: "state_fingerprint_fresh",
  };
}

export function assertStateFingerprintPrecondition(opts: {
  expected: StateFingerprint;
  current: StateFingerprint;
  policy: StateFingerprintPolicy;
}): StateFingerprintPreconditionDiagnostic {
  const diagnostic = evaluateStateFingerprintPrecondition(opts);
  if (diagnostic.status === "stale" || diagnostic.status === "blocked") {
    throw new StateFingerprintPreconditionError(diagnostic);
  }
  return diagnostic;
}

export async function executePreparedOperation<TInput, TResult>(opts: {
  prepared: PreparedOperation<TInput>;
  capture_state: () => Promise<StateFingerprint>;
  apply: (operation: TInput) => Promise<TResult>;
}): Promise<StateBoundOperationResult<TResult>> {
  const stateBefore = await opts.capture_state();
  const precondition = assertStateFingerprintPrecondition({
    expected: opts.prepared.precondition_fingerprint,
    current: stateBefore,
    policy: opts.prepared.precondition_policy,
  });
  const result = await opts.apply(opts.prepared.operation);
  const stateAfter = await opts.capture_state();
  return {
    result,
    precondition_fingerprint: opts.prepared.precondition_fingerprint,
    state_before: stateBefore,
    state_after: stateAfter,
    precondition,
  };
}
