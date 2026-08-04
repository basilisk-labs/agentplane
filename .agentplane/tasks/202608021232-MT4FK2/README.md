---
id: "202608021232-MT4FK2"
title: "Audit and remove obsolete AgentPlane branches before v0.7.1"
status: "DOING"
priority: "med"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-cleanup"
  - "v0.7.1"
task_kind: "ops"
mutation_scope: "ops"
risk_flags:
  - "external_system"
  - "network"
blueprint_request: "ops.approval"
verify:
  - "git branch --merged main"
  - "git branch -r --merged origin/main"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T05:09:43.805Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T05:09:57.696Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T05:09:57.696Z"
doc_updated_by: "INTEGRATOR"
description: "Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work."
sections:
  Summary: |-
    Audit and remove obsolete AgentPlane branches before v0.7.1

    Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
  Scope: |-
    - In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
    - Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".
  Plan: "1. Inventory every local and remote branch/worktree, map each to task state and hosted PR state, and protect active, blocked, dirty, or explicitly retained checkouts. 2. Remove only worktrees and branches whose tasks are DONE and whose hosted changes are merged or otherwise proven obsolete; preserve the protected integration worktree and all stashes. 3. Audit the loops branch separately against main and delete it only after proving its needed changes are already integrated or intentionally superseded. 4. Record exact removed and retained targets plus rollback limits. 5. Verify git worktree integrity, branch inventory, base status, and absence of lost active work."
  Verify Steps: |-
    1. Run `git worktree list --porcelain` in the release control checkout. Expected: only main, the protected detached integration checkout, BLOCKED 72A55V, DOING EH2A15, this cleanup task, and DOING RWW0ND remain.
    2. Fetch/prune origin, list local and remote refs, and run `gh pr list --state open`. Expected: `agentplane-loops` and every recorded obsolete branch are absent; only cleanup PR #4772 and deferred Dependabot PR #4752 remain open.
    3. Inspect base and outer checkout status plus `git stash list`. Expected: no tracked changes were introduced, the two protected base untracked artifacts remain, and all 39 pre-existing stashes remain untouched.
    4. Resolve `archive/agentplane-loops-final-20260804^{}` and inspect the canonical CLI help. Expected: the archive resolves to loop head 14d0bd8f5, current main exposes `task advance` and `task run`, and no loop command is part of the canonical release surface.
    5. Run `git worktree prune --dry-run -v` and inspect retained branch/task states. Expected: no stale worktree registrations remain and active, blocked, dirty, release-maintenance, open-PR, or uniquely unassimilated refs were not deleted.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Recreate a deleted merged or closed-PR branch from its recorded PR head/merge identity and push that exact commit back to the original ref.
    - Recreate `agentplane-loops` from local annotated tag `archive/agentplane-loops-final-20260804^{}`.
    - Recreate removed clean worktrees from the restored branch refs; no stash recovery is required because all stashes were preserved.
  Findings: |-
    - Observation: Four clean DONE worktrees (Q3RDCW, 6QF79Y, WWQP4B, DF63K4) had provider-merge proof and were removed through `ap cleanup merged`.
      Impact: Merged task branches no longer occupy release worktrees while their main-branch evidence remains authoritative.
      Resolution: Deleted the four local worktrees/branches through the framework-owned cleanup path.

    - Observation: 0JP0ZZ and MR9EA9 were clean local qualification worktrees whose PRs #4697 and #4668 were closed without merge; 0JP0ZZ explicitly records that corrected-main requalification superseded it. Detached benchmark ab8787b39 was superseded by merged PR #4745.
      Impact: These checkouts retained obsolete candidate history but were not release inputs.
      Resolution: Removed the two local task worktrees/branches and the detached benchmark checkout; GitHub PR history preserves the hosted evidence.

    - Observation: Eleven obsolete remote refs were either merged or had closed superseded PRs: two task-close refs, 9DX697, JYCTPN, 0JP0ZZ, XBHBE5, THDN0G, 5ZKP6T, EMP7RC, R1N8C5, and `agentplane-loops`.
      Impact: Remote branch discovery contained stale execution and experimental product lines.
      Resolution: Deleted those refs from origin; no open PR referenced them.

    - Observation: `agentplane-loops` had 47 commits not on current main and no open PR. Its last product PR #4558 targeted only the experimental branch, while current main exposes the newer shared supervisor through `task advance` and `task run`.
      Impact: Keeping the branch would present an obsolete competing orchestration model outside the frozen 0.7.1 product surface.
      Resolution: Archived exact head 14d0bd8f5 as local annotated tag `archive/agentplane-loops-final-20260804`, moved the outer checkout to current main in detached mode, and deleted the local and remote branch.

    - Observation: BLOCKED 72A55V, DOING EH2A15, DOING/dirty RWW0ND, the protected integration checkout, 39 stashes, open Dependabot PR #4752, release-maintenance refs 0.1-0.5, and two unique codex history refs are not proven obsolete.
      Impact: Deleting them would risk active work, recovery evidence, or an intentionally retained maintenance line.
      Resolution: Preserved every one of these refs/artifacts and recorded them as explicit exclusions from cleanup.
