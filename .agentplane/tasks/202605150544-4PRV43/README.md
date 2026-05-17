---
id: "202605150544-4PRV43"
title: "Fix issue #3781 snapshot hook rejection"
result_summary: "Merged via PR #3783."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-15T05:44:24.107Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-15T05:47:47.097Z"
  updated_by: "CODER"
  note: "Implemented pre-commit fallback task-id inference from staged task artifact paths and added regression test covering resolved-snapshot task artifact flow; targeted workflow hooks test passes."
  attempts: 0
commit:
  hash: "66bcc5f691f8e62910fddcba834cfc04f90e8315"
  message: "Merge pull request #3783 from basilisk-labs/task/202605150544-4PRV43/snapshot-hook-fix"
comments:
  -
    author: "CODER"
    body: "Start: reproducing hook rejection around blueprint resolved-snapshot artifact and implementing deterministic committable policy for normal task lifecycle without override flags."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3783 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-15T05:44:50.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing hook rejection around blueprint resolved-snapshot artifact and implementing deterministic committable policy for normal task lifecycle without override flags."
  -
    type: "verify"
    at: "2026-05-15T05:47:47.097Z"
    author: "CODER"
    state: "ok"
    note: "Implemented pre-commit fallback task-id inference from staged task artifact paths and added regression test covering resolved-snapshot task artifact flow; targeted workflow hooks test passes."
  -
    type: "status"
    at: "2026-05-17T06:12:37.431Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3783 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T06:12:37.441Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint."
sections:
  Summary: |-
    Fix issue #3781 snapshot hook rejection
    
    Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
  Scope: |-
    - In scope: Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
    - Out of scope: unrelated refactors not required for "Fix issue #3781 snapshot hook rejection".
  Plan: "1) Reproduce issue #3781 with current hook/task flow and locate rejection path for blueprint/resolved-snapshot.json. 2) Implement deterministic snapshot policy in commit/hook validation so normal task flow is committable without special overrides. 3) Add/adjust tests for the intended policy and run targeted verification. 4) Document behavior if needed and link evidence to issue context."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix issue #3781 snapshot hook rejection". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Fix issue #3781 snapshot hook rejection". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-15T05:47:47.097Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented pre-commit fallback task-id inference from staged task artifact paths and added regression test covering resolved-snapshot task artifact flow; targeted workflow hooks test passes.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T05:44:50.647Z, excerpt_hash=sha256:bb94cc14b47d6c1ef041dafc6b7e280e153b852b001415e0a8061a2f930ec5f6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150544-4PRV43-snapshot-hook-fix/.agentplane/tasks/202605150544-4PRV43/blueprint/resolved-snapshot.json
    - old_digest: 5ecb09d9bfe893a0af467e73affbfbf8a127258dc51b83b4661f3dc524c0cfce
    - current_digest: 5ecb09d9bfe893a0af467e73affbfbf8a127258dc51b83b4661f3dc524c0cfce
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605150544-4PRV43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix issue #3781 snapshot hook rejection

Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.

## Scope

- In scope: Resolve hook/task artifact mismatch when resolved-snapshot.json is generated under blueprint.
- Out of scope: unrelated refactors not required for "Fix issue #3781 snapshot hook rejection".

## Plan

1) Reproduce issue #3781 with current hook/task flow and locate rejection path for blueprint/resolved-snapshot.json. 2) Implement deterministic snapshot policy in commit/hook validation so normal task flow is committable without special overrides. 3) Add/adjust tests for the intended policy and run targeted verification. 4) Document behavior if needed and link evidence to issue context.

## Verify Steps

PLANNER fallback scaffold for "Fix issue #3781 snapshot hook rejection". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix issue #3781 snapshot hook rejection". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-15T05:47:47.097Z — VERIFY — ok

By: CODER

Note: Implemented pre-commit fallback task-id inference from staged task artifact paths and added regression test covering resolved-snapshot task artifact flow; targeted workflow hooks test passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-15T05:44:50.647Z, excerpt_hash=sha256:bb94cc14b47d6c1ef041dafc6b7e280e153b852b001415e0a8061a2f930ec5f6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605150544-4PRV43-snapshot-hook-fix/.agentplane/tasks/202605150544-4PRV43/blueprint/resolved-snapshot.json
- old_digest: 5ecb09d9bfe893a0af467e73affbfbf8a127258dc51b83b4661f3dc524c0cfce
- current_digest: 5ecb09d9bfe893a0af467e73affbfbf8a127258dc51b83b4661f3dc524c0cfce
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605150544-4PRV43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
