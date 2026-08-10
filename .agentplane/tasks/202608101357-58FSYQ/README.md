---
id: "202608101357-58FSYQ"
title: "Reconcile local worktree and branch debt safely"
result_summary: "Merged via PR #4814."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "ops"
task_kind: "ops"
mutation_scope: "ops"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T13:59:35.548Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-10T21:11:00.368Z"
  updated_by: "TESTER"
  note: "PASS for implementation 2a4022ed19eb: provider proof receipts cover four exact merged PR heads; after-inventory is 70 worktrees/84 branches with zero stale or safe-delete candidates and zero duplicate active-task worktrees; primary main equals origin/main; protected RF05B and XS41ZV status/diff/staged digests are unchanged; doctor exits 0 with four pre-existing lifecycle warnings; policy routing passes."
  attempts: 0
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-10T21:47:55.696Z"
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "8d96137482ed18bbe54eae3bde3735cba30983c4"
  message: "🚧 58FSYQ task: preserve active branches in cleanup inventory"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "External EXECUTOR returned blocked: Completed the read-only worktree inventory, but the issued episode cannot perform the approved cleanup because its authority excludes the shared worktree registry and provider-backed lifecycle operations."
  -
    author: "CODER"
    body: "Implementation recorded: provider-backed cleanup removed only four proven merged legacy worktrees/local branches, pruned one absent registration, and preserved every dirty, active, ambiguous, or protected recovery checkout."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4814 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-08-10T14:00:13.465Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "comment"
    at: "2026-08-10T14:04:30.499Z"
    author: "SUPERVISOR"
    body: "External EXECUTOR returned blocked: Completed the read-only worktree inventory, but the issued episode cannot perform the approved cleanup because its authority excludes the shared worktree registry and provider-backed lifecycle operations."
  -
    type: "status"
    at: "2026-08-10T21:07:18.508Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation recorded: provider-backed cleanup removed only four proven merged legacy worktrees/local branches, pruned one absent registration, and preserved every dirty, active, ambiguous, or protected recovery checkout."
    commit: "6822262e8a1aff89b6eb6ef5434ec170016897a9"
  -
    type: "verify"
    at: "2026-08-10T21:11:00.368Z"
    author: "TESTER"
    state: "ok"
    note: "PASS for implementation 2a4022ed19eb: provider proof receipts cover four exact merged PR heads; after-inventory is 70 worktrees/84 branches with zero stale or safe-delete candidates and zero duplicate active-task worktrees; primary main equals origin/main; protected RF05B and XS41ZV status/diff/staged digests are unchanged; doctor exits 0 with four pre-existing lifecycle warnings; policy routing passes."
  -
    type: "status"
    at: "2026-08-10T21:47:55.696Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4814 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
    commit: "8d96137482ed18bbe54eae3bde3735cba30983c4"
