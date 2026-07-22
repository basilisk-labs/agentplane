---
id: "202607221849-TBTX8X"
title: "Prepare and apply typed evaluator results"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:49:06.645Z"
doc_updated_by: "PLANNER"
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
