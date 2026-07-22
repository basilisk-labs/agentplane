---
id: "202607221846-YGWMA2"
title: "Remove automatic semantic pass verdicts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-ZAENM6"
tags:
  - "evaluator"
  - "milestone-alpha1"
  - "refactor"
  - "rf-00"
  - "routing"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:46:46.382Z"
doc_updated_by: "PLANNER"
description: "RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead."
sections:
  Summary: |-
    Remove automatic semantic pass verdicts

    RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead.
  Scope: |-
    - In scope: route decision, repair, execution packet, context-ingest task/prompt, quality-review templates, compatibility views, and regression tests for missing or stale review.
    - Out of scope: replacing semantic review with lint/test heuristics or implementing the full EVALUATOR episode.
  Plan: |-
    1. Introduce the smallest typed quality-review step or structured stop required by current routes.
    2. Remove router- and template-authored verdict, summary, and finding literals.
    3. Preserve the existing human record path with explicit human-supplied provenance.
    4. Update route and context fixtures for missing, stale, and completed review states.
    5. Extend the trust ratchet to prevent recurrence.
  Verify Steps: |-
    1. Search production and template paths for automatic evaluator `--verdict pass` construction. Expected: none remain outside negative fixtures or enumerated verdict types.
    2. Exercise missing and stale quality-review routes. Expected: a typed EVALUATOR episode or `quality_review_required` stop with no synthesized verdict text.
    3. Exercise the human record path. Expected: supplied verdict, summary, and findings carry human provenance.
    4. Run route/context focused tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`. Expected: route compatibility remains intact except for the intentional removal of automatic pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: ""
id_source: "generated"
---
## Summary

Remove automatic semantic pass verdicts

RF-00: remove preselected evaluator pass outcomes from route control, repair guidance, context task contracts, templates, and fixtures; emit a typed evaluator episode or quality-review stop instead.

## Scope

- In scope: route decision, repair, execution packet, context-ingest task/prompt, quality-review templates, compatibility views, and regression tests for missing or stale review.
- Out of scope: replacing semantic review with lint/test heuristics or implementing the full EVALUATOR episode.

## Plan

1. Introduce the smallest typed quality-review step or structured stop required by current routes.
2. Remove router- and template-authored verdict, summary, and finding literals.
3. Preserve the existing human record path with explicit human-supplied provenance.
4. Update route and context fixtures for missing, stale, and completed review states.
5. Extend the trust ratchet to prevent recurrence.

## Verify Steps

1. Search production and template paths for automatic evaluator `--verdict pass` construction. Expected: none remain outside negative fixtures or enumerated verdict types.
2. Exercise missing and stale quality-review routes. Expected: a typed EVALUATOR episode or `quality_review_required` stop with no synthesized verdict text.
3. Exercise the human record path. Expected: supplied verdict, summary, and findings carry human provenance.
4. Run route/context focused tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`. Expected: route compatibility remains intact except for the intentional removal of automatic pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
