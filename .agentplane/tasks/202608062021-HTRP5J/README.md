---
id: "202608062021-HTRP5J"
title: "Classify compatibility adapters for bounded 0.8 retirement"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202608061850-BZT3D9"
tags:
  - "code"
  - "compatibility"
  - "governance"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run docs:cli:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:23:01.483Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-06T22:10:57.205Z"
  updated_by: "TESTER"
  note: "Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps."
  attempts: 1
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "f21c4469b93522cd9c953667a9918cd15749a09f"
  message: "✨ HTRP5J compatibility: bound adapter retirement"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: every compatibility adapter now has a validated scheduled-removal, support-window, zero-usage, archive-conversion, or permanent historical-reader policy; doctor legacy exposes policy counts and scopes."
  -
    author: "CODER"
    body: "Rebased the bounded compatibility-retirement implementation onto current main after the shared compatibility foundation merged; all declared verification steps now pass."
events:
  -
    type: "status"
    at: "2026-08-06T22:03:16.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T22:10:42.320Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: every compatibility adapter now has a validated scheduled-removal, support-window, zero-usage, archive-conversion, or permanent historical-reader policy; doctor legacy exposes policy counts and scopes."
  -
    type: "verify"
    at: "2026-08-06T22:10:57.205Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps."
  -
    type: "status"
    at: "2026-08-08T00:20:13.853Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Rebased the bounded compatibility-retirement implementation onto current main after the shared compatibility foundation merged; all declared verification steps now pass."
doc_version: 3
doc_updated_at: "2026-08-08T00:20:13.853Z"
doc_updated_by: "CODER"
description: "Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5."
sections:
  Summary: |-
    Classify compatibility adapters for bounded 0.8 retirement

    Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
  Scope: |-
    - In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
    - Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".
  Plan: "1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
    - bun run test:critical
    - bun run typecheck
    - bun run docs:cli:check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:10:57.205Z — VERIFY — needs_rework

    By: TESTER

    Note: Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:10:42.320Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
    - old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The first critical chunk rejects the pre-0.7.5 compatibility candidate before task-specific critical checks because shared CLI/prompt/package surfaces already drifted on main.
      Impact: This branch cannot receive final verification or publish its implementation head until BZT3D9 updates the reviewed candidate centrally.
      Resolution: Merge BZT3D9, rebase HTRP5J, rerun doctor legacy tests, critical, typecheck, and docs checks, then record pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Classify compatibility adapters for bounded 0.8 retirement

Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.

## Scope

- In scope: Complete the compatibility retirement manifest so every adapter has an explicit removal version, support-until or zero-usage condition, archive conversion policy, or permanent historical-reader designation; keep historical readers out of normal execution paths where already separable, and verify doctor legacy reports the classification without deleting safety or recovery contracts in 0.7.5.
- Out of scope: unrelated refactors not required for "Classify compatibility adapters for bounded 0.8 retirement".

## Plan

1. Audit every compatibility adapter in the retirement manifest and classify it as versioned removal, support-until, minimum zero-usage releases, archive conversion, or permanent historical reader. 2. Add schema validation that forbids an unbounded null retirement policy. 3. Surface the classification and remaining blocker through doctor legacy JSON and text output. 4. Where an existing clean boundary permits it, lazy-load historical readers only from upgrade, doctor, or archive paths; do not perform broad runtime extraction or delete safety/recovery contracts in this patch. 5. Document the 0.8 removal set and verify compatibility and critical suites.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/doctor/legacy-probes.test.ts packages/agentplane/src/commands/doctor-legacy.spec.ts
- bun run test:critical
- bun run typecheck
- bun run docs:cli:check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:10:57.205Z — VERIFY — needs_rework

By: TESTER

Note: Legacy manifest schema v2, doctor report, targeted tests, typecheck, docs reference, lint, and runtime JSON inspection pass. Critical suite remains blocked by the shared compatibility-contract ratchet owned by 202608061850-BZT3D9; rebase after that foundation merges and rerun all Verify Steps.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:10:42.320Z, excerpt_hash=sha256:0808c51040237f79c1a808bd3980ac46b01d0d6d371abd836fbb241ce031c10f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-HTRP5J-classify-compatibility-adapters-for-bounded-0-8/.agentplane/tasks/202608062021-HTRP5J/blueprint/resolved-snapshot.json
- old_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- current_digest: e17243ad8f8d431cb3e61b5bb0497de50b17e1626e2cb2fe4f7299e20fd4c7cc
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-HTRP5J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-HTRP5J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The first critical chunk rejects the pre-0.7.5 compatibility candidate before task-specific critical checks because shared CLI/prompt/package surfaces already drifted on main.
  Impact: This branch cannot receive final verification or publish its implementation head until BZT3D9 updates the reviewed candidate centrally.
  Resolution: Merge BZT3D9, rebase HTRP5J, rerun doctor legacy tests, critical, typecheck, and docs checks, then record pass.
