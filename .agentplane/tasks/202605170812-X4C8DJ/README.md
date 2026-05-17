---
id: "202605170812-X4C8DJ"
title: "Fix CodeQL config prototype pollution alerts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:46.206Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:48:49.666Z"
  updated_by: "CODER"
  note: "Local verification passed for config prototype pollution remediation: setByDottedKey now rejects __proto__, prototype, and constructor path segments while preserving valid nested key behavior. Focused config tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #5 and #6 remain open until this branch is published and CodeQL reruns."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: rejecting unsafe dotted config key segments and adding focused config mutation coverage for the approved CodeQL remediation batch."
events:
  -
    type: "status"
    at: "2026-05-17T08:27:21.491Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rejecting unsafe dotted config key segments and adding focused config mutation coverage for the approved CodeQL remediation batch."
  -
    type: "verify"
    at: "2026-05-17T08:48:49.666Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for config prototype pollution remediation: setByDottedKey now rejects __proto__, prototype, and constructor path segments while preserving valid nested key behavior. Focused config tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #5 and #6 remain open until this branch is published and CodeQL reruns."
doc_version: 3
doc_updated_at: "2026-05-17T08:48:49.830Z"
doc_updated_by: "CODER"
description: "Reject unsafe dotted config keys for CodeQL prototype pollution alerts #5 and #6."
sections:
  Summary: |-
    Fix CodeQL config prototype pollution alerts
    
    Reject unsafe dotted config keys for CodeQL prototype pollution alerts #5 and #6.
  Scope: |-
    - In scope: Reject unsafe dotted config keys for CodeQL prototype pollution alerts #5 and #6.
    - Out of scope: unrelated refactors not required for "Fix CodeQL config prototype pollution alerts".
  Plan: "Scope: fix CodeQL prototype pollution alerts #5 and #6 by rejecting unsafe path segments in dotted config keys before object assignment. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD."
  Verify Steps: |-
    - Add or update focused tests for setByDottedKey unsafe segments: __proto__, prototype, and constructor.
    - Verify valid nested config keys still parse scalar values and create normal objects.
    - Run the focused config/defaults tests.
    - Re-query Code scanning alerts #5 and #6 after GitHub CodeQL runs and record closed or pending status.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:48:49.666Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed for config prototype pollution remediation: setByDottedKey now rejects __proto__, prototype, and constructor path segments while preserving valid nested key behavior. Focused config tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #5 and #6 remain open until this branch is published and CodeQL reruns.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:21.491Z, excerpt_hash=sha256:f6f9b8eef3842348998d5af172be97345a59f963d0c0aebb0012b43e0b34da8d
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-X4C8DJ/blueprint/resolved-snapshot.json
    - old_digest: 86183173cf5355b9f0b8aba6140d196c909f29aeffd4b5d1595203fcbf65a5c2
    - current_digest: 86183173cf5355b9f0b8aba6140d196c909f29aeffd4b5d1595203fcbf65a5c2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-X4C8DJ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Code scanning still reports alerts #5 and #6 on main.
      Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
      Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
id_source: "generated"
---
## Summary

Fix CodeQL config prototype pollution alerts

Reject unsafe dotted config keys for CodeQL prototype pollution alerts #5 and #6.

## Scope

- In scope: Reject unsafe dotted config keys for CodeQL prototype pollution alerts #5 and #6.
- Out of scope: unrelated refactors not required for "Fix CodeQL config prototype pollution alerts".

## Plan

Scope: fix CodeQL prototype pollution alerts #5 and #6 by rejecting unsafe path segments in dotted config keys before object assignment. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD.

## Verify Steps

- Add or update focused tests for setByDottedKey unsafe segments: __proto__, prototype, and constructor.
- Verify valid nested config keys still parse scalar values and create normal objects.
- Run the focused config/defaults tests.
- Re-query Code scanning alerts #5 and #6 after GitHub CodeQL runs and record closed or pending status.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:48:49.666Z — VERIFY — ok

By: CODER

Note: Local verification passed for config prototype pollution remediation: setByDottedKey now rejects __proto__, prototype, and constructor path segments while preserving valid nested key behavior. Focused config tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #5 and #6 remain open until this branch is published and CodeQL reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:21.491Z, excerpt_hash=sha256:f6f9b8eef3842348998d5af172be97345a59f963d0c0aebb0012b43e0b34da8d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-X4C8DJ/blueprint/resolved-snapshot.json
- old_digest: 86183173cf5355b9f0b8aba6140d196c909f29aeffd4b5d1595203fcbf65a5c2
- current_digest: 86183173cf5355b9f0b8aba6140d196c909f29aeffd4b5d1595203fcbf65a5c2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-X4C8DJ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Code scanning still reports alerts #5 and #6 on main.
  Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
  Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
