---
id: "202602071657-HC5CYR"
title: "Gate: Enforce Verify Steps on plan approve (verify-required tags)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-F919EB"
tags:
  - "code"
  - "workflow"
  - "approvals"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:18:05.395Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:18:53.234Z"
  updated_by: "CODER"
  note: "Plan approve now enforces filled Verify Steps for verify-required tags; bun run test:agentplane."
commit:
  hash: "b22cff0e0d277715e8920db100e7b4019749685d"
  message: "✅ HC5CYR workflow: gate plan approve on Verify Steps"
comments:
  -
    author: "CODER"
    body: "Start: enforce filled Verify Steps on plan approval for verify-required tasks."
  -
    author: "CODER"
    body: "Verified: plan approval now blocks verify-required tasks unless Verify Steps is filled (no placeholder); bun run test:agentplane passed."
doc_version: 2
doc_updated_at: "2026-02-07T17:19:49.310Z"
doc_updated_by: "CODER"
description: "Block task plan approve when Verify Steps is missing/empty/placeholder for verify-required tasks."
---
## Summary


## Scope


## Plan

1) In task plan approve, enforce filled ## Verify Steps when the task has verify-required tags (from config tasks.verify.required_tags).
2) Use shared extractDocSection + isVerifyStepsFilled for consistent behavior.
3) Add/update tests later in the dedicated test tasks.
4) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:18:53.234Z — VERIFY — ok

By: CODER

Note: Plan approve now enforces filled Verify Steps for verify-required tags; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
