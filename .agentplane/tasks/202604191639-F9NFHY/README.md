---
id: "202604191639-F9NFHY"
title: "Create unified core schema export surface"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T18:38:04.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adding a schema barrel in core so config and task schema consumers stop depending on deleted or scattered internal module paths."
events:
  -
    type: "status"
    at: "2026-04-19T18:38:05.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding a schema barrel in core so config and task schema consumers stop depending on deleted or scattered internal module paths."
doc_version: 3
doc_updated_at: "2026-04-19T18:38:05.845Z"
doc_updated_by: "CODER"
description: "Epic A′. Add packages/core/src/schemas/index.ts as the single import surface for domain schemas and inferred types."
sections:
  Summary: |-
    Create unified core schema export surface
    
    Epic A′. Add packages/core/src/schemas/index.ts as the single import surface for domain schemas and inferred types.
  Scope: |-
    - In scope: Epic A′. Add packages/core/src/schemas/index.ts as the single import surface for domain schemas and inferred types.
    - Out of scope: unrelated refactors not required for "Create unified core schema export surface".
  Plan: "1. Add packages/core/src/schemas/index.ts as the single local barrel for config and task schema exports, keeping runtime config helpers separate from schema declarations. 2. Repoint current schema consumers, including scripts/sync-schemas.mjs and the root core export surface, away from deleted or private schema module paths. 3. Run focused schema sync validation and core typecheck/build so the new barrel is the working source of truth."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Create unified core schema export surface

Epic A′. Add packages/core/src/schemas/index.ts as the single import surface for domain schemas and inferred types.

## Scope

- In scope: Epic A′. Add packages/core/src/schemas/index.ts as the single import surface for domain schemas and inferred types.
- Out of scope: unrelated refactors not required for "Create unified core schema export surface".

## Plan

1. Add packages/core/src/schemas/index.ts as the single local barrel for config and task schema exports, keeping runtime config helpers separate from schema declarations. 2. Repoint current schema consumers, including scripts/sync-schemas.mjs and the root core export surface, away from deleted or private schema module paths. 3. Run focused schema sync validation and core typecheck/build so the new barrel is the working source of truth.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
