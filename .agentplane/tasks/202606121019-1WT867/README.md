---
id: "202606121019-1WT867"
title: "Document Loop Model v0.2"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606121019-G0BC7H"
tags:
  - "docs"
  - "loops"
  - "reference"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "agentplane loop validate --project"
  - "bun run docs:check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:23:05.829Z"
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
doc_updated_at: "2026-06-12T10:22:03.746Z"
doc_updated_by: "PLANNER"
description: "Document typed step contracts, metrics, per-step evidence, score-aware decisions, and loop.improve non-goals after the v0.2 implementation chain lands."
sections:
  Summary: |-
    Document Loop Model v0.2

    Document typed step contracts, metrics, per-step evidence, score-aware decisions, and loop.improve non-goals after the v0.2 implementation chain lands.
  Scope: |-
    - In scope: Document typed step contracts, metrics, per-step evidence, score-aware decisions, and loop.improve non-goals after the v0.2 implementation chain lands.
    - Out of scope: unrelated refactors not required for "Document Loop Model v0.2".
  Plan: |-
    1. Document Loop Model v0.2 concepts: typed step contracts, metrics, per-step evidence, score-aware decisions, and proposal-only loop.improve.
    2. Update CLI/reference docs with examples that distinguish v0.1 dry-run routing from v0.2 measurable loop evidence.
    3. State non-goals explicitly: no automatic policy weakening, no automatic prompt promotion, no free-form shell/GitHub tool selection by the model, and no non-dry-run execution unless separately approved.
    4. Add or update spec examples so docs and schema stay aligned.
    5. Keep docs concise and source-grounded; record any implementation gaps in Findings.
  Verify Steps: |-
    1. Run `bun run docs:check`. Expected: docs build/reference checks pass after Loop Model v0.2 updates.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    3. Run `agentplane loop validate --project` where project loop examples exist, or validate the relevant spec examples directly. Expected: documented examples match schema behavior.
    4. Inspect docs for explicit non-goals. Expected: no automatic policy weakening, no automatic prompt promotion, no free-form shell/GitHub tool selection, and no unapproved non-dry-run execution.
    5. Compare docs against implemented predecessor tasks. Expected: any unimplemented future behavior is labeled as future work rather than current capability.
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

Document Loop Model v0.2

Document typed step contracts, metrics, per-step evidence, score-aware decisions, and loop.improve non-goals after the v0.2 implementation chain lands.

## Scope

- In scope: Document typed step contracts, metrics, per-step evidence, score-aware decisions, and loop.improve non-goals after the v0.2 implementation chain lands.
- Out of scope: unrelated refactors not required for "Document Loop Model v0.2".

## Plan

1. Document Loop Model v0.2 concepts: typed step contracts, metrics, per-step evidence, score-aware decisions, and proposal-only loop.improve.
2. Update CLI/reference docs with examples that distinguish v0.1 dry-run routing from v0.2 measurable loop evidence.
3. State non-goals explicitly: no automatic policy weakening, no automatic prompt promotion, no free-form shell/GitHub tool selection by the model, and no non-dry-run execution unless separately approved.
4. Add or update spec examples so docs and schema stay aligned.
5. Keep docs concise and source-grounded; record any implementation gaps in Findings.

## Verify Steps

1. Run `bun run docs:check`. Expected: docs build/reference checks pass after Loop Model v0.2 updates.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
3. Run `agentplane loop validate --project` where project loop examples exist, or validate the relevant spec examples directly. Expected: documented examples match schema behavior.
4. Inspect docs for explicit non-goals. Expected: no automatic policy weakening, no automatic prompt promotion, no free-form shell/GitHub tool selection, and no unapproved non-dry-run execution.
5. Compare docs against implemented predecessor tasks. Expected: any unimplemented future behavior is labeled as future work rather than current capability.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
