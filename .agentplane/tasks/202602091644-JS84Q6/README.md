---
id: "202602091644-JS84Q6"
title: "PolicyEngine: central policy evaluation"
result_summary: "PolicyEngine wrapper added"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091644-5RH64E"
tags:
  - "code"
  - "policy"
  - "architecture"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:54:13.074Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "f1767979e3d3f1390f3ae3882b0eb646b7f5a2cb"
  message: "✅ JS84Q6 policy: add PolicyEngine wrapper"
comments:
  -
    author: "CODER"
    body: "Start: implement PolicyEngine evaluate(actionId, ctx)->Decision and unit tests; initial implementation delegates to existing policy rules for known actions and is a no-op for others."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Introduced PolicyEngine wrapper with safe delegation to existing evaluatePolicy."
events:
  -
    type: "status"
    at: "2026-02-09T16:51:28.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement PolicyEngine evaluate(actionId, ctx)->Decision and unit tests; initial implementation delegates to existing policy rules for known actions and is a no-op for others."
  -
    type: "verify"
    at: "2026-02-09T16:54:13.074Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T16:54:20.272Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Introduced PolicyEngine wrapper with safe delegation to existing evaluatePolicy."
doc_version: 2
doc_updated_at: "2026-02-09T16:54:20.272Z"
doc_updated_by: "CODER"
description: "Implement PolicyEngine evaluate(action, ctx) and require usecases to call it before side effects; remove duplicated checks from CLI."
id_source: "generated"
---
## Summary

Centralize policy evaluation in a PolicyEngine and require usecases to run it before any side effects.

## Scope

packages/agentplane/src/policy/** (new engine wrapper), packages/agentplane/src/usecases/** (integration points), selected migrated commands only.

## Plan

1) Add PolicyEngine with evaluate(actionId, ctx)->Decision.\n2) Define a minimal actionId set for the pilot commands.\n3) Wire engine into usecases (no CLI-side checks).\n4) Add unit tests for PolicyEngine decisions and formatting.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: policy drift between old checks and engine; mitigate by initially delegating to existing policy evaluation functions and adding regression tests.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:54:13.074Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:51:28.474Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert PolicyEngine commit(s); keep existing policy checks unchanged in non-migrated commands.

## Verify Steps

- bun run lint\n- bun run test:full
