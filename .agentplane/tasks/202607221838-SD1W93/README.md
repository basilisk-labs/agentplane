---
id: "202607221838-SD1W93"
title: "Define the AgentPlane 0.7 refactor execution graph"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 15
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
  state: "ok"
  updated_at: "2026-07-22T18:59:27.343Z"
  updated_by: "PLANNER"
  note: "Verified 43 executable leaves plus the planning task: RF-00 through RF-27 coverage is complete, task-state and dependency integrity pass, roadmap/task Markdown is formatted, policy routing passes, and doctor has no new errors. Bun is unavailable locally, so the exact task-state script was run directly with Node; hosted PR verification must still exercise the Bun wrapper."
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
  -
    type: "verify"
    at: "2026-07-22T18:59:27.343Z"
    author: "PLANNER"
    state: "ok"
    note: "Verified 43 executable leaves plus the planning task: RF-00 through RF-27 coverage is complete, task-state and dependency integrity pass, roadmap/task Markdown is formatted, policy routing passes, and doctor has no new errors. Bun is unavailable locally, so the exact task-state script was run directly with Node; hosted PR verification must still exercise the Bun wrapper."
doc_version: 3
doc_updated_at: "2026-07-22T19:15:07.952Z"
doc_updated_by: "PLANNER"
description: "Create the complete executable task graph for the approved RF-00 through RF-27 refactor program, including corrected contract-drift prerequisites, atomic dependency edges, acceptance-specific Verify Steps, intermediate compatible release slices, and the final 0.7.0 release gate."
sections:
  Summary: |-
    Define and validate the complete executable AgentPlane 0.7 refactor graph.

    The corrected graph contains 55 executable implementation/release nodes plus this planning task. It covers RF-00 through RF-27, verified Workflow/CLI contract drift, six executable alpha/beta/rc qualification gates, five atomic command-family vertical slices, automated final-release ancestor closure, migration/documentation gates, and terminal 0.7.0 publication.
  Scope: |-
    - In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add verified Workflow/CLI contract-drift prerequisites, split mixed verification boundaries, enforce release ancestor closure and executable alpha/beta/rc qualification gates, assign one owner per leaf, and define the terminal 0.7.0 release gate.
    - Release strategy: optional 0.7.0 prereleases are qualification points; isolated compatibility-safe fixes may be backported to 0.6.25+ only when useful, but no intermediate publication is mandatory.
    - Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
    - Out of scope: implementation code for RF leaves, mandatory patch-release churn, unrelated maintenance, and any mutation of the agentplane-loops checkout.
  Plan: |-
    1. Reconcile RF-00 through RF-27 against current main and classify each item as executable, already satisfied, merged, or replaced with evidence.
    2. Define atomic leaf tasks with a single owner, explicit scope, acceptance-specific Verify Steps, and the minimum dependency edges required for safe sequencing.
    3. Create the leaf task artifacts and release-gate tasks, tagging each with its RF identifier, wave, and intended compatible release slice.
    4. Record the program roadmap, version policy, compatibility window, and re-approval triggers in the planning task.
    5. Validate task-state integrity, dependency readiness, policy routing, and repository cleanliness; record residual risks in Findings.
  Verify Steps: |-
    1. Inspect every open task tagged v0.7. Expected: RF-00 through RF-27 are covered by atomic executable leaves, verified contract-drift prerequisites, and real fan-in gates; every leaf has one owner and task-specific Verify Steps.
    2. Traverse dependencies from the final 0.7.0 task. Expected: every mandatory leaf, including RF-02 and RF-20, is an ancestor; each next milestone depends on the previous qualification gate.
    3. Run `node scripts/checks/check-task-state.mjs` (or canonical `bun run task-state:check` where Bun is available). Expected: registry, documents, dependencies, and statuses are consistent and acyclic.
    4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: no new workflow/policy errors; unrelated historical warnings are recorded.
    5. Run a semantic EVALUATOR review. Expected: version strategy, atomicity, rollback/recovery, acceptance coverage, and release fan-in have no blocking finding.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-22T18:59:27.343Z — VERIFY — ok

    By: PLANNER

    Note: Verified 43 executable leaves plus the planning task: RF-00 through RF-27 coverage is complete, task-state and dependency integrity pass, roadmap/task Markdown is formatted, policy routing passes, and doctor has no new errors. Bun is unavailable locally, so the exact task-state script was run directly with Node; hosted PR verification must still exercise the Bun wrapper.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T18:56:28.803Z, excerpt_hash=sha256:3a8567a0432c291cf13e38734d4a6ce38896b72452d0dabf6def3e4ef551f342

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221838-SD1W93-define-the-agentplane-0-7-refactor-execution-gra/.agentplane/tasks/202607221838-SD1W93/blueprint/resolved-snapshot.json
    - old_digest: ef1a009399c90576c1c070524dfa6d59a275fc968242f4cc0a77ab34ed8bd555
    - current_digest: ef1a009399c90576c1c070524dfa6d59a275fc968242f4cc0a77ab34ed8bd555
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221838-SD1W93

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221838-SD1W93
    - diagnostic_command: agentplane pr check 202607221838-SD1W93
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

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

    - Observation: Local Bun executable is unavailable; doctor reports two pre-existing historical DONE-task commit-hash warnings unrelated to this graph.
      Impact: The Bun command wrapper was not exercised locally, but its exact Node target passed; no new task graph, workflow, or policy error was found.
      Resolution: Require hosted PR verification to run the canonical Bun wrapper and preserve the historical doctor warnings as non-blocking pre-existing evidence.

    - Observation: The first independent EVALUATOR review returned rework: RF-02 and RF-20 were outside final release ancestry, wave gates were prose-only, two internal umbrella tasks were not atomic, and branch_pr rollback described the wrong subsystem.
      Impact: The initial graph could have released without two mandatory RF leaves and concentrated unrelated migrations into unsafe XL PR boundaries.
      Resolution: Added six executable milestone fan-in gates, five command-family vertical slices, a release dependency-closure guard task, final gate ancestry for all 56 active records, fan-in-only scopes for SDPFN0/PGPR3J, and state-aware branch_pr recovery. The second independent review returned pass.
      Promotion: incident-candidate
      Fixability: repo-fixable
