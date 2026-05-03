---
id: "202605031940-G6EH42"
title: "Fix WORKFLOW-only test config assumptions"
result_summary: "Merged via PR #855."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:40:11.473Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T19:55:37.144Z"
  updated_by: "CODER"
  note: "Command: bun run test:project agentplane. Result: pass. Evidence: 243 test files passed, 1346 tests passed, 2 skipped after build generated dist/cli.js. Scope: broad agentplane project tests covering WORKFLOW-only config migration, release/upgrade staging, doctor/runtime checks, and CLI regressions."
commit:
  hash: "53022a6a0e089486193a9d0ab464b8acc8ad3fe4"
  message: "Merge pull request #855 from basilisk-labs/task/202605031940-G6EH42/workflow-only-test-config"
comments:
  -
    author: "CODER"
    body: "Start: reproduce and fix stale test assumptions that require a committed .agentplane/config.json after the repository moved to WORKFLOW.md as the managed source of truth."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #855 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T19:40:29.805Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and fix stale test assumptions that require a committed .agentplane/config.json after the repository moved to WORKFLOW.md as the managed source of truth."
  -
    type: "verify"
    at: "2026-05-03T19:55:37.144Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run test:project agentplane. Result: pass. Evidence: 243 test files passed, 1346 tests passed, 2 skipped after build generated dist/cli.js. Scope: broad agentplane project tests covering WORKFLOW-only config migration, release/upgrade staging, doctor/runtime checks, and CLI regressions."
  -
    type: "status"
    at: "2026-05-03T19:58:55.166Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #855 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T19:58:55.172Z"
doc_updated_by: "INTEGRATOR"
description: "Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly."
sections:
  Summary: |-
    Fix WORKFLOW-only test config assumptions
    
    Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.
  Scope: |-
    - In scope: Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.
    - Out of scope: unrelated refactors not required for "Fix WORKFLOW-only test config assumptions".
  Plan: |-
    1. Reproduce the stale .agentplane/config.json test failure using focused project-test commands.
    2. Locate tests/helpers that assume committed .agentplane/config.json in initialized repos.
    3. Update fixtures/helpers so WORKFLOW.md is the default source of truth; generate legacy config only inside tests that explicitly cover legacy compatibility.
    4. Run focused tests plus routing/policy checks.
    5. Publish branch PR, merge after checks, finish the task, and clean the task branch/worktree.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T19:55:37.144Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run test:project agentplane. Result: pass. Evidence: 243 test files passed, 1346 tests passed, 2 skipped after build generated dist/cli.js. Scope: broad agentplane project tests covering WORKFLOW-only config migration, release/upgrade staging, doctor/runtime checks, and CLI regressions.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T19:40:29.805Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun run test:project core -- packages/core/src/git/git-utils.test.ts. Result: pass. Evidence: 19 core test files passed, 165 tests passed; git-utils no longer stages .agentplane/config.json. Scope: core git/config fixture regression.
      Impact: Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck && bun run build && bun run format:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: both package typechecks exited 0, build exited 0, Prettier check passed, policy routing OK. Scope: compile, formatting, generated runtime availability, and policy routing.
      Resolution: Updated production release/upgrade staging to stage .agentplane/WORKFLOW.md after config persistence, and updated stale tests/fixtures to treat WORKFLOW.md as the managed artifact while leaving explicit legacy config.json only for compatibility inputs.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix WORKFLOW-only test config assumptions

Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.

## Scope

- In scope: Update test fixtures/setup so broad project tests do not require committed .agentplane/config.json; tests that need legacy config must generate it explicitly.
- Out of scope: unrelated refactors not required for "Fix WORKFLOW-only test config assumptions".

## Plan

1. Reproduce the stale .agentplane/config.json test failure using focused project-test commands.
2. Locate tests/helpers that assume committed .agentplane/config.json in initialized repos.
3. Update fixtures/helpers so WORKFLOW.md is the default source of truth; generate legacy config only inside tests that explicitly cover legacy compatibility.
4. Run focused tests plus routing/policy checks.
5. Publish branch PR, merge after checks, finish the task, and clean the task branch/worktree.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T19:55:37.144Z — VERIFY — ok

By: CODER

Note: Command: bun run test:project agentplane. Result: pass. Evidence: 243 test files passed, 1346 tests passed, 2 skipped after build generated dist/cli.js. Scope: broad agentplane project tests covering WORKFLOW-only config migration, release/upgrade staging, doctor/runtime checks, and CLI regressions.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T19:40:29.805Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun run test:project core -- packages/core/src/git/git-utils.test.ts. Result: pass. Evidence: 19 core test files passed, 165 tests passed; git-utils no longer stages .agentplane/config.json. Scope: core git/config fixture regression.
  Impact: Command: bun run --filter=@agentplaneorg/core typecheck && bun run --filter=agentplane typecheck && bun run build && bun run format:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: both package typechecks exited 0, build exited 0, Prettier check passed, policy routing OK. Scope: compile, formatting, generated runtime availability, and policy routing.
  Resolution: Updated production release/upgrade staging to stage .agentplane/WORKFLOW.md after config persistence, and updated stale tests/fixtures to treat WORKFLOW.md as the managed artifact while leaving explicit legacy config.json only for compatibility inputs.
  Promotion: incident-candidate
  Fixability: external
