import { describe, expect, it, vi } from "vitest";

import {
  STATE_FINGERPRINT_COMPONENT_NAMES,
  assertStateFingerprintPrecondition,
  buildStateFingerprint,
  executePreparedOperation,
  validateStateFingerprintPolicy,
  type StateFingerprintComponentName,
  type StateFingerprintInput,
  type StateFingerprintPolicy,
  type StateFingerprintPreconditionError,
} from "./state-fingerprint.js";

const REQUIRED_COMPONENTS = [
  "task",
  "git",
  "backend_projection",
  "policy",
  "blueprint",
  "authority",
] as const satisfies readonly StateFingerprintComponentName[];

const POLICY: StateFingerprintPolicy = {
  required_components: REQUIRED_COMPONENTS,
  provider: {
    required: false,
    unavailable: "allow_if_unchanged",
    reject_reason_codes: ["provider_projection_stale"],
  },
};

function input(): StateFingerprintInput {
  return {
    task_id: "T-1",
    components: {
      task: { state: "present", source: "task_backend", value: { id: "T-1", revision: 3 } },
      git: {
        state: "present",
        source: "git_snapshot",
        value: { head: "a".repeat(40), worktree: "sha256:git" },
      },
      backend_projection: {
        state: "present",
        source: "task_backend",
        value: { backend_id: "local", revision: 3 },
      },
      policy: {
        state: "present",
        source: "policy_runtime",
        value: { modules: ["security.must.md"] },
      },
      blueprint: {
        state: "present",
        source: "blueprint_resolver",
        value: { id: "code.branch_pr", version: 1 },
      },
      knowledge: {
        state: "missing",
        source: "knowledge_projection",
        reason_code: "knowledge_projection_not_resolved",
      },
      provider: {
        state: "unavailable",
        source: "provider_observation",
        reason_code: "provider_truth_not_requested",
      },
      authority: {
        state: "present",
        source: "authority_runtime",
        value: { sandbox: "workspace-write", writable_roots: ["."] },
      },
    },
  };
}

