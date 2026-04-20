---
id: "202604191644-QJPYR1"
title: "Split finish and doctor command mega-tests"
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
  updated_at: "2026-04-20T16:57:26.438Z"
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
    body: "Start: Splitting finish and doctor command mega-tests into focused scenario files."
events:
  -
    type: "status"
    at: "2026-04-20T16:57:31.165Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting finish and doctor command mega-tests into focused scenario files."
doc_version: 3
doc_updated_at: "2026-04-20T16:57:31.171Z"
doc_updated_by: "CODER"
description: "Epic L. Break finish.unit.test.ts and doctor.command.test.ts into focused scenario files."
sections:
  Summary: |-
    Split finish and doctor command mega-tests
    
    Epic L. Break finish.unit.test.ts and doctor.command.test.ts into focused scenario files.
  Scope: |-
    - In scope: Epic L. Break finish.unit.test.ts and doctor.command.test.ts into focused scenario files.
    - Out of scope: unrelated refactors not required for "Split finish and doctor command mega-tests".
  Plan: "Split finish.unit.test.ts and doctor.command.test.ts into focused scenario files without changing assertions. For finish, group validation/status-commit, close-tail/incident output, and retry/state/error mapping. For doctor, group baseline/open-PR drift, task-doc and historical commit diagnostics, and version/policy/runtime diagnostics. Verification: focused Vitest run for all new files; wc -l confirms every resulting file is below 2000 LoC; bun run typecheck; bun run lint:core; bun run format:check."
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

Split finish and doctor command mega-tests

Epic L. Break finish.unit.test.ts and doctor.command.test.ts into focused scenario files.

## Scope

- In scope: Epic L. Break finish.unit.test.ts and doctor.command.test.ts into focused scenario files.
- Out of scope: unrelated refactors not required for "Split finish and doctor command mega-tests".

## Plan

Split finish.unit.test.ts and doctor.command.test.ts into focused scenario files without changing assertions. For finish, group validation/status-commit, close-tail/incident output, and retry/state/error mapping. For doctor, group baseline/open-PR drift, task-doc and historical commit diagnostics, and version/policy/runtime diagnostics. Verification: focused Vitest run for all new files; wc -l confirms every resulting file is below 2000 LoC; bun run typecheck; bun run lint:core; bun run format:check.

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
