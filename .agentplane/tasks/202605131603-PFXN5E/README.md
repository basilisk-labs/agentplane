---
id: "202605131603-PFXN5E"
title: "Automate branch_pr merge queue finalization"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T16:03:36.556Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T16:35:13.190Z"
  updated_by: "CODER"
  note: "Final verification after queue drain/docs refresh: focused integrate and queue tests passed (4 files, 18 tests); eslint passed for changed TS; bun run typecheck passed; format/checks passed through pre-push up to the cold-start timing guard; PR branch pushed at 401d1ac6d."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr merge queue finalization and hosted merge-method changes from the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-05-13T16:03:49.825Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr merge queue finalization and hosted merge-method changes from the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-13T16:09:55.166Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/queue-mutex.test.ts; Result: pass; Evidence: 5 files, 26 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bunx eslint changed TS files; Result: pass. Command: git diff --check && node .agentplane/policy/check-routing.mjs && agentplane doctor; Result: pass; Evidence: routing OK, doctor OK."
  -
    type: "verify"
    at: "2026-05-13T16:11:35.161Z"
    author: "CODER"
    state: "ok"
    note: "Updated verification after diagnostic refinement: eslint on changed TS passed; focused Vitest for hosted-close workflow and integrate command passed (2 files, 9 tests); bun run typecheck passed; git diff --check passed."
  -
    type: "verify"
    at: "2026-05-13T16:35:13.190Z"
    author: "CODER"
    state: "ok"
    note: "Final verification after queue drain/docs refresh: focused integrate and queue tests passed (4 files, 18 tests); eslint passed for changed TS; bun run typecheck passed; format/checks passed through pre-push up to the cold-start timing guard; PR branch pushed at 401d1ac6d."
doc_version: 3
doc_updated_at: "2026-05-13T16:35:13.205Z"
doc_updated_by: "CODER"
description: "Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop."
sections:
  Summary: |-
    Automate branch_pr merge queue finalization
    
    Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
  Scope: |-
    - In scope: Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
    - Out of scope: unrelated refactors not required for "Automate branch_pr merge queue finalization".
  Plan: "Plan: (1) inspect current branch_pr merge, hosted-close, and queue runner paths; (2) change hosted GitHub closure PR merge method from squash to merge and update contract tests; (3) add/adjust queue finalization behavior so verified branch_pr work can be enqueued/run through integration without stopping at a manual-only handoff when GitHub merge orchestration is available; (4) update command guidance/docs generated surfaces only where required by changed behavior; (5) run focused queue/hosted-close/integration tests plus routing/doctor checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T16:09:55.166Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/queue-mutex.test.ts; Result: pass; Evidence: 5 files, 26 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bunx eslint changed TS files; Result: pass. Command: git diff --check && node .agentplane/policy/check-routing.mjs && agentplane doctor; Result: pass; Evidence: routing OK, doctor OK.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:03:49.825Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
    - old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131603-PFXN5E
    
    ### 2026-05-13T16:11:35.161Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated verification after diagnostic refinement: eslint on changed TS passed; focused Vitest for hosted-close workflow and integrate command passed (2 files, 9 tests); bun run typecheck passed; git diff --check passed.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:09:55.176Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
    - old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131603-PFXN5E
    
    ### 2026-05-13T16:35:13.190Z — VERIFY — ok
    
    By: CODER
    
    Note: Final verification after queue drain/docs refresh: focused integrate and queue tests passed (4 files, 18 tests); eslint passed for changed TS; bun run typecheck passed; format/checks passed through pre-push up to the cold-start timing guard; PR branch pushed at 401d1ac6d.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:11:35.181Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
    - old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605131603-PFXN5E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Automate branch_pr merge queue finalization

Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.

## Scope

- In scope: Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
- Out of scope: unrelated refactors not required for "Automate branch_pr merge queue finalization".

## Plan

Plan: (1) inspect current branch_pr merge, hosted-close, and queue runner paths; (2) change hosted GitHub closure PR merge method from squash to merge and update contract tests; (3) add/adjust queue finalization behavior so verified branch_pr work can be enqueued/run through integration without stopping at a manual-only handoff when GitHub merge orchestration is available; (4) update command guidance/docs generated surfaces only where required by changed behavior; (5) run focused queue/hosted-close/integration tests plus routing/doctor checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T16:09:55.166Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/commands/task/hosted-close-workflow-contract.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts packages/agentplane/src/commands/pr/integrate/queue-state.test.ts packages/agentplane/src/commands/pr/integrate/queue-mutex.test.ts; Result: pass; Evidence: 5 files, 26 tests passed. Command: bun run typecheck; Result: pass; Evidence: tsc -b completed. Command: bunx eslint changed TS files; Result: pass. Command: git diff --check && node .agentplane/policy/check-routing.mjs && agentplane doctor; Result: pass; Evidence: routing OK, doctor OK.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:03:49.825Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
- old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131603-PFXN5E

### 2026-05-13T16:11:35.161Z — VERIFY — ok

By: CODER

Note: Updated verification after diagnostic refinement: eslint on changed TS passed; focused Vitest for hosted-close workflow and integrate command passed (2 files, 9 tests); bun run typecheck passed; git diff --check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:09:55.176Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
- old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131603-PFXN5E

### 2026-05-13T16:35:13.190Z — VERIFY — ok

By: CODER

Note: Final verification after queue drain/docs refresh: focused integrate and queue tests passed (4 files, 18 tests); eslint passed for changed TS; bun run typecheck passed; format/checks passed through pre-push up to the cold-start timing guard; PR branch pushed at 401d1ac6d.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T16:11:35.181Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605131603-PFXN5E-automate-merge-queue/.agentplane/tasks/202605131603-PFXN5E/blueprint/resolved-snapshot.json
- old_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- current_digest: a3f40c350103e72529e1deffeab13887253e81b561a19614c304fc3908a40253
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605131603-PFXN5E

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
