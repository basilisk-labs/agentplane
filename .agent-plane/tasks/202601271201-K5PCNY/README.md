---
id: "202601271201-K5PCNY"
title: "AP-017: commit wrapper"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271201-64SSC0"]
tags: ["nodejs", "roadmap", "git", "commit"]
verify: ["bun run ci"]
commit: { hash: "386fa3b046c756b7dbef3ab8bb426a61de00791e", message: "✨ K5PCNY AP-017: commit wrapper" }
comments:
  - { author: "CODER", body: "verified: bun run ci (format, typecheck, lint, coverage). | details: Added commit wrapper tests." }
doc_version: 2
doc_updated_at: "2026-01-27T12:51:12+00:00"
doc_updated_by: "agentctl"
description: "Implement agentplane commit wrapper (guard + policy + confirm flags)."
---
## Summary

Add agentplane commit wrapper with guard checks and git commit execution.

## Scope

CLI commit command, allowlist/auto-allow handling, hook env propagation, tests, and help updates.

## Risks

Commit wrapper may fail if git user identity is missing or hooks block commits.

## Verify Steps

bun run ci

## Rollback Plan

git revert <commit>

