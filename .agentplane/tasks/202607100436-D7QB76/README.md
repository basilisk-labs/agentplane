---
id: "202607100436-D7QB76"
title: "Anchor evaluator reviews for metadata-only tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "evaluator"
  - "quality"
  - "release-0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T04:36:16.223Z"
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
    body: "Start: implement and verify a strict evaluator target for metadata-only task and documentation commits."
events:
  -
    type: "status"
    at: "2026-07-10T10:34:39.295Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement and verify a strict evaluator target for metadata-only task and documentation commits."
doc_version: 3
doc_updated_at: "2026-07-10T10:42:25.725Z"
doc_updated_by: "CODER"
description: "For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit."
sections:
  Summary: |-
    Anchor evaluator reviews for metadata-only tasks

    For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
  Scope: |-
    - In scope: For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
    - Out of scope: unrelated refactors not required for "Anchor evaluator reviews for metadata-only tasks".
  Plan: |-
    1. Add a metadata-only evaluator regression that changes task/docs artifacts without an implementation-code commit.
    2. Define an auditable evaluated SHA rule that remains strict for implementation tasks but does not skip the current metadata-only work unit.
    3. Preserve finish freshness and unrelated-artifact rejection.
    4. Replace the matching evaluator follow-up placeholder in the v0.6.22 plan and keep the release task dependent on it.
    5. Run focused evaluator/finish tests, typecheck, lint:core, ci:contract, and full fast.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts`. Expected: code tasks still target their implementation commit, pure current-task metadata work targets its own latest committed work unit, unrelated workflow artifacts are rejected, and later evaluator artifacts preserve the reviewed metadata SHA.
    2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
    3. Run `bun run lint:core`. Expected: core lint passes.
    4. Run `bun run ci:contract`. Expected: public CLI, architecture, Knip, clone, and coverage contracts remain unchanged.
    5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
    6. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
    7. Merge through the integration queue, complete Hosted Close, pull `main`, and inspect `ap integrate queue list --json`. Expected: task `202607100435-A932SP` is automatically released from `handoff` by its valid merged pre-merge closure evidence before this task is claimed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Anchor evaluator reviews for metadata-only tasks

For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.

## Scope

- In scope: For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
- Out of scope: unrelated refactors not required for "Anchor evaluator reviews for metadata-only tasks".

## Plan

1. Add a metadata-only evaluator regression that changes task/docs artifacts without an implementation-code commit.
2. Define an auditable evaluated SHA rule that remains strict for implementation tasks but does not skip the current metadata-only work unit.
3. Preserve finish freshness and unrelated-artifact rejection.
4. Replace the matching evaluator follow-up placeholder in the v0.6.22 plan and keep the release task dependent on it.
5. Run focused evaluator/finish tests, typecheck, lint:core, ci:contract, and full fast.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts`. Expected: code tasks still target their implementation commit, pure current-task metadata work targets its own latest committed work unit, unrelated workflow artifacts are rejected, and later evaluator artifacts preserve the reviewed metadata SHA.
2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
3. Run `bun run lint:core`. Expected: core lint passes.
4. Run `bun run ci:contract`. Expected: public CLI, architecture, Knip, clone, and coverage contracts remain unchanged.
5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
6. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
7. Merge through the integration queue, complete Hosted Close, pull `main`, and inspect `ap integrate queue list --json`. Expected: task `202607100435-A932SP` is automatically released from `handoff` by its valid merged pre-merge closure evidence before this task is claimed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
