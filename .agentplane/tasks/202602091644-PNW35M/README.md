---
id: "202602091644-PNW35M"
title: "Doctor: structural invariants and safe fixes"
result_summary: "doctor command added"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091644-TXYQAY"
tags:
  - "code"
  - "cli"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T17:06:42.105Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "e8f19cf3aecc108a5988ea08a4def0e6a9781163"
  message: "✅ PNW35M cli: add doctor command"
comments:
  -
    author: "CODER"
    body: "Start: Implement doctor command to check structural invariants (layering/imports, workspace markers) with safe --fix for .gitignore hygiene."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Added doctor command for deterministic layering checks and a safe --fix mode for .gitignore hygiene."
events:
  -
    type: "status"
    at: "2026-02-09T17:03:55.266Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement doctor command to check structural invariants (layering/imports, workspace markers) with safe --fix for .gitignore hygiene."
  -
    type: "verify"
    at: "2026-02-09T17:06:42.105Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T17:06:47.077Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added doctor command for deterministic layering checks and a safe --fix mode for .gitignore hygiene."
doc_version: 2
doc_updated_at: "2026-02-09T17:06:47.077Z"
doc_updated_by: "CODER"
description: "Add agentplane doctor and doctor --fix for safe invariant checks: layering, manifest/spec consistency, AGENTS anchors, tasks index schema."
id_source: "generated"
---
## Summary

Add a doctor command that machine-verifies structural invariants (layering, workspace structure, spec/registry consistency) and can apply safe fixes via --fix.

## Scope

packages/agentplane/src/commands/doctor* and supporting checks; integrate with existing cli/spec registry.

## Plan

1) Add doctor command spec + handler.\n2) Implement checks: forbidden imports (reuse guardrail logic), AGENTS anchor presence, tasks index schema presence, framework manifest sanity.\n3) Implement --fix for safe-only operations (anchors insertion, index rebuild hook if available).\n4) Add tests for doctor output and exit codes.\n5) Run bun run lint and bun run test:full.

## Risks

Doctor becoming a grab-bag; mitigate by keeping checks small, deterministic, and stable.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:06:42.105Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:03:55.266Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert doctor command and checks; no runtime behavior changes outside doctor invocation.

## Verify Steps

- bun run lint\n- bun run test:full
