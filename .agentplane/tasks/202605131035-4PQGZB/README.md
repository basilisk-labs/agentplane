---
id: "202605131035-4PQGZB"
title: "Improve provider-neutral PR flow observability"
result_summary: "Merged via PR #3624."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T10:35:18.964Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T10:50:37.709Z"
  updated_by: "CODER"
  note: "Verified: focused CLI tests, typecheck, lint, format, workflow lint, routing check, docs CLI check, critical tests, knip check, and PR flow status smoke passed."
  attempts: 0
commit:
  hash: "165a7551dd7d1f4dafa0e4952c178005271c8483"
  message: "Merge pull request #3624 from basilisk-labs/task/202605131035-4PQGZB/pr-flow-status"
comments:
  -
    author: "CODER"
    body: "Start: Implement provider-neutral PR flow observability, stable remote-check waiting, and clearer close-tail diagnostics in the dedicated branch_pr worktree without adding a gh-based merge wrapper."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3624 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-13T10:36:04.908Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement provider-neutral PR flow observability, stable remote-check waiting, and clearer close-tail diagnostics in the dedicated branch_pr worktree without adding a gh-based merge wrapper."
  -
    type: "verify"
    at: "2026-05-13T10:50:37.709Z"
    author: "CODER"
    state: "ok"
    note: "Verified: focused CLI tests, typecheck, lint, format, workflow lint, routing check, docs CLI check, critical tests, knip check, and PR flow status smoke passed."
  -
    type: "status"
    at: "2026-05-13T11:12:23.708Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3624 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T11:12:23.708Z"
doc_updated_by: "INTEGRATOR"
description: "Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers."
sections:
  Summary: |-
    Improve provider-neutral PR flow observability
    
    Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
  Scope: |-
    - In scope: Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
    - Out of scope: unrelated refactors not required for "Improve provider-neutral PR flow observability".
  Plan: "Implement the next PR Flow improvement slice: add a provider-neutral flow status surface for branch_pr tasks, improve hosted-close/finish diagnostics so close-tail state is explicit, and make remote check waiting require a stable quiet period after late checks appear. Do not implement merge-through-gh; any merge/provider boundary should remain compatible with a future GitHub API provider and later GitLab/other providers. Verify with focused CLI/unit tests, policy routing, typecheck/lint where relevant, and task verification evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T10:50:37.709Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: focused CLI tests, typecheck, lint, format, workflow lint, routing check, docs CLI check, critical tests, knip check, and PR flow status smoke passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:36:04.908Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131035-4PQGZB-pr-flow-status/.agentplane/tasks/202605131035-4PQGZB/blueprint/resolved-snapshot.json
    - old_digest: 2c668b223f0da51d98b5a6b8c379cb2f27e91e4e86be8a9cd69570ae5900faae
    - current_digest: 2c668b223f0da51d98b5a6b8c379cb2f27e91e4e86be8a9cd69570ae5900faae
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131035-4PQGZB
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added stable remote-check polling, read-only pr flow status, and explicit close-tail diagnostics without adding provider-specific merge commands.
      Impact: PR flow is more inspectable and late GitHub/agent checks are less likely to be missed.
      Resolution: Kept merge automation boundary provider-neutral; current implementation reports provider API next action instead of hard-coding gh merge behavior.
id_source: "generated"
---
## Summary

Improve provider-neutral PR flow observability

Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.

## Scope

- In scope: Add provider-neutral PR flow status and stricter close/check diagnostics without implementing merge-through-gh; GitHub is the first provider but interfaces should leave room for GitLab and other git servers.
- Out of scope: unrelated refactors not required for "Improve provider-neutral PR flow observability".

## Plan

Implement the next PR Flow improvement slice: add a provider-neutral flow status surface for branch_pr tasks, improve hosted-close/finish diagnostics so close-tail state is explicit, and make remote check waiting require a stable quiet period after late checks appear. Do not implement merge-through-gh; any merge/provider boundary should remain compatible with a future GitHub API provider and later GitLab/other providers. Verify with focused CLI/unit tests, policy routing, typecheck/lint where relevant, and task verification evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T10:50:37.709Z — VERIFY — ok

By: CODER

Note: Verified: focused CLI tests, typecheck, lint, format, workflow lint, routing check, docs CLI check, critical tests, knip check, and PR flow status smoke passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:36:04.908Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131035-4PQGZB-pr-flow-status/.agentplane/tasks/202605131035-4PQGZB/blueprint/resolved-snapshot.json
- old_digest: 2c668b223f0da51d98b5a6b8c379cb2f27e91e4e86be8a9cd69570ae5900faae
- current_digest: 2c668b223f0da51d98b5a6b8c379cb2f27e91e4e86be8a9cd69570ae5900faae
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131035-4PQGZB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added stable remote-check polling, read-only pr flow status, and explicit close-tail diagnostics without adding provider-specific merge commands.
  Impact: PR flow is more inspectable and late GitHub/agent checks are less likely to be missed.
  Resolution: Kept merge automation boundary provider-neutral; current implementation reports provider API next action instead of hard-coding gh merge behavior.
