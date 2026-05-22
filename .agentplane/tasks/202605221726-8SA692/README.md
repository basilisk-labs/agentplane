---
id: "202605221726-8SA692"
title: "Add combined hosted lifecycle status report"
result_summary: "Merged via PR #4048."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "github"
  - "workflow"
verify:
  - "Confirm command degrades clearly when GitHub auth or network is unavailable."
  - "Run command output tests with mocked GitHub/provider data."
  - "Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:36.210Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T23:15:08.379Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T23:15:08.379Z"
  updated_by: "EVALUATOR"
  note: "Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible."
  evaluated_sha: "fa202aa7f8123a8ce3fcba03affed3f37ae8a53e"
  blueprint_digest: "d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef"
  evidence_refs:
    - ".agentplane/tasks/202605221726-8SA692/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-8SA692-hosted-lifecycle-status-report/.agentplane/tasks/202605221726-8SA692/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "598eed4ecdee5d884e32865963e6fc0a4c3df879"
  message: "Merge pull request #4048 from basilisk-labs/task/202605221726-8SA692/hosted-lifecycle-status-report"
comments:
  -
    author: "CODER"
    body: "Start: adding combined hosted lifecycle status report for branch_pr tasks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4048 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-22T23:11:41.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding combined hosted lifecycle status report for branch_pr tasks."
  -
    type: "verify"
    at: "2026-05-22T23:15:03.751Z"
    author: "CODER"
    state: "ok"
    note: "Verified: pr flow status now combines lifecycle, remote PR, hosted checks, review threads, integration queue, handoff, close-tail, and next action; mocked output test covers degraded GitHub PR-number state plus queue/handoff, lint/typecheck/docs CLI checks passed."
  -
    type: "verify"
    at: "2026-05-22T23:15:08.379Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible."
  -
    type: "status"
    at: "2026-05-22T23:38:46.991Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4048 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-22T23:38:46.998Z"
doc_updated_by: "INTEGRATOR"
description: "Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks."
sections:
  Summary: |-
    Add combined hosted lifecycle status report

    Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
  Scope: |-
    - In scope: Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
    - Out of scope: unrelated refactors not required for "Add combined hosted lifecycle status report".
  Plan: "Add a combined hosted lifecycle status surface that keeps ap as lifecycle truth and gh/GitHub as provider truth. The command should show PR number, merge state, checks, unresolved review-thread count, queue/handoff occupancy, close-tail PR, and next safe action without requiring manual command stitching."
  Verify Steps: |-
    1. Run command output tests with mocked GitHub/provider data.
    2. Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state.
    3. Confirm command degrades clearly when GitHub auth or network is unavailable.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T23:15:03.751Z — VERIFY — ok

    By: CODER

    Note: Verified: pr flow status now combines lifecycle, remote PR, hosted checks, review threads, integration queue, handoff, close-tail, and next action; mocked output test covers degraded GitHub PR-number state plus queue/handoff, lint/typecheck/docs CLI checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:11:41.641Z, excerpt_hash=sha256:4ba29801faaa6b9b348da08e907a63ba8554ed7ae1c42136a0766f152bf6b6e9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-8SA692-hosted-lifecycle-status-report/.agentplane/tasks/202605221726-8SA692/blueprint/resolved-snapshot.json
    - old_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
    - current_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-8SA692

    ### 2026-05-22T23:15:08.379Z — VERIFY — ok

    By: EVALUATOR

    Note: Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:15:03.778Z, excerpt_hash=sha256:4ba29801faaa6b9b348da08e907a63ba8554ed7ae1c42136a0766f152bf6b6e9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-8SA692-hosted-lifecycle-status-report/.agentplane/tasks/202605221726-8SA692/blueprint/resolved-snapshot.json
    - old_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
    - current_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221726-8SA692

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add combined hosted lifecycle status report

Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.

## Scope

- In scope: Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
- Out of scope: unrelated refactors not required for "Add combined hosted lifecycle status report".

## Plan

Add a combined hosted lifecycle status surface that keeps ap as lifecycle truth and gh/GitHub as provider truth. The command should show PR number, merge state, checks, unresolved review-thread count, queue/handoff occupancy, close-tail PR, and next safe action without requiring manual command stitching.

## Verify Steps

1. Run command output tests with mocked GitHub/provider data.
2. Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state.
3. Confirm command degrades clearly when GitHub auth or network is unavailable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T23:15:03.751Z — VERIFY — ok

By: CODER

Note: Verified: pr flow status now combines lifecycle, remote PR, hosted checks, review threads, integration queue, handoff, close-tail, and next action; mocked output test covers degraded GitHub PR-number state plus queue/handoff, lint/typecheck/docs CLI checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:11:41.641Z, excerpt_hash=sha256:4ba29801faaa6b9b348da08e907a63ba8554ed7ae1c42136a0766f152bf6b6e9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-8SA692-hosted-lifecycle-status-report/.agentplane/tasks/202605221726-8SA692/blueprint/resolved-snapshot.json
- old_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
- current_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-8SA692

### 2026-05-22T23:15:08.379Z — VERIFY — ok

By: EVALUATOR

Note: Evaluator check: combined report extends the existing branch_pr flow surface without adding a second lifecycle truth; unavailable GitHub/provider state degrades into explicit unchecked reasons and local queue/handoff evidence remains visible.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T23:15:03.778Z, excerpt_hash=sha256:4ba29801faaa6b9b348da08e907a63ba8554ed7ae1c42136a0766f152bf6b6e9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221726-8SA692-hosted-lifecycle-status-report/.agentplane/tasks/202605221726-8SA692/blueprint/resolved-snapshot.json
- old_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
- current_digest: d25e505733877eb7200a4fb76923472a539c38ba67e83aff07a561bdfe5a0bef
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221726-8SA692

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
