---
id: "202602101258-D78DYX"
title: "T13: AGENTS protocol to create UPGRADER task from review.json"
result_summary: "Documented UPGRADER trigger from upgrade review.json"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202602101258-GXJAJV"
  - "202602101258-FQ8HDW"
tags:
  - "docs"
  - "agents"
  - "upgrade"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:52:11.316Z"
  updated_by: "DOCS"
  note: "added an explicit upgrade review.json trigger and a deterministic UPGRADER task creation procedure (ORCHESTRATOR->PLANNER)"
commit:
  hash: "a5e695a3aebb7cc27ae0045bd36a7fe28a43a8df"
  message: "🚧 D78DYX docs: trigger UPGRADER from upgrade review.json"
comments:
  -
    author: "DOCS"
    body: "Start: document an explicit protocol to create an UPGRADER task when upgrade emits review.json with needsSemanticReview=true."
  -
    author: "DOCS"
    body: "Verified: AGENTS.md now defines an explicit trigger based on upgrade review.json needsSemanticReview and a deterministic procedure to create an UPGRADER task."
events:
  -
    type: "status"
    at: "2026-02-10T14:51:37.483Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document an explicit protocol to create an UPGRADER task when upgrade emits review.json with needsSemanticReview=true."
  -
    type: "verify"
    at: "2026-02-10T14:52:11.316Z"
    author: "DOCS"
    state: "ok"
    note: "added an explicit upgrade review.json trigger and a deterministic UPGRADER task creation procedure (ORCHESTRATOR->PLANNER)"
  -
    type: "status"
    at: "2026-02-10T14:53:18.248Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS.md now defines an explicit trigger based on upgrade review.json needsSemanticReview and a deterministic procedure to create an UPGRADER task."
doc_version: 2
doc_updated_at: "2026-02-10T14:53:18.248Z"
doc_updated_by: "DOCS"
description: "Add canonical AGENTS.md protocol tying upgrade review.json needsSemanticReview to creating an UPGRADER downstream task and done criteria."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- packages/agentplane/assets/AGENTS.md only.\n\n### Checks\n- Ensure the protocol references upgrade review.json artifacts and defines an explicit trigger + task creation procedure.\n- English-only.\n\n### Evidence / Commands\n- rg -n "review.json" packages/agentplane/assets/AGENTS.md\n- rg -n "UPGRADER" packages/agentplane/assets/AGENTS.md\n\n### Pass criteria\n- AGENTS.md defines a deterministic trigger based on needsSemanticReview in review.json.\n- Procedure clearly assigns responsibilities (ORCHESTRATOR instructs; PLANNER creates downstream; UPGRADER resolves).

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:52:11.316Z — VERIFY — ok

By: DOCS

Note: added an explicit upgrade review.json trigger and a deterministic UPGRADER task creation procedure (ORCHESTRATOR->PLANNER)

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:51:37.483Z, excerpt_hash=sha256:f9417107ccebbb549e956e34c446d71ea0ce63c25234afeee95cf9d74aa04ede

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
