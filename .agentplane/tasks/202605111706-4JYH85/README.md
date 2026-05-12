---
id: "202605111706-4JYH85"
title: "Align task README lifecycle fixtures with sectionized format"
status: "DOING"
priority: "med"
owner: "INTEGRATOR"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli,code,bug"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T06:12:30.009Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-12T06:13:27.506Z"
  updated_by: "INTEGRATOR"
  note: "Command: release-smoke, task creation, lifecycle finish/close validation, and full cli-core. Result: pass. Evidence: release-smoke passed 3 tests; focused lifecycle/task suites passed; full cli-core passed 83 files and 675 tests. Scope: sectionized task README lifecycle fixtures and output text drift."
  attempts: 0
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: aligning task README lifecycle fixtures with sectionized doc_version 3 rendering and release-smoke evidence."
events:
  -
    type: "status"
    at: "2026-05-12T06:12:30.397Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: aligning task README lifecycle fixtures with sectionized doc_version 3 rendering and release-smoke evidence."
  -
    type: "verify"
    at: "2026-05-12T06:13:27.506Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Command: release-smoke, task creation, lifecycle finish/close validation, and full cli-core. Result: pass. Evidence: release-smoke passed 3 tests; focused lifecycle/task suites passed; full cli-core passed 83 files and 675 tests. Scope: sectionized task README lifecycle fixtures and output text drift."
doc_version: 3
doc_updated_at: "2026-05-12T06:13:27.518Z"
doc_updated_by: "INTEGRATOR"
description: "Обновить тесты и фикстуры task lifecycle (finish, close-commit, release-smoke) под новую секционированную разметку README, убрать ожидание legacy заголовков и проверить выходные тексты."
sections:
  Summary: |-
    Align task README lifecycle fixtures with sectionized format
    
    Обновить тесты и фикстуры task lifecycle (finish, close-commit, release-smoke) под новую секционированную разметку README, убрать ожидание legacy заголовков и проверить выходные тексты.
  Scope: |-
    - In scope: Обновить тесты и фикстуры task lifecycle (finish, close-commit, release-smoke) под новую секционированную разметку README, убрать ожидание legacy заголовков и проверить выходные тексты.
    - Out of scope: unrelated refactors not required for "Align task README lifecycle fixtures with sectionized format".
  Plan: "Batch v0.5 release readiness plan: 1. Align task README lifecycle fixtures with doc_version=3 sectionized rendering. 2. Verify release-smoke, task creation, finish, close-commit, and full cli-core. 3. Record residual fixture drift before finish."
  Verify Steps: |-
    1. Review the requested outcome for "Align task README lifecycle fixtures with sectionized format". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-12T06:13:27.506Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Command: release-smoke, task creation, lifecycle finish/close validation, and full cli-core. Result: pass. Evidence: release-smoke passed 3 tests; focused lifecycle/task suites passed; full cli-core passed 83 files and 675 tests. Scope: sectionized task README lifecycle fixtures and output text drift.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:12:30.397Z, excerpt_hash=sha256:6b1e9c798932478de4eb62c162c1d14c431a04529e6ef12ff69f026f4a07ac2b
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111706-4JYH85/blueprint/resolved-snapshot.json
    - old_digest: 2de12e0f4914a6a797816107781d082b8b4a45fd9889d5a5721f6fc770e0eb76
    - current_digest: 2de12e0f4914a6a797816107781d082b8b4a45fd9889d5a5721f6fc770e0eb76
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111706-4JYH85
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align task README lifecycle fixtures with sectionized format

Обновить тесты и фикстуры task lifecycle (finish, close-commit, release-smoke) под новую секционированную разметку README, убрать ожидание legacy заголовков и проверить выходные тексты.

## Scope

- In scope: Обновить тесты и фикстуры task lifecycle (finish, close-commit, release-smoke) под новую секционированную разметку README, убрать ожидание legacy заголовков и проверить выходные тексты.
- Out of scope: unrelated refactors not required for "Align task README lifecycle fixtures with sectionized format".

## Plan

Batch v0.5 release readiness plan: 1. Align task README lifecycle fixtures with doc_version=3 sectionized rendering. 2. Verify release-smoke, task creation, finish, close-commit, and full cli-core. 3. Record residual fixture drift before finish.

## Verify Steps

1. Review the requested outcome for "Align task README lifecycle fixtures with sectionized format". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-12T06:13:27.506Z — VERIFY — ok

By: INTEGRATOR

Note: Command: release-smoke, task creation, lifecycle finish/close validation, and full cli-core. Result: pass. Evidence: release-smoke passed 3 tests; focused lifecycle/task suites passed; full cli-core passed 83 files and 675 tests. Scope: sectionized task README lifecycle fixtures and output text drift.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:12:30.397Z, excerpt_hash=sha256:6b1e9c798932478de4eb62c162c1d14c431a04529e6ef12ff69f026f4a07ac2b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111706-4JYH85/blueprint/resolved-snapshot.json
- old_digest: 2de12e0f4914a6a797816107781d082b8b4a45fd9889d5a5721f6fc770e0eb76
- current_digest: 2de12e0f4914a6a797816107781d082b8b4a45fd9889d5a5721f6fc770e0eb76
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111706-4JYH85

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
