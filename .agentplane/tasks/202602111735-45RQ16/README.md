---
id: "202602111735-45RQ16"
title: "T2: Doctor invariant for DONE tasks commit metadata"
result_summary: "Doctor enforces DONE task commit metadata invariants with actionable diagnostics."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "doctor"
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
  hash: "6911bfacd64d71c3dd3c50f692f2bb3abb1b85b5"
  message: "✅ 45RQ16 doctor: enforce DONE task commit invariants"
comments:
  -
    author: "CODER"
    body: "Start: add DONE commit metadata invariants to doctor and cover with regression tests."
  -
    author: "CODER"
    body: "Verified: doctor now flags DONE tasks with missing commit hashes, unknown hashes, and misuse of close commits as implementation commits; regression tests added."
events:
  -
    type: "status"
    at: "2026-02-11T17:42:21.739Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add DONE commit metadata invariants to doctor and cover with regression tests."
  -
    type: "status"
    at: "2026-02-11T17:43:56.073Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor now flags DONE tasks with missing commit hashes, unknown hashes, and misuse of close commits as implementation commits; regression tests added."
doc_version: 2
doc_updated_at: "2026-02-11T17:43:56.073Z"
doc_updated_by: "CODER"
description: "Extend doctor to flag DONE tasks that violate commit metadata expectations and provide deterministic remediation guidance."
id_source: "generated"
---
## Summary

Extend doctor with commit invariants for DONE tasks based on .agentplane/tasks.json snapshot.

## Scope

In scope: doctor runtime checks and doctor.command tests for missing/invalid DONE commit metadata.

## Plan

1) Add snapshot-based DONE task commit checks in doctor. 2) Detect missing hash and close-commit misuse. 3) Add regression tests.

## Risks

Potential false positives on legacy repos with malformed task snapshots; keep checks explicit and actionable.

## Verification

Pending execution.

## Rollback Plan

Revert doctor.run.ts and doctor.command.test.ts changes.

## Context

DONE tasks should retain implementation commit metadata; accidental close-commit hashes should be detected.

## Verify Steps

bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts

## Notes

### Decisions\n- Use tasks snapshot to avoid backend/env coupling in doctor.\n### Implementation Notes\n- Pending.
