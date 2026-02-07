---
id: "202601290715-X2SS99"
title: "AP-042: parity integration tests (golden fixtures)"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202601271027-A6D5EF"
  - "202601271400-SPPJSC"
  - "202601271400-ARA34N"
  - "202601290715-WJ0QVE"
tags:
  - "roadmap"
  - "nodejs"
  - "testing"
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
  hash: "0701e434c6beebfa52c0d734e2faafea04bd827f"
  message: "✨ X2SS99 add agentctl golden fixtures"
comments:
  -
    author: "TESTER"
    body: "Start: add parity integration tests (golden fixtures) and document fixtures location + expectations."
  -
    author: "TESTER"
    body: "verified: ran bun run ci on 2026-01-30 | details: all checks passed (format, typecheck, lint, coverage)."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:21.595Z"
doc_updated_by: "agentplane"
description: "Add golden fixture tests for README/tasks.json/PR artifacts to detect format drift vs Python repo."
---
## Summary

Add agentctl-derived golden fixtures for README/frontmatter and tasks.json, with parity checksum and roundtrip tests.

## Scope

- Generate agentctl-based fixtures for task README and tasks.json.
- Add tests to roundtrip README and validate checksum parity.

## Risks

- Fixtures may drift if agentctl changes; tests will flag required updates.
- Limited to README/tasks.json parity; PR artifacts remain Node-specific.

## Verify Steps

bun run ci

## Rollback Plan

Remove the fixtures/tests and revert to previous task-readme/tasks-export tests.

## Plan


## Verification
