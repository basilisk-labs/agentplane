import canonicalize from "canonicalize";
import { createHash } from "node:crypto";
import { z } from "zod";

export const STATE_FINGERPRINT_SCHEMA_VERSION = 1 as const;
export const STATE_FINGERPRINT_KIND = "state_fingerprint" as const;
export const STATE_FINGERPRINT_OBSERVER = "agentplane" as const;

export const STATE_FINGERPRINT_COMPONENT_NAMES = [
  "task",
  "git",
  "backend_projection",
  "policy",
  "blueprint",
  "knowledge",
  "provider",
  "authority",
] as const;

export type StateFingerprintComponentName = (typeof STATE_FINGERPRINT_COMPONENT_NAMES)[number];

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

export const STATE_FINGERPRINT_ZOD_SCHEMA = z
  .object({
    schema_version: z.literal(STATE_FINGERPRINT_SCHEMA_VERSION),
    kind: z.literal(STATE_FINGERPRINT_KIND),
    observed_by: z.literal(STATE_FINGERPRINT_OBSERVER),
    task_id: NON_EMPTY_STRING,
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

export type StateFingerprintComponent = z.infer<typeof STATE_FINGERPRINT_COMPONENT_ZOD_SCHEMA>;
export type StateFingerprint = z.infer<typeof STATE_FINGERPRINT_ZOD_SCHEMA>;

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

export type StateFingerprintInput = {
  task_id: string;
  components: Record<StateFingerprintComponentName, StateFingerprintComponentInput>;
};

export const STATE_FINGERPRINT_POLICY_ZOD_SCHEMA = z
  .object({
    required_components: z.array(z.enum(STATE_FINGERPRINT_COMPONENT_NAMES)).readonly(),
    provider: z
      .object({
        required: z.boolean(),
        unavailable: z.enum(["reject", "allow_if_unchanged"]),
      })
      .strict(),
  })
  .strict();

export type StateFingerprintPolicy = z.infer<typeof STATE_FINGERPRINT_POLICY_ZOD_SCHEMA>;

export type StateFingerprintChange = {
  component: StateFingerprintComponentName;
  expected_state: StateFingerprintComponent["state"];
  current_state: StateFingerprintComponent["state"];
  expected_digest: string;
  current_digest: string;
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
  unavailable_required_components: StateFingerprintComponentName[];
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
  components: readonly StateFingerprintComponentName[],
): StateFingerprintComponentName[] {
  const selected = new Set(components);
  return STATE_FINGERPRINT_COMPONENT_NAMES.filter((name) => selected.has(name));
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

function fingerprintDigest(
  fingerprint: Omit<StateFingerprint, "digest">,
): StateFingerprint["digest"] {
  return digestCanonical(fingerprint);
}

export function buildStateFingerprint(input: StateFingerprintInput): StateFingerprint {
  const taskId = input.task_id.trim();
  if (!taskId) throw new Error("State fingerprint task_id must be non-empty.");
  const components = Object.fromEntries(
    STATE_FINGERPRINT_COMPONENT_NAMES.map((name) => [name, buildComponent(input.components[name])]),
  ) as StateFingerprint["components"];
  const payload: Omit<StateFingerprint, "digest"> = {
    schema_version: STATE_FINGERPRINT_SCHEMA_VERSION,
    kind: STATE_FINGERPRINT_KIND,
    observed_by: STATE_FINGERPRINT_OBSERVER,
    task_id: taskId,
    components,
  };
  return validateStateFingerprint({
    ...payload,
    digest: fingerprintDigest(payload),
  });
}

export function validateStateFingerprint(input: unknown): StateFingerprint {
  const parsed = STATE_FINGERPRINT_ZOD_SCHEMA.parse(input);
  const { digest, ...payload } = parsed;
  const expected = fingerprintDigest(payload);
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
  const changed_components = STATE_FINGERPRINT_COMPONENT_NAMES.flatMap((component) => {
    const expectedComponent = expected.components[component];
    const currentComponent = current.components[component];
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
  if (
    expected.task_id !== current.task_id &&
    !changed_components.some((entry) => entry.component === "task")
  ) {
    changed_components.unshift({
      component: "task",
      expected_state: expected.components.task.state,
      current_state: current.components.task.state,
      expected_digest: expected.components.task.digest,
      current_digest: current.components.task.digest,
    });
  }
  const unavailable_required_components = normalizeRequiredComponents(
    policy.required_components,
  ).filter((component) => current.components[component].state !== "present");
  const base = {
    expected_digest: expected.digest,
    current_digest: current.digest,
    changed_components,
    unavailable_required_components,
    provider_state: current.components.provider.state,
  };
  if (changed_components.length > 0 || expected.digest !== current.digest) {
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
  if (current.components.provider.state === "missing" && policy.provider.required) {
    return {
      ...base,
      status: "blocked",
      reason_code: "state_fingerprint_provider_unavailable",
    };
  }
  if (current.components.provider.state === "unavailable") {
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
