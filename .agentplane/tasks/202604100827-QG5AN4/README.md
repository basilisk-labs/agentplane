---
id: "202604100827-QG5AN4"
title: "Clean merged stale repo-local task branches and worktrees"
result_summary: "integrate: squash task/202604100827-QG5AN4/cleanup-stale-worktrees"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T08:53:35.446Z"
  updated_by: "ORCHESTRATOR"
  note: "Retroactive approval after explicit user confirmation to publish the cleanup task artifacts."
verification:
  state: "ok"
  updated_at: "2026-04-10T08:34:06.815Z"
  updated_by: "CODER"
  note: "Removed 9 DONE repo-local worktrees, deleted their 9 local task branches, and dropped merged task-close/202604092006-BGDQEG/root-close while preserving active worktrees and detached ~/.codex checkouts."
commit:
  hash: "10ae95de8993b5e85a1402873cf9b53955a7c5ae"
  message: "🧩 QG5AN4 integrate: maintenance: Clean merged stale repo-local task branches and worktrees"
comments:
  -
    author: "CODER"
    body: "Start: inventory merged repo-local task branches and remove only stale worktrees/branches that are already integrated into main."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100827-QG5AN4/pr."
events:
  -
    type: "status"
    at: "2026-04-10T08:29:19.240Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inventory merged repo-local task branches and remove only stale worktrees/branches that are already integrated into main."
  -
    type: "verify"
    at: "2026-04-10T08:34:06.815Z"
    author: "CODER"
    state: "ok"
    note: "Removed 9 DONE repo-local worktrees, deleted their 9 local task branches, and dropped merged task-close/202604092006-BGDQEG/root-close while preserving active worktrees and detached ~/.codex checkouts."
  -
    type: "status"
    at: "2026-04-10T09:09:05.726Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604100827-QG5AN4/pr."
doc_version: 3
doc_updated_at: "2026-04-10T09:09:05.732Z"
doc_updated_by: "INTEGRATOR"
description: "Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope."
sections:
  Summary: |-
    Clean merged stale repo-local task branches and worktrees
    
    Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.
  Scope: |-
    - In scope: Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.
    - Out of scope: unrelated refactors not required for "Clean merged stale repo-local task branches and worktrees".
  Plan: |-
    1. Inventory repo-local task worktrees and local task branches on the base checkout.
    2. Mark as deletion candidates only branches already merged into main and not equal to main or the active task branch.
    3. Remove matching repo-local worktrees under .agentplane/worktrees/ first, then delete their merged local branches.
    4. Evaluate task-close/* cleanup separately and delete it only if merged into main and not attached to a worktree.
    5. Leave detached ~/.codex/worktrees/* and the active task worktree untouched; record that boundary in the summary.
    6. Re-check git/worktree state and record exact deletions in verification evidence.
  Verify Steps: |-
    1. Run git -C /Users/densmirnov/Github/agentplane worktree list --porcelain. Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, task/202604100827-QG5AN4/cleanup-stale-worktrees, and detached ~/.codex worktrees remain.
    2. Run git -C /Users/densmirnov/Github/agentplane branch --format=%(refname:short). Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees remain.
    3. Run git -C /Users/densmirnov/Github/agentplane status --short --untracked-files=no. Expected: no output.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T08:34:06.815Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed 9 DONE repo-local worktrees, deleted their 9 local task branches, and dropped merged task-close/202604092006-BGDQEG/root-close while preserving active worktrees and detached ~/.codex checkouts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:33:16.737Z, excerpt_hash=sha256:5a5694ba8d773b966edeebb9c6ad1598ef33534a460d14c07735e698d21f1435
    
    Details:
    
    Command: git -C /Users/densmirnov/Github/agentplane worktree list --porcelain
    Result: pass
    Evidence: repo-local worktrees reduced to main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees; detached ~/.codex worktrees remain by design.
    Scope: post-cleanup worktree inventory on the base checkout.
    
    Command: git -C /Users/densmirnov/Github/agentplane branch --format='%(refname:short)'
    Result: pass
    Evidence: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees remain locally.
    Scope: post-cleanup local branch inventory on the base checkout.
    
    Command: git -C /Users/densmirnov/Github/agentplane status --short --untracked-files=no
    Result: pass
    Evidence: no output.
    Scope: base checkout cleanliness after branch/worktree cleanup.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clean merged stale repo-local task branches and worktrees

Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.

## Scope

- In scope: Remove finished repo-local task worktrees and local branches that are already merged into main, while preserving the active task branch/worktree and leaving detached ~/.codex worktrees out of scope.
- Out of scope: unrelated refactors not required for "Clean merged stale repo-local task branches and worktrees".

## Plan

1. Inventory repo-local task worktrees and local task branches on the base checkout.
2. Mark as deletion candidates only branches already merged into main and not equal to main or the active task branch.
3. Remove matching repo-local worktrees under .agentplane/worktrees/ first, then delete their merged local branches.
4. Evaluate task-close/* cleanup separately and delete it only if merged into main and not attached to a worktree.
5. Leave detached ~/.codex/worktrees/* and the active task worktree untouched; record that boundary in the summary.
6. Re-check git/worktree state and record exact deletions in verification evidence.

## Verify Steps

1. Run git -C /Users/densmirnov/Github/agentplane worktree list --porcelain. Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, task/202604100827-QG5AN4/cleanup-stale-worktrees, and detached ~/.codex worktrees remain.
2. Run git -C /Users/densmirnov/Github/agentplane branch --format=%(refname:short). Expected: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees remain.
3. Run git -C /Users/densmirnov/Github/agentplane status --short --untracked-files=no. Expected: no output.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T08:34:06.815Z — VERIFY — ok

By: CODER

Note: Removed 9 DONE repo-local worktrees, deleted their 9 local task branches, and dropped merged task-close/202604092006-BGDQEG/root-close while preserving active worktrees and detached ~/.codex checkouts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T08:33:16.737Z, excerpt_hash=sha256:5a5694ba8d773b966edeebb9c6ad1598ef33534a460d14c07735e698d21f1435

Details:

Command: git -C /Users/densmirnov/Github/agentplane worktree list --porcelain
Result: pass
Evidence: repo-local worktrees reduced to main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees; detached ~/.codex worktrees remain by design.
Scope: post-cleanup worktree inventory on the base checkout.

Command: git -C /Users/densmirnov/Github/agentplane branch --format='%(refname:short)'
Result: pass
Evidence: only main, task/202604100318-2Z6N94/harden-task-lifecycle-status, and task/202604100827-QG5AN4/cleanup-stale-worktrees remain locally.
Scope: post-cleanup local branch inventory on the base checkout.

Command: git -C /Users/densmirnov/Github/agentplane status --short --untracked-files=no
Result: pass
Evidence: no output.
Scope: base checkout cleanliness after branch/worktree cleanup.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
