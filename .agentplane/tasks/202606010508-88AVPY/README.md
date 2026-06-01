---
id: "202606010508-88AVPY"
title: "Fix cloud backend failure exit semantics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T05:09:12.565Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T05:14:32.755Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Result: pass, 19 tests. Evidence: regression coverage now asserts cloud push HTTP 502 exits with E_BACKEND/6 and cloud read autosync fetch failure exits with E_NETWORK/7, covering GitHub issues #4343 and #4339. Command: bun run format:changed. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Investigating cloud/backend command failure propagation for issues #4343 and #4339, adding regression coverage, and keeping the fix limited to nonzero exit semantics without compatibility fallbacks."
events:
  -
    type: "status"
    at: "2026-06-01T05:09:45.879Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Investigating cloud/backend command failure propagation for issues #4343 and #4339, adding regression coverage, and keeping the fix limited to nonzero exit semantics without compatibility fallbacks."
  -
    type: "verify"
    at: "2026-06-01T05:14:32.755Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Result: pass, 19 tests. Evidence: regression coverage now asserts cloud push HTTP 502 exits with E_BACKEND/6 and cloud read autosync fetch failure exits with E_NETWORK/7, covering GitHub issues #4343 and #4339. Command: bun run format:changed. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass."
doc_version: 3
doc_updated_at: "2026-06-01T05:14:32.777Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases."
sections:
  Summary: |-
    Fix cloud backend failure exit semantics

    Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.
  Scope: |-
    - In scope: Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.
    - Out of scope: unrelated refactors not required for "Fix cloud backend failure exit semantics".
  Plan: |-
    Plan:
    1. Reproduce/locate backend cloud command paths for issue #4343 and #4339.
    2. Add or update tests proving cloud/backend sync and task cloud fetch failures exit nonzero when E_BACKEND/E_NETWORK is raised.
    3. Fix command/error propagation without legacy fallback paths or compatibility aliases.
    4. Run targeted tests plus routing/policy checks.
    5. Open a branch_pr PR, merge it to main after hosted checks, then close issues #4343 and #4339 with evidence.
  Verify Steps: |-
    1. Add or update regression tests that simulate backend/cloud `E_BACKEND` and `E_NETWORK` failures. Expected: command execution rejects or exits nonzero instead of reporting success.
    2. Run targeted backend/cloud command tests. Expected: all targeted tests pass and cover issues #4343 and #4339.
    3. Run routing/policy checks for the touched implementation. Expected: no policy, formatting, or command-contract regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T05:14:32.755Z — VERIFY — ok

    By: CODER

    Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Result: pass, 19 tests. Evidence: regression coverage now asserts cloud push HTTP 502 exits with E_BACKEND/6 and cloud read autosync fetch failure exits with E_NETWORK/7, covering GitHub issues #4343 and #4339. Command: bun run format:changed. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:09:45.879Z, excerpt_hash=sha256:b84f3ece872b461cb297841026814e13e3db4a371bf723128635edbb1761f025

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010508-88AVPY-fix-cloud-backend-failure-exit-semantics/.agentplane/tasks/202606010508-88AVPY/blueprint/resolved-snapshot.json
    - old_digest: 72148b189d649d301cbc3cdd91492ac9e86fb4de0b7db97e72034ea9e3136e70
    - current_digest: 72148b189d649d301cbc3cdd91492ac9e86fb4de0b7db97e72034ea9e3136e70
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010508-88AVPY

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix cloud backend failure exit semantics

Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.

## Scope

- In scope: Fix GitHub issues #4343 and #4339. Ensure backend/cloud commands that surface E_BACKEND or E_NETWORK failures return nonzero exit codes and expose deterministic tests. No fallback or backwards-compatible aliases.
- Out of scope: unrelated refactors not required for "Fix cloud backend failure exit semantics".

## Plan

Plan:
1. Reproduce/locate backend cloud command paths for issue #4343 and #4339.
2. Add or update tests proving cloud/backend sync and task cloud fetch failures exit nonzero when E_BACKEND/E_NETWORK is raised.
3. Fix command/error propagation without legacy fallback paths or compatibility aliases.
4. Run targeted tests plus routing/policy checks.
5. Open a branch_pr PR, merge it to main after hosted checks, then close issues #4343 and #4339 with evidence.

## Verify Steps

1. Add or update regression tests that simulate backend/cloud `E_BACKEND` and `E_NETWORK` failures. Expected: command execution rejects or exits nonzero instead of reporting success.
2. Run targeted backend/cloud command tests. Expected: all targeted tests pass and cover issues #4343 and #4339.
3. Run routing/policy checks for the touched implementation. Expected: no policy, formatting, or command-contract regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T05:14:32.755Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts. Result: pass, 19 tests. Evidence: regression coverage now asserts cloud push HTTP 502 exits with E_BACKEND/6 and cloud read autosync fetch failure exits with E_NETWORK/7, covering GitHub issues #4343 and #4339. Command: bun run format:changed. Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T05:09:45.879Z, excerpt_hash=sha256:b84f3ece872b461cb297841026814e13e3db4a371bf723128635edbb1761f025

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010508-88AVPY-fix-cloud-backend-failure-exit-semantics/.agentplane/tasks/202606010508-88AVPY/blueprint/resolved-snapshot.json
- old_digest: 72148b189d649d301cbc3cdd91492ac9e86fb4de0b7db97e72034ea9e3136e70
- current_digest: 72148b189d649d301cbc3cdd91492ac9e86fb4de0b7db97e72034ea9e3136e70
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010508-88AVPY

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
