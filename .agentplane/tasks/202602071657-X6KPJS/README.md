---
id: "202602071657-X6KPJS"
title: "Gate: Enforce Verify Steps on start when require_plan=false"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-HC5CYR"
tags:
  - "code"
  - "workflow"
  - "approvals"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:21:13.908Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:21:45.846Z"
  updated_by: "CODER"
  note: "start now enforces filled Verify Steps when require_plan=false for verify-required tags; bun run test:agentplane."
commit:
  hash: "2853392c4b9e0f8eb1c9ca995c13a8b0f9793387"
  message: "✅ X6KPJS workflow: gate start on Verify Steps when no plan"
comments:
  -
    author: "CODER"
    body: "Start: add Verify Steps enforcement in start when plan approval is disabled."
  -
    author: "CODER"
    body: "Verified: start fails fast for verify-required tasks when require_plan=false and Verify Steps is unfilled; bun run test:agentplane passed."
doc_version: 2
doc_updated_at: "2026-02-07T17:22:28.227Z"
doc_updated_by: "CODER"
description: "Add fail-fast check in start for verify-required tasks when plan approval is disabled."
---
## Summary


## Scope


## Plan

1) In start command, enforce filled ## Verify Steps for verify-required tags when agents.approvals.require_plan=false.
2) Keep behavior unchanged when require_plan=true (plan approve gate already covers it).
3) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:21:45.846Z — VERIFY — ok

By: CODER

Note: start now enforces filled Verify Steps when require_plan=false for verify-required tags; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Start gating behavior when plan approval is disabled.

### Checks

- With require_plan=false and a verify-required tag (e.g. code), `agentplane start` must reject if Verify Steps is missing/empty/placeholder.
- With require_plan=true, behavior should be unchanged (still blocked if plan not approved).

### Evidence / Commands

- bun run test:agentplane

### Pass criteria

- Start fails fast with E_VALIDATION (or E_USAGE if existing convention) when Verify Steps is unfilled and plan approval is disabled.
