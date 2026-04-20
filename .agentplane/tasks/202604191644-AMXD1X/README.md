---
id: "202604191644-AMXD1X"
title: "Add critical Vitest project route to CI"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Hardening the critical Vitest CI route with explicit timeout and route checks."
events:
  -
    type: "status"
    at: "2026-04-20T16:30:40.146Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Hardening the critical Vitest CI route with explicit timeout and route checks."
doc_version: 3
doc_updated_at: "2026-04-20T16:30:40.153Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
