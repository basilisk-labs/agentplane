---
id: "202605131804-4E70SD"
title: "Add phase-aware policy engine"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T18:07:08.502Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T18:34:29.387Z"
  updated_by: "CODER"
  note: "Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing phase-aware policy engine in the dedicated branch_pr worktree, scoped to lifecycle phase model and central policy decisions only."
events:
  -
    type: "status"
    at: "2026-05-13T18:09:12.741Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing phase-aware policy engine in the dedicated branch_pr worktree, scoped to lifecycle phase model and central policy decisions only."
  -
    type: "verify"
    at: "2026-05-13T18:34:29.387Z"
    author: "CODER"
    state: "ok"
    note: "Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor."
doc_version: 3
doc_updated_at: "2026-05-13T18:34:29.419Z"
doc_updated_by: "CODER"
description: "Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts."
sections:
  Summary: |-
    Add phase-aware policy engine
    
    Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.
  Scope: |-
    - In scope: Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.
    - Out of scope: unrelated refactors not required for "Add phase-aware policy engine".
  Plan: |-
    1. Add an explicit lifecycle phase model for plan, implement, verify, finish, and integration-oriented task actions.
    2. Extend the central PolicyEngine so task lifecycle actions are evaluated by phase-aware rules instead of default no-op decisions.
    3. Wire the phase policy into core lifecycle commands where mutation starts or records trust: plan approve, start-ready, verify, finish, and integrate if the existing command context is local enough for a focused change.
    4. Keep existing command-local validation intact; phase policy should centralize cross-command invariants without replacing specialized checks.
    5. Add focused unit tests for allowed and denied phase/action combinations plus command integration where practical.
    6. Verify with targeted policy/task tests, typecheck or focused project test if practical, node .agentplane/policy/check-routing.mjs, and agentplane doctor.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T18:34:29.387Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:09:12.741Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131804-4E70SD-phase-aware-policy/.agentplane/tasks/202605131804-4E70SD/blueprint/resolved-snapshot.json
    - old_digest: 6f1d75a829f05d77565c2f545e580d4f97e31623aba6d9763e27ff47a946277c
    - current_digest: 6f1d75a829f05d77565c2f545e580d4f97e31623aba6d9763e27ff47a946277c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131804-4E70SD
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add phase-aware policy engine

Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.

## Scope

- In scope: Introduce explicit lifecycle phases and route core task lifecycle commands through a central phase-aware policy decision layer without adding Runner or mutation allowlist contracts.
- Out of scope: unrelated refactors not required for "Add phase-aware policy engine".

## Plan

1. Add an explicit lifecycle phase model for plan, implement, verify, finish, and integration-oriented task actions.
2. Extend the central PolicyEngine so task lifecycle actions are evaluated by phase-aware rules instead of default no-op decisions.
3. Wire the phase policy into core lifecycle commands where mutation starts or records trust: plan approve, start-ready, verify, finish, and integrate if the existing command context is local enough for a focused change.
4. Keep existing command-local validation intact; phase policy should centralize cross-command invariants without replacing specialized checks.
5. Add focused unit tests for allowed and denied phase/action combinations plus command integration where practical.
6. Verify with targeted policy/task tests, typecheck or focused project test if practical, node .agentplane/policy/check-routing.mjs, and agentplane doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T18:34:29.387Z — VERIFY — ok

By: CODER

Note: Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T18:09:12.741Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131804-4E70SD-phase-aware-policy/.agentplane/tasks/202605131804-4E70SD/blueprint/resolved-snapshot.json
- old_digest: 6f1d75a829f05d77565c2f545e580d4f97e31623aba6d9763e27ff47a946277c
- current_digest: 6f1d75a829f05d77565c2f545e580d4f97e31623aba6d9763e27ff47a946277c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131804-4E70SD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
