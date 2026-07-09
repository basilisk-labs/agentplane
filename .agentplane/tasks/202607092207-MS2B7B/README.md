---
id: "202607092207-MS2B7B"
title: "Make context extraction writes transactional for v0.6.22"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.138Z"
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
doc_updated_at: "2026-07-09T22:09:44.563Z"
doc_updated_by: "PLANNER"
description: "Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure."
sections:
  Summary: |-
    Make context extraction writes transactional for v0.6.22

    Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
  Scope: |-
    - In scope: Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
    - Out of scope: unrelated refactors not required for "Make context extraction writes transactional for v0.6.22".
  Plan: |-
    1. Map every artifact written by the extraction apply path and define one staging transaction boundary.
    2. Write all outputs into a temporary transaction area, validate the complete set, then atomically promote it; restore the pre-run state on failure.
    3. Add fault-injection coverage for failure before and during promotion, including a multi-artifact topology case.
    4. Run focused tests, typecheck, and the full contract gate.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts`; partial-write and multi-artifact rollback cases pass.
    2. Force a validation or promotion failure in tests; no target artifact remains partially updated.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run ci:contract`; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make context extraction writes transactional for v0.6.22

Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.

## Scope

- In scope: Refactor context extraction persistence so all derived artifacts are staged and committed as one recoverable operation, with rollback on partial write or validation failure.
- Out of scope: unrelated refactors not required for "Make context extraction writes transactional for v0.6.22".

## Plan

1. Map every artifact written by the extraction apply path and define one staging transaction boundary.
2. Write all outputs into a temporary transaction area, validate the complete set, then atomically promote it; restore the pre-run state on failure.
3. Add fault-injection coverage for failure before and during promotion, including a multi-artifact topology case.
4. Run focused tests, typecheck, and the full contract gate.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/context/extraction-writer*.test.ts packages/agentplane/src/context/*extraction*.test.ts`; partial-write and multi-artifact rollback cases pass.
2. Force a validation or promotion failure in tests; no target artifact remains partially updated.
3. Run `bun run typecheck`; it passes.
4. Run `bun run ci:contract`; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
