---
id: "202607242234-S7WDVM"
title: "Amend AgentPlane 0.7 graph with bounded supervisor execution"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "budgets"
  - "planning"
  - "refactor"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane doctor"
  - "bun run format:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T22:35:12.742Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved to add one bounded-supervisor beta.1 leaf and wire the canonical 0.7 DAG without runtime implementation."
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
    body: "Start: Amend the approved AgentPlane 0.7 release DAG with one bounded supervisor execution leaf, dependency wiring, and canonical plan text only; no runtime implementation or legacy loop surface changes."
events:
  -
    type: "status"
    at: "2026-07-24T22:35:38.141Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Amend the approved AgentPlane 0.7 release DAG with one bounded supervisor execution leaf, dependency wiring, and canonical plan text only; no runtime implementation or legacy loop surface changes."
doc_version: 3
doc_updated_at: "2026-07-24T22:38:29.938Z"
doc_updated_by: "PLANNER"
description: "Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code."
sections:
  Summary: |-
    Amend AgentPlane 0.7 graph with bounded supervisor execution

    Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.
  Scope: |-
    - In scope: Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.
    - Out of scope: unrelated refactors not required for "Amend AgentPlane 0.7 graph with bounded supervisor execution".
  Plan: "1. Create one CODER beta.1 leaf that defines a durable supervisor episode journal, deterministic transition and stop records, bounded feedback deltas, and hard limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. 2. Depend the leaf on typed evaluator execution, shared supervisor extraction, and typed runner lifecycle results; make direct supervision and the beta.1 qualification gate depend on the new leaf. 3. Update docs/internal/v0.7-refactor-plan.md and the affected task dependency metadata without implementing runtime code or exposing the legacy ap loop surface. 4. Verify routing, task graph consistency, docs formatting, and AgentPlane doctor; publish through branch_pr and integrate into main."
  Verify Steps: "1. Inspect the new CODER leaf with agentplane task brief and next-action. Expected: it is atomic, plan-approved, tagged v0.7/wave-supervisor, waits only on typed evaluator/shared supervisor/typed runner prerequisites, and exposes concrete code-level Verify Steps. 2. Inspect direct-supervisor and beta.1-gate dependencies. Expected: both include the new leaf without cycles, while later milestones remain transitively gated. 3. Review docs/internal/v0.7-refactor-plan.md. Expected: leaf count, beta.1 table row, dependency names, wave-gate text, and explicit non-goal for the legacy ap loop surface agree with task metadata. 4. Run node .agentplane/policy/check-routing.mjs, agentplane doctor, bun run format:check, and the task-state consistency check selected by repository scripts. Expected: all pass with no generated drift. 5. Confirm git diff contains only the planning task, new implementation task, affected dependency task records, canonical 0.7 plan, and CLI-owned task export artifacts."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "- Revert the planning amendment commit and restore the previous direct-supervisor and beta.1-gate dependency lists. - Remove the unimplemented leaf only through AgentPlane task lifecycle commands; do not delete task records manually. - Re-run routing, doctor, format, and task-state consistency checks after rollback."
  Findings: |-
    - Observation: Open PR #4612 also amends docs/internal/v0.7-refactor-plan.md and the release-leaf count.
      Impact: After this amendment lands, PR #4612 must rebase and preserve 202607242236-1BFWEY; its final leaf count must include both the effect-in-doubt safety leaves and the bounded supervisor episode leaf.
      Resolution: Treat 202607242236-1BFWEY as a required beta.1 leaf and keep it in direct-supervisor and beta.1-gate ancestry when resolving the PR #4612 overlap.
id_source: "generated"
---
## Summary

Amend AgentPlane 0.7 graph with bounded supervisor execution

Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.

## Scope

- In scope: Add a beta.1 implementation leaf for a durable supervisor episode journal and hard execution budgets, wire its release-DAG dependencies, and update the canonical AgentPlane 0.7 refactor plan without implementing runtime code.
- Out of scope: unrelated refactors not required for "Amend AgentPlane 0.7 graph with bounded supervisor execution".

## Plan

1. Create one CODER beta.1 leaf that defines a durable supervisor episode journal, deterministic transition and stop records, bounded feedback deltas, and hard limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. 2. Depend the leaf on typed evaluator execution, shared supervisor extraction, and typed runner lifecycle results; make direct supervision and the beta.1 qualification gate depend on the new leaf. 3. Update docs/internal/v0.7-refactor-plan.md and the affected task dependency metadata without implementing runtime code or exposing the legacy ap loop surface. 4. Verify routing, task graph consistency, docs formatting, and AgentPlane doctor; publish through branch_pr and integrate into main.

## Verify Steps

1. Inspect the new CODER leaf with agentplane task brief and next-action. Expected: it is atomic, plan-approved, tagged v0.7/wave-supervisor, waits only on typed evaluator/shared supervisor/typed runner prerequisites, and exposes concrete code-level Verify Steps. 2. Inspect direct-supervisor and beta.1-gate dependencies. Expected: both include the new leaf without cycles, while later milestones remain transitively gated. 3. Review docs/internal/v0.7-refactor-plan.md. Expected: leaf count, beta.1 table row, dependency names, wave-gate text, and explicit non-goal for the legacy ap loop surface agree with task metadata. 4. Run node .agentplane/policy/check-routing.mjs, agentplane doctor, bun run format:check, and the task-state consistency check selected by repository scripts. Expected: all pass with no generated drift. 5. Confirm git diff contains only the planning task, new implementation task, affected dependency task records, canonical 0.7 plan, and CLI-owned task export artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the planning amendment commit and restore the previous direct-supervisor and beta.1-gate dependency lists. - Remove the unimplemented leaf only through AgentPlane task lifecycle commands; do not delete task records manually. - Re-run routing, doctor, format, and task-state consistency checks after rollback.

## Findings

- Observation: Open PR #4612 also amends docs/internal/v0.7-refactor-plan.md and the release-leaf count.
  Impact: After this amendment lands, PR #4612 must rebase and preserve 202607242236-1BFWEY; its final leaf count must include both the effect-in-doubt safety leaves and the bounded supervisor episode leaf.
  Resolution: Treat 202607242236-1BFWEY as a required beta.1 leaf and keep it in direct-supervisor and beta.1-gate ancestry when resolving the PR #4612 overlap.
