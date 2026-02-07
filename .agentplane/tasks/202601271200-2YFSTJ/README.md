---
id: "202601271200-2YFSTJ"
title: "AP-015: guard staged paths allow/deny"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202601270756-RMNY59"
  - "202601270756-V6CK4Q"
tags:
  - "nodejs"
  - "roadmap"
  - "git"
  - "guard"
verify:
  - "bun run ci"
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
  hash: "2d7b22cbd638e464a91a752d463acc5746648218"
  message: "✨ 2YFSTJ AP-015: guard staged paths"
comments:
  -
    author: "CODER"
    body: "verified: bun run ci passed via pre-commit (format, typecheck, lint, coverage)."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:09.956Z"
doc_updated_by: "agentplane"
description: "Implement guard for staged paths with allow/deny rules and suggest-allow output."
---
## Summary

Add guard commands and git-status helpers for allowlisted staged commits.

## Scope

CLI guard subcommands for clean/suggest/commit; core git status helpers; tests and help updates.

## Risks

Guard may block commits if allowlist parsing mismatches git status output.

## Verify Steps

bun run ci

## Rollback Plan

git revert <commit>

## Plan


## Verification