describe("StateFingerprint", () => {
  it("is stable for semantically identical canonical state", () => {
    const first = buildStateFingerprint(input());
    const reordered = input();
    reordered.components.backend_projection = {
      state: "present",
      source: "task_backend",
      value: { revision: 3, backend_id: "local" },
    };
    const second = buildStateFingerprint(reordered);

    expect(second).toEqual(first);
    expect(first.digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    for (const component of STATE_FINGERPRINT_COMPONENT_NAMES) {
      expect(first.components[component].digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    }
  });

  it.each(STATE_FINGERPRINT_COMPONENT_NAMES)(
    "isolates a %s mutation and rejects the prepared operation as stale",
    async (component) => {
      const expected = buildStateFingerprint(input());
      const changedInput = input();
      changedInput.components[component] = {
        state: "present",
        source: `${component}_fixture`,
        value: { changed: component },
      };
      const current = buildStateFingerprint(changedInput);
      const changedDigests = STATE_FINGERPRINT_COMPONENT_NAMES.filter(
        (name) => expected.components[name].digest !== current.components[name].digest,
      );
      expect(changedDigests).toEqual([component]);

      const apply = vi.fn(() => Promise.resolve("applied"));
      await expect(
        executePreparedOperation({
          prepared: {
            operation: { id: "op-1" },
            precondition_fingerprint: expected,
            precondition_policy: POLICY,
          },
          capture_state: () => Promise.resolve(current),
          apply,
        }),
      ).rejects.toMatchObject({
        reason_code: "state_fingerprint_stale",
        diagnostic: {
          changed_components: [expect.objectContaining({ component })],
        },
      });
      expect(apply).not.toHaveBeenCalled();
    },
  );

  it("records bounded provider uncertainty and lets policy decide execution", () => {
    const fingerprint = buildStateFingerprint(input());
    expect(
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: POLICY,
      }),
    ).toMatchObject({
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
      provider_state: "unavailable",
    });

    expect(() =>
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: {
          ...POLICY,
          provider: { required: false, unavailable: "reject" },
        },
      }),
    ).toThrowError(
      expect.objectContaining<Partial<StateFingerprintPreconditionError>>({
        reason_code: "state_fingerprint_provider_unavailable",
      }),
    );
  });

  it("accepts a legacy policy without reason-specific provider rejection", () => {
    const fingerprint = buildStateFingerprint(input());
    const legacyPolicy = validateStateFingerprintPolicy({
      required_components: REQUIRED_COMPONENTS,
      provider: {
        required: false,
        unavailable: "allow_if_unchanged",
      },
    });

    expect(
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: legacyPolicy,
      }),
    ).toMatchObject({
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
    });
  });

  it("includes unavailable-component evidence in stale-state comparison", async () => {
    const expectedInput = input();
    expectedInput.components.provider = {
      state: "unavailable",
      source: "provider_observation",
      reason_code: "provider_projection_stale",
      evidence: { provider_revision: "provider-1", stale: true },
    };
    const currentInput = input();
    currentInput.components.provider = {
      state: "unavailable",
      source: "provider_observation",
      reason_code: "provider_projection_stale",
      evidence: { provider_revision: "provider-2", stale: true },
    };
    const expected = buildStateFingerprint(expectedInput);
    const current = buildStateFingerprint(currentInput);
    const apply = vi.fn(() => Promise.resolve("applied"));

    await expect(
      executePreparedOperation({
        prepared: {
          operation: { id: "op-provider-stale-evidence" },
          precondition_fingerprint: expected,
          precondition_policy: POLICY,
        },
        capture_state: () => Promise.resolve(current),
        apply,
      }),
    ).rejects.toMatchObject({
      reason_code: "state_fingerprint_stale",
      diagnostic: {
        changed_components: [expect.objectContaining({ component: "provider" })],
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("rejects unchanged provider evidence when the unavailable reason is fail-closed", async () => {
    const staleInput = input();
    staleInput.components.provider = {
      state: "unavailable",
      source: "provider_observation",
      reason_code: "provider_projection_stale",
      evidence: { provider_revision: "provider-1", stale: true },
    };
    const fingerprint = buildStateFingerprint(staleInput);
    const apply = vi.fn(() => Promise.resolve("applied"));

    await expect(
      executePreparedOperation({
        prepared: {
          operation: { id: "op-provider-explicitly-stale" },
          precondition_fingerprint: fingerprint,
          precondition_policy: POLICY,
        },
        capture_state: () => Promise.resolve(fingerprint),
        apply,
      }),
    ).rejects.toMatchObject({
      reason_code: "state_fingerprint_provider_unavailable",
      diagnostic: {
        status: "blocked",
        provider_state: "unavailable",
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("does not invoke the effect when provider truth is unavailable under fail-closed policy", async () => {
    const fingerprint = buildStateFingerprint(input());
    const apply = vi.fn(() => Promise.resolve("applied"));

    await expect(
      executePreparedOperation({
        prepared: {
          operation: { id: "op-provider" },
          precondition_fingerprint: fingerprint,
          precondition_policy: {
            ...POLICY,
            provider: { required: false, unavailable: "reject" },
          },
        },
        capture_state: () => Promise.resolve(fingerprint),
        apply,
      }),
    ).rejects.toMatchObject({
      reason_code: "state_fingerprint_provider_unavailable",
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("rejects an invalid runtime policy before invoking the effect", async () => {
    const fingerprint = buildStateFingerprint(input());
    const invalidPolicy = {
      ...POLICY,
      provider: { required: false, unavailable: "permit" },
    } as unknown as StateFingerprintPolicy;
    const apply = vi.fn(() => Promise.resolve("applied"));

    expect(() => validateStateFingerprintPolicy(invalidPolicy)).toThrow();
    await expect(
      executePreparedOperation({
        prepared: {
          operation: { id: "op-invalid-policy" },
          precondition_fingerprint: fingerprint,
          precondition_policy: invalidPolicy,
        },
        capture_state: () => Promise.resolve(fingerprint),
        apply,
      }),
    ).rejects.toThrow();
    expect(apply).not.toHaveBeenCalled();
  });

  it("fails closed when a required component is explicitly missing", () => {
    const missingInput = input();
    missingInput.components.blueprint = {
      state: "missing",
      source: "blueprint_resolver",
      reason_code: "blueprint_not_resolved",
    };
    const fingerprint = buildStateFingerprint(missingInput);

    expect(() =>
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: POLICY,
      }),
    ).toThrowError(
      expect.objectContaining<Partial<StateFingerprintPreconditionError>>({
        reason_code: "state_fingerprint_required_component_unavailable",
      }),
    );
  });

  it("attaches before and after fingerprints to an applied result", async () => {
    const before = buildStateFingerprint(input());
    const afterInput = input();
    afterInput.components.task = {
      state: "present",
      source: "task_backend",
      value: { id: "T-1", revision: 4 },
    };
    const after = buildStateFingerprint(afterInput);
    const states = [before, after];

    const result = await executePreparedOperation({
      prepared: {
        operation: { id: "op-1" },
        precondition_fingerprint: before,
        precondition_policy: POLICY,
      },
      capture_state: () => Promise.resolve(states.shift() ?? after),
      apply: (operation) => Promise.resolve({ operation_id: operation.id, applied: true }),
    });

    expect(result).toMatchObject({
      result: { operation_id: "op-1", applied: true },
      precondition_fingerprint: before,
      state_before: before,
      state_after: after,
      precondition: { status: "fresh_with_bounded_uncertainty" },
    });
  });
});
