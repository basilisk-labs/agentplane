---
id: "202604191644-JWJ831"
title: "Split remaining integrate and tasks integration mega-tests"
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
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T17:04:48.404Z"
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
    body: "Start: split remaining aggregate integration suites into focused scenario files."
events:
  -
    type: "status"
    at: "2026-04-20T17:04:48.690Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split remaining aggregate integration suites into focused scenario files."
doc_version: 3
doc_updated_at: "2026-04-20T17:04:48.698Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
