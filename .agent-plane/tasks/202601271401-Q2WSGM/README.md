---
id: "202601271401-Q2WSGM"
title: "AP-023: integrate branch_pr"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: ["202601271400-SPPJSC", "202601271400-ARA34N", "202601271200-2YFSTJ"]
tags: ["nodejs", "roadmap", "workflow", "branch_pr"]
verify: ["bun run ci"]
comments:
  - { author: "CODER", body: "Start: fixing integrate tests/coverage and validating CI for AP-023." }
doc_version: 2
doc_updated_at: "2026-01-29T06:10:21+00:00"
doc_updated_by: "agentctl"
description: "Implement integrate flow for branch_pr with merge + closure commit safeguards."
---
## Summary

Implement branch_pr integrate flow with merge strategies, PR artifact validation, verify gating, and closure metadata updates.

## Scope

- Merge task branches via squash/merge/rebase on base branch
- Validate PR artifacts and verify metadata
- Enforce branch_pr guardrails (tasks.json single-writer, base-branch commit protection)

## Risks

- Git merge/reset operations can discard local changes; ensure clean status before integrate
- Incorrect base branch detection could block or mis-merge; verify base branch config

## Verify Steps

bun run ci

## Rollback Plan

- Revert the integrate-related commit(s)
- Restore base branch to pre-merge SHA if needed

