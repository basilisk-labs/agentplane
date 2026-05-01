---
id: "202605010645-B5ERD0"
title: "AP-09: Split guard implementation tests"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605010645-WN3ZS8"
tags:
  - "code"
verify:
  - "bun run test:project -- guard"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T09:29:14.088Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after AP-08 closed on main and dependency is ready."
verification:
  state: "ok"
  updated_at: "2026-05-01T09:46:54.363Z"
  updated_by: "CODER"
  note: "Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split guard implementation command tests by command family and move reusable mock guard context builders into testkit."
events:
  -
    type: "status"
    at: "2026-05-01T09:29:51.089Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split guard implementation command tests by command family and move reusable mock guard context builders into testkit."
  -
    type: "verify"
    at: "2026-05-01T09:46:54.363Z"
    author: "CODER"
    state: "ok"
    note: "Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass."
doc_version: 3
doc_updated_at: "2026-05-01T09:46:54.370Z"
doc_updated_by: "CODER"
description: "Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers."
sections:
  Summary: |-
    AP-09: Split guard implementation tests
    
    Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.
  Scope: |-
    - In scope: Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.
    - Out of scope: unrelated refactors not required for "AP-09: Split guard implementation tests".
  Plan: |-
    1. Implement the change for "AP-09: Split guard implementation tests".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run test:project -- guard`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T09:46:54.363Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:29:51.089Z, excerpt_hash=sha256:8dca982e9b4ec25e66ab0950135d1daefc9ca021ad7191c38acb345986103140
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks passed: bun run test:project -- guard; node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx vitest run packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bun run lint:core; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs; git diff --check.
      Impact: Guard command tests are now split by command family and stay below the oversized threshold without increasing the baseline.
      Resolution: Ready for AP-09 commit and branch_pr PR flow.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

AP-09: Split guard implementation tests

Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.

## Scope

- In scope: Split guard commands.unit.test.ts by command family and promote mock context builders to testkit guard helpers.
- Out of scope: unrelated refactors not required for "AP-09: Split guard implementation tests".

## Plan

1. Implement the change for "AP-09: Split guard implementation tests".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run test:project -- guard`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T09:46:54.363Z — VERIFY — ok

By: CODER

Note: Verified: guard commands.unit.test.ts split into guard, commit close, and commit non-close suites; @agentplane/testkit/guard added for shared command context fixtures; guard project and oversized baseline pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T09:29:51.089Z, excerpt_hash=sha256:8dca982e9b4ec25e66ab0950135d1daefc9ca021ad7191c38acb345986103140

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Checks passed: bun run test:project -- guard; node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; node scripts/check-vitest-projects.mjs; bunx vitest run packages/agentplane/src/cli/test-inventory.test.ts packages/agentplane/src/cli/test-routing-check.test.ts --testTimeout 60000 --hookTimeout 60000; bun run typecheck; bun run lint:core; bun run framework:dev:bootstrap; node .agentplane/policy/check-routing.mjs; git diff --check.
  Impact: Guard command tests are now split by command family and stay below the oversized threshold without increasing the baseline.
  Resolution: Ready for AP-09 commit and branch_pr PR flow.
  Promotion: incident-candidate
  Fixability: external
