---
id: "202606081917-Z9QTR4"
title: "Document AgentPlane Loop Model v0.1"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 2
origin:
  system: "manual"
depends_on:
  - "202606081917-EYAKN6"
tags:
  - "agentplane"
  - "docs"
  - "loops"
task_kind: "docs"
mutation_scope: "docs"
verify:
  - "bun run docs:ia:check"
  - "node .agentplane/policy/check-routing.mjs"
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
doc_updated_at: "2026-06-08T19:18:43.997Z"
doc_updated_by: "ORCHESTRATOR"
description: "Turn the loop requirements into canonical developer/user documentation: define Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, supported MVP scope, and staged non-goals."
sections:
  Summary: |-
    Document AgentPlane Loop Model v0.1

    Turn the loop requirements into canonical developer/user documentation: define Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, supported MVP scope, and staged non-goals.
  Scope: |-
    - In scope: Turn the loop requirements into canonical developer/user documentation: define Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, supported MVP scope, and staged non-goals.
    - Out of scope: unrelated refactors not required for "Document AgentPlane Loop Model v0.1".
  Plan: |-
    1. Create canonical documentation for AgentPlane loops in docs/developer and reference surfaces.
    2. Define facts/inferences/hypotheses from the requirements: Task/Blueprint/Recipe/Loop separation, LoopRun artifact layout, event ledger, observations, decisions, stop conditions, and promotion boundaries.
    3. Document the first implementation slice and non-goals: no uncontrolled external agent invocation, no self-modifying trusted loops, no policy weakening.
    4. Cross-link existing architecture, recipes, runner/evidence docs where relevant.
    5. Verify policy routing and docs IA checks.
  Verify Steps: |-
    PLANNER fallback scaffold for "Document AgentPlane Loop Model v0.1". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Document AgentPlane Loop Model v0.1". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Document AgentPlane Loop Model v0.1

Turn the loop requirements into canonical developer/user documentation: define Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, supported MVP scope, and staged non-goals.

## Scope

- In scope: Turn the loop requirements into canonical developer/user documentation: define Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, supported MVP scope, and staged non-goals.
- Out of scope: unrelated refactors not required for "Document AgentPlane Loop Model v0.1".

## Plan

1. Create canonical documentation for AgentPlane loops in docs/developer and reference surfaces.
2. Define facts/inferences/hypotheses from the requirements: Task/Blueprint/Recipe/Loop separation, LoopRun artifact layout, event ledger, observations, decisions, stop conditions, and promotion boundaries.
3. Document the first implementation slice and non-goals: no uncontrolled external agent invocation, no self-modifying trusted loops, no policy weakening.
4. Cross-link existing architecture, recipes, runner/evidence docs where relevant.
5. Verify policy routing and docs IA checks.

## Verify Steps

PLANNER fallback scaffold for "Document AgentPlane Loop Model v0.1". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Document AgentPlane Loop Model v0.1". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
