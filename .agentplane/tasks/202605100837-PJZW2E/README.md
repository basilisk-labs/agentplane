---
id: "202605100837-PJZW2E"
title: "Pre-v0.5: reject finish --commit-from-comment in branch_pr"
result_summary: "branch_pr finish --commit-from-comment now rejects early with E_USAGE; implementation commits remain task-worktree scoped via explicit --commit hash at finish."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-PGH61Q"
tags:
  - "finish"
  - "git"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "branch_pr finish --commit-from-comment exits before git add and leaves task state unchanged."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:09.738Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T17:31:28.429Z"
  updated_by: "CODER"
  note: "Verified: branch_pr finish --commit-from-comment now fails with E_USAGE before task loading/mutation or commit-from-comment staging; direct/status paths remain covered by focused finish suites."
  attempts: 0
commit:
  hash: "86ea78661e0fae7e141eb812f8009f06a9eca531"
  message: "🚧 PJZW2E task: Pre-v0.5: reject finish --commit-from-comment in branch_pr [202605100837-PJZW2E] (#3570)"
comments:
  -
    author: "CODER"
    body: "Start: reject finish --commit-from-comment in branch_pr before any staging path, preserving direct-mode behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3570 merged to main with local pre-push and hosted docs/checks passing."
events:
  -
    type: "status"
    at: "2026-05-10T17:25:58.116Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reject finish --commit-from-comment in branch_pr before any staging path, preserving direct-mode behavior."
  -
    type: "verify"
    at: "2026-05-10T17:31:28.429Z"
    author: "CODER"
    state: "ok"
    note: "Verified: branch_pr finish --commit-from-comment now fails with E_USAGE before task loading/mutation or commit-from-comment staging; direct/status paths remain covered by focused finish suites."
  -
    type: "status"
    at: "2026-05-10T17:42:47.093Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3570 merged to main with local pre-push and hosted docs/checks passing."
doc_version: 3
doc_updated_at: "2026-05-10T17:42:47.097Z"
doc_updated_by: "INTEGRATOR"
description: "After diagnostics/error taxonomy exists, reject finish --commit-from-comment in branch_pr with E_USAGE explaining that finish runs on base while implementation commits belong to task worktrees. Preserve direct mode."
sections:
  Summary: |-
    Pre-v0.5: reject finish --commit-from-comment in branch_pr
    
    After diagnostics/error taxonomy exists, reject finish --commit-from-comment in branch_pr with E_USAGE explaining that finish runs on base while implementation commits belong to task worktrees. Preserve direct mode.
  Scope: |-
    - In scope: After diagnostics/error taxonomy exists, reject finish --commit-from-comment in branch_pr with E_USAGE explaining that finish runs on base while implementation commits belong to task worktrees. Preserve direct mode.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: reject finish --commit-from-comment in branch_pr".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100837-PGH61Q. Acceptance: branch_pr finish --commit-from-comment exits before git add and leaves task state unchanged.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: reject finish --commit-from-comment in branch_pr". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T17:31:28.429Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: branch_pr finish --commit-from-comment now fails with E_USAGE before task loading/mutation or commit-from-comment staging; direct/status paths remain covered by focused finish suites.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T17:25:58.131Z, excerpt_hash=sha256:2881117c5c177a8763bfa460742f999b1c86e07397229c64aaefa12b7df45c9b
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-PJZW2E-finish-commit-from-comment-guard/.agentplane/tasks/202605100837-PJZW2E/blueprint/resolved-snapshot.json
    - old_digest: 1095d151fd4f18506486de2529e706f96a0838b8e2d59eafe97fcb40090130fa
    - current_digest: 1095d151fd4f18506486de2529e706f96a0838b8e2d59eafe97fcb40090130fa
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-PJZW2E
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
