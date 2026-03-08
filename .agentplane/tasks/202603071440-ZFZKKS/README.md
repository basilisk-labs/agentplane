---
id: "202603071440-ZFZKKS"
title: "Define canonical agent bootstrap path"
result_summary: "Defined the canonical agent bootstrap path and wired it into startup surfaces."
status: "DONE"
priority: "med"
owner: "PLANNER"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T14:43:10.092Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: bootstrap-doc agent-first cleanup batch."
verification:
  state: "ok"
  updated_at: "2026-03-07T14:54:22.576Z"
  updated_by: "REVIEWER"
  note: "Verified: shared bootstrap contract, generated bootstrap doc, quickstart/role refactor, drift check, CLI docs freshness, routing check, docs build, and targeted CLI tests all passed."
commit:
  hash: "aed6d519fbe50ff428d5fc81e8d6d2566dfa2e98"
  message: "✨ ZFZKKS docs: unify agent bootstrap surfaces"
comments:
  -
    author: "CODER"
    body: "Start: define the canonical bootstrap path and encode it before updating the gateway or CLI help surfaces."
  -
    author: "CODER"
    body: "Verified: the shared bootstrap contract now drives startup guidance across quickstart, role output, AGENTS command blocks, and the generated bootstrap doc with an enforced drift check."
events:
  -
    type: "status"
    at: "2026-03-07T14:43:10.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the canonical bootstrap path and encode it before updating the gateway or CLI help surfaces."
  -
    type: "verify"
    at: "2026-03-07T14:54:22.576Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: shared bootstrap contract, generated bootstrap doc, quickstart/role refactor, drift check, CLI docs freshness, routing check, docs build, and targeted CLI tests all passed."
  -
    type: "status"
    at: "2026-03-07T14:54:22.785Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the shared bootstrap contract now drives startup guidance across quickstart, role output, AGENTS command blocks, and the generated bootstrap doc with an enforced drift check."
doc_version: 3
doc_updated_at: "2026-03-07T14:54:22.785Z"
doc_updated_by: "CODER"
description: "Choose the single canonical startup flow for agents and document it so every other entrypoint can point to one path."
id_source: "generated"
---
## Summary

Define the single canonical bootstrap path agents should follow before any other docs surface.

## Scope

Select one startup path and encode it as the source for gateway and startup help surfaces.

## Plan

1. Define canonical bootstrap stages. 2. Encode the contract in shared source. 3. Update gateway references to point to the same path.

## Verify Steps

<!-- TODO: FILL VERIFY STEPS -->

### Scope

### Checks

### Evidence / Commands

### Pass criteria

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T14:54:22.576Z — VERIFY — ok

By: REVIEWER

Note: Verified: shared bootstrap contract, generated bootstrap doc, quickstart/role refactor, drift check, CLI docs freshness, routing check, docs build, and targeted CLI tests all passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T14:43:10.809Z, excerpt_hash=sha256:2efb66c1b9c8307de67b5b4db3a8c5a993803b2b5e90338efe45457a7124187e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the gateway/bootstrap source files and generated startup docs if the new path adds ambiguity or breaks checks.

## Findings


## Risks

If the bootstrap path is too abstract, quickstart and AGENTS may still drift or become harder to scan.
