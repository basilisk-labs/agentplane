---
id: "202605100832-EATWKQ"
title: "Consolidate branch_pr umbrella and finalize flow"
result_summary: "Merged via PR #3548."
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
  updated_at: "2026-05-10T08:32:14.069Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T08:37:53.475Z"
  updated_by: "CODER"
  note: "Implemented branch_pr umbrella-task guidance, cleanup merged --finalize, and integration queue base-overlap stale detection. Checks passed: targeted vitest 26/26, prettier check, eslint changed TS files, docs:cli:check, policy routing, ap doctor."
  attempts: 0
commit:
  hash: "90ef0c2efa2c589361487c62a89fa5bc26518e5d"
  message: "Merge pull request #3548 from basilisk-labs/task/202605100832-EATWKQ/umbrella-finalize"
comments:
  -
    author: "CODER"
    body: "Start: consolidate branch_pr umbrella-task guidance, post-merge finalize behavior, and integration queue conflict prevention in the dedicated task worktree."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3548 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-10T08:32:49.096Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate branch_pr umbrella-task guidance, post-merge finalize behavior, and integration queue conflict prevention in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-05-10T08:37:53.475Z"
    author: "CODER"
    state: "ok"
    note: "Implemented branch_pr umbrella-task guidance, cleanup merged --finalize, and integration queue base-overlap stale detection. Checks passed: targeted vitest 26/26, prettier check, eslint changed TS files, docs:cli:check, policy routing, ap doctor."
  -
    type: "status"
    at: "2026-05-10T08:47:49.645Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3548 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-10T08:47:49.652Z"
doc_updated_by: "INTEGRATOR"
description: "Clarify and harden branch_pr umbrella-task batching, cleanup/finalize behavior after hosted merges, and integration queue conflict prevention without weakening verification or task traceability."
sections:
  Summary: |-
    Consolidate branch_pr umbrella and finalize flow
    
    Clarify and harden branch_pr umbrella-task batching, cleanup/finalize behavior after hosted merges, and integration queue conflict prevention without weakening verification or task traceability.
  Scope: |-
    - In scope: Clarify and harden branch_pr umbrella-task batching, cleanup/finalize behavior after hosted merges, and integration queue conflict prevention without weakening verification or task traceability.
    - Out of scope: unrelated refactors not required for "Consolidate branch_pr umbrella and finalize flow".
  Plan: |-
    1. Audit current branch_pr batch/included-task, integration queue, hosted-close, and cleanup behavior.
    2. Implement a narrow code change that reduces conflict-prone or incomplete closure behavior.
    3. Update user-facing docs/help so umbrella tasks are an explicit supported path.
    4. Add focused tests for the changed behavior.
    5. Run task verify-show, focused tests, policy routing, and doctor; record verification evidence.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T08:37:53.475Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented branch_pr umbrella-task guidance, cleanup merged --finalize, and integration queue base-overlap stale detection. Checks passed: targeted vitest 26/26, prettier check, eslint changed TS files, docs:cli:check, policy routing, ap doctor.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T08:32:49.107Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100832-EATWKQ-umbrella-finalize/.agentplane/tasks/202605100832-EATWKQ/blueprint/resolved-snapshot.json
    - old_digest: 38bc432df1087a8100b5b294c1ac83340af4398e8a5a15d859bc318f667ac89f
    - current_digest: 38bc432df1087a8100b5b294c1ac83340af4398e8a5a15d859bc318f667ac89f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100832-EATWKQ
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: branch_pr previously required agents to compose fetch, base ff, local cleanup, and remote branch cleanup manually; queued integrations also only rejected changed task heads, not overlapping base movement after enqueue.
      Impact: Post-merge closure is less likely to leave stale worktrees/remote task branches, and queue entries that became conflict-prone are marked rework before integration attempts.
      Resolution: Added cleanup merged --finalize as the consolidated post-merge command; documented umbrella/batch tasks; added queueBaseConflictReason and claim/run-next stale rejection for overlapping base changes.
id_source: "generated"
---
