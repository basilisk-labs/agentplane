---
id: "202601271027-PVM41Q"
title: "AP-012: task lint invariants"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271027-A6D5EF"]
tags: ["nodejs", "roadmap", "tasks", "lint"]
verify: ["bun run ci"]
commit: { hash: "d78c21e6561cda03a773366deece046326cc7320", message: "✨ PVM41Q AP-012: task lint invariants" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed | details: added task lint core+CLI coverage and validation tests." }
doc_version: 2
doc_updated_at: "2026-01-27T11:36:04+00:00"
doc_updated_by: "agentctl"
description: "Implement task lint checks beyond schema: DONE must have commit hash+message, verify required for certain tags, owner exists, deps cycles, checksum matches export."
---
## Summary

Add tasks.json linting (checksum/deps/verify-required/DONE commit) with CLI support and tests.

## Scope

Core: add tasks-lint module + tests; CLI: add task lint command, help entry, and CLI tests.

## Risks

Lint may flag manually edited tasks.json or missing verify commands; resolve by re-exporting or adding required verify steps.

## Verify Steps

bun run ci

## Rollback Plan

Revert commit d78c21e6561c.