extensions:
  workflow_route_baseline:
    start_head_sha: "c411b8c299fffb22e42b05b4ec0cc9b61af8084f"
    version: 1
id_source: "generated"
---
## Summary

Audit and remove obsolete AgentPlane branches before v0.7.1

Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.

## Scope

- In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
- Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".

## Plan

1. Inventory every local and remote branch/worktree, map each to task state and hosted PR state, and protect active, blocked, dirty, or explicitly retained checkouts. 2. Remove only worktrees and branches whose tasks are DONE and whose hosted changes are merged or otherwise proven obsolete; preserve the protected integration worktree and all stashes. 3. Audit the loops branch separately against main and delete it only after proving its needed changes are already integrated or intentionally superseded. 4. Record exact removed and retained targets plus rollback limits. 5. Verify git worktree integrity, branch inventory, base status, and absence of lost active work.

## Verify Steps

1. Run `git worktree list --porcelain` in the release control checkout. Expected: only main, the protected detached integration checkout, BLOCKED 72A55V, DOING EH2A15, this cleanup task, and DOING RWW0ND remain.
2. Fetch/prune origin, list local and remote refs, and run `gh pr list --state open`. Expected: `agentplane-loops` and every recorded obsolete branch are absent; only cleanup PR #4772 and deferred Dependabot PR #4752 remain open.
3. Inspect base and outer checkout status plus `git stash list`. Expected: no tracked changes were introduced, the two protected base untracked artifacts remain, and all 39 pre-existing stashes remain untouched.
4. Resolve `archive/agentplane-loops-final-20260804^{}` and inspect the canonical CLI help. Expected: the archive resolves to loop head 14d0bd8f5, current main exposes `task advance` and `task run`, and no loop command is part of the canonical release surface.
5. Run `git worktree prune --dry-run -v` and inspect retained branch/task states. Expected: no stale worktree registrations remain and active, blocked, dirty, release-maintenance, open-PR, or uniquely unassimilated refs were not deleted.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Recreate a deleted merged or closed-PR branch from its recorded PR head/merge identity and push that exact commit back to the original ref.
- Recreate `agentplane-loops` from local annotated tag `archive/agentplane-loops-final-20260804^{}`.
- Recreate removed clean worktrees from the restored branch refs; no stash recovery is required because all stashes were preserved.

## Findings

- Observation: Four clean DONE worktrees (Q3RDCW, 6QF79Y, WWQP4B, DF63K4) had provider-merge proof and were removed through `ap cleanup merged`.
  Impact: Merged task branches no longer occupy release worktrees while their main-branch evidence remains authoritative.
  Resolution: Deleted the four local worktrees/branches through the framework-owned cleanup path.

- Observation: 0JP0ZZ and MR9EA9 were clean local qualification worktrees whose PRs #4697 and #4668 were closed without merge; 0JP0ZZ explicitly records that corrected-main requalification superseded it. Detached benchmark ab8787b39 was superseded by merged PR #4745.
  Impact: These checkouts retained obsolete candidate history but were not release inputs.
  Resolution: Removed the two local task worktrees/branches and the detached benchmark checkout; GitHub PR history preserves the hosted evidence.

- Observation: Eleven obsolete remote refs were either merged or had closed superseded PRs: two task-close refs, 9DX697, JYCTPN, 0JP0ZZ, XBHBE5, THDN0G, 5ZKP6T, EMP7RC, R1N8C5, and `agentplane-loops`.
  Impact: Remote branch discovery contained stale execution and experimental product lines.
  Resolution: Deleted those refs from origin; no open PR referenced them.

- Observation: `agentplane-loops` had 47 commits not on current main and no open PR. Its last product PR #4558 targeted only the experimental branch, while current main exposes the newer shared supervisor through `task advance` and `task run`.
  Impact: Keeping the branch would present an obsolete competing orchestration model outside the frozen 0.7.1 product surface.
  Resolution: Archived exact head 14d0bd8f5 as local annotated tag `archive/agentplane-loops-final-20260804`, moved the outer checkout to current main in detached mode, and deleted the local and remote branch.

- Observation: BLOCKED 72A55V, DOING EH2A15, DOING/dirty RWW0ND, the protected integration checkout, 39 stashes, open Dependabot PR #4752, release-maintenance refs 0.1-0.5, and two unique codex history refs are not proven obsolete.
  Impact: Deleting them would risk active work, recovery evidence, or an intentionally retained maintenance line.
  Resolution: Preserved every one of these refs/artifacts and recorded them as explicit exclusions from cleanup.
