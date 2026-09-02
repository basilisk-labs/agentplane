import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import {
  authorityBindsCurrentState,
  compareExecutionAuthority,
  projectionCannotAuthorize,
  validateWorkItemDefinitions,
} from "./invariants.js";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import * as dispatchFixtures from "./kernel.test-fixtures.js";
import type {
  ExecutionAuthority,
  ExternalEffect,
  PlanRecord,
  TaskAggregate,
  TaskCommand,
} from "./model.js";

const fingerprint = kernelDigest("state");
const policyDigest = kernelDigest("policy");
const requirements = {
  scope_roots: [],
  repository_effects: [],
  external_effects: [],
  capabilities: [],
  resources: [],
};

function parentAuthority(overrides: Partial<ExecutionAuthority> = {}): ExecutionAuthority {
  return {
    digest: kernelDigest("parent-authority"),
    task_id: "task-1",
    plan_revision: 2,
    plan_digest: kernelDigest("plan-2"),
    work_item_id: null,
    repository_identity: kernelDigest("repository"),
    repository_fingerprint: fingerprint,
    scope_roots: ["packages/core"],
    repository_effects: ["source_code", "tests"],
    external_effects: ["provider_read", "provider_write"],
    capabilities: ["repository_write", "provider_read"],
    resources: ["workspace", "provider"],
    validation_requirements: ["focused", "full"],
    policy_digests: [policyDigest],
    completion_requirements: ["verified", "integrated"],
    risk: {
      requirements: "material",
      implementation: "material",
      reversibility: "irreversible",
    },
    provenance: {
      kind: "USER",
      actor_id: "user-1",
      evidence_digest: kernelDigest("user-decision"),
      parent_authority_digest: null,
    },
    expires_at: "2026-09-01T00:00:00.000Z",
    ...overrides,
  };
}

function childAuthority(
  parent: ExecutionAuthority,
  overrides: Partial<ExecutionAuthority> = {},
): ExecutionAuthority {
  return {
    ...parent,
    digest: kernelDigest("child-authority"),
    work_item_id: "kernel",
    scope_roots: ["packages/core/src/tasks/task-kernel"],
    repository_effects: ["source_code"],
    external_effects: ["provider_read"],
    capabilities: ["repository_write"],
    resources: ["workspace"],
    validation_requirements: ["focused"],
    completion_requirements: ["verified"],
    risk: {
      requirements: "bounded",
      implementation: "bounded",
      reversibility: "reversible",
    },
    provenance: {
      kind: "DELEGATED",
      actor_id: "agent-1",
      evidence_digest: parent.provenance.evidence_digest,
      parent_authority_digest: parent.digest,
    },
    expires_at: "2026-08-31T00:00:00.000Z",
    ...overrides,
  };
}

function approvedPlan(): PlanRecord {
  return {
    revision: 2,
    digest: kernelDigest("plan-2"),
    state: "APPROVED",
    approval_actor_id: "user-1",
    approval_evidence_digest: kernelDigest("user-decision"),
    work_items: [
      {
        id: "kernel",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["kernel-source"],
        execution_requirements: requirements,
        optional: false,
      },
    ],
  };
}

