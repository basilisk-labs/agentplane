---
id: "202607291650-R1N8C5"
title: "Restore PR head tracking after constrained refspec publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T16:51:11.520Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "c4bda47aa4ae0a6aa4b4b3c41d7fb2d09f352102"
  message: "♻️ R1N8C5 pr: restore constrained-refspec head tracking"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: committed constrained-refspec publication tracking repair with focused regression coverage."
  -
    author: "CODER"
    body: "Implementation: committed constrained-refspec publication tracking repair with focused regression coverage."
events:
  -
    type: "status"
    at: "2026-07-29T16:51:35.134Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T16:59:25.116Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed constrained-refspec publication tracking repair with focused regression coverage."
  -
    type: "status"
    at: "2026-07-29T17:00:10.800Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed constrained-refspec publication tracking repair with focused regression coverage."
doc_version: 3
doc_updated_at: "2026-07-29T17:00:10.800Z"
doc_updated_by: "CODER"
description: "Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout."
sections:
  Summary: |-
    Restore PR head tracking after constrained refspec publication

    Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.
  Scope: |-
    - In scope: Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.
    - Out of scope: unrelated refactors not required for "Restore PR head tracking after constrained refspec publication".
  Plan: "1. Reproduce the constrained-refspec shape where origin tracks only main while the task branch is already present remotely. 2. Update the CLI publication helper so a successful publication also materializes the matching local remote-tracking ref needed by pr flow and integrate. 3. Add a regression test that proves branch@{upstream} resolves to the published task SHA under that refspec. 4. Run focused publication tests, static/type checks, and declared structural checks. 5. Publish one isolated PR, wait for hosted checks, record task verification, and return the blocked FTH PR to the serialized integration lane."
  Verify Steps: |-
    1. Reproduce the constrained-refspec repository shape in packages/agentplane/src/commands/pr/branch-publication.test.ts and packages/core/src/git/git-client.test.ts. Expected: publication creates refs/remotes/origin/<task-branch>, and AgentPlane resolves the configured upstream even when Git's fetch refspec lists only main.
    2. Run: bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: all focused cases pass.
    3. Run: bun run typecheck. Expected: TypeScript typecheck passes.
    4. Run: bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: no lint errors in changed scope.
    5. Run: bun run hotspots:check and node .agentplane/policy/check-routing.mjs. Expected: structural and policy gates pass.
    6. Build the repository CLI, republish the task PR through agentplane pr open, then run agentplane pr flow status <task-id> --json. Expected: the local and hosted PR heads are aligned; publication is not missing_upstream.
    7. On the task PR, wait for hosted checks to settle. Expected: no failing required check.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: With remote.origin.fetch restricted to main, git push -u records branch remote/merge configuration but Git's %(upstream:short) remains empty even after an explicit remote-tracking fetch.
      Impact: pr flow and integrate misclassified a hosted task head at the exact same SHA as unpublished, blocking the merge lane.
      Resolution: Refresh the branch tracking ref from the publication target and make gitBranchUpstream fall back to configured remote/merge only when the matching local tracking ref resolves.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Restore PR head tracking after constrained refspec publication

Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.

## Scope

- In scope: Fix branch_pr publication when origin fetches only main: after a task branch is successfully published and remote/head SHA match, ensure its local remote-tracking reference is available so pr flow and integrate classify the hosted SHA as published. Add a regression test for the constrained-refspec repository shape. Preserve unrelated deletion of the stale beta task README in the base checkout.
- Out of scope: unrelated refactors not required for "Restore PR head tracking after constrained refspec publication".

## Plan

1. Reproduce the constrained-refspec shape where origin tracks only main while the task branch is already present remotely. 2. Update the CLI publication helper so a successful publication also materializes the matching local remote-tracking ref needed by pr flow and integrate. 3. Add a regression test that proves branch@{upstream} resolves to the published task SHA under that refspec. 4. Run focused publication tests, static/type checks, and declared structural checks. 5. Publish one isolated PR, wait for hosted checks, record task verification, and return the blocked FTH PR to the serialized integration lane.

## Verify Steps

1. Reproduce the constrained-refspec repository shape in packages/agentplane/src/commands/pr/branch-publication.test.ts and packages/core/src/git/git-client.test.ts. Expected: publication creates refs/remotes/origin/<task-branch>, and AgentPlane resolves the configured upstream even when Git's fetch refspec lists only main.
2. Run: bun test packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: all focused cases pass.
3. Run: bun run typecheck. Expected: TypeScript typecheck passes.
4. Run: bunx eslint packages/core/src/git/git-client.ts packages/core/src/git/git-client.test.ts packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: no lint errors in changed scope.
5. Run: bun run hotspots:check and node .agentplane/policy/check-routing.mjs. Expected: structural and policy gates pass.
6. Build the repository CLI, republish the task PR through agentplane pr open, then run agentplane pr flow status <task-id> --json. Expected: the local and hosted PR heads are aligned; publication is not missing_upstream.
7. On the task PR, wait for hosted checks to settle. Expected: no failing required check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: With remote.origin.fetch restricted to main, git push -u records branch remote/merge configuration but Git's %(upstream:short) remains empty even after an explicit remote-tracking fetch.
  Impact: pr flow and integrate misclassified a hosted task head at the exact same SHA as unpublished, blocking the merge lane.
  Resolution: Refresh the branch tracking ref from the publication target and make gitBranchUpstream fall back to configured remote/merge only when the matching local tracking ref resolves.
  Promotion: incident-candidate
  Fixability: repo-fixable
