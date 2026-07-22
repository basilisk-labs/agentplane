---
id: "202607221852-ABP0EX"
title: "Add policy-gated semantic retrieval escalation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221849-NWVCAG"
  - "202607221852-9T0RT3"
tags:
  - "context"
  - "milestone-beta2"
  - "refactor"
  - "retrieval"
  - "rf-19"
  - "semantic-escalation"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
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
doc_updated_at: "2026-07-22T18:52:20.275Z"
doc_updated_by: "PLANNER"
description: "RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default."
sections:
  Summary: |-
    Add policy-gated semantic retrieval escalation

    RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default.
  Scope: |-
    - In scope: measurable escalation triggers, typed selector input/output, authority/budget policy, provenance, fallback, quality/escalation metrics, and conflict fixtures.
    - Out of scope: running CURATOR before every coding task or allowing semantic selection to rewrite durable knowledge.
  Plan: |-
    1. Define threshold and policy inputs for size, confidence, domain conflict, and synthesis breadth.
    2. Prepare a bounded candidate-selection work order only when a trigger fires.
    3. Validate semantic selections against available refs/digests and retain deterministic fallback.
    4. Record cost, reason, selection provenance, and downstream quality.
    5. Calibrate triggers on golden retrieval scenarios.
  Verify Steps: |-
    1. Run high-confidence bounded retrieval. Expected: zero semantic escalation.
    2. Run each trigger fixture. Expected: one bounded selector episode with explicit reason, authority, budget, and candidate refs.
    3. Return invalid/stale selections or fail the adapter. Expected: validation rejects them and deterministic fallback/typed blocker is preserved.
    4. Compare escalation rate, retrieval quality, and total episode/token cost to baseline.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Add policy-gated semantic retrieval escalation

RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default.

## Scope

- In scope: measurable escalation triggers, typed selector input/output, authority/budget policy, provenance, fallback, quality/escalation metrics, and conflict fixtures.
- Out of scope: running CURATOR before every coding task or allowing semantic selection to rewrite durable knowledge.

## Plan

1. Define threshold and policy inputs for size, confidence, domain conflict, and synthesis breadth.
2. Prepare a bounded candidate-selection work order only when a trigger fires.
3. Validate semantic selections against available refs/digests and retain deterministic fallback.
4. Record cost, reason, selection provenance, and downstream quality.
5. Calibrate triggers on golden retrieval scenarios.

## Verify Steps

1. Run high-confidence bounded retrieval. Expected: zero semantic escalation.
2. Run each trigger fixture. Expected: one bounded selector episode with explicit reason, authority, budget, and candidate refs.
3. Return invalid/stale selections or fail the adapter. Expected: validation rejects them and deterministic fallback/typed blocker is preserved.
4. Compare escalation rate, retrieval quality, and total episode/token cost to baseline.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings
