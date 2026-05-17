---
id: "202605171325-7P5M3V"
title: "Warn when local task state is stale relative to origin main"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:28:05.930Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-05-17T13:27:57.362Z"
doc_updated_by: "PLANNER"
description: "Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions."
sections:
  Summary: |-
    Warn when local task state is stale relative to origin main

    Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
  Scope: |-
    - In scope: Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
    - Out of scope: unrelated refactors not required for "Warn when local task state is stale relative to origin main".
  Plan: "Plan: 1. Identify the startup/read-heavy command path where AgentPlane can cheaply compare the current checkout against origin/main or the configured upstream without requiring mutation. 2. Add a bounded stale-state diagnostic for quickstart/task-list/release-planning surfaces when HEAD is behind upstream and task records may be stale. 3. Ensure the warning is actionable and does not block normal offline/local workflows when no upstream is configured. 4. Add tests for behind-upstream, no-upstream, and clean/current states. 5. Verify focused CLI tests, release-planning behavior if touched, routing policy, and doctor output."
  Verify Steps: |-
    1. Add focused CLI/runtime tests for a repository whose HEAD is behind its configured upstream. Expected: the selected startup or task-list surface emits a clear stale-state warning with local and upstream refs.
    2. Add tests for no-upstream/offline/current-checkout cases. Expected: commands remain usable and do not emit misleading network-dependent failures.
    3. Run the focused CLI tests covering the changed command surface. Expected: all tests pass.
    4. Run a controlled smoke command equivalent to ap task list or ap quickstart in the behind-upstream fixture. Expected: the warning explains that local task state may be stale relative to origin/main.
    5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.
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

Warn when local task state is stale relative to origin main

Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.

## Scope

- In scope: Add a release-planning guardrail so read-heavy startup surfaces such as quickstart or task list warn when the current base checkout is behind origin/main and local task state may be stale. The regression case is local task records showing TODO/DOING for work already merged on GitHub, which can mislead v0.6.2 scope decisions.
- Out of scope: unrelated refactors not required for "Warn when local task state is stale relative to origin main".

## Plan

Plan: 1. Identify the startup/read-heavy command path where AgentPlane can cheaply compare the current checkout against origin/main or the configured upstream without requiring mutation. 2. Add a bounded stale-state diagnostic for quickstart/task-list/release-planning surfaces when HEAD is behind upstream and task records may be stale. 3. Ensure the warning is actionable and does not block normal offline/local workflows when no upstream is configured. 4. Add tests for behind-upstream, no-upstream, and clean/current states. 5. Verify focused CLI tests, release-planning behavior if touched, routing policy, and doctor output.

## Verify Steps

1. Add focused CLI/runtime tests for a repository whose HEAD is behind its configured upstream. Expected: the selected startup or task-list surface emits a clear stale-state warning with local and upstream refs.
2. Add tests for no-upstream/offline/current-checkout cases. Expected: commands remain usable and do not emit misleading network-dependent failures.
3. Run the focused CLI tests covering the changed command surface. Expected: all tests pass.
4. Run a controlled smoke command equivalent to ap task list or ap quickstart in the behind-upstream fixture. Expected: the warning explains that local task state may be stale relative to origin/main.
5. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: routing passes; doctor has no new warnings beyond documented pre-existing drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
