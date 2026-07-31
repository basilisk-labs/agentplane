---
id: "202607311456-B67DP1"
title: "Finalize integration from immutable branch head"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge"
  - "release"
verify:
  - "bun run format:check"
  - "bun run test:project agentplane packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T14:58:18.564Z"
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
    body: "Start: use captured branchHeadSha for post-merge diffstat and add exact regression coverage."
events:
  -
    type: "status"
    at: "2026-07-31T14:59:40.554Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: use captured branchHeadSha for post-merge diffstat and add exact regression coverage."
doc_version: 3
doc_updated_at: "2026-07-31T15:09:03.531Z"
doc_updated_by: "CODER"
description: "Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization."
sections:
  Summary: |-
    Finalize integration from immutable branch head

    Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.
  Scope: |-
    - In scope: Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.
    - Out of scope: unrelated refactors not required for "Finalize integration from immutable branch head".
  Plan: "1. Create an isolated post-merge worktree from the maintenance base. 2. Make finalizeIntegrate compute diffstat from captured branchHeadSha and add an exact regression test. 3. Run focused integration tests, typecheck, format, lint, and fast release checks. 4. Open a PR to the maintenance branch, wait for hosted checks, and integrate with the fixed candidate CLI."
  Verify Steps: |-
    1. `bun run test:project agentplane packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
       Expected: integration finalization tests pass, including an exact assertion that diffstat uses the captured branch head SHA.
    2. `bun run typecheck`
       Expected: TypeScript build passes.
    3. `bun run format:check`
       Expected: repository formatting passes.
    4. `bun run lint:core`
       Expected: core lint passes.
    5. `bun run release:prepublish:fast`
       Expected: release incidents, package builds, tarball policy, and blueprint release gate pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: integration cleanup can delete the local task branch after merge, while finalization still resolves diffstat from that mutable branch ref.
    - Resolution: use the immutable `branchHeadSha` captured before merge; regression coverage asserts the exact SHA pair passed to `gitDiffStat`.
    - Scope remained limited to integration finalization and its regression test.
id_source: "generated"
---
## Summary

Finalize integration from immutable branch head

Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.

## Scope

- In scope: Post-merge follow-up for v0.6.26: compute integration diffstat from the captured branchHeadSha so post-merge cleanup cannot invalidate finalization.
- Out of scope: unrelated refactors not required for "Finalize integration from immutable branch head".

## Plan

1. Create an isolated post-merge worktree from the maintenance base. 2. Make finalizeIntegrate compute diffstat from captured branchHeadSha and add an exact regression test. 3. Run focused integration tests, typecheck, format, lint, and fast release checks. 4. Open a PR to the maintenance branch, wait for hosted checks, and integrate with the fixed candidate CLI.

## Verify Steps

1. `bun run test:project agentplane packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/pr/integrate/cmd.test.ts`
   Expected: integration finalization tests pass, including an exact assertion that diffstat uses the captured branch head SHA.
2. `bun run typecheck`
   Expected: TypeScript build passes.
3. `bun run format:check`
   Expected: repository formatting passes.
4. `bun run lint:core`
   Expected: core lint passes.
5. `bun run release:prepublish:fast`
   Expected: release incidents, package builds, tarball policy, and blueprint release gate pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: integration cleanup can delete the local task branch after merge, while finalization still resolves diffstat from that mutable branch ref.
- Resolution: use the immutable `branchHeadSha` captured before merge; regression coverage asserts the exact SHA pair passed to `gitDiffStat`.
- Scope remained limited to integration finalization and its regression test.
