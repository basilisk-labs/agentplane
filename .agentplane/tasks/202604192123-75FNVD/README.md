---
id: "202604192123-75FNVD"
title: "Restore detached-HEAD branch error mapping to E_GIT"
result_summary: "detached-HEAD branch commands now surface deterministic E_GIT again, so critical git-edge no longer blocks push"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "regression"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T21:23:17.854Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T21:24:20.483Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT."
commit:
  hash: "2cec7d58b6bb929370eb0342bb94e58ddd88e7ff"
  message: "🩹 75FNVD task: restore detached-head branch errors to E_GIT"
comments:
  -
    author: "CODER"
    body: "Start: fix the detached-HEAD error regression so branch commands surface deterministic E_GIT again."
  -
    author: "CODER"
    body: "Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT."
events:
  -
    type: "status"
    at: "2026-04-19T21:23:18.304Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the detached-HEAD error regression so branch commands surface deterministic E_GIT again."
  -
    type: "verify"
    at: "2026-04-19T21:24:20.483Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT."
  -
    type: "status"
    at: "2026-04-19T21:24:25.831Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT."
doc_version: 3
doc_updated_at: "2026-04-19T21:24:25.831Z"
doc_updated_by: "CODER"
description: "Pre-push critical git-edge now fails because detached HEAD branch commands return E_IO/exit code 4 instead of the deterministic E_GIT/exit code 5 expected by the critical contract. Localize the regression introduced during recent git/process refactors, restore the CLI error mapping, verify the critical git-edge suite, and unblock epic push."
sections:
  Summary: |-
    Restore detached-HEAD branch error mapping to E_GIT
    
    Pre-push critical git-edge now fails because detached HEAD branch commands return E_IO/exit code 4 instead of the deterministic E_GIT/exit code 5 expected by the critical contract. Localize the regression introduced during recent git/process refactors, restore the CLI error mapping, verify the critical git-edge suite, and unblock epic push.
  Scope: |-
    - In scope: Pre-push critical git-edge now fails because detached HEAD branch commands return E_IO/exit code 4 instead of the deterministic E_GIT/exit code 5 expected by the critical contract. Localize the regression introduced during recent git/process refactors, restore the CLI error mapping, verify the critical git-edge suite, and unblock epic push.
    - Out of scope: unrelated refactors not required for "Restore detached-HEAD branch error mapping to E_GIT".
  Plan: "1. Reproduce the detached-HEAD critical failure and inspect the branch-resolution error path. 2. Restore deterministic E_GIT mapping for detached-HEAD branch commands without weakening the broader error contract. 3. Re-run the critical git-edge suite plus the smallest relevant companion checks, then commit and close the task to unblock epic push."
  Verify Steps: |-
    1. Review the requested outcome for "Restore detached-HEAD branch error mapping to E_GIT". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T21:24:20.483Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:23:18.310Z, excerpt_hash=sha256:40a0e0c6ae6ff20bfcb65701f10f4887bb7a03d5cc7661af4559e3acce71bf72
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Restore detached-HEAD branch error mapping to E_GIT

Pre-push critical git-edge now fails because detached HEAD branch commands return E_IO/exit code 4 instead of the deterministic E_GIT/exit code 5 expected by the critical contract. Localize the regression introduced during recent git/process refactors, restore the CLI error mapping, verify the critical git-edge suite, and unblock epic push.

## Scope

- In scope: Pre-push critical git-edge now fails because detached HEAD branch commands return E_IO/exit code 4 instead of the deterministic E_GIT/exit code 5 expected by the critical contract. Localize the regression introduced during recent git/process refactors, restore the CLI error mapping, verify the critical git-edge suite, and unblock epic push.
- Out of scope: unrelated refactors not required for "Restore detached-HEAD branch error mapping to E_GIT".

## Plan

1. Reproduce the detached-HEAD critical failure and inspect the branch-resolution error path. 2. Restore deterministic E_GIT mapping for detached-HEAD branch commands without weakening the broader error contract. 3. Re-run the critical git-edge suite plus the smallest relevant companion checks, then commit and close the task to unblock epic push.

## Verify Steps

1. Review the requested outcome for "Restore detached-HEAD branch error mapping to E_GIT". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T21:24:20.483Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.critical.git-edge.test.ts and bun run --filter=agentplane build both passed after restoring detached-HEAD branch errors to E_GIT.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T21:23:18.310Z, excerpt_hash=sha256:40a0e0c6ae6ff20bfcb65701f10f4887bb7a03d5cc7661af4559e3acce71bf72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
