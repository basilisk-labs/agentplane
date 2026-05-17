---
id: "202605170812-9FFE6Y"
title: "Fix CodeQL polynomial regex alerts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "parser"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:51.822Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:49:12.917Z"
  updated_by: "CODER"
  note: "Local verification passed for polynomial regex remediation: commit subject, task doc, and task README parsing now use bounded/manual parsing in the alerted paths, with adversarial long-input tests. Focused tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #2-#4 remain open until this branch is published and CodeQL reruns."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replacing risky regex parsing hotspots with bounded or linear parsing and focused adversarial-input coverage for the approved CodeQL remediation batch."
events:
  -
    type: "status"
    at: "2026-05-17T08:27:35.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replacing risky regex parsing hotspots with bounded or linear parsing and focused adversarial-input coverage for the approved CodeQL remediation batch."
  -
    type: "verify"
    at: "2026-05-17T08:49:12.917Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for polynomial regex remediation: commit subject, task doc, and task README parsing now use bounded/manual parsing in the alerted paths, with adversarial long-input tests. Focused tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #2-#4 remain open until this branch is published and CodeQL reruns."
doc_version: 3
doc_updated_at: "2026-05-17T08:49:12.991Z"
doc_updated_by: "CODER"
description: "Replace regex parsing hotspots that trigger CodeQL polynomial ReDoS alerts #2-#4."
sections:
  Summary: |-
    Fix CodeQL polynomial regex alerts
    
    Replace regex parsing hotspots that trigger CodeQL polynomial ReDoS alerts #2-#4.
  Scope: |-
    - In scope: Replace regex parsing hotspots that trigger CodeQL polynomial ReDoS alerts #2-#4.
    - Out of scope: unrelated refactors not required for "Fix CodeQL polynomial regex alerts".
  Plan: "Scope: fix CodeQL polynomial regex alerts #2-#4 by replacing risky regex usage in commit-policy and task doc/readme parsing with bounded or linear parsing. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD."
  Verify Steps: |-
    - Add or update focused tests for affected parsing helpers with normal and adversarial long inputs.
    - Verify task doc/readme heading behavior and commit subject parsing remain compatible.
    - Run the focused task doc/readme and commit policy tests.
    - Re-query Code scanning alerts #2-#4 after GitHub CodeQL runs and record closed or pending status.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:49:12.917Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed for polynomial regex remediation: commit subject, task doc, and task README parsing now use bounded/manual parsing in the alerted paths, with adversarial long-input tests. Focused tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #2-#4 remain open until this branch is published and CodeQL reruns.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:35.137Z, excerpt_hash=sha256:4fd6d59d12273981e4634e138c028875ed30aafdf4443fa7d228de304fe0fa33
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-9FFE6Y/blueprint/resolved-snapshot.json
    - old_digest: 56fe422511a9db028cb940428bb15bece4189c7128ad66812914f8d774ca4c58
    - current_digest: 56fe422511a9db028cb940428bb15bece4189c7128ad66812914f8d774ca4c58
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170812-9FFE6Y
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Code scanning still reports alerts #2-#4 on main.
      Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
      Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
id_source: "generated"
---
## Summary

Fix CodeQL polynomial regex alerts

Replace regex parsing hotspots that trigger CodeQL polynomial ReDoS alerts #2-#4.

## Scope

- In scope: Replace regex parsing hotspots that trigger CodeQL polynomial ReDoS alerts #2-#4.
- Out of scope: unrelated refactors not required for "Fix CodeQL polynomial regex alerts".

## Plan

Scope: fix CodeQL polynomial regex alerts #2-#4 by replacing risky regex usage in commit-policy and task doc/readme parsing with bounded or linear parsing. Coordinate implementation in the primary batch worktree owned by 202605170811-8DPCYD.

## Verify Steps

- Add or update focused tests for affected parsing helpers with normal and adversarial long inputs.
- Verify task doc/readme heading behavior and commit subject parsing remain compatible.
- Run the focused task doc/readme and commit policy tests.
- Re-query Code scanning alerts #2-#4 after GitHub CodeQL runs and record closed or pending status.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:49:12.917Z — VERIFY — ok

By: CODER

Note: Local verification passed for polynomial regex remediation: commit subject, task doc, and task README parsing now use bounded/manual parsing in the alerted paths, with adversarial long-input tests. Focused tests, exact-file ESLint, core typecheck, and policy routing passed. GitHub Code scanning alerts #2-#4 remain open until this branch is published and CodeQL reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:27:35.137Z, excerpt_hash=sha256:4fd6d59d12273981e4634e138c028875ed30aafdf4443fa7d228de304fe0fa33

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170812-9FFE6Y/blueprint/resolved-snapshot.json
- old_digest: 56fe422511a9db028cb940428bb15bece4189c7128ad66812914f8d774ca4c58
- current_digest: 56fe422511a9db028cb940428bb15bece4189c7128ad66812914f8d774ca4c58
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170812-9FFE6Y

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Code scanning still reports alerts #2-#4 on main.
  Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
  Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
