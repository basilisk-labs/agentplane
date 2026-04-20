---
id: "202604201100-FYQTHP"
title: "Fix guard core mock after GitClient migration"
result_summary: "Guard command unit tests no longer fail after the core GitClient helper migration."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T11:00:35.260Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T11:03:54.401Z"
  updated_by: "CODER"
  note: "Verified: guard unit suite now passes after preserving actual @agentplaneorg/core exports in the partial mock; format, typecheck, and lint:core all pass."
commit:
  hash: "c7b3508836bf6325856ae7fc615b91465dba0410"
  message: "📝 FYQTHP verify: record guard mock fix checks"
comments:
  -
    author: "CODER"
    body: "Start: Fixing the guard unit-test regression exposed by the full pre-push gate after moving shared git helpers into @agentplaneorg/core."
  -
    author: "CODER"
    body: "Verified: guard unit regression fixed with a partial @agentplaneorg/core mock that preserves actual exports; focused test, format, typecheck, and lint:core passed."
events:
  -
    type: "status"
    at: "2026-04-20T11:00:41.024Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fixing the guard unit-test regression exposed by the full pre-push gate after moving shared git helpers into @agentplaneorg/core."
  -
    type: "verify"
    at: "2026-04-20T11:03:54.401Z"
    author: "CODER"
    state: "ok"
    note: "Verified: guard unit suite now passes after preserving actual @agentplaneorg/core exports in the partial mock; format, typecheck, and lint:core all pass."
  -
    type: "status"
    at: "2026-04-20T11:04:12.709Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: guard unit regression fixed with a partial @agentplaneorg/core mock that preserves actual exports; focused test, format, typecheck, and lint:core passed."
doc_version: 3
doc_updated_at: "2026-04-20T11:04:12.710Z"
doc_updated_by: "CODER"
description: "Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock."
sections:
  Summary: |-
    Fix guard core mock after GitClient migration
    
    Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
  Scope: |-
    - In scope: Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
    - Out of scope: unrelated refactors not required for "Fix guard core mock after GitClient migration".
  Plan: |-
    1. Inspect the guard unit-test mock surface that failed during pre-push after core git helper migration.
    2. Update the @agentplaneorg/core mock so it preserves actual exports and overrides only buildTaskArtifactRefreshCommitSubject.
    3. Run the focused guard unit-test file plus format/lint/typecheck gates needed for a safe push retry.
    4. Commit the test-contract fix, record verification, finish the task, then retry git push for the epic branch.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T11:03:54.401Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: guard unit suite now passes after preserving actual @agentplaneorg/core exports in the partial mock; format, typecheck, and lint:core all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:00:41.035Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts
    Result: pass
    Evidence: 1 file passed, 26 tests passed.
    Scope: guard command unit regression exposed by pre-push.
    
    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting gate.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: TypeScript project references.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, eslint config, vitest config.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix guard core mock after GitClient migration

Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.

## Scope

- In scope: Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
- Out of scope: unrelated refactors not required for "Fix guard core mock after GitClient migration".

## Plan

1. Inspect the guard unit-test mock surface that failed during pre-push after core git helper migration.
2. Update the @agentplaneorg/core mock so it preserves actual exports and overrides only buildTaskArtifactRefreshCommitSubject.
3. Run the focused guard unit-test file plus format/lint/typecheck gates needed for a safe push retry.
4. Commit the test-contract fix, record verification, finish the task, then retry git push for the epic branch.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T11:03:54.401Z — VERIFY — ok

By: CODER

Note: Verified: guard unit suite now passes after preserving actual @agentplaneorg/core exports in the partial mock; format, typecheck, and lint:core all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T11:00:41.035Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts
Result: pass
Evidence: 1 file passed, 26 tests passed.
Scope: guard command unit regression exposed by pre-push.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting gate.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: TypeScript project references.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, eslint config, vitest config.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
