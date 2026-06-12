---
id: "202606081917-Z9QTR4"
title: "Document AgentPlane Loop Model v0.1"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 4
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
  state: "approved"
  updated_at: "2026-06-12T10:24:22.628Z"
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
doc_updated_at: "2026-06-12T10:24:01.308Z"
doc_updated_by: "PLANNER"
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
    1. Run `bun run docs:check` or the repo-local docs validation command if narrower docs checks are available. Expected: loop model documentation builds/checks without broken references.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after documentation changes.
    3. Inspect the loop docs/reference pages. Expected: Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, MVP scope, and non-goals are explicitly documented.
    4. Confirm docs state v0.1 safety boundaries: no uncontrolled external agent invocation, no self-modifying trusted loops, and no policy weakening.
    5. Compare docs against the implemented v0.1 model and record any future v0.2 material in Findings rather than presenting it as current capability.
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

1. Run `bun run docs:check` or the repo-local docs validation command if narrower docs checks are available. Expected: loop model documentation builds/checks without broken references.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after documentation changes.
3. Inspect the loop docs/reference pages. Expected: Loop, LoopRun, Iteration, Observation, Decision, stop conditions, artifact layout, MVP scope, and non-goals are explicitly documented.
4. Confirm docs state v0.1 safety boundaries: no uncontrolled external agent invocation, no self-modifying trusted loops, and no policy weakening.
5. Compare docs against the implemented v0.1 model and record any future v0.2 material in Findings rather than presenting it as current capability.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
