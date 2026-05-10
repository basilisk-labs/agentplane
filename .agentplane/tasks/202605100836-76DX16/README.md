---
id: "202605100836-76DX16"
title: "Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100836-VEENHF"
tags:
  - "git"
  - "locks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Regression test with fake gitdir/index.lock returns E_GIT_LOCKED before git add."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:36:55.536Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T11:16:01.728Z"
  updated_by: "CODER"
  note: "Verified E_GIT_LOCKED preflight for gitdir index.lock."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: detect gitdir/index.lock before internal git add operations and report E_GIT_LOCKED."
events:
  -
    type: "status"
    at: "2026-05-10T11:10:39.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: detect gitdir/index.lock before internal git add operations and report E_GIT_LOCKED."
  -
    type: "verify"
    at: "2026-05-10T11:16:01.728Z"
    author: "CODER"
    state: "ok"
    note: "Verified E_GIT_LOCKED preflight for gitdir index.lock."
doc_version: 3
doc_updated_at: "2026-05-10T11:16:01.738Z"
doc_updated_by: "CODER"
description: "Before internal git add/write-index operations, detect gitdir/index.lock and emit E_GIT_LOCKED with lock path, age, worktree, and remediation. Do not auto-delete Git index locks."
sections:
  Summary: |-
    Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED
    
    Before internal git add/write-index operations, detect gitdir/index.lock and emit E_GIT_LOCKED with lock path, age, worktree, and remediation. Do not auto-delete Git index locks.
  Scope: |-
    - In scope: Before internal git add/write-index operations, detect gitdir/index.lock and emit E_GIT_LOCKED with lock path, age, worktree, and remediation. Do not auto-delete Git index locks.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100836-VEENHF. Acceptance: Regression test with fake gitdir/index.lock returns E_GIT_LOCKED before git add.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T11:16:01.728Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified E_GIT_LOCKED preflight for gitdir index.lock.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T11:10:39.777Z, excerpt_hash=sha256:dbf7603c00edc651d75c8e09832a984e8e51f9ba8409fdd3291b07119cc320c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100836-76DX16-git-index-lock/.agentplane/tasks/202605100836-76DX16/blueprint/resolved-snapshot.json
    - old_digest: 35dcde82dc0098d59aeaa2cba5f6550ea1009dff67281ca041b5eda000cd8fca
    - current_digest: 35dcde82dc0098d59aeaa2cba5f6550ea1009dff67281ca041b5eda000cd8fca
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100836-76DX16
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added E_GIT_LOCKED error code and stageAllowlist preflight that checks <gitdir>/index.lock before git add, returns lock path/age/remediation/worktree context, and never deletes the Git lock. Regression uses a fake gitdir/index.lock and asserts git.stage is not called. Checks: check:types-files, Vitest allow.test.ts, Prettier check, lint:core, policy routing, ap doctor.
      Impact: Git index lock failures now stop before write attempts with a deterministic recovery message and diagnostic context.
      Resolution: Ready for PR review and merge.
id_source: "generated"
---
