---
id: "202607101141-6T0H1E"
title: "Recognize rebased pre-merge closure recorded on base"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge-followup"
  - "release-blocker"
  - "v0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/commands/task/close-tail-state.test.ts packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T11:42:01.769Z"
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
    body: "Start: validate rebased pre-merge closure from artifacts recorded on protected main."
events:
  -
    type: "status"
    at: "2026-07-10T11:42:09.641Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate rebased pre-merge closure from artifacts recorded on protected main."
doc_version: 3
doc_updated_at: "2026-07-10T11:55:51.015Z"
doc_updated_by: "CODER"
description: "Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks."
sections:
  Summary: |-
    Recognize rebased pre-merge closure recorded on base

    Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
  Scope: |-
    - In scope: Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
    - Out of scope: unrelated refactors not required for "Recognize rebased pre-merge closure recorded on base".
  Plan: "1. Add a base-recorded pre-merge closure validator that reads the task README and PR metadata from the configured base branch. 2. Require DONE status, a non-empty task commit, and exact task, branch, PR, and base artifact identity before treating the close tail as recorded. 3. Add regression tests for rebased basis commits and mismatched base evidence. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932 lane release. 5. Merge through protected main and resume D7 integration."
  Verify Steps: |-
    1. Run the focused close-tail, PR-flow, and queue recovery suites. Expected: matching DONE task and pre-merge metadata recorded on base release a rebased handoff; mismatched task, branch, PR, or incomplete evidence remains rejected.
    2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
    3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
    4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
    5. After merge, run ap integrate queue list from main. Expected: A932 normalizes from handoff to done automatically and D7 becomes claimable without manual release.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

    Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and PR number match exactly. Mismatched or incomplete evidence remains rejected.

    Verification: focused suites 5 files / 20 tests; typecheck; lint:core; ci:contract; policy routing; doctor; full test:fast 364 files / 2152 tests. A parallel local run exposed an unrelated build race between release-smoke and compiled-CLI tests; both passed sequentially and the isolated full run passed.
id_source: "generated"
---
## Summary

Recognize rebased pre-merge closure recorded on base

Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.

## Scope

- In scope: Release a protected-main integration handoff when the merged base itself contains matching DONE task and pre-merge closure metadata, even if a pre-rebase basis commit remains locally available but is no longer an ancestor of the rebased PR head. Preserve strict branch, PR, and base evidence checks.
- Out of scope: unrelated refactors not required for "Recognize rebased pre-merge closure recorded on base".

## Plan

1. Add a base-recorded pre-merge closure validator that reads the task README and PR metadata from the configured base branch. 2. Require DONE status, a non-empty task commit, and exact task, branch, PR, and base artifact identity before treating the close tail as recorded. 3. Add regression tests for rebased basis commits and mismatched base evidence. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932 lane release. 5. Merge through protected main and resume D7 integration.

## Verify Steps

1. Run the focused close-tail, PR-flow, and queue recovery suites. Expected: matching DONE task and pre-merge metadata recorded on base release a rebased handoff; mismatched task, branch, PR, or incomplete evidence remains rejected.
2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
5. After merge, run ap integrate queue list from main. Expected: A932 normalizes from handoff to done automatically and D7 becomes claimable without manual release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Root cause: close-tail recovery only accepted a pre-merge basis commit when it was still an ancestor of the final PR head. A legitimate GitHub rebase kept the old basis object locally but removed that ancestry, so the merged task remained in handoff even though protected main contained matching DONE task metadata and PR closure metadata.

Implementation: validate the task README and PR metadata directly from the configured base branch. Accept recorded_on_base only when the task is DONE with a non-empty commit and task id, branch, and PR number match exactly. Mismatched or incomplete evidence remains rejected.

Verification: focused suites 5 files / 20 tests; typecheck; lint:core; ci:contract; policy routing; doctor; full test:fast 364 files / 2152 tests. A parallel local run exposed an unrelated build race between release-smoke and compiled-CLI tests; both passed sequentially and the isolated full run passed.
