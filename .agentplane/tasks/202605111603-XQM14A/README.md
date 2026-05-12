---
id: "202605111603-XQM14A"
title: "Fix branch_pr lifecycle and integrate regressions"
status: "DOING"
priority: "med"
owner: "INTEGRATOR"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli,bug,branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T06:12:16.025Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-12T06:13:12.781Z"
  updated_by: "INTEGRATOR"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core. Result: pass. Evidence: full cli-core passed 83 files and 675 tests, including branch_pr lifecycle, integrate, PR artifacts, hosted-close, and finish-close-commit suites. Scope: branch_pr lifecycle and integrate regressions."
  attempts: 0
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: stabilizing branch_pr lifecycle and integrate regressions with focused and full cli-core evidence."
events:
  -
    type: "status"
    at: "2026-05-12T06:12:16.410Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: stabilizing branch_pr lifecycle and integrate regressions with focused and full cli-core evidence."
  -
    type: "verify"
    at: "2026-05-12T06:13:12.781Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core. Result: pass. Evidence: full cli-core passed 83 files and 675 tests, including branch_pr lifecycle, integrate, PR artifacts, hosted-close, and finish-close-commit suites. Scope: branch_pr lifecycle and integrate regressions."
doc_version: 3
doc_updated_at: "2026-05-12T06:13:12.792Z"
doc_updated_by: "INTEGRATOR"
description: "Стабилизировать integrate/pr-flow и finish-команды в branch_pr (timeouts, merge-ветки, close-commit), убрать flaky поведение перед релизом."
sections:
  Summary: |-
    Fix branch_pr lifecycle and integrate regressions
    
    Стабилизировать integrate/pr-flow и finish-команды в branch_pr (timeouts, merge-ветки, close-commit), убрать flaky поведение перед релизом.
  Scope: |-
    - In scope: Стабилизировать integrate/pr-flow и finish-команды в branch_pr (timeouts, merge-ветки, close-commit), убрать flaky поведение перед релизом.
    - Out of scope: unrelated refactors not required for "Fix branch_pr lifecycle and integrate regressions".
  Plan: "Batch v0.5 release readiness plan: 1. Stabilize branch_pr lifecycle, PR artifact, integrate, and finish-close paths. 2. Verify with focused branch_pr lifecycle tests and full cli-core. 3. Keep release blockers explicit before finish."
  Verify Steps: |-
    1. Review the requested outcome for "Fix branch_pr lifecycle and integrate regressions". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-12T06:13:12.781Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core. Result: pass. Evidence: full cli-core passed 83 files and 675 tests, including branch_pr lifecycle, integrate, PR artifacts, hosted-close, and finish-close-commit suites. Scope: branch_pr lifecycle and integrate regressions.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:12:16.410Z, excerpt_hash=sha256:10064235efa1acde4a1fc16cded454400d0344b84ac9f423eacda02f5c7ccbbe
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111603-XQM14A/blueprint/resolved-snapshot.json
    - old_digest: 9622fbc77703378c698e2671b7af06ca682bd37fb307f4570973ecf1a00d805e
    - current_digest: 9622fbc77703378c698e2671b7af06ca682bd37fb307f4570973ecf1a00d805e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605111603-XQM14A
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix branch_pr lifecycle and integrate regressions

Стабилизировать integrate/pr-flow и finish-команды в branch_pr (timeouts, merge-ветки, close-commit), убрать flaky поведение перед релизом.

## Scope

- In scope: Стабилизировать integrate/pr-flow и finish-команды в branch_pr (timeouts, merge-ветки, close-commit), убрать flaky поведение перед релизом.
- Out of scope: unrelated refactors not required for "Fix branch_pr lifecycle and integrate regressions".

## Plan

Batch v0.5 release readiness plan: 1. Stabilize branch_pr lifecycle, PR artifact, integrate, and finish-close paths. 2. Verify with focused branch_pr lifecycle tests and full cli-core. 3. Keep release blockers explicit before finish.

## Verify Steps

1. Review the requested outcome for "Fix branch_pr lifecycle and integrate regressions". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-12T06:13:12.781Z — VERIFY — ok

By: INTEGRATOR

Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core. Result: pass. Evidence: full cli-core passed 83 files and 675 tests, including branch_pr lifecycle, integrate, PR artifacts, hosted-close, and finish-close-commit suites. Scope: branch_pr lifecycle and integrate regressions.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T06:12:16.410Z, excerpt_hash=sha256:10064235efa1acde4a1fc16cded454400d0344b84ac9f423eacda02f5c7ccbbe

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605111603-XQM14A/blueprint/resolved-snapshot.json
- old_digest: 9622fbc77703378c698e2671b7af06ca682bd37fb307f4570973ecf1a00d805e
- current_digest: 9622fbc77703378c698e2671b7af06ca682bd37fb307f4570973ecf1a00d805e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605111603-XQM14A

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
