---
id: "202601271201-1PF9KF"
title: "AP-018: comment-driven commits + status_commit_policy"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601271008-63G26Q", "202601271201-K5PCNY"]
tags: ["nodejs", "roadmap", "git", "commit"]
verify: ["bun run ci"]
commit: { hash: "9a6cd0b2e133b909dae0dafeeccd9a5b730143d9", message: "✨ 1PF9KF start: add comment-driven status commit and tests" }
comments:
  - { author: "CODER", body: "verified: bun run ci (format, typecheck, lint, coverage) passed with branch coverage above 75%." }
doc_version: 2
doc_updated_at: "2026-01-27T13:48:25+00:00"
doc_updated_by: "agentctl"
description: "Implement commit-from-comment and status-commit flows tied to status_commit_policy."
---
## Summary

Implemented comment-driven commit support for start flow, added shared comment formatting helper, and expanded CLI tests to cover usage/error paths while meeting coverage gates.

## Scope

- Add start command comment-driven commit flow with status_commit_policy checks.\n- Extract comment formatting into a reusable module.\n- Add CLI tests for start usage, flags, and hooks errors.

## Risks

- Comment-driven commits can fail on misconfigured allowlists; covered by validation and tests.\n- Behavior changes in start flow could affect tooling; verified via CI.

## Verify Steps

bun run ci

## Rollback Plan

git revert 9a6cd0b2e133

