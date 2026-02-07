---
id: "202602051525-P4N6RJ"
title: "AP-081: Scenario run audit report"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "recipes"
  - "audit"
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
  hash: "a7966005b50bf8cb886195df6a6e6c3801ecff7e"
  message: "✨ P4N6RJ add scenario audit report"
comments:
  -
    author: "CODER"
    body: "Start: Add scenario run audit report with redaction, update tests/docs, and verify via test:fast."
  -
    author: "CODER"
    body: "Verified: Added scenario run audit report (report.json) with redacted args/env keys and git summary; bun run test:fast."
doc_version: 2
doc_updated_at: "2026-02-05T15:49:18.637Z"
doc_updated_by: "CODER"
description: "Write report.json for recipe scenario runs with redacted args/env and git diff summary."
id_source: "generated"
---
## Summary

Add audit report for scenario runs with redaction and git diff summary.

## Scope

- Add report.json under run directory.
- Include timestamps, recipe/scenario ids, steps with redacted args, env keys, and git diff summary.
- Update tests and docs.

## Risks

- Redaction rules might miss secrets.
- Git diff summary may include unrelated changes.

## Verify Steps

- Run bun run test:fast.
- Run scenario tests and confirm report.json is written with redacted args and env keys only.

## Verification

Pending.

- ✅ bun run test:fast (pass).\n- ✅ Scenario audit report assertions in recipes tests (redacted args/env keys, report.json on failure).

## Rollback Plan

- Revert report.json generation and related test updates.

## Plan
