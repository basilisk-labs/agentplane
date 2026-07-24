import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  EXECUTION_RECEIPT_PROVENANCE,
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  listExecutionReceiptSchemaErrors,
  renderExecutionReceiptSchemaJson,
  validateExecutionReceipt,
} from "./execution-receipt.js";

describe("execution receipt contract", () => {
  it("accepts the generated v1 fixture", async () => {
    const fixturePath = path.join(
      process.cwd(),
      "schemas",
      "examples",
      "execution-receipt-v1.valid.json",
    );
    const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as unknown;

    expect(validateExecutionReceipt(fixture)).toEqual(EXECUTION_RECEIPT_V1_VALID_FIXTURE);
  });

  it("accepts the generated v2 fixture", async () => {
    const fixturePath = path.join(
      process.cwd(),
      "schemas",
      "examples",
      "execution-receipt-v2.valid.json",
    );
    const fixture = JSON.parse(await readFile(fixturePath, "utf8")) as unknown;

    expect(validateExecutionReceipt(fixture)).toEqual(EXECUTION_RECEIPT_V2_VALID_FIXTURE);
  });

  it.each([
    ["agent_reported provenance", ["process", "provenance"], "agent_reported"],
    ["unknown process outcome", ["process", "outcome"], "completed"],
    ["invalid artifact digest", ["artifacts", 0, "sha256"], "sha256:not-a-digest"],
    ["unknown success outcome", ["success_policy", "outcome"], "success"],
    ["unknown requested sandbox", ["scope_evaluation", "sandbox", "requested"], "host-write"],
    ["unknown effective sandbox", ["scope_evaluation", "sandbox", "effective"], "host-write"],
  ])("rejects %s", (_label, pathSegments, value) => {
    const candidate = structuredClone(EXECUTION_RECEIPT_V2_VALID_FIXTURE) as Record<
      string,
      unknown
    >;
    let target: Record<string | number, unknown> = candidate;
    for (const segment of pathSegments.slice(0, -1)) {
      target = target[segment] as Record<string | number, unknown>;
    }
    target[pathSegments.at(-1)!] = value;

    expect(listExecutionReceiptSchemaErrors(candidate)).not.toEqual([]);
  });

  it("rejects unexpected fields at every durable boundary", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        semantic_result: { provenance: "agent_reported" },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          claimed_checks: [],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        git: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.git,
          delta: {
            ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.git.delta,
            agent_reported_paths: [],
          },
        },
      }),
    ).not.toEqual([]);
  });

  it("enforces state-specific observation contracts", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        artifacts: [
          {
            provenance: EXECUTION_RECEIPT_PROVENANCE,
            path: "missing.txt",
            required: true,
            state: "missing",
            bytes: 12,
            sha256: `sha256:${"1".repeat(64)}`,
          },
        ],
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        git: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          state: "unavailable",
          before: EXECUTION_RECEIPT_V2_VALID_FIXTURE.git.before,
          after: null,
          delta: null,
          excluded_paths: [],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        collection: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          status: "complete",
          errors: ["Git observer failed."],
        },
      }),
    ).not.toEqual([]);
  });

  it("rejects observed success without complete observed evidence", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          exit_code: 7,
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        checks: [
          {
            ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks[0],
            status: "failed",
            exit_code: 1,
          },
        ],
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          process_tree: {
            ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process.process_tree,
            containment_state: "limited",
            containment_limitation:
              "POSIX process-group cleanup cannot observe descendants in a new session.",
          },
        },
      }),
    ).not.toEqual([]);
  });

  it("accepts limited process lifetime with a required native filesystem-effect boundary", () => {
    const candidate = {
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      process: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
        process_tree: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process.process_tree,
          containment_state: "limited",
          containment_limitation:
            "POSIX process-group cleanup cannot observe descendants in a new session.",
        },
      },
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          requested: "read-only",
          effective: "read-only",
          role: "EVALUATOR",
        },
        mutation_scope: "none",
        writable_roots: [],
      },
      checks: [
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks.map((check) =>
          check.id === "runner.process_containment"
            ? {
                ...check,
                required: false,
                status: "not_run",
                details:
                  "Descendant lifetime is not bounded; filesystem effects are checked separately.",
              }
            : check,
        ),
        {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          id: "runner.sandbox.filesystem_effects_enforced",
          required: true,
          status: "passed",
          details:
            "The native sandbox confines descendant filesystem effects to the workspace boundary.",
        },
      ],
    };

    expect(validateExecutionReceipt(candidate).success_policy.outcome).toBe("observed_success");
  });

  it("accepts unsupported process-group cleanup with an exact read-only effect boundary", () => {
    const candidate = {
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      process: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
        process_tree: {
          scope: "direct_child_only",
          group_id: null,
          cleanup_state: "unsupported",
          terminate_sent_at: null,
          kill_sent_at: null,
          completed_at: EXECUTION_RECEIPT_V2_VALID_FIXTURE.process.ended_at,
          residual_alive: null,
          error: "process-group cleanup is not supported on Windows",
          containment_state: "limited",
          containment_limitation:
            "Direct-child supervision on Windows does not provide bounded descendant containment.",
        },
      },
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          requested: "read-only",
          effective: "read-only",
          role: "EVALUATOR",
        },
        mutation_scope: "none",
        writable_roots: [],
      },
      checks: [
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks.map((check) =>
          check.id === "runner.process_containment"
            ? {
                ...check,
                required: false,
                status: "not_run",
                details:
                  "Descendant lifetime is not bounded; filesystem effects are checked separately.",
              }
            : check,
        ),
        {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          id: "runner.process_group_cleanup",
          required: false,
          status: "not_run",
          details: "Process-group cleanup is unsupported; read-only effects are checked.",
        },
        {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          id: "runner.sandbox.filesystem_effects_enforced",
          required: true,
          status: "passed",
          details: "The native read-only sandbox prevents descendant filesystem writes.",
        },
      ],
    };

    expect(validateExecutionReceipt(candidate).success_policy.outcome).toBe("observed_success");
  });

  it.each([
    ["workspace-write sandbox", EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox],
    [
      "advisory sandbox",
      {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
        effective: null,
        enforcement: "advisory",
        capability_level: "advisory",
        channel: "env",
      },
    ],
    [
      "danger sandbox",
      {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
        requested: "danger-full-access",
        effective: "danger-full-access",
        source: "cli_override",
        authority: {
          danger_full_access_authorized: true,
          provenance: "explicit_operator",
          source: "task run --allow-danger-full-access",
        },
      },
    ],
  ])("rejects limited lifetime with a forged effect check under %s", (_label, sandbox) => {
    const candidate = {
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      process: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
        process_tree: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process.process_tree,
          containment_state: "limited",
          containment_limitation:
            "POSIX process-group cleanup cannot observe descendants in a new session.",
        },
      },
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox,
      },
      checks: [
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks.map((check) =>
          check.id === "runner.process_containment"
            ? {
                ...check,
                required: false,
                status: "not_run",
              }
            : check,
        ),
        {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          id: "runner.sandbox.filesystem_effects_enforced",
          required: true,
          status: "passed",
          details: "forged effect boundary",
        },
      ],
    };

    expect(listExecutionReceiptSchemaErrors(candidate)).not.toEqual([]);
  });

  it.each([
    [
      "legacy not_evaluated scope",
      {
        provenance: EXECUTION_RECEIPT_PROVENANCE,
        state: "not_evaluated",
      },
    ],
    [
      "unverified scope",
      {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        state: "unverified",
        violations: [],
        limitations: ["The adapter could not enforce the requested sandbox."],
      },
    ],
  ])("rejects observed success with %s", (_label, scopeEvaluation) => {
    const errors = listExecutionReceiptSchemaErrors({
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      scope_evaluation: scopeEvaluation,
    });

    expect(errors).not.toEqual([]);
    expect(errors.join("\n").toLowerCase()).toContain(
      "observed_success requires a passed supervisor-owned scope evaluation",
    );
  });

  it("rejects danger scope without explicit authority provenance", () => {
    const errors = listExecutionReceiptSchemaErrors({
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          requested: "danger-full-access",
          effective: "danger-full-access",
          source: "recipe_run_profile",
          authority: {
            danger_full_access_authorized: false,
            provenance: null,
            source: null,
          },
        },
      },
    });

    expect(errors).not.toEqual([]);
    expect(errors.join("\n").toLowerCase()).toContain(
      "danger sandbox requires explicit operator authority provenance",
    );
  });

  it.each([
    [
      "advisory",
      {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
        effective: null,
        enforcement: "advisory",
        capability_level: "advisory",
        channel: "env",
      },
    ],
    [
      "unsupported",
      {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
        effective: null,
        enforcement: "unsupported",
        capability_level: "unsupported",
        channel: "none",
      },
    ],
  ])("rejects a passed scope evaluation under an %s sandbox downgrade", (_label, sandbox) => {
    const errors = listExecutionReceiptSchemaErrors({
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox,
      },
      success_policy: {
        provenance: EXECUTION_RECEIPT_PROVENANCE,
        outcome: "unverified",
        reasons: ["The sandbox was not enforced."],
      },
    });

    expect(errors).not.toEqual([]);
    expect(errors.join("\n").toLowerCase()).toContain(
      "passed scope evaluation requires a coherent native or wrapper enforced sandbox",
    );
  });

  it("rejects observed success under an advisory sandbox with bounded process containment", () => {
    const errors = listExecutionReceiptSchemaErrors({
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          effective: null,
          enforcement: "advisory",
          capability_level: "advisory",
          channel: "env",
        },
      },
    });

    expect(errors).not.toEqual([]);
    expect(errors.join("\n").toLowerCase()).toContain(
      "passed scope evaluation requires a coherent native or wrapper enforced sandbox",
    );
  });

  it("rejects observed success under explicitly authorized danger-full-access", () => {
    const errors = listExecutionReceiptSchemaErrors({
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          requested: "danger-full-access",
          effective: "danger-full-access",
          source: "cli_override",
          authority: {
            danger_full_access_authorized: true,
            provenance: "explicit_operator",
            source: "task run --allow-danger-full-access",
          },
        },
      },
    });

    expect(errors).not.toEqual([]);
    expect(errors.join("\n").toLowerCase()).toContain(
      "danger-full-access sandbox cannot produce a passed scope evaluation",
    );
  });

  it("accepts an authorized danger receipt that remains explicitly unverified", () => {
    const limitation =
      "Authorized danger-full-access leaves external writes outside repository observation.";
    const candidate = {
      ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
      checks: EXECUTION_RECEIPT_V2_VALID_FIXTURE.checks.map((check) =>
        check.id === "runner.scope.within_authority"
          ? {
              ...check,
              status: "not_run",
              details: limitation,
            }
          : check,
      ),
      scope_evaluation: {
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        state: "unverified",
        sandbox: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation.sandbox,
          requested: "danger-full-access",
          effective: "danger-full-access",
          source: "recipe_run_profile",
          authority: {
            danger_full_access_authorized: true,
            provenance: "explicit_operator",
            source: "task run --allow-danger-full-access",
          },
        },
        violations: [],
        limitations: [limitation],
      },
      success_policy: {
        provenance: EXECUTION_RECEIPT_PROVENANCE,
        outcome: "unverified",
        reasons: [limitation],
      },
    };

    const validated = validateExecutionReceipt(candidate);

    expect(validated.scope_evaluation).toMatchObject({
      state: "unverified",
      sandbox: {
        requested: "danger-full-access",
        effective: "danger-full-access",
        authority: {
          danger_full_access_authorized: true,
          provenance: "explicit_operator",
        },
      },
    });
    expect(validated.success_policy.outcome).toBe("unverified");
  });

  it("enforces process observation coherence", () => {
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          outcome: "timed_out",
          exit_code: 124,
          timeout_reason: null,
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process timed out."],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          started_at: "2026-07-23T11:00:00.000+01:00",
          ended_at: "2026-07-23T09:59:59.000Z",
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: null,
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by a signal."],
        },
      }),
    ).not.toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: "SIGKILL",
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by a signal."],
        },
      }),
    ).toEqual([]);
    expect(
      listExecutionReceiptSchemaErrors({
        ...EXECUTION_RECEIPT_V2_VALID_FIXTURE,
        process: {
          ...EXECUTION_RECEIPT_V2_VALID_FIXTURE.process,
          outcome: "signaled",
          exit_code: null,
          exit_signal: "SIGABRT",
        },
        success_policy: {
          provenance: EXECUTION_RECEIPT_PROVENANCE,
          outcome: "rejected",
          reasons: ["The process was terminated by SIGABRT."],
        },
      }),
    ).toEqual([]);
  });

  it("renders a strict public schema", () => {
    const rendered = JSON.parse(renderExecutionReceiptSchemaJson()) as {
      oneOf?: {
        additionalProperties?: boolean;
        required?: string[];
        properties?: {
          process?: { additionalProperties?: boolean };
          git?: { oneOf?: { additionalProperties?: boolean }[] };
          artifacts?: { items?: { oneOf?: { additionalProperties?: boolean }[] } };
          scope_evaluation?: {
            additionalProperties?: boolean;
            oneOf?: {
              additionalProperties?: boolean;
              properties?: {
                sandbox?: {
                  properties?: {
                    requested?: { enum?: string[] };
                    effective?: { anyOf?: { enum?: string[]; type?: string }[] };
                  };
                };
              };
            }[];
          };
          success_policy?: { oneOf?: { additionalProperties?: boolean }[] };
        };
      }[];
    };

    expect(rendered.oneOf).toHaveLength(2);
    for (const branch of rendered.oneOf ?? []) {
      expect(branch.additionalProperties).toBe(false);
      expect(branch.required).toEqual(
        expect.arrayContaining([
          "process",
          "git",
          "artifacts",
          "checks",
          "collection",
          "scope_evaluation",
          "success_policy",
        ]),
      );
      expect(branch.properties?.process?.additionalProperties).toBe(false);
      expect(
        branch.properties?.git?.oneOf?.every(
          (candidate) => candidate.additionalProperties === false,
        ),
      ).toBe(true);
      expect(
        branch.properties?.artifacts?.items?.oneOf?.every(
          (candidate) => candidate.additionalProperties === false,
        ),
      ).toBe(true);
      const scope = branch.properties?.scope_evaluation;
      expect(
        scope?.additionalProperties === false ||
          scope?.oneOf?.every((candidate) => candidate.additionalProperties === false),
      ).toBe(true);
      const sandboxSchemas = (scope?.oneOf ?? [])
        .map((candidate) => candidate.properties?.sandbox)
        .filter((candidate) => candidate !== undefined);
      for (const sandbox of sandboxSchemas) {
        expect(sandbox.properties?.requested?.enum).toEqual([
          "read-only",
          "workspace-write",
          "danger-full-access",
        ]);
        expect(
          sandbox.properties?.effective?.anyOf?.find((candidate) => candidate.type === "string")
            ?.enum,
        ).toEqual(["read-only", "workspace-write", "danger-full-access"]);
      }
      if (sandboxSchemas.length > 0) {
        expect(sandboxSchemas).toHaveLength(3);
      }
      expect(
        branch.properties?.success_policy?.oneOf?.every(
          (candidate) => candidate.additionalProperties === false,
        ),
      ).toBe(true);
    }
  });
});
