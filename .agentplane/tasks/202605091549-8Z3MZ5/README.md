---
id: "202605091549-8Z3MZ5"
title: "Sync branch_pr task artifacts into worktrees"
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
  updated_at: "2026-05-09T15:50:20.229Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T16:17:53.761Z"
  updated_by: "CODER"
  note: "Verified work start copies active task artifacts into the created worktree."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement branch_pr task artifact synchronization as part of the lifecycle follow-up batch."
events:
  -
    type: "status"
    at: "2026-05-09T15:51:09.977Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement branch_pr task artifact synchronization as part of the lifecycle follow-up batch."
  -
    type: "verify"
    at: "2026-05-09T16:17:53.761Z"
    author: "CODER"
    state: "ok"
    note: "Verified work start copies active task artifacts into the created worktree."
doc_version: 3
doc_updated_at: "2026-05-09T16:17:53.799Z"
doc_updated_by: "CODER"
description: "Fix branch_pr work start/pr open so task README, blueprint snapshot, and PR artifacts are available inside the task worktree, preventing ENOENT when the task was created on the base checkout."
sections:
  Summary: |-
    Sync branch_pr task artifacts into worktrees
    
    Fix branch_pr work start/pr open so task README, blueprint snapshot, and PR artifacts are available inside the task worktree, preventing ENOENT when the task was created on the base checkout.
  Scope: |-
    - In scope: Fix branch_pr work start/pr open so task README, blueprint snapshot, and PR artifacts are available inside the task worktree, preventing ENOENT when the task was created on the base checkout.
    - Out of scope: unrelated refactors not required for "Sync branch_pr task artifacts into worktrees".
  Plan: |-
    Plan:
    1. Reproduce pr open ENOENT when a branch_pr worktree lacks base-created task artifacts.
    2. Update work start or pr open to materialize/sync the task README, blueprint snapshot, and PR artifact directory into the worktree before reading them.
    3. Add focused tests for artifact sync/recovery behavior.
    4. Verify branch_pr PR artifact tests and typecheck.
    
    Acceptance:
    - ap pr open from a task worktree no longer fails because the task README exists only on base.
    - The worktree receives canonical task artifacts without manual cp/mv.
    - Existing PR artifact generation remains unchanged for normal worktrees.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T16:17:53.761Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified work start copies active task artifacts into the created worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T15:51:09.995Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091549-JAE983-lifecycle-followups/.agentplane/tasks/202605091549-8Z3MZ5/blueprint/resolved-snapshot.json
    - old_digest: 0f56c1282f7cd2f015a8b0072b769e49870dda90ddc3de27104cee464098100d
    - current_digest: 0f56c1282f7cd2f015a8b0072b769e49870dda90ddc3de27104cee464098100d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091549-8Z3MZ5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: focused Vitest suite, typecheck, schemas:check, docs:cli:check, lint:core.
      Impact: Newly created task artifacts remain available for start-ready/verify inside task worktrees even when backend readme materialization is not local-only.
      Resolution: Added active task artifact materialization and regression coverage.
id_source: "generated"
---
