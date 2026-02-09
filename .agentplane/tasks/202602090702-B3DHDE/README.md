---
id: "202602090702-B3DHDE"
title: "Raise branch coverage to meet global threshold"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on: []
tags:
  - "code"
  - "testing"
  - "coverage"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T07:25:19.937Z"
  updated_by: "TESTER"
  note: "bun run coverage: PASS (branches 72.07% >= 72%); bun run test:full: PASS (769 tests)."
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Raise global branch coverage above threshold by adding unit tests for key low-coverage modules (task-doc, lifecycle parser, release metadata)."
events:
  -
    type: "status"
    at: "2026-02-09T07:02:50.351Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Raise global branch coverage above threshold by adding unit tests for key low-coverage modules (task-doc, lifecycle parser, release metadata)."
  -
    type: "verify"
    at: "2026-02-09T07:25:19.937Z"
    author: "TESTER"
    state: "ok"
    note: "bun run coverage: PASS (branches 72.07% >= 72%); bun run test:full: PASS (769 tests)."
doc_version: 2
doc_updated_at: "2026-02-09T07:25:19.939Z"
doc_updated_by: "TESTER"
description: "Add targeted unit tests for low-coverage but important modules (task-doc, lifecycle parser, release metadata) to bring branch coverage above 72%."
id_source: "generated"
---
## Summary

Add focused unit tests for low-coverage core modules to raise global branch coverage above the configured threshold (72%).

## Scope

- packages/core/src/tasks/task-doc.ts (+ tests)\n- packages/agentplane/src/cli/parse/lifecycle.ts (+ tests)\n- packages/agentplane/src/meta/release.ts (+ tests)

## Plan

1) Identify lowest branch-coverage files from coverage-final.json.\n2) Add unit tests hitting key branches in task-doc.ts (normalize, split headings, merge, setMarkdownSection).\n3) Add unit tests for lifecycle parser covering error branches and flag parsing.\n4) Add unit tests for release metadata resolving git root and tag lookup branches.\n5) Run bun run coverage and ensure branch threshold passes.\n6) Run bun run test:full.

## Risks

- Risk: tests could be brittle to help/README formatting. Mitigation: assert normalized outputs and key invariants only.\n- Risk: mocking node builtins in vitest can be finicky. Mitigation: isolate with vi.resetModules and minimal mocks.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T07:25:19.937Z — VERIFY — ok

By: TESTER

Note: bun run coverage: PASS (branches 72.07% >= 72%); bun run test:full: PASS (769 tests).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T07:02:50.351Z, excerpt_hash=sha256:da5abb1c2f8815e5208f42a8738c2dc2cd68d152ce87ced418f777eb6756a9ff

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task; remove added tests if they cause flakiness or increase maintenance cost.

## Verify Steps

- bun run coverage (must pass global thresholds)\n- bun run test:full\nPass criteria: coverage command exits 0; all tests pass.
