---
id: "202604191639-STZFC6"
title: "Route config loading through Zod validation"
result_summary: "Config loading is structurally Zod-first and core exports now publish the canonical config schema surface."
status: "DONE"
priority: "high"
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
  updated_at: "2026-04-19T18:27:29.374Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T18:30:55.574Z"
  updated_by: "CODER"
  note: "Verified: config loading now resolves its runtime schema directly from config-zod, the intermediate config-schema module is removed, and focused core config validation plus core typecheck/build pass."
commit:
  hash: "82a313b2cab199af3218f34a24f56839733f81f3"
  message: "🔧 STZFC6 schemas: make config zod schema the direct source"
comments:
  -
    author: "CODER"
    body: "Start: tracing the live loadConfig path so the runtime moves to a Zod-first validation route without widening the config API surface."
  -
    author: "CODER"
    body: "Verified: config loading now uses config-zod as the direct schema source, the shadow config-schema module is gone, and the focused core validation/build checks passed."
events:
  -
    type: "status"
    at: "2026-04-19T18:27:30.631Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tracing the live loadConfig path so the runtime moves to a Zod-first validation route without widening the config API surface."
  -
    type: "verify"
    at: "2026-04-19T18:30:55.574Z"
    author: "CODER"
    state: "ok"
    note: "Verified: config loading now resolves its runtime schema directly from config-zod, the intermediate config-schema module is removed, and focused core config validation plus core typecheck/build pass."
  -
    type: "status"
    at: "2026-04-19T18:30:55.638Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: config loading now uses config-zod as the direct schema source, the shadow config-schema module is gone, and the focused core validation/build checks passed."
doc_version: 3
doc_updated_at: "2026-04-19T18:30:55.645Z"
doc_updated_by: "CODER"
description: "Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed."
sections:
  Summary: |-
    Route config loading through Zod validation
    
    Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
  Scope: |-
    - In scope: Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
    - Out of scope: unrelated refactors not required for "Route config loading through Zod validation".
  Plan: "1. Trace the current loadConfig runtime path and identify where config.ts still acts as a fallback wrapper instead of a Zod-first source of truth. 2. Switch the runtime load path to the Zod validator with the smallest public API churn and update the focused tests. 3. Verify the config runtime path and record the result before moving to the next schema task."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T18:30:55.574Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: config loading now resolves its runtime schema directly from config-zod, the intermediate config-schema module is removed, and focused core config validation plus core typecheck/build pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:27:30.643Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Focused config tests, core typecheck, and core build all passed after the import and export surface change.
      Impact: The config runtime path is now explicitly Zod-first and the public core API exposes the canonical schema symbols without a shadow schema module.
      Resolution: No further action in this atom; remaining A′ work can build on the direct config-zod surface.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Route config loading through Zod validation

Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.

## Scope

- In scope: Epic A′. Switch config loading to the canonical Zod validator and keep compare-mode safety where still needed.
- Out of scope: unrelated refactors not required for "Route config loading through Zod validation".

## Plan

1. Trace the current loadConfig runtime path and identify where config.ts still acts as a fallback wrapper instead of a Zod-first source of truth. 2. Switch the runtime load path to the Zod validator with the smallest public API churn and update the focused tests. 3. Verify the config runtime path and record the result before moving to the next schema task.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T18:30:55.574Z — VERIFY — ok

By: CODER

Note: Verified: config loading now resolves its runtime schema directly from config-zod, the intermediate config-schema module is removed, and focused core config validation plus core typecheck/build pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T18:27:30.643Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Focused config tests, core typecheck, and core build all passed after the import and export surface change.
  Impact: The config runtime path is now explicitly Zod-first and the public core API exposes the canonical schema symbols without a shadow schema module.
  Resolution: No further action in this atom; remaining A′ work can build on the direct config-zod surface.
  Promotion: incident-candidate
  Fixability: external
