---
id: "202605091549-JAE983"
title: "Make finish close-commit atomic under dirty lifecycle state"
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
  updated_at: "2026-05-09T15:50:18.264Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-09T16:17:43.741Z"
  updated_by: "CODER"
  note: "Verified close-commit preflight rejects dirty tracked state before task mutation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement finish close-commit atomicity as part of the lifecycle follow-up batch."
events:
  -
    type: "status"
    at: "2026-05-09T15:51:06.679Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement finish close-commit atomicity as part of the lifecycle follow-up batch."
  -
    type: "verify"
    at: "2026-05-09T16:17:43.741Z"
    author: "CODER"
    state: "ok"
    note: "Verified close-commit preflight rejects dirty tracked state before task mutation."
doc_version: 3
doc_updated_at: "2026-05-09T16:17:43.762Z"
doc_updated_by: "CODER"
description: "Fix ap finish --close-commit so it does not partially transition a task to DONE before proving the deterministic close commit can be created, and add a safe path for batch lifecycle closures."
sections:
  Summary: |-
    Make finish close-commit atomic under dirty lifecycle state
    
    Fix ap finish --close-commit so it does not partially transition a task to DONE before proving the deterministic close commit can be created, and add a safe path for batch lifecycle closures.
  Scope: |-
    - In scope: Fix ap finish --close-commit so it does not partially transition a task to DONE before proving the deterministic close commit can be created, and add a safe path for batch lifecycle closures.
    - Out of scope: unrelated refactors not required for "Make finish close-commit atomic under dirty lifecycle state".
  Plan: |-
    Plan:
    1. Reproduce the dirty-tree close-commit failure path in finish tests.
    2. Move close-commit preflight before irreversible DONE transition, or add rollback so task state stays unchanged when close commit cannot be created.
    3. Add batch-safe guidance/behavior for lifecycle-only closure with multiple task READMEs.
    4. Verify focused finish tests and typecheck.
    
    Acceptance:
    - ap finish --close-commit cannot leave a task DONE when deterministic close commit creation fails.
    - Error output points to a safe recovery path.
    - Existing single-task close commit behavior still works.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-09T16:17:43.741Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified close-commit preflight rejects dirty tracked state before task mutation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-09T15:51:06.694Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605091549-JAE983-lifecycle-followups/.agentplane/tasks/202605091549-JAE983/blueprint/resolved-snapshot.json
    - old_digest: a112e0de7f443102ee8c2a66f848712f7033b7a3948cba3d9da493806f523a7f
    - current_digest: a112e0de7f443102ee8c2a66f848712f7033b7a3948cba3d9da493806f523a7f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605091549-JAE983
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Checks: bun run typecheck; bunx vitest run finish.validation.unit.test.ts work-start.hook-shim.test.ts blueprints/validate.test.ts blueprints/resolve.test.ts; bun run schemas:check; bun run docs:cli:check; bun run lint:core.
      Impact: branch_pr finish no longer marks tasks DONE before a deterministic close commit can be created.
      Resolution: Added close-commit cleanliness guard and regression coverage.
id_source: "generated"
---
