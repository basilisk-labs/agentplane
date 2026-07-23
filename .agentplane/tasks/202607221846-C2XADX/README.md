---
id: "202607221846-C2XADX"
title: "Generate runner manifest examples from canonical fixtures"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607221846-4CE7EG"
tags:
  - "fixtures"
  - "milestone-alpha1"
  - "refactor"
  - "rf-02"
  - "runner"
  - "schema"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run spec:examples:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T17:58:07.109Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-07-22T18:46:52.407Z"
doc_updated_by: "PLANNER"
description: "RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser."
sections:
  Summary: |-
    Generate runner manifest examples from canonical fixtures

    RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser.
  Scope: |-
    - In scope: canonical runner result fixture builders, bootstrap rendering from those fixtures, production-parser round-trip tests, and CI schema/example parity.
    - Out of scope: the full workflow supervisor and evaluator implementation.
  Plan: |-
    1. Define canonical valid examples for every terminal runner result shape.
    2. Render bootstrap instructions from the fixture source instead of hand-authored JSON.
    3. Parse every rendered example with the production parser in tests.
    4. Preserve explicit negative fixtures for missing evidence and malformed results.
    5. Add schema/example parity to the contract lane.
  Verify Steps: |-
    1. Generate all bootstrap result examples and feed them to the production parser. Expected: every advertised valid example is accepted without repair.
    2. Feed missing-evidence and malformed fixtures. Expected: the parser rejects them with the intended typed errors.
    3. Diff generated bootstrap output twice. Expected: deterministic output with no hand-maintained duplicate schema.
    4. Run `bun run schemas:check`, `bun run spec:examples:check`, focused runner tests, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: ""
id_source: "generated"
---
## Summary

Generate runner manifest examples from canonical fixtures

RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser.

## Scope

- In scope: canonical runner result fixture builders, bootstrap rendering from those fixtures, production-parser round-trip tests, and CI schema/example parity.
- Out of scope: the full workflow supervisor and evaluator implementation.

## Plan

1. Define canonical valid examples for every terminal runner result shape.
2. Render bootstrap instructions from the fixture source instead of hand-authored JSON.
3. Parse every rendered example with the production parser in tests.
4. Preserve explicit negative fixtures for missing evidence and malformed results.
5. Add schema/example parity to the contract lane.

## Verify Steps

1. Generate all bootstrap result examples and feed them to the production parser. Expected: every advertised valid example is accepted without repair.
2. Feed missing-evidence and malformed fixtures. Expected: the parser rejects them with the intended typed errors.
3. Diff generated bootstrap output twice. Expected: deterministic output with no hand-maintained duplicate schema.
4. Run `bun run schemas:check`, `bun run spec:examples:check`, focused runner tests, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
