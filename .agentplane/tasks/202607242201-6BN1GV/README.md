---
id: "202607242201-6BN1GV"
title: "Amend the AgentPlane 0.7 graph with the effect-in-doubt safety gate"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
tags:
  - "milestone-alpha2"
  - "planning"
  - "refactor"
  - "safety"
  - "v0.7"
  - "docs"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "ap doctor"
  - "bun run format:check"
  - "bun run task-state:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T22:06:21.349Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved bounded graph amendment after splitting journal and resolution at separate verification boundaries."
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
    body: "Start: Persist the reviewed effect journal and operator-resolution safety leaves in the executable v0.7 release graph, update the canonical roadmap, and verify full release ancestry."
events:
  -
    type: "status"
    at: "2026-07-24T22:08:21.330Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Persist the reviewed effect journal and operator-resolution safety leaves in the executable v0.7 release graph, update the canonical roadmap, and verify full release ancestry."
doc_version: 3
doc_updated_at: "2026-07-24T22:09:59.430Z"
doc_updated_by: "PLANNER"
description: "Persist the mandatory durable effect_in_doubt follow-up in the AgentPlane 0.7 executable DAG, wire alpha.2 and typed runner lifecycle fan-in, and update the internal execution roadmap and closure counts."
sections:
  Summary: |-
    Amend the AgentPlane 0.7 graph with the effect-in-doubt safety gate

    Persist the mandatory durable effect_in_doubt follow-up in the AgentPlane 0.7 executable DAG, wire alpha.2 and typed runner lifecycle fan-in, and update the internal execution roadmap and closure counts.
  Scope: |-
    - In scope: persist effect journal task 202607242204-SX8T09 and operator resolution task 202607242158-QV09NA, add the resolved safety chain to the alpha.2 qualification and typed runner lifecycle dependency closure, make this graph amendment a prerequisite of the terminal safety leaf, and update docs/internal/v0.7-refactor-plan.md.
    - Validate that every mandatory v0.7 leaf remains reachable from the stable release task and that no dependency cycle is introduced.
    - Out of scope: implementation of RF-06b, RF-13 or effect runtime behavior; release publication; changes to agentplane-loops.
  Plan: |-
    1. Preserve the RF-06 finding as two atomic CODER leaves: a downgrade-resistant pre-effect operation journal and an authority-bound operator resolution protocol.
    2. Wire both behind RF-06b/RF-13, keep RF-03 and the journal as explicit prerequisites of resolution, and fan the terminal resolution leaf into alpha.2 and typed runner lifecycle.
    3. Update the internal v0.7 roadmap, executable-leaf counts, graph table and safety constraints.
    4. Validate task-state integrity, final-release ancestry, policy routing, formatting and doctor output; publish the graph amendment through branch_pr.
  Verify Steps: |-
    1. Inspect tasks 202607242204-SX8T09 and 202607242158-QV09NA. Expected: separate high-priority CODER code.branch_pr leaves for pre-effect journal/single-spawn safety and explicit operator resolution/lease semantics.
    2. Traverse dependencies. Expected: journal waits for RF-06b and RF-13; resolution waits for RF-03, RF-06b, RF-13, journal and this amendment; alpha.2 gate 9M2FBQ and runner result task R7WS01 wait for resolution; no cycle or unknown task exists.
    3. Traverse from final release XV67TD. Expected: all prior mandatory leaves plus both safety leaves are ancestors and the roadmap counts match the canonical task graph.
    4. Run bun run task-state:check, node .agentplane/policy/check-routing.mjs, bun run format:check and ap doctor. Expected: no new errors; any pre-existing warning is recorded with evidence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert only this planning-task PR before either SX8T09 or QV09NA implementation begins.
    - Restore the prior dependency lists through agentplane task update rather than editing task storage manually.
    - Re-run task-state, ancestry and policy checks to prove the original graph is restored.
  Findings: |-
    - RF-06 exact-SHA review found a bounded but release-relevant gap: effect uncertainty fails closed, yet durable operation identity and operator resolution need explicit post-RF-13 contracts.
    - Read-only design audit split the work at a real verification boundary: pre-effect journal/single-spawn safety versus operator verdict/lease/claim retirement.
    - A separate planning PR is required so the release DAG is canonical on main before parallel alpha.2 implementation starts.

    - Observation: Doctor passed with zero errors and three historical warnings: two older DONE tasks missing implementation hashes and one RF-02 task pointing at a close commit.
      Impact: The graph amendment introduces no workflow or workspace error; the warnings predate and are outside this docs-only task scope.
      Resolution: Record them as pre-existing non-blocking evidence and leave repair to separately scoped lifecycle-maintenance work.
