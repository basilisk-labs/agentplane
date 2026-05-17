---
id: "202605170811-8DPCYD"
title: "Fix CodeQL hosted close checkout alert"
result_summary: "Merged via PR #3793."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "security"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T08:14:21.839Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T08:47:52.404Z"
  updated_by: "CODER"
  note: "Local verification passed for hosted-close workflow remediation: removed the pull_request_target PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint, core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1 remains open until this branch is published and CodeQL reruns."
  attempts: 0
commit:
  hash: "5adb3a0469a76d960d01d97ef0f8294687f7356c"
  message: "Merge pull request #3793 from basilisk-labs/task/202605170811-8DPCYD/codeql-security-fixes"
comments:
  -
    author: "CODER"
    body: "Start: implementing the primary CodeQL remediation batch in this isolated branch_pr worktree, covering hosted-close checkout plus included task IDs J4R55A, Q06434, X4C8DJ, and 9FFE6Y."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3793 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T08:26:36.260Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the primary CodeQL remediation batch in this isolated branch_pr worktree, covering hosted-close checkout plus included task IDs J4R55A, Q06434, X4C8DJ, and 9FFE6Y."
  -
    type: "verify"
    at: "2026-05-17T08:47:52.404Z"
    author: "CODER"
    state: "ok"
    note: "Local verification passed for hosted-close workflow remediation: removed the pull_request_target PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint, core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1 remains open until this branch is published and CodeQL reruns."
  -
    type: "status"
    at: "2026-05-17T09:33:01.998Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3793 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T09:33:02.003Z"
doc_updated_by: "INTEGRATOR"
description: "Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1."
sections:
  Summary: |-
    Fix CodeQL hosted close checkout alert
    
    Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.
  Scope: |-
    - In scope: Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.
    - Out of scope: unrelated refactors not required for "Fix CodeQL hosted close checkout alert".
  Plan: "Primary batch task. Scope: fix CodeQL hosted-close checkout alert #1 and own the shared PR/worktree for related CodeQL remediation tasks 202605170812-J4R55A, 202605170812-Q06434, 202605170812-X4C8DJ, and 202605170812-9FFE6Y. Implement only security-focused changes needed to remove the unsafe checkout/fetch pattern and keep hosted-close behavior covered by tests or workflow validation."
  Verify Steps: |-
    - Inspect .github/workflows/task-hosted-close.yml and confirm PR code is not checked out/executed from an untrusted head ref before trust boundaries are enforced.
    - Run the focused hosted-close/workflow test or static workflow validation available in this repository.
    - Run node .agentplane/policy/check-routing.mjs.
    - After PR publication or merge, re-query GitHub Code scanning alert #1 and record whether GitHub has closed it or the result is pending a CodeQL run.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T08:47:52.404Z — VERIFY — ok
    
    By: CODER
    
    Note: Local verification passed for hosted-close workflow remediation: removed the pull_request_target PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint, core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1 remains open until this branch is published and CodeQL reruns.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:26:36.260Z, excerpt_hash=sha256:5e57166058677aca57155a6387a42f80d8072ff2913c2766db42332ffe55cf66
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170811-8DPCYD/blueprint/resolved-snapshot.json
    - old_digest: 09e157dcfaf26fce51f63538493b2ba43d5d8e83d556ac5577f7c10d1811b659
    - current_digest: 09e157dcfaf26fce51f63538493b2ba43d5d8e83d556ac5577f7c10d1811b659
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605170811-8DPCYD
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub Code scanning still reports alert #1 on main.
      Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
      Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
id_source: "generated"
---
## Summary

Fix CodeQL hosted close checkout alert

Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.

## Scope

- In scope: Harden GitHub Actions hosted-close checkout/fetch handling for CodeQL alert #1.
- Out of scope: unrelated refactors not required for "Fix CodeQL hosted close checkout alert".

## Plan

Primary batch task. Scope: fix CodeQL hosted-close checkout alert #1 and own the shared PR/worktree for related CodeQL remediation tasks 202605170812-J4R55A, 202605170812-Q06434, 202605170812-X4C8DJ, and 202605170812-9FFE6Y. Implement only security-focused changes needed to remove the unsafe checkout/fetch pattern and keep hosted-close behavior covered by tests or workflow validation.

## Verify Steps

- Inspect .github/workflows/task-hosted-close.yml and confirm PR code is not checked out/executed from an untrusted head ref before trust boundaries are enforced.
- Run the focused hosted-close/workflow test or static workflow validation available in this repository.
- Run node .agentplane/policy/check-routing.mjs.
- After PR publication or merge, re-query GitHub Code scanning alert #1 and record whether GitHub has closed it or the result is pending a CodeQL run.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T08:47:52.404Z — VERIFY — ok

By: CODER

Note: Local verification passed for hosted-close workflow remediation: removed the pull_request_target PR-head fetch, updated the workflow contract test, ran targeted tests (93 pass), exact-file ESLint, core and agentplane typecheck, workflow lint, and policy routing. GitHub Code scanning alert #1 remains open until this branch is published and CodeQL reruns.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T08:26:36.260Z, excerpt_hash=sha256:5e57166058677aca57155a6387a42f80d8072ff2913c2766db42332ffe55cf66

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605170811-8DPCYD-codeql-security-fixes/.agentplane/tasks/202605170811-8DPCYD/blueprint/resolved-snapshot.json
- old_digest: 09e157dcfaf26fce51f63538493b2ba43d5d8e83d556ac5577f7c10d1811b659
- current_digest: 09e157dcfaf26fce51f63538493b2ba43d5d8e83d556ac5577f7c10d1811b659
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605170811-8DPCYD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub Code scanning still reports alert #1 on main.
  Impact: External alert closure is pending hosted CodeQL analysis, not a local test failure.
  Resolution: Publish PR and re-query code scanning after GitHub CodeQL completes.
