---
id: "202605170812-J4R55A"
title: "Fix CodeQL process execution alerts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "process"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:32.328Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:48:11.320Z"
  updated_by: "CODER"
  note: "Local verification passed for process execution remediation: run-process now forces argv-only execution and rejects invalid executable names; focused tests, exact-file ESLint, core/agentplane typecheck, and policy routing passed. GitHub Code scanning alerts #7-#17 remain open until this branch is published and CodeQL reruns."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: hardening the shared process execution and git helper command contracts for CodeQL shell command findings in the approved CodeQL remediation batch."
events:
  -
    type: "status"
    at: "2026-05-17T08:26:55.984Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: hardening the shared process execution and git helper command contracts for CodeQL shell command findings in the approved CodeQL remediation batch."
  -
    type: "verify"
    at: "2026-05-17T08:48:11.320Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for process execution remediation: run-process now forces argv-only execution and rejects invalid executable names; focused tests, exact-file ESLint, core/agentplane typecheck, and policy routing passed. GitHub Code scanning alerts #7-#17 remain open until this branch is published and CodeQL reruns."
doc_version: 3
doc_updated_at: "2026-05-17T08:48:11.420Z"
doc_updated_by: "CODER"
description: "Harden process and git command execution contracts for CodeQL shell command alerts #7-#17."
sections:
  Summary: |-
    Fix CodeQL process execution alerts
    
    Harden process and git command execution contracts for CodeQL shell command alerts #7-#17.
  Scope: |-
    - In scope: Harden process and git command execution contracts for CodeQL shell command alerts #7-#17.
    - Out of scope: unrelated refactors not required for "Fix CodeQL process execution alerts".
  Plan: "Scope: fix CodeQL shell command findings #7-#17 by hardening process execution and git helper contracts. Prefer argv-only subprocess APIs, fail closed on shell usage where possible, and keep shell allowance explicit and narrow. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD."
  Verify Steps: |-
    - Add or update focused tests for process execution and git helper command construction.
    - Run the focused process/git test files that cover run-process, git-client, git-diff, task-backend branch snapshot, and commit policy behavior as applicable.
    - Run TypeScript/package checks required by the touched package.
    - Re-query open Code scanning alerts #7-#17 after GitHub CodeQL runs and record closed or pending status.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:48:11.320Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed for process execution remediation: run-process now forces argv-only execution and rejects invalid executable names; focused tests, exact-file ESLint, core/agentplane typecheck, and policy routing passed. GitHub Code scanning alerts #7-#17 remain open until this branch is published and CodeQL reruns.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:26:55.984Z, excerpt_hash=sha256:37f5dc2e72ba8ff0c1062b0db5bdb1cfa04ff260b0f295b10e870700c754c841
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-J4R55A/blueprint/resolved-snapshot.json
    - old_digest: 5f4d86c1ec0f7d9f79cfc5a9aecefe1e6f131bdc7335681912a7128dea6bf6a5
    - current_digest: 5f4d86c1ec0f7d9f79cfc5a9aecefe1e6f131bdc7335681912a7128dea6bf6a5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-J4R55A
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Code scanning still reports alerts #7-#17 on main.
      Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
      Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
id_source: "generated"
---
## Summary

Fix CodeQL process execution alerts

Harden process and git command execution contracts for CodeQL shell command alerts #7-#17.

## Scope

- In scope: Harden process and git command execution contracts for CodeQL shell command alerts #7-#17.
- Out of scope: unrelated refactors not required for "Fix CodeQL process execution alerts".

## Plan

Scope: fix CodeQL shell command findings #7-#17 by hardening process execution and git helper contracts. Prefer argv-only subprocess APIs, fail closed on shell usage where possible, and keep shell allowance explicit and narrow. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD.

## Verify Steps

- Add or update focused tests for process execution and git helper command construction.
- Run the focused process/git test files that cover run-process, git-client, git-diff, task-backend branch snapshot, and commit policy behavior as applicable.
- Run TypeScript/package checks required by the touched package.
- Re-query open Code scanning alerts #7-#17 after GitHub CodeQL runs and record closed or pending status.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:48:11.320Z — VERIFY — ok

By: CODER

Note: Local verification passed for process execution remediation: run-process now forces argv-only execution and rejects invalid executable names; focused tests, exact-file ESLint, core/agentplane typecheck, and policy routing passed. GitHub Code scanning alerts #7-#17 remain open until this branch is published and CodeQL reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:26:55.984Z, excerpt_hash=sha256:37f5dc2e72ba8ff0c1062b0db5bdb1cfa04ff260b0f295b10e870700c754c841

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-J4R55A/blueprint/resolved-snapshot.json
- old_digest: 5f4d86c1ec0f7d9f79cfc5a9aecefe1e6f131bdc7335681912a7128dea6bf6a5
- current_digest: 5f4d86c1ec0f7d9f79cfc5a9aecefe1e6f131bdc7335681912a7128dea6bf6a5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-J4R55A

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Code scanning still reports alerts #7-#17 on main.
  Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
  Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
