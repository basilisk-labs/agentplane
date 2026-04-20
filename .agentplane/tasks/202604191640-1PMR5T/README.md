---
id: "202604191640-1PMR5T"
title: "Add declareCommand helper to command catalog"
result_summary: "Added the declareCommand object-form contract, module-export loader validation, commandModule shorthand, and migrated command catalog entries away from entry(...)."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T06:52:00.100Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T06:57:30.002Z"
  updated_by: "CODER"
  note: "Verified declareCommand catalog migration: vitest command-catalog/help contract tests passed, agentplane typecheck passed, prettier check passed, framework dev bootstrap passed."
commit:
  hash: "b20ad00a931a8c470d61fa70329a0477fa5487a3"
  message: "♻️ 1PMR5T task: declare command catalog entries"
comments:
  -
    author: "CODER"
    body: "Start: add declareCommand helper and migrate command catalog entries without changing command behavior."
  -
    author: "CODER"
    body: "Verified: command catalog uses declareCommand/commandModule declarations; command-catalog and help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
events:
  -
    type: "status"
    at: "2026-04-20T06:52:00.548Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add declareCommand helper and migrate command catalog entries without changing command behavior."
  -
    type: "verify"
    at: "2026-04-20T06:57:30.002Z"
    author: "CODER"
    state: "ok"
    note: "Verified declareCommand catalog migration: vitest command-catalog/help contract tests passed, agentplane typecheck passed, prettier check passed, framework dev bootstrap passed."
  -
    type: "status"
    at: "2026-04-20T06:57:50.649Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: command catalog uses declareCommand/commandModule declarations; command-catalog and help contract tests passed; agentplane typecheck, prettier check, and framework bootstrap passed."
doc_version: 3
doc_updated_at: "2026-04-20T06:57:50.649Z"
doc_updated_by: "CODER"
description: "Epic D′. Introduce a declareCommand helper and collapse repeated command-catalog boilerplate."
sections:
  Summary: |-
    Add declareCommand helper to command catalog
    
    Epic D′. Introduce a declareCommand helper and collapse repeated command-catalog boilerplate.
  Scope: |-
    - In scope: Epic D′. Introduce a declareCommand helper and collapse repeated command-catalog boilerplate.
    - Out of scope: unrelated refactors not required for "Add declareCommand helper to command catalog".
  Plan: "1. Inspect the existing command catalog shape and shared catalog types. 2. Add a declareCommand helper that preserves current runtime behavior while collapsing repeated needs/load/runExport boilerplate. 3. Convert a representative catalog slice first, then expand across catalog modules until the helper is the default pattern. 4. Run command-catalog/help-focused tests plus typecheck/build, commit the task, and close it with verification evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T06:57:30.002Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified declareCommand catalog migration: vitest command-catalog/help contract tests passed, agentplane typecheck passed, prettier check passed, framework dev bootstrap passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T06:52:00.554Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add declareCommand helper to command catalog

Epic D′. Introduce a declareCommand helper and collapse repeated command-catalog boilerplate.

## Scope

- In scope: Epic D′. Introduce a declareCommand helper and collapse repeated command-catalog boilerplate.
- Out of scope: unrelated refactors not required for "Add declareCommand helper to command catalog".

## Plan

1. Inspect the existing command catalog shape and shared catalog types. 2. Add a declareCommand helper that preserves current runtime behavior while collapsing repeated needs/load/runExport boilerplate. 3. Convert a representative catalog slice first, then expand across catalog modules until the helper is the default pattern. 4. Run command-catalog/help-focused tests plus typecheck/build, commit the task, and close it with verification evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T06:57:30.002Z — VERIFY — ok

By: CODER

Note: Verified declareCommand catalog migration: vitest command-catalog/help contract tests passed, agentplane typecheck passed, prettier check passed, framework dev bootstrap passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T06:52:00.554Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
