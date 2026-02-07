---
id: "202601271400-ARA34N"
title: "AP-022: verify parity + logs"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202601271400-SPPJSC"
  - "202601271008-63G26Q"
tags:
  - "nodejs"
  - "roadmap"
  - "workflow"
  - "branch_pr"
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
  hash: "5edb261f75ffbc1ef5c137b0dde20a4f06651fc9"
  message: "ARA34N AP-022: add verify command parity"
comments:
  -
    author: "CODER"
    body: "Start: implement verify parity (log + skip-if-unchanged) with tests and docs updates."
  -
    author: "CODER"
    body: "verified: bun run ci (format:check, typecheck, lint, vitest coverage)"
doc_version: 2
doc_updated_at: "2026-02-03T12:09:12.288Z"
doc_updated_by: "agentplane"
description: "Implement verify command with skip-if-unchanged and PR verify logs/meta updates."
---
## Summary

Implemented agentplane verify command with skip-if-unchanged, log handling, and PR meta updates; expanded CLI help and tests.

## Scope

Added verify execution logic in run-cli, extended CLI help, and added extensive run-cli tests for verify/pr/hook edge cases.

## Risks

Verify executes shell commands; misconfigured commands may fail. Skip-if-unchanged relies on git status and ignores files per gitignore.

## Verify Steps

bun run ci

## Rollback Plan

Revert the AP-022 commit; no data migrations.

## Plan


## Verification
