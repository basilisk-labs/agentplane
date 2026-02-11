---
id: "202602101258-GXJAJV"
title: "T3: Redefine UPGRADER as semantic merge after upgrade"
result_summary: "UPGRADER repurposed to resolve semantic prompt/policy conflicts after mechanical upgrade."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602101258-80YBTW"
tags:
  - "agents"
  - "policy"
  - "upgrade"
  - "docs"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T13:09:32.294Z"
  updated_by: "TESTER"
  note: "Verified: UPGRADER profile now focuses on semantic prompt/policy reconciliation after upgrade; AGENTS.md documents the post-upgrade semantic merge protocol; lint and tests passed."
commit:
  hash: "4ace0071360f1ecfd8228398f721f7814eb1986c"
  message: "🚧 GXJAJV upgrade: redefine UPGRADER as semantic merge"
comments:
  -
    author: "CODER"
    body: "Start: Redefine UPGRADER as semantic merge after upgrade and document the protocol in AGENTS.md."
  -
    author: "CODER"
    body: "Verified: UPGRADER is now a semantic merge agent post-upgrade; protocol documented in AGENTS.md; lint and tests passed."
events:
  -
    type: "status"
    at: "2026-02-10T13:07:28.092Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Redefine UPGRADER as semantic merge after upgrade and document the protocol in AGENTS.md."
  -
    type: "verify"
    at: "2026-02-10T13:09:32.294Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: UPGRADER profile now focuses on semantic prompt/policy reconciliation after upgrade; AGENTS.md documents the post-upgrade semantic merge protocol; lint and tests passed."
  -
    type: "status"
    at: "2026-02-10T13:10:42.255Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: UPGRADER is now a semantic merge agent post-upgrade; protocol documented in AGENTS.md; lint and tests passed."
doc_version: 2
doc_updated_at: "2026-02-10T13:10:42.255Z"
doc_updated_by: "CODER"
description: "Rewrite UPGRADER profile to focus on semantic merge after upgrade; update AGENTS.md protocol for when to create UPGRADER tasks."
id_source: "generated"
---
## Summary

Redefine UPGRADER as the semantic merge agent invoked after agentplane upgrade when mechanical merges leave meaning-level conflicts.

## Scope

In scope: packages/agentplane/assets/agents/UPGRADER.json; .agentplane/agents/UPGRADER.json; packages/agentplane/assets/AGENTS.md (add a framework upgrade/prompt merge protocol section). Out of scope: changing upgrade implementation (handled in T4).

## Plan

1. Rewrite UPGRADER agent profile (assets + installed) to remove stale-date and last_update mechanics; define inputs/outputs for semantic merge after upgrade, anchored on AGENTS.md. 2. Add AGENTS.md section describing when to create an UPGRADER task, who creates it, and done criteria. 3. Run agents-template tests and lint.

## Risks

Risk: unclear separation between upgrade mechanics and semantic review could cause duplicate work. Mitigation: make UPGRADER explicitly post-upgrade and report-driven; treat upgrade artifacts as inputs.

## Verify Steps

Commands:\n- bun run test:agentplane -- agents template tests must pass\n- bun run lint\nPass criteria:\n- UPGRADER profile no longer mentions stale timers or manual last_update updates.\n- AGENTS.md documents an explicit post-upgrade semantic merge protocol.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T13:09:32.294Z — VERIFY — ok

By: TESTER

Note: Verified: UPGRADER profile now focuses on semantic prompt/policy reconciliation after upgrade; AGENTS.md documents the post-upgrade semantic merge protocol; lint and tests passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T13:07:28.092Z, excerpt_hash=sha256:8f1325950f0e6683be415b91421b9482f4b4269e1bbbfcc794fac276d50c1498

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert UPGRADER.json and AGENTS.md edits and re-run the same tests.

## Context

agentplane upgrade already handles mechanical merges and metadata updates. The remaining risk is semantic drift between local prompt/policy edits and upstream framework changes; UPGRADER should focus exclusively on resolving those conflicts against AGENTS.md canonical policy.
