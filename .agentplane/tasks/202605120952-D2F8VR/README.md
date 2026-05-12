---
id: "202605120952-D2F8VR"
title: "Block ambiguous nested init roots"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T09:52:23.674Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-12T10:02:56.613Z"
  updated_by: "CODER"
  note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: regression 'init refuses ambiguous nested non-interactive roots without explicit --root' passed and asserted no .git/.agentplane writes; typecheck/routing/doctor OK. Scope: parent Git detection and non-interactive nested init guard."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing parent Git ambiguity detection inside the approved JT6FWR batch worktree, with no-write regression coverage for nested non-interactive init."
events:
  -
    type: "status"
    at: "2026-05-12T09:53:35.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing parent Git ambiguity detection inside the approved JT6FWR batch worktree, with no-write regression coverage for nested non-interactive init."
  -
    type: "verify"
    at: "2026-05-12T10:02:56.613Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: regression 'init refuses ambiguous nested non-interactive roots without explicit --root' passed and asserted no .git/.agentplane writes; typecheck/routing/doctor OK. Scope: parent Git detection and non-interactive nested init guard."
doc_version: 3
doc_updated_at: "2026-05-12T10:02:56.619Z"
doc_updated_by: "CODER"
description: "Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories."
sections:
  Summary: |-
    Block ambiguous nested init roots
    
    Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
  Scope: |-
    - In scope: Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
    - Out of scope: unrelated refactors not required for "Block ambiguous nested init roots".
  Plan: "In the JT6FWR batch worktree, add pure parent Git detection before init writes. Non-interactive init from a nested directory without explicit --root must fail with actionable guidance and no writes; explicit --root remains allowed. Verify with focused init test coverage."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-12T10:02:56.613Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: regression 'init refuses ambiguous nested non-interactive roots without explicit --root' passed and asserted no .git/.agentplane writes; typecheck/routing/doctor OK. Scope: parent Git detection and non-interactive nested init guard.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T09:53:35.247Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605120952-JT6FWR-init-rfq-controls/.agentplane/tasks/202605120952-D2F8VR/blueprint/resolved-snapshot.json
    - old_digest: d005506d7dde5366cef55c2aa25cd0b09fd2e8b39090bacf565fa46597965ce7
    - current_digest: d005506d7dde5366cef55c2aa25cd0b09fd2e8b39090bacf565fa46597965ce7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605120952-D2F8VR
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Block ambiguous nested init roots

Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.

## Scope

- In scope: Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
- Out of scope: unrelated refactors not required for "Block ambiguous nested init roots".

## Plan

In the JT6FWR batch worktree, add pure parent Git detection before init writes. Non-interactive init from a nested directory without explicit --root must fail with actionable guidance and no writes; explicit --root remains allowed. Verify with focused init test coverage.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-12T10:02:56.613Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.init.test.ts packages/agentplane/src/cli/run-cli.core.init.branch-pr.test.ts; bun run typecheck; node .agentplane/policy/check-routing.mjs; ap doctor. Result: pass. Evidence: regression 'init refuses ambiguous nested non-interactive roots without explicit --root' passed and asserted no .git/.agentplane writes; typecheck/routing/doctor OK. Scope: parent Git detection and non-interactive nested init guard.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-12T09:53:35.247Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605120952-JT6FWR-init-rfq-controls/.agentplane/tasks/202605120952-D2F8VR/blueprint/resolved-snapshot.json
- old_digest: d005506d7dde5366cef55c2aa25cd0b09fd2e8b39090bacf565fa46597965ce7
- current_digest: d005506d7dde5366cef55c2aa25cd0b09fd2e8b39090bacf565fa46597965ce7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605120952-D2F8VR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
