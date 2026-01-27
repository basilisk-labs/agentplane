---
id: "202601271400-SPPJSC"
title: "AP-021: PR artifacts commands"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271400-XBPTD6", "202601270756-KREHV4"]
tags: ["nodejs", "roadmap", "workflow", "branch_pr"]
verify: ["bun run ci"]
commit: { hash: "3c22686b4a7fb80ad57aeb0d1b0e32f28426d5b4", message: "SPPJSC AP-021: implement PR artifacts commands" }
comments:
  - { author: "CODER", body: "Start: implement PR artifact commands (open/update/check/note) for branch_pr workflow." }
  - { author: "CODER", body: "verified: bun run ci (format/typecheck/lint/coverage) passed on 2026-01-27." }
doc_version: 2
doc_updated_at: "2026-01-27T15:12:53+00:00"
doc_updated_by: "agentctl"
description: "Implement pr open/update/check/note for branch_pr workflow artifacts."
---
## Summary

Implemented PR artifact CLI commands (open/update/check/note) with diffstat + auto-summary updates and expanded CLI tests.

## Scope

Updated agentplane CLI to generate/validate PR artifacts, added git env sanitization, and expanded CLI test coverage for PR and workflow error paths.

## Risks

PR artifact logic depends on git state; misconfigured repos may surface E_GIT errors. Coverage thresholds remain sensitive to branch coverage.

## Verify Steps

bun run ci

## Rollback Plan

Revert the AP-021 commit; no data migrations.

