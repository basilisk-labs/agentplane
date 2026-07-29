---
id: "202607291650-R1N8C5"
title: "Restore PR head tracking after constrained refspec publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-29T16:51:35.134Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T16:51:35.134Z"
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
    1. Reproduce the constrained-refspec repository shape in packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: after publication, branch@{upstream} resolves to origin/<task-branch> and its SHA equals the local branch SHA.
    2. Run: bun test packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: all branch-publication cases, including the constrained-refspec regression, pass.
    3. Run: bun run typecheck. Expected: TypeScript typecheck passes.
    4. Run: bunx eslint packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: no lint errors in changed scope.
    5. Run: bun run hotspots:check and node .agentplane/policy/check-routing.mjs. Expected: structural and policy gates pass.
    6. On the task PR, wait for the hosted checks to settle. Expected: no failing required check, then pr flow status classifies the published head as aligned rather than missing_upstream.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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

1. Reproduce the constrained-refspec repository shape in packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: after publication, branch@{upstream} resolves to origin/<task-branch> and its SHA equals the local branch SHA.
2. Run: bun test packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: all branch-publication cases, including the constrained-refspec regression, pass.
3. Run: bun run typecheck. Expected: TypeScript typecheck passes.
4. Run: bunx eslint packages/agentplane/src/commands/pr/branch-publication.ts packages/agentplane/src/commands/pr/branch-publication.test.ts. Expected: no lint errors in changed scope.
5. Run: bun run hotspots:check and node .agentplane/policy/check-routing.mjs. Expected: structural and policy gates pass.
6. On the task PR, wait for the hosted checks to settle. Expected: no failing required check, then pr flow status classifies the published head as aligned rather than missing_upstream.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
