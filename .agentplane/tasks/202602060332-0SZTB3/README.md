---
id: "202602060332-0SZTB3"
title: "AP-BR-05 Make tasks.json export-only"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["tasks"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: enforce export-only tasks.json policy with gitignore updates and CLI behavior changes." }
doc_version: 2
doc_updated_at: "2026-02-06T04:10:23.363Z"
doc_updated_by: "CODER"
description: "Add gitignore for tasks.json/cache/worktrees; make tasks.json generated only by export/flag; document hooks policy and optional tasks_path relocation if needed. Include tests and docs."
id_source: "generated"
---
## Summary

Made tasks.json export-only, removed auto-exports from status/finish, and updated gitignore/tests/docs.

## Scope

Workflow commands for status/finish, gitignore policy, CLI parsing, tests, and docs for tasks.json export.

## Risks

Teams relying on auto-updated tasks.json must run task export explicitly; documentation updated to reduce surprises.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert export-only policy changes, re-enable auto-export on status/finish, and restore prior docs/tests.
