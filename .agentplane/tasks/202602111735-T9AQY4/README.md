---
id: "202602111735-T9AQY4"
title: "T3: Emit machine-readable release apply report"
result_summary: "Machine-readable release apply report is available for diagnostics and automation."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "release"
  - "cli"
  - "observability"
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
  hash: "39220fc4ccb81859f741863b14b506e75eaa5754"
  message: "✅ T9AQY4 release: emit machine-readable apply report"
comments:
  -
    author: "CODER"
    body: "Start: add release apply report artifacts and verify with command tests."
  -
    author: "CODER"
    body: "Verified: release apply writes structured report artifacts under .agentplane/.release/apply and tests assert report content."
events:
  -
    type: "status"
    at: "2026-02-11T17:45:12.318Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add release apply report artifacts and verify with command tests."
  -
    type: "status"
    at: "2026-02-11T17:46:10.884Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release apply writes structured report artifacts under .agentplane/.release/apply and tests assert report content."
doc_version: 2
doc_updated_at: "2026-02-11T17:46:10.884Z"
doc_updated_by: "CODER"
description: "Write a structured JSON report for release apply outcomes (versions, tag, checks, commit, push status) for reproducibility and diagnostics."
id_source: "generated"
---
## Summary

Emit machine-readable release apply report artifacts for diagnostics and reproducibility.

## Scope

In scope: release apply command report writer and regression test asserting report content.

## Plan

1) Add release apply report schema and writer under .agentplane/.release/apply. 2) Emit latest.json and run-specific report on successful apply. 3) Extend release apply test to validate report.

## Risks

Low risk; additive artifact writing under ignored runtime directory.

## Verification

Pending execution.

## Rollback Plan

Revert release apply report writer and test updates.

## Context

Release state is currently spread across stdout/git state; a JSON artifact improves traceability.

## Verify Steps

bunx vitest run packages/agentplane/src/commands/release/apply.test.ts

## Notes

### Decisions\n- Write both timestamped report and latest.json pointer for easy consumption.\n### Implementation Notes\n- Pending.
