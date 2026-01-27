---
id: "202601271200-2YFSTJ"
title: "AP-015: guard staged paths allow/deny"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["202601270756-RMNY59", "202601270756-V6CK4Q"]
tags: ["nodejs", "roadmap", "git", "guard"]
verify: ["bun run ci"]
doc_version: 2
doc_updated_at: "2026-01-27T12:22:25+00:00"
doc_updated_by: "agentctl"
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

