---
id: "202607221838-SD1W93"
title: "Define the AgentPlane 0.7 refactor execution graph"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "planning"
  - "refactor"
  - "v0.7"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "ap doctor"
  - "bun run task-state:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T18:39:24.470Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from the user-authorized full RF-00 through RF-27 refactor program; 0.7.0 remains the terminal release gate and compatible intermediate 0.6.x releases are permitted."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Create the approved RF-00 through RF-27 execution graph with atomic dependencies, task-specific verification, and release gates through 0.7.0."
events:
  -
    type: "status"
    at: "2026-07-22T18:40:32.248Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Create the approved RF-00 through RF-27 execution graph with atomic dependencies, task-specific verification, and release gates through 0.7.0."
doc_version: 3
doc_updated_at: "2026-07-22T18:56:28.803Z"
doc_updated_by: "PLANNER"
description: "Create the complete executable task graph for the approved RF-00 through RF-27 refactor program, including corrected contract-drift prerequisites, atomic dependency edges, acceptance-specific Verify Steps, intermediate compatible release slices, and the final 0.7.0 release gate."
sections:
  Summary: |-
    Define and validate the complete executable AgentPlane 0.7 refactor graph.

    The graph now contains 43 implementation/release leaves covering RF-00 through RF-27, two verified contract-drift prerequisites, six optional prerelease stabilization points, an automated 0.6.24-to-0.7 migration matrix, documentation, and the terminal 0.7.0 publication task. The human-readable roadmap is `docs/internal/v0.7-refactor-plan.md`.
  Scope: |-
    - In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add the newly verified workflow/schema and CLI-contract drift to the appropriate leaves, assign one owner and acceptance boundary per leaf, encode acyclic dependencies, map compatible slices to intermediate 0.6.x releases, and define the final 0.7.0 gate.
    - Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
    - Out of scope: implementation code, package publication, unrelated maintenance, and any mutation of the agentplane-loops checkout.
  Plan: |-
    1. Reconcile RF-00 through RF-27 against current main and classify each item as executable, already satisfied, merged, or replaced with evidence.
    2. Define atomic leaf tasks with a single owner, explicit scope, acceptance-specific Verify Steps, and the minimum dependency edges required for safe sequencing.
    3. Create the leaf task artifacts and release-gate tasks, tagging each with its RF identifier, wave, and intended compatible release slice.
    4. Record the program roadmap, version policy, compatibility window, and re-approval triggers in the planning task.
    5. Validate task-state integrity, dependency readiness, policy routing, and repository cleanliness; record residual risks in Findings.
  Verify Steps: |-
    1. Inspect every open task tagged v0.7. Expected: RF-00 through RF-27 are covered exactly once by an executable leaf or an explicitly evidenced merged/replaced mapping; every leaf has one owner, a real deliverable boundary, task-specific Verify Steps, and no duplicate open task.
    2. Run `bun run task-state:check`. Expected: the canonical task registry, task documents, dependency edges, and statuses are internally consistent.
    3. Run `ap doctor`. Expected: no new task-graph or workflow errors; any unrelated historical warnings are recorded rather than silently ignored.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets remain valid.
    5. Review the release dependencies. Expected: each intermediate 0.6.x release task depends only on a complete compatible slice, and the 0.7.0 task depends on every required RF leaf plus migration, documentation, and release-matrix gates.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the planning-task PR before any dependent implementation task is started.
    - Remove only the task artifacts created by this planning task through the normal AgentPlane lifecycle; do not edit tasks.json manually.
    - Re-run task-state and doctor checks to confirm the pre-graph state is restored.
  Findings: |-
    - Observation: The current route oracle kept returning worktree_needed after work start had already created the exact task worktree and branch.
      Impact: Blindly replaying the emitted command produced E_GIT and could encourage duplicate worktree recovery attempts; route projection is not authoritative for this mixed metadata state.
      Resolution: Continue the existing worktree through the canonical branch_pr start-ready sequence, cover this state in RF-06 typed WorkflowStep fixtures, and ratchet duplicate-worktree guidance in RF-27.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The audited RF set requires 43 executable leaves rather than one task per RF because nine RF items cross independent schema, migration, runtime, or verification boundaries; Workflow and CLI public-contract drift add two prerequisite leaves.
      Impact: The graph is larger than the report heading count, but avoids XL mixed-boundary PRs and gives each compatibility transition a concrete gate.
      Resolution: Keep all leaves in one dependency DAG, approve/start them by milestone, and permit related-task batching only where one PR has one verification boundary.
      Promotion: incident-candidate
      Fixability: repo-fixable
