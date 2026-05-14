---
id: "202605131921-JXEQ8J"
title: "Cloud backend: optional auto-push task status changes to remote"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
  - "sync"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T19:23:02.409Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T07:59:21.140Z"
  updated_by: "CODER"
  note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
  attempts: 0
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Plan approved; implementing opt-in auto-push of local status changes to cloud backend for GitHub issue lifecycle sync."
events:
  -
    type: "status"
    at: "2026-05-13T19:23:14.959Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Plan approved; implementing opt-in auto-push of local status changes to cloud backend for GitHub issue lifecycle sync."
  -
    type: "verify"
    at: "2026-05-14T07:59:21.140Z"
    author: "CODER"
    state: "ok"
    note: "Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed."
doc_version: 3
doc_updated_at: "2026-05-14T07:59:21.152Z"
doc_updated_by: "ORCHESTRATOR"
description: |-
  Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step.
  
  Design constraints:
  - Must be opt-in (flag or config), to preserve the current explicit-sync model by default.
  - Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing.
  - Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first.
  
  Acceptance criteria:
  - Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark).
  - Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates.
  - Update cloud backend docs to explain the new opt-in behavior.
sections:
  Summary: |-
    Cloud backend: optional auto-push task status changes to remote
    
    Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step.
    
    Design constraints:
    - Must be opt-in (flag or config), to preserve the current explicit-sync model by default.
    - Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing.
    - Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first.
    
    Acceptance criteria:
    - Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark).
    - Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates.
    - Update cloud backend docs to explain the new opt-in behavior.
  Scope: |-
    - In scope: Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step. Design constraints: - Must be opt-in (flag or config), to preserve the current explicit-sync model by default. - Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing. - Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first. Acceptance criteria: - Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark). - Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates. - Update cloud backend docs to explain the new opt-in behavior.
    - Out of scope: unrelated refactors not required for "Cloud backend: optional auto-push task status changes to remote".
  Plan: "1) Define opt-in contract for auto-push on status mutations when backend=cloud. 2) Implement toggle (flag or config) so lifecycle commands that change status can trigger a safe cloud push (with staleness/conflict gates and actionable errors). 3) Add focused tests for the toggle and safety gates. 4) Update cloud backend docs + CLI reference. 5) Verify with targeted tests, build, agentplane doctor, and routing check."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T07:59:21.140Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:23:14.959Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605131921-JXEQ8J/blueprint/resolved-snapshot.json
    - old_digest: 572cc98f131538114774f770a6f19778b899f333a5424b02b09d3d5bfbafd7c7
    - current_digest: 572cc98f131538114774f770a6f19778b899f333a5424b02b09d3d5bfbafd7c7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131921-JXEQ8J
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Cloud backend: optional auto-push task status changes to remote

Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step.

Design constraints:
- Must be opt-in (flag or config), to preserve the current explicit-sync model by default.
- Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing.
- Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first.

Acceptance criteria:
- Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark).
- Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates.
- Update cloud backend docs to explain the new opt-in behavior.

## Scope

- In scope: Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step. Design constraints: - Must be opt-in (flag or config), to preserve the current explicit-sync model by default. - Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing. - Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first. Acceptance criteria: - Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark). - Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates. - Update cloud backend docs to explain the new opt-in behavior.
- Out of scope: unrelated refactors not required for "Cloud backend: optional auto-push task status changes to remote".

## Plan

1) Define opt-in contract for auto-push on status mutations when backend=cloud. 2) Implement toggle (flag or config) so lifecycle commands that change status can trigger a safe cloud push (with staleness/conflict gates and actionable errors). 3) Add focused tests for the toggle and safety gates. 4) Update cloud backend docs + CLI reference. 5) Verify with targeted tests, build, agentplane doctor, and routing check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T07:59:21.140Z — VERIFY — ok

By: CODER

Note: Verified in 202605140709-5H7BAA readiness sweep: focused tests, release/docs gates, package install smoke, and empty-folder context assimilation smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T19:23:14.959Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605140709-5H7BAA-v06-readiness-blockers/.agentplane/tasks/202605131921-JXEQ8J/blueprint/resolved-snapshot.json
- old_digest: 572cc98f131538114774f770a6f19778b899f333a5424b02b09d3d5bfbafd7c7
- current_digest: 572cc98f131538114774f770a6f19778b899f333a5424b02b09d3d5bfbafd7c7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131921-JXEQ8J

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
