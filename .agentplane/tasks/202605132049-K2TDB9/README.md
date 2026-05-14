---
id: "202605132049-K2TDB9"
title: "Make evaluator builtin toggle actually disable builtin entries"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "evaluator"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:39.179Z"
  updated_by: "CODER"
  note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement evaluator catalog builtin toggle behavior inside the approved batch worktree."
events:
  -
    type: "status"
    at: "2026-05-13T21:06:41.639Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement evaluator catalog builtin toggle behavior inside the approved batch worktree."
  -
    type: "verify"
    at: "2026-05-13T21:27:44.265Z"
    author: "CODER"
    state: "ok"
    note: "Verified evaluator --builtin false path omits builtin entries in the existing cli-core evaluator workflow-profile test suite."
  -
    type: "verify"
    at: "2026-05-14T07:59:39.179Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
doc_version: 3
doc_updated_at: "2026-05-14T07:59:39.189Z"
doc_updated_by: "CODER"
description: |-
  GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 (#3657)
  
  Problem: evaluator builtin toggle is advertised but cannot disable builtin entries (boolean default true, no false/negated form).
  
  Acceptance:
  - documented CLI option can request project-only catalog
  - parser/spec supports explicit false state (negated option or enum selector)
  - regression coverage proves builtin entries omitted when requested
sections:
  Summary: |-
    Make evaluator builtin toggle actually disable builtin entries
    
    GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 (#3657)
    
    Problem: evaluator builtin toggle is advertised but cannot disable builtin entries (boolean default true, no false/negated form).
    
    Acceptance:
    - documented CLI option can request project-only catalog
    - parser/spec supports explicit false state (negated option or enum selector)
    - regression coverage proves builtin entries omitted when requested
  Scope: |-
    - In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 (#3657) Problem: evaluator builtin toggle is advertised but cannot disable builtin entries (boolean default true, no false/negated form). Acceptance: - documented CLI option can request project-only catalog - parser/spec supports explicit false state (negated option or enum selector) - regression coverage proves builtin entries omitted when requested.
    - Out of scope: unrelated refactors not required for "Make evaluator builtin toggle actually disable builtin entries".
  Plan: |-
    1. Implement the change for "Make evaluator builtin toggle actually disable builtin entries".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make evaluator builtin toggle actually disable builtin entries". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "Make evaluator builtin toggle actually disable builtin entries". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T21:27:44.265Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified evaluator --builtin false path omits builtin entries in the existing cli-core evaluator workflow-profile test suite.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.639Z, excerpt_hash=sha256:ed38f84d7c25fc8aed01a1276643df1be7a3cdf575adefd0eedb331226d67254
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-K2TDB9/blueprint/resolved-snapshot.json
    - old_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
    - current_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132049-K2TDB9
    
    ### 2026-05-14T07:59:39.179Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:27:44.275Z, excerpt_hash=sha256:ed38f84d7c25fc8aed01a1276643df1be7a3cdf575adefd0eedb331226d67254
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132049-K2TDB9/blueprint/resolved-snapshot.json
    - old_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
    - current_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605132049-K2TDB9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make evaluator builtin toggle actually disable builtin entries

GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 (#3657)

Problem: evaluator builtin toggle is advertised but cannot disable builtin entries (boolean default true, no false/negated form).

Acceptance:
- documented CLI option can request project-only catalog
- parser/spec supports explicit false state (negated option or enum selector)
- regression coverage proves builtin entries omitted when requested

## Scope

- In scope: GitHub issue: https://github.com/basilisk-labs/agentplane/issues/3657 (#3657) Problem: evaluator builtin toggle is advertised but cannot disable builtin entries (boolean default true, no false/negated form). Acceptance: - documented CLI option can request project-only catalog - parser/spec supports explicit false state (negated option or enum selector) - regression coverage proves builtin entries omitted when requested.
- Out of scope: unrelated refactors not required for "Make evaluator builtin toggle actually disable builtin entries".

## Plan

1. Implement the change for "Make evaluator builtin toggle actually disable builtin entries".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Make evaluator builtin toggle actually disable builtin entries". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make evaluator builtin toggle actually disable builtin entries". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T21:27:44.265Z — VERIFY — ok

By: CODER

Note: Verified evaluator --builtin false path omits builtin entries in the existing cli-core evaluator workflow-profile test suite.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:06:41.639Z, excerpt_hash=sha256:ed38f84d7c25fc8aed01a1276643df1be7a3cdf575adefd0eedb331226d67254

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605132103-J5YVSS-remove-tasks-json/.agentplane/tasks/202605132049-K2TDB9/blueprint/resolved-snapshot.json
- old_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
- current_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132049-K2TDB9

### 2026-05-14T07:59:39.179Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T21:27:44.275Z, excerpt_hash=sha256:ed38f84d7c25fc8aed01a1276643df1be7a3cdf575adefd0eedb331226d67254

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605132049-K2TDB9/blueprint/resolved-snapshot.json
- old_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
- current_digest: 416b07291da40ee9a0acc74d810eee1e26998617bd2c997d64f4ccee9b3491a4
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605132049-K2TDB9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
