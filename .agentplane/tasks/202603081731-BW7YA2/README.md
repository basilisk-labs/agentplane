---
id: "202603081731-BW7YA2"
title: "Plan 0.3.4 install-first stabilization"
result_summary: "Planned 0.3.4 as an install-first stabilization release with separate implementation tasks for runtime guidance, upgrade workflow bootstrap, release notes, and release apply."
status: "DONE"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T17:31:28.568Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T17:32:41.603Z"
  updated_by: "PLANNER"
  note: |-
    Command: agentplane task list | rg "202603081731-DYC4GW|202603081732-301XC8|202603081732-XM882Y|202603081732-FJ98AV|202603081731-BW7YA2"
    Result: pass
    Evidence: task graph contains the install-surface fix, workflow-upgrade repair, release notes, and release apply tasks with release dependencies blocked on implementation work.
    Scope: 0.3.4 planning graph and dependency ordering.
    
    Command: Review .agentplane/tasks/202603081731-BW7YA2/README.md
    Result: pass
    Evidence: planning README states the install-first product boundary and narrows release scope to runtime guidance, workflow bootstrap, notes, and publish.
    Scope: planning task contract and release sequencing.
commit:
  hash: "545cbf1786b952887bcc23cef8b61e599a00df63"
  message: "🗺️ BW7YA2 tasks: plan 0.3.4 install-first stabilization"
comments:
  -
    author: "PLANNER"
    body: "Start: define the install-first 0.3.4 boundary, create the executable task graph, and sequence release work so runtime fixes land before notes and publish."
  -
    author: "PLANNER"
    body: "Verified: defined the install-first 0.3.4 boundary, created the executable task graph, and confirmed release ordering so runtime fixes block notes and publish."
events:
  -
    type: "status"
    at: "2026-03-08T17:31:32.223Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the install-first 0.3.4 boundary, create the executable task graph, and sequence release work so runtime fixes land before notes and publish."
  -
    type: "verify"
    at: "2026-03-08T17:32:41.603Z"
    author: "PLANNER"
    state: "ok"
    note: |-
      Command: agentplane task list | rg "202603081731-DYC4GW|202603081732-301XC8|202603081732-XM882Y|202603081732-FJ98AV|202603081731-BW7YA2"
      Result: pass
      Evidence: task graph contains the install-surface fix, workflow-upgrade repair, release notes, and release apply tasks with release dependencies blocked on implementation work.
      Scope: 0.3.4 planning graph and dependency ordering.
      
      Command: Review .agentplane/tasks/202603081731-BW7YA2/README.md
      Result: pass
      Evidence: planning README states the install-first product boundary and narrows release scope to runtime guidance, workflow bootstrap, notes, and publish.
      Scope: planning task contract and release sequencing.
  -
    type: "status"
    at: "2026-03-08T17:34:05.042Z"
    author: "PLANNER"
    from: "DOING"
    to: "DONE"
    note: "Verified: defined the install-first 0.3.4 boundary, created the executable task graph, and confirmed release ordering so runtime fixes block notes and publish."
doc_version: 3
doc_updated_at: "2026-03-08T17:34:05.042Z"
doc_updated_by: "PLANNER"
description: "Define and sequence the 0.3.4 work needed to treat npm-installed agentplane as the primary product surface: remove repo-only bootstrap dependencies from runtime guidance, make upgrade restore workflow runtime artifacts, and prepare the patch release."
id_source: "generated"
---
## Summary

Plan 0.3.4 install-first stabilization

Define and sequence the 0.3.4 work needed to treat npm-installed agentplane as the primary product surface: remove repo-only bootstrap dependencies from runtime guidance, make upgrade restore workflow runtime artifacts, and prepare the patch release.

## Scope

- In scope: Define and sequence the 0.3.4 work needed to treat npm-installed agentplane as the primary product surface: remove repo-only bootstrap dependencies from runtime guidance, make upgrade restore workflow runtime artifacts, and prepare the patch release.
- Out of scope: unrelated refactors not required for "Plan 0.3.4 install-first stabilization".

## Plan

1. Define the install-first boundary for 0.3.4: runtime/install surfaces must not depend on repo-only docs and upgrade must restore required workflow runtime artifacts.
2. Create executable tasks for runtime guidance cleanup, upgrade workflow bootstrap repair, release notes, and release apply, with dependencies ordered to keep the release path narrow.
3. Verify the task graph and dependency order, then hand execution to the implementation tasks.

## Verify Steps

1. Create executable tasks that cover the install-first runtime fix, workflow artifact upgrade repair, release notes, and release apply. Expected: each task has a concrete owner and narrow scope.
2. Inspect agentplane task list after creation. Expected: dependency order reflects implementation before release notes and release apply.
3. Review this planning task README. Expected: the plan states the install-first product boundary and the release scope without unrelated refactors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T17:32:41.603Z — VERIFY — ok

By: PLANNER

Note: Command: agentplane task list | rg "202603081731-DYC4GW|202603081732-301XC8|202603081732-XM882Y|202603081732-FJ98AV|202603081731-BW7YA2"
Result: pass
Evidence: task graph contains the install-surface fix, workflow-upgrade repair, release notes, and release apply tasks with release dependencies blocked on implementation work.
Scope: 0.3.4 planning graph and dependency ordering.

Command: Review .agentplane/tasks/202603081731-BW7YA2/README.md
Result: pass
Evidence: planning README states the install-first product boundary and narrows release scope to runtime guidance, workflow bootstrap, notes, and publish.
Scope: planning task contract and release sequencing.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T17:31:32.223Z, excerpt_hash=sha256:8bb7caca25b90f745922021152b20d8e12ae61ef8f827869d723f045d6a3a7f8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