id_source: "generated"
---
## Summary

Amend the AgentPlane 0.7 graph with the effect-in-doubt safety gate

Persist the mandatory durable effect_in_doubt follow-up in the AgentPlane 0.7 executable DAG, wire alpha.2 and typed runner lifecycle fan-in, and update the internal execution roadmap and closure counts.

## Scope

- In scope: persist effect journal task 202607242204-SX8T09 and operator resolution task 202607242158-QV09NA, add the resolved safety chain to the alpha.2 qualification and typed runner lifecycle dependency closure, make this graph amendment a prerequisite of the terminal safety leaf, and update docs/internal/v0.7-refactor-plan.md.
- Validate that every mandatory v0.7 leaf remains reachable from the stable release task and that no dependency cycle is introduced.
- Out of scope: implementation of RF-06b, RF-13 or effect runtime behavior; release publication; changes to agentplane-loops.

## Plan

1. Preserve the RF-06 finding as two atomic CODER leaves: a downgrade-resistant pre-effect operation journal and an authority-bound operator resolution protocol.
2. Wire both behind RF-06b/RF-13, keep RF-03 and the journal as explicit prerequisites of resolution, and fan the terminal resolution leaf into alpha.2 and typed runner lifecycle.
3. Update the internal v0.7 roadmap, executable-leaf counts, graph table and safety constraints.
4. Validate task-state integrity, final-release ancestry, policy routing, formatting and doctor output; publish the graph amendment through branch_pr.

## Verify Steps

1. Inspect tasks 202607242204-SX8T09 and 202607242158-QV09NA. Expected: separate high-priority CODER code.branch_pr leaves for pre-effect journal/single-spawn safety and explicit operator resolution/lease semantics.
2. Traverse dependencies. Expected: journal waits for RF-06b and RF-13; resolution waits for RF-03, RF-06b, RF-13, journal and this amendment; alpha.2 gate 9M2FBQ and runner result task R7WS01 wait for resolution; no cycle or unknown task exists.
3. Traverse from final release XV67TD. Expected: all prior mandatory leaves plus both safety leaves are ancestors and the roadmap counts match the canonical task graph.
4. Run bun run task-state:check, node .agentplane/policy/check-routing.mjs, bun run format:check and ap doctor. Expected: no new errors; any pre-existing warning is recorded with evidence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert only this planning-task PR before either SX8T09 or QV09NA implementation begins.
- Restore the prior dependency lists through agentplane task update rather than editing task storage manually.
- Re-run task-state, ancestry and policy checks to prove the original graph is restored.

## Findings

- RF-06 exact-SHA review found a bounded but release-relevant gap: effect uncertainty fails closed, yet durable operation identity and operator resolution need explicit post-RF-13 contracts.
- Read-only design audit split the work at a real verification boundary: pre-effect journal/single-spawn safety versus operator verdict/lease/claim retirement.
- A separate planning PR is required so the release DAG is canonical on main before parallel alpha.2 implementation starts.

- Observation: Doctor passed with zero errors and three historical warnings: two older DONE tasks missing implementation hashes and one RF-02 task pointing at a close commit.
  Impact: The graph amendment introduces no workflow or workspace error; the warnings predate and are outside this docs-only task scope.
  Resolution: Record them as pre-existing non-blocking evidence and leave repair to separately scoped lifecycle-maintenance work.
