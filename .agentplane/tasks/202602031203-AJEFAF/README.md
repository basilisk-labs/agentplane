---
id: "202602031203-AJEFAF"
title: "Set doc_updated_by to last comment author"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
commit: { hash: "3b886af3861460a389a7057aabef6536c085189a", message: "🧾 AJEFAF use last comment for doc_updated_by" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: update doc_updated_by to reflect last comment author and backfill task READMEs." }
  - { author: "ORCHESTRATOR", body: "Verified: pre-commit hooks ran format, lint, and test-fast successfully." }
doc_version: 2
doc_updated_at: "2026-02-03T12:13:32.203Z"
doc_updated_by: "agentplane"
description: "Update task doc metadata so doc_updated_by reflects the last comment author (agent), not a generic value; backfill existing task READMEs."
id_source: "generated"
---
## Summary

Set doc_updated_by to the last comment author instead of a generic value, and backfill existing task READMEs.

## Scope

Update core and local backend doc update logic, CLI updated-by handling, add tests, and re-write task docs so metadata reflects last comment author.

## Risks

Bulk doc updates touch many task READMEs and update doc_updated_at timestamps.

## Verify Steps

- bun run --filter=@agentplaneorg/core test -- --runInBand
- bun run --filter=agentplane test -- --runInBand (or at least affected tests)

## Rollback Plan

Revert the commits to restore previous doc_updated_by behavior and README metadata.
