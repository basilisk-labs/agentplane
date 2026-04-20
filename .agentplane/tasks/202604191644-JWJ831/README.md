---
id: "202604191644-JWJ831"
title: "Split remaining integrate and tasks integration mega-tests"
result_summary: "Replaced the two remaining aggregate integration test files with eight scenario-focused files, each below 2000 LoC."
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
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T17:04:48.404Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T17:10:40.385Z"
  updated_by: "CODER"
  note: "Command: wc -l integrate/tasks split files; Result: pass; Evidence: largest split file is 979 LoC, below 2000. Command: bunx vitest run eight split files --reporter dot; Result: pass; Evidence: 8 files, 53 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
commit:
  hash: "454903f6a0eaba459c7b1acc99cca1f8b5ed1a5f"
  message: "🧪 JWJ831 test: split aggregate integration suites"
comments:
  -
    author: "CODER"
    body: "Start: split remaining aggregate integration suites into focused scenario files."
  -
    author: "CODER"
    body: "Verified: remaining integrate and tasks integration suites were split into focused scenario files and checks passed."
events:
  -
    type: "status"
    at: "2026-04-20T17:04:48.690Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split remaining aggregate integration suites into focused scenario files."
  -
    type: "verify"
    at: "2026-04-20T17:10:40.385Z"
    author: "CODER"
    state: "ok"
    note: "Command: wc -l integrate/tasks split files; Result: pass; Evidence: largest split file is 979 LoC, below 2000. Command: bunx vitest run eight split files --reporter dot; Result: pass; Evidence: 8 files, 53 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-20T17:10:48.573Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: remaining integrate and tasks integration suites were split into focused scenario files and checks passed."
doc_version: 3
doc_updated_at: "2026-04-20T17:10:48.574Z"
doc_updated_by: "CODER"
description: "Epic L. Break the remaining large integrate and tasks integration files into scenario-focused files."
sections:
  Summary: |-
    Split remaining integrate and tasks integration mega-tests
    
    Epic L. Break the remaining large integrate and tasks integration files into scenario-focused files.
  Scope: |-
    - In scope: Epic L. Break the remaining large integrate and tasks integration files into scenario-focused files.
    - Out of scope: unrelated refactors not required for "Split remaining integrate and tasks integration mega-tests".
  Plan: "Split the remaining aggregate integration suites into scenario-focused files without changing assertions. For PR integrate, group validation/preflight, merge and artifact promotion, subject/dry-run/strategy behavior, and failure/verify paths. For tasks, group task creation, task lifecycle/status/duplicates, incident finish promotion, and task update/scrub commands. Verification: focused Vitest run for all new files; wc -l confirms each resulting file remains below 2000 LoC; bun run typecheck; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T17:10:40.385Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: wc -l integrate/tasks split files; Result: pass; Evidence: largest split file is 979 LoC, below 2000. Command: bunx vitest run eight split files --reporter dot; Result: pass; Evidence: 8 files, 53 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:04:48.698Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split remaining integrate and tasks integration mega-tests

Epic L. Break the remaining large integrate and tasks integration files into scenario-focused files.

## Scope

- In scope: Epic L. Break the remaining large integrate and tasks integration files into scenario-focused files.
- Out of scope: unrelated refactors not required for "Split remaining integrate and tasks integration mega-tests".

## Plan

Split the remaining aggregate integration suites into scenario-focused files without changing assertions. For PR integrate, group validation/preflight, merge and artifact promotion, subject/dry-run/strategy behavior, and failure/verify paths. For tasks, group task creation, task lifecycle/status/duplicates, incident finish promotion, and task update/scrub commands. Verification: focused Vitest run for all new files; wc -l confirms each resulting file remains below 2000 LoC; bun run typecheck; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T17:10:40.385Z — VERIFY — ok

By: CODER

Note: Command: wc -l integrate/tasks split files; Result: pass; Evidence: largest split file is 979 LoC, below 2000. Command: bunx vitest run eight split files --reporter dot; Result: pass; Evidence: 8 files, 53 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T17:04:48.698Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
