---
id: "202602091644-TXYQAY"
title: "Guardrails: import-layer enforcement"
result_summary: "Layering guardrail tests"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602091644-5RH64E"
  - "202602091644-2JKX4T"
tags:
  - "testing"
  - "architecture"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T17:02:25.384Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "a6126d7d8fdfc7d5ea84211f5a0680306ddf304e"
  message: "✅ TXYQAY testing: add import-layer guardrails"
comments:
  -
    author: "TESTER"
    body: "Start: Add import-layer guardrail tests (CLI must not import adapters directly; usecases/ports must not import node I/O modules or git libs)."
  -
    author: "TESTER"
    body: "Verified: bun run lint and bun run test:full pass. Added deterministic import-layer guardrail tests for cli/ vs adapters and for usecases/ports IO/git imports."
events:
  -
    type: "status"
    at: "2026-02-09T17:00:47.063Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add import-layer guardrail tests (CLI must not import adapters directly; usecases/ports must not import node I/O modules or git libs)."
  -
    type: "verify"
    at: "2026-02-09T17:02:25.384Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T17:02:31.479Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added deterministic import-layer guardrail tests for cli/ vs adapters and for usecases/ports IO/git imports."
doc_version: 2
doc_updated_at: "2026-02-09T17:02:31.479Z"
doc_updated_by: "TESTER"
description: "Add tests/lint rules enforcing cli/ cannot import adapters/ and that fs/path/simple-git are only used in adapters."
id_source: "generated"
---
## Summary

Add automated guardrails enforcing the layering: cli/ cannot import adapters/, and fs/path/simple-git cannot be used outside adapters.

## Scope

New tests and/or lint checks under packages/agentplane/src/ enforcing import boundaries.

## Plan

1) Implement a test scanning TS sources for forbidden imports (cli->adapters, non-adapters importing node:fs/path, etc.).\n2) Add an allowlist for known exceptions (tests, generated fixtures).\n3) Ensure failures are actionable (file:line, rule name).\n4) Run bun run lint and bun run test:full.

## Risks

False positives (dynamic imports, type-only imports); mitigate with targeted regexes and allowlists.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:02:25.384Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:00:47.063Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the guardrail tests if they block development; keep the architecture docs and revisit the rule set.

## Verify Steps

- bun run lint\n- bun run test:full
