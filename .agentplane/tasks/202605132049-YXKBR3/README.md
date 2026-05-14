---
id: "202605132049-YXKBR3"
title: "Surface evaluator project root lookup failures"
result_summary: "Merged to main in PR #3694; v0.6 readiness and assimilation checks passed."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "context"
  - "evaluator"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T09:39:36.205Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:40.533Z"
  updated_by: "CODER"
  note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  attempts: 0
commit:
  hash: "ec628cd9a2aa899cca01611be9519181845ba555"
  message: "Merge pull request #3694 from basilisk-labs/task/202605140709-5H7BAA/v06-readiness-blockers"
comments:
  -
    author: "CODER"
    body: "Start: Implement evaluator project-root failure diagnostics inside the approved batch worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
events:
  -
    type: "status"
    at: "2026-05-13T21:06:41.667Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement evaluator project-root failure diagnostics inside the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-13T21:27:54.969Z"
    author: "CODER"
    state: "ok"
    note: "Added explicit evaluator diagnostic when project-local catalog lookup cannot find an AgentPlane project root; covered by cli-core regression test."
  -
    type: "verify"
    at: "2026-05-14T07:59:40.533Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  -
    type: "status"
    at: "2026-05-14T09:05:19.908Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #3694 after full v0.6 readiness checks and GitHub CI passed."
doc_version: 3
doc_updated_at: "2026-05-14T09:05:19.910Z"
doc_updated_by: "INTEGRATOR"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 (#3655)
  
  Problem: evaluator catalog commands swallow `resolveProject` failures and silently fall back to builtin-only mode, hiding project evaluator catalogs.
  
  Acceptance:
  - running from subdirectories either resolves root or emits explicit diagnostic
  - builtin-only fallback only for intentional no-project contexts
  - regression coverage for subdirectory invocation behavior
sections:
  Summary: |-
    Surface evaluator project root lookup failures
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 (#3655)
    
    Problem: evaluator catalog commands swallow `resolveProject` failures and silently fall back to builtin-only mode, hiding project evaluator catalogs.
    
    Acceptance:
    - running from subdirectories either resolves root or emits explicit diagnostic
    - builtin-only fallback only for intentional no-project contexts
    - regression coverage for subdirectory invocation behavior
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 (#3655) Problem: evaluator catalog commands swallow `resolveProject` failures and silently fall back to builtin-only mode, hiding project evaluator catalogs. Acceptance: - running from subdirectories either resolves root or emits explicit diagnostic - builtin-only fallback only for intentional no-project contexts - regression coverage for subdirectory invocation behavior.
    - Out of scope: unrelated refactors not required for "Surface evaluator project root lookup failures".
  Plan: |-
    1. Implement the change for "Surface evaluator project root lookup failures".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Surface evaluator project root lookup failures". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Surface evaluator project root lookup failures". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T21:27:54.969Z — VERIFY — ok
    
    By: CODER
    
    Note: Added explicit evaluator diagnostic when project-local catalog lookup cannot find an AgentPlane project root; covered by cli-core regression test.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.667Z, excerpt_hash=sha256:2eca16439ccb7d27026b40f5e51b89bec791536e1d35c17e1503adc8da18ced0
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-YXKBR3/blueprint/resolved-snapshot.json
    - old_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
    - current_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132049-YXKBR3
    
    ### 2026-05-14T07:59:40.533Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:27:54.981Z, excerpt_hash=sha256:2eca16439ccb7d27026b40f5e51b89bec791536e1d35c17e1503adc8da18ced0
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132049-YXKBR3/blueprint/resolved-snapshot.json
    - old_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
    - current_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132049-YXKBR3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Surface evaluator project root lookup failures

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 (#3655)

Problem: evaluator catalog commands swallow `resolveProject` failures and silently fall back to builtin-only mode, hiding project evaluator catalogs.

Acceptance:
- running from subdirectories either resolves root or emits explicit diagnostic
- builtin-only fallback only for intentional no-project contexts
- regression coverage for subdirectory invocation behavior

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3655 (#3655) Problem: evaluator catalog commands swallow `resolveProject` failures and silently fall back to builtin-only mode, hiding project evaluator catalogs. Acceptance: - running from subdirectories either resolves root or emits explicit diagnostic - builtin-only fallback only for intentional no-project contexts - regression coverage for subdirectory invocation behavior.
- Out of scope: unrelated refactors not required for "Surface evaluator project root lookup failures".

## Plan

1. Implement the change for "Surface evaluator project root lookup failures".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Surface evaluator project root lookup failures". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Surface evaluator project root lookup failures". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T21:27:54.969Z — VERIFY — ok

By: CODER

Note: Added explicit evaluator diagnostic when project-local catalog lookup cannot find an AgentPlane project root; covered by cli-core regression test.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.667Z, excerpt_hash=sha256:2eca16439ccb7d27026b40f5e51b89bec791536e1d35c17e1503adc8da18ced0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-YXKBR3/blueprint/resolved-snapshot.json
- old_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
- current_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132049-YXKBR3

### 2026-05-14T07:59:40.533Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:27:54.981Z, excerpt_hash=sha256:2eca16439ccb7d27026b40f5e51b89bec791536e1d35c17e1503adc8da18ced0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132049-YXKBR3/blueprint/resolved-snapshot.json
- old_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
- current_digest: 55829f2eb3eeb6d1c7fca33aaa9e74e49cf02927bd82c96d9fcbb04ec0bb31e1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132049-YXKBR3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
