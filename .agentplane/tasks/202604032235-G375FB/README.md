---
id: "202604032235-G375FB"
title: "Fix branch_pr stale cleanup and reconcile hanging lifecycle tails"
result_summary: "Merged via PR #71."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T22:36:03.850Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T16:33:41.000Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/shared/git-worktree.ts. Result: pass. Evidence: 17 cleanup-merged tests passed; targeted eslint on cleanup-merged/git-ops/git-worktree files passed; branch worktree remains clean after verification."
commit:
  hash: "3e81aa0328e0006f769d1f8176e07125720e0c32"
  message: "fix: harden branch_pr cleanup tails (#71)"
comments:
  -
    author: "CODER"
    body: "Start: audit the stale branch_pr leftovers from the recent framework/release work, fix cleanup candidate resolution for merged task and task-close branches, add regressions, then clean the safe local tails exposed by that audit."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #71 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-03T22:36:30.935Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the stale branch_pr leftovers from the recent framework/release work, fix cleanup candidate resolution for merged task and task-close branches, add regressions, then clean the safe local tails exposed by that audit."
  -
    type: "verify"
    at: "2026-04-05T07:33:23.047Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: 17 cleanup-merged CLI tests passed, both core and agentplane builds passed, stale local branches/worktrees for AQRVW4, DA1JVW, WARBCX, and P771ZK were reconciled in the main checkout, and P771ZK was backfilled to DONE via deterministic close commit 4c345ef2525a. Scope: branch_pr cleanup candidate resolution, task-close cleanup coverage, and repository stale-lifecycle tail audit."
  -
    type: "verify"
    at: "2026-04-06T16:33:41.000Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/shared/git-worktree.ts. Result: pass. Evidence: 17 cleanup-merged tests passed; targeted eslint on cleanup-merged/git-ops/git-worktree files passed; branch worktree remains clean after verification."
  -
    type: "status"
    at: "2026-04-06T16:47:50.297Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #71 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-06T16:47:50.304Z"
doc_updated_by: "INTEGRATOR"
description: "Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit."
sections:
  Summary: |-
    Fix branch_pr stale cleanup and reconcile hanging lifecycle tails
    
    Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.
  Scope: |-
    - In scope: Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.
    - Out of scope: unrelated refactors not required for "Fix branch_pr stale cleanup and reconcile hanging lifecycle tails".
  Plan: "1. Audit the current local branch_pr leftovers and codify the exact stale-branch failure shapes that appeared during the recent framework/release work. 2. Fix cleanup candidate resolution so DONE branch_pr tasks can clean local task and task-close branches/worktrees based on lifecycle metadata rather than a raw diff against current main. 3. Add focused CLI regression coverage for merged task branches with refreshed PR artifacts and for task-close branches. 4. Run targeted verification, then use the fixed cleanup path to remove the safe stale local branches/worktrees in this repository. 5. Reconcile any remaining hanging lifecycle state discovered by the audit and document the concrete bugs/rough edges found during this work."
  Verify Steps: "1. Run the focused branch_pr cleanup CLI tests. Expected: merged task branches with refreshed PR artifacts and task-close branches are listed as cleanup candidates and deleted successfully. 2. Run a targeted build or test command on the touched agentplane package. Expected: the updated cleanup resolution code compiles and the touched suites pass. 3. Audit local branch/worktree state after running the fixed cleanup flow. Expected: the safe stale local branches/worktrees created by earlier completed tasks are gone, while active branches remain untouched."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-05T07:33:23.047Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: 17 cleanup-merged CLI tests passed, both core and agentplane builds passed, stale local branches/worktrees for AQRVW4, DA1JVW, WARBCX, and P771ZK were reconciled in the main checkout, and P771ZK was backfilled to DONE via deterministic close commit 4c345ef2525a. Scope: branch_pr cleanup candidate resolution, task-close cleanup coverage, and repository stale-lifecycle tail audit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T22:35:57.638Z, excerpt_hash=sha256:eef585e96f6a2b1a60cd31644c8578514d3e421e26a68747716105ac5b7a5e58
    
    ### 2026-04-06T16:33:41.000Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/shared/git-worktree.ts. Result: pass. Evidence: 17 cleanup-merged tests passed; targeted eslint on cleanup-merged/git-ops/git-worktree files passed; branch worktree remains clean after verification.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-05T07:33:23.081Z, excerpt_hash=sha256:eef585e96f6a2b1a60cd31644c8578514d3e421e26a68747716105ac5b7a5e58
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix branch_pr stale cleanup and reconcile hanging lifecycle tails

Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.

## Scope

- In scope: Repair local branch_pr cleanup so merged task/task-close leftovers are detected and removable, add regressions, then clean the current repository's stale local branches/worktrees and reconcile any hanging lifecycle state exposed by the audit.
- Out of scope: unrelated refactors not required for "Fix branch_pr stale cleanup and reconcile hanging lifecycle tails".

## Plan

1. Audit the current local branch_pr leftovers and codify the exact stale-branch failure shapes that appeared during the recent framework/release work. 2. Fix cleanup candidate resolution so DONE branch_pr tasks can clean local task and task-close branches/worktrees based on lifecycle metadata rather than a raw diff against current main. 3. Add focused CLI regression coverage for merged task branches with refreshed PR artifacts and for task-close branches. 4. Run targeted verification, then use the fixed cleanup path to remove the safe stale local branches/worktrees in this repository. 5. Reconcile any remaining hanging lifecycle state discovered by the audit and document the concrete bugs/rough edges found during this work.

## Verify Steps

1. Run the focused branch_pr cleanup CLI tests. Expected: merged task branches with refreshed PR artifacts and task-close branches are listed as cleanup candidates and deleted successfully. 2. Run a targeted build or test command on the touched agentplane package. Expected: the updated cleanup resolution code compiles and the touched suites pass. 3. Audit local branch/worktree state after running the fixed cleanup flow. Expected: the safe stale local branches/worktrees created by earlier completed tasks are gone, while active branches remain untouched.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-05T07:33:23.047Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: 17 cleanup-merged CLI tests passed, both core and agentplane builds passed, stale local branches/worktrees for AQRVW4, DA1JVW, WARBCX, and P771ZK were reconciled in the main checkout, and P771ZK was backfilled to DONE via deterministic close commit 4c345ef2525a. Scope: branch_pr cleanup candidate resolution, task-close cleanup coverage, and repository stale-lifecycle tail audit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T22:35:57.638Z, excerpt_hash=sha256:eef585e96f6a2b1a60cd31644c8578514d3e421e26a68747716105ac5b7a5e58

### 2026-04-06T16:33:41.000Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --reporter=verbose && bunx eslint packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/shared/git-worktree.ts. Result: pass. Evidence: 17 cleanup-merged tests passed; targeted eslint on cleanup-merged/git-ops/git-worktree files passed; branch worktree remains clean after verification.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-05T07:33:23.081Z, excerpt_hash=sha256:eef585e96f6a2b1a60cd31644c8578514d3e421e26a68747716105ac5b7a5e58

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
