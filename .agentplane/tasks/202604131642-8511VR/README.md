---
id: "202604131642-8511VR"
title: "Stop mirroring active task README into base checkout"
result_summary: "Merged via PR #286."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T16:43:07.057Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T17:09:06.014Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --hookTimeout 60000 --testTimeout 180000
    Result: pass
    Evidence: 44 tests passed across task-backend, branch_pr work-start, start-ready, and integrate flows after framework:dev:bootstrap.
    Scope: branch_pr active README handoff, live worktree fallback, and base-without-readme integrate resolution.
commit:
  hash: "70116b09bce23aa9626b0781151f21957376f53f"
  message: "Stop mirroring active task README into base checkout (8511VR) (#286)"
comments:
  -
    author: "CODER"
    body: "Start: remove branch_pr base-side README mirroring for active tasks, rely on branch snapshots instead, and verify that worktree execution no longer leaves pull-blocking README collisions on main."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #286 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-13T16:43:56.176Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove branch_pr base-side README mirroring for active tasks, rely on branch snapshots instead, and verify that worktree execution no longer leaves pull-blocking README collisions on main."
  -
    type: "verify"
    at: "2026-04-13T17:09:06.014Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --hookTimeout 60000 --testTimeout 180000
      Result: pass
      Evidence: 44 tests passed across task-backend, branch_pr work-start, start-ready, and integrate flows after framework:dev:bootstrap.
      Scope: branch_pr active README handoff, live worktree fallback, and base-without-readme integrate resolution.
  -
    type: "status"
    at: "2026-04-13T17:45:09.677Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #286 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T17:45:09.682Z"
doc_updated_by: "INTEGRATOR"
description: "Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge."
sections:
  Summary: |-
    Stop mirroring active task README into base checkout
    
    Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.
  Scope: |-
    - In scope: Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.
    - Out of scope: unrelated refactors not required for "Stop mirroring active task README into base checkout".
  Plan: |-
    1. Remove branch_pr active-task README mirroring into the base checkout after worktree execution starts.
    2. Keep branch-backed task loading valid so base commands can still resolve the active task when needed.
    3. Update tests to assert no base-side README collision is left behind while branch_pr flows still work.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T17:09:06.014Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --hookTimeout 60000 --testTimeout 180000
    Result: pass
    Evidence: 44 tests passed across task-backend, branch_pr work-start, start-ready, and integrate flows after framework:dev:bootstrap.
    Scope: branch_pr active README handoff, live worktree fallback, and base-without-readme integrate resolution.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T16:43:56.239Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stop mirroring active task README into base checkout

Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.

## Scope

- In scope: Remove branch_pr base-side README mirroring for active tasks so worktree execution does not leave untracked task snapshots on main that later block git pull after merge.
- Out of scope: unrelated refactors not required for "Stop mirroring active task README into base checkout".

## Plan

1. Remove branch_pr active-task README mirroring into the base checkout after worktree execution starts.
2. Keep branch-backed task loading valid so base commands can still resolve the active task when needed.
3. Update tests to assert no base-side README collision is left behind while branch_pr flows still work.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T17:09:06.014Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --hookTimeout 60000 --testTimeout 180000
Result: pass
Evidence: 44 tests passed across task-backend, branch_pr work-start, start-ready, and integrate flows after framework:dev:bootstrap.
Scope: branch_pr active README handoff, live worktree fallback, and base-without-readme integrate resolution.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T16:43:56.239Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
