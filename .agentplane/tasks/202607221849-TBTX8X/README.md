---
id: "202607221849-TBTX8X"
title: "Prepare and apply typed evaluator results"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221846-YGWMA2"
  - "202607221848-VC4VVS"
  - "202607221849-NWVCAG"
tags:
  - "evaluator"
  - "milestone-alpha2"
  - "refactor"
  - "rf-12"
  - "rf-25"
  - "use-case"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T12:39:03.976Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T12:39:26.802Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T12:39:26.802Z"
doc_updated_by: "CODER"
description: "RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence."
sections:
  Summary: |-
    Prepare and apply typed evaluator results

    RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence.
  Scope: |-
    - In scope: EvaluatorWorkOrder preparation, existing EvaluatorSgrResult validation, typed in-process prepare/apply results, read-only authority, frozen evidence, staleness rejection, finding evidence refs, and compatibility recording facade.
    - Out of scope: launching/calibrating the EVALUATOR model episode, which is the next task.
  Plan: |-
    1. Prepare evaluator input from immutable acceptance, revision, SHA, observed receipt, diff, policy, blueprint, and knowledge refs.
    2. Return typed use-case data rather than reading/writing verdicts through CLI args/stdout.
    3. Validate EvaluatorSgrResult schema, evidence refs, uncertainty, and action recommendations.
    4. Apply only against the exact frozen fingerprint and reject evaluator attempts to mutate implementation.
    5. Preserve an explicit human-record compatibility path with provenance.
  Verify Steps: |-
    1. Prepare evaluator evidence for code, docs, metadata-only, and context tasks. Expected: frozen revision/SHA, actual diff/checks, acceptance, and semantic criteria are complete.
    2. Apply valid, stale, missing-evidence, and mutation-attempt results. Expected: only the valid read-only result changes quality state.
    3. Call the use cases in-process. Expected: no stdout capture or rendered shell command is required.
    4. Record a human verdict through compatibility mode. Expected: it is distinguishable from an EVALUATOR result.
    5. Run schema, evaluator, lifecycle, and type checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T12:39:50.579Z"
        authorityDigest: "sha256:df027ed543f52347e7a237be8829192cea39c4b4d16ee9964ec52910560e8033"
        digest: "sha256:4937debf03916ca4a673e407d6fe6f23f3cc9f340fa6de89388928c28b0a55b5"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:397cf7736ddd6cb72c1126f44b45e2649623d8e8d1576323f022699820808def"
    grants:
      -
        actor: "USER"
        digest: "sha256:df027ed543f52347e7a237be8829192cea39c4b4d16ee9964ec52910560e8033"
        expiresAt: "2026-07-27T12:54:50.579Z"
        id: "authority-45c1d5b7-8a2b-4184-84c1-03bf8c40ceb6"
        issuedAt: "2026-07-27T12:39:50.579Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:397cf7736ddd6cb72c1126f44b45e2649623d8e8d1576323f022699820808def"
        stateScopeDigest: "sha256:fa4b29b7fe691047deba1f2f471c16ffaa9112d7416dab23bb6364491cd5732a"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "f5b987c4b7aabd4830b202c0b6e902211f8abdc4"
    version: 1
id_source: "generated"
---
## Summary

Prepare and apply typed evaluator results

RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence.

## Scope

- In scope: EvaluatorWorkOrder preparation, existing EvaluatorSgrResult validation, typed in-process prepare/apply results, read-only authority, frozen evidence, staleness rejection, finding evidence refs, and compatibility recording facade.
- Out of scope: launching/calibrating the EVALUATOR model episode, which is the next task.

## Plan

1. Prepare evaluator input from immutable acceptance, revision, SHA, observed receipt, diff, policy, blueprint, and knowledge refs.
2. Return typed use-case data rather than reading/writing verdicts through CLI args/stdout.
3. Validate EvaluatorSgrResult schema, evidence refs, uncertainty, and action recommendations.
4. Apply only against the exact frozen fingerprint and reject evaluator attempts to mutate implementation.
5. Preserve an explicit human-record compatibility path with provenance.

## Verify Steps

1. Prepare evaluator evidence for code, docs, metadata-only, and context tasks. Expected: frozen revision/SHA, actual diff/checks, acceptance, and semantic criteria are complete.
2. Apply valid, stale, missing-evidence, and mutation-attempt results. Expected: only the valid read-only result changes quality state.
3. Call the use cases in-process. Expected: no stdout capture or rendered shell command is required.
4. Record a human verdict through compatibility mode. Expected: it is distinguishable from an EVALUATOR result.
5. Run schema, evaluator, lifecycle, and type checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