id_source: "generated"
---
## Summary

Define and validate the complete executable AgentPlane 0.7 refactor graph.

The corrected graph contains 55 executable implementation/release nodes plus this planning task. It covers RF-00 through RF-27, verified Workflow/CLI contract drift, six executable alpha/beta/rc qualification gates, five atomic command-family vertical slices, automated final-release ancestor closure, migration/documentation gates, and terminal 0.7.0 publication.

## Scope

- In scope: create executable AgentPlane task artifacts for every currently valid RF-00 through RF-27 item, add verified Workflow/CLI contract-drift prerequisites, split mixed verification boundaries, enforce release ancestor closure and executable alpha/beta/rc qualification gates, assign one owner per leaf, and define the terminal 0.7.0 release gate.
- Release strategy: optional 0.7.0 prereleases are qualification points; isolated compatibility-safe fixes may be backported to 0.6.25+ only when useful, but no intermediate publication is mandatory.
- Evidence baseline: main at 026a4db26e7e541f36ef6652274ff3cefa1feccb and agentplane-refactoring-review-v2.md.
- Out of scope: implementation code for RF leaves, mandatory patch-release churn, unrelated maintenance, and any mutation of the agentplane-loops checkout.

## Plan

1. Reconcile RF-00 through RF-27 against current main and classify each item as executable, already satisfied, merged, or replaced with evidence.
2. Define atomic leaf tasks with a single owner, explicit scope, acceptance-specific Verify Steps, and the minimum dependency edges required for safe sequencing.
3. Create the leaf task artifacts and release-gate tasks, tagging each with its RF identifier, wave, and intended compatible release slice.
4. Record the program roadmap, version policy, compatibility window, and re-approval triggers in the planning task.
5. Validate task-state integrity, dependency readiness, policy routing, and repository cleanliness; record residual risks in Findings.

## Verify Steps

1. Inspect every open task tagged v0.7. Expected: RF-00 through RF-27 are covered by atomic executable leaves, verified contract-drift prerequisites, and real fan-in gates; every leaf has one owner and task-specific Verify Steps.
2. Traverse dependencies from the final 0.7.0 task. Expected: every mandatory leaf, including RF-02 and RF-20, is an ancestor; each next milestone depends on the previous qualification gate.
3. Run `node scripts/checks/check-task-state.mjs` (or canonical `bun run task-state:check` where Bun is available). Expected: registry, documents, dependencies, and statuses are consistent and acyclic.
4. Run `ap doctor` and `node .agentplane/policy/check-routing.mjs`. Expected: no new workflow/policy errors; unrelated historical warnings are recorded.
5. Run a semantic EVALUATOR review. Expected: version strategy, atomicity, rollback/recovery, acceptance coverage, and release fan-in have no blocking finding.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-22T18:59:27.343Z — VERIFY — ok

By: PLANNER

Note: Verified 43 executable leaves plus the planning task: RF-00 through RF-27 coverage is complete, task-state and dependency integrity pass, roadmap/task Markdown is formatted, policy routing passes, and doctor has no new errors. Bun is unavailable locally, so the exact task-state script was run directly with Node; hosted PR verification must still exercise the Bun wrapper.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-22T18:56:28.803Z, excerpt_hash=sha256:3a8567a0432c291cf13e38734d4a6ce38896b72452d0dabf6def3e4ef551f342

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221838-SD1W93-define-the-agentplane-0-7-refactor-execution-gra/.agentplane/tasks/202607221838-SD1W93/blueprint/resolved-snapshot.json
- old_digest: ef1a009399c90576c1c070524dfa6d59a275fc968242f4cc0a77ab34ed8bd555
- current_digest: ef1a009399c90576c1c070524dfa6d59a275fc968242f4cc0a77ab34ed8bd555
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221838-SD1W93

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221838-SD1W93
- diagnostic_command: agentplane pr check 202607221838-SD1W93
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

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

- Observation: Local Bun executable is unavailable; doctor reports two pre-existing historical DONE-task commit-hash warnings unrelated to this graph.
  Impact: The Bun command wrapper was not exercised locally, but its exact Node target passed; no new task graph, workflow, or policy error was found.
  Resolution: Require hosted PR verification to run the canonical Bun wrapper and preserve the historical doctor warnings as non-blocking pre-existing evidence.

- Observation: The first independent EVALUATOR review returned rework: RF-02 and RF-20 were outside final release ancestry, wave gates were prose-only, two internal umbrella tasks were not atomic, and branch_pr rollback described the wrong subsystem.
  Impact: The initial graph could have released without two mandatory RF leaves and concentrated unrelated migrations into unsafe XL PR boundaries.
  Resolution: Added six executable milestone fan-in gates, five command-family vertical slices, a release dependency-closure guard task, final gate ancestry for all 56 active records, fan-in-only scopes for SDPFN0/PGPR3J, and state-aware branch_pr recovery. The second independent review returned pass.
  Promotion: incident-candidate
  Fixability: repo-fixable
