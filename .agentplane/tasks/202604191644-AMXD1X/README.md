---
id: "202604191644-AMXD1X"
title: "Add critical Vitest project route to CI"
result_summary: "Added critical route guard script, workflow timeout-minutes, and workflows:command-check enforcement for CI critical tests."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "testing"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:30:35.158Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T16:34:17.229Z"
  updated_by: "CODER"
  note: "Command: agentplane task verify-show 202604191644-AMXD1X; Result: pass; Evidence: verification contract reviewed. Command: bun run workflows:command-check; Result: pass; Evidence: workflow command contract OK and critical Vitest route OK. Command: bun run test:critical; Result: pass; Evidence: 5 files, 13 tests passed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style."
commit:
  hash: "ef0363bbd4d7c87a7cff4d74ac51d71330312392"
  message: "🧪 AMXD1X test: guard critical Vitest CI route"
comments:
  -
    author: "CODER"
    body: "Start: Hardening the critical Vitest CI route with explicit timeout and route checks."
  -
    author: "CODER"
    body: "Verified: critical Vitest route is wired through CI workflows with explicit timeout and route drift checks."
events:
  -
    type: "status"
    at: "2026-04-20T16:30:40.146Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Hardening the critical Vitest CI route with explicit timeout and route checks."
  -
    type: "verify"
    at: "2026-04-20T16:34:17.229Z"
    author: "CODER"
    state: "ok"
    note: "Command: agentplane task verify-show 202604191644-AMXD1X; Result: pass; Evidence: verification contract reviewed. Command: bun run workflows:command-check; Result: pass; Evidence: workflow command contract OK and critical Vitest route OK. Command: bun run test:critical; Result: pass; Evidence: 5 files, 13 tests passed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style."
  -
    type: "status"
    at: "2026-04-20T16:34:33.061Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: critical Vitest route is wired through CI workflows with explicit timeout and route drift checks."
doc_version: 3
doc_updated_at: "2026-04-20T16:34:33.061Z"
doc_updated_by: "CODER"
description: "Epic J′ and K. Add a dedicated critical test project and wire CI to it with explicit timeout expectations."
sections:
  Summary: |-
    Add critical Vitest project route to CI
    
    Epic J′ and K. Add a dedicated critical test project and wire CI to it with explicit timeout expectations.
  Scope: |-
    - In scope: Epic J′ and K. Add a dedicated critical test project and wire CI to it with explicit timeout expectations.
    - Out of scope: unrelated refactors not required for "Add critical Vitest project route to CI".
  Plan: "Harden the already-present critical Vitest route so CI cannot silently drift. Add explicit GitHub Actions timeout-minutes to critical steps in ci.yml and prepublish.yml, add a fast script that verifies the package script, Vitest project include/timeouts, and workflow route/timeout, then wire that check into workflows:command-check. Verification: agentplane task verify-show; bun run workflows:command-check; bun run test:critical; bun run lint:core; bun run format:check."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T16:34:17.229Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: agentplane task verify-show 202604191644-AMXD1X; Result: pass; Evidence: verification contract reviewed. Command: bun run workflows:command-check; Result: pass; Evidence: workflow command contract OK and critical Vitest route OK. Command: bun run test:critical; Result: pass; Evidence: 5 files, 13 tests passed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:30:40.153Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add critical Vitest project route to CI

Epic J′ and K. Add a dedicated critical test project and wire CI to it with explicit timeout expectations.

## Scope

- In scope: Epic J′ and K. Add a dedicated critical test project and wire CI to it with explicit timeout expectations.
- Out of scope: unrelated refactors not required for "Add critical Vitest project route to CI".

## Plan

Harden the already-present critical Vitest route so CI cannot silently drift. Add explicit GitHub Actions timeout-minutes to critical steps in ci.yml and prepublish.yml, add a fast script that verifies the package script, Vitest project include/timeouts, and workflow route/timeout, then wire that check into workflows:command-check. Verification: agentplane task verify-show; bun run workflows:command-check; bun run test:critical; bun run lint:core; bun run format:check.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T16:34:17.229Z — VERIFY — ok

By: CODER

Note: Command: agentplane task verify-show 202604191644-AMXD1X; Result: pass; Evidence: verification contract reviewed. Command: bun run workflows:command-check; Result: pass; Evidence: workflow command contract OK and critical Vitest route OK. Command: bun run test:critical; Result: pass; Evidence: 5 files, 13 tests passed. Command: bun run lint:core; Result: pass; Evidence: eslint completed. Command: bun run format:check; Result: pass; Evidence: Prettier reported all matched files use style.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T16:30:40.153Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
