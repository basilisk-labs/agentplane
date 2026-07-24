import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  EXECUTION_RECEIPT_PROVENANCE,
  EXECUTION_RECEIPT_V2_VALID_FIXTURE,
  type ExecutionReceipt,
  type ExecutionReceiptScopeEvaluation,
} from "@agentplaneorg/core/schemas";
import { afterEach, describe, expect, it } from "vitest";

import { writeExecutionReceipt } from "./execution-receipt.js";
import { evaluateExecutionSuccessPolicy } from "./success-policy.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

function evaluateFixtureScope(scopeEvaluation: ExecutionReceiptScopeEvaluation) {
  const receipt = structuredClone(EXECUTION_RECEIPT_V2_VALID_FIXTURE) as ExecutionReceipt;
  return evaluateExecutionSuccessPolicy({
    process: receipt.process,
    git: receipt.git,
    artifacts: receipt.artifacts,
    checks: receipt.checks,
    collection: receipt.collection,
    scope_evaluation: scopeEvaluation,
  });
}

describe("runner execution receipt success policy", () => {
  it("allows observed success only after a passed scope evaluation", () => {
    expect(
      evaluateFixtureScope(
        structuredClone(
          EXECUTION_RECEIPT_V2_VALID_FIXTURE.scope_evaluation,
        ) as ExecutionReceiptScopeEvaluation,
      ),
    ).toEqual({
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      outcome: "observed_success",
      reasons: [],
    });
  });

  it("keeps legacy not_evaluated scope unverified", () => {
    expect(
      evaluateFixtureScope({
        provenance: EXECUTION_RECEIPT_PROVENANCE,
        state: "not_evaluated",
      }),
    ).toEqual({
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      outcome: "unverified",
      reasons: ["write scope was not evaluated"],
    });
  });

  it("keeps authorized danger scope unverified when external writes are unobservable", () => {
    const limitation =
      "Authorized danger-full-access leaves external writes outside repository observation.";
    const outcome = evaluateFixtureScope({
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      state: "unverified",
      sandbox: {
        requested: "danger-full-access",
        effective: "danger-full-access",
        source: "recipe_run_profile",
        role: "CODER",
        enforcement: "enforced",
        capability_level: "native",
        channel: "argv",
        authority: {
          danger_full_access_authorized: true,
          provenance: "explicit_operator",
          source: "task run --allow-danger-full-access",
        },
      },
      mutation_scope: "code",
      writable_roots: ["."],
      protected_paths: [".agentplane/policy", "AGENTS.md"],
      violations: [],
      limitations: [limitation],
    });

    expect(outcome).toEqual({
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      outcome: "unverified",
      reasons: [limitation],
    });
  });
});

describe("runner execution receipt persistence", () => {
  it("persists unverified without collapsing it into rejected", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-execution-receipt-"));
    tempRoots.push(root);
    const receipt = structuredClone(EXECUTION_RECEIPT_V2_VALID_FIXTURE) as ExecutionReceipt;
    receipt.git = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      state: "unavailable",
      before: null,
      after: null,
      delta: null,
      excluded_paths: [],
    };
    receipt.collection = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      status: "partial",
      errors: ["Git observation was unavailable."],
    };
    receipt.success_policy = {
      provenance: EXECUTION_RECEIPT_PROVENANCE,
      outcome: "unverified",
      reasons: ["Git observation is unavailable."],
    };

    const reference = await writeExecutionReceipt({
      receipt_path: path.join(root, "execution-receipt.json"),
      reference_path: "runs/run-1/execution-receipt.json",
      receipt,
    });

    expect(reference).toMatchObject({
      path: "runs/run-1/execution-receipt.json",
      verification_state: "unverified",
      observed_by: "agentplane",
    });
    expect(reference.sha256).toMatch(/^sha256:[0-9a-f]{64}$/u);
  });
});
