---
id: "202602110755-5GCCKQ"
title: "Release: enforce local preflight equal to GitHub CI"
result_summary: "Added CI-equivalent local pre-release gate"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "ci"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T07:58:41.335Z"
  updated_by: "TESTER"
  note: "Verified new release:ci-check mirrors ci.yml gate and passes locally (build, lint, test:fast, test:critical)."
commit:
  hash: "4b6705f5bd3e53f9c19d6cc214cb3ed4265b824c"
  message: "✅ 5GCCKQ release: add ci-equivalent preflight gate"
comments:
  -
    author: "CODER"
    body: "Start: add local pre-release CI gate matching GitHub CI checks."
  -
    author: "CODER"
    body: "Verified: release pipeline now has an explicit local preflight equal to GitHub CI checks."
events:
  -
    type: "status"
    at: "2026-02-11T07:55:44.551Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add local pre-release CI gate matching GitHub CI checks."
  -
    type: "verify"
    at: "2026-02-11T07:58:41.335Z"
    author: "TESTER"
    state: "ok"
    note: "Verified new release:ci-check mirrors ci.yml gate and passes locally (build, lint, test:fast, test:critical)."
  -
    type: "status"
    at: "2026-02-11T07:58:41.619Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release pipeline now has an explicit local preflight equal to GitHub CI checks."
doc_version: 2
doc_updated_at: "2026-02-11T07:58:41.619Z"
doc_updated_by: "CODER"
description: "Add an explicit pre-release check that runs the same checks as .github/workflows/ci.yml (build, lint, test:fast, test:critical with CI git env) before publishing."
id_source: "generated"
---
## Summary

Introduce a deterministic local pre-release gate that mirrors GitHub CI checks so release publishing only proceeds after the same signal passes locally.

## Scope

In scope: root scripts and docs references used for release process. Out of scope: changing GitHub workflow definitions.

## Plan

1) Add a script that mirrors ci.yml job steps relevant to pass/fail. 2) Include CI git identity env for tests creating commits. 3) Document/use this script in release flow and verify it passes.

## Risks

Risk: local script drifts from ci.yml in future. Mitigation: keep command composition explicit and minimal; mention source workflow path.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T07:58:41.335Z — VERIFY — ok

By: TESTER

Note: Verified new release:ci-check mirrors ci.yml gate and passes locally (build, lint, test:fast, test:critical).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T07:55:44.551Z, excerpt_hash=sha256:ebc293349637c6adbd7889234e3e84e74c6944c76e7556262d55ee6b6591351b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert script/docs changes and return to previous manual pre-release checks.

## Verify Steps

- bun run release:ci-check
- bun run lint
- bun run test:critical
