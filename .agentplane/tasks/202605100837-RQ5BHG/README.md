---
id: "202605100837-RQ5BHG"
title: "Pre-v0.5: separate integration queue from worktree mutex"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-SAJN9F"
tags:
  - "git"
  - "queue"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Tests show integration operations serialize while independent task worktree commits can proceed."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:04.971Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T16:45:11.438Z"
  updated_by: "CODER"
  note: "Implemented a dedicated integration queue mutex under .agentplane/cache/locks/integration-queue.lock and wrapped enqueue/claim/release/run-next queue mutations with it. The queue lane serializes integration state changes, while per-worktree Git mutation mutexes remain independent. Checks passed: queue-state/queue-mutex Vitest 9 tests, scoped ESLint, Prettier, and agentplane package build."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: separate base integration queue coordination from per-worktree Git mutation mutex semantics and add regression evidence."
events:
  -
    type: "status"
    at: "2026-05-10T16:40:15.885Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: separate base integration queue coordination from per-worktree Git mutation mutex semantics and add regression evidence."
  -
    type: "verify"
    at: "2026-05-10T16:45:11.438Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a dedicated integration queue mutex under .agentplane/cache/locks/integration-queue.lock and wrapped enqueue/claim/release/run-next queue mutations with it. The queue lane serializes integration state changes, while per-worktree Git mutation mutexes remain independent. Checks passed: queue-state/queue-mutex Vitest 9 tests, scoped ESLint, Prettier, and agentplane package build."
doc_version: 3
doc_updated_at: "2026-05-10T16:45:11.448Z"
doc_updated_by: "CODER"
description: "Make the model and code paths distinguish base-branch integration queue from per-worktree Git write mutex. Do not serialize independent task worktrees globally."
sections:
  Summary: |-
    Pre-v0.5: separate integration queue from worktree mutex
    
    Make the model and code paths distinguish base-branch integration queue from per-worktree Git write mutex. Do not serialize independent task worktrees globally.
  Scope: |-
    - In scope: Make the model and code paths distinguish base-branch integration queue from per-worktree Git write mutex. Do not serialize independent task worktrees globally.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: separate integration queue from worktree mutex".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100837-SAJN9F. Acceptance: Tests show integration operations serialize while independent task worktree commits can proceed.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: separate integration queue from worktree mutex". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T16:45:11.438Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented a dedicated integration queue mutex under .agentplane/cache/locks/integration-queue.lock and wrapped enqueue/claim/release/run-next queue mutations with it. The queue lane serializes integration state changes, while per-worktree Git mutation mutexes remain independent. Checks passed: queue-state/queue-mutex Vitest 9 tests, scoped ESLint, Prettier, and agentplane package build.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T16:40:15.900Z, excerpt_hash=sha256:c272a59efae44703efcc8a8a3f9019d0b016d0a192af92bf5ef210deeb5c97ed
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-RQ5BHG-integration-queue-mutex/.agentplane/tasks/202605100837-RQ5BHG/blueprint/resolved-snapshot.json
    - old_digest: b5fc21179a3802d656c6f3bf246a9f3a7fef176e8cf640e1f628793e2b82b1ea
    - current_digest: b5fc21179a3802d656c6f3bf246a9f3a7fef176e8cf640e1f628793e2b82b1ea
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-RQ5BHG
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Integration queue write operations now use a queue-owned mutex, while Git index writes still use worktree-id mutexes.
      Impact: Base integration claims serialize without globally blocking independent task worktree commits.
      Resolution: Keep queue coordination in integrate queue code paths and Git index coordination in shared git mutation mutex paths.
id_source: "generated"
---
