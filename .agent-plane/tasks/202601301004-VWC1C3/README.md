---
id: "202601301004-VWC1C3"
title: "Node CLI parity: start/block/finish flags"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["202601300958-HRNHRH"]
tags: ["nodejs", "cli", "parity", "workflow"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: Extend start/block/finish flags for parity with agentctl and update tests." }
doc_version: 2
doc_updated_at: "2026-01-30T10:51:20+00:00"
doc_updated_by: "agentctl"
description: "Bring start/block/finish in Node CLI to agentctl parity (commit-from-comment options, allow/auto-allow, require-clean, quiet/force, multi-task finish, status-commit behavior, skip-verify)."
---
## Summary

Extend start/block/finish parity, add readiness checks, and align integrate->finish invocation.

## Scope

Update run-cli start/block/finish flag parsing and behaviors, allow multi-task finish, enforce dependency readiness, update integrate finish call, refresh help text, and add/adjust run-cli tests.

## Risks

Potential behavior change if DONE tasks are re-finished without --force or if status commit policy is misapplied; finish now exports/lints tasks.json on every call.

## Verify Steps

bun run test -- packages/agentplane/src/run-cli.test.ts

## Rollback Plan

git revert <commit>

