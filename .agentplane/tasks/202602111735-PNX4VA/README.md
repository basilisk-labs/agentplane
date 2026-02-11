---
id: "202602111735-PNX4VA"
title: "T1: Align release prepublish gate with CI/publish checks"
result_summary: "release:prepublish now matches CI/publish quality expectations more closely."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "ci"
  - "quality"
verify: []
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
commit:
  hash: "d49f586e23feac2e659a2884f7fe963b0d749e72"
  message: "✅ PNX4VA release: align local prepublish gates with CI checks"
comments:
  -
    author: "CODER"
    body: "Start: align local release prepublish checks with CI/publish gate set and verify behavior."
  -
    author: "CODER"
    body: "Verified: local release:ci-check now enforces format, schema/agent drift checks, build, lint, and fast+critical test gates; full run passed."
events:
  -
    type: "status"
    at: "2026-02-11T17:36:52.469Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align local release prepublish checks with CI/publish gate set and verify behavior."
  -
    type: "status"
    at: "2026-02-11T17:40:00.699Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: local release:ci-check now enforces format, schema/agent drift checks, build, lint, and fast+critical test gates; full run passed."
doc_version: 2
doc_updated_at: "2026-02-11T17:40:00.699Z"
doc_updated_by: "CODER"
description: "Ensure local prepublish gate runs formatting, drift checks, and CI-equivalent tests so release apply uses the same quality gate as GitHub workflows."
id_source: "generated"
---
## Summary

Align local release prepublish checks with CI/publish quality gates to reduce publish-time surprises.

## Scope

In scope: root package scripts for release checks and related release command preflight call path if needed.

## Plan

1) Compare GitHub CI/publish checks with local release scripts. 2) Update release scripts to include missing deterministic checks. 3) Run targeted script/tests for release command behavior.

## Risks

Risk: heavier local checks can increase release lead time; keep deterministic and cache-friendly order.

## Verification

Pending execution.

## Rollback Plan

Revert script changes in package.json and any release command adjustments.

## Context

Current release:prepublish does not include all drift/format gates used in CI and publish workflow.

## Verify Steps

bun run release:prepublish\nbun run test:fast -- --runInBand

## Notes

### Decisions\n- Keep patch-release flow strict but deterministic.\n### Implementation Notes\n- Pending.
