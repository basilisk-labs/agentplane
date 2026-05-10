---
id: "202605100837-SAJN9F"
title: "Pre-v0.5: introduce worktree-scoped Git mutation mutex"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202605100837-X33YYQ"
tags:
  - "git"
  - "locks"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Concurrent same-worktree writers conflict cleanly; different worktrees do not block each other."
plan_approval:
  state: "approved"
  updated_at: "2026-05-10T08:37:02.876Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-10T15:50:36.084Z"
  updated_by: "CODER"
  note: "Implemented a worktree-scoped AgentPlane Git mutation mutex under .agentplane/cache/locks, keyed from git common dir plus resolved gitdir. Stage paths that write the Git index now take the mutex before git add. Checks passed: targeted Vitest git-mutation+allow suites, prettier check, and scoped eslint for changed files."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement a worktree-scoped Git mutation mutex keyed by repo identity plus gitdir identity, with tests for same-worktree contention and different-worktree independence."
events:
  -
    type: "status"
    at: "2026-05-10T15:42:56.853Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a worktree-scoped Git mutation mutex keyed by repo identity plus gitdir identity, with tests for same-worktree contention and different-worktree independence."
  -
    type: "verify"
    at: "2026-05-10T15:50:36.084Z"
    author: "CODER"
    state: "ok"
    note: "Implemented a worktree-scoped AgentPlane Git mutation mutex under .agentplane/cache/locks, keyed from git common dir plus resolved gitdir. Stage paths that write the Git index now take the mutex before git add. Checks passed: targeted Vitest git-mutation+allow suites, prettier check, and scoped eslint for changed files."
doc_version: 3
doc_updated_at: "2026-05-10T15:50:36.106Z"
doc_updated_by: "CODER"
description: "Add an AgentPlane-level mutex for write operations that touch the Git index. Key it by gitdir hash plus repo identity, not branch name, so different worktrees can proceed independently."
sections:
  Summary: |-
    Pre-v0.5: introduce worktree-scoped Git mutation mutex
    
    Add an AgentPlane-level mutex for write operations that touch the Git index. Key it by gitdir hash plus repo identity, not branch name, so different worktrees can proceed independently.
  Scope: |-
    - In scope: Add an AgentPlane-level mutex for write operations that touch the Git index. Key it by gitdir hash plus repo identity, not branch name, so different worktrees can proceed independently.
    - Out of scope: unrelated refactors not required for "Pre-v0.5: introduce worktree-scoped Git mutation mutex".
  Plan: "Pre-v0.5 optimization gate. Deliver exactly this atomic scope, preserve branch_pr lifecycle contracts, and record verification evidence. Dependency: 202605100837-X33YYQ. Acceptance: Concurrent same-worktree writers conflict cleanly; different worktrees do not block each other.."
  Verify Steps: |-
    1. Review the requested outcome for "Pre-v0.5: introduce worktree-scoped Git mutation mutex". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-10T15:50:36.084Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented a worktree-scoped AgentPlane Git mutation mutex under .agentplane/cache/locks, keyed from git common dir plus resolved gitdir. Stage paths that write the Git index now take the mutex before git add. Checks passed: targeted Vitest git-mutation+allow suites, prettier check, and scoped eslint for changed files.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-10T15:42:56.886Z, excerpt_hash=sha256:b0c1558a3602d347c62e3b2f0d1b3b5f3edaff7b752da93b79e21b3cd14d555f
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605100837-SAJN9F-worktree-mutex/.agentplane/tasks/202605100837-SAJN9F/blueprint/resolved-snapshot.json
    - old_digest: ffcb856706a38da7b3ad08f98064fc6910ad1ceaacf885ccca30c67ee599ce46
    - current_digest: ffcb856706a38da7b3ad08f98064fc6910ad1ceaacf885ccca30c67ee599ce46
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605100837-SAJN9F
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Concurrent same-worktree mutex acquisition returns E_GIT_RACE with lock context; different gitdirs produce different worktree ids and run independently.
      Impact: AgentPlane serializes Git index writers within one worktree without globally blocking independent task worktrees.
      Resolution: Keep Git-owned .git/**/index.lock as diagnostics only; use .agentplane/cache/locks for AgentPlane coordination.
id_source: "generated"
---
