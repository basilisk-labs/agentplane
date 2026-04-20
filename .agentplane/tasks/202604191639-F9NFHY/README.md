---
id: "202604191639-F9NFHY"
title: "Create unified core schema export surface"
result_summary: "Core schema consumers now use a unified barrel instead of scattered private module paths."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-19T18:39:19.485Z"
  updated_by: "CODER"
  note: "Verified: core now exposes a single schemas barrel, scripts/sync-schemas no longer imports deleted config-schema paths, and schema check plus core typecheck/build all pass."
commit:
  hash: "3f23da5e70883fe202a65e8cb773c07d56b50a17"
  message: "🔧 F9NFHY schemas: add unified core schema barrel"
comments:
  -
    author: "CODER"
    body: "Start: adding a schema barrel in core so config and task schema consumers stop depending on deleted or scattered internal module paths."
  -
    author: "CODER"
    body: "Verified: core schema exports now route through a single barrel, the deleted config-schema import path is gone, and schema sync plus core build/typecheck passed."
events:
  -
    type: "status"
    at: "2026-04-19T18:38:05.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding a schema barrel in core so config and task schema consumers stop depending on deleted or scattered internal module paths."
  -
    type: "verify"
    at: "2026-04-19T18:39:19.485Z"
    author: "CODER"
    state: "ok"
    note: "Verified: core now exposes a single schemas barrel, scripts/sync-schemas no longer imports deleted config-schema paths, and schema check plus core typecheck/build all pass."
  -
    type: "status"
    at: "2026-04-19T18:39:19.532Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: core schema exports now route through a single barrel, the deleted config-schema import path is gone, and schema sync plus core build/typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-19T18:39:19.537Z"
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
    ### 2026-04-19T18:39:19.485Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: core now exposes a single schemas barrel, scripts/sync-schemas no longer imports deleted config-schema paths, and schema check plus core typecheck/build all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:38:05.845Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-04-19T18:39:19.485Z — VERIFY — ok

By: CODER

Note: Verified: core now exposes a single schemas barrel, scripts/sync-schemas no longer imports deleted config-schema paths, and schema check plus core typecheck/build all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:38:05.845Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
