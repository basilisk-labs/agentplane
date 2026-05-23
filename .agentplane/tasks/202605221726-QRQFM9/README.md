---
id: "202605221726-QRQFM9"
title: "Promote MERGED_PENDING_CLOSE to first-class task state"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify:
  - "Confirm DONE remains terminal only after hosted close evidence lands."
  - "Run release task readiness tests with merged-pending-close tasks present."
  - "Run task list/search/next tests for merged-pending-close projection."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:33.692Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T23:56:57.610Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T23:56:57.610Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata."
  evaluated_sha: "9524d8b72be120d36e9b8e7b80afb6ee1c9ec289"
  blueprint_digest: "bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670"
  evidence_refs:
    - ".agentplane/tasks/202605221726-QRQFM9/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-QRQFM9-merged-pending-close-state/.agentplane/tasks/202605221726-QRQFM9/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: promoting merged-pending-close release gate handling and verifying existing task projections."
events:
  -
    type: "status"
    at: "2026-05-22T23:52:55.350Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: promoting merged-pending-close release gate handling and verifying existing task projections."
  -
    type: "verify"
    at: "2026-05-22T23:56:48.760Z"
    author: "CODER"
    state: "ok"
    note: "Verified: merged branch_pr task projection remains visible in task list/search/next, release task registry readiness now detects merged-pending-close from PR metadata with explicit remediation, and DONE remains terminal only after hosted close writes DONE metadata."
  -
    type: "verify"
    at: "2026-05-22T23:56:57.610Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata."
doc_version: 3
doc_updated_at: "2026-05-22T23:56:57.638Z"
doc_updated_by: "CODER"
description: "Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work."
sections:
  Summary: |-
    Promote MERGED_PENDING_CLOSE to first-class task state

    Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
  Scope: |-
    - In scope: Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
    - Out of scope: unrelated refactors not required for "Promote MERGED_PENDING_CLOSE to first-class task state".
  Plan: "Make merged pending close a first-class projected lifecycle state across task list, task search, task next, release readiness, and route status. Preserve canonical terminal DONE semantics while preventing already-merged tasks from reappearing as active implementation work."
  Verify Steps: |-
    1. Run task list/search/next tests for merged-pending-close projection.
    2. Run release task readiness tests with merged-pending-close tasks present.
    3. Confirm DONE remains terminal only after hosted close evidence lands.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T23:56:48.760Z — VERIFY — ok

    By: CODER

    Note: Verified: merged branch_pr task projection remains visible in task list/search/next, release task registry readiness now detects merged-pending-close from PR metadata with explicit remediation, and DONE remains terminal only after hosted close writes DONE metadata.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:52:55.350Z, excerpt_hash=sha256:58de8ffb87bd40b406fc795fffcbef441461fefb6025f3221cd6449cc583b61e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-QRQFM9-merged-pending-close-state/.agentplane/tasks/202605221726-QRQFM9/blueprint/resolved-snapshot.json
    - old_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
    - current_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-QRQFM9

    ### 2026-05-22T23:56:57.610Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:56:48.787Z, excerpt_hash=sha256:58de8ffb87bd40b406fc795fffcbef441461fefb6025f3221cd6449cc583b61e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-QRQFM9-merged-pending-close-state/.agentplane/tasks/202605221726-QRQFM9/blueprint/resolved-snapshot.json
    - old_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
    - current_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-QRQFM9

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Release readiness previously saw a merged branch_pr task as ordinary DOING until hosted close landed.
      Impact: Candidate/publish blockers were correct but imprecise, forcing agents to reconstruct PR state manually.
      Resolution: check-task-state now reads task PR metadata and reports MERGED_PENDING_CLOSE with PR/merge evidence instead of a generic DOING blocker.
id_source: "generated"
---
## Summary

Promote MERGED_PENDING_CLOSE to first-class task state

Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.

## Scope

- In scope: Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
- Out of scope: unrelated refactors not required for "Promote MERGED_PENDING_CLOSE to first-class task state".

## Plan

Make merged pending close a first-class projected lifecycle state across task list, task search, task next, release readiness, and route status. Preserve canonical terminal DONE semantics while preventing already-merged tasks from reappearing as active implementation work.

## Verify Steps

1. Run task list/search/next tests for merged-pending-close projection.
2. Run release task readiness tests with merged-pending-close tasks present.
3. Confirm DONE remains terminal only after hosted close evidence lands.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T23:56:48.760Z — VERIFY — ok

By: CODER

Note: Verified: merged branch_pr task projection remains visible in task list/search/next, release task registry readiness now detects merged-pending-close from PR metadata with explicit remediation, and DONE remains terminal only after hosted close writes DONE metadata.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:52:55.350Z, excerpt_hash=sha256:58de8ffb87bd40b406fc795fffcbef441461fefb6025f3221cd6449cc583b61e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-QRQFM9-merged-pending-close-state/.agentplane/tasks/202605221726-QRQFM9/blueprint/resolved-snapshot.json
- old_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
- current_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-QRQFM9

### 2026-05-22T23:56:57.610Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: projection tests cover task list/search/next; release readiness now has a distinct MERGED_PENDING_CLOSE failure path, while DONE remains unchanged and still requires hosted close metadata.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:56:48.787Z, excerpt_hash=sha256:58de8ffb87bd40b406fc795fffcbef441461fefb6025f3221cd6449cc583b61e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-QRQFM9-merged-pending-close-state/.agentplane/tasks/202605221726-QRQFM9/blueprint/resolved-snapshot.json
- old_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
- current_digest: bad90457b8019377b6012b41e69d02dfa4af26b17c32fd3739fabf84f3cfa670
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-QRQFM9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Release readiness previously saw a merged branch_pr task as ordinary DOING until hosted close landed.
  Impact: Candidate/publish blockers were correct but imprecise, forcing agents to reconstruct PR state manually.
  Resolution: check-task-state now reads task PR metadata and reports MERGED_PENDING_CLOSE with PR/merge evidence instead of a generic DOING blocker.
