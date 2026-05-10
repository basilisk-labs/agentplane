---
id: "202605100836-VEENHF"
title: "Pre-v0.5: add worktree-aware Git context diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100836-R13PHK"
tags:
  - "diagnostics"
  - "git"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Focused tests assert Git errors include worktree/gitdir/task context."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:36:52.433Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T10:55:06.800Z"
  updated_by: "CODER"
  note: "Verified worktree-aware Git context diagnostics for staging failures."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add worktree-aware diagnostic context to internal Git mutation failures."
events:
  -
    type: "status"
    at: "2026-05-10T10:48:31.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add worktree-aware diagnostic context to internal Git mutation failures."
  -
    type: "verify"
    at: "2026-05-10T10:55:06.800Z"
    author: "CODER"
    state: "ok"
    note: "Verified worktree-aware Git context diagnostics for staging failures."
doc_version: 3
doc_updated_at: "2026-05-10T10:55:06.810Z"
doc_updated_by: "CODER"
description: "Capture command, cwd, repo root, gitdir, branch, workflow mode, mutation kind, task id, allow prefixes, changed paths, and staged paths for internal git add/commit/checkout failures."
sections:
  Summary: |-
    Pre-v0.5: add worktree-aware Git context diagnostics
    
    Capture command, cwd, repo root, gitdir, branch, workflow mode, mutation kind, task id, allow prefixes, changed paths, and staged paths for internal git add/commit/checkout failures.
  Scope: |-
    - In scope: Capture command, cwd, repo root, gitdir, branch, workflow mode, mutation kind, task id, allow prefixes, changed paths, and staged paths for internal git add/commit/checkout failures.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: add worktree-aware Git context diagnostics".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100836-R13PHK. Acceptance: Focused tests assert Git errors include worktree/gitdir/task context.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: add worktree-aware Git context diagnostics". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T10:55:06.800Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified worktree-aware Git context diagnostics for staging failures.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T10:48:31.531Z, excerpt_hash=sha256:0af906d6e0c18712313d5a37ebe9995a0857e03318a72c79e7e98ba8c54daf84
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100836-VEENHF-worktree-git-context/.agentplane/tasks/202605100836-VEENHF/blueprint/resolved-snapshot.json
    - old_digest: 95304f5e44b3fa8ee64da3c6e9b3199cddf513e9dfccdf0a5676e7d29c244a77
    - current_digest: 95304f5e44b3fa8ee64da3c6e9b3199cddf513e9dfccdf0a5676e7d29c244a77
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100836-VEENHF
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added resolver-backed Git mutation diagnostic context with cwd, repo root, git dir, branch, workflow mode, task id, mutation kind, allow prefixes, changed paths, and staged paths on stageAllowlist git add failures. Checks: check:types-files for touched files, Vitest allow.test.ts, Prettier check, lint:core, policy routing, ap doctor.
      Impact: Internal git add failures now include actionable worktree context without changing successful staging behavior.
      Resolution: Ready for PR review and merge.
id_source: "generated"
---
