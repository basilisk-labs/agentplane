---
id: "202602111229-1217R7"
title: "Harden release pre-publish checks"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "cli"
  - "code"
  - "quality"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T12:35:23.429Z"
  updated_by: "TESTER"
  note: "Verified: release apply now blocks dirty tracked trees and existing tags, and publish flow validates npm version availability before publish/push."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing deterministic release pre-publish guards and regression tests for previously observed publish failures."
events:
  -
    type: "status"
    at: "2026-02-11T12:30:45.186Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing deterministic release pre-publish guards and regression tests for previously observed publish failures."
  -
    type: "verify"
    at: "2026-02-11T12:35:23.429Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: release apply now blocks dirty tracked trees and existing tags, and publish flow validates npm version availability before publish/push."
doc_version: 2
doc_updated_at: "2026-02-11T12:35:23.431Z"
doc_updated_by: "TESTER"
description: "Identify root causes of previous release failures and add deterministic guards (duplicate version publish, dirty tree, CI gate parity) in release workflow."
id_source: "generated"
---
## Summary

Harden release flow by adding checks for dirty tracked tree and already-published npm versions, plus explicit publish preflight checks.

## Scope

In scope: release apply command, publish workflow/scripts, release docs. Out of scope: semantic versioning policy changes.

## Plan

1) Reconstruct past release failures from code/history. 2) Add deterministic pre-publish guards in CLI/workflow. 3) Add tests for new guards. 4) Run targeted + critical checks. 5) Commit.

## Risks

Risk: over-constraining release path may block legitimate hotfix releases. Mitigation: scope checks to clear deterministic failures and keep explicit bypass options where needed.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T12:35:23.429Z — VERIFY — ok

By: TESTER

Note: Verified: release apply now blocks dirty tracked trees and existing tags, and publish flow validates npm version availability before publish/push.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T12:30:45.186Z, excerpt_hash=sha256:3be8c9fa0a05d12df695cd1e182a4b25d4aebdf6e26e4b58b1b86d3fd5d6df93

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the release-guard commit and rerun release tests. If needed, temporarily use existing release flow without new checks.

## Verify Steps

- bun run test:agentplane -- packages/agentplane/src/commands/release/apply.test.ts\n- bun run test:fast\n- bun run release:check\nExpected: tests pass; release apply guards trigger with clear errors for dirty tree or existing npm version.
