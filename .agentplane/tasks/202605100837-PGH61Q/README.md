---
id: "202605100837-PGH61Q"
title: "Pre-v0.5: split hook capabilities and declare write intent"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-RQ5BHG"
tags:
  - "git"
  - "hooks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Hook tests assert read-only mode does not write the index and write-capable mode declares mutation kind and lock context."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:07.444Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T17:02:57.220Z"
  updated_by: "CODER"
  note: "Added explicit hook capability declarations: commit-msg/pre-commit/pre-push run as read-only hook_check paths with GIT_OPTIONAL_LOCKS=0 and forbidden Git index write intent; post-merge is declared write-capable but outside the Git index with hook_check lock context. Checks passed: hook capabilities + hook-run Vitest 26 tests, scoped ESLint, Prettier, and agentplane package build."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify hook execution capabilities, keep read-only hooks index-free, and require lock/context for write-capable hook behavior."
events:
  -
    type: "status"
    at: "2026-05-10T16:59:26.662Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify hook execution capabilities, keep read-only hooks index-free, and require lock/context for write-capable hook behavior."
  -
    type: "verify"
    at: "2026-05-10T17:02:57.220Z"
    author: "CODER"
    state: "ok"
    note: "Added explicit hook capability declarations: commit-msg/pre-commit/pre-push run as read-only hook_check paths with GIT_OPTIONAL_LOCKS=0 and forbidden Git index write intent; post-merge is declared write-capable but outside the Git index with hook_check lock context. Checks passed: hook capabilities + hook-run Vitest 26 tests, scoped ESLint, Prettier, and agentplane package build."
doc_version: 3
doc_updated_at: "2026-05-10T17:02:57.230Z"
doc_updated_by: "CODER"
description: "Classify hooks into read-only checks and write-capable enforcement. Read-only hooks should avoid index writes; write-capable hooks must take the worktree mutex or write outside the Git index. Push hooks must not create lifecycle/status commits implicitly."
sections:
  Summary: |-
    Pre-v0.5: split hook capabilities and declare write intent
    
    Classify hooks into read-only checks and write-capable enforcement. Read-only hooks should avoid index writes; write-capable hooks must take the worktree mutex or write outside the Git index. Push hooks must not create lifecycle/status commits implicitly.
  Scope: |-
    - In scope: Classify hooks into read-only checks and write-capable enforcement. Read-only hooks should avoid index writes; write-capable hooks must take the worktree mutex or write outside the Git index. Push hooks must not create lifecycle/status commits implicitly.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: split hook capabilities and declare write intent".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100837-RQ5BHG. Acceptance: Hook tests assert read-only mode does not write the index and write-capable mode declares mutation kind and lock context.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: split hook capabilities and declare write intent". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T17:02:57.220Z — VERIFY — ok
    
    By: CODER
    
    Note: Added explicit hook capability declarations: commit-msg/pre-commit/pre-push run as read-only hook_check paths with GIT_OPTIONAL_LOCKS=0 and forbidden Git index write intent; post-merge is declared write-capable but outside the Git index with hook_check lock context. Checks passed: hook capabilities + hook-run Vitest 26 tests, scoped ESLint, Prettier, and agentplane package build.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T16:59:26.677Z, excerpt_hash=sha256:c0effbf92ae1a8e8b82ed19a08f61ca8eea83c563cdde42a212e634cbad7c94c
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-PGH61Q-hook-capabilities/.agentplane/tasks/202605100837-PGH61Q/blueprint/resolved-snapshot.json
    - old_digest: 52a2193fb26878659c02c219c03b5cbdde497bab4c7829606af79645094a835c
    - current_digest: 52a2193fb26878659c02c219c03b5cbdde497bab4c7829606af79645094a835c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-PGH61Q
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Hook execution now exposes capability mode, Git index write intent, mutation kind, and lock context through a shared contract.
      Impact: Read-only hooks avoid Git index writes, while write-capable hook behavior is explicit instead of hidden.
      Resolution: Keep hook write intent in capabilities.ts and enrich hook CLI errors with the same diagnostic context.
id_source: "generated"
---