id_source: "generated"
---
## Summary

Define and validate the complete executable AgentPlane 0.7 refactor graph.

The graph now contains 43 implementation/release leaves covering RF-00 through RF-27, two verified contract-drift prerequisites, six optional prerelease stabilization points, an automated 0.6.24-to-0.7 migration matrix, documentation, and the terminal 0.7.0 publication task. The human-readable roadmap is `docs/internal/v0.7-refactor-plan.md`.

## Scope

- In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add the newly verified workflow/schema and CLI-contract drift to the appropriate leaves, assign one owner and acceptance boundary per leaf, encode acyclic dependencies, map compatible slices to intermediate 0.6.x releases, and define the final 0.7.0 gate.
- Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
- Out of scope: implementation code, package publication, unrelated maintenance, and any mutation of the agentplane-loops checkout.

## Plan

1. Reconcile RF-00 through RF-27 against current main and classify each item as executable, already satisfied, merged, or replaced with evidence.
2. Define atomic leaf tasks with a single owner, explicit scope, acceptance-specific Verify Steps, and the minimum dependency edges required for safe sequencing.
3. Create the leaf task artifacts and release-gate tasks, tagging each with its RF identifier, wave, and intended compatible release slice.
4. Record the program roadmap, version policy, compatibility window, and re-approval triggers in the planning task.
5. Validate task-state integrity, dependency readiness, policy routing, and repository cleanliness; record residual risks in Findings.

## Verify Steps

1. Inspect every open task tagged v0.7. Expected: RF-00 through RF-27 are covered exactly once by an executable leaf or an explicitly evidenced merged/replaced mapping; every leaf has one owner, a real deliverable boundary, task-specific Verify Steps, and no duplicate open task.
2. Run `bun run task-state:check`. Expected: the canonical task registry, task documents, dependency edges, and statuses are internally consistent.
3. Run `ap doctor`. Expected: no new task-graph or workflow errors; any unrelated historical warnings are recorded rather than silently ignored.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing and size budgets remain valid.
5. Review the release dependencies. Expected: each intermediate 0.6.x release task depends only on a complete compatible slice, and the 0.7.0 task depends on every required RF leaf plus migration, documentation, and release-matrix gates.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the planning-task PR before any dependent implementation task is started.
- Remove only the task artifacts created by this planning task through the normal AgentPlane lifecycle; do not edit tasks.json manually.
- Re-run task-state and doctor checks to confirm the pre-graph state is restored.

## Findings

- Observation: The current route oracle kept returning worktree_needed after work start had already created the exact task worktree and branch.
  Impact: Blindly replaying the emitted command produced E_GIT and could encourage duplicate worktree recovery attempts; route projection is not authoritative for this mixed metadata state.
  Resolution: Continue the existing worktree through the canonical branch_pr start-ready sequence, cover this state in RF-06 typed WorkflowStep fixtures, and ratchet duplicate-worktree guidance in RF-27.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The audited RF set requires 43 executable leaves rather than one task per RF because nine RF items cross independent schema, migration, runtime, or verification boundaries; Workflow and CLI public-contract drift add two prerequisite leaves.
  Impact: The graph is larger than the report heading count, but avoids XL mixed-boundary PRs and gives each compatibility transition a concrete gate.
  Resolution: Keep all leaves in one dependency DAG, approve/start them by milestone, and permit related-task batching only where one PR has one verification boundary.
  Promotion: incident-candidate
  Fixability: repo-fixable
