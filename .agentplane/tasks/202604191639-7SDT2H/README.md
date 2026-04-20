---
id: "202604191639-7SDT2H"
title: "Retire run-cli test helper shim after final CLI migration"
result_summary: "Removed packages/agentplane/src/cli/run-cli.test-helpers.ts and migrated the final CLI test batch to ../testing/index.js. Validated the full remaining CLI surface, including the slow pr-flow.pr and pr-flow.integrate suites in single-worker mode, then refreshed the repo-local framework runtime."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T17:31:07.276Z"
  updated_by: "CODER"
  note: "Retired run-cli test shim and migrated remaining CLI suites to canonical testkit exports."
commit:
  hash: "e32f55f97171181807d9c00d10ebbac57e51681d"
  message: "🧪 tests: retire run-cli shim"
comments:
  -
    author: "CODER"
    body: "Start: migrate the remaining heavy CLI consumers off packages/agentplane/src/cli/run-cli.test-helpers.ts, delete the shim once no imports remain, and verify the affected heavy CLI suites in direct mode."
  -
    author: "CODER"
    body: "Verified: remaining CLI suites now import canonical testkit exports, the obsolete run-cli shim is removed, and the repo-local runtime was rebuilt after the deletion."
events:
  -
    type: "status"
    at: "2026-04-19T17:02:28.258Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the remaining heavy CLI consumers off packages/agentplane/src/cli/run-cli.test-helpers.ts, delete the shim once no imports remain, and verify the affected heavy CLI suites in direct mode."
  -
    type: "verify"
    at: "2026-04-19T17:31:07.276Z"
    author: "CODER"
    state: "ok"
    note: "Retired run-cli test shim and migrated remaining CLI suites to canonical testkit exports."
  -
    type: "status"
    at: "2026-04-19T17:31:36.169Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: remaining CLI suites now import canonical testkit exports, the obsolete run-cli shim is removed, and the repo-local runtime was rebuilt after the deletion."
doc_version: 3
doc_updated_at: "2026-04-19T17:31:36.170Z"
doc_updated_by: "CODER"
description: "Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain."
sections:
  Summary: |-
    Retire run-cli test helper shim after final CLI migration
    
    Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
  Scope: |-
    - In scope: Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
    - Out of scope: unrelated refactors not required for "Retire run-cli test helper shim after final CLI migration".
  Plan: "1. Repoint every remaining CLI consumer of run-cli.test-helpers.ts to the testing compatibility entrypoint. 2. Delete packages/agentplane/src/cli/run-cli.test-helpers.ts once no imports remain. 3. Run a focused heavy CLI Vitest batch covering the migrated files, then refresh the repo-local runtime snapshot if the deleted watched source requires it. 4. Record verification and finish with task-scoped commit evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T17:31:07.276Z — VERIFY — ok
    
    By: CODER
    
    Note: Retired run-cli test shim and migrated remaining CLI suites to canonical testkit exports.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:02:28.290Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: No imports reference run-cli.test-helpers.js under packages/agentplane/src; heavy CLI suites passed after rerunning unstable PR-flow files in single-worker mode; framework bootstrap refreshed the repo-local runtime after shim deletion.
      Impact: CLI and non-CLI tests now use one canonical testkit surface, and the obsolete src/cli/run-cli.test-helpers.ts shim is removed without behavioral regressions.
      Resolution: Validated the migrated CLI batches, removed the shim, rebuilt the repo-local runtime, and recorded the single-worker workaround needed for the two slow PR-flow suites.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Retire run-cli test helper shim after final CLI migration

Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.

## Scope

- In scope: Epic E′. Migrate the remaining CLI test consumers away from run-cli.test-helpers.ts and delete the shim once no imports remain.
- Out of scope: unrelated refactors not required for "Retire run-cli test helper shim after final CLI migration".

## Plan

1. Repoint every remaining CLI consumer of run-cli.test-helpers.ts to the testing compatibility entrypoint. 2. Delete packages/agentplane/src/cli/run-cli.test-helpers.ts once no imports remain. 3. Run a focused heavy CLI Vitest batch covering the migrated files, then refresh the repo-local runtime snapshot if the deleted watched source requires it. 4. Record verification and finish with task-scoped commit evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T17:31:07.276Z — VERIFY — ok

By: CODER

Note: Retired run-cli test shim and migrated remaining CLI suites to canonical testkit exports.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:02:28.290Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: No imports reference run-cli.test-helpers.js under packages/agentplane/src; heavy CLI suites passed after rerunning unstable PR-flow files in single-worker mode; framework bootstrap refreshed the repo-local runtime after shim deletion.
  Impact: CLI and non-CLI tests now use one canonical testkit surface, and the obsolete src/cli/run-cli.test-helpers.ts shim is removed without behavioral regressions.
  Resolution: Validated the migrated CLI batches, removed the shim, rebuilt the repo-local runtime, and recorded the single-worker workaround needed for the two slow PR-flow suites.
  Promotion: incident-candidate
  Fixability: external