function aggregate(effects: readonly ExternalEffect[] = []): TaskAggregate {
  return {
    schema_version: 1,
    id: "task-1",
    revision: 3,
    state: effects.some((effect) => effect.state === "IN_DOUBT") ? "EFFECT_IN_DOUBT" : "ACTIVE",
    intent_digest: kernelDigest("intent"),
    current_plan: approvedPlan(),
    plan_history: [],
    work_items: {},
    final_validation: null,
    effects,
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
}

describe("canonical task kernel invariants", () => {
  it("binds a proposed plan to its complete definitions and semantic contracts", () => {
    const { aggregate, plan, input, fingerprint } = dispatchFixtures;
    const state = aggregate({ state: "PLANNING", current_plan: null, work_items: {} });
    const definitions = plan.work_items.map((item) => ({
      ...item,
      contract_digest: kernelDigest({ objective: "Implement", acceptance: ["verified"] }),
    }));
    const proposal = {
      ...plan,
      state: "PROPOSED" as const,
      approval_actor_id: null,
      approval_evidence_digest: null,
      work_items: definitions,
      digest: kernelDigest({ revision: 1, work_items: definitions }),
    };
    const command: TaskCommand = {
      kind: "propose_plan",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      plan: proposal,
    };
    expect(reduceTaskCommand(input(state, command))).toMatchObject({
      kind: "accepted",
      aggregate: { state: "AWAITING_PLAN_APPROVAL", current_plan: proposal },
    });
    const before = JSON.stringify(state);
    expect(
      reduceTaskCommand(
        input(state, {
          ...command,
          plan: {
            ...proposal,
            work_items: definitions.map((item) => ({
              ...item,
              contract_digest: kernelDigest({ objective: "Changed", acceptance: [] }),
            })),
          },
        }),
      ),
    ).toMatchObject({ kind: "rejected", code: "PLAN_DIGEST_MISMATCH" });
    expect(
      reduceTaskCommand(
        input(state, {
          ...command,
          plan: { ...proposal, revision: 3 },
        }),
      ),
    ).toMatchObject({ kind: "rejected", code: "PLAN_REVISION_MISMATCH" });
    expect(JSON.stringify(state)).toBe(before);
  });

  it("accepts only equal or narrower derived authority", () => {
    const parent = parentAuthority();
    expect(compareExecutionAuthority(parent, childAuthority(parent))).toEqual({ ok: true });

    const cases: readonly [string, ExecutionAuthority][] = [
      ["task", childAuthority(parent, { task_id: "other" })],
      ["plan", childAuthority(parent, { plan_revision: 3 })],
      ["repository", childAuthority(parent, { repository_identity: kernelDigest("other") })],
      [
        "state_fingerprint",
        childAuthority(parent, { repository_fingerprint: kernelDigest("old") }),
      ],
      ["scope", childAuthority(parent, { scope_roots: ["packages/agentplane"] })],
      ["repository_effects", childAuthority(parent, { repository_effects: ["publish"] })],
      ["external_effects", childAuthority(parent, { external_effects: ["deploy"] })],
      ["capabilities", childAuthority(parent, { capabilities: ["publish"] })],
      ["resources", childAuthority(parent, { resources: ["registry"] })],
      ["validation", childAuthority(parent, { validation_requirements: ["hosted"] })],
      ["policy", childAuthority(parent, { policy_digests: [kernelDigest("other-policy")] })],
      ["completion", childAuthority(parent, { completion_requirements: ["published"] })],
      ["expiry", childAuthority(parent, { expires_at: "2026-09-02T00:00:00.000Z" })],
      [
        "provenance",
        childAuthority(parent, {
          provenance: {
            kind: "USER",
            actor_id: "agent-1",
            evidence_digest: kernelDigest("invented-user-decision"),
            parent_authority_digest: parent.digest,
          },
        }),
      ],
    ];
    for (const [violation, child] of cases) {
      const comparison = compareExecutionAuthority(parent, child);
      expect(comparison.ok).toBe(false);
      if (!comparison.ok) expect(comparison.violations).toContain(violation);
    }

    const boundedParent = parentAuthority({
      risk: {
        requirements: "bounded",
        implementation: "bounded",
        reversibility: "reversible",
      },
    });
    const widenedRisk = compareExecutionAuthority(
      boundedParent,
      childAuthority(boundedParent, {
        risk: {
          requirements: "material",
          implementation: "material",
          reversibility: "irreversible",
        },
      }),
    );
    expect(widenedRisk.ok).toBe(false);
    if (!widenedRisk.ok) {
      expect(widenedRisk.violations).toContain("risk");
      expect(widenedRisk.violations).toContain("reversibility");
    }
  });

  it("binds runtime authority to the exact task, plan, state, and WorkItem", () => {
    const authority = parentAuthority();
    expect(
      authorityBindsCurrentState(authority, {
        task_id: "task-1",
        plan_revision: 2,
        plan_digest: kernelDigest("plan-2"),
        repository_fingerprint: fingerprint,
        work_item_id: "kernel",
      }),
    ).toBe(true);
    expect(
      authorityBindsCurrentState(authority, {
        task_id: "task-1",
        plan_revision: 3,
        plan_digest: kernelDigest("plan-3"),
        repository_fingerprint: fingerprint,
        work_item_id: "kernel",
      }),
    ).toBe(false);
  });

  it.each([
    "packages/core/../agentplane",
    "packages/core/src/../../outside",
    "packages\\core\\..\\agentplane",
    "packages/core/./src",
    "packages/core//src",
    "packages/core/invalid\0path",
  ])("rejects ambiguous or escaping authority path %s", (scope) => {
    const parent = parentAuthority();
    expect(
      compareExecutionAuthority(parent, childAuthority(parent, { scope_roots: [scope] })),
    ).toMatchObject({ ok: false, violations: expect.arrayContaining(["scope"]) as unknown });
    const malformedParent = parentAuthority({ scope_roots: [scope] });
    expect(
      compareExecutionAuthority(
        malformedParent,
        childAuthority(malformedParent, { scope_roots: [scope] }),
      ).ok,
    ).toBe(false);
  });

  it.each([
    [".", "packages/core/src", true],
    [".", "/packages/core/src", false],
    [".", "C:/packages/core/src", false],
    ["/", "/packages/core/src", true],
    ["/", "packages/core/src", false],
    ["packages/core/", "packages\\core\\src", true],
    ["packages/core", "packages/core-other", false],
    ["", "packages/core", false],
  ] as const)("compares canonical scope %s against %s", (root, scope, allowed) => {
    const parent = parentAuthority({ scope_roots: [root] });
    expect(
      compareExecutionAuthority(parent, childAuthority(parent, { scope_roots: [scope] })).ok,
    ).toBe(allowed);
  });

  it("compares expiry instants across offsets and rejects invalid dates", () => {
    const parent = parentAuthority({ expires_at: "2026-09-01T00:00:00.000Z" });
    expect(
      compareExecutionAuthority(
        parent,
        childAuthority(parent, { expires_at: "2026-09-01T02:00:00.000+03:00" }),
      ).ok,
    ).toBe(true);
    expect(
      compareExecutionAuthority(
        parent,
        childAuthority(parent, { expires_at: "2026-08-31T23:30:00.000-02:00" }),
      ),
    ).toMatchObject({ ok: false, violations: expect.arrayContaining(["expiry"]) as unknown });
    const unbounded = parentAuthority({ expires_at: null });
    expect(
      compareExecutionAuthority(unbounded, childAuthority(unbounded, { expires_at: "not-a-date" }))
        .ok,
    ).toBe(false);
  });

  it("retains the parent user-decision evidence in delegated authority", () => {
    const parent = parentAuthority();
    const child = childAuthority(parent);
    expect(
      compareExecutionAuthority(parent, {
        ...child,
        provenance: {
          ...child.provenance,
          evidence_digest: kernelDigest("unrelated-user-decision"),
        },
      }),
    ).toMatchObject({ ok: false, violations: expect.arrayContaining(["provenance"]) as unknown });
  });

  it("rejects duplicate, missing, and cyclic WorkItem graph definitions", () => {
    expect(
      validateWorkItemDefinitions([
        {
          id: "a",
          depends_on: ["b"],
          required_inputs: [],
          expected_outputs: ["same", "same"],
          execution_requirements: requirements,
          optional: false,
        },
        {
          id: "b",
          depends_on: ["a", "missing"],
          required_inputs: [],
          expected_outputs: ["b-output"],
          execution_requirements: requirements,
          optional: false,
        },
        {
          id: "a",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["a-output"],
          execution_requirements: requirements,
          optional: false,
        },
        {
          id: "c",
          depends_on: ["d"],
          required_inputs: [],
          expected_outputs: ["c-output"],
          execution_requirements: requirements,
          optional: false,
        },
        {
          id: "d",
          depends_on: ["c"],
          required_inputs: [],
          expected_outputs: ["d-output"],
          execution_requirements: requirements,
          optional: false,
        },
      ]),
    ).toEqual(
      expect.arrayContaining([
        "duplicate:a",
        "duplicate_output:a",
        "missing_dependency:b:missing",
        "dependency_cycle",
      ]),
    );
  });

  it("validates required input producers and detects input-only cycles", () => {
    const a = {
      id: "a",
      depends_on: [],
      required_inputs: [],
      expected_outputs: ["out-a"],
      execution_requirements: requirements,
      optional: false,
    };
    const b = { ...a, id: "b", required_inputs: ["out-a"], expected_outputs: ["out-b"] };
    expect(validateWorkItemDefinitions([a, b])).toEqual([]);
    expect(validateWorkItemDefinitions([a, { ...b, required_inputs: ["unknown"] }])).toContain(
      "invalid_input:b:unknown",
    );
    expect(validateWorkItemDefinitions([a, { ...b, required_inputs: ["out-b"] }])).toContain(
      "self_input:b:out-b",
    );
    expect(validateWorkItemDefinitions([a, b, { ...a, id: "duplicate-producer" }])).toContain(
      "invalid_input:b:out-a",
    );
    expect(validateWorkItemDefinitions([{ ...a, required_inputs: ["out-b"] }, b])).toContain(
      "dependency_cycle",
    );
  });

  it("blocks unrelated mutations while a non-idempotent effect is uncertain", () => {
    const uncertain: ExternalEffect = {
      id: "provider-effect",
      kind: "provider_write",
      execution_requirements: requirements,
      idempotency_key: "provider-key",
      state: "IN_DOUBT",
      request_digest: kernelDigest("request"),
      provider_receipt_digest: null,
      observed_state_digest: null,
    };
    const state = aggregate([uncertain]);
    const authority = parentAuthority();
    expect(
      reduceTaskCommand({
        aggregate: state,
        command: {
          kind: "complete_task",
          task_id: state.id,
          expected_task_revision: state.revision,
          expected_state_fingerprint: fingerprint,
        },
        actor: { id: "agent-1", kind: "AGENT", transport: "managed", capabilities: [] },
        authority,
        repository_fingerprint: fingerprint,
        occurred_at: "2026-08-30T00:00:00.000Z",
        mutation_id: "mutation-1",
      }),
    ).toMatchObject({
      kind: "rejected",
      code: "EFFECT_RECONCILIATION_REQUIRED",
      required_action: "reconcile_effect",
    });
  });

  it("makes every compatibility projection explicitly non-authoritative", () => {
    for (const source of [
      "document",
      "legacy_status",
      "verification_text",
      "pr_metadata",
      "provider_summary",
    ] as const) {
      expect(projectionCannotAuthorize(source)).toEqual({
        kind: "rejected",
        code: "PROJECTION_CANNOT_AUTHORIZE",
        facts: [source],
        required_action: "supply_execution_authority",
      });
    }
  });

  it("keeps production kernel modules outside capability and compatibility boundaries", () => {
    const sources = ["model.ts", "invariants.ts", "kernel.ts", "index.ts"]
      .map((name) => readFileSync(new URL(name, import.meta.url), "utf8"))
      .join("\n");
    for (const forbidden of [
      /from ["']node:(?:fs|process|child_process|os|timers)/u,
      /from ["'][^"']*(?:task-centric|compatibility|adapter|backend|provider|cli|task-doc)/u,
      /\b(?:randomUUID|Math\.random|Date\.now|process\.env)\b/u,
    ]) {
      expect(sources).not.toMatch(forbidden);
    }
  });
});

describe("durable effect admission invariants", () => {
  const { aggregate, effect, fingerprint, input, authority, transitionCommand } = dispatchFixtures;
  it("records a durable effect start before dispatch and replays only its existing receipt", () => {
    const state = aggregate({ effects: [effect("merge", "PREPARED")] });
    const command: TaskCommand = {
      kind: "begin_effect",
      task_id: state.id,
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
      effect_id: "merge",
    };
    const start = {
      ...input(state, command),
      authority: {
        ...authority,
        external_effects: ["pr.merge"],
        capabilities: ["provider_write"],
        resources: ["pull:1"],
      },
    };
    const result = reduceTaskCommand(start);
    expect(result).toMatchObject({
      kind: "accepted",
      aggregate: { effects: [{ state: "PENDING" }] },
    });
    if (result.kind !== "accepted") throw new Error("Missing durable start");
    expect(result.events.map((event) => event.kind)).toEqual(["effect_started"]);
    expect(result.receipts[0]!.effect_ids).toEqual(["merge"]);
    expect(reduceTaskCommand({ ...start, aggregate: result.aggregate })).toMatchObject({
      kind: "accepted",
      events: [],
      receipts: result.receipts,
    });
    expect(
      reduceTaskCommand({
        ...start,
        aggregate: result.aggregate,
        mutation_id: "another-start",
        command: { ...command, expected_task_revision: result.aggregate.revision },
      }),
    ).toMatchObject({ kind: "rejected", code: "EFFECT_RECONCILIATION_REQUIRED" });
  });

  it("requires fresh authority for the durable effect start", () => {
    const state = aggregate({ effects: [effect("merge", "PREPARED")] });
    const command: TaskCommand = {
      kind: "begin_effect",
      task_id: state.id,
      effect_id: "merge",
      expected_task_revision: state.revision,
      expected_state_fingerprint: fingerprint,
    };
    const granted = {
      ...authority,
      external_effects: ["pr.merge"],
      capabilities: ["provider_write"],
      resources: ["pull:1"],
    };
    for (const key of ["external_effects", "capabilities", "resources"] as const) {
      expect(
        reduceTaskCommand({ ...input(state, command), authority: { ...granted, [key]: [] } }),
      ).toMatchObject({
        kind: "rejected",
        code: "AUTHORITY_SCOPE_EXCEEDED",
      });
    }
    for (const effectState of [
      "APPLIED",
      "NOT_APPLIED",
      "RECONCILED",
      "SUPERSEDED",
      "IN_DOUBT",
      "PENDING",
    ] as const) {
      expect(
        reduceTaskCommand({
          ...input(aggregate({ effects: [effect("merge", effectState)] }), command),
          authority: granted,
        }),
      ).toMatchObject({
        kind: "rejected",
        code: "EFFECT_RECONCILIATION_REQUIRED",
      });
    }
    const pending = aggregate({ effects: [effect("merge", "PENDING")] });
    expect(reduceTaskCommand(input(pending, transitionCommand(pending, "claim")))).toMatchObject({
      kind: "rejected",
      code: "EFFECT_RECONCILIATION_REQUIRED",
    });
  });
});
