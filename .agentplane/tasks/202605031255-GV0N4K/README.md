---
id: "202605031255-GV0N4K"
title: "Define WORKFLOW.md v2 canonical source contract"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "config"
  - "docs"
  - "workflow"
verify:
  - "agentplane doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:57:37.201Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T13:27:42.785Z"
  updated_by: "PLANNER"
  note: "WORKFLOW v2 source-of-truth contract implemented in fb39a8d8 with CLI-owned front matter, legacy config import fallback, startup docs, and validation coverage."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: Begin WORKFLOW.md v2 source-of-truth contract design on the primary branch for the dependent migration task graph; implementation tasks remain dependency-gated until this contract is accepted."
events:
  -
    type: "status"
    at: "2026-05-03T13:01:43.671Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: Begin WORKFLOW.md v2 source-of-truth contract design on the primary branch for the dependent migration task graph; implementation tasks remain dependency-gated until this contract is accepted."
  -
    type: "verify"
    at: "2026-05-03T13:27:42.785Z"
    author: "PLANNER"
    state: "ok"
    note: "WORKFLOW v2 source-of-truth contract implemented in fb39a8d8 with CLI-owned front matter, legacy config import fallback, startup docs, and validation coverage."
doc_version: 3
doc_updated_at: "2026-05-03T13:27:42.790Z"
doc_updated_by: "PLANNER"
description: "Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules."
sections:
  Summary: |-
    Define WORKFLOW.md v2 canonical source contract
    
    Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.
  Scope: |-
    - In scope: Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.
    - Out of scope: unrelated refactors not required for "Define WORKFLOW.md v2 canonical source contract".
  Plan: "Define WORKFLOW.md v2 as the canonical source-of-truth contract. Document the exact responsibilities of AGENTS.md, WORKFLOW.md, runner/evaluator startup, CLI-owned front matter formatting, config.json removal, legacy import behavior, and conflict handling. Acceptance: design text includes a migration sequence and rejects any steady-state dual-source model."
  Verify Steps: |-
    1. Review the requested outcome for "Define WORKFLOW.md v2 canonical source contract". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T13:27:42.785Z — VERIFY — ok
    
    By: PLANNER
    
    Note: WORKFLOW v2 source-of-truth contract implemented in fb39a8d8 with CLI-owned front matter, legacy config import fallback, startup docs, and validation coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:01:43.671Z, excerpt_hash=sha256:c7a25d62accdf1554e2bcb64329211617b2b73fba29d3b8d70e4579e3dbfebbb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: WORKFLOW.md now carries workflow/workspace/tasks/runner/scheduler/evaluator/observability state and .agentplane/config.json is removed from managed state.
      Impact: Any agent can read the startup contract from WORKFLOW.md while agentplane config show remains a resolved JSON view.
      Resolution: Verified targeted typecheck/tests, workflow build, doctor, and policy routing.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Define WORKFLOW.md v2 canonical source contract

Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.

## Scope

- In scope: Design the WORKFLOW.md v2 contract as the only project source of truth for AgentPlane workflow/config state. Specify startup contract behavior for IDE agents, CLI-owned front matter formatting, AGENTS.md policy-gateway boundaries, config.json removal strategy, migration phases, and source-of-truth conflict rules.
- Out of scope: unrelated refactors not required for "Define WORKFLOW.md v2 canonical source contract".

## Plan

Define WORKFLOW.md v2 as the canonical source-of-truth contract. Document the exact responsibilities of AGENTS.md, WORKFLOW.md, runner/evaluator startup, CLI-owned front matter formatting, config.json removal, legacy import behavior, and conflict handling. Acceptance: design text includes a migration sequence and rejects any steady-state dual-source model.

## Verify Steps

1. Review the requested outcome for "Define WORKFLOW.md v2 canonical source contract". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T13:27:42.785Z — VERIFY — ok

By: PLANNER

Note: WORKFLOW v2 source-of-truth contract implemented in fb39a8d8 with CLI-owned front matter, legacy config import fallback, startup docs, and validation coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T13:01:43.671Z, excerpt_hash=sha256:c7a25d62accdf1554e2bcb64329211617b2b73fba29d3b8d70e4579e3dbfebbb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: WORKFLOW.md now carries workflow/workspace/tasks/runner/scheduler/evaluator/observability state and .agentplane/config.json is removed from managed state.
  Impact: Any agent can read the startup contract from WORKFLOW.md while agentplane config show remains a resolved JSON view.
  Resolution: Verified targeted typecheck/tests, workflow build, doctor, and policy routing.
  Promotion: incident-candidate
  Fixability: external
