---
id: "202607221846-9XC1H0"
title: "Enforce role-scoped sandboxes and actual write boundaries"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
tags:
  - "milestone-alpha1"
  - "refactor"
  - "rf-03"
  - "runner"
  - "sandbox"
  - "security"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
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
doc_updated_at: "2026-07-22T18:46:58.451Z"
doc_updated_by: "PLANNER"
description: "RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations."
sections:
  Summary: |-
    Enforce role-scoped sandboxes and actual write boundaries

    RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations.
  Scope: |-
    - In scope: role-derived sandbox policy, authority provenance for danger-full-access, adapter capability downgrade reporting, actual delta-based scope checks, protected paths, unacceptable-run policy, and negative fixtures.
    - Out of scope: promising enforcement an adapter cannot provide; such cases must surface a typed capability downgrade.
  Plan: |-
    1. Define role-to-sandbox defaults and explicit authority records for danger mode.
    2. Pass requested enforcement through adapter capability negotiation and record downgrades.
    3. Validate observed workspace deltas against declared scope and protected paths.
    4. Mark any unauthorized actual mutation unacceptable regardless of manifest claims.
    5. Add executor, context, evaluator, custom-adapter, pre-dirty, hidden-write, and protected-path tests.
  Verify Steps: |-
    1. Prepare executor/context and evaluator runs without sandbox configuration. Expected: workspace-write and read-only respectively, with no implicit danger mode.
    2. Request danger-full-access without authority. Expected: a typed approval/authority failure; with authority, the receipt records its provenance.
    3. Perform an unreported out-of-scope write and a protected-path mutation. Expected: both are observed and make the run unacceptable.
    4. Use an adapter lacking requested enforcement. Expected: a truthful capability downgrade, not a false claim of safety.
    5. Run focused runner policy tests, `bun run guards:check`, `bun run typecheck`, and `bun run ci:contract`.
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

Enforce role-scoped sandboxes and actual write boundaries

RF-03: default executor/context runs to workspace-write and evaluator runs to read-only, require explicit authority for danger mode, and reject actual out-of-scope or protected-path mutations.

## Scope

- In scope: role-derived sandbox policy, authority provenance for danger-full-access, adapter capability downgrade reporting, actual delta-based scope checks, protected paths, unacceptable-run policy, and negative fixtures.
- Out of scope: promising enforcement an adapter cannot provide; such cases must surface a typed capability downgrade.

## Plan

1. Define role-to-sandbox defaults and explicit authority records for danger mode.
2. Pass requested enforcement through adapter capability negotiation and record downgrades.
3. Validate observed workspace deltas against declared scope and protected paths.
4. Mark any unauthorized actual mutation unacceptable regardless of manifest claims.
5. Add executor, context, evaluator, custom-adapter, pre-dirty, hidden-write, and protected-path tests.

## Verify Steps

1. Prepare executor/context and evaluator runs without sandbox configuration. Expected: workspace-write and read-only respectively, with no implicit danger mode.
2. Request danger-full-access without authority. Expected: a typed approval/authority failure; with authority, the receipt records its provenance.
3. Perform an unreported out-of-scope write and a protected-path mutation. Expected: both are observed and make the run unacceptable.
4. Use an adapter lacking requested enforcement. Expected: a truthful capability downgrade, not a false claim of safety.
5. Run focused runner policy tests, `bun run guards:check`, `bun run typecheck`, and `bun run ci:contract`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
