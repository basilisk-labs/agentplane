---
id: "202605141500-SAV86C"
title: "Allow initial install commit through pre-push"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T15:00:54.644Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T15:20:53.373Z"
  updated_by: "CODER"
  note: "Implemented a narrow managed initial install commit exception in both pre-push implementations and added regression coverage proving fresh install commits pass while install-like subjects touching src remain blocked. Checks passed: pre-push task-binding Vitest 7/7, runtime-shim Vitest 5/5, Prettier check, ESLint on touched files, typecheck after bootstrap, and policy routing. Audit finding: context init uses synthetic CTX1NT bootstrap commit and may have a similar first-push edge; it needs a separate focused reproduction because the temp hook simulation was dominated by package-script resolution noise."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved init/pre-push bootstrap fix by adding a narrow managed initial install commit exception, regression coverage for the first push after init with hooks, and an audit of adjacent managed commit flows for similar hook exception gaps."
events:
  -
    type: "status"
    at: "2026-05-14T15:01:27.245Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved init/pre-push bootstrap fix by adding a narrow managed initial install commit exception, regression coverage for the first push after init with hooks, and an audit of adjacent managed commit flows for similar hook exception gaps."
  -
    type: "verify"
    at: "2026-05-14T15:20:53.373Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a narrow managed initial install commit exception in both pre-push implementations and added regression coverage proving fresh install commits pass while install-like subjects touching src remain blocked. Checks passed: pre-push task-binding Vitest 7/7, runtime-shim Vitest 5/5, Prettier check, ESLint on touched files, typecheck after bootstrap, and policy routing. Audit finding: context init uses synthetic CTX1NT bootstrap commit and may have a similar first-push edge; it needs a separate focused reproduction because the temp hook simulation was dominated by package-script resolution noise."
doc_version: 3
doc_updated_at: "2026-05-14T15:20:53.451Z"
doc_updated_by: "CODER"
description: "Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps."
sections:
  Summary: |-
    Allow initial install commit through pre-push
    
    Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.
  Scope: |-
    - In scope: Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.
    - Out of scope: unrelated refactors not required for "Allow initial install commit through pre-push".
  Plan: "Plan: (1) Reproduce the gap in existing hook/init tests and identify both pre-push implementations that audit outgoing commits. (2) Add a narrow managed initial install commit exception for subjects created by agentplane init, without weakening task-bound mutation checks for ordinary chore commits. (3) Add regression coverage that fresh init install commits with hooks pass the simulated pre-push audit. (4) Run focused hook/init tests plus routing checks. (5) Audit adjacent managed commit flows (upgrade, lifecycle/status/finish, release/apply) for similar hook exception mismatches and record findings."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T15:20:53.373Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented a narrow managed initial install commit exception in both pre-push implementations and added regression coverage proving fresh install commits pass while install-like subjects touching src remain blocked. Checks passed: pre-push task-binding Vitest 7/7, runtime-shim Vitest 5/5, Prettier check, ESLint on touched files, typecheck after bootstrap, and policy routing. Audit finding: context init uses synthetic CTX1NT bootstrap commit and may have a similar first-push edge; it needs a separate focused reproduction because the temp hook simulation was dominated by package-script resolution noise.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:01:27.245Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141500-SAV86C-init-install-prepush/.agentplane/tasks/202605141500-SAV86C/blueprint/resolved-snapshot.json
    - old_digest: 92e173a05253ed5c96af65642f6b9edde2b34f9696faa45067b8798ecaf71355
    - current_digest: 92e173a05253ed5c96af65642f6b9edde2b34f9696faa45067b8798ecaf71355
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141500-SAV86C
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Initial install commits created by agentplane init were not recognized as managed commits by outgoing pre-push task-bound mutation audit.
      Impact: Fresh users could initialize successfully but fail their first git push, as seen in the Windows report.
      Resolution: Added managed install evidence checks constrained by exact install subject shape and bootstrap-managed paths; ordinary mutating paths with the same subject still fail.
id_source: "generated"
---
## Summary

Allow initial install commit through pre-push

Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.

## Scope

- In scope: Fix the task-bound pre-push audit so the AgentPlane-managed initial install commit created by agentplane init can be pushed, then audit adjacent bootstrap/hook exceptions for similar contract gaps.
- Out of scope: unrelated refactors not required for "Allow initial install commit through pre-push".

## Plan

Plan: (1) Reproduce the gap in existing hook/init tests and identify both pre-push implementations that audit outgoing commits. (2) Add a narrow managed initial install commit exception for subjects created by agentplane init, without weakening task-bound mutation checks for ordinary chore commits. (3) Add regression coverage that fresh init install commits with hooks pass the simulated pre-push audit. (4) Run focused hook/init tests plus routing checks. (5) Audit adjacent managed commit flows (upgrade, lifecycle/status/finish, release/apply) for similar hook exception mismatches and record findings.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T15:20:53.373Z — VERIFY — ok

By: CODER

Note: Implemented a narrow managed initial install commit exception in both pre-push implementations and added regression coverage proving fresh install commits pass while install-like subjects touching src remain blocked. Checks passed: pre-push task-binding Vitest 7/7, runtime-shim Vitest 5/5, Prettier check, ESLint on touched files, typecheck after bootstrap, and policy routing. Audit finding: context init uses synthetic CTX1NT bootstrap commit and may have a similar first-push edge; it needs a separate focused reproduction because the temp hook simulation was dominated by package-script resolution noise.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:01:27.245Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141500-SAV86C-init-install-prepush/.agentplane/tasks/202605141500-SAV86C/blueprint/resolved-snapshot.json
- old_digest: 92e173a05253ed5c96af65642f6b9edde2b34f9696faa45067b8798ecaf71355
- current_digest: 92e173a05253ed5c96af65642f6b9edde2b34f9696faa45067b8798ecaf71355
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141500-SAV86C

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Initial install commits created by agentplane init were not recognized as managed commits by outgoing pre-push task-bound mutation audit.
  Impact: Fresh users could initialize successfully but fail their first git push, as seen in the Windows report.
  Resolution: Added managed install evidence checks constrained by exact install subject shape and bootstrap-managed paths; ordinary mutating paths with the same subject still fail.
