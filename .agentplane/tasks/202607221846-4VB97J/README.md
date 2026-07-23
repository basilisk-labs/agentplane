---
id: "202607221846-4VB97J"
title: "Align Workflow schema, migration, and runtime version contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221846-ZAENM6"
tags:
  - "contract-drift"
  - "migration"
  - "milestone-alpha1"
  - "refactor"
  - "schema"
  - "v0.7"
  - "wave-trust"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:cli:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run workflows:command-check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T00:30:42.372Z"
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
    body: "Start: implement the approved WORKFLOW v1/v2 contract, migration, writer parity, and compatibility-ledger scope from main SHA 0e2d4b1c6523."
events:
  -
    type: "status"
    at: "2026-07-23T00:32:03.585Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved WORKFLOW v1/v2 contract, migration, writer parity, and compatibility-ledger scope from main SHA 0e2d4b1c6523."
doc_version: 3
doc_updated_at: "2026-07-23T00:32:03.585Z"
doc_updated_by: "CODER"
description: "Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior."
sections:
  Summary: |-
    Align Workflow schema, migration, and runtime version contracts

    Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior.
  Scope: |-
    - In scope: one Zod source of truth for supported WORKFLOW versions, generated JSON Schema and fixtures, an idempotent v1-to-v2 migrator with rollback evidence, strict rejection of unsupported future versions, and synchronized public contract documentation.
    - Out of scope: unrelated workflow semantics or removal of supported v1 reading without a compatibility window.
  Plan: "1. Define one Zod source of truth for supported WORKFLOW v1 and v2 inputs, normalize both to v2, and reject future versions with a typed error. 2. Generate the public JSON Schema, fixtures, and contract documentation from that source. 3. Implement a pure v1-to-v2 migrator with dry-run, atomic apply, idempotency, and an exact-byte rollback receipt. 4. Route config/save/build, doctor/fix, and upgrade writers through the versioned contract without field loss or silent version downgrade. 5. Record the intentional compatibility delta in a reviewed candidate ledger while preserving the immutable 0.6.24 baseline anchor. 6. Add focused round-trip, migration, rollback, future-version, writer-parity, schema, CLI-doc, and compatibility checks."
  Verify Steps: |-
    1. Round-trip valid v1 and v2 fixtures through runtime parsing and generated JSON Schema. Expected: both supported forms agree on normalized v2 meaning.
    2. Run migration twice and exercise rollback. Expected: the second run is a no-op and rollback restores the exact source fixture.
    3. Parse an unsupported future version. Expected: a typed version error, not permissive acceptance.
    4. Run `bun run schemas:check`, `bun run workflows:command-check`, `bun run docs:cli:check`, and focused migration tests. Expected: runtime, schema, upgrade, and docs surfaces are in parity.
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

Align Workflow schema, migration, and runtime version contracts

Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior.

## Scope

- In scope: one Zod source of truth for supported WORKFLOW versions, generated JSON Schema and fixtures, an idempotent v1-to-v2 migrator with rollback evidence, strict rejection of unsupported future versions, and synchronized public contract documentation.
- Out of scope: unrelated workflow semantics or removal of supported v1 reading without a compatibility window.

## Plan

1. Define one Zod source of truth for supported WORKFLOW v1 and v2 inputs, normalize both to v2, and reject future versions with a typed error. 2. Generate the public JSON Schema, fixtures, and contract documentation from that source. 3. Implement a pure v1-to-v2 migrator with dry-run, atomic apply, idempotency, and an exact-byte rollback receipt. 4. Route config/save/build, doctor/fix, and upgrade writers through the versioned contract without field loss or silent version downgrade. 5. Record the intentional compatibility delta in a reviewed candidate ledger while preserving the immutable 0.6.24 baseline anchor. 6. Add focused round-trip, migration, rollback, future-version, writer-parity, schema, CLI-doc, and compatibility checks.

## Verify Steps

1. Round-trip valid v1 and v2 fixtures through runtime parsing and generated JSON Schema. Expected: both supported forms agree on normalized v2 meaning.
2. Run migration twice and exercise rollback. Expected: the second run is a no-op and rollback restores the exact source fixture.
3. Parse an unsupported future version. Expected: a typed version error, not permissive acceptance.
4. Run `bun run schemas:check`, `bun run workflows:command-check`, `bun run docs:cli:check`, and focused migration tests. Expected: runtime, schema, upgrade, and docs surfaces are in parity.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
