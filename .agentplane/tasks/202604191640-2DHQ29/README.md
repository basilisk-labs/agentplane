---
id: "202604191640-2DHQ29"
title: "Expand ESLint boundaries for package and layer imports"
result_summary: "Boundary linting now enforces the shared-vs-higher-layer contract instead of the previously reversed/decorative rule set."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "lint"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T20:36:57.246Z"
  updated_by: "CODER"
  note: "Updated ESLint boundary rules so shared helpers are lint-blocked from importing higher-level layers, corrected the broken restricted-path direction, and revalidated the changed surfaces with focused eslint plus framework bootstrap."
commit:
  hash: "84144f33569600d3b5d2a86549796fe7e3c6eb7a"
  message: "🧱 2DHQ29 task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: tightening ESLint import boundaries so the new core process/git layers and command modules cannot drift back into cross-layer imports after the current refactor wave."
  -
    author: "CODER"
    body: "Verified: corrected shared-layer boundary enforcement in eslint, added file-scoped no-restricted-imports for shared helpers, and reran focused eslint plus framework bootstrap after the minimal git-client lint cleanup. Implementation commit preceded the formalized task-artifact refresh commit 84144f33."
events:
  -
    type: "status"
    at: "2026-04-19T20:32:07.439Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: tightening ESLint import boundaries so the new core process/git layers and command modules cannot drift back into cross-layer imports after the current refactor wave."
  -
    type: "verify"
    at: "2026-04-19T20:36:57.246Z"
    author: "CODER"
    state: "ok"
    note: "Updated ESLint boundary rules so shared helpers are lint-blocked from importing higher-level layers, corrected the broken restricted-path direction, and revalidated the changed surfaces with focused eslint plus framework bootstrap."
  -
    type: "status"
    at: "2026-04-19T20:36:57.628Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: corrected shared-layer boundary enforcement in eslint, added file-scoped no-restricted-imports for shared helpers, and reran focused eslint plus framework bootstrap after the minimal git-client lint cleanup. Implementation commit preceded the formalized task-artifact refresh commit 84144f33."
doc_version: 3
doc_updated_at: "2026-04-19T20:36:57.631Z"
doc_updated_by: "CODER"
description: "Epic B′ and J′. Tighten ESLint no-restricted-import rules to enforce current architectural boundaries."
sections:
  Summary: |-
    Expand ESLint boundaries for package and layer imports
    
    Epic B′ and J′. Tighten ESLint no-restricted-import rules to enforce current architectural boundaries.
  Scope: |-
    - In scope: Epic B′ and J′. Tighten ESLint no-restricted-import rules to enforce current architectural boundaries.
    - Out of scope: unrelated refactors not required for "Expand ESLint boundaries for package and layer imports".
  Plan: |-
    1. Implement the change for "Expand ESLint boundaries for package and layer imports".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T20:36:57.246Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated ESLint boundary rules so shared helpers are lint-blocked from importing higher-level layers, corrected the broken restricted-path direction, and revalidated the changed surfaces with focused eslint plus framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T20:32:07.471Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Expand ESLint boundaries for package and layer imports

Epic B′ and J′. Tighten ESLint no-restricted-import rules to enforce current architectural boundaries.

## Scope

- In scope: Epic B′ and J′. Tighten ESLint no-restricted-import rules to enforce current architectural boundaries.
- Out of scope: unrelated refactors not required for "Expand ESLint boundaries for package and layer imports".

## Plan

1. Implement the change for "Expand ESLint boundaries for package and layer imports".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T20:36:57.246Z — VERIFY — ok

By: CODER

Note: Updated ESLint boundary rules so shared helpers are lint-blocked from importing higher-level layers, corrected the broken restricted-path direction, and revalidated the changed surfaces with focused eslint plus framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T20:32:07.471Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
