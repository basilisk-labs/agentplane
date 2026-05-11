---
id: "202605100837-6FTSE2"
title: "Pre-v0.5: enforce lifecycle commit-from-comment command matrix"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-PJZW2E"
tags:
  - "git"
  - "lifecycle"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Matrix tests cover allowed and denied command/mode/location combinations."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:11.911Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-11T06:24:37.778Z"
  updated_by: "CODER"
  note: "Verified: lifecycle commit-from-comment matrix is enforced by a shared guard; start-ready/set-status are allowed in direct and branch_pr task worktrees but rejected on branch_pr base, finish is rejected in branch_pr, and verify has no commit-from-comment option."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: enforce lifecycle commit-from-comment command matrix across direct and branch_pr locations."
events:
  -
    type: "status"
    at: "2026-05-11T06:20:43.286Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce lifecycle commit-from-comment command matrix across direct and branch_pr locations."
  -
    type: "verify"
    at: "2026-05-11T06:24:37.778Z"
    author: "CODER"
    state: "ok"
    note: "Verified: lifecycle commit-from-comment matrix is enforced by a shared guard; start-ready/set-status are allowed in direct and branch_pr task worktrees but rejected on branch_pr base, finish is rejected in branch_pr, and verify has no commit-from-comment option."
doc_version: 3
doc_updated_at: "2026-05-11T06:24:37.784Z"
doc_updated_by: "CODER"
description: "Define and enforce the command/mode matrix for start-ready, verify, set-status, and finish commit-from-comment behavior across direct, branch_pr task worktree, and branch_pr base checkout."
sections:
  Summary: |-
    Pre-v0.5: enforce lifecycle commit-from-comment command matrix
    
    Define and enforce the command/mode matrix for start-ready, verify, set-status, and finish commit-from-comment behavior across direct, branch_pr task worktree, and branch_pr base checkout.
  Scope: |-
    - In scope: Define and enforce the command/mode matrix for start-ready, verify, set-status, and finish commit-from-comment behavior across direct, branch_pr task worktree, and branch_pr base checkout.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: enforce lifecycle commit-from-comment command matrix".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100837-PJZW2E. Acceptance: Matrix tests cover allowed and denied command/mode/location combinations.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: enforce lifecycle commit-from-comment command matrix". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-11T06:24:37.778Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: lifecycle commit-from-comment matrix is enforced by a shared guard; start-ready/set-status are allowed in direct and branch_pr task worktrees but rejected on branch_pr base, finish is rejected in branch_pr, and verify has no commit-from-comment option.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-11T06:20:43.296Z, excerpt_hash=sha256:9994c0d9111e0e75254c470d168106ee37246cc35fcd706c6bb071b7504c03c9
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-6FTSE2-lifecycle-commit-matrix/.agentplane/tasks/202605100837-6FTSE2/blueprint/resolved-snapshot.json
    - old_digest: 3a122939c4e5b065c73ed6d92981576c2a743e8cf1056d501a8afca8302652f6
    - current_digest: 3a122939c4e5b065c73ed6d92981576c2a743e8cf1056d501a8afca8302652f6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-6FTSE2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