doc_version: 3
doc_updated_at: "2026-08-10T21:47:55.708Z"
doc_updated_by: "INTEGRATOR"
description: "Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts."
sections:
  Summary: |-
    Reconcile local worktree and branch debt safely

    Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.
  Scope: |-
    - In scope: Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.
    - Out of scope: unrelated refactors not required for "Reconcile local worktree and branch debt safely".
  Plan: |-
    Goal: reduce local worktree and branch debt without losing user work or reducing supported parallelism.

    1. Capture a machine-readable baseline of all registered worktrees and local branches: path, branch, HEAD, filesystem presence, dirty state, task id, task state, upstream/PR state, merge reachability, and nested-worktree ownership.
    2. Classify every entry as active, dirty, unmerged, ambiguous, stale registration, or safe merged cleanup candidate. Treat missing evidence as ambiguous. Explicitly protect main, open PR branches, current task worktree, and both codex/recovery-mt4fk2-* worktrees.
    3. Identify duplicate worktrees for the same task. The invariant is at most one registered worktree per active task; different active tasks may each have one worktree and run concurrently.
    4. Prune only registrations whose paths are proven absent. Remove clean merged inactive task worktrees and local task branches only through AgentPlane cleanup with explicit task ids, no remote deletion, and a repository-relative report. Never use preserve-dirty or destructive force.
    5. Recompute the inventory after every cleanup batch. Stop on dirty state, an open/unmerged PR, non-ancestor history, missing task truth, unexpected count changes, or any candidate touching a protected recovery checkout.
    6. Record before/after counts, per-entry decisions, retained reasons, cleanup receipts, and rollback/recovery guidance in task artifacts. Keep every retained ambiguous or dirty item visible for later reconciliation.
    7. Verify that main remains equal to origin/main and tracked-clean; no stale registration remains; every active task has at most one worktree; removed branches were merged and inactive; protected recovery hashes and untracked files are unchanged; AgentPlane doctor and routing checks pass.

    Success: local storage and refs contain only justified worktrees/branches, with no loss of user work and no project-wide single-worktree restriction.
    Rollback: stop before any ambiguous deletion; local branches are recoverable from recorded SHAs, and removed worktree directories are recreated from those refs. Remote branches are out of scope.
  Verify Steps: |-
    1. Run agentplane cleanup merged --base main --report .agentplane/tasks/202608101357-58FSYQ/operations/candidates.json without confirmation. Expected: every proposed candidate is clean, merged, inactive, and excludes main, open PRs, the current task, and both codex/recovery-mt4fk2-* branches.
    2. For each approved cleanup batch, retain the AgentPlane report and exact pre-deletion branch SHA. Expected: every removed worktree/local branch has an explicit proof and no remote branch is deleted.
    3. Run git worktree prune --dry-run --verbose after cleanup. Expected: no stale registration is reported.
    4. Recompute worktree-to-task identities. Expected: each active task has at most one registered worktree; distinct active tasks may each have one; every retained inactive worktree has a recorded dirty, unmerged, open, recovery, or ambiguous reason.
    5. Verify the primary checkout is main, its HEAD equals origin/main, and it has no tracked changes.
    6. Verify rf05b diff/staged SHA-256 values remain 48fd0889b89263b0172345217ed97a3cf4b0976996a4183f3d414e0674faef86 and ce1b36a44fc7c15eaf980e6f1b1cf7bf78b7def9a360b8368af60d2ddbab685e, with its three untracked files present. Verify XS41ZV diff/staged SHA-256 values remain 4affeecefecf3af316bdffa514bb1360013db5a04c7d3a7433c0d19b28be6910 and e5e693833dd4c508f6a1cd874f72c70071992a1632d5120fcdf51aeaa776efb4a, with its three untracked entries present.
    7. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both pass; any unrelated pre-existing warning is identified rather than silently ignored.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T21:11:00.368Z — VERIFY — ok

    By: TESTER

    Note: PASS for implementation 2a4022ed19eb: provider proof receipts cover four exact merged PR heads; after-inventory is 70 worktrees/84 branches with zero stale or safe-delete candidates and zero duplicate active-task worktrees; primary main equals origin/main; protected RF05B and XS41ZV status/diff/staged digests are unchanged; doctor exits 0 with four pre-existing lifecycle warnings; policy routing passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:07:18.508Z, excerpt_hash=sha256:390386ebe8cb82bf5fc4de23886869fee34ffda2b2a34fa135ca2ec0f335c78c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101357-58FSYQ-reconcile-local-worktree-and-branch-debt-safely/.agentplane/tasks/202608101357-58FSYQ/blueprint/resolved-snapshot.json
    - old_digest: c4cb21c87ac4b957619ee98c69a30383bdc3050931b3455d00f1fce5fff052f2
    - current_digest: c4cb21c87ac4b957619ee98c69a30383bdc3050931b3455d00f1fce5fff052f2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101357-58FSYQ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101357-58FSYQ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "3d417620e9a8b333416d25c2cf19b3ccbdbdd1c9"
    version: 1
id_source: "generated"
---
## Summary

Reconcile local worktree and branch debt safely

Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.

## Scope

- In scope: Inventory every registered worktree and local branch, prune stale registrations, and remove only worktrees and branches proven clean, merged, inactive, and recoverable. Preserve all dirty, unmerged, active, or ambiguous worktrees, including the two MT4FK2 recovery checkouts. Enforce one worktree per active task while allowing different tasks to run concurrently in separate worktrees. Record machine-checkable before/after evidence and cleanup receipts.
- Out of scope: unrelated refactors not required for "Reconcile local worktree and branch debt safely".

## Plan

Goal: reduce local worktree and branch debt without losing user work or reducing supported parallelism.

