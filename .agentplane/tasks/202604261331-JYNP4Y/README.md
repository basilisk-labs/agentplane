---
id: "202604261331-JYNP4Y"
title: "Fix oversized baseline drift after core import split"
result_summary: "Run-cli core import support now keeps subpath imports compact and oversized baseline total below the committed cap."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "baseline"
  - "refactor"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T13:31:44.028Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T13:38:04.080Z"
  updated_by: "CODER"
  note: "Fixed oversized baseline drift from core subpath imports."
commit:
  hash: "b634901e0f462f5d00ce5160ddd1234d75ced68f"
  message: "✅ JYNP4Y meta: done"
comments:
  -
    author: "CODER"
    body: "Start: repair oversized-test baseline drift caused by expanded core subpath imports."
  -
    author: "CODER"
    body: "Verified: oversized baseline drift fixed without increasing baseline limits."
events:
  -
    type: "status"
    at: "2026-04-26T13:31:44.282Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair oversized-test baseline drift caused by expanded core subpath imports."
  -
    type: "verify"
    at: "2026-04-26T13:38:04.080Z"
    author: "CODER"
    state: "ok"
    note: "Fixed oversized baseline drift from core subpath imports."
  -
    type: "status"
    at: "2026-04-26T13:38:49.984Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: oversized baseline drift fixed without increasing baseline limits."
doc_version: 3
doc_updated_at: "2026-04-26T13:38:49.986Z"
doc_updated_by: "CODER"
description: "Compact the run-cli test import surface introduced by core subpath migration so oversized test baselines do not grow."
sections:
  Summary: |-
    Fix oversized baseline drift after core import split
    
    Compact the run-cli test import surface introduced by core subpath migration so oversized test baselines do not grow.
  Scope: |-
    - In scope: Compact the run-cli test import surface introduced by core subpath migration so oversized test baselines do not grow.
    - Out of scope: unrelated refactors not required for "Fix oversized baseline drift after core import split".
  Plan: |-
    1. Add a small run-cli test support module that re-exports the core subpath symbols used by oversized CLI suites.
    2. Replace expanded three-line core subpath imports in affected run-cli test files with one local support import.
    3. Verify oversized baseline guard, root import count, format, typecheck, lint, and focused CLI tests.
  Verify Steps: |-
    1. Review the requested outcome for "Fix oversized baseline drift after core import split". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T13:38:04.080Z — VERIFY — ok
    
    By: CODER
    
    Note: Fixed oversized baseline drift from core subpath imports.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T13:31:44.293Z, excerpt_hash=sha256:e8d703061329d6e7ad84cd04be3797f57da3d9617d2c9ea2305456eaa2b90748
    
    Details:
    
    Checks passed: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; rg root core imports under packages/agentplane/src returned zero; bun run typecheck; bun run lint:core; bun run format:check; bun run knip:check; git diff --check; focused CLI tests passed 110/110.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix oversized baseline drift after core import split

Compact the run-cli test import surface introduced by core subpath migration so oversized test baselines do not grow.

## Scope

- In scope: Compact the run-cli test import surface introduced by core subpath migration so oversized test baselines do not grow.
- Out of scope: unrelated refactors not required for "Fix oversized baseline drift after core import split".

## Plan

1. Add a small run-cli test support module that re-exports the core subpath symbols used by oversized CLI suites.
2. Replace expanded three-line core subpath imports in affected run-cli test files with one local support import.
3. Verify oversized baseline guard, root import count, format, typecheck, lint, and focused CLI tests.

## Verify Steps

1. Review the requested outcome for "Fix oversized baseline drift after core import split". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T13:38:04.080Z — VERIFY — ok

By: CODER

Note: Fixed oversized baseline drift from core subpath imports.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T13:31:44.293Z, excerpt_hash=sha256:e8d703061329d6e7ad84cd04be3797f57da3d9617d2c9ea2305456eaa2b90748

Details:

Checks passed: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; rg root core imports under packages/agentplane/src returned zero; bun run typecheck; bun run lint:core; bun run format:check; bun run knip:check; git diff --check; focused CLI tests passed 110/110.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
