---
id: "202602060332-MWKYQ4"
title: "AP-BR-03 Branch base UX commands"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["cli"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: extend branch base commands (set --current, clear, explain) and update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-06T04:09:17.251Z"
doc_updated_by: "CODER"
description: "Add branch base set --current, branch base clear, and branch base explain output; include tests and docs."
id_source: "generated"
---
## Summary

Extended branch base commands with set --current, clear, and explain, plus updated CLI parsing/tests.

## Scope

Branch base command handlers, git config helpers, CLI parsing, and tests.

## Risks

Users relying on previous branch base usage strings may see different output/usage guidance.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert branch base command additions and restore prior CLI parsing/tests.