1. Capture a machine-readable baseline of all registered worktrees and local branches: path, branch, HEAD, filesystem presence, dirty state, task id, task state, upstream/PR state, merge reachability, and nested-worktree ownership.
2. Classify every entry as active, dirty, unmerged, ambiguous, stale registration, or safe merged cleanup candidate. Treat missing evidence as ambiguous. Explicitly protect main, open PR branches, current task worktree, and both codex/recovery-mt4fk2-* worktrees.
3. Identify duplicate worktrees for the same task. The invariant is at most one registered worktree per active task; different active tasks may each have one worktree and run concurrently.
4. Prune only registrations whose paths are proven absent. Remove clean merged inactive task worktrees and local task branches only through AgentPlane cleanup with explicit task ids, no remote deletion, and a repository-relative report. Never use preserve-dirty or destructive force.
5. Recompute the inventory after every cleanup batch. Stop on dirty state, an open/unmerged PR, non-ancestor history, missing task truth, unexpected count changes, or any candidate touching a protected recovery checkout.
6. Record before/after counts, per-entry decisions, retained reasons, cleanup receipts, and rollback/recovery guidance in task artifacts. Keep every retained ambiguous or dirty item visible for later reconciliation.
7. Verify that main remains equal to origin/main and tracked-clean; no stale registration remains; every active task has at most one worktree; removed branches were merged and inactive; protected recovery hashes and untracked files are unchanged; AgentPlane doctor and routing checks pass.

Success: local storage and refs contain only justified worktrees/branches, with no loss of user work and no project-wide single-worktree restriction.
Rollback: stop before any ambiguous deletion; local branches are recoverable from recorded SHAs, and removed worktree directories are recreated from those refs. Remote branches are out of scope.

## Verify Steps

1. Run agentplane cleanup merged --base main --report .agentplane/tasks/202608101357-58FSYQ/operations/candidates.json without confirmation. Expected: every proposed candidate is clean, merged, inactive, and excludes main, open PRs, the current task, and both codex/recovery-mt4fk2-* branches.
2. For each approved cleanup batch, retain the AgentPlane report and exact pre-deletion branch SHA. Expected: every removed worktree/local branch has an explicit proof and no remote branch is deleted.
3. Run git worktree prune --dry-run --verbose after cleanup. Expected: no stale registration is reported.
4. Recompute worktree-to-task identities. Expected: each active task has at most one registered worktree; distinct active tasks may each have one; every retained inactive worktree has a recorded dirty, unmerged, open, recovery, or ambiguous reason.
5. Verify the primary checkout is main, its HEAD equals origin/main, and it has no tracked changes.
6. Verify rf05b diff/staged SHA-256 values remain 48fd0889b89263b0172345217ed97a3cf4b0976996a4183f3d414e0674faef86 and ce1b36a44fc7c15eaf980e6f1b1cf7bf78b7def9a360b8368af60d2ddbab685e, with its three untracked files present. Verify XS41ZV diff/staged SHA-256 values remain 4affeecefecf3af316bdffa514bb1360013db5a04c7d3a7433c0d19b28be6910 and e5e693833dd4c508f6a1cd874f72c70071992a1632d5120fcdf51aeaa776efb4a, with its three untracked entries present.
7. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: both pass; any unrelated pre-existing warning is identified rather than silently ignored.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T21:11:00.368Z — VERIFY — ok

By: TESTER

Note: PASS for implementation 2a4022ed19eb: provider proof receipts cover four exact merged PR heads; after-inventory is 70 worktrees/84 branches with zero stale or safe-delete candidates and zero duplicate active-task worktrees; primary main equals origin/main; protected RF05B and XS41ZV status/diff/staged digests are unchanged; doctor exits 0 with four pre-existing lifecycle warnings; policy routing passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T21:07:18.508Z, excerpt_hash=sha256:390386ebe8cb82bf5fc4de23886869fee34ffda2b2a34fa135ca2ec0f335c78c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101357-58FSYQ-reconcile-local-worktree-and-branch-debt-safely/.agentplane/tasks/202608101357-58FSYQ/blueprint/resolved-snapshot.json
- old_digest: c4cb21c87ac4b957619ee98c69a30383bdc3050931b3455d00f1fce5fff052f2
- current_digest: c4cb21c87ac4b957619ee98c69a30383bdc3050931b3455d00f1fce5fff052f2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101357-58FSYQ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101357-58FSYQ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-10T21:47:55.696Z`
