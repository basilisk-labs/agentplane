---
id: "202604191644-QJPYR1"
title: "Split finish and doctor command mega-tests"
result_summary: "Replaced finish.unit.test.ts and doctor.command.test.ts with six focused files, each below 2000 LoC."
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
  updated_at: "2026-04-20T16:57:26.438Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T17:02:29.768Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-QJPYR1; Result: pass; Evidence: verification contract reviewed. Command: wc -l finish/doctor split files; Result: pass; Evidence: largest split file is 1112 LoC, below 2000. Command: bunx vitest run finish and doctor split files --reporter dot; Result: pass; Evidence: 6 files, 67 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
commit:
  hash: "b7c06f10723c85689ed2d8a7487f8197c39224dd"
  message: "🧪 QJPYR1 test: split finish and doctor suites"
comments:
  -
    author: "CODER"
    body: "Start: Splitting finish and doctor command mega-tests into focused scenario files."
  -
    author: "CODER"
    body: "Verified: finish and doctor command mega-tests were split into focused scenario files and checks passed."
events:
  -
    type: "status"
    at: "2026-04-20T16:57:31.165Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Splitting finish and doctor command mega-tests into focused scenario files."
  -
    type: "verify"
    at: "2026-04-20T17:02:29.768Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-QJPYR1; Result: pass; Evidence: verification contract reviewed. Command: wc -l finish/doctor split files; Result: pass; Evidence: largest split file is 1112 LoC, below 2000. Command: bunx vitest run finish and doctor split files --reporter dot; Result: pass; Evidence: 6 files, 67 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass."
  -
    type: "status"
    at: "2026-04-20T17:03:49.754Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: finish and doctor command mega-tests were split into focused scenario files and checks passed."
doc_version: 3
doc_updated_at: "2026-04-20T17:03:49.755Z"
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
    ### 2026-04-20T17:02:29.768Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-QJPYR1; Result: pass; Evidence: verification contract reviewed. Command: wc -l finish/doctor split files; Result: pass; Evidence: largest split file is 1112 LoC, below 2000. Command: bunx vitest run finish and doctor split files --reporter dot; Result: pass; Evidence: 6 files, 67 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:57:31.171Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
### 2026-04-20T17:02:29.768Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-QJPYR1; Result: pass; Evidence: verification contract reviewed. Command: wc -l finish/doctor split files; Result: pass; Evidence: largest split file is 1112 LoC, below 2000. Command: bunx vitest run finish and doctor split files --reporter dot; Result: pass; Evidence: 6 files, 67 tests passed. Command: bun run typecheck; Result: pass. Command: bun run lint:core; Result: pass. Command: bun run format:check; Result: pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:57:31.171Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
